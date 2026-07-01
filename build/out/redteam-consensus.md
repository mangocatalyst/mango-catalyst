# Red-Team Consensus — Mango Catalyst Build Plan (pre-Fable one-shot)

**Reviewers:** Claude (Opus 4.8, w6:p2) + Codex (GPT-5.5, w6:p3), adversarial pair.
**Date:** 2026-06-30
**Scope:** the BUILD PLAN itself (`BUILD-PLAN.md`, role-briefs `00`-`06`, `orchestration.md`) against the locked brand/copy/SEO docs, before Fable 5 builds the site.
**Consensus rule:** a change is listed ONLY if BOTH reviewers agreed. Items either could not agree on are recorded as no-consensus and dropped. 9 agreed changes, 1 dropped.

---

## Agreed changes

### MUST-FIX

**1. Cut the WebGL mesh hero backdrop.**
It directly violates the locked brand spec ("no glossy gradients on large surfaces, flat matte fills only, matte feel"), it IS the generic-SaaS / crypto-dashboard look the plan explicitly claims to avoid, and it renders only on desktop without `prefers-reduced-motion`, so it is maximum build + perf risk for a flourish most visitors never see. Replace with a static, art-directed grounded-industrial hero (image or flat/CSS texture); keep the hero text server-rendered.

**2. Make `00-canonical-brief.md` the SINGLE proof/honesty gate; every other doc points to it, never restates it.**
`BUILD-PLAN.md` (lines 80-81), `02-copy.md`, `04-redteam-early-gpt.md`, and `06-integrator.md` all still list "ServiceTitan automation" and "Slack automation" as owned builds, the exact framing pass-2 finding MF2-3 demoted to capability-areas-only. An agent reading any of those first re-implies the employer. Strip the restated proof framing from all four, replace with a pointer to 00, and resolve the precedence ambiguity (both BUILD-PLAN and 00 currently claim to win on conflict; 00 owns "what we build / proof," BUILD-PLAN owns process only).

**3. Change the Copy brief (`02`) from "mostly polish" to "mandatory REWRITE of the banned locked sections."**
00's MF-1/MF-2 require deleting and rebuilding the proof block and stripping employer fingerprints, which is a rewrite, not polish. The "mostly polish / bulk is locked" framing in both `02` and `BUILD-PLAN.md` risks the copywriter preserving banned content. Name the sections that must be rewritten, not polished.

**4. Propagate the Next 16.2.2 "this is NOT the Next.js you know" instruction to the build and QA roles.**
`AGENTS.md` mandates reading the bundled `node_modules/next/dist/docs/` before writing code, but `03-design.md` never carries it forward, a high build-failure risk for a Fable model trained before 16.2.2. Fix: `03` must explicitly read `AGENTS.md` + the relevant bundled docs before coding, and `06` must re-check against those docs before applying fixes.

**5. Make the verification loop's auto-checks real or label them honestly.**
The loop asserts Lighthouse 95+ and curl-SSR as auto-checks "run every pass," but names no tool that runs them (the integrator only holds `verify`/`run`/`code-review`), so the gates can silently never run. Specify exact commands: `npm run build`, `npm run lint`, `npx tsc --noEmit`, start/preview then `curl` the URL and grep for the hero H1 + FAQ text, Lighthouse CLI (or Chrome Lighthouse mobile profile), and the `answer-engine-seo` audit + schema lint. Any check that cannot be automated in this environment is labeled manual / human-judged, NOT an auto-gate.

### SHOULD-FIX

**6. Demote the `FAQPage` schema.**
Emit `FAQPage` on the FAQ page ONLY (matching visible content), not also on Home, to avoid duplicate-schema and Home/FAQ cannibalization. Reframe its value as AEO citability + on-page UX, not Google rich results, which Google deprecated for non-gov/health sites in 2023. The plan currently oversells it as "highly citable" and gates on it twice.

**7. Drop Claude Design design-system syncing from the MVP.**
The `/design-sync` one-component-at-a-time ceremony plus a beta-tool dependency is over-engineered for a one-shot 7-page one-person site; the "reusable library for future clients" rationale is speculative (YAGNI). Default to in-repo Tailwind tokens + components. Make the Claude Design project opt-in, only if Bryan explicitly wants the visual review pane / Phase-2 library before the site exists.

**8. Frame launch SEO honestly as brand/local/long-tail-seed, not a search-acquisition engine.**
A brand-new domain ranks near zero at launch regardless of schema. The plan should state this plainly so nobody expects search traffic on day one, keep the cheap set-and-forget surfaces (answer-first pages, evergreen guides, local/service schema), and tighten internal linking among the existing MVP pages. Do not add vertical pages now (Phase-2 scope).

### CONSIDER

**9. Add honest non-employer proof texture so credibility does not hang on one medical build.**
After the honesty cuts, ALL proof rests on a single owned build (MN-ITS) that lives in medical/PHI space, while the pitch is general-SMB and trades-first, which is thin and invites "is-it-HIPAA / who-was-it-for" questions. Keep MN-ITS as the anchor and the ONLY owned-build claim; add the discovery-plan-build method/process as proof and a clearly-labeled illustrative dummy sample workflow. **Guardrail:** proof texture must never become fake proof or employer-adjacent proof; ServiceTitan / Slack / Zapier / Google Workspace appear only as capability areas, never as built systems or outcomes.

---

## Dropped (no-consensus)

**Restore a Phase 1 money-page cluster (for search acquisition).**
Codex raised it; not adopted. It fights the plan's deliberate no-maintenance / Phase-2 deferral decision, and a new domain will not rank at launch regardless. Both reviewers instead agreed on the honest launch-SEO framing (item 8) plus stronger internal links among the existing pages. Recorded as no-consensus, not actioned.

---

## Where the changes land

| Change | Edit in |
|---|---|
| 1 Cut WebGL hero | `00` Locked decisions (Hero), `BUILD-PLAN.md` Hero + 3D/motion, `03-design.md` |
| 2 Single proof gate | `BUILD-PLAN.md` (lines 80-81), `02`, `04`, `06` point to `00` |
| 3 Rewrite not polish | `02-copy.md`, `BUILD-PLAN.md` "Mostly polish" line |
| 4 Next 16.2.2 docs | `03-design.md`, `06-integrator.md` |
| 5 Real/honest auto-checks | `BUILD-PLAN.md` verification loop, `06-integrator.md` |
| 6 Demote FAQPage | `01-seo.md`, `BUILD-PLAN.md` SEO/AEO section |
| 7 Drop design-sync from MVP | `BUILD-PLAN.md` design-system section, `03-design.md` |
| 8 Honest launch-SEO framing | `00`, `01-seo.md`, `BUILD-PLAN.md` SEO/AEO section |
| 9 Proof texture (CONSIDER) | `00` PROOF & HONESTY, `02-copy.md` |
