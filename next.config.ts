import type { NextConfig } from "next";

/** Trade slugs renamed <trade> -> <trade>-automation (2026-07-06, keyword in
 *  URL). Permanent redirects keep old links, bookmarks, and anything Google
 *  already crawled pointing at the live pages. */
const RENAMED_TRADES = [
  "hvac",
  "plumbing",
  "roofing",
  "construction",
  "handyman",
  "snow-plowing",
  "landscaping",
];

/** Sent on every response. CSP is deliberately omitted: a correct policy has to
 *  allowlist the Cal.com embed, Vercel analytics/speed-insights, and Next inline
 *  styles, and a wrong one silently breaks booking — add it once behind a live
 *  test. ponytail: no CSP yet, add with a tested source allowlist. */
const SECURITY_HEADERS = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  /* Dev-only: Next blocks cross-origin requests to dev assets, which silently
     killed hydration (and every JS-driven effect) when browsing the dev
     server over the tailnet from another machine (2026-07-19). */
  allowedDevOrigins: ["mango.tail31d948.ts.net", "mango.local"],
  async headers() {
    return [{ source: "/:path*", headers: SECURITY_HEADERS }];
  },
  async redirects() {
    return [
      ...RENAMED_TRADES.map((t) => ({
        source: `/industries/${t}`,
        destination: `/industries/${t}-automation`,
        permanent: true,
      })),
      /* /ai reworked into the paid consulting offer at /ai-consultant (2026-07-16). */
      { source: "/ai", destination: "/ai-consultant", permanent: true },
      /* Direct-mail measurement path (2026-07-28): the printed letters say
         mangocatalyst.com/demo, so a visit here is the mail channel's only
         attributable signal. Temporary on purpose: it may be repointed per
         campaign, and nothing else should ever link to it. */
      {
        source: "/demo",
        destination: "/dashboards?utm_source=directmail&utm_medium=print&utm_campaign=mc-mail-2026-07",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
