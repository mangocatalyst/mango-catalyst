import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Home section 5, copy verbatim from build/out/copy/home.md. */

/**
 * The chalk process strip (Night Shift Drafting rollout, 2026-07-19): call
 * log -> schedule -> job ticket -> invoice, left to right, with the amber
 * chain threading them. It illustrates the WORK that ends up running itself,
 * which is why it sits under the steps rather than beside them: the numbered
 * steps are how we get there, this is what "it" is.
 *
 * Same construction as the trade art: the drawing is a lazy raster, amber is
 * an SVG layer on top in the asset's own pixel space (1100x255), so it can
 * carry motion the raster cannot. Per Bryan's rule the call log, schedule and
 * ticket live on screens; only the invoice is paper.
 */
function ProcessStrip() {
  const nodes = [155, 477, 770, 1000];
  return (
    <div aria-hidden className="hiw-art">
      <div className="hiw-sheet relative">
        {/* eslint-disable-next-line @next/next/no-img-element -- decorative asset already webp at final size */}
        <img
          src="/home/process-strip.webp"
          alt=""
          width={1100}
          height={255}
          decoding="async"
          loading="lazy"
          fetchPriority="low"
          className="block h-auto w-full"
        />
        <svg
          viewBox="0 0 1100 255"
          fill="none"
          className="absolute inset-0 h-full w-full"
        >
          <path
            d="M120 245H1020"
            stroke="#F6A328"
            strokeOpacity=".28"
            strokeWidth="1.4"
          />
          {nodes.map((x, i) => (
            <circle
              key={x}
              className={`hiw-node hiw-n${i + 1}`}
              cx={x}
              cy="245"
              r="4.5"
              fill="#F6A328"
            />
          ))}
          <circle className="hiw-tracer" cx="0" cy="0" r="4" fill="#F6A328" />
        </svg>
      </div>
    </div>
  );
}

const STEPS: { title: string; body: string }[] = [
  {
    title: "We talk (15 minutes).",
    body: "You tell me what's slowing the office down. I ask the questions a software salesman wouldn't know to ask, because I've run service operations myself instead of selling the tool.",
  },
  {
    title: "We pick one thing.",
    body: "We find the single most annoying, most repeated task and start there. One clear win beats a giant plan that never ships.",
  },
  {
    title: "I build it and set it up.",
    body: "Setup is a one-time $795. I build your first automation, wired into the tools you already use, and get it running. You don't manage anything.",
  },
  {
    title: "It runs, and keeping it running is my job.",
    body: "$1,000 a month; the first 3 months are a commitment, month to month after that. Small tweaks come out of a monthly queue, bigger builds get scoped first, and when a tool you use changes and something breaks, fixing it is my job.",
  },
];

export function HowItWorks() {
  return (
    <Section id="how-it-works">
      <SectionHeading
        title="How it works"
        lead={
          "After you book, three things happen: we talk, we pick one task, I build it. No giant project. No six-month rollout. We start small, prove it works, then build from there."
        }
      />

      <ol role="list" className="mt-12 grid list-none gap-10 md:grid-cols-2">
        {STEPS.map((step, index) => (
          <li key={step.title} className="flex gap-5">
            <span
              aria-hidden
              className="font-display text-[2.6rem] leading-none font-bold text-amber"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="pt-1.5">
              <p className="text-[1.1rem] font-semibold text-ink">
                {step.title}
              </p>
              <p className="mt-2.5 leading-relaxed text-body">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>

      <ProcessStrip />

      <p className="mt-12 max-w-[44rem] text-[1.1rem] font-medium leading-[1.6] text-ink lg:max-w-[52rem] lg:text-[1.25rem]">
        {
          "You keep doing the work you're good at. The office work just stops being your problem."
        }
      </p>
    </Section>
  );
}
