import { notFound } from "next/navigation";

// Unknown URLs land here, so they get the styled 404 with the site's header and footer.
export default function CatchAll() {
  notFound();
}
