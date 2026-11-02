// Imports the 5 real services into Payload, in English and Amharic. Run: pnpm seed
// A service that already exists is skipped, so this never overwrites what Meliel has edited.

import { getPayload } from "payload";
import config from "@payload-config";
import { services } from "@/content/seed";
import { servicesAm } from "@/content/services-am";

const payload = await getPayload({ config });

for (const service of services) {
  const { totalDocs } = await payload.count({
    collection: "services",
    where: { slug: { equals: service.slug } },
  });
  if (totalDocs > 0) {
    console.log(`Skipped ${service.slug}: it already exists.`);
    continue;
  }

  const created = await payload.create({
    collection: "services",
    locale: "en",
    data: {
      name: service.name,
      slug: service.slug,
      summary: service.summary,
      note: service.note,
      sortOrder: service.sortOrder,
      includes: service.includes.map((item) => ({ item })),
    },
  });

  // The Amharic goes onto the same rows, so an "includes" row is one item in both languages.
  const amharic = servicesAm[service.slug];
  await payload.update({
    collection: "services",
    id: created.id,
    locale: "am",
    data: {
      name: amharic.name,
      summary: amharic.summary,
      note: amharic.note,
      includes: created.includes?.map((row, i) => ({
        id: row.id,
        item: amharic.includes[i],
      })),
    },
  });
  console.log(`Imported ${service.slug}.`);
}

process.exit(0);
