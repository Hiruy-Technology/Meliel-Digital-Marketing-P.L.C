"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Link } from "@/components/ui/Link";
import {
  onConsentReopen,
  readConsent,
  reopenConsent,
  saveConsent,
  type Consent,
} from "@/lib/consent";
import type { Dictionary } from "@/i18n/en";

/**
 * The cookie notice. Not a pop-up: it sits at the bottom of the page, doesn't trap focus, and gives
 * Accept and Decline the same weight. While it's open, the floating chat buttons move up above it
 * (FloatingContact moves up by --consent-height, with a transform, which doesn't count as a layout shift).
 */
export function ConsentBanner({ t }: { t: Dictionary["consent"] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    // Read after mount: the server can't know the visitor's choice.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(readConsent() === null);
    return onConsentReopen(() => setOpen(true));
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const banner = ref.current;
    if (!open || !banner) {
      root.style.removeProperty("--consent-height");
      return;
    }
    const observer = new ResizeObserver(([entry]) =>
      root.style.setProperty(
        "--consent-height",
        `${entry.borderBoxSize[0].blockSize}px`,
      ),
    );
    observer.observe(banner);
    return () => {
      observer.disconnect();
      root.style.removeProperty("--consent-height");
    };
  }, [open]);

  const answer = (value: Consent) => {
    saveConsent(value);
    setOpen(false);
  };

  if (!open) return null;
  return (
    <section
      ref={ref}
      aria-label={t.label}
      className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-raised pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_16px_rgb(18_43_77/0.12)]"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:gap-8 sm:px-6">
        <p className="text-sm text-ink-soft sm:flex-1">
          {t.text}{" "}
          <Link href="/privacy" className="rounded-sm font-medium underline">
            {t.privacy}
          </Link>
        </p>
        <div className="flex shrink-0 gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => answer("denied")}
            className="flex-1 sm:flex-none"
          >
            {t.decline}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => answer("granted")}
            className="flex-1 sm:flex-none"
          >
            {t.accept}
          </Button>
        </div>
      </div>
    </section>
  );
}

/** "Cookie settings" in the footer: reopens the notice so the visitor can change their mind. */
export function CookieSettingsButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={reopenConsent}
      className="rounded-sm hover:text-white"
    >
      {label}
    </button>
  );
}
