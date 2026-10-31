import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Self-contained server build, so the site runs on Vercel or Hiruy's VPS (PM2 + Nginx).
  output: "standalone",
  // Serve photos as AVIF (smallest) with WebP fallback: many visitors are on slow mobile data.
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default withPayload(nextConfig, { devBundleServerPackages: false });
