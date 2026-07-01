> RECORD ONLY, applied 2026-07-01. Decisions live in build/00-canonical-brief.md and the vault MOC v2, which supersede any recommendation here. This file contains superseded terms and never-publish figures (the dropped revenue band, the internal client-capacity number). Do not source copy, terms, or prompt text from this file.

# Mango Catalyst MOC Red-Team, Round 2 Synthesis
**Date:** 2026-07-01. **Scope:** MOC v2 + build briefs (00 to 06, BUILD-PLAN, orchestration) after the round-1 restructure and patch set. **Input:** 26 verified surviving findings across decision-fidelity, cross-doc, regression, and fresh-eyes lanes.

## TLDR

- 26 raw findings dedupe to **18 distinct defects**. **Zero blockers survived verification.** The one raw blocker (03's "Cal.com or Calendly") was downgraded because the offending sentence itself points to 00, where Cal.com is locked and 00 wins on conflict.
- Round 1's restructure held: **no settled decision (D1 to D9) is wrong anywhere in the canon.** Every surviving defect is propagation drift (a patched decision that never reached one of its carrier docs), checklist asymmetry between the two copies of the verification loop, or a stale pointer.
- Four defects verified at **major**: the MF-3 rewrite census misses locked-copy Sections 6 and 8 (honesty class); the two mockup-gated Bryan picks (hero, palette) have no pause point and no done-gate, so a hands-off run can finish on silent defaults against D7; BUILD-PLAN reverses the settled font/logo delegation; BUILD-PLAN's copy of the master verification loop drifted from 06's.
- The biggest single cluster: **03-design.md, the builder's executable brief, never received the 2026-07-01 patch set** (4 findings merged). Each leg verified minor because 00 backstops it, but the aggregate is ranked major: it is the one file a prompt author would compile the builder's job list from.
- **22-item fix list, all mechanical text edits. 1 item needs Bryan** (define what the one-shot covers and mark role 04 satisfied).
- **Verdict: one-shot-ready once the fix list is applied**, with Bryan's one scope confirm settled before the prompt is authored.

## Verdict

Yes, author the one-shot after applying the fix list below. No blocker survived verification and nothing in round 2 disturbs a settled decision: every surviving defect is drift, asymmetry, or a stale pointer, and the canon (00-canonical-brief.md) is correct, complete, and self-declares precedence, which is exactly why the verification pass downgraded most of the loud findings. Two things genuinely matter before the prompt exists: 03-design.md must be brought up to the 2026-07-01 decisions, because it is the executable brief a prompt author will compile the builder's task list from, and the D7 pick mechanics need an explicit pause plus a done-gate, because the current hands-off loop can reach green on a silently defaulted hero and palette, violating the one class of decision Bryan explicitly reserved. Both are bounded text edits. The single needs-Bryan item (declare what the one-shot covers and mark role 04 satisfied by the 2026-06-26 early red team) should be settled before authoring since it defines the prompt's scope, but its verified worst case is a redundant GPT pass, not a wrong build. Apply the 22 edits, get Bryan's one confirm, and the set is one-shot-ready.

## Fix List (deduped, ranked)

Blockers: none survived verification.

Note on paths: `build/*` files are repo docs at `/Users/mango/Projects/mango-catalyst/build/`; the MOC is vault markdown at `/Users/mango/Documents/AI Vault/projects/mango-catalyst/mango-catalyst-moc.md` and all edits to it go through the Obsidian CLI.

### Major

1. **build/02-copy.md** (MF-3 census, honesty class): Line 17: broaden the mandatory-rewrite scope from "Sections 4 AND 7" to "every hosting/monitoring/backup/offboarding claim anywhere in the locked copy is a mandatory rewrite", explicitly naming Sections 4, 6 (the About own-hardware line), 7, and 8 (FAQ Q2 data-safety incl. the banned "shared" promise, Q3 own-hardware uptime, Q4 offboarding export). Line 43 self-verify: add "no sold/shared/third-party blanket promises" (the ban exists in line 17 already; this makes it checklist-greppable).
2. **build/03-design.md** (D7 + hero pick mechanics): Reword line 20 to: mock 2 to 3 hero variants AND both section-palette options (branding doc A vs B) on the Vercel preview, PAUSE for Bryan's picks, then build the picked direction and palette; never default either. Delete the "default lean: type-led" parenthetical (it invites the silent default). Add both picks to the Output spec: record the chosen hero direction AND the palette pick in `build/out/design-notes.md`.
3. **build/06-integrator.md** (D7 done-gate): Add a MANUAL item to the human-judged checklist: "Bryan picked the hero direction and the section palette from the preview mockups (D7); neither was silently defaulted."
4. **build/BUILD-PLAN.md** (ownership contradictions vs 00): Line 32: replace "Design agent proposes 2 to 3 display options, Bryan picks" with "Fable selects the display font and surfaces its pick plus one alternate for a fast Bryan veto (Bryan delegated the pick)." Line 199: drop "logo + og.png" and "final display-font pick" so the Bryan-provides list matches 00 line 91 (Cal.com account + booking link, public email confirm, optional contact-form delivery key, real headshot photo with type-only fallback).
5. **build/BUILD-PLAN.md** (verification-loop drift): Preferred: replace the duplicated auto-checkable list (lines 170 to 180) with "the canonical master checklist lives in 06-integrator.md" (the two copies have already drifted once). Otherwise sync the deltas: add 06 line 30's decided-terms item verbatim; append "guides = Article" to the schema item (line 174); append the capability-areas clause including Google Workspace to the honesty grep (line 175); mirror the new D7 MANUAL item from fix 3.
6. **build/03-design.md** (2026-07-01 staleness refresh; each leg verified minor, ranked major as a cluster): Line 23: replace the parenthetical with "(Cal.com, decided 2026-07-01; Bryan connects the account + calendar). It auto-generates a Google Meet link per booking. Read the booking URL from the env var and render the honest fallback (message form + one-business-day expectation copy) until it exists." Delete "or Calendly". Add one-line job bullets, each pointing back to 00 for detail: the D8 people rule (never fabricate people or faces; the About headshot is a real Bryan photo, AI-stylized); Vercel Web Analytics + Speed Insights with booking-completed and CTA-click events; the /privacy page; the contact-form route handler with honeypot + minimum-fill-time; favicon/apple-touch-icon plus branded not-found and error pages. Mirror the new items into 03's self-verify so the builder's contract matches 06's gates.

### Minor

7. **build/02-copy.md**: Add `privacy.md` to the Output file list (line 35); optionally add a /privacy line to self-verify.
8. **build/00-canonical-brief.md**: Home scroll list (line 67): insert "pricing (the $795 setup + $1,000/month card, locked copy Section 7, D1 terms)" between proof and FAQ teaser.
9. **build/BUILD-PLAN.md**: Same pricing insertion in the MVP Home flow (line 88).
10. **build/06-integrator.md**: Add auto-check: "$795 and $1,000/month visible on the preview; retainer terms match the decided D1 language."
11. **MOC (Obsidian CLI)**: Add the offer-terms sweep to the mandatory-rewrites parenthetical (line 16) and to the website-copy supersession entry (line 80), alongside the four sibling sweeps.
12. **build/02-copy.md**: Self-verify (line 43): add "no speed promises beyond reply within 1 business day / fixes within 2 to 3 business days; no published client-capacity count."
13. **build/06-integrator.md**: Append the same offer-terms clause to the line 30 decided-terms item.
14. **build/06-integrator.md**: Amend the analytics item (line 28): "CTA-click event fires on the preview; booking-completed is verified once the Cal.com env var is set; if the account is not ready, verify the honest fallback renders and label booking-completed MANUAL/BLOCKED, not failed." (Note: even with the env var set, proving booking-completed needs a live test booking, so it is arguably MANUAL in both states.) BUILD-PLAN line 179 inherits via fix 5.
15. **build/06-integrator.md**: Split the SSR proof (line 22): curl the preview root for the hero H1; curl `<preview-url>/faq` for the FAQ questions; optionally curl each guide URL for its H1. BUILD-PLAN line 173 inherits via fix 5.
16. **build/01-seo.md**: Self-verify: append "guides emit Article via the new articleLd builder" to the schema item (line 36); carve /privacy out of item 1 (line 35): footer-linked only, no keyword target, noindex-optional.
17. **build/01-seo.md**: Add one line: "the guide URL prefix is an open choice and yours to make; lock it in the URL map in build/out/seo-spec.md; the slugs themselves never change." Optionally add to 06's checklist: guide paths match seo-spec.md.
18. **build/BUILD-PLAN.md**: Line 5 header: "Status: briefs written and staged (2026-07-01); build-ready pending the MOC pre-one-shot checklist and Bryan's go. Production deploy gated on LLC formation."
19. **MOC (Obsidian CLI)**: Append to the Audience and fit block: "NOT for (mirrors the locked FAQ): shops with only a handful of repetitive tasks, teams with an in-house systems builder, cheapest-option shoppers, and anyone needing enterprise-grade guaranteed-uptime infrastructure."
20. **MOC (Obsidian CLI)**: Brand block: restore the logo identity line: "Logo: Inter wordmark + one small abstract amber spark mark (direction locked in the branding doc; no literal fruit, wrench, or gear); Fable generates, Bryan curates." Extend the two branding-doc annotations (lines 16 and 81) to "hex, type scale, WCAG, logo identity direction."
21. **MOC (Obsidian CLI)**: Reword line 48: questions + context live in build/out/moc-redteam-round1-2026-07-01.md; the settled OUTCOMES are the decided-2026-07-01 annotations in this MOC and the patched briefs, which supersede that report's recommendations where they differ (e.g. D8, whose type-only-at-launch half was superseded; its never-fabricate-people half was adopted).
22. **MOC (Obsidian CLI)**: Extend both seo-plan supersession notes (read-order line 16 and deliverables-index line 82) with "and analytics (Vercel Web Analytics + Speed Insights per D4, not Plausible/PostHog)."

### Needs Bryan

- **Define what the one-shot covers and disposition role 04.** Confirm role 04 (external GPT brief challenge) is SATISFIED by the 2026-06-26 early red team (its MUST-FIX items are already folded into 00), or order a re-run. Then approve a short "What the one-shot covers" block in the MOC or orchestration.md: one-shot = roles 01, 02, 03, the Fable half of 05, and 06's auto-loop, run to a pushed Vercel preview; the GPT half of 05 and Bryan's mockup picks are explicit human steps. This defines the prompt's scope, so it is Bryan's call. (Verified worst case if skipped: a redundant GPT pass or author hesitation, not a broken build.)
- **Be available for the two mockup-gated picks** the fixed pipeline will now pause on: hero direction (2 to 3 variants) and section palette (branding doc A vs B), both picked from real renders on the Vercel preview per D7. The standing pre-launch inputs in 00 (Cal.com account + booking link, public email confirm, optional form key, headshot) are unchanged.

## Findings Table (deduped)

| # | Defect | Dimension(s) | Raw | After verify | Fix |
|---|--------|--------------|-----|--------------|-----|
| 1 | MF-3 rewrite census names only Sections 4 + 7; identical or worse violations (incl. the banned "shared" promise) live in Sections 6 + 8 | fresh-eyes | major | CONFIRMED major | 1 |
| 2 | Mockup-gated picks (hero, palette) have no pause point or done-gate; 03's "default lean" invites a silent default against D7 (2 merged) | fresh-eyes + decision-fidelity | major x2 | CONFIRMED major (one leg weakened: an execution path exists via 00) | 2, 3, 5 |
| 3 | BUILD-PLAN reverses the settled delegation: Bryan picks the font, provides logo + og.png (2 merged) | cross-doc + fresh-eyes | major + minor | CONFIRMED major | 4 |
| 4 | BUILD-PLAN's copy of the master loop drifted from 06: decided-terms item, guides = Article, capability-areas grep (2 merged) | decision-fidelity + cross-doc | major + minor | CONFIRMED major, low end (06, the executor, is complete) | 5 |
| 5 | 03-design.md missed the 2026-07-01 patch set: "Cal.com or Calendly" vs D3; no D8 people rule, analytics, /privacy, spam, site chrome (4 merged, incl. the raw blocker) | decision-fidelity + cross-doc + fresh-eyes | blocker + major x2 + minor | WEAKENED to minor per leg; ranked major as a cluster | 6 |
| 6 | Home scroll lists in 00 + BUILD-PLAN omit the pricing section; no check that the public $795/$1,000 renders | fresh-eyes | major | WEAKENED to minor (pricing is assigned to Home via locked copy Section 7, kept in scope by 02) | 8, 9, 10 |
| 7 | "One-shot" never defined against the 7-role pipeline; role 04 not marked satisfied | fresh-eyes | major | WEAKENED to minor; needs Bryan | Bryan |
| 8 | D1 offer-terms sweep missing from every backstop (MOC lines 16/80, 02 self-verify, 06 checklist) while locked copy contradicts D1 three times | decision-fidelity | minor | CONFIRMED | 11, 12, 13 |
| 9 | booking-completed auto-check assumes the Cal.com env var exists at verification time; no fallback-state path | cross-doc | minor | CONFIRMED | 14 |
| 10 | SSR-proof check still assumes the single-page model (one curl must contain hero H1 + FAQ questions) | fresh-eyes | minor | CONFIRMED | 15 |
| 11 | 02's Output file list omits privacy.md (3 merged) | decision-fidelity + cross-doc + fresh-eyes | minor x3 | CONFIRMED | 7 |
| 12 | 01-seo self-verify not updated for the /privacy carve-out or guides = Article | cross-doc | minor | CONFIRMED | 16 |
| 13 | Guide route URL prefix undefined in every doc | fresh-eyes | minor | WEAKENED (01's mandatory URL map funnels the choice; 01 just is not told it owns it) | 17 |
| 14 | BUILD-PLAN header says "role-briefs pending" vs its own Status section (2 merged) | cross-doc + fresh-eyes | minor x2 | CONFIRMED | 18 |
| 15 | MOC v2 Audience block dropped the outline-spec'd NOT-for list; round-1 row 27 claimed it resolved (2 merged) | regression + fresh-eyes | minor x2 | CONFIRMED | 19 |
| 16 | Logo identity direction (Inter wordmark + amber spark) dropped from the MOC Brand block; branding-doc annotations frame it as a token sheet | regression | minor | CONFIRMED | 20 |
| 17 | MOC line 48 cites the round-1 report as the D1-D9 "record" though it holds pre-decision recommendations (D8 differs) | fresh-eyes | minor | CONFIRMED | 21 |
| 18 | MOC's seo-plan supersession notes omit analytics; the plan still says the Plausible/PostHog choice stands | fresh-eyes | minor | CONFIRMED | 22 |

## Dropped and Weakened

- **Raw blocker (03 + SCAFFOLD Calendly) downgraded to minor:** the offending sentence itself defers to 00's Open config where Cal.com is locked; worst case was a config-level swap, not architecture. The SCAFFOLD-disclaimer extension was **dropped**: 03's "for STRUCTURE only" and 00's "structure reference only, STALE" already void SCAFFOLD's Calendly rows, and enumerating every stale detail invites the same drift.
- **"D7 has no execution path" weakened:** the path exists via 00, the builder's mandatory first read; the real gap is the missing mirror instruction, output record, and done-gate (fixed in 2, 3, 5).
- **"03 offers Cal.com or Calendly" (cross-doc major) weakened to minor:** the read order plus the inline pointer to 00 make a shipped Calendly implausible; the cost is loop churn.
- **"03 left out of the patch set" weakened:** partly deliberate round-1 design (00 carries the decisions, 06 gates them); the risk is integrator round-trips against the 5-pass cap, not a shipped miss.
- **"Pricing has no assigned surface" weakened:** locked copy Section 7 assigns pricing to Home and 02's MF-3 instruction keeps that section in scope; the surviving defect is the scroll-list omission plus the missing render check.
- **"A one-shot cannot run 04" dropped as a clause:** run model B explicitly shells out to Codex/GPT for the external passes, and the hard gate (fold 04's MUST-FIX into 00) is de facto satisfied by 00's embedded MF-1/2/3 fold-ins. What survives is the missing SATISFIED marker and scope block.
- **"Three agents could pick divergent guide paths" narrowed:** 01's mandatory URL map (seo-spec.md) funnels the decision to one agent that both downstream consumers must read; the residual gap is 01 not knowing the choice is its own.
- **Nuances carried into the fixes:** the capability-areas rule already exists in BUILD-PLAN's human-judged list (missing only from the auto grep, and its version omits Google Workspace); the "never shared" ban is already greppable in 02 line 17 (missing only from the checklist); MOC line 24 does record the full retainer terms (the D1 miss risk is confined to the lists and checklists); D8's never-fabricate-people half was adopted, only its type-only-at-launch half was superseded.