import type { ServiceFormError } from "@/lib/serviceForm";

const SUPPORT_PHONE_HREF = "tel:02158798";
const SUPPORT_PHONE_FA = "۰۲۱-۵۸۷۹۸";
const SUPPORT_PHONE_EN = "021-58798";

interface SubmitErrorAlertProps {
  language: "fa" | "en";
  error: ServiceFormError | null;
}

/**
 * Failure notice for the customer-service forms. The support number is wrapped
 * in an explicit LTR link: Persian digits with an ASCII hyphen get reordered by
 * the Unicode bidirectional algorithm inside RTL sentences (rendering as
 * "-۰۲۱۵۸۷۹۸"), so the isolation below keeps it as ۰۲۱-۵۸۷۹۸ and tappable.
 */
const SubmitErrorAlert = ({ language, error }: SubmitErrorAlertProps) => {
  const isFa = language === "fa";

  if (error?.kind === "validation" && error.detail) {
    return (
      <div
        role="alert"
        className="rounded-2xl border border-destructive/40 bg-destructive/10 p-4 text-sm font-bold leading-7 text-destructive warranty-text"
      >
        {error.detail}
      </div>
    );
  }

  const phoneLink = (
    <a
      href={SUPPORT_PHONE_HREF}
      dir="ltr"
      className="mx-1 inline-block whitespace-nowrap underline underline-offset-4 hover:opacity-80"
    >
      {isFa ? SUPPORT_PHONE_FA : SUPPORT_PHONE_EN}
    </a>
  );

  return (
    <div
      role="alert"
      className="rounded-2xl border border-destructive/40 bg-destructive/10 p-4 text-sm font-bold leading-7 text-destructive warranty-text"
    >
      {isFa ? (
        error?.kind === "rate-limit" ? (
          <>
            درخواست‌های شما بیش از حد مجاز است. لطفاً چند دقیقه دیگر دوباره تلاش
            کنید یا با شماره {phoneLink} تماس بگیرید.
          </>
        ) : (
          <>
            ارسال فرم انجام نشد. لطفاً چند لحظه دیگر دوباره تلاش کنید یا با شماره{" "}
            {phoneLink} تماس بگیرید.
          </>
        )
      ) : error?.kind === "rate-limit" ? (
        <>
          Too many attempts. Please try again in a few minutes or call{" "}
          {phoneLink}.
        </>
      ) : (
        <>
          We could not send the form. Please try again in a moment or call{" "}
          {phoneLink}.
        </>
      )}
    </div>
  );
};

export default SubmitErrorAlert;
