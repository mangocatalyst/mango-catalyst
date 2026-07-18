#!/usr/bin/env node
// make-whiteboard-demo.js — derive the mangocatalyst install-whiteboard demo
// from the live NorthStar board page (install-whiteboard-mockup.html). Applies
// the Mango Catalyst skin and the fictional Boreal Comfort Co identity, inlines
// fully synthetic rows (same invented crew and customers as make-demo-data.js),
// and stubs the flip API so edits live in the page and reset on reload.
// Writes demo/build/whiteboard.html; bake-demo.sh validates and ships it.
//
// Every replacement is asserted: if the live board drifts and an anchor string
// disappears, this throws instead of silently shipping a half-skinned demo.
'use strict';
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const SRC = path.join(os.homedir(), 'Projects', 'northstar-owner-dashboard', 'install-whiteboard-mockup.html');
const OUT = path.join(__dirname, 'build', 'whiteboard.html');
fs.mkdirSync(path.dirname(OUT), { recursive: true });

// The Sales tab feed is the real ns-dash-bake output run against synthetic Boreal data
// (bake-demo.sh step 3, before this script) so it stays name-consistent with the board
// and the owner dashboard. Inlined below; no server behind the static demo.
const SALES_PATH = path.join(__dirname, 'build', 'sales-summary.json');
if (!fs.existsSync(SALES_PATH)) throw new Error('build/sales-summary.json missing; run ns-dash-bake (bake-demo.sh step 3) before this script');
const SALES_JSON = fs.readFileSync(SALES_PATH, 'utf8').trim();

let html = fs.readFileSync(SRC, 'utf8');

// replace exactly n occurrences (default 1); throw if the count is off
const swap = (from, to, n = 1) => {
  const parts = html.split(from);
  if (parts.length - 1 !== n) throw new Error(`anchor matched ${parts.length - 1}x, expected ${n}: ${String(from).slice(0, 80)}`);
  html = parts.join(to);
};

/* ---------- identity ---------- */
swap(`  /* Branding: northstarheatcool.com. Navy #002D3F, teal #006385, red-orange
     #F0533F, cream #FFF0C3, gold #FAA54E, Passion One display headings. */`,
  '  /* Branding: Mango Catalyst demo skin (brand-guidelines.md). */');
swap('<title>Install White Board (live)</title>',
  '<title>Boreal Comfort Co · Install Whiteboard Demo</title>');

/* ---------- fonts: Google-hosted Passion One -> inline Big Shoulders ---------- */
const bs = fs.readFileSync(path.join(__dirname, '..', 'src', 'app', 'fonts', 'BigShoulders-Variable-latin.woff2')).toString('base64');
swap("@import url('https://fonts.googleapis.com/css2?family=Passion+One:wght@700&display=swap');",
  `@font-face{font-family:'Big Shoulders';font-weight:100 900;font-display:swap;src:url(data:font/woff2;base64,${bs}) format('woff2')}`);
swap(".display { font-family: 'Passion One', 'Arial Narrow', system-ui, sans-serif; }",
  ".display { font-family: 'Big Shoulders', 'Arial Narrow', system-ui, sans-serif; font-weight: 700; }");
swap('"Passion One"', '"Big Shoulders"', 8);

