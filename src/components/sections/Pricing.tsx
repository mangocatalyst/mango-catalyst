import { Section } from "@/components/layout/Section";
import { BookButton } from "@/components/booking/BookButton";
import { CalInline } from "@/components/booking/CalInline";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CheckIcon } from "@/components/ui/icons";
import { calTarget } from "@/lib/cal";

/**
 * Home section 6, copy verbatim from build/out/copy/home.md (the D1 offer
 * terms). This is a palette-B LIGHT conversion band (Bryan's locked pick):
 * light bg, navy text, white card with the amber top border. Amber appears
 * only as the button fill; amber text or icons fail AA on light backgrounds.
 */

const INCLUDES = [
  "Keeping everything I've built for you working. When a tool updates or an integration breaks, fixing it is included: I reply within 1 business day, and fixes land within 2 to 3 business days.",
  "A monthly queue of tweaks and improvements. Small changes (under about 2 hours of work) come out of the queue, no extra charge per tweak.",
  "Bigger new builds (a whole new workflow from scratch) get scoped and agreed first, so you always know what you're getting. No surprise bills, and no \"unlimited\" promise I can't keep.",
];

export function Pricing() {
  return (
    <Section id="pricing" tone="light">
      <SectionHeading
        tone="light"
        title="Simple pricing, no surprises"
        lead={
          'It costs $795 one-time for the first build, then $1,000 a month. No long contracts. No per-seat fees. No "call for a quote" runaround.'
        }
      />

      <div className="mt-12 grid items-start gap-10 lg:grid-cols-[minmax(0,30rem)_minmax(0,1fr)] lg:items-stretch lg:gap-14">
        <Card tone="light" accent className="p-7 sm:p-9">
          <div>
            <h3 className="text-[0.8rem] font-semibold tracking-[0.18em] uppercase text-muted-lt">
              First workflow setup
            </h3>
            <p className="mt-2 flex flex-wrap items-baseline gap-x-3">
              <span className="font-display text-[3rem] leading-none font-bold text-navy sm:text-[3.5rem]">
                $795
              </span>
              <span className="text-[0.95rem] font-medium text-muted-lt">
                one-time
              </span>
            </p>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-navy-2">
              I build your first automation and get it running, wired into the
              tools you already use.
            </p>
          </div>

          <hr className="my-7 border-border-lt" />

          <div>
            <h3 className="text-[0.8rem] font-semibold tracking-[0.18em] uppercase text-muted-lt">
              Ongoing automation partner
            </h3>
            <p className="mt-2 flex flex-wrap items-baseline gap-x-3">
              <span className="font-display text-[3rem] leading-none font-bold text-navy sm:text-[3.5rem]">
                $1,000
              </span>
              <span className="text-[0.95rem] font-medium text-muted-lt">
                a month
              </span>
            </p>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-navy-2">
              First 3 months, then month to month. Your data is always yours;
              the automations run while the retainer runs.
            </p>
          </div>

          <hr className="my-7 border-border-lt" />

          <p className="font-semibold text-navy">
            What the monthly actually includes (so there are no surprises):
          </p>
          <ul className="mt-4 flex flex-col gap-3.5">
            {INCLUDES.map((item) => (
              <li key={item.slice(0, 24)} className="flex gap-3">
                <CheckIcon className="mt-0.5 size-5 flex-none text-navy-2" />
                <span className="text-[0.95rem] leading-relaxed text-navy-2">
                  {item}
                </span>
              </li>
            ))}
          </ul>

          <BookButton href="/contact#book" className="mt-8 w-full" arrow>
            Book a 15-Minute Fit Call
          </BookButton>

          <hr className="my-7 border-border-lt" />

          <p className="text-[0.95rem] leading-relaxed text-navy-2">
            <strong className="font-semibold text-navy">
              The break-even, in plain numbers:
            </strong>{" "}
            {
              "count the office hours your team spends on the task each month, multiply by what an hour actually costs you ($20 to $40 for most office roles, once taxes and benefits are counted), and set that next to $1,000. That's the whole math, and you can run it before we ever talk."
            }
          </p>
          <p className="mt-4 text-[0.95rem] leading-relaxed text-navy-2">
            <strong className="font-semibold text-navy">
              {"Why it's a retainer, not a project:"}
            </strong>{" "}
            {
              "Automation isn't a thing you buy once. Tools change, your shop changes, and the systems need someone keeping them alive. That's what the monthly covers."
            }
          </p>
          <p className="mt-4 text-[0.95rem] leading-relaxed text-navy-2">
            <strong className="font-semibold text-navy">
              Why the 3-month start:
            </strong>{" "}
            the build work is front-loaded. Most of my hours land in the first
            weeks, and the 3-month start is what makes the $795 setup possible
            instead of charging the whole build cost up front.
          </p>
        </Card>

        {/* Booker fills the whole right cell, top-aligned with the pricing
            card. On lg the card dictates the row height: the booker's content
            is an absolute fill with zero intrinsic height, so the slot list
            scrolls inside the box instead of stretching the section. Mobile
            keeps the natural stacked height. Rendered only when the scheduler
            is wired; otherwise the card's popup CTA + /contact fallback carry
            it. */}
        {calTarget() ? (
          <Card
            tone="light"
            accent
            className="relative overflow-hidden lg:min-h-0"
          >
            <div className="lg:absolute lg:inset-0 lg:overflow-y-auto">
              <CalInline className="min-h-[34rem] w-full lg:min-h-0" />
            </div>
          </Card>
        ) : null}
      </div>
    </Section>
  );
}
