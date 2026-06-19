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
    "Business automation for upper-Midwest small businesses. We build the automation that takes invoicing, scheduling, and lead follow-up off your hands.",
  /** Service-area business (home-based): city only, no street address published. */
  city: "Duluth",
  region: "MN",
  country: "US",
  areaServed: ["Minnesota", "Wisconsin", "Iowa", "North Dakota", "South Dakota"],
  priceRange: "$$",
  // --- VERIFY before launch (left "" => omitted from schema/metadata) ---
  email: "", // public contact email, once decided
  telephone: "", // leave "" to omit; never publish the personal cell (phone-routing rule)
  ogImage: "", // add public/og.png (1200x630), then set "/og.png"
  logo: "", // add public/logo.png, then set "/logo.png"
} as const;

/**
 * Static routes for the sitemap. A route is only emitted if its page.tsx exists
 * and is non-empty (see sitemap.ts), so unbuilt scaffold stubs are never listed.
 * Add industry/service slugs here as those pages are built.
 */
export const STATIC_ROUTES = [
  "/",
  "/about",
  "/services",
  "/industries/hvac",
  "/blog",
  "/contact",
] as const;
