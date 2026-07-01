# Mango Catalyst Website — Canonical Brief (build to this)

This is the single source of truth for WHAT we are building. Every agent reads this first. If anything here conflicts with an older planning doc, THIS wins. The process side (roster, orchestration, verification loop) lives in `BUILD-PLAN.md`.

**Run context:** these agents run in Claude Code with the repo (`~/Projects/mango-catalyst`) and the vault (`~/Documents/AI Vault`) on disk. READ the source docs below; do not work from memory. The one exception is the external GPT/Codex red team, which gets the relevant text pasted in.

---

## The product in one paragraph

A lead-gen website for a one-person automation consultancy (Mango Catalyst, mangocatalyst.com) that helps small and mid-sized businesses kill repetitive manual office work. The reader is an overwhelmed **owner or office/admin person** drowning in busywork, not a technician. The **trades are the wedge** (most credible entry), but any SMB with repetitive work is a target. One job: get the right visitor to **book a 15-minute fit call**.

---

## Source docs (read, do not reproduce from memory)

- Copy, mostly locked: `~/Documents/AI Vault/projects/mango-catalyst/website-copy-2026-06-14.md`
- Brand (navy+amber hex, type, WCAG pairings): `.../branding-color-type-spec-2026-06-14.md`
- SEO/AEO plan v2: `.../seo-plan-2026-06-14.md`
- Gap analysis (open risks): `.../gap-analysis-2026-06-14.md`
- Codex adversarial review (held critiques): `.../codex-adversarial-review-2026-06-14.md`
- Competitor audits: `.../competitor-audit-avoca-2026-06-17.md`, `.../competitor-audit-automation-agencies-2026-06-19.md`
- SEO foundation already built (KEEP): `~/Projects/mango-catalyst/SEO-FOUNDATION.md`
- Structure reference only (STALE tokens/copy, do not follow its orange or "Stop Hiring" hero): `~/Projects/mango-catalyst/SCAFFOLD.md`
- Voice bible: `~/Documents/AI Vault/jobs/apply-kit/covers/SOUL.md`
- Bryan's real background, for honest framing NOT copy-paste claims: `~/Documents/AI Vault/jobs/profile/bryan-profile.md`, `.../resume-master.md`

---

## Locked decisions

