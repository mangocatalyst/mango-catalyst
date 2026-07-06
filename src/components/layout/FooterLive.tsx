"use client";

import { useEffect } from "react";

/**
 * Play-once trigger for the footer chart art: adds .footer-live when the
 * chart scrolls into view. A client component (not an inline <script>) so it
 * also runs after client-side navigations, where inline scripts are inserted
 * but never executed by React.
 */
export function FooterLive() {
  useEffect(() => {
    const art = document.querySelector(".footer-art");
    if (!art || !("IntersectionObserver" in window)) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!matchMedia("(min-width: 48rem)").matches) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            art.classList.add("footer-live");
            io.disconnect();
            return;
          }
        }
      },
      { threshold: 0.35 },
    );
    io.observe(art);
    return () => io.disconnect();
  }, []);

  return null;
}
