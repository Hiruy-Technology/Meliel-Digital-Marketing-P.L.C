# Meliel Digital Marketing Website

Client website built by **Hiruy Technologies** for **Meliel Digital Marketing P.L.C.** (Addis Ababa, Ethiopia).
Agreement ref: HT-2026-006, signed October 19, 2026. Project lead: Yakob (Jacob) Dereje, CEO, Hiruy Technologies.

This file is the project's standing context. Read it, and the docs it points to, before doing any work.

---

## How to work with Jacob

- Work in **small, reviewable steps**. After each step: stop, summarize what changed (files + why), list anything you are unsure about, and wait for approval before continuing.
- Use **plan mode** for anything that touches more than one area. Present the plan before writing code.
- **Never run git commands that change history or remotes** (commit, push, pull, branch, merge, rebase, reset). Jacob handles git manually. Read-only git (status, diff, log) is fine.
- Ask before adding any dependency not listed under Stack below.
- Dev environment: **Windows** (Git Bash or PowerShell), project at `C:\Users\Yakob\Desktop\Hiruy Technologies\Clients\Meliel Digital Marketing PLC\Project_1_Website`. Never put `#` in the path. Docker Desktop is available; Docker for local Postgres starts in phase 3.
- Before using a library API, check its **current official docs**. Do not rely on memory for versions or APIs. For Next.js, read the bundled docs in `node_modules/next/dist/docs/` (see `AGENTS.md`).
- Scripts: `pnpm dev`, `pnpm build`, `pnpm lint`, `pnpm typecheck`, `pnpm format` / `pnpm format:check`, `pnpm contrast` (WCAG check of the color pairs), `pnpm placeholders` (lists every placeholder still waiting for the client).
- When something conflicts with the scope doc or is ambiguous, ask. Do not guess.

## Source of truth

| File | What it is |
|---|---|
| `docs/00-design-phase-plan.md` | The approved step-by-step plan for the design phase, including decisions made while planning. Read this first to know where we are. |
| `docs/01-scope.md` | The contracted scope. Anything not listed there is **out of scope**: flag it, do not build it. |
| `docs/02-meliel-content.md` | Content provided by Meliel. Use it **verbatim** (see content rules). |
| `docs/03-design-direction.md` | Design concept, brand tokens, typography, page structure. |
| `docs/04-open-items.md` | What is still pending from the client. Check before assuming anything is final. |
| `assets/brand/` | Logo files from Meliel (PNG for now; vector files pending). |
| `docs/reference/` | Signed agreement, proposal, client's original requirements doc. **Gitignored. Never commit.** |

## Content rules (strict)

