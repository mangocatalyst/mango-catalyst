import type { ReactNode } from "react";
import { Section } from "@/components/layout/Section";
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
    title: "Invoicing, Billing, and the Paper Trail",
    body: "Jobs close, invoices go out, payments get tracked. The repeatable part runs on its own, so the weekly catch-up on billing mostly disappears.",
    examples: [
      "Supply-house receipt emails matched line by line to the right purchase order in your CRM, for every vendor you buy from.",
      "Yesterday's financials pulled into one morning summary instead of five screens.",
    ],
  },
  {
    icon: <FunnelIcon className="size-5" />,
    title: "Lead Capture and Follow-Up",
    body: "Every lead, from the trade show, the website, the phone, lands in one place, gets routed to the right person, and gets followed up on automatically. Nothing sits in a notebook.",
    examples: [
      "Hang-ups and abandoned calls classified automatically in your phone system, so your booking rate reflects what actually happened.",
      "Open estimates that follow themselves up until they get an answer.",
    ],
  },
  {
    icon: <CalendarIcon className="size-5" />,
    title: "Scheduling, Dispatch, and Job Chatter",
    body: "The coordination around a job, not just the calendar entry, kept together instead of scattered across texts, sticky notes, and inboxes.",
    examples: [
      "A dedicated channel per job in your team chat, the right people added automatically, and the photos and messages in it archived back onto the job record when it closes.",
      "Digital install and truck load sheets the crew fills from a phone, saving field time and still printing clean for the shop.",
    ],
  },
  {
    icon: <ChartIcon className="size-5" />,
    title: "Reporting You Don't Have to Build",
    body: "Daily numbers on what got done, what got sold, and what got missed, put together for you instead of you stitching it from five screens.",
    examples: [
      "Install-quality scorecards per technician: recalls, go-backs, and the hours spent fixing them, built from your CRM and payroll.",
      "A dispatch-board dashboard on the office TV that refreshes itself.",
    ],
  },
  {
    icon: <TagIcon className="size-5" />,
    title: "Warranty and Equipment Records",
    body: "The equipment paper trail keeps itself, so nobody finds out at the service call that the unit was never registered.",
    examples: [
      "Every unit you install logged with model and serial, and registered with the manufacturer automatically, portal or not.",
      "A master equipment sheet that fills itself in as the trucks roll.",
    ],
  },
  {
    icon: <ClipboardIcon className="size-5" />,
    title: "Forms, Portals, and the Clicks Between",
    body: "The fifty-times-a-week stuff that lives outside your main system: web portals, agency forms, the same six clicks to do one small thing.",
    examples: [
      "Portal forms pre-filled from saved presets, with your staff reviewing and clicking submit.",
      "One-keystroke shortcuts for the actions your office repeats all day inside the tools you already use.",
    ],
  },
];

export function ServiceGrid() {
  return (
    <Section id="services">
      <SectionHeading
        title="What I actually build"
        lead={
          "The busywork that can actually be automated is the repetitive kind: invoicing, lead follow-up, scheduling, reporting, data entry. I don't sell you software. I connect the tools you already pay for and make that work run on its own. Plain English, working systems, no jargon."
        }
      />

      <p className="mt-10 max-w-[44rem] text-[0.95rem] leading-relaxed text-muted xl:max-w-[52rem] xl:text-[1.05rem]">
        {
          "Day to day I work in ServiceTitan, Zapier, and Google Workspace. If your tool has an API, I can probably wire it in. And everything I build ships with a watchdog: scheduled health checks, an alert to a real phone when something breaks, and a morning note on what ran. You never have to wonder whether the robot quietly quit."
        }
      </p>

      <p className="mt-6 max-w-[44rem] text-card leading-relaxed text-muted xl:max-w-[52rem] xl:text-[1.05rem]">
        {
          "Some of that busywork lives inside a web page with no API to hook into. For those, I build a Chrome extension that does the same clicking and typing right in the browser your staff already use, so the data stays on their machine and never leaves the building."
        }
      </p>

      <div className="mt-14 grid gap-x-16 gap-y-16 sm:grid-cols-2">
        {CARDS.map((card) => (
          <div key={card.title}>
            <div className="flex items-center gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-hairline bg-surface-hi text-muted">
                {card.icon}
              </span>
              <h3 className="text-[1.15rem] font-semibold text-ink">
                {card.title}
              </h3>
            </div>
            <p className="mt-4 text-card text-body">{card.body}</p>
            <div className="mt-6 border-l-2 border-amber pl-4">
              <p className="text-[0.7rem] font-medium tracking-[0.18em] uppercase text-faint">
                For example
              </p>
              <ul className="mt-2 grid gap-2">
                {card.examples.map((example) => (
                  <li
                    key={example.slice(0, 24)}
                    className="text-card text-muted"
                  >
                    {example}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-20 max-w-[44rem] font-display text-[1.35rem] font-semibold leading-[1.45] text-amber xl:max-w-[52rem] xl:text-[1.5rem]">
        {
          "If the thing eating your week isn't on this list, ask anyway. The whole job is figuring out what can run itself."
        }
      </p>
    </Section>
  );
}
