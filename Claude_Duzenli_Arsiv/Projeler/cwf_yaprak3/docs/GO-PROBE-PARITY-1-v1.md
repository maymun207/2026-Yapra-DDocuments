# GO — PROBE-PARITY-1 · merge authorization (STANDING)
**Lane: AG-1 · Architect-issued, S85 · touch 3 of 4 · doctrine v1_3**
**RULE-25 verdict: clean. Two above-spec catches credited: the declared-backend_id-only rule (backendOf()'s ARMES fallback named and test-pinned as the misattribution trap) and the ProbeNotAttemptedError routing ("a path that decides and records nothing is a defect even when the decision is correct").**

## PRECONDITION (verify fresh, then proceed without further relay)
1. `origin/phase/probe-parity-1` still = `d231d18844b8af563bafe9818b3f7233404f7bc9`.
2. `origin/master` moved only by docs since `9ebb05f` (code lands ⇒ STOP + report).
3. Fresh full clone (S61-1).

## STEP 1 — CI on the BRANCH HEAD (BLOCKING)
Recorded arbiter `31192228309` sits on `ff8eabe`; the head is `d231d18` (one docs commit). Verify the run on `d231d18`: 4/4 code jobs `success` + `eval-canary` `skipped`. `in_progress`/`null` is NOT a pass — wait it out.

## STEP 2 — merge
`--no-ff`, conflicted commit via `--cleanup=strip` (RULING-S85-1). Subject VERBATIM:
```
merge: PROBE-PARITY-1 — the probe's proof becomes a row, and the save chain gets a lifetime (BUG-010, BUG-011)
```
CHANGELOG conflict expected (same-day multi-merge): both entries whole, late on top. Manifest: last-to-merge reseal on the merged tree; expected docVersion on master **rev 208**; `check:doc-drift` exit 0.

## STEP 3 — merge run + report
Full team expected (5/5, canary converging — fourth of today's series); verdict VERBATIM, underpowered never "safe". Report push docs-only → free under CI-DIET (one-sample P1 note suffices). Expected suite on the merge run: **490/5642** (CI-arbitrated).

## STEP 4 — report back (touch 4 of 4), then HOLD
Merge SHA · first-parent · run URL + five verdicts · rev 208 on master · suite from CI. Then STOP — the SEAL is not yours:

## SEAL CHOREOGRAPHY (recorded here so every party knows its part)
1. Deploy READY at the merge SHA (Architect verifies via Vercel, no touch).
2. **Owner (the declared real-world touch):** ONE Probe click on a live global backend in the panel, then ONE Save that changes a connection. Nothing else.
3. **Architect:** reads `backend_health` via Supabase — expects (a) a fresh probe-born row whose `checked_at` is the click moment and whose fields are the probe's own (BUG-010 seal), (b) save-born rows for every touched enabled backend within 1 minute (BUG-011 seal, now deterministic under `waitUntil`). The `down` arm stays ARMED unless a naturally unreachable entry exists — never manufactured.
4. BUG-010 and BUG-011 close on those reads; the register records the row ids as evidence.

<!-- END GO-PROBE-PARITY-1-v1 · tail anchor: MERGE ONLY AFTER STEP 1 PASSES ON d231d18 -->
