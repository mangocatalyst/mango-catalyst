import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { SITE } from "@/lib/constants";

/**
 * Dynamic Open Graph card: /og?title=<page title>. Every page gets a branded
 * 1200x630 card via pageMetadata() instead of the one static og.png. Brand
 * tokens from BRAND.md (base navy, amber accent, Big Shoulders display face).
 * Satori cannot read the variable woff2 the site ships, so a static bold
 * instance sits next to this file (OFL, license in src/app/fonts/).
 */

const fontData = readFile(new URL("./BigShoulders-Bold.ttf", import.meta.url));

// public/logo-mark.svg inlined; its own navy tile disappears into the card bg.
const MARK =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect width="512" height="512" rx="112" fill="#0E1729"/><g fill="none"><circle cx="191.9" cy="322.43" r="74" fill="#F6A328"/><path d="M294.95 250.27L373.75 195.09M231.92 199.26L252.5 135.92" stroke="#F6A328" stroke-width="40.7" stroke-linecap="round"/></g></svg>`,
  );

export async function GET(req: Request) {
  const title =
    new URL(req.url).searchParams.get("title")?.trim().slice(0, 90) ||
    SITE.name;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px 56px",
          backgroundColor: "#0E1729",
          backgroundImage:
            "linear-gradient(135deg, #0E1729 0%, #0A1120 100%)",
          fontFamily: "Big Shoulders",
          color: "#F4F6FB",
        }}
      >
        {/* Section-heading motif: the amber tick, scaled up */}
        <div
          style={{
            width: 120,
            height: 10,
            backgroundColor: "#F6A328",
            display: "flex",
          }}
        />
        <div
          style={{
            display: "flex",
            fontSize: title.length > 45 ? 76 : 96,
            fontWeight: 700,
            lineHeight: 1.05,
            textTransform: "uppercase",
            letterSpacing: "0.01em",
            maxWidth: 1040,
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={MARK} width={64} height={64} alt="" />
            <div
              style={{
                display: "flex",
                fontSize: 36,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              {SITE.name}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 28,
              color: "#F6A328",
              letterSpacing: "0.08em",
            }}
          >
            www.mangocatalyst.com
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Big Shoulders",
          data: await fontData,
          weight: 700,
          style: "normal",
        },
      ],
      headers: {
        "Cache-Control": "public, s-maxage=604800, stale-while-revalidate=86400",
      },
    },
  );
}
