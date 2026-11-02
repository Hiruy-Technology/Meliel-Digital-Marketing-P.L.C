import { revalidatePath, revalidateTag } from "next/cache";
import { CMS_TAG } from "@/lib/site";

/** Rebuilds the public pages after an edit, so Meliel sees changes without a new deployment. */
function refreshSite() {
  try {
    revalidateTag(CMS_TAG, { expire: 0 });
    revalidatePath("/(frontend)/[locale]", "layout");
    revalidatePath("/sitemap.xml");
  } catch {
    // Outside Next.js (pnpm seed) there's nothing to refresh.
  }
}

export const refreshAfterChange = <T>({ doc }: { doc: T }) => {
  refreshSite();
  return doc;
};

/** For every collection the website shows. */
export const refreshHooks = {
  afterChange: [refreshAfterChange],
  afterDelete: [refreshAfterChange],
};
