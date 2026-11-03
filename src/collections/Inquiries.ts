import type { CollectionConfig } from "payload";
import { adminOnly, signedIn } from "./access";

// A backup of every form submission. Nobody creates or edits these through /api or the admin: the
// site's forms save them on the server (step 16), so a submission stays exactly as it was sent.
export const Inquiries: CollectionConfig = {
  slug: "inquiries",
  labels: { singular: "Inquiry", plural: "Inquiries" },
  admin: {
    group: "Inbox",
    useAsTitle: "name",
    defaultColumns: ["name", "type", "email", "locale", "createdAt"],
    listSearchableFields: ["name", "email", "company"],
  },
  defaultSort: "-createdAt",
  access: {
    read: signedIn,
    create: () => false,
    update: () => false,
    delete: adminOnly,
  },
  fields: [
    {
      name: "type",
      type: "select",
      required: true,
      options: [
        { label: "General inquiry", value: "general" },
        { label: "Quote request", value: "quote" },
      ],
    },
    {
      name: "locale",
      label: "Language",
      type: "select",
      required: true,
      defaultValue: "en",
      options: [
        { label: "English", value: "en" },
        { label: "Amharic", value: "am" },
      ],
      admin: { description: "The language the visitor used." },
    },
    { name: "name", type: "text", required: true },
    { name: "company", type: "text" },
    { name: "email", type: "email", required: true },
    { name: "phone", type: "text" },
    {
      name: "services",
      type: "relationship",
      relationTo: "services",
      hasMany: true,
    },
    {
      name: "selectedIncludes",
      label: "Specific items",
      type: "text",
      hasMany: true,
    },
    { name: "budget", type: "text" },
    { name: "timeline", type: "text" },
    { name: "message", type: "textarea" },
    {
      name: "emailStatus",
      label: "Email to Meliel",
      type: "select",
      defaultValue: "not-configured",
      options: [
        { label: "Sent", value: "sent" },
        { label: "Failed (the inquiry is still saved)", value: "failed" },
        { label: "Email not set up", value: "not-configured" },
      ],
      admin: { position: "sidebar" },
    },
  ],
};
