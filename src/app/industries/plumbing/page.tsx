import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";
import { IndustryPageBody } from "@/components/industries/IndustryPageBody";
import { PipeRunArt } from "@/components/industries/TradeArt";

const PATH = "/industries/plumbing";
const DESCRIPTION =
  "Stop chasing open estimates, warranty registrations, and permit paperwork by hand. Office automation for Minnesota plumbing shops. Book a 15-minute fit call.";

export const metadata = pageMetadata({
  title: "Plumbing Business Automation in Minnesota",
  path: PATH,
  description: DESCRIPTION,
});

export default function PlumbingIndustryPage() {
  return (
    <IndustryPageBody
      data={{
        serviceName: "Plumbing Business Automation",
        h1: "Plumbing business automation in Minnesota",
        path: PATH,
        description: DESCRIPTION,
        intro:
          "Most of the office work in a plumbing shop can run itself: invoicing when the job closes, follow-up on open estimates, appointment reminders, and the water heater warranty registrations nobody remembers until the tank fails. Mango Catalyst builds that automation for Minnesota plumbing shops, wired into the tools you already pay for. It starts with one task and a 15-minute fit call, not a six-month rollout.",
        painsTitle: "The office side of a plumbing shop runs on busywork",
        painsLead:
          "The field side of your business has code books and pressure tests. The office side has habits. And the habits are eating the day:",
        pains: [
          {
            lead: "Emergency calls blow up the schedule.",
            text: "A burst pipe jumps the line, and somebody spends the next hour re-booking the day one phone call at a time.",
          },
          {
            lead: "Estimates go out, then go quiet.",
            text: "The follow-up on open bids happens when someone remembers, and the homeowner books with whoever called back first.",
          },
          {
            lead: "Water heaters leave the shop unregistered.",
            text: "The warranty clock starts at install. The registration happens later, meaning sometimes, meaning the year-seven tank failure turns into an argument nobody can win.",
          },
          {
            lead: "Permits and inspections trickle.",
            text: "The rough-in passed, the final is pending, and the status lives in somebody's head until the inspector's window gets missed.",
          },
          {
            lead: "The same info, typed three times.",
            text: "The call notes go in one screen, the job in another, the invoice in a third, all by hand, all by the same two people.",
          },
        ],
        outcomesTitle: "What automation looks like in a plumbing office",
        outcomesLead:
          "The point isn't new software. It's the software you already have, finally doing the boring parts on its own:",
        outcomes: [
          "Invoices go out when the job closes, not when someone finds an hour.",
          "Every open estimate gets a scheduled follow-up until it gets an answer, without anyone keeping a list.",
          "Every water heater and softener you install gets logged with model and serial, and registered with the manufacturer the same week, automatically.",
          "Appointment confirmations and reminders fire on their own, and schedule changes notify the customer without anyone picking up a phone.",
          "The morning numbers show up built: what got done yesterday, what got sold, what got missed.",
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
        art: <PipeRunArt className="w-full" />,
      }}
    />
  );
}