/* ---------- palette: NorthStar cream/teal -> Mango Catalyst tokens ---------- */
// status colors (done/pend/warn greens, ambers, reds) are semantic and stay
const colors = [
  // light theme
  ['#14303d', '#1E2C4A'], ['#46606c', '#516079'], ['#7d919b', '#7E8BA6'],
  ['#e6ddc8', '#DCE1EC'], ['#f3edda', '#EDF0F7'], ['#fbf4e1', '#F4F6FB'],
  ['#fcfbf3', '#F7F9FC'], ['#002D3F', '#0E1729'], ['#006385', '#2F6BD8'],
  ['#FAA54E', '#F6A328'], ['#e1eff5', '#E3EDFC'], ['#FFF0C3', '#FDEBCB'],
  // dark theme (media-query block + data-theme block, hence 2x each)
  ['#10242e', '#101B31'], ['#0a1a22', '#0A1120'], ['#142c38', '#16213A'],
  ['#24404c', '#2C3A57'], ['#1b333e', '#1C2843'], ['#dceaf1', '#C9D6EE'],
  ['#021721', '#070D18'], ['#52b6d8', '#5BA8FF'], ['#62b8dc', '#7CBBFF'],
  ['#123240', '#14264A'], ['#e6edf1', '#F2F5FA'], ['#a7bcc6', '#9DAAC2'],
  ['#6e8894', '#7E8BA6'], ['#5d737e', '#66738F'],
];
for (const [from, to] of colors) {
  if (!html.includes(from)) throw new Error(`palette anchor missing: ${from}`);
  html = html.split(from).join(to);
}

