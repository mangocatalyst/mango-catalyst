# Role Brief 01 — SEO / AEO Architect

**Model + tools:** Fable, in Claude Code, with the `answer-engine-seo` skill.
**Position in pipeline:** runs after the brief is challenged (E1). Feeds Copy (02) and Design (03). You are UPSTREAM: you decide what pages exist and what each must contain.

## Read first
- `00-canonical-brief.md` (source of truth)
- `~/Documents/AI Vault/projects/mango-catalyst/seo-plan-2026-06-14.md` (the v2 plan, your starting point)
- `~/Projects/mango-catalyst/SEO-FOUNDATION.md` (what's already built: robots, sitemap, JSON-LD builders, constants)
- The two competitor audits (cannibalization + AI-search learnings)

## Your job
Turn the brief into a concrete SEO/AEO architecture the downstream agents build to. Specifically:
- **Page + URL map** for the MVP set, each with a single primary keyword + search intent.
- **Per-page schema spec** (which JSON-LD type each page emits; builders live in `src/lib/jsonld.ts`): Home = LocalBusiness (NO FAQPage); Services/Industry = Service + BreadcrumbList; guides = Article **(NOTE: no Article builder exists yet; spec that an `articleLd` builder be ADDED to `src/lib/jsonld.ts`)**; FAQ = FAQPage **on the FAQ page only** (must match visible content). FAQPage value is AEO citability (ChatGPT / Perplexity lift the answers), NOT Google rich results (deprecated for non-gov/health sites in 2023). `/privacy` exists (added 2026-07-01): footer link only, keep it out of the money-page internal-linking plan.
- **Answer-first structure** per page (the question each section answers, in plain language, so answer engines can lift it).
- **Internal linking plan** (money pages <-> industry pages <-> guides).
- **Cannibalization guardrails:** the industry x geo pages must not compete with Home or each other. Spell out how each differs.
- **Local SEO:** GBP, NAP consistency (service-area, no street address for a home business), local schema. Sequencing (decided 2026-07-01): LLC confirms the exact name string "Mango Catalyst", then GBP as a service-area business (base city Duluth), then verify `constants.ts` matches before production deploy.
- **Launch indexing:** verify the domain in Google Search Console AND Bing Webmaster Tools (ChatGPT search rides Bing's index); optional IndexNow key file.
- Confirm the blog is gone and the value moved to evergreen guides + FAQ + answer-first money pages.
- The guide URL prefix is an open choice and yours to make; lock it in the URL map in `build/out/seo-spec.md`. The slugs themselves (`hvac-tasks-to-automate`, `manual-data-entry-cost`, `what-is-automation-consultant`) never change.
- **State the honest launch expectation in the spec (red-team #8):** a brand-new domain ranks near zero at launch regardless of schema. Frame launch SEO as brand + local + long-tail SEED, keep the set-and-forget surfaces, and TIGHTEN internal linking among the existing MVP pages. Do NOT add new vertical pages now (Phase 2).

Run the `answer-engine-seo` skill against the plan to pressure-test citability and crawlability.

## Hard constraints
- SSR/citability: content must be server-rendered, never trapped in client-only JS/WebGL.
- One primary keyword per page, no two pages targeting the same query.
- Titles within ~60 chars, meta descriptions ~150 to 160.

## Output
`build/out/seo-spec.md`: the page/URL map, per-page keyword + intent + schema + meta + answer-first outline + internal-link plan + cannibalization notes.

## Self-verify (loop until green before handoff)
- [ ] Every MVP page has: primary keyword, intent, schema type, title, meta description. Exception: `/privacy` is footer-linked only, no keyword target, noindex optional.
- [ ] Home has LocalBusiness (no FAQPage); FAQ page has FAQPage; industry/service have Service + BreadcrumbList; guides emit Article via the new `articleLd` builder.
- [ ] No two pages target the same query; each industry/geo page has a stated differentiator.
- [ ] Internal-link plan present. Local SEO + service-area (no street address) handled.
- [ ] `answer-engine-seo` skill run, its blocking findings resolved or logged.

## Handoff
Hand `seo-spec.md` to Copy (02). Flag anything that changes page structure to Design (03).
