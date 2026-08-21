# PHASE-BENCH-SMOKE-1 · v1 — walk item #20 · lane AG-4

<!-- Architect-authored · S95 Wave 2 · SC-A class. Self-contained. -->

## PRECONDITION (S47-1)
Fresh FULL clone. Expected base
`d8e76884318bba818d910a8dc0a838d163f94b89` · docVersion **rev 236** ·
72 migrations · 14 ADRs · 541 test files. If master moved, record the actual
base and proceed.

## LANE / BRANCH / REPORT / PR (S91)
Lane **AG-4** · branch **`phase/bench-smoke-1`** · PUSH · OPEN PR · report
**`docs/relay/PHASE-BENCH-SMOKE-1-report.md`** · merge on GO, `--no-ff`,
squash banned.

## WAVE-SEAL LAW (binding)
Do NOT reseal during the build. At your merge turn: rebase → read docVersion
MASTER-side → next number → `npm run reseal` on the REBASED worktree → bump in
the same commit. A demanded REDRAW is a STOP. RULE 3 CHANGELOG + KB entries
are required and expected to conflict; late-merge on top, keep all entries.

## WAVE CONTEXT (S88-1) — your fence
NEW files under `api/cwf/_lib/replay/**` + `scripts/**` + your tests, plus
surgical read-only instrumentation calls at existing run seams IF and ONLY IF
they cannot be avoided — every such edit listed individually in the report
with a one-line justification. Zero migrations · zero `shared/**` · zero
`src/**`. **AG-3 works in the same directory on different NEW files**
(`llm-scan` family); do not create files whose names could collide, and
expect ∅ intersection — report `git diff --name-only` verbatim so the
Architect can verify it.

## MISSION — one cost organ, not two
Before the first benchmark round, the house needs to know what a run COSTS
before committing to it. **Written scope, owner-ruled (S92-H1): the
judge-model cost is INSIDE this organ's scope.** A second cost organ will not
be built — if a cost is not measurable here, that is a defect in this phase,
not a reason for another instrument.

## BUILD
1. **The cost model, stated before it is coded:** per-run cost =
   Σ(model calls × tokens × unit price) across every model a run invokes,
   **including the judge model**, plus a named line for any non-model cost
   the house already knows about. Prices live in ONE place as governed
   configuration — never scattered literals, never a hand-copied number in
   two files.
2. **Dry-run estimator:** given a planned run (corpus size, k, reps, models),
   print the ESTIMATE before execution — the whole point is to refuse an
   expensive run before spending, not to explain the bill afterwards.
   Estimate and actual are separately labelled and never conflated.
3. **Post-run actual:** from the run's own recorded telemetry, not from a
   guess. If a component's actual cost cannot be read, that component is
   `unread` and the total is REFUSED — an actual with a silent hole is worse
   than no actual. Three states everywhere (`measured` / `no-data` /
   `unread`), never two.
4. **Budget fence:** a `--max-cost` gate that REFUSES to start a run whose
   estimate exceeds the ceiling, with the refusal naming the estimate, the
   ceiling and the dominant line item. Prove it refuses.
5. **NOT in this phase:** no new benchmark, no scoring, no live paid run, no
   changes to what any existing runner DOES. This phase measures and gates
   cost; it does not spend.

## BIRTH PROOF (S93-1, fixtures)
(a) estimate over a fixture plan matches a hand-computed number stated in the
report (computed, not asserted — show the arithmetic); (b) an over-budget plan
is REFUSED, naming estimate/ceiling/dominant item; (c) a telemetry gap makes
the actual REFUSED rather than under-reported — and the refusal is visibly
different from a zero; (d) the judge model appears as its own line item in
both estimate and actual — a run whose judge cost is invisible must not
produce a total; (e) S66-1 positive control: a clean fixture run prints the
full itemised table and the components sum to the total.

## REPORT MUST CONTAIN
The cost model + where prices live · estimate-vs-actual separation · the
hand-computed arithmetic for (a) · all five birth-proof transcripts · every
existing-file edit individually justified (or the statement that there are
none) · full diff name-list · computed test deltas · drift output ·
`>> BLOCK: AG-4 <<` with head SHA.

## DO-NOT
No paid live runs · no second cost organ · no scattered price literals · no
edits outside the justified list · no Vercel CLI · absolute paths in scratch
writes.

<!-- END · PHASE-BENCH-SMOKE-1-v1 -->
