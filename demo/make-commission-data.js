#!/usr/bin/env node
// make-commission-data.js: fully synthetic commission-tracker data for the
// mangocatalyst /dashboards demo. Same fictional company as make-demo-data.js
// (Boreal Comfort Co) and the same invented crew, so the owner dashboard, the
// install whiteboard and the commission tracker read as one shop. Every name,
// dollar and note here is invented; privacy-validator.js proves it after the bake.
// Deterministic: seeded PRNG, so a re-bake on the same day is reproducible.
//
// DATES ARE DAY OFFSETS, never absolutes. A period is a `slot` relative to the
// current fortnight and a line carries `done_day` / `paid_day` offsets from its
// period's first Monday. The demo engine baked into commission.html resolves them
// against today, so the artifact never looks stale no matter when it was baked.
//
// Shapes mirror server.js getPeriod() / listPeriods() (commission-tracker
// server.js:259 and :322). The engine derives the aggregates (people rows, total,
// export blockers) from these lines at page load, which is what lets an edit in
// the demo move the numbers above it.
'use strict';
const fs = require('node:fs');
const path = require('node:path');

const OUT = path.join(__dirname, 'build', 'commission-data.json');
fs.mkdirSync(path.dirname(OUT), { recursive: true });

/* ---------- seeded PRNG (mulberry32), same generator as make-demo-data.js ---------- */
let seed = 20260724;
const rnd = () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
const ri = (a, b) => a + Math.floor(rnd() * (b - a + 1));
const pick = (a) => a[Math.floor(rnd() * a.length)];
const money2 = (n) => Math.round(n * 100) / 100;

/* ---------- the earners: the Boreal sellers make-demo-data.js already invented ---------- */
const PEOPLE = [
  { id: 1, name: 'Chidi Okafor', note: 'Comfort advisor. 8% on installs, 3% turnover share, tier gate applies to the premium line.' },
  { id: 2, name: 'Jenna Marsh', note: null },
  { id: 3, name: 'Victor Reyes', note: 'Comfort advisor. Draw against commission settles at period close.' },
  { id: 4, name: 'Anders Vellen', note: null },
  { id: 5, name: 'Maren Kirsch', note: null },
];
const NAME = Object.fromEntries(PEOPLE.map((p) => [p.id, p.name]));

/* ---------- fictional customers: the whiteboard and owner-dashboard cast ---------- */
const CUSTOMERS = [
  'Nordling, Elin & Gus', 'Havermark, Petra', 'Brandvold, Roald', 'Sorvaag, Ingrid',
  'Kettunen, Nils', 'Tarvainen, Freya', 'Holmquist, Otto & Signe', 'Lindstrand, Astrid',
  'Pekkala, Sven', 'Ruonala, Greta', 'Eikland, Britta', 'Kolstad, Mabel', 'Marek, Hank',
  'Vasterberg, Liv', 'Granlund, Emil', 'Ivarson, Selma', 'Lofgren, Arvid', 'Norgard, Cora',
  'Rustad, Wade', 'Thorvald, Opal', 'Ulvestad, Dell', 'Zetterlund, June',
];
const JOB_TYPES = ['Install Residential', 'Install Commercial', 'Service Repair', 'Maintenance', 'Plumbing Service'];

const jobId = () => ri(60_000_000, 71_999_999);
const invId = () => ri(41_000_000, 49_999_999);
const custId = () => ri(2_000_000, 79_999_999);

