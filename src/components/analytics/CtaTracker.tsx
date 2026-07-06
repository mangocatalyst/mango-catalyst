"use client";

import { useEffect } from "react";
import { track } from "@vercel/analytics";

/**
 * Fires the "cta_click" analytics event via one delegated document listener.
 * Any element carrying `data-cta` (the Button component sets it) is tracked
 * with its href and visible label. Delegation keeps every CTA a plain
 * server-rendered <a>: no copy or markup moves into client components
 * (render-parity rule in SEO-FOUNDATION.md).
 */
export function CtaTracker() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const target = event.target as Element | null;
      const cta = target?.closest<HTMLElement>("[data-cta]");
      if (!cta) return;
      track("cta_click", {
        href: cta.getAttribute("href") ?? "",
        label: (cta.textContent ?? "").trim().slice(0, 80),
        variant: cta.dataset.cta ?? "",
      });
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
