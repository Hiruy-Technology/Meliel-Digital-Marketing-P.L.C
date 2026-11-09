import type { CollectionConfig, TextFieldSingleValidation } from "payload";
import { requiredInEnglish } from "@/fields/required-in-english";
import { slugField } from "@/fields/slug";
import { videoEmbedUrl } from "@/lib/video";
import { refreshHooks } from "@/fields/revalidate";
import { signedIn } from "./access";
import { isImage } from "./Media";

const videoLink: TextFieldSingleValidation = (value, { siblingData }) => {
  const { provider } = siblingData as {
    provider: "youtube" | "vimeo" | "upload";
  };
  if (provider === "upload") return true;
  return (
    Boolean(videoEmbedUrl({ provider, url: value ?? null })) ||
    `Paste a full ${provider === "vimeo" ? "Vimeo" : "YouTube"} video link.`
  );
};

export const Projects: CollectionConfig = {
  slug: "projects",
  admin: {
    description:
      "The case studies on the Work page. Only published projects appear on the website.",
    group: "Portfolio",
    useAsTitle: "title",
    defaultColumns: ["title", "clientName", "status", "featured", "sortOrder"],
    listSearchableFields: ["title", "clientName"],
  },
  defaultSort: "sortOrder",
  hooks: refreshHooks,
  access: {
    read: signedIn,
    create: signedIn,
    update: signedIn,
    delete: signedIn,
  },
  fields: [
    {
      name: "title",
      type: "text",
      localized: true,
      validate: requiredInEnglish,
    },
    {
      name: "clientName",
      label: "Client name",
      type: "text",
      localized: true,
      validate: requiredInEnglish,
    },
    {
      type: "tabs",
      tabs: [
        {
          label: "Case study",
          fields: [
            {
              name: "aiNotes",
              label: "Notes for the AI writer",
              type: "textarea",
              admin: {
                description:
                  "Private. Never shown on the website. Short facts about the project: the AI writer will use only these.",
              },
            },
            { name: "challenge", type: "richText", localized: true },
            {
              name: "delivered",
              label: "What we delivered",
              type: "richText",
              localized: true,
            },
            { name: "results", type: "richText", localized: true },
            {
              name: "resultHighlights",
              label: "Result highlights",
              type: "array",
              labels: { singular: "Highlight", plural: "Highlights" },
              admin: { description: "Use real numbers only." },
              fields: [
                {
                  type: "row",
                  fields: [
                    {
                      name: "value",
                      type: "text",
                      required: true,
                      admin: { placeholder: "+240%" },
                    },
                    {
                      name: "label",
                      type: "text",
                      localized: true,
                      validate: requiredInEnglish,
                      admin: { placeholder: "Instagram reach" },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "Images and video",
          fields: [
            {
              name: "coverImage",
              label: "Cover image",
              type: "upload",
              relationTo: "media",
              filterOptions: isImage,
              admin: {
                description:
                  "Optional. Without a photo, the site shows a branded cover with the client's name and first result.",
              },
            },
            {
              name: "gallery",
              type: "upload",
              relationTo: "media",
              hasMany: true,
              filterOptions: isImage,
            },
            {
              name: "videos",
              type: "array",
              labels: { singular: "Video", plural: "Videos" },
              fields: [
                {
                  name: "provider",
                  label: "Where it's hosted",
                  type: "select",
                  required: true,
                  defaultValue: "youtube",
                  options: [
                    { label: "YouTube", value: "youtube" },
                    { label: "Vimeo", value: "vimeo" },
                    { label: "Uploaded MP4", value: "upload" },
                  ],
                },
                {
                  name: "url",
                  label: "Video link",
                  type: "text",
                  admin: {
                    condition: (_, row) => row?.provider !== "upload",
                  },
                  validate: videoLink,
                },
                {
                  name: "file",
                  label: "Video file",
                  type: "upload",
                  relationTo: "media",
                  filterOptions: { mimeType: { contains: "video" } },
                  admin: {
                    condition: (_, row) => row?.provider === "upload",
                  },
                },
                { name: "title", type: "text", localized: true },
                {
                  name: "thumbnail",
                  label: "Preview image",
                  type: "upload",
                  relationTo: "media",
                  filterOptions: isImage,
                },
              ],
            },
          ],
        },
      ],
    },
    slugField("title"),
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "draft",
      options: [
        { label: "Draft", value: "draft" },
        { label: "Published", value: "published" },
      ],
      admin: {
        position: "sidebar",
        description: "Only published projects appear on the website.",
        components: { Cell: "/admin/cells#ProjectStatusCell" },
      },
    },
    {
      name: "industry",
      type: "relationship",
      relationTo: "industries",
      required: true,
      admin: { position: "sidebar" },
    },
    {
      name: "services",
      type: "relationship",
      relationTo: "services",
      hasMany: true,
      required: true,
      admin: { position: "sidebar" },
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
    {
      name: "sortOrder",
      label: "Sort order",
      type: "number",
      required: true,
      defaultValue: 0,
      admin: { position: "sidebar", description: "Lower numbers come first." },
    },
    {
      name: "publishedAt",
      label: "Published on",
      type: "date",
      admin: {
        position: "sidebar",
        description: "Set automatically the first time it's published.",
      },
      hooks: {
        beforeChange: [
          ({ value, siblingData }) =>
            value ||
            (siblingData.status === "published"
              ? new Date().toISOString()
              : value),
        ],
      },
    },
  ],
};
