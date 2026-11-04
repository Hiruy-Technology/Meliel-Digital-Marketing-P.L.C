import { getDictionary } from "@/i18n";
import { hasLocale, type Locale } from "@/i18n/config";
import { getProjectBySlug } from "@/lib/data";
import { renderCard, size } from "@/lib/og";

// A shared project page shows its title and client (see src/lib/og.tsx).
type Params = { locale?: string; slug: string };

const toLocale = (value: unknown): Locale =>
  typeof value === "string" && hasLocale(value) ? value : "en";

export async function generateImageMetadata({ params }: { params: Params }) {
  const locale = toLocale(params.locale);
  const project = await getProjectBySlug(params.slug, locale);
  return [
    {
      id: "share",
      alt: project?.title ?? getDictionary(locale).work.title,
      size,
      contentType: "image/png",
    },
  ];
}

export default async function Image({ params }: { params: Promise<Params> }) {
  const { locale: value, slug } = await params;
  const locale = toLocale(value);
  const t = getDictionary(locale);
  const project = await getProjectBySlug(slug, locale);
  return renderCard(
    locale,
    project
      ? { eyebrow: project.clientName, title: project.title }
      : { eyebrow: t.work.eyebrow, title: t.work.title },
  );
}
