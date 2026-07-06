import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";
import { ProgramPageBody } from "@/components/programs/ProgramPageBody";

/**
 * Programs / Google Workspace (2026-07-06 footer-programs expansion).
 * Experience claim traces to the About page: daily work in Google Workspace.
 */

const PATH = "/programs/google-workspace";
const DESCRIPTION =
  "Google Workspace automation: Gmail, Sheets, Calendar, and Drive doing the routing, reporting, and filing your office does by hand, in the account you already pay for.";

export const metadata = pageMetadata({
  title: "Google Workspace Automation",
  path: PATH,
  description: DESCRIPTION,
});

export default function GoogleWorkspaceProgramPage() {
  return (
    <ProgramPageBody
      data={{
        serviceName: "Google Workspace Automation",
        h1: "The Google account you already pay for, finally working",
        path: PATH,
        description: DESCRIPTION,
        intro:
          "Google Workspace is the Gmail, Calendar, Drive, Sheets, and Docs your business probably already runs on. Almost every small business pays for it; almost none of them use the part that matters, which is that every one of those tools can be automated and wired to the others. I work in Google Workspace every day, and it's often the cheapest place to build automation because you already own it.",
        examplesTitle: "What we can build in Google Workspace",
        examplesLead:
          "The busywork in most offices is moving information between an inbox, a spreadsheet, a calendar, and a folder. All four can do that themselves:",
        examples: [
          "Emails that follow a pattern, the supplier confirmation, the lead from the website, the nightly report, get read, logged, and routed automatically instead of sitting in someone's inbox.",
          "Spreadsheets that someone fills in by hand every week fill themselves in from the systems the data actually lives in.",
          "The follow-up emails you keep meaning to send, after the estimate, after the job, at renewal time, go out on schedule, personalized from your own records.",
          "Every new job or customer gets its Drive folder created, named right, and stocked with the standard documents, the same way every time.",
          "Calendar bookings, confirmations, and reminders run without the phone-tag.",
        ],
        outro:
          "Because it's built in your own Google account, there's no new subscription and nothing to migrate. The tools stay the same; they just stop waiting for a human to push them.",
        whereToStart: (
          <>
            {"Read "}
            <Link
              href="/guides/manual-data-entry-cost"
              className="inline-link-light"
            >
              what manual data entry actually costs
            </Link>
            {" to see why the spreadsheet-and-inbox shuffle is worth killing, or browse "}
            <Link href="/services" className="inline-link-light">
              the full list of what we build
            </Link>
            {". If you'd rather just talk it through, that's what the call is for."}
          </>
        ),
      }}
    />
  );
}