/* ---------- New Flat Rate style catalogue, invented ---------- */
const SKUS = [
  { code: 'HC-2104', tier: 'B', scope: 'service', name: 'Condenser fan motor, OEM' },
  { code: 'HC-2260', tier: 'B', scope: 'service', name: 'Capacitor and contactor set' },
  { code: 'HC-3312', tier: 'C', scope: 'service', name: 'Evaporator coil replacement' },
  { code: 'HC-3480', tier: 'C', scope: 'equipment', name: 'Two-stage furnace, mid line' },
  { code: 'HC-4420', tier: 'D', scope: 'equipment', name: 'Inverter compressor swap' },
  { code: 'HC-4610', tier: 'D', scope: 'equipment', name: 'Variable speed air handler' },
  { code: 'HC-5590', tier: 'E', scope: 'equipment', name: 'Full system changeout, premium' },
  { code: 'PL-1180', tier: 'B', scope: 'service', name: 'Water heater expansion tank' },
  { code: 'EL-2260', tier: 'B', scope: 'service', name: 'Disconnect and whip replacement' },
];
const tnfrItems = {};
// A basis is the sum of the qualifying items on the invoice, so the expander always adds up.
function priceInvoice(invoiceId, scope, target) {
  const pool = SKUS.filter((s) => s.scope === scope);
  const items = [];
  let sum = 0;
  while (sum < target && items.length < 4) {
    const s = pick(pool);
    const total = money2(Math.max(180, (target - sum) * (0.35 + rnd() * 0.5)));
    items.push({ code: s.code, tier: s.tier, scope: s.scope, name: s.name, total });
    sum = money2(sum + total);
  }
  tnfrItems[invoiceId] = (tnfrItems[invoiceId] || []).concat(items);
  return sum;
}

/* ---------- lines ---------- */
let nextLineId = 1000;
const line = (o) => ({
  id: ++nextLineId,
  person_id: o.person_id,
  week_slot: o.week_slot == null ? (rnd() < 0.5 ? 0 : 1) : o.week_slot,
  kind: o.kind || 'job_type',
  source: o.source || 'auto',
  share: o.share == null ? null : o.share,
  basis: o.basis == null ? null : money2(o.basis),
  pct: o.pct == null ? null : o.pct,
  computed_amount: money2(o.computed_amount),
  earned_amount: o.earned_amount == null ? null : money2(o.earned_amount),
  override_amount: o.override_amount == null ? null : money2(o.override_amount),
  zeroed: o.zeroed ? 1 : 0,
  tech_approved: o.tech_approved ? 1 : 0,
  office_approved: o.office_approved ? 1 : 0,
  disputed: o.disputed ? 1 : 0,
  tech_approved_by: o.tech_approved ? NAME[o.person_id] : null,
  office_approved_by: o.office_approved ? 'the office' : null,
  disputed_by: o.disputed ? NAME[o.person_id] : null,
  note: o.note || null,
  flag: o.flag || null,
  customer_name: o.customer_name == null ? null : o.customer_name,
  job_id: o.job_id == null ? null : o.job_id,
  invoice_id: o.invoice_id == null ? null : o.invoice_id,
  done_day: o.done_day == null ? null : o.done_day,
  paid_day: o.paid_day == null ? null : o.paid_day,
  job_type: o.job_type || null,
  rule_kind: o.rule_kind || null,
  rule_job_type: o.rule_job_type || null,
  tnfr_scope: o.tnfr_scope || null,
  spiff_event: o.spiff_event || null,
  above_tier: o.above_tier || null,
  attributed_person_id: o.attributed_person_id == null ? null : o.attributed_person_id,
  counterpart: o.counterpart || null,
  deferred_from_slot: o.deferred_from_slot == null ? null : o.deferred_from_slot,
  pulled_forward_invoice: o.pulled_forward_invoice == null ? null : o.pulled_forward_invoice,
  paid_ahead_advance: o.paid_ahead_advance == null ? null : money2(o.paid_ahead_advance),
  releasable: o.releasable ? 1 : 0,
});

// payable is derived exactly the way the engine re-derives it after an edit, so a
// baked line and an edited line can never disagree about the rule.
const payableOf = (l) => (l.zeroed ? 0 : l.override_amount != null ? l.override_amount : l.computed_amount);

