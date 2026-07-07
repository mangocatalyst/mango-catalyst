<!-- Repo copy for agents working on this branch. Canonical: AI Vault projects/mango-catalyst/brand-guidelines.md. Edit both or note the drift. -->
# Mango Catalyst, Brand Guidelines

> Created 2026-07-04, updated 2026-07-06 (post-launch conventions: casing, amber pull-quote, wide prose at lg, price figures in the display face, footer chart). The one-page source of truth for every design choice. Consolidates [[branding-color-type-spec-2026-06-14]] (the reasoning) plus the decisions locked during the build (light bands option B, Big Shoulders display face, the shipped component rules). Shipped implementation: `src/app/globals.css` and `src/app/fonts.ts` on `main` of `~/Projects/mango-catalyst`. If this file and the code disagree, fix one of them the same day.

---

## Identity in one line

Deep matte navy ground, one scarce mango-amber spark. Lead with **catalyst** (the reaction), not the fruit and not the wrench. Trades flavor lives in copy and photography, never in the logo.

**Amber scarcity is the core rule.** Amber marks the spark, the rule, and the one thing we want clicked. If everything is amber, nothing is.

## Logo

Lowercase Inter semibold wordmark `mango catalyst` plus one amber spark dot after the final letter (0.3em circle, 0.18em gap, baseline-aligned). The dot is the memory hook and echoes the hero H1 spark. No literal fruit, no wrench, no gear, no circuit board. Component: `src/components/ui/Wordmark.tsx`.

## Color tokens

### Dark bands (the default world)

| Token | Hex | Role |
|---|---|---|
| `deep` | `#0A1120` | Deepest navy: footer, mood-shift bands, text on amber fills |
| `base` | `#0E1729` | Primary page background, `themeColor` |
| `surface` | `#16213A` | Raised card / panel |
| `surface-hi` | `#1E2C4A` | Hover, elevated surface, input fill |
| `hairline` | `#2A3A5C` | Hairline dividers. DECORATIVE ONLY, never a meaningful boundary (1.58:1) |
| `ink` | `#F2F5FA` | Headings |
| `body` | `#D5DEEC` | Body copy |
| `muted` | `#9DAAC2` | Secondary text, captions |
| `faint` | `#7E8BA6` | Fine print. Faintest still-AA text on `base`, go no lighter |

### Light conversion bands (pricing, FAQ, forms)

| Token | Hex | Role |
|---|---|---|
| `light` | `#F4F6FB` | Light band background |
| `surface-lt` | `#FFFFFF` | White card on a light band |
| `navy` | `#0E1729` | Headings and links on light |
| `navy-2` | `#1E2C4A` | Body text on light |
| `muted-lt` | `#516079` | Muted text on light |
| `border-lt` | `#D5DCEA` | Hairline on light |

### Accent and status

| Token | Hex | Role |
|---|---|---|
| `amber` | `#F6A328` | THE accent. CTA fill, dark-band links, active states, selection |
| `amber-hi` | `#FFB84D` | Amber hover for TEXT (inline links, arrow links). Buttons hover darker |
| `amber-mid` | `#E2941D` | Primary button hover (darker won the 2026-07-07 lighter-vs-darker trial) |
| `amber-deep` | `#C97E12` | Amber pressed |
| `success` | `#37C99A` | Success + positive numbers (always paired with glyph + word) |
| `error` | `#FF6B6B` | Errors, validation (always paired with glyph + word) |
| `link` | `#5BA8FF` | Reserve cool-blue link, unused unless amber overload appears |

### The two traps (non-negotiable)

