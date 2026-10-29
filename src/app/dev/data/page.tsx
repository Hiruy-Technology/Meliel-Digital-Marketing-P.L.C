import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { Section } from "@/components/ui/Section";
import { Tag } from "@/components/ui/Tag";
import {
  differentiator,
  mission,
  processSteps,
  values,
  vision,
} from "@/content/copy";
import { pendingCopy } from "@/content/seed";
import {
  getAdjacentProjects,
  getClientLogos,
  getIndustries,
  getInquiryOptions,
  getProjects,
  getServices,
  getSiteSettings,
  getTeamMembers,
  getTestimonials,
} from "@/lib/data";
import { isPlaceholder } from "@/lib/placeholder";

// Internal: every piece of content the pages will use, read through the data layer.
// Placeholders are highlighted. Never shown in production; removed before launch (step 10).
export const metadata: Metadata = {
  title: "Content and data (internal)",
  robots: { index: false, follow: false },
};

function Value({ children }: { children: string }) {
  return isPlaceholder(children) ? (
    <span className="rounded-sm bg-orange-50 px-1 font-mono text-[0.85em] text-orange-800">
      {children}
    </span>
  ) : (
    <span>{children}</span>
  );
}

function Block({
  title,
  count,
  children,
}: {
  title: string;
  count?: number;
  children: ReactNode;
}) {
  return (
    <div className="border-t border-navy-100 py-8">
      <h2 className="mb-4 font-display text-xl font-bold">
        {title}
        {count !== undefined && (
          <span className="ml-2 text-base font-normal text-navy-600">
            ({count})
          </span>
        )}
      </h2>
      {children}
    </div>
  );
}

