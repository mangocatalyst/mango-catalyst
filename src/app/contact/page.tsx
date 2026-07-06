import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbLd, graph } from "@/lib/jsonld";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { CalInline } from "@/components/booking/CalInline";

/**
 * Contact: booking-first (seo-spec 2.6), copy verbatim from
 * build/out/copy/contact.md. Schema is BreadcrumbList only.
 *
 * Booking: the Cal.com embed renders automatically once NEXT_PUBLIC_CAL_URL
 * exists; until then the honest fallback state points at the message form.
 * The form posts natively to /api/contact (no client JS), which answers with
 * a 303 back to ?sent=1|0#note; ?booked=1 (the Cal.com post-booking redirect)
 * renders the confirmation state. Reading searchParams makes this page
 * dynamic, so the formLoadedAt stamp for the minimum-fill-time spam check is
 * fresh per request.
 */

const TITLE = "Book a 15-Minute Fit Call";
const DESCRIPTION =
  "Book a 15-minute fit call with real time slots, or send a note about the task eating your week. Based in Minnesota, serving the upper Midwest. No pitch.";

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

/** Field skin for the light conversion band (option-B pairing: navy on white). */
const FIELD_CLASSES =
  "mt-2 w-full rounded-lg border border-border-lt bg-surface-lt px-4 py-3 text-navy placeholder:text-muted-lt";

const LABEL_CLASSES = "block text-sm font-semibold text-navy";

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
  // Per-request render stamp (this page is dynamic) for the route handler's
  // minimum-fill-time bot check. Deliberately impure: it must differ per
  // request, and a server component renders exactly once per request.
  // eslint-disable-next-line react-hooks/purity
  const formLoadedAt = String(Date.now());

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
            ? "Pick a real time slot below. The call is 15 minutes, there's no pitch, and you leave knowing whether the thing eating your week can run itself, and roughly what that would look like. Every booking comes with a video link in the calendar invite, so there's nothing to figure out on the day."
            : "Tell me what's eating your week in the form below. I reply within one business day and we set up a 15-minute call with a video link. No pitch either way."}
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
              Something went wrong on our end. Try again, or email me directly.
            </p>
          ) : null}

          <Card tone="light" className="mt-10 max-w-[44rem] p-6 sm:p-8 lg:max-w-[52rem]">
            <form
              action="/api/contact"
              method="post"
              className="relative grid gap-5 sm:grid-cols-2"
            >
              {/* Honeypot: hidden from humans, skipped by screen readers and
                  the tab order. Bots that fill it are dropped silently. */}
              <div
                aria-hidden="true"
                className="absolute -left-[9999px] h-px w-px overflow-hidden"
              >
                <label htmlFor="contact-website">Website</label>
                <input
                  id="contact-website"
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>
              {/* Server-stamped per request (dynamic page); the route handler
                  flags (but still delivers) submits that arrive faster than a
                  human can type, so autofill users are never dropped. */}
              <input type="hidden" name="formLoadedAt" value={formLoadedAt} />

              <div>
                <label htmlFor="contact-name" className={LABEL_CLASSES}>
                  Your name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  required
                  autoComplete="name"
                  className={FIELD_CLASSES}
                />
              </div>
              <div>
                <label htmlFor="contact-email" className={LABEL_CLASSES}>
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  className={FIELD_CLASSES}
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="contact-business" className={LABEL_CLASSES}>
                  Business name
                </label>
                <input
                  id="contact-business"
                  type="text"
                  name="business"
                  autoComplete="organization"
                  className={FIELD_CLASSES}
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="contact-message" className={LABEL_CLASSES}>
                  What&apos;s eating your week?{" "}
                  <span className="font-normal text-muted-lt">
                    (tell me the one task that drives you nuts)
                  </span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={5}
                  className={FIELD_CLASSES}
                />
              </div>
              <div className="sm:col-span-2">
                <button type="submit" className="btn btn-primary">
                  Send it over
                </button>
              </div>
            </form>
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
            <p>Based in Minnesota, serving the upper Midwest.</p>
          </div>
        </div>
      </Section>
    </main>
  );
}
