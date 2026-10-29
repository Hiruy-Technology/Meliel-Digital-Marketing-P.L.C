"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import clsx from "clsx";
import { buttonClasses } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { isActive, type NavLink } from "@/lib/navigation";

export function DesktopNav({ links }: { links: NavLink[] }) {
  const pathname = usePathname();
  return (
    <nav aria-label="Main" className="hidden lg:block">
      <ul className="flex items-center gap-8">
        {links.map((link) => {
          const active = isActive(pathname, link.href);
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={clsx(
                  "relative rounded-sm py-2 font-display text-sm font-semibold transition-colors",
                  // Active page: an orange rung under the link
                  "after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:bg-orange-500 after:transition-transform",
                  active
                    ? "text-navy-900 after:scale-x-100"
                    : "text-navy-700 after:scale-x-0 hover:text-navy-900 hover:after:scale-x-100",
                )}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function MobileMenu({ links, cta }: { links: NavLink[]; cta: NavLink }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  // While open: Esc closes and returns focus to the button, the page behind doesn't scroll,
  // and focus moves into the menu.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="-mr-2 inline-flex size-11 items-center justify-center rounded-sm text-navy-900 hover:bg-navy-50"
      >
        <Icon name={open ? "close" : "menu"} />
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
      </button>

      <div
        ref={panelRef}
        id={panelId}
        hidden={!open}
        className="absolute inset-x-0 top-full h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-navy-100 bg-white"
      >
        <nav aria-label="Main" className="px-4 pt-4 pb-10 sm:px-6">
          <ul className="divide-y divide-navy-100">
            {links.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className={clsx(
                      "flex items-center justify-between py-4 font-display text-2xl font-semibold",
                      active ? "text-navy-900" : "text-navy-700",
                    )}
                  >
                    <span className="flex items-center gap-3">
                      {active && (
                        <span
                          aria-hidden
                          className="h-1.5 w-4 rounded-[1px] bg-orange-500"
                        />
                      )}
                      {link.label}
                    </span>
                    <Icon name="arrow-right" className="size-5 text-navy-400" />
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link
            href={cta.href}
            onClick={() => setOpen(false)}
            className={buttonClasses("primary", "lg", "mt-8 w-full")}
          >
            {cta.label}
          </Link>
        </nav>
      </div>
    </div>
  );
}
