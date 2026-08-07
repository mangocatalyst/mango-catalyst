#!/usr/bin/env node
// make-template.js — derive the mangocatalyst demo dashboard template from the
// live NorthStar template. Reads ~/Projects/northstar-owner-dashboard/
// index.template.html, applies the Mango Catalyst skin (palette, Big Shoulders
// + Inter variable fonts, fictional Boreal Comfort Co identity) and defangs
// every external link (ServiceTitan, Slack). Writes demo/build/index.template.html.
//
// Every replacement is asserted: if the NS template drifts and an anchor string
// disappears, this script throws instead of silently shipping a half-skinned demo.
'use strict';
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { scrubNames, assertNoRealNames } = require('./scrub-names.js');

const SRC = path.join(os.homedir(), 'Projects', 'northstar-owner-dashboard', 'index.template.html');
const OUT_DIR = path.join(__dirname, 'build');
fs.mkdirSync(OUT_DIR, { recursive: true });

let html = fs.readFileSync(SRC, 'utf8');

// Anchors are asserted but a miss is collected, not thrown: assertAnchors() below
// reports every drifted anchor in one run. See anchors.js.
const { swap, swapBetween, swapRe, assertAnchors } = require('./anchors.js')(() => html, v => { html = v; });

/* ---------- fonts: 5 static faces -> 2 variable faces ---------- */
swap(
  `@font-face{font-family:'Passion One';font-weight:400;font-display:swap;src:url(data:font/woff2;base64,{{PASSION_400}}) format('woff2')}
@font-face{font-family:'Passion One';font-weight:700;font-display:swap;src:url(data:font/woff2;base64,{{PASSION_700}}) format('woff2')}
@font-face{font-family:'Inter';font-weight:400;font-display:swap;src:url(data:font/woff2;base64,{{INTER_400}}) format('woff2')}
@font-face{font-family:'Inter';font-weight:600;font-display:swap;src:url(data:font/woff2;base64,{{INTER_600}}) format('woff2')}
@font-face{font-family:'Inter';font-weight:800;font-display:swap;src:url(data:font/woff2;base64,{{INTER_800}}) format('woff2')}`,
  `@font-face{font-family:'Big Shoulders';font-weight:100 900;font-display:swap;src:url(data:font/woff2;base64,{{PASSION_400}}) format('woff2')}
@font-face{font-family:'Inter';font-weight:100 900;font-display:swap;src:url(data:font/woff2;base64,{{INTER_400}}) format('woff2')}`
);

/* ---------- palette: Mango Catalyst tokens (brand-guidelines.md) ---------- */
swap(
  `:root{
  --night:#04161f; --navy:#002d3f; --navy2:#004053; --panel:rgba(255,255,255,.035);
  --line:rgba(157,216,215,.14); --teal:#0097a0; --teal-bri:#2fc4cc; --ice:#9dd8d7;
  --gold:#d29847; --gold-bri:#faa54e; --cream:#fff0c3; --red:#f0533f; --red-dim:#b13a2c;
  --ink:#e8eef0; --dim:#8aa4ad; --dimmer:#5d7681; --num:#fff;
  --grid:rgba(157,216,215,.09); --band:rgba(157,216,215,.05);
  --disp:'Passion One', 'Arial Narrow', sans-serif; --body:'Inter', -apple-system, 'Segoe UI', sans-serif;
}`,
  `:root{
  --night:#0A1120; --navy:#16213A; --navy2:#1E2C4A; --panel:rgba(255,255,255,.035);
  --line:rgba(157,170,194,.16); --teal:#5BA8FF; --teal-bri:#7CBBFF; --ice:#C9D6EE;
  --gold:#F6A328; --gold-bri:#FFB84D; --cream:#FDEBCB; --red:#FF6B6B; --red-dim:#C94F4F;
  --ink:#F2F5FA; --dim:#9DAAC2; --dimmer:#7E8BA6; --num:#fff;
  --grid:rgba(157,170,194,.10); --band:rgba(157,170,194,.05);
  --disp:'Big Shoulders', 'Arial Narrow', sans-serif; --body:'Inter', -apple-system, 'Segoe UI', sans-serif;
}`
);
swap(
  `:root[data-theme=light]{
  --night:#f2f5f4; --panel:#ffffff;
  --line:rgba(10,60,72,.14); --teal:#0a7c85; --teal-bri:#0a9aa3; --ice:#0a6f78;
  --gold:#a3691c; --gold-bri:#a86f14; --cream:#12303c; --red:#c93a26;
  --ink:#243c46; --dim:#51707b; --dimmer:#7b929b; --num:#0e2730;
  --grid:rgba(10,60,72,.12); --band:rgba(10,122,133,.06);
}`,
  `:root[data-theme=light]{
  --night:#F4F6FB; --panel:#ffffff;
  --line:rgba(30,44,74,.14); --teal:#2F6BD8; --teal-bri:#2563C4; --ice:#33518A;
  --gold:#B26E0E; --gold-bri:#9E620C; --cream:#0E1729; --red:#D2492F;
  --ink:#1E2C4A; --dim:#516079; --dimmer:#7E8BA6; --num:#0E1729;
  --grid:rgba(30,44,74,.12); --band:rgba(47,107,216,.06);
}`
);
swap(
  ':root[data-theme=light] body{background:#f2f5f4;background-image:linear-gradient(180deg,#eef4f3 0%,#f2f5f4 40%,#edf1f0 100%)}',
  ':root[data-theme=light] body{background:#F4F6FB;background-image:linear-gradient(180deg,#F0F3FA 0%,#F4F6FB 40%,#EEF1F8 100%)}'
);

