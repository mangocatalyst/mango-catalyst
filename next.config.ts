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

const nextConfig: NextConfig = {
  async redirects() {
    return RENAMED_TRADES.map((t) => ({
      source: `/industries/${t}`,
      destination: `/industries/${t}-automation`,
      permanent: true,
    }));
  },
};

export default nextConfig;
