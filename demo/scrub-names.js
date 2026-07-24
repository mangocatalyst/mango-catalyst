#!/usr/bin/env node
// scrub-names.js: the last pass every bake runs before it writes an artifact.
//
// The four donor pages are real working tools, and real working tools carry the
// names of the people who asked for each decision: "(Bryan 2026-07-11)" in a
// comment, "Russ and Ron run service and sell" in a rendered tab note, "Zack is
// off Mondays" in a hint. Each maker used to catch those one at a time, by hand,
// whenever somebody noticed one. That is not a process, it is a series of near
// misses: a 2026-07-24 review found a real name rendered on the Service tab of a
// shipped artifact, and eighteen more in comments.
//
// So: one map, applied by every maker, followed by an assertion that throws on
// anything left over. A name that IS in the map gets rewritten to its Boreal
// counterpart. A name that is NOT gets the bake killed, which is the loud
// failure the old hand-scrubbing never produced.
//
// The counterparts are the ones make-demo-data.js already invented, so a scrubbed
// comment names someone who exists elsewhere in the demo rather than a stranger.
'use strict';

/** Real first name -> the Boreal Comfort Co person who stands in for them. */
const NAME_MAP = new Map([
  // the owner: named in decision stamps all over the donor comments
  ['Bryan', 'the owner'],
  // the two selling service techs (make-demo-data.js ROSTER.service, and the
  // same two people the commission demo bills as selling techs)
  ['Russ', 'Marcus'],
  ['Ron', 'Dana'],
  // the install leads (already the whiteboard bake's LEADS replacements)
  ['Corey', 'Eli'],
  ['Scott', 'Owen'],
  ['Zack', 'Miguel'],
  // named in the live data but not, so far, in any donor page. Mapped anyway:
  // the point of a map is that donor drift lands on a rewrite, not on a leak.
  ['Ken', 'Theo'],
  ['Travis', 'Cole'],
]);

// Inlined fonts are base64, which is word characters plus + / =. A word-boundary
// match can therefore land INSIDE a font payload (".=Ron/..") and corrupt it, so
// every pass here runs on the gaps between payloads and leaves the payloads alone.
const BASE64_RUN = /data:font\/woff2;base64,[A-Za-z0-9+/=]+/g;

function betweenPayloads(html, fn) {
  const parts = [];
  let last = 0;
  for (const m of html.matchAll(BASE64_RUN)) {
    parts.push(fn(html.slice(last, m.index)), m[0]);
    last = m.index + m[0].length;
  }
  parts.push(fn(html.slice(last)));
  return parts.join('');
}

/** Rewrite every mapped real name to its Boreal counterpart. */
function scrubNames(html) {
  return betweenPayloads(html, (segment) => {
    for (const [real, fake] of NAME_MAP) {
      segment = segment.split(new RegExp(`\\b${real}\\b`, 'g')).join(fake);
    }
    return segment;
  });
}

/**
 * Throw if any real first name survived, mapped or not. Runs after scrubNames,
 * so a hit here means either a name nobody has mapped yet or a scrub that ran in
 * the wrong order. Either way the artifact does not ship.
 */
function assertNoRealNames(html, what) {
  const banned = [...NAME_MAP.keys(), 'Philaja', 'McColley', 'Nelson', 'Mohr'];
  const found = new Set();
  betweenPayloads(html, (segment) => {
    for (const name of banned) {
      if (new RegExp(`\\b${name}\\b`, 'i').test(segment)) found.add(name);
    }
    return segment;
  });
  if (found.size) {
    throw new Error(`real name survived the transform in ${what}: ${[...found].join(', ')}`);
  }
}

module.exports = { NAME_MAP, scrubNames, assertNoRealNames };
