# RULING-BENCH-RESET-1-v1 — R3 unblock, sequenced

<!-- relay-audit grammar v1 · kind=prompt (amendment) · wave=4 · lane=C · S97 ·
     Architect-authored. AMENDS the FENCE of PHASE-BENCH-RESET-1-v1; the phase
     prompt itself stays immutable (S37-1). -->

## PRECONDITION — READ CAREFULLY, THIS IS A WAIT-GATE
Do NOT begin the work below until `git log origin/master` contains the merge
subject `merge: PHASE-BACKEND-LIFECYCLE-1`. Until that subject appears,
`src/lib/adminService.ts` is LANE-B TERRITORY and touching it is the S96 storm
by another name. While waiting: nothing to build — remain stopped.

## CLAIMS
| claim | reading |
|---|---|
| Your R3 stop was correct | READ (Architect): both rejected outs are the right rejections — duplicated auth plumbing is the drift class this house legislates against, and a panel claiming what its endpoint refuses splits one rule into two |
| `adminService` is currently contested | READ (Architect, origin): lane B's turn-2 commit `1a9e004` adds +51 lines to `src/lib/adminService.ts` under its amended fence |
| Your K2 execution stands | READ (Architect): before-state F-1 (my CLAIM 4 was stale — the param was already db-published at v1=500), archive+publish v2=50 through the gated path, resolver read-back `value=50 source=db`. The tenfold-narrowing concern is RECORDED, the ruling unchanged |

## THE RULING
R1/R2/R5/birth-proof/R4: **ACCEPTED as built.** Falsifier-(a)-to-zero and the
deliberately-unbumped provisional seal are both noted approvingly. The R3 gap
is an **Architect authorship defect in the fence** (your words, upheld —
recorded under this session's premise-error ledger), not a defect in your
design or your stop.

## AFTER THE WAIT-GATE OPENS — turn 2, one commit chain
1. **Rebase your branch onto the then-current origin/master** (rebase-expected
   class; your provisional seal is DROPPED during this rebase and re-issued at
   the tip if CI needs it). Any conflict outside the `.agents` union seam:
   STOP and report before resolving. Re-run the full suite + typecheck on the
   rebased line — a clean rebase is a claim, the suite is the reading.
2. **FENCE EXTENSION, now in force:** `src/lib/adminService.ts` — ADDITIVE
   ONLY: exactly the two named methods over the EXISTING fetch helper
   (scope-preview read · reset invoke). Lane B's lines must survive
   byte-identical (falsifier: `git diff` over that file shows only your two
   appended methods).
3. **Complete R3 as specified in the phase prompt:** the BenchTab pane —
   derived scope shown from the ENDPOINT's live read (never the compiled-in
   pure function alone), catalogue-unreadable refusal surfaced verbatim,
   typed-name confirmation reusing the #38 ritual, Turkish-first copy.
4. Update the report in place (grammar v1), push, and confirm PR still
   targets master with CI green on the new head.

## RECORDED, NOT YOURS TO FIX
`F-S97-CLASS-CATALOG-UNINSTALLED` — production's honest refusal stands until
the class catalogue reaches the database; that installation is #30-era work
and will be sequenced by the Architect, not smuggled into this lane.

## FALSIFIER (amendment)
This turn is WRONG if: (a) any byte of lane B's `adminService` lines moves;
(b) the pane renders a scope the endpoint did not just assert; (c) anything
beyond the two methods + the pane + tests + report rides the commit chain;
(d) work begins before the wait-gate subject exists on origin/master.

## AFTER PUSH: STOP. GO comes after the Architect's re-review.
<!-- END · RULING-BENCH-RESET-1-v1 -->
