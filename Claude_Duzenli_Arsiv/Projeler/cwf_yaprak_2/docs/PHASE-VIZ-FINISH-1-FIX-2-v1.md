# PHASE-VIZ-FINISH-1-FIX-2 · v1 (micro)
<!-- PHASE-VIZ-FINISH-1-FIX-2-v1 · 2026-08-01 · S74 · same program (S74-1).
     PRECONDITION: origin/master at or past bc5e2f71 (publish-record PR may
     have merged — take the current head, report it). -->

## WHY (W1′ residual, Architect-read trace 4e2b1b6e)
Chart honored the grain (bucket:"day" → "günlük ortalama" disclosed). The
TABLE did not: model titled it "KB7 Haftalık OEE Değerleri (Gün Bazlı)" over
raw HOURLY rows (00:59, 01:59, …). The finish definition forbids exactly
this ("hourly-dump-labeled-daily"); the chart-only scoping of bucket in
FIX-1 left the table door open. Finding: **VIZ-TABLE-GRAIN-1**.

## G1 — `bucket` for [TABLE_FROM_TOOL] (deterministic honor)
Same two grains, same parse guard as chart (unknown → ignored+reported).
Reuse the FIX-1 aggregation: mean per zoned bucket per group for numeric
columns; timestamp column shows the bucket key; header discloses
"günlük ortalama · daily mean" (chart convention). Empty bucket = absent
row, never 0-fill. Tests: shared fixture with chart-side, means match.

## G2 — deterministic GRAIN CHIP (truth surface self-corrects)
On any time-keyed from-tool table WITHOUT bucket: compute the observed
grain from the median delta of consecutive timestamps (≤90 min → "saatlik ·
hourly"; ~1 day → "günlük · daily"; else "ham · raw") and render it as a
header chip next to the row count. A wrong model title can then never stand
alone — the surface states what the rows actually are. Unit tests on the
three bands + the W1′ exhibit shape (129 hourly rows → "saatlik").

## G3 — evidence + close
Suite true-exit; e2e: one table case with bucket:day (header disclosure
asserted) + one unbucketed hourly case (grain chip asserted) at 1280/1024;
0-byte pins on all chart-side FIX-1 tests; CHANGELOG+KB, reseal if drift
flags. NO segment publish (teaching sentence for table grain queues for the
next natural segment revision — recorded, not shipped).

## MERGE (verbatim)
```
Merge PHASE VIZ-FINISH-1-FIX-2: the table stops borrowing a grain it does
not have — honor it or disclose it
```
TAIL: **FIX-2 TAIL: table grain honored-or-disclosed** + remote hash.
<!-- END · PHASE-VIZ-FINISH-1-FIX-2-v1 -->
