import type { Metadata } from "next";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { WorkFilters, workHref } from "@/components/sections/work/WorkFilters";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Rise } from "@/components/ui/Rise";
import { getIndustries, getProjects, getServices } from "@/lib/data";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "Browse Meliel Digital Marketing's portfolio of projects, filtered by service or industry.",
  alternates: { canonical: "/work" },
};

/** A query value may be repeated in the URL; only the first counts. */
const first = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

export default async function WorkPage({ searchParams }: PageProps<"/work">) {
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
        eyebrow="Our work"
        title="Work that moves brands forward"
        intro="See what we’ve delivered, filtered by the service or industry that matters to you."
      />

      <section aria-label="Projects" className="bg-white py-12 lg:py-16">
        <Container>
          <WorkFilters
            services={services}
            industries={industries}
            service={service}
            industry={industry}
          />

          <p
            role="status"
            className="mt-10 border-t border-navy-100 pt-6 text-sm text-navy-600"
          >
            {projects.length} {projects.length === 1 ? "project" : "projects"}
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
            <div className="mt-8 rounded-sm border border-dashed border-navy-200 bg-paper px-6 py-16 text-center">
              <h2 className="font-display text-2xl font-bold">
                No projects match these filters
              </h2>
              <p className="mt-3 text-navy-700">
                Try a different service or industry, or see everything.
              </p>
              {filtered && (
                <Button
                  href={workHref({})}
                  variant="outline"
                  className="mt-6"
                  scroll={false}
                >
                  Clear filters
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
