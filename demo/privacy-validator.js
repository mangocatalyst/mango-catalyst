#!/usr/bin/env node
// privacy-validator.js — the no-leak guarantee for the /dashboards demo.
// Greps the baked artifact for anything traceable to the real NorthStar
// deployment: company strings, the tenant id, live Slack/ServiceTitan targets,
// real employee names, and real customer names harvested from the live data
// files on this machine. Non-zero exit blocks the deploy.
'use strict';
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const ARTIFACT = process.argv[2] || path.join(__dirname, 'build', 'index.html');
// base64 font payloads collide with short-name substrings ("Zack"); skip them
const html = fs.readFileSync(ARTIFACT, 'utf8')
  .replace(/data:font\/woff2;base64,[A-Za-z0-9+/=]+/g, 'data:font/woff2;base64,STRIPPED')
  .replace(/"(?:[A-Za-z-]+-\d{3})":\s*"[A-Za-z0-9+/=]{100,}"/g, '""'); // fonts-b64 JSON style
const lower = html.toLowerCase();
const problems = [];
const hit = (needle, why) => { if (lower.includes(String(needle).toLowerCase())) problems.push(`${why}: "${needle}"`); };

/* ---------- static checks (always run) ---------- */
hit('northstar', 'company string');
hit('north star', 'company string');
hit('484604814', 'real ST tenant id');
hit('slack.com/archives', 'live Slack link');
hit('go.servicetitan.com', 'live ServiceTitan link');
// belt-and-suspenders: the whiteboard demo must inline these feeds, never fetch them.
// A surviving endpoint string means a fetch was left un-stubbed.
hit('sales-summary.json', 'live feed filename');
hit('/api/equipment', 'live endpoint');
hit('/api/equip', 'live endpoint');
hit('/api/history', 'live endpoint');
hit('/api/flip', 'live endpoint');
for (const ch of ['–', '—']) if (html.includes(ch)) problems.push('em/en dash in artifact');

/* ---------- live-data checks (need the NS data dir on this machine) ---------- */
const NSDATA = path.join(os.homedir(), 'Projects', 'northstar-owner-dashboard', 'data');
if (!fs.existsSync(path.join(NSDATA, 'raw.json'))) {
  console.warn('WARN: live NS data not found; only static checks ran');
} else {
  const raw = JSON.parse(fs.readFileSync(path.join(NSDATA, 'raw.json'), 'utf8'));
  const names = new Set();
  // skip dispatch placeholders (OFFICE, STAGING, Tech #4): generic words, not people
  const PLACEHOLDER = /office|staging|unassigned|^tech #/i;
  const addName = n => { const s = String(n || '').trim(); if (s.length > 3 && !PLACEHOLDER.test(s)) names.add(s); };

  // employees: roster, stats keys, call agents, payroll
  const people = raw.owner?.people || {};
  for (const arr of Object.values(people.roster || {})) arr.forEach(addName);
  Object.keys(people.stats || {}).forEach(addName);
  Object.keys(raw.callAgents || {}).forEach(addName);
  (raw.payItems || []).forEach(i => addName(i.who));
  (raw.nonJob || []).forEach(i => addName(i.tech));

  // customers: unpaid, top open quotes, per-person lists, member list
  (raw.unpaid?.list || []).forEach(u => addName(u.customer));
  (raw.topOpenEst || []).forEach(e => addName(e.customer));
  for (const s of Object.values(people.stats || {})) {
    (s.opps || []).forEach(o => addName(o.customer));
    (s.soldList || []).forEach(o => addName(o.customer));
    (s.recalls || []).forEach(o => addName(o.customer));
  }
  (raw.owner?.members?.list || []).forEach(m => addName(m.name));

  // install whiteboard: real customers, advisors, installers
  const wbPath = path.join(NSDATA, '..', 'whiteboard.json');
  if (fs.existsSync(wbPath)) {
    for (const r of JSON.parse(fs.readFileSync(wbPath, 'utf8')).rows || []) {
      addName(r.name); addName(r.advisor);
      String(r.installers || '').split(',').forEach(n => addName(n));
    }
  }

  // real slack digest sentences
  for (const f of fs.readdirSync(NSDATA).filter(f => /^slack-flags-.*\.json$/.test(f))) {
    try {
      const s = JSON.parse(fs.readFileSync(path.join(NSDATA, f), 'utf8'));
      for (const kind of ['flags', 'wins']) (s[kind] || []).forEach(it => addName(it.title));
    } catch { /* skip unreadable digest */ }
  }

  for (const n of names) hit(n, 'real NS data string');
  console.log(`checked ${names.size} live NS strings against the artifact`);
}

if (problems.length) {
  console.error(`PRIVACY VALIDATOR FAILED (${problems.length}):`);
  for (const p of problems.slice(0, 40)) console.error('  ' + p);
  process.exit(1);
}
console.log('privacy validator passed:', path.basename(ARTIFACT));
