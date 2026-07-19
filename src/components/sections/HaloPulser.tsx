"use client";

import { useEffect } from "react";

/* Per-lap waypoint acknowledgment (node flare + ring halo), driven as fresh
   one-shot WAAPI animations off the tracer's animationstart/animationiteration
   events. This was infinite 16s CSS twice (hb-ringhalo, then the original
   hb-nodeglow): Bryan's renderer lets long-dead-tail infinite CSS animations
   go visually stale after the first active window, exposing whatever value
   sits underneath (2026-07-19, four fix rounds). One-shot Animations have no
   iteration boundary to go stale at, and sync can't drift because the
   tracer's own clock is the event source. */

const STAGGERS = [0, 1750, 3770, 5510]; // tracer arrival at n1..n4 within a lap
const LAP_MS = 16000;
const RUN_DELAY_MS = 9000; // hb-run animation-delay

const PULSE: Keyframe[] = [
  { opacity: 0.75, transform: "scale(1)", strokeWidth: "1.2" },
  { opacity: 0, transform: "scale(2.6)", strokeWidth: "0.5" },
];

/* Node flare: the old hb-nodeglow active window (3%/25%/40% of 16s) as a
   6.4s one-shot. fill none returns the node to hb-nodedim's 0.3 rest. */
const FLARE: Keyframe[] = [
  { opacity: 0.3, stroke: "#f6a328", strokeWidth: "1.2", offset: 0 },
  { opacity: 1, stroke: "#ffb84d", strokeWidth: "2.2", offset: 0.075 },
  { opacity: 1, stroke: "#ffb84d", strokeWidth: "2", offset: 0.625 },
  { opacity: 0.3, stroke: "#f6a328", strokeWidth: "1.2", offset: 1 },
];

export function HaloPulser() {
  useEffect(() => {
    const tracer = document.querySelector<HTMLElement>(".hb-tracer");
    if (!tracer) return;
    const rings = [1, 2, 3, 4].map((i) =>
      document.querySelector<SVGCircleElement>(`.hb-ring${i}`)
    );
    const nodes = [1, 2, 3, 4].map((i) =>
      document.querySelector<SVGCircleElement>(`.hb-n${i}`)
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
