"use client";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

/**
 * Vercel Analytics + Speed Insights behind a per-device opt-out (Vercel has
 * no IP exclusion). Visit any page once with ?va-disable in the URL and that
 * browser sets a localStorage flag and never reports again. Owner devices
 * only; there is no UI for it on purpose.
 */
function optedOut(url: string): boolean {
  if (url.includes("va-disable")) {
    localStorage.setItem("va-disable", "1");
    return true;
  }
  return localStorage.getItem("va-disable") !== null;
}

export function AnalyticsGate() {
  return (
    <>
      <Analytics beforeSend={(e) => (optedOut(e.url) ? null : e)} />
      <SpeedInsights beforeSend={(e) => (optedOut(e.url) ? null : e)} />
    </>
  );
}
