import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/constants";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbLd, graph, serviceLd } from "@/lib/jsonld";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

/**
 * Industries / HVAC: the Phase 1 vertical wedge page. Copy verbatim from
 * build/out/copy/industry-hvac.md; metadata + schema per seo-spec 2.3.
 * Commercial intent (sells the service); the paired guide at
 * /guides/hvac-tasks-to-automate explains. Schema is Service + a TWO-item
 * breadcrumb (no /industries index exists; do not mint one).
 */

const PAGE_TITLE = "HVAC Business Automation in Minnesota";
const PAGE_PATH = "/industries/hvac";
const PAGE_DESCRIPTION =
  "Stop doing invoicing, dispatch updates, and follow-up by hand. Office automation for Minnesota HVAC and home-service shops. Book a 15-minute fit call.";

export const metadata: Metadata = {
  // The layout template appends "| Mango Catalyst", producing the seo-spec
  // 2.3 title string exactly.
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_PATH },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    url: PAGE_PATH,
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    ...(SITE.ogImage
      ? { images: [{ url: SITE.ogImage, width: 1200, height: 630 }] }
      : {}),
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    ...(SITE.ogImage ? { images: [SITE.ogImage] } : {}),
  },
};

/** Owner-facing HVAC pains: bold lead + plain-spoken follow-through. */
const PAINS: { lead: string; text: string }[] = [
  {
    lead: "The dispatch board never sits still.",
    text: "A no-heat call jumps the line, a tech calls in sick, and somebody spends the morning re-shuffling the schedule and calling customers one at a time to tell them.",
  },
  {
    lead: "The seasons whiplash the phones.",
    text: "The first cold snap or the first heat wave doubles call volume overnight, and the same office crew that was fine in October is drowning in January.",
  },
  {
    lead: "Invoicing lags the work.",
    text: "The job closed Tuesday, the invoice goes out whenever someone gets a free hour, and the payment lands weeks after the truck left the driveway.",
  },
  {
    lead: "The home-show lead pile.",
    text: "A stack of leads from the show sits in a folder until someone has a free afternoon, and by then half of them booked with whoever called back first.",
  },
  {
    lead: "The same info, typed three times.",
    text: "The call notes go in one screen, the job in another, the invoice in a third, all by hand, all by the same two people.",
  },
];

/** Kind-of-outcome language only, no magnitudes (canonical-brief rule). */
const OUTCOMES: string[] = [
  "Invoices go out when the job closes, not when someone finds an hour.",
  "Every lead gets a reply the same day it comes in, and lands in the CRM routed to the right person, whether it came from the website, the phone, or the show booth.",
  "Appointment confirmations and reminders fire on their own, so fewer customers are surprised when the truck shows up and fewer techs are surprised by an empty house.",
  "Schedule changes notify the customer without anyone picking up a phone.",
  "The morning numbers show up built: what got done yesterday, what got sold, what got missed.",
];

