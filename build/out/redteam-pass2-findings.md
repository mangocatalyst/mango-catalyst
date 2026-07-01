# Red-Team Pass 2 — Updated Mango Catalyst Brief

**Reviewers:** Claude (Opus 4.8) + Codex (GPT-5), adversarial pair, second pass.
**Scope:** (a) verify the 3 prior MUST-FIX are actually resolved by the new override instructions in `00-canonical-brief.md`; (b) hunt fresh / second-order problems in the new changes (never-sold-only data handling, self-contained booking form, fonts delegated to Fable).
**Rule:** honesty/legal first. Quote the line, why it fails, the fix. Logo/imagery absence is out of scope by instruction.

---

## Verdict on the 3 prior MUST-FIX

The override instructions (brief lines 52-54) are **directionally correct and mostly airtight on the literal strings** — "Delete Section 5's proof block," "Drop 'in Duluth' and 'heating and cooling'," and "The ONLY data-handling claim allowed today is that data is never sold" are directive enough that a copywriter will strip the named violations. They are **NOT loophole-free**, and one of them over-corrected into a *new* false claim:

- **MF-1 (proof on owned builds):** Resolved for the deletion, but leaks two ways — it never bans recycling the old employer numbers in generalized clothing (→ MF2-1), and the blessed ServiceTitan/Slack proof re-narrows the vertical and re-implies the employer (→ MF2-3).
- **MF-2 (fingerprint removed):** Resolved for the literal Duluth + heating-and-cooling strings, but **undermined** by MF-1's ServiceTitan callout, a trades-only platform (→ MF2-3).
- **MF-3 (security cut to never-sold-only):** Over-corrected. The approved replacement phrase "never shared" is itself a false promise for an integrator (→ MF2-2).

Both reviewers converged on every item below.

---

## MUST-FIX (honesty / build-blocking)

### MF2-1 — The gate still permits laundering the banned employer numbers
**Quote:** Brief line 47: `"Automation like this can save a shop thousands of hours a year," never "I saved [employer] 1,000 hours."` and line 52: `Rebuild proof on owned builds ... all soft capability framing.`
**Why it fails:** MF-1 tells the copywriter to delete the block and rebuild, but never forbids reusing the specific 1,000-hour / 14.5% / 30% figures in *generalized* form. Worse, the brief's own approved example "thousands of hours a year" is a thin paraphrase of the banned "1,000 hours" — it invites the exact echo it is trying to kill. A diligent writer is fine; a lazy one launders the numbers straight back in as "capability."
**Fix:** Add an explicit clause to MF-1: ban the exact figures (1,000 hours, 14.5%, 30%) **and any numerically similar proof** anywhere on the site, attributed or not, unless the number is sourced to a public non-employer benchmark (cited). Soft framing should describe *kind* of outcome, not recycled magnitudes.

### MF2-2 — "Never shared" is a false promise for an automation integrator
**Quote:** Brief line 54: `the ONLY data-handling claim allowed today is that data is never sold ("your data is yours, never sold, never shared").`
**Why it fails:** The new approved line over-corrects MF-3 into a fresh honesty violation. An integrator's whole job is moving data between tools. "Never shared" collides with Zapier, Google Workspace, the Vercel route handler, and any transactional email service the moment two systems are wired together. It is impossible to honor on day one.
**Fix:** Replace with: data is **never sold**, and **shared only with the tools needed to deliver your automation, with your permission**. Keep MN-ITS's real local-only design as the concrete privacy example; do not generalize it into an infrastructure promise.

