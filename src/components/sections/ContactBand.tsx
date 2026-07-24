import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { ContactForm } from "@/components/forms/ContactForm";

/**
 * The "or just send a note" band. Not everyone reading a page wants to book a
 * call, and the only way to say anything used to be the booking page.
 *
 * Light band, so it pairs with the CTA bands around it rather than competing
 * with them. `containerClassName="pt-0"` on a page where the band above is
 * already light makes the two read as one zone instead of two stacked panels.
 */
export function ContactBand({
  idPrefix,
  lead = "Not ready to book a call? Tell me what's eating your time and I'll reply within one business day. No pitch either way.",
  containerClassName,
}: {
  idPrefix: string;
  lead?: string;
  containerClassName?: string;
}) {
  return (
    <Section id={`${idPrefix}-note`} tone="light" containerClassName={containerClassName}>
      <SectionHeading tone="light" title="Or send a note" lead={lead} />
      <Card tone="light" className="mt-10 max-w-[44rem] p-6 sm:p-8 lg:max-w-[52rem]">
        <ContactForm idPrefix={idPrefix} />
      </Card>
    </Section>
  );
}
