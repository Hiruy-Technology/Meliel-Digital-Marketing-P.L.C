import type { MetadataRoute } from "next";
import { isPreview, siteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  // The design preview must never appear in search results.
  if (isPreview) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dev/", "/admin", "/contact/thank-you"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
