card: CARD-SCOUT-LOOP-S163-1-v3
branch: phase/scout-loop-s163-1
head: a4d21a7a8a9f0411c1380b708d1cb02fdc702aeb
report: docs/relay/CARD-SCOUT-LOOP-S163-1-AG3-report.md
ci: UNMEASURED (no PR by order)
status: BLOCKED
built: ORDERS 1-7 as written; build 5 gates GREEN; tsc api 0; 13 files / 257 tests green
red: authorityMatrix.test "six ruled disagreements read AGREEMENT" — RULED-REPORT-AUTHOR-NO-LONGER-ADMITTED (live snapshot cannot admit scout-1/2 until the migration is applied post-landing); the test says STOP and report
probe: with RULED_NONCLAIMING_AUTHORS left at operator,scout the test passes; ORDER 4 kept as written, not chosen
ruling needed: move that one line and its pin to the post-landing re-measure, or other
ui: both greps at origin/master → no output → NO UI SURFACE
extra: adversaryGate.d.mts declares SCOUT_ADDRESSES (TS2305 without it); LANE_ADDR import added (card said already imported)
graft: not used for this card (card cited file:line)
