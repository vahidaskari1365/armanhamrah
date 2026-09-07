import { type CSSProperties, type FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  ClipboardPenLine,
  FileText,
  LoaderCircle,
  LockKeyhole,
  Send,
} from "lucide-react";
import { HelmetProvider } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import pageBg from "@/assets/page-bg.jpeg";
import { submitServiceForm } from "@/lib/serviceForm";

type LocalizedText = { fa: string; en: string };

type ComplaintFormState = {
  receiptNumber: string;
  firstName: string;
  lastName: string;
  province: string;
  city: string;
  mobile: string;
  email: string;
  description: string;
  expertOpinion: string;
  website: string;
};

const complaintCategories = [
  {
    value: "device-issues",
    label: { fa: "مشکلات ظاهری و فنی دستگاه", en: "Device appearance or technical issues" },
  },
  {
    value: "technician-behavior",
    label: { fa: "نحوه برخورد سرویس‌کار", en: "Technician's conduct" },
  },
  {
    value: "response-time",
    label: { fa: "مدت زمان پاسخگویی تا اجرای فاکتور", en: "Response time until service execution" },
  },
  {
    value: "technical-knowledge",
    label: { fa: "میزان دانش فنی سرویس‌کار در ارائه خدمات", en: "Technician's technical knowledge" },
  },
  {
    value: "payment-request",
    label: { fa: "دریافت وجه توسط سرویس‌کار", en: "Payment requested by technician" },
  },
  {
    value: "late-service",
    label: { fa: "عدم حضور به‌موقع یا تأخیر در انجام خدمت", en: "Late arrival or delayed service" },
  },
  {
    value: "insufficient-explanation",
    label: {
      fa: "عدم ارائه سرویس یا توضیحات کافی درباره عملکرد دستگاه",
      en: "Insufficient service or explanation of device operation",
    },
  },
] satisfies Array<{ value: string; label: LocalizedText }>;

const emptyForm = (): ComplaintFormState => ({
  receiptNumber: "",
  firstName: "",
  lastName: "",
  province: "",
  city: "",
  mobile: "",
  email: "",
  description: "",
  expertOpinion: "",
  website: "",
});

