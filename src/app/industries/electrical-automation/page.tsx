import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";
import { IndustryPageBody } from "@/components/industries/IndustryPageBody";
import { PanelArt } from "@/components/industries/TradeArt";

const PATH = "/industries/electrical-automation";
const DESCRIPTION =
  "Stop chasing permits, inspections, and quiet panel quotes by hand. Office automation for Upper Midwest electrical contractors. Book a 15-minute fit call.";

export const metadata = pageMetadata({
  title: "Electrical Business Automation in the Upper Midwest",
  path: PATH,
  description: DESCRIPTION,
});

export default function ElectricalIndustryPage() {
  return (
    <IndustryPageBody
      data={{
        serviceName: "Electrical Business Automation",
        h1: "Electrical business automation in the Upper Midwest",
        path: PATH,
        description: DESCRIPTION,
        intro:
          "Most of the office work in an electrical shop can run itself: invoicing when the job closes, follow-up on open bids, appointment reminders, and the permit trail that currently lives in somebody's head. Mango Catalyst builds that automation for Upper Midwest electrical contractors, wired into the tools you already pay for. It starts with one task and a 15-minute fit call, not a six-month rollout.",
        painsTitle: "The office side of an electrical shop runs on busywork",
        painsLead:
          "The field side of your business has code, torque specs, and a meter that doesn't lie. The office side has habits. And the habits are eating the day:",
        pains: [
          {
            lead: "The permit trail lives in somebody's head.",
            text: "The rough-in passed, the final is pending, and which job is waiting on which inspector is a thing you find out by asking around. Miss the window and the drywallers are standing on top of your work.",
          },
          {
            lead: "Panel and EV charger quotes go quiet.",
            text: "The big-ticket bids, the service upgrade, the charger install, get sent and then followed up on when someone remembers. The homeowner books with whoever called back first.",
          },
          {
            lead: "Service calls blow up the schedule.",
            text: "A dead circuit at a commercial account jumps the line, and somebody spends the next hour re-booking the day one phone call at a time.",
          },
          {
            lead: "Inspection results don't make it back to the job.",
            text: "The inspector signed off Tuesday. The office finds out Friday, when the customer calls asking why nobody scheduled the finish work.",
          },
          {
            lead: "The same info, typed three times.",
            text: "The call notes go in one screen, the job in another, the invoice in a third, all by hand, all by the same two people.",
          },
        ],
        outcomesTitle: "What automation looks like in an electrical office",
        outcomesLead:
          "The point isn't new software. It's the software you already have, finally doing the boring parts on its own:",
        outcomes: [
          "Invoices go out when the job closes, not when someone finds an hour.",
          "Every open bid gets a scheduled follow-up until it gets an answer, without anyone keeping a list.",
          "Permit and inspection status lives on the job, with the dates visible, so nobody schedules finish work on an unpassed rough-in.",
          "Appointment confirmations and reminders fire on their own, and schedule changes notify the customer without anyone picking up a phone.",
          "The morning numbers show up built: what got done yesterday, what got sold, what got missed.",
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
        art: <PanelArt className="w-full" />,
      }}
    />
  );
}
