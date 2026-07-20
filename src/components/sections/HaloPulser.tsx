"use client";

import { useEffect } from "react";

/* Per-lap waypoint acknowledgment (node flare + ring halo), driven as fresh
   one-shot WAAPI animations off the tracer's animationstart/animationiteration
   events. The targets are recurring-only overlay circles: the initial CSS
   draw and the resting nodes use separate SVG elements, avoiding the
   CSS-to-WAAPI compositor handoff that could stick on the second pass. */

const STAGGERS = [0, 1750, 3770, 5510]; // tracer arrival at n1..n4 within a lap
const LAP_MS = 16000;
const RUN_DELAY_MS = 9000; // hb-run animation-delay

const PULSE: Keyframe[] = [
  { opacity: 0.75, transform: "scale(1)", strokeWidth: "1.2" },
  { opacity: 0, transform: "scale(2.6)", strokeWidth: "0.5" },
];

/* Node flare: the old hb-nodeglow active window (3%/25%/40% of 16s) as a
   6.4s one-shot. The transparent overlay reveals the dim resting node when
   it finishes instead of animating that node directly. */
const FLARE: Keyframe[] = [
  { opacity: 0, stroke: "#f6a328", strokeWidth: "1.2", offset: 0 },
  { opacity: 1, stroke: "#ffb84d", strokeWidth: "2.2", offset: 0.075 },
  { opacity: 1, stroke: "#ffb84d", strokeWidth: "2", offset: 0.625 },
  { opacity: 0, stroke: "#f6a328", strokeWidth: "1.2", offset: 1 },
];

export function HaloPulser() {
  useEffect(() => {
    const hero = document.getElementById("top");
    const tracer = hero?.querySelector<HTMLElement>(".hb-tracer");
    if (!hero || !tracer) return;
    const rings = [1, 2, 3, 4].map((i) =>
      hero.querySelector<SVGCircleElement>(`.hb-ring-pulse${i}`)
    );
    const nodes = [1, 2, 3, 4].map((i) =>
      hero.querySelector<SVGCircleElement>(`.hb-node-flare${i}`)
    );
    const timers: number[] = [];

    const fire = (i: number) => {
      rings[i]?.animate(PULSE, { duration: 1200, easing: "ease-out" });
      nodes[i]?.animate(FLARE, { duration: 6400, easing: "linear" });
    };

    const lap = (elapsedInLap = 0) => {
      for (let i = 0; i < 4; i++) {
        const wait = STAGGERS[i] - elapsedInLap;
        if (wait < 0) continue;
        timers.push(window.setTimeout(() => fire(i), wait));
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
