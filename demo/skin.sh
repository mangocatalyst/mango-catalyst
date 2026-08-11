#!/bin/zsh
# skin.sh — re-derive the demo artifacts from the LIVE NorthStar tools.
#
# This is the fragile half, and it is deliberately not on a schedule. It quotes
# donor source text verbatim through ~76 anchors, and it reads two repos under
# daily development by people who have never heard of this one. Every edit near
# an anchor makes it refuse, which is correct and is exactly why it must not be
# what the 05:45 job runs: between 2026-07-28 and 2026-08-11 that arrangement
# failed 11 nights out of 18, every one of them over a marketing page's date.
#
# So the split: skin.sh reads the donors and writes demo/skinned/, which is
# COMMITTED. roll.sh reads only demo/skinned/ and rolls today's dates into it.
# Donor drift now breaks a human sitting at a terminal instead of a pager at
# 05:45, and the demo shows the product as of the last deliberate re-skin.
#
# Run this when you ship something the demo should show. Then commit what it
# prints. If it refuses, the message names every drifted anchor in one pass
# (demo/anchors.js) — fix them all, run again, and nothing shipped in between:
# the gate is on the write, not on the pager, because set -e plus validators
# before the copy means a failed skin never reaches public/demo.
#
#   demo/skin.sh        re-skin, then roll today's dates (chained, see below)
set -e
cd "$(dirname "$0")"
ROOT="$(cd .. && pwd -P)"

# The nightly owns ~/Projects/mangocatalyst-demo-bake and hard-resets it every
# run (mc-demo-rebake.sh). A re-skin done in there is gone at 05:45. Inverted
# twin of that script's own guard.
if [[ "$ROOT" == "$HOME/Projects/mangocatalyst-demo-bake" ]]; then
  echo "refusing to skin inside the nightly's clone: it runs 'git reset --hard' at 05:45" >&2
  echo "use ~/Projects/mango-catalyst (or a worktree of it) instead" >&2
  exit 1
fi

NSDASH="$HOME/Projects/northstar-owner-dashboard"
TRACKER="$HOME/Projects/commission-tracker"
AUTOMATION="$HOME/Projects/mango-automation"

node scrub-names.js   # the scrub and its assert must agree on case before any of it runs
node make-template.js
node make-demo-data.js          # also writes build/data/ns-logo.svg, which both commission makers read
node make-whiteboard-demo.js    # leaves __SALES_SUMMARY__ for roll-inject.js
node make-commission-data.js
node make-commission-demo.js
node make-commission-portal-demo.js

# Behavioural, not textual: proves the two defanged link builders still RENDER
# inert text. Lives here rather than in the nightly because what it tests only
# changes when the donor is re-skinned — and because it reads demo/build/, which
# `git reset --hard` does not clean, so in the nightly it would happily pass
# against last week's file and call that green.
node check-defanged-cells.js

node privacy-validator.js build/index.template.html
node privacy-validator.js build/whiteboard.html
node privacy-validator.js build/commission.html
node privacy-validator.js build/commission-portal.html

mkdir -p skinned
cp build/index.template.html skinned/index.template.html
cp build/whiteboard.html     skinned/whiteboard.html
# The commission pair carries no baked date: make-commission-data.js computes its
# periods against today at page load, and the version stamp is the donor's, not
# the bake's. So these two are finished artifacts, not skins, and go straight to
# public/. Nothing in the nightly rebuilds them.
mkdir -p ../public/demo
cp build/commission.html          ../public/demo/commission.html
cp build/commission-portal.html   ../public/demo/commission-portal.html

sha() { git -C "$1" rev-parse --short HEAD 2>/dev/null || echo unknown; }
cat > skinned/SKIN.json <<EOF
{
  "skinnedAt": "$(date '+%Y-%m-%d %H:%M:%S %Z')",
  "donors": {
    "northstar-owner-dashboard": "$(sha "$NSDASH")",
    "commission-tracker": "$(sha "$TRACKER")",
    "mango-automation": "$(sha "$AUTOMATION")"
  },
  "note": "roll.sh compares these to the donors' current HEADs and logs when they move. Advisory only, it never fails the nightly. Re-skin when you want the demo to show newer product."
}
EOF
echo "skinned -> demo/skinned/ (donors: $(sha "$NSDASH") $(sha "$TRACKER") $(sha "$AUTOMATION"))"

# Roll immediately. Not a convenience: ns-dash-bake.js new Function()-parses every
# inline script, and that is the ONLY thing that catches a swap which left the
# template syntactically broken. A skin is not proven until it has been rendered.
./roll.sh

cat <<EOF

re-skin complete. commit:
  git add demo/skinned public/demo
  git commit -m "Demo re-skin: <what moved in the donors>"
EOF