/* ---------- data: inline synthetic board, no server ---------- */
// rows are built at page load with day offsets from "today", so ages, the
// stalled flag, and the schedule stay plausible no matter when this was baked.
// Names and stories match make-demo-data.js (the Slack digests on /dashboards
// mention the Nordling wiring, the Brandvold permit, the Sorvaag rebate...).
swap('<script>\n  const TYPE = {', `<script>
  // ---- demo board: every name, dollar, and note is synthetic (Boreal Comfort Co) ----
  const D = (n) => { const x = new Date(); x.setDate(x.getDate() + n); return x.toISOString().slice(0, 10); };
  const row = (rowId, name, sched, type, advisor, installers, price, city, cells, notes = "", done = false) => ({
    rowId, name, sched, type, advisor, installers, price, city,
    tls: "pending", permit: "pending", rebate: "pending", inspection: "pending",
    equip: "pending", registered: "pending", payment: "pending", thankyou: "pending",
    ...cells, notes, done,
  });
  const ALL_DONE = { tls: "done", permit: "done", rebate: "done", inspection: "done", equip: "done", registered: "done", payment: "done", thankyou: "done" };
  const DEMO_BOARD = { rows: [
    row("1", "Nordling, Elin & Gus", D(3), "full_system", "Sam", "Eli, Owen, Toby", 18940, "Cedar Falls",
      { tls: "done", permit: "done", equip: "done" }, "Electrician out Thu for the branch wiring"),
    row("2", "Havermark, Petra", D(1), "mini_split", "Jenna", "Miguel, Jack", 12480, "Pine Ridge",
      { tls: "done", permit: "na", inspection: "na" }, "Condensate pump backordered"),
    row("3", "Brandvold, Roald", D(5), "boiler", "Victor", "Owen, Toby", 16200, "Cedar Falls",
      { rebate: "na" }, "Waiting on the city for the permit"),
    row("4", "Sorvaag, Ingrid", D(-2), "mini_split", "Sam", "Eli, Jack", 9850, "Birch Hollow",
      { tls: "done", permit: "na", inspection: "na", equip: "done", registered: "done", payment: "done" }, "Rebate paperwork promised to customer"),
    row("5", "Kettunen, Nils", D(-1), "furnace", "Jenna", "Miguel", 7320, "Pine Ridge",
      { tls: "done", permit: "na", rebate: "na", inspection: "na", equip: "done" }),
    row("6", "Tarvainen, Freya", D(-6), "furnace", "Victor", "Owen", 8140, "Granite Bay",
      ALL_DONE, "Wrapped a day early, 5-star review", true),
    row("7", "Holmquist, Otto & Signe", D(8), "full_system", "Sam", "Eli, Owen, Miguel, Jack", 21470, "Cedar Falls",
      { tls: "done", payment: "done" }, "Signed on the spot after the load calc"),
    row("8", "Lindstrand, Astrid", D(-3), "ac", "Jenna", "Toby", 6240, "Pine Ridge",
      { tls: "done", permit: "na", rebate: "na", inspection: "na", equip: "done", registered: "done" }, "Callback re drywall dust, handled"),
    row("9", "Pekkala, Sven", D(-4), "furnace", "Victor", "Miguel, Jack", 7980, "Fallow Creek",
      { tls: "done", permit: "done", rebate: "na", equip: "done", registered: "done" }, "Inspection failed on venting clearance, refix Fri"),
    row("10", "Ruonala, Greta", D(-6), "water_heater", "Sam", "Owen", 3860, "Birch Hollow", {}),
    row("11", "Eikland, Britta", D(2), "ac", "Jenna", "Jack", 5480, "Cedar Falls",
      { permit: "na", rebate: "na", inspection: "na" }),
    row("12", "Kolstad, Mabel", D(6), "mini_split", "Victor", "Eli, Toby", 11960, "Pine Ridge",
      { tls: "done" }, "Financing switched lenders, cleared"),
    row("13", "Marek, Hank", D(4), "plumbing", "Sam", "Miguel", 4720, "Granite Bay",
      { rebate: "na", registered: "na" }),
  ] };

  // ---- sales tab feed: the exact ns-dash-bake output for synthetic Boreal data ----
  const DEMO_SALES = ${SALES_JSON};

  // ---- registration tab: synthetic equipment. installDate uses D() so warranty
  // deadlines (amber <=14d, red <=7d, overdue) stay plausible whenever this is baked.
  // Statuses cover every pipeline state incl Ignore (hidden by default) and INV-*
  // placeholders (no serial, sometimes no brand/model). Gree units carry grouping
  // tags + paired serials; Gree/Bosch have no warranty window so show no badge. ----
  const DEMO_EQUIPMENT = {
    deadlines: { maytag_rheem: 60, mitsubishi: 90, mitsubishi_cutoff: "03-31", fujitsu: 60 },
    units: [
      { customer: "Havermark, Petra", brand: "Fujitsu", model: "AOU12RLFW", serial: "FUJ-8823-C", installDate: D(-55), status: "Needs registration", stEquipmentId: "EQ-102", groupTag: "", pairedSerial: "" },
      { customer: "Brandvold, Roald", brand: "Maytag", model: "PSA4BF", serial: "MAY-3391-B", installDate: D(-48), status: "Needs registration", stEquipmentId: "EQ-103", groupTag: "", pairedSerial: "" },
      { customer: "Sorvaag, Ingrid", brand: "Rheem", model: "RA1436AJ1NB", serial: "RHE-2210-D", installDate: D(-65), status: "Needs registration", stEquipmentId: "EQ-104", groupTag: "", pairedSerial: "" },
      { customer: "Eikland, Britta", brand: "Mitsubishi", model: "MSZ-GL15NA", serial: "MIT-9902-J", installDate: D(-88), status: "Needs registration", stEquipmentId: "EQ-110", groupTag: "", pairedSerial: "" },
      { customer: "Ruonala, Greta", brand: "", model: "", serial: "", installDate: D(0), status: "Needs registration", stEquipmentId: "INV-3315", groupTag: "", pairedSerial: "" },
      { customer: "Nordling, Elin & Gus", brand: "Mitsubishi", model: "MSZ-FS12NA", serial: "MIT-4471-A", installDate: D(-3), status: "Queued for Registration", stEquipmentId: "EQ-101", groupTag: "", pairedSerial: "" },
      { customer: "Kolstad, Mabel", brand: "Gree", model: "GWH18AC", serial: "GRE-5541-K", installDate: D(-4), status: "Queued for Registration", stEquipmentId: "EQ-111", groupTag: "Kolstad main", pairedSerial: "GRE-5542-K" },
      { customer: "Holmquist, Otto & Signe", brand: "Gree", model: "GWH12QC", serial: "GRE-1180-G", installDate: D(-2), status: "Queued for ST", stEquipmentId: "EQ-107", groupTag: "Holmquist upstairs", pairedSerial: "" },
      { customer: "Tarvainen, Freya", brand: "Mitsubishi", model: "MUZ-GL18NA", serial: "MIT-7719-E", installDate: D(-20), status: "Registration Verified", stEquipmentId: "EQ-105", groupTag: "", pairedSerial: "" },
      { customer: "Lindstrand, Astrid", brand: "Bosch", model: "BOVA-36", serial: "BOS-4402-H", installDate: D(-5), status: "Registration Verified by Human", stEquipmentId: "EQ-108", groupTag: "", pairedSerial: "" },
      { customer: "Kettunen, Nils", brand: "Maytag", model: "M1200", serial: "MAY-6653-F", installDate: D(-30), status: "Registered", stEquipmentId: "EQ-106", groupTag: "", pairedSerial: "" },
      { customer: "Holmquist, Otto & Signe", brand: "Gree", model: "GWH09QB", serial: "", installDate: D(-1), status: "Ignore", stEquipmentId: "INV-2207", groupTag: "", pairedSerial: "" },
    ],
  };

  // ---- change-history popover: a couple of synthetic rows, for polish ----
  const DEMO_HISTORY = {
    "1": [
      { ts: D(-2) + "T14:32:00", source: "web", column: "permit", old: "pending", new: "received" },
      { ts: D(-1) + "T09:15:00", source: "tls-auto", column: "tls", old: "pending", new: "done" },
    ],
    "4": [
      { ts: D(-3) + "T11:02:00", source: "sync", column: "equip", old: "pending", new: "done" },
      { ts: D(-2) + "T16:48:00", source: "web", column: "payment", old: "pending", new: "done" },
    ],
  };

  const TYPE = {`);

