"use client";

import { useRef } from "react";
import Image from "next/image";

/**
 * Click-to-enlarge screenshot for the /mn-its tutorial. Native <dialog>
 * does the heavy lifting: showModal() gives focus trapping and Escape-to-
 * close for free; clicking anywhere (backdrop or image) closes.
 */
export function ShotZoom({ src, alt }: { src: string; alt: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  return (
    <>
      <button
        type="button"
        aria-label={`Enlarge screenshot: ${alt}`}
        onClick={() => dialogRef.current?.showModal()}
        className="relative block aspect-[16/10] w-full cursor-zoom-in overflow-hidden rounded-lg shadow-md"
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 26rem, 100vw"
          className="object-contain"
        />
      </button>
      <dialog
        ref={dialogRef}
        onClick={() => dialogRef.current?.close()}
        className="m-auto max-h-none max-w-none cursor-zoom-out bg-transparent p-4 backdrop:bg-navy/85"
      >
        {/* plain img: the asset is a static file of unknown intrinsic size */}
        <img
          src={src}
          alt={alt}
          className="max-h-[92vh] max-w-[94vw] rounded-lg shadow-lg"
        />
      </dialog>
    </>
  );
}
