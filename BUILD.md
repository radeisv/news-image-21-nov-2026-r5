# Round 5 — Concept C + flags (from the round-4 analysis)

## Concept

Keep round 4's structure (already the top-entry skeleton: 38 stories,
15 drawn, topics strip, shared map + briefs band) and fix the four
weaknesses the analysis found, all aimed at judge criteria 3 (reads) and
5 (craft at 300px):

1. Small country flags on every feature card (rank 10-new pattern).
2. Richer lead art (Riyadh windows + moon, COP31 draft papers + +1.5°C,
   quake "FELT IN LIMA" tag).
3. DATE CHECK names its check time ("Checked to 01:00 UTC on 22 November").
4. Robot art texts moved inward, Canberra art gains a small flag + AI chip.

Stories stay the same 38, already verified. No new story was added: there
is no second verified Africa story, and adding an unverified one would
break criterion 4 (faithful).

## Verification

- Layout probe: scrollHeight exactly 1024, no overflow; section tops
  [0, 86.75, 124.75, 143.75, 156.75, 346.75, 751.83, 963.83, 1000.52].
- Render 3x byte-identical: `poster/entry.png` 315,504 bytes, 1024x1024 RGB,
  sha256 `8bc31e1841ebeb82949937f706b337bfcc4eba653489080ee24dc1060ffcb58d`.
- `main.ts` test with `MAKEFUN_OUTPUT_DIR=/tmp/out21r5` wrote identical bytes.
- Kit check (no transcripts): 4 passed, 1 failed — only `transcripts_present`,
  expected before bundling.
- Local git HEAD `7c38466`, 10 files, no kit files.
- Visual QA at full size: all 12 flag strips render (UA, PS, IR+US, IR, US,
  CN+JP, PH, AU+CN, coin, IN+NZ, UN); lead art richer (Riyadh moon + windows,
  COP31 +1.5°C + DRAFT 3, quake FELT IN LIMA tag fully visible); robot 2028/128
  and Canberra AI TALKS now inside the strip; DATE CHECK names its check time.
  QA fixes: feature art 30px cropped the art too hard — restored to 40px by
  cutting lead art to 72px and the map to 96px; brief rows were 17px because
  the number circle was 14px — shrunk to 12px; 7 longest briefs shortened so
  all 23 fit one line. Known remaining flaws: pins still cluster around
  Türkiye / Middle East (same as ranks 1–2); feature art strips are
  centre-cropped textures, some labels (58TH MQ-9, 2 DEAD · 42 HURT) cut.
