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
        only where it saves real time and a person still signs off: drafting the
        routine email reply, summarizing the call notes, turning a pile of
        numbers into a plain-English read. Not a chatbot bolted to your homepage,
        not a strategy deck about transformation.
      </p>
      <ArrowLink href="/ai" className="mt-8">
        See where AI fits, and where it doesn&apos;t
      </ArrowLink>
    </Section>
  );
}
