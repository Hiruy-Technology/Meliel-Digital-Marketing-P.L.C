import type { MetadataRoute } from "next";
import { amharicApproved, defaultLocale, localePath } from "@/i18n/config";
import { getProjects } from "@/lib/data";
import { isPreview, siteUrl } from "@/lib/site";

const PAGES = [
  "/",
  "/about",
  "/services",
  "/work",
  "/quote",
  "/contact",
  "/privacy",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (isPreview) return [];
  const projects = await getProjects({}, defaultLocale);
  const entries: { path: string; lastModified?: string }[] = [
    ...PAGES.map((path) => ({ path })),
    ...projects.map((project) => ({
      path: `/work/${project.slug}`,
      lastModified: project.publishedAt,
    })),
  ];
  const languages = amharicApproved
    ? (["en", "am"] as const)
    : (["en"] as const);
  return languages.flatMap((locale) =>
    entries.map(({ path, lastModified }) => ({
      url: `${siteUrl}${localePath(path, locale)}`,
      lastModified,
    })),
  );
}
