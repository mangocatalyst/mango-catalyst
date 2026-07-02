import Link from "next/link";
import type { ReactNode } from "react";
import { Section } from "@/components/layout/Section";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  CalendarIcon,
  ChartIcon,
  FunnelIcon,
  InvoiceIcon,
} from "@/components/ui/icons";

/** Home section 3, copy verbatim from build/out/copy/home.md. */

const CARDS: { icon: ReactNode; title: string; body: string }[] = [
  {
    icon: <InvoiceIcon className="size-5" />,
    title: "Invoicing and billing, mostly off your desk",
    body: "Jobs close, invoices go out, payments get tracked. The repeatable part runs on its own, so the weekly catch-up on billing mostly disappears. (The weird edge cases, change orders, partial jobs, still get a human; that's the point of a real person building it.)",
  },
  {
    icon: <FunnelIcon className="size-5" />,
    title: "Lead capture and follow-up",
    body: "Every lead, from the trade show, the website, the phone, lands in one place, gets routed to the right person, and gets followed up on automatically. Nothing sits in a notebook.",
  },
  {
    icon: <CalendarIcon className="size-5" />,
    title: "Scheduling and dispatch",
    body: "The right tech, the right job, the right route. Live availability so whoever answers the phone books against what's actually open, not a guess.",
  },
  {
    icon: <ChartIcon className="size-5" />,
    title: "Reporting you don't have to build",
    body: "Daily numbers on what got done, what got sold, and what got missed, put together for you instead of you stitching it from five screens.",
  },
];

export function ServiceGrid() {
  return (
    <Section id="services">
      <SectionHeading
        title="What we actually build"
        lead={
          "The busywork that can actually be automated is the repetitive kind: invoicing, lead follow-up, scheduling, reporting, data entry. We don't sell you software. We connect the tools you already pay for and make that work run on its own. Plain English, working systems, no jargon."
        }
      />

      <div className="mt-12 grid gap-5 sm:grid-cols-2">
        {CARDS.map((card) => (
          <Card key={card.title} className="p-7">
            <span className="flex size-10 items-center justify-center rounded-lg border border-hairline bg-surface-hi text-muted">
              {card.icon}
            </span>
            <h3 className="mt-5 text-[1.15rem] font-semibold text-ink">
              {card.title}
            </h3>
            <p className="mt-3 leading-relaxed text-body">{card.body}</p>
          </Card>
        ))}
      </div>

      <p className="mt-8 max-w-[44rem] text-[0.95rem] leading-relaxed text-muted">
        {
          "Day to day I work in ServiceTitan, Zapier, and Google Workspace. If your tool has an API, I can probably wire it in."
        }
      </p>

      <div className="mt-10 flex flex-col gap-4">
        <p className="max-w-[44rem] leading-[1.65] text-body">
          {
            "If the thing eating your week isn't on this list, ask anyway. The whole job is figuring out what can run itself."
          }
        </p>
        <ArrowLink href="/services">Everything we build</ArrowLink>
      </div>

      <p className="mt-10 max-w-[44rem] border-l-2 border-amber pl-5 leading-[1.65] text-body">
        {"Run an HVAC or home-service shop? Start with the page written for you: "}
        <Link href="/industries/hvac" className="inline-link">
          HVAC business automation
        </Link>
        {"."}
      </p>
    </Section>
  );
}
