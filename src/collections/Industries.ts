import type { CollectionConfig } from "payload";
import { requiredInEnglish } from "@/fields/required-in-english";
import { slugField } from "@/fields/slug";
import { signedIn } from "./access";

export const Industries: CollectionConfig = {
  slug: "industries",
  labels: { singular: "Industry", plural: "Industries" },
  admin: {
    group: "Portfolio",
    useAsTitle: "name",
    defaultColumns: ["name", "slug"],
  },
  defaultSort: "name",
  access: {
    read: signedIn,
    create: signedIn,
    update: signedIn,
    delete: signedIn,
  },
  fields: [
    {
      name: "name",
      type: "text",
      localized: true,
      validate: requiredInEnglish,
    },
    slugField("name"),
  ],
};
