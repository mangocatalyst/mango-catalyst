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
 * Delivery (Resend Audiences):
 * - CONTACT_DELIVERY_KEY: the Resend API key, shared with the contact route.
 * - RESEND_AUDIENCE_ID: which audience to add the address to.
 * Either one absent means log-only: the address is logged and success is
 * reported, so a preview deploy without secrets behaves like the real thing.
 *
 * A duplicate address is a success, not an error: someone signing up twice
 * has done nothing wrong and should not be told they have. When Resend
 * rejects a real send, the address is logged so the signup is recoverable
 * from the Vercel logs, and the visitor is told honestly that it failed.
 */

/** This route's own bucket, separate from the contact form's. */
const isRateLimited = makeRateLimiter();

const MAX_EMAIL_LENGTH = 254;

function respond(request: NextRequest, ok: boolean): NextResponse {
  const wantsJson = request.headers.get("accept")?.includes("application/json");
  if (wantsJson) return NextResponse.json({ ok }, { status: ok ? 200 : 400 });
  // No-JS fallback: the contact page is the one place with server-rendered
  // notices, so a native post lands there rather than nowhere.
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
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  if (!deliveryKey || !audienceId) {
    if (deliveryKey && !audienceId) {
      console.warn(
        "[subscribe] CONTACT_DELIVERY_KEY set but no RESEND_AUDIENCE_ID; log only",
      );
    }
    console.log("[subscribe] signup (delivery not configured, log only)", {
      email,
      fastFill,
    });
    return respond(request, true);
  }

  const added = await addToAudience(deliveryKey, audienceId, email);
  if (!added) {
    console.error("[subscribe] delivery failed; signup follows", { email, fastFill });
    return respond(request, false);
  }
  return respond(request, true);
}

/**
 * Adds the address to a Resend audience. Plain fetch, no SDK: one endpoint,
 * one JSON body. A 409 (already a contact) counts as added.
 */
async function addToAudience(
  apiKey: string,
  audienceId: string,
  email: string,
): Promise<boolean> {
  try {
    const res = await fetch(
      `https://api.resend.com/audiences/${encodeURIComponent(audienceId)}/contacts`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, unsubscribed: false }),
      },
    );
    if (res.ok || res.status === 409) return true;
    console.error(
      `[subscribe] Resend rejected the contact: ${res.status} ${await res
        .text()
        .catch(() => "")}`,
    );
    return false;
  } catch (error) {
    console.error("[subscribe] Resend request threw", error);
    return false;
  }
}
