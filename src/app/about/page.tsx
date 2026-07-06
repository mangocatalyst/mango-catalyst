import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import { JsonLd } from "@/components/seo/JsonLd";
import { graph, breadcrumbLd } from "@/lib/jsonld";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";

/**
 * About: the operator story. Copy verbatim from build/out/copy/about.md;
 * metadata + schema per seo-spec 2.4 (BreadcrumbList only; the Person node is
 * a Phase 2 candidate). Type-only by design (D8 people rule): the stylized
 * real headshot is not ready, so no image and no placeholder.
 */

const TITLE = "Automation Consultant in Duluth, MN";
const DESCRIPTION =
  "Mango Catalyst is Bryan, an automation consultant in Duluth, MN who ran service operations inside a real shop. One person who builds it, runs it, and answers.";

export const metadata: Metadata = {
  // Layout template appends "| Mango Catalyst" => the seo-spec title string.
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/about" },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    url: "/about",
    title: `${TITLE} | ${SITE.name}`,
    description: DESCRIPTION,
    ...(SITE.ogImage
      ? { images: [{ url: SITE.ogImage, width: 1200, height: 630 }] }
      : {}),
  },
  twitter: {
    card: "summary_large_image",
    title: `${TITLE} | ${SITE.name}`,
    description: DESCRIPTION,
    ...(SITE.ogImage ? { images: [SITE.ogImage] } : {}),
  },
};

/** Body copy, verbatim. The answer-first lede renders separately, larger. */
const STORY: string[] = [
  "My background is a little weird, and that's the point. I spent twenty years behind a camera, a decade of that running my own photography business, where every job had a hard deadline and no do-overs. I built e-commerce companies and exited them. I general-contracted the build of my own home on 15 acres outside Duluth. Then I ran service operations for a real service business, and that's where I got obsessed with building systems that made the work easier: the scheduling, the phones, the daily numbers, the same info typed into three screens. I know that work because I did that work.",
  "That mix matters. I'm the geek who can build the technical side, and I've also spent my whole career talking to regular people and running real operations. Most people are one or the other. I'm the bridge between the software and the shop floor: I can build the thing AND explain why it matters without making your eyes glaze over.",
  "These days the building is the whole job. The one product I've shipped on my own is a browser extension that automates medical claim data entry into Minnesota's provider billing portal, built privacy-first so everything runs on the user's own machine and sensitive data never leaves the building. Day to day I work in ServiceTitan, Zapier, and Google Workspace, and if your tool has an API, I can probably wire it in.",
  "I build repeatable systems instead of solving the same problem twice. I follow through from start to finish. And because Mango Catalyst is one person, when something breaks you call me, not a support line in another time zone.",
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbLd([
            { name: "Home", url: `${SITE.url}/` },
            { name: "About", url: `${SITE.url}/about` },
          ])
        )}
      />
      <main className="flex-1">
        {/* Opener: amber tick, industrial-caps H1, answer-first lede. */}
        <Section tone="base" containerClassName="pb-[clamp(3rem,6vw,4.5rem)]">
          <div aria-hidden className="h-[3px] w-10 bg-amber" />
          <h1 className="mt-6 max-w-[22ch] font-display text-[clamp(2.4rem,1.6rem+3vw,4.25rem)] font-bold uppercase leading-[1.02] tracking-[0.015em] text-balance text-ink">
            {"Who you're actually working with"}
          </h1>
          <p className="mt-8 max-w-[46rem] text-[1.15rem] leading-[1.65] text-body sm:text-[1.3rem] xl:max-w-[54rem]">
            {
              "Mango Catalyst is me, Bryan: one person, based in Duluth, Minnesota, who ran service operations inside a real shop and now builds the automation that takes the office work off your hands. I build it, I run it, and when you call, I'm the one who answers. There's no sales team, and nobody hands you to a junior after you sign."
            }
          </p>
        </Section>

        {/* The story: type-only by design (D8), one measured column on a
            hairline rail so the page reads as set type, not a stub. */}
        <Section
          tone="base"
          containerClassName="pt-0 pb-[clamp(3.5rem,7vw,5.5rem)]"
        >
          <div className="max-w-[46rem] space-y-7 border-l border-hairline pl-6 sm:pl-10 xl:max-w-[54rem] xl:text-[1.2rem]">
            {STORY.map((paragraph) => (
              <p
                key={paragraph.slice(0, 24)}
                className="text-[1.05rem] leading-[1.7] text-body"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Pull-quote, set large and amber per the copy doc. */}
          <blockquote className="mt-[clamp(3.5rem,7vw,5.5rem)]">
            <div aria-hidden className="h-[3px] w-10 bg-amber" />
            <p className="mt-6 max-w-[24ch] font-display text-[clamp(1.9rem,1.2rem+2.6vw,3.25rem)] font-bold uppercase leading-[1.08] tracking-[0.015em] text-balance text-amber">
              {
                "“I'd rather spend the time to build one system that runs 100 times than do the same task 100 times.”"
              }
            </p>
          </blockquote>
        </Section>

        {/* Closing CTA, deep band per the site's conversion-moment pattern. */}
        <Section tone="deep">
          <h2 className="max-w-[24ch] font-display text-[clamp(2rem,1.3rem+2.4vw,3.25rem)] font-bold uppercase leading-[1.02] tracking-[0.015em] text-balance text-ink">
            {
              "If your week is disappearing into office busywork, let's look at it together."
            }
          </h2>
          <div className="mt-9">
            <Button href="/contact" arrow>
              Book a 15-minute fit call
            </Button>
          </div>
        </Section>
      </main>
    </>
  );
}
