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
  // install crew, named in a donor comment about a ServiceTitan data quirk
  // (nsdash 6ecfa0a, 2026-08-11). Stands in as an installer, like the real one.
  ['Noah', 'Jack'],
  // Surnames. These used to be assert-only, which meant a donor comment that
  // spelled a name out in full killed the bake instead of being rewritten
  // ("credits Ken Philaja", nsdash c37d799, 2026-08-07). Each maps to the
  // surname its first name already carries in make-demo-data.js, so a scrubbed
  // "Ken Philaja" reads as "Theo Lindqvist" and not as two half-strangers.
  ['Nelson', 'Vellen'],       // Russ
  ['Mohr', 'Kirsch'],         // Ron
  ['McColley', 'Bratsven'],   // Travis
  ['Philaja', 'Lindqvist'],   // Ken
  ['Wierimaa', 'Thornton'],   // Corey and Zack both; one surname, one stand-in
  ['Furlong', 'Stavros'],     // Scott
  ['Robinson', 'Nash'],       // Tom, helper
  ['Hested', 'Pruitt'],       // Noah
  // ponytail: Matthew Driver is deliberately absent. "driver" is an ordinary
  // word in the donor prose, so mapping or banning it would rewrite English.
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
      // Case-insensitive, because assertNoRealNames below is: a scrub that only
      // caught 'Bryan' while the check also caught 'BRYAN' meant an upstream
      // comment in caps sailed through the rewrite and then failed the assert,
      // which reads like a leak but is really a hole in this line (2026-08-06).
      // Match case on the way out so a shouted comment stays shouted.
      segment = segment.replace(new RegExp(`\\b${real}\\b`, 'gi'),
        (m) => (m === m.toUpperCase() ? fake.toUpperCase() : fake));
    }
    return segment;
  });
}

/**
 * Throw if any real name survived. Every banned name is now a mapped name, so a
 * hit here is a hole in scrubNames (wrong order, or a boundary the regex missed),
 * not an unmapped stranger. A name nobody has mapped yet still ships silently —
 * the map is the only list, so add the crew here when the crew changes.
 */
function assertNoRealNames(html, what) {
  const banned = [...NAME_MAP.keys()];
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

module.exports = { NAME_MAP, scrubNames, assertNoRealNames, betweenPayloads };

// node demo/scrub-names.js — the scrub and the assert must agree on case, or a
// name slips the rewrite and only surfaces as a failed bake.
if (require.main === module) {
  const eq = (got, want) => {
    if (got !== want) { console.error(`FAIL\n  got:  ${got}\n  want: ${want}`); process.exitCode = 1; }
  };
  eq(scrubNames('// Bryan said so'), '// the owner said so');
  eq(scrubNames("// IN BRYAN'S OWN WORDS"), "// IN THE OWNER'S OWN WORDS");
  eq(scrubNames('// ask bryan'), '// ask the owner');
  eq(scrubNames('// Corey and Zack'), '// Eli and Miguel');
  eq(scrubNames('// bryanesque, ironclad'), '// bryanesque, ironclad'); // word boundaries hold
  for (const s of ['// Bryan', "// BRYAN'S", '// ask bryan']) {
    try { assertNoRealNames(scrubNames(s), 'self-check'); }
    catch (e) { console.error(`FAIL assert still fires after scrub: ${s} -> ${e.message}`); process.exitCode = 1; }
  }
  if (!process.exitCode) console.log('scrub-names self-check passed: scrub and assert agree on case');
}
