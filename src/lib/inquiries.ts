"use server";

// The contact and quote forms' Server Actions. Anyone can call these directly, so everything the
// browser checked is checked again here, and every choice must be one the site actually offers.
// Choices are saved in English, because /admin is English, with the visitor's language alongside.

import config from "@payload-config";
import { redirect } from "next/navigation";
import { getPayload } from "payload";
import { getDictionary } from "@/i18n";
import { hasLocale, localePath, type Locale } from "@/i18n/config";
import { en } from "@/i18n/en";
import { getInquiryOptions, getServices } from "./data";
import {
  NOT_SURE,
  contactSchema,
  fieldErrors,
  includeId,
  quoteSchema,
} from "./inquiry-schema";
import { allowSubmission, visitorKey } from "./rate-limit";
import type { Choice, Service } from "./types";

export type FormState = { errors: Record<string, string> };

const text = (form: FormData, name: string) => String(form.get(name) ?? "");

/** The English wording of a choice, "" for none, or null if the value isn't one the form offered. */
function englishChoice(value: string, offered: Choice[], english: Choice[]) {
  if (value === "") return "";
  if (value === NOT_SURE) return en.form.notSure;
  if (!offered.some((c) => c.value === value)) return null;
  return english.find((c) => c.value === value)?.label ?? null;
}

/** The English wording of the ticked "includes" items, or null if any isn't offered. */
function englishIncludes(ids: string[], chosen: Service[], english: Service[]) {
  const labels: string[] = [];
  for (const id of ids) {
    const service = chosen.find((s) =>
      s.includes.some((_, i) => includeId(s, i) === id),
    );
    const source = english.find((s) => s.slug === service?.slug);
    const i = source?.includes.findIndex((_, n) => includeId(source, n) === id);
    if (!source || i === undefined || i < 0) return null;
    labels.push(source.includes[i]);
  }
  return labels;
}

/** Payload ids of the chosen services. Placeholder services (dev and preview only) have none. */
const serviceIds = (slugs: string[], english: Service[]) =>
  english
    .filter((s) => slugs.includes(s.slug))
    .map((s) => Number(s.id))
    .filter(Number.isInteger);

async function save(
  locale: Locale,
  action: "contact" | "quote",
  data: Record<string, unknown>,
): Promise<FormState | null> {
  const t = getDictionary(locale);
  const payload = await getPayload({ config });
  if (!(await allowSubmission(payload, action, await visitorKey()))) {
    return { errors: { form: t.errors.rateLimited } };
  }
  await payload.create({
    collection: "inquiries",
    data: {
      type: action === "quote" ? "quote" : "general",
      locale,
      emailStatus: "not-configured",
      ...data,
    } as never,
  });
  return null;
}

export async function submitQuote(
  _previous: FormState,
  form: FormData,
): Promise<FormState> {
  const value = text(form, "locale");
  const locale: Locale = hasLocale(value) ? value : "en";
  const t = getDictionary(locale);
  const thankYou = localePath("/contact/thank-you?type=quote", locale);
  // A filled honeypot means a bot: it sees the normal thank-you page, and nothing is kept.
  if (text(form, "website")) redirect(thankYou);

  try {
    const [services, english, options, englishOptions] = await Promise.all([
      getServices(locale),
      getServices("en"),
      getInquiryOptions(locale),
      getInquiryOptions("en"),
    ]);
    const input = {
      services: form.getAll("services").map(String),
      selectedIncludes: form.getAll("includes").map(String),
      budget: text(form, "budget"),
      timeline: text(form, "timeline"),
      name: text(form, "name"),
      company: text(form, "company"),
      email: text(form, "email"),
      phone: text(form, "phone"),
      message: text(form, "message"),
      website: "",
    };
    const result = quoteSchema(t.errors, options).safeParse(input);
    if (!result.success) return { errors: fieldErrors(result.error) };

    const { data } = result;
    const chosen = services.filter((s) => data.services.includes(s.slug));
    const includes = englishIncludes(data.selectedIncludes, chosen, english);
    const budget = englishChoice(
      data.budget,
      options.budgetRanges,
      englishOptions.budgetRanges,
    );
    const timeline = englishChoice(
      data.timeline,
      options.timelines,
      englishOptions.timelines,
    );
    if (chosen.length !== data.services.length || !includes) {
      return { errors: { form: t.errors.tryAgain } };
    }
    if (budget === null || timeline === null) {
      return { errors: { form: t.errors.tryAgain } };
    }

    const refused = await save(locale, "quote", {
      name: data.name,
      company: data.company,
      email: data.email,
      phone: data.phone,
      message: data.message,
      services: serviceIds(data.services, english),
      selectedIncludes: includes,
      budget,
      timeline,
    });
    if (refused) return refused;
  } catch {
    return { errors: { form: t.errors.tryAgain } };
  }
  redirect(thankYou);
}

export async function submitContact(
  _previous: FormState,
  form: FormData,
): Promise<FormState> {
  const value = text(form, "locale");
  const locale: Locale = hasLocale(value) ? value : "en";
  const t = getDictionary(locale);
  const thankYou = localePath("/contact/thank-you", locale);
  if (text(form, "website")) redirect(thankYou);

  try {
    const [services, english, options, englishOptions] = await Promise.all([
      getServices(locale),
      getServices("en"),
      getInquiryOptions(locale),
      getInquiryOptions("en"),
    ]);
    const input = {
      service: text(form, "service"),
      budget: text(form, "budget"),
      timeline: text(form, "timeline"),
      name: text(form, "name"),
      company: text(form, "company"),
      email: text(form, "email"),
      phone: text(form, "phone"),
      message: text(form, "message"),
      website: "",
    };
    const result = contactSchema(t.errors, options).safeParse(input);
    if (!result.success) return { errors: fieldErrors(result.error) };

    const { data } = result;
    const known =
      data.service === NOT_SURE ||
      services.some((s) => s.slug === data.service);
    const budget = englishChoice(
      data.budget,
      options.budgetRanges,
      englishOptions.budgetRanges,
    );
    const timeline = englishChoice(
      data.timeline,
      options.timelines,
      englishOptions.timelines,
    );
    if (!known || budget === null || timeline === null) {
      return { errors: { form: t.errors.tryAgain } };
    }

    const refused = await save(locale, "contact", {
      name: data.name,
      company: data.company,
      email: data.email,
      phone: data.phone,
      message: data.message,
      services: serviceIds([data.service], english),
      budget,
      timeline,
    });
    if (refused) return refused;
  } catch {
    return { errors: { form: t.errors.tryAgain } };
  }
  redirect(thankYou);
}
