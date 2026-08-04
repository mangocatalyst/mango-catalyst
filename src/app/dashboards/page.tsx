import Link from "next/link";
import { SITE } from "@/lib/constants";
import { pageMetadata } from "@/lib/metadata";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbLd, graph, serviceLd } from "@/lib/jsonld";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { BookButton } from "@/components/booking/BookButton";
import { Card } from "@/components/ui/Card";
import { CheckIcon } from "@/components/ui/icons";
import { IndustryHero } from "@/components/industries/IndustryHero";
import { ScreenshotRow, type Screenshot } from "@/components/ui/Lightbox";
import { ContactBand } from "@/components/sections/ContactBand";

/**
 * Dashboards product page (added 2026-07-13, st-dashboard-product-plan part 2;
 * the commission tracker joined it 2026-07-24). Two products, each with a LIVE
 * embed: a fully functional, self-contained build of the real thing running on
 * synthetic data for a fictional company (Boreal Comfort Co). Both artifacts,
 * and the still shots under them, are baked by demo/bake-demo.sh and
 * demo/capture-screens.sh, which refuse to ship if any real customer or
 * employee string leaks in (demo/privacy-validator.js).
 *
 * Both products are standalone, same shape: $795 setup + $125/month, no
 * full-service retainer required. Owner dashboard standalone since 2026-07-16;
 * the commission tracker was priced 2026-07-29 (it had been quote-on-a-call).
 * Pricing rule: state the numbers flat, never justify them.
 *
 * Success unit, decided 2026-07-29: land with a product, expand to the retainer.
 * That is why the pricing lead no longer promises nobody will raise the retainer;
 * it promises the customer starts that conversation. See the vault note
 * mc-success-unit-decision-2026-07-29 before loosening either sentence.
 */

const PATH = "/dashboards";
const DESCRIPTION =
  "Two ServiceTitan-fed products for a service shop: an owner dashboard that puts the whole business on one page at 6 AM, and a commission tracker that computes every tech's pay line and exports the approved period to payroll. Both read-only, both with a clickable demo.";
const OWNER_DESCRIPTION =
  "One page that shows a service-shop owner the whole business at 6 AM: yesterday's numbers, the next 30 days of booked work, sold installs waiting, uncollected invoices, and red flags pulled nightly from the crew's Slack. Refreshed hourly from ServiceTitan, read-only.";
const COMMISSION_DESCRIPTION =
  "Commission tracking for a service shop: every tech's pay line computed from ServiceTitan invoices, a portal where each tech approves or disputes their own lines, and a one-click payroll export once the pay period is approved. Read-only pull, nothing written back.";

export const metadata = pageMetadata({
  title: "Dashboards: Your Whole Shop, and Everyone's Commission",
  path: PATH,
  description: DESCRIPTION,
});

/** 2880x1800 is the capture size in demo/capture-screens.sh (1440x900 at 2x). */
const SHOT = { width: 2880, height: 1800 } as const;

const OWNER_SHOTS: Screenshot[] = [
  {
    ...SHOT,
    src: "/dashboards/owner-dashboard-operations.png",
    alt: "The owner dashboard Operations tab: revenue, work in progress, uncollected invoices, and today's appointment counts",
    caption:
      "Operations: the 6 AM read. Yesterday's revenue, today's book, and the money already sold or already invoiced.",
  },
  {
    ...SHOT,
    src: "/dashboards/owner-dashboard-sales.png",
    alt: "The owner dashboard Sales tab: team sold totals, unsold estimates, and a card per salesperson with close rates",
    caption:
      "Sales: what the team sold, what is still on the table, and a card per person with their close rate.",
  },
  {
    ...SHOT,
    src: "/dashboards/owner-dashboard-financial.png",
    alt: "The owner dashboard Financial tab: month to date invoiced, collected, and a list of invoices with an open balance",
    caption:
      "Financial: invoiced against collected, then the list of open balances oldest first.",
  },
];

const WHITEBOARD_SHOTS: Screenshot[] = [
  {
    ...SHOT,
    src: "/dashboards/install-whiteboard.png",
    alt: "The install whiteboard: one row per sold install, with a shared checkbox for each step from permit to payment",
    caption:
      "One row per sold install. The steps ServiceTitan can prove tick themselves; the rest the crew ticks as they go.",
  },
];

