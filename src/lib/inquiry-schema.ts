// Validation rules for the quote and contact forms. Runs in the browser now; in phase 3 the same
// schemas validate on the server (Server Actions) before saving to Inquiries and emailing Meliel.

import { z } from "zod";
import { fill } from "@/i18n/config";
import type { Dictionary } from "@/i18n/en";
import type { ServiceSlug } from "./types";

export const SERVICE_SLUGS = [
  "branding",
  "digital-marketing",
  "market-analysis",
  "websites",
  "event-production",
] as const satisfies readonly ServiceSlug[];

type Messages = Dictionary["errors"];

const limited = (max: number, m: Messages) =>
  z
    .string()
    .trim()
    .max(max, { error: fill(m.tooLong, { max }) });

// Fields shared by both forms.
const contactDetails = (m: Messages) => ({
  name: z
    .string()
    .trim()
    .min(2, { error: m.name })
    .max(120, { error: fill(m.tooLong, { max: 120 }) }),
  company: limited(160, m),
  email: z.email({ error: m.email }),
  phone: z
    .string()
    .trim()
    .regex(/^[+\d][\d\s()-]{6,24}$|^$/, { error: m.phone }),
  message: limited(2000, m),
  /** Honeypot: hidden from people, so anything in it means a bot filled the form. */
  website: z.string(),
});

/** Event Production is quoted separately, so budget is optional when it's the only service. */
export function isBudgetOptional(services: readonly string[]): boolean {
  return services.length === 1 && services[0] === "event-production";
}

export const quoteSchema = (m: Messages) =>
  z
    .object({
      ...contactDetails(m),
      services: z.array(z.enum(SERVICE_SLUGS)).min(1, { error: m.services }),
      selectedIncludes: z.array(z.string()),
      budget: z.string(),
      timeline: z.string().min(1, { error: m.timeline }),
    })
    .refine((data) => isBudgetOptional(data.services) || data.budget !== "", {
      error: m.budget,
      path: ["budget"],
      // Report this with the other errors, instead of only after they're fixed.
      when: () => true,
    });

export type QuoteInput = z.infer<ReturnType<typeof quoteSchema>>;

/** Service choice on the contact form for visitors who don't know yet. */
export const SERVICE_NOT_SURE = "not-sure";

export const contactSchema = (m: Messages) =>
  z
    .object({
      ...contactDetails(m),
      service: z.string().min(1, { error: m.service }),
      budget: z.string(),
      timeline: z.string(),
      message: z
        .string()
        .trim()
        .min(1, { error: m.message })
        .max(2000, { error: fill(m.tooLong, { max: 2000 }) }),
    })
    .refine((data) => isBudgetOptional([data.service]) || data.budget !== "", {
      error: m.budget,
      path: ["budget"],
      when: () => true,
    });

export type ContactInput = z.infer<ReturnType<typeof contactSchema>>;

/** First error message per field, keyed by field name. */
export function fieldErrors(error: z.ZodError): Record<string, string> {
  const errors: Record<string, string> = {};
  for (const issue of error.issues) {
    const field = String(issue.path[0] ?? "form");
    errors[field] ??= issue.message;
  }
  return errors;
}
