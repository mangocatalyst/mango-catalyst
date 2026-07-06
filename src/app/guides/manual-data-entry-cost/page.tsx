import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { SITE } from "@/lib/constants";
import { JsonLd } from "@/components/seo/JsonLd";
import { graph, articleLd, breadcrumbLd } from "@/lib/jsonld";

/**
 * Guide: the real cost of manual data entry. Copy verbatim from
 * build/out/copy/guide-manual-data-entry-cost.md; metadata from seo-spec 2.8.
 * Undated on the visible page; real dates live in the Article schema only.
 *
 * Citation links (both verified live at build time, 2026-07-01):
 * - Panko's human error research moved off panko.shidler.hawaii.edu (dead,
 *   NXDOMAIN) to panko.com; the linked page carries the error-rate table.
 * - SBA "How Much Does an Employee Cost You?" carries the 1.25 to 1.4x rule.
 */

const PATH = "/guides/manual-data-entry-cost";
const PAGE_URL = `${SITE.url}${PATH}`;
const TITLE = "The Real Cost of Manual Data Entry";
const DESCRIPTION =
  "What manual data entry really costs a small business: the hours, the error rate, and the math, plus how to spot the worst double-keying in your office.";

const PANKO_URL = "https://panko.com/HumanErr/SimpleNontrivial.html";
const SBA_URL = "https://www.sba.gov/blog/how-much-does-employee-cost-you";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: {
    type: "article",
    siteName: SITE.name,
    url: PATH,
    title: TITLE,
    description: DESCRIPTION,
    ...(SITE.ogImage
      ? { images: [{ url: SITE.ogImage, width: 1200, height: 630 }] }
      : {}),
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    ...(SITE.ogImage ? { images: [SITE.ogImage] } : {}),
  },
};

/** Question-shaped article H2, Big Shoulders industrial caps on the dark band. */
function GuideHeading({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2
      id={id}
      className="mt-16 max-w-[28ch] font-display text-[clamp(1.6rem,1.2rem+1.5vw,2.375rem)] font-bold uppercase leading-[1.06] tracking-[0.015em] text-balance text-ink"
    >
      {children}
    </h2>
  );
}

/** Article body paragraph: readable measure, body tone. */
function P({ children }: { children: ReactNode }) {
  return (
    <p className="mt-5 text-[1.05rem] leading-[1.7] text-body sm:text-[1.125rem]">
      {children}
    </p>
  );
}

