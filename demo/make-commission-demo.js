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

let html = fs.readFileSync(SRC, 'utf8');

// The demo's version IS the donor's version: it says what this was skinned from,
// and it moves only when somebody re-skins. It used to be the bake date, which
// made this artifact differ every single night over a string nobody reads and
// was the whole reason the nightly rebuilt it at all (2026-08-11).
// Read here, off the raw donor, and with its own match: a capture group inside
// swapRe would make anchors.js see m.length === 2 and report a phantom miss.
const DONOR_V = (html.match(/<span>v(\d{4}-\d{2}-\d{2}\.\d+)<\/span>/) || [])[1];
if (!DONOR_V) throw new Error(`donor version stamp not found in ${SRC}`);

// Both tiers live in anchors.js, which collects a miss rather than throwing on it:
// assertAnchors() below reports every drifted anchor in one run.
const { swap, swapMaybe, swapBetween, swapRe, swapFn, swapAll, dropCssFor, assertAnchors } =
  require('./anchors.js')(() => html, v => { html = v; });

/* ---------- identity ---------- */
// End-anchored, both of these: they are comments, and a comment being reworded is not
// a reason to stop the nightly.
swapBetween(`/* Branding lifted from northstar-owner-dashboard/index.template.html`, `is fetched from a CDN. */`,
  '/* Branding: Mango Catalyst demo skin (brand-guidelines.md). */');
