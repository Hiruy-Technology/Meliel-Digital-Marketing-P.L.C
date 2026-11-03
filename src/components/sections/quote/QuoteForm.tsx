"use client";

import { Link } from "@/components/ui/Link";
import {
  startTransition,
  useActionState,
  useEffect,
  useRef,
  useState,
  type ComponentProps,
  type FormEvent,
  type ReactNode,
} from "react";
import clsx from "clsx";
import { Button } from "@/components/ui/Button";
import { ErrorSummary } from "@/components/ui/ErrorSummary";
import {
  FieldError,
  SelectField,
  TextAreaField,
  TextField,
} from "@/components/ui/Field";
import { Icon } from "@/components/ui/Icon";
import { submitQuote } from "@/lib/inquiries";
import {
  NOT_SURE,
  fieldErrors,
  includeId,
  isBudgetOptional,
  quoteSchema,
} from "@/lib/inquiry-schema";
import type { InquiryOptions, Service, ServiceSlug } from "@/lib/types";
import { fill } from "@/i18n/config";
import type { Dictionary } from "@/i18n/en";
import { useLocale } from "@/i18n/LocaleProvider";

type QuoteFormProps = {
  services: Service[];
  options: InquiryOptions;
  /** Ticked on arrival, from ?service= in the URL. */
  initialServices: ServiceSlug[];
  t: Pick<Dictionary, "form" | "errors" | "quote" | "common">;
};

// Where each field lives, for the error summary's jump links.
const FIELDS: Record<string, { id: string }> = {
  services: { id: "quote-services" },
  budget: { id: "quote-budget" },
  timeline: { id: "quote-timeline" },
  name: { id: "quote-name" },
  email: { id: "quote-email" },
  phone: { id: "quote-phone" },
  company: { id: "quote-company" },
  message: { id: "quote-message" },
};

function StepLegend({
  label,
  title,
  hint,
}: {
  label: string;
  title: string;
  hint?: string;
}) {
  return (
    <legend className="w-full">
      <span className="block font-mono text-sm text-accent">{label}</span>
      <span className="mt-1 block font-display text-2xl font-bold text-ink">
        {title}
      </span>
      {hint && <span className="mt-1 block text-ink-soft">{hint}</span>}
    </legend>
  );
}

function Checkbox({
  label,
  ...input
}: { label: ReactNode } & ComponentProps<"input">) {
  return (
    <label className="flex cursor-pointer gap-3 py-1.5 text-ink-soft">
      <input
        type="checkbox"
        className="mt-0.5 size-5 shrink-0 accent-ink"
        {...input}
      />
      <span>{label}</span>
    </label>
  );
}

