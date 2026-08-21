# GO-CENSUS-REFRESH-FIX-1-v1

<!-- GO-CENSUS-REFRESH-FIX-1-v1 · S97 · Architect-authored. ONE-RELAY (D-2):
     this file is self-contained. Immutable once presented (S37-1). -->

**PRECONDITION (S47-1):** `origin/master` = `3299a59319d205fe4ef7dc18b5fa428824e36966`
and `origin/phase/census-refresh-fix-1` = `dc703779da24fe7f5ffb9d503eddfd69adb40471`.
If either differs, STOP and report — do not merge.

**Review verdict:** Architect re-ran all gates from a fresh clone (46/46 refresh
tests · typecheck 0 · tenant-zero 0 control-first · relay-audit OK · drift green
with the provisional seal · `.agents` union 0-deletion). Deviation 1
(`considered` kept + `eligible` added) is ACCEPTED and recorded as better than
the brief. Deviations 2–4 accepted as named.

---

## STEP 1 — CI GATE (BLOCKING)

Read the unsharded CI conclusion on PR #206 head `dc70377` (S37-2: sole test
arbiter). PASS condition: `conclusion == "success"` on the completed run.
`in_progress` / `queued` / `null` is NOT a pass — wait for completion.
Any failure: STOP, paste the failing job tail, do not proceed to STEP 2.

## STEP 2 — MERGE TURN (S96 choreography, seal dropped by SHA)

On a clean local master at the PRECONDITION hash:

1. Build the integration line locally EXCLUDING `cd5a83ff94b6218860e435c4a43a3ce8929025f1`
   by SHA (local construction of a fresh integration ref; the phase branch on
   origin is NOT rewritten, NOT force-pushed, left untouched — S96-1).
   The integration line therefore carries exactly: `174f6d3` · `6c1ffc8` ·
   `dc70377` (report), in that order.
2. TRUE RESEAL on the integration line: docVersion **rev 243** (manifest hash
   move only — AG verified no diagram narrative mentions this seam; that check
   stands).
3. `git merge --no-ff` into master with this VERBATIM message:

```
merge: PHASE-CENSUS-REFRESH-FIX-1 — the refresh budget is spent only on tools the engine will consent to probe (exposure gate moved to a PRE-filter; considered=97 eligible=8 states the exclusion out loud; an unreadable exposure map halts selection as NOT-A-CLAIM in either direction; regression guarded end-to-end — mutant M1 = v1 exactly, killed by name)
```

4. Push master.

**TAIL ANCHOR (S61-3):** the merge commit's first parent MUST be
`3299a59319d205fe4ef7dc18b5fa428824e36966`. If master moved under you, STOP
and report — no rebase-and-retry without a fresh GO.

## STEP 3 — POST-MERGE REPORT (one paste back to the owner)

Report: new master tip SHA · rev 243 confirmed · CI conclusion string from
STEP 1 · confirmation that `cd5a83f` is ABSENT from `git log origin/master`.

## STEP 4 — MEMORY.md COMPACTION (authorized, separate, AFTER Step 3)

Authorized as a single-owner pass, on its own micro-branch
`phase/agents-memory-compaction-1`, ONE commit, self-merged `--no-ff`.
Constraints, all binding:
- This is a DECLARED deliberate rewrite, not a union-seam merge: state
  before→after byte sizes in the commit message.
- Every law, lesson and entry survives BY NAME or by a NAMED merge
  (GOLDEN LEDGER discipline applies to this index too) — compression yes,
  silent deletion no.
- Commit message: `docs(agents): MEMORY.md compaction — single-owner pass,
  <N>KB→<M>KB, every entry survives by name or named merge`.
- No reseal expected from this branch; if drift fires anyway, STOP and report
  (S90-2: an unexpected seal demand is a finding, not a chore).

## AFTER STEP 4: STOP.

Do not start another phase. The S63-1 post-deploy proof read (first cron tick:
`eligible`-filtered probing, `probed>0`, census rows climbing per tick) is the
ARCHITECT'S read — AG owes nothing there. The next prompt comes from the
Architect after that read.

<!-- END · GO-CENSUS-REFRESH-FIX-1-v1 -->
