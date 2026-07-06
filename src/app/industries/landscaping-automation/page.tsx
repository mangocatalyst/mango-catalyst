import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";
import { IndustryPageBody } from "@/components/industries/IndustryPageBody";
import { PlotPlanArt } from "@/components/industries/TradeArt";

const PATH = "/industries/landscaping-automation";
const DESCRIPTION =
  "Spring rush intake, recurring maintenance billing, and weather reshuffles, handled automatically. Office automation for Upper Midwest landscaping and lawn care companies. Book a 15-minute fit call.";

export const metadata = pageMetadata({
  title: "Landscaping Business Automation in the Upper Midwest",
  path: PATH,
  description: DESCRIPTION,
});

export default function LandscapingIndustryPage() {
  return (
    <IndustryPageBody
      data={{
        serviceName: "Landscaping Business Automation",
        h1: "Landscaping business automation in the Upper Midwest",
        path: PATH,
        description: DESCRIPTION,
        intro:
          "An Upper Midwest landscaping season is short, and the office work lands in the same eight weeks as the actual work. Estimate requests, crew scheduling, recurring maintenance billing, the fall renewal push: most of it can run itself. Mango Catalyst builds that automation for Upper Midwest landscaping and lawn care companies, wired into the tools you already pay for. It starts with one task and a 15-minute fit call, not a six-month rollout.",
        painsTitle: "The office side of a landscaping company runs on busywork",
        painsLead:
          "The crews have a route and a plan for every property. The office has habits. And the habits hit hardest exactly when the season does:",
        pains: [
          {
            lead: "Spring books the year in three weeks.",
            text: "Every estimate request lands in the same stretch of April, and the ones that don't get a fast answer book with whoever answered first.",
          },
          {
            lead: "Estimates need a site visit, then vanish.",
            text: "You walked the property, sent the number, and the follow-up is on a sticky note that didn't survive the week.",
          },
          {
            lead: "Weather moves the crews, not the paperwork.",
            text: "Two rain days push everything, and somebody spends the morning calling customers one at a time while the crews wait on answers.",
          },
          {
            lead: "Recurring billing drifts.",
            text: "The weekly mowing, the monthly beds, the seasonal contract with the twist: invoices go out roughly on time, which means revenue lands roughly whenever.",
          },
          {
            lead: "The season flips, the paperwork doesn't.",
            text: "The mowing list becomes the plowing list in November, and every fall it gets rebuilt by hand from last year's memory.",
          },
        ],
        outcomesTitle: "What automation looks like in a landscaping office",
        outcomesLead:
          "The point isn't new software. It's the software you already have, finally doing the boring parts on its own:",
        outcomes: [
          "Every estimate request gets an automatic same-day acknowledgment and lands in one list, and site visits book against real availability.",
          "Open estimates get scheduled follow-ups until they get an answer, without anyone keeping a list.",
          "A weather reshuffle notifies every affected customer on its own, so the office isn't a phone bank on rain days.",
          "Recurring maintenance invoices go out on schedule, every time, for every contract shape.",
          "Photos from the crews file themselves to the right property record, and the fall renewal letters send themselves.",
        ],
        outro:
          "The short season stops being shorter because of paperwork, and the office keeps up with the crews instead of chasing them.",
        whereToStart: (
          <>
            {"If your trucks push snow all winter, the "}
            <Link href="/industries/snow-plowing-automation" className="inline-link-light">
              snow plowing page
            </Link>
            {" covers that half of the year. Here's "}
            <Link href="/services" className="inline-link-light">
              the full list of what we build
            </Link>
            {
              ". And if you'd rather just talk it through, that's what the call is for."
            }
          </>
        ),
        art: <PlotPlanArt className="w-full" />,
      }}
    />
  );
}
