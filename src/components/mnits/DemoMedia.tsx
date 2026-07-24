import fs from "node:fs";
import path from "node:path";
import { ShotZoom } from "./ShotZoom";

/**
 * Media blocks for the /mn-its tutorial. Server-only: each block checks
 * whether its asset exists in public/ at build time (same fs pattern as
 * sitemap.ts) and renders a labelled placeholder frame until Bryan drops
 * the real capture in. Assets live under public/mn-its/:
 *   demo.mp4, demo-poster.png            (video + first frame, 16:9)
 *   preset-form.png, popup-client.png,
 *   popup-calendar.png, line-fill.png,
 *   review-stop.png                      (screenshots, exported 16:10)
 * All captures are made with the extension's demo mask ON.
 */

function hasAsset(rel: string): boolean {
  try {
    return fs.statSync(path.join(process.cwd(), "public", rel)).size > 0;
  } catch {
    return false;
  }
}

function PlaceholderFrame({
  label,
  aspect,
}: {
  label: string;
  aspect: string;
}) {
  return (
    <div
      className={`flex ${aspect} w-full items-center justify-center rounded-lg border-2 border-dashed border-navy-2/30 bg-white/60`}
    >
      <p className="px-6 text-center text-[0.95rem] text-navy-2/70">{label}</p>
    </div>
  );
}

export function DemoVideo({
  src,
  poster,
  caption,
}: {
  src: string;
  poster: string;
  caption: string;
}) {
  return (
    <figure className="mt-10 max-w-[52rem]">
      {hasAsset(src) ? (
        <video
          controls
          playsInline
          preload="metadata"
          poster={hasAsset(poster) ? `/${poster}` : undefined}
          className="aspect-video w-full rounded-lg bg-navy shadow-lg"
        >
          <source src={`/${src}`} type="video/mp4" />
        </video>
      ) : (
        <PlaceholderFrame label="Demo video coming shortly" aspect="aspect-video" />
      )}
      <figcaption className="mt-4 text-[0.95rem] leading-[1.6] text-navy-2">
        {caption}
      </figcaption>
    </figure>
  );
}

export function Shot({ src, alt }: { src: string; alt: string }) {
  if (!hasAsset(src)) {
    return <PlaceholderFrame label={`Screenshot coming: ${alt}`} aspect="aspect-[16/10]" />;
  }
  return <ShotZoom src={`/${src}`} alt={alt} />;
}
