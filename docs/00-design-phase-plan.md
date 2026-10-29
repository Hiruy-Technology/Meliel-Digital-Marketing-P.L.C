# Meliel website: design-phase plan

Status: **approved by Jacob on 2026-10-29.** Steps 1–3 done 2026-10-29, step 4 done 2026-10-30. Next: step 5 (Home page). Extra dependencies approved 2026-10-29: `clsx`, `prettier`, `prettier-plugin-tailwindcss`.

## Context
Hiruy Technologies is building the contracted website for Meliel Digital Marketing P.L.C. (agreement HT-2026-006). We are in the **design phase**: every page built in code (desktop and mobile) with visible placeholders for missing content, deployed to a preview URL for the client's design review. The client's design review counts as **revision round 1 of 2**.

Decisions Jacob made in planning:
- **Location:** the project lives at `C:\Users\Yakob\Desktop\Hiruy Technologies\Clients\Meliel Digital Marketing PLC\Project_1_Website`. Jacob removed the `#1` from the client folder name on 2026-10-29, because `#` breaks some build tools. Spaces remain: if a tool fails on them, flag it rather than work around it silently. Commands run from Windows. CLAUDE.md "Dev environment" line gets updated in step 1.- **Payload deferred** to the development phase. Design phase = plain Next.js and seed data, with hand-written types that mirror the CLAUDE.md data model. Everything reads through one data layer, so swapping in Payload later means changing one file.
- **Logo:** I redraw the v1 logo as an interim SVG (it is all rectangles). It gets replaced when the client's vectors arrive.
- **Header brand:** Ge'ez wordmark plus "Meliel Digital Marketing" in Latin text (to confirm with the client).
- **Quote page (`/quote`)**, added Oct 29. Jacob counts it as part of the contracted Smart Inquiry Form, so no change request is needed. Visitors tick one or more of the 5 services as cards. For Digital Marketing and Websites they can also tick specific "Includes" items. Then they give budget, timeline and contact details on the same page. Every "Get a quote" button on the site links here with that service already ticked (`/quote?service=branding`). No prices, no cart, nothing that looks like e-commerce.

---

## A. Summary of my understanding

- **Meliel** (መልዕል, "a way to rise", a ladder) is a digital marketing agency in Addis Ababa. It offers 5 services: Branding, Advanced Digital Marketing, Market Analysis, Website Creation & Management, and Event Production (quoted separately). It positions itself as a credible, results-first **growth partner**, closer to a consultancy than a playful studio.
- **We're building** a fixed-scope marketing site: Home, About, Services, Work (filterable), Project detail, Contact (smart inquiry form), Thank-you, Privacy, and 404. It also gets floating WhatsApp/Telegram buttons, SEO, and GA4. Later phases add the Payload "Portfolio Manager" at `/admin`, the AI Case Study Writer, Resend email, and Postgres.
- **Design concept, "The Ladder":** content reveals upward as you scroll, a ladder progress indicator fills as you scroll, the 6-step process is a rising staircase (dark to light), and stats look like ladder rungs. The hero is built on "from where they are to where they have the potential to be". Palette: orange `#FAA91A` for accents and buttons, navy `#1B3354`/`#122B4D` for text and dark sections, and the ladder gradient `#1D3959 → #406B8F → #99C3DE`.
- **Main constraints:**
  - Never invent content. Every missing item shows a visible `[PLACEHOLDER: …]`, and all placeholder data lives in one seed file.
  - Client copy is used verbatim, in American English.
  - Anything outside the scope doc is not built.
  - Mobile-first from 360px. Lighthouse ≥ 90 on mobile. WCAG 2.1 AA (orange is never used for small text on white).
  - Code stays portable, with no host-specific APIs.
  - New dependencies need Jacob's approval.
  - Jacob runs all git commands.
  - Stop after every step.

## B. Questions, contradictions, risks

