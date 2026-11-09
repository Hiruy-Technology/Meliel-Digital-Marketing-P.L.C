import path from "path";
import { fileURLToPath } from "url";
import { postgresAdapter } from "@payloadcms/db-postgres";
import {
  BoldFeature,
  FixedToolbarFeature,
  ItalicFeature,
  lexicalEditor,
  LinkFeature,
  OrderedListFeature,
  ParagraphFeature,
  UnorderedListFeature,
} from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload";
import sharp from "sharp";
import { ClientLogos } from "./collections/ClientLogos";
import { Industries } from "./collections/Industries";
import { Inquiries } from "./collections/Inquiries";
import { Media } from "./collections/Media";
import { Projects } from "./collections/Projects";
import { RateLimits } from "./collections/RateLimits";
import { Services } from "./collections/Services";
import { TeamMembers } from "./collections/TeamMembers";
import { Testimonials } from "./collections/Testimonials";
import { Users } from "./collections/Users";
import { SiteSettings } from "./globals/SiteSettings";

const dirname = path.dirname(fileURLToPath(import.meta.url));

// The Portfolio Manager at /admin.
export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: {
      titleSuffix: " | Meliel Portfolio Manager",
      icons: [{ rel: "icon", type: "image/svg+xml", url: "/icon.svg" }],
    },
    // Meliel's brand on Payload's own screens (src/admin/). Paths are relative to src/; run
    // `pnpm generate:importmap` after changing them.
    components: {
      providers: ["/admin/Providers"],
      graphics: { Logo: "/admin/Logo", Icon: "/admin/Icon" },
      beforeLogin: ["/admin/LoginIntro"],
      afterLogin: ["/admin/LoginFooter"],
      beforeNavLinks: ["/admin/ViewSiteLink"],
      beforeDashboard: ["/admin/Dashboard"],
    },
  },
  collections: [
    Inquiries,
    Projects,
    Services,
    Industries,
    Media,
    Testimonials,
    ClientLogos,
    TeamMembers,
    Users,
    RateLimits,
  ],
  globals: [SiteSettings],
  // Content languages only: the admin itself stays in English.
  localization: {
    locales: [
      { code: "en", label: "English" },
      { code: "am", label: "አማርኛ" },
    ],
    defaultLocale: "en",
    fallback: true,
  },
  // Only what a case study needs, so editors can't break the page design.
  editor: lexicalEditor({
    features: [
      ParagraphFeature(),
      BoldFeature(),
      ItalicFeature(),
      LinkFeature({ enabledCollections: [] }),
      UnorderedListFeature(),
      OrderedListFeature(),
      FixedToolbarFeature(),
    ],
  }),
  sharp,
  upload: { limits: { fileSize: 50 * 1024 * 1024 }, abortOnLimit: true },
  secret: process.env.PAYLOAD_SECRET || "",
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URL || "" },
    migrationDir: path.resolve(dirname, "migrations"),
  }),
  typescript: { outputFile: path.resolve(dirname, "payload-types.ts") },
  // The site only uses Payload's local API and REST, so GraphQL stays off.
  graphQL: { disable: true },
  telemetry: false,
});
