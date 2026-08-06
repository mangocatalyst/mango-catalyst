#!/usr/bin/env node
// make-commission-portal-demo.js: the tech-facing half of the commission tracker,
// baked the same way make-commission-demo.js bakes the office half: same source repo,
// same fictional Boreal Comfort Co identity, same in-memory engine (which carries the
// portal projection so there is only ever one copy of the demo server).
//
// This artifact is NOT iframed on /dashboards. It exists so the "each tech gets their
// own portal" screenshot can be captured from fictional data instead of from a live
// page full of real people's pay.
// Writes demo/build/commission-portal.html; bake-demo.sh validates and ships it.
'use strict';
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { scrubNames, assertNoRealNames } = require('./scrub-names.js');

const SRC = path.join(os.homedir(), 'Projects', 'commission-tracker', 'portal.html');
const OUT = path.join(__dirname, 'build', 'commission-portal.html');
const DATA = path.join(__dirname, 'build', 'commission-data.json');
fs.mkdirSync(path.dirname(OUT), { recursive: true });

if (!fs.existsSync(DATA)) throw new Error('build/commission-data.json missing; run make-commission-data.js first');
const STAMP = new Date().toISOString().slice(0, 10);

let html = fs.readFileSync(SRC, 'utf8');

const swap = (from, to, n = 1) => {
  const parts = html.split(from);
  if (parts.length - 1 !== n) throw new Error(`anchor matched ${parts.length - 1}x, expected ${n}: ${String(from).slice(0, 90)}`);
  html = parts.join(to);
};
// Tolerant of an anchor upstream already removed or reworded. Same two-tier rule as
// make-commission-demo.js: ONLY for anchors whose bad end state a guardrail at the
// bottom independently catches, so a cosmetic drift in the donor page cannot stop the
// nightly bake. Anchors carrying the skin, the demo engine or a chokepoint stay strict.
const swapMaybe = (from, to) => {
  const parts = html.split(from);
  if (parts.length - 1 > 1)
    throw new Error(`optional anchor matched ${parts.length - 1}x, expected 0 or 1: ${String(from).slice(0, 90)}`);
  html = parts.join(to);
};
const swapRe = (re, to, n = 1) => {
  const m = html.match(re);
  if (!m || m.length !== n) throw new Error(`regex matched ${m ? m.length : 0}x, expected ${n}: ${re}`);
  html = html.replace(re, to);
};

/* ---------- identity ---------- */
swap('<title>NorthStar Commission — My Statement</title>',
  '<title>Boreal Comfort Co · Tech Commission Portal Demo</title>');
swap(`/* The commission dashboard's chrome, verbatim where it applies: same fonts, same palette,
   same nsdash-* storage keys, so the portal reads as the same product the office uses.`,
  `/* The commission dashboard's chrome, verbatim where it applies: same fonts, same palette,
   so the portal reads as the same product the office uses.`);

/* ---------- fonts ---------- */
const bs = fs.readFileSync(path.join(__dirname, '..', 'src', 'app', 'fonts', 'BigShoulders-Variable-latin.woff2')).toString('base64');
const interVar = fs.readFileSync(path.join(__dirname, '..', 'src', 'app', 'fonts', 'Inter-Variable-latin.woff2')).toString('base64');
swap(`@font-face{font-family:'Passion One';font-weight:400;font-display:swap;src:url(/assets/font-passion-400.woff2) format('woff2')}
@font-face{font-family:'Passion One';font-weight:700;font-display:swap;src:url(/assets/font-passion-700.woff2) format('woff2')}
@font-face{font-family:'Inter';font-weight:400;font-display:swap;src:url(/assets/font-inter-400.woff2) format('woff2')}
@font-face{font-family:'Inter';font-weight:600;font-display:swap;src:url(/assets/font-inter-600.woff2) format('woff2')}
@font-face{font-family:'Inter';font-weight:800;font-display:swap;src:url(/assets/font-inter-800.woff2) format('woff2')}`,
  `@font-face{font-family:'Big Shoulders';font-weight:100 900;font-display:swap;src:url(data:font/woff2;base64,${bs}) format('woff2')}
@font-face{font-family:'Inter';font-weight:100 900;font-display:swap;src:url(data:font/woff2;base64,${interVar}) format('woff2')}`);
swap(`--disp:'Passion One','Arial Narrow',sans-serif;`, `--disp:'Big Shoulders','Arial Narrow',sans-serif;`);