export default function HvacIndustryPage() {
  return (
    <>
      <JsonLd
        data={graph(
          serviceLd({
            name: "HVAC Business Automation",
            description: PAGE_DESCRIPTION,
            url: `${SITE.url}${PAGE_PATH}`,
            areaServed: "Minnesota",
          }),
          breadcrumbLd([
            { name: "Home", url: SITE.url },
            {
              name: "HVAC Business Automation",
              url: `${SITE.url}${PAGE_PATH}`,
            },
          ]),
        )}
      />

      <main>
        {/* Answer-first opener: what can be automated, for whom, how it starts. */}
        <Section id="intro" containerClassName="pb-[clamp(3.5rem,7vw,5.5rem)]">
          <div aria-hidden className="h-[3px] w-10 bg-amber" />
          <h1 className="mt-6 max-w-[24ch] font-display text-[clamp(2.4rem,1.6rem+3vw,4rem)] font-bold uppercase leading-[1.02] tracking-[0.015em] text-balance text-ink">
            HVAC business automation in Minnesota
          </h1>
          <p className="mt-6 max-w-[44rem] text-[1.05rem] leading-[1.65] text-body sm:text-[1.125rem]">
            {
              "Most of the office work in an HVAC shop can run itself: invoicing after job close, lead follow-up, appointment confirmations and reminders, schedule updates, and the daily reporting you stitch together from five screens. Mango Catalyst builds that automation for Minnesota HVAC and home-service shops, wired into the tools you already pay for. It starts with one task and a 15-minute fit call, not a six-month rollout."
            }
          </p>
        </Section>

        {/* HVAC-specific pains, written for this vertical (not Home find-replace). */}
        <Section id="busywork" tone="deep">
          <SectionHeading
            title="The office side of an HVAC shop runs on busywork"
            lead="The field side of your business has rules. The office side has habits. And the habits are eating the day:"
          />
          <ul className="mt-10 grid max-w-[52rem] gap-7">
            {PAINS.map((pain) => (
              <li key={pain.lead} className="flex gap-5">
                <span
                  aria-hidden
                  className="mt-[0.7em] h-[3px] w-6 flex-none bg-amber"
                />
                <p className="leading-[1.65] text-muted">
                  <strong className="font-semibold text-ink">
                    {pain.lead}
                  </strong>{" "}
                  {pain.text}
                </p>
              </li>
            ))}
          </ul>
        </Section>

        {/* Outcomes: the same software, doing the boring parts on its own. */}
        <Section id="outcomes">
          <SectionHeading
            title="What automation looks like in an HVAC office"
            lead="The point isn't new software. It's the software you already have, finally doing the boring parts on its own:"
          />
          <ul className="mt-10 grid max-w-[52rem] gap-6">
            {OUTCOMES.map((outcome) => (
              <li key={outcome.slice(0, 24)} className="flex gap-5">
                <span
                  aria-hidden
                  className="mt-[0.55em] size-[7px] flex-none rounded-full bg-amber"
                />
                <p className="leading-[1.65] text-body">{outcome}</p>
              </li>
            ))}
          </ul>
          <p className="mt-10 max-w-[44rem] text-[1.05rem] leading-[1.65] text-body sm:text-[1.125rem]">
            {
              "The office crew you have stops re-typing and starts handling the judgment calls, which is what you actually hired them for."
            }
          </p>
        </Section>

        {/* Capability line: platforms I work in, never systems I built (00 rule). */}
        <Section id="tools" tone="deep">
          <SectionHeading title="Built in the tools your shop already runs" />
          <p className="mt-8 max-w-[44rem] leading-[1.65] text-body">
            {
              "I work in ServiceTitan, Zapier, and Google Workspace every day. Those are platforms I work in, and if your stack is different, most tools with an API can be wired in. We figure out what connects to what on the fit call, before you spend a dollar."
            }
          </p>
        </Section>

        {/* Light conversion band (palette B): routes readers to the guide or the menu. */}
        <Section id="where-to-start" tone="light">
          <SectionHeading
            tone="light"
            title="Not sure what to automate first?"
          />
          <p className="mt-8 max-w-[44rem] leading-[1.65] text-navy-2">
            {"If you want to rank the candidates yourself, read "}
            <Link
              href="/guides/hvac-tasks-to-automate"
              className="inline-link-light"
            >
              which HVAC tasks to automate first
            </Link>
            {". If you want the whole menu, here's "}
            <Link href="/services" className="inline-link-light">
              the full list of what we build
            </Link>
            {
              ". And if you'd rather just talk it through, that's what the call is for."
            }
          </p>
        </Section>

        {/* Bottom CTA: the one conversion moment, deep band, single button. */}
        <Section id="book" tone="deep">
          <div aria-hidden className="h-[3px] w-10 bg-amber" />
          <p className="mt-6 max-w-[26ch] font-display text-[clamp(1.9rem,1.2rem+2.4vw,3rem)] font-bold uppercase leading-[1.08] tracking-[0.015em] text-balance text-ink">
            {
              "One 15-minute call. Bring the task that's eating your week, and I'll tell you straight whether it can run itself."
            }
          </p>
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
