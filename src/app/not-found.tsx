import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

// Override the layout's global index,follow so the 404 emits noindex only.
export const metadata: Metadata = { robots: { index: false, follow: false } };

/** Branded 404. Copy verbatim from build/out/copy/home.md global microcopy. */
export default function NotFound() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-start justify-center px-6 py-24 sm:px-10">
      <div aria-hidden className="h-[3px] w-10 bg-amber" />
      <h1 className="mt-6 font-display text-[clamp(2.6rem,1.8rem+4vw,5rem)] font-bold uppercase leading-[1.02] tracking-[0.015em] text-ink">
        That page ran off.
      </h1>
      <p className="mt-5 max-w-[40rem] text-[1.05rem] leading-[1.65] text-body lg:max-w-[48rem] lg:text-[1.2rem]">
        {"Head back home, or "}
        <Link href="/contact#book" className="inline-link">
          book a 15-minute fit call
        </Link>
        {" and we'll point you right."}
      </p>
      <Button href="/" className="mt-9" arrow>
        Back home
      </Button>
    </main>
  );
}