// no server behind the static demo: edits are optimistic-only and stick in-page
swap(`  async function flip(rowId, column, value) {
    const r = await fetch("/api/flip", { method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rowId, column, value }) });
    if (!r.ok) throw new Error((await r.json().catch(() => ({}))).error || \`HTTP \${r.status}\`);
  }`,
  '  async function flip() {} // demo: edits live in this page and reset on reload');
swap(`  async function load() {
    try {
      const r = await fetch("whiteboard.json", { cache: "no-store" });
      if (!r.ok) throw new Error(\`HTTP \${r.status}\`);
      board = await r.json();
      generatedAt = board.generatedAt;
      $("error").style.display = "none";
      render(); stamp();
    } catch (e) {
      $("error").textContent = \`Can't reach the board (\${e.message}).\`;
      $("error").style.display = "block";
    }
  }`,
  `  async function load() { board = DEMO_BOARD; render(); stamp(); }`);
swap(`  function stamp() {
    if (!generatedAt) return;
    const mins = Math.round((Date.now() - new Date(generatedAt)) / 60000);
    $("stamp").textContent = \`synced \${mins <= 0 ? "just now" : mins + "m ago"} · live edits\`;
    $("live").classList.toggle("stale", mins > 45);
  }`,
  '  function stamp() { $("stamp").textContent = "demo · fictional data · edits reset on reload"; }');
/* ---------- sales + registration + history: inline synthetic feeds, no server ---------- */
swap(`  async function loadSales() {
    try {
      const r = await fetch("sales-summary.json", { cache: "no-store" });
      if (!r.ok) return; // crew instance 404s it -> Sales tab stays hidden, board unaffected
      salesData = await r.json();
      if (!salesReady) { salesReady = true; $("tabnav").hidden = false; $("tab-btn-sales").hidden = false; }
      renderSales();
    } catch (e) { /* leave tab hidden; the board does not depend on this */ }
  }`,
  `  async function loadSales() { // demo: inlined synthetic summary, no server
    salesData = DEMO_SALES;
    if (!salesReady) { salesReady = true; $("tabnav").hidden = false; $("tab-btn-sales").hidden = false; }
    renderSales();
  }`);
swap(`  async function loadRegistration() {
    try {
      const r = await fetch("/api/equipment", { cache: "no-store" });
      if (!r.ok) return; // crew instance 404s it -> Registration tab stays hidden
      regData = await r.json();
      if (!regReady) { regReady = true; $("tabnav").hidden = false; $("tab-btn-registration").hidden = false; }
      renderRegistration();
    } catch (e) { /* leave hidden; board unaffected */ }
  }`,
  `  async function loadRegistration() { // demo: inlined synthetic equipment, no server
    regData = DEMO_EQUIPMENT;
    if (!regReady) { regReady = true; $("tabnav").hidden = false; $("tab-btn-registration").hidden = false; }
    renderRegistration();
  }`);
