import type { Metadata } from "next";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceSection } from "@/components/sections/ServiceSection";
import { getProjects, getServices } from "@/lib/data";
import { getI18n } from "@/i18n";
import { alternates } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, t } = await getI18n();
  return {
    title: t.meta.servicesTitle,
    description: t.copy.pathwaysStatement,
    alternates: alternates("/services", locale),
  };
}

export default async function ServicesPage() {
  const { t } = await getI18n();
  const [services, projects] = await Promise.all([
    getServices(),
    getProjects(),
  ]);
  const withWork = new Set(
    projects.flatMap((p) => p.services.map((s) => s.slug)),
  );

  return (
    <>
      <PageHero
        eyebrow={t.common.services}
        title={t.services.title}
        intro={t.copy.pathwaysStatement}
      >
        <nav aria-label={t.services.onThisPage}>
          <ul className="flex flex-wrap gap-2">
            {services.map((service) => (
              <li key={service.slug}>
                <a
                  href={`#${service.slug}`}
                  className="inline-flex h-11 items-center rounded-sm border border-line-strong bg-surface px-4 font-display text-sm font-semibold text-ink-soft transition-colors hover:border-ink hover:text-ink"
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
