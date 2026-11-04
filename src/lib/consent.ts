// The visitor's answer to the cookie notice, kept in their browser. Google Analytics only loads
// after "Accept". Shared by the banner, the analytics loader and the footer's "Cookie settings".

export type Consent = "granted" | "denied";

const KEY = "meliel-analytics-consent";
const CHANGED = "meliel:consent-changed";
const REOPEN = "meliel:consent-reopen";

/** null when the visitor hasn't answered, or when the browser blocks storage. */
export function readConsent(): Consent | null {
  try {
    const value = localStorage.getItem(KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

export function saveConsent(value: Consent) {
  try {
    localStorage.setItem(KEY, value);
  } catch {
    // Storage blocked: the choice holds for this page only.
  }
  if (value === "denied") clearAnalyticsCookies();
  window.dispatchEvent(new CustomEvent(CHANGED, { detail: value }));
}

/** Google Analytics' own cookies, removed when the visitor declines after accepting. */
function clearAnalyticsCookies() {
  const host = location.hostname;
  const domains = [
    "",
    host,
    `.${host}`,
    `.${host.split(".").slice(-2).join(".")}`,
  ];
  for (const name of document.cookie
    .split(";")
    .map((c) => c.split("=")[0].trim())) {
    if (name !== "_ga" && !name.startsWith("_ga_")) continue;
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/${domain ? `; domain=${domain}` : ""}`;
    }
  }
}

export const onConsentChange = (listener: (value: Consent) => void) => {
  const handler = (e: Event) => listener((e as CustomEvent<Consent>).detail);
  window.addEventListener(CHANGED, handler);
  return () => window.removeEventListener(CHANGED, handler);
};

export const reopenConsent = () => window.dispatchEvent(new Event(REOPEN));

export const onConsentReopen = (listener: () => void) => {
  window.addEventListener(REOPEN, listener);
  return () => window.removeEventListener(REOPEN, listener);
};
