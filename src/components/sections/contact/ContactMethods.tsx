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
      <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-sm bg-white text-navy-800 ring-1 ring-navy-100">
        <Icon name={icon} className="size-5" />
      </span>
      <span className="min-w-0">
        <span className="block text-sm text-navy-600">{label}</span>
        <span className="block font-medium break-words text-navy-900">
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

export function ContactMethods({ settings }: { settings: SiteSettings }) {
  return (
    <div className="rounded-sm bg-paper p-6 sm:p-8">
      <h2 className="font-display text-xl font-bold">Reach us directly</h2>
      <ul className="mt-6 space-y-5">
        <Row icon="whatsapp" label="WhatsApp">
          <Linked
            href={whatsappHref(settings.whatsappNumber)}
            value={settings.whatsappNumber}
            external
          />
        </Row>
        <Row icon="telegram" label="Telegram">
          <Linked
            href={telegramHref(settings.telegramUsername)}
            value={settings.telegramUsername}
            external
          />
        </Row>
        {settings.phones.map((phone) => (
          <Row key={phone} icon="phone" label="Phone">
            <Linked href={phoneHref(phone)} value={phone} />
          </Row>
        ))}
        <Row icon="mail" label="Email">
          <Linked href={emailHref(settings.email)} value={settings.email} />
        </Row>
        <Row icon="map-pin" label="Office">
          <Value value={settings.address} />
        </Row>
        <Row icon="clock" label="Office hours">
          <Value value={settings.officeHours} />
        </Row>
      </ul>
      <h3 className="mt-8 font-display text-sm font-semibold text-navy-900">
        Follow us
      </h3>
      <SocialLinks links={settings.socialLinks} className="mt-3" />
    </div>
  );
}
