# Open Items (pending from client)

Update this file as items arrive. Content was due October 23, 2026; partial content received October 26, 2026.
Per Article 6.2, the timeline extends for client content delays.

## Received ✅
- Name meaning (Amharic + English), mission, vision, values, differentiator, 6-step process
- Services list (5 services)
- Logo files as PNG: 5 icon colorways (black, navy, gradient, orange, white/transparent) + 2 full-logo versions
- Approximate color sheet (superseded by colors sampled from the files; see design direction)
- **Company profile PDF (2026-11-04):** about paragraph, tagline, 5 sectors, team (10 names and roles), 8 case-study results, 14 client names, phones, email, address, legal name and TIN. On the site via `src/content/profile.ts` and `pnpm import:profile`. What's still missing is in `docs/07-content-request.md`

## Pending ⏳
### Blocking development
- [ ] **Portfolio:** 8 case studies received in the profile, with results. Still needed per project: photos, videos, the challenge, what Meliel delivered, confirmation of industry and services, client permission
- [x] **Meliel Google account** received by Jacob (2026-10-30). All external services and tools must be registered under this account. Credentials stay with Jacob: never put them in the repo, docs, or chat.
- [ ] **Account setup (rest)**: domain (existing or preferred names), payment method for paid services
- [ ] Email address(es) for inquiry notifications
- [ ] Portfolio Manager users (names + emails)
- [ ] Main point of contact for approvals

### Brand
- [ ] Which full logo is official: v1 (muted) or v2 (bright)? Default assumption: v1
- [ ] Vector logo files (SVG, AI, or PDF)
- [ ] Brand fonts, if any
- [ ] 2 to 3 reference websites they like, 1 to 2 they dislike

### Content
- [ ] Company story (how and why Meliel started) and founding year. The profile's "About Meliel" paragraph is on the About page
- [ ] Homepage numbers (clients served, campaigns delivered, years in business, etc.)
- [ ] Client logos: 14 names received (profile). Still needed: the original logo files and confirmation that each client agreed to be shown
- [ ] Testimonials (quote, name, title, company)
- [ ] Team: names and roles received (profile). Still needed: photos (with each person's agreement), short bios, and the Amharic spelling of each name
- [ ] Contact details: phones, email and address received (profile). Still needed: WhatsApp number, Telegram username, map pin, office hours
- [ ] Social media links
- [ ] Inquiry form options: budget ranges (ETB) and timeline choices
- [x] Industry list: the profile's 5 sectors
- [ ] Privacy Policy details: legal name received (profile); the contact address and email are used for now. Still needed: confirmation of the registered address and data contact email, how long inquiries are kept, the policy date

## Decisions to confirm at kickoff
- [x] Production database: Neon (decided by Jacob 2026-10-30)
- [ ] Portfolio service filters = the 5 services in `02-meliel-content.md`
- [ ] Event Production inquiries handled as "quote on request"
- [x] Languages: full Amharic and English site, decided by Jacob 2026-10-30 (replaces "English only")
- [ ] Written agreement with Meliel for the Amharic site, dark theme and cookie consent banner: price and timeline
- [x] Amharic text: Hiruy translates (Claude drafts, Jacob reviews), decided 2026-10-30
- [ ] Jacob's review of the Amharic drafts (`docs/06-amharic-review.md`)
- [ ] Meliel sign-off of the Amharic text, then set `amharicApproved` to true in `src/i18n/config.ts`
- [ ] Registered Amharic company name, to replace the draft in the footer
- [ ] Legal review of the Amharic Privacy Policy
- [x] Default language English; `/admin` stays in English
- [x] Budget and timeline options editable in the admin (added to Site Settings)
- [ ] Hosting choice (Vercel vs. VPS)
- [ ] GA4 measurement ID and Search Console code from Meliel's Google account, into the production environment (`NEXT_PUBLIC_GA_MEASUREMENT_ID`, `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`)
- [ ] `/am` Lighthouse sits right at 90 on this PC; recheck on staging. A small existing layout shift (0.092, from the home page's lower sections) is worth fixing then
- [ ] Step 17, AI Case Study Writer: postponed 2026-11-03, but contracted, so it must be built before handover. Needs an Anthropic API key under Meliel's Google account
- [ ] Verify Meliel's domain in Resend, then set `INQUIRY_FROM_EMAIL` and the team's addresses in `INQUIRY_TO_EMAILS`. Until then, inquiry emails only reach the Resend account's own address
- [x] Lighthouse on `/am` under 90: fixed 2026-11-03 with a smaller font (91 and 96)
- [ ] Before launch: `pnpm placeholders` must be clean. The company story, founding year and Privacy Policy details stay in `seed.ts`, so they would still show on production until Meliel sends them
