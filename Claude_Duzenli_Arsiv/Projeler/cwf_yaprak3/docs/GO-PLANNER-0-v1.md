# GO — PLANNER-0 · v1 (Architect → AG-1)

<!-- GO-PLANNER-0-v1 · 2026-08-09 · S89. RULE-25 review PASSED from the
     Architect's own clone: STEP-0 type excerpt verified against the report;
     independent test recount 42+8+14+20=84 in the four new files (+4 in
     extended files ⇒ +88, coherent with 504/6074); prepareStep absent-KEY seam
     read in the diff; floor grep'd for domain vocabulary (2 hits, both comment
     illustrations, gate-arbitrated clean in a fresh clone with the positive
     control firing); the af5dbe5f plan block matches the design verbatim. -->

## RULINGS (bind into the record)
R1 · **The memory kill switch does NOT govern the planner — your call is
     RATIFIED.** A plan derives from the frame and owes the store nothing;
     `retrievalTopK=0` is precisely the turn that most wants forward guidance.
     Two organs, two valves, each at its own definition site (ADR-012 R-1).
     The narrowed assertion in `memoryProcedure.test.ts` is the correct pin.
R2 · Deviations 1–6 all RATIFIED, including: the `[Planner]` line at end-of-turn
     (a line printed before `replan` is knowable would report a guess), and
     `planner.enabled` floor=1 as a DECLARED F185 deviation.
R3 · The missing PR-head CI run id in your report is the one review gap — it is
     discharged by STEP 1 below, not waived.
R4 · W-026's working-tree recurrence (your three-way proof) is the FOURTH data
     point; it folds into BUG-015's dossier by name.

## PRECONDITION
```
git fetch origin && git rev-parse origin/master   # MUST print 8c8b1726baeed19ccb305a127a338ae33a77b52c
```
That is AG-2's CHART-RESIDUAL-TRUTH-1 merge (S88-1 sequencing). Any other
value: STOP, report.

## STEP 1 — CI VERIFICATION (BLOCKING)
```
gh api "repos/maymun207/cwf_yaprak/actions/runs?head_sha=$(git rev-parse origin/phase/planner-0)" --jq '.workflow_runs[] | {id, status, conclusion}'
gh api "repos/maymun207/cwf_yaprak/actions/runs?head_sha=8c8b1726baeed19ccb305a127a338ae33a77b52c" --jq '.workflow_runs[] | {id, status, conclusion}'
```
PASS: BOTH the `phase/planner-0` tip run AND the master run on `8c8b172` read
`status=completed` + `conclusion=success` by CONCLUSION (`in_progress`/null is
NOT a pass; eval-canary skipped-on-PR / underpowered-on-master is recorded, not
gating — quote the master canary payload verbatim in the merge report per the
standing instrument-debt ledger). Either red or absent: STOP, report.

## STEP 2 — MERGE (only after STEP 1)
```
git checkout master && git pull --ff-only origin master
git merge --no-ff phase/planner-0
```
**Expected conflict — `.agents/CHANGELOG.md` only** (both lanes inserted at
top). Resolution rule, exactly: BOTH entries survive, YOURS (PLANNER-0) on top,
AG-2's (CHART-RESIDUAL-TRUTH-1) directly below, zero content edits to either.
Any conflict in ANY other file: ABORT (`git merge --abort`), report — none is
expected (disjoint maps, proven both sides).

**Combined-tree reseal check (the RENDER-TIME-1 lesson), before committing:**
run `npm run check:doc-drift` on the MERGED worktree. AG-2's lane mapped no
narrative tab (src/.agents only), so rev 218 is expected to stand — if drift
reports anyway, reseal the COMBINED tree to **rev 219** inside this merge
commit and say so in the report; never ship a rev whose hashes match neither
tree.

Commit with THIS message, verbatim:
```
merge: PLANNER-0 — the frame becomes a plan, and drift is named mid-turn

2F.4, the cognitive block's capstone. af5dbe5f, byte-diagnosed: a PERFECT
frame (QUERY_METRIC/FACTORY/oee/Granit/8d/HIGH), 12 calls all chasing the
PREVIOUS turn's subject, 217,232 of 316,552 tokens cached HISTORY, funnel
green on all five fields — no gate compared the trajectory to the frame and
no forward guidance existed when no routine matched. Now: derivePlan binds
frame→plan deterministically (routine steps ride VERBATIM as the seed; else
the governed system.plan_template row over a tenant-zero floor, ABSENCE-ONLY
self-seeded); the plan rides the user message as the fourth self-delimited
block (cache-prefix law); the re-plan gate is an additive prepareStep on the
ONE streamText site (absent ⇒ byte-identical) that APPENDS one frame-echo
reminder when zero calls have touched the frame — advisory only, fail-open,
capped by planner.replanNudgeMax; history is bounded per-message by a
governed middle-trim with an honest marker (the full fix is HISTORY-DIET-1,
named). The memory kill switch does not govern the planner (Architect-
ratified): two organs, two valves. Zero migrations, zero publishes in-phase;
the energy-synonym-search hint retires POST-deploy by owner hand, with the
Architect's S63-1 proof read. Suite 504/6074 (+4 files, +88). Reseal rev 218.

RULE-25: PASS (Architect, S89). Report: docs/relay/PHASE-PLANNER-0-report.md
```
```
git push origin master
```
Squash BANNED. Branch NOT deleted (session-close sweep).

## STEP 3 — MERGE REPORT (docs/relay/PHASE-PLANNER-0-MERGE-report.md)
Merge SHA · both STEP-1 run ids with conclusions · master-canary payload
verbatim · the CHANGELOG resolution as performed · reseal verdict (218 stood /
219 minted) · production deployment id+state for the merge SHA.

## AFTER (not yours)
The A1 hint archive is OWNER-HAND in the admin UI; the S63-1 proof read and
the displacement witness are the Architect's. You are done at STEP 3.

<!-- END · GO-PLANNER-0-v1 -->