**Commercial / process**
1. **The design review uses up revision round 1 of 2.** About half of the Home sections are placeholders (logos, stats, featured work, testimonials). Risk: the client spends the round on content rather than design, or gives partial feedback. Suggestion: the preview carries a visible "Design preview: placeholder content" banner, and Jacob tells the client in writing what feedback this round covers.
2. **Preview hosting.** Vercel's free Hobby plan is for non-commercial use only, so it doesn't fit a client preview. Options are Vercel Pro, the Hiruy VPS, or another host. This needs a decision before step 9. Either way the preview should be `noindex` (step 9 handles this).
3. **Payload/Next version compatibility.** Payload 3 supports specific Next.js versions. Even with Payload deferred, I'll check Payload's supported Next range in step 1 and pin a compatible Next version, so we don't need a downgrade in phase 3.

**Content gaps that shape the design**
4. Only 2 of the 5 services come with an "Includes" list (Digital Marketing, Websites). The Services layout must look deliberate when a service has a summary only. I won't write lists for the other three. Ask the client whether they want to provide them.
5. The Websites "includes" list has "SEO, where included in the agreed scope". That's contract wording, which reads oddly on a public page. Flag it for the client. I'll keep it verbatim for now.
6. The About story and founding year are missing. The About page will lean on the meaning, mission, and values sections until they arrive.
7. Sections with no data at launch (testimonials, logos, team) should **hide automatically when empty**, rather than ship with placeholders. I'll build them that way. The preview shows them filled with placeholders.
8. **Event Production is "quoted separately"**: when it's selected, the form makes budget optional and shows "Quote on request". Budget (ETB) and timeline options are placeholders until the client sends them.

**Legal / privacy**
9. The Privacy Policy needs the legal entity name, address, and data contact (pending). GA4 combined with a form that stores personal data likely brings obligations under Ethiopia's personal data protection law (I believe this is Proclamation No. 1321/2024; to be verified). A **cookie consent banner is not in the scope doc**, so I'll flag it rather than build it. The policy text needs review by the client or their lawyer. Hiruy provides a template only.

**Technical / design**
10. A Google Maps iframe is heavy (bad for Lighthouse), so I'll use a click-to-load facade, as we do for videos.
11. On mobile, the floating WhatsApp/Telegram buttons could collide with the ladder indicator and the form's submit button. Plan: the buttons sit bottom-right, the ladder shows on the left edge on desktop only, and mobile gets a thin top progress bar instead.
12. The v1 logo PNG has a grayish band at the bottom of the last ladder bar (looks like an export artifact). The SVG uses a clean gradient. Mention it when we ask for the vectors.
13. Font pairing: I'll propose **Sora (headings) + Inter (body)**, with **Space Grotesk + Inter** as option B and Noto Sans Ethiopic for Amharic. Optional: a preview-only `?fonts=b` switch, so the client compares both in one review round without a second build.
14. Placeholder images will be generated in brand colors (navy tonal blocks with a ladder pattern and a "[PLACEHOLDER: image]" label). No stock photos: they could pass for real work and raise licensing questions.

**Dependencies I'd like approval for** (all optional; without them I use the fallback in brackets)
- `clsx` (small class helper) [plain template strings otherwise]
- `prettier` + `prettier-plugin-tailwindcss` (dev only) [ESLint only otherwise]
- Not needed: animation libraries (IntersectionObserver + CSS), lightbox libraries (native `<dialog>`), icon packs (inline SVG for WhatsApp/Telegram/socials).

---

## C. Build plan (stop for approval after each step)

Each step ends with: a summary of changed files and the reasons, open uncertainties, any copy fixes listed, and a line in the CLAUDE.md status log. Every step's check also includes `pnpm lint`, `pnpm typecheck`, and `pnpm build` passing.

### Step 1: Scaffold
Before starting, I check the current official docs for create-next-app, Tailwind (v4 uses CSS-first `@theme`), and Payload's supported Next range.
- `pnpm create next-app`: TypeScript strict, App Router, `src/` dir, Tailwind, ESLint, `@/*` alias. Add `output: 'standalone'`.
- Files: `package.json` (with a `typecheck` script), `next.config.ts`, `tsconfig.json`, `eslint.config.mjs`, `src/app/layout.tsx`, `src/app/page.tsx` (stub), `src/app/globals.css`, `.env.example` (commented: `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_SITE_ENV`, GA id, plus future Payload/DB/R2/Resend/Anthropic vars marked "phase 3"), and `.nvmrc`. `.gitignore` merges with the existing one.
- Folder skeleton: `src/components/{ui,layout,sections}`, `src/lib`, `src/content`, `public/brand`.
- Update CLAUDE.md: dev environment (Windows path), Payload deferred note, `/quote` added to the site map, Inquiries model changes (see step 3).
- **Check:** `pnpm dev` → the stub page loads at localhost:3000.

