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

  // Replace everything from one short fragment THROUGH another, without quoting the
  // middle. This is 533bd21 by hand, generalised: the Service-tab note broke the bake
  // twice because it quoted all 500 characters of a paragraph whose middle upstream
  // keeps editing, and shrinking it to its two end fragments fixed it for good.
  //
  // maxSpan is the safety on the lazy quantifier: if upstream deletes `through` and an
  // identical string turns up 4000 characters later, the match would silently swallow
  // everything between. Report that as a miss instead of shipping the wreckage.
  const swapBetween = (from, through, to, { maxSpan = 2000, tolerant = false } = {}) => {
    const esc = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const hits = get().match(new RegExp(esc(from) + '[\\s\\S]*?' + esc(through), 'g')) || [];
    if (!hits.length && tolerant) return;
    if (hits.length !== 1) return miss(`span matched ${hits.length}x, expected 1: ${brief(from)} ... ${brief(through)}`);
    if (hits[0].length > maxSpan) return miss(`span ran ${hits[0].length} chars, over the ${maxSpan} cap: ${brief(from)} ... ${brief(through)}`);
    set(get().split(hits[0]).join(to));
  };

  // for the anchors that are volatile by design (the pages' version stamps)
  const swapRe = (re, to, n = 1) => {
    const m = get().match(re);
    if (!m || m.length !== n) return miss(`regex matched ${m ? m.length : 0}x, expected ${n}: ${re}`);
    set(get().replace(re, to));
  };

  // Replace a whole function with a demo stub WITHOUT quoting its body.
  //
  // Anchoring on the body is what has broken the bake: the 08-05 outage was two lines
  // added inside loadRegistration, and equipAction quoted 1537 characters of donor code
  // that the demo throws away anyway. The signature is the stable part, so anchor there
  // and run to the first line that closes at the signature's own indentation.
  //
  // The trade: a donor that changes what the function DOES no longer stops the bake, so
  // a stub can quietly drift from the live tool. That is a cosmetic risk on a demo, and
  // it is the one the guardrails already cover — no fetch(, no /api/, no real name, no
  // live URL survives, whatever the donor did. Requiring exactly one definition and
  // refusing a match that swallows a second function is what keeps the swap honest.
  const swapFn = (name, stub, { tolerant = false } = {}) => {
    const decl = new RegExp(`(?:^|\\n)([ \\t]*)(?:async +)?function +${name} *\\(`, 'g');
    const found = [...get().matchAll(decl)];
    if (found.length !== 1) {
      if (!found.length && tolerant) return;
      return miss(`function ${name}() declared ${found.length}x, expected 1`);
    }
    const indent = found[0][1];
    const re = new RegExp(`^${indent}(?:async +)?function +${name} *\\([^)]*\\)[^\\n]*\\n[\\s\\S]*?\\n${indent}\\}`, 'm');
    const m = get().match(re);
    if (!m) return miss(`function ${name}() never closes at its own indentation`);
    if (new RegExp(`\\n${indent}(?:async +)?function `).test(m[0]))
      return miss(`function ${name}() anchor swallowed a second function`);
    set(get().replace(re, () => stub));
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

  return { swap, swapMaybe, swapBetween, swapRe, swapFn, swapAll, assertAnchors };
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

  // swapFn takes the whole function and nothing more, however the body is edited
  const src = () => `<script>
  async function load() {
    const r = await fetch("/api/x");
    if (!r.ok) { throw new Error("nope"); }
    board = { rows: [] };
  }
  function keep() { return 1; }
</script>`;
  let c = src();
  const cc = module.exports(() => c, v => { c = v; });
  cc.swapFn('load', '  async function load() { board = DEMO; }');
  cc.assertAnchors();
  assert.strictEqual(c, `<script>
  async function load() { board = DEMO; }
  function keep() { return 1; }
</script>`);

  // a body edit that used to break the bake is now invisible to the anchor
  let d = src().replace('board = { rows: [] };', 'board = { rows: [] };\n    andSomethingNew();');
  const dd = module.exports(() => d, v => { d = v; });
  dd.swapFn('load', '  async function load() { board = DEMO; }');
  dd.assertAnchors();
  assert.strictEqual(d, c);

  // but a missing, duplicated, or unclosed function is still a reported miss
  let e = src().replace('async function load(', 'async function gone(');
  const ee = module.exports(() => e, v => { e = v; });
  ee.swapFn('load', 'x');
  assert.throws(() => ee.assertAnchors(), /function load\(\) declared 0x/);
  let f = src() + src();
  const ff = module.exports(() => f, v => { f = v; });
  ff.swapFn('load', 'x');
  assert.throws(() => ff.assertAnchors(), /declared 2x/);

  // swapBetween ignores the middle, counts the span, and refuses a runaway
  let g = 'keep <a>one two three</a> keep';
  const gg = module.exports(() => g, v => { g = v; });
  gg.swapBetween('<a>', '</a>', '<b/>');
  gg.assertAnchors();
  assert.strictEqual(g, 'keep <b/> keep');

  let h = 'x<a>' + 'z'.repeat(50) + '</a>y';
  const hh = module.exports(() => h, v => { h = v; });
  hh.swapBetween('<a>', '</a>', '!', { maxSpan: 20 });
  assert.throws(() => hh.assertAnchors(), /over the 20 cap/);
  assert.strictEqual(h, 'x<a>' + 'z'.repeat(50) + '</a>y');

  let i = '<a>1</a> <a>2</a>';
  const ii = module.exports(() => i, v => { i = v; });
  ii.swapBetween('<a>', '</a>', '!');
  assert.throws(() => ii.assertAnchors(), /span matched 2x/);

  console.log('anchors.js self-check ok');
}
