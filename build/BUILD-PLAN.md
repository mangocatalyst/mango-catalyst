# Mango Catalyst Website — Build Plan

**Created:** 2026-06-26
**Repo:** `~/Projects/mango-catalyst` (Next.js App Router + TS + Tailwind, Vercel, mangocatalyst.com)
**Status:** briefs written, staged, and red-team-patched (2026-07-01); build-ready pending the MOC pre-one-shot checklist and Bryan's go. Production deploy gated on LLC formation.
**Sibling project (do not touch here):** `~/Projects/mangocatalyst-automation` (the delivery platform, split out 2026-06-26).

This is the master plan for a multi-agent build. The per-agent prompts live beside this file as `0X-*.md` role-briefs. Source-of-truth split: **`00-canonical-brief.md` owns WHAT we build and the proof/honesty gate; this doc owns PROCESS (roster, orchestration, verification).** If they disagree on what to build or on a claim, `00` wins; on process, this doc wins. Role-briefs never override either.

---

## How it runs (two ways, same files)

The role-briefs are self-contained so they work either way:

1. **Manual now:** paste each role-brief into a Fable session in dependency order, shuttle the outputs forward. The external red team (E1, and half of F) is a ChatGPT/Codex session.
2. **Orchestrated when Fable is back:** a Claude Code workflow fans the Fable roles out (`model: fable`) on the pipeline below and shells out to Codex/GPT for the external red team.

## Staging + effort map (decided 2026-07-01)

Bryan's directive: the hero must be flawless. Split by SEQUENCE, not by silo; the hero goes first and seeds the design language the rest inherits.

1. **Hero tournament, Fable at MAX effort:** parallel agents build real rendered hero mockups (one per direction in `build/out/hero-direction-options.md`, 3 to 4 variants) plus both section-palette options (branding doc A vs B), on a branch off `seo-foundation`, PUSHED so Bryan judges live Vercel previews. A red-team judge panel scores variants against the anti-slop bar before Bryan looks; weak variants die early. Hero copy is already locked, so this does not wait on 02. **PAUSE: Bryan picks hero direction + palette.**
2. **In parallel with stage 1: SEO spec (01) and copy rewrites (02), Fable at HIGH effort.**
3. **Winning hero polished at MAX** (responsive, reduced-motion, SSR text, staggered reveal); it locks the design tokens. **Then the remaining pages fan out at HIGH**, one agent per page, inheriting the tokens + components.
4. **Integrator loop (06) at HIGH; red team (05) on the preview; the hero gets one final MAX pass if the red team flags it.**

Deploy mechanics: the Vercel CLI is unauthenticated on this machine; previews publish by pushing branches to `github.com/mangocatalyst/mango-catalyst` (`gh` is authenticated), and preview URLs are read back from GitHub deployment statuses. Env vars (booking URL, form key) are set by Bryan in the Vercel dashboard or via `npx vercel login`; the booking embed's honest fallback keeps this non-blocking.

---

## Locked decisions (source of truth)

**Build base**
- KEEP the committed SEO foundation (branch `seo-foundation`, commit `3900c72`: constants, JSON-LD builders, `JsonLd` component, `robots.ts`, `sitemap.ts`, layout metadata, site-wide Org/WebSite JSON-LD). See `~/Projects/mango-catalyst/SEO-FOUNDATION.md`.
- Fable REGENERATES pages + components on top of that foundation.
- **"Keep the foundation" means keep the PATTERNS (constants, JSON-LD builders, `JsonLd`, robots, sitemap, layout metadata), not freeze the files (clarified 2026-07-01):** DELETE `src/app/blog/**`, `src/lib/blog.ts`, and `src/content/blog/` (the three guide `.mdx` files are 0 bytes; the guides are written from scratch as pages); remove `/blog` from `STATIC_ROUTES` in `src/lib/constants.ts` and add `/faq`, `/privacy`, and the 3 guide routes; simplify `src/app/sitemap.ts` accordingly; add an `articleLd` builder to `src/lib/jsonld.ts` for the guides (none exists today).
- `SCAFFOLD.md` is a STRUCTURE REFERENCE ONLY. Its orange/slate tokens and "Stop Hiring for Tasks a Machine Can Do" hero are STALE and overridden by the locked docs below.
- Pre-build safety: stash or wip-commit the current uncommitted component stubs before regen (never destroy uncommitted work).

