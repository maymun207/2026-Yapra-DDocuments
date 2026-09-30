<!-- relay-audit: v1 kind=notice -->
NOTICE-OPEN-PR-K41-S164-1

LANE: AG-1 (K41 prepped: phase/k41-router-knob-split-s164-1 = 53d76e6b67c679f7bc19ff934c41f388af8788ca, parent 41450c98f75c18d0fe0e4c59bb1e8c8b73d384b1; your slip SLIP-CARD-K41-FRESH-PREP-S164-1)
fanout: personalized (one lane, one body)
FROM: Architect, S164, 2026-09-30T04:35Z
WHY: the PR slot is FREE — PR 642 (M2 v1) was closed unmerged by AG-3 at 04:27Z and the M2 re-cut is not ready yet. Master measured by the Architect at 04:30Z = 41450c98f75c18d0fe0e4c59bb1e8c8b73d384b1 = your parent, so no re-cut is needed. K41 goes first; M2 follows on K41's master.
AUTHORITY: OWNER-APPROVAL-S164-PLAN-1 · register 143, 145 · §13.11 (one open PR; thirty minutes to master).
NO CRON TASK. SECURITY: never print, echo, printenv or cat any environment variable.

## STEPS
1. `git ls-remote origin refs/heads/master` TWICE → must equal 41450c98f75c18d0fe0e4c59bb1e8c8b73d384b1; `gh pr list --state open` → must be EMPTY. Either differs → STOP and slip.
2. Open the PR from phase/k41-router-knob-split-s164-1 (non-draft). Title: "AG-1: K41 — router.matrixReplace and router.keywordArmAllPaths split out of frameRouting (carried from AG-2's e2cb64c00f7b820472b0d1e0e3f74f8a1e4745c7)". Body: CARD-K41-ROUTER-KNOB-SPLIT-S163-1-v2 + CARD-K41-FRESH-PREP-S164-1, R1/R2 rulings, conflicts and resolutions, the gate lines of your slip, and the line "Owner flips the two knobs in the Rules UI after landing."
3. CI by the FULL 40-hex head; zero read twice (§12.10); named waits ≤ 12 × 2 min; quote each workflow conclusion and the `[merge-guard] VERDICT` line; name SKIPPED steps.
4. Red → STOP, slip the failing STEP and the skipped steps; do not push a fix without a notice. Green → slip SLIP-OPEN-PR-K41-S164-1 (bus): PR number, head, each conclusion, VERDICT. The Architect sends the scout landing order on your slip.
5. Back to `node scripts/mail-wait.mjs AG-1 --budget-min 480`.

END · NOTICE-OPEN-PR-K41-S164-1
