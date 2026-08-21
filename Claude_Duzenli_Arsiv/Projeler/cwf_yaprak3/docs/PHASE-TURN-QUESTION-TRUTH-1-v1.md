# PHASE-TURN-QUESTION-TRUTH-1 · v1
**Lane: AG-1 · DIAGNOSIS-FIRST (S73-1: the chain ends at a byte; do NOT patch above the proven layer). Turn-pipeline surface — AG-3 has vacated it; AG-2 is in flight on settings only. NO migrations. Base: `origin/master` = `63b3beb2a2a462a75ebb2a3c21a33da86b8c2c80` (rev 264) or later IF the only intervening merge is mcp-settings-truth-1-fix-1.**

**Branch:** `phase/turn-question-truth-1` · push · PR (unsharded CI arbiter; `total_count:0` = FAILED).
**Report:** `docs/relay/PHASE-TURN-QUESTION-TRUTH-1-report.md`

## 0 · THE INCIDENT (Architect-verified live; conversation of turn `b48f5c77a96d7f9213897c1ca0462235`)
`public.messages`, chronological:
- 04:11:19 user — shift question ("Granit, dün akşam 4-12 vardiyası, sırlama 3-4-5")
- 04:11:53 assistant — turn size ceiling (300000 tokens) reached, collection stopped (honest, correct)
- **04:13:15 user — badge question ("10106202 sicil nolu çalışan, bu haftaki giriş-çıkış")** ← the actual current request
- 04:14:50 assistant — opens by calling the BADGE question the *previous* message and the SHIFT question the *"son isteğiniz"*, then executes the shift question. It also asserts a tool call was made for 10106202 — no such call exists in that turn's trace.

Two symptoms, one turn: (A) current/previous INVERSION, (B) a fabricated history claim.

## 1 · REQUIRED DIAGNOSIS BEFORE ANY EDIT (D-1, S73-1)
Reproduce and locate to the byte. Candidate mechanisms — prove or kill each in writing, do not assume:
1. **Off-by-one in the window/current split.** The last-N history window includes the newest row while the "current query" slot resolves to `messages[len-2]`. Test by constructing a 4-message fixture and asserting which text lands in the current slot.
2. **Persist-order/timestamp collision.** The badge user row and the abort assistant row order by a column that ties or sorts unexpectedly (created_at precision, insert order vs. sort key). Read the actual ORDER BY in the history read.
3. **Aborted-turn residue.** The 04:11:53 budget abort left turn state (pending query, tool intent) that the next turn inherited — which would also explain the fabricated "a tool call was made for 10106202".
Report which one is TRUE with the file+line and the failing assertion; the other two are recorded as killed with their evidence. A fix landed on an unproven mechanism is refused at review.

## 2 · REQUIREMENTS (only after §1 names the byte)
**R1 — Fix the proven mechanism.** Regression test replays the exact four-message shape above and asserts the model receives the BADGE question as current, with the shift exchange as history. Positive control: the pre-fix code fails that test (S66-1 — a green test on unfixed code proves nothing).
**R2 — Current-question truth is renderable.** The turn digest records the resolved current query and the history window's boundaries (first/last message ids + count), so stage 01/02 can show "this turn answered: <text>" and a future inversion is visible in one glance instead of inferred from prose.
**R3 — Partial ≠ complete at the tool loop.** When a tool reports more pages than the loop will fetch (here: 6811 records / 35 pages, only 200 consumed), the answer must carry an explicit incompleteness statement in the user-visible reply ("read 200 of 6811 — this answer covers a fraction"), and the digest records `pagesAvailable` vs `pagesRead`. NO silently-partial answer. If the loop can legitimately continue, say why it did not (budget, cap, tool contract) — the reason is data, not prose.
**R4 — Aborted-turn hygiene.** Whatever §1 finds about residue: a budget-aborted turn must leave zero state that a later turn can read as its own intent or its own past tool call. Assert it with a test that aborts then runs a different question.
**R5 — Do NOT build failure-lesson memory here.** #48 FAILURE-LESSON-MEMORY-1 (S98-L5) is the named home for "the second attempt should remember the first hit the ceiling". This phase only records the evidence pointer for it; scope stays on correctness of WHICH question is answered. (Named deferral; SOTA-1 check performed: no SOTA criterion regresses — the inversion fix is strictly required for any answer-correctness claim.)

## 3 · TESTS
Fixture replay of the incident shape (R1) · positive control on pre-fix code · digest carries resolved-current + window bounds (R2) · partial-answer disclosure property over a paged tool (R3) · abort-then-new-question isolation (R4) · every new query site purpose-tagged (AG-3's compiler gate is live on master — expect it to fire).

## 4 · DELIVERABLES (kind=phase, R-DELIVERABLES)
```deliverables
branch: phase/turn-question-truth-1
report: docs/relay/PHASE-TURN-QUESTION-TRUTH-1-report.md (§1 diagnosis with the proven byte + two killed candidates)
pr: against master, unsharded CI green (total_count:0 = FAILED)
proof: post-deploy (S63-1) = owner asks question A, lets it finish or abort, then asks unrelated question B; the reply answers B. Architect reads the digest live: resolved-current == B, window bounds recorded, no fabricated tool-call claim.
```
Merge `--no-ff` after Architect GO only; reseal only if the tree changed (S100-1).

<!-- END · PHASE-TURN-QUESTION-TRUTH-1-v1 -->
