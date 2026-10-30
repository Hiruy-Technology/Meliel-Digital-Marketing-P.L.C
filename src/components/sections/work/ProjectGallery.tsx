"use client";

import { useRef, useState, type KeyboardEvent, type MouseEvent } from "react";
import { Icon } from "@/components/ui/Icon";
import { MediaImage } from "@/components/ui/MediaImage";
import { isPlaceholder } from "@/lib/placeholder";
import type { Media } from "@/lib/types";

// Image grid with a full-screen viewer (contracted feature). Uses the native <dialog>, which
// keeps keyboard focus inside, closes on Esc, and returns focus to the image that opened it.
export function ProjectGallery({ images }: { images: Media[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const many = images.length > 1;

  const show = (i: number) => {
    setIndex(i);
    setOpen(true);
    dialogRef.current?.showModal();
  };
  const step = (by: number) =>
    setIndex((i) => (i + by + images.length) % images.length);

  const onKeyDown = (e: KeyboardEvent<HTMLDialogElement>) => {
    if (e.key === "ArrowRight") step(1);
    if (e.key === "ArrowLeft") step(-1);
  };
  // A click on the dark area around the image (the dialog itself) closes it.
  const onDialogClick = (e: MouseEvent<HTMLDialogElement>) => {
    if (e.target === e.currentTarget) dialogRef.current?.close();
  };

  const current = images[index];
  const navButton =
    "absolute top-1/2 z-10 inline-flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-navy-900/80 text-white ring-1 ring-white/30 hover:bg-navy-800";

  return (
    <>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((image, i) => (
          <li key={`${image.alt}-${i}`} className="group relative">
            <MediaImage
              media={image}
              aspect="aspect-[4/3]"
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            />
            {/* Sits over the image, because a button can't contain block elements */}
            <button
              type="button"
              onClick={() => show(i)}
              aria-label={`View image ${i + 1} of ${images.length} full screen`}
              className="absolute inset-0 flex items-end justify-end rounded-sm p-3"
            >
              <span className="inline-flex size-10 items-center justify-center rounded-full bg-white/90 text-navy-900 opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100">
                <Icon name="expand" className="size-5" />
              </span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        data-tone="dark"
        aria-label="Project images"
        onClose={() => setOpen(false)}
        onKeyDown={onKeyDown}
        onClick={onDialogClick}
        className="h-dvh max-h-none w-screen max-w-none bg-navy-950/95 text-white backdrop:bg-navy-950/80"
      >
        {open && current && (
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between px-4 py-3 sm:px-6">
              <p className="text-sm text-navy-200" aria-live="polite">
                {index + 1} / {images.length}
              </p>
              <button
                type="button"
                onClick={() => dialogRef.current?.close()}
                className="inline-flex size-11 items-center justify-center rounded-sm text-white hover:bg-white/10"
              >
                <Icon name="close" />
                <span className="sr-only">Close</span>
              </button>
            </div>

            <div className="relative min-h-0 flex-1 px-4 sm:px-20">
              <MediaImage
                key={index}
                media={current}
                aspect="h-full w-full"
                fit="contain"
                sizes="100vw"
                className="bg-transparent"
              />
              {many && (
                <>
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    className={`${navButton} left-2 sm:left-5`}
                  >
                    <Icon name="chevron-left" />
                    <span className="sr-only">Previous image</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    className={`${navButton} right-2 sm:right-5`}
                  >
                    <Icon name="chevron-right" />
                    <span className="sr-only">Next image</span>
                  </button>
                </>
              )}
            </div>

            <p className="min-h-12 px-4 py-3 text-center text-sm text-navy-200">
              {!isPlaceholder(current.alt) && current.alt}
            </p>
          </div>
        )}
      </dialog>
    </>
  );
}
