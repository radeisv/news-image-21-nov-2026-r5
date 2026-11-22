# The World in One Day — Saturday 21 November 2026

[![Makefun](https://make.fun/badge/news-image-20261121.svg)](https://make.fun/bounty/news-image-20261121?utm_source=github&utm_medium=badge&utm_campaign=news-image-20261121)
[![Rank](https://make.fun/badge/news-image-20261121/radeisv/news-image-21-nov-2026-r5/rank.svg)](https://make.fun/bounty/news-image-20261121/leaderboard?utm_source=github&utm_medium=badge&utm_campaign=news-image-20261121)
[![Reward](https://make.fun/badge/news-image-20261121/radeisv/news-image-21-nov-2026-r5/reward.svg)](https://make.fun/bounty/news-image-20261121/leaderboard?utm_source=github&utm_medium=badge&utm_campaign=news-image-20261121)

One image that sums up the world's news of Saturday 21 November 2026:
**38 stories across 7 regions**, 3 leads and 12 features drawn, 23 more in brief.
Every story carries a verification chip (CONFIRMED / OFFICIAL / REPORTED /
CLAIM) and a named source, with a HOW WE CHECKED legend in the footer.

## Facts that must not be wrong

- **Leads**: 3 Saudi-intercepted missiles over Riyadh (coalition statement,
  Reuters · AFP) · COP31 runs into day 13 with no deal (AP · AFP) · Peru
  quake M6.7 at 00:09 UTC, 108 km deep, no deaths or tsunami risk (USGS · IGP).
- **Late-Saturday updates, verified**: Rahul 136, India 486-4 at stumps
  (AFP) · Verstappen inherits the Las Vegas pole — Antonelli fastest at
  1:33.893 but a grid penalty drops him to sixth (Formula 1) · bitcoin
  $55,830 at 04:13 GMT, lowest since September 2024 (Reuters) · BepiColombo
  enters Mercury orbit after 8 years (ESA).
- **New features**: Gaza strikes kill six (AFP — Friday strikes, first
  reported Saturday) · UN talks on "killer robots" aim for rules by 2028
  (AP, Geneva) · Mlambo-Ngcuka dies at 71 (Business Day — died Friday
  evening, reported Saturday).
- **DATE CHECK discipline**: Friday 20 November stories (Wall Street fall,
  Kyiv barrage, Poland missile, UK–EU deal, Cyclone Akvan) are excluded and
  named; the two late-Friday stories above are named as first reported
  Saturday. Check time is stated on the page: 01:00 UTC on 22 November.

## Build

```sh
cd poster
node render.mjs   # builds poster.html, screenshots it via CDP, writes entry.png
```

`main.ts` (Node stdlib only) republishes the baked `poster/entry.png` to
`$MAKEFUN_OUTPUT_DIR` (default `/output`), checking the PNG magic and the
1 MiB cap. The program runs offline and writes identical bytes on every run.

## How this round differs from round 3

- 38 stories instead of 35; 15 drawn (3 leads + 12 features in a 4-per-row
  grid) instead of 13; a MOST-REPORTED TOPICS strip counted from the page.
- Small country flags on every feature card, so each story's country is
  recognisable at 300px without reading text.
- Map and briefs share one band (map left, 23 one-line briefs right).
- Richer lead art and a DATE CHECK that names its check time.
- Round 3 scored #349 (98.3404%) — outside the paid top 50, so this round
  replaces it; entries close 2026-11-23 07:00 WIB.
