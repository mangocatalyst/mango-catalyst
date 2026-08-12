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
const { scrubNames, assertNoRealNames } = require('./scrub-names.js');

const SRC = path.join(os.homedir(), 'Projects', 'northstar-owner-dashboard', 'install-whiteboard-mockup.html');
const OUT = path.join(__dirname, 'build', 'whiteboard.html');
fs.mkdirSync(path.dirname(OUT), { recursive: true });

let html = fs.readFileSync(SRC, 'utf8');

// Anchors are asserted but a miss is collected, not thrown: assertAnchors() below
// reports every drifted anchor in one run. See anchors.js.
const { swap, swapBetween, swapFn, swapAll, assertAnchors } = require('./anchors.js')(() => html, v => { html = v; });

/* ---------- identity ---------- */
// End-anchored: this is a comment, and the hex values and font notes inside it are
// revised whenever the donor's palette moves.
swapBetween(`  /* Branding: northstarheatcool.com.`, `(no Google Fonts). */`,
  '  /* Branding: Mango Catalyst demo skin (brand-guidelines.md). */');
swap('<title>Install White Board (live)</title>',
  '<title>Boreal Comfort Co · Install Whiteboard Demo</title>');

/* ---------- fonts: Google-hosted Passion One -> inline Big Shoulders ---------- */
const bs = fs.readFileSync(path.join(__dirname, '..', 'src', 'app', 'fonts', 'BigShoulders-Variable-latin.woff2')).toString('base64');
const interVar = fs.readFileSync(path.join(__dirname, '..', 'src', 'app', 'fonts', 'Inter-Variable-latin.woff2')).toString('base64');
swap(`  @font-face{font-family:'Passion One';font-weight:400;font-display:swap;src:url(font-passion-400.woff2) format('woff2')}
  @font-face{font-family:'Passion One';font-weight:700;font-display:swap;src:url(font-passion-700.woff2) format('woff2')}
  @font-face{font-family:'Inter';font-weight:400;font-display:swap;src:url(font-inter-400.woff2) format('woff2')}
  @font-face{font-family:'Inter';font-weight:600;font-display:swap;src:url(font-inter-600.woff2) format('woff2')}
  @font-face{font-family:'Inter';font-weight:800;font-display:swap;src:url(font-inter-800.woff2) format('woff2')}`,
  `@font-face{font-family:'Big Shoulders';font-weight:100 900;font-display:swap;src:url(data:font/woff2;base64,${bs}) format('woff2')}
  @font-face{font-family:'Inter';font-weight:100 900;font-display:swap;src:url(data:font/woff2;base64,${interVar}) format('woff2')}`);
swap(".display { font-family: 'Passion One', 'Arial Narrow', system-ui, sans-serif; }",
  ".display { font-family: 'Big Shoulders', 'Arial Narrow', system-ui, sans-serif; font-weight: 700; }");
swap('"Passion One"', '"Big Shoulders"', 3);
swap("'Passion One','Arial Narrow'", "'Big Shoulders','Arial Narrow'"); // masthead h1
swap('(not Passion One numerals)', '(not display-face numerals)'); // KPI comment

/* ---------- registration: no ST deep links behind the demo ---------- */
swap('const stUrl = b?.stUrl || (u.locationId ? `https://go.servicetitan.com/#/Location/${encodeURIComponent(u.locationId)}` : null);',
  'const stUrl = b?.stUrl || null; // demo: no ST behind the page');

