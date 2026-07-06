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
      ...(SITE.ogImage
        ? { images: [{ url: SITE.ogImage, width: 1200, height: 630 }] }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description: opts.description,
      ...(SITE.ogImage ? { images: [SITE.ogImage] } : {}),
    },
  };
}
