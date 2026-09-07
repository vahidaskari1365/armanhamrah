import { type FormEvent, type CSSProperties, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  LoaderCircle,
  LockKeyhole,
  Send,
  Star,
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
type SurveyRatingKey =
  | "acceptanceTime"
  | "repairTime"
  | "serviceCost"
  | "staffBehavior"
  | "repairUpdates"
  | "serviceCenterAccess"
  | "issueResolution";

type SurveyRatings = Record<SurveyRatingKey, string>;

type SurveyFormState = {
  customerName: string;
  warrantyNumber: string;
  mobile: string;
  suggestions: string;
  website: string;
};

const satisfactionOptions = [
  { value: "very-poor", label: { fa: "بسیار ضعیف", en: "Very poor" } },
  { value: "poor", label: { fa: "ضعیف", en: "Poor" } },
  { value: "average", label: { fa: "متوسط", en: "Average" } },
  { value: "good", label: { fa: "خوب", en: "Good" } },
  { value: "excellent", label: { fa: "عالی", en: "Excellent" } },
] satisfies Array<{ value: string; label: LocalizedText }>;

const resolutionOptions = [
  { value: "very-low", label: { fa: "خیلی کم", en: "Very low" } },
  { value: "low", label: { fa: "کم", en: "Low" } },
  { value: "average", label: { fa: "متوسط", en: "Average" } },
  { value: "high", label: { fa: "زیاد", en: "High" } },
  { value: "very-high", label: { fa: "خیلی زیاد", en: "Very high" } },
] satisfies Array<{ value: string; label: LocalizedText }>;

const surveyQuestions: Array<{
  key: SurveyRatingKey;
  title: LocalizedText;
  options: typeof satisfactionOptions | typeof resolutionOptions;
}> = [
  {
    key: "acceptanceTime",
    title: {
      fa: "از مدت زمان سپری‌شده برای پذیرش دستگاهتان چقدر رضایت دارید؟",
      en: "How satisfied are you with the time taken to accept your device?",
    },
    options: satisfactionOptions,
  },
  {
    key: "repairTime",
    title: {
      fa: "از مدت زمان تعمیرات و تحویل دستگاه چقدر رضایت داشتید؟",
      en: "How satisfied are you with the repair and delivery time?",
    },
    options: satisfactionOptions,
  },
  {
    key: "serviceCost",
    title: {
      fa: "رضایت شما از هزینه‌های پرداختی نسبت به خدمات ارائه‌شده چقدر است؟",
      en: "How satisfied are you with the cost in relation to the service provided?",
    },
    options: satisfactionOptions,
  },
  {
    key: "staffBehavior",
    title: {
      fa: "از رفتار و برخورد پرسنل به چه میزان رضایت دارید؟",
      en: "How satisfied are you with our team's attitude and conduct?",
    },
    options: satisfactionOptions,
  },
  {
    key: "repairUpdates",
    title: {
      fa: "از اطلاع‌رسانی درباره روند تعمیر دستگاهتان چقدر رضایت دارید؟",
      en: "How satisfied are you with updates about your repair?",
    },
    options: satisfactionOptions,
  },
  {
    key: "serviceCenterAccess",
    title: {
      fa: "میزان رضایت شما از دسترسی به این مرکز خدمات چقدر است؟",
      en: "How satisfied are you with access to our service center?",
    },
    options: satisfactionOptions,
  },
  {
    key: "issueResolution",
    title: {
      fa: "آیا ایرادات ثبت‌شده به‌صورت کامل رفع گردید؟",
      en: "To what extent were the registered issues resolved?",
    },
    options: resolutionOptions,
  },
];

const emptyRatings = (): SurveyRatings => ({
  acceptanceTime: "",
  repairTime: "",
  serviceCost: "",
  staffBehavior: "",
  repairUpdates: "",
  serviceCenterAccess: "",
  issueResolution: "",
});

const emptyForm = (): SurveyFormState => ({
  customerName: "",
  warrantyNumber: "",
  mobile: "",
  suggestions: "",
  website: "",
});

const CustomerSurveyPageContent = () => {
  const { language } = useLanguage();
  const isFa = language === "fa";
  const text = (value: LocalizedText) => (isFa ? value.fa : value.en);
  const [form, setForm] = useState<SurveyFormState>(emptyForm);
  const [ratings, setRatings] = useState<SurveyRatings>(emptyRatings);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionState, setSubmissionState] = useState<"idle" | "success" | "error">("idle");

  const updateForm = (field: keyof SurveyFormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    if (submissionState !== "idle") setSubmissionState("idle");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmissionState("idle");
    setIsSubmitting(true);

    try {
      await submitServiceForm({
        formType: "survey",
        data: {
          customerName: form.customerName,
          warrantyNumber: form.warrantyNumber,
          mobile: form.mobile,
          suggestions: form.suggestions,
          ratings,
        },
        website: form.website,
      });

      setForm(emptyForm());
      setRatings(emptyRatings());
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
                <ClipboardList size={17} />
                {isFa ? "صدای شما برای ما ارزشمند است" : "Your feedback matters to us"}
              </div>
              <h1 className="warranty-title mb-4 text-3xl leading-tight text-white md:text-5xl">
                {isFa ? "فرم نظرسنجی مشتریان" : "Customer Satisfaction Survey"}
              </h1>
              <p className="max-w-2xl text-base leading-8 text-zinc-200 md:text-lg">
                {isFa
                  ? "با تکمیل این پرسشنامه، ما را در بهبود کیفیت خدمات پس از فروش یاری می‌کنید. تکمیل فرم فقط چند دقیقه زمان می‌برد."
                  : "Your answers help us improve our after-sales service. Completing this form takes only a few minutes."}
              </p>
            </motion.div>
          </div>
        </section>

        <section className="px-4 py-12 md:px-8 md:py-16">
          <div className="container-custom max-w-5xl">
            <div className="mb-8 grid gap-4 md:grid-cols-2">
              <div className="flex gap-4 rounded-2xl border border-primary/15 bg-card p-5 shadow-card">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <ClipboardList size={21} />
                </div>
                <div>
                  <h2 className="warranty-title mb-1 text-base text-foreground">
                    {isFa ? "راهنمای تکمیل فرم" : "How to complete the form"}
                  </h2>
                  <p className="text-sm leading-7 text-muted-foreground warranty-text">
                    {isFa
                      ? "لطفاً تجربه اخیر خود از خدمات پس از فروش آرمان همراه را با دقت ارزیابی کنید."
                      : "Please evaluate your most recent after-sales service experience with Arman Hamrah."}
                  </p>
                </div>
              </div>
              <div className="flex gap-4 rounded-2xl border border-primary/15 bg-card p-5 shadow-card">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <LockKeyhole size={21} />
                </div>
                <div>
                  <h2 className="warranty-title mb-1 text-base text-foreground">
                    {isFa ? "حفظ حریم خصوصی" : "Privacy"}
                  </h2>
                  <p className="text-sm leading-7 text-muted-foreground warranty-text">
                    {isFa
                      ? "اطلاعات فرم فقط برای پیگیری و ارتقای کیفیت خدمات استفاده می‌شود."
                      : "Your information is used only for follow-up and service-quality improvement."}
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
                  {isFa ? "پرسشنامه خدمات پس از فروش" : "After-Sales Service Questionnaire"}
                </h2>
                <p className="mt-2 text-sm leading-7 text-muted-foreground warranty-text">
                  {isFa ? "فیلدهای دارای ستاره الزامی هستند." : "Fields marked with an asterisk are required."}
                </p>
              </div>

              <div className="space-y-10 px-5 py-7 md:px-8 md:py-9">
                <section aria-labelledby="survey-customer-information">
                  <div className="mb-5 flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-black text-primary-foreground">۱</span>
                    <h3 id="survey-customer-information" className="warranty-title text-lg text-foreground">
                      {isFa ? "اطلاعات مشتری" : "Customer information"}
                    </h3>
                  </div>
                  <div className="grid gap-5 md:grid-cols-3">
                    <div>
                      <label htmlFor="survey-customer-name" className="mb-2 block text-sm font-bold text-foreground warranty-text">
                        {isFa ? "نام و نام خانوادگی / نام شرکت" : "Full name / company name"} <span className="text-destructive">*</span>
                      </label>
                      <input
                        id="survey-customer-name"
                        name="customerName"
                        value={form.customerName}
                        onChange={(event) => updateForm("customerName", event.target.value)}
                        required
                        maxLength={150}
                        autoComplete="name"
                        placeholder={isFa ? "نام خود را وارد کنید" : "Enter your name"}
                        className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    <div>
                      <label htmlFor="survey-warranty-number" className="mb-2 block text-sm font-bold text-foreground warranty-text">
                        {isFa ? "شماره گارانتی / پذیرش" : "Warranty / receipt number"} <span className="text-destructive">*</span>
                      </label>
                      <input
                        id="survey-warranty-number"
                        name="warrantyNumber"
                        value={form.warrantyNumber}
                        onChange={(event) => updateForm("warrantyNumber", event.target.value)}
                        required
                        maxLength={100}
                        placeholder={isFa ? "مثال: ۱۲۳۴۵۶" : "Example: 123456"}
                        className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                        dir="ltr"
                      />
                    </div>
                    <div>
                      <label htmlFor="survey-mobile" className="mb-2 block text-sm font-bold text-foreground warranty-text">
                        {isFa ? "تلفن همراه" : "Mobile number"} <span className="text-destructive">*</span>
                      </label>
                      <input
                        id="survey-mobile"
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
                  </div>
                </section>

                <section aria-labelledby="survey-rating-title">
                  <div className="mb-5 flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-black text-primary-foreground">۲</span>
                    <div>
                      <h3 id="survey-rating-title" className="warranty-title text-lg text-foreground">
                        {isFa ? "ارزیابی تجربه شما" : "Your experience"}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground warranty-text">
                        {isFa ? "برای هر مورد، یک گزینه را انتخاب کنید." : "Select one answer for each item."}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {surveyQuestions.map((question, index) => (
                      <fieldset key={question.key} className="rounded-2xl border border-border bg-background p-4 md:p-5">
                        <legend className="w-full px-0">
                          <span className="flex items-start gap-3 text-sm font-bold leading-7 text-foreground warranty-text">
                            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-black text-primary">
                              {index + 1}
                            </span>
                            {text(question.title)} <span className="text-destructive">*</span>
                          </span>
                        </legend>
                        <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-5">
                          {question.options.map((option) => {
                            const isSelected = ratings[question.key] === option.value;
                            const id = `survey-${question.key}-${option.value}`;
                            return (
                              <label
                                key={option.value}
                                htmlFor={id}
                                className={`flex min-h-14 cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border px-2 py-2 text-center text-xs font-bold transition-all ${
                                  isSelected
                                    ? "border-primary bg-primary text-primary-foreground shadow-sm"
                                    : "border-border bg-card text-foreground hover:border-primary/60 hover:bg-primary/5"
                                }`}
                              >
                                <input
                                  id={id}
                                  name={question.key}
                                  type="radio"
                                  value={option.value}
                                  checked={isSelected}
                                  onChange={() => {
                                    setRatings((current) => ({ ...current, [question.key]: option.value }));
                                    if (submissionState !== "idle") setSubmissionState("idle");
                                  }}
                                  required
                                  className="sr-only"
                                />
                                <Star size={14} className={isSelected ? "fill-current" : "text-primary"} aria-hidden="true" />
                                <span>{text(option.label)}</span>
                              </label>
                            );
                          })}
                        </div>
                      </fieldset>
                    ))}
                  </div>
                </section>

                <section aria-labelledby="survey-suggestion-title">
                  <div className="mb-5 flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-black text-primary-foreground">۳</span>
                    <h3 id="survey-suggestion-title" className="warranty-title text-lg text-foreground">
                      {isFa ? "پیشنهاد و انتقاد" : "Suggestions and feedback"}
                    </h3>
                  </div>
                  <label htmlFor="survey-suggestions" className="mb-2 block text-sm font-bold text-foreground warranty-text">
                    {isFa
                      ? "برای ارائه بهتر خدمات از سوی این شرکت چه پیشنهاد یا انتقادی دارید؟"
                      : "What suggestions or feedback do you have to help us improve?"} <span className="text-destructive">*</span>
                  </label>
                  <textarea
                    id="survey-suggestions"
                    name="suggestions"
                    value={form.suggestions}
                    onChange={(event) => updateForm("suggestions", event.target.value)}
                    required
                    minLength={3}
                    maxLength={4000}
                    rows={6}
                    placeholder={isFa ? "نظر خود را اینجا بنویسید..." : "Write your feedback here..."}
                    className="w-full resize-y rounded-xl border border-border bg-background px-4 py-3 text-sm leading-7 text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </section>

                {/* Keep the anti-spam honeypot out of layout: off-screen positioning causes overflow in RTL. */}
                <div hidden aria-hidden="true">
                  <label htmlFor="survey-website">Website</label>
                  <input
                    id="survey-website"
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
                          ? "سپاسگزاریم. نظرسنجی شما با موفقیت برای واحد خدمات پس از فروش ارسال شد."
                          : "Thank you. Your survey has been sent successfully to our after-sales team."}
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
                      ? "ارسال نظرسنجی"
                      : "Send survey"}
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

const CustomerSurveyPage = () => (
  <HelmetProvider>
    <ThemeProvider>
      <LanguageProvider>
        <SEO
          title="نظرسنجی مشتریان خدمات پس از فروش | آرمان همراه"
          description="فرم نظرسنجی مشتریان خدمات پس از فروش آرمان همراه برای بهبود کیفیت پشتیبانی و تعمیرات."
          noIndex
        />
        <CustomerSurveyPageContent />
      </LanguageProvider>
    </ThemeProvider>
  </HelmetProvider>
);

export default CustomerSurveyPage;
