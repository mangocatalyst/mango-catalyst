import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";
import { ProgramPageBody } from "@/components/programs/ProgramPageBody";
import { OWNER_SHOTS, WHITEBOARD_SHOTS } from "@/lib/product-shots";

/**
 * Programs / ServiceTitan (2026-07-06 footer-programs expansion). Experience
 * claims trace to the About page: Bryan ran service operations inside
 * ServiceTitan daily at a real shop. Platform I work in, never a system I
 * built (00 rule).
 */

const PATH = "/programs/servicetitan";
const DESCRIPTION =
  "ServiceTitan automation from someone who ran a shop inside it every day: invoicing, equipment records, reporting, and API integrations to the rest of your stack.";

export const metadata = pageMetadata({
  title: "ServiceTitan Automation and Integrations",
  path: PATH,
  description: DESCRIPTION,
});

export default function ServiceTitanProgramPage() {
  return (
    <ProgramPageBody
      data={{
        serviceName: "ServiceTitan Automation",
        h1: "ServiceTitan, actually pulling its weight",
        path: PATH,
        description: DESCRIPTION,
        intro:
          "ServiceTitan is the platform that runs a modern service shop end to end: call booking, dispatch, invoicing, payroll, reporting. It's deep, it's powerful, and most shops pay for far more of it than they use. I'm not a reseller and I don't have a partner logo to show you. I ran service operations inside ServiceTitan every day at a real shop, and I've built automation around it through its API, so I know the difference between what the brochure says and what the office actually clicks through.",
        examplesTitle: "What we can build around ServiceTitan",
        examplesLead:
          "The goal isn't more ServiceTitan. It's the ServiceTitan you already pay for, connected and running the boring parts on its own:",
        examples: [
          "Invoices and follow-ups fire when the job closes, not when someone in the office finds a free hour.",
          "Every installed unit gets logged with model and serial, and the manufacturer warranty registration happens the same week, automatically.",
          "The morning numbers show up built: yesterday's completed jobs, sold estimates, and what got missed, without anyone stitching together five report screens.",
          "ServiceTitan talks to the rest of your stack: job updates into Slack or email, customer data into your accounting tools, form leads booked straight in.",
          "Recurring busywork inside the platform, the membership checks, the unsold-estimate chase, the recall tracking, runs on a schedule instead of on memory.",
        ],
        shots: [OWNER_SHOTS[0], WHITEBOARD_SHOTS[0]],
        differentiator: {
          title: "How do you connect to my ServiceTitan?",
          paragraphs: [
            "Through the API, with an application scoped to the work we agreed on and nothing wider. You create it in your own ServiceTitan account, so you can see exactly what it can reach and switch it off yourself.",
            "Read-only until you sign off. Dashboards, reports, and alerts never write to your system. Anything that does write, an invoice that fires or a warranty registration that files, waits for your explicit OK on that specific step.",
            "Nothing runs against your live tenant that hasn't already run against a test job. You see it work on one job first, then it goes live, with a watchdog that pings a real phone if it ever stops.",
          ],
        },
        outro:
          "If a workflow exists in ServiceTitan's screens or its API, it can usually be automated. The trick is knowing which ones are worth it, and that's what the fit call is for.",
        whereToStart: (
          <>
            {"Two things are already built and running on ServiceTitan: the "}
            <Link href="/dashboards" className="inline-link-light">
              Owner Dashboard and the commission tracker
            </Link>
            {", both with demos you can click through right now. For the retainer work, start with "}
            <Link href="/industries/hvac-automation" className="inline-link-light">
              what automation looks like in an HVAC office
            </Link>
            {", or browse "}
            <Link href="/services" className="inline-link-light">
              the full list of what I build
            </Link>
            {". If you'd rather just talk it through, that's what the call is for."}
          </>
        ),
      }}
    />
  );
}