/* ---------- a plain auto job-type line, for the bulk of the history ---------- */
function autoLine(personId, opts = {}) {
  const inv = invId();
  const scope = rnd() < 0.6 ? 'equipment' : 'service';
  const basis = priceInvoice(inv, scope, scope === 'equipment' ? ri(4200, 19000) : ri(600, 3400));
  const pct = pick([3, 4, 5, 8]);
  return line({
    person_id: personId,
    kind: 'tnfr',
    tnfr_scope: scope,
    rule_kind: 'tnfr',
    basis,
    pct,
    computed_amount: basis * pct / 100,
    customer_name: pick(CUSTOMERS),
    job_id: jobId(),
    invoice_id: inv,
    job_type: pick(JOB_TYPES),
    done_day: ri(-9, 2),
    paid_day: ri(3, 13),
    ...opts,
  });
}

/* ---------- the current, open period: the feature-coverage matrix ---------- */
// Every distinct thing the tracker can show is represented exactly once here, so the
// iframe on /dashboards is a tour of the product rather than a wall of similar rows.
const CURRENT = [];

// 1. a straightforward TNFR equipment line, tier chips, both sign-offs
{
  const inv = invId();
  const basis = priceInvoice(inv, 'equipment', 14600);
  CURRENT.push(line({
    person_id: 1, kind: 'tnfr', tnfr_scope: 'equipment', rule_kind: 'tnfr',
    basis, pct: 8, computed_amount: basis * 0.08,
    customer_name: 'Nordling, Elin & Gus', job_id: jobId(), invoice_id: inv,
    job_type: 'Install Residential', done_day: -4, paid_day: 2, week_slot: 0,
    tech_approved: 1, office_approved: 1,
  }));
}

// 2 + 3. the turnover pair: Anders generated the lead, Chidi closed it. Each row names
//        the other, which is the whole point of the counterpart field.
{
  const inv = invId();
  const basis = priceInvoice(inv, 'equipment', 11250);
  CURRENT.push(line({
    person_id: 1, kind: 'job_type', rule_kind: 'job_type', rule_job_type: 'Install Residential',
    basis, pct: 5, computed_amount: basis * 0.05, counterpart: 'Anders Vellen',
    customer_name: 'Havermark, Petra', job_id: jobId(), invoice_id: inv,
    job_type: 'Install Residential', done_day: -2, paid_day: 4, week_slot: 0,
    tech_approved: 1,
  }));
  CURRENT.push(line({
    person_id: 4, kind: 'lead_gen', rule_kind: 'lead_gen', share: 0.5,
    basis, pct: 3, computed_amount: basis * 0.03 * 0.5, counterpart: 'Chidi Okafor',
    customer_name: 'Havermark, Petra', job_id: jobId(), invoice_id: inv,
    job_type: 'Install Residential', done_day: -2, paid_day: 4, week_slot: 0,
    flag: 'even_split', note: 'Two techs on site, split even.',
  }));
}

// 4. a tier-gated rule: the line exists only because the invoice cleared Gold
{
  const inv = invId();
  const basis = priceInvoice(inv, 'equipment', 17900);
  CURRENT.push(line({
    person_id: 2, kind: 'job_type', rule_kind: 'job_type', rule_job_type: 'Install Residential',
    basis, pct: 3, computed_amount: basis * 0.03, above_tier: 'C',
    customer_name: 'Holmquist, Otto & Signe', job_id: jobId(), invoice_id: inv,
    job_type: 'Install Residential', done_day: -1, paid_day: 5, week_slot: 0,
    office_approved: 1,
  }));
}

// 5. an overridden line: the computed number stays visible next to what actually pays
{
  const inv = invId();
  const basis = priceInvoice(inv, 'service', 2870);
  CURRENT.push(line({
    person_id: 5, kind: 'tnfr', tnfr_scope: 'service', rule_kind: 'tnfr',
    basis, pct: 4, computed_amount: basis * 0.04, override_amount: basis * 0.055,
    note: 'Bumped for the Saturday callback.',
    customer_name: 'Lindstrand, Astrid', job_id: jobId(), invoice_id: inv,
    job_type: 'Service Repair', done_day: 1, paid_day: 6, week_slot: 0,
  }));
}

