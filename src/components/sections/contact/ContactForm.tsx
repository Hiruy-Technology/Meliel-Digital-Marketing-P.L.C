"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { ErrorSummary } from "@/components/ui/ErrorSummary";
import { SelectField, TextAreaField, TextField } from "@/components/ui/Field";
import {
  BUDGET_NOT_SURE,
  SERVICE_NOT_SURE,
  contactSchema,
  fieldErrors,
  isBudgetOptional,
} from "@/lib/inquiry-schema";
import type { InquiryOptions, Service } from "@/lib/types";

type ContactFormProps = {
  services: Service[];
  options: InquiryOptions;
  /** Selected on arrival, from ?service= in the URL. */
  initialService: string;
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
}: ContactFormProps) {
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
    const result = contactSchema.safeParse({
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
    router.push("/contact/thank-you");
  };

  return (
    <form noValidate onSubmit={onSubmit} className="space-y-6">
      <ErrorSummary ref={summaryRef} errors={errors} fields={FIELDS} />

      <div className="grid gap-6 sm:grid-cols-2">
        <TextField
          id={FIELDS.name.id}
          name="name"
          label="Name"
          autoComplete="name"
          error={errors.name}
        />
        <TextField
          id={FIELDS.company.id}
          name="company"
          label="Company"
          optional
          autoComplete="organization"
          error={errors.company}
        />
        <TextField
          id={FIELDS.email.id}
          name="email"
          type="email"
          label="Email"
          autoComplete="email"
          error={errors.email}
        />
        <TextField
          id={FIELDS.phone.id}
          name="phone"
          type="tel"
          label="Phone"
          optional
          autoComplete="tel"
          error={errors.phone}
        />
        <div className="sm:col-span-2">
          <SelectField
            id={FIELDS.service.id}
            name="service"
            label="Service you’re interested in"
            error={errors.service}
            value={service}
            onChange={(e) => setService(e.target.value)}
          >
            <option value="">Choose a service</option>
            {services.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.name}
              </option>
            ))}
            <option value={SERVICE_NOT_SURE}>Not sure yet</option>
          </SelectField>
        </div>
        <SelectField
          id={FIELDS.budget.id}
          name="budget"
          label="Budget range"
          optional={budgetOptional}
          hint={
            budgetOptional
              ? "Quote on request: Event Production is priced on your requirements."
              : undefined
          }
          error={errors.budget}
          defaultValue=""
        >
          <option value="">Choose a range</option>
          {options.budgetRanges.map((range) => (
            <option key={range} value={range}>
              {range}
            </option>
          ))}
          <option value={BUDGET_NOT_SURE}>{BUDGET_NOT_SURE}</option>
        </SelectField>
        <SelectField
          id={FIELDS.timeline.id}
          name="timeline"
          label="Timeline"
          optional
          error={errors.timeline}
          defaultValue=""
        >
          <option value="">Choose a timeline</option>
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
            label="How can we help?"
            error={errors.message}
          />
        </div>
      </div>

      {/* Honeypot: invisible to people and skipped by keyboards; bots fill it in. */}
      <div aria-hidden className="absolute -left-[9999px]">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <Button type="submit" size="lg" className="w-full sm:w-auto">
        Send message
      </Button>
    </form>
  );
}
