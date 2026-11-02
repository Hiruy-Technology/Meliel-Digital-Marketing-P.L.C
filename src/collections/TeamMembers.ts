import type { CollectionConfig } from "payload";
import { requiredInEnglish } from "@/fields/required-in-english";
import { signedIn } from "./access";
import { isImage } from "./Media";

// Optional: the About section stays hidden while this is empty.
export const TeamMembers: CollectionConfig = {
  slug: "team-members",
  labels: { singular: "Team member", plural: "Team" },
  admin: {
    group: "Site content",
    useAsTitle: "name",
    defaultColumns: ["name", "role", "sortOrder"],
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
      name: "role",
      type: "text",
      localized: true,
      validate: requiredInEnglish,
    },
    { name: "bio", type: "textarea", localized: true },
    {
      name: "photo",
      type: "upload",
      relationTo: "media",
      filterOptions: isImage,
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
