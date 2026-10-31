import { Link } from "@/components/ui/Link";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Logo } from "@/components/ui/Logo";
import { Placeholder } from "@/components/ui/Placeholder";
import { emailHref, phoneHref } from "@/lib/contact";
import { getServices, getSiteSettings } from "@/lib/data";
import { footerNav, projectCta } from "@/lib/navigation";
import { isPlaceholder, placeholderLabel } from "@/lib/placeholder";
import { SocialLinks } from "../sections/SocialLinks";
import { getI18n } from "@/i18n";

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
  const { t } = await getI18n();
  const cta = projectCta(t);
  const [settings, services] = await Promise.all([
    getSiteSettings(),
    getServices(),
  ]);
  const email = emailHref(settings.email);
  const year = new Date().getFullYear();

  return (
    <footer data-tone="dark" className="bg-band-deep text-white">
      <Container className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8 lg:py-20">
        <div className="sm:col-span-2 lg:col-span-4">
          <Logo
            variant="color-on-dark"
            withName
            name={t.common.meliel}
            tagline={t.common.digitalMarketing}
            className="h-10 text-xl"
          />
          <p className="mt-6 max-w-sm text-navy-200">{t.copy.brandLine}</p>
          <Button href={cta.href} className="mt-8">
            {cta.label}
          </Button>
        </div>

        <nav aria-label={t.nav.footer} className="lg:col-span-2">
          <FooterHeading>{t.footer.explore}</FooterHeading>
          <ul className="mt-5 space-y-3">
            {footerNav(t).map((link) => (
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
          <FooterHeading>{t.common.services}</FooterHeading>
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
          <FooterHeading>{t.footer.contact}</FooterHeading>
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

          <SocialLinks
            links={settings.socialLinks}
            tone="dark"
            className="mt-6"
          />
        </div>
      </Container>

      <div className="border-t border-white/10">
        {/* Left-aligned, with room at the bottom on phones, so the floating WhatsApp/Telegram
            buttons never cover these links at the end of the page. */}
        <Container className="flex flex-col gap-3 pt-6 pb-36 text-sm text-navy-200 sm:flex-row sm:items-center sm:gap-8 sm:pb-6 lg:pr-56">
          <p>
            © {year} Meliel Digital Marketing P.L.C. {t.footer.rights}
          </p>
          <Link href="/privacy" className="rounded-sm hover:text-white">
            {t.footer.privacy}
          </Link>
        </Container>
      </div>
    </footer>
  );
}
