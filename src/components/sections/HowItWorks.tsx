import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Home section 5, copy verbatim from build/out/copy/home.md. */

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

      <p className="mt-12 max-w-[44rem] text-[1.1rem] font-medium leading-[1.6] text-ink lg:max-w-[52rem] lg:text-[1.25rem]">
        {
          "You keep doing the work you're good at. The office work just stops being your problem."
        }
      </p>
    </Section>
  );
}
