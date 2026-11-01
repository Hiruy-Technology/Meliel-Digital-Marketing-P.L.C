/**
 * For two-language fields that must be filled in English only. These fields can't use `required`:
 * Payload would demand them in Amharic too, and the database would refuse an empty Amharic value, so
 * nothing could be saved in Amharic until every Amharic field was filled in.
 */
export const requiredInEnglish = (
  value: unknown,
  { req }: { req: { locale?: string | null } },
) =>
  req.locale !== "en" ||
  (typeof value === "string" && value.trim() !== "") ||
  "This is required in English.";
