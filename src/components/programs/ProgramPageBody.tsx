import type { ReactNode } from "react";
import { SITE } from "@/lib/constants";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbLd, graph, serviceLd } from "@/lib/jsonld";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BookButton } from "@/components/booking/BookButton";

/**
 * Shared body for every /programs page (2026-07-06 footer-programs
 * expansion): answer-first hero that says what the program is and where the
 * hands-on experience comes from, an examples list of what we can build in
 * it, an optional differentiator band (Zapier's "how are you different"),
 * a light routing band, and the single bottom CTA. Schema mirrors
 * IndustryPageBody: Service + a two-item breadcrumb (no /programs index
 * exists; do not mint one). Capability rule holds: these are platforms I
 * work in, never systems I built. The one exception, MN-ITS Helper, keeps
 * its own page at /mn-its.
 */
export interface ProgramPageData {
  /** Schema Service name, e.g. "ServiceTitan Automation". */
  serviceName: string;
  h1: string;
  path: string;
  description: string;
  /** What the program is + the experience claim, answer-first. */
  intro: string;
  examplesTitle: string;
  examplesLead: string;
  /** Examples of what we can build in this program. */
  examples: string[];
  /** Paragraph after the examples list. */
  outro: string;
  /** Optional extra band, e.g. Zapier's differentiator Q&A. */
  differentiator?: { title: string; paragraphs: string[] };
  /** Light-band routing copy (JSX so pages can weave links in). */
  whereToStart: ReactNode;
}

export function ProgramPageBody({ data }: { data: ProgramPageData }) {
  return (
    <>
      <JsonLd
        data={graph(
          serviceLd({
            name: data.serviceName,
            description: data.description,
            url: `${SITE.url}${data.path}`,
            areaServed: "Upper Midwest, USA",
          }),
          breadcrumbLd([
            { name: "Home", url: SITE.url },
            { name: data.serviceName, url: `${SITE.url}${data.path}` },
          ]),
        )}
      />

      <main>
        <Section
          id="intro"
          tone="base"
          containerClassName="pb-[clamp(3.5rem,7vw,5.5rem)]"
        >
          <div aria-hidden className="h-[3px] w-10 bg-amber" />
          <h1 className="mt-6 max-w-[24ch] font-display text-[clamp(2.4rem,1.6rem+3vw,4rem)] font-bold uppercase leading-[1.02] tracking-[0.015em] text-balance text-ink">
            {data.h1}
          </h1>
          <p className="mt-6 max-w-[44rem] text-[1.05rem] leading-[1.65] text-body sm:text-[1.125rem]">
            {data.intro}
          </p>
        </Section>

        <Section id="examples" tone="deep">
          <SectionHeading title={data.examplesTitle} lead={data.examplesLead} />
          <ul className="mt-10 grid max-w-[52rem] gap-6">
            {data.examples.map((example) => (
              <li key={example.slice(0, 24)} className="flex gap-5">
                <span
                  aria-hidden
                  className="mt-[0.55em] size-[7px] flex-none rounded-full bg-amber"
                />
                <p className="leading-[1.65] text-body">{example}</p>
              </li>
            ))}
          </ul>
          <p className="mt-10 max-w-[44rem] text-[1.05rem] leading-[1.65] text-body sm:text-[1.125rem]">
            {data.outro}
          </p>
        </Section>

        {data.differentiator ? (
          <Section id="how-different">
            <SectionHeading title={data.differentiator.title} />
            <div className="mt-8 max-w-[44rem] space-y-6">
              {data.differentiator.paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 24)}
                  className="leading-[1.65] text-body"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </Section>
        ) : null}

        <Section id="where-to-start" tone="light">
          <SectionHeading tone="light" title="Not sure what to automate first?" />
          <p className="mt-8 max-w-[44rem] leading-[1.65] text-navy-2">
            {data.whereToStart}
          </p>
        </Section>

        <Section id="book" tone="deep">
          <div aria-hidden className="h-[3px] w-10 bg-amber" />
          <p className="mt-6 max-w-[26ch] font-display text-[clamp(1.9rem,1.2rem+2.4vw,3rem)] font-bold uppercase leading-[1.08] tracking-[0.015em] text-balance text-ink">
            {
              "One 15-minute call. Bring the task that's eating your week, and I'll tell you straight whether it can run itself."
            }
          </p>
          <div className="mt-9">
            <BookButton arrow>Book a 15-minute fit call</BookButton>
          </div>
        </Section>
      </main>
    </>
  );
}
