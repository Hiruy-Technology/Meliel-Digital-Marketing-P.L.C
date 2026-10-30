import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/data";
import { isPreview, siteUrl } from "@/lib/site";

const PAGES = [
  "",
  "/about",
  "/services",
  "/work",
  "/quote",
  "/contact",
  "/privacy",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (isPreview) return [];
  const projects = await getProjects();
  return [
    ...PAGES.map((path) => ({ url: `${siteUrl}${path}` })),
    ...projects.map((project) => ({
      url: `${siteUrl}/work/${project.slug}`,
      lastModified: project.publishedAt,
    })),
  ];
}
