#!/usr/bin/env node
// make-demo-data.js — fully synthetic ServiceTitan-shaped data for the
// mangocatalyst /dashboards demo. Fictional company: Boreal Comfort Co,
// sized ~2.5x NorthStar (the shops we are pitching). Every name, dollar,
// and sentence here is invented; privacy-validator.js proves it after the bake.
// Deterministic: seeded PRNG, so a re-bake on the same day is reproducible.
'use strict';
const fs = require('node:fs');
const path = require('node:path');

const OUT = path.join(__dirname, 'build');
const DATA = path.join(OUT, 'data');
fs.mkdirSync(DATA, { recursive: true });
// stale archives would resurrect the pager's prev link
for (const f of fs.readdirSync(OUT)) if (/^report-\d{4}-\d{2}-\d{2}\.html$/.test(f) || f === 'index.html') fs.unlinkSync(path.join(OUT, f));

/* ---------- seeded PRNG (mulberry32) ---------- */
let seed = 20260713;
const rnd = () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
const ri = (a, b) => a + Math.floor(rnd() * (b - a + 1));
const pick = a => a[Math.floor(rnd() * a.length)];

/* ---------- dates ---------- */
const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Chicago' }).format(new Date());
const addDays = (d, n) => { const x = new Date(`${d}T12:00:00Z`); x.setUTCDate(x.getUTCDate() + n); return x.toISOString().slice(0, 10); };
const dow = d => new Date(`${d}T12:00:00Z`).getUTCDay();
const R = addDays(today, -1);            // report day = yesterday, like the live pull
const windowStart = addDays(R, -89);

/* ---------- the fictional crew ---------- */
const ROSTER = {
  service: ['Marcus Vellen', 'Dana Kirsch', 'Priya Nathan', 'Cole Bratsven', 'Theo Lindqvist'],
  sales: ['Sam Okafor', 'Jenna Marsh', 'Victor Reyes'],
  installers: ['Eli Thornton', 'Owen Stavros', 'Miguel Ferrer', 'Jack Pruitt', 'Andre Wilkes', 'Toby Nash'],
  helpers: ['Ryan Pelto', 'Chris Doyle', 'Lena Voss'],
};
const CSRS = ['Holly Brandt', 'Aaron Sietsema', 'Maya Quist', 'Derek Fontaine'];
// sellers: comfort advisors plus the two selling service techs the template names
const SELLERS = ['Sam Okafor', 'Jenna Marsh', 'Victor Reyes', 'Marcus Vellen', 'Dana Kirsch'];
const SELLER_W = [.30, .25, .18, .15, .12];
const pickSeller = () => { let r = rnd(), i = 0; while (i < SELLER_W.length - 1 && (r -= SELLER_W[i]) > 0) i++; return SELLERS[i]; };

/* ---------- fictional customers ---------- */
const FIRSTS = ['Elin', 'Marta', 'Gus', 'Petra', 'Nils', 'Roald', 'Ingrid', 'Selma', 'Arvid', 'Freya', 'Otto', 'Signe', 'Lars', 'Britta', 'Emil', 'Astrid', 'Sven', 'Greta', 'Oskar', 'Liv', 'Hank', 'June', 'Wade', 'Cora', 'Dell', 'Mabel', 'Ray', 'Opal', 'Cliff', 'Vera'];
const LASTS = ['Nordling', 'Havermark', 'Brandvold', 'Kettunen', 'Sorvaag', 'Lindstrand', 'Pekkala', 'Ruonala', 'Vasterberg', 'Holmquist', 'Tarvainen', 'Kolstad', 'Eikland', 'Byrnes', 'Callahan', 'Dresden', 'Fairwood', 'Granlund', 'Hollis', 'Ivarson', 'Jerpbak', 'Kirkwold', 'Lofgren', 'Marek', 'Norgard', 'Ostlund', 'Pallesen', 'Quimby', 'Rustad', 'Slagle', 'Thorvald', 'Ulvestad', 'Vance', 'Wexler', 'Yont', 'Zetterlund'];
const customer = () => {
  const last = pick(LASTS), a = pick(FIRSTS);
  return rnd() < .3 ? `${last}, ${a} & ${pick(FIRSTS)}` : `${last}, ${a}`;
};
const custId = () => ri(2_000_000, 79_999_999);
const jobId = () => ri(60_000_000, 71_999_999);

