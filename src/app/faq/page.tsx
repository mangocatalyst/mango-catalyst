import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/constants";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbLd, faqPageLd, graph } from "@/lib/jsonld";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

/**
 * FAQ, copy verbatim from build/out/copy/faq.md; metadata from seo-spec 2.5.
 * This is the ONLY page on the site that emits FAQPage JSON-LD, and the
 * schema is built from the SAME array that renders the visible Q&A, so
 * schema/content parity is structural, not manual. Answer-first: the first
 * sentence of every answer is the direct answer.
 */

const DESCRIPTION =
  "Straight answers on business automation: what it costs, whether it replaces people, how your data is handled, and who it is not for. No sales runaround.";

export const metadata: Metadata = {
  // The layout template appends "| Mango Catalyst", landing the exact
  // seo-spec 2.5 title string.
  title: "Business Automation FAQ, Straight Answers",
  description: DESCRIPTION,
  alternates: { canonical: "/faq" },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    url: "/faq",
    title: `Business Automation FAQ, Straight Answers | ${SITE.name}`,
    description: DESCRIPTION,
    ...(SITE.ogImage
      ? { images: [{ url: SITE.ogImage, width: 1200, height: 630 }] }
      : {}),
  },
  twitter: {
    card: "summary_large_image",
    title: `Business Automation FAQ, Straight Answers | ${SITE.name}`,
    description: DESCRIPTION,
    ...(SITE.ogImage ? { images: [SITE.ogImage] } : {}),
  },
};

/**
 * The single source of truth for the Q&A. Answers are stored as parts
 * (plain strings plus inline cross-links per the internal-link plan);
 * the visible list renders the parts and the FAQPage schema joins their
 * text, so the two can never drift.
 */
type AnswerPart = string | { text: string; href: string };

const FAQ_ITEMS: { question: string; answer: AnswerPart[] }[] = [
  {
    question: "Is this going to replace my people?",
    answer: [
      "No. This replaces the busywork your people hate, the typing, the copy-paste, the chasing. It frees them up to do the work you actually hired them for, and it lets you grow without adding office staff just to keep up with paperwork. The goal is more done with the team you have, not fewer people.",
      "There's always a human in the loop. The automation handles the repetitive part and stops where judgment starts, so a person reviews and approves the work that matters. Done right, it lifts what your team gets done without burning them out. It never takes the people out of the equation.",
    ],
  },
  {
    question: "Is my data safe?",
    answer: [
      "Your data is yours: I never sell it, and I only wire it into the systems we agree to automate. Nothing gets connected without your say-so, and you'll know exactly which tools are talking to each other, because we'll have chosen them together. Privacy is a design habit for me: the one product I've built and shipped on my own, ",
      { text: "a browser extension that automates medical claim data entry", href: "/mn-its" },
      ", runs entirely on the user's own machine by design, so sensitive data never leaves the building. Where your data lives depends on the tools we connect (your CRM, your email, your forms), so you get the specifics for your exact setup on the fit call, not a blanket promise.",
    ],
  },
  {
    question: "Do you use AI?",
    answer: [
      "Yes. I use AI every day, and it's a big part of why one person can build and run this much. AI handles the grunt work of the building: the first drafts, the boilerplate, the tedious parts. The judgment stays human: every automation that touches your business is designed, reviewed, and tested by me before it runs. AI can also be part of what I build for you, drafting the reply to a routine email, summarizing the call notes, turning the numbers into plain English, always with a person approving anything that matters. And the same data rule applies here as everywhere else: nothing of yours gets fed into an AI tool without your say-so, and which tools see what is something we agree on when we scope the build.",
    ],
  },
  {
    question: "What happens if something breaks?",
    answer: [
      "You message me, I reply within 1 business day, and fixes land within 2 to 3 business days. Keeping what I've built working is what the monthly retainer is for: when a tool you use pushes an update and an integration breaks, fixing it is my job, not a ticket in somebody's queue. You're dealing with the one person who built your setup and knows it end to end, so there's no finger-pointing between vendors. What I won't do is promise a big-company service desk or a guaranteed-uptime contract; if your business needs that, I'll tell you straight that I'm not your fit.",
    ],
  },
  {
    question: "If I cancel, what happens to my data and my automations?",
    answer: [
      "Your data is always yours. It lives in the tools you already own (your CRM, your Google Workspace, your forms) and it stays there when you leave; nothing of yours is ever held hostage. The automations work differently: I build them, I own them, and they run while the retainer runs. Wherever it makes sense I run them on my own infrastructure rather than inside an off-the-shelf tool, because that lets me build things Zapier can't. The honest flip side is that when you cancel, the automations stop; you keep every piece of data they produced, and I keep the machinery. If we build inside tools you own instead, that's part of what we scope together. Ask me on the fit call and I'll walk you through exactly what leaving would look like for your setup.",
    ],
  },
  {
    question: "Who is this NOT for?",
    answer: [
      "Honest answer: if you've got fewer than a handful of repetitive tasks, or you already have someone in-house building your systems, you probably don't need me. If you want the cheapest possible option and don't care who's behind it, I'm not it. If you need enterprise-grade infrastructure with a 24-hour support desk, I'll point you elsewhere. I'm the right fit for an owner who's drowning in office busywork and wants one person who'll build it, run it, and pick up the phone.",
    ],
  },
  {
    question: "I already pay for software I barely use. How is this different?",
    answer: [
      "This isn't another tool to log into. I work with ",
      { text: "the tools you already pay for", href: "/services" },
      " and make them actually do the work, connected together, running on their own. You're not buying more software. You're getting the software you have to finally pull its weight.",
    ],
  },
  {
    question: "How long until the first automation is working?",
    answer: [
      "We start with one small task instead of a big rollout, and the honest answer is that timing depends on the task and the tools it touches, which is exactly why the first build is deliberately small: you see it working before we build the next piece. We set the timeline together when we scope it, so you're never guessing.",
    ],
  },
  {
    question: "What kind of businesses do you work with?",
    answer: [
      "Small businesses that are drowning in repetitive office work and don't have a systems person on the payroll, usually under 25 people. I started with ",
      { text: "trades and home services", href: "/industries/hvac-automation" },
      " because that's where I come from, but the same busywork problem shows up in property management, small manufacturing, and professional services. If your team is re-typing the same information into multiple screens, chasing follow-ups by memory, or doing invoices after hours, we should talk.",
    ],
  },
  {
    question: "Do I have to sign a long contract?",
    answer: [
      "No. The first three months are a commitment; after that it's month to month and you cancel anytime. The honest reason for the three months: the build work is front-loaded, so most of my hours land before your second invoice. The alternative would be charging the true build cost up front, roughly triple the setup fee, and I'd rather keep the front door cheap. After month three, if it's not earning its keep, you cancel. I'd rather keep you because it's working than trap you because you signed something.",
    ],
  },
];

