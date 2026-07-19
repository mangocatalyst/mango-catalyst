#!/usr/bin/env python3
"""Compose public/og.png: existing brand card + Night Shift Drafting art.

ADDITIVE ON PURPOSE. The card's type composition (headline, wordmark, amber
dot, amber rule, navy grid) is the brand and is NOT redrawn here: this script
takes the existing og.png as the base and fills its empty right half with the
drafting vignette, so the social card matches the rest of the site's art
without anyone re-deciding the brand.

The art is placed under the type in effect (it occupies the right side where
there is no type) and dimmed, so the headline stays the loudest thing in a
feed thumbnail.

  python3 build/og-compose.py <base.png> <art.webp> <out.png> [--opacity 0.5]
"""

import sys

from PIL import Image

# The headline block ends around x=720 in the 1200x630 card; art starts after
# it with a margin so the two never collide even as the headline re-wraps.
ART_LEFT = 700


def compose(base_path: str, art_path: str, opacity: float) -> Image.Image:
    base = Image.open(base_path).convert("RGBA")
    art = Image.open(art_path).convert("RGBA")

    bw, bh = base.size
    avail_w, avail_h = bw - ART_LEFT, bh
    # Fit the art into the empty right region, preserving aspect.
    scale = min(avail_w / art.size[0], avail_h / art.size[1])
    art = art.resize((max(1, int(art.size[0] * scale)), max(1, int(art.size[1] * scale))), Image.LANCZOS)

    if opacity < 1.0:
        a = art.split()[3].point(lambda p: int(p * opacity))
        art.putalpha(a)

    x = ART_LEFT + (avail_w - art.size[0]) // 2
    y = (bh - art.size[1]) // 2
    out = base.copy()
    out.alpha_composite(art, (x, y))
    return out.convert("RGB")


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    flags = {a.split("=")[0]: a.split("=")[1] for a in sys.argv[1:] if "=" in a and a.startswith("--")}
    out = compose(args[0], args[1], float(flags.get("--opacity", 0.5)))
    out.save(args[2], "PNG", optimize=True)
    print(f"{args[2]}  {out.size[0]}x{out.size[1]}  {round(len(open(args[2],'rb').read())/1024)}KB")


def demo():
    """Art lands only in the right region; the type half is untouched."""
    base = Image.new("RGBA", (1200, 630), (14, 23, 41, 255))
    for x in range(50, 650):           # stand-in for the headline block
        for y in range(100, 200):
            base.putpixel((x, y), (242, 245, 250, 255))
    base.save("/tmp/_ogbase.png")
    art = Image.new("RGBA", (400, 400), (94, 123, 174, 255))
    art.save("/tmp/_ogart.png")

    out = compose("/tmp/_ogbase.png", "/tmp/_ogart.png", 0.5)
    assert out.getpixel((300, 150)) == (242, 245, 250), out.getpixel((300, 150))  # type intact
    assert out.getpixel((950, 315)) != (14, 23, 41)                                # art present
    assert out.getpixel((300, 500)) == (14, 23, 41)                                # left half clean
    print("ok")


if __name__ == "__main__":
    demo() if "--demo" in sys.argv else main()
