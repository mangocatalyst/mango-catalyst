import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Home section 7, copy verbatim from build/out/copy/home.md. A teaser only:
 * three one-line summaries linking to /faq (the question text is the anchor).
 * NO FAQPage JSON-LD here; /faq is the only page that emits it (seo-spec 2.1).
 * Light band continues from pricing (palette B).
 */

const TEASERS = [
  {
    question: "Is this going to replace my people?",
    answer:
      "No. It replaces the busywork they hate, so they can do the work you hired them for.",
  },
  {
    question: "Is my data safe?",
    answer:
      "It's yours. I never sell it, and I only wire it into the systems we agree to automate.",
  },
  {
    question: "What happens if something breaks?",
    answer:
      "You message the person who built it. I reply within 1 business day, and fixes land within 2 to 3 business days.",
  },
];

export function FaqTeaser() {
  return (
    <Section id="faq" tone="light" className="border-t border-border-lt">
      <SectionHeading tone="light" title="The questions owners ask first" />

      <ul className="mt-10 grid gap-8 md:grid-cols-3 md:gap-10">
        {TEASERS.map((item) => (
          <li key={item.question}>
            <Link
              href="/faq"
              className="inline-link-light text-[1.05rem] font-semibold"
            >
              {item.question}
            </Link>
            <p className="mt-2.5 text-[0.95rem] leading-relaxed text-navy-2">
              {item.answer}
            </p>
          </li>
        ))}
      </ul>

      <p className="mt-12 text-navy-2">
        {"Every answer, no runaround: "}
        <Link href="/faq" className="inline-link-light font-medium">
          Straight answers
        </Link>
      </p>
    </Section>
  );
}
