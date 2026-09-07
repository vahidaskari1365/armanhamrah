export type ServiceFormType = "survey" | "complaint";

export interface ServiceFormSubmission {
  formType: ServiceFormType;
  data: Record<string, unknown>;
  /** A visually hidden honeypot field. It should always be empty for people. */
  website?: string;
}

export type ServiceFormErrorKind = "validation" | "rate-limit" | "delivery";

export class ServiceFormError extends Error {
  readonly kind: ServiceFormErrorKind;
  /** Server-provided, user-safe message (Persian validation text), when available. */
  readonly detail?: string;

  constructor(kind: ServiceFormErrorKind, detail?: string) {
    super(detail || kind);
    this.name = "ServiceFormError";
    this.kind = kind;
    this.detail = detail;
  }
}

interface ServiceFormResponse {
  success?: boolean;
  message?: string;
}

const REQUEST_TIMEOUT_MS = 25_000;

// The production site is deployed to PHP hosting through the repository's
// FarazNet workflow. Keeping this endpoint relative means customer data is
// posted only to armanhamrah.com, rather than to a browser-exposed mail API.
const primaryEndpoint =
  import.meta.env.VITE_SERVICE_FORM_ENDPOINT || "/api/submit-service-form.php";

// Backup delivery path for when the PHP host cannot send mail (disabled
// sendmail, local-mail misrouting, Vercel previews without PHP, ...). It uses
// the Supabase Edge Function of the same name, which mirrors the validation
// below and delivers through Resend. Only the publishable key is exposed.
const supabaseUrl =
  (import.meta.env.VITE_SUPABASE_URL as string | undefined) || "";
const fallbackEndpoint =
  (import.meta.env.VITE_SERVICE_FORM_FALLBACK_ENDPOINT as
    | string
    | undefined) ||
  (supabaseUrl
    ? `${supabaseUrl.replace(/\/$/, "")}/functions/v1/submit-service-form`
    : "");
const supabaseAnonKey =
  (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined) || "";

function containsPersianText(value: string): boolean {
  return /[\u0600-\u06FF]/.test(value);
}

async function postJson(
  url: string,
  payload: ServiceFormSubmission,
  headers: Record<string, string>,
): Promise<{ status: number; result: ServiceFormResponse | undefined }> {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...headers,
      },
      credentials: url.startsWith("/") ? "same-origin" : "omit",
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    let result: ServiceFormResponse | undefined;
    try {
      result = (await response.json()) as ServiceFormResponse;
    } catch {
      result = undefined;
    }

    return { status: response.status, result };
  } finally {
    window.clearTimeout(timeout);
  }
}

/**
 * Maps one attempt to either success (returns) or a classified error (throws).
 * Only Persian server messages are surfaced to customers; anything else falls
 * back to the generic localized UI copy with the support phone number.
 */
function assertSuccess(
  status: number,
  result: ServiceFormResponse | undefined,
): void {
  if (status >= 200 && status < 300 && result?.success) {
    return;
  }

  if (status === 400 && result?.message && containsPersianText(result.message)) {
    throw new ServiceFormError("validation", result.message);
  }

  if (status === 429) {
    throw new ServiceFormError("rate-limit");
  }

  throw new ServiceFormError("delivery", undefined);
}

/**
 * Sends a completed customer-service form to the same-origin server-side mail
 * handler. The recipient address and any mail configuration remain on the host.
 * When the primary handler is unreachable or cannot deliver, the submission is
 * retried once through the Supabase Edge Function fallback (if configured).
 */
export async function submitServiceForm(
  submission: ServiceFormSubmission,
): Promise<void> {
  const payload: ServiceFormSubmission = {
    formType: submission.formType,
    data: submission.data,
    website: submission.website ?? "",
  };

  let primaryFailure: unknown;
  try {
    const { status, result } = await postJson(primaryEndpoint, payload, {});
    assertSuccess(status, result);
    return;
  } catch (error) {
    // Validation and rate-limit answers are authoritative: retrying them
    // through the fallback would only repeat the same rejection (or bypass
    // abuse protection), so surface them directly.
    if (
      error instanceof ServiceFormError &&
      (error.kind === "validation" || error.kind === "rate-limit")
    ) {
      throw error;
    }
    primaryFailure = error;
  }

  if (!fallbackEndpoint) {
    throw primaryFailure instanceof Error
      ? primaryFailure
      : new ServiceFormError("delivery");
  }

  try {
    const { status, result } = await postJson(fallbackEndpoint, payload, {
      ...(supabaseAnonKey
        ? {
            apikey: supabaseAnonKey,
            Authorization: `Bearer ${supabaseAnonKey}`,
          }
        : {}),
    });
    assertSuccess(status, result);
  } catch (error) {
    if (error instanceof ServiceFormError) {
      throw error;
    }
    throw new ServiceFormError("delivery");
  }
}
