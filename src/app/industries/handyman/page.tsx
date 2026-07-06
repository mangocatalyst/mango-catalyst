import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";
import { IndustryPageBody } from "@/components/industries/IndustryPageBody";
import { PunchListArt } from "@/components/industries/TradeArt";

const PATH = "/industries/handyman";
const DESCRIPTION =
  "Small jobs shouldn't carry big office overhead. Quote requests, booking, invoicing, and follow-up that run themselves, for Upper Midwest handyman businesses. Book a 15-minute fit call.";

export const metadata = pageMetadata({
  title: "Handyman Business Automation in the Upper Midwest",
  path: PATH,
  description: DESCRIPTION,
});

export default function HandymanIndustryPage() {
  return (
    <IndustryPageBody
      data={{
        serviceName: "Handyman Business Automation",
        h1: "Handyman business automation in the Upper Midwest",
        path: PATH,
        description: DESCRIPTION,
        intro:
          "A handyman business is a hundred small jobs, and every one drags a little office work behind it: the quote, the booking, the invoice, the follow-up. When it's you and maybe one other person, that admin comes out of evenings. Mango Catalyst builds automation that takes most of it back, wired into the tools you already pay for. It starts with one task and a 15-minute fit call, not a six-month rollout.",
        painsTitle: "The office side of a handyman business runs on busywork",
        painsLead:
          "The work has a punch list. The admin has habits. And on a small crew the habits come straight out of your own evenings:",
        pains: [
          {
            lead: "The phone runs the business.",
            text: "The calls come in while you're on a ladder, and the callback list becomes tonight's second job.",
          },
          {
            lead: "Small jobs, big admin ratio.",
            text: "A two-hour job carries a quote, a booking, an invoice, and a follow-up. Do that thirty times a month and the admin is a part-time employee you're not paying, because it's you.",
          },
          {
            lead: "The quote backlog lives in texts.",
            text: "Photos of somebody's deck, a voicemail about a door, a Facebook message about gutters, all waiting in different inboxes for the same free evening.",
          },
          {
            lead: "Getting paid takes longer than the work.",
            text: "The job took two hours. The invoice went out four days later, and the check came whenever the customer remembered.",
          },
          {
            lead: "The repeat customers drift.",
            text: "The people who'd call you every season forget your name by fall, because staying in touch is one more thing there's no time for.",
          },
        ],
        outcomesTitle: "What automation looks like for a handyman business",
        outcomesLead:
          "The point isn't new software. It's the software you already have, finally doing the boring parts on its own:",
        outcomes: [
          "Every request, from the website, the phone, or a text, lands in one list and gets an automatic same-day reply, so nothing waits on you getting off the ladder.",
          "Customers book against your real availability instead of a phone-tag round.",
          "The invoice goes out with a payment link the moment the job's done, and the polite nudge on day seven sends itself.",
          "A review request follows every paid job on its own, which is how the next customer finds you.",
          "A season-change note goes to past customers automatically, so the fall list fills itself.",
        ],
        outro:
          "You get the evenings back, and the business stops leaking the jobs that called while you were working.",
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
        art: <PunchListArt className="w-full" />,
      }}
    />
  );
}
