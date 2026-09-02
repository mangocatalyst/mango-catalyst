"use client";

import { track } from "@vercel/analytics";
import { useEffect, useRef, useState } from "react";
import { SITE } from "@/lib/constants";

/**
 * The message form, lifted out of /contact so it can sit on any page.
 *
 * Progressive enhancement, in that order:
 * - The markup is a real <form action="/api/contact" method="post">, so it
 *   works with JavaScript switched off. The route answers a native post with a
 *   303 to /contact?sent=1, where the page renders the notice.
 * - With JS, submit is intercepted and sent with Accept: application/json (the
 *   route already branches on that), so the visitor stays on the page they were
 *   reading and gets an inline answer.
 *
 * The formLoadedAt stamp starts empty and is filled by a mount effect. It used
 * to be stamped on the server, which forced any page carrying the form to be
 * dynamic; the route treats a missing stamp as advisory only, so every page
 * that hosts this form stays static and a no-JS submit still delivers.
 */

const FIELD_CLASSES =
  "mt-2 w-full rounded-lg border border-border-lt bg-surface-lt px-4 py-3 text-navy placeholder:text-muted-lt";
const LABEL_CLASSES = "block text-sm font-semibold text-navy";

type State = "idle" | "sending" | "sent" | "error";

export function ContactForm({ idPrefix = "contact" }: { idPrefix?: string }) {
  const [state, setState] = useState<State>("idle");
  const stamp = useRef<HTMLInputElement>(null);
  const email: string = SITE.email;

  useEffect(() => {
    if (stamp.current) stamp.current.value = String(Date.now());
  }, []);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    const form = event.currentTarget;
    event.preventDefault();
    setState("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });
      if (!res.ok) throw new Error(String(res.status));
      setState("sent");
      track("note_sent");
      form.reset();
    } catch {
      setState("error");
    }
  }

  if (state === "sent") {
    return (
      <p
        role="status"
        className="rounded-lg border-l-4 border-l-success bg-surface-lt p-4 font-medium text-navy"
      >
        Got it. I&apos;ll get back to you within one business day.
      </p>
    );
  }

  return (
    <form
      action="/api/contact"
      method="post"
      onSubmit={onSubmit}
      className="relative grid gap-5 sm:grid-cols-2"
    >
      {/* Honeypot: hidden from humans, skipped by screen readers and the tab
          order. Bots that fill it are dropped silently. */}
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
      {/* Stamped on mount, so this form does not make its host page dynamic. */}
      <input ref={stamp} type="hidden" name="formLoadedAt" defaultValue="" />

      <div>
        <label htmlFor={`${idPrefix}-name`} className={LABEL_CLASSES}>
          Your name
        </label>
        <input
          id={`${idPrefix}-name`}
          type="text"
          name="name"
          required
          autoComplete="name"
          className={FIELD_CLASSES}
        />
      </div>
      <div>
        <label htmlFor={`${idPrefix}-email`} className={LABEL_CLASSES}>
          Email
        </label>
        <input
          id={`${idPrefix}-email`}
          type="email"
          name="email"
          required
          autoComplete="email"
          className={FIELD_CLASSES}
        />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor={`${idPrefix}-business`} className={LABEL_CLASSES}>
          Business name
        </label>
        <input
          id={`${idPrefix}-business`}
          type="text"
          name="business"
          autoComplete="organization"
          className={FIELD_CLASSES}
        />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor={`${idPrefix}-message`} className={LABEL_CLASSES}>
          What&apos;s eating your week?{" "}
          <span className="font-normal text-muted-lt">
            (tell me the one task that drives you nuts)
          </span>
        </label>
        <textarea
          id={`${idPrefix}-message`}
          name="message"
          required
          rows={5}
          className={FIELD_CLASSES}
        />
      </div>
      <div className="sm:col-span-2">
        <button
          type="submit"
          className="btn btn-primary"
          disabled={state === "sending"}
        >
          {state === "sending" ? "Sending..." : "Send it over"}
        </button>
        {state === "error" ? (
          <p role="alert" className="mt-4 font-medium text-navy">
            {"Something went wrong on our end. Try again"}
            {email ? (
              <>
                {", or email me directly at "}
                <a href={`mailto:${email}`} className="inline-link-light">
                  {email}
                </a>
              </>
            ) : null}
            .
          </p>
        ) : null}
      </div>
    </form>
  );
}
