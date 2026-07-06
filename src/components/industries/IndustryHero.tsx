import type { ReactNode } from "react";
import { Section } from "@/components/layout/Section";

/**
 * Shared opener for /industries pages: answer-first H1 + intro on the left,
 * the trade's blueprint line drawing behind it as a right-of-center backdrop
 * with the home hero's treatment: same scale ladder, same 25%-in-context
 * dimming, same ambient-motion gate (see .trade-art in globals.css). The
 * dimming is plain opacity, not the hero's .hb-veil: the veil exists only
 * because opacity would flatten the hero's preserve-3d stack, and over a
 * glow-less flat section it composites as a visible box. Art is decorative
 * (aria-hidden) and ships zero JS.
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
    <Section
      id="intro"
      className="relative isolate overflow-hidden"
      containerClassName="pb-[clamp(3.5rem,7vw,5.5rem)]"
    >
      <div aria-hidden className="hero-glow" />
      <div aria-hidden className="trade-art">{art}</div>
      <div className="relative">
        <div aria-hidden className="h-[3px] w-10 bg-amber" />
        <h1 className="mt-6 max-w-[24ch] font-display text-[clamp(2.4rem,1.6rem+3vw,4rem)] font-bold uppercase leading-[1.02] tracking-[0.015em] text-balance text-ink">
          {title}
        </h1>
        <p className="mt-6 max-w-[44rem] text-[1.05rem] leading-[1.65] text-body sm:text-[1.125rem] xl:max-w-[52rem] xl:text-[1.2rem]">
          {intro}
        </p>
      </div>
    </Section>
  );
}
