# GO-BENCH-RESET-1-v1

<!-- relay-audit grammar v1 · kind=go · lane=AG-3 · S97 · Architect-authored ·
     immutable (S37-1). SEQUENCED: execute only after the wire merge. -->

**PRECONDITION (S47-1):** `git log origin/master` contains the merge subject
`merge: RELAY-LIFECYCLE-SERVE-WIRE-1`. Absent: STOP and wait. Your branch
`origin/phase/bench-reset-1` at `49108db`, untouched.

**Review verdict (Architect, fresh clone):** rebase base verified `a37fc97` ·
`src/lib/adminService.ts` carries lane B's bytes with ZERO deletions and
exactly your two appended methods · 51/51 turn-2 suites re-run green (89 total
across the phase) · the pane reads the ENDPOINT's live scope, not the
compiled-in function · zero hand-maintained table literals in the production
diff — the ADR-014 derivation held · TREE + relayAudit clean · K2 executed and
witnessed (v2=50, source=db) · R1/R2/R4/R5 accepted in turn 1, R3 now whole.
`F-S97-CLASS-CATALOG-UNINSTALLED` stays on the register as #30-era work: in
production this organ REFUSES until the catalogue lands, and that refusal is
its designed honesty, not a defect.

## STEP 1 — CI GATE (BLOCKING)
Unsharded CI on your PR head: `conclusion=="success"` completed.
`in_progress`/`queued`/`null` is NOT a pass.

## STEP 2 — MERGE TURN (rebase-expected class)
On clean local master at the post-wire tip: rebase your integration line onto
it, EXCLUDING your provisional seal `49108db` by SHA (origin branch never
rewritten — S96-1). Conflicts outside the `.agents` union seam: STOP before
resolving. Re-run the full suite + typecheck on the rebased line (a clean
rebase is a claim; the suite is the reading). TRUE RESEAL: read docVersion
from master, next number, one commit (S95-1); narrative drift demand = STOP
(S90-2). `git merge --no-ff` with this VERBATIM message:

```
merge: PHASE-BENCH-RESET-1 — a benchmark run starts from a NAMED state or it is not a measurement (reset scope DERIVED from ADR-014 classes, zero hand lists — a table classified LEARNED enters scope with no code edit, proven by test; SAFETY-TAKE is unremovable by mutation; excluded classes are excluded BY CLASS; the pane shows only what the endpoint just asserted and surfaces refusal verbatim; K2 executed through the gated path — retentionMax v2=50, read back source=db; in production the organ refuses until the class catalogue lands, and that refusal is the design)
```

**TAIL ANCHOR (S61-3):** first parent MUST be the post-wire tip you verified,
STATED by SHA in your report. Master moved again: STOP and report.
Push master · close the PR with the house comment.

## STEP 3 — REPORT
New tip SHA · anchored tip SHA · derived rev · CI string · seal-absence
confirmation. This closes the LAST open lane of Wave 4 (S91-3). Then STOP.
<!-- END · GO-BENCH-RESET-1-v1 -->
