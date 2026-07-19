#!/usr/bin/env python3
"""Night Shift Drafting cutout: navy-background raster -> transparent trimmed webp.

Flood-fills from the image borders over near-background pixels and zeroes their
alpha, then autocrops. Interiors stay opaque because the fill cannot cross the
linework. Do NOT use a model background remover here: the art is dark-on-dark
and every one of them eats the faint construction lines.

Generate the source at 4k and let the downscale do the anti-aliasing; that is
what kills the halo pixels that a 1k source leaves behind.

  python3 build/cutout.py in.png out.webp [--max 700] [--tol 26]
"""

import sys
from collections import deque

from PIL import Image

BG = (0x0A, 0x11, 0x20)  # locked navy, fallback only


def cutout(src: Image.Image, tol: int) -> Image.Image:
    im = src.convert("RGBA")
    w, h = im.size
    px = im.load()

    # Sample the corners instead of trusting the locked navy: the model renders
    # the field a few points off #0A1120 and adds a faint vignette, so a
    # hardcoded reference needs a tolerance loose enough to eat the linework.
    corners = [px[4, 4], px[w - 5, 4], px[4, h - 5], px[w - 5, h - 5]]
    bg = tuple(sorted(c[i] for c in corners)[1] for i in range(3))

    def is_bg(x, y):
        r, g, b, a = px[x, y]
        return abs(r - bg[0]) + abs(g - bg[1]) + abs(b - bg[2]) <= tol

    seen = bytearray(w * h)
    q = deque()
    for x in range(w):
        for y in (0, h - 1):
            if not seen[y * w + x] and is_bg(x, y):
                seen[y * w + x] = 1
                q.append((x, y))
    for y in range(h):
        for x in (0, w - 1):
            if not seen[y * w + x] and is_bg(x, y):
                seen[y * w + x] = 1
                q.append((x, y))

    while q:
        x, y = q.popleft()
        px[x, y] = (0, 0, 0, 0)
        for nx, ny in ((x - 1, y), (x + 1, y), (x, y - 1), (x, y + 1)):
            if 0 <= nx < w and 0 <= ny < h and not seen[ny * w + nx] and is_bg(nx, ny):
                seen[ny * w + nx] = 1
                q.append((nx, ny))

    return im.crop(im.getbbox())


def drop_islands(im: Image.Image, min_frac: float) -> Image.Image:
    """Erase small disconnected opaque blobs: the model's stray eraser ghosts.

    Runs AFTER the downscale, where the pixel count is ~300k instead of ~17M.
    The flood fill above cannot remove these because they never touch a border.
    """
    w, h = im.size
    px = im.load()
    floor = int(w * h * min_frac)
    seen = bytearray(w * h)

    for sy in range(h):
        for sx in range(w):
            if seen[sy * w + sx] or px[sx, sy][3] <= 8:
                continue
            comp, q = [], deque([(sx, sy)])
            seen[sy * w + sx] = 1
            while q:
                x, y = q.popleft()
                comp.append((x, y))
                for nx, ny in ((x - 1, y), (x + 1, y), (x, y - 1), (x, y + 1)):
                    if 0 <= nx < w and 0 <= ny < h and not seen[ny * w + nx] and px[nx, ny][3] > 8:
                        seen[ny * w + nx] = 1
                        q.append((nx, ny))
            if len(comp) < floor:
                for x, y in comp:
                    px[x, y] = (0, 0, 0, 0)

    return im.crop(im.getbbox())


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    flags = {a.split("=")[0]: a.split("=")[1] for a in sys.argv[1:] if "=" in a and a.startswith("--")}
    src, dst = args[0], args[1]
    cap = int(flags.get("--max", 700))
    tol = int(flags.get("--tol", 40))

    im = cutout(Image.open(src), tol)
    if max(im.size) > cap:
        im.thumbnail((cap, cap), Image.LANCZOS)
    im = drop_islands(im, float(flags.get("--minfrac", 0.00008)))
    im.save(dst, "WEBP", quality=82, method=6)
    print(f"{dst}  {im.size[0]}x{im.size[1]}  {round(len(open(dst,'rb').read())/1024)}KB")


def demo():
    """Object survives, border navy does not, enclosed navy does."""
    im = Image.new("RGB", (40, 40), BG)
    d = Image.new("RGB", (20, 20), (0x5E, 0x7B, 0xAE))
    im.paste(d, (10, 10))
    im.paste(Image.new("RGB", (6, 6), BG), (17, 17))  # navy hole inside the object
    out = cutout(im, 26)
    assert out.size == (20, 20), out.size          # cropped to the object
    assert out.getpixel((0, 0))[3] == 255          # object edge opaque
    assert out.getpixel((10, 10))[3] == 255        # enclosed navy NOT eaten

    # a stray ghost mark floating in the field goes, the main object stays
    im2 = Image.new("RGB", (400, 400), BG)
    im2.paste(Image.new("RGB", (200, 200), (0x5E, 0x7B, 0xAE)), (20, 20))
    im2.paste(Image.new("RGB", (4, 4), (0x46, 0x60, 0x8F)), (380, 380))
    out2 = drop_islands(cutout(im2, 26), 0.0004)
    assert out2.size == (200, 200), out2.size
    print("ok")


if __name__ == "__main__":
    demo() if "--demo" in sys.argv else main()
