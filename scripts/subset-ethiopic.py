"""Rebuilds src/fonts/noto-sans-ethiopic-subset.woff2 from the full font.

The site's Amharic text is fixed in src/content/copy.ts, so the font only needs those characters:
about 90% smaller for visitors on slow connections. Re-run this if the Amharic copy changes.

Usage: python scripts/subset-ethiopic.py <path-to-full-NotoSansEthiopic.woff2>
Needs: pip install fonttools brotli
"""

import re
import sys
from pathlib import Path

from fontTools import subset
from fontTools.ttLib import TTFont

ROOT = Path(__file__).resolve().parent.parent
copy = (ROOT / "src/content/copy.ts").read_text(encoding="utf-8")
# Every Ethiopic character used, plus the wordmark text in case it's ever typed elsewhere.
chars = sorted(set(re.findall(r"[\u1200-\u137F]", copy)))

font = TTFont(sys.argv[1])

options = subset.Options()
options.flavor = "woff2"
options.layout_features = ["*"]
subsetter = subset.Subsetter(options)
subsetter.populate(unicodes=[ord(c) for c in chars] + [0x20])
subsetter.subset(font)

output = ROOT / "src/fonts/noto-sans-ethiopic-subset.woff2"
font.flavor = "woff2"
font.save(output)

cmap = TTFont(output).getBestCmap()
missing = [c for c in chars if ord(c) not in cmap]
print(f"{len(chars)} characters, {output.stat().st_size / 1024:.1f} KB, missing: {missing or 'none'}")
