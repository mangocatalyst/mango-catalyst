# Copy Honesty Pre-Audit (Role: adversarial pre-auditor, 2026-07-01)

Scope: every file in `build/out/copy/` audited against `build/00-canonical-brief.md` PROOF & HONESTY (MF-1/2/3, magnitudes ban, capability-areas rule), the `build/02-copy.md` self-verify list, voice rules, and the per-page answer-first outlines in `build/out/seo-spec.md`. READ-ONLY: no copy files were edited.

## Mechanical gate results (all clean)

- Em/en dashes: ZERO occurrences in all 11 files.
- "NorthStar" (any casing): zero. No employer name anywhere.
- Banned figures `1,000 hours` / `14.5` / `30%`: zero. (`$1,000 a month` is the public price, allowed.)
- "never shared" / "sold or shared" / any blanket sharing promise: zero. Data-handling language everywhere matches MF-3 ("never sell it, and I only wire it into the systems we agree to automate").
- 30-minute mentions: zero. All durations are 15 minutes, matching the CTA "Book a 15-minute fit call" (present on every page or via the documented global header on /guides and /privacy).
- "in Duluth" + "heating and cooling" employer fingerprint: zero. "Based in Duluth" appears only as Bryan's own location on /about, which seo-spec 2.4 explicitly allows.
- Revenue band in FAQ: zero. Fit qualifier is pain + under 25 people, per 00.
- Medical/dental in the fit sentence: correctly absent; FAQ "Who is this NOT for?" correctly declines patient-health-record work. MN-ITS mentions are the allowed owned-build anchor, never generalized into an infrastructure promise.
- Client-capacity count (2 to 3 retainers): not published anywhere. Correct.
- Phone numbers: zero.
- Speed terms: reply within 1 business day / fixes within 2 to 3 business days used consistently (home S5, S7 teaser, FAQ Q3); no "unlimited," no uptime guarantee (FAQ Q3 explicitly refuses one, good).
- Capability-areas rule: ServiceTitan / Zapier / Google Workspace framed only as "platforms I work in" on home, services, industry-hvac, about. No built-system or shop-outcome claim. MF-1 proof rebuild (MN-ITS anchor + method + honest no-reviews-yet paragraph) is done and done well.
- SEO-spec conformance: all titles/metas match section 2 verbatim; H1s unique and correct (hero H1 is "The Other Tools of the Trade"); FAQ carries the exact 9-question set; answer-first first-sentences check out on every page and guide; internal links match the section 5 mesh.

## Findings (severity-ranked)

### 1. HIGH — home.md, Section 6 Pricing: uncited magnitudes in the break-even block

File: `build/out/copy/home.md` (line 127)
Quote: "**The break-even, in plain numbers:** if this saves your team 10 to 15 office hours a month, it's already paying for itself. Most shops are losing a lot more than that to busywork."
Problem: two uncited magnitudes. "10 to 15 office hours a month" is an hours-saved figure with no cited public benchmark and an implicit uncited hourly-rate assumption; 02 says "The only allowed numbers are cited public non-employer benchmarks." Worse, "Most shops are losing a lot more than that to busywork" is a flat factual claim about magnitude of losses across shops with zero source, exactly the "uncited generic magnitudes launder the deleted employer figures" pattern the gate bans.
Fix: cut the second sentence entirely, and turn the first into reader-owned math instead of a supplied figure. E.g.: "**The break-even, in plain math:** take the hours your office spends on repeat work each month and multiply by what an hour actually costs you. If that number beats $1,000, this pays for itself." (Optionally link the manual-data-entry-cost guide, which teaches exactly this math with cited sources.)

### 2. MEDIUM — about.md: "20 years as a photographer running my own business" is not corroborated as written

File: `build/out/copy/about.md` (line 22)
Quote: "I spent 20 years as a photographer running my own business, where every job had a hard deadline and no do-overs."
Problem: profile/resume support a 20+ (resume says 22) year photography CAREER, but the own-business record is "Wedding Photography, own business, exclusive focus for 10 years." The sentence conflates career length with business-ownership length and frames a number as personal fact (00: "Kill any line that... frames a number as personal fact"; memory rule: never state a Bryan-did-X claim not backed by profile/resume). Also note the career figure itself is inconsistent across sources (20 vs 22).
Fix: reword to what the sources support, e.g. "I spent two decades as a photographer, including years running my own wedding photography business, where every job had a hard deadline and no do-overs." Or drop the number entirely. Confirm final phrasing with Bryan (propose-before-apply rule for important docs).

### 3. MEDIUM — about.md: "built and sold e-commerce companies" vs documented "successfully exited"

