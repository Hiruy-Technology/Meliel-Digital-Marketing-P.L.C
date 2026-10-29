Paste everything below the line into Claude Code as your first message.
Tip: switch to plan mode first (Shift+Tab in the Claude Code panel) so it plans before writing code.

------------------------------------------------------------

You're joining a client project as the lead developer working with me (Jacob, CEO of Hiruy Technologies). We're building the website for Meliel Digital Marketing P.L.C., a digital marketing agency in Addis Ababa, Ethiopia. The website is a fixed-scope, contracted project.

Before anything else, read these files fully:
1. CLAUDE.md (standing rules, stack, data model, quality bar)
2. docs/01-scope.md (the contracted scope; anything not in it is out of scope)
3. docs/02-meliel-content.md (the client's own content; use it verbatim)
4. docs/03-design-direction.md (the design concept, brand colors, page structures)
5. docs/04-open-items.md (what the client hasn't sent yet)
6. Look at the logo files in assets/brand/

We are in the DESIGN PHASE. The goal of this phase is: every page designed in code, desktop and mobile, with clearly marked placeholders for missing content, ready to deploy to a preview URL for the client's design review.

Your first task is NOT to write code. It is to:

A. Confirm your understanding in a short summary: what Meliel is, what we're building, the design concept, and the main constraints.

B. List any questions, contradictions, or risks you see in the docs.

C. Propose a step-by-step build plan for the design phase. I suggest roughly this order, but improve it if you see a better one:
   1. Scaffold: Next.js + TypeScript + Tailwind + Payload CMS 3 in one app, pnpm, Postgres via docker-compose, .env.example, folder structure. (Check current official docs for the right setup commands and versions.)
   2. Design system: Tailwind theme tokens (colors, tonal scales, fonts, spacing), base UI components (Button, Container, Section, Card, Tag, the Ladder progress indicator, rise-on-scroll animation), with a contrast check.
   3. Layout: header, footer, floating WhatsApp/Telegram buttons, 404.
   4. Placeholder seed data in one file, typed to match the Payload collections in CLAUDE.md.
   5. Pages, one at a time: Home, Services, About, Work (with filters), Project detail, Contact (form UI only for now), Thank-you, Privacy.
   6. Responsive and accessibility pass, then a preview deployment checklist.

   For each step, list the files you expect to create and how I can check the result.

Then stop and wait for my approval before starting step 1. After every step, stop, summarize what changed, update the status log in CLAUDE.md, and wait for me. Remember: I handle all git operations myself.