- **Build base:** keep the committed SEO foundation (branch `seo-foundation`, commit `3900c72`). Regenerate pages + components on top. Stash/wip-commit the uncommitted component stubs before regen (never destroy uncommitted work).
- **Brand:** deep matte navy primary + mango amber accent (exact hex in the branding doc, NOT the stale orange `#F97316`). Inter Variable for body/UI, a distinctive **display font** for headlines (Fable selects it and surfaces its pick + one alternate for a fast Bryan veto; see Open config).
- **Aesthetic:** 80 to 90% grounded industrial / refined (workshop meets software), a little editorial whitespace + warmth. Avoid the navy+amber "generic SaaS / crypto dashboard" trap. Designer-grade bar (Bryan is a graphic designer).
- **Section palette (decided 2026-07-01):** the all-dark vs light-conversion-bands fork (branding doc option A vs B) is decided FROM MOCKUPS, same as the hero: mock both on the Vercel preview and Bryan picks from renders. Do not silently default to either.
- **Hero (centerpiece):** H1 "The Other Tools of the Trade"; subhead decodes the pun fast (plain-English office-work list + honest operator role); one CTA labeled **"Book a 15-minute fit call"** (no pitch), a self-serve scheduler with real time slots so "Book" is honest and high-converting; hero TEXT server-rendered; one staggered page-load reveal. **Hero backdrop direction is UNDER REVIEW (red-team #1): the animated navy+amber WebGL mesh is PARKED (it reads as AI-slop / crypto and fights the matte brand spec). Directions live in `build/out/hero-direction-options.md`: mock 3 to 4 variants (one per direction) on the Vercel preview, PAUSE for Bryan's pick, and NEVER silently default, same rule as the section palette. Do NOT ship the WebGL mesh without Bryan's go.**
- **3D/motion:** no scattered 3D objects; motion (Framer Motion) for subtle reveals, CSS-first. (Hero backdrop tech is parked, see Hero above; do NOT assume WebGL.)
- **Imagery:** AI-generated, art-directed grounded-industrial in navy+amber. No stock, no real client/employer assets, dummy data only. Bryan curates. **People rule (decided 2026-07-01): never fabricate people or faces from scratch, and never present a generated person as Bryan or a client. The About headshot is a REAL photo of Bryan, AI-stylized to match the site's graphic language so it does not stick out against the other imagery. Bryan supplies the source photo; ship a type-only About if it is not ready at build time.**
- **Audience:** overwhelmed owners + office/admin staff. Trades-first, not trades-only. No public revenue-band qualifier (decided 2026-07-01): qualify on pain plus under-25 headcount. **No PHI-touching automations until attorney review**; medical/dental leaves the FAQ fit sentence (non-PHI office automation for those verticals can return post-review).
- **Offer terms (decided 2026-07-01):** $795 setup + $1,000/month retainer, numbers public, scope case-by-case. Retainer scope: tweaks (changes under about 2 hours) handled from a monthly queue; bigger work scoped separately; reply within 1 business day; fixes within 2 to 3 business days. Launch capacity 2 to 3 retainer clients (internal planning figure, never published). Copy must not promise speed beyond these terms.
- **Analytics (decided 2026-07-01):** Vercel Web Analytics + Speed Insights at launch (Vercel-native, near-zero script weight, fits the Lighthouse 95+ gate). Conversion events: booking-completed and CTA-click, verified live on the Vercel preview. Plausible/PostHog deferred.
- **Contact:** domain email (`hello@mangocatalyst.com` unless changed) + a short message form. NO published phone number. Booking is a self-serve scheduler with real, selectable time slots (**Cal.com, decided 2026-07-01**) that removes the phone gatekeeper and auto-attaches a video link to every booking. See Open config.
- **Launch gate:** build to Vercel PREVIEW only. Production deploy waits on LLC formation.

---

## PROOF & HONESTY (hard gate, non-negotiable)

- **No NorthStar, ever**, by name or implication.
- **Describe the KIND of outcome, never magnitudes.** "Cut the manual data entry, kill the double-keying, end the after-hours invoicing" rather than recycled numbers. BANNED anywhere on the site (attributed or not): the specific employer figures (1,000 hours, 14.5%, 30%) and any numerically similar proof, unless sourced to a cited public non-employer benchmark. No vague "10+ years."
- **Credibility rests on:** (1) the ONE genuinely owned build, which anchors the proof: the **MN-ITS extension** (automates medical-claim data entry; privacy-first, local-only is a selling point). (2) Capability areas named as platforms worked in, NOT as built systems: "I work in ServiceTitan, Slack, Zapier, Google Workspace." Never "I built the ServiceTitan systems," never an implied shop outcome (it re-implies the employer, and ServiceTitan being trades-only re-narrows the vertical). (3) Honest unnamed operator background ("ran service operations inside a real shop"). (4) The **discovery to plan to build METHOD itself as proof texture** (how the work gets scoped and shipped), so credibility does not hang on a single medical build.
- Kill any line that names/implies a specific employer or client, or frames a number as personal fact.
- **Proof-texture guardrail (red-team #9):** method-as-proof plus the MN-ITS anchor ARE the proof for MVP. Do NOT manufacture a "sample/dummy workflow" artifact for launch (net-new scope, Phase 2 only if genuinely cheap), and proof texture must NEVER become fake proof or employer-adjacent proof. ServiceTitan / Slack / Zapier / Google Workspace stay capability areas, never built systems or outcomes.

**Early red team (2026-06-26) found the LOCKED COPY violates this gate. It is NOT fully clean. The copywriter must REWRITE, not polish, these:**
- **MF-1:** Delete Section 5's proof block (`Proof points (numbers, all sourced from NorthStar work)` plus the 1,000-hours, 14.5%, and 30% lines and the trade-show / dispatch examples). Rebuild proof ANCHORED on the **MN-ITS extension** (the one owned build, privacy-first/local-only, currently missing from proof). ServiceTitan / Slack / Zapier appear ONLY as capability areas ("platforms I work in"), never as built systems or shop outcomes. Do NOT recycle the deleted figures (see the magnitudes ban above).
- **MF-2:** Remove employer fingerprints. Drop "in Duluth" and "heating and cooling"; generalize to "a real service business." Keep the approved "ran service operations inside a real shop" framing.
- **MF-3 (resolved 2026-06-26, tightened by pass 2):** The security/hosting posture is ASPIRATIONAL. Hosting location is undecided. Honest data-handling claims today: data is **never sold**, and connected **only to the tools we agree to automate, with your permission** ("Your data is yours. I never sell it, and I only wire it into the systems we choose to automate."). **"Never shared" is BANNED** as a false promise: an integrator moves data between tools (Zapier, Google, the email service), so a blanket no-sharing claim cannot be honored. Do NOT state own-hardware, off-site backups, active monitoring, or an offboarding guarantee as present fact. MN-ITS's real local-only design CAN be cited as a concrete privacy example, not generalized into an infrastructure promise.
- **Integrations (resolved 2026-06-26):** Proven and shippable today = **ServiceTitan, Zapier, Google Workspace**. Frame everything else as capability, not a shipped list: "if your tool has an API, I can probably connect it." Do NOT imply shipped integrations with Housecall Pro, Jobber, QuickBooks, Make, or Airtable.

Full findings (incl. CONSIDER items for the built-site red team): `build/out/redteam-early-findings.md` and `build/out/redteam-pass2-findings.md`. Pass-2 CONSIDER items: route the data-handling gap to a "scoped on the fit call" FAQ line; the booking needs a confirmation state + "I confirm a time within one business day" expectation copy.

---

## Pages (MVP)

1. **Home** (single-page scroll): hero (above) → what-we-do (3 to 4 service cards) → credibility strip (soft, owned-build proof) → how-it-works (discovery → plan → build) → proof/owned-work → pricing (the $795 setup + $1,000/month card, locked copy Section 7, D1 terms) → FAQ teaser → final CTA.
2. **About:** honest operator story, no employer name, "built by someone who did the office work."
3. **Services:** card grid of automation offerings, one bottom CTA.
4. **Industries / HVAC:** the Phase 1 vertical, owner-facing pain → automation outcomes. Pattern for later verticals. Differentiate from Home (cannibalization).
5. **FAQ:** objection-handling, answer-first, with `FAQPage` JSON-LD.
6. **Contact:** the booking scheduler (real time slots, auto video link) as the primary action, plus a short message form (name, email, business, "what's eating your time?") and "based in MN, serving the upper Midwest." No phone.
7. **3 evergreen guides** (undated, no blog framing): write FROM SCRATCH with the locked slugs `hvac-tasks-to-automate`, `manual-data-entry-cost`, `what-is-automation-consultant`. The repo `.mdx` files are 0 bytes; there are no drafts to repurpose.
8. **Privacy** (`/privacy`, added 2026-07-01): plain-English policy (what the form collects, email delivery, analytics, no selling, contact to delete), linked in the footer. Attorney review rides the LLC gate that already blocks production.

Dropped: the blog feed. Phase 2: more verticals, service detail pages, lead magnets, case studies, CRM.

**Launch SEO expectation (red-team #8):** a brand-new domain ranks near zero at launch regardless of schema. Launch SEO = brand + local + long-tail SEED, not a day-one acquisition engine. Keep the cheap set-and-forget surfaces (answer-first pages, evergreen guides, local/service schema) and tighten internal linking among the existing MVP pages. No new vertical pages now (Phase 2).

---

## Open config

**Fable BUILDS / DECIDES all of these (no assets exist yet). Hosting is Vercel, so use Vercel-native solutions throughout:**
- Logo, site imagery (AI-generated, art-directed), OG image, contact form UI. Clean placeholders; Bryan curates/approves.
- **Booking flow** for the single CTA: an embedded self-serve scheduler with real, selectable time slots. Research backs this over a callback form (roughly 30 to 70% more conversions, and it removes phone tag, which is the point). **Cal.com, decided 2026-07-01** (open-source, free tier, Vercel-friendly); the slot is **15 minutes, confirmed**. The scheduler **auto-generates a unique video link (Google Meet) for every booking and drops it into the confirmation email + calendar invite**, no manual step (Bryan has Google Workspace; skip FaceTime, Apple-only, no clean per-booking link). CTA label is **"Book a 15-minute fit call"** (warm, low-commitment); because slots are real, "Book" is honest. Add a confirmation + reminder email and ONE qualifying question (protects Bryan's time and lifts show-rate, which can dip on auto-booked slots). The booking URL comes from a one-line env var; until the account exists, render an honest fallback (the message form + "I confirm a time within one business day"), never a dead embed.
- **Fonts:** Fable SELECTS the type pairing using `next/font` (Vercel-optimized, self-hosted at build, no layout shift). Inter Variable stays the body/UI default (locked, bundled); Fable picks a distinctive display font for headlines per the branding doc + `frontend-design` guidance. Bryan delegated the pick.
- **Contact-form delivery:** Fable scaffolds a Vercel route handler so submissions land somewhere sensible (e.g., email to `hello@` via a transactional service). Keep the actual key/destination a one-line env config. **Spam protection (decided 2026-07-01): honeypot field + minimum-fill-time check; add Turnstile only if real spam appears post-launch.**
- **Site chrome:** replace the default favicon (favicon + apple-touch-icon derived from the logo mark) and build branded `not-found` and `error` pages (on-voice, one CTA back home).

**Bryan provides before launch:** set up the scheduler (a Cal.com account, connect his calendar and Google Meet for the auto video link) and confirm the public email (`hello@` assumed); optionally a form-delivery key for the contact form; a real headshot photo for About (AI-stylized to match; type-only About ships without it). The scheduler is the one real setup step, chosen deliberately for the conversion lift.

---

## Definition of done

Passes the verification loop in `BUILD-PLAN.md`. Builds clean to a Vercel preview. Does NOT deploy to production until the LLC is formed.
