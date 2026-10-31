import type { ReactNode } from "react";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Value } from "@/components/ui/Value";
import {
  emailHref,
  phoneHref,
  telegramHref,
  whatsappHref,
} from "@/lib/contact";
import type { SiteSettings } from "@/lib/types";
import { SocialLinks } from "../SocialLinks";
import { getI18n } from "@/i18n";

function Row({
  icon,
  label,
  children,
}: {
  icon: IconName;
  label: string;
  children: ReactNode;
}) {
  return (
    <li className="flex gap-4">
      <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-sm bg-surface text-ink-soft ring-1 ring-line">
        <Icon name={icon} className="size-5" />
      </span>
      <span className="min-w-0">
        <span className="block text-sm text-ink-muted">{label}</span>
        <span className="block font-medium break-words text-ink">
          {children}
        </span>
      </span>
    </li>
  );
}

/** A real link once the value exists; a marked placeholder until then. */
function Linked({
  href,
  value,
  external,
}: {
  href: string | null;
  value: string;
  external?: boolean;
}) {
  if (!href) return <Value value={value} />;
  return (
    <a
      href={href}
      className="rounded-sm underline decoration-orange-500 decoration-2 underline-offset-4"
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {value}
    </a>
  );
}

export async function ContactMethods({ settings }: { settings: SiteSettings }) {
  const { t } = await getI18n();
  return (
    <div className="rounded-sm bg-paper p-6 sm:p-8">
      <h2 className="font-display text-xl font-bold">{t.contact.direct}</h2>
      <ul className="mt-6 space-y-5">
        <Row icon="whatsapp" label={t.contact.whatsapp}>
          <Linked
            href={whatsappHref(settings.whatsappNumber)}
            value={settings.whatsappNumber}
            external
          />
        </Row>
        <Row icon="telegram" label={t.contact.telegram}>
          <Linked
            href={telegramHref(settings.telegramUsername)}
            value={settings.telegramUsername}
            external
          />
        </Row>
        {settings.phones.map((phone) => (
          <Row key={phone} icon="phone" label={t.contact.phone}>
            <Linked href={phoneHref(phone)} value={phone} />
          </Row>
        ))}
        <Row icon="mail" label={t.contact.email}>
          <Linked href={emailHref(settings.email)} value={settings.email} />
        </Row>
        <Row icon="map-pin" label={t.contact.office}>
          <Value value={settings.address} />
        </Row>
        <Row icon="clock" label={t.contact.hours}>
          <Value value={settings.officeHours} />
        </Row>
      </ul>
      <h3 className="mt-8 font-display text-sm font-semibold text-ink">
        {t.contact.follow}
      </h3>
      <SocialLinks links={settings.socialLinks} className="mt-3" />
    </div>
  );
}
