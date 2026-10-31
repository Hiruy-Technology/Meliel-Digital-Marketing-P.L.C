"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { ErrorSummary } from "@/components/ui/ErrorSummary";
import { SelectField, TextAreaField, TextField } from "@/components/ui/Field";
import {
  SERVICE_NOT_SURE,
  contactSchema,
  fieldErrors,
  isBudgetOptional,
} from "@/lib/inquiry-schema";
import type { InquiryOptions, Service } from "@/lib/types";
import { localePath } from "@/i18n/config";
import type { Dictionary } from "@/i18n/en";
import { useLocale } from "@/i18n/LocaleProvider";

type ContactFormProps = {
  services: Service[];
  options: InquiryOptions;
  /** Selected on arrival, from ?service= in the URL. */
  initialService: string;
  t: Pick<Dictionary, "form" | "errors" | "contact">;
};

const FIELDS = {
  name: { id: "contact-name" },
  company: { id: "contact-company" },
  email: { id: "contact-email" },
  phone: { id: "contact-phone" },
  service: { id: "contact-service" },
  budget: { id: "contact-budget" },
  timeline: { id: "contact-timeline" },
  message: { id: "contact-message" },
};

// General inquiry form. The quote page handles visitors who already know which services they want.
export function ContactForm({
  services,
  options,
  initialService,
  t,
}: ContactFormProps) {
  const locale = useLocale();
  const router = useRouter();
  const [service, setService] = useState(initialService);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [attempts, setAttempts] = useState(0);
  const summaryRef = useRef<HTMLDivElement>(null);
  const budgetOptional = isBudgetOptional([service]);

  useEffect(() => {
    if (attempts > 0) summaryRef.current?.focus();
  }, [attempts]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const text = (name: string) => String(form.get(name) ?? "");
    const result = contactSchema(t.errors).safeParse({
      service,
      budget: text("budget"),
      timeline: text("timeline"),
      name: text("name"),
      company: text("company"),
      email: text("email"),
      phone: text("phone"),
      message: text("message"),
      website: text("website"),
    });

    if (!result.success) {
      setErrors(fieldErrors(result.error));
      setAttempts((n) => n + 1);
      return;
    }
    setErrors({});
    // Design phase: nothing is sent or stored. Phase 3 calls a Server Action here, which also
    // discards the submission silently if the `website` honeypot is filled in.
    router.push(localePath("/contact/thank-you", locale));
  };

  return (
    <form noValidate onSubmit={onSubmit} className="space-y-6">
      <ErrorSummary
        ref={summaryRef}
        errors={errors}
        fields={FIELDS}
        one={t.form.errorOne}
        many={t.form.errorMany}
      />

      <div className="grid gap-6 sm:grid-cols-2">
        <TextField
          id={FIELDS.name.id}
          name="name"
          label={t.form.name}
          autoComplete="name"
          error={errors.name}
        />
        <TextField
          id={FIELDS.company.id}
          name="company"
          label={t.form.company}
          optional={t.form.optional}
          autoComplete="organization"
          error={errors.company}
        />
        <TextField
          id={FIELDS.email.id}
          name="email"
          type="email"
          label={t.form.email}
          autoComplete="email"
          error={errors.email}
        />
        <TextField
          id={FIELDS.phone.id}
          name="phone"
          type="tel"
          label={t.form.phone}
          optional={t.form.optional}
          autoComplete="tel"
          error={errors.phone}
        />
        <div className="sm:col-span-2">
          <SelectField
            id={FIELDS.service.id}
            name="service"
            label={t.contact.service}
            error={errors.service}
            value={service}
            onChange={(e) => setService(e.target.value)}
          >
            <option value="">{t.contact.chooseService}</option>
            {services.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.name}
              </option>
            ))}
            <option value={SERVICE_NOT_SURE}>{t.form.notSure}</option>
          </SelectField>
        </div>
        <SelectField
          id={FIELDS.budget.id}
          name="budget"
          label={t.form.budget}
          optional={budgetOptional ? t.form.optional : undefined}
          hint={budgetOptional ? t.form.quoteOnRequest : undefined}
          error={errors.budget}
          defaultValue=""
        >
          <option value="">{t.form.chooseRange}</option>
          {options.budgetRanges.map((range) => (
            <option key={range} value={range}>
              {range}
            </option>
          ))}
          <option value={t.form.notSure}>{t.form.notSure}</option>
        </SelectField>
        <SelectField
          id={FIELDS.timeline.id}
          name="timeline"
          label={t.form.timeline}
          optional={t.form.optional}
          error={errors.timeline}
          defaultValue=""
        >
          <option value="">{t.form.chooseTimeline}</option>
          {options.timelines.map((timeline) => (
            <option key={timeline} value={timeline}>
              {timeline}
            </option>
          ))}
        </SelectField>
        <div className="sm:col-span-2">
          <TextAreaField
            id={FIELDS.message.id}
            name="message"
            label={t.contact.help}
            error={errors.message}
          />
        </div>
      </div>

      {/* Honeypot: invisible to people and skipped by keyboards; bots fill it in. */}
      <div aria-hidden className="absolute -left-[9999px]">
        <label>
          {t.form.honeypot}
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <Button type="submit" size="lg" className="w-full sm:w-auto">
        {t.contact.send}
      </Button>
    </form>
  );
}
