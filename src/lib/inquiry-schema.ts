// Validation rules for the quote and contact forms. Runs in the browser now; in phase 3 the same
// schemas validate on the server (Server Actions) before saving to Inquiries and emailing Meliel.

import { z } from "zod";
import type { ServiceSlug } from "./types";

export const SERVICE_SLUGS = [
  "branding",
  "digital-marketing",
  "market-analysis",
  "websites",
  "event-production",
] as const satisfies readonly ServiceSlug[];

/** Budget option for visitors who don't know yet. Hiruy's addition: confirm with the client. */
export const BUDGET_NOT_SURE = "Not sure yet";

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max, { error: `Please keep this under ${max} characters.` });

// Fields shared by both forms.
const contactDetails = {
  name: z
    .string()
    .trim()
    .min(2, { error: "Please enter your name." })
    .max(120, { error: "Please keep this under 120 characters." }),
  company: optionalText(160),
  email: z.email({
    error: "Please enter a valid email address, like name@company.com.",
  }),
  phone: z
    .string()
    .trim()
    .regex(/^[+\d][\d\s()-]{6,24}$|^$/, {
      error: "Please enter a valid phone number, or leave this empty.",
    }),
  message: optionalText(2000),
  /** Honeypot: hidden from people, so anything in it means a bot filled the form. */
  website: z.string(),
};

/** Event Production is quoted separately, so budget is optional when it's the only service. */
export function isBudgetOptional(services: readonly string[]): boolean {
  return services.length === 1 && services[0] === "event-production";
}

export const quoteSchema = z
  .object({
    ...contactDetails,
    services: z
      .array(z.enum(SERVICE_SLUGS))
      .min(1, { error: "Please choose at least one service." }),
    selectedIncludes: z.array(z.string()),
    budget: z.string(),
    timeline: z.string().min(1, { error: "Please choose a timeline." }),
  })
  .refine((data) => isBudgetOptional(data.services) || data.budget !== "", {
    error: "Please choose a budget range.",
    path: ["budget"],
    // Report this with the other errors, instead of only after they're fixed.
    when: () => true,
  });

export type QuoteInput = z.infer<typeof quoteSchema>;

/** First error message per field, keyed by field name. */
export function fieldErrors(error: z.ZodError): Record<string, string> {
  const errors: Record<string, string> = {};
  for (const issue of error.issues) {
    const field = String(issue.path[0] ?? "form");
    errors[field] ??= issue.message;
  }
  return errors;
}
