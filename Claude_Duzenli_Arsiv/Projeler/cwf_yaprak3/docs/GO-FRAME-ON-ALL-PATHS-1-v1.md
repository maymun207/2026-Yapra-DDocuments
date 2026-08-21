# GO-FRAME-ON-ALL-PATHS-1-v1

<!-- relay-audit grammar v1 · kind=go · wave=4 · lane=A · S97 ·
     Architect-authored · immutable (S37-1) -->

**PRECONDITION (S47-1):** `origin/master` = `243090898ba26dd796e21479e569d9230033054c`
and `origin/phase/frame-on-all-paths-1` at `1ec1377` or a descendant produced
only by STEP 0 below. Anything else: STOP and report.

**Review verdict (Architect, fresh clone):** fence-clean (sentinel edits in
`learnBrake.test.ts`/`frameEvidence.test.ts` audited — append-proof updates,
not silencing) · `armorIrFrame` non-test invocations 9→9 · `.agents` 0-deletion
· new suites 16/16 re-run green · relayAudit zero violations. Rulings:
R4 payload-kind ACCEPTED (better than brief) · `stage:'07'` stands ·
Superset-only `router-dark` at 1 ACCEPTED as honest.

## STEP 0 — PRE-MERGE AMENDMENT (one commit on the same branch)
Widen the closed reason enum with **`'routing-bypass'`** and record it on the
full-set branch (`isAnthropic || routingBypass`) so its `ctx.frameEvidence`
absence is named like every other. One test proving the branch records it;
the enum-vocabulary sentinel updated the same append-proof way. Push. This
closes the falsifier-(d) gap you named. Nothing else rides this commit.

## STEP 1 — CI GATE (BLOCKING)
Unsharded CI on the PR #207 head AFTER Step 0's push: `conclusion=="success"`
on the completed run. `in_progress`/`queued`/`null` is NOT a pass. Failure:
STOP, paste the failing tail.

## STEP 2 — MERGE TURN (S96 choreography)
On clean local master at the PRECONDITION hash: build the integration line
locally EXCLUDING the provisional seal `1ec1377…` by SHA (origin branch never
rewritten, S96-1); TRUE RESEAL on the line — read docVersion from MASTER, take
the next number (expected **rev 244**, but DERIVED, not assumed — S95-1: read →
next → reseal+bump in one commit); if doc-drift demands any NARRATIVE edit
beyond the manifest, STOP and report (S90-2). Then `git merge --no-ff` with
this VERBATIM message:

```
merge: PHASE-FRAME-ON-ALL-PATHS-1 — every user turn either runs the frame layer or says, by name, why it did not (one seam, one extractor: armorIrFrame call sites 9→9 with the turn path still at exactly one; absence is a record with a closed reason — routing-bypass now included — never a bare undefined; router.frameOnAllPaths ships dark at floor 0; frame evidence rides its own payload kind so BUG-017's published denominator keeps its meaning)
```

**TAIL ANCHOR (S61-3):** the merge commit's first parent MUST be
`243090898ba26dd796e21479e569d9230033054c`. Master moved: STOP and report —
no silent rebase-and-retry.

Push master. Close PR #207 with the house comment (content merged by rebased
`--no-ff` merge; head SHA stale after rebase).

## STEP 3 — REPORT (one paste to the owner)
New master tip SHA · derived rev · CI conclusion string · confirmation
`1ec1377` absent from `git log origin/master` · the exact production log/row
the Architect's S63-1 read should look for (the first named-absence shadow row
at floor).

## AFTER STEP 3: STOP. No new phase. The live read is the Architect's.
<!-- END · GO-FRAME-ON-ALL-PATHS-1-v1 -->
