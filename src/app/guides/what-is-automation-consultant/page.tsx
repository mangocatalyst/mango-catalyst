import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { SITE } from "@/lib/constants";
import { JsonLd } from "@/components/seo/JsonLd";
import { articleLd, breadcrumbLd, graph } from "@/lib/jsonld";
import { Card } from "@/components/ui/Card";

/**
 * Evergreen guide: what is an automation consultant. Copy comes VERBATIM from
 * build/out/copy/guide-what-is-automation-consultant.md; metadata + schema
 * from seo-spec 2.8. Undated on the visible page (dates live in the Article
 * schema, truthful). Question-shaped h2s; one soft CTA at the close.
 */

const PAGE_PATH = "/guides/what-is-automation-consultant";
const PAGE_URL = `${SITE.url}${PAGE_PATH}`;
const PAGE_TITLE = "What Is an Automation Consultant?";
const PAGE_DESCRIPTION =
  "What an automation consultant actually does, what one costs, and how to tell if your business needs one. A plain-English guide for small shop owners.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_PATH },
  openGraph: {
    type: "article",
    siteName: SITE.name,
    url: PAGE_PATH,
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    ...(SITE.ogImage
      ? { images: [{ url: SITE.ogImage, width: 1200, height: 630 }] }
      : {}),
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    ...(SITE.ogImage ? { images: [SITE.ogImage] } : {}),
  },
};

/** The extractable direct answer (copy verbatim). */
const DIRECT_ANSWER =
  "An automation consultant is someone you hire to find the repetitive work in your business and make it run without a person doing it, usually by connecting the software you already own rather than selling you new software. The good ones start with your workflow and work backward to the tools; the bad ones start with a product and work backward to a pitch.";

/** The five hiring questions (copy verbatim): bold question, plain follow-on. */
const HIRING_QUESTIONS: { question: string; detail: string }[] = [
  {
    question: "Which tools do you work in every day?",
    detail: 'You want named platforms, not "we do everything."',
  },
  {
    question: "What happens when an automation breaks?",
    detail:
      'Get response times in writing. "It won\'t break" is the wrong answer; everything breaks eventually.',
  },
  {
    question: "Who owns the accounts and where does my data live?",
    detail:
      "The automations should live in accounts you own wherever possible, and the answer should be specific to your setup.",
  },
  {
    question: "Walk me through something you built.",
    detail:
      "Not a slide, a walkthrough: what the work looked like before, what runs itself now, what stayed human.",
  },
  {
    question: "What would you NOT automate in my business?",
    detail:
      'Anyone who says "everything can be automated" is selling. The honest ones name what stays human.',
  },
];

/**
 * Question-shaped sections (copy verbatim). Bodies carry their own <p>/<ol>
 * wrappers so the hiring-questions list nests validly inside the section.
 */
