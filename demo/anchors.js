'use strict';
// anchors.js — the one swap() the four demo makers share.
//
// Each maker quotes donor source text verbatim and swaps it, and every anchor is
// asserted so a drifted donor can never ship a half-skinned demo. The cost used to
// be that the bake stopped at the FIRST refusal, so fixing one anchor only revealed
// the next: the 2026-08-05 and 2026-08-07 outages each took two rounds for that
// reason alone. Here a miss is COLLECTED instead of thrown, and assertAnchors()
// throws once with the full list. Same guard, one round instead of N.
//
// Usage, with `html` staying a plain local so the rest of each maker is unchanged:
//   let html = fs.readFileSync(SRC, 'utf8');
//   const { swap, swapMaybe, swapRe, swapAll, assertAnchors } =
//     require('./anchors.js')(() => html, v => { html = v; });
// and assertAnchors() before the first write.

module.exports = (get, set) => {
  const misses = [];
  const brief = s => String(s).replace(/\s+/g, ' ').slice(0, 90);
  const miss = m => { misses.push(m); };

  // replace exactly n occurrences (default 1)
  const swap = (from, to, n = 1) => {
    const parts = get().split(from);
    if (parts.length - 1 !== n) return miss(`anchor matched ${parts.length - 1}x, expected ${n}: ${brief(from)}`);
    set(parts.join(to));
  };

  // the same, but tolerant of an anchor upstream has already removed or reworded.
  // ONLY for anchors whose bad end state a guardrail at the bottom catches on its
  // own (/admin.html, servicetitan.com, northstar, xyops, a real name, an em dash):
  // if the string is gone the demo is already correct. Anchors with no independent
  // guardrail (the skin, the palette, the demo engine, the fetch chokepoints, the
  // version stamp) use swap() and still fail the bake.
  const swapMaybe = (from, to) => {
    const parts = get().split(from);
    if (parts.length - 1 > 1) return miss(`optional anchor matched ${parts.length - 1}x, expected 0 or 1: ${brief(from)}`);
    set(parts.join(to));
  };

  // for the anchors that are volatile by design (the pages' version stamps)
  const swapRe = (re, to, n = 1) => {
    const m = get().match(re);
    if (!m || m.length !== n) return miss(`regex matched ${m ? m.length : 0}x, expected ${n}: ${re}`);
    set(get().replace(re, to));
  };

  // replace every occurrence, count unknown but at least one (the palette tables)
  const swapAll = (from, to) => {
    const parts = get().split(from);
    if (parts.length < 2) return miss(`anchor missing: ${brief(from)}`);
    set(parts.join(to));
  };

  const assertAnchors = () => {
    if (!misses.length) return;
    throw new Error(`${misses.length} anchor(s) no longer match the donor:\n` +
      misses.map(m => '  - ' + m).join('\n'));
  };

  return { swap, swapMaybe, swapRe, swapAll, assertAnchors };
};

// ponytail: self-check, run with `node anchors.js`
if (require.main === module) {
  const assert = require('node:assert');
  let s = 'alpha beta beta gamma v1.2';
  const a = module.exports(() => s, v => { s = v; });
  a.swap('alpha', 'ALPHA');
  a.swap('beta', 'B', 2);
  a.swapAll('gamma', 'G');
  a.swapRe(/v\d\.\d/, 'v9.9');
  a.assertAnchors();
  assert.strictEqual(s, 'ALPHA B B G v9.9');

  // every miss is collected, and the text is left alone at each one
  let t = 'only';
  const b = module.exports(() => t, v => { t = v; });
  b.swap('gone', 'x');
  b.swap('only', 'y', 2);
  b.swapMaybe('missing', 'z');           // tolerated, no miss
  b.swapAll('absent', 'w');
  b.swapRe(/nope/, 'q');
  assert.strictEqual(t, 'only');
  assert.throws(() => b.assertAnchors(), e => e.message.startsWith('4 anchor(s)') &&
    /gone/.test(e.message) && /absent/.test(e.message) && /nope/.test(e.message));
  console.log('anchors.js self-check ok');
}
