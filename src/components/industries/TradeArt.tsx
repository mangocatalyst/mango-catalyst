import type { SVGProps } from "react";

/**
 * Per-trade hero art for the /industries pages: blueprint-language line
 * drawings in the navy ramp (imagery doc section 1: hairline technical
 * linework, registration marks, dimension ticks, drawn navy-on-navy, amber
 * on exactly ONE node per composition). Server-rendered inline SVG, zero JS,
 * aria-hidden by the layout that places them. Ambient motion is pure CSS
 * behind the hero's media gate (ta-* classes, see globals.css): the amber
 * node breathes everywhere, plus one thematic touch per trade (now-line
 * creep, snow drift, pipe flow, punch-list check-off, circuit current,
 * drainfield perc, air-mover spin). Static contexts render as drawn.
 *
 * Shared design space: 460x330. Line ramp: #22314F faint, #2A3B5E base,
 * #35496F mid, #46608F loud, #5E7BAE text. Amber #F6A328 once.
 */

const frame = (props: SVGProps<SVGSVGElement>): SVGProps<SVGSVGElement> => ({
  viewBox: "0 0 460 330",
  fill: "none",
  ...props,
});

/** Registration crosses + corner ticks shared by every composition. */
function Registration() {
  return (
    <g stroke="#22314F" strokeWidth="1">
      <path d="M24 30v12M18 36h12" />
      <path d="M436 294v12M430 300h12" />
      <path d="M436 30v12M430 36h12" />
      <path d="M24 294v12M18 300h12" />
    </g>
  );
}

/** HVAC: the dispatch board, drawn as a single blueprint sheet. */
export function DispatchArt(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...frame(props)}>
      <Registration />
      <rect x="60" y="55" width="356" height="238" rx="7" fill="#0A1120" opacity=".8" />
      <rect x="52" y="46" width="356" height="238" rx="7" fill="#16213A" fillOpacity=".7" stroke="#35496F" strokeWidth="1.2" />
      <rect x="52" y="46" width="356" height="26" rx="7" fill="#22314F" fillOpacity=".7" />
      <text x="64" y="63" fill="#5E7BAE" fontSize="9" fontFamily="var(--font-mono, monospace)" letterSpacing="2">DISPATCH BOARD</text>
      <path d="M130 82v6M190 82v6M250 82v6M310 82v6M370 82v6" stroke="#35496F" strokeWidth="1" />
      <path d="M58 132h344M58 176h344M58 220h344" stroke="#22314F" strokeWidth="1" />
      <path d="M118 92v182" stroke="#2A3B5E" strokeWidth="1" />
      <text x="68" y="112" fill="#46608F" fontSize="9" fontFamily="var(--font-mono, monospace)">T1</text>
      <text x="68" y="156" fill="#46608F" fontSize="9" fontFamily="var(--font-mono, monospace)">T2</text>
      <text x="68" y="200" fill="#46608F" fontSize="9" fontFamily="var(--font-mono, monospace)">T3</text>
      <text x="68" y="244" fill="#46608F" fontSize="9" fontFamily="var(--font-mono, monospace)">T4</text>
      <g stroke="#46608F" strokeOpacity=".45" strokeWidth="1">
        <rect x="132" y="98" width="64" height="18" rx="4" fill="#2A3B5E" fillOpacity=".9" />
        <rect x="214" y="98" width="42" height="18" rx="4" fill="#35496F" fillOpacity=".9" />
        <rect x="146" y="142" width="80" height="18" rx="4" fill="#22314F" fillOpacity=".9" />
        <rect x="252" y="142" width="40" height="18" rx="4" fill="#2A3B5E" fillOpacity=".9" />
        <rect x="132" y="186" width="42" height="18" rx="4" fill="#2A3B5E" fillOpacity=".9" />
        <rect x="190" y="186" width="76" height="18" rx="4" fill="#35496F" fillOpacity=".9" />
        <rect x="160" y="230" width="60" height="18" rx="4" fill="#2A3B5E" fillOpacity=".9" />
        <rect x="300" y="186" width="52" height="18" rx="4" fill="#22314F" fillOpacity=".9" />
      </g>
      {/* now-line creeps as a unit so the amber job marker rides along */}
      <g className="ta-now">
        <path d="M272 88v190" stroke="#5E7BAE" strokeWidth="1.2" />
        <path d="M266 82l6 8 6-8z" fill="#5E7BAE" />
        <circle className="ta-amber" cx="272" cy="195" r="4" fill="#F6A328" />
      </g>
    </svg>
  );
}

