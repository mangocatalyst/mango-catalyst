#!/bin/zsh
# bake-demo.sh — rebuild the /dashboards demo artifact end to end:
# skin the template, generate synthetic data, run the shared nsdash bake,
# prove no real data leaked, then drop the self-contained HTML into public/.
set -e
cd "$(dirname "$0")"

node make-template.js
node make-demo-data.js
NSDASH_DIR="$PWD/build" node ~/Projects/mango-automation/scripts/nsdash/ns-dash-bake.js
node privacy-validator.js

mkdir -p ../public/demo
cp build/index.html ../public/demo/dashboard.html
echo "demo baked -> public/demo/dashboard.html ($(du -h ../public/demo/dashboard.html | cut -f1 | tr -d ' '))"
