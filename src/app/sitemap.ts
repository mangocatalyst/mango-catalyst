import type { MetadataRoute } from "next";
import fs from "node:fs";
import path from "node:path";
import { SITE, STATIC_ROUTES } from "@/lib/constants";

/**
 * Self-correcting sitemap: a static route is listed only if its page.tsx exists
 * and is non-empty, so unbuilt scaffold stubs are never advertised to crawlers
 * (no sitemap-to-404). As pages get real content, they appear automatically.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const appDir = path.join(process.cwd(), "src/app");

  return STATIC_ROUTES.filter((route) => {
    const file = path.join(appDir, route === "/" ? "." : route, "page.tsx");
    try {
      return fs.statSync(file).size > 0;
    } catch {
      return false;
    }
  }).map((route) => ({
    url: `${SITE.url}${route === "/" ? "" : route}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: route === "/" ? 1 : 0.8,
  }));
}
