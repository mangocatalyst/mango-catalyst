import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowLink } from "@/components/ui/ArrowLink";

/**
 * Home teaser for /ai: one heading, one plain-English paragraph, one link.
 * Text only, no image. Amber budget is the H2 tick plus the single ArrowLink,
 * nothing else. Base band, dropped between the Owner Dashboard (light) and the
 * credibility bar (deep) so it introduces no same-tone adjacency.
 */
export function AiTeaser() {
  return (
    <Section id="ai" tone="base">
      <SectionHeading title="AI where it earns its keep" />
      <p className="mt-8 max-w-[44rem] leading-[1.65] text-body lg:max-w-[52rem] lg:text-[1.2rem]">
        I use AI every day to build faster, and I&apos;ll put it into your shop
        only where it saves real time and a person still signs off. Not sure
        you&apos;re ready for a build? There&apos;s a consulting option: two
        one-hour sessions, $500 flat, no retainer, and the $500 counts toward
        setup if you build within 60 days.
      </p>
      <ArrowLink href="/ai-consultant" className="mt-8">
        See the AI consulting offer
      </ArrowLink>
    </Section>
  );
}
