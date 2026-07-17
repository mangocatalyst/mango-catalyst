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
 * AI Consultant page (/ai-consultant, permanent-redirected from the old /ai):
 * the paid two-session consulting offer for shops that want to talk it
 * through before committing to a build. Keeps the anti-hype DNA of the
 * original positioning page. Honesty gate unchanged: the one shipped AI
 * capability cited is the Owner Dashboard's nightly Slack triage (demoable).
 * Pricing rules: state the price flat, never justify it with cost anchors;
 * sessions are never self-serve bookable, the fit call gates the invoice.
 */

const PATH = "/ai-consultant";
const DESCRIPTION =
  "Two one-hour AI consulting sessions for service shops that want to get their feet wet before committing to a build. $500 flat, credited toward setup if you start a build within 60 days. No retainer, no commitment, no pressure to go monthly.";

export const metadata = pageMetadata({
  title: "AI Consultant for Service Shops, Two Sessions, No Strings",
  path: PATH,
  description: DESCRIPTION,
});

const OFFER: ReactNode[] = [
  <>
    Two one-hour working sessions, scheduled around your week. Bring the real
    stuff: the task eating your office hours, the tool you&apos;re not sure
    about, the half-formed idea you&apos;ve been sitting on. We work through
    where AI and automation would actually save time in your shop, and where
    they&apos;d just be expensive noise.
  </>,
  <>
    A short written plan after the second session: what&apos;s worth
    automating, what isn&apos;t, and what to do first. It&apos;s written so you
    can run it with me or without me.
  </>,
  <>
    $500 flat. If you start a build within 60 days, the full $500 comes off
    your setup, because the sessions were the start of the work.
  </>,
  <>
    No retainer, no subscription, no follow-up obligation. If two hours and a
    plan is all you needed, we&apos;re square.
  </>,
];

const STEPS: { title: string; body: ReactNode }[] = [
  {
    title: "Book the free 15-minute fit call",
    body: "Same first step as everything else I do. You tell me what's going on in the shop, I tell you straight whether two sessions would be worth your money. If they wouldn't, I'll say so on the call.",
  },
  {
    title: "I send the bill, we pick the dates",
    body: "If it's a fit, I send an invoice and we put both sessions on the calendar. There's no checkout button and no way to book two hours with me cold. We talk first; that's deliberate.",
  },
  {
    title: "We work, you leave with the plan",
    body: "Two sessions, then the written plan lands in your inbox. What you do with it is up to you.",
  },
];

export default function AiConsultantPage() {
  return (
    <>
      <JsonLd
        data={graph(
          {
            ...serviceLd({
              name: "AI Consulting",
              description: DESCRIPTION,
              url: `${SITE.url}${PATH}`,
            }),
            offers: {
              "@type": "Offer",
              price: "500",
              priceCurrency: "USD",
              description:
                "Two one-hour AI consulting sessions plus a written action plan. Credited toward automation setup if a build starts within 60 days.",
            },
          },
          breadcrumbLd([
            { name: "Home", url: SITE.url },
            { name: "AI Consultant", url: `${SITE.url}${PATH}` },
          ]),
        )}
      />

      <main>
        <Section id="intro" tone="base">
          <div aria-hidden className="h-[3px] w-10 bg-amber" />
          <h1 className="mt-6 max-w-[24ch] font-display text-[clamp(2.4rem,1.6rem+3vw,4rem)] font-bold uppercase leading-[1.02] tracking-[0.015em] text-balance text-ink">
            Not ready to build? Rent my brain for two hours.
          </h1>
          <p className="mt-6 max-w-[44rem] text-[1.05rem] leading-[1.65] text-body sm:text-[1.125rem] lg:max-w-[52rem] lg:text-[1.2rem]">
            {
              "Plenty of shops aren't ready to hand off a build, and most aren't sure what AI should even do for them yet. Fair. This is the option for that: two one-hour sessions where we dig into your operation and figure out where AI and automation actually fit, $500 flat, no retainer, no commitment. You get straight answers and a written plan, and if that's all you ever buy from me, that's a complete transaction."
            }
          </p>
        </Section>

        <Section id="the-offer" tone="deep">
          <SectionHeading
            title="What you get"
            lead="The whole offer, no fine print."
          />
          <ul className="mt-10 grid max-w-[52rem] gap-6">
            {OFFER.map((node, i) => (
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

        <Section id="how-it-works" tone="base">
          <SectionHeading
            title="How it works"
            lead="Three steps, and the first one is free."
          />
          <ol className="mt-10 grid max-w-[52rem] gap-8">
            {STEPS.map((step, i) => (
              <li key={step.title} className="flex gap-5">
                <span
                  aria-hidden
                  className="flex-none font-display text-[1.6rem] font-bold leading-none text-amber"
                >
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-[1.1rem] font-semibold text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-2 leading-[1.65] text-body">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-10 max-w-[44rem] border-l-2 border-amber pl-5 leading-[1.65] text-body lg:max-w-[52rem]">
            {
              "If you want proof I ship this stuff instead of just talking about it: the Owner Dashboard runs a nightly AI pass over a crew's Slack and surfaces what the owner should actually see. It's live, and there's a fake-data version you can click through on the "
            }
            <Link href="/dashboards" className="inline-link">
              Owner Dashboard page
            </Link>
            .
          </p>
        </Section>

        <Section id="no-strings" tone="light">
          <SectionHeading tone="light" title="Two sessions can just be two sessions" />
          <p className="mt-8 max-w-[44rem] leading-[1.65] text-navy-2 lg:max-w-[52rem] lg:text-[1.2rem]">
            {
              "Some shops use this to get one thing off the ground and then run it themselves. That's a fine outcome, and you won't get an upsell script pretending otherwise. If you decide you want the office busywork handled for good, "
            }
            <Link href="/services" className="inline-link-light">
              the monthly service
            </Link>
            {
              " exists and the $500 counts toward it. Either way, you won't get a chatbot pitch, a strategy deck, or anything of yours fed into an AI tool without your say-so. Working answers about your actual operation, nothing else."
            }
          </p>
        </Section>

        <Section id="book" tone="deep">
          <div aria-hidden className="h-[3px] w-10 bg-amber" />
          <p className="mt-6 max-w-[26ch] font-display text-[clamp(1.9rem,1.2rem+2.4vw,3rem)] font-bold uppercase leading-[1.08] tracking-[0.015em] text-balance text-ink">
            {
              "Start with the free 15 minutes. If two paid hours would help, I'll say so. If they wouldn't, I'll say that too."
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
