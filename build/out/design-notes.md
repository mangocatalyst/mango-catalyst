# Design Notes (started 2026-07-01, Phase A pick round)

## Bryan's picks (LOCKED 2026-07-01, per D7 + the ONE-SHOT pause gate)

- **Hero direction: A (type-led).** Stacked Big Shoulders industrial caps, amber period after "Trade", faint blueprint grid + registration crosses, one navy glow, line-mask rise reveal + spark pop + rule draw-on (CSS only, static on mobile + reduced motion). Winning branch: `hero-a`. Judges averaged 8.5.
- **Section palette: B (light conversion bands).** Pricing/FAQ/contact bands flip to light bg with navy text, amber as button fill only, per the branding doc option-B token set (see `palette-mock` branch, /palette route, lower band).
- **Display font: Big Shoulders KEPT** (Bryan vetoed nothing). Alternate on record: Archivo. Inter Variable stays body/UI. Both bundled via next/font.

## Phase A state (all complete)

- Branches on origin: `oneshot-base` (blog deleted, stubs viable, build green), `hero-a` (WINNER), `hero-b`, `hero-c`, `hero-d` (losers, keep for reference until Phase B merges), `palette-mock`.
- `build/out/seo-spec.md`: 11-page map, guide prefix `/guides/`, articleLd builder specced, GSC + Bing + Bing Places, honest launch framing.
- `build/out/copy/`: final copy, all 11 pages, every honesty rewrite executed (MF-1/2/3, duration/offer/fit sweeps), self-verified.
- Judge verdicts: all four heroes passed (A 8.5, B 7.3, C 7.8, D 8.7); full notes in the Phase A workflow transcripts.

## Phase B (NOT STARTED, next session)

Per `build/ONE-SHOT.md` Phase B table: polish hero-a at MAX (it seeds tokens), fan out remaining pages at HIGH on a branch off `hero-a` (design system: hero-a tokens + palette-B light-band set), Fable red team, integrator 06 loop until green. Still pending from Bryan: Cal.com account (fallback ships without), headshot photo (type-only without), LLC (gates production only).

Known env facts: Vercel previews come from GitHub pushes (CLI unauthenticated); preview URLs via the Vercel check-runs on each commit; TWO Vercel projects are attached to the repo (`mango-catalyst` and `mango-catalyst-7din`), Bryan to delete the stray one.
