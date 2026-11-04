import { pageImage } from "@/lib/og";

// The image shown when this page is shared (see src/lib/og.tsx).
const { generateImageMetadata, Image } = pageImage((t) => ({
  eyebrow: t.home.eyebrow,
  title: [
    t.copy.heroHeadline.before,
    t.copy.heroHeadline.highlight,
    t.copy.heroHeadline.after,
  ].join(""),
}));

export { generateImageMetadata };
export default Image;
