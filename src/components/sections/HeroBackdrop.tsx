/**
 * Hero backdrop: "The Missing Link" (Bryan's pick, round 5 F1/V1 merge,
 * 2026-07-03). Supersedes "Top Sheet Dispatch".
 *
 * A CSS-3D light table: four translucent acetate sheets telling one job's
 * story (call log, dispatch board, job ticket, invoice) layered in depth
 * under a gentle perspective, plus a single amber link line that draws
 * itself through the real-world flow: call comes in, job hits the dispatch
 * board, crew gets the ticket, invoice goes out. The link (line + junction
 * nodes + tracer) is the ONE amber element; the dispatch now-line is navy.
 *
 * Motion (desktop + motion-ok only):
 * sheets slide into registration and settle within ~1.6s of load, then the
 * amber link draws slowly (2.2s to 5.6s) with a small ring flash as it
 * reaches each document. Ambient after that: the whole plane floats, chips
 * and the call waveform pulse, the navy now-line creeps, and an amber tracer
 * rides the link every 16s (the job moving through the system). A tiny
 * HeroTilt client component tilts the plane a few degrees toward the cursor
 * anywhere over the hero (a client component, not an inline script, so it
 * still runs after client-side navigations).
 *
 * Static rule (mobile, prefers-reduced-motion, no-JS): every animated
 * property's base value is the settled composition with the link fully
 * drawn, so with the motion media gate closed this renders as the finished
 * still. The 25%-in-context dimming is a solid bg-base veil ON TOP of the
 * art instead of opacity on the wrapper, because CSS opacity on an ancestor
 * flattens transform-style: preserve-3d.
 *
 * Plane is a fixed 660x430 design space, scaled per breakpoint in CSS.
 */
import { HeroTilt } from "@/components/sections/HeroTilt";

/** Call log sheet, 190x130 design space (rendered 220x150). */
function CallLogSheet() {
  return (
    <svg className="hb-sheet hb-e1" width="220" height="150" viewBox="0 0 190 130">
      <rect x="10" y="12" width="176" height="114" rx="6" fill="#0A1120" opacity=".8" />
      <rect x="4" y="4" width="176" height="114" rx="6" fill="#16213A" fillOpacity=".8" stroke="#2A3B5E" strokeWidth="1" />
      <text className="hb-t9" x="15" y="22" fill="#5E7BAE">
        CALL LOG
      </text>
      <text className="hb-t" x="120" y="22" fill="#46608F">
        08:02
      </text>
      <path
        transform="translate(15,34) scale(1.1)"
        d="M3 1 C2 1 1 2 1 3 c0 9 6 15 15 15 1 0 2 -1 2 -2 v-3 l-4 -2 -2 2 c-3 -1 -5 -3 -6 -6 l2 -2 -2 -4 z"
        fill="#46608F"
      />
      <g fill="#35496F" className="hb-wave">
        <rect x="52" y="42" width="3" height="8" />
        <rect x="59" y="38" width="3" height="16" />
        <rect x="66" y="34" width="3" height="24" />
        <rect x="73" y="40" width="3" height="12" />
        <rect x="80" y="36" width="3" height="20" />
        <rect x="87" y="42" width="3" height="8" />
        <rect x="94" y="38" width="3" height="16" />
        <rect x="101" y="43" width="3" height="6" />
      </g>
      <rect x="15" y="70" width="110" height="5" rx="2" fill="#2A3B5E" />
      <rect x="15" y="82" width="84" height="5" rx="2" fill="#22314F" />
      <text className="hb-t" x="15" y="106" fill="#35496F">
        INBOUND : NEW REQUEST
      </text>
    </svg>
  );
}

