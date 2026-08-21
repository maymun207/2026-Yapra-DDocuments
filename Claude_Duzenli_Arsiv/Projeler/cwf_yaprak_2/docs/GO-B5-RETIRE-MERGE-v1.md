# GO → AG · PHASE-B5-RETIRE-1 MERGE · 2026-08-02
<!-- GO-B5-RETIRE-MERGE-v1 · Architect-authored after RULE-25 fresh-clone
     review of phase/b5-retire-1 @ 80cf0db616c868bd89c9c3cfbd5aa99a987dc050. -->

## Review verdict: GO

Independently re-established from a fresh clone: branch base = `6350844e`,
single commit `80cf0db` · code-scope grep ZERO across all four casings
(factory_registry / FACTORY_REGISTRY / FactoryRegistry / factoryRegistry) ·
`entity_list_tool` = one retirement comment only, arm 1 justified · floor
swap verified (`listByBackendLayer` + `ENTITY_FLOOR_LAYER_KEY`, scope
`floor=entity_registry`) · hint swap verified with fail-open catch→[]
preserved · migration shape verified (guarded catch-up copy → `drop table if
exists`, plain, no CASCADE → `drop column if exists entity_list_tool`) ·
413 test files · forbidden surfaces 0 · `check:doc-drift` [OK] 7/7 run by me
at head · docVersion rev 175. One prose nit, no action: the diff is **26**
files, not 25 (your list itself has 26 entries).

## STEP 1 — CI gate (BLOCKING; S76 discipline)

Confirm run for `80cf0db` on PR #134: **build(20.x) + build(22.x) +
coverage = success** (the 4601-test arbiter; eval-canary skipped =
structural PR state). rule26: success passes; a red follows the one-rerun
flake discipline (matched clean-anchor signature or ONE ordered rerun; a
persisting new signature = STOP). Paste the conclusion line(s).

## STEP 2 — Merge (only after STEP 1)

`git checkout master && git pull --ff-only` (must land on `6350844e`; if
master moved, STOP) → merge `--no-ff` with the message below VERBATIM
(via -F) → push.

--- MERGE MESSAGE BEGIN ---
Merge PHASE-B5-RETIRE-1: the named deferral executes — factory_registry and
entity_list_tool retire, and the floor re-points at the mirror that superseded them

Owner disposition on record ("temiz bir nokta"): B5 executes INSIDE v1, before
the tag. One commit, 26 files, one Operator-pending migration:

- Floor swap: the ENTITY-FLOOR-1 outage floor reads entity_registry's FACTORY
  layer via listByBackendLayer + ENTITY_FLOOR_LAYER_KEY (scope
  floor=entity_registry); four-way empty≠zero semantics proven branch-for-
  branch unchanged — real-0, missing, empty, and read-failure each behave
  exactly as before, "never a stamped absence" intact.
- PARAMHINT-MIRROR-READ-1 closed by design: the factory-value hint's values
  read (caught live at §0 by AG's census re-verification — the v1 brief had
  it as a comment) re-points at the same entity_registry layer; the fail-open
  catch→[] posture is preserved AND now proven by a negative-control test
  rather than assumed.
- Sync retirement: entityRegistrySync's factory_registry mirror write,
  FactoryRegistryRepository, and the FACTORY_REGISTRY constant are gone; the
  suite caught two grant-net references (grantPolicy/verifyGrants) that three
  grep casings missed — the manifest-completeness net redding on its own cause.
- Migration 20260802120000: guarded final catch-up copy (on conflict do
  nothing) → DROP TABLE IF EXISTS factory_registry (plain, no CASCADE —
  dependents fail loud) → DROP COLUMN IF EXISTS backends.entity_list_tool
  (RULING R-A arm 1: post-G2 census showed zero surviving reads). Double-apply
  proven on a real-shape disposable DB; NOT applied — supabase db push belongs
  to the Operator lane (ADR-005).
- Suite 413 files / 4601 tests green; Δ −19 vs 4620 reconciled per-file to
  zero (retired tests out, floor-survival + hint pair in). Repo-wide code
  grep ZERO across all casings, positive-control-proven; doc residuals
  classified (ADR bodies and history untouched, present-tense claims updated).
- docVersion 174→175; drift gate [OK] 7/7; zero governed writes, zero
  prompt/golden surface.

B5 → executed (DB apply pending, Operator next). ENTITY-LIST-TOOL retirement
rides the same file per the owner's clean-point mandate.
--- MERGE MESSAGE END ---

## STEP 3 — Report back (ends the wait)

Paste: CI conclusion line(s) · new `origin/master` hash after push ·
`git log --oneline -1 origin/master`. The Architect then issues
OPERATOR-APPLY-B5-RETIRE and runs the proof read after the DB apply.

## TAIL ANCHOR (S61-3)
This GO ends after STEP 3. If the last line you can see is not this
sentence, the relay was truncated — request a re-send before acting.
<!-- END · GO-B5-RETIRE-MERGE-v1 · 2026-08-02 -->
