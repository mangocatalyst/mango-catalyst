import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { SITE } from "@/lib/constants";
import { JsonLd } from "@/components/seo/JsonLd";
import { articleLd, breadcrumbLd, graph } from "@/lib/jsonld";
import { Card } from "@/components/ui/Card";

/**
 * Evergreen guide: what a heating and cooling owner dashboard should show
 * (st-dashboard-product-plan part 2, SEO/AEO follow-up, 2026-07-13). Same
 * shape as the other guides: extractable direct answer as the lead,
 * question-shaped h2s, undated visible page (dates live in the Article
 * schema), one soft CTA at the close. Every number in the copy is
 * structural (how the math works), never an invented industry statistic.
 */

const PAGE_PATH = "/guides/hvac-owner-dashboard";
const PAGE_URL = `${SITE.url}${PAGE_PATH}`;
const PAGE_TITLE = "What an HVAC Owner Dashboard Should Actually Show";
const PAGE_DESCRIPTION =
  "The six numbers a heating and cooling owner dashboard should show every morning: yesterday's money, the next 30 days of booked work, install backlog, uncollected invoices, booking rate, and crew-reported red flags.";

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

/** The extractable direct answer (the lead paragraph). */
const DIRECT_ANSWER =
  "A heating and cooling owner dashboard should show six things: yesterday's money and work, the next 30 days of booked capacity, sold installs waiting to be installed, invoiced work not yet collected, call booking rate with turned-away calls broken out, and the short list of crew-reported problems that need an owner today. The test for every number on the page is whether you could act on it before lunch. If not, it's a report, not a dashboard.";

/** Question-shaped sections. Bodies without links are plain strings. */
const SECTIONS: { heading: string; body: ReactNode }[] = [
  {
    heading: "Why not just run reports in ServiceTitan?",
    body: "Because reports answer questions you remember to ask, and the expensive problems live in the questions you didn't. Field-management software like ServiceTitan holds every number in this guide; what it doesn't do is put the six that matter on one page, in owner language, before the first truck rolls. A dashboard is a standing decision about what matters, made once, so nobody re-decides it every morning across five screens. The data source doesn't change. The reading habit does.",
  },
  {
    heading: "What belongs in the morning read?",
    body: "Yesterday, in four numbers: revenue invoiced, cash collected, appointments run, and estimates sold. The comparison that keeps those numbers honest is the same weekday last week, not the day before; comparing Monday against Sunday tells you nothing except that Sunday exists. And when yesterday was the weekend, the page should lead with Friday and roll the weekend up separately instead of celebrating a $0 Sunday as a trend.",
  },
  {
    heading: "How far ahead should the booked work look?",
    body: "Thirty days, split by line of business: service hours booked against the hours your techs can actually work, install hours against your install crews' capacity, and sales appointments on the books. The point isn't the number today; it's the shape. A soft week three weeks out is a marketing problem you can still fix. The same soft week discovered on Monday morning is just a bad week.",
  },
  {
    heading: "Why does install backlog get its own number?",
    body: "Sold-but-not-installed jobs are money you've promised to earn and work you've promised to deliver, and neither shows up in yesterday's revenue. Total the sold value waiting on the schedule, count the jobs, and trend it. Backlog growing means install capacity is the constraint; backlog shrinking toward zero means the sales pipeline is. Owners feel this number in their gut all season; the dashboard's job is to replace the gut with a line on a chart.",
  },
  {
    heading: "Why watch uncollected invoices every day?",
    body: "Because finished work that isn't collected is payroll you've already spent chasing revenue you don't have yet. The dashboard should show the total open balance, the count of open invoices, and the list itself, oldest first, with receivables aging behind it. Daily matters here: a balance that needs a phone call ages politely in a weekly report and gets awkward in a monthly one. The list shrinks when it's looked at.",
  },
  {
    heading: "What do the phones tell you that revenue can't?",
    body: "Booking rate is the earliest signal in the whole business: booked calls divided by bookable calls, with the junk (hangups, spam, vendors) excluded from the denominator so the rate means something. Break out the calls you turned away on purpose because the board was full. Turned-away calls are capacity telling you it's the bottleneck, and that's a hiring signal weeks before revenue would ever show it. Revenue tells you about last month's phones; the phones tell you about next month's revenue.",
  },
  {
    heading: "Can crew chatter belong on a dashboard?",
    body: (
      <>
        {
          "It's the highest-value section on the page, if you can get it there. Failed inspections, financing denials, a customer going cold, equipment stuck on backorder: your crew already reports these, buried in job-channel chatter in Slack. An AI pass over those channels every night can surface the handful of messages that need an owner's eyes, sorted into red flags and wins. The judgment stays human; the surfacing is what gets automated. That's how the "
        }
        <Link href="/dashboards" className="inline-link">
          Owner Dashboard
        </Link>
        {
          " does it, and the wins column matters as much as the flags: good news travels slower than bad in every shop."
        }
      </>
    ),
  },
  {
    heading: "What should a dashboard refuse to show?",
    body: (
      <>
        {
          "Anything you can't act on before lunch. Forty KPIs is the same as zero; vanity numbers like total lifetime revenue are wallpaper; and any metric nobody has ever changed a decision over is a candidate for deletion. The discipline runs the other way too: six numbers you trust beat forty you skim, because the page earns a daily habit only when it reads in ninety seconds. If your version of a dashboard is asking the office manager to run three reports, start smaller than you think, the way "
        }
        <Link href="/industries/hvac-automation" className="inline-link">
          HVAC automation
        </Link>
        {" in general should start: with the thing that hurts weekly."}
      </>
    ),
  },
];