/** Plain text of an answer, for the FAQPage schema. */
function answerText(parts: AnswerPart[]): string {
  return parts.map((p) => (typeof p === "string" ? p : p.text)).join("");
}

const INTRO =
  "Business automation questions, answered the way you'd want them answered on the phone: the answer first, the explanation second, and \"I don't know yet\" where that's the truth.";

export default function FaqPage() {
  return (
    <>
      <JsonLd
        data={graph(
          faqPageLd(
            FAQ_ITEMS.map((item) => ({
              question: item.question,
              answer: answerText(item.answer),
            })),
          ),
          breadcrumbLd([
            { name: "Home", url: `${SITE.url}/` },
            { name: "FAQ", url: `${SITE.url}/faq` },
          ]),
        )}
      />
      <main>
        {/* Page header: dark band, the hero's tick + industrial-caps motif. */}
        <Section
          tone="base"
          containerClassName="py-[clamp(3.5rem,7vw,5.5rem)]"
        >
          <div aria-hidden className="h-[3px] w-10 bg-amber" />
          <h1 className="mt-6 max-w-[24ch] font-display text-[clamp(2.4rem,1.6rem+3vw,4rem)] font-bold uppercase leading-[1.02] tracking-[0.015em] text-ink">
            Straight answers
          </h1>
          <p className="mt-5 max-w-[44rem] text-[1.05rem] leading-[1.65] text-body sm:text-[1.125rem] xl:max-w-[52rem] xl:text-[1.2rem]">
            {INTRO}
          </p>
        </Section>

        {/* The Q&A: light conversion band per palette B. Question-shaped h2s
            are the AEO surface; the schema above is built from this array. */}
        <Section id="questions" tone="light" className="border-t border-border-lt">
          <ol className="max-w-[52rem] divide-y divide-border-lt">
            {FAQ_ITEMS.map((item, i) => (
              <li
                key={item.question}
                className="grid gap-x-8 gap-y-3 py-10 first:pt-0 last:pb-0 sm:grid-cols-[3.25rem_1fr]"
              >
                <span
                  aria-hidden
                  className="pt-[0.2rem] font-display text-[1.3rem] font-bold leading-none text-muted-lt"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h2 className="text-[1.2rem] font-semibold leading-snug text-navy sm:text-[1.3rem]">
                    {item.question}
                  </h2>
                  <p className="mt-3 leading-[1.7] text-navy-2">
                    {item.answer.map((part, j) =>
                      typeof part === "string" ? (
                        part
                      ) : (
                        <Link
                          key={j}
                          href={part.href}
                          className="inline-link-light"
                        >
                          {part.text}
                        </Link>
                      ),
                    )}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Section>

        {/* Bottom CTA, copy verbatim from the copy doc. */}
        <Section tone="deep">
          <SectionHeading title={"Got a question that isn't here? Ask it on the call."} />
          <div className="mt-9">
            <Button href="/contact" arrow>
              Book a 15-Minute Fit Call
            </Button>
          </div>
        </Section>
      </main>
    </>
  );
}
