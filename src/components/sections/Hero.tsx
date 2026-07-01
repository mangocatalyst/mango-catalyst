import type { CSSProperties } from "react";
import { Button } from "@/components/ui/Button";

/**
 * Home hero, direction A: type-led + one CSS spark (Bryan's locked pick).
 *
 * Server component, zero client JS. The H1 is the art: Big Shoulders stacked
 * three lines over a faint blueprint grid and one matte navy glow. Amber
 * appears exactly three times: the spark on the last word, the rule that
 * draws on at load, and the CTA. The reveal is one orchestrated CSS moment,
 * gated to desktop widths and prefers-reduced-motion: no-preference; on
 * mobile and for reduced-motion visitors the hero renders static.
 *
 * Copy is verbatim from build/out/copy/home.md, section 1.
 */

/** Stagger offset for the single page-load reveal. */
const delay = (seconds: number): CSSProperties =>
  ({ "--reveal-delay": `${seconds}s` } as CSSProperties);

export function Hero() {
  return (
    <section
      id="top"
      className="hero-reveal relative isolate flex min-h-[calc(100svh-4rem)] flex-col overflow-hidden bg-base"
    >
      {/* Backdrop: matte navy glow under a faint blueprint grid. */}
      <div aria-hidden className="hero-glow" />
      <div aria-hidden className="hero-grid" />

      <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col px-6 sm:px-10">
        <div className="my-auto pt-12 pb-14 sm:pt-12 sm:pb-16">
          {/* Quiet kicker row. The wordmark lives in the navbar; this row keeps
              the hero's measured, justified opening line. */}
          <div
            data-reveal="rise"
            style={delay(0.1)}
            className="flex items-baseline justify-between"
          >
            <p className="text-[0.8rem] font-medium tracking-[0.22em] uppercase text-muted">
              Small-business automation
            </p>
            <p className="hidden text-sm text-faint sm:block">
              Duluth, Minnesota
            </p>
          </div>

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

          <div aria-hidden className="hero-rule mt-6 sm:mt-7">
            <span className="hero-rule-amber" />
          </div>

          <p
            data-reveal="rise"
            style={delay(0.65)}
            className="mt-6 max-w-[38rem] text-[1.05rem] leading-[1.6] text-body sm:mt-7 sm:text-[1.15rem]"
          >
            {
              "The ones that take the office off your hands: invoicing, lead follow-up, dispatch, reporting. Automation for small businesses in Minnesota and the upper Midwest, built by someone who ran service operations inside a real shop, not a software salesman."
            }
          </p>

          <div data-reveal="rise" style={delay(0.8)} className="mt-7 sm:mt-8">
            <Button href="/contact#book" arrow>
              Book a 15-minute fit call
            </Button>
            <p className="mt-3 max-w-[34rem] text-sm text-faint">
              {
                "No pitch deck. We look at one thing eating your week and figure out if it can run itself."
              }
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