/* ---------- masthead: the same Boreal logotype the other two demos wear ---------- */
const LOGO = path.join(__dirname, 'build', 'data', 'ns-logo.svg');
if (!fs.existsSync(LOGO)) throw new Error('build/data/ns-logo.svg missing; run make-demo-data.js (bake-demo.sh step 2) first');
const logoUri = `data:image/svg+xml;base64,${fs.readFileSync(LOGO).toString('base64')}`;
swap('  <div class="logo-chip"><img alt="NorthStar Heating and Cooling" src="/assets/ns-logo.svg"></div>',
  `  <div class="logo-chip"><img alt="Boreal Comfort Co" src="${logoUri}"></div>`);

/* ---------- ServiceTitan deep links: defang the shared builder ---------- */
swapMaybe(`// The techs have ServiceTitan logins, so every row on this page deep-links its OWN work the
// same way the office's copy does: the customer name opens the job, the "invoice N" chip opens
// the invoice. Targets read off ServiceTitan's own links rather than guessed. Declared here
// because lineWhat below is the first thing that uses them.
const ST_JOB = 'https://go.servicetitan.com/#/Job/Index/';
const ST_INVOICE = 'https://go.servicetitan.com/#/EditInvoice/';
// cls defaults to the plain link. customerCell passes 'job cust' because the MASTER puts both
// classes on the anchor itself, and the two pages had drifted into styling the same cell two
// different ways — an anchor.job.cust here, an anchor.job wrapping a span.cust there.
const stLink = (href, label, title, cls) => '<a class="' + (cls || 'job') + '" href="' + href + '" target="_blank" rel="noopener"'
  + ' title="' + esc(title) + '">' + label + '</a>';`,
  `// In the real portal every row deep-links its OWN work into ServiceTitan, the same way the
// office's copy does: the customer name opens the job, the "invoice N" chip opens the invoice.
// There is no ServiceTitan behind this demo, so the same cells render as plain text. cls is
// kept so the demo styles the cell exactly as the live portal does.
const ST_JOB = '';
const ST_INVOICE = '';
const stLink = (href, label, title, cls) => '<span class="' + (cls || 'job') + '">' + label + '</span>';`);

// A real customer's name that donor CODE COMMENTS use as their worked example. scrubNames
// deliberately leaves comments alone, and the privacy validator rightly fails the bake on
// the name, so it is rewritten to a fictional one here.
// Catch-all, not an anchor: this used to pin the one comment that carried the name, and on
// 2026-08-03 a SECOND comment upstream picked up the same example and shipped the real name
// past the anchored swap into the artifact. Substituting the name itself covers both copies
// and any future one, and cannot be broken by rewording the prose around it.
html = html.split('Dahl, Peg').join('Nordling, Elin');

/* ---------- the demo engine, in place of the server ---------- */
const engine = fs.readFileSync(path.join(__dirname, 'commission-demo-engine.js'), 'utf8')
  .replace('__DEMO_DATA__', () => fs.readFileSync(DATA, 'utf8').trim());
swap(`<script>
'use strict';
// esc() everything sourced`, `<script>
'use strict';
${engine}
// esc() everything sourced`);

/* ---------- the four network chokepoints ---------- */
swap(`    const res = await fetch(path, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    const out = await res.json().catch(() => ({ error: 'server sent no answer' }));
    if (!res.ok || out.error) throw new Error(out.error || 'HTTP ' + res.status);
    return out;`,
  `    // demo: the mark lands in memory instead of on a server, and throws the same way
    // the server does so the error toasts are real rather than decorative.
    return demoWrite(path, body);`);
