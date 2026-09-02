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
export function CalInline({
  className,
  eager = false,
}: {
  className?: string;
  /** Init on mount instead of on approach: for the page whose job is the booker. */
  eager?: boolean;
}) {
  const id = "cal-" + useId().replace(/:/g, "");
  const ref = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    function init() {
      const c = ensureCalInit();
      if (!c) return;
      c.Cal("inline", {
        elementOrSelector: "#" + id,
        calLink: c.link,
        config: { layout: "month_view" },
      });
      setLoaded(true);
    }
    if (eager) {
      init();
      return;
    }
    const io = new IntersectionObserver(
      (entries, obs) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        obs.disconnect();
        init();
      },
      { rootMargin: "400px" }, // warm just before it scrolls into view
    );
    io.observe(el);
    return () => io.disconnect();
  }, [id, eager]);

  return (
    <div ref={ref} className={className}>
      {/* Cal injects its iframe into this element and paints over the skeleton.
          ponytail: 560px ~ month-view booker height; tune if it settles taller. */}
      <div id={id} aria-busy={!loaded} className="relative min-h-[560px] w-full rounded-xl">
        {/* A placeholder that reads as a calendar, not a blank card: the old 6%
            tint on white was invisible for the 5-15 s the embed takes to paint
            (audit item 8). currentColor keeps it neutral on light and dark. */}
        {loaded ? null : (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 animate-pulse p-6"
          >
            <div className="h-5 w-40 rounded bg-current/[0.14]" />
            <div className="mt-6 grid grid-cols-7 gap-2">
              {Array.from({ length: 35 }, (_, i) => (
                <div key={i} className="aspect-square rounded-md bg-current/[0.08]" />
              ))}
            </div>
            <p className="mt-6 text-sm text-current/60">Loading the calendar…</p>
          </div>
        )}
      </div>
    </div>
  );
}
