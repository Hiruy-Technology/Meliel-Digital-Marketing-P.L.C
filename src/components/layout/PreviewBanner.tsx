import { amharicApproved } from "@/i18n/config";
import { isPreview } from "@/lib/site";
import { getI18n } from "@/i18n";

// Shown only on the design-preview deployment (NEXT_PUBLIC_SITE_ENV=preview), so the client
// knows marked content is still to come. Unreviewed Amharic gets the same treatment on every build.
export async function PreviewBanner() {
  const { locale, t } = await getI18n();
  const notices = [
    isPreview && t.preview.banner,
    locale === "am" && !amharicApproved && t.preview.draftTranslation,
  ].filter(Boolean);
  if (notices.length === 0) return null;
  return (
    <aside
      aria-label={t.preview.notice}
      className="bg-orange-500 px-4 py-2 text-center text-sm font-medium text-navy-900"
    >
      {notices.map((notice) => (
        <p key={String(notice)}>{notice}</p>
      ))}
    </aside>
  );
}
