import type { ReactNode } from "react";
import { Section } from "@/components/layout/Section";

/**
 * Shared opener for /industries pages: answer-first H1 + intro on the left,
 * the trade's blueprint line drawing on the right (see TradeArt.tsx). Art is
 * decorative (aria-hidden), stacks below the text on small screens, and
 * ships zero JS, matching the main hero's type-led language without its
 * motion system.
 */
export function IndustryHero({
  title,
  intro,
  art,
}: {
  title: string;
  intro: string;
  art: ReactNode;
}) {
  return (
    <Section id="intro" containerClassName="pb-[clamp(3.5rem,7vw,5.5rem)]">
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:gap-14">
        <div>
          <div aria-hidden className="h-[3px] w-10 bg-amber" />
          <h1 className="mt-6 max-w-[24ch] font-display text-[clamp(2.4rem,1.6rem+3vw,4rem)] font-bold uppercase leading-[1.02] tracking-[0.015em] text-balance text-ink">
            {title}
          </h1>
          <p className="mt-6 max-w-[44rem] text-[1.05rem] leading-[1.65] text-body sm:text-[1.125rem]">
            {intro}
          </p>
        </div>
        <div aria-hidden className="mx-auto w-full max-w-[26rem] lg:max-w-none">
          {art}
        </div>
      </div>
    </Section>
  );
}
