# Early Red-Team Findings — Mango Catalyst Website (pre-build gate)

**Reviewers:** Claude (Opus) + Codex (GPT-5), adversarial pair. Source of truth challenged: `00-canonical-brief.md` + locked copy `website-copy-2026-06-14.md`.
**Rule:** honesty/legal first. Each item is MUST-FIX or CONSIDER, with the quoted line, why it fails, and the fix. MUST-FIX items fold back into `00-canonical-brief.md` before SEO/Copy/Design run. CONSIDER items go to the late red team on the built site.

**Both reviewers converged on the same blockers.** The copy doc's own self-check believes its proof numbers are allowed (percentages + counts per the SOUL bible); the canonical brief explicitly bans them. The brief wins. That conflict is the headline finding.

---

## MUST-FIX (honesty / legal — hard gate)

### MF-1 — Proof section is built on employer numbers, not owned builds (TOP PRIORITY)
**Quote:** Section 5 heading `Proof points (numbers, all sourced from NorthStar work):` and the bullets `Built automation that eliminated an estimated 1,000-plus hours of manual office work a year`, `Built the systems behind 14.5 percent average monthly revenue growth year over year, with zero added office headcount`, `Raised jobs completed per tech-day by 30 percent`, plus `Replaced paper trade-show lead capture...` and the `20-click daily routine into one click` dispatch tool.
**Why it fails:** Directly violates the brief's non-negotiable gate — "No NorthStar, ever, by name or implication," "No employer percentages as personal claims," "never 'I saved [employer] 1,000 hours.'" The heading literally sources the numbers to the employer. These are employer achievements framed as personal proof.
**Fix:** Delete all five employer numbers and the heading's NorthStar attribution. Rebuild the proof on the owned builds the brief blesses: the **MN-ITS extension** (privacy-first, local-only medical-claim data entry — currently absent from the proof section entirely and should anchor it), **ServiceTitan automation**, **Slack automation**, described as platform capability, not employer outcomes. Add soft capability framing ("automation like this can save a shop thousands of office hours a year"). Owned builds + honest unnamed-operator background carry the credibility.

### MF-2 — Employer fingerprint via geography + vertical
**Quote:** Section 5 `I ran service operations for a heating and cooling shop in Duluth: dispatch, scheduling, the phones...` and Section 6 `Then I ran service operations for a heating and cooling company`.
**Why it fails:** Duluth is a small market. "Service manager at a heating-and-cooling shop in Duluth" is trivially identifiable as NorthStar — implication, which the brief bans.
**Fix:** Keep the brief-approved operator framing ("ran service operations inside a real shop"). Delete the identifying specifics: drop "in Duluth" and generalize "heating and cooling" to a generic service business. The role stays, the fingerprint goes.

### MF-3 — Unbuilt security / uptime posture stated as present fact
**Quote:** FAQ `Your systems run on hardware I own and manage, here in the US. Access is locked down, your data is backed up, and it isn't getting sold, shared, or shipped off to some third party` and `your automations are backed up automatically and off-site, so a dead drive is never a dead business. I monitor the systems`.
**Why it fails:** Stated as current fact but the copy carries [VERIFY] markers — none of this infrastructure exists yet. Stating an unbuilt security posture to a customer is a false claim. The MN-ITS angle touches medical data, so a cautious lawyer kills it on sight.
**Fix:** Do not publish these answers until the backup, off-site, monitoring, and offboarding plans actually exist. Until then, soften to only what is genuinely true, or hold the data-safety / uptime / offboarding questions off the page. Treat every [VERIFY] as a real promise Bryan must stand behind in writing before it ships.

---

## CONSIDER (log for the built-site red team)

### C-1 — Operator phrasing safe alone, risky when re-paired
**Quote:** OG description `Built by someone who ran service operations inside a real shop, not a software salesman.`
**Note:** This exact phrasing is the brief-APPROVED honest framing and is fine on its own. It only becomes a fingerprint when co-located with Duluth + the vertical (MF-2). Logged so the build does not reintroduce the identifying pairing anywhere.

### C-2 — Trade-pun hero filters non-trades readers
**Quote:** H1 `The Other Tools of the Trade`.
**Note:** The pun is trade-flavored by design. An overwhelmed dental, medical-office, or property-management reader may not feel "trade" and could bounce before the FAQ reveals the broader fit. This is a documented tradeoff (gap analysis: home stays trades-flavored, verticals get their own neutral H1s), so CONSIDER not MUST-FIX. Verify on the built site that every vertical landing page carries a neutral H1, and that the subhead decodes the pun within the first screen.

### C-3 — Single CTA is right, label is high-friction
**Quote:** `Book a 30-minute call`.
**Note:** Keep ONE CTA (the brief is right to avoid lead-magnet dilution), but "book a 30-minute call" is a big ask for a cold visitor. Test a lower-risk label that promises a fit-check, not a commitment: "Find your first workflow," "Talk through one bottleneck," or "Get a fit check." The microline already lowers friction ("No pitch deck...") — align the button to it.

### C-4 — Differentiation altitude: generic until the operator story lands
**Quote:** Section 3 `What we actually build` and Section 4 `How it works`.
**Note:** Both read like a generic automation integrator until the "person who did the work" story appears lower on the page. Pull the owned-build examples and the one anonymized sample workflow (Section 8.5) earlier — above or beside the service cards — so the differentiator hits before the commodity offering list.

### C-5 — Tools-we-work-with overclaims untested integrations
**Quote:** `ServiceTitan, Housecall Pro, Jobber, QuickBooks, Google Workspace, Zapier, Make, Airtable... If you use it, we can probably wire it in.` [VERIFY]
**Note:** Lists integrations Bryan may not have actually shipped or tested. Becomes a MUST-FIX if the [VERIFY] copy survives to launch. Fix: trim to sourced platforms (ServiceTitan, QuickBooks, Google Workspace, Zapier) or soften the rest to "common systems we see in shops your size" framing, discovered-after-the-call, not a promise.

### C-6 — Hard pricing exposed to a cold visitor
**Quote:** `Ongoing automation partner: $1,000 a month.`
**Note:** Transparent pricing builds trust, but the monthly number can bounce a cold small-shop owner before they grasp the value. Keep it transparent, but ensure the break-even line ("if this saves your team 10 to 15 office hours a month, it's already paying for itself") sits immediately adjacent to the number, never the figure standing alone.

---

## Verdicts on the brief's explicit questions
- **Positioning (trades-first, any-SMB-second):** Coherent, because the structure splits the load — trades-flavored home hero, vertical-neutral landing pages, FAQ that names the broader verticals. The only blur is at the hero line itself (C-2).
- **Hero pun:** Lands fast *if* the subhead decodes it on the first screen (it does, in the locked copy). Too clever only for non-trades readers (C-2). Hold the pun on home, keep neutral H1s on verticals.
- **Single CTA (book a call):** Right call. One action, no lead-magnet competition. Only the label needs softening (C-3).
- **Differentiation:** The operator story is the differentiator and it is strong — but it sits too low (C-4). The offering list alone is generic.
