import fs from "node:fs";
import path from "node:path";
import { ScreenshotZoom } from "@/components/ui/Lightbox";

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

/**
 * The intrinsic size of a screenshot, straight out of the PNG header (IHDR is
 * always the first chunk, so width and height are two big-endian uint32s at
 * byte 16). The shared lightbox wants real dimensions so next/image can resize
 * the full view instead of shipping the original; these are all captures we
 * ship ourselves, so reading them at build time beats hand-maintaining a table.
 *
 * ponytail: PNG only, because every capture here is one. A JPEG would need SOF
 * parsing; until one exists it renders the same placeholder an unreadable asset
 * does, which is a loud enough signal to come back and add it.
 */
function pngSize(rel: string): { width: number; height: number } | null {
  try {
    const fd = fs.openSync(path.join(process.cwd(), "public", rel), "r");
    const head = Buffer.alloc(24);
    fs.readSync(fd, head, 0, 24, 0);
    fs.closeSync(fd);
    if (head.subarray(0, 8).toString("binary") !== "\x89PNG\r\n\x1a\n") return null;
    return { width: head.readUInt32BE(16), height: head.readUInt32BE(20) };
  } catch {
    return null;
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
  const size = hasAsset(src) ? pngSize(src) : null;
  if (!size) {
    return <PlaceholderFrame label={`Screenshot coming: ${alt}`} aspect="aspect-[16/10]" />;
  }
  return <ScreenshotZoom src={`/${src}`} alt={alt} {...size} />;
}
