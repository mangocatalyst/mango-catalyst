"use client";

import { useEffect } from "react";
import { ensureCalInit } from "@/lib/cal";

/**
 * The one booking client island in the site chrome (sibling to CtaTracker):
 * mounts once in the root layout, loads + inits the Cal embed, preloads the
 * booker, and owns a single delegated click handler that opens the popup for
 * any [data-cal-link] anchor. Delegation (not Cal's own data-attribute wiring,
 * which doesn't catch SSR anchors here) keeps every booking CTA a plain
 * server-rendered <a href="/contact#book">: crawlable, analytics-tracked, and a
 * real fallback with no JS. No-op when NEXT_PUBLIC_CAL_URL is unset.
 */
export function CalLoader() {
  useEffect(() => {
    const c = ensureCalInit();
    if (!c) return;
    const { Cal } = c;
    Cal("preload", { calLink: c.link });

    function onClick(event: MouseEvent) {
      // Leave modified clicks (open-in-new-tab, etc.) to the browser.
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }
      const el = (event.target as Element | null)?.closest<HTMLElement>(
        "[data-cal-link]",
      );
      const link = el?.dataset.calLink;
      if (!link) return;
      event.preventDefault();
      let config: Record<string, unknown> = {};
      try {
        config = JSON.parse(el!.dataset.calConfig || "{}");
      } catch {
        // malformed config: open with defaults rather than break the click
      }
      Cal("modal", { calLink: link, config });
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
