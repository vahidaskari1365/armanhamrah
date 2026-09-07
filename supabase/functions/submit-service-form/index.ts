import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

/**
 * آرمان همراه — دریافت فرم نظرسنجی و شکایت مشتری (مسیر پشتیبان)
 *
 * Backup delivery path for the warranty survey/complaint forms. The browser
 * first posts to the same-origin PHP handler
 * (public/api/submit-service-form.php); only when that request is unreachable
 * or cannot deliver does src/lib/serviceForm.ts retry here. Validation rules
 * and user-facing messages intentionally mirror the PHP handler.
 *
 * Deploy with:
 *   supabase functions deploy submit-service-form
 * Required secret (already used by send-password-reset):
 *   supabase secrets set RESEND_API_KEY=...
 * Optional overrides:
 *   SERVICE_FORM_TO, SERVICE_FORM_FROM
 */

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const RECIPIENT_EMAIL =
  Deno.env.get("SERVICE_FORM_TO") || "info@armanhamrah.com";
const FROM_ADDRESS =
  Deno.env.get("SERVICE_FORM_FROM") ||
  "Arman Hamrah <noreply@resend.dev>";

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes, like the PHP handler
const RATE_LIMIT_MAX_REQUESTS = 5;
const MAX_BODY_BYTES = 25_000;

// Simple in-memory rate limiter (per edge function instance)
const ipHits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const arr = (ipHits.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS,
  );
  if (arr.length >= RATE_LIMIT_MAX_REQUESTS) {
    ipHits.set(ip, arr);
    return true;
  }
  arr.push(now);
  ipHits.set(ip, arr);
  return false;
}

function json(payload: Record<string, unknown>, status = 200): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders },
  });
}

class ValidationError extends Error {}

function cleanText(
  data: Record<string, unknown>,
  key: string,
  label: string,
  maxLength: number,
  required = true,
): string {
  const value = data[key];
  if (typeof value !== "string") {
    throw new ValidationError(`${label} نامعتبر است.`);
  }
  const trimmed = value.trim();
  if (required && trimmed === "") {
    throw new ValidationError(`${label} الزامی است.`);
  }
  if ([...trimmed].length > maxLength) {
    throw new ValidationError(`${label} بیش از حد طولانی است.`);
  }
  return trimmed;
}

function normalizePersianDigits(value: string): string {
  return value.replace(/[۰-۹٠-٩]/g, (digit) => {
    const code = digit.charCodeAt(0);
    const base = code >= 0x660 && code <= 0x669 ? 0x660 : 0x6f0;
    return String(code - base);
  });
}

function validatePhone(phone: string): void {
  const digits = normalizePersianDigits(phone).replace(/\D/g, "");
  if (digits.length < 8 || digits.length > 15) {
    throw new ValidationError("شماره تلفن همراه نامعتبر است.");
  }
}

