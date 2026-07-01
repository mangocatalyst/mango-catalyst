import { SITE } from "@/lib/constants";

/**
 * JSON-LD builders. Each returns a plain schema.org node; render with the
 * <JsonLd> component (server-rendered, so it lands in the initial HTML where
 * Google AND non-JS AI crawlers can read it).
 *
 * Discipline: fields sourced from constants that are "" are OMITTED, so we never
 * publish a guessed phone/email or a logo URL for an asset that does not exist.
 */

/** Stable @id anchors so nodes can reference each other (entity wiring). */
const ORG_ID = `${SITE.url}/#organization`;
const WEBSITE_ID = `${SITE.url}/#website`;
const LOCALBIZ_ID = `${SITE.url}/#localbusiness`;

type Json = Record<string, unknown>;

/** Organization: site-wide identity. NO sameAs / social links (project rule). */
export function organizationLd(): Json {
  const node: Json = {
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    areaServed: [...SITE.areaServed],
  };
  if (SITE.logo) node.logo = new URL(SITE.logo, SITE.url).toString();
  const contactPoint: Json = { "@type": "ContactPoint", contactType: "sales" };
  if (SITE.email) contactPoint.email = SITE.email;
  if (SITE.telephone) contactPoint.telephone = SITE.telephone;
  if (SITE.email || SITE.telephone) node.contactPoint = contactPoint;
  return node;
}

/** WebSite node, linked to the Organization as publisher. */
export function websiteLd(): Json {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: SITE.name,
    url: SITE.url,
    publisher: { "@id": ORG_ID },
    // potentialAction (SearchAction) intentionally omitted until on-site search exists.
  };
}

/** ProfessionalService = the local business for local SEO. Use on the Home page. */
export function localBusinessLd(): Json {
  const node: Json = {
    "@type": "ProfessionalService",
    "@id": LOCALBIZ_ID,
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    areaServed: [...SITE.areaServed],
    priceRange: SITE.priceRange,
    parentOrganization: { "@id": ORG_ID },
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE.city,
      addressRegion: SITE.region,
      addressCountry: SITE.country,
    },
  };
  if (SITE.email) node.email = SITE.email;
  if (SITE.telephone) node.telephone = SITE.telephone;
  return node;
}

/** Service node for a service/industry page; links provider to the Organization. */
export function serviceLd(opts: {
  name: string;
  description: string;
  url: string;
  areaServed?: string | string[];
}): Json {
  return {
    "@type": "Service",
    name: opts.name,
    serviceType: opts.name,
    description: opts.description,
    url: opts.url,
    provider: { "@id": ORG_ID },
    areaServed: opts.areaServed ?? [...SITE.areaServed],
  };
}

/** FAQPage from VISIBLE Q&A only (Google requires the marked-up content on-page). */
export function faqPageLd(items: { question: string; answer: string }[]): Json {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

/** Article for evergreen guides. Dates go in schema (truthful), not on the visible page. */
export function articleLd(opts: {
  headline: string; // <= 110 chars
  description: string;
  url: string; // absolute
  datePublished?: string; // ISO 8601; real first-publish date
  dateModified?: string; // ISO 8601; real last-edit date
  image?: string; // absolute URL; omit until a real OG/guide image exists
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

/** BreadcrumbList for sub-pages (Home > Section > Page). */
export function breadcrumbLd(items: { name: string; url: string }[]): Json {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/** Wrap nodes into a single @graph so a page emits ONE JSON-LD script. */
export function graph(...nodes: Json[]): Json {
  return { "@context": "https://schema.org", "@graph": nodes };
}
