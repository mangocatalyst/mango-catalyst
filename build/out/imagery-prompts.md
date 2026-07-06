# Imagery Prompts and Art Direction (03-design imagery deliverable)

Written 2026-07-01 by the imagery art-direction pass. Reads with: `00-canonical-brief.md` (imagery + people rule), `03-design.md` imagery bullet, `design-notes.md` (hero A + palette B locked), the branding color/type spec (2026-06-14), and `build/out/copy/`.

---

## 1. Art-direction statement

**Grounded industrial, drawn in code, in exactly this ramp.** The site's visual world is the deep matte navy ramp (`#0A1120` bg-deep, `#0E1729` bg-base, `#16213A` surface, `#1E2C4A` surface-hi, `#2A3A5C` border) with warm amber as the single scarce accent (`#F6A328`, hover `#FFB84D`, pressed/on-light `#C97E12`), plus the palette-B light bands (`#F4F6FB` bg-light, `#FFFFFF` cards) for pricing, FAQ, and contact. Text ramp: `#F2F5FA` / `#D5DEEC` / `#9DAAC2` / `#7E8BA6` on dark; navy `#0E1729` / `#1E2C4A` on light. Nothing outside this ramp ever ships. Zero `#F97316` orange, ever.

**The hero sets the language and everything else speaks it.** Hero A won: type-led, stacked Big Shoulders industrial caps, one amber period, a faint blueprint grid with registration crosses, one subtle navy radial glow, matte flat fills. So the site's imagery language is **the blueprint drawing, not the photograph**: hairline technical linework, registration marks, dimension ticks, schematic nodes, drawn in navy-on-navy low opacity with amber pulled out on exactly one node per composition. Workshop meets software: it should feel like a well-kept drawing set on a shop desk, not a fintech dashboard. Amber is scarce on purpose; if a composition has two amber moments, cut one.

**Code-drawn SVG first, as policy, not as fallback.** No image-generation tool is connected in this build environment, and the type-led hero already proves the brand does not need photography to feel designed. Default for every slot is therefore inline SVG or CSS drawn in the build: line icons at 1.5 to 2px stroke in `text-muted` (`#9DAAC2`) with amber only on the active/important element, blueprint-grid textures at 3 to 5% opacity, schematic spot illustrations as tiny static SVGs. This is smaller, sharper, SSR-safe, theme-token-driven, and immune to the AI-slop look. External AI raster is reserved for the very few slots where a *grounded scene* genuinely adds trust, and Bryan generates those himself from the prompts below, then curates.

**Hard rules carried into every asset and every prompt:**
- No fabricated people or faces anywhere. The only human image on the site is Bryan's real photo, AI-stylized externally (About slot below). Type-only fallback if the photo is not ready.
- No literal fruit, wrench, or gear in any mark or illustration. The mark is the abstract amber spark/dot; trades flavor lives in copy and in the *subjects* of scenes (truck cab, dispatch board, invoice on a screen), never in clip-art tool icons.
- No stock photos, no employer-identifiable anything (no branded trucks, no recognizable shop, no real client data). All on-screen data in any scene is obviously dummy.
- No glossy gradients on large surfaces; flat matte fills, at most a 2 to 4% lightness shift. Shadows navy-tinted (`rgba(10,17,32,0.4)`), short blur, never pure black.
- On light bands, amber appears only as a button fill with navy text, never as text, linework accent, or thin stroke (contrast fails). Illustrations on light bands use the navy ramp with `#C97E12` only where an amber-deep fill is large enough to read as a shape.

---

## 2. Per-slot list

Default is **type/SVG-only**. Only three slots merit external AI raster, and one of those requires Bryan's real photo as source. Everything marked SVG is built in-repo by the design role from the tokens; no external generation needed.

### Home `/`