/* ---------- estimates: generated first, everything sales derives from it ---------- */
const estList = [];
for (let d = windowStart; d <= today; d = addDays(d, 1)) {
  const wknd = dow(d) === 0 || dow(d) === 6;
  const n = wknd ? ri(0, 2) : ri(6, 11);
  for (let i = 0; i < n; i++) {
    const install = rnd() < .28;
    const value = install ? ri(5, 22) * 1000 + ri(0, 999) : ri(250, 2400);
    const r = rnd();
    let status = 'Open', soldDate = null;
    if (r < .45) { soldDate = addDays(d, ri(0, 12)); if (soldDate > today) soldDate = null; else status = 'Sold'; }
    else if (r < .63) status = 'Dismissed';
    estList.push({ created: d, sold: soldDate, status, value, cust: custId(), job: soldDate ? jobId() : null, soldBy: pickSeller(), install });
  }
}
const soldByDay = {};
for (const e of estList) if (e.sold) { const o = (soldByDay[e.sold] ||= { n: 0, v: 0 }); o.n++; o.v += e.value; }

/* ---------- daily series ---------- */
const days = {};
for (let d = windowStart; d <= R; d = addDays(d, 1)) {
  const dw = dow(d), sat = dw === 6, sun = dw === 0, wknd = sat || sun;
  const bigDay = !wknd && rnd() < .15;
  const revenue = sun ? 0 : sat ? (rnd() < .5 ? 0 : ri(2, 9) * 1000)
    : Math.round(24000 + rnd() * 18000 + (bigDay ? ri(14, 36) * 1000 : 0));
  const booked = wknd ? ri(1, 4) : ri(18, 32);
  const declined = wknd ? 0 : ri(0, 3);
  const notBooked = declined + (wknd ? ri(0, 3) : ri(5, 13));
  const nonLead = wknd ? ri(2, 8) : ri(18, 34);
  const hangups = wknd ? ri(1, 6) : ri(10, 24);
  const apptsService = wknd ? ri(0, 2) : ri(14, 22);
  const apptsInstall = wknd ? 0 : ri(3, 6);
  const apptsSales = wknd ? ri(0, 1) : ri(4, 9);
  const apptsDone = apptsService + apptsInstall + apptsSales;
  const created = estList.filter(e => e.created === d).length;
  const sold = soldByDay[d] || { n: 0, v: 0 };
  const poCreated = wknd ? 0 : ri(3, 10);
  days[d] = {
    revenue, invoices: wknd ? ri(0, 3) : ri(18, 32), collected: Math.round(revenue * (.55 + rnd() * .7)),
    apptsDone, apptsCanceled: wknd ? 0 : ri(0, 4), jobsCompleted: apptsDone + ri(-2, 3),
    apptsInstall, apptsSales, apptsService,
    callsIn: booked + notBooked + nonLead + hangups, callsOut: wknd ? ri(0, 4) : ri(14, 34),
    booked, notBooked, nonLead, hangups, declined,
    estCreated: created, estSoldCount: sold.n, estSoldValue: sold.v,
    poCreated, poCreatedValue: poCreated * ri(700, 3800), poReceived: wknd ? 0 : ri(2, 9),
    presetsRun: wknd ? 0 : ri(3, 8), presetsCanceled: ri(0, 2), turnovers: wknd ? 0 : ri(0, 4),
  };
}

/* ---------- upcoming book: 30 days out, fuller near, thinner far ---------- */
const upcoming = {};
for (let i = 0; i < 30; i++) {
  const d = addDays(today, i);
  const wknd = dow(d) === 0 || dow(d) === 6;
  const decay = Math.max(.22, 1 - i * .028);
  const svcAppts = wknd ? ri(0, 2) : Math.round(ri(12, 18) * decay);
  const instAppts = wknd ? 0 : Math.max(0, Math.round(ri(2, 4) * decay + (rnd() < .3 ? 1 : 0)));
  const salesAppts = wknd ? 0 : Math.round(ri(4, 8) * decay);
  upcoming[d] = {
    scheduled: svcAppts + instAppts + salesAppts,
    svcAppts, svcHours: +(svcAppts * (1.8 + rnd() * .8)).toFixed(1),
    instAppts, instHours: instAppts * ri(7, 10), salesAppts, instCap: 60,
  };
}

