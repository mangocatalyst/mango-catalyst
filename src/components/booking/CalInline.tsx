"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ensureCalInit } from "@/lib/cal";

/**
 * Inline Cal.com booker that auto-resizes to its content (the embed posts
 * height messages, so there is no inner scrollbar). Month view only, so the
 * closed hours never render. Falls back to nothing when NEXT_PUBLIC_CAL_URL is
 * unset; callers that need a visible fallback render their own copy alongside.
 *
 * The embed loads only once it nears the viewport (IntersectionObserver), so on
 * / and /contact it stays off the initial-paint critical path where it was
 * costing LCP/TTI. A pulsing placeholder holds the height until then, so there
 * is no blank white card and no layout shift when the iframe arrives.
 */
export function CalInline({ className }: { className?: string }) {
  const id = "cal-" + useId().replace(/:/g, "");
  const ref = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries, obs) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        obs.disconnect();
        const c = ensureCalInit();
        if (!c) return;
        c.Cal("inline", {
          elementOrSelector: "#" + id,
          calLink: c.link,
          config: { layout: "month_view" },
        });
        setLoaded(true);
      },
      { rootMargin: "400px" }, // warm just before it scrolls into view
    );
    io.observe(el);
    return () => io.disconnect();
  }, [id]);

  return (
    <div ref={ref} className={className}>
      {/* Cal injects its iframe into this element and paints over the skeleton.
          ponytail: 560px ~ month-view booker height; tune if it settles taller. */}
      <div
        id={id}
        aria-busy={!loaded}
        className={
          "min-h-[560px] w-full rounded-xl" +
          (loaded ? "" : " animate-pulse bg-surface-hi")
        }
      />
    </div>
  );
}
