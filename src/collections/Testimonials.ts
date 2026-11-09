import type { CollectionConfig } from "payload";
import { requiredInEnglish } from "@/fields/required-in-english";
import { refreshHooks } from "@/fields/revalidate";
import { signedIn } from "./access";
import { isImage } from "./Media";

export const Testimonials: CollectionConfig = {
  slug: "testimonials",
  admin: {
    description: "Client quotes. Featured ones appear on the home page.",
    group: "Site content",
    useAsTitle: "name",
    defaultColumns: ["name", "company", "featured"],
  },
  hooks: refreshHooks,
  access: {
    read: signedIn,
    create: signedIn,
    update: signedIn,
    delete: signedIn,
  },
  fields: [
    {
      name: "quote",
      type: "textarea",
      localized: true,
      validate: requiredInEnglish,
      admin: { description: "The client's real words. Never write these." },
    },
    { name: "name", type: "text", required: true },
    { name: "jobTitle", label: "Job title", type: "text", localized: true },
    { name: "company", type: "text", localized: true },
    {
      name: "photo",
      type: "upload",
      relationTo: "media",
      filterOptions: isImage,
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
      admin: {
        position: "sidebar",
        description: "Show on the home page.",
        components: { Cell: "/admin/cells#YesNoCell" },
      },
    },
  ],
};
