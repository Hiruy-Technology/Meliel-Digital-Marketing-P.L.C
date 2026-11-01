import { ValidationError, type TextField } from "payload";

const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;

const slugify = (text: unknown) =>
  String(text ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);

/**
 * The web address of an item, shared by both languages. Built once from the English `source` field,
 * then left alone, so a later title change never breaks a live link. Amharic titles give no address,
 * so an item must have its English title first. Not `required`, or the admin form would refuse to
 * save it empty before this hook runs.
 */
export const slugField = (source: string): TextField => ({
  name: "slug",
  type: "text",
  unique: true,
  index: true,
  admin: {
    position: "sidebar",
    description:
      "The web address. Leave it empty to create it from the English title. Changing it later breaks existing links.",
  },
  validate: (value: string | null | undefined) =>
    !value ||
    SLUG.test(value) ||
    "Use only lowercase English letters, numbers and hyphens.",
  hooks: {
    beforeValidate: [
      ({ value, data, originalDoc }) =>
        value || originalDoc?.slug || slugify(data?.[source]) || undefined,
    ],
    beforeChange: [
      ({ value, collection }) => {
        if (value) return value;
        throw new ValidationError({
          collection: collection?.slug,
          errors: [
            {
              message: "Add the English version first: it creates the address.",
              path: "slug",
            },
          ],
        });
      },
    ],
  },
});
