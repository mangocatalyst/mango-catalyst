# Role Brief 03 — Design / UI Engineer (the builder)

**Model + tools:** Fable, in Claude Code, with the `frontend-design` skill and Motion (Framer Motion). You write the actual repo code. **Read `AGENTS.md` + the relevant bundled `node_modules/next/dist/docs/` BEFORE coding** (this is Next 16.2.2, with breaking changes vs older training data). Hero backdrop tech is UNDER REVIEW (see the hero note below), do NOT assume a WebGL lib.
**Position in pipeline:** after Copy (02). You produce the real site. Feeds the Red Team (05).

## Read first
- `~/Projects/mango-catalyst/AGENTS.md` + the relevant bundled `node_modules/next/dist/docs/` (Next 16.2.2 has breaking changes vs your training data, read BEFORE coding)
- `00-canonical-brief.md`
- `~/Documents/AI Vault/projects/mango-catalyst/branding-color-type-spec-2026-06-14.md` (EXACT navy+amber hex, type scale, WCAG pairings)
- `build/out/copy/` (final copy) and `build/out/seo-spec.md` (schema + meta to wire in)
- `~/Projects/mango-catalyst/SEO-FOUNDATION.md` (the foundation you build ON TOP of, do not break it)
- The `frontend-design` skill (aesthetic bar, anti-generic)
- `~/Projects/mango-catalyst/SCAFFOLD.md` for STRUCTURE only (ignore its orange tokens + "Stop Hiring" hero)

## Your job
Build the MVP site on the kept SEO foundation:
- **Design system:** centralized navy+amber tokens (Tailwind theme). Type pairing: Inter Variable body (locked) + a distinctive display font you SELECT yourself (Bryan delegated the pick). Load both via `next/font` so they are self-hosted and Vercel-optimized with no layout shift. Pick a characterful display font per `frontend-design`, not a generic default.
- **Design system (in-repo):** build the shared token + core-component layer (buttons, cards, nav, form fields, section shells, badges) directly in the repo. Seed the aesthetic from a grounded-industrial navy+amber DESIGN.md brief (pattern: the `awesome-claude-design` aesthetic families), not a generic default. `frontend-design` stays the taste/anti-slop bar on top. (DROPPED 2026-06-30, red-team #7: the Claude Design `/design-sync` gallery-project was over-engineered for this one-shot site; review components in context on the Vercel preview instead. Re-add only if Bryan explicitly wants the isolated review pane.)
- **Components + pages:** all MVP pages as SERVER components, wired with the real copy and the per-page JSON-LD from the SEO spec.
- **The hero (mockup-gated, red-team #1 + D7, updated 2026-07-01):** the animated WebGL mesh backdrop is PARKED; it likely reads as AI-slop / crypto-dashboard and conflicts with the matte brand spec. Build REAL rendered mockups of 3 to 4 hero variants (one per direction in `build/out/hero-direction-options.md`) AND both section-palette options (branding doc A all-dark vs B light conversion bands) on the Vercel preview, then PAUSE for Bryan's picks. Build the picked hero direction and palette; NEVER silently default either. The hero is the centerpiece: it runs at maximum effort and seeds the design tokens the rest of the site inherits (see BUILD-PLAN staging + effort map). Either way the hero H1/subhead/CTA stay server-rendered text and there is one orchestrated staggered page-load reveal. Do NOT ship the WebGL mesh without Bryan's explicit go.
- **Motion:** subtle, CSS-first, Motion for reveals. High-impact moments over scattered micro-interactions.
- **Imagery:** art-direct it (grounded-industrial, navy+amber), write the AI-image prompts, use clean placeholders in the build. Bryan curates the real generation. NOTE (2026-07-01): no image-generation tool is connected in this environment, so prefer code-drawn SVG/CSS graphics (the logo is an SVG wordmark + one amber spark mark); raster imagery is generated externally by Bryan from your prompts. **People rule per `00` (D8): never fabricate people or faces; the About headshot is a real Bryan photo, AI-stylized externally, type-only fallback.**
- **Booking flow:** the CTA "Book a 15-minute fit call" opens an embedded self-serve scheduler with real, selectable time slots (**Cal.com, decided 2026-07-01**; Bryan connects the account + calendar). It auto-generates a Google Meet link per booking. Read the booking URL from the env var and render the honest fallback (message form + one-business-day expectation copy) until it exists. Build the embed plus a confirmation/expectation state and one qualifying field. See 00's Open config + booking spec for the full rationale.
- **Also yours, per `00` (added 2026-07-01):** the `/privacy` page (copy from 02); the contact-form route handler with honeypot + minimum-fill-time spam protection; Vercel Web Analytics + Speed Insights with booking-completed and CTA-click events; favicon + apple-touch-icon from the logo mark; branded not-found and error pages.

## Hard constraints
- 80 to 90% grounded industrial / refined. NOT generic SaaS or crypto-dashboard. Clears a graphic designer's bar on layout, whitespace, type.
- Mobile-first. Lighthouse mobile 95+ (Perf/A11y/SEO). Accessible (contrast per the WCAG pairings, keyboard, alt text, focus states).
- Content server-rendered, never trapped in the WebGL/client JS.
- No published phone number anywhere. No stock photos, no real client/employer imagery.
- Do not regress the committed SEO foundation. Stash the old uncommitted stubs first.

## Output
The built site in `~/Projects/mango-catalyst/src` on the `seo-foundation` branch (or a child branch). Plus a short `build/out/design-notes.md`: the display-font pick + one alternate, the imagery prompt list, **the chosen hero direction AND the section-palette pick (both Bryan's, from the preview mockups; record which he chose)**, and any open config (booking link, form endpoint, logo).

## Self-verify (loop until green before handoff)
- [ ] `next build` and `tsc` clean; lint clean.
- [ ] Lighthouse mobile: Perf / A11y / SEO all 95+.
- [ ] Hero H1 + FAQ text present in raw SSR HTML (curl, JS off).
- [ ] Any hero motion is lazy / CSS-first, honors `prefers-reduced-motion`, and renders static on mobile (no WebGL mesh unless Bryan approved it).
- [ ] Per-page JSON-LD renders server-side and validates.
- [ ] Tokens centralized; zero orange `#F97316`; navy+amber only. Responsive at 360px, 768px, 1280px.
- [ ] Hero direction + section palette were PICKED BY BRYAN from preview mockups, not defaulted; both recorded in `build/out/design-notes.md`.
- [ ] `/privacy` built and footer-linked; form rejects a bot-style submission; analytics events fire; favicon/apple-touch-icon replaced; branded not-found + error pages render.
- [ ] No fabricated people or faces anywhere in imagery or placeholders.

## Handoff
Hand the preview build to the Red Team (05).
