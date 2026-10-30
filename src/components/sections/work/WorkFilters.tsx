import Link from "next/link";
import clsx from "clsx";
import type { ReactNode } from "react";
import { Value } from "@/components/ui/Value";
import type { Industry, Service } from "@/lib/types";

type WorkFiltersProps = {
  services: Service[];
  industries: Industry[];
  /** Active slugs (already validated). */
  service?: string;
  industry?: string;
};

/** /work with the given filters; empty ones are left out so URLs stay clean and shareable. */
export function workHref(filters: { service?: string; industry?: string }) {
  const params = new URLSearchParams();
  if (filters.service) params.set("service", filters.service);
  if (filters.industry) params.set("industry", filters.industry);
  const query = params.toString();
  return query ? `/work?${query}` : "/work";
}

function Chip({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: ReactNode;
}) {
  return (
    <li className="shrink-0">
      <Link
        href={href}
        scroll={false}
        aria-current={active ? "true" : undefined}
        className={clsx(
          "inline-flex min-h-11 items-center rounded-sm border px-4 py-1.5 font-display text-sm font-semibold whitespace-nowrap transition-colors",
          active
            ? "border-navy-900 bg-navy-900 text-white"
            : "border-navy-200 bg-white text-navy-800 hover:border-navy-900",
        )}
      >
        {children}
      </Link>
    </li>
  );
}

function FilterGroup({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="lg:flex lg:items-start lg:gap-6">
      <h2 className="font-display text-xs font-semibold tracking-[0.16em] text-navy-600 uppercase lg:w-24 lg:shrink-0 lg:pt-3.5">
        {label}
      </h2>
      {/* Phones: one row that swipes sideways, so projects stay near the top. */}
      <ul className="-mx-4 mt-2 flex gap-2 overflow-x-auto px-4 py-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 lg:mt-0">
        {children}
      </ul>
    </div>
  );
}

// Plain links, not client state: each filter is a real URL that works without JavaScript
// and can be shared.
export function WorkFilters({
  services,
  industries,
  service,
  industry,
}: WorkFiltersProps) {
  return (
    <nav aria-label="Filter projects" className="space-y-5">
      <FilterGroup label="Service">
        <Chip href={workHref({ industry })} active={!service}>
          All services
        </Chip>
        {services.map((s) => (
          <Chip
            key={s.slug}
            href={workHref({ service: s.slug, industry })}
            active={service === s.slug}
          >
            {s.name}
          </Chip>
        ))}
      </FilterGroup>

      <FilterGroup label="Industry">
        <Chip href={workHref({ service })} active={!industry}>
          All industries
        </Chip>
        {industries.map((i) => (
          <Chip
            key={i.slug}
            href={workHref({ service, industry: i.slug })}
            active={industry === i.slug}
          >
            <Value value={i.name} />
          </Chip>
        ))}
      </FilterGroup>
    </nav>
  );
}