/** Plumbing: a supply-line run with a valve, gauge, and water heater. */
export function PipeRunArt(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...frame(props)}>
      <Registration />
      {/* pipe body: one thick dark stroke on the centerline, under the outlines */}
      <path d="M40 102h202a16 16 0 0 1 16 16v82a16 16 0 0 0 16 16h64" stroke="#16213A" strokeOpacity=".85" strokeWidth="10" fill="none" />
      {/* main run: double-line pipe with a clean elbow down to the tank */}
      <g stroke="#35496F" strokeWidth="1.4">
        <path d="M40 96h202a22 22 0 0 1 22 22v82a10 10 0 0 0 10 10h64" />
        <path d="M40 108h202a10 10 0 0 1 10 10v82a22 22 0 0 0 22 22h64" />
      </g>
      {/* valve symbol on the main */}
      <path d="M130 84l24 36M154 84l-24 36" stroke="#46608F" strokeWidth="1.4" />
      <path d="M142 78v-16h-12M142 62h12" stroke="#46608F" strokeWidth="1.2" />
      {/* gauge */}
      <circle cx="212" cy="70" r="17" stroke="#46608F" strokeWidth="1.2" fill="#16213A" fillOpacity=".7" />
      <path d="M212 70l9 -8" stroke="#5E7BAE" strokeWidth="1.4" />
      <path d="M212 87v9" stroke="#35496F" strokeWidth="1.2" />
      {/* water heater tank */}
      <rect x="345" y="158" width="74" height="130" rx="16" fill="#0A1120" opacity=".8" />
      <rect x="338" y="150" width="74" height="130" rx="16" stroke="#46608F" strokeWidth="1.4" fill="#16213A" fillOpacity=".7" />
      <path d="M352 150v-18M398 150v-18" stroke="#35496F" strokeWidth="1.2" />
      <path d="M348 190h54M348 246h54" stroke="#2A3B5E" strokeWidth="1" />
      <text x="352" y="222" fill="#46608F" fontSize="9" fontFamily="var(--font-mono, monospace)" letterSpacing="1.5">SN 44087</text>
      {/* dimension line under the main run */}
      <g stroke="#2A3B5E" strokeWidth="1">
        <path d="M40 132h214" strokeDasharray="4 4" />
        <path d="M40 126v12M254 126v12" />
      </g>
      {/* the one amber moment: the job riding the line, hero-tracer style.
          Static + no-offset-path contexts keep the dot at the valve outlet
          (attribute transform); motion sends it down the pipe centerline. */}
      <circle className="ta-flow" cx="0" cy="0" r="4" fill="#F6A328" transform="translate(142 120)" />
    </svg>
  );
}

/** Construction: a framing floor plan with door swings + dimension lines. */
export function FramePlanArt(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...frame(props)}>
      <Registration />
      {/* outer wall, double line, over a filled footprint + drop shadow */}
      <rect x="80" y="71" width="300" height="212" fill="#0A1120" opacity=".7" />
      <rect x="72" y="62" width="300" height="212" fill="#16213A" fillOpacity=".5" stroke="#46608F" strokeWidth="1.4" />
      <rect x="80" y="70" width="284" height="196" stroke="#2A3B5E" strokeWidth="1" />
      {/* interior walls */}
      <path d="M204 70v92M204 196v70M80 162h74M290 70v70M290 196v70M204 196h160" stroke="#35496F" strokeWidth="1.2" />
      {/* door swings */}
      <path d="M204 162a34 34 0 0 1 34 34" stroke="#46608F" strokeWidth="1" />
      <path d="M204 162v34" stroke="#46608F" strokeWidth="1" />
      <path d="M290 140a26 26 0 0 1 -26 26" stroke="#46608F" strokeWidth="1" />
      <path d="M290 140h-26" stroke="#46608F" strokeWidth="1" opacity=".7" />
      {/* stair run */}
      <path d="M308 210h56M308 222h56M308 234h56M308 246h56" stroke="#2A3B5E" strokeWidth="1" />
      {/* dimension lines */}
      <g stroke="#2A3B5E" strokeWidth="1">
        <path d="M72 296h300" strokeDasharray="4 4" />
        <path d="M72 290v12M372 290v12" />
        <path d="M44 62v212" strokeDasharray="4 4" />
        <path d="M38 62h12M38 274h12" />
      </g>
      <text x="200" y="312" fill="#46608F" fontSize="9" fontFamily="var(--font-mono, monospace)" letterSpacing="2">28-0</text>
      {/* amber node: the junction being framed today */}
      <circle className="ta-amber" cx="204" cy="196" r="4" fill="#F6A328" />
    </svg>
  );
}

