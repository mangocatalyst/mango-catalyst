import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";
import { ProgramPageBody } from "@/components/programs/ProgramPageBody";

/**
 * Programs / Slack (2026-07-06 footer-programs expansion). Experience claim
 * kept modest and true: Bryan ran a shop whose daily coordination lived in
 * Slack, wired into the field-management system, and built that wiring.
 */

const PATH = "/programs/slack";
const DESCRIPTION =
  "Slack automation for small shops: job alerts, lead pings, and the morning numbers posted where your team already talks, instead of one more inbox to check.";

export const metadata = pageMetadata({
  title: "Slack Automation for Small Shops",
  path: PATH,
  description: DESCRIPTION,
});

export default function SlackProgramPage() {
  return (
    <ProgramPageBody
      data={{
        serviceName: "Slack Automation",
        h1: "Slack that runs the shop, not just the chatter",
        path: PATH,
        description: DESCRIPTION,
        intro:
          "Slack is the team-chat tool: channels instead of email chains, and a searchable record of who said what. Most small businesses that use it treat it as a walkie-talkie. It's far more useful as the place where your other systems report in. I ran service operations at a shop whose daily coordination lived in Slack, wired into the field-management software, and I built a lot of that wiring, so the office found out about things from a channel instead of from copy-paste.",
        examplesTitle: "What we can build in Slack",
        examplesLead:
          "The pattern is simple: the software your business runs on posts to the channel where the right people already are:",
        examples: [
          "A new lead posts to the sales channel the moment it comes in, with the details already attached, so whoever's free can grab it.",
          "Job and schedule changes announce themselves: the booked job, the moved appointment, the tech who called in, all in the channel the office is already watching.",
          "The morning numbers arrive as a message every day: yesterday's jobs, sales, and misses, before anyone has opened a report screen.",
          "Each big job or project gets its own channel, created automatically, with the links to everything about it pinned where the crew can find them.",
          "When something breaks, an invoice that failed to send, a form that stopped working, Slack tells you, instead of a customer telling you three weeks later.",
        ],
        outro:
          "None of this means more typing for your team. It means the systems they already use start talking to them in the one place they actually look.",
        whereToStart: (
          <>
            {"Slack is usually one piece of a bigger wiring job, so browse "}
            <Link href="/services" className="inline-link-light">
              the full list of what we build
            </Link>
            {", or see how it fits a trades office in "}
            <Link href="/industries/hvac-automation" className="inline-link-light">
              HVAC business automation
            </Link>
            {". If you'd rather just talk it through, that's what the call is for."}
          </>
        ),
      }}
    />
  );
}
