import path from "path";
import { fileURLToPath } from "url";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload";
import sharp from "sharp";
import { ClientLogos } from "./collections/ClientLogos";
import { Industries } from "./collections/Industries";
import { Inquiries } from "./collections/Inquiries";
import { Media } from "./collections/Media";
import { Projects } from "./collections/Projects";
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
    meta: { titleSuffix: " | Meliel Portfolio Manager" },
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
  editor: lexicalEditor(),
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
