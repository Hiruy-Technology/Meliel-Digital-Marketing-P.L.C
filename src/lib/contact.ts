// Builds contact links from Site Settings. Each returns null while the value is still a
// placeholder, so components never render a broken link.

import { isPlaceholder } from "./placeholder";

export function whatsappHref(number: string): string | null {
  if (isPlaceholder(number)) return null;
  const digits = number.replace(/\D/g, "");
  return digits ? `https://wa.me/${digits}` : null;
}

export function telegramHref(username: string): string | null {
  if (isPlaceholder(username)) return null;
  const name = username.trim().replace(/^@/, "");
  return name ? `https://t.me/${name}` : null;
}

export function phoneHref(phone: string): string | null {
  if (isPlaceholder(phone)) return null;
  const tel = phone.replace(/[^\d+]/g, "");
  return tel ? `tel:${tel}` : null;
}

export function emailHref(email: string): string | null {
  return isPlaceholder(email) ? null : `mailto:${email.trim()}`;
}

export function externalHref(url: string): string | null {
  return isPlaceholder(url) || !/^https?:\/\//.test(url) ? null : url;
}
