# PHASE VIZ-MATCH-ARRAY-1 · v1 — a match that mirrors the call's own shape must match
<!-- Architect-authored · 2026-07-31 · S73 · Fixes VIZ-DIRECTIVE-MISS-1.
     F111b's dual: array-valued match vs array-valued recorded arg.
     Tiny, freeze-independent, zero migrations, zero dependencies. -->

──── PREMISE BLOCK (Architect fills; AG VERIFIES and STOPS if wrong or absent) ────
P-A  REACHABILITY — live production turn, trace `ce985938…` (2026-07-31
     17:50, deployment `dpl_FdgtxJYWoG7w8AjNEj8TGzNGADBT`): the model emitted
     a chart directive whose `match` value is an ARRAY, the tool result
     existed (164 elements), and the UnavailableNote rendered. The verbatim
     directive (Operator-read from `messages`, single row @17:50:54Z):
     `{"tool":"getOeeValuesForZones","match":{"zoneIds":["6d4327bc-c50e-11f0-8832-02420a000166"]},"type":"line","title":"KB7 Glazur3 Hattı Son 7 Günlük OEE Trendi","x":"timestamp","series":["oee"]}`
P-B  PROVENANCE — anchor `origin/master` = `0c13ed32424a0021c187634f9cb65adb1c485115`
     (fresh clone, Architect-read) · root = `src/lib/toolResultSelect.ts:76`
     (`argsContainMatch`): `a[k] === v || (Array.isArray(a[k]) && a[k].includes(v))`
     — an array-valued `v` can never satisfy either arm · Architect jsdom
     bisect through the REAL `MessageChartContent` with a shape-faithful raw:
     verbatim directive → FALLBACK · same minus `match` → CHART · spaces
     exonerated. The data path (slice + derive) charts the same records.
P-C  SATISFIABILITY — red-then-green with the VERBATIM directive is
     satisfiable (the Architect's mount repro already produces the red) ·
     scalar-match byte-pins satisfiable (existing F111b tests) · ambiguity
     preservation satisfiable (two recorded calls both containing the match).
AG: if any field is empty, self-referential, or contradicted by what you read, STOP.
────────────────────────────────────────────────────────────────────────────────────

## §0 · THE DEFECT (bind to this, not to symptoms)

`argsContainMatch` understands scalar↔scalar and scalar-match↔array-arg
(F111b). The model mirrored the tool's OWN arg shape into `match`
(`zoneIds: ["…"]`) — a natural, information-preserving move — and the
matcher returned zero candidates → binding `none` → the honest
UnavailableNote over data that was present and derivable.

## §1 · GATED SUB-PHASES

**G1 · The dual, deterministically.** Extend `argsContainMatch`: when the
match value `v` is an ARRAY, it matches iff the recorded `a[k]` is an array
and EVERY element of `v` is included in it (subset semantics — the exact
dual of the existing scalar-in-array arm; a single-element `["x"]` matches
a recorded `["x"]` AND a recorded multi-zone call containing "x", so two
qualifying calls still yield the existing 'ambiguous' panel, never a
guess). Scalar behavior byte-identical — state the unchanged expression in
the test names. Empty-array match value: define it explicitly and honestly
(recommend: matches any recorded array — vacuous subset — and say so in a
comment + test; if you rule otherwise, disclose why).

**G2 · Tests.** (a) RED-then-GREEN through the REAL `MessageChartContent`:
the P-A verbatim directive + a shape-faithful single-zone raw renders the
FALLBACK on the untouched matcher and a CHART after G1 — the verbatim
string appears in the test, byte-exact. (b) F111b scalar pins: zero edits
to existing matcher tests is the pin; if any needs touching, STOP and hand
back why. (c) Ambiguity preserved: two recorded calls both containing the
match array → 'ambiguous'. (d) Array-match vs SCALAR recorded arg → no
match (honest miss, no coercion).

**G3 · CHANGELOG + KB (RULE 3).** Reseal only if `check:doc-drift` flags
(src/lib-only change — not expected); docVersion moves only with a reseal.

## §2 · CONSTRAINTS

Zero migrations · Operator does NOT enter · freeze untouched · zero new
dependencies · no other viz surface touched (the model's prose-vs-panel
dissonance is a SEPARATE recorded note riding viz v4 — do not fix it here) ·
branch `phase/viz-match-array-1` · self-verify with literal evidence →
hand back → RULE-25 → GO → `--no-ff` (squash banned).

## §3 · POST-MERGE PROOF READ (S63-1)

The owner re-asks the exact P-A question in production ("KB7 Glazur3
hattının son 7 günlük OEE trendini grafik olarak göster"); the chart
renders — crosshair tooltip under the pointer doubles as the still-owed
VIZ-UPLIFT-1 parity witness. The Architect reads the deployment READY and
the turn's log.

TAIL ANCHOR: this brief ends after the word ANCHOR-END. ANCHOR-END

<!-- END · PHASE-VIZ-MATCH-ARRAY-1 · v1 · 2026-07-31 · S73 · anchor 0c13ed32 -->
