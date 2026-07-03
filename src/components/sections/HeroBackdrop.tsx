/**
 * Hero backdrop: "Top Sheet Dispatch" (Bryan's pick, winner H1).
 *
 * A dispatch-board acetate sheet with a job-ticket sheet and an invoice sheet.
 * Server component, zero client JS, pure SVG as JSX. Rendered as an
 * aria-hidden absolute layer at 25% opacity, composed right-of-center so the
 * H1/subhead/CTA column (left ~55%) stays quiet.
 *
 * Motion ("the desk clears itself", CSS only, desktop + motion-ok only):
 * the two support sheets start stacked ON TOP of the dispatch board, then
 * each slides and rotates to its final peeking position underneath. The
 * over-to-under restack is done by crossfading duplicated layers: each sheet
 * exists twice, once below the board (the final artwork) and once above it
 * (the animated pile copy). Both copies ride identical transform keyframes,
 * so during the late-flight crossfade they are perfectly registered and the
 * sheet reads as tucking under the translucent board edge. After the
 * entrance, only two ambient details move: the now-line breathes (~14s) and
 * the amber chip outline redraws (~20s with long rests).
 *
 * Mobile and prefers-reduced-motion get the finished static composition:
 * the under copies carry the final pose as attribute transforms and the top
 * copies are opacity 0 by default, so with no animation applied the render
 * is exactly the approved static artwork.
 *
 * Coordinates are the approved 1440x560 artwork rebased by (-770, -70) into
 * a tight 650x500 viewBox, so the layer can be sized and anchored without
 * slice-cropping surprises. Relative geometry is unchanged.
 */

/** Job-ticket sheet, 300x310, drawn at local origin. */
function TicketSheet() {
  return (
    <>
      <rect
        x="0"
        y="0"
        width="300"
        height="310"
        rx="2"
        fill="#16213A"
        fillOpacity=".5"
        stroke="#2A3B5E"
        strokeOpacity=".9"
      />
      <line x1="0" y1="0" x2="0" y2="310" stroke="#5E7BAE" strokeOpacity=".3" />
      <rect x="16" y="18" width="96" height="8" rx="2" fill="#35496F" fillOpacity=".9" />
      <g stroke="#2A3B5E" strokeOpacity=".8">
        <line x1="16" y1="48" x2="284" y2="48" />
        <line x1="16" y1="72" x2="284" y2="72" />
        <line x1="16" y1="96" x2="284" y2="96" />
        <line x1="16" y1="120" x2="284" y2="120" />
        <line x1="16" y1="144" x2="284" y2="144" />
        <line x1="16" y1="168" x2="284" y2="168" />
        <line x1="16" y1="192" x2="284" y2="192" />
        <line x1="16" y1="216" x2="284" y2="216" />
        <line x1="16" y1="240" x2="284" y2="240" />
        <line x1="16" y1="264" x2="284" y2="264" />
        <line x1="16" y1="288" x2="180" y2="288" />
      </g>
    </>
  );
}

/** Invoice sheet, 320x330, drawn at local origin. */
function InvoiceSheet() {
  return (
    <>
      <rect
        x="0"
        y="0"
        width="320"
        height="330"
        rx="2"
        fill="#16213A"
        fillOpacity=".5"
        stroke="#2A3B5E"
        strokeOpacity=".9"
      />
      <line x1="0" y1="330" x2="320" y2="330" stroke="#5E7BAE" strokeOpacity=".22" />
      <g stroke="#2A3B5E" strokeOpacity=".7">
        <line x1="20" y1="44" x2="300" y2="44" />
        <line x1="20" y1="70" x2="300" y2="70" />
        <line x1="20" y1="96" x2="300" y2="96" />
        <line x1="20" y1="122" x2="300" y2="122" />
        <line x1="20" y1="148" x2="300" y2="148" />
        <line x1="20" y1="174" x2="300" y2="174" />
        <line x1="20" y1="200" x2="300" y2="200" />
      </g>
      <line x1="160" y1="252" x2="300" y2="252" stroke="#35496F" strokeOpacity=".9" />
      <g fill="#2A3B5E">
        <rect x="170" y="266" width="36" height="5" rx="2.5" />
        <rect x="250" y="266" width="50" height="5" rx="2.5" />
        <rect x="170" y="280" width="44" height="5" rx="2.5" />
        <rect x="244" y="280" width="56" height="5" rx="2.5" />
      </g>
      <line x1="160" y1="294" x2="300" y2="294" stroke="#35496F" />
      <rect x="170" y="302" width="32" height="7" rx="2" fill="#35496F" />
      <rect x="230" y="302" width="70" height="7" rx="2" fill="#46608F" />
    </>
  );
}