// 6. a zeroed line: the work was redone under warranty, so nothing pays
{
  const inv = invId();
  const basis = priceInvoice(inv, 'service', 1240);
  CURRENT.push(line({
    person_id: 4, kind: 'tnfr', tnfr_scope: 'service', rule_kind: 'tnfr',
    basis, pct: 5, computed_amount: basis * 0.05, zeroed: 1,
    note: 'Redone under warranty, no commission.',
    customer_name: 'Pekkala, Sven', job_id: jobId(), invoice_id: inv,
    job_type: 'Service Repair', done_day: -6, paid_day: 3, week_slot: 0,
  }));
}

// 7. a disputed line: raised off last period's printed statement, still on the books
{
  const inv = invId();
  const basis = priceInvoice(inv, 'equipment', 8900);
  CURRENT.push(line({
    person_id: 3, kind: 'job_type', rule_kind: 'job_type', rule_job_type: 'Install Residential',
    basis, pct: 5, computed_amount: basis * 0.05, disputed: 1,
    note: 'Says the second unit was on this ticket too. Checking the estimate.',
    customer_name: 'Kolstad, Mabel', job_id: jobId(), invoice_id: inv,
    job_type: 'Install Residential', done_day: -3, paid_day: 7, week_slot: 1,
  }));
}

// 8. a $10 Comfort Club sale spiff and 9. a $5 renewal
CURRENT.push(line({
  person_id: 2, kind: 'spiff', rule_kind: 'spiff', spiff_event: 'membership_new',
  computed_amount: 10, customer_name: 'Eikland, Britta', job_id: jobId(), invoice_id: invId(),
  job_type: 'Maintenance', done_day: 0, paid_day: 5, week_slot: 0, tech_approved: 1,
}));
CURRENT.push(line({
  person_id: 5, kind: 'spiff', rule_kind: 'spiff', spiff_event: 'membership_renewal',
  computed_amount: 5, customer_name: 'Ruonala, Greta', job_id: jobId(), invoice_id: invId(),
  job_type: 'Maintenance', done_day: 2, paid_day: 8, week_slot: 1,
}));

// 10. a manual line added by hand
CURRENT.push(line({
  person_id: 3, kind: 'manual', source: 'manual', computed_amount: 150,
  note: 'Referral bonus for the Granite Bay lead.', done_day: null, paid_day: null,
  week_slot: 1,
}));

// 11. a line moved here from the previous pay period
{
  const inv = invId();
  const basis = priceInvoice(inv, 'equipment', 6400);
  CURRENT.push(line({
    person_id: 1, kind: 'tnfr', tnfr_scope: 'equipment', rule_kind: 'tnfr',
    basis, pct: 8, computed_amount: basis * 0.08, deferred_from_slot: -1,
    customer_name: 'Kettunen, Nils', job_id: jobId(), invoice_id: inv,
    job_type: 'Install Residential', done_day: -12, paid_day: -3, week_slot: 0,
  }));
}

// 12 + 13. the paid-ahead pair: a stand-in line paid the advance early, and the real
//          line landed this period carrying what is left. The printed statement spells
//          the three figures out.
{
  const inv = invId();
  const basis = priceInvoice(inv, 'equipment', 9350);
  const earned = money2(basis * 0.05);
  const advance = money2(earned * 0.88);
  CURRENT.push(line({
    person_id: 3, kind: 'manual', source: 'manual', computed_amount: advance,
    note: 'Paid ahead on the Sorvaag changeout.', pulled_forward_invoice: inv,
    customer_name: 'Sorvaag, Ingrid', job_id: jobId(), invoice_id: inv,
    week_slot: 0, done_day: null, paid_day: null,
  }));
  CURRENT.push(line({
    person_id: 3, kind: 'job_type', rule_kind: 'job_type', rule_job_type: 'Install Residential',
    basis, pct: 5, computed_amount: money2(earned - advance),
    earned_amount: earned, paid_ahead_advance: advance,
    customer_name: 'Sorvaag, Ingrid', job_id: jobId(), invoice_id: inv,
    job_type: 'Install Residential', done_day: -5, paid_day: 9, week_slot: 1,
  }));
}