/* ---------- open pipeline ---------- */
// created <= R: an estimate created "today" would show a negative age on the report
const openEsts = estList.filter(e => e.status === 'Open' && e.created >= addDays(R, -59) && e.created <= R);
const bestByCust = {};
for (const e of openEsts) if (!bestByCust[e.cust] || e.value > bestByCust[e.cust].value) bestByCust[e.cust] = e;
const bests = Object.values(bestByCust);
const unsoldEst = { value: bests.reduce((s, e) => s + e.value, 0), groups: bests.length, count: openEsts.length };
const topOpenEst = bests.sort((a, b) => b.value - a.value).slice(0, 10)
  .map(e => ({ customer: customer(), value: e.value, created: e.created, advisor: e.soldBy }));

/* ---------- WHIP ---------- */
const whip = {
  now: 10, soldValue: ri(148, 172) * 1000,
  byType: { full_system: 3, furnace: 2, mini_split: 2, heat_pump: 2, boiler: 1 },
  statuses: { Scheduled: 8, Dispatched: 2 },
};

/* ---------- Complete Call (unpaid) ---------- */
const unpaidList = [];
for (let i = 0; i < 22; i++) {
  const age = ri(1, 68);
  const total = ri(400, 16000);
  unpaidList.push({ date: addDays(R, -age), customer: customer(), cust: custId(), job: jobId(), total, balance: Math.round(total * (.4 + rnd() * .6)), age });
}
unpaidList.sort((a, b) => b.balance - a.balance);
const unpaid = { since: addDays(R, -70), count: unpaidList.length, totalBalance: unpaidList.reduce((s, u) => s + u.balance, 0), list: unpaidList };

