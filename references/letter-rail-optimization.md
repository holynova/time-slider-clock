# Letter rail optimization proposal

2026-10-09 · fixed 5×5 glyphs, 53 supported characters, six character positions.

## Recommendation

Keep full, visible straight rails for the current web page. The first optimization should be **five column-specific fixed masks**: use one mask layout for column 1, another for column 2, etc., and reuse these five layouts across all six character positions. Candidate maximum mask length drops from 38 to 33 rows (13.2%); the complete movement envelope drops from 70 to 60 rows (14.3%). It retains all existing glyph shapes, all characters and independently interruptible transitions. Tradeoff: five mask types instead of one, with no reduction in drive count. The dedicated masks cover the current fixed glyph set; adding new glyph shapes may require regenerating them, whereas the current universal mask already covers every possible five-cell column.

If reducing hardware actuators is the primary goal, the recommended merged layout is **2+1+2**: columns [1,2], [3], [4,5]. This gives three independently driven sheets per character, or 18 instead of 30 drives for six positions (40% fewer). Adjacent columns share one transform and one physically connected perforated sheet. Glyph coverage remains exact, but the tested candidate sheets require up to 98 rows. Pair this with a folded/looped return path and a separately available fully expanded view; do not silently clip a long straight sheet to make it look compact.

These are design proposals. This release adds carousel testing and keeps the existing universal five-rail geometry available for comparison.

## Reproducible candidates

The generator runs 150 deterministic greedy overlap searches per group. Each row is encoded as one base-36 token (up to five columns = 32 row states). Every resulting mask is decoded back into every original glyph to verify it. These lengths are **feasible candidate upper bounds, not proven global minima**. The complete movement envelope equals mask length plus maximum travel, without visual margins.

| Layout per character | Tracks | Longest mask | Largest full envelope | Main consequence |
| --- | ---: | ---: | ---: | --- |
| Current universal 1+1+1+1+1 | 5 | 38 rows | 70 rows | One mask type; includes all 32 possible column patterns |
| Dedicated 1+1+1+1+1 | 5 | 33 rows | 60 rows | Best immediate straight-rail compaction; five mask types |
| Adjacent 2+1+2 | 3 | 98 rows | 189 rows | 40% fewer drives; full envelope is 2.70× current |
| Adjacent 1+2+2 | 3 | 98 rows | 189 rows | Similar length; asymmetric appearance |
| Adjacent 2+3 | 2 | 157 rows | 307 rows | 60% fewer drives; larger state combinations |
| Adjacent 1+4 | 2 | 177 rows | 347 rows | Unbalanced widths and travel |
| Whole-character 5 | 1 | 204 rows | 401 rows | Fewest drives, but poor scale when displaying full straight masks |
| Nonadjacent [1,5]+[2,4]+[3] | 3 | 84 rows | 161 rows | Exploits approximate symmetry; requires bridges/staggered depth and clearance validation |

For the recommended adjacent three-track candidate, left [1,2] has 38 distinct glyph patterns / 96 mask rows; center [3] has 13 patterns / 28 rows; right [4,5] has 37 patterns / 98 rows. This is why merely connecting two of the current single-column sheets is insufficient: they previously moved to different offsets. A merged pair needs a new mask that contains the entire two-column pattern at each selected position.

The author's hardware obtains short masks partly through a fixed 8-shaped backing and only ten numeric glyphs. Across our full alphabet, digits and symbols, the union uses all 25 backing cells; no cell can be permanently black without changing at least one glyph. Its original fixed black cells therefore cannot be carried over to this full alphabet unchanged.

Reproduce from repository root:

```bash
node scripts/analyze-letter-rails.cjs
node scripts/analyze-letter-rails.cjs --json
```

[Complete candidate masks and offsets](./letter-rail-candidates.jsonl) are checked in. Further length reductions should use a stronger shortest-common-superstring search or directed route optimization, while retaining decoded glyph verification. Do not advertise the present greedy results as the shortest possible masks.

## Carousel and verification

The menu starts a one-second carousel with 129 frames: 22 readable words, 53 uniform character frames and 54 rotated mixed-character frames. Every supported character, including space and all 16 symbols, appears in every one of the six positions. Each slide lasts 650 ms, leaving roughly 350 ms of settled display before the next word. Pause/resume retains the fractional second, restarting starts from HELLO, and hidden pages suspend elapsed time rather than skipping frames. Focusing the inline input stops the carousel and preserves the current word for editing.

Automated tests decode every frame through the actual production masks; exhaustively check all 53×53 = 2,809 ordered glyph transitions; verify cadence, cycle wrap, fractional pause/resume, and the lack of instant resets. Browser checks cover the real menu, progress indicator, pause/resume, editing takeover and responsive layout.
