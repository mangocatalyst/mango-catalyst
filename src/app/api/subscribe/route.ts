import { NextResponse, type NextRequest } from "next/server";
import {
  clientIp,
  isFastFill,
  isHoneypotHit,
  makeRateLimiter,
} from "@/lib/formGuards";

/**
 * Email list signup, same shape as /api/contact and deliberately so: same
 * honeypot, same advisory fast-fill flag, same per-IP limiter, same log-only
 * fallback when delivery is not configured.
 *
 * Delivery (Resend Contacts + Segments):
 * - CONTACT_DELIVERY_KEY: the Resend API key, shared with the contact route.
 * - RESEND_SEGMENT_ID: which segment the new contact joins.
 * Either one absent means log-only: the address is logged and success is
 * reported, so a preview deploy without secrets behaves like the real thing.
 *
 * Contacts are GLOBAL now and keyed by email; audiences became segments, and
 * POST /audiences/{id}/contacts is the old shape. The current call is
 * POST /contacts with a segments array (resend.com/docs/api-reference/contacts/
 * create-contact), answering 201 with {object:"contact", id}.
 *
 * A duplicate address is a success, not an error: someone signing up twice has
 * done nothing wrong and should not be told they have. Resend documents no
 * dedicated duplicate error, and its only documented 409s are about idempotency
 * keys, so this classifies on the RESPONSE BODY rather than on the status: a
 * body that names the contact as already existing is a success, anything else
 * that is not 2xx is a real failure. When it does fail, the address is logged so
 * the signup is recoverable from the Vercel logs and the visitor is told plainly.
 */

/** This route's own bucket, separate from the contact form's. */
const isRateLimited = makeRateLimiter();

const MAX_EMAIL_LENGTH = 254;

function respond(request: NextRequest, ok: boolean): NextResponse {
  const wantsJson = request.headers.get("accept")?.includes("application/json");
  if (wantsJson) return NextResponse.json({ ok }, { status: ok ? 200 : 400 });
  // No-JS fallback. It used to land on /contact?sent=1, which promises "I'll get
  // back to you within one business day" -- the wrong promise entirely for
  // someone who just joined a mailing list. /subscribed says what actually
  // happened.
  return NextResponse.redirect(
    new URL(`/subscribed${ok ? "" : "?failed=1"}`, request.url),
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

  const email = field("email");

  if (isHoneypotHit(field("website"))) {
    console.log("[subscribe] dropped honeypot submission");
    // Silent drop: bots get the success path, nothing is delivered.
    return respond(request, true);
  }

  const fastFill = isFastFill(field("formLoadedAt"));
  if (fastFill) {
    console.log("[subscribe] fast-fill submission (under minimum fill time)");
  }

  if (!email || email.length > MAX_EMAIL_LENGTH || !/^\S+@\S+\.\S+$/.test(email)) {
    return respond(request, false);
  }

  if (isRateLimited(clientIp(request))) {
    console.log("[subscribe] rate-limited submission");
    return respond(request, false);
  }

  const deliveryKey = process.env.CONTACT_DELIVERY_KEY;
  const segmentId = process.env.RESEND_SEGMENT_ID;
  if (!deliveryKey || !segmentId) {
    if (deliveryKey && !segmentId) {
      console.warn(
        "[subscribe] CONTACT_DELIVERY_KEY set but no RESEND_SEGMENT_ID; log only",
      );
    }
    console.log("[subscribe] signup (delivery not configured, log only)", {
      email,
      fastFill,
    });
    return respond(request, true);
  }

  const added = await addContact(deliveryKey, segmentId, email);
  if (!added) {
    console.error("[subscribe] delivery failed; signup follows", { email, fastFill });
    return respond(request, false);
  }
  return respond(request, true);
}

/** A Resend error body: {name, message}, per its documented error list. */
function readsAsDuplicate(body: unknown): boolean {
  if (!body || typeof body !== "object") return false;
  const { name, message } = body as { name?: unknown; message?: unknown };
  return /already[\s_-]?exists|already[\s_-]?(?:a )?(?:subscribed|contact)|duplicate/i.test(
    `${typeof name === "string" ? name : ""} ${typeof message === "string" ? message : ""}`,
  );
}

/**
 * Creates the contact and puts it in the configured segment. Plain fetch, no
 * SDK: one endpoint, one JSON body.
 */
async function addContact(
  apiKey: string,
  segmentId: string,
  email: string,
): Promise<boolean> {
  try {
    const res = await fetch("https://api.resend.com/contacts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        unsubscribed: false,
        segments: [{ id: segmentId }],
      }),
    });
    if (res.ok) return true;
    const body = await res.json().catch(() => null);
    // Already on the list is not a failure to the person who just signed up.
    if (readsAsDuplicate(body)) return true;
    console.error(
      `[subscribe] Resend rejected the contact: ${res.status} ${JSON.stringify(body)}`,
    );
    return false;
  } catch (error) {
    console.error("[subscribe] Resend request threw", error);
    return false;
  }
}
