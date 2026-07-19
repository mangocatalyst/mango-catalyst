"use client";

import { useEffect } from "react";

/* Per-lap waypoint halos, driven as fresh one-shot WAAPI animations off the
   tracer's own animationstart/animationiteration events. This was CSS
   (hb-ringhalo, 16s infinite) twice: Bryan's renderer froze the ring at the
   first frame of iteration 2 both times (2026-07-19), with or without a
   non-compositable property in the keyframes. A new one-shot Animation per
   pulse has no iteration boundary to freeze at, and stays synced to hb-run
   because the tracer's clock IS the event source. */

const STAGGERS = [0, 1750, 3770, 5510]; // tracer arrival at n1..n4 within a lap
const LAP_MS = 16000;
const RUN_DELAY_MS = 9000; // hb-run animation-delay

const PULSE: Keyframe[] = [
  { opacity: 0.75, transform: "scale(1)", strokeWidth: "1.2" },
  { opacity: 0, transform: "scale(2.6)", strokeWidth: "0.5" },
];

export function HaloPulser() {
  useEffect(() => {
    const tracer = document.querySelector<HTMLElement>(".hb-tracer");
    if (!tracer) return;
    const rings = [1, 2, 3, 4].map((i) =>
      document.querySelector<SVGCircleElement>(`.hb-ring${i}`)
    );
    const timers: number[] = [];

    const pulse = (ring: Element | null) =>
      ring?.animate(PULSE, { duration: 1200, easing: "ease-out" });

    const lap = (elapsedInLap = 0) => {
      for (let i = 0; i < 4; i++) {
        const wait = STAGGERS[i] - elapsedInLap;
        if (wait < 0) continue;
        timers.push(window.setTimeout(() => pulse(rings[i]), wait));
      }
    };

    const onRun = (e: AnimationEvent) => {
      if (e.animationName === "hb-run") lap();
    };
    tracer.addEventListener("animationstart", onRun);
    tracer.addEventListener("animationiteration", onRun);

    // Mounted mid-lap (HMR, late hydration): fire this lap's remaining pulses.
    const run = tracer
      .getAnimations()
      .find((a) => a instanceof CSSAnimation && a.animationName === "hb-run");
    const local =
      run && typeof run.currentTime === "number"
        ? run.currentTime - RUN_DELAY_MS
        : -1;
    if (local >= 0) lap(local % LAP_MS);

    return () => {
      tracer.removeEventListener("animationstart", onRun);
      tracer.removeEventListener("animationiteration", onRun);
      timers.forEach(clearTimeout);
    };
  }, []);

  return null;
}
