/**
 * Cal.com embed glue. Single source for the booking target + the official
 * embed loader. The booking URL stays env-driven (NEXT_PUBLIC_CAL_URL, e.g.
 * "https://cal.com/mangocatalyst/15min"); with the var unset every booking CTA
 * degrades to a plain link to /contact#book (the honest fallback the site
 * already shipped). NEXT_PUBLIC_* is inlined into the client bundle at build,
 * so calTarget() resolves identically on the server and in the browser.
 */

export const CAL_URL = process.env.NEXT_PUBLIC_CAL_URL ?? "";

/** Popup/inline booker config: month view only, so no empty midnight grid. */
export const CAL_CONFIG = '{"layout":"month_view"}';

/** Parse the env URL into the embed's origin + relative calLink slug. */
export function calTarget(): { origin: string; link: string } | null {
  if (!CAL_URL) return null;
  try {
    const u = new URL(CAL_URL);
    const link = u.pathname.replace(/^\/+/, "");
    return link ? { origin: u.origin, link } : null;
  } catch {
    return null;
  }
}

type CalFn = ((...args: unknown[]) => void) & { loaded?: boolean };

/**
 * Load the Cal embed (once) and init it, returning the queue-shim `Cal`
 * function plus the resolved target. Idempotent: the vendor snippet guards the
 * script injection with `cal.loaded`, and the `!w.Cal` check guards the init.
 * Returns null on the server or when no booking URL is configured.
 */
export function ensureCalInit(): { Cal: CalFn; origin: string; link: string } | null {
  if (typeof window === "undefined") return null;
  const t = calTarget();
  if (!t) return null;
  const w = window as unknown as { Cal?: CalFn };
  if (!w.Cal) {
    // Official Cal.com embed loader (queue shim). ponytail: vendor snippet, keep verbatim.
    /* eslint-disable @typescript-eslint/no-explicit-any, prefer-rest-params */
    (function (C: any, A: string, L: string) {
      const p = function (a: any, ar: any) {
        a.q.push(ar);
      };
      const d = C.document;
      C.Cal =
        C.Cal ||
        function () {
          const cal = C.Cal;
          const ar = arguments;
          if (!cal.loaded) {
            cal.ns = {};
            cal.q = cal.q || [];
            d.head.appendChild(d.createElement("script")).src = A;
            cal.loaded = true;
          }
          if (ar[0] === L) {
            const api: any = function () {
              p(api, arguments);
            };
            const namespace = ar[1];
            api.q = api.q || [];
            if (typeof namespace === "string") {
              cal.ns[namespace] = cal.ns[namespace] || api;
              p(cal.ns[namespace], ar);
              p(cal, ["initNamespace", namespace]);
            } else {
              p(cal, ar);
            }
            return;
          }
          p(cal, ar);
        };
    })(window, "https://app.cal.com/embed/embed.js", "init");
    /* eslint-enable @typescript-eslint/no-explicit-any, prefer-rest-params */
    w.Cal!("init", { origin: t.origin });
  }
  return { Cal: w.Cal as CalFn, origin: t.origin, link: t.link };
}
