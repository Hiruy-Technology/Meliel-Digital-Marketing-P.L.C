import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/sections/CtaBand";
import { RungStats } from "@/components/sections/RungStats";
import { ProjectGallery } from "@/components/sections/work/ProjectGallery";
import { VideoFacade } from "@/components/sections/work/VideoFacade";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { MediaImage } from "@/components/ui/MediaImage";
import { Rise } from "@/components/ui/Rise";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tag } from "@/components/ui/Tag";
import { Value } from "@/components/ui/Value";
import {
  getAdjacentProjects,
  getProjectBySlug,
  getProjectSlugs,
} from "@/lib/data";
import type { Project, RichText } from "@/lib/types";

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.challenge[0],
    alternates: { canonical: `/work/${project.slug}` },
  };
}

/** A labelled block of the case study: heading on the left, text on the right. */
function CaseBlock({
  title,
  paragraphs,
}: {
  title: string;
  paragraphs: RichText;
}) {
  return (
    <Rise className="grid gap-4 lg:grid-cols-12 lg:gap-10">
      <h2 className="font-display text-2xl font-bold lg:col-span-4">{title}</h2>
      <div className="space-y-5 text-lg text-ink-soft lg:col-span-8">
        {paragraphs.map((paragraph) => (
          <p key={paragraph}>
            <Value value={paragraph} />
          </p>
        ))}
      </div>
    </Rise>
  );
}

function ProjectLink({
  project,
  direction,
}: {
  project: Project;
  direction: "previous" | "next";
}) {
  const next = direction === "next";
  return (
    <Link
      href={`/work/${project.slug}`}
      rel={direction === "next" ? "next" : "prev"}
      className={`group flex flex-1 items-center gap-4 rounded-sm border border-line bg-surface p-5 transition-colors hover:border-ink ${
        next ? "sm:flex-row-reverse sm:text-right" : ""
      }`}
    >
      <Icon
        name={next ? "arrow-right" : "arrow-left"}
        className="size-5 text-ink-muted transition-colors group-hover:text-ink"
      />
      <span className="min-w-0">
        <span className="block text-sm text-ink-muted">
          {next ? "Next project" : "Previous project"}
        </span>
        <span className="mt-1 block font-display font-semibold text-ink">
          <Value value={project.title} />
        </span>
      </span>
    </Link>
  );
}

export default async function ProjectPage({
  params,
}: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();
  const { previous, next } = await getAdjacentProjects(slug);

  return (
    <>
      <section className="bg-paper pt-8 pb-12 sm:pt-10 lg:pb-16">
        <Container>
          <Link
            href="/work"
            className="inline-flex min-h-11 items-center gap-2 rounded-sm font-display text-sm font-semibold text-ink-soft hover:text-ink"
          >
            <Icon name="arrow-left" className="size-4" />
            All work
          </Link>

          <div className="mt-6 max-w-4xl">
            <p className="font-medium text-ink-soft">
              <Value value={project.clientName} />
            </p>
            <h1 className="mt-3 font-display text-display font-bold">
              <Value
                value={project.title}
                placeholderClassName="text-2xl! font-normal"
              />
            </h1>
            <ul
              className="mt-6 flex flex-wrap gap-2"
              aria-label="Project details"
            >
              <li>
                <Tag className="bg-surface! ring-1 ring-line">
                  <Value value={project.industry.name} />
                </Tag>
              </li>
              {project.services.map((service) => (
                <li key={service.slug}>
                  <Tag>{service.name}</Tag>
                </li>
              ))}
            </ul>
          </div>

          <MediaImage
            media={project.coverImage}
            aspect="aspect-video"
            sizes="(min-width: 1280px) 1216px, 100vw"
            preload
            className="mt-10"
          />
        </Container>
      </section>

      {project.resultHighlights.length > 0 && (
        <Section tone="navy" aria-label="Results at a glance">
          <RungStats
            stats={project.resultHighlights}
            columns={project.resultHighlights.length >= 4 ? 4 : 3}
          />
        </Section>
      )}

      <Section aria-label="The project">
        <div className="space-y-14 lg:space-y-20">
          <CaseBlock title="The challenge" paragraphs={project.challenge} />
          <CaseBlock title="What we delivered" paragraphs={project.delivered} />
        </div>
      </Section>

      {project.gallery.length > 0 && (
        <Section tone="paper" aria-labelledby="gallery-title">
          <Rise>
            <SectionHeading id="gallery-title" title="The work" />
          </Rise>
          <div className="mt-10">
            <ProjectGallery images={project.gallery} />
          </div>
        </Section>
      )}

      {project.videos.length > 0 && (
        <Section aria-labelledby="videos-title">
          <Rise>
            <SectionHeading
              id="videos-title"
              title={project.videos.length > 1 ? "Videos" : "Video"}
            />
          </Rise>
          <ul className="mt-10 grid gap-8 md:grid-cols-2">
            {project.videos.map((video) => (
              <li key={video.title}>
                <VideoFacade video={video} />
              </li>
            ))}
          </ul>
        </Section>
      )}

      <Section tone="paper" aria-label="Results">
        <CaseBlock title="The results" paragraphs={project.results} />
      </Section>

      {previous && next && (
        <section aria-label="More projects" className="bg-surface py-10">
          <Container className="flex flex-col gap-4 sm:flex-row">
            <ProjectLink project={previous} direction="previous" />
            <ProjectLink project={next} direction="next" />
          </Container>
        </section>
      )}

      <CtaBand title="Want results like these?" />
    </>
  );
}
