"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { MediaImage } from "@/components/ui/MediaImage";
import { Value } from "@/components/ui/Value";
import type { Video } from "@/lib/types";
import { videoEmbedUrl } from "@/lib/video";

// Click-to-load video: only a thumbnail until the visitor presses play, so YouTube/Vimeo add
// nothing to the page's load on slow connections. Players have their own full-screen button.
export function VideoFacade({ video }: { video: Video }) {
  const [playing, setPlaying] = useState(false);
  const embedUrl = videoEmbedUrl(video);
  const uploadUrl = video.provider === "upload" ? video.url : null;
  const playable = Boolean(embedUrl || uploadUrl);
  const title = video.title;

  const playBadge =
    "absolute bottom-4 left-4 inline-flex size-14 items-center justify-center rounded-full bg-orange-500 text-navy-900 shadow-lg";

  return (
    <figure>
      {playing && embedUrl ? (
        <iframe
          src={embedUrl}
          title={title}
          allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
          allowFullScreen
          className="aspect-video w-full rounded-sm border-0 bg-navy-950"
        />
      ) : playing && uploadUrl ? (
        <video
          src={uploadUrl}
          controls
          autoPlay
          className="aspect-video w-full rounded-sm bg-navy-950"
        />
      ) : (
        <div className="group relative">
          <MediaImage
            media={video.thumbnail}
            sizes="(min-width: 768px) 50vw, 100vw"
          />
          {playable ? (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              aria-label={`Play video: ${title}`}
              className="absolute inset-0 rounded-sm"
            >
              <span
                className={`${playBadge} transition-transform group-hover:scale-105`}
              >
                <Icon name="play" className="fill-current" />
              </span>
            </button>
          ) : (
            // No link yet: shows where the play button goes, but does nothing.
            <span aria-hidden className={`${playBadge} opacity-60`}>
              <Icon name="play" className="fill-current" />
            </span>
          )}
        </div>
      )}
      <figcaption className="mt-3 text-sm text-navy-700">
        <Value value={title} />
      </figcaption>
    </figure>
  );
}
