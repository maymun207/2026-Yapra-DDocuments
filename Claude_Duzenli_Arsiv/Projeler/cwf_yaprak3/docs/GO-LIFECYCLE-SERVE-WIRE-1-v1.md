# GO-LIFECYCLE-SERVE-WIRE-1-v1

<!-- relay-audit grammar v1 · kind=go · lane=AG-2 · S97 · Architect-authored ·
     immutable (S37-1) -->

**PRECONDITION (S47-1):** `origin/master` = `a37fc9704d883e5ac8e0a475cc2dfd4e11f82868`
and `origin/phase/lifecycle-serve-wire-1` = `7933fcf`, untouched.

**Review verdict (Architect, fresh clone):** 20/20 wire tests re-run green ·
zero state literals in both production files · TREE present · relayAudit zero
violations. The "one line" growing into an honest lifecycle-map read with a
named `unconfigured` degradation is ACCEPTED — the fence was files, not line
counts, and the read-failure honesty is exactly MEASURE-READ-HONESTY-1.
Deviation to cure at merge: the manifest edit rides inside the work commit.

## STEP 1 — CI GATE (BLOCKING)
Unsharded CI on your PR head: `conclusion=="success"` completed.
`in_progress`/`queued`/`null` is NOT a pass.

## STEP 2 — MERGE TURN
On clean local master at the PRECONDITION tip: build the integration line
with `public/architecture/manifest.json` RESTORED to master's version (your
embedded hunk dropped — the cure). TRUE RESEAL: read docVersion from master,
next number, one commit (S95-1); narrative drift demand = STOP (S90-2).
`git merge --no-ff` with this VERBATIM message:

```
merge: RELAY-LIFECYCLE-SERVE-WIRE-1 — a paused backend finally leaves a live turn (the serve consequence reaches stagesResolve through the one resolver; the fingerprint learns that state is config; an unreadable lifecycle map degrades by name, never silently to served)
```

**TAIL ANCHOR (S61-3):** first parent MUST be
`a37fc9704d883e5ac8e0a475cc2dfd4e11f82868`. Master moved: STOP and report.
Push master · close the PR with the house comment.

## STEP 3 — REPORT
New tip SHA · derived rev · CI string · manifest-hunk absence confirmation.
Then STOP.
<!-- END · GO-LIFECYCLE-SERVE-WIRE-1-v1 -->
