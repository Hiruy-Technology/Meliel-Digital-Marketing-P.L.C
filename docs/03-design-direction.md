# Design Direction

Status: **proposed by Hiruy, pending client approval** at the design review. Build it as a coherent system so changes are cheap.

## Core concept: "The Ladder" (መልዕል)

Meliel (መልዕል) means a ladder, a way to rise. The logo expresses this literally:
- The **wordmark** spells መልዕል in geometric, blocky Ge'ez letterforms (orange).
- The **ዕ** is drawn as a **ladder/pillar**: a small square on top of six stacked bars, colored as a gradient from **deep navy at the bottom to light ice blue at the top**. Rising = getting lighter.

The website should carry this idea throughout, with restraint:
- **Rise motif**: sections and elements reveal upward as they enter (subtle translate-Y + fade). Respect `prefers-reduced-motion`.
- **Ladder progress indicator**: a slim vertical ladder (stacked bars, like the logo pillar) fixed at the page edge on desktop that fills step by step as the user scrolls. Hide on small screens or render as a thin top bar.
- **Stepped layouts**: the 6-step "How Meliel works" process shown as a rising staircase or ladder, bottom to top, dark to light.
- **Results as steps**: homepage stat blocks styled as ladder rungs.
- Hero headline built on the brand line: helping brands rise **from where they are to where they have the potential to be**.

Tone: credible, strategic, results-first, confident. Meliel positions itself as a **growth partner**, so the design should feel sharp and trustworthy, closer to a consultancy than a playful creative studio. Lead with outcomes and numbers.

## Brand colors

Sampled from the client's logo files (exact values; the client's color sheet was approximate). Vector files are pending; re-check against them when they arrive.

| Token | Hex | Use |
|---|---|---|
| `orange-500` (brand primary) | `#FAA91A` | Primary buttons, key accents, highlights, the wordmark. **Not for body text on white** (fails contrast). |
| `navy-900` (brand dark) | `#1B3354` | Main text, dark sections, footer, button text on orange |
| `navy-950` | `#122B4D` | Deepest background, hover states |
| Ladder gradient | `#1D3959` → `#406B8F` → `#99C3DE` | Bottom to top. Ladder motif, progress indicator, rare decorative use |
| `ice-300` | `#99C3DE` | Light accents on dark backgrounds |
| White / off-white | `#FFFFFF` / pick a warm neutral like `#F7F8FA` | Page backgrounds |

Build a full tonal scale (50 to 950) for orange and navy from these anchors as Tailwind theme tokens. Verify every text/background pair meets WCAG AA.

**Logo version decision (pending client confirmation):** two full-logo versions exist. `logo-full-v1-muted.png` (orange `#FAA91A`, muted blue gradient) matches all the standalone icon files, so treat **v1 as the default**. `logo-full-v2-bright.jpg` uses `#FE9E00` and a brighter cyan gradient.

## Typography (proposal)

The logo is custom and geometric, so pair it with:
- **Headings**: a geometric or grotesque sans with character (for example Space Grotesk, Sora, or Manrope at heavy weights)
- **Body**: a highly legible sans (for example Inter or the same family at regular weight)
- **Amharic text** (the meaning section, the name): **Noto Sans Ethiopic**

Load via `next/font` with subsetting. Present 2 pairing options at design review if unsure.

## Page structures

### Home
1. Hero: headline (rise concept), short subline, 2 CTAs ("Start a Project", "See Our Work"), subtle ladder visual
2. Client logos strip
3. Results in numbers (ladder-rung stat blocks) [placeholders]
4. Services overview: 5 cards linking to `/services#slug`
5. Featured work: 3 to 6 project cards [placeholders]
6. How we work: 6-step rising ladder
7. Testimonials [placeholders]
8. Closing CTA band (navy background, orange button)

### About
Name meaning (Amharic + English, a signature section), story [placeholder], mission and vision, 6 values, what makes Meliel different, team [optional, placeholders], how we work, CTA.

### Services
Intro, then one section per service with anchor (`#branding`, `#digital-marketing`, `#market-analysis`, `#websites`, `#event-production`), each with summary, "includes" list, a CTA prefilled to that service in the inquiry form. Event Production shows "Quoted separately".

### Work (portfolio)
Filter bar (service + industry, URL query params so filtered views are shareable), responsive grid of project cards (cover image, client, service tags, one highlight result), empty state.

### Project detail
Hero with cover, client, industry, services; result highlights as large numbers; challenge; what we delivered; image gallery with full-screen lightbox; video embeds (click-to-load facades); results; next/previous project; CTA.

### Contact
Smart inquiry form (name, company, email, phone, service, budget range, timeline, message) + direct contact block (WhatsApp, Telegram, phone, email), map embed, office hours, social links.

### Global
- Header: logo, nav (Work, Services, About, Contact), "Start a Project" button
- **Floating WhatsApp and Telegram buttons on every page** (contracted feature)
- Footer: logo, short brand line, nav, contact, socials, privacy link

## Design deliverable for this phase

All pages designed in code (desktop + mobile) with placeholder content, deployed to a preview URL for the client's design review (revision round 1).
