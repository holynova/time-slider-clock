# Time Slider hardware reference

Reviewed 2026-10-08.

Primary sources:
- Hans Andersson: https://tiltedtwister.com/timeslider.html
- Author's construction guide: https://www.instructables.com/Time-Slider/
- Front photo: https://tiltedtwister.com/assets/images/dsc03096-1.jpg
- Detail photo: https://tiltedtwister.com/assets/images/dsc03094-1.jpg

The author describes synchronized movable frames and eight stepper motors for four digits. The construction guide identifies two sliding grids per digit. The front and detail photos show thin black perforated frames over fixed orange-red backing. Open cells outside the reading region reveal the wall. The visible digits occupy a three-column, five-row matrix; the digit 1 uses the rightmost column.

The whole-digit web page adopts the square openings, thin continuous lattice, black blocked areas and stationary orange backing. It retains the user's previous requirement of one moving rail per digit, rather than introducing the hardware's two independently moving masks. Its fixed row sequence is therefore a different mechanism, and is not an exact reproduction of the hardware mask layout.

The original column-slider page remains unchanged.

The whole-digit page now uses one shared 0–9 mask for every digit. Restricted clock positions simply select a subset of its offsets. The artwork viewport includes the complete mask at every possible offset, with margins for its shadow; no moving-mask clipping remains.

## Primary-source recheck — 2026-10-09

The rendered Instructables guide confirms two sliding grids per digit. Expanded Step 2 exposes the original STL files. Step 5 provides `timeslider.ino`. Downloaded via the guide's file links and inspected locally; no substitute maker's model was used.

- L1–L4 form a single-column rail; R1–R3 form a two-column rail.
- Each assembled rail has 15 cells in its long direction. The row pitch is 39 mm; column pitch is 51 mm. The hardware web view preserves this rectangular proportion (23 × 23×39/51 SVG units).
- Projected perforation rows, reversed into installed screen orientation:
  - Left: `010111110000010`
  - Right: `10 11 11 11 01 11 11 11 01 11 01 11 01 11 10`
- Author Arduino positions for digits 0–9:
  - Left: `[5,0,7,9,3,11,5,1,5,11]`
  - Right: `[6,0,11,7,4,9,9,2,1,1]`
- The display samples at row `8-position`. Outside the physical rail, the backing is uncovered, not implicitly black. This is necessary for correctly rendering digits 2 and 5.
- `Grid.stl` is stationary: it supplies inter-cell bars and blocks the two center-column cells at rows 1 and 3 of the 3×5 display.
- The stationary black guard row above the digits belongs to the housing, visible in the author's front photo; it is separate from the holes and opaque blocks on moving masks. The lower housing guard covers the drive mechanism. The webpage represents these guards without modeling the motors.
- All four hardware positions share the same L/R geometry and position tables. The new web mode extends this to six positions for seconds, preserving the mask geometry but using web timing rather than the hardware's minute-long motor choreography.

Direct author attachments:
- Program: https://content.instructables.com/F4F/8JI9/LEQ0TO3W/F4F8JI9LEQ0TO3W.ino
- Fixed Grid: https://content.instructables.com/FGN/1TIF/LE8JLBSU/FGN1TIFLE8JLBSU.stl
- L1: https://content.instructables.com/F4G/JC4U/LE8JLBSV/F4GJC4ULE8JLBSV.stl
- L2: https://content.instructables.com/FXU/8ZDZ/LE8JLBSW/FXU8ZDZLE8JLBSW.stl
- L3: https://content.instructables.com/F3L/GW4W/LE8JLBSX/F3LGW4WLE8JLBSX.stl
- L4: https://content.instructables.com/FQH/KYUD/LE8JLBSY/FQHKYUDLE8JLBSY.stl
- R1: https://content.instructables.com/FWU/6C6L/LE8JLBSZ/FWU6C6LLE8JLBSZ.stl
- R2: https://content.instructables.com/FFI/O2QJ/LE8JLBT0/FFIO2QJLE8JLBT0.stl
- R3: https://content.instructables.com/F57/UUVI/LE8JLBT1/F57UUVILE8JLBT1.stl

The guide carries CC BY-NC-SA 4.0. The derived dual-rail geometry retains attribution and that license (`dist/hardware/ATTRIBUTION.txt`).

## Alphabet design

A fixed 8-shaped backing cannot draw arbitrary letters: its two permanently blocked center cells erase necessary strokes. The new matrix mode uses a complete 5×7 illuminated backing and 35 independent two-position blades per character. Each blade has one opaque cell and one transparent cell; the glyph changes their positions, never their geometry. The ribs conceal each short blade's return travel. The entire supporting lattice stays visible, including two unlit rows above and below. It is an original web mechanism, not a claim that the author's two rails can display this alphabet.

Supported: 26 uppercase letters, 10 digits, space and 16 symbols (`: . , ! ? - + = / % < > * # ( )`). Lowercase ASCII is converted to uppercase. Six positions allow short text; the complete character demo cycles every 2.5 seconds and supports pause/resume. Characters use consistent 5×7 geometry, with distinct 0/O and 1/I forms. The original two pages are retained.
