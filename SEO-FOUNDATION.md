# SEO Foundation (branch: seo-foundation)

Plumbing added to make the site rank in classic search AND be visible/citable to AI
answer engines (ChatGPT/OAI-SearchBot, Claude/Claude-SearchBot, Perplexity, Google
AI Overviews, Copilot). Derived from the competitor audits in the vault
(`projects/mango-catalyst/seo-plan-2026-06-14` v2 update + the competitor-audit notes).
Verified against the bundled Next 16.2.2 docs in `node_modules/next/dist/docs/`.

## What was added (this branch only; your scaffolding untouched)

- `src/lib/constants.ts` — single source of truth: name, canonical URL, description,
  area served, price band, and VERIFY placeholders (email, phone, OG image, logo).
- `src/lib/jsonld.ts` — schema.org builders: Organization, WebSite, ProfessionalService
  (LocalBusiness), Service, FAQPage, BreadcrumbList, plus `graph()` to emit one script.
  Empty constants are omitted, so no guessed phone/email or broken asset URLs ship.
- `src/components/seo/JsonLd.tsx` — server component that renders the JSON-LD `<script>`
  (with the `<` escape the Next docs recommend). Do not make it a client component.
- `src/app/robots.ts` — allows all crawlers (keeps citation bots allowed), points to
  the sitemap. Comments show how to opt out of AI training later.
- `src/app/sitemap.ts` — self-correcting: lists a route only if its `page.tsx` (or blog
  `.mdx`) is non-empty, so unbuilt stubs are never advertised (no sitemap-to-404).
- `src/app/layout.tsx` — set `metadataBase`, a title template, default OG/Twitter, and
  render site-wide Organization + WebSite JSON-LD. (Geist fonts left as-is.)

Canonical host: the apex already 308-redirects to `www.mangocatalyst.com` on Vercel,
so no `next.config` redirect was needed. `metadataBase` uses the www host.

## VERIFY before launch (fill in `src/lib/constants.ts`, then drop the note)

- `email` — public contact email (currently omitted from schema).
- `telephone` — only if you publish one; never the personal cell.
- `ogImage` — add `public/og.png` (1200x630), set `ogImage: "/og.png"`.
- `logo` — add `public/logo.png`, set `logo: "/logo.png"`.

## How to use per page (when you build the routes)

Keep page content in **server components** (App Router default). Do not move copy,
headings, or JSON-LD into `"use client"` components, or non-rendering AI crawlers will
not see it. Then:

> **STALE EXAMPLE (noted 2026-07-01):** the Home example below imports `faqPageLd`. Per
> `build/01-seo.md` and redteam-consensus #6, FAQPage JSON-LD ships on the FAQ page ONLY;
> Home emits LocalBusiness only. Use the pattern, not this literal import. Guides need an
> `articleLd` builder added to `src/lib/jsonld.ts` (none exists yet).

```tsx
// Home (src/app/page.tsx): LocalBusiness + the FAQ you actually render on the page
import { JsonLd } from "@/components/seo/JsonLd";
import { graph, localBusinessLd, faqPageLd } from "@/lib/jsonld";

export const metadata = { alternates: { canonical: "/" } };

export default function Home() {
  const faqs = [{ question: "...", answer: "..." }]; // must match visible FAQ copy
  return (
    <>
      <JsonLd data={graph(localBusinessLd(), faqPageLd(faqs))} />
      {/* ...sections... */}
    </>
  );
}
```

```tsx
// Service/industry page: Service + Breadcrumb, and set per-page metadata/canonical
import { JsonLd } from "@/components/seo/JsonLd";
import { graph, serviceLd, breadcrumbLd } from "@/lib/jsonld";
import { SITE } from "@/lib/constants";

export const metadata = {
  title: "HVAC Business Automation in Minnesota",
  description: "...",
  alternates: { canonical: "/industries/hvac" },
};

export default function Page() {
  return (
    <>
      <JsonLd data={graph(
        serviceLd({ name: "HVAC Business Automation", description: "...", url: `${SITE.url}/industries/hvac`, areaServed: "Minnesota" }),
        breadcrumbLd([
          { name: "Home", url: SITE.url },
          { name: "Industries", url: `${SITE.url}/industries` },
          { name: "HVAC Automation Minnesota", url: `${SITE.url}/industries/hvac` },
        ]),
      )} />
      {/* ... */}
    </>
  );
}
```

Reminder from the audits: differentiate industry/geo pages (unique pain points, local
proof, distinct copy) or consolidate. Near-identical templated pages cannibalize.

## Pre-launch check (eat our own dog food)

Deploy a Vercel preview, then run the audit skill and confirm: content in initial HTML
(render-parity), citation bots allowed, schema valid, no orphan/near-duplicate flags.

```bash
python3 ~/.claude/skills/answer-engine-seo/scripts/run_audit.py <preview-url> --render
python3 ~/.claude/skills/answer-engine-seo/scripts/schema_lint.py <preview-url>
```
