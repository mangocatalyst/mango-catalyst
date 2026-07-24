import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { SITE } from "@/lib/constants";

/**
 * Where a no-JS list signup lands. With JavaScript the form answers in place and
 * nobody ever sees this page; without it, /api/subscribe posts natively and has
 * to send the browser somewhere that says what happened.
 *
 * It used to send them to /contact?sent=1, which answers "I'll get back to you
 * within one business day": the right promise for a message, and the wrong one
 * for a mailing list. noindex, because this is the tail of a form post and has
 * nothing to say to a search engine.
 */

export const metadata: Metadata = {
  title: "You're on the list",
  robots: { index: false, follow: false },
};

export default async function SubscribedPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const failed = (await searchParams).failed === "1";
  const email: string = SITE.email;

  return (
    <main className="flex-1">
      <Section tone="base">
        <div aria-hidden className="h-[3px] w-10 bg-amber" />
        <h1 className="mt-6 max-w-[22ch] font-display text-[clamp(2.2rem,1.6rem+2.6vw,3.4rem)] font-bold uppercase leading-[1.04] tracking-[0.015em] text-ink">
          {failed ? "That did not go through" : "You're on the list"}
        </h1>
        <p
          role={failed ? "alert" : "status"}
          className="mt-6 max-w-[44rem] text-[1.05rem] leading-[1.65] text-body sm:text-[1.125rem]"
        >
          {failed ? (
            <>
              {"Something went wrong on our end and the signup was not saved. Try again in a moment"}
              {email ? (
                <>
                  {", or email me at "}
                  <a href={`mailto:${email}`} className="inline-link">
                    {email}
                  </a>
                  {" and I'll add you by hand"}
                </>
              ) : null}
              .
            </>
          ) : (
            "One practical automation idea a month, nothing else. No drip sequence, no pitch, and every one of them has an unsubscribe link."
          )}
        </p>
        <p className="mt-8">
          <Link href="/" className="inline-link">
            Back to the site
          </Link>
        </p>
      </Section>
    </main>
  );
}
