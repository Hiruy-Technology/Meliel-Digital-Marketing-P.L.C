import type { CollectionConfig } from "payload";
import { requiredInEnglish } from "@/fields/required-in-english";
import { httpsUrl } from "@/fields/validate";
import { signedIn } from "./access";
import { isImage } from "./Media";

export const ClientLogos: CollectionConfig = {
  slug: "client-logos",
  labels: { singular: "Client logo", plural: "Client logos" },
  admin: {
    group: "Site content",
    useAsTitle: "name",
    defaultColumns: ["name", "sortOrder"],
    description: "Only show clients who agreed to appear on the website.",
  },
  defaultSort: "sortOrder",
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
    {
      name: "logo",
      type: "upload",
      relationTo: "media",
      required: true,
      filterOptions: isImage,
    },
    {
      name: "url",
      label: "Website",
      type: "text",
      validate: httpsUrl,
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
