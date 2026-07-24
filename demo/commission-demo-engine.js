/* ==== demo engine ====================================================
   The commission tracker talks to its server through exactly three
   chokepoints (a period read, a period-list read, one write path) plus a
   single navigation for the payroll download. make-commission-demo.js
   swaps all four for the functions below, so the baked artifact contains
   no fetch at all rather than a shimmed one.

   Every name, dollar and note in DEMO_DB is invented (Boreal Comfort Co),
   and the whole thing lives in memory: edits move the numbers above them
   the way the real product does, and a reload throws them away.

   Dates are day offsets, resolved against today at load, so the demo
   always shows the fortnight we are actually in and never looks stale.
   ==================================================================== */
const DEMO_DB = __DEMO_DATA__;

/* ---- pay-period math, copied from the tracker's server ----
   Anchor Monday 2026-07-06, fortnightly from there, and "today" read as an
   America/Chicago calendar date (en-CA formats as YYYY-MM-DD). A pay week is
   a local week, so asking the clock for a UTC date would land the whole page
   a period early for the evening hours Chicago is still on the previous day. */
const DEMO_DAY = 864e5;
const DEMO_ANCHOR = '2026-07-06';
const dUtc = (d) => Date.parse(d + 'T00:00:00Z');
const dAdd = (d, n) => new Date(dUtc(d) + n * DEMO_DAY).toISOString().slice(0, 10);
const DEMO_YMD = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Chicago', year: 'numeric', month: '2-digit', day: '2-digit' });
const dMonday = (d) => { const t = new Date(dUtc(d)); t.setUTCDate(t.getUTCDate() - ((t.getUTCDay() + 6) % 7)); return t.toISOString().slice(0, 10); };
const dPeriodOf = (w) => dAdd(DEMO_ANCHOR, Math.floor((dUtc(w) - dUtc(DEMO_ANCHOR)) / (14 * DEMO_DAY)) * 14);
const dWeeks = (p) => [p, dAdd(p, 7)];
const dMd = (d) => { const s = d.split('-'); return (+s[1]) + '/' + (+s[2]) + '/' + s[0]; };
const dLabel = (id) => dMd(id) + ' - ' + dMd(dAdd(id, 13));
const dRound = (n) => Math.round(n * 100) / 100;

const DEMO_TODAY = DEMO_YMD.format(new Date());
const DEMO_CURRENT = dPeriodOf(dMonday(DEMO_TODAY));
// How far into the current fortnight we are. The open period's day offsets are
// squeezed into that span, so nothing in it carries a date that has not happened yet
// however early in the period somebody opens the page.
const DEMO_ELAPSED = Math.min(13, Math.max(0, Math.round((dUtc(DEMO_TODAY) - dUtc(DEMO_CURRENT)) / DEMO_DAY)));
// The nightly ServiceTitan pull plus compute, about five hours ago: inside the
// tracker's 26 hour staleness window, so the freshness dot reads green.
const DEMO_PULL_AT = new Date(Date.now() - 5.2 * 3600e3).toISOString();
const DEMO_COMPUTED_AT = new Date(Date.now() - 5 * 3600e3).toISOString();

const demoPerson = (id) => DEMO_DB.people.filter((x) => x.id === id)[0] || { id, name: 'Unknown', note: null };

// Sign-off tooltips carry who set the mark and when, the way the server's audit join does.
function demoStampMarks(l) {
  const at = (l.paid_on || DEMO_TODAY) + 'T09:12:00';
  for (const c of ['tech_approved', 'office_approved', 'disputed']) l[c + '_at'] = l[c] ? at : null;
}

