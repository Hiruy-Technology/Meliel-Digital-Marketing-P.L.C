// Loads the company profile's real content (src/content/profile.ts) into Payload, in English and
// with the Amharic drafts. Run: pnpm import:profile (after pnpm seed, which adds the services).
// Safe to run twice: anything that already exists is skipped, so it never overwrites Meliel's edits.

import { getPayload } from "payload";
import config from "@payload-config";
import { caseStudies, contact, sectors, team } from "@/content/profile";

const payload = await getPayload({ config });

/** Rich text the editor understands: one paragraph per line, or a bullet list. */
const text = (t: string) => ({
  type: "text",
  text: t,
  format: 0,
  version: 1,
  detail: 0,
  mode: "normal",
  style: "",
});
const node = { version: 1, format: "", indent: 0, direction: "ltr" } as const;
function richText(lines: string[]) {
  const children =
    lines.length === 1
      ? [
          {
            ...node,
            type: "paragraph",
            textFormat: 0,
            children: [text(lines[0])],
          },
        ]
      : [
          {
            ...node,
            type: "list",
            listType: "bullet",
            tag: "ul",
            start: 1,
            children: lines.map((line, i) => ({
              ...node,
              type: "listitem",
              value: i + 1,
              children: [text(line)],
            })),
          },
        ];
  return { root: { ...node, type: "root", children } } as never;
}

// Contact details: only fields that are still empty.
const settings = await payload.findGlobal({
  slug: "site-settings",
  locale: "en",
});
const missing = {
  ...(!settings.phones?.length && { phones: contact.phones }),
  ...(!settings.email && { email: contact.email }),
  ...(!settings.address && { address: contact.address }),
};
if (Object.keys(missing).length > 0) {
  await payload.updateGlobal({
    slug: "site-settings",
    locale: "en",
    data: missing,
  });
}
console.log(
  `Contact details: ${Object.keys(missing).join(", ") || "already set, skipped"}.`,
);
const amSettings = await payload.findGlobal({
  slug: "site-settings",
  locale: "am",
  fallbackLocale: false,
});
if (!amSettings.address) {
  await payload.updateGlobal({
    slug: "site-settings",
    locale: "am",
    data: { address: contact.addressAm },
  });
  console.log("Imported the Amharic address.");
}

// Sectors
const industryIds: Record<string, number> = {};
for (const sector of sectors) {
  const found = await payload.find({
    collection: "industries",
    where: { slug: { equals: sector.slug } },
    limit: 1,
  });
  if (found.docs[0]) {
    industryIds[sector.slug] = found.docs[0].id;
    console.log(`Skipped sector ${sector.slug}: it already exists.`);
    continue;
  }
  const doc = await payload.create({
    collection: "industries",
    locale: "en",
    data: { name: sector.name, slug: sector.slug },
  });
  await payload.update({
    collection: "industries",
    id: doc.id,
    locale: "am",
    data: { name: sector.nameAm },
  });
  industryIds[sector.slug] = doc.id;
  console.log(`Imported sector ${sector.slug}.`);
}

// Case studies
const services = await payload.find({ collection: "services", limit: 20 });
const serviceId = (slug: string) =>
  services.docs.find((s) => s.slug === slug)?.id;
for (const [i, study] of caseStudies.entries()) {
  const found = await payload.count({
    collection: "projects",
    where: { slug: { equals: study.slug } },
  });
  if (found.totalDocs > 0) {
    console.log(`Skipped project ${study.slug}: it already exists.`);
    continue;
  }
  const ids = study.services.map(serviceId).filter((id) => id !== undefined);
  if (ids.length === 0) {
    console.log(
      `Skipped project ${study.slug}: run pnpm seed first, for the services.`,
    );
    continue;
  }
  const doc = await payload.create({
    collection: "projects",
    locale: "en",
    data: {
      title: study.client,
      slug: study.slug,
      clientName: study.client,
      industry: industryIds[study.sector],
      services: ids,
      status: "published",
      featured: study.featured,
      sortOrder: i + 1,
      results: richText(study.results),
      resultHighlights: study.highlights.map(({ value, label }) => ({
        value,
        label,
      })),
    },
  });
  // Client names stay as written; the rest gets the Amharic drafts, on the same rows.
  await payload.update({
    collection: "projects",
    id: doc.id,
    locale: "am",
    data: {
      title: study.client,
      clientName: study.client,
      results: richText(study.resultsAm),
      resultHighlights: doc.resultHighlights?.map((row, n) => ({
        id: row.id,
        value: row.value,
        label: study.highlights[n].labelAm,
      })),
    },
  });
  console.log(`Imported project ${study.slug}.`);
}

// Team: the Amharic role draft only. Names need Meliel's own Amharic spelling, so the team stays off
// /am until those are added in /admin.
for (const [i, member] of team.entries()) {
  const found = await payload.count({
    collection: "team-members",
    where: { name: { equals: member.name } },
    locale: "en",
  });
  if (found.totalDocs > 0) {
    console.log(`Skipped team member ${member.name}: already there.`);
    continue;
  }
  const doc = await payload.create({
    collection: "team-members",
    locale: "en",
    data: { name: member.name, role: member.role, sortOrder: i + 1 },
  });
  await payload.update({
    collection: "team-members",
    id: doc.id,
    locale: "am",
    data: { role: member.roleAm },
  });
  console.log(`Imported team member ${member.name}.`);
}

process.exit(0);
