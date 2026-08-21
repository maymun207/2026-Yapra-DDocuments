# GO-SNAPSHOT-PORTABILITY-1-FIX-2 · v1 — HOTFIX MERGE

<!-- Architect-authored · S94 · authorizes MERGE ONLY of
     phase/snapshot-portability-1-fix-2 (head 2de70d8) into master.
     Reviewed from a fresh checkout: 12 where-true / 0 bare DELETEs across both
     re-emitted bodies, the structural gate + its mutation control, harness
     parity with the guard PROVEN ARMED before being trusted, docVersion 233,
     drift clean. FIX2-D1 (wipe converged as a live no-op) RATIFIED.
     Production is degraded: move immediately, skip nothing. -->

## PRECONDITION
* `origin/master` = `61834342160be33c78fbbb7a27afb7d1ec75a9f5`
* `origin/phase/snapshot-portability-1-fix-2` = `2de70d893b5495ee6e0d57c756c04d4895572192`
Either differs → STOP, report both.

## STEP 1 — CI (BLOCKING)
Query by FULL SHA `2de70d8…572192` (+ S91-6 short-SHA control). PRINT run id,
conclusion, jobs verbatim. eval-canary skipped-on-PR recorded as skipped.

## STEP 2 — MERGE
Fresh clone → `--no-ff` → the verbatim message below from a file → confirm the
merged tree prints `rev 233 · 2026-08-12` → push.

## STEP 3 — TAIL + SWEEP
Print: new master SHA · last 3 commits · docVersion line · empty
`git status --porcelain` · post-merge master CI (id + jobs + the canary's
scoredReps/failedReps line, no ruling). Delete the branch AFTER the merge is on
origin. Append MERGED to the FIX-2 report. Then STOP — the Operator relay is
already in the owner's hands.

## THE MERGE MESSAGE — VERBATIM

```
merge: PHASE-SNAPSHOT-PORTABILITY-1-FIX-2 — where true was never noise

The first live restore failed with "DELETE requires a WHERE clause" and the
learned layer stayed empty behind an atomic rollback. The root cause was not
in the function but in the record about it: role authenticator preloads
safeupdate, so every app-born session — SECURITY DEFINER bodies included —
forbids a WHERE-less DELETE, while migrations apply as postgres and say
nothing. The famous ~13-line "where true divergence" carried since S93 was a
live-environment adaptation whose reason was never written down; the standing
record called it semantically identical drift, the portability phase was
ordered to clean it, and the cleanup shipped the outage. Semantic equality is
environment-relative: the target's guard set is part of a statement's
meaning, and the convergence direction runs repo toward applied.

The sweep the fix demanded moved a premise: wipe's repo text carries the same
six bare DELETEs and survives in production only because it was never
re-emitted. Both bodies converge here — for wipe a byte-level no-op against
live, so the structural gate ships without an exemption carved into the most
destructive function in the organ.

Proven, not argued: the disposable harness armed safeupdate and was caught
lying about it first (the guard was verified to fire on a bare DELETE before
anything downstream was trusted), the shipped body reproduced the outage
verbatim at its own line 70, the fixed body restored with its full contract
including the safety snapshot, and a second apply moved zero rows. A standing
gate over the organ's EFFECTIVE bodies reds any future bare full-table
DELETE; stripping one where-true reds it today. Whether definer bodies
outside this organ carry the same hazard is UNMEASURED and enters the
register by name rather than being assumed clean.

One migration, authored not applied. Tests 6814 -> 6820 across 533 files;
4/4 mutations killed; docVersion rev 233. Owed: the Operator apply, then the
owner presses Restore a second time and the counters come home.
```