/* ---- the store: period id -> the mutable period. Offsets become real dates here. ---- */
const DEMO_STORE = new Map();
for (const p of DEMO_DB.periods) {
  const id = dAdd(DEMO_CURRENT, p.slot * 14);
  const weeks = dWeeks(id);
  const scale = p.slot === 0 ? DEMO_ELAPSED / 13 : 1;
  const day = (off) => dAdd(id, off > 0 ? Math.round(off * scale) : off);
  p.id = id;
  for (const l of p.lines) {
    l.week_id = weeks[l.week_slot] || weeks[0];
    l.person = demoPerson(l.person_id).name;
    l.paid_on = l.paid_day == null ? null : day(l.paid_day);
    l.job_completed_on = l.done_day == null ? null : day(l.done_day);
    if (l.deferred_from_slot != null) {
      const src = dAdd(id, l.deferred_from_slot * 14);
      l.deferred_from = dWeeks(src)[1];
      l.deferred_from_label = dLabel(src);
    } else { l.deferred_from = null; l.deferred_from_label = null; }
    demoStampMarks(l);
  }
  for (const u of p.unmatched.concat(p.dismissed)) u.paid_on = day(u.paid_day);
  DEMO_STORE.set(id, p);
}
for (const g of DEMO_DB.starBacklog) for (const s of g.sales) s.from_date = dAdd(DEMO_TODAY, s.from_day);
DEMO_DB.upcoming.forEach((u, i) => { u.invoice_date = dAdd(DEMO_TODAY, -3 - i * 4); });

/* ---- read: the period list the picker is built from ---- */
function demoPeriods() {
  const periods = [...DEMO_STORE.values()].map((p) => ({
    id: p.id, label: dLabel(p.id), weeks: dWeeks(p.id), status: p.status,
    lines: p.lines.length,
    payable: dRound(p.lines.reduce((s, l) => s + (l.payable || 0), 0)),
  })).sort((a, b) => (a.id < b.id ? 1 : -1));
  return { periods, current: DEMO_CURRENT, next: dAdd(DEMO_CURRENT, 14),
    previous: dAdd(DEMO_CURRENT, -14), floor: dAdd(DEMO_TODAY, -DEMO_DB.floorDaysAgo) };
}

/* ---- read: one period, shaped exactly like the server's getPeriod ----
   The per-person aggregates are derived here rather than baked, which is what lets
   an override typed into the demo move the card total and the company total with it. */
function demoPeriod(id) {
  const p = DEMO_STORE.get(id) || { id, status: 'open', lines: [], unmatched: [], dismissed: [] };
  const isCurrent = id === DEMO_CURRENT;
  const byPerson = new Map();
  for (const l of p.lines) {
    if (!byPerson.has(l.person_id)) {
      byPerson.set(l.person_id, { person_id: l.person_id, name: l.person, note: demoPerson(l.person_id).note,
        payable: 0, computed: 0, lines: 0, overrides: 0, zeroed: 0, flagged: 0,
        tech_approved: 0, office_approved: 0, disputed: 0 });
    }
    const a = byPerson.get(l.person_id);
    a.payable = dRound(a.payable + (l.payable || 0));
    a.computed = dRound(a.computed + (l.computed_amount || 0));
    a.lines += 1;
    if (l.override_amount != null) a.overrides += 1;
    if (l.zeroed) a.zeroed += 1;
    if (l.flag) a.flagged += 1;
    if (l.tech_approved) a.tech_approved += 1;
    if (l.office_approved) a.office_approved += 1;
    if (l.disputed) a.disputed += 1;
  }
  const order = DEMO_DB.people.map((x) => x.id);
  const people = [...byPerson.values()].sort((a, b) => order.indexOf(a.person_id) - order.indexOf(b.person_id));
  const blockers = p.status === 'open' ? ['the ' + dLabel(id) + ' pay period is not approved yet'] : [];
  return {
    period: { id, label: dLabel(id), weeks: dWeeks(id), status: p.status },
    people, lines: p.lines, unmatched: p.unmatched, dismissed: p.dismissed,
    upcoming: isCurrent ? DEMO_DB.upcoming : [],
    starBacklog: isCurrent ? DEMO_DB.starBacklog : [],
    starPayWeek: isCurrent && p.status === 'open'
      ? (dWeeks(id).filter((w) => w <= DEMO_TODAY).pop() || null) : null,
    tnfrItems: DEMO_DB.tnfrItems,
    total: dRound(people.reduce((s, x) => s + x.payable, 0)),
    exportBlockers: blockers,
    recomputePending: false,
    lastComputedAt: DEMO_COMPUTED_AT,
    lastPullAt: DEMO_PULL_AT,
    nextPeriodId: dAdd(id, 14), nextPeriodLabel: dLabel(dAdd(id, 14)),
    lastPeriodId: dAdd(id, -14), lastPeriodLabel: dLabel(dAdd(id, -14)),
    isCurrent,
    activePeople: DEMO_DB.activePeople,
  };
}