export default function HvacOwnerDashboardGuidePage() {
  return (
    <>
      <JsonLd
        data={graph(
          articleLd({
            headline: PAGE_TITLE,
            description: PAGE_DESCRIPTION,
            url: PAGE_URL,
            datePublished: "2026-07-13",
            dateModified: "2026-07-13",
            ...(SITE.ogImage ? { image: `${SITE.url}${SITE.ogImage}` } : {}),
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
              What an HVAC owner dashboard should actually show
            </h1>
            {/* The extractable direct answer, set as the lead. */}
            <p className="mt-6 max-w-[44rem] text-[1.05rem] leading-[1.7] text-body sm:text-[1.125rem] lg:max-w-[52rem] lg:text-[1.2rem]">
              {DIRECT_ANSWER}
            </p>
          </header>

          <div className="mt-4 max-w-[44rem] lg:max-w-[52rem] lg:text-[1.2rem]">
            {SECTIONS.map((section) => (
              <section key={section.heading} className="mt-12">
                <h2 className="max-w-[30ch] font-display text-[clamp(1.45rem,1.15rem+1.1vw,2rem)] font-bold uppercase leading-[1.08] tracking-[0.015em] text-balance text-ink">
                  {section.heading}
                </h2>
                <p className="mt-4 leading-[1.7] text-body">{section.body}</p>
              </section>
            ))}
          </div>

          {/* One soft closing CTA (single paragraph, inline links). */}
          <Card className="mt-16 max-w-[44rem] p-8 sm:p-10 lg:max-w-[52rem]">
            <p className="text-[1.05rem] leading-[1.7] text-ink sm:text-[1.125rem]">
              {"Want to see all six numbers on one real page? "}
              <Link href="/dashboards" className="inline-link">
                Click through the Owner Dashboard demo
              </Link>
              {
                ", a fully working dashboard for a fictional company. Or bring your own morning routine to a "
              }
              <Link href="/contact" className="inline-link">
                15-minute fit call
              </Link>
              {" and I'll tell you straight what it would take to replace it."}
            </p>
          </Card>
        </article>
      </main>
    </>
  );
}
