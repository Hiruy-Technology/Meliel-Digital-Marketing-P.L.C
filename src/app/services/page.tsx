import type { Metadata } from "next";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceSection } from "@/components/sections/ServiceSection";
import { pathwaysStatement } from "@/content/copy";
import { getProjects, getServices } from "@/lib/data";

export const metadata: Metadata = {
  title: "Services",
  description: pathwaysStatement,
};

export default async function ServicesPage() {
  const [services, projects] = await Promise.all([
    getServices(),
    getProjects(),
  ]);
  const withWork = new Set(
    projects.flatMap((p) => p.services.map((s) => s.slug)),
  );

  return (
    <>
      <PageHero eyebrow="Services" title="What we do" intro={pathwaysStatement}>
        <nav aria-label="Services on this page">
          <ul className="flex flex-wrap gap-2">
            {services.map((service) => (
              <li key={service.slug}>
                <a
                  href={`#${service.slug}`}
                  className="inline-flex h-11 items-center rounded-sm border border-navy-200 bg-white px-4 font-display text-sm font-semibold text-navy-800 transition-colors hover:border-navy-900 hover:text-navy-900"
                >
                  {service.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      {services.map((service, i) => (
        <ServiceSection
          key={service.slug}
          service={service}
          number={i + 1}
          tone={i % 2 === 0 ? "white" : "paper"}
          hasWork={withWork.has(service.slug)}
        />
      ))}

      <CtaBand />
    </>
  );
}
