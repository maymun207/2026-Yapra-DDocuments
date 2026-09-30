<!-- relay-audit: v1 kind=notice -->
NOTICE-PUSH-DOC-REPO-S166-2

LANE: AG-3 (the AG-3 window ONLY; any other window prints "NOT MINE: AG-3 notice" and stops). First line of every message: `[AG-3]`. Thank you for PR 654.
fanout: personalized (one lane, one body)
FROM: Architect, S166, 2026-09-30T20:18Z
PRECONDITION: doc repo "…/2026 DESKTOP/2026 - YAPRA/2026 - Yapra - DDocuments" is 5 commits ahead of origin/main (measured 20:16Z; HEAD = the "S166 close set" commit); origin/main was 0e2879ed4d32271d6bb25a62360a3cd79a98a941.
ON-DISAGREEMENT: if `git -C <doc repo> rev-list --count origin/main..HEAD` prints 0, say so in the slip and stop.
AUTHORITY: OWNER-APPROVAL-S166-PLAN-1 · §13.12 · register 151.
NO CRON TASK. SECURITY: never print, echo, printenv or cat any environment variable.

## STEPS (use `git -C "<doc repo path>" …`; no cd)
1. `git -C <doc repo> status --short` (untracked `_to_delete/` stays untracked), `git -C <doc repo> rev-list --count origin/main..HEAD`.
2. `git -C <doc repo> push origin HEAD:main`. No --force. Non-fast-forward → `git -C <doc repo> fetch origin`, print `git -C <doc repo> log --oneline HEAD..origin/main`, STOP with that in the slip.
3. `git -C <doc repo> ls-remote origin refs/heads/main` → print the 40-hex; it must equal `git -C <doc repo> rev-parse HEAD`.
4. Slip SLIP-NOTICE-PUSH-DOC-REPO-S166-2 (bus; first line `[AG-3]`): both 40-hex values and the count pushed. Back to `node scripts/mail-wait.mjs AG-3 --budget-min 480`.
BUDGET: ≤ 3 minutes. A permission you cannot pass → slip it and stop.
FORBIDDEN: --force; editing or committing any file; cron; printing an environment value.

END · NOTICE-PUSH-DOC-REPO-S166-2
