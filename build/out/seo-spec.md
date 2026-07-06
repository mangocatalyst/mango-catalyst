# SEO/AEO Spec, mangocatalyst.com (Role 01 output)

**Date:** 2026-07-01. **Author:** SEO/AEO architect (role 01).
**Feeds:** Copy (02) and Design (03). Canonical brief (`build/00-canonical-brief.md`) wins on any conflict about WHAT we build; this spec owns page architecture, keywords, schema, meta, and linking.
**Foundation:** builds ON the committed `seo-foundation` work (`SEO-FOUNDATION.md`): `src/lib/constants.ts`, `src/lib/jsonld.ts`, `src/components/seo/JsonLd.tsx`, `src/app/robots.ts`, `src/app/sitemap.ts`, layout metadata. Keep all of it.

---

## 0. Honest launch expectation (read this before anything else)

A brand-new domain ranks near zero at launch, regardless of how good the schema and structure are. Launch SEO for this site is a **brand + local + long-tail SEED**, not a day-one acquisition engine. What we are buying at launch:

1. **Brand queries** ("mango catalyst") resolve correctly and look right when shared.
2. **Local surface** (GBP + LocalBusiness schema + NAP) starts accruing from day one.
3. **Long-tail seeds** (the three guides + the HVAC page) are indexed, answer-first, and citable by AI engines, so they can accrue slowly with zero maintenance.
4. **Set-and-forget correctness**: SSR, schema, sitemap, robots, internal links are all things you do once and never babysit.

Do NOT add new vertical pages now (Phase 2). Do NOT expect search traffic in month one. The conversion job at launch is done by direct/referral/word-of-mouth traffic landing on a fast, honest, well-structured site.

---

## 1. Page + URL map (MVP, locked)

**Guide prefix decision (mine to make, now locked): `/guides/`.** Rationale: "guides" signals evergreen, undated reference content (the brief killed the blog framing); it is honest about what the content is; it gives Article pages a clean breadcrumb trail (Home > Guides > Title). The three slugs never change. The repo's `/blog` routes and `src/lib/blog.ts` are renamed/removed (see section 10).

**Industry slug decision: keep `/industries/hvac`** (already scaffolded, already in `STATIC_ROUTES`). The geo target ("Minnesota") lives in the title, H1, and copy, NOT the URL. This keeps the URL durable if the geo focus widens, and avoids minting near-duplicate geo URLs (the Avoca cannibalization lesson).

| # | URL | Page | Primary keyword | Intent | JSON-LD (beyond site-wide Org + WebSite in layout) |
|---|-----|------|-----------------|--------|------------------------------------------------|
| 1 | `/` | Home (single-page scroll) | small business automation Minnesota | Commercial / brand head | LocalBusiness (ProfessionalService). **NO FAQPage.** |
| 2 | `/services` | Services grid | automation services for small business | Commercial | Service + BreadcrumbList |
| 3 | `/industries/hvac` | HVAC vertical (Phase 1 wedge) | HVAC business automation | Commercial, vertical long-tail | Service + BreadcrumbList |
| 4 | `/about` | Operator story | automation consultant Duluth | Navigational / local trust | BreadcrumbList |
| 5 | `/faq` | Objection handling | business automation FAQ (decision questions) | Informational / decision | **FAQPage** (only page that emits it) + BreadcrumbList |
| 6 | `/contact` | Booking + message form | brand navigational ("book a call") | Transactional | BreadcrumbList |
| 7 | `/guides` | Slim guides index (intro + 3 links) | none (hub page, no keyword target) | Navigational | BreadcrumbList |
| 8 | `/guides/hvac-tasks-to-automate` | Guide | HVAC tasks to automate | Informational | **Article** (new builder) + BreadcrumbList |
| 9 | `/guides/manual-data-entry-cost` | Guide | cost of manual data entry | Informational | Article + BreadcrumbList |
| 10 | `/guides/what-is-automation-consultant` | Guide | what is an automation consultant | Informational | Article + BreadcrumbList |
| 11 | `/privacy` | Privacy policy | none (footer-linked only) | Legal | none |

Rules that hold across the map:

