"use client";

import { useEffect } from "react";

/**
 * Pointer tilt enhancer for the hero backdrop. Writes two custom properties
 * + a rotate onto .hb-plane; every consumer is CSS. Skips itself on touch,
 * small screens, and reduced motion.
 *
 * A client component (not an inline <script>) so it also runs after
 * client-side navigations, where inline scripts are inserted but never
 * executed by React.
 */
export function HeroTilt() {
  useEffect(() => {
    const sec = document.getElementById("top");
    const plane = sec?.querySelector<HTMLElement>(".hb-plane");
    if (!sec || !plane) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (
      !matchMedia("(hover: hover) and (pointer: fine) and (min-width: 48rem)")
        .matches
    )
      return;

    let px: number | null = null;
    let py = 0;
    let home = true;
    let cx = 0;
    let cy = 0;
    let raf: number | null = null;

    function frame() {
      raf = null;
      let tx = 0;
      let ty = 0;
      if (!home && px !== null && sec && plane) {
        const r = sec.getBoundingClientRect();
        // Tuned 2026-07-19 round 2: whole-plane lean dialed back (+/-4deg),
        // per-layer separation dialed UP via the px/py multipliers below --
        // the depth reads from elements sliding, not the card tilting.
        // Fractions clamped: after a scroll the cursor can sit far outside
        // the section rect and would otherwise fling the plane.
        const fx = Math.min(1, Math.max(0, (px - r.left) / r.width));
        const fy = Math.min(1, Math.max(0, (py - r.top) / r.height));
        tx = (fx - 0.5) * 6;
        ty = (0.5 - fy) * 6;
      }
      // Homing (cursor left the hero, e.g. mid-scroll) drifts back at a
      // quarter of the tracking rate -- a settle, not a snap-back.
      const ease = home ? 0.022 : 0.055;
      cx += (tx - cx) * ease;
      cy += (ty - cy) * ease;
      if (plane) {
        plane.style.transform = `rotateX(${(26 + cy).toFixed(2)}deg) rotateY(${cx.toFixed(2)}deg) rotateZ(-4deg)`;
        plane.style.setProperty("--hb-px", `${(cx * 10).toFixed(1)}px`);
        plane.style.setProperty("--hb-py", `${(cy * -7).toFixed(1)}px`);
      }
      if (Math.abs(tx - cx) > 0.004 || Math.abs(ty - cy) > 0.004)
        raf = requestAnimationFrame(frame);
    }

    function kick() {
      if (!raf) raf = requestAnimationFrame(frame);
    }

    const move = (e: PointerEvent) => {
      px = e.clientX;
      py = e.clientY;
      home = false;
      kick();
    };
    const leave = () => {
      home = true;
      kick();
    };

    sec.addEventListener("pointermove", move);
    sec.addEventListener("pointerleave", leave);
    return () => {
      sec.removeEventListener("pointermove", move);
      sec.removeEventListener("pointerleave", leave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
