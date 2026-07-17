import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";
import { IndustryPageBody } from "@/components/industries/IndustryPageBody";
import { TankFieldArt } from "@/components/industries/TradeArt";

const PATH = "/industries/septic-well-automation";
const DESCRIPTION =
  "Pumping reminders, county paperwork, and well test follow-up that run themselves. Office automation for Upper Midwest septic and well contractors.";

export const metadata = pageMetadata({
  title: "Septic & Well Business Automation in the Upper Midwest",
  path: PATH,
  description: DESCRIPTION,
});

export default function SepticWellIndustryPage() {
  return (
    <IndustryPageBody
      data={{
        serviceName: "Septic & Well Business Automation",
        h1: "Septic and well business automation in the Upper Midwest",
        path: PATH,
        description: DESCRIPTION,
        intro:
          "Yours is the rare trade where the next job is already scheduled by chemistry: every tank you pump goes back on a two-to-three-year clock the day you leave. Most shops track that clock in a spreadsheet, a memory, or not at all. Mango Catalyst builds the automation that runs it for you, plus the invoicing, county paperwork, and follow-up around it, wired into the tools you already pay for. It starts with one task and a 15-minute fit call.",
        painsTitle: "The office side of a septic and well shop runs on busywork",
        painsLead:
          "The field side of your business has soil borings and flow rates. The office side has habits. And the habits are leaking revenue:",
        pains: [
          {
            lead: "The pumping cycle is a memory, not a system.",
            text: "Every tank you've ever pumped is due again in two or three years. The reminder goes out when somebody thinks of it, and the customer who doesn't hear from you calls whoever's postcard showed up.",
          },
          {
            lead: "County compliance paperwork eats the afternoon.",
            text: "Inspection reports, as-builts, and pumping records get assembled by hand, per county, per format, by the one person who knows where everything lives.",
          },
          {
            lead: "Well tests leave, and the results wander back.",
            text: "The water sample goes to the lab, the report lands in an inbox, and the callback to the homeowner happens whenever someone connects the two.",
          },
          {
            lead: "System quotes go quiet.",
            text: "A new drainfield or well bid is a big, slow decision. The follow-up that keeps you in the running happens when someone remembers, which is exactly when the competitor calls.",
          },
          {
            lead: "The same info, typed three times.",
            text: "The call notes go in one screen, the job in another, the invoice in a third, all by hand, all by the same two people.",
          },
        ],
        outcomesTitle: "What automation looks like in a septic and well office",
        outcomesLead:
          "The point isn't new software. It's the software you already have, finally doing the boring parts on its own:",
        outcomes: [
          "Every pumped tank gets its next-due date the day the job closes, and the reminder goes out on schedule, year after year, without anyone keeping a list. That's repeat revenue on autopilot.",
          "Compliance paperwork assembles itself from the job data you already entered, ready to file instead of ready to start.",
          "Lab results get logged to the job when they land, and the homeowner callback gets scheduled the same day.",
          "Every open bid gets a scheduled follow-up until it gets an answer.",
          "Invoices go out when the job closes, and the morning numbers show up built: what got done, what got sold, what's due for pumping this month.",
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
        art: <TankFieldArt className="w-full" />,
      }}
    />
  );
}
