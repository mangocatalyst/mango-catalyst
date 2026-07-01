# Hero Direction — Options (STATUS: UNDECIDED)

**Logged:** 2026-06-30
**Decide:** on REAL mockups, not on paper. Bryan: "I won't know until I see it."
**Owner:** design role (03) mocks 3 to 4 of these (one per direction, per the BUILD-PLAN staging + effort map, 2026-07-01) on a Vercel preview at MAX effort; Bryan picks from real renders.

---

## Context

Red-team Change 1 recommends **cutting the animated WebGL mesh hero backdrop**. Reasons (verified):
- Brand spec forbids "glossy gradients on large surfaces, flat fills only" (branding doc line 31) and warns the navy+amber palette "reads like a crypto dashboard if the imagery is abstract" (line 193).
- An animated mesh on the largest surface IS that look + a WebGL bundle/shader/mobile-fallback/reduced-motion cost for a flourish most visitors never notice.

**Key reframe (the thing to remember):** the WebGL mesh is the **slop end**, not the wow end. A slow-drifting navy+amber gradient mesh is the 2023-2025 AI-startup hero cliche, the visual that makes a site read as generated, not designed. The "amazing" Bryan wants lives in **art direction + typography + one restrained CSS/SVG motion moment**, all cheaper, all SSR-safe, all on-brand (matte). The brand spec already sanctions "a very subtle navy radial glow behind the headline, low opacity, matte" (line 147) and "high-impact single moments over scattered fidgets."

**Not decided yet:** the WebGL cut itself is still pending Bryan's formal go, AND the replacement direction below. Both wait on seeing real mockups.

---

## The four directions

### A. Type-led + one CSS spark  *(Mango's recommendation)*
The H1 is the art: huge display type, amber spark on one word, sanctioned subtle navy radial behind it, a faint blueprint grid, and ONE amber underline that draws on at load. No image, so nothing to go slop. Cheapest, fastest, hardest to make look generated.

```
+--------------------------------------+
|  .   .  faint blueprint grid  .   .  |
|   THE OTHER TOOLS                    |
|   OF THE TRADE o   <- amber spark    |
|   ----------       <- amber rule     |
|                       draws on once  |
|   [ subhead decodes the pun ]        |
|   ( Book a 15-minute fit call )      |
+--------------------------------------+
  flat matte navy . subtle radial glow
  . text is SSR . motion = 1 CSS moment
```

### B. Pure typographic
Same idea stripped further: enormous type, one amber mark, massive whitespace, zero motion, zero texture. Editorial and confident. Risk: leans minimal, could feel like "nothing" if the type pairing isn't strong.

```
+--------------------------------------+
|                                      |
|      THE OTHER TOOLS                 |
|      OF THE TRADE o                  |
|      [ subhead decodes the pun ]     |
|      ( Book a 15-minute fit call )   |
|                                      |
+--------------------------------------+
  flat matte navy . max whitespace
  . all weight on the display font
```

### C. Art-directed scene (navy duotone)
Real grounded scene on one side (phone on a truck dash showing a clean schedule, a dispatch board, an invoice on screen), pushed into a navy duotone so it sits in the palette, one amber UI detail. Reads "shop, not fintech." Risk: needs tight art direction or the AI image itself becomes the slop.

```
+------------------+-------------------+
| THE OTHER        | ::## phone on a   |
| TOOLS OF         | ##:  truck dash:  |
| THE TRADE o      | :##  clean sched, |
|                  | #::  one amber o  |
| [ subhead ]      | ::## chip         |
| ( Book a call )  | ##:  navy duotone |
+------------------+-------------------+
  static image . premium if art-directed tight
  . slop if it's a generic stock-y AI shot
```

### D. Line-art / blueprint motif
A restrained technical-drawing element: an exploded-tool or schematic line illustration, navy-on-navy low opacity, amber pulled out on one node. Industrial and distinctive without a photo. Static SVG, tiny. Risk: can read cold/techy if overdone.

```
+------------------+-------------------+
| THE OTHER        |      /|  exploded |
| TOOLS OF         |     / |  line-art |
| THE TRADE o      |  o--+ |  schematic|
|                  |     \ |  navy on  |
| [ subhead ]      |      \|  navy,    |
| ( Book a call )  |   amber node o    |
+------------------+-------------------+
  static SVG . industrial . kilobytes
  . "workshop meets software"
```

---

## When this gets decided

When Fable is back and the design role (03) runs: build 3 to 4 of these as real hero variants (one per direction, MAX effort, per the BUILD-PLAN staging + effort map) on a Vercel preview, Bryan eyeballs the actual renders and picks. Until then this decision is PARKED. Do not let the build default back to the WebGL mesh.
