import { NextResponse, type NextRequest } from "next/server";

/**
 * Contact form handler for /contact.
 *
 * Delivery: no email provider is wired up yet. When CONTACT_DELIVERY_KEY is
 * absent the handler logs the submission to the server console and reports
 * success, so the form works honestly end to end today and the real delivery
 * integration can land later without touching the page.
 *
 * Spam protection (both silent, per the build plan):
 * 1. Honeypot: a visually hidden "website" field humans never see. Filled
 *    means bot; we drop the submission but still answer success so the bot
 *    learns nothing.
 * 2. Minimum fill time: the page (dynamically rendered) stamps formLoadedAt
 *    at request time. A submit arriving faster than a human can type, or with
 *    a missing/garbled/future stamp, is dropped the same way.
 */

/** Faster than this between page render and submit reads as a bot. */
const MIN_FILL_MS = 4000;

/** Tolerated clock skew before a future formLoadedAt reads as forged. */
const MAX_FUTURE_SKEW_MS = 60_000;

function isLikelyBot(honeypot: string, loadedAtRaw: string): boolean {
  if (honeypot.trim() !== "") return true;
  const loadedAt = Number(loadedAtRaw);
  if (!Number.isFinite(loadedAt) || loadedAt <= 0) return true;
  const elapsed = Date.now() - loadedAt;
  if (elapsed < MIN_FILL_MS) return true;
  if (elapsed < -MAX_FUTURE_SKEW_MS) return true;
  return false;
}

function respond(request: NextRequest, ok: boolean): NextResponse {
  // fetch() clients that ask for JSON get JSON; native form posts get a
  // POST/redirect/GET back to the page, where ?sent=... renders the notice.
  const wantsJson = request.headers
    .get("accept")
    ?.includes("application/json");
  if (wantsJson) {
    return NextResponse.json({ ok }, { status: ok ? 200 : 400 });
  }
  return NextResponse.redirect(
    new URL(`/contact?sent=${ok ? "1" : "0"}#note`, request.url),
    303,
  );
}

export async function POST(request: NextRequest) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return respond(request, false);
  }

  const field = (name: string): string => {
    const value = form.get(name);
    return typeof value === "string" ? value.trim() : "";
  };

  const name = field("name");
  const email = field("email");
  const business = field("business");
  const message = field("message");

  if (isLikelyBot(field("website"), field("formLoadedAt"))) {
    console.log("[contact] dropped likely-bot submission");
    // Silent drop: bots get the success path, nothing is delivered.
    return respond(request, true);
  }

  // Server-side mirror of the form's required fields.
  if (!name || !email || !message || !/^\S+@\S+\.\S+$/.test(email)) {
    return respond(request, false);
  }

  const deliveryKey = process.env.CONTACT_DELIVERY_KEY;
  if (!deliveryKey) {
    console.log("[contact] submission (no delivery key configured, log only)", {
      name,
      email,
      business,
      message,
    });
    return respond(request, true);
  }

  // CONTACT_DELIVERY_KEY is set but no provider is integrated yet. Log loudly
  // so the gap is visible in Vercel logs, and still confirm to the visitor.
  console.warn(
    "[contact] delivery key present but no provider integrated; submission logged only",
    { name, email, business, message },
  );
  return respond(request, true);
}