### Step 2: Brand assets + design system
- `public/brand/logo.svg` (wordmark), `logo-white.svg`, `ladder.svg` (icon), plus favicon/app icons from the ladder (`src/app/icon.svg`, `apple-icon.png`).
- `src/app/globals.css`: Tailwind `@theme` tokens. These cover orange and navy 50–950 scales built from the anchors, ice, the ladder gradient, off-white `#F7F8FA`, the font variables, the type scale, spacing/container widths, radii, and a reduced-motion override.
- `src/lib/fonts.ts`: `next/font` Sora, Inter, Noto Sans Ethiopic (subset).
- `src/components/ui/`: `Button` (primary orange/navy text, secondary, ghost-on-dark), `Container`, `Section` (light/off-white/navy variants), `Card`, `Tag`, `Placeholder` (dashed orange outline + label), `PlaceholderImage`, `Rise` (IntersectionObserver reveal), `LadderProgress`, `Logo`.
- `scripts/contrast-check.mjs`: no dependencies. Prints the WCAG ratio for every text/background pair we use, and fails if any is below AA.
- `src/app/dev/design-system/page.tsx`: a temporary showcase page. It's `noindex` and gets removed before launch.
- **Check:** open `/dev/design-system` at 360px and 1440px. Run `node scripts/contrast-check.mjs`; all pairs should pass. Turning on reduced motion in the OS should stop the animations.

### Step 3: Types, seed data, data layer
I moved this step ahead of layout, because the footer needs the contact and social placeholders.
- `src/lib/types.ts`: types mirroring the CLAUDE.md collections (Project, Service, Industry, Testimonial, ClientLogo, TeamMember, SiteSettings, Inquiry). The Inquiry type gets `type: 'general' | 'quote'`, `services` (many), and `selectedIncludes` (the sub-items ticked), so both forms save into one Inquiries collection in phase 3.
- `src/content/seed.ts`: the **only** placeholder file. It holds the 5 real services (verbatim), placeholder projects/industries/testimonials/logos/stats/team/contact, and the form options.
- `src/content/copy.ts`: the client's verbatim page copy (meaning, mission, vision, values, differentiator, 6 steps).
- `src/lib/data.ts`: async getters (`getProjects({service, industry})`, `getProjectBySlug`, `getServices`, `getSiteSettings`, …). In phase 3 this becomes the only file that changes to read from Payload.
- **Check:** `pnpm typecheck` passes, and a search for `PLACEHOLDER` finds hits only in `seed.ts`.

### Step 4: Global layout
- `src/components/layout/`: `Header` (logo + Latin name, nav, "Start a Project", accessible mobile menu), `Footer`, `FloatingContact` (WhatsApp `wa.me` + Telegram `t.me`, on every page), `PreviewBanner` (only when `SITE_ENV=preview`), and a skip link.
- `src/app/not-found.tsx`: friendly 404 with ladder motif.
- **Check:** Every route shows the header, footer, and floating buttons. `/anything` shows the 404. The mobile menu works with the keyboard and closes on Esc. Tab focus is always visible.

### Step 5: Home
All 8 sections from the design direction, in `src/components/sections/home/*`. Empty-aware sections hide when their data is empty.
- **Check:** `/` at 360/768/1440. Placeholders are clearly visible, the stats render as ladder rungs, the 6 steps rise from dark to light, and the CTAs go to `/contact` and `/work`.

### Step 6: Services
- `src/app/services/page.tsx`: intro, then one section per service with anchors (`#branding`, `#digital-marketing`, `#market-analysis`, `#websites`, `#event-production`). Each section has a "Get a quote" CTA to `/quote?service=<slug>`. Event Production shows "Quoted separately".
- **Check:** home service cards scroll to the right anchors, and the anchor isn't hidden under the sticky header.

