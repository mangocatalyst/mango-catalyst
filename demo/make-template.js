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

const SRC = path.join(os.homedir(), 'Projects', 'northstar-owner-dashboard', 'index.template.html');
const OUT_DIR = path.join(__dirname, 'build');
fs.mkdirSync(OUT_DIR, { recursive: true });

let html = fs.readFileSync(SRC, 'utf8');

// replace exactly n occurrences (default 1); throw if the count is off
const swap = (from, to, n = 1) => {
  const parts = html.split(from);
  if (parts.length - 1 !== n) throw new Error(`anchor matched ${parts.length - 1}x, expected ${n}: ${String(from).slice(0, 80)}`);
  html = parts.join(to);
};

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

/* ---------- demo chrome ---------- */
// the north-star star field is NorthStar brand, not MC
swap('<div class="stars"></div><div class="polaris" aria-hidden="true"></div>', '');
swap('/* the north star */', '');
// no server behind the static demo: hide the shared-default layout save
swap('<button class="chip" id="w-default">Save as default for everyone</button>',
  '<button class="chip" id="w-default" style="display:none">Save as default for everyone</button>');
// demo's own version stamp
swap(/<span>v(\d{4}-\d{2}-\d{2}\.\d+)<\/span>/.source.length && html.match(/<span>v\d{4}-\d{2}-\d{2}\.\d+<\/span>/)[0],
  '<span>demo v2026-07-13.1</span>');

/* ---------- guardrails ---------- */
if (/northstar|passion one/i.test(html)) throw new Error('NS branding survived the transform');
if (/go\.servicetitan\.com/.test(html)) throw new Error('live ServiceTitan link survived the transform');
for (const ch of ['–', '—']) if (html.includes(ch)) throw new Error('em/en dash in demo template');

fs.writeFileSync(path.join(OUT_DIR, 'index.template.html'), html);
console.log('demo template written:', path.join(OUT_DIR, 'index.template.html'));
