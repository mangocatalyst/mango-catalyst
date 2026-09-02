import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";
import { ProgramPageBody } from "@/components/programs/ProgramPageBody";

/**
 * Programs / Zapier (2026-07-06 footer-programs expansion; repositioned
 * 2026-09-02). Zapier is no longer a daily platform at Mango, so this page
 * speaks to the shop that already runs on it: work inside their account, keep
 * what works, say plainly when a direct integration beats the task bill. The
 * "every day" claim was removed from here and from the platforms trio
 * site-wide; the differentiator band stays.
 */

const PATH = "/programs/zapier";
const DESCRIPTION =
  "Already on Zapier? Automation built inside the account you own, keeping what works, with a straight answer on when a direct integration beats the task bill.";

export const metadata = pageMetadata({
  title: "Zapier Automation, Without the Runaway Task Bill",
  path: PATH,
  description: DESCRIPTION,
});

export default function ZapierProgramPage() {
  return (
    <ProgramPageBody
      data={{
        serviceName: "Zapier Automation",
        h1: "Zapier, without the runaway task bill",
        path: PATH,
        description: DESCRIPTION,
        intro:
          "Zapier is the glue of small-business automation: it connects thousands of apps so that when something happens in one, something else happens in another, no programmer required. If your shop already runs on it, that's a tool in the belt, not a problem. I've built and run enough zaps for a real service business to know what Zapier is great at and exactly where it starts costing more than it's worth.",
        examplesTitle: "What we can build in Zapier",
        examplesLead:
          "Zapier shines at the connective tissue between the tools you already pay for:",
        examples: [
          "Every lead gets a same-day reply and lands in your CRM routed to the right person, whether it came from the website, a form, or an email.",
          "Invoices, estimates, and job updates flow between your field software and your accounting tools without anyone retyping them.",
          "Appointment confirmations and reminders fire on their own from the calendar you already use.",
          "The right person gets pinged, by email, text, or Slack, the moment something needs a human: a big estimate approved, a negative review, a form from a key customer.",
          "Spreadsheets that someone updates by hand every week start updating themselves.",
        ],
        outro:
          "One zap is a convenience. A few dozen of them, built to work together, is an office that runs itself between phone calls.",
        differentiator: {
          title: "How is this different from just using Zapier?",
          paragraphs: [
            "Zapier is a tool, not a plan. The hard part was never dragging the boxes into place; it's knowing which of your tasks are worth automating, in what order, and how the pieces fit together so you're not maintaining a pile of one-off zaps a year from now. That judgment is what you're actually hiring.",
            "If you're already on Zapier, I work inside your existing account. Everything I build there lives where you can see it, in the account you own and already pay for, so you're never locked into me to keep those zaps running.",
            "And when Zapier is the wrong tool, I'll say so. It charges per task, and a busy automation can quietly snowball your monthly bill; some jobs are too heavy or too custom for it entirely. In those cases I build the same thing as a small script or a direct API integration instead, usually for less than the Zapier plan it would have taken. It isn't my first choice for a new build, and I'll tell you that on the call, but it's a perfectly good place to start from.",
          ],
        },
        whereToStart: (
          <>
            {"See "}
            <Link href="/services" className="inline-link-light">
              the full list of what I build
            </Link>
            {", or read "}
            <Link
              href="/guides/manual-data-entry-cost"
              className="inline-link-light"
            >
              what manual data entry actually costs
            </Link>
            {" to figure out which task should go first. If you'd rather just talk it through, that's what the call is for."}
          </>
        ),
      }}
    />
  );
}
