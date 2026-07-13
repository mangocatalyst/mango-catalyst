import Link from "next/link";
import { SITE } from "@/lib/constants";
import { pageMetadata } from "@/lib/metadata";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbLd, graph, serviceLd } from "@/lib/jsonld";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { IndustryHero } from "@/components/industries/IndustryHero";

/**
 * Owner Dashboard product page (added 2026-07-13, st-dashboard-product-plan
 * part 2). The centerpiece is a LIVE embed of the demo dashboard: a fully
 * functional, self-contained build of the real product running on synthetic
 * data for a fictional company (Boreal Comfort Co). The artifact is baked by
 * demo/bake-demo.sh, which refuses to ship if any real customer or employee
 * string leaks in (demo/privacy-validator.js).
 */

const PATH = "/dashboards";
const DESCRIPTION =
  "One page that shows a service-shop owner the whole business at 6 AM: yesterday's numbers, the next 30 days of booked work, sold installs waiting, uncollected invoices, and red flags pulled nightly from the crew's Slack. Refreshed hourly from ServiceTitan, read-only.";

export const metadata = pageMetadata({
  title: "Owner Dashboard: Your Whole Shop on One Page",
  path: PATH,
  description: DESCRIPTION,
});

const FEATURES: { lead: string; text: string }[] = [
  {
    lead: "Yesterday, without asking anyone.",
    text: "Revenue, appointments run, calls booked, estimates sold. The numbers your office would piece together by 10 AM are on the page before the first truck rolls.",
  },
  {
    lead: "The next 30 days of booked work.",
    text: "Service book percentage day by day, install hours against crew capacity, and sales appointments on the books. You see the slow week coming while there's still time to fill it.",
  },
  {
    lead: "Red flags and wins from your crew's Slack.",
    text: "An AI pass reads the job channels every night and surfaces what needs an owner's eyes: a denied financing application, a failed inspection, a customer going cold. Wins get the same treatment, so the good news travels too.",
  },
  {
    lead: "Money sold but not yet installed.",
    text: "Every sold install waiting on the schedule, totaled and trended, so backlog is a number instead of a feeling.",
  },
  {
    lead: "Money finished but not yet collected.",
    text: "Invoiced work with an open balance, oldest first, with receivables aging behind it. The polite name for it is cash flow; the page just shows you the list.",
  },
  {
    lead: "Close rates, phones, and people.",
    text: "Booking rate with turned-away calls broken out, sold-estimate leaderboards, per-person scorecards on their own tabs, memberships, and the hours that deserve a second look.",
  },
];

const HOW: { title: string; body: string }[] = [
  {
    title: "Read-only pull from ServiceTitan",
    body: "The dashboard reads jobs, invoices, estimates, calls, and schedules through ServiceTitan's API with read-only credentials. It can't change a thing in your system, and it refreshes every hour through the workday.",
  },
  {
    title: "Nightly AI triage of the crew's Slack",
    body: "If your crews talk in job channels, an AI pass runs after close and pulls out the handful of messages an owner should actually see, sorted into red flags and wins.",
  },
  {
    title: "One page, on any device, behind a login",
    body: "Everything bakes into a single fast page: no app to install, no seats to buy, no dashboard builder to learn. Your crew can get their own view, like an install whiteboard, without seeing the owner numbers.",
  },
];

