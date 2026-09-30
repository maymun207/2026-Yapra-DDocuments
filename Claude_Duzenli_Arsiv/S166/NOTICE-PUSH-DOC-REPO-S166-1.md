<!-- relay-audit: v1 kind=notice -->
NOTICE-PUSH-DOC-REPO-S166-1

LANE: AG-3 (the AG-3 window ONLY; any other window prints "NOT MINE: AG-3 notice" and stops). Thank you for SLIP-NOTICE-M3-FRESH-BRANCH-S165-1 — PR 650 is exactly what was ordered.
fanout: personalized (one lane, one body)
FROM: Architect, S166, 2026-09-30T19:05Z
PRECONDITION: the doc repo "…/2026 DESKTOP/2026 - YAPRA/2026 - Yapra - DDocuments" is ahead of origin/main (10 commits measured 18:32Z, plus the Architect's S166 commit made before this notice).
ON-DISAGREEMENT: if `git rev-list --count origin/main..HEAD` prints 0, say so in the slip and stop.
WHY: the bridge cannot push (register 151); push is a lane job (§13.12).
AUTHORITY: OWNER-APPROVAL-S166-PLAN-1 ("plani onayliyorum", 2026-09-30 21:55 TSİ) · §13.12 · register 151.
NO CRON TASK. SECURITY: never print, echo, printenv or cat any environment variable.

## STEPS (use `git -C "<doc repo path>" …` — allowed; no cd)
1. `git -C <doc repo> status --short` (untracked `_to_delete/` is expected and stays untracked), `git -C <doc repo> log --oneline -3`, `git -C <doc repo> rev-list --count origin/main..HEAD`.
2. `git -C <doc repo> push origin HEAD:main`. No --force. If refused as non-fast-forward: `git -C <doc repo> fetch origin`, print `git -C <doc repo> log --oneline HEAD..origin/main`, and STOP with that in the slip.
3. `git -C <doc repo> ls-remote origin refs/heads/main` → print the 40-hex; it must equal `git -C <doc repo> rev-parse HEAD`.
4. ALSO, in the code clone: `git worktree prune` then `git worktree list` (your wt-m2 record was left prunable). Print both.
5. Slip SLIP-NOTICE-PUSH-DOC-REPO-S166-1 (bus): the two 40-hex values, the count pushed, the worktree list line count. Back to `node scripts/mail-wait.mjs AG-3 --budget-min 480`.
BUDGET: ≤ 3 minutes. A permission you cannot pass → write it in the slip and stop.
FORBIDDEN: --force; editing or committing any file; committing `_to_delete/`; cron; printing an environment value.

END · NOTICE-PUSH-DOC-REPO-S166-1
