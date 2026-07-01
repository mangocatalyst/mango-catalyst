> RECORD ONLY, applied 2026-07-01. Decisions live in build/00-canonical-brief.md and the vault MOC v2, which supersede any recommendation here. This file contains superseded terms and never-publish figures (the dropped revenue band, the internal client-capacity number). Do not source copy, terms, or prompt text from this file.

# Mango Catalyst MOC Red-Team, Round 1 Synthesis (2026-07-01)

## TLDR

1. All 8 dimensions found the same root cause: the April 2026 planning layer of the MOC was never marked superseded, so current truth sits at the bottom of the file underneath ~150 lines of dead instructions (blog engine, NorthStar proof, wrong hero, tiered pricing, lead-magnet funnel, orange palette, Next 14+).
2. Adversarial verification deflated most "blockers": the repo build briefs (build/00-canonical-brief.md wins all conflicts) already carry the right decisions, so the build pipeline is largely insulated; the MOC misleads readers and prompt authors, not the one-shot inputs directly.
3. What genuinely bites: the banned own-hardware hosting claim sits in the MOC AND in locked copy Sections 4 and 7 outside the mandatory-rewrite scope; the 3 evergreen guides are falsely described as "repurposed from already-written posts" (the files are 0 bytes); analytics, spam protection, and a privacy page fell out of every enforced build layer.
4. Nine decisions only Bryan can settle (retainer scope, revenue band, scheduler + slot length, analytics, privacy page, PHI boundary, palette bands, headshot, legal name string); everything else collapses into one mechanical restructure: rewrite the MOC as v2 (current truth up top, history archived) plus 7 small repo-brief patches.
5. Nothing has been applied. Per propose-wait-apply, this entire report is a proposal awaiting Bryan's approval.

---

## Bryan Decision List

Work through these in order. Each is one question, minimal context, and a specific recommendation.

**D1. Retainer scope, capacity, and response time.** What exactly does $1,000/month cover, how many concurrent clients at launch, and what response time will you stand behind while holding a day job?
Context: gap-analysis B13 flagged this as unresolved and the locked copy promises "monitoring, fast fixes, an ongoing improvement queue" with no definition of a tweak vs a scoped build and no client ceiling. This is the only CONFIRMED major that touches the honesty of the offer itself.
Recommendation: decide before the one-shot. Suggested default: tweaks are changes under about 2 hours, handled from a monthly queue; bigger work gets scoped separately; cap launch at 2 to 3 retainer clients; promise a reply within 1 business day and fixes within 2 to 3 business days. Then align the "fast fixes" copy to whatever you pick. The site should never promise speed you cannot defend.

**D2. Published revenue qualifier.** Is "$250K to $1M/month in revenue" intentional as a public FAQ disqualifier?
Context: the band ships verbatim in the locked FAQ and no review pass ever examined it. The top end ($12M/yr) implies roughly 50 staff at typical trades revenue per employee, contradicting the "under 25 people" line beside it, and the $3M/yr floor may gate out the shop the pain copy describes.
Recommendation: drop the dollar band from public copy and qualify on pain instead (drowning in repetitive office work, no in-house systems person, under 25 people). Keep any revenue band internal and directional. If a public number must stay, cap the top near $500K/month so it coheres with the headcount.

**D3. Scheduler tool and slot length.** Cal.com or Calendly, and is the fit call really 15 minutes?
Context: the canonical brief locked the CTA label "Book a 15-minute fit call" but left the tool open; the scheduler account is your one real setup step and the site's only CTA depends on it; the locked copy still says 30 minutes in Sections 4 and 9 and the OG description.
Recommendation: Cal.com free tier (Vercel-friendly, auto Google Meet links) unless you already run Calendly. Confirm 15 minutes as the real slot so the copy sweep can align every duration mention. The one-shot reads the booking URL from an env var and renders an honest fallback until the account exists.

**D4. Analytics.** Which tool ships at launch and what counts as a conversion?
Context: the MOC said "Plausible or PostHog" but analytics vanished from every enforced build layer (locked decisions, checklists, verification loop); gap A10 requires defining the conversion event on day one.
Recommendation: Vercel Web Analytics + Speed Insights at MVP (near-zero script weight, fits the Vercel-native rule and the Lighthouse 95+ gate), with booking-completed and CTA-click as the defined events, verified on the Vercel preview. Defer Plausible/PostHog.