| Slot | Treatment | Direction |
|---|---|---|
| 1. Hero (`#top`) | **Type/SVG-only (LOCKED, hero A)** | Big Shoulders stacked caps, amber period after "Trade", faint blueprint grid + registration crosses at 3 to 5% opacity, one navy radial glow, amber rule draw-on. Already decided; no imagery work beyond the built SVG grid. |
| 2. Problem (`#the-problem`) | **SVG-only** | Three pain bullets get three line icons, 1.5 to 2px stroke, `#9DAAC2`, drawn in the blueprint language: a late-night document stack with a small clock tick, three identical screens with a repeated-entry arrow, a lead card slipping past a tray. One tiny amber node total across the trio at most. No wrench, no gear. |
| 3. What we do (`#services`) | **SVG-only** | Four card icons in the same line-icon set: invoice sheet with an auto-arrow loop, funnel-to-one-place lead router, calendar with a route polyline, a stacked-bars mini report. Amber only on each icon's single "this part runs itself" node. |
| 4. Credibility strip (`#proof`) | **SVG-only** | One schematic spot illustration of the MN-ITS idea WITHOUT naming UI: a browser window outline whose data-flow arrows loop entirely *inside* a dashed machine boundary, amber dot on the "stays local" node. Reads privacy-first at a glance. No portal screenshots, no real UI. |
| 5. How it works (`#how-it-works`) | **SVG-only** | A drawn process rail: three (plus one running-state) blueprint nodes joined by a hairline with dimension ticks, amber fills the active step as the section scrolls (CSS). This is the method-as-proof texture the brief asks for. |
| 6. Pricing (`#pricing`, light band) | **Type-only** | The numbers are the art: tabular-figure 800-weight prices in navy on the white card, 1px amber top border on the card. No illustration; keep the "clear, no-tricks" read. |
| 7. FAQ teaser (light band) | **Type-only** | Q&A typography only. |
| 8. Final CTA (`#book`) | **Type/SVG-only** | Loudest amber moment per the branding doc: amber-filled CTA on `bg-deep`, optional echo of the hero's blueprint grid whisper for bookending. No new assets. |

### About `/about`

| Slot | Treatment | Direction |
|---|---|---|
| Headshot | **External AI raster, SOURCE REQUIRED: Bryan's real photo.** | This is the people-rule exception: a real photo, stylized externally to sit in the site's graphic language. If the photo is not supplied at build time, ship the type-only About. Never generate a person from scratch. Prompt in section 3. |
| Pull-quote | **Type-only** | Large amber quote on dark, per the copy doc. |

### Services `/services`

**SVG-only.** Six card icons, same set and rules as Home section 3, adding: a plug/API node pair for "connecting the tools" (abstract sockets, not a literal plug if it reads clip-art) and a broom-free "data cleanup" mark (messy scatter resolving into an aligned column, amber on the aligned end). Bottom CTA is type-only.

### Industries / HVAC `/industries/hvac`

| Slot | Treatment | Direction |
|---|---|---|
| Page header scene | **Merits external AI raster (the ONE scene raster on the site).** | This is the trust-heavy vertical page where a grounded "shop, not fintech" scene earns its weight, exactly the hero-option-C idea relocated to where it fits. Navy duotone phone-on-truck-dash scene. Prompt in section 3. Until Bryan generates and approves it, the built placeholder is a blueprint-line dispatch-board SVG in the standard language. |
| Section illustrations | **SVG-only** | Reuse the Home icon set; one HVAC-specific line icon allowed (a schematic airflow/duct line abstracted to geometry, not equipment clip-art). |

### FAQ `/faq`, Contact `/contact`, Privacy `/privacy`

**Type/SVG-only, all three.** FAQ and the contact form live on light bands: typography, navy linework, amber button fills only. Contact's booking block is the Cal.com embed or the honest fallback; no decorative imagery competes with it. Privacy is plain text.

### Guides `/guides` + 3 guide headers

**SVG-only (all four).** Each guide gets a small drawn header motif in the blueprint language, navy-on-navy with one amber node, so the guides read as a designed set without a single raster:

- `hvac-tasks-to-automate`: a checklist column where three of five hairline items convert to amber-filled "automated" nodes.
- `manual-data-entry-cost`: a repeated hand-keyed row motif with a cost tick climbing, dimension-line style.
- `what-is-automation-consultant`: a discovery-plan-build triangle of three schematic nodes, amber on the middle "plan" node.
- Guides index: the three motifs miniaturized as card marks.

### OG image `public/og.png` (1200x630)

**Type/SVG-only, rendered to PNG in the build (not AI).** Per seo-spec section 3: one template for all pages at MVP. Composition: `#0A1120` ground, the faint blueprint grid + registration crosses from hero A, the wordmark small at top-left with the amber spark dot, the H1 "The Other Tools of the Trade" in Big Shoulders caps with the amber period, one hairline amber rule. This is the hero compressed to a card; generating it in code keeps it pixel-identical to the brand and avoids AI text artifacts entirely. Sub-pages share it at MVP.

