"use client";

import { useEffect } from "react";

/** The Duluth point (469.4, 419.4) as fractions of the 1440x560 viewBox. */
const DOT_X = 469.4 / 1440;
const DOT_Y = 419.4 / 560;

/**
 * Aligns the chart backdrop to the footer's NAP line: translates the svg so
 * the amber Duluth dot sits just left of "Mango Catalyst · Duluth, MN",
 * which acts as the dot's label (the svg DULUTH label was removed for it).
 * Desktop only; mobile keeps the static centered composition, matching the
 * old motion gate. Re-runs on footer resize (breakpoint changes, font load,
 * privacy-line wrapping all land there).
 */
export function FooterLive() {
  useEffect(() => {
    const svg = document.querySelector<SVGSVGElement>(".footer-art svg");
    const nap = document.querySelector("[data-footer-nap]");
    const footer = nap?.closest("footer");
    if (!svg || !nap || !footer) return;

    const align = () => {
      svg.style.transform = "";
      if (!matchMedia("(min-width: 48rem)").matches) return;
      const n = nap.getBoundingClientRect();
      const s = svg.getBoundingClientRect();
      const dx = n.left - 16 - (s.left + s.width * DOT_X);
      const dy = n.top + n.height / 2 - (s.top + s.height * DOT_Y);
      svg.style.transform = `translate(${dx}px, ${dy}px)`;
    };

    align();
    const ro = new ResizeObserver(align);
    ro.observe(footer);
    return () => ro.disconnect();
  }, []);

  return null;
}