**D5. Privacy policy page.** Approve adding /privacy to the MVP page set?
Context: the gap analysis says a policy is required before collecting form data or running analytics; the locked MVP page list has none and the legal open question has sat unchecked since April.
Recommendation: yes. The one-shot drafts a plain-English policy (what the form collects, email delivery, analytics if any, no selling, contact to delete), linked in the footer, flagged for attorney review at the LLC gate that already blocks production.

**D6. Regulated-data boundary.** Take dental/medical clients whose data is PHI, or exclude until legal review?
Context: gap A7's VERIFY was never answered; medical/dental still appears in the target-industries list and one locked FAQ sentence, and the MN-ITS anchor already invites is-it-HIPAA questions. MVP launch exposure is small (only the HVAC vertical ships) but the question blocks Phase 2.
Recommendation: exclude PHI-touching automations at launch. Record "no PHI-touching automations until attorney review" next to the industry list and cut medical/dental from the FAQ fit sentence. Revisit with the attorney at LLC time.

**D7. Page palette.** All-dark, or light pricing/FAQ/form bands?
Context: the branding spec leaves this as an explicit A/B decision for you (option B recommended, with a full option-B token set); it is missing from the MOC's parked-decisions list, so the builder would silently take B.
Recommendation: delegate it exactly like the hero: the builder mocks both on the Vercel preview and you pick from renders. If you would rather decide now, take B (light conversion bands), which both the branding spec and gap analysis recommend.

**D8. Headshot and a no-AI-people rule.** Real photo on About, or type-only at launch?
Context: open since April. The imagery rule is AI-generated with no stock and no employer assets, but nothing forbids generating a person, and the About section is literally "who you're actually working with." The placeholder-plus-curation flow means a fake Bryan cannot ship without your approval, but the rule is cheap insurance.
Recommendation: launch type-only with no headshot, and add one hard line to the imagery constraint: never AI-generate people, faces, or anything presented as Bryan or a client. Shoot a real headshot later if you want one.

**D9. Legal name string and GBP sequencing.** Confirm "Mango Catalyst" as the exact registered name at LLC formation.
Context: NAP consistency requires the footer, LocalBusiness schema, GBP, and legal name to match exactly; constants.ts already implements the service-area, city-only, no-phone display. The LLC deploy gate prevents a mismatch from shipping, but no doc states the ordering.
Recommendation: confirm the string at formation, then create GBP as a service-area business (base city Duluth, competitor-category check per the seo-plan), then verify constants.ts matches before production deploy. One sequencing line goes into MOC v2.

---

## Mechanical Restructure Proposal

One coherent package, applied only after Bryan approves. Four parts.

**A. MOC v2 rewrite (the vault edit).** Archive the entire current file verbatim to `projects/mango-catalyst/archive/moc-v1-2026-07-01.md` (vault archive convention, via Obsidian CLI), then write v2 per the outline below. This single move resolves roughly two thirds of all findings: the stale hero, NorthStar About/Proof lines and northstar/ link captions, blog engine and content pillars, lead-magnet funnel and ConvertKit line, tiered/hidden pricing line, industry x geography matrix, orange Design Direction stub, "real photos" imagery line, Next 14+/MDX/RHF-webhook tech stack, dead launch-doc links, Slogan Ideas "exploring" status, the four competing resume pointers, the xyOps START HERE line (that work shipped and lives in the automation-platform MOC), the "supersedes sections below it" direction typo, the 06-26 "owned builds: ServiceTitan, Slack" clause and unmarked WebGL line, the checked-but-unresolved CRM answer, the "Hosted on dedicated hardware (Bryan's)" clause, and the "Status: Planning" header.

