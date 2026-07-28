#!/usr/bin/env node
// privacy-validator.js: the no-leak guarantee for the /dashboards demo.
// Greps the baked artifact for anything traceable to the real NorthStar
// deployment: company strings, the tenant id, live Slack/ServiceTitan targets,
// real employee names, and real customer names harvested from the live data
// files and the commission database on this machine. Non-zero exit blocks
// the deploy.
//
// Two kinds of match, because one kind was not enough (2026-07-24 review):
//   WHOLE STRINGS, matched as substrings, the way this has always worked. Good
//     for "Nordling, Elin & Gus"; blind to a page that only says "Elin".
//   TOKENS, matched on word boundaries. Every harvested name is also split into
//     its words, so a first-name-only or surname-only leak is caught too. Word
//     boundaries rather than substrings, or every name three letters long would
//     fire on half the CSS in the file.
// Tokens that are also ordinary words live in TOKEN_ALLOW below, each one
// checked by hand against what it actually collides with.
//
// The validator also fails CLOSED: if a live source that was readable at the
// last successful run has gone missing, that is a validator running blind, and
// a validator running blind must not be the thing that says an artifact is safe.
'use strict';
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { execFileSync } = require('node:child_process');

const ARTIFACT = process.argv[2] || path.join(__dirname, 'build', 'index.html');
// base64 font payloads collide with short-name substrings ("Zack"); skip them
const html = fs.readFileSync(ARTIFACT, 'utf8')
  .replace(/data:font\/woff2;base64,[A-Za-z0-9+/=]+/g, 'data:font/woff2;base64,STRIPPED')
  .replace(/"(?:[A-Za-z-]+-\d{3})":\s*"[A-Za-z0-9+/=]{100,}"/g, '""'); // fonts-b64 JSON style
