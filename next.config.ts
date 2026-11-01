import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Self-contained server build, so the site runs on Vercel or Hiruy's VPS (PM2 + Nginx).
  output: "standalone",
  // The file tracer copies sharp's .node file but misses the libvips libraries beside it, and without
  // them every Payload route fails in the standalone build, though dev works.
  outputFileTracingIncludes: {
    "/**": ["./node_modules/.pnpm/@img+sharp-*/node_modules/@img/*/lib/**"],
  },
  // Serve photos as AVIF (smallest) with WebP fallback: many visitors are on slow mobile data.
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default withPayload(nextConfig, { devBundleServerPackages: false });
