import Link from "next/link";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Logo } from "@/components/ui/Logo";
import { Placeholder } from "@/components/ui/Placeholder";
import { brandLine } from "@/content/copy";
import { emailHref, externalHref, phoneHref } from "@/lib/contact";
import { getServices, getSiteSettings } from "@/lib/data";
import { footerNav, projectCta } from "@/lib/navigation";
import { isPlaceholder, placeholderLabel } from "@/lib/placeholder";
import type { SocialLink } from "@/lib/types";

const SOCIAL_LABELS: Record<SocialLink["platform"], string> = {
  facebook: "Facebook",
  instagram: "Instagram",
  linkedin: "LinkedIn",
  tiktok: "TikTok",
  x: "X",
  youtube: "YouTube",
  telegram: "Telegram",
};

/** Shows a settings value, or a clearly marked placeholder while it's missing. */
function SettingText({ value }: { value: string }) {
  return isPlaceholder(value) ? (
    <Placeholder label={placeholderLabel(value)} />
  ) : (
    <>{value}</>
  );
}

function FooterHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="font-display text-xs font-semibold tracking-[0.14em] text-ice-300 uppercase">
      {children}
    </h2>
  );
}

function ContactRow({
  icon,
  children,
}: {
  icon: IconName;
  children: ReactNode;
}) {
  return (
    <li className="flex gap-3">
      <Icon name={icon} className="mt-0.5 size-5 text-ice-300" />
      <span className="min-w-0">{children}</span>
    </li>
  );
}

export async function Footer() {
  const [settings, services] = await Promise.all([
    getSiteSettings(),
    getServices(),
  ]);
  const email = emailHref(settings.email);
  const year = new Date().getFullYear();

  return (
    <footer data-tone="dark" className="bg-navy-950 text-white">
      <Container className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8 lg:py-20">
        <div className="sm:col-span-2 lg:col-span-4">
          <Logo variant="color-on-dark" withName className="h-10 text-xl" />
          <p className="mt-6 max-w-sm text-navy-200">{brandLine}</p>
          <Button href={projectCta.href} className="mt-8">
            {projectCta.label}
          </Button>
        </div>

        <nav aria-label="Footer" className="lg:col-span-2">
          <FooterHeading>Explore</FooterHeading>
          <ul className="mt-5 space-y-3">
            {footerNav.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="rounded-sm text-navy-100 hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <FooterHeading>Services</FooterHeading>
          <ul className="mt-5 space-y-3">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services#${s.slug}`}
                  className="rounded-sm text-navy-100 hover:text-white"
                >
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <FooterHeading>Contact</FooterHeading>
          <ul className="mt-5 space-y-4 text-navy-100">
            {settings.phones.map((phone) => {
              const href = phoneHref(phone);
              return (
                <ContactRow key={phone} icon="phone">
                  {href ? (
                    <a href={href} className="rounded-sm hover:text-white">
                      {phone}
                    </a>
                  ) : (
                    <SettingText value={phone} />
                  )}
                </ContactRow>
              );
            })}
            <ContactRow icon="mail">
              {email ? (
                <a
                  href={email}
                  className="rounded-sm break-all hover:text-white"
                >
                  {settings.email}
                </a>
              ) : (
                <SettingText value={settings.email} />
              )}
            </ContactRow>
            <ContactRow icon="map-pin">
              <SettingText value={settings.address} />
            </ContactRow>
            <ContactRow icon="clock">
              <SettingText value={settings.officeHours} />
            </ContactRow>
          </ul>

          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Social media">
            {settings.socialLinks.map((social) => {
              const href = externalHref(social.url);
              const label = SOCIAL_LABELS[social.platform];
              const classes =
                "inline-flex size-11 items-center justify-center rounded-sm border border-white/15 text-navy-100";
              return (
                <li key={social.platform}>
                  {href ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Meliel on ${label} (opens in a new tab)`}
                      className={`${classes} hover:border-white/40 hover:text-white`}
                    >
                      <Icon name={social.platform} className="size-5" />
                    </a>
                  ) : (
                    // Link not provided yet: shown (so the design is complete) but marked and inert.
                    <span
                      title={social.url}
                      aria-label={`${label} (link not provided yet)`}
                      className={`${classes} border-dashed border-orange-500/70 opacity-70`}
                    >
                      <Icon name={social.platform} className="size-5" />
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        {/* Left-aligned, with room at the bottom on phones, so the floating WhatsApp/Telegram
            buttons never cover these links at the end of the page. */}
        <Container className="flex flex-col gap-3 pt-6 pb-36 text-sm text-navy-200 sm:flex-row sm:items-center sm:gap-8 sm:pb-6 lg:pr-56">
          <p>© {year} Meliel Digital Marketing P.L.C. All rights reserved.</p>
          <Link href="/privacy" className="rounded-sm hover:text-white">
            Privacy Policy
          </Link>
        </Container>
      </div>
    </footer>
  );
}
