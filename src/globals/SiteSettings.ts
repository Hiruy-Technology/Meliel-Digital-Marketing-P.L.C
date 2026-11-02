import type { GlobalConfig } from "payload";
import { signedIn } from "@/collections/access";
import { requiredInEnglish } from "@/fields/required-in-english";
import {
  googleMapEmbed,
  httpsUrl,
  telegramUsername,
  whatsappNumber,
} from "@/fields/validate";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Site settings",
  admin: { group: "Settings" },
  access: { read: signedIn, update: signedIn },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Contact",
          fields: [
            {
              name: "phones",
              type: "text",
              hasMany: true,
              admin: { description: "Press Enter after each number." },
            },
            { name: "email", type: "email" },
            {
              name: "whatsappNumber",
              label: "WhatsApp number",
              type: "text",
              validate: whatsappNumber,
              admin: { placeholder: "251911234567" },
            },
            {
              name: "telegramUsername",
              label: "Telegram username",
              type: "text",
              validate: telegramUsername,
            },
            { name: "address", type: "textarea", localized: true },
            {
              name: "officeHours",
              label: "Office hours",
              type: "text",
              localized: true,
            },
            {
              name: "mapEmbedUrl",
              label: "Google Maps embed link",
              type: "text",
              validate: googleMapEmbed,
            },
            {
              name: "socialLinks",
              label: "Social links",
              type: "array",
              labels: { singular: "Link", plural: "Links" },
              fields: [
                {
                  type: "row",
                  fields: [
                    {
                      name: "platform",
                      type: "select",
                      required: true,
                      options: [
                        { label: "Facebook", value: "facebook" },
                        { label: "Instagram", value: "instagram" },
                        { label: "LinkedIn", value: "linkedin" },
                        { label: "TikTok", value: "tiktok" },
                        { label: "X", value: "x" },
                        { label: "YouTube", value: "youtube" },
                        { label: "Telegram", value: "telegram" },
                      ],
                    },
                    {
                      name: "url",
                      type: "text",
                      required: true,
                      validate: httpsUrl,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "Home page numbers",
          fields: [
            {
              name: "homepageStats",
              label: "Stats",
              type: "array",
              labels: { singular: "Stat", plural: "Stats" },
              admin: { description: "Use real numbers only." },
              fields: [
                {
                  type: "row",
                  fields: [
                    { name: "value", type: "text", required: true },
                    {
                      name: "label",
                      type: "text",
                      localized: true,
                      validate: requiredInEnglish,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "Form options",
          description: "The choices offered on the contact and quote forms.",
          fields: [
            {
              name: "budgetRanges",
              label: "Budget ranges",
              type: "array",
              labels: { singular: "Range", plural: "Ranges" },
              fields: [
                {
                  name: "label",
                  type: "text",
                  localized: true,
                  validate: requiredInEnglish,
                },
              ],
            },
            {
              name: "timelines",
              type: "array",
              labels: { singular: "Timeline", plural: "Timelines" },
              fields: [
                {
                  name: "label",
                  type: "text",
                  localized: true,
                  validate: requiredInEnglish,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
