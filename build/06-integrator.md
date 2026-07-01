# Role Brief 06 — Integrator / QA (owns the verification loop)

**Model + tools:** Fable or Claude, in Claude Code, with `verify`, `run`, `code-review`.
**Position in pipeline:** last. You merge the red-team fixes and run the master verification loop until the site is provably done.

## Read first
- `00-canonical-brief.md`, `BUILD-PLAN.md` (the verification-loop section)
- `~/Projects/mango-catalyst/AGENTS.md` + the relevant bundled `node_modules/next/dist/docs/` (Next 16.2.2 breaking changes; re-check against these before applying any code fix)
- `build/out/redteam-findings.md` (the MUST-FIX list)

## Your job
1. Apply the red-team MUST-FIX items to the repo (or route them back to Copy/Design and re-pull).
2. Run the **master verification loop** below. Fix every failure, re-run, repeat until green. **Cap: 5 passes**, then STOP and escalate the stuck item(s) to Bryan with the exact failure. No infinite loops.
3. Rerun the `answer-engine-seo` skill against the Vercel preview.
4. Confirm production is HELD until the LLC is formed. Deploy to PREVIEW only.

## Master checklist

**Auto-checkable (run every pass via explicit commands; label MANUAL anything that cannot be automated here, do not silently skip it):**
- [ ] `npm run build` succeeds, `npx tsc --noEmit` clean, `npm run lint` clean.
- [ ] Lighthouse mobile: Performance / Accessibility / SEO all 95+, via `npx lighthouse <preview-url> --only-categories=performance,accessibility,seo --form-factor=mobile` (MANUAL if the CLI cannot run here).
- [ ] SSR proof, per route: `curl -s <preview-url>` raw HTML (JS off) contains the hero H1 ("The Other Tools of the Trade"); `curl -s <preview-url>/faq` contains the FAQ questions; each guide URL contains its H1.
- [ ] Valid, server-rendered JSON-LD per page (Home = LocalBusiness, NO FAQPage; FAQ = FAQPage; service/industry = Service + BreadcrumbList; guides = Article), validated with a JSON-LD linter or the `answer-engine-seo` schema check.
- [ ] Honesty grep: zero "NorthStar" in `src/` and `content/`; zero occurrences of "1,000 hours", "14.5", and "30%" (flag any hit; a cited public non-employer benchmark is the only allowed exception per `00`); zero em/en dashes; no phone number; personal-claim phrasing ("I saved", "we grew X%") flagged; ServiceTitan / Slack / Zapier / Google Workspace appear only as capability areas, never as built systems.
- [ ] Hero motion is lazy / CSS-first, has a static fallback, honors `prefers-reduced-motion` + mobile (no WebGL mesh unless Bryan approved the hero direction; see `build/out/hero-direction-options.md`).
- [ ] No `/blog` routes; 3 undated evergreen guides present; `/privacy` present and footer-linked.
- [ ] Contact form posts to the configured route-handler endpoint AND rejects a bot-style submission (honeypot / minimum-fill-time); email present; internal links resolve; canonical + sitemap + robots correct.
- [ ] Vercel Web Analytics + Speed Insights installed; CTA-click event fires on the preview. Booking-completed needs a live test booking, so it is MANUAL: verify once the Cal.com env var is set; if the account is not ready, verify the honest fallback renders and label booking-completed MANUAL/BLOCKED, not failed.
- [ ] Default favicon replaced (favicon + apple-touch-icon); branded not-found and error pages render.
- [ ] $795 and $1,000/month visible on the preview; retainer terms match the decided D1 language.
- [ ] Guide paths match the URL map in `build/out/seo-spec.md`.
- [ ] Zero 30-minute duration mentions; no revenue band in the FAQ; no medical/dental in the fit sentence; no present-fact hosting/monitoring/backup/offboarding claims in ANY section (MF-3); no sold/shared/third-party blanket promises; no speed promises beyond reply-within-1-business-day / fixes-within-2-to-3-business-days; no published client-capacity count.

**Human / red-team-judged (must be signed off):**
- [ ] MANUAL: Bryan picked the hero direction AND the section palette from the preview mockups (D7); neither was silently defaulted; both recorded in `build/out/design-notes.md`.
- [ ] No fabricated people or faces in any shipped imagery or placeholder; if About shows a headshot, it is Bryan's supplied real photo (AI-stylized per D8), otherwise About is type-only.
- [ ] Hero clears the designer's bar; the chosen hero direction (per `build/out/hero-direction-options.md`) reads crafted, not AI-slop.
- [ ] Voice is SOUL; claims soft + honest; proof follows `00` (MN-ITS = the one owned build; ServiceTitan / Slack / Zapier = capability areas only; method as proof texture).
- [ ] 80 to 90% grounded-industrial, not generic SaaS. One clear CTA, scannable for an owner/office reader.

## Output
- A green preview deployment.
- `build/out/verification-report.md`: what passed, what was escalated, the preview URL, and the explicit note that production is held pending the LLC.

## Done
Auto-checks green AND red-team MUST-FIX list empty. Then HOLD for LLC. That is the only definition of done.
