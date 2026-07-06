import type { ReactNode } from "react";

/**
 * Section opener: a short amber tick (the hero's measured-rule motif carried
 * through the page), a Big Shoulders industrial-caps H2, and an optional
 * answer-first lead. Tone flips the WCAG pairing for light conversion bands.
 */
export function SectionHeading({
  title,
  lead,
  tone = "dark",
  className,
}: {
  title: ReactNode;
  lead?: ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <div className={className}>
      <div aria-hidden className="h-[3px] w-10 bg-amber" />
      <h2
        className={`mt-6 max-w-[24ch] font-display text-[clamp(2rem,1.3rem+2.4vw,3.25rem)] font-bold uppercase leading-[1.02] tracking-[0.015em] text-balance ${
          tone === "light" ? "text-navy" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {lead ? (
        <p
          className={`mt-5 max-w-[44rem] text-[1.05rem] leading-[1.65] sm:text-[1.125rem] lg:max-w-[52rem] lg:text-[1.2rem] ${
            tone === "light" ? "text-navy-2" : "text-body"
          }`}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}
