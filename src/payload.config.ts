import path from "path";
import { fileURLToPath } from "url";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload";
import { Users } from "./collections/Users";

const dirname = path.dirname(fileURLToPath(import.meta.url));

// The Portfolio Manager at /admin. Content collections arrive in step 14.
export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: { titleSuffix: " | Meliel Portfolio Manager" },
  },
  collections: [Users],
  editor: lexicalEditor(),
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
