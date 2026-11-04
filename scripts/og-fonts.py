"""Builds the fonts for the social sharing images (src/lib/og.tsx) in src/fonts/og/.

The image renderer only reads static TTF, OTF or WOFF fonts, so these are bold, non-variable
copies of the fonts the site already uses:
- sora-bold.ttf from Sora (Latin). Take the Latin Sora .woff2 from .next/static/media after a build
  (the one marked ".p." is the preloaded Latin file), or download Sora from Google Fonts.
- noto-sans-ethiopic-bold.ttf from src/fonts/noto-sans-ethiopic-amharic.woff2 (all of Amharic).

Usage: python scripts/og-fonts.py <path-to-Sora.woff2>
Needs: pip install fonttools brotli
"""

import sys
from pathlib import Path

from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "src/fonts/og"
OUT.mkdir(parents=True, exist_ok=True)


def static_bold(source, output):
    font = instancer.instantiateVariableFont(TTFont(source), {"wght": 700})
    font.flavor = None
    font.save(OUT / output)
    cmap = TTFont(OUT / output).getBestCmap()
    size = (OUT / output).stat().st_size / 1024
    print(f"src/fonts/og/{output}: {len(cmap)} characters, {size:.1f} KB")


static_bold(sys.argv[1], "sora-bold.ttf")
static_bold(ROOT / "src/fonts/noto-sans-ethiopic-amharic.woff2", "noto-sans-ethiopic-bold.ttf")
