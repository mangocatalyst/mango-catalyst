import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";
import { ProgramPageBody } from "@/components/programs/ProgramPageBody";

/**
 * Programs / Everything else (2026-07-07, Bryan's ask: make it obvious the
 * four named platforms aren't the whole menu). The claim that anchors the
 * page is the one already all over the site: if the tool has an API, it can
 * be wired in. The Chrome-extension claim traces to the shipped MN-ITS
 * Helper. Schema name is "Custom Integrations" so the Service node reads
 * sensibly off-site; "Everything else" is the human-facing label.
 */

const PATH = "/programs/everything-else";
const DESCRIPTION =
  "The named platforms aren't the whole menu. Accounting, forms, phones, review tools, custom scripts, even Chrome extensions: if your tool has an API, it can be wired in.";

export const metadata = pageMetadata({
  title: "Custom Integrations: Everything Else We Automate",
  path: PATH,
  description: DESCRIPTION,
});

export default function EverythingElseProgramPage() {
  return (
    <ProgramPageBody
      data={{
        serviceName: "Custom Integrations",
        h1: "Everything else",
        path: PATH,
        description: DESCRIPTION,
        intro:
          "ServiceTitan, Zapier, Slack, and Google Workspace get their own pages because I'm in them every day. But they're not the menu; they're examples. The real rule is simpler: if the tool your business runs on has an API, and almost everything does now, it can be wired into the rest of your setup. And for the stubborn stuff that doesn't have one, there are still ways in. The one product I've shipped on my own is a Chrome extension that automates data entry into a state portal that offers no API at all.",
        examplesTitle: "The kind of thing that comes up",
        examplesLead:
          "A sample of the long tail, not a limit. If your tool isn't here, that means nothing:",
        examples: [
          "Accounting tools like QuickBooks, synced with the software the work actually happens in, so nobody retypes invoices.",
          "Form builders, website forms, and estimate-request pages, routed into your CRM instead of into an inbox.",
          "Phone and text: missed-call texts, appointment reminders, and the follow-up messages that never get sent by hand.",
          "Review platforms, so every finished job asks for the review and a bad one pings you immediately.",
          "The web portals with no API at all, automated at the browser with a Chrome extension, the same way I built my own product.",
          "And the one-off glue: the weekly report nobody wants to build, the file that has to move from here to there, the small script that replaces a recurring chore.",
        ],
        outro:
          "The honest boundary isn't which logo is on the tool. It's whether the task is repetitive enough to be worth automating, and that's exactly what the fit call sorts out.",
        whereToStart: (
          <>
            {"Browse "}
            <Link href="/services" className="inline-link-light">
              the full list of what I build
            </Link>
            {", or read "}
            <Link
              href="/guides/what-is-automation-consultant"
              className="inline-link-light"
            >
              what an automation consultant actually does
            </Link>
            {". If your tool is obscure, bring it to the call anyway; the obscure ones are usually the fun part."}
          </>
        ),
      }}
    />
  );
}
