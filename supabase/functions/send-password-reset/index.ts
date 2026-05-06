import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.2";
import { Resend } from "https://esm.sh/resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ResetRequest {
  email: string;
  redirectTo?: string;
}

// Simple in-memory rate limiter (per edge function instance)
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_PER_IP = 5;
const MAX_PER_EMAIL = 3;
const ipHits = new Map<string, number[]>();
const emailHits = new Map<string, number[]>();

function isRateLimited(map: Map<string, number[]>, key: string, max: number): boolean {
  const now = Date.now();
  const arr = (map.get(key) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  if (arr.length >= max) {
    map.set(key, arr);
    return true;
  }
  arr.push(now);
  map.set(key, arr);
  return false;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Always return the same generic success response to prevent user enumeration
const genericSuccess = () =>
  new Response(
    JSON.stringify({
      success: true,
      message: "If an account exists for this email, a reset link has been sent.",
    }),
    { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
  );

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, redirectTo }: ResetRequest = await req.json();

    // Input validation
    if (typeof email !== "string" || email.length > 255 || !EMAIL_REGEX.test(email.trim())) {
      return new Response(
        JSON.stringify({ error: "Invalid email format" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }
    const cleanEmail = email.trim().toLowerCase();

    // Rate limiting
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      req.headers.get("cf-connecting-ip") ||
      "unknown";
    if (isRateLimited(ipHits, ip, MAX_PER_IP) || isRateLimited(emailHits, cleanEmail, MAX_PER_EMAIL)) {
      console.warn("Rate limit hit for password reset", { ip, email: cleanEmail });
      // Return generic success to avoid leaking rate-limit state
      return genericSuccess();
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const resendApiKey = Deno.env.get("RESEND_API_KEY");

    if (!resendApiKey) {
      console.error("RESEND_API_KEY is not configured");
      return new Response(
        JSON.stringify({ error: "Email service not configured" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    // Generate a password reset link using admin API
    const { data, error } = await supabaseAdmin.auth.admin.generateLink({
      type: "recovery",
      email: cleanEmail,
      options: {
        redirectTo: redirectTo || "https://armanhamrah.lovable.app/admin/reset-password",
      },
    });

    if (error) {
      // Do not reveal whether email exists; log server-side and return generic success
      console.error("Error generating reset link:", error);
      return genericSuccess();
    }

    // The generated link from Supabase admin API
    const resetLink = data?.properties?.action_link;

    if (!resetLink) {
      console.error("No reset link generated");
      return genericSuccess();
    }

    console.log("Generated reset link for:", cleanEmail);

    // Send email via Resend
    const resend = new Resend(resendApiKey);

    const emailResponse = await resend.emails.send({
      from: "Arman Hamrah <noreply@resend.dev>",
      to: [cleanEmail],
      subject: "بازیابی رمز عبور - آرمان همراه",
      html: `
        <!DOCTYPE html>
        <html dir="rtl" lang="fa">
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Tahoma, Arial, sans-serif; background-color: #f5f5f5; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; padding: 40px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
            .logo { text-align: center; margin-bottom: 30px; }
            h1 { color: #333; font-size: 24px; margin-bottom: 20px; text-align: center; }
            p { color: #666; line-height: 1.8; font-size: 16px; }
            .button { display: inline-block; background: linear-gradient(135deg, #d4af37, #f4d03f); color: #000; padding: 15px 40px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; }
            .button-container { text-align: center; }
            .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #999; font-size: 12px; text-align: center; }
            .link { word-break: break-all; color: #d4af37; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="logo">
              <h1>🔐 بازیابی رمز عبور</h1>
            </div>
            <p>سلام،</p>
            <p>درخواست بازیابی رمز عبور برای حساب کاربری شما دریافت شد. برای تنظیم رمز عبور جدید روی دکمه زیر کلیک کنید:</p>
            <div class="button-container">
              <a href="${resetLink}" class="button">تنظیم رمز عبور جدید</a>
            </div>
            <p>اگر دکمه بالا کار نکرد، لینک زیر را در مرورگر باز کنید:</p>
            <p class="link">${resetLink}</p>
            <p>⚠️ این لینک تا ۱ ساعت معتبر است.</p>
            <p>اگر شما این درخواست را نداده‌اید، این ایمیل را نادیده بگیرید.</p>
            <div class="footer">
              <p>آرمان همراه - واردکننده لوازم جانبی موبایل</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(
      JSON.stringify({ success: true, message: "Password reset email sent via Resend" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-password-reset function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