export default function DataEntryCostGuidePage() {
  return (
    <>
      <JsonLd
        data={graph(
          articleLd({
            headline: "The real cost of manual data entry",
            description: DESCRIPTION,
            url: PAGE_URL,
            datePublished: "2026-07-01",
            ...(SITE.ogImage
              ? { image: `${SITE.url}${SITE.ogImage}` }
              : {}),
          }),
          breadcrumbLd([
            { name: "Home", url: SITE.url },
            { name: "Guides", url: `${SITE.url}/guides` },
            { name: TITLE, url: PAGE_URL },
          ]),
        )}
      />
      <main className="flex-1 bg-base">
        <article>
          <div className="mx-auto w-full max-w-6xl px-6 pb-24 pt-20 sm:px-10 sm:pb-28 sm:pt-28">
            <div aria-hidden className="h-[3px] w-10 bg-amber" />
            <h1 className="mt-6 max-w-[20ch] font-display text-[clamp(2.4rem,1.6rem+3vw,4rem)] font-bold uppercase leading-[1.02] tracking-[0.015em] text-balance text-ink">
              The real cost of manual data entry
            </h1>

            <div className="max-w-[44rem] lg:max-w-[52rem] lg:text-[1.2rem]">
              {/* The extractable direct answer: first thing after the H1. */}
              <p className="mt-7 text-[1.1rem] leading-[1.7] text-body sm:text-[1.2rem]">
                {
                  "Manual data entry costs a small business three ways: the hours spent typing, the errors that slip in, and the rework those errors create. The math is simple: hours per month spent re-keying, times the true hourly cost of the person doing it, plus whatever the mistakes cost to catch and fix. In most offices the biggest and least visible chunk is double-keying, the same information typed by hand into two or more systems."
                }
              </p>

              <GuideHeading id="count-the-hours">
                How do I count the hours?
              </GuideHeading>
              <P>
                {
                  "Follow one piece of information through your office and count how many times a human types it. A customer's name and address might get typed into the phone log, the job record, the invoice, and the spreadsheet the owner actually trusts: four entries for one fact. Then have each office person track one honest week: every time they re-key something a system already knows, it's a tally mark. Most owners guess low, because the work happens in 3-minute bites that never look like a project. Thirty tally marks a day at 3 minutes each is an hour and a half of pure typing, per person, per day."
                }
              </P>
              <P>
                {
                  "The hourly rate to multiply by is not the wage on the pay stub. A widely used rule of thumb, published by the "
                }
                <a href={SBA_URL} className="inline-link">
                  U.S. Small Business Administration
                </a>
                {
                  ", puts an employee's true cost at roughly 1.25 to 1.4 times base salary once taxes and benefits are counted. Use that number, and the total stops looking like a rounding error."
                }
              </P>

              <GuideHeading id="error-cost">
                What do errors actually cost?
              </GuideHeading>
              <P>
                {"More than the typing, usually. "}
                <a href={PANKO_URL} className="inline-link">
                  Research on human error compiled by Raymond Panko
                </a>
                {
                  " at the University of Hawaii puts typical human error rates for simple manual tasks like data entry at around 1 percent per entry, and higher for more complex steps. One percent sounds small until you multiply it by every field on every job, every day. Each miss becomes a wrong invoice, a truck at the wrong address, or a callback nobody can explain, and each of those eats far more time than the original entry did. The typing costs minutes; the typos cost afternoons, and occasionally a customer."
                }
              </P>

              <GuideHeading id="double-keying">
                Where does double-keying hide?
              </GuideHeading>
              <P>
                {
                  "In the seams between tools, and in the workarounds nobody talks about. The classic hiding spots:"
                }
              </P>
              <ul className="mt-6 list-disc space-y-4 pl-5 text-[1.05rem] leading-[1.7] text-body marker:text-amber sm:text-[1.125rem]">
                <li>
                  <strong className="font-semibold text-ink">
                    The bridge person.
                  </strong>{" "}
                  {
                    'Someone whose actual job description includes "gets the information from system A into system B." That\'s a human API, and it\'s the most expensive integration on the market.'
                  }
                </li>
                <li>
                  <strong className="font-semibold text-ink">
                    The shadow spreadsheet.
                  </strong>{" "}
                  {
                    "The one the owner keeps because they don't trust the report in the real system. Every row in it was typed twice."
                  }
                </li>
                <li>
                  <strong className="font-semibold text-ink">
                    The paper relay.
                  </strong>{" "}
                  {
                    "Field notes on paper, typed into the computer later, sometimes by a different person who has to decode the handwriting."
                  }
                </li>
                <li>
                  <strong className="font-semibold text-ink">
                    The end-of-week catch-up.
                  </strong>{" "}
                  {
                    'If someone regularly stays late to "get caught up on entering things," the double-keying has already won.'
                  }
                </li>
              </ul>

              <GuideHeading id="worth-fixing">
                When is it worth fixing?
              </GuideHeading>
              <P>
                {
                  "When the task repeats on a schedule, follows the same rules every time, and moves information a system already has. That's the automation sweet spot, and it describes almost all double-keying. It's usually not worth fixing when the task needs judgment, happens rarely, or changes shape every time; automating those is how software projects go sideways. Do the math from this page first: hours times true hourly cost, plus error cleanup. If the number is bigger than the cost of fixing it, the busywork is quietly the most expensive line item in your office. Our "
                }
                <Link href="/services" className="inline-link">
                  automation services
                </Link>
                {" page shows what the fix looks like in practice."}
              </P>
            </div>
          </div>

          {/* Soft closing CTA: the guide's one link out to a money page. */}
          <div className="bg-deep">
            <div className="mx-auto w-full max-w-6xl px-6 py-[clamp(4rem,8vw,6rem)] sm:px-10">
              <div aria-hidden className="h-[3px] w-10 bg-amber" />
              <p className="mt-6 max-w-[42rem] text-[1.1rem] leading-[1.7] text-body sm:text-[1.2rem] lg:max-w-[50rem] lg:text-[1.25rem]">
                {"Not sure what your number is? "}
                <Link href="/contact" className="inline-link">
                  Book a 15-minute fit call
                </Link>
                {
                  " and we'll do the math on your worst task together, no pitch."
                }
              </p>
            </div>
          </div>
        </article>
      </main>
    </>
  );
}
