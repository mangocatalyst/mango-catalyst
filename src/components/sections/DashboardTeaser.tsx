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
      </div>
    </Section>
  );
}
