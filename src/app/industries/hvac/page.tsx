import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";
import { IndustryPageBody } from "@/components/industries/IndustryPageBody";
import { DispatchArt } from "@/components/industries/TradeArt";

/**
 * Industries / HVAC: the original Phase 1 vertical wedge page, copy verbatim
 * from build/out/copy/industry-hvac.md, now rendered through the shared
 * IndustryPageBody (2026-07-06 trade-pages expansion) with the blueprint
 * dispatch-board hero art the imagery doc specified for this slot.
 */

const PATH = "/industries/hvac";
const DESCRIPTION =
  "Stop doing invoicing, dispatch updates, and follow-up by hand. Office automation for Upper Midwest HVAC and home-service shops. Book a 15-minute fit call.";

export const metadata = pageMetadata({
  title: "HVAC Business Automation in the Upper Midwest",
  path: PATH,
  description: DESCRIPTION,
});

export default function HvacIndustryPage() {
  return (
    <IndustryPageBody
      data={{
        serviceName: "HVAC Business Automation",
        h1: "HVAC business automation in the Upper Midwest",
        path: PATH,
        description: DESCRIPTION,
        intro:
          "Most of the office work in an HVAC shop can run itself: invoicing after job close, lead follow-up, appointment confirmations and reminders, schedule updates, and the daily reporting you stitch together from five screens. Mango Catalyst builds that automation for Upper Midwest HVAC and home-service shops, wired into the tools you already pay for. It starts with one task and a 15-minute fit call, not a six-month rollout.",
        painsTitle: "The office side of an HVAC shop runs on busywork",
        painsLead:
          "The field side of your business has rules. The office side has habits. And the habits are eating the day:",
        pains: [
          {
            lead: "The dispatch board never sits still.",
            text: "A no-heat call jumps the line, a tech calls in sick, and somebody spends the morning re-shuffling the schedule and calling customers one at a time to tell them.",
          },
          {
            lead: "The seasons whiplash the phones.",
            text: "The first cold snap or the first heat wave doubles call volume overnight, and the same office crew that was fine in October is drowning in January.",
          },
          {
            lead: "Invoicing lags the work.",
            text: "The job closed Tuesday, the invoice goes out whenever someone gets a free hour, and the payment lands weeks after the truck left the driveway.",
          },
          {
            lead: "The home-show lead pile.",
            text: "A stack of leads from the show sits in a folder until someone has a free afternoon, and by then half of them booked with whoever called back first.",
          },
          {
            lead: "The same info, typed three times.",
            text: "The call notes go in one screen, the job in another, the invoice in a third, all by hand, all by the same two people.",
          },
        ],
        outcomesTitle: "What automation looks like in an HVAC office",
        outcomesLead:
          "The point isn't new software. It's the software you already have, finally doing the boring parts on its own:",
        outcomes: [
          "Invoices go out when the job closes, not when someone finds an hour.",
          "Every lead gets a reply the same day it comes in, and lands in the CRM routed to the right person, whether it came from the website, the phone, or the show booth.",
          "Appointment confirmations and reminders fire on their own, so fewer customers are surprised when the truck shows up and fewer techs are surprised by an empty house.",
          "Schedule changes notify the customer without anyone picking up a phone.",
          "Every unit you install gets logged with model and serial, and registered for its manufacturer warranty the same week, automatically.",
          "The morning numbers show up built: what got done yesterday, what got sold, what got missed.",
        ],
        outro:
          "The office crew you have stops re-typing and starts handling the judgment calls, which is what you actually hired them for.",
        whereToStart: (
          <>
            {"If you want to rank the candidates yourself, read "}
            <Link
              href="/guides/hvac-tasks-to-automate"
              className="inline-link-light"
            >
              which HVAC tasks to automate first
            </Link>
            {". If you want the whole menu, here's "}
            <Link href="/services" className="inline-link-light">
              the full list of what we build
            </Link>
            {
              ". And if you'd rather just talk it through, that's what the call is for."
            }
          </>
        ),
        art: <DispatchArt className="w-full" />,
      }}
    />
  );
}
