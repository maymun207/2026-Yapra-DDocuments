# OWNER-RULING-S130-CWF-FOCUS-ADF-FREEZE-1

Recorded by the Architect at 2026-09-04T07:5xZ (10:5x TSİ), owner's words verbatim, given after reading `S130-BACKLOG-ADF-VS-CWF-SPLIT-v1`:

> "su anda sadece CWF ye alakali islerin bitirilmesine fokus olalim, ADF yi donduralim"

## THE RULING

1. **CWF FIRST, ONLY.** Work on the factory's product (Chat With Factory) is the only work dispatched until the owner lifts this. The three unmerged product works named in the split — `phase/context-retrieval-1` (canonical head; `-organ` is its ancestor), `phase/provenance-export-1`, `phase/stale-fact-sweep-1` — are the queue, in that order.
2. **ADF FROZEN.** No new factory-machinery work is dispatched: no matrix work, no landing-mechanism work (GATE-1 ⓶ ⓸ ⓺ ⓻), no report-batch landing of the fourteen foreman/lane observation reports, no hygiene card, no test-infrastructure card, no rule-cost review artefacts. Frozen items stay in the register with their names; nothing is closed by the freeze (GOLDEN LEDGER: only CLOSED@evidence / SUPERSEDED-BY / MERGED-INTO remove a line).
3. **USING the factory is not developing it.** Landing a CWF branch runs `land.ts` under the foreman, the scout reviews, cards flow on the bus — that is the factory doing its job on product work and is inside the ruling. The distinction is: a card whose deliverable is product code or a product landing is CWF work; a card whose deliverable is a change to scripts/, .github/, docs/laws/, docs/relay/ grammar, boots or the bus is ADF work and is frozen.

## WHAT THIS DOES TO WORK IN FLIGHT (Architect's application, named so the owner can overrule it with one word)

- **PR #490 `phase/authority-matrix-ruled-1` FREEZES AT "PR OPEN, CI RESULT RECORDED".** It is ADF. Its CI verdict is free information and will be read and recorded when the AG-4 report posts; but NO Operator (Gemini) `db push` prompt is issued and NO landing card is cut for it under this ruling. The migration file stays unapplied in the branch, which is exactly the safe state RULING 1 of the seven-disagreements ruling requires. The trunk is green without it (PR 488 landed on a heavy SUCCESS with the disagreements present), so nothing product-shaped waits on it. Cost of thawing later: one landing card + one Operator window.
- The `S130 poll #5` self-schedule is amended to record-only for the #490 report.
- The fourteen ADF report branches, `authorship-lens-2`, the shared-clone dirt and worktrees: frozen in place, named in the split document.

## WHAT MOVES NOW

`CARD-TRUNK-SYNC-CONTEXT-RETRIEVAL-1-v1` (AG-4): merge the current master into `phase/context-retrieval-1`, reseal if the gate says so, push, open the pull request if none exists, read the heavy suite, report. Then a scout review card on the synced head, then a foreman landing card. Then the same three-step for `provenance-export-1` and `stale-fact-sweep-1`.

## RECORDED AGAINST

F-S130-RULE-COST-REVIEW-OWED-1 (the owner's standing objection that the rules block progress) — this ruling is its first concrete consequence: the factory's self-work is paused so the product can move. F-S130-BACKLOG-IS-70PCT-SELF-REPORTS-1 is the measurement it rests on.
