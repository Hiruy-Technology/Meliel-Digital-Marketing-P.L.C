"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { onConsentChange, readConsent } from "@/lib/consent";

/**
 * Google Analytics 4, only after the visitor accepts the cookie notice. Declining after accepting
 * stops it from the next page load (a running script can't be unloaded).
 */
export function Analytics({ measurementId }: { measurementId: string }) {
  const [granted, setGranted] = useState(false);

  useEffect(() => {
    // Read after mount: the server can't know the visitor's choice.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setGranted(readConsent() === "granted");
    return onConsentChange((value) => {
      if (value === "granted") setGranted(true);
      else location.reload();
    });
  }, []);

  if (!granted) return null;
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${measurementId}');`}
      </Script>
    </>
  );
}
