import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";
import { IndustryPageBody } from "@/components/industries/IndustryPageBody";
import { DryDownArt } from "@/components/industries/TradeArt";

const PATH = "/industries/restoration-automation";
const DESCRIPTION =
  "Claim documentation, equipment tracking, and adjuster follow-up without the late nights. Office automation for Upper Midwest restoration contractors.";

export const metadata = pageMetadata({
  title: "Restoration Business Automation in the Upper Midwest",
  path: PATH,
  description: DESCRIPTION,
});

export default function RestorationIndustryPage() {
  return (
    <IndustryPageBody
      data={{
        serviceName: "Restoration Business Automation",
        h1: "Restoration business automation in the Upper Midwest",
        path: PATH,
        description: DESCRIPTION,
        intro:
          "Restoration is two jobs: drying the structure, and proving to an insurance company that you did. The second one is the office work that keeps your crew up past midnight. Mango Catalyst builds the automation that assembles the claim file, tracks the equipment, and chases the adjuster, wired into the tools you already pay for. It starts with one task and a 15-minute fit call, not a six-month rollout.",
        painsTitle: "The office side of a restoration shop runs on busywork",
        painsLead:
          "The field side of your business has moisture meters and drying logic. The office side has habits. And on an insurance job, the habits cost real money:",
        pains: [
          {
            lead: "The claim file is a scavenger hunt.",
            text: "Photos on three phones, moisture logs on a clipboard, the adjuster's emails in one inbox and the scope in another. Assembling it all is a night of somebody's life, per claim.",
          },
          {
            lead: "Equipment walks.",
            text: "Which air movers and dehus are on which job, and since when, lives in memory. Every untracked day is a rental day you can't bill and a machine you can't find.",
          },
          {
            lead: "Adjusters go quiet, and payment waits.",
            text: "The supplement sits in someone's queue, and the follow-up that shakes it loose happens when your office remembers, not on a schedule.",
          },
          {
            lead: "Emergency calls at 2 AM, intake typed at 8.",
            text: "The loss details get taken on a phone in the truck and re-typed into the system the next morning, if the notes survive the night.",
          },
          {
            lead: "The same info, typed three times.",
            text: "The intake goes in one screen, the job in another, the invoice in a third, all by hand, all by the same two people.",
          },
        ],
        outcomesTitle: "What automation looks like in a restoration office",
        outcomesLead:
          "The point isn't new software. It's the software you already have, finally doing the boring parts on its own:",
        outcomes: [
          "The claim file assembles itself as the job runs: photos, readings, and notes land in one place, organized by claim, ready for the adjuster instead of ready for a late night.",
          "Equipment gets logged in and out per site, and the per-day counts land on the invoice so drying days stop going unbilled.",
          "Every open supplement and estimate gets a scheduled follow-up until it gets an answer, without anyone keeping a list.",
          "After-hours intake becomes a job in the system before the truck rolls, not a re-typing task the next morning.",
          "The morning numbers show up built: what dried down yesterday, what's waiting on an adjuster, what's ready to bill.",
        ],
        outro:
          "The office crew you have stops re-typing and starts handling the judgment calls, which is what you actually hired them for.",
        whereToStart: (
          <>
            {"Here's "}
            <Link href="/services" className="inline-link-light">
              the full list of what I build
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
        art: <DryDownArt className="w-full" />,
      }}
    />
  );
}
