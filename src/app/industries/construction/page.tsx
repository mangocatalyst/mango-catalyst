import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";
import { IndustryPageBody } from "@/components/industries/IndustryPageBody";
import { FramePlanArt } from "@/components/industries/TradeArt";

const PATH = "/industries/construction";
const DESCRIPTION =
  "Receipt piles, sub scheduling changes, and job photos buried in texts, handled automatically. Office automation for Upper Midwest contractors and remodelers. Book a 15-minute fit call.";

export const metadata = pageMetadata({
  title: "Construction Business Automation in the Upper Midwest",
  path: PATH,
  description: DESCRIPTION,
});

export default function ConstructionIndustryPage() {
  return (
    <IndustryPageBody
      data={{
        serviceName: "Construction Business Automation",
        h1: "Construction business automation in the Upper Midwest",
        path: PATH,
        description: DESCRIPTION,
        intro:
          "A build runs on paper as much as lumber: receipts, change orders, sub schedules, progress photos, draw paperwork. Most of the office half can run itself. Mango Catalyst builds that automation for Upper Midwest general contractors and remodelers, wired into the tools you already pay for. It starts with one task and a 15-minute fit call, not a six-month rollout.",
        painsTitle: "The office side of a construction company runs on busywork",
        painsLead:
          "The job site has a schedule and a print. The office has habits. And the habits compound across every active job:",
        pains: [
          {
            lead: "Receipts pile up faster than the job binder.",
            text: "Every supply-house run and lumber delivery lands as a receipt in an inbox or a truck cab, and matching them to the right job and purchase order is somebody's whole Friday.",
          },
          {
            lead: "The schedule moves, the subs find out late.",
            text: "The framing inspection slips a day, and now somebody's texting the electrician, the plumber, and the homeowner one at a time, in whatever order they get remembered.",
          },
          {
            lead: "Job photos live in text threads.",
            text: "The pre-drywall photos that settle a dispute two years from now are on a crew phone, in a group text, labeled IMG_4471.",
          },
          {
            lead: "Draw paperwork eats the week's end.",
            text: "The bank wants progress documentation, the homeowner wants the invoice explained, and both get assembled by hand from five places.",
          },
          {
            lead: "Bids go stale in the follow-up gap.",
            text: "The proposal went out three weeks ago. Nobody called back, because nobody's job is calling back.",
          },
        ],
        outcomesTitle: "What automation looks like in a construction office",
        outcomesLead:
          "The point isn't new software. It's the software you already have, finally doing the boring parts on its own:",
        outcomes: [
          "Receipt and invoice emails from your suppliers get matched to the right job and purchase order automatically, itemized, no hand-keying.",
          "A schedule change notifies every affected sub and the homeowner on its own, the moment it happens.",
          "Photos from the crew's chat thread file themselves to the right job record, so the paper trail builds itself while the job runs.",
          "The weekly progress summary for the bank or the homeowner assembles itself from what actually got logged.",
          "Every open proposal gets a scheduled follow-up until it gets an answer.",
        ],
        outro:
          "The office crew you have stops re-typing and starts handling the judgment calls, which is what you actually hired them for.",
        whereToStart: (
          <>
            {"Here's "}
            <Link href="/services" className="inline-link-light">
              the full list of what we build
            </Link>
            {", and the "}
            <Link href="/faq" className="inline-link-light">
              straight answers on cost and how it works
            </Link>
            {
              ". And if you'd rather just talk it through, that's what the call is for."
            }
          </>
        ),
        art: <FramePlanArt className="w-full" />,
      }}
    />
  );
}