/** Handyman: the punch list clipboard and a step ladder. */
export function PunchListArt(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...frame(props)}>
      <Registration />
      {/* clipboard, over a drop shadow */}
      <rect x="84" y="67" width="176" height="222" rx="8" fill="#0A1120" opacity=".8" />
      <rect x="76" y="58" width="176" height="222" rx="8" stroke="#46608F" strokeWidth="1.4" fill="#16213A" fillOpacity=".7" />
      <rect x="140" y="46" width="48" height="20" rx="6" stroke="#46608F" strokeWidth="1.2" fill="#22314F" />
      <text x="94" y="92" fill="#5E7BAE" fontSize="9" fontFamily="var(--font-mono, monospace)" letterSpacing="2">PUNCH LIST</text>
      {/* rows: box + line */}
      <g stroke="#35496F" strokeWidth="1.2">
        <rect x="94" y="110" width="11" height="11" />
        <rect x="94" y="140" width="11" height="11" />
        <rect x="94" y="170" width="11" height="11" />
        <rect x="94" y="200" width="11" height="11" />
        <rect x="94" y="230" width="11" height="11" />
      </g>
      <g fill="#2A3B5E">
        <rect x="116" y="113" width="104" height="5" rx="2" />
        <rect x="116" y="143" width="88" height="5" rx="2" />
        <rect x="116" y="173" width="112" height="5" rx="2" />
        <rect x="116" y="203" width="76" height="5" rx="2" />
        <rect x="116" y="233" width="96" height="5" rx="2" />
      </g>
      {/* two done marks in navy, one amber: the item that runs itself now.
          Motion: the checks draw themselves down the list, then the list
          resets (ta-ck1..3); static contexts keep all three drawn. */}
      <path className="ta-check ta-ck1" pathLength="1" d="M95 114l4 5 6-8" stroke="#46608F" strokeWidth="1.6" />
      <path className="ta-check ta-ck2" pathLength="1" d="M95 144l4 5 6-8" stroke="#46608F" strokeWidth="1.6" />
      <path className="ta-check ta-ck3" pathLength="1" d="M95 174l4 5 6-8" stroke="#F6A328" strokeWidth="1.8" />
      {/* step ladder: open A-frame, front rails + rear leg */}
      <path d="M292 278L342 74h14l-24 204z" fill="#16213A" fillOpacity=".45" />
      <g stroke="#35496F" strokeWidth="1.4">
        <path d="M292 278L342 74h14l-24 204" />
        <path d="M352 84l40 194" />
        <path d="M304 240h34M312 204h32M320 168h29M328 132h26" />
        <path d="M360 122l24 118" strokeWidth="1" opacity=".7" />
      </g>
      {/* feet + floor line */}
      <path d="M288 278h10M328 278h10M386 278h12" stroke="#46608F" strokeWidth="1.4" />
      <path d="M276 286h130" stroke="#2A3B5E" strokeWidth="1" strokeDasharray="4 4" />
    </svg>
  );
}