/** Invoice summary sheet, 280x210. */
function InvoiceSheet() {
  return (
    <svg className="hb-sheet hb-e2" width="280" height="210" viewBox="0 0 280 210">
      <rect x="13" y="15" width="258" height="182" rx="6" fill="#0A1120" opacity=".85" />
      <rect x="5" y="5" width="258" height="182" rx="6" fill="#0E1729" fillOpacity=".92" stroke="#35496F" strokeWidth="1" />
      <text className="hb-t9" x="16" y="24" fill="#46608F">
        INV 2209 SUMMARY
      </text>
      <path d="M24 168h224M24 44v124" stroke="#35496F" strokeWidth="1" />
      <g stroke="#46608F" strokeOpacity=".4" strokeWidth="1">
        <rect x="36" y="112" width="18" height="56" fill="#22314F" fillOpacity=".9" />
        <rect x="64" y="84" width="18" height="84" fill="#2A3B5E" fillOpacity=".9" />
        <rect x="92" y="128" width="18" height="40" fill="#22314F" fillOpacity=".9" />
        <rect x="120" y="68" width="18" height="100" fill="#35496F" fillOpacity=".9" />
        <rect x="148" y="100" width="18" height="68" fill="#2A3B5E" fillOpacity=".9" />
        <rect x="176" y="120" width="18" height="48" fill="#22314F" fillOpacity=".9" />
        <rect x="204" y="80" width="18" height="88" fill="#2A3B5E" fillOpacity=".9" />
      </g>
      <path d="M24 92h224" stroke="#46608F" strokeWidth="1" strokeDasharray="3 4" opacity=".55" />
      <text className="hb-t" x="16" y="184" fill="#35496F">
        SENT : PAID
      </text>
    </svg>
  );
}

/** Job ticket sheet, 210x150. */
function TicketSheet() {
  return (
    <svg className="hb-sheet hb-e3" width="210" height="150" viewBox="0 0 210 150">
      <rect x="11" y="13" width="192" height="126" rx="6" fill="#0A1120" opacity=".85" />
      <rect x="4" y="4" width="192" height="126" rx="6" fill="#16213A" fillOpacity=".88" stroke="#46608F" strokeWidth="1" strokeOpacity=".8" />
      <rect x="4" y="4" width="192" height="22" rx="6" fill="#2A3B5E" fillOpacity=".78" />
      <text className="hb-t" x="14" y="18" fill="#5E7BAE">
        JOB TICKET 4418
      </text>
      <rect x="14" y="38" width="118" height="5" rx="2" fill="#2A3B5E" fillOpacity=".9" />
      <rect x="14" y="50" width="88" height="5" rx="2" fill="#22314F" fillOpacity=".95" />
      <rect x="14" y="62" width="104" height="5" rx="2" fill="#2A3B5E" fillOpacity=".9" />
      <path d="M14 80h172" stroke="#35496F" strokeWidth="1" strokeDasharray="4 3" />
      <rect x="14" y="92" width="70" height="5" rx="2" fill="#22314F" fillOpacity=".95" />
      <rect x="14" y="104" width="54" height="5" rx="2" fill="#2A3B5E" fillOpacity=".9" />
      <circle cx="162" cy="104" r="19" fill="none" stroke="#46608F" strokeWidth="1.2" opacity=".85" />
      <circle cx="162" cy="104" r="13" fill="none" stroke="#35496F" strokeWidth="1" opacity=".8" />
    </svg>
  );
}

