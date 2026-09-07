export type ServiceFormType = "survey" | "complaint";

export interface ServiceFormSubmission {
  formType: ServiceFormType;
  data: Record<string, unknown>;
  /** A visually hidden honeypot field. It should always be empty for people. */
  website?: string;
}

interface ServiceFormResponse {
  success?: boolean;
  message?: string;
}

// The production site is deployed to PHP hosting through the repository's
// FarazNet workflow. Keeping this endpoint relative means customer data is
// posted only to armanhamrah.com, rather than to a browser-exposed mail API.
const formEndpoint = import.meta.env.VITE_SERVICE_FORM_ENDPOINT || "/api/submit-service-form.php";

/**
 * Sends a completed customer-service form to the same-origin server-side mail
 * handler. The recipient address and any mail configuration remain on the host.
 */
export async function submitServiceForm({
  formType,
  data,
  website = "",
}: ServiceFormSubmission): Promise<void> {
  const response = await fetch(formEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    credentials: "same-origin",
    body: JSON.stringify({ formType, data, website }),
  });

  let result: ServiceFormResponse | undefined;
  try {
    result = (await response.json()) as ServiceFormResponse;
  } catch {
    throw new Error("The form endpoint returned an invalid response");
  }

  if (!response.ok || !result?.success) {
    throw new Error(result?.message || "Unable to submit service form");
  }
}
