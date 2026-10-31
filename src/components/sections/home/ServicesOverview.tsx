import Link from "next/link";
import clsx from "clsx";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { Rise } from "@/components/ui/Rise";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { pathwaysStatement } from "@/content/copy";
import type { Service } from "@/lib/types";

// Five service cards linking to /services#slug. Desktop: three across, then two wider.
export function ServicesOverview({ services }: { services: Service[] }) {
  return (
    <Section aria-labelledby="services-title">
      <Rise className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          id="services-title"
          eyebrow="Services"
          title="What we do"
          intro={pathwaysStatement}
        />
        <Button
          href="/services"
          variant="outline"
          className="self-start lg:self-auto"
        >
          All services
        </Button>
      </Rise>

      <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-6">
        {services.map((service, i) => (
          <li
            key={service.slug}
            className={clsx(
              i < 3 ? "lg:col-span-2" : "lg:col-span-3",
              i === 4 && "md:col-span-2 lg:col-span-3",
            )}
          >
            <Rise className="h-full">
              <Card interactive className="group flex h-full flex-col p-7">
                <span className="font-mono text-sm text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-xl font-semibold">
                  <Link
                    href={`/services#${service.slug}`}
                    className="rounded-sm after:absolute after:inset-0"
                  >
                    {service.name}
                  </Link>
                </h3>
                <p className="mt-3 text-ink-soft">{service.summary}</p>
                {service.note && (
                  <p className="mt-4 text-sm font-medium text-accent">
                    {service.note}
                  </p>
                )}
                <span className="mt-auto flex items-center gap-2 pt-6 font-display text-sm font-semibold text-ink">
                  Learn more
                  <Icon
                    name="arrow-right"
                    className="size-4 transition-transform group-hover:translate-x-1"
                  />
                </span>
              </Card>
            </Rise>
          </li>
        ))}
      </ul>
    </Section>
  );
}