/** Dispatch board sheet, 430x280. Front of the stack, sized per Bryan. */
function DispatchSheet() {
  return (
    <svg className="hb-sheet hb-e4" width="430" height="280" viewBox="0 0 430 280">
      <rect x="16" y="18" width="404" height="252" rx="7" fill="#0A1120" opacity=".85" />
      <rect x="6" y="6" width="404" height="252" rx="7" fill="#16213A" fillOpacity=".9" stroke="#46608F" strokeWidth="1.2" />
      <rect x="6" y="6" width="404" height="28" rx="7" fill="#22314F" fillOpacity=".92" />
      <text className="hb-t9" x="18" y="24" fill="#5E7BAE">
        DISPATCH BOARD 07
      </text>
      <text className="hb-t" x="356" y="23" fill="#46608F">
        WK 27
      </text>
      <path d="M92 40v5M126 40v5M160 40v5M194 40v5M228 40v5M262 40v5M296 40v5M330 40v5M364 40v5M398 40v5" stroke="#35496F" strokeWidth="1" />
      <text className="hb-t" x="87" y="57" fill="#35496F">
        08
      </text>
      <text className="hb-t" x="223" y="57" fill="#35496F">
        12
      </text>
      <text className="hb-t" x="359" y="57" fill="#35496F">
        16
      </text>
      <path d="M12 106h392M12 152h392M12 198h392" stroke="#22314F" strokeWidth="1" />
      <path d="M80 62v186" stroke="#2A3B5E" strokeWidth="1" opacity=".8" />
      <text className="hb-t" x="20" y="88" fill="#46608F">
        T1
      </text>
      <text className="hb-t" x="20" y="134" fill="#46608F">
        T2
      </text>
      <text className="hb-t" x="20" y="180" fill="#46608F">
        T3
      </text>
      <text className="hb-t" x="20" y="226" fill="#46608F">
        T4
      </text>
      <g stroke="#46608F" strokeOpacity=".45" strokeWidth="1">
        <rect x="95" y="74" width="72" height="20" rx="4" fill="#2A3B5E" fillOpacity=".92" />
        <rect x="185" y="74" width="46" height="20" rx="4" fill="#35496F" fillOpacity=".92" />
        <rect x="300" y="74" width="60" height="20" rx="4" fill="#22314F" fillOpacity=".92" />
        <rect className="hb-blip1" x="112" y="120" width="88" height="20" rx="4" fill="#22314F" fillOpacity=".92" />
        <rect x="240" y="120" width="42" height="20" rx="4" fill="#2A3B5E" fillOpacity=".92" />
        <rect x="95" y="166" width="44" height="20" rx="4" fill="#2A3B5E" fillOpacity=".92" />
        <rect x="156" y="166" width="84" height="20" rx="4" fill="#35496F" fillOpacity=".92" />
        <rect x="272" y="166" width="52" height="20" rx="4" fill="#22314F" fillOpacity=".92" />
        <rect x="128" y="212" width="66" height="20" rx="4" fill="#2A3B5E" fillOpacity=".92" />
        <rect className="hb-blip2" x="216" y="212" width="46" height="20" rx="4" fill="#35496F" fillOpacity=".92" />
      </g>
      <path className="hb-now" d="M250 44v208M244 35l6 9 6-9z" fill="#5E7BAE" stroke="#5E7BAE" strokeWidth="1.3" />
      <text className="hb-t" x="18" y="250" fill="#35496F">
        CAP 82
      </text>
    </svg>
  );
}

/* The link route in plane coordinates. Flow order: call -> dispatch ->
   ticket -> invoice. Node arrival fractions of total path length (721px):
   0, .255, .563, 1.0; the flash delays in CSS are derived from these. */
const LINK_ROUTE =
  "M208 96 L208 182 L306 182 L306 310 L258 310 L258 356 L420 356 L420 264 L481 264";

export function HeroBackdrop() {
  return (
    <>
      <div aria-hidden className="hero-art">
        <div className="hb-persp">
          <div className="hb-float">
            <div className="hb-plane">
              <div className="hb-layer hb-l1">
                <CallLogSheet />
              </div>
              <div className="hb-layer hb-l2">
                <InvoiceSheet />
              </div>
              <div className="hb-layer hb-l3">
                <TicketSheet />
              </div>
              <div className="hb-layer hb-l4">
                <DispatchSheet />
              </div>
              <div className="hb-layer hb-l5">
                <svg className="hb-link" width="660" height="430" viewBox="0 0 660 430">
                  <path className="hb-link-path" d={LINK_ROUTE} pathLength="100" />
                  <circle className="hb-ring hb-ring1" cx="208" cy="96" r="5" />
                  <circle className="hb-ring hb-ring2" cx="306" cy="182" r="5" />
                  <circle className="hb-ring hb-ring3" cx="258" cy="356" r="5" />
                  <circle className="hb-ring hb-ring4" cx="481" cy="264" r="5" />
                  <circle className="hb-node hb-n1" cx="208" cy="96" r="4" />
                  <circle className="hb-node hb-n2" cx="306" cy="182" r="4" />
                  <circle className="hb-node hb-n3" cx="258" cy="356" r="4" />
                  <circle className="hb-node hb-n4" cx="481" cy="264" r="4" />
                </svg>
                <div className="hb-tracer" />
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