/** Roofing: a gable truss with pitch annotation and shingle courses. */
export function TrussArt(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...frame(props)}>
      <Registration />
      {/* gable mass: drop shadow + filled roof plane under the linework */}
      <path d="M72 260L238 104l166 156z" fill="#0A1120" opacity=".7" />
      <path d="M64 252L230 96l166 156z" fill="#16213A" fillOpacity=".55" />
      {/* truss: bottom chord, rafters, king post, webs */}
      <g stroke="#46608F" strokeWidth="1.4">
        <path d="M64 252h332" />
        <path d="M64 252L230 96l166 156" />
        <path d="M230 96v156" strokeWidth="1.2" />
        <path d="M147 174l83 78M313 174l-83 78" strokeWidth="1" />
      </g>
      {/* shingle courses on the left slope */}
      <g stroke="#2A3B5E" strokeWidth="1">
        <path d="M92 226l124 -116M112 232l112 -105M134 238l97 -91M158 244l80 -75" opacity=".8" />
      </g>
      {/* chimney */}
      <path d="M296 158v-52h26v78" stroke="#35496F" strokeWidth="1.2" fill="#16213A" fillOpacity=".6" />
      <path d="M292 106h34" stroke="#35496F" strokeWidth="1.2" />
      {/* pitch annotation: small right triangle + arc */}
      <path d="M262 126v22h-22" stroke="#5E7BAE" strokeWidth="1" />
      <text x="268" y="146" fill="#5E7BAE" fontSize="9" fontFamily="var(--font-mono, monospace)">8/12</text>
      {/* dimension line under the span */}
      <g stroke="#2A3B5E" strokeWidth="1">
        <path d="M64 282h332" strokeDasharray="4 4" />
        <path d="M64 276v12M396 276v12" />
      </g>
      {/* amber node at the ridge */}
      <circle className="ta-amber" cx="230" cy="96" r="4" fill="#F6A328" />
    </svg>
  );
}

/** Snow plowing: a pickup with a plow blade, route passes, falling snow. */
export function PlowTruckArt(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...frame(props)}>
      <Registration />
      {/* route passes behind the truck: overlapping plow lanes with arrows */}
      <g stroke="#2A3B5E" strokeWidth="1">
        <path d="M64 96h180M64 116h150" />
        <path d="M236 92l10 4-10 4M206 112l10 4-10 4" fill="none" />
      </g>
      {/* falling snow: sparse dots in the sky */}
      <g className="ta-snow" fill="#35496F">
        <circle cx="90" cy="66" r="1.6" />
        <circle cx="150" cy="52" r="1.6" />
        <circle cx="212" cy="70" r="1.6" />
        <circle cx="286" cy="54" r="1.6" />
        <circle cx="344" cy="72" r="1.6" />
        <circle cx="398" cy="58" r="1.6" />
        <circle cx="256" cy="96" r="1.6" />
        <circle cx="376" cy="106" r="1.6" />
      </g>
      {/* pickup: cab high in back, bed behind, side view over a drop shadow */}
      <path d="M158 234v-40h50l16-38h56l8 38h88v40z" fill="#0A1120" opacity=".7" />
      <g stroke="#46608F" strokeWidth="1.4">
        <path d="M150 226v-40h50l16-38h56l8 38h88v40z" fill="#16213A" fillOpacity=".7" />
        <path d="M220 182l12-26h44l6 26" strokeWidth="1" opacity=".85" />
        <path d="M150 206h218" strokeWidth="1" opacity=".5" />
        <circle cx="200" cy="230" r="20" fill="#16213A" fillOpacity=".8" />
        <circle cx="200" cy="230" r="8" strokeWidth="1" />
        <circle cx="332" cy="230" r="20" fill="#16213A" fillOpacity=".8" />
        <circle cx="332" cy="230" r="8" strokeWidth="1" />
      </g>
      {/* plow mount + angled blade: two curved lines + rib hatching */}
      <path d="M150 214l-30 6" stroke="#35496F" strokeWidth="1.4" />
      <path d="M127 185c-11 11-15 34-10 60" stroke="#16213A" strokeOpacity=".85" strokeWidth="7" fill="none" />
      <path d="M122 182c-13 12-18 38-12 66" stroke="#46608F" strokeWidth="1.6" fill="none" />
      <path d="M132 188c-10 10-14 32-9 54" stroke="#35496F" strokeWidth="1.2" fill="none" />
      <path d="M120 196l10 4M114 214l10 4M112 232l10 4" stroke="#2A3B5E" strokeWidth="1" />
      {/* windrow: snow curling off the blade foot */}
      <path d="M108 250c-10-1-18-7-22-15" stroke="#2A3B5E" strokeWidth="1" />
      {/* ground line */}
      <path d="M56 252h348" stroke="#35496F" strokeWidth="1.2" />
      <path d="M56 264h348" stroke="#22314F" strokeWidth="1" strokeDasharray="6 5" />
      {/* amber node: the beacon on the cab */}
      <circle className="ta-amber" cx="244" cy="143" r="4" fill="#F6A328" />
    </svg>
  );
}

