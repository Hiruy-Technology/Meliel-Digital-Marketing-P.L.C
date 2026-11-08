"use client";

import type { ReactNode } from "react";
import { inter, sora } from "@/lib/fonts";
import "./admin.css";

// Wraps the whole Portfolio Manager (admin.components.providers in src/payload.config.ts). It loads
// the brand stylesheet and gives Payload the website's fonts, self-hosted by next/font. The fonts
// are set on :root, not on a wrapper, so dialogs and drawers that Payload renders outside this
// tree get them too.
export default function Providers({ children }: { children?: ReactNode }) {
  return (
    <>
      <style>{`:root{--font-body:${inter.style.fontFamily};--meliel-font-display:${sora.style.fontFamily}}`}</style>
      {children}
    </>
  );
}
