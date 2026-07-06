# Design Notes (started 2026-07-01, Phase A pick round)

## Backdrop artworks integrated (2026-07-02, Bryan picks H1 + F1)

Both winning light-table backdrops are live on `oneshot-build` as server components (SVG as JSX, zero client JS, CSS-only motion, aria-hidden absolute layers at 25% opacity, no CLS impact).

- **Hero: "Top Sheet Dispatch" (winner H1)** in `src/components/sections/HeroBackdrop.tsx`, rendered inside the hero right-of-center (left ~55% stays quiet: anchored right, width `min(44vw, 42rem)`). The approved 1440x560 artwork is rebased into a tight 650x500 viewBox so it sizes predictably instead of slice-cropping. The blueprint grid mask was pulled in slightly (radial 120%x125% at 32% 38%, fade 28% to 70%) so grid and artwork do not stack.
  - **Entrance ("the desk clears itself")**: runs once, starting 2.15s after load, which is ~300ms after the hero reveal's last element (the amber rule) settles at 1.85s. The job ticket and invoice start stacked ON TOP of the dispatch board, then slide + rotate to their final peeking poses underneath (ticket at 2.15s, invoice 250ms later, each a 0.95s ease-out; whole entrance spans 1.2s). The over-to-under restack uses crossfaded duplicated layers: each sheet exists below the board (final artwork, attribute transforms) and above it (pile copy); both copies ride identical transform keyframes, and opacity swaps during the last stretch of the flight (72% to 90%) so the sheet reads as tucking under the translucent acetate. `transform-box: view-box` + `transform-origin: 0 0` makes the CSS transforms compose exactly like the SVG attribute transforms, so the settled state matches the approved static composition (verified by screenshot compare of reduced-motion vs post-animation renders).
  - **Ambient**: only two things move forever. The now-line breathes on a 14s cycle; the amber chip outline redraws via stroke-dashoffset (perimeter 188) on a 20s cycle with an 18s rest.
  - Mobile and prefers-reduced-motion get the finished static composition (pile copies default to opacity 0; under copies carry the final pose as attribute transforms).
- **Footer: "The Chart Sheet" (winner F1)** in `src/components/layout/FooterBackdrop.tsx`, rendered behind the global footer on every page. **Bryan's edits applied**: the sheet border box, inner frame, ALL graticule lines, their lat/long tick labels, the corner registration marks, and the two stray corner sheets are removed; the old -1.5deg sheet tilt is dropped (with no frame to reference it, it read as noise). Kept: coastline, peninsula, amber Duluth period, DULUTH label + leader, and the compass rose (it composes clean without the frame). The lake keeps its right-two-thirds bias and Duluth sits in the left third, directly above where the NAP line renders. SVG width is clamped (`clamp(48rem, 100%, 105rem)`) so the chart neither balloons on ultrawide screens nor shrinks to a speck on phones.
  - **Scroll-zoom (CSS scroll-driven, no JS)**: gated behind `@supports (animation-timeline: view())` plus the desktop + motion media query. A named view timeline on the backdrop wrapper drives the chart group from scale 1.0 to 1.3 with `transform-origin: 469.4px 419.4px` (the exact Duluth point in viewBox units, via `transform-box: view-box`), drifting slightly toward the NAP corner; the amber period emits one soft expanding ring (CSS `r` + opacity, non-scaling stroke) over `animation-range: entry 60%` to 100%.
  - **Fallback** (`@supports not`): static artwork with a very slow (11s) amber-period opacity breath. Mobile and reduced motion: fully static. Link columns verified effortlessly readable at 360px and 1440px; no scrim needed (stroke-only art at 25% on bg-deep stays far below text luminance).

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
