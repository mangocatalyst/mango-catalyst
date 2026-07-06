"use client";

import { useEffect, useId } from "react";
import { ensureCalInit } from "@/lib/cal";

/**
 * Inline Cal.com booker that auto-resizes to its content (the embed posts
 * height messages, so there is no inner scrollbar). Month view only, so the
 * closed hours never render. Falls back to nothing when NEXT_PUBLIC_CAL_URL is
 * unset; callers that need a visible fallback render their own copy alongside.
 */
export function CalInline({ className }: { className?: string }) {
  const id = "cal-" + useId().replace(/:/g, "");

  useEffect(() => {
    const c = ensureCalInit();
    if (!c) return;
    c.Cal("inline", {
      elementOrSelector: "#" + id,
      calLink: c.link,
      config: { layout: "month_view" },
    });
  }, [id]);

  return <div id={id} className={className} />;
}
