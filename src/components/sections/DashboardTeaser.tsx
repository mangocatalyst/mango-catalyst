import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Home teaser for /dashboards (st-dashboard-product-plan part 2): one
 * screenshot of the DEMO bake (never the real deployment), one line, one
 * link. A static image on purpose: a live iframe here would drag LCP for
 * visitors who never scroll to it; the full clickable demo lives on
 * /dashboards where the visitor has already opted in.
 */
export function DashboardTeaser() {
  return (
    <Section id="owner-dashboard" tone="light">
      <SectionHeading
        tone="light"
        title="The Owner Dashboard"
        lead="Your whole shop on one page at 6 AM: yesterday's numbers, the next 30 days of booked work, and the red flags your crew mentioned in Slack overnight. Refreshed hourly from ServiceTitan, read-only."
      />
      <div className="mt-10">
        <Link
          href="/dashboards"
          aria-label="See the Owner Dashboard, with a live demo you can click through"
          className="group block max-w-[56rem]"
        >
          <span className="block overflow-hidden rounded-lg border border-border-lt shadow-lg transition-transform duration-150 group-hover:-translate-y-1">
            <Image
              src="/dashboards/teaser.png"
              alt="The Owner Dashboard's Operations view for a fictional demo company: today's board, revenue, sold installs waiting, and uncollected invoices"
              width={1600}
              height={1160}
              sizes="(min-width: 1024px) 56rem, 100vw"
            />
          </span>
        </Link>
        <p className="mt-5 max-w-[44rem] leading-[1.65] text-navy-2">
          {"Don't take the screenshot's word for it: "}
          <Link href="/dashboards" className="inline-link-light">
            click through the live demo
          </Link>
          {
            ", a fully working dashboard for a fictional company, every number synthetic."
          }
        </p>

        <h3 className="mt-16 font-display text-[1.4rem] font-bold uppercase tracking-[0.015em] text-navy">
          And the crew gets the install whiteboard
        </h3>
        <p className="mt-3 max-w-[44rem] leading-[1.65] text-navy-2">
          The same data feeds a shared board the install crew runs on: every
          sold job a row, every step to done a checkbox, and the steps
          ServiceTitan can prove filled in automatically.
        </p>
        <div className="mt-7">
          <Link
            href="/dashboards#whiteboard"
            aria-label="See the install whiteboard, with a live demo you can click through"
            className="group block max-w-[56rem]"
          >
            <span className="block overflow-hidden rounded-lg border border-border-lt shadow-lg transition-transform duration-150 group-hover:-translate-y-1">
              <Image
                src="/dashboards/whiteboard-teaser.png"
                alt="The install whiteboard for a fictional demo company: sold installs as rows with permit, inspection, registration, and payment checkboxes"
                width={1600}
                height={1160}
                sizes="(min-width: 1024px) 56rem, 100vw"
              />
            </span>
          </Link>
          <p className="mt-5 max-w-[44rem] leading-[1.65] text-navy-2">
            {"This one has a "}
            <Link href="/dashboards#whiteboard" className="inline-link-light">
              live demo too
            </Link>
            {": tick the boxes, cycle the pills, type a note."}
          </p>
        </div>
      </div>
    </Section>
  );
}
