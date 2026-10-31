import { Button } from "@/components/ui/Button";
import { Rise } from "@/components/ui/Rise";
import { Section } from "@/components/ui/Section";
import type { Service } from "@/lib/types";

type ServiceSectionProps = {
  service: Service;
  /** 1-based position, shown as 01, 02… */
  number: number;
  tone: "white" | "paper";
  /** True when the portfolio has published work for this service. */
  hasWork: boolean;
};

// One service on /services. The id is the anchor used across the site (/services#branding).
// Works with or without an "Includes" list, because Meliel gave lists for only two services.
export function ServiceSection({
  service,
  number,
  tone,
  hasWork,
}: ServiceSectionProps) {
  const titleId = `${service.slug}-title`;
  return (
    <Section id={service.slug} tone={tone} aria-labelledby={titleId}>
      <Rise className="grid gap-8 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <span className="font-mono text-sm text-accent">
            {String(number).padStart(2, "0")}
          </span>
          <h2
            id={titleId}
            className="mt-3 font-display text-display-sm font-bold"
          >
            {service.name}
          </h2>
        </div>

        <div className="lg:col-span-8">
          <p className="text-lg text-ink-soft sm:text-xl">{service.summary}</p>

          {service.includes.length > 0 && (
            <>
              <h3 className="mt-8 font-display text-xs font-semibold tracking-[0.16em] text-ink-muted uppercase">
                Includes
              </h3>
              <ul className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                {service.includes.map((item) => (
                  <li key={item} className="flex gap-3 text-ink-soft">
                    {/* Small ladder rung as the list marker */}
                    <span
                      aria-hidden
                      className="mt-2.5 h-1 w-4 shrink-0 rounded-[1px] bg-orange-500"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </>
          )}

          {service.note && (
            <p className="mt-8 border-l-4 border-orange-500 bg-orange-50 px-4 py-3 font-medium text-navy-900">
              {service.note}
            </p>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={`/quote?service=${service.slug}`}>Get a quote</Button>
            {hasWork && (
              <Button href={`/work?service=${service.slug}`} variant="outline">
                See related work
              </Button>
            )}
          </div>
        </div>
      </Rise>
    </Section>
  );
}
