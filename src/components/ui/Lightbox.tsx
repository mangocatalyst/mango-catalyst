"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export type Screenshot = {
  src: string;
  alt: string;
  /** Intrinsic pixel size. Reserves space, and lets next/image resize the full view. */
  width: number;
  height: number;
  caption?: string;
};

/**
 * Click-to-enlarge screenshots, in the two shapes the site needs.
 *
 * The site briefly had two of these: this one, and mnits/ShotZoom, written a few
 * days apart on branches that could not see each other. They agreed on the
 * important part (a native <dialog> does the work: showModal traps focus and
 * makes the page inert, Escape closes, close() hands focus back to the thumbnail)
 * and disagreed on everything else, including whether clicking the image closed
 * it. One dialog now, two entry points:
 *
 *   ScreenshotRow  a captioned row that owns its own grid    (/dashboards)
 *   ScreenshotZoom one shot, sized by whatever lays it out   (/mn-its)
 *
 * Closing is backdrop, Escape, or the visible X. Clicking the image does NOT
 * close it, which is the behaviour that survived: the image is the thing you
 * opened the dialog to look at.
 */

/** The modal. One implementation, both entry points. */
function FullSizeDialog({
  shot,
  onClose,
}: {
  shot: Screenshot | null;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    if (!shot) {
      if (el.open) el.close();
    } else if (!el.open) {
      el.showModal();
    }
  }, [shot]);

  return (
    <dialog
      ref={dialog}
      /* A modal is announced by its own name, and an unnamed one opens as a bare
         group. The shot's alt text is what it is. */
      aria-label={shot ? shot.alt : undefined}
      onClose={onClose}
      /* A click landing on the dialog element itself is a click on the backdrop:
         everything visible is inside the figure. */
      onClick={(e) => {
        if (e.target === dialog.current) onClose();
      }}
      className="m-auto w-[min(96vw,84rem)] max-w-none cursor-zoom-out bg-transparent p-0 text-ink backdrop:bg-deep/90"
    >
      {shot ? (
        /* w-fit so the figure shrink-wraps the image: the close button is
           anchored to the shot's own corner rather than floating in the backdrop
           beside a capture narrower than the dialog. */
        <figure className="relative mx-auto w-fit cursor-default">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close the full size screenshot"
            className="absolute top-3 right-3 z-10 flex size-10 items-center justify-center rounded-full border border-hairline bg-deep/90 text-[1.4rem] leading-none text-ink transition-colors hover:border-amber hover:text-amber"
          >
            <span aria-hidden>&times;</span>
          </button>
          {/* Auto on both axes with a cap on each: the browser scales the shot to
              fit the viewport without letterboxing it inside a wider box. */}
          <Image
            src={shot.src}
            alt={shot.alt}
            width={shot.width}
            height={shot.height}
            sizes="96vw"
            className="mx-auto h-auto max-h-[82vh] w-auto max-w-full rounded-lg border border-hairline"
          />
          {shot.caption ? (
            <figcaption className="mt-4 text-[0.9rem] leading-[1.55] text-body">
              {shot.caption}
            </figcaption>
          ) : null}
        </figure>
      ) : null}
    </dialog>
  );
}

/**
 * A row of captioned thumbnails sharing one dialog. Captions sit on light bands,
 * so they are navy; amber is decoration on this palette, never readable text.
 */
export function ScreenshotRow({
  shots,
  tone = "light",
}: {
  shots: Screenshot[];
  tone?: "light" | "dark";
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const frame =
    tone === "light"
      ? "border-border-lt bg-surface-lt"
      : "border-hairline bg-surface";
  const captionTone = tone === "light" ? "text-navy-2" : "text-muted";
  // A lone thumbnail in a three-up grid reads as a missing pair, so the row takes
  // its shape from how many shots it was given.
  const grid =
    shots.length === 1
      ? "max-w-[40rem]"
      : shots.length === 2
        ? "sm:grid-cols-2"
        : "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <>
      <ul className={`mt-8 grid gap-6 ${grid}`}>
        {shots.map((shot, i) => (
          <li key={shot.src}>
            <button
              type="button"
              onClick={() => setOpenIndex(i)}
              className={`block w-full cursor-zoom-in overflow-hidden rounded-lg border ${frame} text-left shadow-[0_4px_16px_rgba(10,17,32,0.10)] transition-shadow hover:shadow-[0_10px_28px_rgba(10,17,32,0.18)]`}
            >
              <Image
                src={shot.src}
                alt={shot.alt}
                width={shot.width}
                height={shot.height}
                sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 30vw"
                className="h-auto w-full"
              />
              <span className="sr-only">, open full size</span>
            </button>
            {shot.caption ? (
              <p className={`mt-3 text-[0.85rem] leading-[1.55] ${captionTone}`}>
                {shot.caption}
              </p>
            ) : null}
          </li>
        ))}
      </ul>

      <FullSizeDialog
        shot={openIndex === null ? null : shots[openIndex]}
        onClose={() => setOpenIndex(null)}
      />
    </>
  );
}

/**
 * A single shot, filling whatever cell the caller puts it in. The thumbnail is
 * `fill` inside a fixed aspect box because the /mn-its tutorial lays its steps
 * out on a two-column grid whose right column is a fixed width, and the captures
 * are not all the same shape; the dialog uses the real pixel size.
 */
export function ScreenshotZoom({
  src,
  alt,
  width,
  height,
  aspect = "aspect-[16/10]",
  sizes = "(min-width: 1024px) 26rem, 100vw",
}: Screenshot & { aspect?: string; sizes?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        aria-label={`Enlarge screenshot: ${alt}`}
        onClick={() => setOpen(true)}
        className={`relative block ${aspect} w-full cursor-zoom-in overflow-hidden rounded-lg shadow-md`}
      >
        <Image src={src} alt={alt} fill sizes={sizes} className="object-contain" />
      </button>
      <FullSizeDialog
        shot={open ? { src, alt, width, height } : null}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
