import Link from "next/link";
import type { ReactNode } from "react";
import { Section } from "@/components/layout/Section";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  CalendarIcon,
  ChartIcon,
  ClipboardIcon,
  FunnelIcon,
  InvoiceIcon,
  TagIcon,
} from "@/components/ui/icons";

/**
 * Home section 3. Reworked 2026-07-06 (Bryan): each card keeps its generic
 * anchor and adds concrete, real examples under a FOR EXAMPLE rail, so a
 * visitor starts imagining their own version. Examples come from
 * build/out/use-case-candidates.md and are phrased as things we build,
 * never as client case studies (00-canonical-brief honesty gate).
 */

const CARDS: {
  icon: ReactNode;
  title: string;
  body: string;
  examples: string[];
}[] = [
  {
    icon: <InvoiceIcon className="size-5" />,
    title: "Invoicing, billing, and the paper behind it",
    body: "Jobs close, invoices go out, payments get tracked. The repeatable part runs on its own, so the weekly catch-up on billing mostly disappears.",
    examples: [
      "Supply-house receipt emails matched line by line to the right purchase order in your CRM, for every vendor you buy from.",
      "Yesterday's financials pulled into one morning summary instead of five screens.",
    ],
  },
  {
    icon: <FunnelIcon className="size-5" />,
    title: "Lead capture and follow-up",
    body: "Every lead, from the trade show, the website, the phone, lands in one place, gets routed to the right person, and gets followed up on automatically. Nothing sits in a notebook.",
    examples: [
      "Hang-ups and abandoned calls classified automatically in your phone system, so your booking rate reflects what actually happened.",
      "Open estimates that follow themselves up until they get an answer.",
    ],
  },
  {
    icon: <CalendarIcon className="size-5" />,
    title: "Scheduling, dispatch, and job chatter",
    body: "The right tech, the right job, the right route. Live availability so whoever answers the phone books against what's actually open, not a guess.",
    examples: [
      "A channel per job in your team chat, the right people added automatically, and the photos and messages in it archived back onto the job record.",
      "An install form that prints itself into a clean truck load sheet for the crew.",
    ],
  },
  {
    icon: <ChartIcon className="size-5" />,
    title: "Reporting you don't have to build",
    body: "Daily numbers on what got done, what got sold, and what got missed, put together for you instead of you stitching it from five screens.",
    examples: [
      "Install-quality scorecards per technician: recalls, go-backs, and the hours spent fixing them, built from your CRM and payroll.",
      "A dispatch-board dashboard on the office TV that refreshes itself.",
    ],
  },
  {
    icon: <TagIcon className="size-5" />,
    title: "Warranty and equipment records",
    body: "The equipment paper trail keeps itself, so nobody finds out at the service call that the unit was never registered.",
    examples: [
      "Every unit you install logged with model and serial, and registered with the manufacturer automatically, portal or not.",
      "A master equipment sheet that fills itself in as the trucks roll.",
    ],
  },
  {
    icon: <ClipboardIcon className="size-5" />,
    title: "Forms, portals, and the clicks in between",
    body: "The fifty-times-a-week stuff that lives outside your main system: web portals, agency forms, the same six clicks to do one small thing.",
    examples: [
      "Portal forms pre-filled from saved presets, with your staff reviewing and clicking submit.",
      "One-keystroke shortcuts for the actions your office repeats all day inside the tools you already use.",
    ],
  },
];

const INDUSTRY_LINKS: { href: string; label: string }[] = [
  { href: "/industries/hvac", label: "HVAC" },
  { href: "/industries/plumbing", label: "plumbing" },
  { href: "/industries/roofing", label: "roofing" },
  { href: "/industries/construction", label: "construction" },
  { href: "/industries/handyman", label: "handyman" },
  { href: "/industries/snow-plowing", label: "snow plowing" },
  { href: "/industries/landscaping", label: "landscaping" },
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
            <div className="mt-5 border-l-2 border-hairline pl-4">
              <p className="text-[0.7rem] font-medium tracking-[0.18em] uppercase text-faint">
                For example
              </p>
              <ul className="mt-2 grid gap-2">
                {card.examples.map((example) => (
                  <li
                    key={example.slice(0, 24)}
                    className="text-[0.95rem] leading-relaxed text-muted"
                  >
                    {example}
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        ))}
      </div>

      <p className="mt-8 max-w-[44rem] text-[0.95rem] leading-relaxed text-muted">
        {
          "Day to day I work in ServiceTitan, Zapier, and Google Workspace. If your tool has an API, I can probably wire it in. And everything we build ships with a watchdog: scheduled health checks, an alert to a real phone when something breaks, and a morning note on what ran. You never have to wonder whether the robot quietly quit."
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
        {"Run a trade business? Start with the page written for yours: "}
        {INDUSTRY_LINKS.map((link, i) => (
          <span key={link.href}>
            <Link href={link.href} className="inline-link">
              {link.label}
            </Link>
            {i < INDUSTRY_LINKS.length - 2
              ? ", "
              : i === INDUSTRY_LINKS.length - 2
                ? ", or "
                : "."}
          </span>
        ))}
      </p>
    </Section>
  );
}
