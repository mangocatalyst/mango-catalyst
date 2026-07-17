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
    ];
  },
};

export default nextConfig;
