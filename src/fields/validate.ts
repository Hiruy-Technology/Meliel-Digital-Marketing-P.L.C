// Checks for values the site turns into links. Empty is fine: `required` handles that separately.

const matches = (pattern: RegExp, message: string) => (value: unknown) =>
  !value || (typeof value === "string" && pattern.test(value)) || message;

export const httpsUrl = matches(
  /^https:\/\/\S+$/,
  "Use a full link starting with https://",
);

/** Digits only, as wa.me links need it. */
export const whatsappNumber = matches(
  /^\d{9,15}$/,
  "Use the international format with digits only, e.g. 251911234567.",
);

export const telegramUsername = matches(
  /^[A-Za-z0-9_]{5,32}$/,
  "Use the username only, without @ or a link.",
);

/** This URL goes into an iframe on the contact page, so only Google's embed address is allowed. */
export const googleMapEmbed = matches(
  /^https:\/\/www\.google\.com\/maps\/embed\?\S+$/,
  "In Google Maps, choose Share, then Embed a map, and paste the link from the src attribute.",
);