### MF2-3 — ServiceTitan/Slack as "owned builds" re-fingerprints the vertical and re-implies the employer
**Quote:** Brief line 48: `owned builds, safe to name: the MN-ITS extension ..., ServiceTitan automation, Slack automation` and line 52: `lead with the MN-ITS extension ... plus ServiceTitan automation and Slack automation.`
**Why it fails:** Undermines the MF-2 cure. ServiceTitan is a trades-only home-services platform; naming "ServiceTitan automation" as proof re-narrows the reader straight back to HVAC/field-service — the same fingerprint MF-2 just deleted. And only **MN-ITS** is genuinely Bryan-owned; ServiceTitan and Slack automation were employer-context, so listing them as "owned builds" beside "ran service operations inside a real shop" re-implies he built them *at that shop* — employer attribution by implication, which the gate bans.
**Fix:** Proof structure = **MN-ITS is the owned-work proof and anchors the section.** ServiceTitan and Slack are **capability areas only**: no "I built" claim, no implied shop outcome. Frame as "I work in platforms like ServiceTitan, Slack, Zapier," not "I built the ServiceTitan systems."

### MF2-4 — Booking: "Book a call" CTA + leftover Calendly contradict the new self-contained form
**Quote:** Brief line 79: `Default to a self-contained "request a call" form (name, email, preferred times)` vs line 39: `Calendly embed for booking.` and line 68: `+ Calendly` ; CTA label across the site: `Book a 30-minute call`.
**Why it fails:** Two problems. (1) **Internal contradiction:** lines 39 and 68 (locked decisions / Contact page) still mandate a Calendly embed, while line 79 mandates a self-contained form. A builder reading 39/68 ships Calendly; a builder reading 79 ships a form. Conflicting instructions in the same canonical brief. (2) **Label honesty:** "Book a call" implies an instant confirmed slot (Calendly-style). A request-a-call form delivers an async request, not a booking — the button over-promises the mechanism.
**Fix:** Reconcile lines 39 and 68 to match line 79 (form is the default; Calendly is the documented swap-in, not the shipped UI). Align the CTA to the mechanism: "Request a call" / "Ask for a callback," reserving "Book" for when a real calendar is connected.

---

## CONSIDER (built-site red team)

### C2-1 — Never-sold-only leaves a trust gap a privacy-sensitive buyer will probe
**Quote:** Brief line 54 (never-sold is now the only data claim).
**Note:** Honest, but the page now says nothing about where data lives, who can access it, or whether it is backed up. The MN-ITS medical angle actively primes a cautious buyer to ask. Do **not** re-add the false claims MF-3 removed. Instead route it: a short answer-first FAQ line — "Data-handling specifics are scoped on the discovery call, before any implementation, around your tools and sensitivity." The "before implementation" wording keeps it a real commitment, not a permanent vagueness. Closes the gap honestly and pulls the question toward the CTA. CONSIDER unless a real, written posture exists before launch.

### C2-2 — Self-contained form needs an expectation-setting confirmation
**Quote:** Brief line 79: `a self-contained "request a call" form (name, email, preferred times) that posts to the contact endpoint.`
**Note:** A form that posts with no auto-reply leaves the visitor unsure it sent or when they will hear back — conversion drop and a small trust ding right at the goal. Add a confirmation state + expectation copy ("I confirm a time within one business day"). Makes the async form feel as reliable as a calendar without claiming to be one.

### C2-3 — Font ownership contradiction (process, not honesty)
**Quote:** Brief line 33: `a distinctive display font for headlines (design proposes 2 to 3, Bryan picks)` vs line 80: `Fable picks a distinctive display font ... Bryan delegated the pick.`
**Note:** Minor internal contradiction: line 33 says Bryan picks from 2-3 proposals, line 80 says Fable picks outright. No honesty stake. Pick one (recommend line 80's delegation, with Fable surfacing its pick + one alternate for a fast Bryan veto) and align line 33 so the design agent does not stall waiting for a selection that was delegated away.

---

## Bottom line
The override instructions resolve the *named* prior violations but are not airtight: MF-1 leaks via number-laundering and the ServiceTitan mislabel, and MF-3 swung into a new false "never shared" claim. Four MUST-FIX tightenings fold back into `00-canonical-brief.md` before Copy/Design run; three CONSIDER items go to the built-site pass.