**Brand**
- Deep matte navy primary + mango amber accent. Exact hex + roles + WCAG pairings in `../projects/mango-catalyst/branding-color-type-spec-2026-06-14.md` (vault). Do not reuse the stale orange `#F97316`.
- Inter Variable for body/UI (bundled locally). A distinctive DISPLAY font for headlines (reconciles the `frontend-design` skill's "never Inter" rule, which itself prescribes pairing a display font with a refined body). Fable selects the display font and surfaces its pick plus one alternate for a fast Bryan veto (Bryan delegated the pick).

**Aesthetic**
- 80 to 90% grounded industrial / refined (workshop meets software), with a little editorial whitespace and warmth blended. Avoid the navy+amber "generic SaaS / crypto dashboard" trap Codex flagged.
- Designer-grade bar: Bryan is a graphic designer by trade. Layout, whitespace, and type pairing must clear a pro's eye.

**Hero (the centerpiece, most red-teamed element)**
- H1: "The Other Tools of the Trade" (locked pun).
- Subhead decodes it fast: plain-English office-work list + honest operator role ("ran service operations inside a real shop").
- One CTA: book a call. No competing buttons.
- Atmospheric WebGL mesh backdrop in navy+amber, drifting slow. Lazy-loaded, static image on mobile and `prefers-reduced-motion`, hero TEXT stays server-rendered. **(UNDER REVIEW 2026-06-30, red-team #1: the animated WebGL mesh likely reads as AI-slop / crypto-dashboard and conflicts with the matte brand spec. The replacement hero direction is PARKED pending real mockups, see `build/out/hero-direction-options.md`. Do NOT finalize the WebGL backdrop until Bryan decides.)**
- One orchestrated staggered page-load reveal.

**3D / motion**
- No scattered 3D objects. Subtle, mobile-friendly. (Hero backdrop tech is PARKED, see the Hero note above and `build/out/hero-direction-options.md`; do NOT assume WebGL.)
- Motion (Framer Motion) for reveals + micro-interactions, CSS-first per `frontend-design`. High-impact single moments over scattered fidgets.

**Design system / tooling**
- The shared token + component library is built **in-repo** (Tailwind theme tokens + React components). DROPPED 2026-06-30 (red-team #7, YAGNI): the Claude Design `/design-sync` project (one-component-at-a-time sync + a beta-tool dependency) was over-engineered for a one-shot 7-page site, and its "reusable library for future clients" rationale was speculative. Review components in context on the Vercel preview, not in a separate gallery pane. (Re-add later only if Bryan explicitly wants the isolated visual-review pane.)
- `frontend-design` stays the taste / anti-slop bar on top. Seed the design-system aesthetic from a grounded-industrial navy+amber DESIGN.md brief (pattern: the `awesome-claude-design` aesthetic families).
- Skills in play: `frontend-design` (taste), `answer-engine-seo` (SEO/AEO). Deliberately NOT used: Claude Design `/design-sync` (dropped, above), marketplace "landing-page generator" skills (they produce the generic SaaS look this build rejects), and kitchen-sink mega skill-packs. `ui-ux-pro-max` (palette/font/UX database) is redundant here because the brand is locked; keep it in reserve for future client sites where the brand is not fixed.

**Imagery**
- AI-generated, art-directed to grounded-industrial in the navy+amber palette.
- NO stock photos. NO real client or employer photos/assets. Dummy data only in any dashboard mockups. Owned source refs only.
- Design agent writes the art direction + prompts; Bryan curates generation.

**Copy / voice**
- `SOUL.md` voice bible. Never em or en dashes. ~6 to 7/10 formality, plain-spoken. Trades-first, not trades-only.
- Mostly polish, BUT with required REWRITES: the bulk of copy is locked in `../projects/mango-catalyst/website-copy-2026-06-14.md`, yet `00`'s MF-1/MF-2 require REWRITING (not polishing) the Section 5 proof block (delete the NorthStar-sourced 1,000-hours / 14.5% / 30% numbers, rebuild proof on MN-ITS) and stripping employer fingerprints. See `00` PROOF & HONESTY and `02-copy.md`.

**Audience**
- The overwhelmed OWNER and OFFICE/ADMIN staff drowning in repetitive manual work. NOT technicians.
- Any SMB doing repetitive work is a target. Trades is the wedge (home hero leads there); industry/service pages broaden (property management, professional services, etc.). **PHI boundary (decided 2026-07-01): no PHI-touching automations until attorney review; medical/dental leaves the FAQ fit sentence and waits in Phase 2.**

**Contact**
- Public domain email (`hello@mangocatalyst.com` unless changed) + a contact-page form (name, email, business, "what's eating your time?"). NO published phone number (spam).
- Form posts to the configured Vercel route-handler endpoint (see `00` Open config; spam protection: honeypot + minimum-fill-time). **Cal.com** embed for booking (decided 2026-07-01, 15-minute slots, booking URL from an env var with an honest fallback). CRM choice deferred to Phase 2.

**Launch gate**
- Build to a Vercel PREVIEW only. Production deploy is GATED on the LLC being formed. Site does not go live until then.

---

## PROOF & HONESTY RULES (hard gate, both red teams enforce)

This is the riskiest part to get wrong. Every claim passes these:

- **No NorthStar, ever**, by name or implication.
- **The proof / honesty gate lives in `00-canonical-brief.md` (PROOF & HONESTY); that is the authority and this section does not restate it.** The one correction to remember: the **MN-ITS extension is the ONE owned build** that anchors proof; **ServiceTitan, Slack, Zapier, and Google Workspace are capability areas only ("platforms I work in"), never built systems or shop outcomes**. No NorthStar ever; describe the KIND of outcome, never magnitudes; honest unnamed operator background ("ran service operations inside a real shop"). Read `00` for the full rules and the required copy rewrites (MF-1/MF-2).
- **Red-team kill rule:** flag and cut any line that names or implies a specific employer or client, or frames a number as personal fact.

---

## MVP page set (first build)

- **Home** (single-page scroll: hero, what-we-do, credibility, how-it-works, proof, pricing (the $795 setup + $1,000/month card, D1 terms), FAQ teaser, final CTA)
- **About** (honest operator story, no employer name)
- **Services** (card grid overview)
- **Industries / HVAC** (the Phase 1 vertical; pattern for later verticals)
- **FAQ** (objection-handling + `FAQPage` schema for answer-engine citability)
- **Contact** (form + Cal.com scheduler + "based in MN, serving the upper Midwest")
- **3 evergreen guide pages** (written FROM SCRATCH with the locked slugs `hvac-tasks-to-automate`, `manual-data-entry-cost`, `what-is-automation-consultant`; the repo `.mdx` files are 0 bytes, no drafts exist). Undated, no blog feed, zero upkeep.
- **Privacy** (`/privacy`, added 2026-07-01: plain-English policy, footer-linked; attorney review at the LLC gate)

**Dropped:** the blog feed (`/blog`, `/blog/[slug]`) and its MDX loader. Bryan won't maintain a blog; a stale blog is worse than none.
**Phase 2:** more verticals + service detail pages, lead magnets, ROI calculator, case studies, CRM.

---

## SEO / AEO approach

- Driven by the `answer-engine-seo` skill. The strategy pivoted OFF a blog content engine and ONTO set-and-forget surfaces:
  - Answer-first service + industry pages targeting long-tail queries directly.
  - `FAQPage` schema **on the FAQ page only** (must match visible content). Its value is **AEO citability** (ChatGPT / Perplexity lift the answers), NOT Google rich results, which Google deprecated for non-gov/health sites in 2023. Do NOT emit FAQPage on Home.
  - The 3 evergreen guides.
  - Local + service schema already in the foundation.
- Guardrails: SSR/citability (content never trapped in client-only WebGL), industry-by-geo cannibalization control, per-page canonical + keyword + intent.
- **Honest launch expectation (red-team #8):** a brand-new domain ranks near zero at launch regardless of schema. Launch SEO is brand + local + long-tail SEED, not a day-one search-acquisition engine. Keep the cheap set-and-forget surfaces, tighten internal linking among the existing MVP pages, and do NOT add more vertical pages now (Phase 2).
- Final gate: rerun the skill against a Vercel preview before merge.

---

## The roster (7 roles)

| # | Role | Model + tools | Mandate (in → out) |
|---|------|---------------|--------------------|
| **A** | Brief / reconciler | Claude (me) | locked docs + stale scaffold + SEO foundation → `00-canonical-brief.md`, the one doc every agent reads |
| **B** | SEO / AEO architect | Fable + `answer-engine-seo` | brief → page/URL map, per-page keyword+intent, schema spec, answer-first + cannibalization rules, evergreen+FAQ plan |
| **C** | Copywriter | Fable + `SOUL.md` | brief + SEO spec → final per-page copy (mostly polishing locked copy), honesty rules enforced |
| **D** | Design / UI engineer (the builder) | Fable + `frontend-design` + Motion | brief + copy + SEO spec → the actual Next.js/Tailwind site on the kept foundation: in-repo design system, components, pages, and the chosen hero direction (design-sync dropped + WebGL parked, see `03-design.md` + `build/out/hero-direction-options.md`) |
| **E1** | Red team, early | ChatGPT / Codex (external) | brief → challenge positioning, target, and EVERY claim for employer-implication, BEFORE the build bakes it in |
| **F** | Red team, late | Fable + ChatGPT, parallel | built site → adversarial pass on copy, design, technical SEO, accessibility, performance, conversion, honesty |
| **G** | Integrator / QA | Fable or me + `verify` / `run` / `code-review` | merge fixes, then run the MASTER verification loop below until green, rerun SEO skill on preview, then HOLD for LLC |

Deliberately NOT separate agents (folded as lenses): conversion/CRO, accessibility, performance, honesty-checking, imagery generation.

**Every role self-verifies against its own acceptance checklist and loops until it passes before handing off.** The self-verify checklists in each `0X-*.md` role brief and the master checklist in `06-integrator.md` are the contract.

---

## Orchestration flow

```
A  Canonical brief
│
├─► E1  ChatGPT challenges brief + claims (cheap early gate) ──► fixes fold back into A
│
▼
B  SEO/AEO architect
│
▼
C  Copywriter            (design system pre-warms from the brief in parallel)
│
▼
D  Design/UI build  (on kept SEO foundation)
│
▼
F  Red team: Fable + ChatGPT in parallel
│
▼
G  Integrate ──► verification loop: run checklist, fix, re-run until green (cap 5)
│
▼
all auto-checks green AND red-team must-fix list empty
│
▼
HOLD for LLC ──► production deploy
```

Pipeline, not 4 parallel agents: copy feeds design, SEO shapes both, red teams need something to challenge.

---

## Verification loop (loop until all requirements are met)

The build is not "done" when it renders. It is done when it passes the checklist. Each role self-verifies before handoff; the integrator (G) runs the master loop against the built site.

**The canonical master checklist (auto-checkable + human-judged items) lives in `06-integrator.md` and ONLY there.** This doc does not duplicate it: the two copies drifted once already (caught by the 2026-07-01 round-2 red team), so the list was deduplicated on purpose. Do not re-add a copy here.

**The loop:** run the auto-checks, fix every failure, re-run, repeat until green. Cap at 5 passes, then escalate the stuck item to Bryan with the exact failure (no infinite loops). Then F judges the human items; their must-fix findings trigger another fix + re-verify pass. **Done = auto-checks green AND red-team must-fix list empty.** Then HOLD for LLC.

In the workflow run this is a literal loop-until-pass with the cap. In the manual run, each agent re-reads its checklist and self-corrects before handing off.

---

## Status

Role-briefs WRITTEN and staged in this folder: `00-canonical-brief.md`, `01-seo.md`, `02-copy.md`, `03-design.md`, `04-redteam-early-gpt.md`, `05-redteam-site.md`, `06-integrator.md`, plus `orchestration.md`.

To run when Fable is back: follow `orchestration.md` ("start here"). Outputs land in `build/out/`. Nothing deploys to production until the LLC is formed.

Open config Bryan provides before launch: Cal.com account + booking link, public email confirm, optional contact-form delivery key, real headshot photo for About (type-only fallback ships without it). Logo, `og.png`, and the display-font pick are Fable's (Bryan curates/vetoes), per `00` Open config.
