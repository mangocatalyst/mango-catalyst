import localFont from "next/font/local";

/**
 * Both families are bundled in the repo (latin variable subsets, OFL licensed,
 * license texts sit next to the woff2 files). next/font self-hosts them at
 * build time: no third-party font request at runtime, no layout shift.
 */

/** Body / UI face: Inter Variable (locked brand default). */
export const inter = localFont({
  src: "./fonts/Inter-Variable-latin.woff2",
  weight: "100 900",
  style: "normal",
  display: "swap",
  variable: "--font-inter",
});

/**
 * Display face for headlines: Big Shoulders, a condensed industrial gothic
 * drawn for Chicago, "City of the Big Shoulders". Workshop poster energy,
 * reads built rather than generated. Alternate on file: Archivo (expanded
 * width, black weights).
 */
export const bigShoulders = localFont({
  src: "./fonts/BigShoulders-Variable-latin.woff2",
  weight: "100 900",
  style: "normal",
  display: "swap",
  variable: "--font-big-shoulders",
});