const CustomerComplaintPageContent = () => {
  const { language } = useLanguage();
  const isFa = language === "fa";
  const text = (value: LocalizedText) => (isFa ? value.fa : value.en);
  const [form, setForm] = useState<ComplaintFormState>(emptyForm);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [clientError, setClientError] = useState("");
  const [submissionState, setSubmissionState] = useState<"idle" | "success" | "error">("idle");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateForm = (field: keyof ComplaintFormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    if (submissionState !== "idle") setSubmissionState("idle");
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories((current) =>
      current.includes(category)
        ? current.filter((selected) => selected !== category)
        : [...current, category],
    );
    setClientError("");
    if (submissionState !== "idle") setSubmissionState("idle");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmissionState("idle");

    if (!selectedCategories.length) {
      setClientError(
        isFa ? "لطفاً حداقل یک مورد از مصادیق شکایت را انتخاب کنید." : "Please select at least one complaint category.",
      );
      document.getElementById("complaint-categories")?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setClientError("");
    setIsSubmitting(true);

    try {
      await submitServiceForm({
        formType: "complaint",
        data: {
          receiptNumber: form.receiptNumber,
          firstName: form.firstName,
          lastName: form.lastName,
          province: form.province,
          city: form.city,
          mobile: form.mobile,
          email: form.email,
          complaintTypes: selectedCategories,
          description: form.description,
          expertOpinion: form.expertOpinion,
        },
        website: form.website,
      });

      setForm(emptyForm());
      setSelectedCategories([]);
      setSubmissionState("success");
    } catch {
      setSubmissionState("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="page-background bg-background admin-toolbar-offset"
      style={{ "--page-bg-image": `url(${pageBg})` } as CSSProperties}
      dir={isFa ? "rtl" : "ltr"}
    >
      <Navbar />
      <main className="pt-20">
        <section className="border-b border-border bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-800 py-14 text-white md:py-20">
          <div className="container-custom px-4 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="max-w-3xl"
            >
              <Link
                to="/warranty"
                className="mb-7 inline-flex items-center gap-2 text-sm font-semibold text-zinc-300 transition-colors hover:text-white"
              >
                <ArrowRight size={18} className={isFa ? "" : "rotate-180"} />
                {isFa ? "بازگشت به صفحه گارانتی" : "Back to warranty"}
              </Link>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-orange-300/30 bg-orange-400/10 px-4 py-2 text-sm font-bold text-orange-100">
                <AlertTriangle size={17} />
                {isFa ? "رسیدگی دقیق و محرمانه" : "Confidential, careful follow-up"}
              </div>
              <h1 className="warranty-title mb-4 text-3xl leading-tight text-white md:text-5xl">
                {isFa ? "فرم رسیدگی به شکایت مشتریان" : "Customer Complaint Form"}
              </h1>
              <p className="max-w-2xl text-base leading-8 text-zinc-200 md:text-lg">
                {isFa
                  ? "موضوع شکایت خود را با جزئیات ثبت کنید تا واحد مربوطه آن را پیگیری و پاسخ مناسب را ارائه کند."
                  : "Share the details of your complaint so the appropriate team can follow up and respond."}
              </p>
            </motion.div>
          </div>
        </section>

        <section className="px-4 py-12 md:px-8 md:py-16">
          <div className="container-custom max-w-5xl">
            <div className="mb-8 grid gap-4 md:grid-cols-2">
              <div className="flex gap-4 rounded-2xl border border-primary/15 bg-card p-5 shadow-card">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <ClipboardPenLine size={21} />
                </div>
                <div>
                  <h2 className="warranty-title mb-1 text-base text-foreground">
                    {isFa ? "ثبت شفاف موضوع" : "Describe the issue clearly"}
                  </h2>
                  <p className="text-sm leading-7 text-muted-foreground warranty-text">
                    {isFa
                      ? "اطلاعات دقیق، شماره پذیرش و شرح کامل موضوع به پیگیری سریع‌تر کمک می‌کند."
                      : "Clear details, your receipt number, and a full description help us follow up faster."}
                  </p>
                </div>
              </div>
              <div className="flex gap-4 rounded-2xl border border-primary/15 bg-card p-5 shadow-card">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <LockKeyhole size={21} />
                </div>
                <div>
                  <h2 className="warranty-title mb-1 text-base text-foreground">
                    {isFa ? "اطلاعات محرمانه" : "Private information"}
                  </h2>
                  <p className="text-sm leading-7 text-muted-foreground warranty-text">
                    {isFa
                      ? "اطلاعات شما فقط در اختیار واحد رسیدگی به شکایات آرمان همراه قرار می‌گیرد."
                      : "Your information is shared only with Arman Hamrah's complaint-resolution team."}
                  </p>
                </div>
              </div>
            </div>

            <motion.form
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.08 }}
              onSubmit={handleSubmit}
              className="overflow-hidden rounded-3xl border border-border bg-card shadow-elegant"
            >
              <div className="border-b border-border bg-secondary/60 px-5 py-6 md:px-8">
                <h2 className="warranty-title text-2xl text-foreground">
                  {isFa ? "اطلاعات شکایت" : "Complaint details"}
                </h2>
                <p className="mt-2 text-sm leading-7 text-muted-foreground warranty-text">
                  {isFa ? "فیلدهای دارای ستاره الزامی هستند." : "Fields marked with an asterisk are required."}
                </p>
              </div>

              <div className="space-y-10 px-5 py-7 md:px-8 md:py-9">
                <section aria-labelledby="complaint-customer-information">
                  <div className="mb-5 flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-black text-primary-foreground">۱</span>
                    <h3 id="complaint-customer-information" className="warranty-title text-lg text-foreground">
                      {isFa ? "اطلاعات مراجعه‌کننده" : "Customer information"}
                    </h3>
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
                    <div>
                      <label htmlFor="complaint-receipt-number" className="mb-2 block text-sm font-bold text-foreground warranty-text">
                        {isFa ? "شماره قبض پذیرش / شماره کارت گارانتی" : "Receipt / warranty card number"} <span className="text-destructive">*</span>
                      </label>
                      <input
                        id="complaint-receipt-number"
                        name="receiptNumber"
                        value={form.receiptNumber}
                        onChange={(event) => updateForm("receiptNumber", event.target.value)}
                        required
                        maxLength={100}
                        placeholder={isFa ? "شماره پذیرش یا گارانتی" : "Receipt or warranty number"}
                        className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                        dir="ltr"
                      />
                    </div>
                    <div>
                      <label htmlFor="complaint-mobile" className="mb-2 block text-sm font-bold text-foreground warranty-text">
                        {isFa ? "تلفن همراه" : "Mobile number"} <span className="text-destructive">*</span>
                      </label>
                      <input
                        id="complaint-mobile"
                        name="mobile"
                        type="tel"
                        inputMode="tel"
                        value={form.mobile}
                        onChange={(event) => updateForm("mobile", event.target.value)}
                        required
                        minLength={8}
                        maxLength={30}
                        autoComplete="tel"
                        placeholder="۰۹۱۲۱۲۳۴۵۶۷"
                        className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                        dir="ltr"
                      />
                    </div>
                    <div>
                      <label htmlFor="complaint-first-name" className="mb-2 block text-sm font-bold text-foreground warranty-text">
                        {isFa ? "نام" : "First name"}
                      </label>
                      <input
                        id="complaint-first-name"
                        name="firstName"
                        value={form.firstName}
                        onChange={(event) => updateForm("firstName", event.target.value)}
                        maxLength={80}
                        autoComplete="given-name"
                        placeholder={isFa ? "نام" : "First name"}
                        className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    <div>
                      <label htmlFor="complaint-last-name" className="mb-2 block text-sm font-bold text-foreground warranty-text">
                        {isFa ? "نام خانوادگی" : "Last name"} <span className="text-destructive">*</span>
                      </label>
                      <input
                        id="complaint-last-name"
                        name="lastName"
                        value={form.lastName}
                        onChange={(event) => updateForm("lastName", event.target.value)}
                        required
                        maxLength={100}
                        autoComplete="family-name"
                        placeholder={isFa ? "نام خانوادگی" : "Last name"}
                        className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    <div>
                      <label htmlFor="complaint-province" className="mb-2 block text-sm font-bold text-foreground warranty-text">
                        {isFa ? "استان" : "Province"} <span className="text-destructive">*</span>
                      </label>
                      <input
                        id="complaint-province"
                        name="province"
                        value={form.province}
                        onChange={(event) => updateForm("province", event.target.value)}
                        required
                        maxLength={100}
                        autoComplete="address-level1"
                        placeholder={isFa ? "استان محل سکونت" : "Province"}
                        className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    <div>
                      <label htmlFor="complaint-city" className="mb-2 block text-sm font-bold text-foreground warranty-text">
                        {isFa ? "شهرستان" : "City"} <span className="text-destructive">*</span>
                      </label>
                      <input
                        id="complaint-city"
                        name="city"
                        value={form.city}
                        onChange={(event) => updateForm("city", event.target.value)}
                        required
                        maxLength={100}
                        autoComplete="address-level2"
                        placeholder={isFa ? "شهرستان محل سکونت" : "City"}
                        className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="complaint-email" className="mb-2 block text-sm font-bold text-foreground warranty-text">
                        {isFa ? "ایمیل" : "Email"} <span className="text-muted-foreground">({isFa ? "اختیاری" : "optional"})</span>
                      </label>
                      <input
                        id="complaint-email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={(event) => updateForm("email", event.target.value)}
                        maxLength={255}
                        autoComplete="email"
                        placeholder="example@email.com"
                        className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                        dir="ltr"
                      />
                    </div>
                  </div>
                </section>

                <section aria-labelledby="complaint-categories-title">
                  <div className="mb-5 flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-black text-primary-foreground">۲</span>
                    <div>
                      <h3 id="complaint-categories-title" className="warranty-title text-lg text-foreground">
                        {isFa ? "مصادیق شکایت" : "Complaint category"} <span className="text-destructive">*</span>
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground warranty-text">
                        {isFa ? "یک یا چند مورد را انتخاب کنید." : "Select one or more items."}
                      </p>
                    </div>
                  </div>

                  <div
                    id="complaint-categories"
                    className={`grid gap-3 sm:grid-cols-2 ${clientError ? "rounded-2xl outline outline-2 outline-destructive/60 outline-offset-4" : ""}`}
                    aria-describedby={clientError ? "complaint-category-error" : undefined}
                  >
                    {complaintCategories.map((category) => {
                      const isSelected = selectedCategories.includes(category.value);
                      const id = `complaint-category-${category.value}`;
                      return (
                        <label
                          key={category.value}
                          htmlFor={id}
                          className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 text-sm font-bold leading-6 transition-all warranty-text ${
                            isSelected
                              ? "border-primary bg-primary text-primary-foreground shadow-sm"
                              : "border-border bg-background text-foreground hover:border-primary/60 hover:bg-primary/5"
                          }`}
                        >
                          <input
                            id={id}
                            name="complaintTypes"
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleCategory(category.value)}
                            className="mt-1 h-4 w-4 shrink-0 accent-current"
                          />
                          <span>{text(category.label)}</span>
                        </label>
                      );
                    })}
                  </div>
                  {clientError && (
                    <p id="complaint-category-error" role="alert" className="mt-4 text-sm font-bold text-destructive warranty-text">
                      {clientError}
                    </p>
                  )}
                </section>

                <section aria-labelledby="complaint-description-title">
                  <div className="mb-5 flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-black text-primary-foreground">۳</span>
                    <h3 id="complaint-description-title" className="warranty-title text-lg text-foreground">
                      {isFa ? "شرح موضوع" : "Complaint description"}
                    </h3>
                  </div>
                  <label htmlFor="complaint-description" className="mb-2 block text-sm font-bold text-foreground warranty-text">
                    {isFa
                      ? "شرح موضوع شکایت خود را با ذکر دقیق اطلاعات مهم مرقوم فرمایید"
                      : "Describe your complaint and include all relevant details"} <span className="text-destructive">*</span>
                  </label>
                  <textarea
                    id="complaint-description"
                    name="description"
                    value={form.description}
                    onChange={(event) => updateForm("description", event.target.value)}
                    required
                    minLength={10}
                    maxLength={5000}
                    rows={7}
                    placeholder={isFa ? "زمان مراجعه، نام دستگاه، شرح مشکل و اطلاعات مرتبط را بنویسید..." : "Include visit date, device information, issue details, and related information..."}
                    className="w-full resize-y rounded-xl border border-border bg-background px-4 py-3 text-sm leading-7 text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />

                  <label htmlFor="complaint-expert-opinion" className="mb-2 mt-6 block text-sm font-bold text-foreground warranty-text">
                    {isFa ? "نظر کارشناسی شرکت" : "Company expert opinion"} <span className="text-muted-foreground">({isFa ? "در صورت وجود" : "if available"})</span>
                  </label>
                  <textarea
                    id="complaint-expert-opinion"
                    name="expertOpinion"
                    value={form.expertOpinion}
                    onChange={(event) => updateForm("expertOpinion", event.target.value)}
                    maxLength={2000}
                    rows={4}
                    placeholder={isFa ? "در صورت دریافت نظر یا توضیح از کارشناس، اینجا بنویسید..." : "If you received an expert's explanation, write it here..."}
                    className="w-full resize-y rounded-xl border border-border bg-background px-4 py-3 text-sm leading-7 text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </section>

                {/* Honeypot: invisible to people, checked server-side to reduce automated submissions. */}
                <div className="absolute -left-[10000px] h-px w-px overflow-hidden" aria-hidden="true">
                  <label htmlFor="complaint-website">Website</label>
                  <input
                    id="complaint-website"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={form.website}
                    onChange={(event) => updateForm("website", event.target.value)}
                  />
                </div>

                <div aria-live="polite">
                  {submissionState === "success" && (
                    <div role="status" className="flex items-start gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-emerald-800 dark:text-emerald-200">
                      <CheckCircle2 size={21} className="mt-0.5 shrink-0" />
                      <p className="text-sm font-bold leading-7 warranty-text">
                        {isFa
                          ? "شکایت شما با موفقیت ثبت و برای واحد رسیدگی به شکایات ارسال شد."
                          : "Your complaint was submitted and sent to our complaint-resolution team."}
                      </p>
                    </div>
                  )}
                  {submissionState === "error" && (
                    <div role="alert" className="rounded-2xl border border-destructive/40 bg-destructive/10 p-4 text-sm font-bold leading-7 text-destructive warranty-text">
                      {isFa
                        ? "ارسال فرم انجام نشد. لطفاً چند لحظه دیگر دوباره تلاش کنید یا با شماره ۰۲۱-۵۸۷۹۸ تماس بگیرید."
                        : "We could not send the form. Please try again in a moment or call 021-58798."}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-gold flex min-h-14 w-full items-center justify-center gap-2 text-base disabled:cursor-not-allowed disabled:opacity-70"
                  aria-busy={isSubmitting}
                >
                  {isSubmitting ? <LoaderCircle className="animate-spin" size={20} /> : <Send size={19} />}
                  {isSubmitting
                    ? isFa
                      ? "در حال ارسال..."
                      : "Sending..."
                    : isFa
                      ? "ثبت و ارسال شکایت"
                      : "Submit complaint"}
                </button>
              </div>
            </motion.form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

const CustomerComplaintPage = () => (
  <HelmetProvider>
    <ThemeProvider>
      <LanguageProvider>
        <SEO
          title="فرم رسیدگی به شکایت مشتریان | آرمان همراه"
          description="فرم ثبت و پیگیری شکایت مشتریان خدمات پس از فروش آرمان همراه."
          noIndex
        />
        <CustomerComplaintPageContent />
      </LanguageProvider>
    </ThemeProvider>
  </HelmetProvider>
);

export default CustomerComplaintPage;