/* ---------- people stats (rolling 7 + prev 7, like the live pull) ---------- */
const wk7 = addDays(R, -6), wk14 = addDays(R, -13);
const inWin = (e, a, b) => e.sold && e.sold >= a && e.sold <= b;
const mondayOf = d => addDays(d, -((dow(d) + 6) % 7));
const stats = {};
const blankStats = () => ({
  apptsDone: 0, installsDone: 0, salesRun: 0, recallTrips: 0,
  apptsDonePrev: 0, installsDonePrev: 0, salesRunPrev: 0, recallTripsPrev: 0,
  revenue: 0, revenueSvc: 0, revenueInst: 0, revenuePrev: 0, revenueSvcPrev: 0, revenueInstPrev: 0,
  sold: 0, soldValue: 0, soldPrev: 0, soldValuePrev: 0,
  soldInstN: 0, soldInstV: 0, soldInstNPrev: 0, soldInstVPrev: 0,
  openN: 0, openValue: 0, openOldest: null, opps: [], recalls: [], soldList: [], soldWk: {}, cohort: null,
});
for (const arr of Object.values(ROSTER)) for (const n of arr) stats[n] = blankStats();
// sellers: derive from estList
for (const name of SELLERS) {
  const s = stats[name];
  const mine = estList.filter(e => e.soldBy === name);
  const cur = mine.filter(e => inWin(e, wk7, R)), prev = mine.filter(e => inWin(e, wk14, addDays(R, -7)));
  s.sold = cur.length; s.soldValue = cur.reduce((x, e) => x + e.value, 0);
  s.soldPrev = prev.length; s.soldValuePrev = prev.reduce((x, e) => x + e.value, 0);
  const ci = cur.filter(e => e.install), pi = prev.filter(e => e.install);
  s.soldInstN = ci.length; s.soldInstV = ci.reduce((x, e) => x + e.value, 0);
  s.soldInstNPrev = pi.length; s.soldInstVPrev = pi.reduce((x, e) => x + e.value, 0);
  const open = mine.filter(e => e.status === 'Open' && e.created >= addDays(R, -59));
  s.openN = open.length; s.openValue = open.reduce((x, e) => x + e.value, 0);
  s.openOldest = open.map(e => e.created).sort()[0] || null;
  s.opps = open.sort((a, b) => b.value - a.value).slice(0, 3).map(e => ({ customer: customer(), cust: e.cust, value: e.value, created: e.created }));
  s.soldList = mine.filter(e => e.sold).sort((a, b) => b.sold.localeCompare(a.sold)).slice(0, 4)
    .map(e => ({ cust: e.cust, value: e.value, date: e.sold, customer: customer() }));
  for (const e of mine.filter(x => x.sold && x.sold >= addDays(R, -89))) {
    const wk = mondayOf(e.sold); s.soldWk[wk] = (s.soldWk[wk] || 0) + e.value;
  }
  const co = mine.filter(e => e.created >= addDays(R, -29));
  s.cohort = { sold: co.filter(e => e.status === 'Sold').length, dismissed: co.filter(e => e.status === 'Dismissed').length, pending: co.filter(e => e.status === 'Open').length, missed: ri(0, 3) };
}
// service techs: run volume + service revenue
for (const name of ROSTER.service) {
  const s = stats[name];
  s.apptsDone = ri(18, 30); s.apptsDonePrev = ri(16, 30);
  s.salesRun = SELLERS.includes(name) ? ri(4, 9) : 0; s.salesRunPrev = SELLERS.includes(name) ? ri(3, 8) : 0;
  s.recallTrips = ri(0, 1); s.recallTripsPrev = ri(0, 2);
  s.revenueSvc = ri(6, 15) * 1000 + ri(0, 900); s.revenueSvcPrev = ri(5, 14) * 1000;
  s.revenue = s.revenueSvc; s.revenuePrev = s.revenueSvcPrev;
}
// installers: installs done + install revenue
for (const name of ROSTER.installers) {
  const s = stats[name];
  s.installsDone = ri(2, 5); s.installsDonePrev = ri(2, 5);
  s.apptsDone = s.installsDone; s.apptsDonePrev = s.installsDonePrev;
  s.revenueInst = s.installsDone * ri(9, 16) * 1000; s.revenueInstPrev = s.installsDonePrev * ri(9, 15) * 1000;
  s.revenue = s.revenueInst; s.revenuePrev = s.revenueInstPrev;
  s.recallTrips = rnd() < .25 ? 1 : 0;
}
// helpers ride along
for (const name of ROSTER.helpers) {
  const s = stats[name];
  s.apptsDone = ri(8, 16); s.apptsDonePrev = ri(8, 16);
}

/* ---------- leaderboard: sold last 30 by seller, from the same estList ---------- */
const advisors = SELLERS.map(name => {
  const mine = estList.filter(e => e.soldBy === name && inWin(e, addDays(R, -29), R));
  return { name, n: mine.length, v: mine.reduce((s, e) => s + e.value, 0) };
}).sort((a, b) => b.v - a.v);

/* ---------- owner block ---------- */
const memberTypes = { 'Comfort Club': 2094, 'Comfort Club Plus': 268 };
const memberList = [];
for (const [type, count] of Object.entries(memberTypes)) {
  for (let i = 0; i < count; i++) {
    const to = addDays(R, ri(1, 365));
    memberList.push({ cust: custId(), name: customer(), type, to, expiring: to <= addDays(R, 60) });
  }
}
const owner = {
  avgTicket: { install: { jobs: 44, rev: 545600, avg: 12400 }, service: { jobs: 128, rev: 89600, avg: 700 } },
  avgTicketPrev: { install: { jobs: 41, rev: 486700, avg: 11871 }, service: { jobs: 122, rev: 82960, avg: 680 } },
  recalls: { last30: 9, prev30: 15, last90: 34 },
  arAging: [
    { label: '0-30', amount: 86260 + ri(0, 4000), count: 26 },
    { label: '31-60', amount: 15940 + ri(0, 1500), count: 11 },
    { label: '61-90', amount: 2550 + ri(0, 600), count: 6 },
    { label: '90+', amount: 1170 + ri(0, 400), count: 41 },
  ],
  members: { active: memberList.length, new30: 24, expiring60: memberList.filter(m => m.expiring).length, types: memberTypes, list: memberList },
  capacity: { totalHours: 30, openHours: 6 },
  advisors,
  leadSources: [
    { name: 'Cedar Falls MAIN', n: 182, p: 405 },
    { name: 'Existing Client', n: 148, p: 112 },
    { name: 'Google', n: 34, p: 7 },
    { name: 'Pine Ridge MAIN', n: 13, p: 21 },
    { name: 'Referral', n: 15, p: 3 },
    { name: 'Radio', n: 11, p: 5 },
    { name: 'Spring Tune-Up Campaign', n: 6, p: 9 },
  ],
  people: { roster: ROSTER, stats },
};