/** Landscaping: a plot plan with canopy circles, beds, and mow stripes. */
export function PlotPlanArt(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...frame(props)}>
      <Registration />
      {/* property boundary */}
      <rect x="64" y="54" width="332" height="230" stroke="#35496F" strokeWidth="1.2" strokeDasharray="7 5" />
      {/* house footprint, over a drop shadow */}
      <rect x="103" y="93" width="120" height="88" fill="#0A1120" opacity=".7" />
      <rect x="96" y="86" width="120" height="88" stroke="#46608F" strokeWidth="1.4" fill="#16213A" fillOpacity=".7" />
      <path d="M96 130h120" stroke="#2A3B5E" strokeWidth="1" />
      {/* walkway: double line from the door to the boundary */}
      <path d="M216 148h36v136M228 148h36v136" stroke="#2A3B5E" strokeWidth="1" />
      {/* tree canopies: double circles + center dot, plot-plan style */}
      <g stroke="#46608F" strokeWidth="1.2">
        <circle cx="330" cy="108" r="32" fill="#16213A" fillOpacity=".4" />
        <circle cx="330" cy="108" r="22" strokeWidth="1" opacity=".7" />
        <circle cx="122" cy="238" r="24" fill="#16213A" fillOpacity=".4" />
        <circle cx="122" cy="238" r="15" strokeWidth="1" opacity=".7" />
      </g>
      <g fill="#46608F">
        <circle cx="330" cy="108" r="2" />
        <circle cx="122" cy="238" r="2" />
      </g>
      {/* kidney planting bed along the lower right, even hatch */}
      <path d="M292 210c34-10 72-2 88 18 12 16 2 34-18 38-26 6-58-2-74-18-12-14-8-32 4-38z" stroke="#35496F" strokeWidth="1.2" fill="#16213A" fillOpacity=".4" />
      <g stroke="#22314F" strokeWidth="1">
        <path d="M300 212v50M320 206v56M340 206v54M360 210v46" />
      </g>
      {/* mow stripes: parallel passes on the open lawn, left of the walk */}
      <g stroke="#22314F" strokeWidth="1">
        <path d="M80 200l130 74M96 190l122 70M112 180l114 66" opacity=".85" />
      </g>
      {/* amber node: the bed getting planted this week */}
      <circle className="ta-amber" cx="336" cy="234" r="4" fill="#F6A328" />
    </svg>
  );
}

