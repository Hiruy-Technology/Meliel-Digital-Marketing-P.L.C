import type { CollectionConfig } from "payload";
import { requiredInEnglish } from "@/fields/required-in-english";
import { adminOnly, signedIn } from "./access";

// The 5 services. Their slugs are built into the site (/services#branding, /quote?service=branding,
// the ServiceSlug type), so editors can change the wording but not the slugs, and only an admin can
// add or delete a service.
export const Services: CollectionConfig = {
  slug: "services",
  admin: {
    group: "Portfolio",
    useAsTitle: "name",
    defaultColumns: ["name", "slug", "sortOrder"],
  },
  defaultSort: "sortOrder",
  access: {
    read: signedIn,
    create: adminOnly,
    update: signedIn,
    delete: adminOnly,
  },
  fields: [
    {
      name: "name",
      type: "text",
      localized: true,
      validate: requiredInEnglish,
    },
    {
      name: "slug",
      type: "select",
      required: true,
      unique: true,
      options: [
        { label: "Branding", value: "branding" },
        { label: "Digital marketing", value: "digital-marketing" },
        { label: "Market analysis", value: "market-analysis" },
        { label: "Websites", value: "websites" },
        { label: "Event production", value: "event-production" },
      ],
      access: { update: () => false },
      admin: {
        position: "sidebar",
        description: "Built into the site, so it can't be changed.",
      },
    },
    {
      name: "summary",
      type: "textarea",
      localized: true,
      validate: requiredInEnglish,
    },
    {
      // The rows are shared and only their text has two languages, so a choice made on the quote
      // form means the same row in either language.
      name: "includes",
      type: "array",
      labels: { singular: "Item", plural: "Includes" },
      admin: {
        description:
          "Optional list. Visitors can tick these items on the quote page.",
      },
      fields: [
        {
          name: "item",
          type: "text",
          localized: true,
          validate: requiredInEnglish,
        },
      ],
    },
    {
      name: "note",
      type: "text",
      localized: true,
      admin: { description: "e.g. Event Production's pricing note." },
    },
    {
      name: "sortOrder",
      type: "number",
      required: true,
      defaultValue: 0,
      admin: { position: "sidebar", description: "Lower numbers come first." },
    },
  ],
};