### Step 7: About
- `src/app/about/page.tsx`: the signature name-meaning section (Amharic + English), story [placeholder], mission/vision, 6 values, differentiator, team (optional, placeholder), how we work (reuses the ladder component), and a CTA.
- **Check:** the Amharic renders in Noto Sans Ethiopic, and the copy matches `02-meliel-content.md` word for word.

### Step 8: Work + Project detail
- `src/app/work/page.tsx`: the service/industry filter driven by URL query params (`?service=&industry=`), so filtered views can be shared. Also the responsive card grid and an empty state.
- `src/app/work/[slug]/page.tsx`: hero, result highlights, challenge, delivered, gallery with a full-screen lightbox (`<dialog>`, keyboard + swipe-free arrows), a YouTube/Vimeo click-to-load facade, results, next/previous project, and a CTA. Plus `generateStaticParams`.
- **Check:** filter, copy the URL, and reload: the same filtered view appears. The lightbox opens/closes with the keyboard and traps focus. No video iframe loads until it's clicked.

### Step 9a: Quote page
- `src/app/quote/page.tsx` + `QuoteForm` (client component).
  - **Step 1:** selectable service cards, multi-select and keyboard accessible (checkbox semantics). Digital Marketing and Websites expand to show their "Includes" items as optional checkboxes.
  - **Step 2:** budget and timeline (placeholder options). Budget becomes optional with a "Quote on request" note when only Event Production is selected.
  - **Step 3:** name, company, email, phone, message, plus a honeypot.
  - On mobile, a sticky summary bar ("2 services selected · Continue") keeps the selection visible. It sits above the floating WhatsApp/Telegram buttons and doesn't cover them.
- Preselection from the URL: `?service=branding&service=websites` (several allowed). Invalid slugs are ignored.
- The zod schema lives in `src/lib/inquiry-schema.ts`, shared with the contact form. At least one service is required.
- Design phase: submitting validates and then goes to `/contact/thank-you?type=quote`. Nothing is sent or stored.
- **Check:**
  - `/services` → "Get a quote" on Websites opens `/quote` with Websites ticked.
  - Ticking items works by keyboard.
  - Submitting with no service shows an accessible error.

### Step 9b: Contact, Thank-you, Privacy, preview readiness
- `src/app/contact/page.tsx` + `ContactForm` (client component; the zod schema lives in `src/lib/inquiry-schema.ts` so phase 3 can reuse it on the server). Fields: name, company, email, phone, service (prefilled from `?service=`), budget, timeline, message, plus a hidden honeypot. **For the design phase, submitting validates and then goes to the thank-you page. Nothing is sent or stored.** The page also has the direct contact block, office hours, socials, and the map facade.
- `src/app/contact/thank-you/page.tsx`, `src/app/privacy/page.tsx` (template, with placeholders for entity/address/contact).
- Base SEO: per-page `metadata`, plus `robots.ts`/`sitemap.ts` that **disallow everything when `SITE_ENV=preview`**, and the preview banner.
- The contact form stays the general inquiry form. Its service field is a single select (or "Not sure yet"), and the form has a visible link: "Know which services you need? Get a quote →" pointing to `/quote`. The header's "Start a Project" button goes to `/quote`. The thank-you page adjusts its wording for `?type=quote`.
- **Check:** `/contact?service=branding` preselects Branding. Validation errors are announced to screen readers. Choosing Event Production makes budget optional.

### Step 10: Responsive + accessibility pass, preview checklist
- Go through every page at 360/390/768/1024/1440. Run Lighthouse mobile (target ≥ 90) and axe on each page, check keyboard-only navigation, test with reduced motion, and re-run the contrast script. Fix what turns up.
- Write `docs/05-preview-checklist.md`: env vars, noindex verified, banner on, the host decision (B2), what feedback the client should give in round 1, and the list of placeholders still open (from `seed.ts`).
- Remove or guard `/dev/design-system`.
- **Check:** Lighthouse/axe results get recorded in the step summary, and `pnpm build && pnpm start` serves a production build locally.

## Verification (whole phase)
`pnpm lint && pnpm typecheck && pnpm build` stays clean after every step. Manual check of every route at 360px and 1440px. `node scripts/contrast-check.mjs` passes. Lighthouse mobile ≥ 90 and zero axe violations on public pages before the preview goes out.
