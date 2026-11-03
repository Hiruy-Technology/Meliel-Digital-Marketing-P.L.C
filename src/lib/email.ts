// The email to Meliel about a new inquiry, sent through Resend after the visitor already has their
// thank-you page, so a slow or failing email never delays or loses an inquiry.

import { Resend } from "resend";
import { siteUrl } from "./site";

export type InquiryEmail = {
  id: number | string;
  type: "general" | "quote";
  locale: "en" | "am";
  name: string;
  company?: string;
  email: string;
  phone?: string;
  services: string[];
  selectedIncludes?: string[];
  budget?: string;
  timeline?: string;
  message?: string;
};

export type EmailStatus = "sent" | "failed" | "not-configured";

/** Until a domain is verified in Resend, its test sender is the only one allowed. */
const DEFAULT_FROM = "Meliel Website <onboarding@resend.dev>";

/** Gives up after this long, so a stuck request can't hang around. */
const TIMEOUT_MS = 15_000;

const recipients = () =>
  (process.env.INQUIRY_TO_EMAILS ?? "")
    .split(",")
    .map((address) => address.trim())
    .filter(Boolean);

/** Visitors type the name, so keep it to one plain line in the subject. */
const oneLine = (text: string) =>
  text
    .replace(/[\r\n\t]+/g, " ")
    .trim()
    .slice(0, 80);

export function inquiryText(inquiry: InquiryEmail): string {
  const row = (label: string, value?: string | string[]) => {
    const text = Array.isArray(value) ? value.join(", ") : value;
    return text ? `${label}: ${text}` : null;
  };
  return [
    inquiry.type === "quote"
      ? "New quote request from the website."
      : "New message from the website.",
    "",
    row("Name", inquiry.name),
    row("Company", inquiry.company),
    row("Email", inquiry.email),
    row("Phone", inquiry.phone),
    row(
      "Language",
      inquiry.locale === "am"
        ? "Amharic (consider replying in Amharic)"
        : "English",
    ),
    row("Services", inquiry.services),
    row("Specific items", inquiry.selectedIncludes),
    row("Budget", inquiry.budget),
    row("Timeline", inquiry.timeline),
    "",
    inquiry.message ? `Message:\n${inquiry.message}` : null,
    "",
    `Open it in the Portfolio Manager: ${siteUrl}/admin/collections/inquiries/${inquiry.id}`,
    "Reply to this email to answer the visitor directly.",
  ]
    .filter((line) => line !== null)
    .join("\n");
}

export async function sendInquiryEmail(
  inquiry: InquiryEmail,
): Promise<EmailStatus> {
  const key = process.env.RESEND_API_KEY;
  const to = recipients();
  if (!key || to.length === 0) return "not-configured";

  const resend = new Resend(key);
  const subject =
    inquiry.type === "quote"
      ? `New quote request: ${oneLine(inquiry.name)}`
      : `New message: ${oneLine(inquiry.name)}`;
  try {
    const result = await Promise.race([
      resend.emails.send({
        from: process.env.INQUIRY_FROM_EMAIL || DEFAULT_FROM,
        to,
        replyTo: inquiry.email,
        subject,
        text: inquiryText(inquiry),
      }),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("Resend timed out")), TIMEOUT_MS),
      ),
    ]);
    if (result.error) {
      console.error(
        `Inquiry ${inquiry.id}: email failed: ${result.error.message}`,
      );
      return "failed";
    }
    return "sent";
  } catch (error) {
    console.error(`Inquiry ${inquiry.id}: email failed: ${String(error)}`);
    return "failed";
  }
}