const SECTIONS: { heading: string; body: ReactNode }[] = [
  {
    heading: "What does an automation consultant actually do day to day?",
    body: (
      <p className="mt-4 leading-[1.7] text-body">
        Three things, in a loop. First, discovery: watching how the work
        actually happens, which is usually different from how everyone says it
        happens, and finding the tasks that repeat, follow rules, and eat
        hours. Second, the plan: writing down, in plain English, what will
        change, which tools will talk to each other, and what stays human, so
        you can veto it before anything gets built. Third, the build: wiring
        the tools together, testing against real work, and then keeping it
        alive, because software updates break integrations and somebody has to
        answer for that. The keeping-it-alive part is the part owners forget
        to ask about, and it&apos;s the part that separates a consultant from
        a freelancer who disappears after delivery.
      </p>
    ),
  },
  {
    heading: "What does an automation consultant cost?",
    body: (
      <p className="mt-4 leading-[1.7] text-body">
        It varies more than almost any service you&apos;ll buy, because the
        label covers everyone from a solo operator to a national agency,
        billing hourly, by the project, or on retainer. Hourly billing is
        common and unpredictable; project pricing is predictable but creates
        an incentive to ship and leave; retainers cost more per month but
        include the maintenance that keeps automations from quietly dying. For
        one honest, public data point: Mango Catalyst charges $795 one-time
        for the first working automation, then $1,000 a month, month to month,
        which covers keeping everything running, a queue of small tweaks, and
        scoping for bigger builds. Whatever the model, get the number and what
        it includes in writing before anyone builds anything.
      </p>
    ),
  },
  {
    heading: "Do I need a consultant, an employee, or just software?",
    body: (
      <p className="mt-4 leading-[1.7] text-body">
        Match the fix to the size of the problem. If you have one annoying
        task and some patience, the software you already own can probably do
        it: most modern tools have built-in automations that go unused. If you
        have constant systems work, enough to fill a desk every week, hire the
        employee. The consultant fits the gap in the middle, which is where
        most small businesses under 25 people live: too much repetitive work
        to ignore, not enough to justify a full-time systems hire. You get the
        systems person without the salary, and the work gets built by someone
        who does it every day instead of squeezed into the office
        manager&apos;s Friday afternoons.
      </p>
    ),
  },
  {
    heading: "What should I ask before hiring one?",
    body: (
      <>
        <p className="mt-4 leading-[1.7] text-body">
          Five questions sort the operators from the salesmen:
        </p>
        <ol className="mt-5 space-y-4">
          {HIRING_QUESTIONS.map((item, i) => (
            <li key={item.question} className="flex gap-4">
              <span
                aria-hidden
                className="mt-[2px] font-display text-[1.05rem] font-bold text-amber"
              >
                {i + 1}
              </span>
              <p className="leading-[1.7] text-body">
                <strong className="font-semibold text-ink">
                  {item.question}
                </strong>{" "}
                {item.detail}
              </p>
            </li>
          ))}
        </ol>
        <p className="mt-5 leading-[1.7] text-body">
          If you want to see how one consultant answers these,{" "}
          <Link href="/about" className="inline-link">
            the person behind Mango Catalyst
          </Link>{" "}
          keeps his answers public.
        </p>
      </>
    ),
  },
];

export default function WhatIsConsultantGuidePage() {
  return (
    <>
      <JsonLd
        data={graph(
          articleLd({
            headline: PAGE_TITLE,
            description: PAGE_DESCRIPTION,
            url: PAGE_URL,
            datePublished: "2026-07-01",
            dateModified: "2026-07-01",
          }),
          breadcrumbLd([
            { name: "Home", url: `${SITE.url}/` },
            { name: "Guides", url: `${SITE.url}/guides` },
            { name: PAGE_TITLE, url: PAGE_URL },
          ]),
        )}
      />
      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-20 sm:px-10 sm:py-28">
        {/* Visible breadcrumb trail (matches the BreadcrumbList schema). */}
        <nav aria-label="Breadcrumb" className="text-sm text-muted">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link
                href="/"
                className="underline decoration-hairline underline-offset-4 transition-colors hover:text-ink"
              >
                Home
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link
                href="/guides"
                className="underline decoration-hairline underline-offset-4 transition-colors hover:text-ink"
              >
                Guides
              </Link>
            </li>
          </ol>
        </nav>

        <article className="mt-10">
          <header>
            <div aria-hidden className="h-[3px] w-10 bg-amber" />
            <h1 className="mt-6 max-w-[24ch] font-display text-[clamp(2.4rem,1.6rem+3vw,4rem)] font-bold uppercase leading-[1.02] tracking-[0.015em] text-balance text-ink">
              What is an automation consultant?
            </h1>
            {/* The extractable direct answer, set as the lead. */}
            <p className="mt-6 max-w-[44rem] text-[1.05rem] leading-[1.7] text-body sm:text-[1.125rem]">
              {DIRECT_ANSWER}
            </p>
          </header>

          <div className="mt-4 max-w-[44rem]">
            {SECTIONS.map((section) => (
              <section key={section.heading} className="mt-12">
                <h2 className="max-w-[30ch] font-display text-[clamp(1.45rem,1.15rem+1.1vw,2rem)] font-bold uppercase leading-[1.08] tracking-[0.015em] text-balance text-ink">
                  {section.heading}
                </h2>
                {section.body}
              </section>
            ))}
          </div>

          {/* One soft closing CTA (copy verbatim, single paragraph, inline link). */}
          <Card className="mt-16 max-w-[44rem] p-8 sm:p-10">
            <p className="text-[1.05rem] leading-[1.7] text-ink sm:text-[1.125rem]">
              {"The fastest way to find out if you need one: "}
              <Link href="/contact" className="inline-link">
                book a 15-minute fit call
              </Link>
              {". If you don't, I'll say so on the call."}
            </p>
          </Card>
        </article>
      </main>
    </>
  );
}
