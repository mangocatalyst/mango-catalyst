/* eslint-disable @next/next/no-img-element */
import type { CSSProperties } from "react";
import { HeroTilt } from "@/components/sections/HeroTilt";

/**
 * Hero backdrop: "Night Shift Drafting", raster-hybrid (Bryan's lock,
 * 2026-07-19, sample B). Supersedes the full-SVG trace (git history) and the
 * light table before it. Master art: build/assets/hero-locked-master-2026-07-19.png.
 *
 * Four hand-drafted Higgsfield cutouts (webp, ~220KB total, transparent
 * outside the objects) sit in the hb-layer depth slots: desk phone (call
 * comes in) -> dispatch monitor (job hits the board) -> field tablet with
 * exploded condenser (crew works the ticket) -> crumpled signed invoice
 * (invoice goes out). The amber thread stays LIVE: an SVG layer on top draws
 * itself through four waypoints with ring flashes, and a blooming tracer
 * rides it every 16s. Amber appears nowhere in the rasters.
 *
 * Motion contract unchanged (globals.css hb-*): staggered entrances settle
 * by ~1.6s, per-layer cursor parallax via HeroTilt's --hb-px/--hb-py, thread
 * draws 2.2s-7.7s. Static rule (mobile, reduced-motion, no-JS): settled
 * composition, thread fully drawn. The images are decorative (aria-hidden
 * wrapper, empty alt, async decode, low fetch priority) so the H1 stays LCP.
 *
 * Plane is a fixed 660x430 design space, scaled per breakpoint in CSS.
 */

/** Layer placement matching the .hb-l1..l4 parallax rates/depths. */
const layer = (
  left: number,
  top: number,
  rate: number,
  z: number,
  rot: number
): CSSProperties => ({
  position: "absolute",
  left,
  top,
  transform: `translate3d(calc(var(--hb-px, 0px) * ${rate}), calc(var(--hb-py, 0px) * ${rate}), ${z}px) rotate(${rot}deg)`,
});

/* The amber thread in plane coordinates, flow order: phone -> dispatch ->
   tablet -> invoice, short trailing tail past the last waypoint. Approx
   length ~540px; waypoint fractions 0 / .30 / .62 / .86 drive the node/ring
   delays in CSS (2.2s + fraction * 5.5s draw). */
const LINK_ROUTE =
  "M330 80 C330 125 318 165 320 205 C322 248 360 292 405 315 C445 332 495 340 525 350 C540 356 543 385 545 408";
const POINTS: [number, number][] = [
  [330, 80],
  [320, 205],
  [405, 315],
  [525, 350],
];

const img = {
  decoding: "async",
  loading: "eager",
  fetchPriority: "low",
  alt: "",
} as const;

export function HeroBackdrop() {
  return (
    <>
      {/* Preloads: the cutouts must be decoded before the 1.6s entrance
          finishes or they pop in mid-animation (Bryan's load jolt). */}
      <link rel="preload" as="image" href="/hero/hero-phone.webp" />
      <link rel="preload" as="image" href="/hero/hero-monitor.webp" />
      <link rel="preload" as="image" href="/hero/hero-tablet.webp" />
      <link rel="preload" as="image" href="/hero/hero-invoice.webp" />
      <div aria-hidden className="hero-art">
        <div className="hb-persp">
          <div className="hb-float">
            <div className="hb-plane">
              <div style={layer(200, -10, 0.08, -44, -2.5)}>
                <div className="hb-f1">
                  <img
                    {...img}
                    src="/hero/hero-phone.webp"
                    width={228}
                    height={156}
                    className="hb-sheet hb-e1"
                    style={{ width: 228 }}
                  />
                </div>
              </div>
              <div style={layer(170, 85, 0.32, -12, 1.5)}>
                <div className="hb-f2">
                  <img
                    {...img}
                    src="/hero/hero-monitor.webp"
                    width={300}
                    height={258}
                    className="hb-sheet hb-e2"
                    style={{ width: 300 }}
                  />
                </div>
              </div>
              <div style={layer(280, 205, 0.62, 22, -2)}>
                <div className="hb-f3">
                  <img
                    {...img}
                    src="/hero/hero-tablet.webp"
                    width={252}
                    height={231}
                    className="hb-sheet hb-e3"
                    style={{ width: 252 }}
                  />
                </div>
              </div>
              <div style={layer(460, 255, 1, 60, 2)}>
                <div className="hb-f4">
                  <img
                    {...img}
                    src="/hero/hero-invoice.webp"
                    width={148}
                    height={200}
                    className="hb-sheet hb-e4"
                    style={{ width: 148 }}
                  />
                </div>
              </div>
              <div className="hb-layer hb-l5">
                <svg className="hb-link" width="660" height="430" viewBox="0 0 660 430">
                  <path className="hb-link-path" d={LINK_ROUTE} pathLength="100" />
                  {POINTS.map(([x, y], i) => (
                    <circle key={`r${i}`} className={`hb-ring hb-ring${i + 1}`} cx={x} cy={y} r="5" />
                  ))}
                  {POINTS.map(([x, y], i) => (
                    <circle key={`n${i}`} className={`hb-node hb-n${i + 1}`} cx={x} cy={y} r="4" />
                  ))}
                </svg>
                {/* offset-path inline from LINK_ROUTE: one source of truth,
                    the CSS copy drifted out of sync once already. */}
                <div
                  className="hb-tracer"
                  style={{ offsetPath: `path("${LINK_ROUTE}")` }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="hb-veil" />
      </div>
      <HeroTilt />
    </>
  );
}
