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
        tx = ((px - r.left) / r.width - 0.5) * 8;
        ty = (0.5 - (py - r.top) / r.height) * 8;
      }
      cx += (tx - cx) * 0.09;
      cy += (ty - cy) * 0.09;
      if (plane) {
        plane.style.transform = `rotateX(${(26 + cy).toFixed(2)}deg) rotateY(${cx.toFixed(2)}deg) rotateZ(-4deg)`;
        plane.style.setProperty("--hb-px", `${(cx * 6).toFixed(1)}px`);
        plane.style.setProperty("--hb-py", `${(cy * -4).toFixed(1)}px`);
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