// scattered color literals: NS teal/gold/ice families -> MC blue/amber/periwinkle
const bulk = [
  ['rgba(157,216,215', 'rgba(157,170,194'],
  ['rgba(0,151,160', 'rgba(91,168,255'],
  ['rgba(210,152,71', 'rgba(246,163,40'],
  ['rgba(47,196,204', 'rgba(124,187,255'],
  ['rgba(10,60,72', 'rgba(30,44,74'],
  ['rgba(10,122,133', 'rgba(47,107,216'],
  ['rgba(255,240,195', 'rgba(253,235,203'],
  ['#06202c', '#101B31'],
  ['#030f16', '#070D18'],
  ['#0a6f78', '#33518A'],
  ['#0a9aa3', '#2563C4'],
  ['#0a7c85', '#2F6BD8'],
  ['#12303c', '#0E1729'],
  // hardcoded chart/chrome colors outside the :root blocks
  ['rgba(240,83,63', 'rgba(255,107,107'],
  ['rgba(250,165,78', 'rgba(255,184,77'],
  ['#2fc4cc', '#7CBBFF'],
  ['#faa54e', '#FFB84D'],
  ['#f0533f', '#FF6B6B'],
  ['#5b8fc9', '#8F9DB8'],
  ['#7fe0d3', '#37C99A'],
  ['#0b2733', '#101B31'],
  ['#07222e', '#0F1830'],
];
for (const [from, to] of bulk) {
  if (!html.includes(from)) continue; // some literals live only in the swapped blocks
  html = html.split(from).join(to);
}

/* ---------- identity: fictional Boreal Comfort Co ---------- */
swap('<title>NorthStar Daily Ops', '<title>Boreal Comfort Co · Owner Dashboard Demo');
swap('alt="NorthStar Heating and Cooling"', 'alt="Boreal Comfort Co"');
swap('document.title = `NorthStar Operations · ${DATA.meta.reportDateHuman}`;',
  'document.title = `Boreal Comfort Co · ${DATA.meta.reportDateHuman} · Demo`;');
swap('<span>NorthStar Heating &amp; Cooling</span>',
  '<span>Boreal Comfort Co · a fictional demonstration company</span>');
swap('(Russ, Ron)', '(Marcus, Dana)');
swap('Declined by NS', 'Declined by office', 4);
swap('Request Declined by NorthStar', 'Request Declined by Office', 2);
swap("$('#badge').textContent = M.badge;", "$('#badge').textContent = 'DEMO \\u00b7 FICTIONAL DATA';");
swap('from Slack · last 7 days · links jump to the channel', 'from Slack · last 7 days · nightly AI triage');

/* ---------- defang: no live ServiceTitan or Slack targets ---------- */
swap(
  'const stJob = j => j ? `<a href="https://go.servicetitan.com/#/Job/Index/${j}" target="_blank" rel="noopener" style="color:var(--teal-bri);text-decoration:none">#${j}</a>` : \'<span style="color:var(--dimmer)">·</span>\';',
  'const stJob = j => j ? `<span style="color:var(--teal-bri)">#${j}</span>` : \'<span style="color:var(--dimmer)">·</span>\'; // demo: ServiceTitan deep links disabled'
);
swap(
  'const cLink = m => m.cust ? `<a href="https://go.servicetitan.com/#/Customer/${m.cust}" target="_blank" rel="noopener" style="color:var(--teal-bri);text-decoration:none;font-weight:600">${esc(m.name)}</a>` : esc(m.name);',
  'const cLink = m => esc(m.name); // demo: ServiceTitan deep links disabled'
);
// Job Costing (donor 25010ea/3f0ceca, hidden beta) brought two more deep links.
// Each collapses to the inert branch it already carries, so the cells read the same.
// End-anchored: the href line between the ends carries the styling, and Job Costing is
// the donor page still under active change.
swapBetween(`    const custLink = j => j.custId`, `      : esc(j.customer || 'unknown');`,
  `    const custLink = j => esc(j.customer || 'unknown'); // demo: ServiceTitan deep links disabled`);
swapBetween(`    const typeLink = j => j.jobIds && j.jobIds.length`, `      : \`<span class="hint">\${esc(j.type)}</span>\`;`,
  `    const typeLink = j => \`<span class="hint">\${esc(j.type)}</span>\`; // demo: ServiceTitan deep links disabled`);

/* ---------- no server behind the demo: every call becomes a local edit ----------
   The demo is one self-contained file on a static host, so anything that POSTs
   or polls resolves to mangocatalyst.com and 404s. Left alone that shows as a
   dismissed flag springing back. Each of these keeps the local half of the work
   (localStorage, the re-render) and drops the round trip, so the control does
   what it looks like it does and the edit lasts until reload. */