### Site chrome (favicon, apple-touch-icon, 404/error)

**SVG-only.** Favicon and apple-touch-icon are the amber spark/dot mark on `#0A1120` (mark only, no letterforms at 16px). 404 and error pages are type-only with the standard CTA. No fruit, wrench, or gear, per the logo doctrine.

---

## 3. Generation prompts for the raster slots (Bryan pastes these externally)

Only two raster prompts exist. Both are for Bryan's own image tool; nothing is generated in this build. Curate hard: if a generation looks even slightly stock or glossy, it fails the brand and the SVG placeholder stays.

### 3a. HVAC page header scene (the one scene raster)

**Prompt:**

> Editorial product photograph, matte and desaturated, of a smartphone resting in a dashboard mount inside a work truck cab, seen at a slight three-quarter angle. The phone screen shows a clean, minimal job-schedule interface: deep navy background (#0E1729), soft near-white text rows (#D5DEEC), and exactly one small warm amber accent chip (#F6A328) marking the current job. The schedule content is generic placeholder text, softly out of focus, unreadable. The cab interior is dim and tidy: matte dark surfaces, a hint of early-morning window light, everything graded into a deep navy duotone (#0A1120 shadows, #2A3A5C midtones) so the only warm note in the frame is the single amber chip on the screen. Shallow depth of field focused on the phone. Flat, matte, low-contrast grade. Quiet, workmanlike, trustworthy. Composition leaves the upper third calm and uncluttered for headline overlay. 16:9.

**Negative prompt:**

> no people, no faces, no hands, no reflections of a person, no stock-photo look, no glossy or high-saturation grade, no lens flare, no HDR, no orange (#F97316) or red-orange tones, no bright daylight, no readable text or numbers on the screen, no logos, no brand names, no branded truck or uniform, no wrench, no gears, no tools in frame, no fruit, no cluttered dashboard, no bokeh lights, no neon, no blue-glow cyberpunk, no 3D render look, no illustration style, no watermark.

**Curation checklist for this slot:** amber must appear once and small; grade must read matte navy, not teal; nothing in frame identifiable as a real company; screen unreadable; if the phone UI came out orange-ish, regenerate or color-correct to `#F6A328` before use; export wide enough for 2x at the rendered size and compress to AVIF/WebP.

### 3b. About headshot stylization (source photo REQUIRED: real photo of Bryan)

This is an img2img/stylization job on Bryan's supplied photo, not a generation. Keep likeness; change grade and texture only. If the tool starts inventing facial features, stop and ship the type-only About.

**Prompt (with Bryan's real photo as the source image, low transformation strength, likeness locked):**

> Stylize this real photograph into a matte editorial portrait treatment that matches a deep-navy brand system: convert the background to a flat matte deep navy (#0E1729) with a very subtle darker radial vignette (#0A1120), grade the subject's lighting soft and slightly cool with natural skin tones preserved, reduce overall saturation for a calm matte finish, and add a faint, barely-visible fine grain. Keep the subject's face, features, expression, hair, and proportions exactly as in the source photograph. Simple dark clothing tones that sit within a navy palette. No warm accent colors in the portrait itself. Clean crop, chest-up, generous headroom.

**Negative prompt:**

> do not alter facial features, do not beautify or de-age, no invented face details, no added people, no stock-portrait look, no glossy studio sheen, no strong rim light, no orange or amber cast on skin, no #F97316 orange anywhere, no busy or textured background, no props, no tools, no logos, no text, no painterly or cartoon style, no heavy smoothing.

**Curation checklist:** the result must be recognizably the same photo of Bryan; any drift in likeness disqualifies it. Amber is deliberately absent from the portrait so the page's one amber moment stays on the CTA. Type-only About ships until this passes.

### Explicitly NOT prompted

- Hero backdrop: locked as type-led hero A; no raster, ever, without a new Bryan decision.
- OG image: code-rendered from the brand tokens (section 2), not AI.
- Any person, face, team, "customer," or workplace crowd: banned outright.
- A second scene raster for Home: the credibility strip stays schematic SVG so proof texture never drifts toward implied-client photography. Revisit only in Phase 2 with the same negative-prompt discipline.
