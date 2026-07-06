import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/constants";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbLd, graph } from "@/lib/jsonld";
import { Card } from "@/components/ui/Card";

/**
 * Slim guides index (seo-spec 2.7): one intro paragraph + three descriptive
 * anchor links, nothing else. Copy comes VERBATIM from
 * build/out/copy/guides-index.md. No dates, no "latest posts" framing, no
 * pagination, and no in-body CTA (the global header carries the fit-call
 * button). It targets no keyword and must not grow content that competes
 * with the guides.
 */

const PAGE_TITLE = "Automation Guides for Small Business Owners";
const PAGE_DESCRIPTION =
  "Plain-English guides on automating small business office work: what to automate first, what the busywork really costs, and who to hire to fix it.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: "/guides" },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    url: "/guides",
    title: `${PAGE_TITLE} | ${SITE.name}`,
    description: PAGE_DESCRIPTION,
    ...(SITE.ogImage
      ? { images: [{ url: SITE.ogImage, width: 1200, height: 630 }] }
      : {}),
  },
  twitter: {
    card: "summary_large_image",
    title: `${PAGE_TITLE} | ${SITE.name}`,
    description: PAGE_DESCRIPTION,
    ...(SITE.ogImage ? { images: [SITE.ogImage] } : {}),
  },
};

/** The three guides, descriptive anchors + one-line summaries (copy verbatim). */
const GUIDES = [
  {
    href: "/guides/hvac-tasks-to-automate",
    title: "HVAC tasks to automate first",
    blurb:
      "The office tasks worth automating in an HVAC shop, ranked by payoff.",
  },
  {
    href: "/guides/manual-data-entry-cost",
    title: "The real cost of manual data entry",
    blurb:
      "The hours, the errors, and the math, plus where double-keying hides.",
  },
  {
    href: "/guides/what-is-automation-consultant",
    title: "What is an automation consultant?",
    blurb: "What one does, what one costs, and how to tell if you need one.",
  },
] as const;

export default function GuidesIndexPage() {
  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbLd([
            { name: "Home", url: `${SITE.url}/` },
            { name: "Guides", url: `${SITE.url}/guides` },
          ]),
        )}
      />
      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-20 sm:px-10 sm:py-28">
        <div aria-hidden className="h-[3px] w-10 bg-amber" />
        <h1 className="mt-6 max-w-[24ch] font-display text-[clamp(2.4rem,1.6rem+3vw,4rem)] font-bold uppercase leading-[1.02] tracking-[0.015em] text-balance text-ink">
          Automation guides
        </h1>
        <p className="mt-6 max-w-[44rem] text-[1.05rem] leading-[1.7] text-body sm:text-[1.125rem] xl:max-w-[52rem] xl:text-[1.2rem]">
          {
            "Plain-English answers to the questions owners ask before they ever book a call: what to automate first, what the busywork is really costing you, and what an automation consultant actually does. No jargon, no fluff, no dates, because the answers don't expire."
          }
        </p>

        <ul className="mt-12 grid max-w-[44rem] gap-6 xl:max-w-[52rem]">
          {GUIDES.map((guide) => (
            <li key={guide.href}>
              <Card className="p-8 sm:p-9">
                <h2 className="font-display text-[clamp(1.45rem,1.15rem+1.1vw,2rem)] font-bold uppercase leading-[1.08] tracking-[0.015em] text-ink">
                  <Link
                    href={guide.href}
                    className="transition-colors hover:text-amber"
                  >
                    {guide.title}
                  </Link>
                </h2>
                <p className="mt-3 leading-[1.65] text-body">{guide.blurb}</p>
              </Card>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
