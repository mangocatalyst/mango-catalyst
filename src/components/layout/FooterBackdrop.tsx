/**
 * Footer backdrop: "The Chart Sheet" (Bryan's pick, winner F1), 2026-07-06
 * recompose. Inked straight onto the deep navy band: the Lake Superior
 * coastline, the small peninsula, and the amber period on Duluth. The
 * compass rose and the tiny DULUTH label are gone. Aria-hidden absolute
 * layer at 25% opacity behind the footer content.
 *
 * The footer's real NAP line ("Mango Catalyst · Duluth, MN") is the dot's
 * label now: FooterLive translates the svg so the dot (469.4, 419.4 in
 * viewBox units) sits just left of that line on desktop; mobile keeps the
 * static centered composition. The zoom-toward-Duluth entrance and sonar
 * ring are also gone (the zoomed hold cropped the lake mid-line at the svg
 * edge); the only motion left is the dot's faint always-on pulse in CSS,
 * which shows the complete lake at rest on every screen width.
 */
import { FooterLive } from "@/components/layout/FooterLive";

export function FooterBackdrop() {
  return (
    <div aria-hidden className="footer-art">
      <svg viewBox="0 0 1440 560" preserveAspectRatio="xMidYMid meet">
        <g>

          {/* Lake Superior coastline */}
          <path
            d="M469.4 419.4 L493.9 392.6 L513.0 379.9 L541.8 351.5 L568.3 327.8 L600.2 307.3 L632.1 280.4 L655.5 266.2 L685.3 252.0 L717.2 236.2 L736.3 225.1 L759.7 217.2 L777.8 199.8 L788.5 177.7 L802.3 161.9 L820.4 180.9 L850.1 138.2 L866.1 101.9 L887.3 82.9 L911.8 89.2 L945.8 98.7 L988.4 101.9 L1030.9 109.8 L1068.1 103.4 L1100.0 124.0 L1121.3 155.6 L1137.2 196.7 L1169.1 228.3 L1201.0 236.2 L1227.6 233.0 L1248.9 256.7 L1264.8 288.3 L1262.7 327.8 L1270.2 367.3 L1277.6 398.9 L1288.2 430.5 L1291.4 454.2 L1270.2 468.4 L1243.6 465.3 L1227.6 446.3 L1226.6 419.4 L1195.7 422.6 L1158.5 433.7 L1116.0 435.2 L1078.7 454.2 L1046.8 471.6 L1014.9 466.8 L988.4 462.1 L968.2 455.8 L932.0 411.5 L898.0 395.7 L876.7 389.4 L862.9 405.2 L855.4 421.0 L852.3 406.8 L856.5 387.8 L882.0 351.5 L903.3 335.7 L919.2 323.1 L937.3 315.2 L913.9 307.3 L886.3 310.4 L860.8 324.6 L837.4 351.5 L807.6 375.2 L784.2 391.0 L764.0 403.6 L722.5 410.0 L687.4 416.3 L648.1 428.9 L621.5 443.1 L597.0 447.9 L602.4 422.6 L606.6 387.8 L610.9 383.1 L573.7 406.8 L541.8 417.9 L499.2 430.5 L476.9 428.9 Z"
            fill="#0A1120"
            fillOpacity="0.35"
            stroke="#46608F"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          <path
            d="M773.6 248.8 L802.3 220.4 L837.4 203.0 L857.6 195.1 L831.0 215.6 L797.0 236.2 Z"
            fill="#22314F"
            fillOpacity="0.5"
            stroke="#46608F"
            strokeWidth="0.8"
            strokeLinejoin="round"
          />

          {/* Duluth: the amber period. The NAP line in the footer is its label. */}
          <circle className="footer-dot" cx="469.4" cy="419.4" r="3.2" fill="#F6A328" />
        </g>
      </svg>
      <FooterLive />
    </div>
  );
}
