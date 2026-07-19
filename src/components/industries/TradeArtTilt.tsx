"use client";

import { useEffect } from "react";

/**
 * Pointer parallax for the trade art, the industry-page cousin of HeroTilt.
 * Writes --ta-px/--ta-py onto .ta-par; every consumer is CSS, and the easing
 * is a CSS transition rather than HeroTilt's rAF homing loop (this lean is a
 * third of the hero's, so the settle machinery would not read).
 *
 * Skips itself on touch, small screens, and reduced motion, matching the
 * gate the trade-art animations use in globals.css.
 *
 * A client component (not an inline <script>) so it also runs after
 * client-side navigations, where inline scripts are inserted but never
 * executed by React.
 */
export function TradeArtTilt() {
  useEffect(() => {
    const sec = document.getElementById("intro");
    const par = sec?.querySelector<HTMLElement>(".ta-par");
    if (!sec || !par) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (
      !matchMedia("(hover: hover) and (pointer: fine) and (min-width: 48rem)")
        .matches
    )
      return;

    const move = (e: PointerEvent) => {
      const r = sec.getBoundingClientRect();
      // Clamped: after a scroll the pointer can sit far outside the section
      // rect, which would otherwise fling the sheet (HeroTilt learned this).
      const fx = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
      const fy = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height));
      par.style.setProperty("--ta-px", `${((fx - 0.5) * 18).toFixed(1)}px`);
      par.style.setProperty("--ta-py", `${((fy - 0.5) * 12).toFixed(1)}px`);
    };
    const leave = () => {
      par.style.setProperty("--ta-px", "0px");
      par.style.setProperty("--ta-py", "0px");
    };

    sec.addEventListener("pointermove", move);
    sec.addEventListener("pointerleave", leave);
    return () => {
      sec.removeEventListener("pointermove", move);
      sec.removeEventListener("pointerleave", leave);
    };
  }, []);

  return null;
}
