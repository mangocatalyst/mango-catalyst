#!/usr/bin/env node
// roll-inject.js — the whiteboard half of the nightly roll.
//
// make-whiteboard-demo.js skins the donor once and leaves __SALES_SUMMARY__ where
// the Sales tab feed goes. That feed is the only part of the whiteboard that has
// to move every night: it is a dated window, and the tab renders "as of
// <generatedAt> · Nm ago", which reads as "7200m ago" if you freeze it.
//
// So the skin is committed and this fills in today's feed. The point of the split
// is that the nightly stops re-reading the live donor pages: an edit to the real
// install whiteboard can no longer break the 05:45 run. See demo/skin.sh.
//
// The four guards below are the ones the payload USED to get for free by being
// inlined before make-whiteboard-demo.js's own checks ran. Deferring the
// injection would otherwise mean the feed is the one region of the artifact
// nothing looks at. Six lines duplicated from a sibling file in the same
// directory, deliberately: cheaper than an abstraction over two call sites.
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const { scrubNames, assertNoRealNames } = require('./scrub-names.js');

const SKIN = path.join(__dirname, 'skinned', 'whiteboard.html');
const SALES = path.join(__dirname, 'build', 'sales-summary.json');
const OUT = path.join(__dirname, 'build', 'whiteboard.html');

if (!fs.existsSync(SKIN)) throw new Error(`${SKIN} missing; run demo/skin.sh`);
if (!fs.existsSync(SALES)) throw new Error(`${SALES} missing; run ns-dash-bake (roll.sh step 2) first`);

const salesJson = fs.readFileSync(SALES, 'utf8').trim();
// Parse before substituting. A truncated or empty feed would otherwise splice in
// `const DEMO_SALES = ;` and ship a page that serves 200 and runs none of its JS
// — the artifact is not re-parsed anywhere after this, so nothing else would see it.
try { JSON.parse(salesJson); }
catch (e) { throw new Error(`${SALES} is not valid JSON (${e.message}); refusing to inject`); }

// Function replacer, matching ns-dash-bake.js's sub(): a literal `$&` or `$1`
// anywhere in the payload would otherwise be expanded as a replacement pattern.
let html = fs.readFileSync(SKIN, 'utf8').replace('__SALES_SUMMARY__', () => salesJson);

if (/__[A-Z][A-Z0-9_]{2,}__/.test(html)) {
  const left = [...new Set(html.match(/__[A-Z][A-Z0-9_]{2,}__/g))];
  throw new Error(`unsubstituted placeholder in the whiteboard skin: ${left.join(', ')}`);
}

/* ---------- the guards the payload loses by arriving late ---------- */
html = scrubNames(html);
assertNoRealNames(html, 'the rolled whiteboard');
if (/fetch\(/.test(html)) throw new Error('a network call survived the roll');
const live = html.match(/[^\n]*(servicetitan\.com|slack\.com|\/api\/|whiteboard\.json|sales-summary\.json)[^\n]*/gi);
if (live) throw new Error(`live endpoint survived the roll (${live.length}):\n` +
  live.map(l => '  ' + l.trim().slice(0, 120)).join('\n'));
const dashes = html.match(/[^\n]*[–—][^\n]*/g);
if (dashes) throw new Error(`em/en dash in demo artifact (${dashes.length}):\n` +
  dashes.map(l => '  ' + l.trim().slice(0, 120)).join('\n'));

fs.writeFileSync(OUT, html);
console.log(`whiteboard rolled: ${OUT} (${Math.round(fs.statSync(OUT).size / 1024)} KB)`);
