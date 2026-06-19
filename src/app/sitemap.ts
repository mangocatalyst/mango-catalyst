import type { MetadataRoute } from "next";
import fs from "node:fs";
import path from "node:path";
import { SITE, STATIC_ROUTES } from "@/lib/constants";

/**
 * Self-correcting sitemap: a static route is listed only if its page.tsx exists
 * and is non-empty, and a blog post only if its .mdx file is non-empty. So the
 * unbuilt scaffold stubs are never advertised to crawlers (no sitemap-to-404).
 * As pages and posts get real content, they appear automatically.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const appDir = path.join(process.cwd(), "src/app");

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.filter((route) => {
    const file = path.join(appDir, route === "/" ? "." : route, "page.tsx");
    try {
      return fs.statSync(file).size > 0;
    } catch {
      return false;
    }
  }).map((route) => ({
    url: `${SITE.url}${route === "/" ? "" : route}`,
    lastModified: now,
    changeFrequency: route === "/blog" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.8,
  }));

  let posts: MetadataRoute.Sitemap = [];
  try {
    const blogDir = path.join(process.cwd(), "src/content/blog");
    posts = fs
      .readdirSync(blogDir)
      .filter(
        (f) =>
          f.endsWith(".mdx") &&
          fs.statSync(path.join(blogDir, f)).size > 0,
      )
      .map((f) => ({
        url: `${SITE.url}/blog/${f.replace(/\.mdx$/, "")}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.6,
      }));
  } catch {
    // content dir not present yet; static routes still ship.
  }

  return [...staticEntries, ...posts];
}
