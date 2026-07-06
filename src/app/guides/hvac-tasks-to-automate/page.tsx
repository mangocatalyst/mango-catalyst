import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { SITE } from "@/lib/constants";
import { JsonLd } from "@/components/seo/JsonLd";
import { articleLd, breadcrumbLd, graph } from "@/lib/jsonld";
import { Card } from "@/components/ui/Card";

/**
 * Evergreen guide: HVAC tasks to automate first. Copy comes VERBATIM from
 * build/out/copy/guide-hvac-tasks-to-automate.md; metadata + schema from
 * seo-spec 2.8. Undated on the visible page (dates live in the Article
 * schema, truthful). Question-shaped h2s; one soft CTA at the close.
 */

const PAGE_PATH = "/guides/hvac-tasks-to-automate";
const PAGE_URL = `${SITE.url}${PAGE_PATH}`;
const PAGE_TITLE = "HVAC Tasks to Automate First";
const PAGE_DESCRIPTION =
  "The HVAC office tasks worth automating first: invoicing, dispatch updates, lead follow-up, and reporting, ranked by payoff for a small shop. No jargon.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_PATH },
  openGraph: {
    type: "article",
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

/** The extractable direct answer (copy verbatim). */
const DIRECT_ANSWER =
  "The HVAC office tasks worth automating first, in order: invoicing after job close, lead follow-up, appointment confirmations and reminders, dispatch and schedule updates, review requests, and daily reporting. Rank them by two things: how often the task repeats, and how much it hurts when it slips. For most small shops, invoicing and lead follow-up win because they touch money directly and slip the most often.";

/** Question-shaped sections (copy verbatim). Bodies without links are plain strings. */
const SECTIONS: { heading: string; body: ReactNode }[] = [
  {
    heading: "What does automating invoicing look like?",
    body: "The invoice goes out when the job closes, not when someone in the office finds a free hour. The trigger is the job status you already set in your field software; the automation builds the invoice from the job data, sends it, and flags anything that needs a human look (change orders, partial jobs, weird pricing). The payoff is twofold: the office stops batching invoices after hours, and the money shows up sooner because the bill went out the same day the truck left.",
  },
  {
    heading: "What does automating lead follow-up look like?",
    body: "Every lead gets a reply the same day, automatically, no matter where it came from. Website form, phone message, home-show signup: they all land in one place, tagged with where they came from, routed to whoever should own them, and answered with a first-touch text or email so the lead knows they're not forgotten. The shop that responds first usually wins the job; automation makes you the shop that always responds first, even at 8 PM.",
  },
  {
    heading: "What about appointment confirmations and reminders?",
    body: "These are the easiest win on the list, because your scheduling tool almost certainly supports them already and they're probably half-configured. Booking a job fires a confirmation. The day before, a reminder goes out with the arrival window. A schedule change notifies the customer without anyone picking up the phone. Fewer surprised customers, fewer trucks rolling to an empty house, and nobody in the office spent the morning on courtesy calls.",
  },
  {
    heading: "Can dispatch and schedule updates run themselves?",
    body: "Partly, and the part that can is the repetitive part. The judgment call (which tech, which job, what jumps the line when a no-heat call comes in) stays human. What runs itself: the notifications that follow the decision. Move a job on the board and the customer gets the update, the tech gets the new route, and the day's plan stays current without a round of phone calls. Automate the ripple, keep the decision.",
  },
  {
    heading: "What about review requests and reporting?",
    body: "Review requests: when a job closes clean, a request goes out automatically with a direct link. Consistency is the whole game with reviews, and automation is consistency. Reporting: the numbers you check every morning (what got done, what got sold, what got missed) get pulled together and delivered on a schedule instead of you stitching them from five screens. Neither of these will change your week on day one, which is why they rank behind invoicing and follow-up. They compound instead.",
  },
  {
    heading: "What stays human?",
    body: "Anything with judgment or a relationship in it. Pricing a weird job, calming down an angry customer, deciding which no-heat call jumps the line, closing a big install: those stay people. The honest rule: automate the parts of the job nobody fights over. If two employees both want to keep a task, it's probably not busywork. If everyone quietly hopes someone else does it, automate it.",
  },
  {
    heading: "How do I pick the first one?",
    body: (
      <>
        {
          "Pick the task that repeats the most and hurts the most when it slips, then start with only that one. A small automation that works this month beats a shop-wide plan that ships next year, and the first win teaches you what to automate second. If you want help ranking your own list, that's exactly what "
        }
        <Link href="/industries/hvac" className="inline-link">
          HVAC business automation
        </Link>
        {" is for."}
      </>
    ),
  },
];

export default function HvacTasksGuidePage() {
  return (
    <>
      <JsonLd
        data={graph(
          articleLd({
            headline: PAGE_TITLE,
            description: PAGE_DESCRIPTION,
            url: PAGE_URL,
            datePublished: "2026-07-01",
            dateModified: "2026-07-01",
            ...(SITE.ogImage
              ? { image: `${SITE.url}${SITE.ogImage}` }
              : {}),
          }),
          breadcrumbLd([
            { name: "Home", url: `${SITE.url}/` },
            { name: "Guides", url: `${SITE.url}/guides` },
            { name: PAGE_TITLE, url: PAGE_URL },
          ]),
        )}
      />
      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-20 sm:px-10 sm:py-28">
        {/* Visible breadcrumb trail (matches the BreadcrumbList schema). */}
        <nav aria-label="Breadcrumb" className="text-sm text-muted">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link
                href="/"
                className="underline decoration-hairline underline-offset-4 transition-colors hover:text-ink"
              >
                Home
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link
                href="/guides"
                className="underline decoration-hairline underline-offset-4 transition-colors hover:text-ink"
              >
                Guides
              </Link>
            </li>
          </ol>
        </nav>

        <article className="mt-10">
          <header>
            <div aria-hidden className="h-[3px] w-10 bg-amber" />
            <h1 className="mt-6 max-w-[24ch] font-display text-[clamp(2.4rem,1.6rem+3vw,4rem)] font-bold uppercase leading-[1.02] tracking-[0.015em] text-balance text-ink">
              HVAC tasks to automate first
            </h1>
            {/* The extractable direct answer, set as the lead. */}
            <p className="mt-6 max-w-[44rem] text-[1.05rem] leading-[1.7] text-body sm:text-[1.125rem]">
              {DIRECT_ANSWER}
            </p>
          </header>

          <div className="mt-4 max-w-[44rem]">
            {SECTIONS.map((section) => (
              <section key={section.heading} className="mt-12">
                <h2 className="max-w-[30ch] font-display text-[clamp(1.45rem,1.15rem+1.1vw,2rem)] font-bold uppercase leading-[1.08] tracking-[0.015em] text-balance text-ink">
                  {section.heading}
                </h2>
                <p className="mt-4 leading-[1.7] text-body">{section.body}</p>
              </section>
            ))}
          </div>

          {/* One soft closing CTA (copy verbatim, single paragraph, inline link). */}
          <Card className="mt-16 max-w-[44rem] p-8 sm:p-10">
            <p className="text-[1.05rem] leading-[1.7] text-ink sm:text-[1.125rem]">
              {"Want a second opinion on your list? "}
              <Link href="/contact" className="inline-link">
                Book a 15-minute fit call
              </Link>
              {
                ". Bring the one task that drives you nuts; I'll tell you straight whether it can run itself."
              }
            </p>
          </Card>
        </article>
      </main>
    </>
  );
}
