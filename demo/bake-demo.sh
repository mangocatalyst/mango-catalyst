#!/bin/zsh
# bake-demo.sh — rebuild the /dashboards demo artifacts end to end:
# skin the template, generate synthetic data, run the shared nsdash bake,
# bake the install-whiteboard demo, prove no real data leaked in either,
# then drop the self-contained HTML into public/.
set -e
cd "$(dirname "$0")"

node scrub-names.js   # the scrub and its assert must agree on case before any of it runs
node make-template.js
node make-demo-data.js
NSDASH_DIR="$PWD/build" node ~/Projects/mango-automation/scripts/nsdash/ns-dash-bake.js
node make-whiteboard-demo.js
node make-commission-data.js
node make-commission-demo.js
node make-commission-portal-demo.js
node privacy-validator.js
node privacy-validator.js build/whiteboard.html
node privacy-validator.js build/commission.html
node privacy-validator.js build/commission-portal.html
# The validators prove no real string or live URL survived. This proves the two
# defanged link builders still BEHAVE, which a string scan cannot see.
node check-defanged-cells.js

mkdir -p ../public/demo
cp build/index.html ../public/demo/dashboard.html
cp build/whiteboard.html ../public/demo/whiteboard.html
cp build/commission.html ../public/demo/commission.html
cp build/commission-portal.html ../public/demo/commission-portal.html
for f in dashboard whiteboard commission commission-portal; do
  echo "demo baked -> public/demo/$f.html ($(du -h "../public/demo/$f.html" | cut -f1 | tr -d ' '))"
done
