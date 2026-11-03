import { createHash } from "node:crypto";
import { headers } from "next/headers";
import type { Payload } from "payload";

/** Accepted submissions allowed per hour: per visitor, and for the whole site (Resend's quota). */
export const LIMITS = { perVisitor: 5, site: 60 };

const HOUR = 60 * 60 * 1000;
const DAY = 24 * HOUR;

/**
 * A scrambled code for the visitor's IP address, so the database never holds the address itself.
 * The first header that exists wins: Cloudflare's, then Nginx's, then the standard one. Behind a
 * host that doesn't set them, every visitor shares one code, and only the site-wide limit applies.
 */
export async function visitorKey(): Promise<string> {
  const h = await headers();
  const ip =
    h.get("cf-connecting-ip") ??
    h.get("x-real-ip") ??
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";
  return createHash("sha256")
    .update(`${process.env.PAYLOAD_SECRET}:${ip}`)
    .digest("hex");
}

/** Records the submission and returns true, or returns false if a limit is reached. */
export async function allowSubmission(
  payload: Payload,
  action: "contact" | "quote",
  key: string,
): Promise<boolean> {
  const now = Date.now();
  await payload.delete({
    collection: "rate-limits",
    where: { createdAt: { less_than: new Date(now - DAY).toISOString() } },
  });
  const since = { greater_than: new Date(now - HOUR).toISOString() };
  const [mine, site] = await Promise.all([
    payload.count({
      collection: "rate-limits",
      where: {
        key: { equals: key },
        action: { equals: action },
        createdAt: since,
      },
    }),
    payload.count({ collection: "rate-limits", where: { createdAt: since } }),
  ]);
  if (mine.totalDocs >= LIMITS.perVisitor || site.totalDocs >= LIMITS.site) {
    return false;
  }
  await payload.create({ collection: "rate-limits", data: { key, action } });
  return true;
}