1. **Never white text on amber.** 1.89:1, hard fail. Amber fills always carry deep navy text (9:1+).
2. **On light bands, amber is button fill and decorative accent only** (the white card's amber top border is the sanctioned accent). Amber as text, icon, or link on light fails AA (1.91:1). Links and accents on light go navy. On dark bands amber text is fine (8.68:1 on `base`).

Matte feel: desaturated navies, flat fills (max 2 to 4 percent lightness shift), navy-tinted low-opacity shadows (`rgba(10,17,32,0.4)`, short blur), never pure black, never glossy.

## Typography

| Face | File | Role |
|---|---|---|
| **Inter Variable** | `Inter-Variable-latin.woff2`, weight 100 to 900 | Body, UI, wordmark. Locked brand default |
| **Big Shoulders Variable** | `BigShoulders-Variable-latin.woff2`, weight 100 to 900 | Display: H1/H2 headlines (uppercase), price figures, amber pull-quotes (sentence case). Industrial. Alternate on file: Archivo |

Both self-hosted in-repo via `next/font/local` (OFL, license files next to the woff2s), `display: swap`, no third-party font requests ever.

### Type scale (shipped values)

| Role | Face / weight | Size | Tracking / leading |
|---|---|---|---|
| Hero H1 | Big Shoulders 800, uppercase | `min(clamp(3.75rem, 1.5rem + 8.5vw, 10.5rem), 13.5svh)` | 0.012em / 0.94 |
| H2 section | Big Shoulders 700, uppercase | `clamp(2rem, 1.3rem + 2.4vw, 3.25rem)`, max-width 24ch | 0.015em / 1.02 |
| Section lead | Inter 400 | 1.05rem, sm: 1.125rem, max-width 44rem (lg: 52rem) | 1.65 leading |
| Body | Inter 400 | 1rem to 1.125rem, never under 16px on mobile (iOS zooms forms); long prose goes 1.2rem at lg | 1.6 leading |
| Small / caption | Inter 400 to 500 | 0.875rem, `muted` | |
| Button label | Inter 600 | 1rem (sm: 0.925rem) | -0.006em |
| Price figures | Big Shoulders 700 | 3rem (sm: 3.5rem) | leading 1 |
| Amber pull-quote | Big Shoulders 600, sentence case, `amber` | 1.35rem (lg: 1.5rem) | 1.45 leading, `text-wrap: balance` |
| Wordmark | Inter 600 | 1.05rem, tracking tight | |

Rules: left-align everything (short headings may center), no justified text, body lines 60 to 80 characters (prose is 44rem base, widening to 52rem with 1.2rem type from `lg` so iPad landscape isn't a dead zone), `text-wrap: pretty` on p/li sitewide, generous vertical whitespace between bands.

Casing: Title Case for button labels, the navbar CTA, and card H3 headlines ("Book a 15-Minute Fit Call", "Reporting You Don't Have to Build"). Sentence case for prose, inline links, meta descriptions, and the contact H1 (on purpose). Display H1/H2 stay uppercase.

## Components

- **Primary button** `.btn-primary`: amber fill + `deep` text, radius 0.5rem, padding 1rem 1.5rem (`.btn-sm` 0.55rem 1.05rem). Hover `amber-mid` (darker, same navy text; changed from `amber-hi` 2026-07-07), active `amber-deep` + `ink` + 1px translate. Disabled `surface-hi` + `faint`. Arrow icon nudges 3px on hover.
- **Ghost button** `.btn-ghost`: transparent, 1px amber border, amber text. Dark bands only, and only as the ONE secondary action. Never competes with the primary.
- **Inline links**: always underlined (never color-only). Dark: `.inline-link`, amber with 45 percent underline, hover `amber-hi`. Light: `.inline-link-light`, navy 500 with 35 percent underline, hover underline goes `amber-deep`.
- **Focus ring**: 2px amber outline, 2px offset, on every interactive element, never removed. Flips navy on light bands (`data-tone="light"`) and draws inside amber fills (offset -6px) so it reads on any background.
- **Inputs**: `surface-hi` fill, 1px `hairline` at rest, 2px amber on focus, `error` border + message on fail. Placeholder is never the only label.
- **Section heading motif**: every H2 opens with a 3px x 2.5rem amber tick (the hero's measured rule carried through the page).
- **Amber pull-quote**: the one sanctioned non-interactive amber text. Big Shoulders 600, sentence case, 1.35rem (lg: 1.5rem), `text-wrap: balance`, closes a section. Max one per band, and it spends that band's amber budget: links and rails near it go neutral (see ServiceGrid, where the industry links were cut for it).
- **Icons**: line style, 1.5 to 2px consistent stroke, `muted` at rest, amber only when active or important.
- **Selection**: amber background, `deep` text.

## Layout and spacing

- Content container: `max-w-6xl`, `px-6` (sm: `px-10`), vertical band padding `clamp(4.5rem, 9vw, 7rem)`. One shell for every band: `src/components/layout/Section.tsx`.
- Sticky navbar is 4rem; jump targets use `scroll-margin-top: 5.5rem`.
- Band rhythm (three tones only): `base` default, `deep` for mood shifts (problem, proof, final CTA), `light` for high-scrutiny conversion sections (pricing, FAQ, contact form). Never more tones than these.
- Radius: 0.5rem buttons and small elements; cards may go larger but stay consistent per component.

## Motion

- Micro-interactions: 150ms ease (color, border, transform); links 120ms.
- One orchestrated hero reveal per page load: desktop only (min-width 48rem), skipped entirely under `prefers-reduced-motion`, everything server-rendered text underneath. Signature easing `cubic-bezier(0.22, 1, 0.36, 1)`, spark pop `cubic-bezier(0.34, 1.56, 0.64, 1)`.
- Entrances play ONCE. Static fallback rule: base CSS values are always the settled composition; "start hidden" states live only inside the motion media gate.
- Smooth scroll only when motion is allowed.

## Imagery

AI-generated or AI-stylized imagery (locked during the build, supersedes the spec's owned-photography rule). Subjects stay real plain trade visuals (truck, dispatch board, invoice on a screen) with dummy data so navy+amber reads "shop," not fintech. Everything sits in the navy world: desaturated, cool-toned, matte. Never NorthStar assets, never implied client relationships, no stock. No social media icons or links, ever. Prompt library: `build/out/imagery-prompts.md`.

**Footer chart ("The Chart Sheet", locked 2026-07-06):** the Lake Superior coastline inked straight onto the footer's `deep` band at 25 percent opacity, with the amber period on Duluth sitting just left of the real NAP line, which acts as its label. Decorative and `aria-hidden`; the only motion is the dot's faint always-on CSS pulse. Component: `src/components/layout/FooterBackdrop.tsx`.

## Accessibility floor

WCAG AA everywhere (4.5:1 normal text, 3:1 large text and UI objects). Every pairing in the token tables is precomputed in the 06-14 spec. State is never color-only: success/error pair glyph + word, links carry underlines. Run Chrome DevTools vision-deficiency emulation before any launch.
