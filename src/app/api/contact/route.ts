import { NextResponse, type NextRequest } from "next/server";
import { SITE } from "@/lib/constants";
import {
  clientIp,
  isFastFill,
  isHoneypotHit,
  makeRateLimiter,
} from "@/lib/formGuards";

/**
 * Contact form handler for /contact.
 *
 * Delivery (Resend, per the brief's Open config: email to the business inbox
 * via a transactional service, key + destination as one-line env config):
 * - CONTACT_DELIVERY_KEY: Resend API key. Absent => log-only mode (dev /
 *   preview without secrets); the submission is logged and success reported.
 * - CONTACT_TO: destination inbox. Falls back to SITE.email; if both are
 *   empty the handler stays in log-only mode rather than sending nowhere.
 * - CONTACT_FROM (optional): verified sender, defaults to Resend's onboarding
 *   sender so the key works before the domain is verified.
 * When the key is set and the send fails, the handler logs the full
 * submission (so the lead is recoverable from Vercel logs) and returns the
 * error state; it never tells the visitor "sent" when nothing was delivered.
 * Launch gate: "contact delivery key + provider verified" is on the manual
 * checklist in build/out/verification-report.md.
 *
 * Spam protection lives in @/lib/formGuards, shared with /api/subscribe:
 * 1. Honeypot: a visually hidden "website" field humans never see. Filled
 *    means bot; we drop the submission but still answer success so the bot
 *    learns nothing. This is the ONLY silent drop.
 * 2. Minimum fill time: the client form stamps formLoadedAt on mount. A submit
 *    arriving faster than a human can type, or with a missing/garbled/future
 *    stamp, is NOT dropped (autofill makes fast legitimate submits real, and a
 *    no-JS visitor sends no stamp at all); it is processed normally with a
 *    "fast-fill" flag in the delivery payload and logs, so a human can triage.
 * 3. Per-IP rate limit + field length caps: see below. Both reject with the
 *    normal "something went wrong" failure response, not a silent drop.
 */

/** Field length caps: generous for real use, small enough to stop a paste-bomb. */
const MAX_LENGTHS = { name: 200, email: 254, business: 200, message: 5000 };

function isOversized(fields: {
  name: string;
  email: string;
  business: string;
  message: string;
}): boolean {
  return (
    fields.name.length > MAX_LENGTHS.name ||
    fields.email.length > MAX_LENGTHS.email ||
    fields.business.length > MAX_LENGTHS.business ||
    fields.message.length > MAX_LENGTHS.message
  );
}

/** This route's own bucket, so a message never spends the subscribe budget. */
const isRateLimited = makeRateLimiter();

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

  if (isHoneypotHit(field("website"))) {
    console.log("[contact] dropped honeypot submission");
    // Silent drop: bots get the success path, nothing is delivered.
    return respond(request, true);
  }

  // Advisory: fast submits (autofill or bots) are delivered, just flagged.
  const fastFill = isFastFill(field("formLoadedAt"));
  if (fastFill) {
    console.log("[contact] fast-fill submission (under minimum fill time)");
  }

  // Server-side mirror of the form's required fields, plus the length caps.
  if (
    !name ||
    !email ||
    !message ||
    !/^\S+@\S+\.\S+$/.test(email) ||
    isOversized({ name, email, business, message })
  ) {
    return respond(request, false);
  }

  // Rate limit here, not earlier: honeypot hits and failed validation never
  // reach this point, so the budget only spends on submissions that would
  // otherwise trigger a real send.
  if (isRateLimited(clientIp(request))) {
    console.log("[contact] rate-limited submission");
    return respond(request, false);
  }

  const deliveryKey = process.env.CONTACT_DELIVERY_KEY;
  const to = process.env.CONTACT_TO || SITE.email;
  if (!deliveryKey || !to) {
    if (deliveryKey && !to) {
      // Key without a destination is a config gap: say so loudly.
      console.warn(
        "[contact] CONTACT_DELIVERY_KEY set but no CONTACT_TO/SITE.email; log only",
      );
    }
    console.log("[contact] submission (delivery not configured, log only)", {
      name,
      email,
      business,
      message,
      fastFill,
    });
    return respond(request, true);
  }

  const delivered = await deliverByEmail(deliveryKey, to, {
    name,
    email,
    business,
    message,
    fastFill,
  });
  if (!delivered) {
    // Keep the lead recoverable from Vercel logs, and be honest with the
    // visitor: the error notice asks them to retry or email directly.
    console.error("[contact] delivery failed; submission follows", {
      name,
      email,
      business,
      message,
      fastFill,
    });
    return respond(request, false);
  }
  return respond(request, true);
}

/**
 * Sends the submission to the business inbox via Resend's REST API.
 * Plain fetch, no SDK: one endpoint, one JSON body. Returns true only when
 * Resend accepts the message.
 */
async function deliverByEmail(
  apiKey: string,
  to: string,
  fields: {
    name: string;
    email: string;
    business: string;
    message: string;
    fastFill: boolean;
  },
): Promise<boolean> {
  const from =
    process.env.CONTACT_FROM || "Mango Catalyst <onboarding@resend.dev>";
  const text = [
    `Name: ${fields.name}`,
    `Email: ${fields.email}`,
    `Business: ${fields.business || "(not given)"}`,
    ...(fields.fastFill
      ? ["Flag: fast-fill (submitted under the minimum fill time; autofill or bot)"]
      : []),
    "",
    fields.message,
  ].join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: fields.email,
        subject: `Contact form: ${fields.name}`,
        text,
      }),
    });
    if (!res.ok) {
      console.error(
        `[contact] Resend rejected the send: ${res.status} ${await res
          .text()
          .catch(() => "")}`,
      );
      return false;
    }
    return true;
  } catch (error) {
    console.error("[contact] Resend request threw", error);
    return false;
  }
}