/* ---------- team out + on call ---------- */
const nonJob = [];
for (let i = 0; i < 7; i++) nonJob.push({ day: addDays(today, i), tech: i % 2 ? 'Cole Bratsven' : 'Marcus Vellen', name: 'On Call', allDay: true });
for (let i = 2; i <= 6; i++) nonJob.push({ day: addDays(today, i), tech: 'Owen Stavros', name: 'Vacation', allDay: true });
nonJob.push({ day: addDays(today, 1), tech: 'Priya Nathan', name: 'PTO', allDay: true });
nonJob.push({ day: today, tech: 'Toby Nash', name: 'Called out', allDay: true });
for (const who of ROSTER.sales) nonJob.push({ day: addDays(today, 1), tech: who, name: 'Sales Meeting', allDay: false });

/* ---------- payroll items: 30 days, drives the hours panel ---------- */
const LATE_TECHS = new Set(['Eli Thornton', 'Dana Kirsch']);
const payItems = [];
const staff = [...ROSTER.service, ...ROSTER.installers, ...ROSTER.helpers, 'Holly Brandt', 'Aaron Sietsema'];
for (const who of staff) {
  let lateLeft = LATE_TECHS.has(who) ? 3 : 0;
  for (let i = 29; i >= 0; i--) {
    const d = addDays(R, -i);
    if (dow(d) === 0 || dow(d) === 6) continue;
    if (rnd() < .06) continue; // day off
    const base = +(7.4 + rnd() * 1.4).toFixed(2);
    const late = lateLeft > 0 && rnd() < .18;
    if (late) lateLeft--;
    // endedOn is UTC; 20:15 CT = 01:15Z the next day (CDT = UTC-5)
    const endedOn = late ? `${addDays(d, 1)}T0${ri(1, 2)}:${ri(10, 55)}:00Z` : `${d}T${ri(21, 23)}:${ri(10, 55)}:00Z`;
    payItems.push({ who, date: d, hours: base, ot: false, endedOn });
    if (late || rnd() < .12) payItems.push({ who, date: d, hours: +(0.5 + rnd() * 2.2).toFixed(2), ot: true, endedOn });
  }
}
// guarantee the "hours worth a look" panel has content: the anomaly scan only
// looks at the report day and the two before it (Fri when R is a Sunday)
const anomalyDay = [0, 6].includes(dow(R)) ? addDays(R, -(dow(R) === 0 ? 2 : 1)) : R;
payItems.push({ who: 'Eli Thornton', date: anomalyDay, hours: 3.4, ot: true, endedOn: `${addDays(anomalyDay, 1)}T01:40:00Z` });
payItems.push({ who: 'Dana Kirsch', date: anomalyDay, hours: 1.2, ot: true, endedOn: `${addDays(anomalyDay, 1)}T02:05:00Z` });

/* ---------- phones ---------- */
const callAgents = {};
for (const who of CSRS) {
  const inn = ri(120, 260), out = ri(50, 130);
  const secs = (inn + out) * ri(150, 210);
  // prior week within ~15% so the delta chips read plausible, not violent
  const drift = .88 + rnd() * .27;
  callAgents[who] = { in: inn, out, secs, prevIn: Math.round(inn * drift), prevOut: Math.round(out * drift), prevSecs: Math.round(secs * drift) };
}

