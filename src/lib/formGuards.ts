/**
 * The spam guards shared by every form route (/api/contact, /api/subscribe).
 *
 * Lifted out of the contact route unchanged when the subscribe route arrived:
 * two routes reimplementing "is this a bot" is how the two answers drift apart.
 * Each route calls makeRateLimiter() for its own bucket, so a visitor who sends
 * a message does not spend the budget for signing up to the list.
 */

/** Faster than this between page render and submit reads as autofill or a bot. */
const MIN_FILL_MS = 4000;

/** Tolerated clock skew before a future formLoadedAt reads as forged. */
const MAX_FUTURE_SKEW_MS = 60_000;

/** Filled honeypot: the one signal that silently drops the submission. */
export function isHoneypotHit(honeypot: string): boolean {
  return honeypot.trim() !== "";
}

/**
 * True when the timing check trips: submitted faster than MIN_FILL_MS, or the
 * formLoadedAt stamp is missing, garbled, or implausibly in the future.
 * Advisory only; the submission is still delivered, flagged as fast-fill. The
 * stamp is now set by a mount effect in the client form, so a page rendered
 * without JS sends no stamp at all: "missing" has to stay advisory or a no-JS
 * visitor would look like a bot.
 */
export function isFastFill(loadedAtRaw: string): boolean {
  const loadedAt = Number(loadedAtRaw);
  if (!Number.isFinite(loadedAt) || loadedAt <= 0) return true;
  const elapsed = Date.now() - loadedAt;
  if (elapsed < MIN_FILL_MS) return true;
  if (elapsed < -MAX_FUTURE_SKEW_MS) return true;
  return false;
}

/** Vercel sets x-forwarded-for; first entry is the original client. */
export function clientIp(request: Request): string {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
/** Unique IPs never get removed on their own; bound the Map so a warm
 *  instance can't accumulate one entry per drive-by visitor forever. */
const RATE_LIMIT_MAX_TRACKED_IPS = 1000;

/**
 * Per-IP rate limit: N submissions per window, held in a plain Map.
 * ponytail: in-memory, per-instance only, so a visitor bouncing across
 * serverless instances (or a cold start) gets a fresh bucket; it still caps
 * the common case (one instance, one spammer) with zero new services or
 * deps. Upgrade path if real abuse shows up: a Vercel KV/Upstash-backed
 * counter, or a Vercel Firewall rate-limit rule in front of the route.
 */
export function makeRateLimiter(
  max = RATE_LIMIT_MAX,
  windowMs = RATE_LIMIT_WINDOW_MS,
): (ip: string) => boolean {
  const hits = new Map<string, { count: number; windowStart: number }>();
  return (ip: string): boolean => {
    const now = Date.now();
    const entry = hits.get(ip);
    if (!entry || now - entry.windowStart > windowMs) {
      if (hits.size >= RATE_LIMIT_MAX_TRACKED_IPS) {
        // ponytail: cheap bound, not an LRU; an occasional full reset is fine
        // for an advisory limiter on a low-traffic form.
        hits.clear();
      }
      hits.set(ip, { count: 1, windowStart: now });
      return false;
    }
    entry.count += 1;
    return entry.count > max;
  };
}
