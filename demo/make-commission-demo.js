#!/usr/bin/env node
// make-commission-demo.js: derive the mangocatalyst commission-tracker demo from the
// live NorthStar tracker page (commission-tracker/commission.html). Applies the Mango
// Catalyst skin and the fictional Boreal Comfort Co identity, swaps the page's three
// network chokepoints (and its one export navigation) for the in-memory demo engine,
// and inlines the synthetic dataset from make-commission-data.js.
// Writes demo/build/commission.html; bake-demo.sh validates and ships it.
//
// Replacements are asserted in two tiers. swap() is strict: an anchor that carries the
// skin, the palette, the demo engine, a network chokepoint or the version stamp has no
// other proof it landed, so a miss throws rather than silently ship a half-skinned demo
// or one that still reaches a server. swapMaybe() tolerates a missing anchor, and is
// used only where a guardrail at the bottom independently proves the end state anyway.
// Swapping the chokepoints by name rather than shimming window.fetch is the point: the
// guardrail at the bottom proves the shipped file contains no fetch( at all.
'use strict';
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { scrubNames, assertNoRealNames } = require('./scrub-names.js');

const SRC = path.join(os.homedir(), 'Projects', 'commission-tracker', 'commission.html');
const OUT = path.join(__dirname, 'build', 'commission.html');
const DATA = path.join(__dirname, 'build', 'commission-data.json');
fs.mkdirSync(path.dirname(OUT), { recursive: true });

if (!fs.existsSync(DATA)) throw new Error('build/commission-data.json missing; run make-commission-data.js first');
const STAMP = new Date().toISOString().slice(0, 10);

let html = fs.readFileSync(SRC, 'utf8');

// replace exactly n occurrences (default 1); throw if the count is off
const swap = (from, to, n = 1) => {
  const parts = html.split(from);
  if (parts.length - 1 !== n) throw new Error(`anchor matched ${parts.length - 1}x, expected ${n}: ${String(from).slice(0, 90)}`);
  html = parts.join(to);
};
// the same, but tolerant of an anchor upstream has already removed or reworded.
// ONLY for anchors whose bad end state a guardrail at the bottom catches on its own
// (/admin.html, servicetitan.com, northstar, xyops, a real name, an em dash): if the
// string is gone the demo is already correct, so throwing achieves nothing except
// stopping the nightly bake. Every break since 2026-07-30 was exactly that shape --
// loadRegistration, the ST deep-link comment, then the Settings link, which left the
// demo artifacts frozen for four days over a link the guardrail already proves absent.
// Anchors with no independent guardrail (the skin, the palette, the demo engine, the
// fetch chokepoints, the version stamp) keep using swap() and still fail loudly.
const swapMaybe = (from, to) => {
  const parts = html.split(from);
  if (parts.length - 1 > 1)
    throw new Error(`optional anchor matched ${parts.length - 1}x, expected 0 or 1: ${String(from).slice(0, 90)}`);
  html = parts.join(to);
};
// the same, for the one anchor that is volatile by design: the page's version stamp
const swapRe = (re, to, n = 1) => {
  const m = html.match(re);
  if (!m || m.length !== n) throw new Error(`regex matched ${m ? m.length : 0}x, expected ${n}: ${re}`);
  html = html.replace(re, to);
};

/* ---------- identity ---------- */
swap(`/* Branding lifted from northstar-owner-dashboard/index.template.html so all three
   dashboards read as one family. Fonts and logo are served from /assets on this
   same origin: nothing is fetched from a CDN. */`,
  '/* Branding: Mango Catalyst demo skin (brand-guidelines.md). */');
swap('<title>NorthStar Commission</title>',
  '<title>Boreal Comfort Co · Commission Tracker Demo</title>');
swap(`/* Palette: the install whiteboard's token set, verbatim — light is the default and dark is
   the override, so all three NorthStar surfaces read as one product. The storage keys stay
   the shared nsdash-theme / nsdash-fs from round 4; only the values moved. */`,
  `/* Palette: the Mango Catalyst token set, the same one the install whiteboard demo uses.
   Light is the default and dark is the override, so both demos read as one product. */`);

/* ---------- fonts: locally served Passion One -> inline Big Shoulders ---------- */
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

/* ---------- masthead: the same Boreal logotype the owner dashboard wears ----------
   make-demo-data.js draws it (bake-demo.sh step 2, before this script); inlined as a
   data URI so the artifact stays a single file and the banned asset name never
   appears in it. */
