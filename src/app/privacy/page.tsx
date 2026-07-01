import type { Metadata } from "next";
import { SITE } from "@/lib/constants";

/**
 * Privacy policy: the plain-English draft from build/out/copy/privacy.md,
 * typeset verbatim. Footer-linked only (seo-spec 2.9): no keyword target, no
 * JSON-LD, excluded from the nav and the internal-link mesh. Attorney review
 * rides the LLC gate before production.
 */

const TITLE = "Privacy Policy";
const DESCRIPTION =
  "What the Mango Catalyst site collects, how contact form submissions are delivered, what analytics run, and how to ask for your data to be removed.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/privacy" },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    url: "/privacy",
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

/**
 * Truthful "last updated" stamp: evaluated when the static page is
 * prerendered at build time, so it always reflects the deploy that shipped
 * this copy. Never hardcoded (copy design note).
 */
const LAST_UPDATED = new Date().toLocaleDateString("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "America/Chicago",
});

/** Section shell: small amber tick + industrial-caps H2, subdued for a policy page. */
function PolicySection({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-14 first:mt-0">
      <div aria-hidden className="h-[3px] w-6 bg-amber" />
      <h2 className="mt-4 font-display text-[1.45rem] font-bold uppercase leading-[1.1] tracking-[0.02em] text-ink sm:text-[1.6rem]">
        {heading}
      </h2>
      <div className="mt-4 flex flex-col gap-4 leading-[1.7] text-body">
        {children}
      </div>
    </section>
  );
}

export default function PrivacyPage() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-20 sm:px-10 sm:py-28">
      <div className="max-w-[44rem]">
        <div aria-hidden className="h-[3px] w-10 bg-amber" />
        <h1 className="mt-6 max-w-[24ch] font-display text-[clamp(2.4rem,1.6rem+3vw,4rem)] font-bold uppercase leading-[1.02] tracking-[0.015em] text-ink">
          Privacy policy
        </h1>
        <p className="mt-5 leading-[1.65] text-body">
          This is the plain-English version of what this website collects and
          what happens to it. No legalese for the sake of legalese.
        </p>
        <p className="mt-4 text-sm text-faint">Last updated {LAST_UPDATED}</p>

        <div className="mt-14">
          <PolicySection heading="What this site collects">
            <p>Two things, both of them because you chose to send them:</p>
            <ul className="flex flex-col gap-3 pl-5">
              <li className="list-disc marker:text-amber">
                <strong className="font-semibold text-ink">
                  The contact form:
                </strong>{" "}
                your name, email, business name, and whatever you type in the
                message box.
              </li>
              <li className="list-disc marker:text-amber">
                <strong className="font-semibold text-ink">
                  The booking scheduler:
                </strong>{" "}
                your name, email, and your answer to the one question on the
                booking form.
              </li>
            </ul>
            <p>
              {
                "That's it. There are no accounts, no newsletters, and nothing collected behind your back."
              }
            </p>
          </PolicySection>

          <PolicySection heading="How your message gets to me">
            <p>
              Contact form submissions are delivered to my business email inbox
              by an email delivery service; the service processes the message
              in order to deliver it. Bookings run on Cal.com, the scheduling
              tool embedded on the contact page, which handles your booking
              details under its own privacy policy and puts the appointment
              (with a video link) on both of our calendars.
            </p>
          </PolicySection>

          <PolicySection heading="What analytics run here">
            <p>
              This site uses Vercel Web Analytics and Speed Insights: aggregate
              page-view counts and performance numbers. No ad networks, no
              cross-site tracking, no selling your browsing behavior to anyone.
            </p>
          </PolicySection>

          <PolicySection heading="What I don't do with your information">
            <p>
              {
                "I never sell your information. I use what you send me for exactly one thing: replying to you and, if we end up working together, doing the work you hired me for."
              }
            </p>
          </PolicySection>

          <PolicySection heading="Want your info removed?">
            <p>
              Email{" "}
              <a href="mailto:hello@mangocatalyst.com" className="inline-link">
                hello@mangocatalyst.com
              </a>{" "}
              and ask.{" "}
              {
                "I'll delete your form submissions and contact details from my systems and confirm when it's done."
              }
            </p>
          </PolicySection>

          <PolicySection heading="If this policy changes">
            <p>
              If how this site handles information changes, this page changes
              with it. The current version is always the one that applies.
            </p>
          </PolicySection>
        </div>
      </div>
    </main>
  );
}