export default async function DataPage() {
  if (process.env.NEXT_PUBLIC_SITE_ENV === "production") notFound();

  const [
    services,
    industries,
    projects,
    featured,
    branding,
    digitalInA,
    settings,
    testimonials,
    logos,
    team,
    options,
  ] = await Promise.all([
    getServices(),
    getIndustries(),
    getProjects(),
    getProjects({ featured: true }),
    getProjects({ service: "branding" }),
    getProjects({ service: "digital-marketing", industry: "industry-a" }),
    getSiteSettings(),
    getTestimonials({ featured: true }),
    getClientLogos(),
    getTeamMembers(),
    getInquiryOptions(),
  ]);
  const adjacent = await getAdjacentProjects(projects[0]?.slug ?? "");

  return (
    <>
      <Section tone="paper" className="py-12!">
        <p className="font-mono text-xs tracking-widest text-navy-600 uppercase">
          Internal · step 3
        </p>
        <h1 className="mt-2 font-display text-display-sm font-bold">
          Content and data
        </h1>
        <p className="mt-3 max-w-2xl text-navy-700">
          Everything below comes through{" "}
          <code className="font-mono">src/lib/data.ts</code>. Orange text is a
          placeholder still waiting for the client. Full list:{" "}
          <code className="font-mono">pnpm placeholders</code>.
        </p>
      </Section>

      <Section className="py-4!">
        <Block title="Services" count={services.length}>
          <div className="grid gap-6 md:grid-cols-2">
            {services.map((s) => (
              <div key={s.id}>
                <h3 className="font-display font-semibold">
                  {s.name}{" "}
                  <span className="font-mono text-xs text-navy-600">
                    #{s.slug}
                  </span>
                </h3>
                <p className="mt-1 text-navy-700">{s.summary}</p>
                {s.includes.length > 0 && (
                  <ul className="mt-2 list-disc pl-5 text-sm text-navy-700">
                    {s.includes.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
                {s.note && (
                  <p className="mt-2 text-sm font-medium text-orange-800">
                    {s.note}
                  </p>
                )}
              </div>
            ))}
          </div>
        </Block>

        <Block title="Projects (published)" count={projects.length}>
          <ul className="space-y-3">
            {projects.map((p) => (
              <li key={p.id} className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs text-navy-600">
                  /work/{p.slug}
                </span>
                <Value>{p.title}</Value>
                <Value>{p.industry.name}</Value>
                {p.services.map((s) => (
                  <Tag key={s.slug}>{s.name}</Tag>
                ))}
                {p.featured && (
                  <Tag className="bg-orange-100! text-orange-800!">
                    Featured
                  </Tag>
                )}
                <span className="text-xs text-navy-600">
                  {p.gallery.length} images · {p.videos.length} videos
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-6 grid gap-2 text-sm text-navy-700">
            <p>
              Featured: {featured.map((p) => p.slug).join(", ")} (draft project
              7 is excluded)
            </p>
            <p>
              Filter service=branding: {branding.map((p) => p.slug).join(", ")}
            </p>
            <p>
              Filter service=digital-marketing + industry=industry-a:{" "}
              {digitalInA.map((p) => p.slug).join(", ")}
            </p>
            <p>
              Previous/next for {projects[0]?.slug}: {adjacent.previous?.slug} /{" "}
              {adjacent.next?.slug}
            </p>
            <p>
              Industries with projects:{" "}
              {industries.map((i) => i.slug).join(", ")}
            </p>
          </div>
        </Block>

        <Block title="Site settings">
          <dl className="grid gap-x-6 gap-y-2 text-sm sm:grid-cols-[12rem_1fr]">
            <dt className="text-navy-600">Phone(s)</dt>
            <dd>
              {settings.phones.map((p) => (
                <Value key={p}>{p}</Value>
              ))}
            </dd>
            <dt className="text-navy-600">Email</dt>
            <dd>
              <Value>{settings.email}</Value>
            </dd>
            <dt className="text-navy-600">WhatsApp</dt>
            <dd>
              <Value>{settings.whatsappNumber}</Value>
            </dd>
            <dt className="text-navy-600">Telegram</dt>
            <dd>
              <Value>{settings.telegramUsername}</Value>
            </dd>
            <dt className="text-navy-600">Address</dt>
            <dd>
              <Value>{settings.address}</Value>
            </dd>
            <dt className="text-navy-600">Office hours</dt>
            <dd>
              <Value>{settings.officeHours}</Value>
            </dd>
            <dt className="text-navy-600">Map</dt>
            <dd>
              {settings.mapEmbedUrl ?? (
                <span className="font-mono text-orange-800">
                  not provided yet (null)
                </span>
              )}
            </dd>
            <dt className="text-navy-600">Social links</dt>
            <dd className="flex flex-col gap-1">
              {settings.socialLinks.map((l) => (
                <span key={l.platform}>
                  {l.platform}: <Value>{l.url}</Value>
                </span>
              ))}
            </dd>
            <dt className="text-navy-600">Homepage numbers</dt>
            <dd className="flex flex-col gap-1">
              {settings.homepageStats.map((s, i) => (
                <span key={i}>
                  <Value>{s.value}</Value> <Value>{s.label}</Value>
                </span>
              ))}
            </dd>
          </dl>
        </Block>

        <Block title="Testimonials, client logos, team">
          <p className="text-sm text-navy-700">
            {testimonials.length} testimonials · {logos.length} client logos ·{" "}
            {team.length} team members (all placeholders)
          </p>
        </Block>

        <Block title="Form options">
          <p className="text-sm">
            Budget:{" "}
            {options.budgetRanges.map((b) => (
              <Value key={b}>{b}</Value>
            ))}
          </p>
          <p className="mt-2 text-sm">
            Timeline:{" "}
            {options.timelines.map((t) => (
              <Value key={t}>{t}</Value>
            ))}
          </p>
        </Block>

        <Block title="Page copy (from Meliel)">
          <div className="space-y-3 text-sm text-navy-700">
            <p>
              <strong>Mission:</strong> {mission}
            </p>
            <p>
              <strong>Vision:</strong> {vision}
            </p>
            <p>
              <strong>Values:</strong> {values.map((v) => v.title).join(" ")}
            </p>
            <p>
              <strong>Process:</strong>{" "}
              {processSteps.map((s) => s.title).join(" ")}
            </p>
            <p>
              <strong>Differentiator:</strong> {differentiator}
            </p>
            <p>
              <strong>Still missing:</strong>{" "}
              <Value>{pendingCopy.companyStory[0]}</Value>{" "}
              <Value>{pendingCopy.foundingYear}</Value>
            </p>
          </div>
        </Block>
      </Section>
    </>
  );
}
