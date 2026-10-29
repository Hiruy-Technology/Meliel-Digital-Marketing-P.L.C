import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Self-contained server build, so the site runs on Vercel or Hiruy's VPS (PM2 + Nginx).
  output: "standalone",
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
