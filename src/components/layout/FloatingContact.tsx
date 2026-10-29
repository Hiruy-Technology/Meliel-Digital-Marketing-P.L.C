import clsx from "clsx";
import { Icon } from "@/components/ui/Icon";
import { telegramHref, whatsappHref } from "@/lib/contact";
import { getSiteSettings } from "@/lib/data";

// One-tap WhatsApp and Telegram buttons on every page (contracted feature).
// Bottom-right, above the iPhone home bar. Labels show beside the icons on desktop.

type ButtonProps = {
  kind: "whatsapp" | "telegram";
  label: string;
  href: string | null;
  /** The placeholder text, shown as a tooltip while the number/username is missing. */
  pendingNote: string;
};

function FloatingButton({ kind, label, href, pendingNote }: ButtonProps) {
  const classes = clsx(
    "group flex h-13 min-w-13 items-center justify-center gap-2 rounded-full px-3.5 text-white shadow-lg ring-2 shadow-navy-950/25 ring-white transition-transform hover:-translate-y-0.5 lg:px-5",
    kind === "whatsapp" ? "bg-whatsapp" : "bg-telegram",
  );
  const content = (
    <>
      <Icon name={kind} className="size-6" />
      <span className="hidden font-display text-sm font-semibold lg:inline">
        {label}
      </span>
    </>
  );

  if (!href) {
    // Not provided yet: visible for the design review, marked with a dashed outline, inert.
    return (
      <span
        title={pendingNote}
        aria-label={`${label} (not set up yet)`}
        className={clsx(
          classes,
          "outline-2 outline-offset-2 outline-orange-500 outline-dashed",
        )}
      >
        {content}
      </span>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Chat with Meliel on ${label} (opens in a new tab)`}
      className={classes}
    >
      {content}
    </a>
  );
}

export async function FloatingContact() {
  const settings = await getSiteSettings();
  return (
    <div
      className="fixed right-4 bottom-[calc(1rem+env(safe-area-inset-bottom))] z-40 flex flex-col items-end gap-3 sm:right-6 sm:bottom-6"
      aria-label="Quick contact"
      role="group"
    >
      <FloatingButton
        kind="whatsapp"
        label="WhatsApp"
        href={whatsappHref(settings.whatsappNumber)}
        pendingNote={settings.whatsappNumber}
      />
      <FloatingButton
        kind="telegram"
        label="Telegram"
        href={telegramHref(settings.telegramUsername)}
        pendingNote={settings.telegramUsername}
      />
    </div>
  );
}
