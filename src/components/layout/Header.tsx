import { Link } from "@/components/ui/Link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { mainNav, projectCta } from "@/lib/navigation";
import { DesktopNav, MobileMenu } from "./HeaderNav";
import { ThemeToggle } from "./ThemeToggle";
import { getI18n } from "@/i18n";
import { LanguageSwitcher } from "./LanguageSwitcher";

export async function Header() {
  const { t } = await getI18n();
  const cta = projectCta(t);
  const links = mainNav(t);
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface/95 backdrop-blur supports-backdrop-filter:bg-surface/85">
      <Container className="flex h-18 items-center justify-between gap-2 sm:gap-6">
        <Link href="/" className="rounded-sm">
          <Logo
            withName
            name={t.common.meliel}
            tagline={t.common.digitalMarketing}
            className="h-9 text-lg lg:h-10 lg:text-xl"
          />
          <span className="sr-only">{t.common.home}</span>
        </Link>

        <div className="flex items-center gap-1 sm:gap-3 lg:gap-8">
          <DesktopNav links={links} label={t.nav.main} />
          {/* Wrapper, not a class on Button: "hidden" would clash with the button's own display class. */}
          <div className="hidden sm:block">
            <Button href={cta.href}>{cta.label}</Button>
          </div>
          <LanguageSwitcher label={t.nav.switchLanguage} />
          {/* Phones: lives in the menu, because the header has no room for it. */}
          <div className="hidden sm:block">
            <ThemeToggle light={t.nav.lightTheme} dark={t.nav.darkTheme} />
          </div>
          <MobileMenu
            links={links}
            cta={cta}
            label={t.nav.main}
            openLabel={t.nav.openMenu}
            closeLabel={t.nav.closeMenu}
          >
            <ThemeToggle light={t.nav.lightTheme} dark={t.nav.darkTheme} />
          </MobileMenu>
        </div>
      </Container>
    </header>
  );
}
