import { NextResponse, type NextRequest } from "next/server";

// English keeps the plain URLs (/about), served from the internal /en/about route. Amharic is at
// /am/about. There is no language guessing from the browser: visitors choose with the switcher.
// Don't redirect /en/... to the plain URL, here or in next.config.ts: Next.js applies those to this
// file's own rewrite too, and every English page loops. /en/... is unlinked, and its canonical
// tag points at the plain URL, so it never becomes a duplicate in search.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (/^\/(am|en)(\/|$)/.test(pathname)) return;

  const url = request.nextUrl.clone();
  url.pathname = pathname === "/" ? "/en" : `/en${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Everything except /admin, /api, Next.js internals, and files with an extension.
  matcher: ["/((?!admin|api|_next|.*\\..*).*)"],
};
