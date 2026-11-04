import { pageImage } from "@/lib/og";

// The image shown when this page is shared (see src/lib/og.tsx).
const { generateImageMetadata, Image } = pageImage((t) => ({
  eyebrow: t.about.eyebrow,
  title: t.copy.nameMeaning.english.title,
}));

export { generateImageMetadata };
export default Image;