/** Electrical: a panel schedule, breakers in two columns, circuits fanning out. */
export function PanelArt(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...frame(props)}>
      <Registration />
      {/* panel cabinet over a drop shadow */}
      <rect x="96" y="63" width="180" height="230" rx="8" fill="#0A1120" opacity=".8" />
      <rect x="88" y="54" width="180" height="230" rx="8" stroke="#46608F" strokeWidth="1.4" fill="#16213A" fillOpacity=".7" />
      <text x="102" y="80" fill="#5E7BAE" fontSize="9" fontFamily="var(--font-mono, monospace)" letterSpacing="2">PANEL A</text>
      {/* main breaker */}
      <rect x="146" y="92" width="64" height="20" rx="3" stroke="#46608F" strokeWidth="1.2" fill="#22314F" />
      <text x="158" y="105" fill="#5E7BAE" fontSize="8" fontFamily="var(--font-mono, monospace)">200A</text>
      {/* breaker columns */}
      <path d="M178 120v148" stroke="#2A3B5E" strokeWidth="1" />
      <g stroke="#35496F" strokeWidth="1.2">
        <rect x="112" y="126" width="54" height="14" rx="2" fill="#22314F" fillOpacity=".9" />
        <rect x="112" y="150" width="54" height="14" rx="2" fill="#2A3B5E" fillOpacity=".9" />
        <rect x="112" y="174" width="54" height="14" rx="2" fill="#22314F" fillOpacity=".9" />
        <rect x="112" y="198" width="54" height="14" rx="2" fill="#2A3B5E" fillOpacity=".9" />
        <rect x="112" y="222" width="54" height="14" rx="2" fill="#22314F" fillOpacity=".9" />
        <rect x="190" y="126" width="54" height="14" rx="2" fill="#2A3B5E" fillOpacity=".9" />
        <rect x="190" y="150" width="54" height="14" rx="2" fill="#22314F" fillOpacity=".9" />
        <rect x="190" y="174" width="54" height="14" rx="2" fill="#2A3B5E" fillOpacity=".9" />
        <rect x="190" y="198" width="54" height="14" rx="2" fill="#22314F" fillOpacity=".9" />
        <rect x="190" y="222" width="54" height="14" rx="2" fill="#2A3B5E" fillOpacity=".9" />
      </g>
      {/* circuits fanning out to loads on the right; motion marches current
          down the conductors (ta-circuit), statics keep them solid */}
      <g className="ta-circuit" stroke="#2A3B5E" strokeWidth="1">
        <path d="M268 133h64l24-26h40" />
        <path d="M268 181h96" />
        <path d="M268 229h64l24 26h40" />
      </g>
      {/* load symbols: receptacle, light, motor */}
      <circle cx="404" cy="107" r="9" stroke="#46608F" strokeWidth="1.2" fill="#16213A" fillOpacity=".7" />
      <path d="M400 104v6M408 104v6" stroke="#46608F" strokeWidth="1.2" />
      <circle cx="372" cy="181" r="9" stroke="#46608F" strokeWidth="1.2" fill="#16213A" fillOpacity=".7" />
      <path d="M366 175l12 12M378 175l-12 12" stroke="#46608F" strokeWidth="1" />
      <circle cx="404" cy="255" r="9" stroke="#46608F" strokeWidth="1.2" fill="#16213A" fillOpacity=".7" />
      <text x="399" y="259" fill="#46608F" fontSize="9" fontFamily="var(--font-mono, monospace)">M</text>
      {/* ground symbol under the cabinet */}
      <path d="M178 284v14M170 298h16M173 303h10M176 308h4" stroke="#35496F" strokeWidth="1.2" />
      {/* amber node: the circuit added this week */}
      <circle className="ta-amber" cx="268" cy="181" r="4" fill="#F6A328" />
    </svg>
  );
}

/** Septic/Well: a section view, tank and drain field one side, well the other. */
export function TankFieldArt(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...frame(props)}>
      <Registration />
      {/* grade line: everything below is underground */}
      <path d="M40 128h380" stroke="#35496F" strokeWidth="1.2" />
      <path d="M40 136h380" stroke="#22314F" strokeWidth="1" strokeDasharray="6 5" />
      {/* house above grade, gable end */}
      <path d="M70 128v-44h64v44" stroke="#46608F" strokeWidth="1.4" fill="#16213A" fillOpacity=".6" />
      <path d="M62 84l40-26 40 26" stroke="#46608F" strokeWidth="1.4" fill="none" />
      {/* outlet line from house to tank */}
      <path d="M118 128l26 32h32" stroke="#35496F" strokeWidth="1.4" />
      {/* septic tank: two-compartment, risers to grade */}
      <rect x="184" y="150" width="96" height="56" rx="8" stroke="#46608F" strokeWidth="1.4" fill="#16213A" fillOpacity=".7" />
      <path d="M232 150v56" stroke="#35496F" strokeWidth="1" />
      <path d="M204 150v-22M258 150v-22" stroke="#35496F" strokeWidth="1.2" />
      <path d="M196 128h16M250 128h16" stroke="#46608F" strokeWidth="1.4" />
      {/* liquid level line inside the tank */}
      <path d="M188 172h88" stroke="#2A3B5E" strokeWidth="1" strokeDasharray="3 3" />
      {/* lateral to the drain field, then three dashed runs; motion drifts
          the dashes outward (ta-lateral), statics keep them dashed as drawn */}
      <path d="M280 178h36" stroke="#35496F" strokeWidth="1.4" />
      <g className="ta-lateral" stroke="#2A3B5E" strokeWidth="1" strokeDasharray="5 4">
        <path d="M316 162h76" />
        <path d="M316 178h76" />
        <path d="M316 194h76" />
      </g>
      <path d="M316 162v32" stroke="#35496F" strokeWidth="1.2" />
      {/* well: casing from grade down to the pump, cap above grade */}
      <path d="M352 128v-14h20v14" stroke="#46608F" strokeWidth="1.4" fill="#16213A" fillOpacity=".6" />
      <path d="M356 128v128M368 128v128" stroke="#46608F" strokeWidth="1.4" />
      <rect x="352" y="256" width="20" height="26" rx="4" stroke="#46608F" strokeWidth="1.2" fill="#22314F" />
      {/* static water level tick in the casing */}
      <path d="M348 216h28" stroke="#2A3B5E" strokeWidth="1" strokeDasharray="3 3" />
      {/* dimension line under the tank */}
      <g stroke="#2A3B5E" strokeWidth="1">
        <path d="M184 300h96" strokeDasharray="4 4" />
        <path d="M184 294v12M280 294v12" />
      </g>
      {/* amber node: the riser lid, the next-pumping-due tank */}
      <circle className="ta-amber" cx="204" cy="128" r="4" fill="#F6A328" />
    </svg>
  );
}

