import type { CollectionConfig } from "payload";
import { adminOnly } from "./access";

// One row per accepted form submission (and, from step 17, per AI draft), for rate limiting that
// works on any host. `key` is a scrambled code made from the visitor's IP address, never the address
// itself. Rows older than a day are deleted as new ones come in (src/lib/rate-limit.ts).
export const RateLimits: CollectionConfig = {
  slug: "rate-limits",
  admin: { hidden: true },
  access: {
    read: adminOnly,
    create: () => false,
    update: () => false,
    delete: adminOnly,
  },
  fields: [
    { name: "key", type: "text", required: true, index: true },
    {
      name: "action",
      type: "select",
      required: true,
      index: true,
      options: [
        { label: "Contact form", value: "contact" },
        { label: "Quote form", value: "quote" },
      ],
    },
  ],
};
