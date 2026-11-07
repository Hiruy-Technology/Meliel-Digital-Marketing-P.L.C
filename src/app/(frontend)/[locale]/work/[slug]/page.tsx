import type { Metadata } from "next";
import { Link } from "@/components/ui/Link";
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
import type { Locale } from "@/i18n/config";
import { fill, getI18n } from "@/i18n";
import { convertLexicalToPlaintext } from "@payloadcms/richtext-lexical/plaintext";
import { RichText as PayloadRichText } from "@payloadcms/richtext-lexical/react";
import { jsonLd, projectLd } from "@/lib/json-ld";
import { alternates } from "@/lib/seo";

export async function generateStaticParams({
  params,
}: {
  params: { locale: string };
}) {
  const slugs = await getProjectSlugs(params.locale as Locale);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const { locale } = await getI18n();
  const project = await getProjectBySlug(slug, locale);
  if (!project) return {};
  return {
    title: project.title,
    description: describe(project),
    alternates: alternates(`/work/${project.slug}`, locale),
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
  if (isEmpty(paragraphs)) return null;
  return (
    <Rise className="grid gap-4 lg:grid-cols-12 lg:gap-10">
      <h2 className="font-display text-2xl font-bold lg:col-span-4">{title}</h2>
      <div className="space-y-5 text-lg text-ink-soft lg:col-span-8">
        {Array.isArray(paragraphs) ? (
          paragraphs.map((paragraph) => (
            <p key={paragraph}>
              <Value value={paragraph} />
            </p>
          ))
        ) : (
          <PayloadRichText data={paragraphs} className="case-study" />
        )}
      </div>
    </Rise>
  );
}

const isEmpty = (text: RichText) => Array.isArray(text) && text.length === 0;

/** The opening of a case study, for search results. */
function plainText(text: RichText): string | undefined {
  const plain = Array.isArray(text)
    ? text[0]
    : convertLexicalToPlaintext({ data: text });
  return plain?.replace(/\s+/g, " ").trim().slice(0, 160) || undefined;
}

/**
 * The page's search description: the challenge, or the results when there's no challenge yet (as
 * with the case studies from Meliel's profile), or else the headline numbers.
 */
function describe(project: Project): string | undefined {
  return (
    plainText(project.challenge) ??
    plainText(project.results) ??
    (project.resultHighlights.map((h) => `${h.value} ${h.label}`).join(", ") ||
      undefined)
  );
}

function ProjectLink({
  project,
  direction,
  label,
}: {
  project: Project;
  direction: "previous" | "next";
  label: string;
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
        <span className="block text-sm text-ink-muted">{label}</span>
        <span className="mt-1 block font-display font-semibold text-ink">
          <Value value={project.title} />
        </span>
      </span>
    </Link>
  );
}

export default async function ProjectPage({
  params,
}: PageProps<"/[locale]/work/[slug]">) {
  const { slug } = await params;
  const { locale, t } = await getI18n();
  const project = await getProjectBySlug(slug, locale);
  if (!project) notFound();
  const { previous, next } = await getAdjacentProjects(slug, locale);

  const structured = projectLd(locale, project, describe(project));

  return (
    <>
      {structured && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(structured) }}
        />
      )}
      <section className="bg-paper pt-8 pb-12 sm:pt-10 lg:pb-16">
        <Container>
          <Link
            href="/work"
            className="inline-flex min-h-11 items-center gap-2 rounded-sm font-display text-sm font-semibold text-ink-soft hover:text-ink"
          >
            <Icon name="arrow-left" className="size-4" />
            {t.work.allWork}
          </Link>

          <div className="mt-6 max-w-4xl">
            {project.clientName !== project.title && (
              <p className="mb-3 font-medium text-ink-soft">
                <Value value={project.clientName} />
              </p>
            )}
            <h1 className="font-display text-display font-bold">
              <Value
                value={project.title}
                placeholderClassName="text-2xl! font-normal"
              />
            </h1>
            <ul
              className="mt-6 flex flex-wrap gap-2"
              aria-label={t.work.details}
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

          {project.coverImage ? (
            <MediaImage
              media={project.coverImage}
              aspect="aspect-video"
              sizes="(min-width: 1280px) 1216px, 100vw"
              preload
              className="mt-10"
            />
          ) : null}
        </Container>
      </section>

      {project.resultHighlights.length > 0 && (
        <Section tone="navy" aria-label={t.work.glance}>
          <RungStats
            stats={project.resultHighlights}
            columns={project.resultHighlights.length >= 4 ? 4 : 3}
          />
        </Section>
      )}

      {!(isEmpty(project.challenge) && isEmpty(project.delivered)) && (
        <Section aria-label={t.work.theProject}>
          <div className="space-y-14 lg:space-y-20">
            <CaseBlock
              title={t.work.challenge}
              paragraphs={project.challenge}
            />
            <CaseBlock
              title={t.work.delivered}
              paragraphs={project.delivered}
            />
          </div>
        </Section>
      )}

      {project.gallery.length > 0 && (
        <Section tone="paper" aria-labelledby="gallery-title">
          <Rise>
            <SectionHeading id="gallery-title" title={t.work.gallery} />
          </Rise>
          <div className="mt-10">
            <ProjectGallery images={project.gallery} t={t.work} />
          </div>
        </Section>
      )}

      {project.videos.length > 0 && (
        <Section aria-labelledby="videos-title">
          <Rise>
            <SectionHeading
              id="videos-title"
              title={project.videos.length > 1 ? t.work.videos : t.work.video}
            />
          </Rise>
          <ul className="mt-10 grid gap-8 md:grid-cols-2">
            {project.videos.map((video) => (
              <li key={video.title}>
                <VideoFacade
                  video={video}
                  playLabel={fill(t.work.playVideo, { title: video.title })}
                />
              </li>
            ))}
          </ul>
        </Section>
      )}

      {!isEmpty(project.results) && (
        <Section tone="paper" aria-label={t.work.resultsLabel}>
          <CaseBlock title={t.work.results} paragraphs={project.results} />
        </Section>
      )}

      {previous && next && (
        <section aria-label={t.work.more} className="bg-surface py-10">
          <Container className="flex flex-col gap-4 sm:flex-row">
            <ProjectLink
              project={previous}
              direction="previous"
              label={t.work.previous}
            />
            <ProjectLink project={next} direction="next" label={t.work.next} />
          </Container>
        </section>
      )}

      <CtaBand title={t.cta.projectTitle} />
    </>
  );
}