swap(`  async function equipAction(stEquipmentId, action, value) {
    try {
      const r = await fetch("/api/equip", { method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stEquipmentId, action, value }) });
      if (!r.ok) throw new Error((await r.json().catch(() => ({}))).error || \`HTTP \${r.status}\`);
      const { unit } = await r.json();
      const i = regData.units.findIndex((u) => u.stEquipmentId === stEquipmentId);
      if (i >= 0 && unit) regData.units[i] = unit;
      renderRegistration();
    } catch (e) {
      $("reg-error").textContent = \`Registration edit didn't save: \${e.message}\`;
      $("reg-error").style.display = "block";
      loadRegistration();
      setTimeout(() => { $("reg-error").style.display = "none"; }, 8000);
    }
  }`,
  `  async function equipAction(stEquipmentId, action, value) { // demo: edits live in-page, reset on reload
    const u = regData.units.find((x) => x.stEquipmentId === stEquipmentId);
    if (u) {
      if (action === "group_tag") u.groupTag = value || "";
      else if (action === "paired_serial") u.pairedSerial = value || "";
      else if (action === "queue_st") u.status = "Queued for ST";
      else if (action === "queue_registration") u.status = "Queued for Registration";
    }
    renderRegistration();
  }`);
swap(`      const r = await fetch(\`/api/history?rowId=\${encodeURIComponent(rowId)}\`, { cache: "no-store" });
      const entries = r.ok ? await r.json() : [];`,
  '      const entries = DEMO_HISTORY[rowId] || []; // demo: inlined synthetic history');

/* ---------- init: no polling behind the static demo; keep the tab feature-detect ---------- */
swap(`  load(); loadSales(); loadRegistration();
  setInterval(() => { load(); loadSales(); loadRegistration(); }, 60_000);
  setInterval(stamp, 30_000);`,
  '  load(); loadSales(); loadRegistration();');

/* ---------- copy: neutralize code comments that name live feed files ---------- */
swap(`the Sales tab is revealed only when the owner
     instance serves sales-summary.json (the crew instance 404s it) ---- */`,
  `the Sales tab is revealed only when the owner
     instance provides the sales feed ---- */`);
swap(`"who's the next one free" at a glance. Fed by the same whiteboard.json the
     table uses.`,
  `"who's the next one free" at a glance. Fed by the same board data the
     table uses.`);

/* ---------- booking board: real lead installers -> fictional Boreal crew ---------- */
swap('const LEADS = ["Corey", "Scott", "Zack"];', 'const LEADS = ["Eli", "Owen", "Miguel"];');
swap('const OFF_DAY = { Zack: 1 }; // Zack takes Mondays (0 Sun .. 6 Sat); others have none',
  'const OFF_DAY = { Eli: 1 }; // Eli takes Mondays (0 Sun .. 6 Sat); others have none');
swap('Zack is off Mondays.', 'Eli is off Mondays.');

// em dashes in the source's code comments; the site bans them everywhere
html = html.split(' — ').join(', ');

/* ---------- guardrails ---------- */
if (/northstar|passion one/i.test(html)) throw new Error('NS branding survived the transform');
if (/servicetitan\.com|slack\.com|\/api\/flip|\/api\/equipment|\/api\/equip|\/api\/history|whiteboard\.json|sales-summary\.json/i.test(html)) throw new Error('live endpoint survived the transform');
for (const ch of ['–', '—']) if (html.includes(ch)) throw new Error('em/en dash in demo artifact');

fs.writeFileSync(OUT, html);
console.log(`whiteboard demo written: ${OUT} (${Math.round(fs.statSync(OUT).size / 1024)} KB)`);
