# GO — PHASE-RESULT-BUDGET-1 · MERGE · v1

<!-- GO-RESULT-BUDGET-1-MERGE-v1 · 2026-08-06 · S82 · Architect: Claude (Opus 5).
     RULE-25 on PR #163 @ 27a725e71acc063a3e1022bb7b021d6c6f92543e, fresh clone.
     Counts re-derived: 469 files · 67 migrations · rev 198 · one commit ahead ·
     no ## MERGE placeholder · 19/19 phase tests green. -->

**Verdict: GO**, with ONE condition folded into the merge push (§2) and one refusal
recorded (§3).

## §1 · What I verified myself

- Param `turn.resultCharBudget` decl present; `TURN_AXIS_SAMPLE_RECORDS = 5` a code
  constant as reported; `result_budget` fourth BrakeKind + chip text both languages;
  `[TurnEfficiency]` line at stageStream:487; decision site reads
  `ctx.burstPolicy.resultCharBudget` and requests `forceStore` only over budget —
  formatToolResult applies it only where tier-3a is legal (record array + store), so a
  non-record result is byte-identical to pre-phase. **The bloat inversion AG reported is
  real and the fix is right**: turn-axis sample caps at 5 records (~1.8k near-constant),
  call-axis keeps takeFitting byte-identical. Both shapes are standing tests.
- AG's §A0 file-path correction (`_lib/toolResult.ts`, not `_lib/turn/`) checked: true.

## §2 · THE CONDITION — one test, rides the merge push, no re-review needed

**My mutation run stayed green where AG's report implied red.** I deleted the REAL
counter line (`stageTools.ts:1085 ctx.resultCharsUsed = spentBefore + formatted.length`)
and all 19 tests passed — because `resultBudgetTurnAxis.test.ts` rebuilds the loop with
its own local `used` counter, and even its MUTATION SENTINEL simulates the deletion
("Simulated here as the arithmetic it is") rather than sensing it. Honestly labelled,
but S82-5 is explicit: *a test that reconstructs the derivation proves the arithmetic
and says nothing about the wiring.*

**Add before merging, same push:** one test that drives the REAL decision site — the
`execute` closure path in stageTools (the burstBrakeSurface/silentFinishBrakeAware
harness precedent) — with a stubbed `burstPolicy` and a scripted multi-result turn,
asserting the Nth result comes back `stored:true`. **Deletion of stageTools:1085 must
red it; I will re-run that mutation on the merged master.** No other change.

## §3 · Refusal recorded — TURN_AXIS_SAMPLE_RECORDS stays code

AG asked the judgement be visible: sample size 5 as a code constant, not a governed row.
**I agree and record why:** a fifth knob with no evidence anyone needs to turn it is a
knob nobody will turn correctly; S82-6 mandates architecture, not knobs. Revisit trigger
named: post-deploy shows the model failing to use handles.

## §4 · Merge

STEP 1: CI green on the head that actually merges (the §2 test moves it — re-check).
STEP 2: `--no-ff`, squash banned. Verbatim message:

```
merge: RESULT-BUDGET-1 — the guard was on the call axis, the harm on the turn axis

Five results individually under 40k killed a turn at 315 030 tokens. One
governed budget (turn.resultCharBudget=120000, fail-closed) and one counter now
page the overflow into the tier-3a store the model could already query — no new
machinery, the existing handle path finally has a reason to fire.

The brief's own spec was inverted by measurement: forcing tier-3a as written
made small results BIGGER (1.51x at 24 records) because takeFitting re-lists
what already fit. On the turn axis the sample caps at 5 records (~1.8k constant);
the call axis keeps takeFitting byte-identical. Both the falsified shape and
the fix are standing tests.

result_budget is the fourth brake kind and the odd one: nothing is lost, data
is stored and queryable, and the chip says so. [TurnEfficiency] now prints
calls/distinct/repeated per turn — the number that proves the next phase.
```

STEP 3: `## MERGE` appended, same push, no pre-written heading. Then **cut Phase B from
the merged master with the S82-4 proof** — AG's decision to stop rather than cut early
was correct and is recorded as such.

**Post-merge, before Phase B lands:** nothing owed live yet — the three proof turns run
once AFTER Phase B merges (one session, three proofs), per the combined relay.
