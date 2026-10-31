import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { mainNav, projectCta } from "@/lib/navigation";
import { DesktopNav, MobileMenu } from "./HeaderNav";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface/95 backdrop-blur supports-backdrop-filter:bg-surface/85">
      <Container className="flex h-18 items-center justify-between gap-6">
        <Link href="/" className="rounded-sm">
          <Logo withName className="h-9 text-lg lg:h-10 lg:text-xl" />
          <span className="sr-only">, home</span>
        </Link>

        <div className="flex items-center gap-3 lg:gap-8">
          <DesktopNav links={mainNav} />
          {/* Wrapper, not a class on Button: "hidden" would clash with the button's own display class. */}
          <div className="hidden sm:block">
            <Button href={projectCta.href}>{projectCta.label}</Button>
          </div>
          <ThemeToggle />
          <MobileMenu links={mainNav} cta={projectCta} />
        </div>
      </Container>
    </header>
  );
}