File: `build/out/copy/about.md` (line 22)
Quote: "I built and sold e-commerce companies."
Problem: profile says "Own companies (pizza ovens, rare/endangered plants)... successfully exited during Covid." "Exited" may mean sold, but "sold" is a stronger public claim than the documented record states. Full-stop rule: a Bryan-did-X claim not explicitly in memory/profile/resume needs confirmation before it goes on a public site.
Fix: either confirm the sale with Bryan, or use the supported wording: "I built e-commerce companies and exited them" / "I built and ran e-commerce companies."

### 4. LOW — faq.md Q7: "Usually weeks, not months" is a timeline promise outside the decided terms

File: `build/out/copy/faq.md` (line 49)
Quote: "Usually weeks, not months, because we start with one small task instead of a big rollout."
Problem: the decided offer terms (00, D1) cover reply/fix/tweak timing only; they set no first-build duration. "Usually weeks" is a new speed expectation with zero delivery history behind it. It is well hedged in the following sentences ("depends on the task... we set the timeline together"), so this is a confirm-not-rewrite item, but the self-verify line "no speed promises beyond reply within 1 business day / fixes within 2 to 3 business days" reads on it.
Fix: get Bryan's explicit OK to stand behind "usually weeks, not months," or soften the first sentence to "Small first builds land fast because we start with one task, not a rollout; the honest timeline depends on the task and tools, and we set it together when we scope it."

### 5. LOW — home.md global footer tagline reuses the Home pun on the HVAC page, which bans it

Files: `build/out/copy/home.md` (line 166) vs `build/out/copy/industry-hvac.md` (line 9)
Quotes: footer tagline "The other tools of the trade. Automation for upper-Midwest shops." vs the HVAC page rule "**Do not** reuse the Home H1 pun anywhere on this page."
Problem: the footer is global chrome, so the pun WILL render on /industries/hvac, contradicting the page's own instruction (rooted in the seo-spec cannibalization guardrail against reusing the Home H1 on the vertical page).
Fix: pick one: (a) scope the HVAC note to body content/H1s ("not in this page's headings or body; global chrome exempt"), which matches the SEO intent since a footer tagline is not a competing heading, or (b) de-pun the footer tagline ("Automation for upper-Midwest shops."). Option (a) is the cheaper, honest read; make it explicit so Design (03) does not have to guess.

### 6. LOW — contact.md: intro asserts a live scheduler as present fact, but only the embed has a fallback variant

File: `build/out/copy/contact.md` (line 19, vs the fallback state at line 33)
Quote: "Pick a real time slot below. ... Every booking comes with a video link in the calendar invite, so there's nothing to figure out on the day."
Problem: when the booking env var is empty, the fallback replaces the embed ("The scheduler is being set up...") but the intro above it still promises real time slots and an auto video link, making the page contradict itself. 00's rule is "an honest fallback... never a dead embed"; a false intro is the same dishonesty one paragraph up.
Fix: add a fallback variant of the intro (or make the intro conditional), e.g. "Tell me what's eating your week below and I'll confirm a 15-minute call time within one business day." Design/build note, but the copy file should supply the words.

### 7. LOW — home.md Section 3 intro: "real results" implies a track record the site elsewhere admits it does not have yet

File: `build/out/copy/home.md` (line 48)
Quote: "Plain English, real results, no jargon."
Problem: with zero clients (the credibility strip honestly says "Mango Catalyst is new, so I'm not going to show you a wall of five-star reviews I don't have yet"), "real results" is implied proof of delivered client outcomes. Mild, but it is the only phrase on the site that gestures at unclaimed results.
Fix: swap to a claim that is true today: "Plain English, no jargon, no software pitch."

## Non-findings verified (so the next pass does not re-litigate them)

- Guide citations: manual-data-entry-cost cites Panko (error rates, "around 1 percent," qualified) and the SBA 1.25 to 1.4x loaded-cost rule, both real public non-employer benchmarks, with a builder note to verify live URLs and CUT the number if unverifiable. Compliant.
- The "Thirty tally marks a day at 3 minutes each" passage is explicit hypothetical arithmetic (a worked example the reader performs), not a claimed outcome. Allowed.
- guide-what-is-automation-consultant's only numbers are Mango Catalyst's own public pricing. Allowed.
- FAQ Q4 (cancel/offboarding) promises a process ("handoff terms get agreed in writing... specifics on the fit call"), not a data-export or offboarding guarantee as present fact. MF-3 compliant; matches the pass-2 "scoped on the fit call" routing.
- guide-hvac-tasks states no numbers, so its "no citation required" note is correct.
- privacy.md makes only honorable present-fact claims (form fields, email delivery, Vercel analytics, no selling, deletion contact) and defers to attorney review at the LLC gate as required.
- Voice: plain-English, ~6-7/10 formality, contractions, short declaratives, zero em/en dashes; consistent with the SOUL-derived rules referenced in 02.
