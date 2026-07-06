import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";
import { IndustryPageBody } from "@/components/industries/IndustryPageBody";
import { TrussArt } from "@/components/industries/TradeArt";

const PATH = "/industries/roofing";
const DESCRIPTION =
  "Storm-week lead pile, insurance paperwork, and job photos scattered across phones, handled automatically. Office automation for Minnesota roofing contractors. Book a 15-minute fit call.";

export const metadata = pageMetadata({
  title: "Roofing Business Automation in Minnesota",
  path: PATH,
  description: DESCRIPTION,
});

export default function RoofingIndustryPage() {
  return (
    <IndustryPageBody
      data={{
        serviceName: "Roofing Business Automation",
        h1: "Roofing business automation in Minnesota",
        path: PATH,
        description: DESCRIPTION,
        intro:
          "Roofing runs in surges: a hail night fills the phone for a month, and the office drowns in the exact weeks the crews are busiest. Lead intake, photo filing, insurance paperwork, follow-up on open bids: most of it can run itself. Mango Catalyst builds that automation for Minnesota roofing contractors, wired into the tools you already pay for. It starts with one task and a 15-minute fit call, not a six-month rollout.",
        painsTitle: "The office side of a roofing company runs on busywork",
        painsLead:
          "The roof has a spec: pitch, courses, flashing details. The office has habits. And the habits show up worst in storm season:",
        pains: [
          {
            lead: "Storm weeks bury the intake.",
            text: "Hail hits Tuesday night, forty calls land Wednesday, and whoever answers the phone is writing names on a legal pad while three more calls ring through.",
          },
          {
            lead: "The proof lives on phones.",
            text: "Before, during, and after photos scattered across three crew phones and a text thread, and the one the adjuster needs is the one nobody can find.",
          },
          {
            lead: "Insurance paperwork drags for weeks.",
            text: "Supplements, photo documentation, adjuster back-and-forth. Every day it sits, the job slides, and the homeowner starts calling the other guy.",
          },
          {
            lead: "Bids go cold in the follow-up gap.",
            text: "The estimate went out while the market was hot. The follow-up happens when someone remembers, which is after the homeowner signed with whoever called first.",
          },
          {
            lead: "Material orders float free of the calendar.",
            text: "The shingles are ordered, the delivery date is in an email, the crew is scheduled off a whiteboard, and one slipped truck quietly wrecks the week.",
          },
        ],
        outcomesTitle: "What automation looks like in a roofing office",
        outcomesLead:
          "The point isn't new software. It's the software you already have, finally doing the boring parts on its own:",
        outcomes: [
          "Every storm lead gets logged, routed, and answered the same day it comes in, whether it arrived by phone, web form, or the door-knock sheet.",
          "Job photos file themselves to the right job record, by address, the moment the crew uploads them, so the adjuster packet builds from one folder instead of three phones.",
          "Open estimates get scheduled follow-ups until they get an answer, without anyone keeping a list.",
          "Material order confirmations get tracked against the install calendar, and a slipped delivery flags the job before the crew shows up to a bare driveway.",
          "The morning numbers show up built: what got inspected, what got bid, what got signed, what got installed.",
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
        art: <TrussArt className="w-full" />,
      }}
    />
  );
}