const LOGO = path.join(__dirname, 'build', 'data', 'ns-logo.svg');
if (!fs.existsSync(LOGO)) throw new Error('build/data/ns-logo.svg missing; run make-demo-data.js (bake-demo.sh step 2) first');
const logoUri = `data:image/svg+xml;base64,${fs.readFileSync(LOGO).toString('base64')}`;
swap('  <div class="logo-chip"><img alt="NorthStar Heating and Cooling" src="/assets/ns-logo.svg"></div>',
  `  <div class="logo-chip"><img alt="Boreal Comfort Co" src="${logoUri}"></div>`);

/* ---------- no settings page behind the demo: drop the gear and both admin links ---------- */
swapMaybe(`  <div class="htools">
    <a class="gear" href="/admin.html" title="People and rates" aria-label="People and rates">&#9881;</a>
  </div>
`, '');
swapMaybe(`    <a class="btn" href="/admin.html" title="People, rates and settings">Settings</a>
`, '');
swapMaybe(`        + ', but they have no rate for this job type yet. <a class="job" href="/admin.html">Add one in settings</a>'`,
  `        + ', but they have no rate for this job type yet. Add one in the settings page.'`);
swapMaybe(`// linkable (admin.html's nav links back with exactly these). A raw period id works too, so`,
  `// linkable. A raw period id works too, so`);
swapMaybe(`    // A hash from the address bar (or from admin.html's nav) wins over the default landing.`,
  `    // A hash from the address bar wins over the default landing.`);

/* ---------- ServiceTitan deep links: defang all four builders to plain text ---------- */
swapMaybe(`// Deep link straight to the job in ServiceTitan, so a questioned line is one click
// from the evidence rather than a copied invoice number.
const ST_JOB = 'https://go.servicetitan.com/#/Job/Index/';
// The invoice's own ST page. EditInvoice/<id> is confirmed from a local 2026-06-08
// capture of a live ServiceTitan invoice chip (mirrors Job/Index/<id>). ponytail: if ST
// ever moves the route this constant is the only knob; Bryan re-clicks it post-merge.
const ST_INVOICE = 'https://go.servicetitan.com/#/EditInvoice/';
function customerCell(l) {
  // The membership's own customer is the fallback, not a second-best guess: on a backlog line
  // whose sale invoice predates the tracker there IS no invoice to name the customer, and the
  // membership has carried the name all along. A blank cell there said "we do not know who this
  // was", which was never true.
  const who = l.customer_name || l.membership_customer_name;
  const name = who ? esc(who) : (l.source === 'manual' ? '' : 'unknown customer');
  if (!name) return '';
  return l.job_id
    ? '<a class="job cust" href="' + ST_JOB + encodeURIComponent(l.job_id) + '" target="_blank" rel="noopener"'
      + ' title="Open job ' + esc(l.job_id) + ' in ServiceTitan">' + name + '</a>'
    : '<span class="cust">' + name + '</span>';
}`,
  `// In the real tracker the customer and the invoice are deep links into ServiceTitan,
// so a questioned line is one click from the evidence. There is no ServiceTitan behind
// this demo, so the same cells render as text.
function customerCell(l) {
  // A backlog line whose sale invoice predates the tracker has no invoice to name the
  // customer, so the membership's own customer is the fallback rather than a blank cell.
  const who = l.customer_name || l.membership_customer_name;
  const name = who ? esc(who) : (l.source === 'manual' ? '' : 'unknown customer');
  return name ? '<span class="cust">' + name + '</span>' : '';
}`);
swapMaybe(`// The "invoice N" text as a deep link to the invoice in ServiceTitan. Customer name
// keeps its job link; this points at the invoice-level view instead.
const invoiceRef = (id) => '<a class="job" href="' + ST_INVOICE + encodeURIComponent(id)
  + '" target="_blank" rel="noopener" title="Open invoice ' + esc(id) + ' in ServiceTitan">invoice ' + esc(id) + '</a>';`,
  `const invoiceRef = (id) => '<span class="job">invoice ' + esc(id) + '</span>';`);
// The starCustomerCell/starWhat swaps that used to sit here are gone with the star
// backlog UI itself (commission-tracker f438944): StarClub is a `spiff` line in the
// main table now, so it defangs through customerCell + invoiceRef like any other row.
// The servicetitan.com guardrail below is what proves nothing was missed.