/* ---------- weather: generic upper-midwest July ---------- */
const wdName = d => new Date(`${d}T12:00:00Z`).toLocaleDateString('en-US', { weekday: 'long', timeZone: 'UTC' });
const SHORTS = ['Sunny', 'Mostly Sunny', 'Partly Sunny', 'Scattered Showers', 'Mostly Clear'];
const weather = [{ name: 'Today', temp: ri(78, 90), unit: 'F', short: pick(SHORTS), isDay: true },
  { name: 'Tonight', temp: ri(58, 68), unit: 'F', short: 'Mostly Clear', isDay: false }];
for (let i = 1; i <= 3; i++) {
  const d = addDays(today, i);
  weather.push({ name: wdName(d), temp: ri(76, 92), unit: 'F', short: pick(SHORTS), isDay: true });
  weather.push({ name: `${wdName(d)} Night`, temp: ri(56, 68), unit: 'F', short: 'Partly Cloudy', isDay: false });
}

/* ---------- raw.json ---------- */
const raw = {
  pulled: new Date().toISOString(),
  report: R, windowStart, tenant: '000000000', today,
  footNote: 'Demonstration dashboard for Boreal Comfort Co, a fictional company: every number, name, and note on this page is synthetic. In production the dashboard refreshes hourly from your ServiceTitan account, and red flags and wins are triaged nightly by AI from your crew\'s Slack channels.',
  days, upcoming, estList: estList.map(({ install, ...e }) => e), topOpenEst,
  poWindow: { Pending: 18, Canceled: 45, Received: 560, Sent: 8 },
  whip, unsoldEst,
  incomplete: [
    { id: jobId(), summary: 'Waiting on heat pump lineset from supplier', age: 12 },
    { id: jobId(), summary: 'Return trip scheduled to finish venting', age: 5 },
  ],
  unpaid, owner, nonJob, payItems, weather,
  custInstallers: {},
  presetsToday: 7, turnoversToday: 2,
  svcCap: 40, callAgents, poToday: { n: 3, value: 5240 },
};
fs.writeFileSync(path.join(DATA, 'raw.json'), JSON.stringify(raw));

/* ---------- history.json: random-walk balance snapshots ---------- */
const hist = { whip: {}, unpaid: {}, ar: {}, members: {}, unsold: {} };
let hWhip = 8, hUnpaid = unpaid.totalBalance * .9, hAr = 102000, hMem = memberList.length - 22, hUnsold = unsoldEst.value * .92;
for (let i = 60; i >= 0; i--) {
  const d = addDays(R, -i);
  hWhip = Math.max(4, Math.min(14, hWhip + ri(-1, 1)));
  hUnpaid = Math.max(60000, hUnpaid + ri(-6000, 6500));
  hAr = Math.max(70000, hAr + ri(-3000, 3200));
  hMem += rnd() < .35 ? 1 : 0;
  hUnsold = Math.max(500000, hUnsold + ri(-15000, 16000));
  hist.whip[d] = i === 0 ? whip.now : hWhip;
  hist.unpaid[d] = i === 0 ? unpaid.totalBalance : Math.round(hUnpaid);
  hist.ar[d] = Math.round(hAr);
  hist.members[d] = i === 0 ? memberList.length : hMem;
  hist.unsold[d] = i === 0 ? unsoldEst.value : Math.round(hUnsold);
}
fs.writeFileSync(path.join(DATA, 'history.json'), JSON.stringify(hist));

