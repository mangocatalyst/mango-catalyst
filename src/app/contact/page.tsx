import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbLd, graph } from "@/lib/jsonld";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { CalInline } from "@/components/booking/CalInline";
import { ContactForm } from "@/components/forms/ContactForm";
import { ContactNotices } from "@/components/forms/ContactNotices";

/**
 * Contact: booking-first (seo-spec 2.6), copy verbatim from
 * build/out/copy/contact.md. Schema is BreadcrumbList only.
 *
 * Booking: the Cal.com embed renders automatically once NEXT_PUBLIC_CAL_URL
 * exists; until then the honest fallback state points at the message form.
 * The form is the shared ContactForm, which posts natively to /api/contact
 * with no client JS; the route answers a native post with a 303 back to
 * ?sent=1|0#note; ContactNotices (client, useSearchParams) renders those and
 * the ?booked=1 state, so this page stays static and edge-cached (it was the
 * only uncached route, audit item 8). ?booked=1 needs Cal.com's paid
 * redirect-on-booking, so it is unreachable today.
 */

const TITLE = "Book a 15-Minute Fit Call";
const DESCRIPTION =
  "Book a 15-minute fit call with real time slots, or send a note about the task that keeps stealing your hours. Based in Minnesota, serving the Upper Midwest. No pitch.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/contact" },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    url: "/contact",
    title: `${TITLE} | ${SITE.name}`,
    description: DESCRIPTION,
    ...(SITE.ogImage
      ? { images: [{ url: SITE.ogImage, width: 1200, height: 630 }] }
      : {}),
  },
  twitter: {
    card: "summary_large_image",
    title: `${TITLE} | ${SITE.name}`,
    description: DESCRIPTION,
    ...(SITE.ogImage ? { images: [SITE.ogImage] } : {}),
  },
};

export default function ContactPage() {
  const calUrl = process.env.NEXT_PUBLIC_CAL_URL;
  // Widened so the empty-until-decided constant does not dead-code the branch.
  const email: string = SITE.email;

  return (
    <main className="flex-1">
      <JsonLd
        data={graph(
          breadcrumbLd([
            { name: "Home", url: `${SITE.url}/` },
            { name: "Contact", url: `${SITE.url}/contact` },
          ]),
        )}
      />

      {/* Header band: H1 + answer-first intro. */}
      <Section tone="base" containerClassName="py-[clamp(2.5rem,5vw,4.5rem)]">
        <div aria-hidden className="h-[3px] w-10 bg-amber" />
        <h1 className="mt-6 max-w-[24ch] font-display text-[clamp(2.4rem,1.6rem+3vw,4rem)] font-bold uppercase leading-[1.02] tracking-[0.015em] text-ink">
          Book a 15-minute fit call
        </h1>
        <p className="mt-5 max-w-[44rem] text-[1.05rem] leading-[1.65] text-body sm:text-[1.125rem] lg:max-w-[52rem] lg:text-[1.2rem]">
          {calUrl
            ? "Pick a real slot below. Fifteen minutes, no pitch, and you leave knowing whether the thing draining your hours can run itself. The invite carries a video link. For the record: the first build is $795 and the retainer is $1,000 a month; the call costs nothing, and the price doesn't change on it."
            : "Tell me what's slowing the office down in the form below. I reply within one business day and we set up a 15-minute call with a video link. No pitch either way."}
        </p>
      </Section>

      {/* Light conversion band (palette B): booking first, form second. */}
      <Section tone="light" containerClassName="pt-[clamp(2.5rem,5vw,4.5rem)]">
        <div id="book">
          {/* No sub-heading: the H1 one band up says it, and on a phone the
              heading pushed the booker below the fold (audit item 8). */}
          <ContactNotices which="booked" email={email} />
          {calUrl ? (
            <div className="mt-8 overflow-hidden rounded-xl border border-border-lt bg-surface-lt shadow-[0_8px_24px_rgba(10,17,32,0.08)]">
              <CalInline eager className="min-h-[36rem] w-full" />
            </div>
          ) : (
            <Card tone="light" className="mt-10 max-w-[44rem] p-6 sm:p-8 lg:max-w-[52rem]">
              <p className="leading-[1.65] text-navy-2">
                The scheduler is being set up. Use the form below instead, and
                I&apos;ll confirm a time within one business day.
              </p>
            </Card>
          )}
        </div>

        {/* The quiet second option: never a competing loud CTA. */}
        <div id="note" className="mt-[clamp(4rem,8vw,6rem)]">
          <SectionHeading
            tone="light"
            title="Or send a note"
            lead="Not ready to book? Tell me what's eating your time and I'll reply within one business day."
          />

          <ContactNotices which="sent" email={email} />

          <Card tone="light" className="mt-10 max-w-[44rem] p-6 sm:p-8 lg:max-w-[52rem]">
            <ContactForm idPrefix="contact" />
          </Card>

          {/* Contact details: email line renders once SITE.email is set. */}
          <div className="mt-10 space-y-1.5 text-[0.95rem] leading-[1.65] text-muted-lt">
            {email ? (
              <p>
                Prefer email? Reach me at{" "}
                <a href={`mailto:${email}`} className="inline-link-light">
                  {email}
                </a>
                .
              </p>
            ) : null}
            <p>Based in Minnesota, serving the Upper Midwest.</p>
          </div>
        </div>
      </Section>
    </main>
  );
}
