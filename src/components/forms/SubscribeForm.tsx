"use client";

import { track } from "@vercel/analytics";
import { useEffect, useRef, useState } from "react";

/**
 * One email field and a button. Two skins: `dark` for the footer, `light` for
 * the band on /guides. Same progressive enhancement as ContactForm: a real
 * native post that works without JS, intercepted when JS is there so the
 * visitor stays where they were and gets an inline answer.
 */

type State = "idle" | "sending" | "sent" | "error";

export function SubscribeForm({
  idPrefix,
  tone = "dark",
}: {
  idPrefix: string;
  tone?: "dark" | "light";
}) {
  const [state, setState] = useState<State>("idle");
  const stamp = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (stamp.current) stamp.current.value = String(Date.now());
  }, []);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    const form = event.currentTarget;
    event.preventDefault();
    setState("sending");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });
      if (!res.ok) throw new Error(String(res.status));
      setState("sent");
      track("subscribed");
      form.reset();
    } catch {
      setState("error");
    }
  }

  const field =
    tone === "light"
      ? "w-full min-w-0 rounded-lg border border-border-lt bg-surface-lt px-4 py-3 text-navy placeholder:text-muted-lt"
      : "w-full min-w-0 rounded-lg border border-hairline bg-surface px-4 py-2.5 text-ink placeholder:text-faint";
  const note = tone === "light" ? "text-navy-2" : "text-muted";

  if (state === "sent") {
    return (
      <p role="status" className={`text-sm font-medium ${note}`}>
        You&apos;re on the list.
      </p>
    );
  }

  return (
    <form
      action="/api/subscribe"
      method="post"
      onSubmit={onSubmit}
      className="relative"
    >
      <div
        aria-hidden="true"
        className="absolute -left-[9999px] h-px w-px overflow-hidden"
      >
        <label htmlFor={`${idPrefix}-website`}>Website</label>
        <input
          id={`${idPrefix}-website`}
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <input ref={stamp} type="hidden" name="formLoadedAt" defaultValue="" />

      <div className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor={`${idPrefix}-email`} className="sr-only">
          Email address
        </label>
        <input
          id={`${idPrefix}-email`}
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="you@yourshop.com"
          className={field}
        />
        <button
          type="submit"
          className={
            tone === "light" ? "btn btn-primary" : "btn btn-sm btn-ghost"
          }
          disabled={state === "sending"}
        >
          {state === "sending" ? "Adding..." : "Subscribe"}
        </button>
      </div>
      {state === "error" ? (
        <p role="alert" className={`mt-3 text-sm font-medium ${note}`}>
          That did not go through. Try again in a moment.
        </p>
      ) : null}
    </form>
  );
}
