import path from "path";
import type { CollectionConfig } from "payload";
import { requiredInEnglish } from "@/fields/required-in-english";
import { signedIn } from "./access";

// Uploaded images and short videos. Local disk in dev, Cloudflare R2 in production (step 18).
export const Media: CollectionConfig = {
  slug: "media",
  labels: { singular: "Media file", plural: "Media" },
  admin: {
    group: "Portfolio",
    useAsTitle: "alt",
    defaultColumns: ["filename", "alt", "updatedAt"],
  },
  access: {
    // Files must load for every visitor.
    read: () => true,
    create: signedIn,
    update: signedIn,
    delete: signedIn,
  },
  upload: {
    staticDir: path.resolve(process.cwd(), "media"),
    // No SVG: an uploaded SVG can carry scripts that run on this domain.
    mimeTypes: [
      "image/png",
      "image/jpeg",
      "image/webp",
      "image/avif",
      "video/mp4",
    ],
    imageSizes: [{ name: "thumbnail", width: 400 }],
    adminThumbnail: "thumbnail",
  },
  fields: [
    {
      name: "alt",
      label: "Alt text",
      type: "text",
      localized: true,
      validate: requiredInEnglish,
      admin: {
        description:
          "Describe the image for people who can't see it, and for Google.",
      },
    },
  ],
};
