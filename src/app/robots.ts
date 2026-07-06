import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";

/**
 * Allow all crawlers. This keeps the AI search-citation bots (OAI-SearchBot,
 * Claude-SearchBot, PerplexityBot, Googlebot, Applebot, bingbot) ALLOWED so the
 * site stays citable in AI answers and search.
 *
 * To opt OUT of AI *training* later (which does NOT affect search citations),
 * add disallow rules here for GPTBot, ClaudeBot, CCBot, Google-Extended, and
 * Applebot-Extended. Note: user-triggered fetchers (ChatGPT-User, Perplexity-User)
 * ignore robots.txt and cannot be blocked here.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
