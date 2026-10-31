import { notFound } from "next/navigation";

// With separate root layouts for the site and /admin, Next.js has no single root 404. This sends
// any unknown URL to (frontend)/not-found.tsx, which keeps the site's header and footer.
export default function CatchAll() {
  notFound();
}
