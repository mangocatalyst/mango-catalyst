#!/usr/bin/env node
// check-defanged-cells.js: prove the two ServiceTitan link builders really are inert in
// the SHIPPED artifacts, by calling them, not by grepping for a URL.
//
// The bakers replace customerCell (master) and stLink (portal) with text-only versions.
// The bottom-of-file guardrails only prove no go.servicetitan.com string survived; they
// cannot see that a replacement still renders an <a>, or that it dropped a caller's
// argument. On 2026-08-03 upstream changed both signatures (customerCell grew a
// membership_customer_name fallback and moved l.kind -> l.source; stLink grew a cls
// parameter), and a replacement written against the old shape would have shipped cells
// that silently lost the fallback name or the master's cell styling.
//
// Run after bake-demo.sh: node demo/check-defanged-cells.js
'use strict';
const fs = require('node:fs');
const path = require('node:path');

const OUT = path.join(__dirname, 'build');
let failures = 0;
const check = (label, got, want) => {
  if (got === want) return;
  failures++;
  console.error(`FAIL ${label}\n  got:  ${JSON.stringify(got)}\n  want: ${JSON.stringify(want)}`);
};

// Pull a named function/const out of the built artifact and evaluate it with an esc stub.
// The artifact is the thing that ships, so it is the thing under test.
function lift(file, source) {
  const html = fs.readFileSync(path.join(OUT, file), 'utf8');
  const at = html.indexOf(source);
  if (at < 0) throw new Error(`${file}: could not find ${JSON.stringify(source.slice(0, 40))}`);
  // take from the declaration to the end of its statement/blockptr
  const chunk = html.slice(at, at + 900);
  return chunk;
}

/* ---------- master: customerCell renders a span, never an anchor ---------- */
{
  const chunk = lift('commission.html', 'function customerCell(l) {');
  const body = chunk.slice(0, chunk.indexOf('\n}') + 2);
  // eslint-disable-next-line no-new-func
  const customerCell = new Function('esc', `${body}; return customerCell;`)((s) => String(s));

  check('master: customer_name renders as a plain span',
    customerCell({ customer_name: 'Nordling, Elin', job_id: 44 }),
    '<span class="cust">Nordling, Elin</span>');
  check('master: membership customer is the fallback, not a blank cell',
    customerCell({ membership_customer_name: 'Aho, Rea', job_id: 44 }),
    '<span class="cust">Aho, Rea</span>');
  check('master: a manual line with no customer stays empty',
    customerCell({ source: 'manual' }), '');
  check('master: a non-manual line with no customer says so',
    customerCell({ source: 'invoice' }),
    '<span class="cust">unknown customer</span>');
  if (/<a\b/.test(customerCell({ customer_name: 'X', job_id: 1 }))) {
    failures++; console.error('FAIL master: customerCell still emits an anchor');
  }
}

/* ---------- portal: stLink renders a span and keeps the caller's class ---------- */
{
  const chunk = lift('commission-portal.html', 'const stLink = ');
  const body = chunk.slice(0, chunk.indexOf(';\n') + 1);
  // eslint-disable-next-line no-new-func
  const stLink = new Function('esc', `${body}; return stLink;`)((s) => String(s));

  check('portal: default class is job',
    stLink('https://example.invalid/x', 'invoice 12', 'Open invoice 12', undefined),
    '<span class="job">invoice 12</span>');
  check('portal: the caller-supplied class survives, so the demo styles like the live page',
    stLink('https://example.invalid/x', 'Aho, Rea', 'Open job 44', 'job cust'),
    '<span class="job cust">Aho, Rea</span>');
  if (/<a\b|href=/.test(stLink('h', 'l', 't', 'job'))) {
    failures++; console.error('FAIL portal: stLink still emits an anchor or an href');
  }
}

if (failures) { console.error(`\ndefanged-cell check FAILED (${failures})`); process.exit(1); }
console.log('defanged-cell check passed: master customerCell + portal stLink render inert text');
