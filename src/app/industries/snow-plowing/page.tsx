import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";
import { IndustryPageBody } from "@/components/industries/IndustryPageBody";
import { PlowTruckArt } from "@/components/industries/TradeArt";

const PATH = "/industries/snow-plowing";
const DESCRIPTION =
  "Per-push billing, proof-of-service logs, and 'is my lot done yet' calls, handled automatically. Office automation for Minnesota snow plowing contractors. Book a 15-minute fit call.";

export const metadata = pageMetadata({
  title: "Snow Plowing Business Automation in Minnesota",
  path: PATH,
  description: DESCRIPTION,
});

export default function SnowPlowingIndustryPage() {
  return (
    <IndustryPageBody
      data={{
        serviceName: "Snow Plowing Business Automation",
        h1: "Snow plowing business automation in Minnesota",
        path: PATH,
        description: DESCRIPTION,
        intro:
          "Plowing is a 3 AM business with 9 AM paperwork. The service log, the per-push billing, the 'did you do my lot yet' calls, the fall contract renewals: most of it can run itself. Mango Catalyst builds that automation for Minnesota plow contractors, wired into the tools you already pay for. It starts with one task and a 15-minute fit call, not a six-month rollout.",
        painsTitle: "The office side of a plow operation runs on busywork",
        painsLead:
          "The storm has rules: trigger depth, route order, who gets opened first. The paperwork after the storm has habits. And the habits are eating the day after every event:",
        pains: [
          {
            lead: "The route list lives in one head.",
            text: "Who gets plowed, in what order, at what trigger depth, and which gate code opens the back lot. If that person sleeps in, the route does too.",
          },
          {
            lead: "The 7 AM phone melts.",
            text: "Half the calls after a storm are the same question: did you do my lot yet. Somebody answers each one instead of clearing the next driveway.",
          },
          {
            lead: "Per-push billing is a spreadsheet fight.",
            text: "Which properties got serviced during which event, per-push versus seasonal contracts, and it all gets reconstructed days later from memory and text messages.",
          },
          {
            lead: "Proof of service is a shoebox.",
            text: "A slip-and-fall claim shows up in March asking what time you cleared the lot in January, and the answer is somewhere in a driver's photo roll.",
          },
          {
            lead: "Renewals run on memory.",
            text: "September arrives, last year's contract list is a folder, and the scramble to re-sign everyone lands in the same two weeks as fall cleanups.",
          },
        ],
        outcomesTitle: "What automation looks like for a plow contractor",
        outcomesLead:
          "The point isn't new software. It's the software you already have, finally doing the boring parts on its own:",
        outcomes: [
          "Every push gets logged per property from the driver's phone: timestamp, photo, done. That's the service record, the billing record, and the liability record, captured once.",
          "Per-push invoices build themselves from the service log after the event, and seasonal contracts bill on schedule without anyone touching them.",
          "Customers get a 'your lot has been cleared' text automatically, so they stop calling to ask.",
          "The storm-day route sheet builds itself from active contracts, trigger depths, and priority order.",
          "Renewal letters go out in September on their own, and the signed contracts land back in one place.",
        ],
        outro:
          "You run the storm. The paperwork trails the trucks on its own, and the office isn't buried until noon the next day.",
        whereToStart: (
          <>
            {"A lot of plow operations mow all summer; the "}
            <Link href="/industries/landscaping" className="inline-link-light">
              landscaping page
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
        art: <PlowTruckArt className="w-full" />,
      }}
    />
  );
}
