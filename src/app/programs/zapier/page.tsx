import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";
import { ProgramPageBody } from "@/components/programs/ProgramPageBody";

/**
 * Programs / Zapier (2026-07-06 footer-programs expansion). Carries the
 * differentiator band Bryan asked for: "how are you different from Zapier"
 * answered head-on (work inside your existing account; go past Zapier's
 * ceiling for less money when the task bill snowballs). Experience claim
 * traces to the About page (daily Zapier work, dozens of zaps run for one
 * real shop).
 */

const PATH = "/programs/zapier";
const DESCRIPTION =
  "Zapier automation built by someone who runs dozens of zaps for a real shop, working inside your existing account, with a straight answer on when Zapier is the wrong tool.";

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
          "Zapier is the glue of small-business automation: it connects thousands of apps so that when something happens in one, something else happens in another, no programmer required. I work in it every day and have built and run dozens of zaps for a single real service business, which is enough to know both what Zapier is great at and exactly where it starts costing more than it's worth.",
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
            "I work inside your existing Zapier account. Everything I build lives where you can see it, in the account you own and already pay for, so you're never locked into me to keep the lights on.",
            "And when Zapier is the wrong tool, I'll say so. Zapier charges per task, and a busy automation can quietly snowball your monthly bill. Some jobs are too heavy or too custom for it entirely. In those cases I build the same thing as a small script or a direct API integration instead: more advanced than what Zapier can do, and usually for less money than the Zapier plan it would have taken.",
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
