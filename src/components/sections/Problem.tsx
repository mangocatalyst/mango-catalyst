import type { ReactNode } from "react";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CopyIcon, FunnelIcon, MoonIcon } from "@/components/ui/icons";

/** Home section 2, copy verbatim from build/out/copy/home.md. */

const PARAGRAPHS = [
  "You're booked solid and still behind. Invoices go out late because somebody has to sit down and make them. Leads from the trade show sit in a notebook for a week. Somebody re-types the same info into three different screens. The schedule lives in one person's head, and when they're out, the day falls apart.",
  "You don't need another full-time hire to handle the busywork. You need the busywork to handle itself.",
  "Most shops your size are stuck in the middle: too small to have someone whose whole job is systems and automation, too big to keep running it all by hand. That gap is exactly what I close.",
];

const PAINS: { icon: ReactNode; text: string }[] = [
  {
    icon: <MoonIcon className="size-5" />,
    text: "Paperwork piling up after hours, so the owner is doing invoices at 9 PM instead of being home.",
  },
  {
    icon: <CopyIcon className="size-5" />,
    text: "The same number typed into the same three screens, every job, by hand.",
  },
  {
    icon: <FunnelIcon className="size-5" />,
    text: "Leads and follow-ups slipping through the cracks because nobody had time to chase them.",
  },
];

export function Problem() {
  return (
    <Section id="the-problem" tone="deep">
      <SectionHeading title="The office work is eating the day" />

      <div className="mt-8 flex max-w-[44rem] flex-col gap-5 xl:max-w-[52rem] xl:text-[1.2rem]">
        {PARAGRAPHS.map((text) => (
          <p key={text.slice(0, 24)} className="leading-[1.65] text-body">
            {text}
          </p>
        ))}
      </div>

      <ul className="mt-12 grid gap-6 sm:grid-cols-3 sm:gap-8">
        {PAINS.map((pain) => (
          <li key={pain.text.slice(0, 24)} className="flex gap-4 sm:flex-col">
            <span className="flex size-10 flex-none items-center justify-center rounded-lg border border-hairline bg-surface text-muted">
              {pain.icon}
            </span>
            <p className="text-[0.95rem] leading-relaxed text-muted">
              {pain.text}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
