# GO — TOOL-NAME-COLLISION-1 · merge authorization
**Lane: AG-2 · Architect-issued, S85 · touch 3 of 4 (doctrine v1_2 D-6)**

## PRECONDITION (S47-1 — ALL must hold before any merge action; any failure = STOP + report)
1. **CI-DIET-1 is on master first** (merge order is the Architect's, one at a time): fresh `git fetch origin` and confirm `.github/workflows/build-test.yml` on `origin/master` contains `paths-ignore` under the `push` trigger. If absent, CI-DIET-1 has not landed — WAIT, do not merge.
2. `origin/phase/tool-name-collision-1` still = `ba05bb704650b964760e2a82fe55428b6da879f3`. If the branch moved, STOP — the RULE-25 review and the CI arbiter read below bind to this SHA only.
3. Working tree = fresh full clone (S61-1: stash is not a clean checkout).

## STEP 1 — CI verification (BLOCKING)
Branch-head arbiter is already recorded: **run `31167122295` on `3b43487` — 4 of 5 jobs GREEN**; `eval-canary` failed STRUCTURALLY on a non-master ref (900 s SHA poll, no eval ran, no verdict either way). This is a pass condition for the branch plane. `in_progress`/`null` on any of the four real jobs would NOT have been a pass. No re-run needed unless precondition 2 fails.

## STEP 2 — merge (--no-ff, squash banned) with this VERBATIM message:
```
merge: TOOL-NAME-COLLISION-1 — one namespace, first claim wins, every loss is spoken (BUG-012)
```

## STEP 3 — canary debt + S84-1 posture
- The canary's real reading is OWED on this merge run (branch run produced no verdict). Expected: full team 5/5 with canary CONVERGING — with CI-DIET-1 (d) live, your report push cannot supersede the deploy, so the S84-1 tension is structurally absent. The law itself stays on the books.
- Push your MERGE report immediately after; expected: **zero CI run + Vercel deploy skipped** (docs-only). Record both observations in the report — they double as live evidence for CI-DIET-1's own proof plan.
- CHANGELOG same-day double-merge with CI-DIET-1 is the known structural conflict: keep BOTH entries in full, late-merge on top.

## STEP 4 — report back (touch 4 of 4)
Merge report carries: merge SHA · first-parent line · CI run URL + 5/5 incl. canary verdict verbatim (underpowered is reported as underpowered, never "safe") · docVersion **rev 206** confirmed on master · suite delta read from the merge run (expected 486/5610; CI-arbitrated, never asserted locally).

## POST-MERGE SEAL (Architect duty, recorded here for the register)
DB read S85 (positive control fired): ZERO backend declares `resolve_time_range` / `aggregate_records` / `query_records` across 185 rows / 4 backends → first natural turn's expected reading is `collisions=[]`, PRESENT and EMPTY. A non-empty record is a NEW fact, not the seal. Architect reads it from telemetry; no owner touch.

<!-- END GO-TOOL-NAME-COLLISION-1-v1 · tail anchor: MERGE ONLY AFTER PRECONDITION 1 (CI-DIET-1 ON MASTER) -->
