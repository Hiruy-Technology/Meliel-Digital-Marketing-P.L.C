import clsx from "clsx";
import { Icon } from "@/components/ui/Icon";
import { externalHref } from "@/lib/contact";
import type { SocialLink } from "@/lib/types";

const LABELS: Record<SocialLink["platform"], string> = {
  facebook: "Facebook",
  instagram: "Instagram",
  linkedin: "LinkedIn",
  tiktok: "TikTok",
  x: "X",
  youtube: "YouTube",
  telegram: "Telegram",
};

const BASE =
  "inline-flex size-11 items-center justify-center rounded-sm border";

const TONES = {
  dark: {
    idle: "border-white/15 text-navy-100",
    live: "hover:border-white/40 hover:text-white",
    pending: "border-dashed border-orange-500/70 opacity-70",
  },
  light: {
    idle: "border-navy-200 text-navy-800",
    live: "hover:border-navy-900 hover:text-navy-900",
    pending: "border-dashed border-orange-700",
  },
};

export function SocialLinks({
  links,
  tone = "light",
  className,
}: {
  links: SocialLink[];
  tone?: keyof typeof TONES;
  className?: string;
}) {
  const colors = TONES[tone];
  return (
    <ul
      className={clsx("flex flex-wrap gap-2", className)}
      aria-label="Social media"
    >
      {links.map((social) => {
        const href = externalHref(social.url);
        const label = LABELS[social.platform];
        return (
          <li key={social.platform}>
            {href ? (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Meliel on ${label} (opens in a new tab)`}
                className={clsx(BASE, colors.idle, colors.live)}
              >
                <Icon name={social.platform} className="size-5" />
              </a>
            ) : (
              // Link not provided yet: shown (so the design is complete) but marked and inert.
              <span
                role="img"
                title={social.url}
                aria-label={`${label} (link not provided yet)`}
                className={clsx(BASE, colors.idle, colors.pending)}
              >
                <Icon name={social.platform} className="size-5" />
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
