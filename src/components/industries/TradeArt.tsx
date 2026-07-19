/**
 * Per-trade hero art for the /industries pages.
 *
 * 2026-07-19, Night Shift Drafting pass: the bodies of these compositions
 * used to be hand-authored inline SVG in the navy line ramp. They are now
 * generated hand-drafted pencil drawings (4k masters -> transparent webp in
 * public/industries/, see build/cutout.py and the rollout handoff), which is
 * what buys the chalky drawn-by-a-person look the flat vectors never had.
 *
 * What did NOT move: every composition still keeps its ORIGINAL concept, and
 * the amber still lands on exactly ONE node per drawing. Amber never appears
 * in the raster (the generator is prompted monochrome on purpose) - it is an
 * SVG layer on top, positioned in the drawing's own pixel space, so the
 * existing ta-* motion in globals.css keeps driving it. Motion stays ambient
 * and thin: the amber node breathes everywhere, plus at most one thematic
 * touch per trade, and only where the overlay can sit on real geometry in the
 * art underneath (now-line creep, pipe flow, marching current, perc drift,
 * fan spin, snow). Bryan's rule: less is more.
 *
 * Coordinates below were read off a pixel grid rendered over each asset; the
 * viewBox IS the asset's pixel size, so the numbers are directly checkable
 * against the webp. Re-crop an asset and its overlay must be re-read.
 *
 * Art is decorative: the wrapper in IndustryHero is aria-hidden, images are
 * lazy + low priority so the H1 keeps LCP.
 */
import type { ReactNode } from "react";

type ArtProps = { className?: string };

/** Raster drawing + its amber/motion overlay, sharing one coordinate space. */
function Sheet({
  src,
  w,
  h,
  className,
  children,
}: ArtProps & { src: string; w: number; h: number; children?: ReactNode }) {
  return (
    // ta-par takes the pointer parallax, ta-sheet the entrance: one transform
    // per element, see the depth-stack note in globals.css.
    <div className={`ta-par ${className ?? ""}`}>
      <div className="ta-sheet relative">
        {/* eslint-disable-next-line @next/next/no-img-element -- fixed-size decorative asset, already webp at final size; the optimizer would only add a request */}
        <img
          src={`/industries/${src}.webp`}
          alt=""
          width={w}
          height={h}
          decoding="async"
          loading="lazy"
          fetchPriority="low"
          className="block h-auto w-full"
        />
        <svg
          viewBox={`0 0 ${w} ${h}`}
          fill="none"
          className="absolute inset-0 h-full w-full"
        >
          {children}
        </svg>
      </div>
    </div>
  );
}

/** HVAC: the dispatch board, now on the monitor where a real one lives.
 *  Amber = the job at T3; ta-now creeps it along with the drawn now-line. */
export function DispatchArt({ className }: ArtProps) {
  return (
    <Sheet src="dispatch" w={700} h={463} className={className}>
      <g className="ta-now">
        <circle className="ta-amber" cx="270" cy="196" r="6" fill="#F6A328" />
      </g>
    </Sheet>
  );
}

/** Plumbing: the supply run. Amber = the job riding the line, hero-tracer
 *  style; ta-flow puts it on the pipe centerline (path in globals.css). */
export function PipeRunArt({ className }: ArtProps) {
  return (
    <Sheet src="pipe-run" w={700} h={448} className={className}>
      <circle className="ta-flow" cx="0" cy="0" r="6" fill="#F6A328" transform="translate(235 225)" />
    </Sheet>
  );
}

/** Construction: the framing plan. Amber = the junction being framed today. */
export function FramePlanArt({ className }: ArtProps) {
  return (
    <Sheet src="frame-plan" w={700} h={503} className={className}>
      <circle className="ta-amber" cx="420" cy="215" r="6" fill="#F6A328" />
    </Sheet>
  );
}

/** Handyman: the punch list on a rugged tablet, plus the ladder. Amber = the
 *  third item, the one that runs itself now. The checks are drawn in the
 *  raster, so the old draw-on check animation retired with the vectors. */