**B. Repo-brief patch set** (in `/Users/mango/Projects/mango-catalyst/`):
1. `build/02-copy.md`: extend the mandatory-rewrite scope to name the hosting/monitoring claims in locked-copy Sections 4 AND 7 (MF-3 bans them as present fact), and add a sweep instruction for every 30-minute duration mention (Sections 4, 9, OG/meta, microcopy) to match the confirmed slot length from D3.
2. `build/BUILD-PLAN.md` + `build/00-canonical-brief.md`: change "repurposed from the already-written posts" to "write the 3 guides from scratch (slugs locked, undated, answer-first, honesty gate applies)". The .mdx files are 0 bytes; no drafts exist anywhere.
3. `build/00-canonical-brief.md` Open config + `build/06-integrator.md`: add contact-form spam protection (honeypot + minimum-fill-time; Turnstile only if spam appears post-launch) with a verification line that a bot-style submission is rejected; add favicon/apple-touch-icon replacement and branded not-found/error pages to the integrator checklist.
4. `build/BUILD-PLAN.md`: clarify that "keep the SEO foundation" means keep the patterns, not freeze the files: delete `src/app/blog/**`, `src/lib/blog.ts`, `src/content/blog/`; remove `/blog` from STATIC_ROUTES; add `/faq` and the 3 guide slugs; simplify sitemap.ts. Also reword the two "posts to a webhook" phrasings to "the configured route-handler endpoint" so verification tests what 00 specifies.
5. `build/01-seo.md`: guides emit Article JSON-LD via a new articleLd builder added to `src/lib/jsonld.ts` (the brief currently says "using the existing builders" and no Article builder exists); add one launch line: verify the domain in Google Search Console AND Bing Webmaster Tools (ChatGPT search rides Bing's index; optional IndexNow key file).
6. `build/00-canonical-brief.md` imagery constraint: add the no-AI-people rule from D8 once decided.
7. Once D4 is decided: write the analytics pick + booking-completed and CTA-click events into 00's Open config and add a verification-loop item confirming the events fire on the Vercel preview.

**C. `SEO-FOUNDATION.md`**: staleness note on the Home code example (it imports faqPageLd); FAQPage belongs to the FAQ page only per `build/01-seo.md` and consensus item 6.

**D. Pre-one-shot checklist** (recorded in MOC v2): wip-commit the untracked stubs on `seo-foundation`; push `seo-foundation` to origin (verified today: origin has only main, commit 3900c72 exists solely on this machine); the one-shot builds on a branch off it and pushes so Vercel generates the preview URL the verification loop needs; scheduler account exists or the env-var fallback renders honestly; patches B1 to B7 applied.

---

## MOC v2 Outline

Principle: current truth up top, one authoritative section per topic, history compressed to a changelog, pointers to the detailed docs instead of duplicated content.

**0. Header.** Status: build-ready pending the D1 to D9 decisions; production deploy gated on LLC formation. Domain mangocatalyst.com registered at Vercel. One line: single-page-scroll lead-gen site for upper-Midwest SMB automation consulting. Warning: this MOC is navigation, never a copy source; on any conflict `build/00-canonical-brief.md` wins.

**1. Read order for the one-shot prompt author.**
1. `build/00-canonical-brief.md` (single source of truth; owns the proof/honesty gate: MF-1/MF-2/MF-3, banned magnitudes, no NorthStar ever)
2. `build/BUILD-PLAN.md` + role briefs 01 to 06 + `orchestration.md`
3. Locked vault deliverables: `website-copy-2026-06-14` (copy, with the D3 duration sweep and MF-3 Section 4/7 rewrites pending), `branding-color-type-spec-2026-06-14` (hex, type scale, WCAG only; its one-typeface rule and photography sourcing are superseded), `seo-plan-2026-06-14` v2 (keywords, meta, local SEO; superseded on FAQPage placement, Phase-1 page set, and the blog)
4. `build/out/redteam-consensus.md` + `build/out/hero-direction-options.md`
5. Background only: gap-analysis, Codex adversarial review, both competitor audits.

**2. Current Truth** (one block per topic, 2 to 5 lines each, each ending in a pointer):
- Offer and pricing: $795 setup + $1,000/month retainer, numbers public, scope case-by-case; hosting posture ASPIRATIONAL per MF-3, never stated as present fact; scope/capacity policy = D1.
- Audience and fit: upper-Midwest, under 25 people, owners and office staff (not techs); explicit NOT-for list mirrored from the locked FAQ; revenue qualifier = D2; PHI boundary = D6.
- Proof and honesty: MN-ITS is the ONE owned build; ServiceTitan/Slack/Zapier/Google Workspace are capability areas only; no NorthStar by name or implication; no employer magnitudes; no fabricated or placeholder proof. Authority: 00 PROOF & HONESTY. This MOC never restates the gate.
- Site: single-page scroll Home + About, Services, Industries/HVAC, FAQ, Contact, 3 evergreen guides written from scratch; no blog; hero H1 "The Other Tools of the Trade" (backdrop parked, Bryan picks from mockups); ONE CTA "Book a 15-minute fit call"; scheduler with real slots, auto video link, one qualifying question, confirmation + reminder emails; form is the secondary path (route handler to hello@, spam-protected, one-business-day expectation copy).
- Brand: deep matte navy + mango amber (zero orange #F97316); Inter body + Fable-selected display font (one-alternate veto); imagery AI-generated, no stock, no employer assets, no AI people (D8); logo = Inter wordmark + one abstract amber spark, Fable generates placeholders, Bryan curates.
- SEO/AEO: foundation lives on branch `seo-foundation`; Home = LocalBusiness only, FAQPage on the FAQ page only, Service + BreadcrumbList on services/industry, Article on guides; honest launch framing (new domain ranks near zero); GSC + Bing WMT at launch; GBP sequencing per D9.
- Tech: Next 16.2.2 App Router + TS + Tailwind on Vercel; any agent writing code reads AGENTS.md + the bundled Next docs first; no MDX/blog; analytics per D4.

**3. Open decisions (Bryan).** The consolidated list: LLC formation (gates production), hero direction pick, display-font veto, D1 through D9. Single list, one line each, no other pick-up-here markers anywhere in the file.

**4. Pre-one-shot checklist.** Part D above.

**5. Phase 2 parking lot** (with honesty gates attached): additional verticals (each genuinely differentiated or consolidated, per both competitor audits), service detail pages, lead magnets + email capture (footer-only secondary, never a competing CTA), ROI calculator (every default sourced to a cited public non-employer benchmark), case studies (real Mango Catalyst clients only, documented and permissioned), testimonials (real reviews only, no placeholders), CRM choice, local business spotlights (consent + not-clients labeling, never near proof), paid ads (standard Google Ads/LinkedIn only; Google Local Services is ineligible for this category; no YouTube per the no-social rule).

**6. Deliverables index.** Annotated pointers to the five 2026-06-14 docs, the two competitor audits, and the consensus record, each with its supersession note inline (per read order above).

**7. Changelog** (compressed history, one line per date): 04-06 initial plan (archived to moc-v1); 04-09 launch docs (dead, archived); 06-13 slogans parked; 06-14 planning pass (copy/brand/SEO/gaps locked); 06-17/19 competitor audits + SEO v2 + foundation built; 06-26 multi-agent build plan + automation platform split to its own MOC; 06-29 Claude Design added; 06-30 red-team consensus applied, Claude Design dropped, WebGL parked, honesty gate tightened.

**8. Related notes.** `[[bryan-profile]]` kept. The two northstar/ links either removed or re-captioned "internal background only; nothing sourced from these may appear on the site (no NorthStar by name or implication)". `[[automation-platform-moc]]` pointer kept. "Case study #1" in the split note annotated as an internal delivery-platform milestone that can never appear on the site as a case study.

**Deleted outright:** Lead Funnel, Free Resources / Lead Magnets, Content Strategy (blog pillars), the Core Pages / Service Pages / Industry Landing Pages lists, Design Direction stub, old Tech Stack, Launch Documents block, the xyOps START HERE line, Resume Point 06-19, Claude Design 06-29 note, the three stale pick-up-here markers.
**Archived:** the full v1 file, verbatim, to `projects/mango-catalyst/archive/moc-v1-2026-07-01.md` (including Slogan Ideas; only the Elite-Trades "rely" collision warning is carried into v2's brand block).
**Rewritten:** header/status, target market, proof stance, site/brand/SEO/tech truth blocks, open questions (as the single decisions list), phase plan (as the Phase 2 parking lot).

---

## Merged Findings Table

Ranked by what most endangers the one-shot prompt: honesty > quality > hygiene. "Dims" = dimensions that co-found the item (conv, seo, copy, des, pos, tech, cons, hon).

| # | Merged finding | Class / severity | Dims | Verdict | One-line fix |
|---|---|---|---|---|---|
| 1 | Own-hardware hosting stated as settled fact (MOC line 168) AND the banned MF-3 claim survives in locked copy Sections 4 and 7 outside the mandatory-rewrite scope | Honesty / high | copy, pos, tech, cons, hon | CONFIRMED (3 of 5 variants) | v2 removes the clause; patch B1 names Sections 4 and 7 as mandatory rewrites |
| 2 | 3 evergreen guides described as "repurposed from already-written posts"; the files are 0 bytes and no drafts exist anywhere | Honesty + build / high | tech | CONFIRMED | Patch B2: write from scratch, slugs locked, honesty gate applies |
| 3 | NorthStar residue: About line, Proof line, northstar/ links captioned "case study material", split-note "case study #1" | Honesty / major | copy, pos, cons, hon | CONFIRMED (links/254 variant); siblings weakened | v2 strips lines 31/126, re-captions the links, annotates line 254 |
| 4 | Fabrication vectors in the stale roadmap: Case Studies page "real results, ROI numbers", Phase 3 testimonials, ROI calculator in four places | Honesty / major | conv, copy, hon | WEAKENED (gates in 00 protect the build) | v2 Phase 2 parking lot with real-client-only and public-benchmark-only gates |
| 5 | Retainer scope, capacity ceiling, and response-time promise undefined behind "fast fixes" copy | Honesty of offer / major | pos | CONFIRMED | Decision D1 |
| 6 | Published revenue band $250K to $1M/month never stress-tested; top end contradicts under-25 headcount; ships in locked FAQ | Trust-at-decision / major | conv, pos | CONFIRMED (conv) | Decision D2 |
| 7 | Privacy policy page missing from the MVP page set despite form + analytics requiring one | Legal / major | tech | CONFIRMED | Decision D5 |
| 8 | Analytics absent from every enforced build layer; conversion event never defined | Quality / major | conv, tech | CONFIRMED (tech) | Decision D4 + patch B7 |
| 9 | Entire 2026-04-06 layer stale and unmarked: dead hero, multi-page map, 8 service pages, industry x geo matrix, tiered pricing, blog engine, orange stub, phase plan | Quality-staleness / major | all 8 | CONFIRMED (cons, blocker variant); most siblings weakened | MOC v2 restructure, part A |
| 10 | Lead Funnel + Free Resources + ConvertKit direct a second competing CTA with the dead 30-min Calendly label | Quality / major | conv, seo, copy, pos, cons | CONFIRMED (pos, cons) | v2 site block: one CTA, magnets Phase 2 footer-only |
| 11 | Settled booking spec (real slots, auto video link, qualifying question, confirmation/reminder, one-business-day copy) missing from the MOC's booking lines | Quality / major | conv | CONFIRMED | v2 site block carries the full spec + pointer to 00 |
| 12 | 30-minute duration residue in locked copy (Sections 4, 9, OG) with no sweep instruction; button label itself is protected | Quality / major | conv, copy | WEAKENED | Patch B1 sweep + D3 confirms slot length |
| 13 | Kept SEO foundation still encodes the dropped blog; "keep the foundation" ambiguity; STATIC_ROUTES lacks /faq + guide slugs | Quality / moderate | tech, seo | WEAKENED | Patch B4 |
| 14 | Spam protection (gap B4: honeypot/Turnstile) never carried into the self-contained build docs | Quality / moderate | conv, tech | CONFIRMED (conv) | Patch B3 |
| 15 | Guides need Article JSON-LD but jsonld.ts has no Article builder and 01-seo says "using the existing builders" | Quality / moderate | seo | WEAKENED | Patch B5 |
| 16 | seo-foundation branch unpushed, stubs uncommitted, no push step documented for the Vercel preview gate | Process / moderate | tech | WEAKENED | Pre-one-shot checklist, part D |
| 17 | Dark-vs-light-bands palette fork tracked nowhere in the MOC's parked list | Bryan fork / minor-moderate | des | WEAKENED | Decision D7 |
| 18 | Headshot question open since April; no rule against AI-generating people | Bryan fork / minor | des, cons | CONFIRMED (cons) | Decision D8 + patch B6 |
| 19 | Scheduler tool choice open and account setup gates the site's only CTA; no fallback state specced | Bryan fork / minor | tech | CONFIRMED | Decision D3 |
| 20 | Medical/dental listed with the HIPAA boundary never decided | Bryan fork / minor now, blocks Phase 2 | pos | WEAKENED | Decision D6 |
| 21 | GBP/NAP sequencing unstated against the LLC gate; legal name string unconfirmed | Bryan fork / minor | seo | WEAKENED | Decision D9 |
| 22 | FAQPage-on-Home survives in the 06-19 Resume Point and the SEO-FOUNDATION.md code example | Hygiene / minor | seo, cons | WEAKENED | v2 archives the Resume Point; part C staleness note |
| 23 | Tech Stack facts stale (Next 14+, MDX, RHF-to-Zapier, ConvertKit, already-answered domain question) + BUILD-PLAN "webhook" wording | Hygiene / minor | tech, cons, conv | CONFIRMED (cons) | v2 tech block + patch B4 wording |
| 24 | Schema list stale (dead HowTo, missing Organization/WebSite/BreadcrumbList) | Hygiene / minor | seo | WEAKENED | v2 SEO block carries the per-page map from 01-seo |
| 25 | No Bing Webmaster Tools / IndexNow path despite ChatGPT search being Bing-backed | Hygiene / minor | seo | CONFIRMED | Patch B5 launch line |
| 26 | Phase 4 lists ineligible Google Local Services ads and a no-social-rule-violating YouTube channel | Hygiene / minor | seo | CONFIRMED | v2 Phase 2 parking lot replaces them |
| 27 | Navigation/trust hygiene bundle: Status: Planning header, four competing resume pointers, shipped-work xyOps START HERE, dead launch links, "below it" supersession typo, slogan "exploring" status, WebGL in the 06-26 Locked list, 06-26 "owned builds" clause, missing voice-gate pointer, logo ownership unstated, CRM marked resolved but TBD, NOT-for list absent, honesty-gate authority (00, MF-2/MF-3) never named, competitor-audit cross-links missing, imagery and one-typeface annotations missing | Hygiene / minor | conv, copy, des, pos, cons, hon | Mixed (xyOps pointer, slogan status, logo, CRM, NOT-for, typo CONFIRMED; rest WEAKENED) | All resolved by the MOC v2 restructure, part A |

---

## Weakened / Dropped

Findings that survived only in reduced form, so nothing silently disappears. The recurring deflator: the one-shot's actual inputs are the repo build briefs, and 00-canonical-brief declares itself the conflict winner, so most "blocker" claims about stale MOC text became reader-hygiene defects.

- Lead Funnel "nothing later supersedes it": false; line 215 records the one-CTA decision. Survives as unmarked stale text.
- CTA label at risk of shipping wrong: no; 02-copy's hard constraint and self-verify protect the button. Only body-text durations are exposed (row 12).
- Blog engine as blocker: build reads the repo briefs where the blog is dropped; survives as doc hygiene plus the row 13 foundation-file ambiguity.
- "No FAQPage placement rule in the MOC": false; the 06-30 section states FAQ-only. Survives only in the Resume Point and the SEO-FOUNDATION example (row 22).
- seo-plan pointer "inherits three stale calls": the build briefs already encode the overrides; survives as an inline annotation nicety, folded into the v2 read order.
- Schema-list finding's FAQPage sub-claim dropped; dead HowTo and missing foundation types survive as hygiene (row 24).
- GBP/NAP: address policy is already decided and implemented in constants.ts and the name string "Mango Catalyst" already fixed in the seo-plan; only the sequencing note survives (D9).
- Article schema: the load-bearing defect is in 01-seo.md, not the MOC (row 15).
- Day-one SEO funnel "one-shot builds a competing email CTA": dropped; briefs encode the right decisions. Stale Goal line and funnel survive as hygiene.
- Hero findings (4 variants): the 00 ban actually targets SCAFFOLD.md, not the MOC line, and line 215 states the locked hero; survives as the row 9 restructure.
- Pricing line 38, Case Studies page, industry x geo matrix, phase-plan deferrals: all resolved within the same document or in the briefs; survive as stale-text cleanup. The audits require differentiation or consolidation of geo pages, not killing the concept.
- Case Studies "can ONLY be satisfied by banned employer numbers": overstated; future real-client results could satisfy it. The real-client-only gate goes in regardless (row 4).
- ROI calculator "no honest data source": a user-input calculator needs no employer numbers; the briefs already defer it to Phase 2. Benchmark-sourcing gate kept.
- Testimonials fabrication: the one-shot is gated by 00's fake-proof ban; only the unqualified Phase 3 checkbox survives.
- Local Business Spotlights implied-client risk: hypothetical, no path to publication under MVP scope; kept as a conditional Phase 2 guardrail.
- NorthStar About/Proof lines as blocker: the MOC self-corrects twice later and the integrator runs a NorthStar grep on src/ and content/; survives as honesty hygiene (row 3).
- 06-26 "owned builds" clause: a supersession marker exists 12 lines later (with the wrong direction word) and the repo briefs were fixed; survives as an inline edit plus the typo fix.
- Hosting finding sub-claims: "no trace of the self-hosting risk in the MOC" is false (line 220 names it); positioning/tech-stack variants downgraded because the canonical brief carries MF-3 correctly. The copy Sections 4/7 exposure is what keeps row 1 high.
- MF-2/MF-3 omission from the MOC: BUILD-PLAN already names 00 as the single authority; survives as the one-line authority pointer in v2's proof block.
- Palette fork "in no open-decision list": false; gap-analysis C7 lists it. Survives as the MOC parked-list omission; realistic failure is a silent option-B pick, not a stall (D7).
- Headshot/fake-Bryan: placeholders plus Bryan-curates means nothing ships without approval; the no-AI-people rule is cheap insurance (D8).
- Medical/dental: MVP builds only the HVAC vertical and MF-3 constrains data claims; launch exposure is one FAQ sentence (D6).
- Revenue band: the floor-vs-pain-narrative sub-claim was dropped; only the top of the band is arithmetically strained (D2).
- AI Search Readiness Audit "never dispositioned": false; parked in seo-plan section E. Only a Competitive Positioning cross-link survives, folded into v2's deliverables index.
- Next.js 14+ as blocker: briefs carry the 16.2.2 pin and the AGENTS.md mandate; survives in the v2 tech block.
- Blog-in-foundation "no doc orders deletion": false; 06-integrator gates no-/blog-routes and 01-seo confirms the blog is gone; sitemap self-corrects on empty files. Survives as the KEEP-vs-edit ambiguity and STATIC_ROUTES additions (row 13).
- Unpushed branch "no doc orders the wip-commit": false; BUILD-PLAN line 27 orders it. Only the push step is undocumented, and a local vercel deploy is an unwritten workaround (row 16).
- Analytics (conversion variant): gap A10 is in the mandated source docs and the scheduler records bookings natively; the loss is attribution and funnel measurement, not total blindness. tech-stack variant stayed CONFIRMED (row 8).
- Spam "specified nowhere": false; gap-analysis B4 specifies it; it was dropped in consolidation to the self-contained briefs. Junk-inbox severity (row 14).
- Constants/assets: the Fable-vs-Bryan resolution map already exists in 00's Open config; surviving gaps are the stale MOC VERIFY list plus unspecified 404/favicon (patch B3, row 27).
- Forms "three backends to choose from": BUILD-PLAN's precedence rule already resolves to the route handler; wording tighten only.
- Voice constraints: the repo briefs carry the full voice gate; survives as v2's "MOC prose is not copy-safe" warning.
- Slogan section: the Parked / Not committed header mitigates; status-line cleanup only.
- WebGL Locked-list line: superseded 11 lines later by a note naming that exact line; the v2 wording says PARKED pending Bryan's mockup pick, not cut.
- One-typeface rule: all three build briefs state the display-font decision; annotation only.
- Resume-pointer chaos: the MOC self-annotates most supersessions; survives as the stale header, three aging pointers, and flagged-but-unremoved dead links, all resolved by v2.

---

## Next step

Bryan works the decision list D1 to D9 (D1 to D5 before the one-shot; D6 to D9 can ride the LLC gate), then approves or amends the restructure. On approval: archive v1, write MOC v2, apply patches B1 to B7 and C, run checklist D. Round 2 of this red-team should then re-verify against MOC v2 before the prompt is written.

Key paths: MOC `/Users/mango/.claude/projects/-Users-mango/memory/projects/mango-catalyst/mango-catalyst-moc.md`; briefs `/Users/mango/Projects/mango-catalyst/build/` (00-canonical-brief.md, BUILD-PLAN.md, 01-seo.md, 02-copy.md, 06-integrator.md); `/Users/mango/Projects/mango-catalyst/SEO-FOUNDATION.md`; consensus `/Users/mango/Projects/mango-catalyst/build/out/redteam-consensus.md`.