swap(`  const data = await (await fetch('/api/period?id=' + encodeURIComponent(id), { cache: 'no-store' })).json();
  // Overtaken while in flight: the newer load owns the page. Reported rather than just
  // returned, because printStatement awaits this specifically to GET fresh data — a silent
  // early return there reads as "refreshed" and prints whatever DATA happened to hold.
  if (token !== LOAD_TOKEN) return false;
  if (data.error) throw new Error(data.error);`,
  `  const data = demoPortalPeriod(id); // demo: built in the page, no server behind it
  // No LOAD_TOKEN check: demoPortalPeriod is synchronous, so there is no in-flight
  // window for a newer load to overtake, and printStatement still gets its true back.`);
swap(`  const res = await fetch('/api/upcoming', { cache: 'no-store' });
  if (!res.ok) return; // an older server or a refusal: the section just stays hidden
  const data = await res.json();`,
  `  const data = demoPortalUpcoming(); // demo: no server behind it`);
swap(`  const { periods, current, next, previous } = await (await fetch('/api/periods', { cache: 'no-store' })).json();`,
  `  const { periods, current, next, previous } = demoPortalPeriods(); // demo: no server behind it`);

/* ---------- iframed or opened from a marketing page: no history entries ---------- */
swap(`      if (location.hash !== '#' + value) { HASH_SET_BY_US = true; location.hash = value; }`,
  `      HASH_SET_BY_US = true; // demo: changing pay period must not push a history entry`);

/* ---------- palette: the same pair list the other two demos use ---------- */
const colors = [
  ['#14303d', '#1E2C4A'], ['#46606c', '#516079'], ['#7d919b', '#7E8BA6'],
  ['#e6ddc8', '#DCE1EC'], ['#f3edda', '#EDF0F7'], ['#fbf4e1', '#F4F6FB'],
  ['#fcfbf3', '#F7F9FC'], ['#002D3F', '#0E1729'], ['#006385', '#2F6BD8'],
  ['#FAA54E', '#F6A328'], ['#e1eff5', '#E3EDFC'],
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

/* ---------- copy ---------- */
swapMaybe('  <span>NorthStar Heating &amp; Cooling</span>', '  <span>Boreal Comfort Co</span>');
swapMaybe(`    + '<div class="stmt-meta">NorthStar Heating &amp; Cooling. The computed number is a draft; the approved number is what pays.'
    + ' Question a line by ticking Dispute on your portal, or tell Bryan.</div>'`,
  `    + '<div class="stmt-meta">Boreal Comfort Co. The computed number is a draft; the approved number is what pays.'
    + ' Question a line by ticking Dispute on your portal, or tell the office.</div>'`);
// The star-backlog swaps that sat here (including the one guarding a real earner's real
// dollars in a donor comment) went with the UI itself, commission-tracker f438944. Verified
// 2026-07-30: portal.html no longer carries that comment, so there is nothing left to guard.
html = html.split('StarClub').join('Comfort Club');

/* ---------- version stamp ---------- */
swapMaybe(`  <!-- page version, extension-style date.build: bump on every shipped template change -->
`, '');
swapRe(/<span>v\d{4}-\d{2}-\d{2}\.\d+<\/span>/,
  `<span>demo v${STAMP} · fictional data · edits reset on reload</span>`);

/* ---------- dashes ---------- */
html = html.split(' — ').join(', ');
html = html.split(' &mdash; ').join(', ');
html = html.split(' —\n').join(',\n');

/* ---------- names: the catch-all, after every anchored swap ---------- */
html = scrubNames(html);

/* ---------- guardrails ---------- */
assertNoRealNames(html, 'the commission portal demo');
if (/northstar|passion one|xyops/i.test(html)) throw new Error('NS identity survived the transform');
if (/servicetitan\.com|slack\.com|\/admin\.html|ns-logo/i.test(html)) throw new Error('live endpoint or asset survived the transform');
if (/fetch\(/.test(html)) throw new Error('a network call survived the transform');
const dashes = html.match(/[^\n]*[–—][^\n]*/g);
if (dashes) throw new Error(`em/en dash in demo artifact (${dashes.length}):\n` +
  dashes.map(l => '  ' + l.trim().slice(0, 120)).join('\n'));

fs.writeFileSync(OUT, html);
console.log(`commission portal demo written: ${OUT} (${Math.round(fs.statSync(OUT).size / 1024)} KB)`);
