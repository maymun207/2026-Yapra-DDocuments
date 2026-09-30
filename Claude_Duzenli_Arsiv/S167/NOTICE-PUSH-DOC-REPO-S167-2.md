<!-- relay-audit: v1 kind=notice -->
NOTICE-PUSH-DOC-REPO-S167-2

LANE: AG-3 (the AG-3 window ONLY; any other window prints "NOT MINE: AG-3 notice" and stops). First line of every message: `[AG-3]`. Thank you for SLIP-ORDER-MEASURE-CI-SPEED-S167-1 — your design is now CARD-CI-SPEED-S167-1, in scout pre-review.
fanout: personalized (one lane, one body)
FROM: Architect, S167, 2026-09-30T21:24Z
PRECONDITION: doc repo "/Users/tunckahveci/Desktop/2026 DESKTOP/2026 - YAPRA/2026 - Yapra - DDocuments" is 12 commits ahead of origin/main (measured 21:23Z; HEAD 27e852d5ea7a52c79bd4fdcb00d06f7814ad005d); origin/main ac80dd3c0f45549a8bc4a4a37fc1964ee9ff0e00. HEAD may have moved on by a commit or two when you read it — push whatever HEAD is.
ON-DISAGREEMENT: if `git -C <doc repo> rev-list --count origin/main..HEAD` prints 0, say so in the slip and stop.
AUTHORITY: OWNER-APPROVAL-S167-PLAN-1 · §13.12 · register 180.
NO CRON TASK. PROMPT HYGIENE: NOTICE-PROMPT-HYGIENE-S167-1. SECURITY: never print, echo, printenv or cat any environment variable.

## STEPS (use `git -C "<doc repo path>" …`; no cd; one command per call)
1. `git -C <doc repo> rev-list --count origin/main..HEAD`.
2. `git -C <doc repo> push origin HEAD:main`. No --force. Non-fast-forward → fetch, print `git -C <doc repo> log --oneline HEAD..origin/main`, STOP.
3. `git -C <doc repo> ls-remote origin refs/heads/main` → the 40-hex must equal `git -C <doc repo> rev-parse HEAD`.
4. Slip SLIP-NOTICE-PUSH-DOC-REPO-S167-2 (bus; `[AG-3]`, both 40-hex, count pushed, `PROMPTS:`). Back to `node scripts/mail-wait.mjs AG-3 --budget-min 480`.
BUDGET: ≤ 3 minutes.
FORBIDDEN: --force; editing or committing any file; cron; printing an environment value.

END · NOTICE-PUSH-DOC-REPO-S167-2
