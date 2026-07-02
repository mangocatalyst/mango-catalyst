# Verification Report (integrator 06, oneshot-build)

Date: 2026-07-01. Verifier: role 06 (Fable 5, Claude Code). All curl/SSR/schema/honesty checks ran against a LOCAL production server (`npm run build && PORT=3900 npm start`), per process; Vercel previews are SSO-protected and were not curled. Loop closed in 4 passes (cap 5).

## What was merged

Into `oneshot-build`, in order, all clean (no conflicts): `page-0` (about), `page-1` (services), `page-2` (industries/hvac), `page-3` (faq), `page-4` (contact + /api/contact), `page-5` (privacy), `page-6`, `page-7`, `page-8` (the three guides), then `logo-assets` (favicon set, og.png, logo SVGs; default Next favicon deleted).

## Integrator fixes applied during the loop

1. `@vercel/analytics` + `@vercel/speed-insights` installed and mounted in `src/app/layout.tsx`; `cta_click` event wired via one delegated client listener (`src/components/analytics/CtaTracker.tsx`) reading `data-cta` off the server-rendered Button anchors (render-parity preserved: no copy moved into client components). MobileNav's hand-rolled CTA tagged too.
2. `/guides` index was still the staged placeholder ("Full page on the way") while sitemap advertised it. Built from `build/out/copy/guides-index.md` verbatim per seo-spec 2.7: slim intro + three descriptive-anchor links, BreadcrumbList, canonical, no in-body CTA.
3. `src/lib/constants.ts`: `ogImage: "/og.png"` and `logo: "/icon.png"` now that logo-assets shipped the files (email/telephone stay "" per constants discipline). Explicit `icons` metadata (favicon.ico 48, icon.png 512, apple-touch-icon) added to layout.
4. The three guide Article nodes now emit `image` (og.png), clearing the schema-lint "missing recommended Article.image" note.

## Auto-checks: PASS

- `npm run build` green (15 routes), `npx tsc --noEmit` clean, `npm run lint` clean.
- Lighthouse mobile via CLI vs localhost, labeled LOCAL: home 96/100/100 (perf/a11y/seo; one cold-start run read 93, two warm runs 96), faq 97/100/100, contact 95/100/100, guides/manual-data-entry-cost 97/100/100, industries/hvac 97/100/100. All 95+.
- SSR proof (curl, JS off): home H1 "The Other Tools of the Trade" in raw HTML; all 9 FAQ questions present as h2s; every guide H1 present; all 13 routes 200.
- JSON-LD server-rendered and parse-valid on every page: Home = Organization + WebSite + ProfessionalService (LocalBusiness), NO FAQPage; FAQ = FAQPage (only page emitting it, 9 questions, single-source parity with visible copy) + BreadcrumbList; services + industries/hvac = Service + BreadcrumbList; guides = Article (author, publisher, dates, image) + BreadcrumbList; guides index/about/contact = BreadcrumbList; privacy/not-found = site-wide only.
- Honesty grep (src/, public/, and rendered text of all pages): zero "NorthStar"; zero "1,000 hours" / "14.5" / "30%" (only hits are CSS gradient stops in globals.css, not copy); zero em/en dashes (raw + entity forms); no phone number anywhere; no "I saved/we grew" personal claims; ServiceTitan / Zapier / Slack / Google Workspace appear only as "I work in" capability areas; MN-ITS extension is the single owned-build claim.
- Hero motion: CSS-only, gated behind `prefers-reduced-motion: no-preference` AND `min-width: 48rem`, `both` fill with visible static base state (mobile + reduced motion get the static hero). No WebGL, no canvas, zero `<img>` sitewide (no fabricated faces; About ships type-only).
- No `/blog` routes; 3 undated evergreen guides at the exact seo-spec URLs; `/privacy` present and footer-linked.
- Contact form: legit POST 200/logged; honeypot-filled and too-fast submissions silently dropped (server log confirms, bot still sees success); missing/invalid fields 400; native form post 303s to `/contact?sent=1#note`.
- Internal links: every internal href across all pages resolves 200. Canonicals correct per page (guides index was the gap; fixed). Sitemap lists exactly the 11-page map; robots allows all + points at the sitemap.
- Default favicon replaced (favicon.ico + icon.png + apple-touch-icon.png served, linked in head); branded not-found ("That page ran off.") and branded error.tsx render.
- $795 and $1,000/month visible on Home pricing; retainer language matches the decided copy (month to month, reply within 1 business day, fixes within 2 to 3 business days). Zero 30-minute mentions; no revenue band in FAQ; no medical/dental vertical in the fit sentence (FAQ "NOT for" declines patient-health-record work per locked copy); no hosting/monitoring/backup/offboarding present-fact claims; no blanket sold/shared promises (FAQ explicitly refuses the blanket promise); no speed promises beyond the two allowed; no client-capacity count.
- answer-engine-seo audit (`run_audit.py --render` + `schema_lint.py` vs localhost): render-parity PASS (word/link/JSON-LD delta 0 on all sampled pages), all citation bots allowed, zero schema errors, zero required-field failures. Remaining findings are advisory only (optional Organization.sameAs/contactPoint, WebSite.potentialAction, GEO content-feature notes on locked copy, PSI lane skipped: needs API key + public URL).

## MANUAL / BLOCKED (not failures)

- **booking-completed analytics event: MANUAL/BLOCKED.** No `NEXT_PUBLIC_CAL_URL` (Cal.com account pending from Bryan). Verified the honest fallback renders instead ("The scheduler is being set up. Use the form below...") and the `?booked=1` confirmation state exists for when the embed lands.
- **cta_click live fire + Web Analytics/Speed Insights beacons: MANUAL on the Vercel preview.** The scripts only load on Vercel; locally the components render nothing (by design). Code path verified: `data-cta` present on every CTA anchor, tracker mounted in layout.
- **Lighthouse on the real preview: MANUAL.** Local numbers pass 95+, but previews are SSO-protected so the CDN-served numbers could not be measured here.
- **Public email: confirm with Bryan.** `hello@mangocatalyst.com` ships on /privacy because the locked privacy copy contains it verbatim; `SITE.email` stays "" (schema + CTA fallback omit it) until Bryan confirms the inbox exists.
- **Human-judged sign-offs** (per 06 checklist): hero clears the designer bar, voice is SOUL, 80-90% grounded-industrial. Bryan's picks were NOT defaulted: hero A + palette B + Big Shoulders recorded in design-notes.md.
- **PSI/CrUX field data:** not measurable pre-launch (no key, no public traffic). Coverage gap, not a failure.
- **Contact delivery key + provider verified: MANUAL, launch-gating.** The route sends via Resend when `CONTACT_DELIVERY_KEY` (+ `CONTACT_TO` or `SITE.email`) is set; without them it is log-only, and Vercel console logs are ephemeral, so a launch without a verified key silently loses leads while /privacy promises email delivery. Before launch: set the key + destination on Vercel, submit the form on the deployed site, and confirm the email lands in the business inbox.

## Escalations

None. No checklist item is stuck; nothing hit the 5-pass cap.

## Production hold

Production deploy is HELD pending the LLC. This branch (`oneshot-build`) is PREVIEW ONLY; nothing here touches `main` or production.
