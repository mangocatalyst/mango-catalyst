#!/bin/zsh
# roll.sh — the nightly. Roll today's dates into the committed skin.
#
# This is the half that runs at 05:45 (mc-demo-rebake.sh). It reads demo/skinned/
# and regenerates the synthetic data; it does NOT read the donor pages, quote any
# donor text, or run a single anchor. An edit to the live NorthStar tools cannot
# break it. That is the whole point of the split — see demo/skin.sh.
#
# Only the owner dashboard actually needs this: it bakes its report date in, so a
# frozen artifact shows a visibly stale date. The whiteboard needs the sales feed
# rolled (dated window, renders "as of <generatedAt>"). The commission pair needs
# nothing at all and is not touched here; skin.sh ships it finished.
#
# The privacy validators DO still read live NorthStar data — that is where the
# banned strings come from, and they fail closed if a source goes missing. This
# job is free of donor SKINNING, not of donor reads.
set -e
cd "$(dirname "$0")"

if [[ ! -f skinned/index.template.html || ! -f skinned/whiteboard.html ]]; then
  echo "demo/skinned/ is missing or incomplete; run demo/skin.sh" >&2
  exit 1
fi

node make-demo-data.js
# After make-demo-data.js: it clears build/index.html and the report-*.html
# archives so the pager's prev link cannot resurrect a stale day.
cp skinned/index.template.html build/index.template.html
NSDASH_DIR="$PWD/build" node ~/Projects/mango-automation/scripts/nsdash/ns-dash-bake.js
node roll-inject.js

# The commission pair is validated where it SHIPS, not from build/. `git reset
# --hard` does not remove ignored files, so demo/build/commission.html survives
# from whenever this clone last skinned — validating that copy would be a green
# light for a file nobody is serving.
node privacy-validator.js build/index.html
node privacy-validator.js build/whiteboard.html
node privacy-validator.js ../public/demo/commission.html
node privacy-validator.js ../public/demo/commission-portal.html

cp build/index.html      ../public/demo/dashboard.html
cp build/whiteboard.html ../public/demo/whiteboard.html
for f in dashboard whiteboard; do
  echo "demo rolled -> public/demo/$f.html ($(du -h "../public/demo/$f.html" | cut -f1 | tr -d ' '))"
done

# Advisory only, and deliberately never fatal: freezing the skin trades a loud
# nightly failure for silent staleness, and both donors are under daily
# development. This is the cheapest thing that keeps that visible — one line in
# the log the nightly already writes, no second job, no pager.
if [[ -f skinned/SKIN.json ]]; then
  drift=()
  for repo in northstar-owner-dashboard commission-tracker mango-automation; do
    was=$(grep -o "\"$repo\": \"[^\"]*\"" skinned/SKIN.json | cut -d'"' -f4)
    now=$(git -C "$HOME/Projects/$repo" rev-parse --short HEAD 2>/dev/null || echo unknown)
    [[ -n "$was" && "$was" != unknown && "$was" != "$now" ]] && drift+=("$repo $was->$now")
  done
  [[ ${#drift[@]} -gt 0 ]] \
    && echo "skin drift (advisory, re-skin when you want the demo to show it): ${(j:, :)drift}"
fi
exit 0
