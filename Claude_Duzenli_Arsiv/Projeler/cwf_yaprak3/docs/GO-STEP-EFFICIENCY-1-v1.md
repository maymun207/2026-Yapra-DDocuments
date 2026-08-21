# GO-STEP-EFFICIENCY-1 · v1 — merge FIRST, and the canary debt gets its read

<!-- GO-STEP-EFFICIENCY-1-v1 · 2026-08-08 · S87 · Architect → AG-2.
     STANDING GO (D-9.2). REVIEW VERDICT: PASS — Architect fresh-worktree at
     `ec3890a`: byte-verified Pick<TurnContext> binding · formatTurnEfficiencyLine
     snapshot pin · grounding presence-mapping · carriesForward success-only ·
     exactCountOrThrow reuse + PK-dedupe + halt · chatQuotaStream value-shape net;
     targeted run 2 files / 50 tests green, exit read direct. Your D-1 opening read
     (turn_done ≠ event_type; 100% coverage with two named qualifications) is
     adopted as the completeness record 2F.3 stands on.
     DUAL-LANE ORDER (LAW): THIS lane merges FIRST. AG-1's SEMANTIC-MEMORY-1
     merges SECOND and carries the combined-tree reseal + BOTH CHANGELOG entries +
     the `verifyGrants.ts` / `stagesRegistry.ts` overlap resolution. -->

## STEP 1 — CI VERIFICATION (BLOCKING, with the docs-tip shortcut WRITTEN IN)
`TIP=$(git rev-parse origin/phase/step-efficiency-1)`. Your code head `9622fd51`
already holds run `31253008832` (pull_request, 4 success + eval-canary skipped —
correct read; a skipped canary is NO verdict). **The FENCE-WITNESS shortcut now
applies by rule, not by improvisation:** if `git diff --name-only 9622fd51..$TIP`
is docs-only (grep -v '^docs/' → empty), the code head's green run COUNTS for the
tip — no dispatch, no wait. If anything non-docs moved, full STEP 1 on the tip:
`/actions/runs?head_sha=$TIP`, per-job conclusions, in_progress/null/absent NOT
a pass.

## STEP M — MERGE (FIRST)
1. Re-read base at merge time (S81-1): `origin/master` expected `e650f0f4…`;
   if moved, STOP-AND-REPORT (nothing should land between now and your merge).
2. `git merge --no-ff --cleanup=strip origin/phase/step-efficiency-1 -m "merge: STEP-EFFICIENCY-1 — the turn now says how far it got, and an unmeasured stage is never a success"` · push.
3. Expectations, BASE+DELTA: master run ALL FIVE jobs — **eval-canary RUNS on
   master: read its WARNING line (S86-2), quote it, classify
   cleared / converged-not-cleared / DID-NOT-RUN; the standing `underpowered`
   debt gets today's read here.** Suite 493/5772 → **494/5813**; docVersion
   **rev 213** (your reseal stands until AG-1's second-merge combined reseal
   supersedes it — expected, not an error).
4. MERGE section appended to the SAME relay file; docs-push prod build
   0-run/CANCELED expected, one observed line. Branch deletable after merge.

## POST-DEPLOY WITNESS (S63-1 — owed before this phase is called closed)
After production READY at the merge SHA: ONE ordinary production turn occurs
(the owner's next normal use suffices; no ceremony), then run
`npm run report:efficiency -- --days 1` and append the output: `recorded ≥ 1`,
funnel cohort > 0, and the turn's keys visible. The Architect independently
reads the same `turn_done` row via supabase-ro. Until that, the phase measured
its plumbing, not the agent — your own words, adopted as the closure bar.

<!-- END · GO-STEP-EFFICIENCY-1-v1 -->