function validateEmail(email: string): void {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new ValidationError("ایمیل نامعتبر است.");
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function emailHtml(
  title: string,
  fields: Array<{ label: string; value: string }>,
): string {
  const rows = fields
    .map((field) => {
      const label = escapeHtml(field.label);
      const value = escapeHtml(field.value === "" ? "—" : field.value);
      return (
        "<tr>" +
        '<td style="width:35%;padding:12px 16px;border-bottom:1px solid #e5e7eb;background:#f9fafb;color:#374151;font-weight:700;vertical-align:top;">' +
        label +
        "</td>" +
        '<td style="padding:12px 16px;border-bottom:1px solid #e5e7eb;color:#111827;line-height:1.9;white-space:pre-wrap;word-break:break-word;">' +
        value +
        "</td>" +
        "</tr>"
      );
    })
    .join("");

  return (
    '<!doctype html><html lang="fa" dir="rtl"><head><meta charset="UTF-8">' +
    '<meta name="viewport" content="width=device-width, initial-scale=1.0"></head>' +
    '<body style="margin:0;padding:24px;background:#f3f4f6;color:#111827;font-family:Tahoma,Arial,sans-serif;">' +
    '<div style="max-width:720px;margin:0 auto;overflow:hidden;border:1px solid #e5e7eb;border-radius:16px;background:#ffffff;">' +
    '<div style="padding:24px 28px;background:#111827;color:#ffffff;">' +
    '<p style="margin:0 0 8px;color:#fdba74;font-size:13px;font-weight:700;">آرمان همراه ارتباطات آریا</p>' +
    '<h1 style="margin:0;font-size:22px;line-height:1.6;">' +
    escapeHtml(title) +
    "</h1></div>" +
    '<div style="padding:24px 28px;"><table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;border:1px solid #e5e7eb;border-radius:10px;overflow:hidden;"><tbody>' +
    rows +
    "</tbody></table></div>" +
    '<div style="padding:18px 28px;border-top:1px solid #e5e7eb;background:#f9fafb;color:#6b7280;font-size:12px;line-height:1.8;">این پیام به‌صورت خودکار از وب‌سایت armanhamrah.com ارسال شده است.</div>' +
    "</div></body></html>"
  );
}

interface BuiltEmail {
  title: string;
  subject: string;
  fields: Array<{ label: string; value: string }>;
  replyTo: string;
}

function getSurveyEmail(data: Record<string, unknown>): BuiltEmail {
  const customerName = cleanText(data, "customerName", "نام مشتری", 150);
  const warrantyNumber = cleanText(data, "warrantyNumber", "شماره گارانتی", 100);
  const mobile = cleanText(data, "mobile", "تلفن همراه", 30);
  const suggestions = cleanText(data, "suggestions", "پیشنهاد یا انتقاد", 4000);
  validatePhone(mobile);

  const ratings = data["ratings"];
  if (typeof ratings !== "object" || ratings === null || Array.isArray(ratings)) {
    throw new ValidationError("پاسخ‌های نظرسنجی نامعتبر است.");
  }
  const ratingValues = ratings as Record<string, unknown>;

  const satisfactionLabels: Record<string, string> = {
    "very-poor": "بسیار ضعیف",
    poor: "ضعیف",
    average: "متوسط",
    good: "خوب",
    excellent: "عالی",
  };
  const resolutionLabels: Record<string, string> = {
    "very-low": "خیلی کم",
    low: "کم",
    average: "متوسط",
    high: "زیاد",
    "very-high": "خیلی زیاد",
  };
  const questions: Array<[string, string, Record<string, string>]> = [
    ["acceptanceTime", "رضایت از مدت زمان پذیرش دستگاه", satisfactionLabels],
    ["repairTime", "رضایت از مدت زمان تعمیرات و تحویل", satisfactionLabels],
    ["serviceCost", "رضایت از هزینه‌های پرداختی نسبت به خدمات", satisfactionLabels],
    ["staffBehavior", "رضایت از رفتار و برخورد پرسنل", satisfactionLabels],
    ["repairUpdates", "رضایت از اطلاع‌رسانی روند تعمیر", satisfactionLabels],
    ["serviceCenterAccess", "رضایت از دسترسی به مرکز خدمات", satisfactionLabels],
    ["issueResolution", "میزان رفع کامل ایرادات ثبت‌شده", resolutionLabels],
  ];

  const fields: BuiltEmail["fields"] = [
    { label: "نام و نام خانوادگی / نام شرکت", value: customerName },
    { label: "شماره گارانتی / پذیرش", value: warrantyNumber },
    { label: "تلفن همراه", value: mobile },
  ];

  for (const [key, label, values] of questions) {
    const rating = cleanText(ratingValues, key, label, 30);
    if (!(rating in values)) {
      throw new ValidationError("یکی از پاسخ‌های نظرسنجی نامعتبر است.");
    }
    fields.push({ label, value: values[rating] });
  }

  fields.push({ label: "پیشنهاد یا انتقاد", value: suggestions });
  fields.push({
    label: "زمان ثبت",
    value: new Date().toLocaleString("fa-IR", { timeZone: "Asia/Tehran" }),
  });

  return {
    title: "فرم نظرسنجی مشتریان",
    subject: `نظرسنجی خدمات پس از فروش — ${customerName}`,
    fields,
    replyTo: "",
  };
}

function getComplaintEmail(data: Record<string, unknown>): BuiltEmail {
  const receiptNumber = cleanText(
    data,
    "receiptNumber",
    "شماره قبض پذیرش / کارت گارانتی",
    100,
  );
  const firstName = cleanText(data, "firstName", "نام", 80, false);
  const lastName = cleanText(data, "lastName", "نام خانوادگی", 100);
  const province = cleanText(data, "province", "استان", 100);
  const city = cleanText(data, "city", "شهرستان", 100);
  const mobile = cleanText(data, "mobile", "تلفن همراه", 30);
  const email = cleanText(data, "email", "ایمیل", 255, false);
  const description = cleanText(data, "description", "شرح موضوع شکایت", 5000);
  const expertOpinion = cleanText(
    data,
    "expertOpinion",
    "نظر کارشناسی شرکت",
    2000,
    false,
  );
  validatePhone(mobile);
  if (email !== "") {
    validateEmail(email);
  }

  const complaintTypeLabels: Record<string, string> = {
    "device-issues": "مشکلات ظاهری و فنی دستگاه",
    "technician-behavior": "نحوه برخورد سرویس‌کار",
    "response-time": "مدت زمان پاسخگویی تا اجرای فاکتور",
    "technical-knowledge": "میزان دانش فنی سرویس‌کار در ارائه خدمات",
    "payment-request": "دریافت وجه توسط سرویس‌کار",
    "late-service": "عدم حضور به‌موقع یا تأخیر در انجام خدمت",
    "insufficient-explanation":
      "عدم ارائه سرویس یا توضیحات کافی درباره عملکرد دستگاه",
  };
  const rawTypes = data["complaintTypes"];
  const maxTypes = Object.keys(complaintTypeLabels).length;
  if (
    !Array.isArray(rawTypes) ||
    rawTypes.length === 0 ||
    rawTypes.length > maxTypes
  ) {
    throw new ValidationError("حداقل یک مصداق شکایت را انتخاب کنید.");
  }

  const types = rawTypes.map((type) => {
    if (typeof type !== "string" || !(type in complaintTypeLabels)) {
      throw new ValidationError("یکی از مصادیق شکایت نامعتبر است.");
    }
    return complaintTypeLabels[type];
  });

  return {
    title: "فرم رسیدگی به شکایت مشتریان",
    subject: `شکایت مشتری — ${lastName} — ${receiptNumber}`,
    fields: [
      {
        label: "شماره قبض پذیرش / شماره کارت گارانتی",
        value: receiptNumber,
      },
      { label: "نام", value: firstName },
      { label: "نام خانوادگی", value: lastName },
      { label: "استان", value: province },
      { label: "شهرستان", value: city },
      { label: "تلفن همراه", value: mobile },
      { label: "ایمیل", value: email },
      { label: "مصادیق شکایت", value: types.join("، ") },
      { label: "شرح موضوع شکایت", value: description },
      { label: "نظر کارشناسی شرکت", value: expertOpinion },
      {
        label: "زمان ثبت",
        value: new Date().toLocaleString("fa-IR", { timeZone: "Asia/Tehran" }),
      },
    ],
    replyTo: email,
  };
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return json({ success: false, message: "Method not allowed." }, 405);
  }

  const rawBody = await req.text();
  if (new TextEncoder().encode(rawBody).length > MAX_BODY_BYTES) {
    return json({ success: false, message: "Request is too large." }, 413);
  }

  let payload: Record<string, unknown>;
  try {
    payload = JSON.parse(rawBody) as Record<string, unknown>;
  } catch {
    return json({ success: false, message: "Invalid form payload." }, 400);
  }

  const formType = payload["formType"];
  const data = payload["data"];
  if (
    (formType !== "survey" && formType !== "complaint") ||
    typeof data !== "object" ||
    data === null ||
    Array.isArray(data)
  ) {
    const unknownType =
      typeof formType === "string" &&
      formType !== "survey" &&
      formType !== "complaint";
    return json(
      {
        success: false,
        message: unknownType ? "Unknown form type." : "Invalid form payload.",
      },
      400,
    );
  }

  // Honeypot: automated scripts often populate every input, while customers
  // never see this one.
  if (
    typeof payload["website"] === "string" &&
    (payload["website"] as string).trim() !== ""
  ) {
    return json({ success: true, message: "Form received." });
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    req.headers.get("cf-connecting-ip") ||
    "unknown";
  if (isRateLimited(ip)) {
    return json(
      { success: false, message: "Too many submissions. Please try again later." },
      429,
    );
  }

  let email: BuiltEmail;
  try {
    email =
      formType === "survey"
        ? getSurveyEmail(data as Record<string, unknown>)
        : getComplaintEmail(data as Record<string, unknown>);
  } catch (error) {
    if (error instanceof ValidationError) {
      return json({ success: false, message: error.message }, 400);
    }
    console.error("Unable to validate service form submission.", error);
    return json({ success: false, message: "Unable to validate form." }, 400);
  }

  const resendApiKey = Deno.env.get("RESEND_API_KEY");
  if (!resendApiKey) {
    console.error("RESEND_API_KEY is not configured for submit-service-form");
    return json({ success: false, message: "Unable to send email." }, 502);
  }

  try {
    const resend = new Resend(resendApiKey);
    const response = await resend.emails.send({
      from: FROM_ADDRESS,
      to: [RECIPIENT_EMAIL],
      subject: email.subject,
      html: emailHtml(email.title, email.fields),
      ...(email.replyTo !== "" ? { reply_to: email.replyTo } : {}),
    });
    if (response.error) {
      console.error("Resend rejected the service form email.", response.error);
      return json({ success: false, message: "Unable to send email." }, 502);
    }
  } catch (error) {
    console.error("Unable to send service form email via Resend.", error);
    return json({ success: false, message: "Unable to send email." }, 502);
  }

  return json({ success: true, message: "Form submitted." });
};

serve(handler);