const COMMISSION_SHOTS: Screenshot[] = [
  {
    ...SHOT,
    src: "/dashboards/commission-master.png",
    alt: "The commission tracker office view: a card per earner listing every commission line with its basis, rate and amount",
    caption:
      "The office view: every earner, every line, and the invoice each one was computed from.",
  },
  {
    ...SHOT,
    src: "/dashboards/commission-portal.png",
    alt: "A technician's own commission portal: their lines for the pay period, with approve and dispute checkboxes",
    caption:
      "What a tech sees: their own lines and nobody else's, with a tick for approve and a tick for dispute.",
  },
];

const COMMISSION_FEATURES: string[] = [
  "Every line is computed from a paid ServiceTitan invoice, not typed into a spreadsheet: the job, the customer, the basis, the rate, and the dollars, with the qualifying items behind the number one click away.",
  "Each tech gets their own portal. They see their lines and nobody else's, and they tick approve or dispute before payday instead of arguing about it after.",
  "Flat rates, percentages, tier gates, turnover splits, membership spiffs, and one-off manual lines all live in the same rule set, so an unusual agreement does not become an unusual spreadsheet.",
  "You can override a line, zero it, move it to the next pay period, or pay a projected one early. Every edit is recorded with who and when.",
  "Approve the pay period and export it: one row per person, ready for the payroll import. The tracker names anything blocking the export before you press the button.",
  "The ServiceTitan pull is read-only, same as the owner dashboard. It computes pay; it never writes to your system.",
];

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
    body: "Everything bakes into a single fast page: no app to install, no seats to buy, no dashboard builder to learn. Your crew can get their own view, like the install whiteboard demoed below, without seeing the owner numbers.",
  },
];