// Derived, not quoted: the donor renamed itself "NorthStar Commission" ->
// "NorthStar Payroll &amp; Commissions" (tracker 4439049) and refused the whole
// re-skin over a page title. Nothing here cares what the donor calls itself, only
// that the demo says something else, and the /northstar/i guard below proves the end
// state either way. Same reasoning as the version stamp in make-template.js.
swapRe(/<title>NorthStar[^<]*<\/title>/, '<title>Boreal Comfort Co · Commission Tracker Demo</title>');
swapBetween(`/* Palette: the install whiteboard's token set, verbatim`, `only the values moved. */`,
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
// Two anchors where there used to be one 1300-character quote of the donor: the
// comment-and-constants block by its ends, and the function by its signature. The
// commentary in the middle is upstream's to edit; check-defanged-cells.js proves the
// swapped customerCell renders inert text, and the servicetitan.com guardrail proves
// the constants are gone.
swapBetween(`// Deep link straight to the job in ServiceTitan, so a questioned line is one click`,
  `const ST_INVOICE = 'https://go.servicetitan.com/#/EditInvoice/';`,
  `// In the real tracker the customer and the invoice are deep links into ServiceTitan,
// so a questioned line is one click from the evidence. There is no ServiceTitan behind
// this demo, so the same cells render as text.`, { tolerant: true });
swapFn('customerCell', `function customerCell(l) {
  // A backlog line whose sale invoice predates the tracker has no invoice to name the
  // customer, so the membership's own customer is the fallback rather than a blank cell.
  const who = l.customer_name || l.membership_customer_name;
  const name = who ? esc(who) : (l.source === 'manual' ? '' : 'unknown customer');
  return name ? '<span class="cust">' + name + '</span>' : '';
}`, { tolerant: true });
swapBetween(`// The "invoice N" text as a deep link to the invoice in ServiceTitan.`,
  `">invoice ' + esc(id) + '</a>';`,
  `const invoiceRef = (id) => '<span class="job">invoice ' + esc(id) + '</span>';`,
  { tolerant: true });
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
// Anchored on the two ends, not on the middle: the error-message wording between them
// is exactly the sort of line upstream rewords, and rewording it is not a reason to
// stop the nightly. The guardrail below proves no fetch( survived either way.
swapBetween(`    const res = await fetch(path, { method: 'POST',`, `    return out;`,
  `    // demo: the write lands in memory instead of on a server, and throws the same
    // way the server does so the error toasts are real rather than decorative.
    return demoWrite(path, body);`);
swapBetween(`  const data = await (await fetch('/api/period?view=master&id=' + encodeURIComponent(id), { cache: 'no-store' })).json();`,
  `  if (data.error) throw new Error(data.error);`,
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
for (const [from, to] of colors) swapAll(from, to);

/* ---------- copy: NorthStar identity out, Boreal in ---------- */
// Catch-all, not an anchor: the company name is in the masthead span and again in the
// statement footnote, and it used to cost one anchor each, the second of which quoted a
// whole sentence of copy just to reach the name inside it. Substituting the name covers
// both and any future copy; the /northstar/i guardrail below proves none survived.
html = html.split('NorthStar Heating &amp; Cooling').join('Boreal Comfort Co');
// scrubNames alone would render this "or tell the owner", which is true but reads oddly
// to a tech. Optional: if upstream rewords the sentence, the scrub still covers the name.
swapMaybe('or tell Bryan.', 'or tell the office.');

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
  `<span>demo v${DONOR_V} · fictional data · edits reset on reload</span>`);

/* ---------- exclude cross-period search, rather than stub it ----------
   Same call as the club view on the owner dashboard (Bryan, 2026-08-12), for the
   same reason and by the same test: the donor grew this on 2026-08-12 (tracker
   ff4256c) and the shipped demo predates it, so taking it out leaves the public page
   exactly as it looks today. It is a database scan per keystroke behind
   /api/search -- there is no server on a static host, and the demo carries five
   periods in the page rather than an index to search. Stubbing the fetch would ship
   a search box that answers "no results" to every query, which is worse than a page
   that never promised to search.

   Precedent in this file: the gear and both admin links come out for exactly this
   reason, because there is no settings page behind the demo either.

   The CSS leaves with them, through dropCssFor -- an exclusion that ships styling for
   elements it just deleted is not finished, and a dead rule is indistinguishable from
   a live one the next time the donor edits this sheet.

   The two SEARCH_ globals do stay: they are two `let` declarations naming nothing, and
   unlike a CSS rule there is no selector for a future edit to attach to. */
swapBetween(`      <!-- ACROSS ALL PAY PERIODS (Bryan, 2026-08-12). The dropdown navigates one period at a`,
  `including held and already-paid lines.">`, '', { maxSpan: 1200 });
swap(`<div class="card" id="search-panel" hidden>
  <div class="who"><b>Search</b> <span class="muted" id="search-state"></span></div>
  <div id="search-results"></div>
</div>

`, '');
swapBetween(`// --- search across every pay period ---`, `    renderSearch({ q, hits: [], error: e.message });
  }
}`, `// demo: cross-period search is excluded, not stubbed -- it is a server-side index
// and this artifact is five periods in one file. See make-commission-demo.js.`,
  { maxSpan: 4000 });
swapBetween(`    const box = document.getElementById('q');`,
  `    results.addEventListener('keydown', jump);`,
  `    // demo: nothing to wire, the search box and its panel are excluded above`,
  { maxSpan: 1800 });
dropCssFor(/#q\b|\bsearch-/);

/* ---------- dashes: the site bans em and en dashes everywhere ---------- */
html = html.split(' — ').join(', ');
html = html.split(' &mdash; ').join(', ');
html = html.split(' —\n').join(',\n'); // a comment clause that runs on to the next line
html = html.replace(/(['"])— /g, '$1'); // a dash opening a quoted string, as hours-state does
swapMaybe('<span class="muted">—</span>', '<span class="muted">not recorded</span>');

/* ---------- every drifted anchor, in one report, before anything is written ---------- */
assertAnchors();

/* ---------- names: the catch-all, after every anchored swap ---------- */
html = scrubNames(html);

/* ---------- guardrails ---------- */
assertNoRealNames(html, 'the commission demo');
// xyops joined this list when its comment swap became optional: the anchored swap used
// to be the only thing keeping the internal scheduler name out of a public artifact.
if (/northstar|passion one|xyops/i.test(html)) throw new Error('NS identity survived the transform');
if (/servicetitan\.com|slack\.com|\/admin\.html|ns-logo/i.test(html)) throw new Error('live endpoint or asset survived the transform');
// The deep-link constants and their two users are swapped by separate tolerant anchors,
// so ANY of them drifting alone leaves the page referencing a constant nobody declares.
// That is a dead page, and no string scan above sees it: the URL is exactly what left.
// 2026-08-07: caught here first, when invoiceRef's end anchor silently matched nothing.
if (/\bST_JOB\b|\bST_INVOICE\b/.test(html)) throw new Error('a ServiceTitan deep-link constant survived the transform; the swapped cell builders reference it and the page will throw');
if (/fetch\(/.test(html)) throw new Error('a network call survived the transform');
const dashes = html.match(/[^\n]*[–—][^\n]*/g);
if (dashes) throw new Error(`em/en dash in demo artifact (${dashes.length}):\n` +
  dashes.map(l => '  ' + l.trim().slice(0, 120)).join('\n'));

fs.writeFileSync(OUT, html);
console.log(`commission demo written: ${OUT} (${Math.round(fs.statSync(OUT).size / 1024)} KB)`);
