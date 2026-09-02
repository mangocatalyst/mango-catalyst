import type { ReactNode } from "react";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import Link from "next/link";
import {
  CalendarIcon,
  ChartIcon,
  ClipboardIcon,
  FunnelIcon,
  InvoiceIcon,
  TagIcon,
} from "@/components/ui/icons";

/**
 * Home section 3. Reworked 2026-07-06 (Bryan) with a FOR EXAMPLE rail per
 * card; 2026-09-02 (audit item 7) the rails moved to /services
 * (src/lib/service-examples.ts) so home summarises and links instead of
 * out-writing the page built to rank for this. Six cards, one line each.
 */

const CARDS: {
  icon: ReactNode;
  title: string;
  body: string;
  /** Anchor of the matching card on /services. */
  href: string;
}[] = [
  {
    icon: <InvoiceIcon className="size-5" />,
    title: "Invoicing, Billing, and the Paper Trail",
    href: "/services#invoicing",
    body: "Jobs close, invoices go out, payments get tracked. The repeatable part runs on its own, so the weekly catch-up on billing mostly disappears.",
  },
  {
    icon: <FunnelIcon className="size-5" />,
    title: "Lead Capture and Follow-Up",
    href: "/services#leads",
    body: "Every lead, from the trade show, the website, the phone, lands in one place, gets routed to the right person, and gets followed up on automatically. Nothing sits in a notebook.",
  },
  {
    icon: <CalendarIcon className="size-5" />,
    title: "Scheduling, Dispatch, and Job Chatter",
    href: "/services#scheduling",
    body: "The coordination around a job, not just the calendar entry, kept together instead of scattered across texts, sticky notes, and inboxes.",
  },
  {
    icon: <ChartIcon className="size-5" />,
    title: "Reporting You Don't Have to Build",
    href: "/services#reporting",
    body: "Daily numbers on what got done, what got sold, and what got missed, put together for you instead of you stitching it from five screens.",
  },
  {
    icon: <TagIcon className="size-5" />,
    title: "Warranty and Equipment Records",
    href: "/services#equipment",
    body: "The equipment paper trail keeps itself, so nobody finds out at the service call that the unit was never registered.",
  },
  {
    icon: <ClipboardIcon className="size-5" />,
    title: "Forms, Portals, and the Clicks Between",
    href: "/services#portals",
    body: "The fifty-times-a-week stuff that lives outside your main system: web portals, agency forms, the same six clicks to do one small thing.",
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

      <p className="mt-10 max-w-[44rem] text-[0.95rem] leading-relaxed text-muted lg:max-w-[52rem] lg:text-[1.05rem]">
        {"Day to day I work in "}
        <Link href="/programs/servicetitan" className="inline-link">
          ServiceTitan
        </Link>
        {
          ", Google Workspace, and Slack. If your tool has an API, I can probably wire it in. And everything I build ships with a watchdog: scheduled health checks, an alert to a real phone when something breaks, and a morning note on what ran. You never have to wonder whether the robot quietly quit."
        }
      </p>

      <p className="mt-6 max-w-[44rem] text-card leading-relaxed text-muted lg:max-w-[52rem] lg:text-[1.05rem]">
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
            <Link
              href={card.href}
              className="inline-link mt-4 inline-block text-[0.95rem]"
            >
              See examples
            </Link>
          </div>
        ))}
      </div>

      <p className="mt-20 max-w-[44rem] font-display text-[1.35rem] font-semibold leading-[1.45] text-balance text-amber lg:max-w-[52rem] lg:text-[1.5rem]">
        {
          "If the task draining your office hours isn't on this list, ask anyway. The whole job is figuring out what can run itself."
        }
      </p>
    </Section>
  );
}
