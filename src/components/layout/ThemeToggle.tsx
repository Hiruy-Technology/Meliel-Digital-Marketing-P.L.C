"use client";

import { Icon } from "@/components/ui/Icon";
import { THEME_KEY } from "@/lib/theme";

// Light/dark switch. The icon and label come from CSS (dark:), so server and browser render the
// same HTML and there is no mismatch before the theme is known.
export function ThemeToggle() {
  const toggle = () => {
    const root = document.documentElement;
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      // Storage blocked: the choice lasts for this page only.
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className="inline-flex size-11 items-center justify-center rounded-sm text-ink hover:bg-tint"
    >
      <span className="hidden dark:inline">
        <Icon name="sun" />
        <span className="sr-only">Switch to light theme</span>
      </span>
      <span className="dark:hidden">
        <Icon name="moon" />
        <span className="sr-only">Switch to dark theme</span>
      </span>
    </button>
  );
}
