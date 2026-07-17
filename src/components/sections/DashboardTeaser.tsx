import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Home teaser for /dashboards: text only, matching the AiTeaser shape
 * (heading, one paragraph, one link). The screenshots and live demos moved
 * out of the homepage entirely (2026-07-16, "the dashboards feel out of
 * place"); /dashboards is where the visitor opts into all of that. The
 * dashboard is now sold standalone (setup + minimal monthly); numbers live
 * on /dashboards, not here.
 */
export function DashboardTeaser() {
  return (
    <Section id="owner-dashboard" tone="light">
      <SectionHeading
        tone="light"
        title="The Owner Dashboard"
        lead="Your whole shop on one page at 6 AM: yesterday's numbers, the next 30 days of booked work, and the red flags your crew mentioned in Slack overnight. Refreshed hourly from ServiceTitan, read-only, and the same data feeds a live install whiteboard for the crew."
      />
      <p className="mt-8 max-w-[44rem] leading-[1.65] text-navy-2 lg:max-w-[52rem]">
        {
          "It's already built, and it's the one thing here you can buy on its own: $795 to wire it to your ServiceTitan, $125 a month to keep it synced and maintained, and that's the whole relationship if you want it to be. There's a fully working demo for a fictional company, every number synthetic, that you can "
        }
        <Link href="/dashboards" className="inline-link-light">
          click through right now
        </Link>
        .
      </p>
    </Section>
  );
}
