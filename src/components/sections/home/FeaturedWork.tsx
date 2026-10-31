import { Button } from "@/components/ui/Button";
import { Rise } from "@/components/ui/Rise";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Project } from "@/lib/types";
import { ProjectCard } from "../ProjectCard";
import { getI18n } from "@/i18n";

// 3 to 6 projects marked "featured" in the Portfolio Manager. Hidden if there are none.
export async function FeaturedWork({ projects }: { projects: Project[] }) {
  if (projects.length === 0) return null;
  const { t } = await getI18n();
  return (
    <Section tone="paper" aria-labelledby="work-title">
      <Rise className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          id="work-title"
          eyebrow={t.home.workEyebrow}
          title={t.home.workTitle}
        />
        <Button
          href="/work"
          variant="outline"
          className="self-start lg:self-auto"
        >
          {t.home.seeAllWork}
        </Button>
      </Rise>
      <ul className="mt-12 grid gap-x-6 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
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
    </Section>
  );
}
