// Turns the YouTube/Vimeo links editors paste into the CMS into player URLs.
// Used by the click-to-load video facade, so no third-party player loads until a visitor asks.

import type { Video } from "./types";

const YOUTUBE =
  /(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:watch\?(?:[^#]*&)?v=|embed\/|shorts\/|live\/))([\w-]{11})/;
const VIMEO = /vimeo\.com\/(?:video\/)?(\d+)/;

/** Player URL for an embedded video, or null if there is no usable link. */
export function videoEmbedUrl(
  video: Pick<Video, "provider" | "url">,
): string | null {
  if (!video.url) return null;
  if (video.provider === "youtube") {
    const id = video.url.match(YOUTUBE)?.[1];
    // The no-cookie domain sets no tracking cookies until the visitor plays the video.
    return id
      ? `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`
      : null;
  }
  if (video.provider === "vimeo") {
    const id = video.url.match(VIMEO)?.[1];
    return id ? `https://player.vimeo.com/video/${id}?autoplay=1&dnt=1` : null;
  }
  return null;
}
