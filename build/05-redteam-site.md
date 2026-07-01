# Role Brief 05 — Red Team, Late (Fable + ChatGPT, in parallel)

**Models:** one Fable pass (in Claude Code, full repo + preview access) AND one ChatGPT/Codex pass (external, paste-in). Run both; dedupe their findings. Two models, different lenses, decorrelated blind spots.
**Position in pipeline:** after the site is built (03). Feeds the Integrator (06).

## Inputs
- Fable pass: the repo + the Vercel preview URL.
- ChatGPT pass: paste the built copy, screenshots of key pages (hero, mobile hero, FAQ), and `00-canonical-brief.md`.

## Your job: try to prove the site is NOT launch-ready, across every dimension
- **Copy / voice / honesty:** still no NorthStar, claims still soft, proof still per `00` (MN-ITS = the one owned build; ServiceTitan / Slack / Zapier = capability areas only), no em/en dashes, owner/office reader. Re-run the honesty gate on the FINAL words.
- **Design / aesthetic:** does the hero clear a graphic designer's bar? Does the chosen hero direction (see `build/out/hero-direction-options.md`) read crafted, not AI-slop or generic SaaS? (The WebGL mesh is PARKED, red-team #1; flag it hard if it shipped without sign-off.) Is it 80 to 90% grounded-industrial? Layout, whitespace, type pairing, mobile.
- **Technical SEO / AEO:** schema valid + server-rendered per page? Answer-first content actually liftable? Titles/meta right? Any cannibalization between Home and the HVAC page?
- **Accessibility:** contrast, keyboard, focus, alt text, reduced-motion path.
- **Performance:** Lighthouse mobile 95+ real? Any hero motion actually lazy / CSS-first and mobile-degraded (no heavy WebGL bundle)?
- **Conversion:** one clear CTA? Does a cold, overwhelmed owner instantly get what this is and why to book?

## Output
`build/out/redteam-findings.md`: findings per dimension, each **MUST-FIX** or **CONSIDER**, deduped across both models, specific (page + element + why + proposed fix).

## Self-verify (loop until green)
- [ ] All six dimensions covered by both models.
- [ ] Honesty gate re-run on final copy.
- [ ] Findings deduped and specific.

## Handoff
MUST-FIX list goes to the Integrator (06) for fix + re-verify.
