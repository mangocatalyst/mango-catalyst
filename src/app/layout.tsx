import type { Metadata } from "next";
import "./globals.css";
import { bigShoulders, inter } from "./fonts";
import { SITE } from "@/lib/constants";
import { JsonLd } from "@/components/seo/JsonLd";
import { graph, organizationLd, websiteLd } from "@/lib/jsonld";

const TITLE = `${SITE.name} | Business Automation for Upper Midwest Shops`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: TITLE,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  openGraph: {
    type: "website",
    siteName: SITE.name,
    url: SITE.url,
    title: TITLE,
    description: SITE.description,
    ...(SITE.ogImage
      ? { images: [{ url: SITE.ogImage, width: 1200, height: 630 }] }
      : {}),
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: SITE.description,
    ...(SITE.ogImage ? { images: [SITE.ogImage] } : {}),
  },
  robots: { index: true, follow: true },
  // Per-page canonical: each page/segment sets its own
  // `alternates: { canonical: "<path>" }`. Not set here so sub-pages do not all
  // inherit the home canonical.
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${bigShoulders.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Site-wide structured data: Organization + WebSite, server-rendered. */}
        <JsonLd data={graph(organizationLd(), websiteLd())} />
        {children}
      </body>
    </html>
  );
}