export function HeroBackdrop() {
  return (
    <div aria-hidden className="hero-art">
      <svg viewBox="0 0 650 500" preserveAspectRatio="xMidYMid meet">
        {/* Final artwork copies: peek from under the dispatch board. */}
        <g
          className="hero-sheet hero-sheet-a-under"
          transform="translate(30 14) rotate(2.2)"
        >
          <TicketSheet />
        </g>
        <g
          className="hero-sheet hero-sheet-b-under"
          transform="translate(310 140) rotate(2.5)"
        >
          <InvoiceSheet />
        </g>

        {/* Dispatch board acetate. Static except the two ambient details. */}
        <g transform="translate(60 48) rotate(-1.6)">
          <rect
            x="0"
            y="0"
            width="560"
            height="352"
            rx="2"
            fill="#22314F"
            fillOpacity=".55"
            stroke="#2A3B5E"
            strokeOpacity=".9"
          />
          <line x1="0" y1="0" x2="0" y2="352" stroke="#5E7BAE" strokeOpacity=".35" />
          <line x1="118" y1="0" x2="118" y2="352" stroke="#2A3B5E" />
          <line x1="0" y1="44" x2="560" y2="44" stroke="#2A3B5E" />
          <g stroke="#35496F" strokeOpacity=".9">
            <line x1="122" y1="34" x2="122" y2="44" />
            <line x1="170" y1="34" x2="170" y2="44" />
            <line x1="218" y1="34" x2="218" y2="44" />
            <line x1="266" y1="34" x2="266" y2="44" />
            <line x1="314" y1="34" x2="314" y2="44" />
            <line x1="362" y1="34" x2="362" y2="44" />
            <line x1="410" y1="34" x2="410" y2="44" />
            <line x1="458" y1="34" x2="458" y2="44" />
            <line x1="506" y1="34" x2="506" y2="44" />
            <line x1="554" y1="34" x2="554" y2="44" />
          </g>
          <text className="hero-art-lbl" x="122" y="28" textAnchor="middle">
            8a
          </text>
          <text className="hero-art-lbl" x="218" y="28" textAnchor="middle">
            10a
          </text>
          <text className="hero-art-lbl" x="314" y="28" textAnchor="middle">
            12p
          </text>
          <text className="hero-art-lbl" x="410" y="28" textAnchor="middle">
            2p
          </text>
          <text className="hero-art-lbl" x="506" y="28" textAnchor="middle">
            4p
          </text>
          <g stroke="#2A3B5E" strokeOpacity=".3">
            <line x1="170" y1="44" x2="170" y2="344" />
            <line x1="218" y1="44" x2="218" y2="344" />
            <line x1="266" y1="44" x2="266" y2="344" />
            <line x1="314" y1="44" x2="314" y2="344" />
            <line x1="362" y1="44" x2="362" y2="344" />
            <line x1="410" y1="44" x2="410" y2="344" />
            <line x1="458" y1="44" x2="458" y2="344" />
            <line x1="506" y1="44" x2="506" y2="344" />
          </g>
          <g stroke="#2A3B5E" strokeOpacity=".8">
            <line x1="0" y1="104" x2="560" y2="104" />
            <line x1="0" y1="164" x2="560" y2="164" />
            <line x1="0" y1="224" x2="560" y2="224" />
            <line x1="0" y1="284" x2="560" y2="284" />
          </g>
          <g fill="none" stroke="#35496F" strokeOpacity=".9">
            <circle cx="26" cy="74" r="8" />
            <circle cx="26" cy="134" r="8" />
            <circle cx="26" cy="194" r="8" />
            <circle cx="26" cy="254" r="8" />
            <circle cx="26" cy="314" r="8" />
          </g>
          <g fill="#2A3B5E">
            <rect x="44" y="70.5" width="58" height="7" rx="3.5" />
            <rect x="44" y="130.5" width="50" height="7" rx="3.5" />
            <rect x="44" y="190.5" width="62" height="7" rx="3.5" />
            <rect x="44" y="250.5" width="46" height="7" rx="3.5" />
            <rect x="44" y="310.5" width="54" height="7" rx="3.5" />
          </g>
          <g fill="#2A3B5E" fillOpacity=".45" stroke="#35496F" strokeOpacity=".85">
            <rect x="134" y="57" width="88" height="34" rx="5" />
            <rect x="262" y="57" width="120" height="34" rx="5" />
            <rect x="426" y="57" width="76" height="34" rx="5" />
            <rect x="146" y="117" width="104" height="34" rx="5" />
            <rect x="306" y="117" width="64" height="34" rx="5" />
            <rect x="126" y="177" width="72" height="34" rx="5" />
            <rect x="238" y="177" width="152" height="34" rx="5" />
            <rect x="416" y="177" width="92" height="34" rx="5" />
            <rect x="158" y="237" width="116" height="34" rx="5" />
            <rect x="356" y="237" width="72" height="34" rx="5" />
            <rect x="486" y="237" width="58" height="34" rx="5" />
            <rect x="132" y="297" width="92" height="34" rx="5" />
            <rect x="300" y="297" width="60" height="34" rx="5" />
            <rect x="398" y="297" width="132" height="34" rx="5" />
          </g>
          <rect
            className="hero-art-chip"
            x="452"
            y="117"
            width="64"
            height="34"
            rx="5"
            fill="#F6A328"
            fillOpacity=".1"
            stroke="#F6A328"
            strokeOpacity=".85"
          />
          <line
            className="hero-art-nowline"
            x1="386"
            y1="30"
            x2="386"
            y2="346"
            stroke="#5E7BAE"
            strokeOpacity=".6"
            strokeWidth="1.2"
          />
        </g>

        {/* Pile copies: stacked on the board at load, opacity 0 whenever the
            entrance animation is not running. */}
        <g
          className="hero-sheet hero-sheet-top hero-sheet-a-top"
          transform="translate(150 84) rotate(-3)"
        >
          <TicketSheet />
        </g>
        <g
          className="hero-sheet hero-sheet-top hero-sheet-b-top"
          transform="translate(235 60) rotate(-1.2)"
        >
          <InvoiceSheet />
        </g>
      </svg>
    </div>
  );
}