/* ---------- slack digests: 7 nightly files + today so far ---------- */
const FLAGS = [
  ['A customer\'s financing application was denied and the sale needs a follow-up call to save it.', 'hi'],
  ['Crew found aluminum branch wiring at the Nordling install; electrician referral needed before rough-in.', 'hi'],
  ['Condensate pump on the Havermark job is backordered until next week; install may slip.', 'watch'],
  ['Permit for the Brandvold boiler swap has not come back from the city yet.', 'watch'],
  ['Eli flagged a cracked heat exchanger photo that still needs to go to the customer.', 'hi'],
  ['Thermostat wire run at the Kettunen house is shorter than quoted; may need a return trip.', 'watch'],
  ['Customer asked twice about the rebate paperwork on the Sorvaag mini split; nobody has answered in the channel.', 'watch'],
  ['Miguel reported the crane no-showed for the rooftop unit set; rescheduled without a confirmed date.', 'hi'],
  ['Lindstrand called unhappy about drywall dust after the duct reroute; needs a callback today.', 'hi'],
  ['Inspection for the Pekkala furnace failed on venting clearance; fix scheduled but not confirmed.', 'watch'],
  ['Old equipment from the Ruonala job is still in the garage; haul-away was promised last week.', 'watch'],
  ['Jack noted the load calc for the Vasterberg quote assumed the old ductwork passes; it may not.', 'watch'],
];
const WINS = [
  'Holmquist signed the full system replacement on the spot after the load calc walkthrough.',
  'Owen wrapped the Tarvainen furnace swap a day early; customer already left a 5-star review.',
  'Jenna saved the Kolstad sale after the financing denial by switching lenders.',
  'Eikland upgraded to the Comfort Club Plus plan during the tune-up visit.',
  'Andre\'s photo documentation caught a gas leak the inspector missed; customer wrote a thank-you note.',
  'Byrnes referral from last month closed today; second full system on that street.',
  'Callahan install passed inspection first try; zero punch-list items.',
  'Maya booked 9 tune-ups in one afternoon off the spring campaign list.',
];
const chanFor = t => { const m = t.match(/[A-Z][a-z]+(?=,|\s)/); const nm = (m ? m[0] : pick(LASTS)).toLowerCase(); return `#${nm}-${pick(FIRSTS).toLowerCase()}-c${ri(1000, 9999)}-l${ri(1000, 9999)}`; };
let fi = 0, wi = 0;
for (let i = 7; i >= 0; i--) {
  const d = addDays(today, -i);
  const flags = [], wins = [];
  const nf = i === 0 ? 1 : ri(1, 3), nw = i === 0 ? 1 : ri(0, 2);
  for (let k = 0; k < nf; k++) { const [title, sev] = FLAGS[fi++ % FLAGS.length]; flags.push({ title, sev, day: d, src: chanFor(title), link: '' }); }
  for (let k = 0; k < nw; k++) { const title = WINS[wi++ % WINS.length]; wins.push({ title, day: d, src: chanFor(title), link: '' }); }
  fs.writeFileSync(path.join(DATA, `slack-flags-${d}.json`), JSON.stringify({ generated: new Date().toISOString(), report: d, msgCount: ri(40, 160), flags, wins }));
}
fs.writeFileSync(path.join(DATA, 'slack-channels.json'), JSON.stringify({ team_url: '', byCustomer: {} }));

/* ---------- fonts + logo ---------- */
const FONTS = path.join(__dirname, '..', 'src', 'app', 'fonts');
fs.writeFileSync(path.join(DATA, 'fonts-b64.json'), JSON.stringify({
  'Passion One-400': fs.readFileSync(path.join(FONTS, 'BigShoulders-Variable-latin.woff2')).toString('base64'),
  'Inter-400': fs.readFileSync(path.join(FONTS, 'Inter-Variable-latin.woff2')).toString('base64'),
}));
// simple fictional logotype; the chip it sits in is light, so navy + amber reads
fs.writeFileSync(path.join(DATA, 'ns-logo.svg'), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 96">
<g fill="none"><path d="M28 76 48 22l20 54" stroke="#E2941D" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M38 58h20" stroke="#0E1729" stroke-width="7" stroke-linecap="round"/></g>
<text x="86" y="52" font-family="Arial Black, Arial, sans-serif" font-size="34" font-weight="900" fill="#0E1729" letter-spacing="1">BOREAL</text>
<text x="87" y="78" font-family="Arial, sans-serif" font-size="17" font-weight="700" fill="#516079" letter-spacing="5">COMFORT CO</text>
</svg>`);

console.log(`demo data written: ${R} report, ${estList.length} estimates, ${payItems.length} pay items, ${memberList.length} members`);
