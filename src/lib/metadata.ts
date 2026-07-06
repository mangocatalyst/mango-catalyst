import type { Metadata } from "next";
import { SITE } from "@/lib/constants";

/**
 * Standard page metadata block (the pattern every page inlines, extracted
 * for the /industries set): canonical + OG + twitter. The layout template
 * appends "| Mango Catalyst" to the bare title.
 */
export function pageMetadata(opts: {
  title: string;
  path: string;
  description: string;
}): Metadata {
  // Per-page branded card rendered by src/app/og/route.tsx (metadataBase
  // makes the relative URL absolute). Home/layout keep the static og.png.
  const ogImage = {
    url: `/og?title=${encodeURIComponent(opts.title)}`,
    width: 1200,
    height: 630,
    alt: opts.title,
  };
  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical: opts.path },
    openGraph: {
      type: "website",
      siteName: SITE.name,
      url: opts.path,
      title: opts.title,
      description: opts.description,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description: opts.description,
      images: [ogImage.url],
    },
  };
}