/* ---------- palette: NorthStar cream/teal -> Mango Catalyst tokens ---------- */
// status colors (done/pend/warn greens, ambers, reds) are semantic and stay
const colors = [
  // light theme
  ['#14303d', '#1E2C4A'], ['#46606c', '#516079'], ['#7d919b', '#7E8BA6'],
  ['#e6ddc8', '#DCE1EC'], ['#f3edda', '#EDF0F7'], ['#fbf4e1', '#F4F6FB'],
  ['#fcfbf3', '#F7F9FC'], ['#002D3F', '#0E1729'], ['#006385', '#2F6BD8'],
  ['#FAA54E', '#F6A328'], ['#e1eff5', '#E3EDFC'], // cream #FFF0C3 left with the old chrome bar (2026-07-19)
  // dark theme (media-query block + data-theme block, hence 2x each)
  ['#10242e', '#101B31'], ['#0a1a22', '#0A1120'], ['#142c38', '#16213A'],
  ['#24404c', '#2C3A57'], ['#1b333e', '#1C2843'], ['#dceaf1', '#C9D6EE'],
  ['#021721', '#070D18'], ['#52b6d8', '#5BA8FF'], ['#62b8dc', '#7CBBFF'],
  ['#123240', '#14264A'], ['#e6edf1', '#F2F5FA'], ['#a7bcc6', '#9DAAC2'],
  ['#6e8894', '#7E8BA6'], ['#5d737e', '#66738F'],
];
for (const [from, to] of colors) swapAll(from, to);

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
    row("1", "Nordling, Elin & Gus", D(3), "full_system", "Chidi", "Eli, Owen, Toby", 18940, "Cedar Falls",
      { tls: "done", permit: "done", equip: "done" }, "Electrician out Thu for the branch wiring"),
    row("2", "Havermark, Petra", D(1), "mini_split", "Jenna", "Miguel, Jack", 12480, "Pine Ridge",
      { tls: "done", permit: "na", inspection: "na" }, "Condensate pump backordered"),
    row("3", "Brandvold, Roald", D(5), "boiler", "Victor", "Owen, Toby", 16200, "Cedar Falls",
      { rebate: "na" }, "Waiting on the city for the permit"),
    row("4", "Sorvaag, Ingrid", D(-2), "mini_split", "Chidi", "Eli, Jack", 9850, "Birch Hollow",
      { tls: "done", permit: "na", inspection: "na", equip: "done", registered: "done", payment: "done" }, "Rebate paperwork promised to customer"),
    row("5", "Kettunen, Nils", D(-1), "furnace", "Jenna", "Miguel", 7320, "Pine Ridge",
      { tls: "done", permit: "na", rebate: "na", inspection: "na", equip: "done" }),
    row("6", "Tarvainen, Freya", D(-6), "furnace", "Victor", "Owen", 8140, "Granite Bay",
      ALL_DONE, "Wrapped a day early, 5-star review", true),
    row("7", "Holmquist, Otto & Signe", D(8), "full_system", "Chidi", "Eli, Owen, Miguel, Jack", 21470, "Cedar Falls",
      { tls: "done", payment: "done" }, "Signed on the spot after the load calc"),
    row("8", "Lindstrand, Astrid", D(-3), "ac", "Jenna", "Toby", 6240, "Pine Ridge",
      { tls: "done", permit: "na", rebate: "na", inspection: "na", equip: "done", registered: "done" }, "Callback re drywall dust, handled"),
    row("9", "Pekkala, Sven", D(-4), "furnace", "Victor", "Miguel, Jack", 7980, "Fallow Creek",
      { tls: "done", permit: "done", rebate: "na", equip: "done", registered: "done" }, "Inspection failed on venting clearance, refix Fri"),
    row("10", "Ruonala, Greta", D(-6), "water_heater", "Chidi", "Owen", 3860, "Birch Hollow", {}),
    row("11", "Eikland, Britta", D(2), "ac", "Jenna", "Jack", 5480, "Cedar Falls",
      { permit: "na", rebate: "na", inspection: "na" }),
    row("12", "Kolstad, Mabel", D(6), "mini_split", "Victor", "Eli, Toby", 11960, "Pine Ridge",
      { tls: "done" }, "Financing switched lenders, cleared"),
    row("13", "Marek, Hank", D(4), "plumbing", "Chidi", "Miguel", 4720, "Granite Bay",
      { rebate: "na", registered: "na" }),
  ] };

  // ---- sales tab feed: the exact ns-dash-bake output for synthetic Boreal data.
  // Left as a placeholder here and filled in by roll-inject.js, because this is
  // the one part of the whiteboard that has to move every night (the feed is a
  // dated window and the tab renders "as of <generatedAt>"). Everything else on
  // this page is skinned once and frozen. A valid identifier on purpose, so the
  // skinned artifact still parses as JavaScript. ----
  const DEMO_SALES = __SALES_SUMMARY__;

  // ---- registration tab: synthetic equipment. installDate uses D() so warranty
  // deadlines (amber <=14d, red <=7d, overdue) stay plausible whenever this is baked.
  // Statuses cover every pipeline state incl Ignore (hidden by default) and INV-*
  // placeholders (no serial, sometimes no brand/model). Gree units carry grouping
  // tags + paired serials; Gree/Bosch have no warranty window so show no badge. ----
  const DEMO_EQUIPMENT = {
    deadlines: { maytag_rheem: 60, mitsubishi: 90, mitsubishi_cutoff: "03-31", fujitsu: 60 },
    // No statuses list: upstream dropped regStatuses when the pill stopped cycling
    // the server's allowlist, so the chip counts come from the rows themselves.
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
      { customer: "Lindstrand, Astrid", brand: "Bosch", model: "BOVA-36", serial: "BOS-4402-H", installDate: D(-5), status: "Registration Verified", stEquipmentId: "EQ-108", groupTag: "", pairedSerial: "" },
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

/* ---------- the server-backed functions, stubbed ----------
   Anchored on the signature, not on the body: swapFn takes whatever the donor's
   function currently contains and replaces the whole thing. Every one of these used
   to quote its body verbatim, which is why an upstream edit INSIDE loadRegistration
   killed the nightly for two nights on 08-05, and why equipAction carried 1537
   characters of donor code the demo throws away anyway. The guardrails at the bottom
   (no fetch(, no /api/, no live URL, no real name) are what prove the stubs landed. */

// no server behind the static demo: edits are optimistic-only and stick in-page
swapFn('flip', '  async function flip() {} // demo: edits live in this page and reset on reload');
swapFn('load', '  async function load() { board = DEMO_BOARD; render(); stamp(); }');
swapFn('stamp', '  function stamp() { $("stamp").textContent = "demo · fictional data · edits reset on reload"; }');
/* ---------- sales + registration + history: inline synthetic feeds, no server ---------- */
swapFn('loadSales', `  async function loadSales() { // demo: inlined synthetic summary, no server
    salesData = DEMO_SALES;
    if (!salesReady) { salesReady = true; $("tabnav").hidden = false; $("tab-btn-sales").hidden = false; }
    renderSales();
  }`);
swapFn('loadRegistration', `  async function loadRegistration() { // demo: inlined synthetic equipment, no server
    regData = DEMO_EQUIPMENT;
    buildNeedsByLocation(regData.units || []); // same as live: board chips follow this data
    if (!regReady) { regReady = true; $("tabnav").hidden = false; $("tab-btn-registration").hidden = false; }
    renderRegistration();
    if (board) render();
  }`);
// Deleting a row: splice the local copy rather than calling load(), which reassigns
// board = DEMO_BOARD and would put the row straight back.
swapFn('del', `  async function del(rowId) { // demo: drop the row from the copy in this page
    board.rows = (board.rows || []).filter((r) => r.rowId !== rowId);
    render();
  }`);
swapFn('equipAction', `  async function equipAction(stEquipmentId, action, value) { // demo: edits live in-page, reset on reload
    const u = regData.units.find((x) => x.stEquipmentId === stEquipmentId);
    if (u) {
      if (action === "group_tag") u.groupTag = value || "";
      else if (action === "status") u.status = value; // click-through pill (upstream 28e6b9b)
      else if (action === "queue_st") u.status = "Queued for ST";
      else if (action === "queue_registration") u.status = "Queued for Registration";
      else if (action === "brand") u.brand = (value || "").trim();
      else if (action === "model") u.model = (value || "").trim();
      else if (action === "serial") u.serial = (value || "").trim();
      else if (action === "install_date") u.installDate = (value || "").trim();
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
// Space class is literal-space-only on purpose: a dash that ENDS a line (upstream
// wraps both prose and // comments that way) must lose the dash and KEEP the
// newline. Eating the newline would pull the next line of code into a comment.
html = html.replace(/ *[–—] */g, ', ');

// A comment that merely NAMES an endpoint is inert, but the guard below is a string
// scan and cannot tell prose from a fetch. Rewrite the mention, keep the sentence.
// Anchorless on purpose: upstream adds comments like this constantly, and a comment
// must never be the thing that stops the demo from baking.
html = html.replace(/(\/\/[^\n]*?)\/api\/(\w+)/g, '$1the $2 endpoint');

/* ---------- every drifted anchor, in one report, before anything is written ---------- */
assertAnchors();

/* ---------- names: the catch-all, after every anchored swap ---------- */
html = scrubNames(html);

/* ---------- guardrails ---------- */
assertNoRealNames(html, 'the whiteboard demo');
if (/northstar|passion one/i.test(html)) throw new Error('NS branding survived the transform');
if (/fetch\(/.test(html)) throw new Error('a network call survived the transform');
// Any /api/, not a list of the four we happened to think of: the hand-written list
// is how /api/delete shipped for weeks behind a guard that looked like it covered it.
const live = html.match(/[^\n]*(servicetitan\.com|slack\.com|\/api\/|whiteboard\.json|sales-summary\.json)[^\n]*/gi);
if (live) throw new Error(`live endpoint survived the transform (${live.length}):\n` +
  live.map(l => '  ' + l.trim().slice(0, 120)).join('\n'));
const dashes = html.match(/[^\n]*[–—][^\n]*/g);
if (dashes) throw new Error(`em/en dash in demo artifact (${dashes.length}):\n` +
  dashes.map(l => '  ' + l.trim().slice(0, 120)).join('\n'));

fs.writeFileSync(OUT, html);
console.log(`whiteboard demo written: ${OUT} (${Math.round(fs.statSync(OUT).size / 1024)} KB)`);