// The Smart Inquiry Form's quote path. All three steps are on one page, so nothing is hidden
// behind "Next" on a slow connection. No prices, no cart: this is a request, not a purchase.
export function QuoteForm({
  services,
  options,
  initialServices,
  t,
}: QuoteFormProps) {
  const locale = useLocale();
  const [state, formAction, pending] = useActionState(submitQuote, {
    errors: {},
  });
  const [selected, setSelected] = useState(() => new Set(initialServices));
  const [includes, setIncludes] = useState(() => new Set<string>());
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [attempts, setAttempts] = useState(0);
  const [detailsReached, setDetailsReached] = useState(false);
  const summaryRef = useRef<HTMLDivElement>(null);
  const alertRef = useRef<HTMLParagraphElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);

  const chosen = services.filter((s) => selected.has(s.slug));
  const budgetOptional = isBudgetOptional(chosen.map((s) => s.slug));
  const hasBudgets = options.budgetRanges.length > 0;
  const hasTimelines = options.timelines.length > 0;
  // With no budgets or timelines set up yet, the form is two steps.
  const hasPlanStep = hasBudgets || hasTimelines;
  const total = hasPlanStep ? 3 : 2;

  // After a failed submit, move focus to the error summary so everyone finds it.
  useEffect(() => {
    if (attempts === 0) return;
    (errors.form ? alertRef : summaryRef).current?.focus();
  }, [attempts]); // eslint-disable-line react-hooks/exhaustive-deps

  // The server checks everything again, and has the last word. Its errors replace the browser's
  // when a new response arrives (adjusting state during render, as the React docs recommend).
  const [response, setResponse] = useState(state);
  if (state !== response) {
    setResponse(state);
    if (Object.keys(state.errors).length > 0) {
      setErrors(state.errors);
      setAttempts((n) => n + 1);
    }
  }

  // The phone summary bar steps aside once the visitor reaches step 2.
  useEffect(() => {
    const target = detailsRef.current;
    if (!target) return;
    const observer = new IntersectionObserver(([entry]) => {
      setDetailsReached(
        entry.isIntersecting || entry.boundingClientRect.top < 0,
      );
    });
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  const clearError = (field: string) =>
    setErrors((current) => {
      const next = { ...current };
      delete next[field];
      return next;
    });

  const toggleService = (service: Service) => {
    const next = new Set(selected);
    if (next.has(service.slug)) {
      next.delete(service.slug);
      // Unticking a service also unticks its specific items.
      const ids = service.includes.map((_, i) => includeId(service, i));
      setIncludes(
        (items) => new Set([...items].filter((i) => !ids.includes(i))),
      );
    } else {
      next.add(service.slug);
      clearError("services");
    }
    setSelected(next);
  };

  const toggleInclude = (id: string) => {
    const next = new Set(includes);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setIncludes(next);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const text = (name: string) => String(form.get(name) ?? "");
    const result = quoteSchema(t.errors, options).safeParse({
      services: chosen.map((s) => s.slug),
      selectedIncludes: [...includes],
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
    // Called here, not through the form's action, so React doesn't clear what the visitor typed
    // when the server sends an error back. The action attribute still works with JavaScript off.
    startTransition(() => formAction(form));
  };

  return (
    <>
      <form
        noValidate
        action={formAction}
        onSubmit={onSubmit}
        className="lg:grid lg:grid-cols-12 lg:items-start lg:gap-12"
      >
        <div className="space-y-14 lg:col-span-8">
          <input type="hidden" name="locale" value={locale} />
          {errors.form && (
            <p
              ref={alertRef}
              tabIndex={-1}
              role="alert"
              className="rounded-sm border-2 border-red bg-raised p-5 font-medium text-red"
            >
              {errors.form}
            </p>
          )}
          <ErrorSummary
            ref={summaryRef}
            errors={errors}
            fields={FIELDS}
            one={t.form.errorOne}
            many={t.form.errorMany}
          />

          <fieldset
            id={FIELDS.services.id}
            tabIndex={-1}
            aria-describedby={
              errors.services ? `${FIELDS.services.id}-error` : undefined
            }
          >
            <StepLegend
              label={fill(t.quote.stepOf, { step: 1, total })}
              title={t.quote.step1}
              hint={t.quote.step1Hint}
            />
            <FieldError id={FIELDS.services.id} error={errors.services} />
            <ul className="mt-6 space-y-3">
              {services.map((service) => {
                const isOn = selected.has(service.slug);
                return (
                  <li
                    key={service.slug}
                    className={clsx(
                      "rounded-sm border-2 transition-colors",
                      isOn
                        ? "border-ink bg-tint"
                        : "border-line-strong bg-surface hover:border-control",
                    )}
                  >
                    <label className="flex cursor-pointer gap-4 p-5">
                      <input
                        type="checkbox"
                        name="services"
                        value={service.slug}
                        checked={isOn}
                        onChange={() => toggleService(service)}
                        className="mt-1 size-5 shrink-0 accent-ink"
                      />
                      <span className="min-w-0">
                        <span className="block font-display text-lg font-semibold text-ink">
                          {service.name}
                        </span>
                        <span className="mt-1 block text-ink-soft">
                          {service.summary}
                        </span>
                        {service.note && (
                          <span className="mt-2 block text-sm font-medium text-accent">
                            {service.note}
                          </span>
                        )}
                      </span>
                    </label>

                    {isOn && service.includes.length > 0 && (
                      <fieldset className="border-t border-line-strong px-5 py-4 sm:pl-14">
                        <legend className="float-left w-full font-medium text-ink">
                          {t.quote.anythingSpecific}{" "}
                          <span className="font-normal text-ink-muted">
                            {t.form.optional}
                          </span>
                        </legend>
                        <div className="clear-both grid pt-2 sm:grid-cols-2 sm:gap-x-6">
                          {service.includes.map((item, i) => {
                            const id = includeId(service, i);
                            return (
                              <Checkbox
                                key={id}
                                name="includes"
                                value={id}
                                label={item}
                                checked={includes.has(id)}
                                onChange={() => toggleInclude(id)}
                              />
                            );
                          })}
                        </div>
                      </fieldset>
                    )}
                  </li>
                );
              })}
            </ul>
          </fieldset>

          <div ref={detailsRef} id="quote-details" className="space-y-14">
            {hasPlanStep && (
              <fieldset>
                <StepLegend
                  label={fill(t.quote.stepOf, { step: 2, total })}
                  title={t.quote.step2}
                />
                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  {hasBudgets && (
                    <SelectField
                      id={FIELDS.budget.id}
                      name="budget"
                      label={t.form.budget}
                      optional={budgetOptional ? t.form.optional : undefined}
                      hint={budgetOptional ? t.form.quoteOnRequest : undefined}
                      error={errors.budget}
                      defaultValue=""
                      onChange={() => clearError("budget")}
                    >
                      <option value="">{t.form.chooseRange}</option>
                      {options.budgetRanges.map((range) => (
                        <option key={range.value} value={range.value}>
                          {range.label}
                        </option>
                      ))}
                      <option value={NOT_SURE}>{t.form.notSure}</option>
                    </SelectField>
                  )}
                  {hasTimelines && (
                    <SelectField
                      id={FIELDS.timeline.id}
                      name="timeline"
                      label={t.form.timeline}
                      error={errors.timeline}
                      defaultValue=""
                      onChange={() => clearError("timeline")}
                    >
                      <option value="">{t.form.chooseTimeline}</option>
                      {options.timelines.map((timeline) => (
                        <option key={timeline.value} value={timeline.value}>
                          {timeline.label}
                        </option>
                      ))}
                    </SelectField>
                  )}
                </div>
              </fieldset>
            )}

            <fieldset>
              <StepLegend
                label={fill(t.quote.stepOf, { step: total, total })}
                title={t.quote.step3}
              />
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
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
                  <TextAreaField
                    id={FIELDS.message.id}
                    name="message"
                    label={t.quote.project}
                    optional={t.form.optional}
                    error={errors.message}
                  />
                </div>
              </div>

              {/* Honeypot: invisible to people and skipped by keyboards; bots fill it in. */}
              <div aria-hidden className="absolute -left-[9999px]">
                <label>
                  {t.form.honeypot}
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </label>
              </div>
            </fieldset>

            <div>
              <Button
                type="submit"
                size="lg"
                disabled={pending}
                aria-busy={pending}
                className="w-full sm:w-auto"
              >
                {pending ? t.form.sending : t.quote.submit}
              </Button>
              <p className="mt-4 text-sm text-ink-muted">
                {t.quote.privacyBefore}{" "}
                <Link href="/privacy" className="rounded-sm underline">
                  {t.quote.privacyLink}
                </Link>
                .
              </p>
            </div>
          </div>
        </div>

        {/* Desktop: selection stays in view */}
        <aside
          aria-label={t.quote.selection}
          className="sticky top-24 hidden rounded-sm border border-line bg-paper p-6 lg:col-span-4 lg:block"
        >
          <h2 className="font-display text-lg font-semibold">
            {t.quote.selection}
          </h2>
          {chosen.length === 0 ? (
            <p className="mt-3 text-ink-soft">{t.quote.noSelection}</p>
          ) : (
            <ul className="mt-4 space-y-3">
              {chosen.map((service) => {
                const count = service.includes.filter((_, i) =>
                  includes.has(includeId(service, i)),
                ).length;
                return (
                  <li key={service.slug} className="flex gap-3">
                    <span
                      aria-hidden
                      className="mt-2.5 h-1 w-4 shrink-0 rounded-[1px] bg-orange-500"
                    />
                    <span className="text-ink-soft">
                      {service.name}
                      {count > 0 && (
                        <span className="block text-sm text-ink-muted">
                          {fill(
                            count === 1 ? t.quote.oneItem : t.quote.manyItems,
                            {
                              count,
                            },
                          )}
                        </span>
                      )}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
          <p className="mt-6 border-t border-line pt-4 text-sm text-ink-soft">
            {t.quote.talkFirst}{" "}
            <Link
              href="/contact"
              className="rounded-sm font-semibold underline"
            >
              {t.common.contactUs}
            </Link>
            .
          </p>
        </aside>
      </form>

      {/* Phones: keeps the selection visible during step 1. Right padding leaves the floating
          WhatsApp/Telegram buttons clear. */}
      {chosen.length > 0 && !detailsReached && (
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-surface py-3 pr-22 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pl-4 shadow-[0_-4px_16px_rgb(18_43_77/0.08)] lg:hidden">
          <a
            href="#quote-details"
            className="flex min-h-11 items-center gap-2 rounded-sm font-display text-sm font-semibold text-ink"
          >
            {fill(
              chosen.length === 1 ? t.quote.oneSelected : t.quote.manySelected,
              { count: chosen.length },
            )}
            <Icon name="arrow-right" className="size-4" />
          </a>
        </div>
      )}
    </>
  );
}
