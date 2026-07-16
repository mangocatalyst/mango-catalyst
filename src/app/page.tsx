import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import { JsonLd } from "@/components/seo/JsonLd";
import { graph, localBusinessLd } from "@/lib/jsonld";
import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { ServiceGrid } from "@/components/sections/ServiceGrid";
import { DashboardTeaser } from "@/components/sections/DashboardTeaser";
import { AiTeaser } from "@/components/sections/AiTeaser";
import { CredibilityBar } from "@/components/sections/CredibilityBar";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Pricing } from "@/components/sections/Pricing";
import { FaqTeaser } from "@/components/sections/FaqTeaser";
import { CTABlock } from "@/components/sections/CTABlock";

/**
 * Home, the single-page scroll. Section order, ids, and copy come from
 * build/out/copy/home.md; metadata from seo-spec 2.1. Schema here is
 * LocalBusiness ONLY (no FAQPage: the teaser links to /faq, which is the
 * only page that emits it).
 */

const OG_TITLE = "The Other Tools of the Trade";
const OG_DESCRIPTION =
  "Automation that runs the office side of your shop. Built by someone who ran service operations inside a real shop, not a software salesman. Book a 15-minute fit call.";

export const metadata: Metadata = {
  // The layout title template only applies to CHILD segments; Home shares the
  // root segment, so it sets the full rendered string itself (seo-spec 2.1).
  title: { absolute: `Small Business Automation in the Upper Midwest | ${SITE.name}` },
  description:
    "Automation that takes invoicing, scheduling, and follow-up off your plate. Built by someone who ran service operations inside a real shop. Book a 15-minute fit call.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    url: "/",
    title: OG_TITLE,
    description: OG_DESCRIPTION,
    ...(SITE.ogImage
      ? { images: [{ url: SITE.ogImage, width: 1200, height: 630 }] }
      : {}),
  },
  twitter: {
    card: "summary_large_image",
    title: OG_TITLE,
    description: OG_DESCRIPTION,
    ...(SITE.ogImage ? { images: [SITE.ogImage] } : {}),
  },
};

export default function Home() {
  return (
    <>
      <JsonLd data={graph(localBusinessLd())} />
      <main>
        <Hero />
        <Problem />
        <ServiceGrid />
        <DashboardTeaser />
        <AiTeaser />
        <CredibilityBar />
        <HowItWorks />
        <Pricing />
        <FaqTeaser />
        <CTABlock />
      </main>
    </>
  );
}
