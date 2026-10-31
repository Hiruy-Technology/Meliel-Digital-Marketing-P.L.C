import { isPreview } from "@/lib/site";
import { getI18n } from "@/i18n";

// Shown only on the design-preview deployment (NEXT_PUBLIC_SITE_ENV=preview), so the client
// knows marked content is still to come.
export async function PreviewBanner() {
  if (!isPreview) return null;
  const { t } = await getI18n();
  return (
    <div className="bg-orange-500 px-4 py-2 text-center text-sm font-medium text-navy-900">
      {t.preview.banner}
    </div>
  );
}
