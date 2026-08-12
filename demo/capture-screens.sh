#!/bin/zsh
# capture-screens.sh: the still shots under each demo on /dashboards.
#
# Runs headless Chrome over the artifacts roll.sh and skin.sh already shipped into
# public/demo, so a screenshot can never show anything the privacy validator
# has not already cleared. Re-runnable: run it after every bake.
#
# The theme is forced rather than inherited. Headless Chrome follows the host
# machine's prefers-color-scheme, so without this the same command produces
# light shots on one laptop and dark shots on another. Dark is the choice: the
# artifacts' dark palette IS the Mango Catalyst navy, and a dark capture inside
# a white card on a light band reads as a product shot rather than as part of
# the page.
#
# PNG on purpose. next/image re-encodes to webp and avif on request, and this
# machine has no cwebp (sips cannot write webp), so a webp source here would
# mean hand-carrying binaries around.
set -e
cd "$(dirname "$0")"

CHROME=${CHROME:-/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome}
[[ -x $CHROME ]] || { echo "Chrome not found at: $CHROME (set CHROME=...)" >&2; exit 1; }

SRC=../public/demo
OUT=../public/dashboards
TMP=$(mktemp -d)
trap 'rm -rf "$TMP"' EXIT
mkdir -p "$OUT"

# 1440 wide is the desktop the artifacts are laid out for; anything narrower
# collapses the wide tables into their scroll boxes and the shot stops showing
# the point. 2x device scale so the thumbnail stays sharp when it opens full size.
WIDTH=1440
HEIGHT=900

# shot <artifact.html> <out-name> [url-fragment]
shot() {
  local src="$SRC/$1" name=$2 frag=$3
  # dashboard/whiteboard come from roll.sh, the commission pair from skin.sh
  [[ -f $src ]] || { echo "missing artifact: $src (run demo/roll.sh, or demo/skin.sh for the commission pair)" >&2; exit 1; }
  # Force the theme by appending a script the page's own bootstrap cannot win
  # against: it runs last, and all four artifacts paint off this one attribute.
  # Appended rather than injected into the head because the four artifacts do not
  # share a head shape (the whiteboard has no head or doctype at all), and a
  # script prepended ahead of a doctype would drop the page into quirks mode.
  # The only cost is that two of the artifacts leave their theme toggle labelled
  # for the theme it was in; that button sits in a footer, below this viewport.
  local tmp="$TMP/$name.html"
  cp "$src" "$tmp"
  print '<script>document.documentElement.dataset.theme="dark"</script>' >> "$tmp"
  "$CHROME" --headless=new --disable-gpu --hide-scrollbars \
    --force-device-scale-factor=2 --window-size=$WIDTH,$HEIGHT \
    --virtual-time-budget=6000 --screenshot="$OUT/$name.png" \
    "file://$tmp$frag" 2>/dev/null
  # Chrome exits 0 having written a blank or truncated PNG when a render goes
  # wrong, and the nightly stages whatever appeared and pushes it to the live
  # marketing page. The real shots are 300-800KB; nothing that small is a
  # dashboard. This is the only thing between a bad render and a blank product
  # shot on mangocatalyst.com.
  local bytes=$(stat -f%z "$OUT/$name.png" 2>/dev/null || echo 0)
  (( bytes >= 50000 )) || { echo "screenshot is ${bytes}B, too small to be a render: $OUT/$name.png" >&2; exit 1; }
  echo "captured -> public/dashboards/$name.png ($(du -h "$OUT/$name.png" | cut -f1 | tr -d ' '))"
}

# The owner dashboard reads #view= at boot, so its tabs are reachable without a click.
shot dashboard.html owner-dashboard-operations '#view=primary'
shot dashboard.html owner-dashboard-sales '#view=sales'
shot dashboard.html owner-dashboard-financial '#view=financial'
# The whiteboard's tabs are click-only, so this is the board itself: the thing it is named for.
shot whiteboard.html install-whiteboard
shot commission.html commission-master
shot commission-portal.html commission-portal