export default function DashboardsPage() {
  return (
    <>
      <JsonLd
        data={graph(
          {
            ...serviceLd({
              name: "Owner Dashboard",
              description: OWNER_DESCRIPTION,
              url: `${SITE.url}${PATH}`,
            }),
            offers: [
              {
                "@type": "Offer",
                price: "795",
                priceCurrency: "USD",
                description:
                  "One-time setup: the dashboard wired to your ServiceTitan, logins created, crew whiteboard included.",
              },
              {
                "@type": "Offer",
                price: "125",
                priceCurrency: "USD",
                description:
                  "Per month: hosting, the hourly ServiceTitan sync, the nightly AI pass, and fixes. Month to month, cancel anytime.",
              },
            ],
          },
          /* The commission tracker was deliberately unpriced until 2026-07-29, on the
             rule that schema inventing a number is worse than schema omitting one. It
             now has a real one (owner's call, 2026-07-29): same shape as the dashboard,
             $795 setup + $125/month. */
          {
            ...serviceLd({
              name: "Commission Tracker",
              description: COMMISSION_DESCRIPTION,
              url: `${SITE.url}${PATH}#commission`,
            }),
            offers: [
              {
                "@type": "Offer",
                price: "795",
                priceCurrency: "USD",
                description:
                  "One-time setup: the tracker wired to your ServiceTitan, your actual pay agreements encoded, tech portals created.",
              },
              {
                "@type": "Offer",
                price: "125",
                priceCurrency: "USD",
                description:
                  "Per month: hosting, the ServiceTitan sync, the tech approval portal, the payroll export, and fixes. Month to month, cancel anytime.",
              },
            ],
          },
          breadcrumbLd([
            { name: "Home", url: SITE.url },
            { name: "Dashboards", url: `${SITE.url}${PATH}` },
          ]),
        )}
      />

      <main>
        <IndustryHero
          title="Your whole shop on one page at 6 AM"
          intro="Two products, both fed by the ServiceTitan you already pay for, both built and battle-tested inside a real heating and cooling shop rather than a software lab. The owner dashboard answers the question every owner starts the day with: how are we actually doing? The commission tracker answers the one every tech asks on payday: is this number right? Both are read-only, and both have a working demo further down this page."
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
            <ScreenshotRow shots={OWNER_SHOTS} />
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

        <Section id="pricing" tone="light">
          <SectionHeading
            tone="light"
            title="What the owner dashboard costs"
            lead="Both products are standalone and priced flat, each with its own setup and its own monthly: two products means two of each, not a bundle. Neither one requires the monthly automation service. Buy a dashboard, keep it, and that can be the whole relationship. If you ever want something else automated, that's a separate conversation, a separate price, and you start it."
          />
          <div className="mt-12 max-w-[30rem]">
            <Card tone="light" accent className="p-7 sm:p-9">
              <div>
                <h3 className="text-[0.8rem] font-semibold tracking-[0.18em] uppercase text-muted-lt">
                  Setup
                </h3>
                <p className="mt-2 flex flex-wrap items-baseline gap-x-3">
                  <span className="font-display text-[3rem] leading-none font-bold text-navy sm:text-[3.5rem]">
                    $795
                  </span>
                  <span className="text-[0.95rem] font-medium text-muted-lt">
                    one-time
                  </span>
                </p>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-navy-2">
                  I wire the dashboard to your ServiceTitan, set up the logins,
                  and stand up the crew whiteboard if you want it.
                </p>
              </div>

              <hr className="my-7 border-border-lt" />

              <div>
                <h3 className="text-[0.8rem] font-semibold tracking-[0.18em] uppercase text-muted-lt">
                  Keeping it running
                </h3>
                <p className="mt-2 flex flex-wrap items-baseline gap-x-3">
                  <span className="font-display text-[3rem] leading-none font-bold text-navy sm:text-[3.5rem]">
                    $125
                  </span>
                  <span className="text-[0.95rem] font-medium text-muted-lt">
                    a month
                  </span>
                </p>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-navy-2">
                  Month to month, cancel anytime. The dashboard runs while the
                  monthly runs; if you cancel, it stops, and your data was never
                  mine to keep. It lives in your ServiceTitan.
                </p>
              </div>

              <hr className="my-7 border-border-lt" />

              <p className="font-semibold text-navy">What the monthly covers:</p>
              <ul className="mt-4 flex flex-col gap-3.5">
                {[
                  "Hosting, the hourly ServiceTitan sync, and the nightly AI pass over the crew's Slack.",
                  "Fixes when something breaks, including when ServiceTitan changes its API out from under us.",
                  "Roster upkeep: a tech joins or leaves, and the logins and scorecards follow.",
                  "Custom metrics and new views get scoped and agreed first, so there are no surprise bills.",
                ].map((item) => (
                  <li key={item.slice(0, 24)} className="flex gap-3">
                    <CheckIcon className="mt-0.5 size-5 flex-none text-navy-2" />
                    <span className="text-[0.95rem] leading-relaxed text-navy-2">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <BookButton href="/contact#book" className="mt-8 w-full" arrow>
                Book a 15-Minute Fit Call
              </BookButton>
            </Card>
          </div>
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

        <Section id="whiteboard" tone="light">
          <SectionHeading
            tone="light"
            title="The crew's view: the install whiteboard"
            lead="Every sold install is a row; every step to a finished, paid, registered job is a checkbox the whole crew shares. The steps ServiceTitan can prove, like equipment recorded, registration filed, and payment collected, check themselves. This one runs on the same fictional company as the dashboard above: click the pills, tick the boxes, type a note."
          />
          <div className="mt-10">
            <div className="overflow-hidden rounded-lg border border-border-lt bg-white shadow-lg">
              <div className="flex items-center gap-2 border-b border-border-lt bg-light px-4 py-2.5">
                <span aria-hidden className="size-2.5 rounded-full bg-border-lt" />
                <span aria-hidden className="size-2.5 rounded-full bg-border-lt" />
                <span aria-hidden className="size-2.5 rounded-full bg-border-lt" />
                <span className="ml-3 truncate text-[0.8rem] text-muted-lt">
                  Boreal Comfort Co · Install Whiteboard · demonstration data
                </span>
              </div>
              <iframe
                src="/demo/whiteboard.html"
                title="Install whiteboard live demo with fictional data"
                loading="lazy"
                className="h-[42rem] w-full"
              />
            </div>
            <p className="mt-4 text-[0.95rem] leading-[1.6] text-navy-2">
              {"Cramped in a frame? "}
              <a
                href="/demo/whiteboard.html"
                target="_blank"
                rel="noopener"
                className="inline-link-light"
              >
                Open the whiteboard demo in its own tab
              </a>
              {
                ". The real one lives at a private URL the crew opens on the shop TV and their phones."
              }
            </p>
            <ScreenshotRow shots={WHITEBOARD_SHOTS} />
          </div>
        </Section>

        <Section id="commission" tone="base">
          <SectionHeading
            title="The second product: the commission tracker"
            lead="Same ServiceTitan connection, a different question. Every commission line your techs and comfort advisors earn, computed from paid invoices instead of assembled in a spreadsheet on the Friday before payroll."
          />
          <ul className="mt-10 grid max-w-[52rem] gap-6">
            {COMMISSION_FEATURES.map((point) => (
              <li key={point.slice(0, 24)} className="flex gap-5">
                <span
                  aria-hidden
                  className="mt-[0.7em] h-[3px] w-6 flex-none bg-amber"
                />
                <p className="leading-[1.65] text-body">{point}</p>
              </li>
            ))}
          </ul>
          {/* PRICING: the owner's decision, 2026-07-29, superseding the unpriced
              2026-07-24 posture. Never invent dollars here. The final clause is a
              deliberate guard: tracker setup encodes real pay agreements, which vary
              far more than a dashboard wiring job does. */}
          <p className="mt-12 max-w-[44rem] leading-[1.65] text-body">
            {
              "$795 one-time to wire it to your ServiceTitan and encode your actual pay agreements, then $125 a month to keep it running. Month to month, cancel anytime. The setup is the real work, because every shop's agreements are different; if yours turn out to be unusual enough that $795 doesn't cover it, I tell you the number before I start, not after. "
            }
            <Link href="/contact#book" className="inline-link">
              Book a 15-minute fit call
            </Link>
            {"."}
          </p>
        </Section>

        <Section id="commission-demo" tone="light">
          <SectionHeading
            tone="light"
            title="Same deal: drive it yourself"
            lead="The real tracker, running on the same fictional company as the two demos above, with the same crew and the same customers. Override a line, tick a dispute, approve the pay period, then export the payroll file. Every edit sticks until you reload, and nothing here has ever touched a real person's pay."
          />
          <div className="mt-10">
            <div className="overflow-hidden rounded-lg border border-border-lt bg-white shadow-lg">
              <div className="flex items-center gap-2 border-b border-border-lt bg-light px-4 py-2.5">
                <span aria-hidden className="size-2.5 rounded-full bg-border-lt" />
                <span aria-hidden className="size-2.5 rounded-full bg-border-lt" />
                <span aria-hidden className="size-2.5 rounded-full bg-border-lt" />
                <span className="ml-3 truncate text-[0.8rem] text-muted-lt">
                  Boreal Comfort Co · Commission Tracker · demonstration data
                </span>
              </div>
              <iframe
                src="/demo/commission.html"
                title="Commission tracker live demo with fictional data"
                loading="lazy"
                className="h-[42rem] w-full"
              />
            </div>
            <p className="mt-4 text-[0.95rem] leading-[1.6] text-navy-2">
              {"Cramped in a frame? "}
              <a
                href="/demo/commission.html"
                target="_blank"
                rel="noopener"
                className="inline-link-light"
              >
                Open the commission demo in its own tab
              </a>
              {", or see "}
              <a
                href="/demo/commission-portal.html"
                target="_blank"
                rel="noopener"
                className="inline-link-light"
              >
                {"the tech's own portal"}
              </a>
              {", which is all any one earner can reach."}
            </p>
            <ScreenshotRow shots={COMMISSION_SHOTS} />
          </div>
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

        {/* pt-0: the band above is light too, so the two read as one zone. */}
        <ContactBand
          idPrefix="dashboards"
          lead="Not ready to book a call? Ask a question about either product, or tell me what your commission spreadsheet looks like now. I reply within one business day."
          containerClassName="pt-0"
        />

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
