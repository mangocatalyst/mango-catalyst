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
    // Warm the embed at idle instead of during initial paint, so the ~3 MiB of
    // Cal assets stay off every page's LCP/TTI path. Popups still open instantly
    // enough because onClick inits on demand below if the warm hasn't run yet.
    const w = window as unknown as {
      requestIdleCallback?: (cb: () => void) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    function warm() {
      const c = ensureCalInit();
      if (c) c.Cal("preload", { calLink: c.link });
    }
    const idleId = w.requestIdleCallback
      ? w.requestIdleCallback(warm)
      : window.setTimeout(warm, 2000);

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
      const c = ensureCalInit(); // inits on demand if the idle warm hasn't run
      if (!c) return;
      let config: Record<string, unknown> = {};
      try {
        config = JSON.parse(el!.dataset.calConfig || "{}");
      } catch {
        // malformed config: open with defaults rather than break the click
      }
      c.Cal("modal", { calLink: link, config });
    }

    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
      if (w.cancelIdleCallback) w.cancelIdleCallback(idleId);
      else window.clearTimeout(idleId);
    };
  }, []);

  return null;
}
