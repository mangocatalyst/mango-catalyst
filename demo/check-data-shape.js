#!/usr/bin/env node
// check-data-shape.js — the frozen skin's contract with an UNfrozen renderer.
//
// The split froze demo/skinned/index.template.html, but ns-dash-bake.js lives in
// a third repo (mango-automation) and still runs on the 05:45 path. So the
// template's expectations and the renderer's output can now drift apart, and
// nothing else notices: a renamed key in DATA_OUT ships a page whose panels are
// simply empty, and it sails past every existing guard. The {{ }} check
// (ns-dash-bake.js:612) only sees unsubstituted placeholders, the dash check only
// sees punctuation, the new Function() parse only proves the script is
// syntactically valid, and the privacy validator only proves nothing real leaked.
// An empty panel is valid, parseable, dash-free and leak-free.
//
// So: record the top-level key set at skin time, when a human is watching, and
// assert it every night. A renderer that drops or renames a key now fails loudly
// and names it.
//
// Scope, stated honestly: this catches the SHAPE changing, which is the failure
// that was demonstrated. It does not catch a key that survives with different
// contents. The next rung is a headless-Chrome DOM smoke test, which is
// deliberately not taken here: capture-screens.sh only needs Chrome three days a
// week, and making it a hard dependency of every nightly trades one silent
// failure mode for a new loud one.
//
//   node check-data-shape.js            assert against skinned/data-shape.json
//   node check-data-shape.js --record   write it (skin.sh does this)
'use strict';
const fs = require('node:fs');
const path = require('node:path');

const SHAPE = path.join(__dirname, 'skinned', 'data-shape.json');
const DATA = path.join(__dirname, 'build', 'data', 'dashboard-data.json');
const HTML = path.join(__dirname, 'build', 'index.html');
const record = process.argv.includes('--record');

if (!fs.existsSync(DATA)) throw new Error(`${DATA} missing; run ns-dash-bake (roll.sh) first`);
const data = JSON.parse(fs.readFileSync(DATA, 'utf8'));

// ns-dash-bake.js only rewrites dashboard-data.json when the report it just baked
// is the latest one (its isLatest branch, :624). That holds here because
// make-demo-data.js clears build/index.html and the report-*.html archives first,
// but it is a coupling across two repos rather than a guarantee. Prove the JSON
// belongs to the artifact we are about to ship instead of assuming it.
const stamped = fs.readFileSync(HTML, 'utf8').includes(`"reportDate":"${data.meta.reportDate}"`);
if (!stamped) {
  throw new Error(`dashboard-data.json is for ${data.meta.reportDate}, which is not the report baked into build/index.html; ns-dash-bake did not take its isLatest branch`);
}

const keys = Object.keys(data).sort();

if (record) {
  fs.mkdirSync(path.dirname(SHAPE), { recursive: true });
  fs.writeFileSync(SHAPE, JSON.stringify({
    note: 'Top-level keys of ns-dash-bake.js DATA_OUT as of the last re-skin. roll.sh asserts this every night: the template is frozen but the renderer is not. Re-record by running demo/skin.sh.',
    recordedAt: new Date().toISOString().slice(0, 10),
    keys,
  }, null, 2) + '\n');
  console.log(`data shape recorded: ${keys.length} keys`);
  return;
}

if (!fs.existsSync(SHAPE)) throw new Error(`${SHAPE} missing; run demo/skin.sh to record it`);
const want = JSON.parse(fs.readFileSync(SHAPE, 'utf8')).keys;

const lost = want.filter(k => !keys.includes(k));
const gained = keys.filter(k => !want.includes(k));
if (lost.length || gained.length) {
  throw new Error(
    'ns-dash-bake.js changed the shape of DATA while demo/skinned/ is frozen, so the demo would ship panels with nothing in them.\n' +
    (lost.length ? `  keys the frozen template still expects, now GONE: ${lost.join(', ')}\n` : '') +
    (gained.length ? `  keys the renderer added that the frozen template ignores: ${gained.join(', ')}\n` : '') +
    '  re-skin (demo/skin.sh) so the template and the renderer agree again.');
}
console.log(`data shape ok: ${keys.length} keys`);