// A real customer's name in a donor comment (commission-tracker c85dcfd). The name scrub
// leaves code comments alone, and the privacy validator rightly fails the bake on it, so
// the example is rewritten here to a fictional one.
// Catch-all, not an anchor: the portal's copy of this swap was pinned to the surrounding
// prose, and on 2026-08-03 a second upstream comment adopted the same example and carried
// the real name straight past it into the artifact. Substituting the name itself covers
// every copy and survives any rewording.
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

/* ---------- the three network chokepoints and the one export navigation ---------- */
swap(`    const res = await fetch(path, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    const out = await res.json().catch(() => ({ error: 'server sent no answer' }));
    if (!res.ok || out.error) {
      throw new Error(out.reasons && out.reasons.length ? out.reasons.join(' | ') : (out.error || 'HTTP ' + res.status));
    }
    return out;`,
  `    // demo: the write lands in memory instead of on a server, and throws the same
    // way the server does so the error toasts are real rather than decorative.
    return demoWrite(path, body);`);
swap(`  const data = await (await fetch('/api/period?view=master&id=' + encodeURIComponent(id), { cache: 'no-store' })).json();
  // Overtaken while in flight: the newer load owns the page. Reported rather than just
  // returned, because the two print paths await this specifically to GET fresh data — a silent
  // early return there reads as "refreshed" and prints whatever CARD_PEOPLE still holds.
  if (token !== LOAD_TOKEN) return false;
  if (data.error) throw new Error(data.error);`,
  `  const data = demoPeriod(id); // demo: built in the page, no server behind it
  // No LOAD_TOKEN check: demoPeriod is synchronous, so there is no in-flight window
  // for a newer load to overtake; this always runs on to the function's return true,
  // which is the answer the print paths await.`);
// Two more /api/period readers arrived with the compute-run watcher and the idle poll
// (commission-tracker "Idle poll discards its own stale answer", 6e70696). Neither can
// reach a server here. They are defanged rather than deleted so the next upstream drift
// in either still trips an anchor instead of silently shipping a live fetch.
swap(`      const p = await (await fetch('/api/period?view=master&id=' + encodeURIComponent(CURRENT), { cache: 'no-store' })).json();
      const run = p && p.computeRun;`,
  `      // demo: unreachable. post() refuses /api/sync and /api/recompute above, so
      // startBackgroundJob returns before it ever schedules this watcher.
      const run = null;`);
swap(`    const p = await (await fetch('/api/period?view=master&id=' + encodeURIComponent(forPeriod), { cache: 'no-store' })).json();`,
  `    return; // demo: the page IS the data, so nothing can have changed underneath it
    const p = null;`);
// `floor` left the destructure upstream when it stopped being read anywhere on the page;
// demoPeriods() still returns it, and an unread key is harmless.
swap(`  const { periods, current, next, previous } = await (await fetch('/api/periods?view=master', { cache: 'no-store' })).json();`,
  `  const { periods, current, next, previous } = demoPeriods(); // demo: no server behind it`);
swap(`    window.location = '/api/export?batch=' + encodeURIComponent(out.batch);`,
  `    demoDownloadCsv(out.batch); // demo: the payroll CSV is built and downloaded in the page`);

/* ---------- iframed on a marketing page: never write to the host's history ---------- */
swap(`  // Set the hash without re-entering through the hashchange handler.
  if (hash !== undefined && location.hash !== '#' + hash) { HASH_SET_BY_US = true; location.hash = hash; }`,
  `  // demo: this artifact is iframed on mangocatalyst.com, so changing pay period must
  // not push a history entry the visitor's Back button then has to walk out of.
  if (hash !== undefined) HASH_SET_BY_US = true;`);

/* ---------- palette: NorthStar cream/teal -> Mango Catalyst tokens ----------
   The same pair list the install whiteboard bake uses, verbatim: this page inherited
   that token set, so both demos land on identical values. Status colours (done/pend/
   warn) are semantic and stay. */
