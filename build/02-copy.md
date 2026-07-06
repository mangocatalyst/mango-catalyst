# Role Brief 02 — Copywriter

**Model + tools:** Fable, in Claude Code, writing in Bryan's voice.
**Position in pipeline:** after SEO (01), before Design (03). Most of the copy is locked, so your job is polish + the gaps, EXCEPT the proof / honesty / hosting sections, which require a mandatory REWRITE (see Your job + Hard constraints + `00`'s MF-1/MF-2/MF-3), not polish.

## Read first
- `00-canonical-brief.md`
- `build/out/seo-spec.md` (the keyword targets + answer-first outlines you write to)
- `~/Documents/AI Vault/projects/mango-catalyst/website-copy-2026-06-14.md` (the LOCKED copy: hero, sections, microcopy)
- `~/Documents/AI Vault/jobs/apply-kit/covers/SOUL.md` (voice bible)
- For honest framing only (NOT for lifting claims): `~/Documents/AI Vault/jobs/profile/bryan-profile.md`, `.../resume-master.md`

## Your job
Produce final, build-ready copy for every MVP page:
- Polish the locked copy to the SEO spec's answer-first structure and keyword targets without losing the voice.
- **Mandatory rewrite (NOT polish), per `00` MF-1/MF-2:** DELETE Section 5's NorthStar-sourced proof block (the 1,000-hours / 14.5% / 30% numbers + the trade-show / dispatch examples) and REBUILD proof anchored on MN-ITS + the discovery-plan-build method; STRIP employer fingerprints ("in Duluth", "heating and cooling" become "a real service business").
- **Mandatory rewrite (NOT polish), per `00` MF-3:** EVERY hosting/monitoring/backup/offboarding claim stated as present fact anywhere in the locked copy is a mandatory rewrite, not just one section. Known instances: Section 4 (hosting/monitoring), Section 6 (the About own-hardware line), Section 7 (posture claims), Section 8 (FAQ Q2 data-safety including the banned "shared" promise, Q3 own-hardware uptime, Q4 offboarding export guarantee). Rewrite all of them to the honest data-handling claims in `00` MF-3, then grep the final copy for any you missed. "Never shared" and "never sold or shared" stay banned.
- **Duration sweep (decided 2026-07-01):** the fit call is 15 minutes on Cal.com. Sweep every 30-minute mention out of the locked copy (Sections 4 and 9, the OG/meta description, any microcopy); align all durations to the CTA label "Book a 15-minute fit call."
- **Offer-terms sweep (decided 2026-07-01):** align retainer copy to the decided terms: tweaks are changes under about 2 hours handled from a monthly queue; bigger work gets scoped separately; reply within 1 business day; fixes within 2 to 3 business days. Never promise speed beyond these ("fast fixes" must mean exactly this). Launch capacity is 2 to 3 retainer clients; do NOT publish a client count.
- **Fit-qualifier sweep (decided 2026-07-01):** REMOVE the public revenue band ($250K to $1M/month) from the FAQ; qualify on pain (drowning in repetitive office work, no in-house systems person) plus under 25 people. CUT medical/dental from the FAQ fit sentence: no PHI-touching automations until attorney review.
- Write the **FAQ** (answer-first, each Q a real query, each A liftable by an answer engine).
- Write the **3 evergreen guides** FROM SCRATCH (slugs locked: `hvac-tasks-to-automate`, `manual-data-entry-cost`, `what-is-automation-consultant`). The repo `.mdx` files are 0 bytes; no drafts exist anywhere. Undated, answer-first, honesty gate applies.
- Draft the **/privacy page** in plain English (what the form collects, email delivery, analytics, no selling, contact to delete). It gets attorney review at the LLC gate.
- Write the **About** page: honest operator story, no employer name.
- Keep the hero as locked: H1 "The Other Tools of the Trade" + a subhead that decodes it fast.

## Hard constraints (the honesty gate from 00)
- **No NorthStar.** No employer name or implication.
- **Soft claims only:** describe the KIND of outcome ("cut the manual data entry, kill the double-keying, end the after-hours invoicing"), never magnitudes, never a personal/employer number. Uncited generic magnitudes ("thousands of hours") are BANNED per `00`: they launder the deleted employer figures. The only allowed numbers are cited public non-employer benchmarks.
- **Proof framing is governed by `00` (PROOF & HONESTY), not restated here.** The rule to hold: **MN-ITS is the ONE owned build**; ServiceTitan / Slack / Zapier / Google Workspace are **capability areas only** ("platforms I work in"), never built systems or shop outcomes. Plus the discovery-plan-build method as proof texture and honest unnamed operator background.
- **Never em or en dashes.** Commas, colons, periods, parentheses.
- Reader is the overwhelmed owner/office person, not a tech. Trades-first, not trades-only. One CTA everywhere: "Book a 15-minute fit call" (warm, low-commitment, no pitch).

## Output
`build/out/copy/` with one file per page (`home.md`, `about.md`, `services.md`, `industry-hvac.md`, `faq.md`, `contact.md`, `privacy.md`, `guide-*.md`). Each: final headline(s), body, microcopy, and the page title + meta from the SEO spec.

## Self-verify (loop until green before handoff)
- [ ] Every MVP page has final copy; exactly one H1 each; hero H1 is "The Other Tools of the Trade."
- [ ] FAQ is answer-first; each answer is a clean, liftable paragraph.
- [ ] Honesty grep clean: no "NorthStar," no personal-number claims, no employer implication, zero occurrences of "1,000 hours" / "14.5" / "30%" (cited public non-employer benchmarks are the only exception), no uncited generic magnitudes.
- [ ] No em/en dashes anywhere. Voice matches SOUL.
- [ ] CTA is "Book a 15-minute fit call" on every page. Reader is owner/office, not tech.
- [ ] Zero 30-minute mentions anywhere (body, OG/meta, microcopy). No revenue band in the FAQ. No medical/dental in the fit sentence. No present-fact hosting/monitoring/backup/offboarding claims in ANY section (MF-3). No sold/shared/third-party blanket promises.
- [ ] No speed promises beyond reply within 1 business day / fixes within 2 to 3 business days. No published client-capacity count. `/privacy` copy exists (plain-English, per `00`).

## Handoff
Hand `build/out/copy/` to Design (03).