/* ---- writes ---- */
let DEMO_NEXT_ID = 900000;
function demoNewLine(period, o) {
  const blank = {
    id: ++DEMO_NEXT_ID,
    week_id: dWeeks(period.id).filter((w) => w <= DEMO_TODAY).pop() || dWeeks(period.id)[0],
    person: demoPerson(o.person_id).name, kind: 'manual', source: 'manual',
    share: null, basis: null, pct: null, computed_amount: 0, earned_amount: null,
    override_amount: null, zeroed: 0, tech_approved: 0, office_approved: 0, disputed: 0,
    tech_approved_at: null, office_approved_at: null, disputed_at: null,
    note: null, flag: null, customer_name: null, job_id: null, invoice_id: null,
    paid_on: null, job_completed_on: null, job_type: null, rule_kind: null, rule_job_type: null,
    tnfr_scope: null, spiff_event: null, above_tier: null, attributed_person_id: null,
    counterpart: null, deferred_from: null, deferred_from_label: null,
    pulled_forward_invoice: null, paid_ahead_advance: null, releasable: 0,
  };
  const l = Object.assign(blank, o);
  l.payable = l.zeroed ? 0 : (l.override_amount != null ? l.override_amount : l.computed_amount);
  return l;
}

// The payroll file the real export writes, built in the browser instead of on a server.
function demoCsvRows(p) {
  const by = new Map();
  for (const l of p.lines) by.set(l.person, dRound((by.get(l.person) || 0) + (l.payable || 0)));
  return [...by.entries()].filter((e) => e[1] !== 0).map((e) => ({ name: e[0], amount: e[1] }))
    .sort((a, b) => a.name.localeCompare(b.name));
}
function demoDownloadCsv(batch) {
  const p = DEMO_STORE.get(CURRENT);
  if (!p) return;
  // A leading =, + or @ makes a spreadsheet treat the cell as a formula, same guard
  // the server's buildCsv applies.
  const cell = (v) => {
    const s = String(v);
    const safe = /^[=+@-]/.test(s) ? "'" + s : s;
    return /[",\n]/.test(safe) ? '"' + safe.split('"').join('""') + '"' : safe;
  };
  const label = dLabel(p.id);
  const csv = ['Employee name,Commission,Memo'].concat(demoCsvRows(p)
    .map((r) => [cell(r.name), r.amount.toFixed(2), cell('Commission ' + label)].join(','))).join('\n') + '\n';
  const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
  const a = document.createElement('a');
  a.href = url;
  a.download = 'commission-' + batch + '.csv';
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}

// The one write path. Throws the way the server does, so the page's error toasts and
// its reload-after-failure behaviour are exercised rather than bypassed.
function demoWrite(route, body) {
  const p = DEMO_STORE.get(CURRENT);
  if (!p) throw new Error('that pay period is not loaded');
  const find = (id) => p.lines.filter((l) => l.id === Number(id))[0];
  const repay = (l) => { l.payable = l.zeroed ? 0 : (l.override_amount != null ? l.override_amount : l.computed_amount); };

  if (route === '/api/line') {
    const l = find(body.id);
    if (!l) throw new Error('unknown line');
    const v = body.value;
    const blank = v == null || v === '';
    if (body.action === 'override') { l.override_amount = blank ? null : dRound(Number(v)); repay(l); }
    else if (body.action === 'override_pct') {
      if (blank) l.override_amount = null;
      else {
        const rate = Number(v);
        if (!(rate >= 0 && rate <= 100)) throw new Error('a rate override has to be between 0 and 100');
        if (!l.basis) throw new Error('this line has no basis, so a rate cannot apply to it');
        l.override_amount = dRound(l.basis * rate / 100);
      }
      repay(l);
    } else if (body.action === 'zero') { l.zeroed = Number(v) ? 1 : 0; repay(l); }
    else if (body.action === 'note') { l.note = String(v || '').trim() || null; }
    else if (body.action === 'clear_flag') { l.flag = null; }
    else if (body.action === 'tech_approved' || body.action === 'office_approved' || body.action === 'disputed') {
      l[body.action] = Number(v) ? 1 : 0;
      l[body.action + '_by'] = l[body.action] ? (body.action === 'tech_approved' ? l.person : 'the office') : null;
      l[body.action + '_at'] = l[body.action] ? new Date().toISOString() : null;
    } else throw new Error('unknown action');
    return {};
  }

  if (route === '/api/line/add') {
    const note = String(body.note || '').trim();
    const amount = Number(body.amount);
    if (!note) throw new Error('a manual line needs a note saying why');
    if (!Number.isFinite(amount) || amount === 0) throw new Error('a manual line needs an amount');
    if (p.status !== 'open') throw new Error('this pay period is ' + p.status + '; reopen it first');
    p.lines.push(demoNewLine(p, { person_id: Number(body.person_id), computed_amount: dRound(amount), note }));
    return {};
  }

  if (route === '/api/attribute') {
    const row = p.unmatched.filter((u) => u.invoice_id === Number(body.invoice_id))[0];
    if (!row) throw new Error('that row is no longer waiting');
    if (body.person_id == null) { row.attributed_person_id = null; return {}; }
    // The real tracker records the seller and the next nightly recompute derives the
    // line from it. The demo does both at once, so the strip and the card move together.
    row.attributed_person_id = Number(body.person_id);
    p.unmatched.splice(p.unmatched.indexOf(row), 1);
    const rate = 5;
    p.lines.push(demoNewLine(p, {
      person_id: Number(body.person_id), kind: 'job_type', source: 'auto',
      rule_kind: 'job_type', rule_job_type: row.job_type, basis: row.total, pct: rate,
      computed_amount: dRound(row.total * rate / 100), customer_name: row.customer_name,
      job_id: row.job_id, invoice_id: row.invoice_id, job_type: row.job_type,
      paid_on: row.paid_on, job_completed_on: row.paid_on,
      attributed_person_id: Number(body.person_id),
    }));
    return {};
  }

  if (route === '/api/dismiss') {
    const from = body.dismiss ? p.unmatched : p.dismissed;
    const to = body.dismiss ? p.dismissed : p.unmatched;
    const i = from.findIndex((u) => u.invoice_id === Number(body.invoice_id) && u.component === body.component);
    if (i < 0) throw new Error('that row has already moved');
    to.push(from.splice(i, 1)[0]);
    return {};
  }

  if (route === '/api/pull-forward') {
    const i = DEMO_DB.upcoming.findIndex((u) => u.invoice_id === Number(body.invoice_id)
      && u.person_id === Number(body.person_id) && u.rule_id === Number(body.rule_id));
    if (i < 0) throw new Error('that projected line is no longer waiting');
    const u = DEMO_DB.upcoming[i];
    if (u.agency_pending > 0) throw new Error('this invoice was zeroed out of AR, so there is no payment to pay ahead of');
    DEMO_DB.upcoming.splice(i, 1);
    const cur = DEMO_STORE.get(DEMO_CURRENT);
    cur.lines.push(demoNewLine(cur, {
      person_id: u.person_id, computed_amount: u.computed_amount, pulled_forward_invoice: u.invoice_id,
      customer_name: u.customer_name, job_id: u.job_id, invoice_id: u.invoice_id,
      note: 'Paid ahead from upcoming.',
    }));
    return {};
  }

  if (route === '/api/defer') {
    const l = find(body.id);
    if (!l) throw new Error('unknown line');
    const toId = body.undo
      ? (l.deferred_from ? dPeriodOf(l.deferred_from) : null)
      : dAdd(CURRENT, body.back ? -14 : 14);
    if (!toId) throw new Error('this line has not been moved');
    const to = DEMO_STORE.get(toId);
    if (!to) throw new Error('there is no ' + dLabel(toId) + ' pay period to move it into');
    if (to.status !== 'open') throw new Error('the ' + dLabel(toId) + ' pay period is ' + to.status + '; reopen it first');
    p.lines.splice(p.lines.indexOf(l), 1);
    if (body.undo) { l.deferred_from = null; l.deferred_from_label = null; }
    else { l.deferred_from = dWeeks(CURRENT)[0]; l.deferred_from_label = dLabel(CURRENT); }
    l.week_id = dWeeks(toId)[0];
    to.lines.push(l);
    return {};
  }

  if (route === '/api/release-line') {
    const l = find(body.id);
    if (!l) throw new Error('unknown line');
    if (!l.releasable) throw new Error('the rules still derive this line, so it cannot be removed');
    p.lines.splice(p.lines.indexOf(l), 1);
    return {};
  }

  if (route === '/api/period') {
    if (body.action === 'approve') {
      if (!p.lines.length) throw new Error('this pay period has no lines to approve');
      if (p.id > DEMO_CURRENT) throw new Error('this pay period has not started yet');
      p.status = 'approved';
    } else if (body.action === 'reopen') {
      p.status = 'open';
    } else throw new Error('unknown action');
    return {};
  }

  if (route === '/api/recompute') return {};

  if (route === '/api/star-backlog') {
    const ids = (body.membership_ids || []).map(Number);
    const cur = DEMO_STORE.get(DEMO_CURRENT);
    let resolved = 0;
    let written = 0;
    for (const g of DEMO_DB.starBacklog) {
      const taken = g.sales.filter((s) => ids.indexOf(s.membership_id) >= 0);
      if (!taken.length) continue;
      g.sales = g.sales.filter((s) => ids.indexOf(s.membership_id) < 0);
      g.total = dRound(g.sales.reduce((t, s) => t + s.amount, 0));
      resolved += taken.length;
      if (body.action === 'pay') {
        written += 1;
        cur.lines.push(demoNewLine(cur, {
          person_id: g.person_id,
          computed_amount: dRound(taken.reduce((t, s) => t + s.amount, 0)),
          note: 'Comfort Club backlog, ' + taken.length + ' sale' + (taken.length === 1 ? '' : 's') + '.',
        }));
      }
    }
    if (!resolved) throw new Error('none of those sales are still in the backlog');
    DEMO_DB.starBacklog = DEMO_DB.starBacklog.filter((g) => g.sales.length);
    return { resolved, lines: written };
  }

  if (route === '/api/export') {
    if (p.status === 'open') throw new Error('approve this pay period before exporting it');
    const rows = demoCsvRows(p);
    p.status = 'exported';
    return { rows: rows.length, total: dRound(rows.reduce((s, r) => s + r.amount, 0)), batch: p.id };
  }

  throw new Error('that control is not wired up in this demo');
}

/* ---- portal projection ----
   The tech portal is the same store seen by one earner, exactly as the server's
   portalView allowlist projects it: their own lines, their own total, and nothing
   cross-person. Only the portal artifact calls these; the master bake carries them
   unused rather than maintaining a second copy of the engine. */
const DEMO_PORTAL_PERSON = 2;
function demoPortalPeriod(id) {
  const full = demoPeriod(id);
  const who = demoPerson(DEMO_PORTAL_PERSON);
  const lines = full.lines.filter((l) => l.person_id === DEMO_PORTAL_PERSON);
  return {
    role: 'portal',
    person: { id: who.id, name: who.name, note: who.note },
    period: full.period, lines,
    total: dRound(lines.reduce((s, l) => s + (l.payable || 0), 0)),
    lastComputedAt: full.lastComputedAt, lastPullAt: full.lastPullAt,
  };
}
function demoPortalPeriods() {
  const p = demoPeriods();
  return {
    periods: p.periods.map((x) => ({ id: x.id, label: x.label, weeks: x.weeks, status: x.status })),
    current: p.current, next: p.next, previous: p.previous,
  };
}
function demoPortalUpcoming() {
  return {
    preview: false, // a real tech, not the office previewing their page
    starBacklog: DEMO_DB.starBacklog.filter((g) => g.person_id === DEMO_PORTAL_PERSON)[0] || null,
    invoices: DEMO_DB.upcoming.filter((u) => u.person_id === DEMO_PORTAL_PERSON),
  };
}
/* ==== end demo engine ================================================ */
