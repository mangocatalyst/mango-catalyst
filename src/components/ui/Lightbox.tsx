"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export type Screenshot = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
};

/**
 * Screenshot thumbnails that open full size in a native <dialog>.
 *
 * The dialog does the accessibility work here instead of a library: showModal()
 * traps focus and makes the rest of the page inert, Escape closes it, and close()
 * hands focus back to the thumbnail that opened it. Zero dependencies, one element.
 * Captions sit on light bands, so they are navy; amber is decoration on this palette,
 * never readable text.
 */
export function ScreenshotRow({
  shots,
  tone = "light",
}: {
  shots: Screenshot[];
  tone?: "light" | "dark";
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    if (openIndex === null) {
      if (el.open) el.close();
    } else if (!el.open) {
      el.showModal();
    }
  }, [openIndex]);

  const frame =
    tone === "light"
      ? "border-border-lt bg-surface-lt"
      : "border-hairline bg-surface";
  const captionTone = tone === "light" ? "text-navy-2" : "text-muted";
  const open = openIndex === null ? null : shots[openIndex];
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
              className={`block w-full overflow-hidden rounded-lg border ${frame} text-left shadow-[0_4px_16px_rgba(10,17,32,0.10)] transition-shadow hover:shadow-[0_10px_28px_rgba(10,17,32,0.18)]`}
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

      <dialog
        ref={dialog}
        /* A modal dialog is announced by its own name, and this one had none, so
           it opened as an unlabelled group. The shot's alt text is what it is. */
        aria-label={open ? open.alt : undefined}
        onClose={() => setOpenIndex(null)}
        /* A click landing on the dialog element itself is a click on the backdrop:
           everything visible is inside the figure. */
        onClick={(e) => {
          if (e.target === dialog.current) setOpenIndex(null);
        }}
        className="m-auto w-[min(96vw,84rem)] max-w-none bg-transparent p-0 text-ink backdrop:bg-deep/90"
      >
        {open ? (
          <figure className="relative">
            <button
              type="button"
              onClick={() => setOpenIndex(null)}
              aria-label="Close the full size screenshot"
              className="absolute top-3 right-3 z-10 flex size-10 items-center justify-center rounded-full border border-hairline bg-deep/90 text-[1.4rem] leading-none text-ink transition-colors hover:border-amber hover:text-amber"
            >
              <span aria-hidden>&times;</span>
            </button>
            {/* Auto on both axes with a cap on each: the browser scales the shot to
                fit the viewport without letterboxing it inside a wider box. */}
            <Image
              src={open.src}
              alt={open.alt}
              width={open.width}
              height={open.height}
              sizes="96vw"
              className="mx-auto h-auto max-h-[82vh] w-auto max-w-full rounded-lg border border-hairline"
            />
            {open.caption ? (
              <figcaption className="mt-4 text-[0.9rem] leading-[1.55] text-body">
                {open.caption}
              </figcaption>
            ) : null}
          </figure>
        ) : null}
      </dialog>
    </>
  );
}
