import type { ReactNode } from "react";
import { SITE } from "@/lib/constants";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbLd, graph, serviceLd } from "@/lib/jsonld";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BookButton } from "@/components/booking/BookButton";
import { IndustryHero } from "@/components/industries/IndustryHero";

/**
 * Shared body for every /industries page (structure identical to the
 * original HVAC page, seo-spec 2.3): answer-first hero with trade art,
 * trade-specific pains, outcomes, the capability line, a light routing
 * band, and the single bottom CTA. Schema is Service + a TWO-item
 * breadcrumb (no /industries index exists; do not mint one).
 */
export interface IndustryPageData {
  /** H1 + schema Service name, e.g. "Plumbing Business Automation". */
  serviceName: string;
  h1: string;
  path: string;
  description: string;
  intro: string;
  painsTitle: string;
  painsLead: string;
  pains: { lead: string; text: string }[];
  outcomesTitle: string;
  outcomesLead: string;
  outcomes: string[];
  /** Paragraph after the outcomes list. */
  outro: string;
  /** Light-band routing copy (JSX so pages can weave links in). */
  whereToStart: ReactNode;
  art: ReactNode;
}

export function IndustryPageBody({ data }: { data: IndustryPageData }) {
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
        <IndustryHero title={data.h1} intro={data.intro} art={data.art} />

        <Section id="busywork" tone="deep">
          <SectionHeading title={data.painsTitle} lead={data.painsLead} />
          <ul className="mt-10 grid max-w-[52rem] gap-7">
            {data.pains.map((pain) => (
              <li key={pain.lead} className="flex gap-5">
                <span
                  aria-hidden
                  className="mt-[0.7em] h-[3px] w-6 flex-none bg-amber"
                />
                <p className="leading-[1.65] text-muted">
                  <strong className="font-semibold text-ink">
                    {pain.lead}
                  </strong>{" "}
                  {pain.text}
                </p>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="outcomes">
          <SectionHeading title={data.outcomesTitle} lead={data.outcomesLead} />
          <ul className="mt-10 grid max-w-[52rem] gap-6">
            {data.outcomes.map((outcome) => (
              <li key={outcome.slice(0, 24)} className="flex gap-5">
                <span
                  aria-hidden
                  className="mt-[0.55em] size-[7px] flex-none rounded-full bg-amber"
                />
                <p className="leading-[1.65] text-body">{outcome}</p>
              </li>
            ))}
          </ul>
          <p className="mt-10 max-w-[44rem] text-[1.05rem] leading-[1.65] text-body sm:text-[1.125rem] lg:max-w-[52rem] lg:text-[1.2rem]">
            {data.outro}
          </p>
        </Section>

        {/* Capability line: platforms I work in, never systems I built (00 rule). */}
        <Section id="tools" tone="deep">
          <SectionHeading title="Built in the tools your shop already runs" />
          <p className="mt-8 max-w-[44rem] leading-[1.65] text-body lg:max-w-[52rem] lg:text-[1.2rem]">
            {
              "I work in ServiceTitan, Zapier, and Google Workspace every day. Those are platforms I work in, and if your stack is different, most tools with an API can be wired in. We figure out what connects to what on the fit call, before you spend a dollar."
            }
          </p>
        </Section>

        <Section id="where-to-start" tone="light">
          <SectionHeading tone="light" title="Not sure what to automate first?" />
          <p className="mt-8 max-w-[44rem] leading-[1.65] text-navy-2 lg:max-w-[52rem] lg:text-[1.2rem]">
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
            <BookButton arrow>Book a 15-Minute Fit Call</BookButton>
          </div>
        </Section>
      </main>
    </>
  );
}
