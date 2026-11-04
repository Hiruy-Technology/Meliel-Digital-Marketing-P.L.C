`noto-sans-ethiopic-subset.woff2`, `noto-sans-ethiopic-amharic.woff2` and `og/noto-sans-ethiopic-bold.ttf` are subsets of Noto Sans Ethiopic, Copyright the Noto Project
Authors (https://github.com/notofonts/ethiopic), licensed under the SIL Open Font License 1.1
(https://openfontlicense.org). Commercial use, subsetting and bundling are permitted.
Rebuild both with `scripts/subset-ethiopic.py`. The first holds only the Amharic in `src/content/copy.ts`, so rebuild it if that text changes.

`og/sora-bold.ttf` is a static bold copy of Sora, Copyright the Sora Project Authors
(https://github.com/sora-xor/sora-font), licensed under the SIL Open Font License 1.1. The two `og/`
fonts are only used on the server, for the social sharing images. Rebuild them with
`scripts/og-fonts.py`.
