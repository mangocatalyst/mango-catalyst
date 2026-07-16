import Link from "next/link";
import type { ReactNode } from "react";
import { SITE } from "@/lib/constants";
import { pageMetadata } from "@/lib/metadata";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbLd, graph, serviceLd } from "@/lib/jsonld";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BookButton } from "@/components/booking/BookButton";

/**
 * AI page (/ai): the anti-hype "AI where it earns its keep" pitch, mirroring
 * the dashboards/page.tsx structure (pageMetadata + one JSON-LD graph +
 * Section bands). Honesty gate: the one shipped AI capability cited is the
 * Owner Dashboard's nightly Slack triage (demoable). MN-ITS is referenced
 * ONLY as proof of the local-only data discipline; it is explicitly not an AI
 * tool. No dollar figures, no employer implication, no invented client work.
 */

const PATH = "/ai";
const DESCRIPTION =
  "Where AI fits in the automation I build for service shops, and where it doesn't. A shipped example you can click through, the anti-hype version of what it will and won't do, and one rule: a person approves anything that matters.";

export const metadata = pageMetadata({
  title: "AI for Service Shops, Where It Earns Its Keep",
  path: PATH,
  description: DESCRIPTION,
});

const WORKS: ReactNode[] = [
  <>
    The Owner Dashboard runs a nightly AI pass over the crew&apos;s Slack and
    surfaces the handful of messages an owner should actually see, red flags
    and wins both. It&apos;s live, and there&apos;s a fake-data version you can
    click through on the{" "}
    <Link href="/dashboards" className="inline-link">
      Owner Dashboard page
    </Link>
    .
  </>,
  <>
    AI handles the grunt work of building the automation, the first drafts, the
    boilerplate, the tedious parts, and the judgment stays human: every
    automation that touches your business is designed, reviewed, and tested by
    a person before it runs.
  </>,
  <>
    Sensitive data stays where it belongs. The one product I&apos;ve built and
    shipped on my own, a{" "}
    <Link href="/mn-its" className="inline-link">
      browser extension for MN-ITS billing
    </Link>
    , runs entirely on the user&apos;s own machine so claim data never leaves
    the building. It isn&apos;t an AI tool; it&apos;s proof I&apos;ll hold your
    data to that same line when AI is in the mix.
  </>,
];

const NOT: string[] = [
  "No chatbot bolted onto your website that annoys customers and answers their questions wrong.",
  "No strategy deck about AI transformation. I build working automation, not slideware.",
  "Nothing autonomous touching your customers or your money without a person approving it first. AI drafts; a human sends.",
  "Nothing of yours fed into an AI tool without your say-so. Which tools see what is something we agree on when we scope the build, the same data rule as everywhere else.",
];

export default function AiPage() {
  return (
    <>
      <JsonLd
        data={graph(
          serviceLd({
            name: "AI Automation",
            description: DESCRIPTION,
            url: `${SITE.url}${PATH}`,
          }),
          breadcrumbLd([
            { name: "Home", url: SITE.url },
            { name: "AI", url: `${SITE.url}${PATH}` },
          ]),
        )}
      />

      <main>
        <Section id="intro" tone="base">
          <div aria-hidden className="h-[3px] w-10 bg-amber" />
          <h1 className="mt-6 max-w-[24ch] font-display text-[clamp(2.4rem,1.6rem+3vw,4rem)] font-bold uppercase leading-[1.02] tracking-[0.015em] text-balance text-ink">
            AI where it earns its keep
          </h1>
          <p className="mt-6 max-w-[44rem] text-[1.05rem] leading-[1.65] text-body sm:text-[1.125rem] lg:max-w-[52rem] lg:text-[1.2rem]">
            {
              "AI belongs in the narrow places where it saves real time and a person still approves the result. That's the whole position. I use it every day to build faster, and I'll wire it into your operation only where it earns its keep: the routine email reply drafted for a person to send, the call notes summarized, a pile of numbers turned into a plain-English read. It isn't a product I'm selling you. It's one more way to take office busywork off your plate, held to the same rule as everything else I build."
            }
          </p>
        </Section>

        <Section id="where-it-works" tone="deep">
          <SectionHeading
            title="Where it already works"
            lead="The honest version: one shipped, demoable place AI already does real work, plus the discipline that governs the rest."
          />
          <ul className="mt-10 grid max-w-[52rem] gap-6">
            {WORKS.map((node, i) => (
              <li key={i} className="flex gap-5">
                <span
                  aria-hidden
                  className="mt-[0.55em] size-[7px] flex-none rounded-full bg-amber"
                />
                <p className="leading-[1.65] text-body">{node}</p>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="what-it-is-not" tone="base">
          <SectionHeading
            title="What you won't get"
            lead="Just as important as where AI fits is where it doesn't. So, plainly:"
          />
          <ul className="mt-10 grid max-w-[52rem] gap-6">
            {NOT.map((point) => (
              <li key={point.slice(0, 24)} className="flex gap-5">
                <span
                  aria-hidden
                  className="mt-[0.55em] size-[7px] flex-none rounded-full bg-amber"
                />
                <p className="leading-[1.65] text-body">{point}</p>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="who" tone="light">
          <SectionHeading tone="light" title="Is this an AI project?" />
          <p className="mt-8 max-w-[44rem] leading-[1.65] text-navy-2 lg:max-w-[52rem] lg:text-[1.2rem]">
            {
              "Probably not, and that's the point. AI is one tool in the box, not the thing you're buying. Most shops don't need an AI project; they need the office busywork gone, and AI is simply part of how that happens where it helps. If you want the full list of what I build, here's "
            }
            <Link href="/services" className="inline-link-light">
              the services page
            </Link>
            {
              ". If you want to know exactly how your data is handled and where AI does and doesn't touch it, "
            }
            <Link href="/faq" className="inline-link-light">
              the FAQ
            </Link>
            {" answers it straight."}
          </p>
        </Section>

        <Section id="book" tone="deep">
          <div aria-hidden className="h-[3px] w-10 bg-amber" />
          <p className="mt-6 max-w-[26ch] font-display text-[clamp(1.9rem,1.2rem+2.4vw,3rem)] font-bold uppercase leading-[1.08] tracking-[0.015em] text-balance text-ink">
            {
              "One 15-minute call. Tell me the task that's eating your week, and I'll tell you straight whether AI belongs anywhere near it."
            }
          </p>
          <div className="mt-9">
            <BookButton arrow>Book a 15-Minute Fit Call</BookButton>
          </div>
        </Section>
      </main>
    </>
  );
}