// 14. a releasable orphan: the rules no longer derive it, but a human note kept it
{
  const inv = invId();
  const basis = priceInvoice(inv, 'service', 980);
  CURRENT.push(line({
    person_id: 4, kind: 'tnfr', tnfr_scope: 'service', rule_kind: 'tnfr',
    basis, pct: 5, computed_amount: basis * 0.05, releasable: 1,
    note: 'Rate rule retired mid period; left here to be looked at.',
    customer_name: 'Marek, Hank', job_id: jobId(), invoice_id: inv,
    job_type: 'Plumbing Service', done_day: -8, paid_day: 1, week_slot: 0,
  }));
}

// 15+. the ordinary rest of the fortnight, so the cards look like a real period
for (const [personId, n] of [[1, 3], [2, 3], [3, 2], [4, 2], [5, 2]]) {
  for (let i = 0; i < n; i++) CURRENT.push(autoLine(personId, { paid_day: ri(1, 12) }));
}

/* ---------- attention strip ---------- */
const attnRow = (o) => ({
  invoice_id: o.invoice_id, component: o.component, reason: o.reason,
  detail: o.detail || null, total: money2(o.total), paid_day: o.paid_day,
  job_id: o.job_id, customer_name: o.customer_name, job_type: o.job_type || null,
  seller_name: o.seller_name == null ? null : o.seller_name,
  attributed_person_id: o.attributed_person_id == null ? null : o.attributed_person_id,
});
const UNMATCHED = [
  attnRow({ invoice_id: invId(), component: 'job_type', reason: 'no_person',
    total: 12480, paid_day: 4, job_id: jobId(), customer_name: 'Vasterberg, Liv',
    job_type: 'Install Residential', seller_name: 'Theo Lindqvist' }),
  attnRow({ invoice_id: invId(), component: 'job_type', reason: 'no_earner',
    total: 3120, paid_day: 6, job_id: jobId(), customer_name: 'Granlund, Emil',
    job_type: 'Service Repair', seller_name: null }),
  attnRow({ invoice_id: invId(), component: 'lead_gen', reason: 'no_rule',
    total: 7640, paid_day: 8, job_id: jobId(), customer_name: 'Ivarson, Selma',
    job_type: 'Install Residential', seller_name: 'Cole Bratsven' }),
];
const DISMISSED = [
  attnRow({ invoice_id: invId(), component: 'job_type', reason: 'no_rule',
    total: 285, paid_day: 2, job_id: jobId(), customer_name: 'Lofgren, Arvid',
    job_type: 'Maintenance', seller_name: 'Holly Brandt' }),
];

/* ---------- upcoming: sold and priced, not paid yet ---------- */
const upcomingRow = (o) => {
  const inv = invId();
  const basis = priceInvoice(inv, o.scope || 'equipment', o.target);
  return {
    person_id: o.person_id, person: NAME[o.person_id], kind: o.kind || 'tnfr',
    invoice_id: inv, rule_id: o.rule_id, share: null, basis, pct: o.pct,
    computed_amount: money2(basis * o.pct / 100),
    job_type: o.job_type, job_id: jobId(), customer_name: o.customer_name,
    agency_pending: o.agency_pending == null ? 0 : money2(o.agency_pending),
    tnfr_scope: o.scope || 'equipment',
  };
};
const UPCOMING = [
  upcomingRow({ person_id: 1, rule_id: 11, pct: 8, target: 15900, job_type: 'Install Residential', customer_name: 'Norgard, Cora' }),
  upcomingRow({ person_id: 2, rule_id: 12, pct: 5, target: 8400, job_type: 'Install Residential', customer_name: 'Rustad, Wade' }),
  // the agency-pending one: zeroed out of AR with COMPLETE CALL, so it offers no button
  upcomingRow({ person_id: 3, rule_id: 13, pct: 5, target: 21400, job_type: 'Install Commercial', customer_name: 'Thorvald, Opal', agency_pending: 21400 }),
];

