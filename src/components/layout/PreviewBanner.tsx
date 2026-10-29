// Shown only on the design-preview deployment (NEXT_PUBLIC_SITE_ENV=preview), so the client
// knows marked content is still to come.
export function PreviewBanner() {
  if (process.env.NEXT_PUBLIC_SITE_ENV !== "preview") return null;
  return (
    <div className="bg-orange-500 px-4 py-2 text-center text-sm font-medium text-navy-900">
      Design preview for Meliel Digital Marketing. Boxes marked “PLACEHOLDER”
      are waiting for your content.
    </div>
  );
}
