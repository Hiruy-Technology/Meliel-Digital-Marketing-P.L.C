"""Rebuilds the two Amharic font files in src/fonts/ from the full Noto Sans Ethiopic font.

- noto-sans-ethiopic-subset.woff2: only the characters in src/content/copy.ts (about 18 KB), for
  Meliel's Amharic on the English About page. Re-run this if that Amharic copy changes.
- noto-sans-ethiopic-amharic.woff2: every letter of the main Ethiopic block (U+1200 to U+137F, all of
  Amharic, including anything Meliel types in the CMS) in weights 400 to 700, the only ones the site
  uses. About 78 KB instead of 194 KB, for every page on /am.

Usage: python scripts/subset-ethiopic.py <path-to-full-NotoSansEthiopic.woff2>
The full font comes from Google Fonts or https://github.com/notofonts/ethiopic.
Needs: pip install fonttools brotli
"""

import io
import re
import sys
from pathlib import Path

from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

ROOT = Path(__file__).resolve().parent.parent
SOURCE = sys.argv[1]


def build(unicodes, output, weights=None):
    font = TTFont(SOURCE)
    options = subset.Options()
    options.flavor = "woff2"
    options.layout_features = ["*"]
    subsetter = subset.Subsetter(options)
    subsetter.populate(unicodes=unicodes)
    subsetter.subset(font)
    if weights:
        # Narrowing the weight axis has to happen after subsetting: fontTools fails the other way round.
        buffer = io.BytesIO()
        font.save(buffer)
        buffer.seek(0)
        font = instancer.instantiateVariableFont(TTFont(buffer), {"wght": weights})
    font.flavor = "woff2"
    font.save(ROOT / output)
    return TTFont(ROOT / output).getBestCmap()


def report(output, chars, cmap):
    missing = [c for c in chars if ord(c) not in cmap]
    size = (ROOT / output).stat().st_size / 1024
    print(f"{output}: {len(chars)} characters, {size:.1f} KB, missing: {missing or 'none'}")


copy = (ROOT / "src/content/copy.ts").read_text(encoding="utf-8")
copy_chars = sorted(set(re.findall(r"[ሀ-፿]", copy)))
output = "src/fonts/noto-sans-ethiopic-subset.woff2"
report(output, copy_chars, build([ord(c) for c in copy_chars] + [0x20], output))

# Checked against every Amharic string on the site, not just the copy.
site = "".join(
    (ROOT / path).read_text(encoding="utf-8")
    for path in ["src/content/copy.ts", "src/i18n/am.ts", "src/content/services-am.ts"]
)
site_chars = sorted(set(re.findall(r"[ሀ-᎟ⶀ-⷟꬀-꬯]", site)))
output = "src/fonts/noto-sans-ethiopic-amharic.woff2"
cmap = build([*range(0x1200, 0x1380), 0x20], output, weights=(400, 700))
report(output, site_chars, cmap)
