import Image from "next/image";
import clsx from "clsx";
import { placeholderLabel } from "@/lib/placeholder";
import type { Media } from "@/lib/types";
import { PlaceholderImage } from "./PlaceholderImage";

type MediaImageProps = {
  media: Media;
  /** Tailwind aspect class for the frame, e.g. "aspect-[4/3]". */
  aspect?: string;
  /** Responsive sizes hint for next/image, e.g. "(min-width: 1024px) 33vw, 100vw". */
  sizes: string;
  /** Only for the first large image on a page (above the fold). */
  preload?: boolean;
  /** "cover" crops to fill (photos); "contain" shows the whole image (logos). */
  fit?: "cover" | "contain";
  className?: string;
};

// A CMS image through next/image (AVIF/WebP, lazy-loaded), or a PlaceholderImage while the
// client hasn't sent it (media.url is null; the alt text describes what's missing).
export function MediaImage({
  media,
  aspect = "aspect-video",
  sizes,
  preload,
  fit = "cover",
  className,
}: MediaImageProps) {
  if (!media.url) {
    return (
      <PlaceholderImage
        label={placeholderLabel(media.alt)}
        aspect={aspect}
        className={className}
      />
    );
  }
  return (
    <div
      className={clsx(
        "relative overflow-hidden rounded-sm bg-tint",
        aspect,
        className,
      )}
    >
      <Image
        src={media.url}
        alt={media.alt}
        fill
        sizes={sizes}
        preload={preload}
        className={fit === "cover" ? "object-cover" : "object-contain p-2"}
      />
    </div>
  );
}