const colors = [
  // light theme
  ['#14303d', '#1E2C4A'], ['#46606c', '#516079'], ['#7d919b', '#7E8BA6'],
  ['#e6ddc8', '#DCE1EC'], ['#f3edda', '#EDF0F7'], ['#fbf4e1', '#F4F6FB'],
  ['#fcfbf3', '#F7F9FC'], ['#002D3F', '#0E1729'], ['#006385', '#2F6BD8'],
  ['#FAA54E', '#F6A328'], ['#e1eff5', '#E3EDFC'],
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

/* ---------- copy: NorthStar identity out, Boreal in ---------- */
swapMaybe('  <span>NorthStar Heating &amp; Cooling</span>', '  <span>Boreal Comfort Co</span>');
swapMaybe(`    + '<div class="stmt-meta">NorthStar Heating &amp; Cooling. The computed number is a draft; the approved number is what pays.'
    + ' Question a line by ticking Disputed on the dashboard, or tell Bryan.</div>'`,
  `    + '<div class="stmt-meta">Boreal Comfort Co. The computed number is a draft; the approved number is what pays.'
    + ' Question a line by ticking Disputed on the dashboard, or tell the office.</div>'`);

// The Financing column header's tooltip, added upstream after this baker was written.
// Found by the northstar guardrail on 2026-08-03, not by an anchor: proof the two-tier
// split still catches a genuine leak that no swap was ever watching for.
swapMaybe(`    + ' NorthStar never receives it, so commission does not pay on it.">Financing</th>'`,
  `    + ' Boreal never receives it, so commission does not pay on it.">Financing</th>'`);

/* ---------- copy: the owner's name out of the code comments ---------- */
swapMaybe('// New Flat Rate tier letters spelled out, the way Bryan reads them on a line.',
  '// New Flat Rate tier letters spelled out, the way an owner reads them on a line.');
swapMaybe('// COMPLETE CALL rows live here too (Bryan, 2026-07-23) — one Upcoming bucket per person,',
  '// COMPLETE CALL rows live here too: one Upcoming bucket per person,');
swapMaybe(`// Navigation lives in the period dropdown (Bryan, 2026-07-22: no tab bar) and carries`,
  `// Navigation lives in the period dropdown (no tab bar) and carries`);
swapMaybe(`// sit in each person's Upcoming block (Bryan, 2026-07-23). Hash tokens (#last/#current/#next)`,
  `// sit in each person's Upcoming block. Hash tokens (#last/#current/#next)`);
// the internal name of the scheduler behind the nightly run
swapMaybe('// fed by the nightly xyOps run (ST pull + compute, 05:15), so 45m would be amber from about',
  '// fed by a nightly run (ST pull + compute, just after 05:00), so 45m would be amber from about');

/* ---------- StarClub is NorthStar's membership brand; Boreal has its own ---------- */
// This catch-all is now the whole job: the three anchored star-backlog swaps that sat
// here went with the UI they de-Bryan'd (commission-tracker f438944).
html = html.split('StarClub').join('Comfort Club');

/* ---------- version stamp: say what this is instead of which build it came from ---------- */
swapMaybe(`  <!-- page version, extension-style date.build: bump on every shipped template change -->
`, '');
swapRe(/<span>v\d{4}-\d{2}-\d{2}\.\d+<\/span>/,
  `<span>demo v${STAMP} · fictional data · edits reset on reload</span>`);

/* ---------- dashes: the site bans em and en dashes everywhere ---------- */
html = html.split(' — ').join(', ');
html = html.split(' &mdash; ').join(', ');
html = html.split(' —\n').join(',\n'); // a comment clause that runs on to the next line
swapMaybe('<span class="muted">—</span>', '<span class="muted">not recorded</span>');

/* ---------- names: the catch-all, after every anchored swap ---------- */
html = scrubNames(html);

/* ---------- guardrails ---------- */
assertNoRealNames(html, 'the commission demo');
// xyops joined this list when its comment swap became optional: the anchored swap used
// to be the only thing keeping the internal scheduler name out of a public artifact.
if (/northstar|passion one|xyops/i.test(html)) throw new Error('NS identity survived the transform');
if (/servicetitan\.com|slack\.com|\/admin\.html|ns-logo/i.test(html)) throw new Error('live endpoint or asset survived the transform');
if (/fetch\(/.test(html)) throw new Error('a network call survived the transform');
for (const ch of ['–', '—']) if (html.includes(ch)) throw new Error('em/en dash in demo artifact');

fs.writeFileSync(OUT, html);
console.log(`commission demo written: ${OUT} (${Math.round(fs.statSync(OUT).size / 1024)} KB)`);
