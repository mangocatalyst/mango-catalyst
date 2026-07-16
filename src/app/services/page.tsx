import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode, SVGProps } from "react";
import { SITE } from "@/lib/constants";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbLd, graph, serviceLd } from "@/lib/jsonld";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  CalendarIcon,
  ChartIcon,
  CopyIcon,
  FunnelIcon,
  InvoiceIcon,
} from "@/components/ui/icons";

/**
 * Services: the service-intent page, one level deeper per offering than Home.
 * Copy verbatim from build/out/copy/services.md; metadata + schema per
 * seo-spec 2.2. ONE Service node for the page (cards are <h2> content, never
 * separate Service entities) + a two-item breadcrumb. No geo term in title or
 * H1 (that is Home's keyword).
 */

const PAGE_TITLE = "Automation Services for Small Businesses";
const PAGE_DESCRIPTION =
  "Invoicing, lead follow-up, scheduling, reporting, and data entry that run on their own. I connect the tools you already pay for. Book a 15-minute fit call.";

export const metadata: Metadata = {
  // Layout template appends "| Mango Catalyst" (seo-spec 2.2 title, 57 chars).
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: "/services" },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    url: "/services",
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

/**
 * Tool-connection icon, composed locally: the shared icon set has no
 * link/connection glyph and shared files are out of scope for this page.
 * Same style contract as icons.tsx: 24px grid, 1.75 stroke, aria-hidden.
 */
function LinkIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      focusable={false}
      {...props}
    >
      <path d="M9 17H7A5 5 0 0 1 7 7h2" />
      <path d="M15 7h2a5 5 0 1 1 0 10h-2" />
      <path d="M8 12h8" />
    </svg>
  );
}

/** Card copy verbatim from build/out/copy/services.md (bodies as ReactNode: the data-entry card carries an inline guide link). */
const CARDS: { icon: ReactNode; title: string; body: ReactNode }[] = [
  {
    icon: <InvoiceIcon className="size-5" />,
    title: "Invoicing and billing, mostly off your desk",
    body: "Yes, the repeatable part of invoicing can run itself: jobs close, invoices go out, payments get tracked. The weekly catch-up on billing mostly disappears. The weird edge cases, change orders, partial jobs, still get a human; that's the point of a real person building it.",
  },
  {
    icon: <FunnelIcon className="size-5" />,
    title: "Lead capture and follow-up",
    body: "Every lead can land in one place automatically, whether it came from the trade show, the website, or the phone. It gets routed to the right person and followed up on without anyone remembering to chase it. Nothing sits in a notebook.",
  },
  {
    icon: <CalendarIcon className="size-5" />,
    title: "Scheduling and dispatch",
    body: "Booking can run against real availability instead of a guess. The right tech, the right job, the right route, and whoever answers the phone sees what's actually open.",
  },
  {
    icon: <ChartIcon className="size-5" />,
    title: "Reporting you don't have to build",
    body: "The daily numbers can put themselves together. What got done, what got sold, what got missed, delivered to you instead of you stitching it from five screens.",
  },
  {
    icon: <LinkIcon className="size-5" />,
    title: "Connecting the tools you already use",
    body: "If your tools have APIs, they can talk to each other. Your CRM, your email, your forms, your spreadsheets, wired together so information flows once instead of getting re-typed everywhere. Day to day I work in ServiceTitan, Zapier, and Google Workspace; if your tool has an API, I can probably wire it in.",
  },
  {
    icon: <CopyIcon className="size-5" />,
    title: "Data entry and cleanup",
    body: (
      <>
        {
          "The mind-numbing typing and copy-paste work can be handed off to a system that doesn't get tired or make typos at 4:45 on a Friday. If you want to see what that work is really costing you, read "
        }
        <Link href="/guides/manual-data-entry-cost" className="inline-link">
          what manual data entry costs
        </Link>
        {"."}
      </>
    ),
  },
];

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={graph(
          serviceLd({
            name: "Business Automation Services",
            description: PAGE_DESCRIPTION,
            url: `${SITE.url}/services`,
          }),
          breadcrumbLd([
            { name: "Home", url: `${SITE.url}/` },
            { name: "Services", url: `${SITE.url}/services` },
          ]),
        )}
      />

      <main>
        <Section id="services" className="flex-1">
          <div aria-hidden className="h-[3px] w-10 bg-amber" />
          <h1 className="mt-6 max-w-[24ch] font-display text-[clamp(2.4rem,1.6rem+3vw,4rem)] font-bold uppercase leading-[1.02] tracking-[0.015em] text-balance text-ink">
            Automation services for service shops
          </h1>

          {/* Answer-first intro: the direct answer to "what services?" */}
          <p className="mt-6 max-w-[44rem] text-[1.05rem] leading-[1.65] text-body sm:text-[1.125rem] lg:max-w-[52rem] lg:text-[1.2rem]">
            {
              "Mango Catalyst builds automation for the office work that repeats: invoicing and billing, lead capture and follow-up, scheduling and dispatch, reporting, tool connections, and data entry. You're not buying new software; I connect the tools you already pay for so the repetitive work runs on its own. Every engagement starts with one task and a 15-minute fit call."
            }
          </p>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CARDS.map((card) => (
              <Card key={card.title} className="p-7">
                <span className="flex size-10 items-center justify-center rounded-lg border border-hairline bg-surface-hi text-muted">
                  {card.icon}
                </span>
                {/* h2, not h3: the page has no other h2, so h3 here would
                    skip a heading level after the H1 (seo-spec 9.5, axe
                    heading-order). The card-scale visual style lives in the
                    classes, not the tag. */}
                <h2 className="mt-5 text-[1.15rem] font-semibold text-ink">
                  {card.title}
                </h2>
                <p className="mt-3 leading-relaxed text-body">{card.body}</p>
              </Card>
            ))}
          </div>

          <p className="mt-10 max-w-[44rem] border-l-2 border-amber pl-5 leading-[1.65] text-body lg:max-w-[52rem] lg:text-[1.2rem]">
            {
              "If the task draining your office hours isn't on this list, ask anyway. The whole job is figuring out what can run itself. And where it helps, "
            }
            <Link href="/ai" className="inline-link">
              AI can be part of the build
            </Link>
            {", always with a person approving anything that matters."}
          </p>
        </Section>

        {/* The one bottom CTA: palette-B light conversion band. */}
        <Section id="book" tone="light">
          <div aria-hidden className="h-[3px] w-10 bg-amber" />
          <p className="mt-6 max-w-[38rem] text-[1.35rem] font-semibold leading-[1.4] text-balance text-navy sm:text-[1.5rem]">
            {
              "Fifteen minutes, no pitch. We look at one task and I tell you straight whether it can run itself."
            }
          </p>
          <div className="mt-8">
            <Button href="/contact" arrow>
              Book a 15-Minute Fit Call
            </Button>
          </div>
        </Section>
      </main>
    </>
  );
}
