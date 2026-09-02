import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbLd, graph } from "@/lib/jsonld";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { CalInline } from "@/components/booking/CalInline";
import { ContactForm } from "@/components/forms/ContactForm";

/**
 * Contact: booking-first (seo-spec 2.6), copy verbatim from
 * build/out/copy/contact.md. Schema is BreadcrumbList only.
 *
 * Booking: the Cal.com embed renders automatically once NEXT_PUBLIC_CAL_URL
 * exists; until then the honest fallback state points at the message form.
 * The form is the shared ContactForm, which posts natively to /api/contact
 * with no client JS; the route answers a native post with a 303 back to
 * ?sent=1|0#note, and this page renders those notices. ?booked=1 (the Cal.com
 * post-booking redirect) renders the confirmation state. Reading searchParams
 * keeps this page dynamic; the formLoadedAt stamp now comes from the form's
 * own mount effect, so nothing here depends on that.
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

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const sent = typeof params.sent === "string" ? params.sent : undefined;
  const booked = params.booked === "1";
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
      <Section tone="base">
        <div aria-hidden className="h-[3px] w-10 bg-amber" />
        <h1 className="mt-6 max-w-[24ch] font-display text-[clamp(2.4rem,1.6rem+3vw,4rem)] font-bold uppercase leading-[1.02] tracking-[0.015em] text-ink">
          Book a 15-minute fit call
        </h1>
        <p className="mt-5 max-w-[44rem] text-[1.05rem] leading-[1.65] text-body sm:text-[1.125rem] lg:max-w-[52rem] lg:text-[1.2rem]">
          {calUrl
            ? "Pick a real time slot below. The call is 15 minutes, there's no pitch, and you leave knowing whether the thing draining your hours can run itself, and roughly what that would look like. Every booking comes with a video link in the calendar invite, so there's nothing to figure out on the day. For the record: the first build is $795 and the retainer is $1,000 a month. The call costs nothing, and the price doesn't change on it."
            : "Tell me what's slowing the office down in the form below. I reply within one business day and we set up a 15-minute call with a video link. No pitch either way."}
        </p>
      </Section>

      {/* Light conversion band (palette B): booking first, form second. */}
      <Section tone="light">
        <div id="book">
          <SectionHeading tone="light" title="Grab a slot" />
          {booked ? (
            <Card
              tone="light"
              className="mt-10 max-w-[44rem] border-l-4 border-l-success p-6 sm:p-8 lg:max-w-[52rem]"
            >
              <p className="leading-[1.65] text-navy" role="status">
                You&apos;re booked. A calendar invite with a video link is on
                its way to your inbox, along with a confirmation email. No prep
                needed: just show up knowing which task drives you nuts. If the
                time stops working, reply to the confirmation email and
                we&apos;ll find another slot.
              </p>
            </Card>
          ) : calUrl ? (
            <div className="mt-10 overflow-hidden rounded-xl border border-border-lt bg-surface-lt shadow-[0_8px_24px_rgba(10,17,32,0.08)]">
              <CalInline className="min-h-[36rem] w-full" />
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

          {sent === "1" ? (
            <p
              role="status"
              className="mt-8 max-w-[44rem] rounded-lg border-l-4 border-l-success bg-surface-lt p-4 font-medium text-navy lg:max-w-[52rem] lg:text-[1.2rem]"
            >
              Got it. I&apos;ll get back to you within one business day.
            </p>
          ) : null}
          {sent === "0" ? (
            <p
              role="alert"
              className="mt-8 max-w-[44rem] rounded-lg border-l-4 border-l-error bg-surface-lt p-4 font-medium text-navy lg:max-w-[52rem] lg:text-[1.2rem]"
            >
              {"Something went wrong on our end. Try again, or email me directly at "}
              <a href={`mailto:${email}`} className="inline-link-light">
                {email}
              </a>
              .
            </p>
          ) : null}

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
