"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";

/**
 * Branded error boundary (client component by Next convention). Copy
 * verbatim from build/out/copy/home.md global microcopy.
 */
export default function ErrorPage({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-start justify-center px-6 py-24 sm:px-10">
      <div aria-hidden className="h-[3px] w-10 bg-amber" />
      <h1 className="mt-6 max-w-[22ch] font-display text-[clamp(2.2rem,1.5rem+3vw,4rem)] font-bold uppercase leading-[1.04] tracking-[0.015em] text-balance text-ink">
        {
          "Something broke on our end, which is a little embarrassing for an automation shop."
        }
      </h1>
      <p className="mt-5 max-w-[40rem] text-[1.05rem] leading-[1.65] text-body lg:max-w-[48rem] lg:text-[1.2rem]">
        {"Head back home; I'm on it."}
      </p>
      <Button href="/" className="mt-9" arrow>
        Back home
      </Button>
    </main>
  );
}