/* ---------- Comfort Club backlog: sales that never reached a pay period ---------- */
const starSale = (o) => ({
  membership_id: o.membership_id, from_day: o.from_day, customer_name: o.customer_name,
  customer_id: custId(), sale_invoice_id: o.no_invoice ? null : invId(),
  is_renewal: o.is_renewal ? 1 : 0, amount: o.is_renewal ? 5 : 10,
});
const STAR_BACKLOG = [
  { person_id: 2, name: NAME[2], sales: [
    starSale({ membership_id: 90114, from_day: -46, customer_name: 'Ulvestad, Dell' }),
    starSale({ membership_id: 90152, from_day: -38, customer_name: 'Zetterlund, June', is_renewal: 1 }),
    starSale({ membership_id: 90188, from_day: -24, customer_name: 'Byrnes, Cliff', no_invoice: 1 }),
  ] },
  { person_id: 5, name: NAME[5], sales: [
    starSale({ membership_id: 90163, from_day: -33, customer_name: 'Quimby, Vera', is_renewal: 1 }),
    starSale({ membership_id: 90201, from_day: -18, customer_name: 'Slagle, Ray' }),
  ] },
];
for (const g of STAR_BACKLOG) g.total = money2(g.sales.reduce((t, s) => t + s.amount, 0));

/* ---------- the closed history: two exported periods and one approved ---------- */
function historyPeriod(slot, status) {
  const lines = [];
  for (const p of PEOPLE) {
    for (let i = 0, n = ri(3, 6); i < n; i++) {
      const l = autoLine(p.id, { tech_approved: 1, office_approved: rnd() < 0.85 ? 1 : 0 });
      // a closed period still shows the odd hand-edited row: that history is the point
      if (rnd() < 0.12) { l.override_amount = money2(l.computed_amount * (1 + rnd() * 0.2)); l.note = 'Adjusted at close.'; }
      lines.push(l);
    }
  }
  if (slot === -1) {
    // the previous period keeps one open question, so Reopen has something to be for
    lines[ri(0, lines.length - 1)].disputed = 1;
  }
  return { slot, status, lines, unmatched: [], dismissed: [] };
}

const PERIODS = [
  historyPeriod(-3, 'exported'),
  historyPeriod(-2, 'exported'),
  historyPeriod(-1, 'approved'),
  { slot: 0, status: 'open', lines: CURRENT, unmatched: UNMATCHED, dismissed: DISMISSED },
  // the next period exists but has not begun: a deferred line is what first lands in it
  { slot: 1, status: 'open', lines: [], unmatched: [], dismissed: [] },
];

for (const p of PERIODS) for (const l of p.lines) l.payable = payableOf(l);

// tier chips come from this map, and only invoices carrying B-E items appear in it.
// Sort each invoice's items the way the server does (biggest first).
for (const k of Object.keys(tnfrItems)) tnfrItems[k].sort((a, b) => b.total - a.total);

const out = {
  company: 'Boreal Comfort Co',
  people: PEOPLE,
  activePeople: PEOPLE.map((p) => ({ id: p.id, name: p.name })),
  periods: PERIODS,
  upcoming: UPCOMING,
  starBacklog: STAR_BACKLOG,
  tnfrItems,
  // the paid floor the footer note names: everything older is out of scope
  floorDaysAgo: 120,
};

fs.writeFileSync(OUT, JSON.stringify(out));
const lineCount = PERIODS.reduce((n, p) => n + p.lines.length, 0);
console.log(`commission demo data written: ${OUT} (${PERIODS.length} periods, ${lineCount} lines, ${Object.keys(tnfrItems).length} priced invoices)`);