/** Restoration: a dry-down floor plan, moisture zone, air movers, dehu. */
export function DryDownArt(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...frame(props)}>
      <Registration />
      {/* room outline over a footprint shadow */}
      <rect x="72" y="63" width="300" height="212" fill="#0A1120" opacity=".7" />
      <rect x="64" y="54" width="300" height="212" fill="#16213A" fillOpacity=".5" stroke="#46608F" strokeWidth="1.4" />
      {/* interior wall + door swing */}
      <path d="M244 54v84M244 190v76" stroke="#35496F" strokeWidth="1.2" />
      <path d="M244 138a52 52 0 0 1 52 52" stroke="#46608F" strokeWidth="1" fill="none" />
      <path d="M244 138v52" stroke="#46608F" strokeWidth="1" />
      {/* moisture zone: irregular boundary with hatch, along the left wall */}
      <path d="M64 108c34-8 62 6 74 30 12 26 4 58-16 76-18 16-42 18-58 10z" stroke="#5E7BAE" strokeWidth="1.2" strokeDasharray="5 4" fill="#16213A" fillOpacity=".55" />
      <g stroke="#22314F" strokeWidth="1">
        <path d="M70 122l52 52M66 146l46 46M64 172l34 34M78 112l52 52M96 108l44 44" />
      </g>
      {/* air movers: circle fans aimed at the zone */}
      <g stroke="#46608F" strokeWidth="1.2">
        <circle cx="196" cy="112" r="13" fill="#16213A" fillOpacity=".7" />
        <circle cx="210" cy="216" r="13" fill="#16213A" fillOpacity=".7" />
      </g>
      {/* blades spin (ta-fan) and the arcs stream toward the wet zone
          (ta-air) in motion contexts; statics render as drawn */}
      <path className="ta-fan" d="M196 105v14M189 112h14" stroke="#35496F" strokeWidth="1" />
      <path className="ta-fan ta-fan2" d="M210 209v14M203 216h14" stroke="#35496F" strokeWidth="1" />
      {/* airflow arcs from each fan toward the wet zone */}
      <g className="ta-air" stroke="#2A3B5E" strokeWidth="1" fill="none">
        <path d="M180 106c-18-2-34 2-46 10M182 118c-16 2-30 10-40 20" />
        <path d="M194 212c-16-6-30-16-38-28M198 224c-18-2-34-10-44-22" />
      </g>
      {/* dehumidifier in the far room, drain line to the door */}
      <rect x="292" y="86" width="44" height="60" rx="6" stroke="#46608F" strokeWidth="1.2" fill="#22314F" fillOpacity=".9" />
      <path d="M300 98h28M300 110h28" stroke="#2A3B5E" strokeWidth="1" />
      <text x="296" y="136" fill="#46608F" fontSize="8" fontFamily="var(--font-mono, monospace)" letterSpacing="1">DEHU</text>
      {/* moisture reading callout */}
      <path d="M108 160l58 -18" stroke="#2A3B5E" strokeWidth="1" />
      <text x="170" y="140" fill="#5E7BAE" fontSize="9" fontFamily="var(--font-mono, monospace)">MC 18%</text>
      {/* day-count dimension line under the plan */}
      <g stroke="#2A3B5E" strokeWidth="1">
        <path d="M64 292h300" strokeDasharray="4 4" />
        <path d="M64 286v12M364 286v12" />
      </g>
      <text x="196" y="312" fill="#46608F" fontSize="9" fontFamily="var(--font-mono, monospace)" letterSpacing="2">DAY 3</text>
      {/* amber node: the sensor reading logged this hour */}
      <circle className="ta-amber" cx="108" cy="160" r="4" fill="#F6A328" />
    </svg>
  );
}