export function PunchListArt({ className }: ArtProps) {
  return (
    <Sheet src="punch-list" w={700} h={402} className={className}>
      <circle className="ta-amber" cx="156" cy="205" r="6" fill="#F6A328" />
    </Sheet>
  );
}

/** Roofing: the gable truss. Amber sits on the ridge. */
export function TrussArt({ className }: ArtProps) {
  return (
    <Sheet src="truss" w={700} h={420} className={className}>
      <circle className="ta-amber" cx="325" cy="31" r="6" fill="#F6A328" />
    </Sheet>
  );
}

/** Snow plowing: the truck and blade. Amber = the cab beacon; snow drifts
 *  through the open sky over the bed, where it does not fight the linework. */
export function PlowTruckArt({ className }: ArtProps) {
  return (
    <Sheet src="plow-truck" w={700} h={281} className={className}>
      <g className="ta-snow" fill="#35496F">
        <circle cx="452" cy="18" r="2" />
        <circle cx="498" cy="40" r="2" />
        <circle cx="546" cy="14" r="2" />
        <circle cx="588" cy="46" r="2" />
        <circle cx="634" cy="22" r="2" />
        <circle cx="672" cy="52" r="2" />
      </g>
      <circle className="ta-amber" cx="388" cy="16" r="5" fill="#F6A328" />
    </Sheet>
  );
}

/** Landscaping: the plot plan. Amber = the bed getting planted this week. */
export function PlotPlanArt({ className }: ArtProps) {
  return (
    <Sheet src="plot-plan" w={685} h={450} className={className}>
      <circle className="ta-amber" cx="232" cy="196" r="6" fill="#F6A328" />
    </Sheet>
  );
}

/** Electrical: the load center. Current marches out the three drawn
 *  conductors to the loads; amber = the circuit added this week. */
export function PanelArt({ className }: ArtProps) {
  return (
    <Sheet src="panel" w={700} h={540} className={className}>
      {/* dasharray inline, not only in the motion gate: below 48rem and under
          reduced-motion these still need to read as current on a conductor,
          not as a second solid line drawn over the one in the art */}
      <g className="ta-circuit" stroke="#5E7BAE" strokeWidth="1.6" strokeDasharray="4 10">
        <path d="M437 240H560l78-84" />
        <path d="M437 268h172" />
        <path d="M437 297H560l78 82" />
      </g>
      <circle className="ta-amber" cx="437" cy="268" r="6" fill="#F6A328" />
    </Sheet>
  );
}

/** Septic + well: the section. Perc drifts out the drain-field laterals;
 *  amber = the riser lid, the tank whose pumping is due. */
export function TankFieldArt({ className }: ArtProps) {
  return (
    <Sheet src="tank-field" w={700} h={373} className={className}>
      <g className="ta-lateral" stroke="#46608F" strokeWidth="1.4" strokeDasharray="5 4">
        <path d="M414 205h142" />
        <path d="M414 227h142" />
        <path d="M414 249h142" />
      </g>
      <circle className="ta-amber" cx="220" cy="153" r="6" fill="#F6A328" />
    </Sheet>
  );
}

/** Restoration: the dry-down plan. The two air movers spin on their own
 *  drawn centers; amber = the moisture reading logged this hour. */
export function DryDownArt({ className }: ArtProps) {
  return (
    <Sheet src="dry-down" w={651} h={454} className={className}>
      <path className="ta-fan" d="M88 60v24M76 72h24" stroke="#5E7BAE" strokeWidth="1.6" />
      <path className="ta-fan ta-fan2" d="M98 326v24M86 338h24" stroke="#5E7BAE" strokeWidth="1.6" />
      <circle className="ta-amber" cx="168" cy="207" r="6" fill="#F6A328" />
    </Sheet>
  );
}

/** MN-ITS Helper: the claim form and its presets, both inside the dashed
 *  machine boundary. Amber marks the node that stays put: nothing leaves. */
export function LocalOnlyArt({ className }: ArtProps) {
  return (
    <Sheet src="local-only" w={700} h={476} className={className}>
      <circle className="ta-amber" cx="452" cy="258" r="6" fill="#F6A328" />
    </Sheet>
  );
}
