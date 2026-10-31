import type { Metadata } from "next";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { WorkFilters, workHref } from "@/components/sections/work/WorkFilters";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Rise } from "@/components/ui/Rise";
import { getIndustries, getProjects, getServices } from "@/lib/data";
import { getI18n } from "@/i18n";
import { alternates } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, t } = await getI18n();
  return {
    title: t.meta.workTitle,
    description: t.meta.workDescription,
    alternates: alternates("/work", locale),
  };
}

/** A query value may be repeated in the URL; only the first counts. */
const first = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

export default async function WorkPage({
  searchParams,
}: PageProps<"/[locale]/work">) {
  const { t } = await getI18n();
  const query = await searchParams;
  const [services, industries] = await Promise.all([
    getServices(),
    getIndustries(),
  ]);

  // Unknown values in the URL are ignored rather than showing an empty page.
  const requestedService = first(query.service);
  const requestedIndustry = first(query.industry);
  const service = services.find((s) => s.slug === requestedService)?.slug;
  const industry = industries.find((i) => i.slug === requestedIndustry)?.slug;

  const projects = await getProjects({ service, industry });
  const filtered = Boolean(service || industry);

  return (
    <>
      <PageHero
        eyebrow={t.work.eyebrow}
        title={t.work.title}
        intro={t.work.intro}
      />

      <section
        aria-label={t.work.projects}
        className="bg-surface py-12 lg:py-16"
      >
        <Container>
          <WorkFilters
            services={services}
            industries={industries}
            service={service}
            industry={industry}
          />

          <p
            role="status"
            className="mt-10 border-t border-line pt-6 text-sm text-ink-muted"
          >
            {projects.length}{" "}
            {projects.length === 1 ? t.work.oneProject : t.work.manyProjects}
          </p>

          {projects.length > 0 ? (
            <ul className="mt-8 grid gap-x-6 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <li key={project.id}>
                  <Rise className="h-full">
                    <ProjectCard
                      project={project}
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    />
                  </Rise>
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-8 rounded-sm border border-dashed border-line-strong bg-paper px-6 py-16 text-center">
              <h2 className="font-display text-2xl font-bold">
                {t.work.emptyTitle}
              </h2>
              <p className="mt-3 text-ink-soft">{t.work.emptyText}</p>
              {filtered && (
                <Button
                  href={workHref({})}
                  variant="outline"
                  className="mt-6"
                  scroll={false}
                >
                  {t.work.clearFilters}
                </Button>
              )}
            </div>
          )}
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