// End-anchored, all four: what sits between the ends is the rollback branch, the
// error string and the commentary, which is exactly what upstream rewrites. The
// fetch( and /api/ guardrails below are what prove each one landed.
swapBetween(`    fSync(); renderFlags();
    try {`, `    }
  });`,
  `    fSync(); renderFlags(); // demo: the dismissal lives in this browser, nothing to POST
  });`);
swapBetween(`  /* Union, not replace: this machine's just-clicked dismissals are already POSTed,`,
  `  }).catch(() => {});
}`,
  `  // demo: no other machine to union dismissals from
}`);
// The pager HEADs tomorrow's report to see whether the link should appear. The demo
// publishes exactly one report (make-demo-data.js clears the archive first), so there
// is never a next page, and the probe would 404 against the static host anyway.
swapBetween(`if (PG.next && location.protocol.startsWith('http')) {`, `.catch(() => {});
}`,
  `// demo: one report, so there is never a next page to probe for`);
swapBetween(`  try {
    const r = await fetch('/api/layout',`, `  } catch { b.textContent = 'Save failed'; }`,
  `  b.textContent = 'Saved ✓ (this browser, for the demo)'; // demo: nothing to POST to`);

/* ---------- demo chrome ---------- */
// the north-star star field is NorthStar brand, not MC
swap('<div class="stars"></div><div class="polaris" aria-hidden="true"></div>', '');
swap('/* the north star */', '');
// no server behind the static demo: hide the shared-default layout save
swap('<button class="chip" id="w-default">Save as default for everyone</button>',
  '<button class="chip" id="w-default" style="display:none">Save as default for everyone</button>');
// demo's own version stamp
swapRe(/<span>v\d{4}-\d{2}-\d{2}\.\d+<\/span>/, '<span>demo v2026-08-06.1</span>');

// a code comment names real NS installers; caught by the validator 2026-07-14
swap(`/* booked-capacity math (service: 8h per tech-day; install: per-day cap from
   the pull, Scott + Corey 8s and Zack four 10s). Charts below reuse these. */`,
  '/* booked-capacity math (service: 8h per tech-day; install: per-day cap from the pull). Charts below reuse these. */');

/* ---------- rendered copy that names the real service team ----------
   Not a comment: the note printed under the Service tab heading, which a
   2026-07-24 review found shipped in public/demo/dashboard.html. Still asserted
   rather than left to the name scrub below, because the sentence has to read as a
   sentence about the fictional shop, not as two substituted words, and because a
   decision stamp is internal bookkeeping that has no business on a public demo.

   Anchored on the two fragments that actually need changing, NOT on the whole
   note. It used to quote all 500 characters, so any edit anywhere in the
   paragraph broke the bake: the 2026-08-05 warranty-callback sentence (nsdash
   6befee5) appended one clause and killed the nightly for two nights. Everything
   between these fragments now flows through untouched, and scrubNames plus
   assertNoRealNames below still fail the bake on any name that appears in it. */
swap(`Russ and Ron run service and sell.`,
  `Two of the service techs sell as well as run calls.`);
swap(`$2,500 and up (Bryan 2026-07-11);`, `$2,500 and up;`);

/* ---------- every drifted anchor, in one report, before anything is written ---------- */
assertAnchors();

/* ---------- names: the catch-all, after every anchored swap ----------
   Runs last so the swaps above still find anchors containing the real names.
   Rewrites what is mapped, then throws on anything that is not. */
html = scrubNames(html);

/* ---------- guardrails ---------- */
assertNoRealNames(html, 'the demo template');
if (/northstar|passion one/i.test(html)) throw new Error('NS branding survived the transform');
const stLeft = html.match(/[^\n]*go\.servicetitan\.com[^\n]*/g);
if (stLeft) throw new Error(`live ServiceTitan link survived the transform (${stLeft.length}):\n` +
  stLeft.map(l => '  ' + l.trim().slice(0, 120)).join('\n'));
// The demo is a static file with no server behind it, so nothing may call one.
// Two checks, because they catch different things: fetch( is any network call at
// all (the commission bake has proved this the strongest form), and /api/ also
// catches an endpoint reached by navigation or a form action rather than fetch.
if (/fetch\(/.test(html)) throw new Error('a network call survived the transform');
const live = html.match(/[^\n]*(\/api\/|slack\.com)[^\n]*/gi);
if (live) throw new Error(`live endpoint survived the transform (${live.length}):\n` +
  live.map(l => '  ' + l.trim().slice(0, 120)).join('\n'));
const dashes = html.match(/[^\n]*[–—][^\n]*/g);
if (dashes) throw new Error(`em/en dash in demo template (${dashes.length}):\n` +
  dashes.map(l => '  ' + l.trim().slice(0, 120)).join('\n'));

fs.writeFileSync(path.join(OUT_DIR, 'index.template.html'), html);
console.log('demo template written:', path.join(OUT_DIR, 'index.template.html'));
