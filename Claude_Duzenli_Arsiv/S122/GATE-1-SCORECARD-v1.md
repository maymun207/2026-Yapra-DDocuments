# GATE-1 SCORECARD — v1

**PRE-REGISTERED.** Minted 2026-08-27 at the close of T1, **before** the observation window
opens. The criteria below are locked to G1-a…G1-d as written in
`RULE-RUNTIME-CONSOLIDATION-DIRECTIVES-v1.1`; only the mechanics are the Architect's. Any
change during the window is an owner-ruled amendment, logged. A scorecard designed after
seeing the results is not a gate.

**Window:** the next 1–2 ordinary work sessions after T1 exit, with **no further governance
changes** during them.
**Verdicts are the owner's pen.** At gate time every evidence field arrives filled and every
verdict box arrives empty.
**UNMEASURABLE ≠ PASS.** A criterion that cannot be measured is marked UNMEASURABLE with its
reason and counts as FAIL unless the owner rules otherwise. Nothing is estimated (P-1).

---

## THE SCORECARD

| id | criterion | command / source | measured | threshold | verdict |
|---|---|---|---|---|---|
| **G1-a** | post-dispatch validator refusals across the window | metrics log field 4, cross-checked against each lane report's own refusal count | ______ | **0** | ☐ PASS ☐ FAIL ☐ UNMEASURABLE |
| **G1-b1** | CP-8 false positives over the landed corpus | `npx tsx scripts/cardPreflight.ts` CP-8 predicate run over `docs/relay/*.md`, classified against the labelled false-positive classes | ______ | **0** | ☐ PASS ☐ FAIL ☐ UNMEASURABLE |
| **G1-b2** | the secret / raw-hash fixture still trips | the fixture test added by the T1-1 card, run on master | ______ | **trips** | ☐ PASS ☐ FAIL ☐ UNMEASURABLE |
| **G1-b3** | CP-8 true positives, reported not minimised | same run as G1-b1, true-positive arm | ______ | **80, unchanged** | ☐ PASS ☐ FAIL ☐ UNMEASURABLE |
| **G1-c1** | repair rate | metrics log fields 2 / 1 | ______ / ______ | **≤ baseline 4/14** | ☐ PASS ☐ FAIL ☐ UNMEASURABLE |
| **G1-c2** | every repair classified judgement vs cross-body | the ANNEX below, one line per repair | ______ | **all classified** | ☐ PASS ☐ FAIL ☐ UNMEASURABLE |
| **G1-d** | owner rulings recorded | `S122-OWNER-DECISIONS-T1-v1` decisions 1 and 2, signed and dated | ______ | **both recorded** | ☐ PASS ☐ FAIL ☐ UNMEASURABLE |

**ARCHITECT RECOMMENDATION: PROCEED | HOLD** — ______________________________________

**OWNER DECISION: PROCEED | HOLD** ____________  date: __________

---

## ANNEX · REPAIRS CLASSIFICATION

One line per repair in the window. `cross-body` means a requirement was missed because it
lives in a different governance body than the one consulted — the class this program exists to
extinguish. Name the missed body explicitly; "cross-body" without a named body is not a
classification.

| card id | judgement / cross-body | which body was missed |
|---|---|---|
| | | |

---

## G1-b's DEPENDENCY, STATED SO IT CANNOT SURPRISE ANYONE AT THE GATE

G1-b1, G1-b2 and G1-b3 are **unmeasurable until the T1-1 card lands**, and that card is HELD
pending owner Decision 3. If the window opens and closes with T1-1 still held, those three rows
are marked **UNMEASURABLE — T1-1 held pending Decision 3**, which counts as FAIL unless the
owner rules otherwise. This is named here, in advance, rather than discovered at the gate.

The thresholds in G1-b1 and G1-b3 assume Decision 3 is signed as proposed. If it is amended,
this scorecard is amended with it and the amendment is logged.

---

## DRY RUN — operability proved against the baseline, as T1-7 requires

Run against the measured baseline window (14 dispatches / 4 repairs / 3 cross-body), with the
T1-1-dependent rows in their held state:

| id | measured | threshold | verdict this dry run would produce |
|---|---|---|---|
| G1-a | 4 post-dispatch refusals (baseline had no shift-left) | 0 | **FAIL** |
| G1-b1 | unmeasurable — T1-1 not landed at baseline | 0 | **UNMEASURABLE → FAIL** |
| G1-b2 | unmeasurable — fixture does not exist at baseline | trips | **UNMEASURABLE → FAIL** |
| G1-b3 | 80 (measured this session, pre-change) | 80 | **PASS** |
| G1-c1 | 4 / 14 | ≤ 4/14 | **PASS** (at the boundary) |
| G1-c2 | 3 of 4 classified cross-body, 1 judgement | all classified | **PASS** |
| G1-d | neither ruling recorded at baseline | both | **FAIL** |

**The dry run behaves correctly: it FAILS the baseline.** A gate that passed the state the
program was created to fix would be measuring nothing. It also exercises every box — PASS,
FAIL, and UNMEASURABLE-counts-as-FAIL — so no row is an unreachable branch.

Time to a verdict from the filled sheet: seven rows, numbers before prose, one page. Within the
five-minute rule.

---

TAIL ANCHOR: GATE-1-SCORECARD-v1 ends here.
