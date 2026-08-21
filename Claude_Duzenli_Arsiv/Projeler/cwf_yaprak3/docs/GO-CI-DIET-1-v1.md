# GO — CI-DIET-1 · merge authorization
**Lane: AG-1 · Architect-issued, S85 · touch 3 of 4 (doctrine v1_2 D-6)**
**Both decisions ratified: docVersion HELD at rev 205 (correct semantically, AND it keeps the rev sequence clean — the COLLISION branch already carries 206; a bump here would have been W-023's exact recurrence). `allowJs: true` accepted (single-source contract over a driftable `.d.mts`, planted-TS2322-verified).**

## PRECONDITION (S47-1 — ALL must hold; any failure = STOP + report)
1. `origin/master` still = `be8509ef5040c6af6046a90e6f4a9555c05c4d44` after a fresh `git fetch`. If it moved, STOP.
2. `origin/phase/ci-diet-1` still = `626cd30830514a81ac606637f2796c0e79345d13`. If it moved, STOP — this GO binds to that SHA.
3. Fresh full clone for the merge (S61-1).

## STEP 1 — CI verification on the PR HEAD (BLOCKING, S37-2)
The arbiter is the unsharded run on `626cd30` (the in-flight run you reported), NOT the recorded green on `b8ca078`. Pass condition: **4/4 code jobs `success` + `eval-canary` `skipped`** (structural on the PR plane). `in_progress` / `null` / anything else is NOT a pass — wait or report. Read via `gh run view --json`, never a wrapper's exit code.

## STEP 2 — merge (--no-ff, squash banned) with this VERBATIM message:
```
merge: CI-DIET-1 — a docs push no longer buys a CI team or steals the merge's canary
```

## STEP 3 — the post-merge self-test (the phase's own two-push pattern IS the proof)
- **The merge push** is a code push → expect the FULL team incl. eval-canary, and this canary is the first under the new fence: expected to CONVERGE (nothing will supersede its deploy). Report its verdict VERBATIM (underpowered is reported as underpowered, never "safe").
- **Your report push** (docs/relay + .agents only) is probe P1: expected **zero workflow run** AND **Vercel deploy skipped** with the `[vercel-ignore] SKIP` line visible in the Vercel build log. The merge push's full run is the S66-1 positive control for both absence claims. Record all observations in the merge report.
- CHANGELOG same-day double-merge with COLLISION-1 is the known structural conflict: both entries kept in full, late-merge on top.

## STEP 4 — report back (touch 4 of 4)
Merge report carries: merge SHA · first-parent line · merge-run URL + all five job outcomes + canary verdict verbatim · P1 probe observations (zero run + skipped deploy + the SKIP log line) · docVersion confirmed **rev 205** on master · suite total read from the merge run (expected 486/5606; CI-arbitrated).

## SIDE EFFECT (no action, awareness only)
The moment this merge lands, AG-2's standing GO self-unlocks on its own precondition check (paths-ignore grep on origin/master) and proceeds to the COLLISION merge. Your report push and AG-2's merge may interleave; the docs plane no longer collides with anything.

<!-- END GO-CI-DIET-1-v1 · tail anchor: MERGE ONLY AFTER STEP 1 PASSES ON 626cd30 -->
