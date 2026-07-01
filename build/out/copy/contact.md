# Contact `/contact`

## Page metadata (from seo-spec section 2.6)

- **Title:** `Book a 15-Minute Fit Call | Mango Catalyst`
- **Meta description:** `Book a 15-minute fit call with real time slots, or send a note about the task eating your week. Based in Minnesota, serving the upper Midwest. No pitch.`
- **Canonical:** `/contact`
- **Schema:** `breadcrumbLd([Home, Contact])` only.
- **NO phone number anywhere on this page (or the site).**

---

## H1

Book a 15-minute fit call

## Intro (answer-first)

Pick a real time slot below. The call is 15 minutes, there's no pitch, and you leave knowing whether the thing eating your week can run itself, and roughly what that would look like. Every booking comes with a video link in the calendar invite, so there's nothing to figure out on the day.

**Intro (fallback variant, REQUIRED when the booking env var is empty):** Tell me what's eating your week in the form below. I reply within one business day and we set up a 15-minute call with a video link. No pitch either way.

## Booking block (Cal.com embed; URL from env var)

**Heading above the embed (H2):** Grab a slot

**One qualifying question on the booking form (protects the slot, lifts show rate):**
Label: What's the one task eating your week?
Placeholder: The thing you'd pay to never do by hand again.

**Booking confirmation state (must exist, pass-2 item):**
You're booked. A calendar invite with a video link is on its way to your inbox, along with a confirmation email. No prep needed: just show up knowing which task drives you nuts. If the time stops working, reply to the confirmation email and we'll find another slot.

**Fallback state (renders when the booking env var is empty; never a dead embed):**
The scheduler is being set up. Use the form below instead, and I'll confirm a time within one business day.

## Message form (H2)

**Heading (H2):** Or send a note

**Lead-in line:** Not ready to book? Tell me what's eating your time and I'll reply within one business day.

**Fields:**
- Your name
- Email
- Business name
- What's eating your week? (tell me the one task that drives you nuts)

**Submit button:** Send it over

**Success message:** Got it. I'll get back to you within one business day.

**Error message:** Something went wrong on our end. Try again, or email me directly.

## Contact details block

- **Email line (renders from `SITE.email` constants, assumed hello@mangocatalyst.com):** Prefer email? Reach me at hello@mangocatalyst.com.
- **Service-area line:** Based in Minnesota, serving the upper Midwest.

## Microcopy note for design

One action dominates: the scheduler. The form is the quiet second option, never a competing loud CTA. No phone number, no address beyond city-level.
