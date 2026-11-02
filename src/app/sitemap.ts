import type { MetadataRoute } from "next";
import { amharicApproved, localePath } from "@/i18n/config";
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
  const languages = amharicApproved
    ? (["en", "am"] as const)
    : (["en"] as const);
  const lists = await Promise.all(
    languages.map(async (locale) => {
      const projects = await getProjects({}, locale);
      const entries: { path: string; lastModified?: string }[] = [
        ...PAGES.map((path) => ({ path })),
        ...projects.map((project) => ({
          path: `/work/${project.slug}`,
          lastModified: project.publishedAt,
        })),
      ];
      return entries.map(({ path, lastModified }) => ({
        url: `${siteUrl}${localePath(path, locale)}`,
        lastModified,
      }));
    }),
  );
  return lists.flat();
}