- **One primary keyword per page. No two pages target the same query** (cannibalization table in section 6 proves it pairwise).
- Every page self-canonicals via `alternates: { canonical: "<path>" }` (layout deliberately does not set a global canonical).
- All indexable pages appear in `sitemap.ts` via `STATIC_ROUTES` (guides can be listed statically or globbed from `src/content/guides/`; the sitemap's non-empty-file check stays, so unwritten guides are never advertised).
- `/privacy`: indexable is fine (noindex optional, not required; an indexed privacy policy is trust-positive and competes with nothing). Footer link ONLY. It is excluded from the money-page internal-link mesh, the nav, and the answer-first program.
- `/guides` index exists so the three Article pages have a crawlable hub and a real breadcrumb parent, and so the nav needs only one "Guides" link. Keep it slim: one intro paragraph + three descriptive-anchor links. It targets no keyword and must not grow content that competes with the guides themselves.

---

## 2. Per-page spec: title, meta description, H1, answer-first outline

All titles below are the FULL rendered string and fit within 60 chars (verified programmatically). The layout template is `%s | Mango Catalyst`; per-page `title` values are the part before the pipe (except Home, which overrides the default title directly). Descriptions are 145 to 160 chars (verified). Copy (02) may rewrite wording but must keep: the primary keyword near the front of the title, the length budgets, the honesty gate (no employer fingerprints, no banned figures), and the CTA string "Book a 15-minute fit call".

### 2.1 Home `/`

- **Title (56):** `Small Business Automation in Minnesota | Mango Catalyst`
- **Meta description (160):** `Automation that takes invoicing, scheduling, and follow-up off your plate. Built by someone who ran the operation inside a real shop. Book a 15-minute fit call.`
- **H1 (exactly one):** `The Other Tools of the Trade` (locked). The subhead must decode the pun within one line and carry the plain-English office-work list; that subhead is what AI engines will lift as the "what is this site" answer, so it must stand alone: what we do, for whom, where.
- **Answer-first structure** (each scroll section opens with an `<h2>`, has an `id` for jump links, and its first 2 to 3 sentences directly answer the section's question before any narrative):

| Section (id) | The question it answers |
|---|---|
| Hero (`#top`) | What is Mango Catalyst and what do I do next? |
| Problem (`#the-problem`) | Why is my office work eating the day? |
| What we do (`#services`) | What kinds of busywork can actually be automated? |
| Credibility strip (`#proof`) | Why should I trust this person? (MN-ITS anchor + capability areas + method, per the 00 honesty gate) |
| How it works (`#how-it-works`) | What happens after I book: discovery, plan, build? |
| Pricing (`#pricing`) | What does it cost? ($795 setup + $1,000/month, terms per 00) |
| FAQ teaser (`#faq`) | What are the top 3 objections? (3 Q summaries, each linking to `/faq`) |
| Final CTA (`#book`) | How do I book the 15-minute fit call? |

- **Schema:** `graph(localBusinessLd())` on the page (Org + WebSite already come from layout). **NO `faqPageLd` on Home**, even though a FAQ teaser section renders: the teaser is 3 one-line summaries linking to `/faq`, not full Q&A, so marking it up would both violate the visible-content rule and cannibalize `/faq`.
- **Differentiator:** the ONLY page targeting the broad geo head term. It sells the whole offer; every other page is a deeper slice that links back here.

### 2.2 Services `/services`

- **Title (57):** `Automation Services for Small Businesses | Mango Catalyst`
- **Meta description (156):** `Invoicing, lead follow-up, scheduling, reporting, and data entry that run on their own. We connect the tools you already pay for. Book a 15-minute fit call.`
- **H1:** contains "automation services" (e.g. `Automation services for small businesses`). Vertical-neutral.
- **Answer-first outline:** open with a 2 to 3 sentence direct answer to "what automation services does Mango Catalyst offer?", then the card grid (each card `<h3>`: invoicing/billing, lead capture + follow-up, scheduling/dispatch, reporting, tool connection, data entry/cleanup), then ONE bottom CTA. Each card's first sentence is a self-contained answer to "can I automate X?".
- **Schema:** one `serviceLd({ name: "Business Automation Services", ... })` node for the page + `breadcrumbLd([Home, Services])`. Do NOT emit six Service nodes for six cards; one page = one service entity, cards are `<h3>` content.
- **Differentiator vs Home:** Home targets the geo head query and converts on one scroll; `/services` targets the service-intent generic query and goes one level deeper per offering. No geo term in its title or H1.

### 2.3 Industries / HVAC `/industries/hvac`

- **Title (54):** `HVAC Business Automation in Minnesota | Mango Catalyst`
- **Meta description (150):** `Stop doing invoicing, dispatch updates, and follow-up by hand. Office automation for Minnesota HVAC and home-service shops. Book a 15-minute fit call.`
- **H1:** contains "HVAC" + "automation" (e.g. `HVAC business automation in Minnesota`). Do NOT reuse the Home pun.
- **Answer-first outline:** (1) direct answer: what HVAC office work can be automated, for whom, in one paragraph; (2) HVAC-specific pains (dispatch board churn, seasonal call surges, post-job invoicing lag, trade-show lead piles) written for THIS vertical, not find-replace from Home; (3) HVAC-specific automation outcomes (kind-of-outcome language only, no magnitudes, per 00); (4) capability line: "I work in ServiceTitan, Zapier, Google Workspace" as platforms, never built systems; (5) CTA.
- **Schema:** `serviceLd({ name: "HVAC Business Automation", areaServed: "Minnesota", url: SITE.url + "/industries/hvac", ... })` + `breadcrumbLd([Home, Industries, HVAC Business Automation])`. (No `/industries` index page exists in MVP; the breadcrumb's middle item may point at `/industries/hvac` itself or be dropped to a two-item trail. Prefer the two-item trail: Home > HVAC Business Automation. Do not mint an `/industries` index just for a breadcrumb.)
- **Differentiator vs Home:** vertical keyword vs geo head keyword; owner-facing HVAC pains vs general SMB pains; distinct H1, title, examples. Home mentions HVAC once, as the wedge line, linking here with a keyword anchor.
- **Differentiator vs the HVAC guide:** this page SELLS (commercial intent, service schema, CTA-heavy); the guide EXPLAINS (informational, Article schema, task-ranking content). The guide links here for "ready to hand it off"; this page links to the guide for "not sure what to automate first".
- **Pattern note for Phase 2 verticals:** each future vertical page must repeat this differentiation (own pains, own examples, own keyword) or not exist. Never templated find-replace (Avoca `/analytics/<trade>` lesson).

### 2.4 About `/about`

- **Title (52):** `Automation Consultant in Duluth, MN | Mango Catalyst`
- **Meta description (158):** `Mango Catalyst is Bryan, an automation consultant in Duluth, MN who ran service operations inside a real shop. One person who builds it, runs it, and answers.`
- **H1:** the copy doc's "Who you're actually working with" pattern is fine; keyword lives in title/meta, not forced into the H1.
- **Answer-first outline:** first paragraph directly answers "who am I hiring?" (one person, Duluth, ran service operations inside a real shop, builds and runs the systems). Then the honest background story per 00 (no employer name, no "in Duluth" + "heating and cooling" employer fingerprint; "based in Duluth" as BRYAN's location is fine and load-bearing for local SEO).
- **Schema:** `breadcrumbLd([Home, About])`. A `Person` node is a cheap E-E-A-T add but is NOT in scope for MVP (no builder, and the author entity ships on guides instead; see 2.8). Phase 2 candidate.
- **Differentiator vs Home:** person + local-trust query vs business + geo head query. About is where "who is behind this" answers live; Home only teases it in the credibility strip.
- **Note:** ships type-only if the stylized real headshot is not ready (00 people rule).

### 2.5 FAQ `/faq`

- **Title (58):** `Business Automation FAQ, Straight Answers | Mango Catalyst`
- **Meta description (152):** `Straight answers on business automation: what it costs, whether it replaces people, how your data is handled, and who it is not for. No sales runaround.`
- **H1:** e.g. `Straight answers` with a keyword-bearing intro line, or a keyword H1; copy's call, but each question is an `<h2>` phrased exactly as an owner would ask it (question-shaped headings are the AEO surface here).
- **Question set** (from the locked copy Section 8, REWRITTEN per the 00 honesty gate; MF-3 language for data handling, no "never shared", no aspirational infrastructure claims, medical/dental stays OUT of the fit answer until attorney review):
  1. Is this going to replace my people?
  2. Is my data safe? (MF-3 compliant: never sold, wired only into the tools we agree to automate; MN-ITS local-only design as the concrete example, not an infrastructure promise; specifics scoped on the fit call)
  3. What happens if something breaks? (honest monitoring/fix terms per D1: reply within 1 business day, fixes 2 to 3 business days)
  4. If I cancel, what happens to my data and automations?
  5. Who is this NOT for?
  6. I already pay for software I barely use. How is this different?
  7. How long until the first automation is working?
  8. What kind of businesses do you work with? (pain + under-25 headcount; NO revenue band, per 00)
  9. Do I have to sign a long contract?
- **Answer-first rule:** every answer's FIRST sentence is the direct answer (yes/no/number), then the explanation. This is what ChatGPT/Perplexity lift.
- **Schema:** `faqPageLd(items)` where `items` is built from the SAME array that renders the visible Q&A (single source of truth in the page component, so schema/content parity is structural, not manual) + `breadcrumbLd([Home, FAQ])`. **This is the ONLY page that emits FAQPage.** Value framing: AEO citability (answer engines lift Q&A pairs), NOT Google rich results (deprecated for non-gov/health sites in 2023). Do not gate launch on rich-result appearance.
- **Differentiator:** owns decision/objection questions. The guides own their three informational topics; where an FAQ answer grazes a guide topic (e.g. cost), the FAQ answer is 2 to 4 sentences + a descriptive-anchor link to the guide, never a duplicate of the guide's content.

### 2.6 Contact `/contact`

- **Title (42):** `Book a 15-Minute Fit Call | Mango Catalyst`
- **Meta description (152):** `Book a 15-minute fit call with real time slots, or send a note about the task eating your week. Based in Minnesota, serving the upper Midwest. No pitch.`
- **H1:** booking-first (e.g. `Book a 15-minute fit call`).
- **Answer-first outline:** (1) the scheduler embed (Cal.com; env-var URL; honest fallback state per 00: message form + "I confirm a time within one business day" if the env var is empty); (2) the short message form (name, email, business, "what's eating your time?"); (3) service-area line: "based in MN, serving the upper Midwest". NO phone, anywhere.
- **Schema:** `breadcrumbLd([Home, Contact])` only. (A ContactPage type adds nothing here; the LocalBusiness node on Home already carries email + area served.)
- **Booking confirmation state** must exist (pass-2 CONSIDER item): confirmation UI + expectation copy.

### 2.7 Guides index `/guides`

- **Title (60):** `Automation Guides for Small Business Owners | Mango Catalyst`
- **Meta description (145):** `Plain-English guides on automating small business office work: what to automate first, what the busywork really costs, and who to hire to fix it.`
- **H1:** `Automation guides` or similar. One intro paragraph + three links with descriptive anchors (the guide titles). Nothing else. No dates, no "latest posts" framing, no pagination.
- **Schema:** `breadcrumbLd([Home, Guides])`.

### 2.8 The three guides (written from scratch; the 0-byte `.mdx` files have no drafts to reuse)

Common rules: undated on the visible page (no blog framing); server-rendered MDX; each opens with a 2 to 4 sentence direct answer to its title question (the extractable passage); question-shaped `<h2>`s throughout; each guide cites at least one real public source where it states a number (GEO "statistics + cite sources" levers, applied only where natural); each ends with ONE soft CTA to a money page. No employer figures, ever; public benchmarks only, cited.

**Schema: Article via a NEW `articleLd` builder that must be ADDED to `src/lib/jsonld.ts`** (none exists). Spec for the builder:

```ts
/** Article for evergreen guides. Dates go in schema (truthful), not on the visible page. */
export function articleLd(opts: {
  headline: string;      // <= 110 chars
  description: string;
  url: string;           // absolute
  datePublished?: string; // ISO 8601; real first-publish date
  dateModified?: string;  // ISO 8601; real last-edit date
  image?: string;         // absolute URL; omit until a real OG/guide image exists
}): Json {
  const node: Json = {
    "@type": "Article",
    headline: opts.headline,
    description: opts.description,
    url: opts.url,
    mainEntityOfPage: opts.url,
    author: { "@type": "Person", name: "Bryan Koop", url: `${SITE.url}/about` },
    publisher: { "@id": ORG_ID },
  };
  if (opts.datePublished) node.datePublished = opts.datePublished;
  if (opts.dateModified) node.dateModified = opts.dateModified;
  if (opts.image) node.image = opts.image;
  return node;
}
```

Notes: follows the file's existing discipline (omit empty fields, no fabricated assets); `author` links the About page as the Person's URL (cheap E-E-A-T entity wiring, no social links). Dates in schema with no visible dates is fine for Article (the visible-content parity rule is FAQ/HowTo-specific); keep the dates truthful. One-line Bryan veto: the public author name string "Bryan Koop" (site copy says only "I'm Bryan"; the full name is already public on his resume site).

Per guide:

| Guide | Title (len) | Meta description (len) | Answer-first outline (each h2 a question) |
|---|---|---|---|
| `/guides/hvac-tasks-to-automate` | `HVAC Tasks to Automate First | Mango Catalyst` (45) | `The HVAC office tasks worth automating first: invoicing, dispatch updates, lead follow-up, and reporting, ranked by payoff for a small shop. No jargon.` (151) | Direct answer: the 4 to 6 tasks, ranked. Then per task: What does automating X look like? / What stays human? Close: How do I pick the first one? CTA link to `/industries/hvac`. |
| `/guides/manual-data-entry-cost` | `The Real Cost of Manual Data Entry | Mango Catalyst` (51) | `What manual data entry really costs a small business: the hours, the error rate, and the math, plus how to spot the worst double-keying in your office.` (151) | Direct answer: the cost formula (hours x loaded rate + error cost), with a cited public benchmark for error rates. Then: How do I count the hours? / Where does double-keying hide? / When is it worth fixing? CTA link to `/services` (data-entry card anchor). |
| `/guides/what-is-automation-consultant` | `What Is an Automation Consultant? | Mango Catalyst` (50) | `What an automation consultant actually does, what one costs, and how to tell if your business needs one. A plain-English guide for small shop owners.` (149) | Direct answer: definition in 2 sentences. Then: What do they actually do day to day? / What does one cost? (general market framing + our public pricing as one data point) / Do I need one, or an employee, or software? / What should I ask before hiring one? CTA link to `/about` + `/contact`. |

Cannibalization inside the trio: task-selection vs cost-math vs role-definition; three distinct informational queries, no overlap. The cost guide answers "what does manual work cost"; the FAQ answers "what does Mango Catalyst cost"; different questions.

### 2.9 Privacy `/privacy`

- **Title (31):** `Privacy Policy | Mango Catalyst`
- **Meta description (146):** `What the Mango Catalyst site collects, how contact form submissions are delivered, what analytics run, and how to ask for your data to be removed.`
- Plain-English policy per 00 (form data, email delivery, Vercel analytics, no selling, deletion contact). Footer link only. No keyword target, no schema, excluded from the internal-link mesh and the nav. May stay in the sitemap. Attorney review rides the LLC gate.

---

## 3. OG / link-preview (word-of-mouth infrastructure, allowed under no-social)

- Every page: `og:title`, `og:description`, `og:image`, `og:url`, `twitter:card=summary_large_image` (the layout already defaults these; per-page `generateMetadata`/`metadata` overrides title + description to match section 2 values).
- ONE OG image template (1200x630): deep navy, wordmark, headline text, amber accent. Home uses the H1; sub-pages can share the default image at MVP (per-page OG images are Phase 2 polish). Design (03) produces `public/og.png`; set `SITE.ogImage = "/og.png"` in constants at that point (the builders and layout already gate on it).
- No `sameAs`, no social links, anywhere (existing builders already comply).

---

## 4. Schema summary (who emits what)

| Layer | Nodes | Where |
|---|---|---|
| Layout (site-wide) | Organization (+contactPoint once email is set, +logo once it exists), WebSite | already built, keep |
| Home | LocalBusiness (ProfessionalService, service-area address: city Duluth, region MN, NO street, NO phone) | `localBusinessLd()`, already built |
| `/services`, `/industries/hvac` | Service + BreadcrumbList | `serviceLd()` + `breadcrumbLd()`, already built |
| `/faq` | FAQPage (visible-content parity via shared data array) + BreadcrumbList | `faqPageLd()`, already built |
| Guides | Article + BreadcrumbList | **`articleLd()` NEW, add to `src/lib/jsonld.ts` per 2.8** |
| `/about`, `/contact`, `/guides` | BreadcrumbList | already built |
| `/privacy` | none | n/a |

Mechanics (already enforced by the foundation, do not regress): one `<script type="application/ld+json">` per page via `graph(...)`; server-rendered via the `JsonLd` server component (never `"use client"`); empty constants omitted so no guessed email/phone/assets ship.

---

## 5. Internal linking plan

**Principles:** every indexable page reachable within 2 clicks of Home; descriptive keyword anchors, never "click here"; money pages (Home, `/services`, `/industries/hvac`, `/contact`) get the most inbound links; `/privacy` gets exactly one (footer).

**Header nav (slim, global):** Services, HVAC (or "Industries" once more verticals exist), Guides, FAQ, About + the CTA button "Book a 15-minute fit call" (to `/contact`, or opens the scheduler). On Home the nav may additionally expose scroll jump links (`#how-it-works`, `#pricing`); jump links are UX, not SEO surface.

**Footer (global):** all 7 top-level pages + the 3 guides (descriptive anchors) + NAP line (`Mango Catalyst`, `Duluth, MN`, email once set; byte-identical to schema and GBP) + Privacy Policy. The footer is the crawl safety net; nothing indexable is orphaned even if in-content links change.

**In-content mesh (the links that carry weight):**

| From | To | Anchor pattern |
|---|---|---|
| Home services section | `/services` | "everything we build" / service-name anchors |
| Home wedge line | `/industries/hvac` | "HVAC business automation" |
| Home credibility strip | `/about` | "who you're working with" |
| Home FAQ teaser (3 items) | `/faq` | the question text itself |
| Home (multiple sections) | `/contact` | the CTA button |
| `/services` data-entry card | `/guides/manual-data-entry-cost` | "what manual data entry costs" |
| `/services` bottom | `/contact` | CTA |
| `/industries/hvac` body | `/guides/hvac-tasks-to-automate` | "which HVAC tasks to automate first" |
| `/industries/hvac` body | `/services` | "the full list of what we build" |
| `/industries/hvac` bottom | `/contact` | CTA |
| `/about` body | `/contact` | CTA |
| `/faq` answers | `/services`, `/industries/hvac`, relevant guide | descriptive anchors inside 2 to 4 sentence answers |
| Guide: hvac-tasks | `/industries/hvac` (primary), `/contact` (soft) | "HVAC business automation" |
| Guide: data-entry-cost | `/services` (primary), `/contact` (soft) | "automation services" |
| Guide: what-is-consultant | `/about` (primary), `/contact` (soft) | "the person behind Mango Catalyst" |
| `/guides` index | all 3 guides | guide titles |

This is the red-team #8 "tighten internal linking among existing MVP pages" action: every guide feeds a money page, every money page feeds `/contact`, and `/faq` cross-links everything it touches.

---

## 6. Cannibalization guardrails (pairwise, the risky pairs)

| Pair | Why they do not compete |
|---|---|
| Home vs `/services` | geo head term + brand vs generic service-intent term; Home converts on one scroll, `/services` details each offering; distinct H1/title; no geo term on `/services` |
| Home vs `/industries/hvac` | broad SMB geo query vs HVAC vertical query; Home names HVAC once (wedge link); the HVAC page never uses the Home H1/pun |
| `/industries/hvac` vs `/guides/hvac-tasks-to-automate` | commercial (sells the service, Service schema) vs informational (ranks tasks, Article schema); they interlink in both directions with different anchors |
| `/faq` vs the guides | FAQ owns decision/objection questions in 2 to 4 sentence answers; anything guide-shaped links out to the guide instead of duplicating it |
| `/guides/manual-data-entry-cost` vs `/faq` pricing Q | "what does manual work cost" (generic math) vs "what does Mango Catalyst cost" (our terms); different questions, different pages |
| `/about` vs Home | person + Duluth local-trust query vs business + Minnesota head query |
| `/guides/what-is-automation-consultant` vs `/about` | generic role definition (informational) vs this specific consultant (navigational); the guide links to About as its example, not vice versa |
| Future vertical pages (Phase 2) | each must have its own pains, examples, and keyword or not exist; never find-replace templates; watch Search Console for two-pages-one-query once live |

---

## 7. Local SEO

**Sequencing (locked 2026-07-01, do not reorder):**
1. LLC formation confirms the exact legal/public name string "Mango Catalyst".
2. Google Business Profile created as a **service-area business**: base city Duluth, NO street address published, service area = MN, WI, IA, ND, SD (matching `SITE.areaServed`). Primary category: check what ranking competitors in Duluth/Minneapolis use for "automation consultant" / "Zapier consultant" searches first; likely "Business management consultant" primary + "Software company" secondary. Description carries the specifics the category cannot (plain-English automation for small shops, $795 setup + $1,000/month).
3. Verify `src/lib/constants.ts` matches the confirmed strings (name, email, city) BEFORE production deploy.

**NAP discipline:** Name = `Mango Catalyst`, Address = service-area (city Duluth, MN, no street), Phone = NONE (email-first; no published phone is a locked brand rule, and schema/GBP simply omit phone rather than publishing a placeholder). The NAP string set must be byte-identical across: site footer, LocalBusiness JSON-LD, GBP, and any future directory citation. Write it once in `constants.ts`; everything renders from there.

**Bing Places** is worth a listing at the same time as GBP (same NAP), since Bing's index feeds ChatGPT search.

**Reviews + directories:** post-launch habit, not launch scope. First clients get asked for a GBP review; NAP-identical citations added opportunistically.

---

## 8. Launch indexing checklist (owner: integrator 06 + Bryan at production)

1. **Google Search Console:** verify the domain (DNS TXT), submit `https://www.mangocatalyst.com/sitemap.xml`.
2. **Bing Webmaster Tools:** verify the domain (can import from GSC), submit the sitemap. This is NOT optional: ChatGPT search rides Bing's index.
3. **IndexNow (optional, cheap, do it):** generate a key, serve `public/<key>.txt`, ping on deploy or rely on Bing's crawl. Zero maintenance after setup; accelerates Bing/ChatGPT discovery for a new domain.
4. **robots.txt:** already correct (`src/app/robots.ts` allows all crawlers, points at the sitemap). Citation bots (OAI-SearchBot, Claude-SearchBot, PerplexityBot, Googlebot, bingbot, Applebot) must stay allowed; the training-bot opt-out comments stay available for a later Bryan decision. Do not add blanket blocks.
5. **llms.txt: SKIP at launch.** Zero proven citation/ranking weight (SE Ranking 300k-domain study; Google states no special AI files needed). Revisit only if it becomes free to generate from existing content.
6. **Post-deploy audit gate (Vercel preview, then production):**
   ```bash
   python3 ~/.claude/skills/answer-engine-seo/scripts/run_audit.py <preview-url> --render
   python3 ~/.claude/skills/answer-engine-seo/scripts/schema_lint.py <preview-url>
   ```
   Pass criteria: render-parity (all copy, headings, JSON-LD present in initial no-JS HTML), citation bots allowed, schema lints clean, no near-duplicate/cannibalization flags, every sitemap URL returns 200.

---

## 9. SSR / citability hard requirements (for Design 03 and the builder)

1. **Every indexable page is a Server Component / static render.** All copy, headings, FAQ text, and JSON-LD ship in the initial HTML. Current evidence (Vercel/MERJ) indicates major AI crawlers do not execute JS; anything client-only is invisible to them.
2. `"use client"` is allowed ONLY for interactivity islands: the contact/message form, the scheduler embed wrapper, the mobile nav toggle, motion wrappers. A motion wrapper must wrap server-rendered children (progressive enhancement), never own the content. The hero H1/subhead specifically must be present in the no-JS HTML (this is a verification-loop grep).
3. Guides are MDX compiled at build time (SSG), not fetched client-side.
4. `next/image` for all imagery, explicit dimensions, lazy below the fold; fonts via `next/font` (self-hosted at build). Keeps the Lighthouse 95+ / LCP < 2.5s gate realistic, and CWV is a ranking signal.
5. One `<h1>` per page. Heading hierarchy never skips levels for styling reasons.
6. Alt text on every meaningful image, describing content, not keywords-stuffed.

---

## 10. Repo changes this spec requires (for Design 03 / integrator 06)

1. **Add `articleLd` builder** to `src/lib/jsonld.ts` (spec in 2.8).
2. **Kill the blog surface:** remove/rename `src/app/blog/` routes and `src/lib/blog.ts` to `guides` equivalents (`src/app/guides/page.tsx`, `src/app/guides/[slug]/page.tsx`, `src/lib/guides.ts`); move `src/content/blog/*.mdx` to `src/content/guides/` (same slugs). The site has never been live, so no redirects are needed; just ensure no `/blog` route, nav item, or sitemap entry ships.
3. **Update `STATIC_ROUTES` in `src/lib/constants.ts`:** remove `/blog`; add `/faq`, `/guides`, `/privacy` (guide detail URLs come from the content dir glob in `sitemap.ts`, keeping the non-empty check).
4. **New routes:** `/faq`, `/privacy`, `/guides` (index). `/privacy` may already exist on another branch per the brief; reconcile rather than duplicate.
5. **Per-page metadata:** every route exports `metadata` (or `generateMetadata`) with the section-2 title, description, and `alternates: { canonical: "<path>" }`. Verify against the bundled Next 16.2.2 docs in `node_modules/next/dist/docs/` before writing (breaking-changes rule).
6. **FAQ page pattern:** define the Q&A array once, render both the visible list and `faqPageLd` from it.
7. Constants before production (existing VERIFY list): `email`, `ogImage`, `logo`; name string re-checked after LLC. `telephone` stays empty permanently (no published phone).

---

## 11. answer-engine-seo skill run (2026-07-01) and findings

**How it ran:** the skill was invoked against this plan and the local repo. The scripted lanes (`crawl`, `render_diff`, `schema_lint`, `geo_score`) correctly returned `NEEDS_INPUT` / not-measured: the repo's pages are TSX/MDX stubs with no rendered HTML and there is no live URL yet, so there is nothing to measure pre-build. **The measured audit is therefore a POST-BUILD GATE on the Vercel preview (section 8.6), owned by the integrator (06).** What follows is the doctrine-level pressure-test of this architecture, with resolutions:

| # | Finding (doctrine/evidence) | Resolution in this spec |
|---|---|---|
| 1 | SSR content-in-initial-HTML is table-stakes; every audited competitor passes it; the only way to lose is client-only content | Section 9 hard requirements; hero H1 no-JS grep in the verification loop; blocking |
| 2 | Robots posture: citation bots must stay allowed; no competitor blocks anything | Already correct in `robots.ts`; section 8.4 locks it; resolved |
| 3 | FAQPage rich results deprecated for non-gov/health (2023); value is AEO citability only | FAQPage demoted to `/faq` only, framed as citability, no rich-result gate (sections 2.5, 4); resolved |
| 4 | GEO tactics are mixed-evidence (KDD-2024 positive in-harness vs C-SEO Bench largely ineffective/negative, zero-sum); never forecast citation uplift | Answer-first structure + cited stats applied only where natural (guides, FAQ); no uplift promised anywhere; launch expectation stated honestly (section 0); resolved |
| 5 | llms.txt has zero proven weight | Skipped at launch (section 8.5); resolved |
| 6 | Programmatic industry x geo pages cannibalize (Avoca lesson) | ONE vertical page at MVP, geo in title not URL, pairwise differentiation table (section 6), Phase 2 pattern rule (2.3); resolved |
| 7 | Schema completeness is a cheap edge (competitors skip it) | Full per-page schema map (section 4) incl. the new `articleLd`; Organization contactPoint activates when email is set; resolved |
| 8 | New domain ranks near zero at launch; do not oversell launch SEO | Section 0; brand + local + long-tail seed framing; no new vertical pages; resolved |
| 9 | Bot access claims need server-log verification, UA tokens are spoofable | Post-launch: Vercel logs can verify real bot hits; noted for Phase 2, not a launch gate; logged |
| 10 | Pre-build scripted lanes cannot measure stubs | Audit gate moved to the Vercel preview with exact commands (section 8.6); logged, owned by 06 |

No unresolved blocking findings. Status: DONE_WITH_CONCERNS (the single concern is that the measured audit is deferred to the preview URL by necessity; the gate and owner are named).

---

## 12. Self-verify (brief checklist)

- [x] Every MVP page has primary keyword, intent, schema type, title, meta description (sections 1 and 2; `/privacy` exception applied: footer-only, no keyword, noindex optional; `/guides` index documented as a no-keyword hub).
- [x] Home = LocalBusiness, NO FAQPage (2.1). FAQ page = FAQPage, only emitter (2.5). Industry/service = Service + BreadcrumbList (2.2, 2.3). Guides = Article via the NEW `articleLd` builder specced for `src/lib/jsonld.ts` (2.8).
- [x] No two pages target the same query (pairwise table, section 6); the industry page's differentiators vs Home and vs its guide are stated (2.3).
- [x] Internal-link plan present (section 5). Local SEO + service-area, no street address, no phone (section 7).
- [x] All titles <= 60 chars and descriptions 145 to 160 chars, verified programmatically (script-counted 2026-07-01).
- [x] `answer-engine-seo` skill run; blocking findings resolved or logged with owners (section 11).
- [x] Blog confirmed gone; value moved to `/guides` + `/faq` + answer-first money pages; repo change list included (section 10).
- [x] Honest launch expectation stated (section 0, red-team #8).
- [x] No em or en dashes anywhere in this spec; no phone number; no employer names or banned figures.

---

## 13. Handoff notes

**To Copy (02):** section 2 gives you, per page: the keyword that must sit near the title front, the length budgets (title <= 60, description 145 to 160; re-count after any edit), the question each section must answer in its first sentences, and the FAQ question set (REWRITE per the 00 honesty gate, especially the data-safety and uptime answers; MF-3 language is mandatory, "never shared" is banned). The three guides are net-new writing with the outlines in 2.8; cite a real public source anywhere a number appears. CTA string everywhere: "Book a 15-minute fit call".

**To Design (03), structure-affecting flags:** new routes `/faq`, `/guides`, `/guides/[slug]`, `/privacy`; `/blog` routes and `src/lib/blog.ts` renamed to guides equivalents; Home gets a FAQ-teaser section (3 linked questions) and section `id`s per 2.1; every indexable page is a server component with client islands only (section 9); the hero H1/subhead must survive a no-JS curl; breadcrumb UI is optional (schema-only breadcrumbs are fine); nav and footer link sets are specified in section 5 and are load-bearing, not decorative.

**To the integrator (06):** the post-build audit gate commands and pass criteria are in 8.6; the constants VERIFY list and LLC-name sequencing are in sections 7 and 10.7; GSC + Bing + optional IndexNow are production-launch steps with Bryan.