export default function DashboardsPage() {
  return (
    <>
      <JsonLd
        data={graph(
          serviceLd({
            name: "Owner Dashboard",
            description: DESCRIPTION,
            url: `${SITE.url}${PATH}`,
          }),
          breadcrumbLd([
            { name: "Home", url: SITE.url },
            { name: "Owner Dashboard", url: `${SITE.url}${PATH}` },
          ]),
        )}
      />

      <main>
        <IndustryHero
          title="Your whole shop on one page at 6 AM"
          intro="The Owner Dashboard answers the question every service-shop owner starts the day with: how are we actually doing? Yesterday's revenue and calls, the next 30 days of booked work, sold installs waiting, invoices not yet collected, and the red flags your crew mentioned in Slack overnight. It refreshes itself hourly from ServiceTitan, read-only, and it was built and battle-tested inside a real heating and cooling shop, not a software lab."
          art={null}
        />

        <Section id="live-demo" tone="light">
          <SectionHeading
            tone="light"
            title="Don't take the tour. Drive it."
            lead="This is the real product running on invented numbers: a fictional company, a fictional crew, every name and dollar synthetic. Everything else is exactly what you'd get. Switch the tabs, click the panels, open the charts."
          />
          <div className="mt-10">
            <div className="overflow-hidden rounded-lg border border-border-lt bg-white shadow-lg">
              <div className="flex items-center gap-2 border-b border-border-lt bg-light px-4 py-2.5">
                <span aria-hidden className="size-2.5 rounded-full bg-border-lt" />
                <span aria-hidden className="size-2.5 rounded-full bg-border-lt" />
                <span aria-hidden className="size-2.5 rounded-full bg-border-lt" />
                <span className="ml-3 truncate text-[0.8rem] text-muted-lt">
                  Boreal Comfort Co · Owner Dashboard · demonstration data
                </span>
              </div>
              <iframe
                src="/demo/dashboard.html"
                title="Owner Dashboard live demo with fictional data"
                loading="lazy"
                className="h-[46rem] w-full"
              />
            </div>
            <p className="mt-4 text-[0.95rem] leading-[1.6] text-navy-2">
              {"Cramped in a frame? "}
              <a
                href="/demo/dashboard.html"
                target="_blank"
                rel="noopener"
                className="inline-link-light"
              >
                Open the full demo in its own tab
              </a>
              {
                ". It works on your phone too, because that's where owners actually read it."
              }
            </p>
          </div>
        </Section>

        <Section id="what-you-see" tone="deep">
          <SectionHeading
            title="What an owner sees"
            lead="Six views: Operations for the morning read, then Service, Sales, Install, Office, and Financial when you want to go deeper."
          />
          <ul className="mt-10 grid max-w-[52rem] gap-7">
            {FEATURES.map((f) => (
              <li key={f.lead} className="flex gap-5">
                <span
                  aria-hidden
                  className="mt-[0.7em] h-[3px] w-6 flex-none bg-amber"
                />
                <p className="leading-[1.65] text-muted">
                  <strong className="font-semibold text-ink">{f.lead}</strong>{" "}
                  {f.text}
                </p>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="how-it-works">
          <SectionHeading
            title="How it works"
            lead="Three moving parts, none of them yours to babysit:"
          />
          <ol className="mt-10 grid max-w-[52rem] gap-10">
            {HOW.map((step, i) => (
              <li key={step.title} className="flex items-start gap-5">
                <span
                  aria-hidden
                  className="font-display text-[1.6rem] font-bold text-muted/60"
                >
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-display text-[1.3rem] font-bold uppercase tracking-[0.015em] text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-3 leading-[1.65] text-body">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </Section>

        <Section id="privacy" tone="deep">
          <SectionHeading
            title="Your numbers stay yours"
            lead="A dashboard full of customer names and revenue is exactly the data that shouldn't wander:"
          />
          <ul className="mt-10 grid max-w-[52rem] gap-6">
            {[
              "The ServiceTitan credentials are read-only. The dashboard can look; it can never touch.",
              "It can run entirely on a machine inside your building, so customer information never leaves your walls. A managed hosted option exists when you'd rather not own hardware.",
              "Access is a per-person login you control. Remove someone from the list and they're out.",
              "The demo above proves the point in miniature: it ships through a validator that blocks the build if a single real name slips in. Handling your data carefully isn't a promise here, it's tooling.",
            ].map((point) => (
              <li key={point.slice(0, 24)} className="flex gap-5">
                <span
                  aria-hidden
                  className="mt-[0.55em] size-[7px] flex-none rounded-full bg-amber"
                />
                <p className="leading-[1.65] text-body">{point}</p>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="who" tone="light">
          <SectionHeading tone="light" title="Who it's for" />
          <p className="mt-8 max-w-[44rem] leading-[1.65] text-navy-2 lg:max-w-[52rem] lg:text-[1.2rem]">
            {
              "Owners of HVAC, plumbing, electrical, and other service shops that run on ServiceTitan and are tired of learning the bad news a week late. If your version of a dashboard is asking the office manager to run three reports, this replaces that conversation. Curious what else can run itself? Here's "
            }
            <Link href="/services" className="inline-link-light">
              the full list of what I build
            </Link>
            {"."}
          </p>
        </Section>

        <Section id="book" tone="deep">
          <div aria-hidden className="h-[3px] w-10 bg-amber" />
          <p className="mt-6 max-w-[26ch] font-display text-[clamp(1.9rem,1.2rem+2.4vw,3rem)] font-bold uppercase leading-[1.08] tracking-[0.015em] text-balance text-ink">
            {
              "One 15-minute call. Bring your ServiceTitan, and I'll show you what your 6 AM page would say."
            }
          </p>
          <div className="mt-9">
            <Button href="/contact" arrow>
              Book a 15-Minute Fit Call
            </Button>
          </div>
        </Section>
      </main>
    </>
  );
}
