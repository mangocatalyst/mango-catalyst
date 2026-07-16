/**
 * Site-wide constants: the single source of truth for SEO metadata + JSON-LD.
 *
 * Fields left as "" are intentionally OMITTED from metadata/schema so we never
 * publish a guessed value or a reference to an asset that does not exist yet.
 * Fill them in (and drop the VERIFY note) once decided. Open decisions track the
 * SEO plan: projects/mango-catalyst/seo-plan-2026-06-14, "Open questions for Bryan".
 */
export const SITE = {
  name: "Mango Catalyst",
  /** Canonical host. The apex 308-redirects to www on Vercel, so www is canonical. */
  url: "https://www.mangocatalyst.com",
  description:
    "Business automation for Upper Midwest service shops. I build the automation that takes invoicing, scheduling, and lead follow-up off your hands.",
  /** Service-area business (home-based): city only, no street address published. */
  city: "Duluth",
  region: "MN",
  country: "US",
  areaServed: ["Minnesota", "Wisconsin", "Iowa", "North Dakota", "South Dakota"],
  priceRange: "$$",
  // --- VERIFY before launch (left "" => omitted from schema/metadata) ---
  email: "", // public contact email, once decided
  telephone: "", // leave "" to omit; never publish the personal cell (phone-routing rule)
  ogImage: "/og.png", // 1200x630, shipped from the logo-assets branch
  logo: "/icon.png", // 512x512 spark mark (logo-assets); full wordmark: /logo.svg
} as const;

/**
 * Static routes for the sitemap: the seo-spec section-1 URL map (11 pages,
 * guide prefix /guides, no /blog). A route is only emitted if its page.tsx
 * exists and is non-empty (see sitemap.ts), so unbuilt scaffold stubs are
 * never listed.
 */
export const STATIC_ROUTES = [
  "/",
  "/about",
  "/services",
  "/industries/hvac-automation",
  "/industries/plumbing-automation",
  "/industries/roofing-automation",
  "/industries/construction-automation",
  "/industries/handyman-automation",
  "/industries/snow-plowing-automation",
  "/industries/landscaping-automation",
  "/mn-its",
  "/dashboards",
  "/ai",
  "/programs/servicetitan",
  "/programs/zapier",
  "/programs/slack",
  "/programs/google-workspace",
  "/programs/everything-else",
  "/faq",
  "/contact",
  "/guides",
  "/guides/hvac-tasks-to-automate",
  "/guides/manual-data-entry-cost",
  "/guides/what-is-automation-consultant",
  "/guides/hvac-owner-dashboard",
  "/privacy",
] as const;

/**
 * The seven trade pages, surfaced in both the footer Industries column and the
 * header Industries dropdown. Slugs all carry the `-automation` suffix and are
 * already in STATIC_ROUTES above.
 */
export const INDUSTRY_LINKS = [
  { href: "/industries/hvac-automation", label: "HVAC" },
  { href: "/industries/plumbing-automation", label: "Plumbing" },
  { href: "/industries/roofing-automation", label: "Roofing" },
  { href: "/industries/construction-automation", label: "Construction" },
  { href: "/industries/handyman-automation", label: "Handyman" },
  { href: "/industries/snow-plowing-automation", label: "Snow Plowing" },
  { href: "/industries/landscaping-automation", label: "Landscaping" },
] as const;

/**
 * The eight platform pages (platforms worked in extensively, plus the one
 * owned build, MN-ITS Helper), surfaced in both the footer Platforms column
 * and the header Platforms dropdown. All already in STATIC_ROUTES above.
 */
export const PROGRAM_LINKS = [
  { href: "/programs/servicetitan", label: "ServiceTitan" },
  { href: "/programs/zapier", label: "Zapier" },
  { href: "/programs/slack", label: "Slack" },
  { href: "/programs/google-workspace", label: "Google Workspace" },
  { href: "/mn-its", label: "MN-ITS Helper" },
  { href: "/dashboards", label: "Owner Dashboard" },
  { href: "/ai", label: "AI" },
  { href: "/programs/everything-else", label: "Everything Else" },
] as const;
