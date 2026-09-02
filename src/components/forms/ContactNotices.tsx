"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/Card";

/**
 * The URL-driven notices on /contact (?booked=1 from a Cal.com redirect,
 * ?sent=1|0 from the no-JS form post). Reading the query here, on the client,
 * keeps the page itself static and edge-cached: awaiting searchParams in the
 * server component made /contact the only uncached route on the site (audit
 * item 8). Rendered inside Suspense so the static shell prerenders without it.
 */
function Notices({ which, email }: { which: "booked" | "sent"; email: string }) {
  const params = useSearchParams();
  if (which === "booked") {
    if (params.get("booked") !== "1") return null;
    return (
      <Card
        tone="light"
        className="mt-10 max-w-[44rem] border-l-4 border-l-success p-6 sm:p-8 lg:max-w-[52rem]"
      >
        <p className="leading-[1.65] text-navy" role="status">
          You&apos;re booked. A calendar invite with a video link is on its way
          to your inbox, along with a confirmation email. No prep needed: just
          show up knowing which task drives you nuts. If the time stops
          working, reply to the confirmation email and we&apos;ll find another
          slot.
        </p>
      </Card>
    );
  }
  const sent = params.get("sent");
  if (sent === "1") {
    return (
      <p
        role="status"
        className="mt-8 max-w-[44rem] rounded-lg border-l-4 border-l-success bg-surface-lt p-4 font-medium text-navy lg:max-w-[52rem] lg:text-[1.2rem]"
      >
        Got it. I&apos;ll get back to you within one business day.
      </p>
    );
  }
  if (sent === "0") {
    return (
      <p
        role="alert"
        className="mt-8 max-w-[44rem] rounded-lg border-l-4 border-l-error bg-surface-lt p-4 font-medium text-navy lg:max-w-[52rem] lg:text-[1.2rem]"
      >
        {"Something went wrong on our end. Try again, or email me directly at "}
        <a href={`mailto:${email}`} className="inline-link-light">
          {email}
        </a>
        .
      </p>
    );
  }
  return null;
}

export function ContactNotices(props: { which: "booked" | "sent"; email: string }) {
  return (
    <Suspense fallback={null}>
      <Notices {...props} />
    </Suspense>
  );
}
