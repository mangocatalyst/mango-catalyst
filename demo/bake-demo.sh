#!/bin/zsh
# bake-demo.sh — rebuild the /dashboards demo artifacts end to end:
# skin the template, generate synthetic data, run the shared nsdash bake,
# bake the install-whiteboard demo, prove no real data leaked in either,
# then drop the self-contained HTML into public/.
set -e
cd "$(dirname "$0")"

node make-template.js
node make-demo-data.js
NSDASH_DIR="$PWD/build" node ~/Projects/mango-automation/scripts/nsdash/ns-dash-bake.js
node make-whiteboard-demo.js
node privacy-validator.js
node privacy-validator.js build/whiteboard.html

mkdir -p ../public/demo
cp build/index.html ../public/demo/dashboard.html
cp build/whiteboard.html ../public/demo/whiteboard.html
echo "demo baked -> public/demo/dashboard.html ($(du -h ../public/demo/dashboard.html | cut -f1 | tr -d ' '))"
echo "demo baked -> public/demo/whiteboard.html ($(du -h ../public/demo/whiteboard.html | cut -f1 | tr -d ' '))"
