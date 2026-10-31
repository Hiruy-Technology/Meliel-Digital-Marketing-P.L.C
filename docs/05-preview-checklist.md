# Design Preview Checklist

For deploying the design-phase site to a preview URL and running the client's design review.
The review counts as **revision round 1 of 2** (`docs/01-scope.md`).

## 1. Choose the preview host (decision needed)

| Option | Notes |
|---|---|
| Hiruy's VPS (Hostinger + PM2 + Nginx + Cloudflare) | Matches the possible production setup. Needs a subdomain, e.g. `preview.hiruytechnologies.com`. |
| Vercel Pro | Simplest deploy. The free Hobby plan is for non-commercial use, so check the current terms before using it for a client project. |

No database or API keys are needed for the preview (confirmed after Payload was added: public pages build and run without them, but `/admin` won't work).

## 2. Environment variables

Set these **at build time**, because they are compiled into the site:

| Variable | Value |
|---|---|
| `NEXT_PUBLIC_SITE_ENV` | `preview` |
| `NEXT_PUBLIC_SITE_URL` | The preview's full URL, no trailing slash |

## 3. Build and run

**Vercel:** connect the repo, set the variables above, deploy.

**VPS** (Node 22.15+ works now; Node 24 LTS is the target, and Payload needs it in phase 3):

```bash
pnpm install --frozen-lockfile
NEXT_PUBLIC_SITE_ENV=preview NEXT_PUBLIC_SITE_URL=https://your-preview-url pnpm build
cp -r public .next/standalone/
cp -r .next/static .next/standalone/.next/
cd .next/standalone && PORT=3000 node server.js
```

Don't use `pnpm start`: it warns that it doesn't work with `output: standalone`. Without the two
`cp` lines, the site runs with no styles or images.

## 4. Check the deployed preview

- [ ] The orange "Design preview" banner shows on every page
- [ ] `/robots.txt` says `Disallow: /`
- [ ] `/sitemap.xml` lists no pages
- [ ] Page source contains `noindex`
- [ ] `/dev/data` and `/dev/design-system` show the 404 page
- [ ] A form submit reaches the thank-you page, which says forms don't send anything yet
- [ ] Run each page through [PageSpeed Insights](https://pagespeed.web.dev) on mobile (see section 6)
- [ ] Open it on a real phone, on mobile data

## 5. What to ask the client for in round 1

Tell the client in writing what this round covers, because placeholder content can use up a round:

**Please review:** the layout and structure of every page, colors, fonts, the ladder concept and
animation, the Latin name beside the logo, the header and footer, the quote flow, and the wording
we wrote (headings, buttons, form messages, closing call to action).

**Not part of this round:** anything marked PLACEHOLDER. That content comes from Meliel.

**Ask them to confirm:**

- [ ] Hero headline: "Helping brands rise from where they are to where they have the potential to be."
- [ ] Logo: v1 (muted) or v2 (bright), and the vector files. Mention the grayish band at the bottom of the last ladder bar in the v1 PNG.
- [ ] Which social platforms they use (the site assumes Facebook, Instagram, LinkedIn, TikTok)
- [ ] "SEO, where included in the agreed scope": it reads like contract wording on a public page
- [ ] Whether they want "Includes" lists for Branding, Market Analysis, and Event Production
- [ ] "We'll come back with a quote" and "We'll only use your details to reply to this request": both are commitments
- [ ] Privacy Policy: review by Meliel or their lawyer. It is a template, not legal advice.
- [ ] A fluent reader's check of the Amharic on the About page
- [ ] Button wording: "Start a Project", "Get a quote"
- [ ] Copy changes: "enquiries" → "inquiries"; trailing periods removed from value and process headings; "Note:" removed from the Event Production pricing line

**Still needed from them:** run `pnpm placeholders` for the current list (59 distinct items).
`docs/04-open-items.md` has the full list, including the 6 to 12 portfolio projects.

## 6. Audit results

Final build, 2026-10-30, tested on Hiruy's development PC against the standalone production server.

**Lighthouse (mobile).** This PC has a benchmark index of 864, which Lighthouse classes as
"High-End Mobile". Its throttling guide recommends about 2× CPU slowdown on that kind of host to
emulate a mid-tier phone. The default 4× is meant for high-end desktops, so it's harsher here.
Both are shown. Treat these as estimates: PageSpeed Insights on the real preview URL is the check that counts.

| Page | Perf (2×, recommended) | Perf (4×, default) | Accessibility | Best practices | SEO | Size |
|---|---|---|---|---|---|---|
| Home | 97 | 81 | 100 | 100 | 100 | 270 KB |
| About | 95 | 85 | 100 | 100 | 100 | 285 KB |
| Services | 98 | 96 | 96* | 100 | 100 | 266 KB |
| Work | 93 | 80 | 96* | 100 | 100 | 267 KB |
| Project detail | 97 | 78 | 100 | 100 | 100 | 271 KB |
| Quote | 95 | 84 | 100 | 100 | 100 | 297 KB |
| Contact | 100 | 84 | 100 | 100 | 100 | 298 KB |
| Privacy | 98 | 92 | 100 | 100 | 100 | 260 KB |

\* Lighthouse measured text while it was mid-fade in the rise animation. With the animation settled,
axe finds no contrast problems.

**Sizes reflect placeholders.** Real photos are lazy-loaded and converted to AVIF/WebP, but they will
add weight. Re-test once real project images are in.

**Also verified on the final build:**

- axe (WCAG 2.1 A/AA and best practices): 0 violations on 10 pages at 360px and 1440px
- No sideways scrolling at 360, 390, 768, 1024, or 1440px on any page
- One `h1` and one `main` on each page, and no skipped heading levels
- Keyboard: skip link, visible focus on every Tab stop (tested on 4 key pages), mobile menu, gallery viewer
- Reduced motion: animations off, all content visible
- `pnpm contrast`: all color pairs pass WCAG AA
- 105 scripted behavior checks pass (filters, forms, gallery, video and map click-to-load, SEO files)

**Not verified yet:**

- Real screen readers (NVDA, VoiceOver)
- Real phones and Safari, Firefox (testing used Chrome only; in Firefox, the rise animation and ladder indicator may not appear, by design)
- Actual video and map playback with real links
- Sending forms (phase 3)

## 7. Known gaps to carry into phase 3

- Per-page Open Graph images and JSON-LD (required by the quality bar, not yet built)
- Form sending, honeypot enforcement, and rate limiting
- Cookie consent: GA4 uses cookies, and a consent banner isn't in the scope doc. Check Ethiopia's data protection requirements with the client.
- The Privacy Policy describes GA4, which isn't live until phase 3
- Payload needs its own layout for `/admin`, which means a small move to route groups
- Upgrade Node to 24 LTS (Payload needs 22.23.4 or newer; this PC has 22.15)
- If the Amharic copy changes, rebuild the font with `scripts/subset-ethiopic.py`
- Remove the `/dev` pages before launch (they already return 404 in real builds)