/** MN-ITS Helper: a claim form in a browser window whose data-flow arrows
 *  loop entirely inside a dashed machine boundary (the credibility-strip
 *  schematic from the imagery doc, promoted to the /mn-its page hero).
 *  Amber marks the stays-local node. */
export function LocalOnlyArt(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...frame(props)}>
      <Registration />
      {/* the machine boundary: everything lives inside this dashed line */}
      <rect x="56" y="48" width="348" height="234" rx="12" stroke="#35496F" strokeWidth="1.2" strokeDasharray="7 5" />
      <text x="72" y="272" fill="#46608F" fontSize="9" fontFamily="var(--font-mono, monospace)" letterSpacing="2">YOUR MACHINE</text>
      {/* browser window with a claim form, over a drop shadow */}
      <rect x="99" y="84" width="184" height="150" rx="7" fill="#0A1120" opacity=".8" />
      <rect x="92" y="76" width="184" height="150" rx="7" fill="#16213A" fillOpacity=".7" stroke="#46608F" strokeWidth="1.2" />
      <path d="M92 100h184" stroke="#2A3B5E" strokeWidth="1" />
      <circle cx="104" cy="88" r="3" stroke="#35496F" strokeWidth="1" />
      <circle cx="116" cy="88" r="3" stroke="#35496F" strokeWidth="1" />
      <text x="130" y="91" fill="#46608F" fontSize="8" fontFamily="var(--font-mono, monospace)" letterSpacing="1.5">MN-ITS CLAIM</text>
      <g fill="#2A3B5E">
        <rect x="106" y="114" width="100" height="5" rx="2" />
        <rect x="106" y="132" width="140" height="5" rx="2" />
        <rect x="106" y="150" width="84" height="5" rx="2" />
        <rect x="106" y="168" width="120" height="5" rx="2" />
      </g>
      <rect x="106" y="192" width="64" height="18" rx="4" stroke="#46608F" strokeWidth="1" fill="#22314F" fillOpacity=".9" />
      <text x="116" y="204" fill="#5E7BAE" fontSize="8" fontFamily="var(--font-mono, monospace)">REVIEW</text>
      {/* preset store: a small card stack beside the window */}
      <rect x="308" y="112" width="72" height="88" rx="6" stroke="#46608F" strokeWidth="1.2" fill="#16213A" fillOpacity=".7" />
      <rect x="316" y="104" width="72" height="88" rx="6" stroke="#35496F" strokeWidth="1" fill="#0E1729" />
      <g fill="#2A3B5E">
        <rect x="328" y="120" width="48" height="5" rx="2" />
        <rect x="328" y="136" width="36" height="5" rx="2" />
        <rect x="328" y="152" width="44" height="5" rx="2" />
      </g>
      <text x="326" y="180" fill="#46608F" fontSize="8" fontFamily="var(--font-mono, monospace)" letterSpacing="1">PRESETS</text>
      {/* data-flow arrows: presets to form and back, looping INSIDE the boundary */}
      <path d="M316 148h-28M288 148l8-5M288 148l8 5" stroke="#5E7BAE" strokeWidth="1.2" />
      <path d="M276 216c40 26 88 12 76-24" stroke="#35496F" strokeWidth="1" strokeDasharray="3 4" fill="none" />
      <path d="M352 192l0 10M352 192l7 7" stroke="#35496F" strokeWidth="1" />
      {/* the stays-local node: amber, ON the boundary loop, going nowhere */}
      <circle className="ta-amber" cx="330" cy="234" r="4" fill="#F6A328" />
      <text x="288" y="252" fill="#5E7BAE" fontSize="8" fontFamily="var(--font-mono, monospace)" letterSpacing="1">NO EGRESS</text>
    </svg>
  );
}