const lower = html.toLowerCase();
const problems = [];
const hit = (needle, why) => { if (lower.includes(String(needle).toLowerCase())) problems.push(`${why}: "${needle}"`); };
const hitToken = (token, why) => {
  if (new RegExp(`\\b${token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i').test(html)) {
    problems.push(`${why}: "${token}"`);
  }
};

/* ---------- static checks (always run) ---------- */
hit('northstar', 'company string');
hit('north star', 'company string');
hit('northstarservices.com', 'real company domain');
hit('bryanjkoop', 'real operator handle');
hit('484604814', 'real ST tenant id');
hit('slack.com/archives', 'live Slack link');
hit('go.servicetitan.com', 'live ServiceTitan link');
// The people named in the donor pages' own comments and copy. The bakes rewrite
// these (demo/scrub-names.js); this is the second lock, on the shipped file.
for (const name of ['russ', 'ron', 'bryan', 'ken', 'travis', 'scott', 'corey', 'zack']) {
  hitToken(name, 'real first name');
}
// belt-and-suspenders: the whiteboard demo must inline these feeds, never fetch them.
// A surviving endpoint string means a fetch was left un-stubbed.
hit('sales-summary.json', 'live feed filename');
hit('/api/equipment', 'live endpoint');
hit('/api/equip', 'live endpoint');
hit('/api/history', 'live endpoint');
hit('/api/flip', 'live endpoint');
for (const ch of ['–', '—']) if (html.includes(ch)) problems.push('em/en dash in artifact');

/* ---------- harvesting ---------- */
// One name set across both products: whatever a demo artifact leaks, it leaks
// from somewhere in here.
const names = new Set();
const tokens = new Set();
const entityIds = new Set();

// skip dispatch placeholders (OFFICE, STAGING, Tech #4): generic words, not people
const PLACEHOLDER = /office|staging|unassigned|^tech #/i;

/**
 * Words that ARE somebody's name in the live data and ALSO legitimately appear
 * in a demo artifact. Every entry was added after seeing it fire, and checked
 * against what it collides with; none of them identify anyone on their own.
 */
const TOKEN_ALLOW = new Set([
  // the site's own name, and the tooling that writes the audit rows
  'mango', 'catalyst',
  // trade and product vocabulary that doubles as surnames
  'service', 'heating', 'cooling', 'comfort', 'install', 'boreal', 'north',
  'summit', 'winter', 'frost', 'field', 'park', 'lake', 'river', 'stone',
  'hill', 'wood', 'woods', 'green', 'white', 'brown', 'gray', 'grey', 'black',
  'best', 'first', 'last', 'main', 'high', 'low', 'new', 'old', 'star',
  // calendar and unit words that appear as names in a big customer list
  'may', 'march', 'august', 'day', 'week', 'month', 'year', 'sun', 'ray',
  // markup, style and code words a customer list will eventually collide with
  'div', 'span', 'body', 'head', 'font', 'text', 'line', 'row', 'col', 'grid',
  'card', 'chip', 'link', 'list', 'name', 'date', 'time', 'total', 'note',
  'flag', 'rate', 'paid', 'open', 'done', 'auto', 'demo', 'data', 'null',
  'true', 'false', 'left', 'right', 'top', 'bottom', 'center', 'small',
  'large', 'light', 'dark', 'call', 'calls', 'job', 'jobs', 'sale', 'sales',
  // an st_staff row is sometimes a vendor or a programme, not a person, and
  // its words are ordinary English ("Nelson-Free to Grow")
  'free', 'grow', 'group', 'inc', 'llc', 'the', 'and', 'for',
]);

const addToken = (word) => {
  const t = String(word || '').replace(/[^A-Za-z]/g, '');
  if (t.length < 3) return;                     // "Jo", "Al": too short to mean anything
  if (TOKEN_ALLOW.has(t.toLowerCase())) return;
  tokens.add(t);
};

/**
 * A STAFF name: the owner, a tech, an advisor, a CSR — someone a donor page can
 * refer to by first name alone. Whole string AND every word, because that is
 * exactly how the 2026-07-24 leak read: "Russ and Ron run service and sell",
 * "Zack is off Mondays", "(Bryan 2026-07-11)".
 *
 * NOT the cached ServiceTitan staff directory — see addDirectory.
 */
const addStaff = (n) => {
  const s = String(n || '').trim();
  // A dispatch placeholder ("OFFICE", "STAGING", "Tech #4") is a slot, not a
  // person, and its words are ordinary vocabulary. Skip it whole.
  if (PLACEHOLDER.test(s)) return;
  if (s.length > 3) names.add(s);
  for (const word of s.split(/[^A-Za-z]+/)) addToken(word);
};

/**
 * A name from commission.db's `st_staff`: the whole ServiceTitan employee
 * directory the tracker caches. Whole string only, for the same reason
 * addCustomer is — see the argument there.
 *
 * 218 rows as of 2026-07-27, against the 9 real earners in `people`. Tokenising
 * it turns the ban list into a list of common given names, and on 2026-07-28 it
 * did: the bake failed on Marcus, Sam, Aaron, Ryan, Nathan, Doyle and Max, every
 * one a collision between a fictional demo person and a different real employee
 * ("Marcus Vellen" vs. Marcus Ekeberg, "Chris Doyle" vs. Parker Doyle) — plus
 * "Return", from the directory row "Return Completions", which is not a person
 * at all. None of the 8 appeared in `people` or the NS roster.
 *
 * The people a donor page actually names — techs, advisors, the owner — come
 * from raw.json, whiteboard.json and `people`, and are all still tokenised, so
 * the 2026-07-24 first-name leak stays caught. What this gives up is a bare
 * first name of someone in the directory who appears nowhere else, which
 * identifies nobody. Revisit if a donor page is found rendering one.
 */
const addDirectory = (n) => {
  const s = String(n || '').trim();
  // A single-word row is a bare first name ("Seth", "Rudy", "Bradley") or a
  // service account ("AutoBot1", "PPH_NRTHS"). The whole-string pass is a
  // case-insensitive substring match, which cannot tell a 4-letter first name
  // from markup: "Seth" matched `start.setHours(12, 0, 0, 0)` in the whiteboard
  // demo. A directory employee leaks as a whole record, "Seth Sams", the same
  // way a customer does.
  if (!/\s/.test(s)) return;
  if (s.length > 3 && !PLACEHOLDER.test(s)) names.add(s);
};

/**
 * A CUSTOMER name. Whole string only, deliberately.
 *
 * Tokenising ~1700 customer names turns the ban list into a list of common given
 * names: Dana, Holly, Sam, Marcus, June, Wade. Every one of those matched this
 * demo, not because anything leaked but because a fictional roster of Midwestern
 * people cannot avoid sharing first names with a real Midwestern customer list.
 * A first name shared with a thousand strangers identifies nobody, and a
 * validator that fails on "Sam" every run is a validator that gets bypassed.
 *
 * A customer only ever leaks the way they are stored: as a whole record,
 * "Nordling, Elin & Gus", which the substring pass catches. Revisit only if a
 * donor page is ever found rendering a customer's bare first name.
 */
const addCustomer = (n) => {
  const s = String(n || '').trim();
  if (s.length > 3 && !PLACEHOLDER.test(s)) names.add(s);
};

/**
 * Free text: a Slack digest sentence, an audit label. Whole string only.
 * Tokenising prose would put every English word in the ban list, which does not
 * protect anyone and does stop the bake on the word "the".
 */
const addText = (t) => {
  const s = String(t || '').trim();
  if (s.length > 3 && !PLACEHOLDER.test(s)) names.add(s);
};

/** Shared mailboxes are not people, and "admin" is not a leak. */
const GENERIC_MAILBOX = new Set(['admin', 'info', 'office', 'hello', 'support',
  'sales', 'billing', 'noreply', 'no-reply', 'contact', 'help', 'team']);
/** Audit rows are written by tooling as well as by humans. */
const isToolActor = (who) => /^mango\b|runbook|orchestrator|cron|bot|script/i.test(String(who));

/** An email is two leaks: the address, and the human-shaped local part. */
const addEmail = (e) => {
  const s = String(e || '').trim();
  if (!s.includes('@')) return;
  names.add(s);
  const local = s.split('@')[0];
  if (GENERIC_MAILBOX.has(local.toLowerCase())) return;
  if (local.length > 3) names.add(local);
  for (const word of local.split(/[^A-Za-z]+/)) addToken(word);
};

// ServiceTitan ids identify a real technician or employee inside a real tenant.
// ponytail: only ids of 6 digits or more are searched. A 4-digit staff id matches
// an SVG path coordinate and a chart tick as readily as it matches a leak, and a
// validator that cries wolf on every chart is a validator somebody switches off.
// Raise this only alongside a way to tell "1025 the id" from "1025 the number".
const MIN_SEARCHABLE_ID = 100000;
const addEntityId = (id) => {
  const n = Number(id);
  if (Number.isFinite(n) && n >= MIN_SEARCHABLE_ID) entityIds.add(String(n));
};

/* ---------- source presence, for the fail-closed rule ---------- */
const SOURCE_STATE = path.join(__dirname, '.privacy-sources.json');
const present = {};

/* ---------- the owner dashboard's live data ---------- */
const NSDATA = path.join(os.homedir(), 'Projects', 'northstar-owner-dashboard', 'data');
present.nsDashboardRaw = fs.existsSync(path.join(NSDATA, 'raw.json'));
if (!present.nsDashboardRaw) {
  console.warn('WARN: live NS dashboard data not found; those checks did not run');
} else {
  const raw = JSON.parse(fs.readFileSync(path.join(NSDATA, 'raw.json'), 'utf8'));

  // employees: roster, stats keys, call agents, payroll
  const people = raw.owner?.people || {};
  for (const arr of Object.values(people.roster || {})) arr.forEach(addStaff);
  Object.keys(people.stats || {}).forEach(addStaff);
  Object.keys(raw.callAgents || {}).forEach(addStaff);
  (raw.payItems || []).forEach(i => addStaff(i.who));
  (raw.nonJob || []).forEach(i => addStaff(i.tech));

  // customers: unpaid, top open quotes, per-person lists, member list
  (raw.unpaid?.list || []).forEach(u => addCustomer(u.customer));
  (raw.topOpenEst || []).forEach(e => addCustomer(e.customer));
  for (const s of Object.values(people.stats || {})) {
    (s.opps || []).forEach(o => addCustomer(o.customer));
    (s.soldList || []).forEach(o => addCustomer(o.customer));
    (s.recalls || []).forEach(o => addCustomer(o.customer));
  }
  (raw.owner?.members?.list || []).forEach(m => addCustomer(m.name));

  // install whiteboard: real customers, advisors, installers
  const wbPath = path.join(NSDATA, '..', 'whiteboard.json');
  if (fs.existsSync(wbPath)) {
    for (const r of JSON.parse(fs.readFileSync(wbPath, 'utf8')).rows || []) {
      addCustomer(r.name); addStaff(r.advisor);
      String(r.installers || '').split(',').forEach(n => addStaff(n));
    }
  }

  // real slack digest sentences
  for (const f of fs.readdirSync(NSDATA).filter(f => /^slack-flags-.*\.json$/.test(f))) {
    try {
      const s = JSON.parse(fs.readFileSync(path.join(NSDATA, f), 'utf8'));
      for (const kind of ['flags', 'wins']) (s[kind] || []).forEach(it => addText(it.title));
    } catch { /* skip unreadable digest */ }
  }
}

/* ---------- the commission tracker's own database ----------
   Read-only, out of process, through the sqlite3 CLI: this validator must never
   be able to write to the live pay database, and a `-readonly` connection it does
   not own is the cheapest way to be sure of that. */
const CDB = path.join(os.homedir(), 'Projects', 'commission-tracker', 'data', 'commission.db');
present.commissionDb = fs.existsSync(CDB);
if (!present.commissionDb) {
  console.warn('WARN: live commission database not found; those checks did not run');
} else {
  const q = (sql) => {
    const out = execFileSync('sqlite3', ['-readonly', '-json', CDB, sql], { encoding: 'utf8' }).trim();
    return out ? JSON.parse(out) : [];
  };
  // every earner, every ServiceTitan staff name cached, every customer ever
  // billed or sold a membership
  for (const r of q('SELECT name AS v FROM people')) addStaff(r.v);
  for (const r of q('SELECT name AS v FROM st_staff')) addDirectory(r.v);
  for (const sql of [
    'SELECT DISTINCT customer_name AS v FROM invoices',
    'SELECT DISTINCT customer_name AS v FROM memberships',
  ]) for (const r of q(sql)) addCustomer(r.v);

  // the addresses: people's logins, and whoever the audit trail recorded acting
  for (const r of q('SELECT email AS v FROM people WHERE email IS NOT NULL')) addEmail(r.v);
  for (const r of q("SELECT DISTINCT who AS v FROM audit WHERE who IS NOT NULL AND who <> ''")) {
    if (String(r.v).includes('@')) addEmail(r.v);
    else if (!isToolActor(r.v)) addStaff(r.v);
  }
  // the office allowlist is a config row, not a table: whole addresses and
  // '@domain' entries, both of which name the real company.
  for (const r of q("SELECT value AS v FROM config WHERE key='admin_emails'")) {
    try {
      for (const entry of JSON.parse(r.v || '[]')) {
        if (String(entry).startsWith('@')) hit(String(entry).slice(1), 'real admin domain');
        else addEmail(entry);
      }
    } catch { /* an unparseable allowlist is the tracker's problem, not ours */ }
  }
  // ServiceTitan entity ids: the cached staff directory, and the ids each
  // tracked person is wired to.
  for (const r of q('SELECT DISTINCT st_id AS v FROM st_staff WHERE st_id IS NOT NULL')) addEntityId(r.v);
  for (const r of q("SELECT st_ids AS v FROM people WHERE st_ids IS NOT NULL")) {
    try {
      for (const ref of JSON.parse(r.v || '[]')) addEntityId(typeof ref === 'object' ? ref.id : ref);
    } catch { /* skip a malformed row */ }
  }
}

/* ---------- fail closed on a source that used to be readable ---------- */
let priorSources = {};
try { priorSources = JSON.parse(fs.readFileSync(SOURCE_STATE, 'utf8')); } catch { /* first run */ }
for (const [source, wasPresent] of Object.entries(priorSources)) {
  if (wasPresent && !present[source]) {
    problems.push(`live source "${source}" was readable at the last passing run and is missing now; `
      + 'this validator is running blind, so it refuses to pass the artifact');
  }
}

/* ---------- the actual grep ---------- */
for (const n of names) hit(n, 'real live data string');
for (const t of tokens) hitToken(t, 'real name token');
for (const id of entityIds) hitToken(id, 'real ServiceTitan entity id');
console.log(`checked ${names.size} live strings, ${tokens.size} name tokens and ${entityIds.size} entity ids `
  + `against ${path.basename(ARTIFACT)}`);

if (problems.length) {
  console.error(`PRIVACY VALIDATOR FAILED (${problems.length}):`);
  for (const p of problems.slice(0, 40)) console.error('  ' + p);
  process.exit(1);
}
// Only a passing run records what was readable, so a source that vanishes stays
// failing until it comes back rather than quietly resetting the baseline.
fs.writeFileSync(SOURCE_STATE, JSON.stringify({ ...priorSources, ...present }, null, 2) + '\n');
console.log('privacy validator passed:', path.basename(ARTIFACT));
