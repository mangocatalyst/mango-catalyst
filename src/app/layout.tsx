import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { CtaTracker } from "@/components/analytics/CtaTracker";
import "./globals.css";
import { bigShoulders, inter } from "./fonts";
import { SITE } from "@/lib/constants";
import { JsonLd } from "@/components/seo/JsonLd";
import { graph, organizationLd, websiteLd } from "@/lib/jsonld";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

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
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: "/apple-touch-icon.png",
  },
  // Per-page canonical: each page/segment sets its own
  // `alternates: { canonical: "<path>" }`. Not set here so sub-pages do not all
  // inherit the home canonical.
};

export const viewport: Viewport = {
  themeColor: "#0e1729",
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
      <body className="flex min-h-full flex-col bg-base">
        {/* Site-wide structured data: Organization + WebSite, server-rendered. */}
        <JsonLd data={graph(organizationLd(), websiteLd())} />
        <a href="#content" className="skip-link">
          Skip to content
        </a>
        <Navbar />
        <div id="content" tabIndex={-1} className="flex flex-1 flex-col">
          {children}
        </div>
        <Footer />
        <CtaTracker />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
