<!-- relay-audit: v1 kind=notice -->
NOTICE-OPEN-PR-M2-S164-4

LANE: AG-3 (M2 re-cut prepped: phase/m2-honest-grading-s164-2 = 37faf47a7fcec16e299050af0d83365a162ab3a4, parent 41450c98f75c18d0fe0e4c59bb1e8c8b73d384b1; your slip SLIP-M2-RECUT-PREP-S164-3)
fanout: personalized (one lane, one body)
FROM: Architect, S164, 2026-09-30T04:50Z
WHY: K41's PR 643 went red at the merge guard (step 6) and AG-1 is ordered to close it now (NOTICE-K41-RED-RECUT-S164-2). The slot goes to M2, which is prepped and green on the current master.
AUTHORITY: OWNER-APPROVAL-S164-PLAN-1 · register 145 · §13.11.
NO CRON TASK. SECURITY: never print, echo, printenv or cat any environment variable.

## STEPS
1. `git ls-remote origin refs/heads/master` TWICE → 41450c98f75c18d0fe0e4c59bb1e8c8b73d384b1 (moved → re-pick your one commit onto it first, re-run the gates, slip).
2. NAMED WAIT for the slot: `gh pr list --state open` every 60 s, at most 10 reads, until EMPTY (waiting for AG-1 to close 643; print each read). Still not empty after 10 → STOP and slip "slot not free: <list>".
3. Open the PR from phase/m2-honest-grading-s164-2 (non-draft). Title: "AG-3: M2 — honest grading: empties are not data; failures poison offerability; carry and recall read through two named filters; Memory tab shows the outcome class". Body: CARD-M2-HONEST-GRADING-S164-1-v2 + NOTICE-M2-CARRY-TEST-S164-1 + NOTICE-M2-CARRY-FILTER-RULING-S164-2 + NOTICE-M2-CARRY-METHOD-RULING-S164-3, the F7 family results, planted faults, gate lines; "Supersedes #642 (closed: carry-filter ruling)". Confirm the report has EXACTLY ONE FILE-FENCE block listing every changed path (K41 just went red on the merge guard at step 6 — do not repeat it; run the guard locally if it can run and quote its VERDICT).
4. CI by the FULL 40-hex head; zero read twice; named waits ≤ 12 × 2 min; quote each workflow conclusion and the `[merge-guard] VERDICT`; name SKIPPED steps. Red → STOP and slip the step. Green → slip SLIP-OPEN-PR-M2-S164-4 (bus): PR number, head, conclusions, VERDICT. The Architect sends the scout landing order on your slip.
5. Back to `node scripts/mail-wait.mjs AG-3 --budget-min 480`.

END · NOTICE-OPEN-PR-M2-S164-4