- **Never invent** clients, testimonials, statistics, team members, project results, or contact details.
- Anything not yet provided uses a visible placeholder: `[PLACEHOLDER: what goes here]`. Keep all placeholder data in one seed file so it is easy to find and replace.
- Client copy from `docs/02-meliel-content.md` is used as written. If a small grammar or consistency fix seems needed, make it **and list it** in your step summary so Jacob can confirm with the client.
- Language: **English only**, American spelling (normalize the client's "enquiries" to "inquiries" and flag it). The Amharic name **መልዕል** and its Amharic meaning may appear as brand elements.

## Stack

- **Next.js** (App Router, latest stable) + **TypeScript** (strict) + **Tailwind CSS**
- **Payload CMS 3**, embedded in the same Next.js app: this is the contracted **Portfolio Manager**, served at `/admin`
- **PostgreSQL**: Docker locally (`docker-compose.yml`); Neon or self-hosted Postgres in production
- **Media**: Payload S3-compatible storage adapter pointed at **Cloudflare R2** in production, local disk in dev. Videos are mainly **YouTube/Vimeo URLs**; short MP4 uploads are optional.
- **AI Case Study Writer**: Anthropic API. Model from env `ANTHROPIC_MODEL` (default `claude-haiku-5-5`), key from `ANTHROPIC_API_KEY`.
- **Email notifications**: Resend
- **Analytics**: Google Analytics 4 (+ Google Search Console verification)
- **Forms & validation**: Server Actions + zod
- **Package manager**: pnpm
- **Approved extras** (2026-10-29): `clsx` (class names), `prettier` + `prettier-plugin-tailwindcss` (formatting, dev only)
- **Design phase**: Payload, Postgres, Resend, GA4 and the AI writer are **deferred to phase 3**. Pages read from `src/content/seed.ts` through `src/lib/data.ts`; that data layer is the one file that switches to Payload later. Payload 3 supports Next.js ≥ 16.2.6 and needs Node ≥ 22.23.4 or ≥ 24.22.1. Next.js `cacheComponents` is **off** until Payload's support for it is confirmed.

## Hosting

The production host is **not decided yet** (Vercel, or Hiruy's VPS pattern: Hostinger + PM2 + Nginx + Cloudflare). Keep the code portable:
- No host-specific APIs (no Vercel-only features). `output: 'standalone'` is fine.
- All config comes from environment variables. Keep `.env.example` complete and commented.

## Site map

| Route | Page |
|---|---|
| `/` | Home |
| `/about` | About Us |
| `/services` | Services (one section per service, anchor per service) |
| `/work` | Portfolio, filterable by service and industry |
| `/work/[slug]` | Project detail |
| `/contact` | Contact (general inquiry form + direct contact details, map, socials) |
| `/quote` | Get a Quote: pick one or more services (and specific "includes" items), then budget, timeline, details. Part of the contracted Smart Inquiry Form. Prefill with `?service=<slug>` (repeatable). |
| `/contact/thank-you` | Inquiry confirmation |
| `/privacy` | Privacy Policy |
| 404 | Friendly not-found page |
| `/admin` | Portfolio Manager (Payload) |

## Payload data model (initial)

- **Users**: roles `admin`, `editor`
- **Projects**: title, slug, clientName, industry (→ Industries), services (→ Services, many), featured (bool), sortOrder, status (draft/published), coverImage, gallery (images, alt text required), videos (array: YouTube/Vimeo URL or upload), challenge, delivered, results (rich text), resultHighlights (array of {value, label}, e.g. "+240%" / "Instagram reach"), **aiNotes** (admin-only short notes used by the AI writer), publishedAt
- **Services**: name, slug, summary, includes (array), sortOrder, note (e.g. "Quoted separately")
- **Industries**: name, slug
- **Testimonials**: quote, name, jobTitle, company, photo (optional), featured
- **ClientLogos**: name, logo, url (optional), sortOrder
- **TeamMembers** (optional section): name, role, photo, bio, sortOrder
- **Inquiries**: stores every form submission (backup to the email notification): type (`general` | `quote`), name, company, email, phone, services (→ Services, many), selectedIncludes (array of strings), budget, timeline, message, createdAt
- **Global `SiteSettings`**: phone(s), email, WhatsApp number, Telegram username, address, office hours, map embed URL, social links, homepage stats (value + label)

Do not build a general page builder. Page copy lives in code; only the items above are editable.

## AI Case Study Writer

In the Project edit screen: the editor types a few short notes in `aiNotes`, clicks **"Draft with AI"**, and the AI drafts `challenge`, `delivered`, and `results` in Meliel's voice (credible, results-focused, no hype, no invented numbers). The draft fills the fields for **human review**: it never auto-publishes. The endpoint must require an authenticated admin/editor session and be rate-limited. The prompt must instruct the model to use only facts present in the notes.

## Quality bar

- **Mobile-first**, verified from 360px to 1440px+.
- **Performance**: Lighthouse ≥ 90 (mobile) on public pages. Many visitors are on slow mobile connections: use `next/image` (AVIF/WebP), lazy-load below the fold, and use a **click-to-load facade** for video embeds (thumbnail until clicked).
- **Accessibility**: WCAG 2.1 AA. Watch contrast: brand orange on white is **not** readable as body text; use it for accents and buttons (with navy text), not for small text. Visible focus states. Alt text is a required CMS field. Respect `prefers-reduced-motion`.
- **SEO**: Metadata API per page, unique titles and descriptions, per-page Open Graph image, `sitemap.xml`, `robots.txt`, canonical URLs, JSON-LD (`Organization`/`LocalBusiness` on site, `CreativeWork` on project pages).
- **Security**: `/admin` behind Payload auth; honeypot + rate limiting on the inquiry form and AI endpoint; secrets only in env; `docs/reference/` in `.gitignore`.

## Project timeline (from the agreement, adjusted for content delays)

1. Kickoff, content collection, design direction (in progress, content partly received Oct 26, 2026)
2. **Visual design of all pages, desktop + mobile** (current phase, designed directly in code with placeholders)
3. Full development: pages, Portfolio Manager, AI writer, analytics → staging for client review
4. Client review (2 revision rounds **total**), testing, domain setup, launch

Client reviews on staging → pays the 70% delivery payment → launch and handover.

## Status log

Append one line per completed step: `YYYY-MM-DD: what was done`.

- 2026-10-26: Project kit created; design phase starting.
- 2026-10-29: Step 1 done. Scaffolded Next.js 16.4.3 + React 19.3 + Tailwind 4 + TypeScript strict (pnpm, src/, `@/*`, standalone output, cacheComponents off). Added Prettier + Tailwind plugin, clsx, `.gitattributes` (LF), `.env.example`, `.nvmrc`, folder skeleton, `typecheck`/`format` scripts. Lint, typecheck, format check and build pass.
- 2026-10-29: Step 2 done. Interim SVG logo redrawn from the v1 PNG on its 33×20 grid (public/brand/, Logo component with color / color-on-dark / white variants), favicon + apple icon from the ladder. Tailwind theme tokens (orange + navy 50–950 from logo anchors, ice, 7 ladder steps, paper, display type sizes; default palette removed). Fonts: Sora + Inter + Noto Sans Ethiopic (auto for lang="am"). UI components: Button, Container, Section, Card, Tag, Placeholder, PlaceholderImage, Rise, LadderProgress (scroll-driven CSS, no JS). `pnpm contrast`: all 28 pairs pass AA. Internal showcase at /dev/design-system (hidden when SITE_ENV=production).
- 2026-10-29: Step 3 done. Types mirroring the Payload model (`src/lib/types.ts`), the client's verbatim page copy (`src/content/copy.ts`), the single placeholder file (`src/content/seed.ts`: 5 real services + 56 distinct placeholders), the data layer (`src/lib/data.ts`: async getters with service/industry/featured filters, drafts excluded, previous/next), `isPlaceholder` helper, `pnpm placeholders`, internal `/dev/data` page.
- 2026-10-30: Step 4 done. Global layout in the root layout: skip link, preview banner (only when SITE_ENV=preview), sticky header (logo + name, nav with active state, "Start a Project" → /quote, accessible mobile menu with Esc/focus/scroll lock), footer (brand line, nav, services, contact details and socials with placeholder handling, privacy link), floating WhatsApp/Telegram buttons on every page (inert and outlined while numbers are placeholders), ladder progress, single `<main id="main">`. Friendly 404 ("missing step" ladder). Contact link helpers (`src/lib/contact.ts`), nav config (`src/lib/navigation.ts`), Tabler icons (MIT). WhatsApp teal / Telegram blue tokens pass 3:1.
- 2026-10-30: Step 5 done. Home page with all 8 sections: hero (brand-line headline with "rise" highlight, value statement, CTAs, decorative ladder that climbs in on load, Amharic name + meaning), client logos strip, results as stepped ladder rungs on navy, 5 service cards → /services#slug, featured work (ProjectCard), 6-step process staircase (dark → light), testimonials, closing CTA band. Sections with no data hide themselves. Shared: `Value` (placeholder-aware text), `MediaImage` (next/image or placeholder; AVIF/WebP on), `SectionHeading`, `ProjectCard`, `ProcessLadder`, `Testimonials`, `CtaBand`.
- 2026-10-30: Step 6 done. Services page: reusable `PageHero`, jump links, one `ServiceSection` per service with anchors (#branding, #digital-marketing, #market-analysis, #websites, #event-production), summary, "Includes" list where Meliel gave one, Event Production note callout, "Get a quote" → `/quote?service=<slug>`, "See related work" → `/work?service=<slug>` (only when published work exists), closing CTA.
- 2026-10-30: Step 7 done. About page: hero (Meliel: A Pathway to Greater Heights), signature name-meaning section (Amharic + English, brand line set large), story and founding year (placeholders), mission and vision, 6 values, what makes Meliel different, optional team (hides when empty), process staircase, closing CTA. Copy verified word for word against `docs/02-meliel-content.md` by script.
- 2026-10-30: Step 8 done. `/work`: server-side filters as plain links (`?service=`, `?industry=`; shareable, no JS needed, unknown values ignored), project count, empty state, swipeable chips on phones. `/work/[slug]`: header and cover, result highlights (shared `RungStats`), challenge, delivered, gallery with full-screen `<dialog>` viewer (keyboard, focus return, scroll lock), click-to-load `VideoFacade` (youtube-nocookie/Vimeo, `src/lib/video.ts`), results, previous/next, CTA; drafts and unknown slugs give the 404. Run the standalone server with `node .next/standalone/server.js`, not `next start` (check for the step 10 preview).
