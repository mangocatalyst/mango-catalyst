# Specific use-case candidates for the ServiceGrid boxes (2026-07-06)

Bryan's ask: replace/augment the generic samples in the four Home "What we do" cards
with very specific, real examples, mixed with generic ones. Source: the actual zap
export (41 zaps), the mango-automation repo, and the standalone builds. NOT APPLIED
YET; this is the candidate pool for Bryan to cut down.

**Honesty-gate note for the eventual copy pass:** every item below is a real build,
but per `00-canonical-brief.md` they must be phrased as *example use cases we can
build for you*, never as client case studies, and never naming or implying the
employer. Supply-house and manufacturer names (Ferguson, Johnstone, Amana, Navien)
are third-party brands, not employer-identifying; keeping them is Bryan's call and
adds trade credibility.

---

## Box 1: Invoicing / billing / back office

- **Vendor receipt emails matched to the right purchase order in ServiceTitan,
  itemized line by line, no hand-keying.** (Real: six per-vendor zaps: Ferguson,
  Johnstone, Goodin, Sid Harvey, Gustave, Menards.)
- **Structured emails parsed straight into spreadsheet rows** (order confirmations,
  registration receipts, whatever arrives on repeat).
- **Yesterday's financial numbers pulled automatically every morning** into one
  summary instead of stitching five screens.

## Box 2: Lead capture / follow-up / phones

- **Hang-up and abandoned calls auto-classified in your phone system** so booking
  rates reflect reality and CSRs stop doing it by hand. (Real: ST call-classify zap
  + one-keystroke classify shortcuts in the browser extension.)
- Generic anchor stays: every lead from web/phone/trade show lands in one place and
  gets followed up.

## Box 3: Job flow / field communication

- **A Slack channel created automatically for every job, the right people added,
  with a one-click bookmark straight to the job in ServiceTitan.** (Real: create-
  channel zap + auto-add subzaps + jump-bookmark backfill.)
- **Photos and messages from job channels archived onto the job record in
  ServiceTitan** so the history survives Slack retention. (Real: photo-upload +
  daily job-channel digest zaps.)
- **Field photos posted in Slack auto-filed to a marketing folder in Google Drive.**
- **An install-job form that prints itself into a clean 2-page truck load sheet PDF**
  for the crew. (Real: JotForm + Apps Script build.)
- **A TV dashboard in the office showing today's dispatch board**, refreshed on its
  own. (Real: TV-dashboards + dispatch-board zaps.)

## Box 4: Reporting

- **Per-technician install-quality scorecards** (recalls, go-backs, not-finished-
  same-day, the hours whoever went back to fix spent) built from CRM + payroll data.
  (Real: tech-factsheet reports.)
- **A pick-your-fields report builder over your CRM** with filters and CSV / Google
  Sheets export. (Real: Electron ServiceTitan report app.)
- **A morning digest email: yesterday's numbers, today's schedule, what needs a
  decision.** (Real: morning-briefing script.)

## Candidate NEW box 5: Warranty and equipment records (strongest new material)

- **New equipment auto-registered for manufacturer warranty the week it's
  installed** (Amana/Goodman/Daikin, Navien, Weil-McLain, Gree, Maytag; track-only
  logging for brands without portals), serials logged to a master sheet. (Real:
  registration routing zap + 8 per-manufacturer subzaps + new-equipment-to-Sheets.)
- This is Bryan's "automatically register equipment warranties" example and the
  deepest single system in the export; it deserves its own card or a hero example.

## Candidate NEW box 6: Forms, portals, and the clicks in between

- **Repetitive web-portal forms filled from saved presets, staff reviews and clicks
  submit** (the MN-ITS claim-form helper pattern; phrase portal-generically, no
  medical/dental in fit copy per the brief).
- **One-keystroke shortcuts inside the tools you already use** for the actions your
  office does fifty times a day. (Real: ServiceTitan browser extension: classify a
  call, act on a dispatch-board job, without the click safari.)

## Cross-cutting credibility line (not a box; fits How-it-works or the proof strip)

- **Every automation ships with a watchdog:** scheduled health checks, failure
  alerts to a phone, a morning roll-up that says what ran and what didn't. (Real:
  xyOps + watchdog + overnight-health builds.) This answers the owner's real fear:
  "who notices when the robot breaks?"

## Deliberately excluded

- Job-search / apply-chain / outreach automation (personal, off-brand for SMB ops).
- Data-manager / token-generator subzaps (plumbing, not a sellable story).
- Anything phrased as an owned client system; MN-ITS remains the one owned build
  for *proof* claims.
