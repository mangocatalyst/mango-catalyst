import type { CSSProperties } from "react";

/**
 * Home hero, direction A: type-led + one CSS spark.
 *
 * Server component, zero client JS. The H1 is the art: Big Shoulders stacked
 * three lines over a faint blueprint grid and one matte navy glow. Amber
 * appears exactly three times: the spark on the last word, the rule that
 * draws on at load, and the CTA. The reveal is one orchestrated CSS moment,
 * gated to desktop widths and prefers-reduced-motion: no-preference; on
 * mobile and for reduced-motion visitors the hero renders static.
 */

/** Stagger offset for the single page-load reveal. */
const delay = (seconds: number): CSSProperties =>
  ({ "--reveal-delay": `${seconds}s` } as CSSProperties);

export function Hero() {
  return (
    <section className="hero-reveal relative isolate flex min-h-svh flex-col overflow-hidden bg-base">
      {/* Backdrop: matte navy glow under a faint blueprint grid. */}
      <div aria-hidden className="hero-glow" />
      <div aria-hidden className="hero-grid" />

      <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col px-6 sm:px-10">
        {/* Quiet brand row. The wordmark stays ink; amber belongs to the H1. */}
        <div
          data-reveal="rise"
          style={delay(0)}
          className="flex items-baseline justify-between pt-7"
        >
          <p className="text-[1.05rem] font-semibold tracking-tight text-ink">
            mango catalyst
          </p>
          <p className="text-sm text-faint">Duluth, Minnesota</p>
        </div>

        <div className="my-auto pt-14 pb-16 sm:pt-12 sm:pb-16">
          <p
            data-reveal="rise"
            style={delay(0.1)}
            className="text-[0.8rem] font-medium tracking-[0.22em] uppercase text-muted"
          >
            Small-business automation
          </p>

          <h1 className="hero-headline mt-5">
            <span className="hero-line">
              <span className="hero-line-inner" style={delay(0.18)}>
                {"The Other "}
              </span>
            </span>
            <span className="hero-line">
              <span className="hero-line-inner" style={delay(0.28)}>
                {"Tools of "}
              </span>
            </span>
            <span className="hero-line">
              <span className="hero-line-inner" style={delay(0.38)}>
                the Trade
                <span aria-hidden className="hero-spark" />
              </span>
            </span>
          </h1>

          <div aria-hidden className="hero-rule mt-7">
            <span className="hero-rule-amber" />
          </div>

          <p
            data-reveal="rise"
            style={delay(0.65)}
            className="mt-7 max-w-[36rem] text-[1.1rem] leading-[1.6] text-body sm:text-[1.2rem]"
          >
            Your trade runs on a second set of tools: the quotes, the schedule,
            the invoices, the follow-up. I build automation that takes that
            office work off your plate. I ran service operations inside a real
            shop, so I know which jobs eat your week.
          </p>

          <div data-reveal="rise" style={delay(0.8)} className="mt-8">
            <a href="#book" className="hero-cta">
              Book a 15-minute fit call
              <svg
                aria-hidden
                focusable="false"
                viewBox="0 0 16 16"
                width="15"
                height="15"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
              </svg>
            </a>
            <p className="mt-3 text-sm text-faint">
              No pitch. Just a straight answer on fit.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
