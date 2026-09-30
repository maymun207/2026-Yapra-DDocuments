<!-- relay-audit: v1 kind=notice -->
NOTICE-INBUCKET-HEADER-FIX-S167-1

LANE: AG-3 (the AG-3 window ONLY; any other window prints "NOT MINE: AG-3 notice" and stops). First line of every message: `[AG-3]`. Thank you for the doc-repo push (13 commits, adfa2a36).
fanout: personalized (one lane, one body)
FROM: Architect, S167, 2026-09-30T21:27Z
PRECONDITION: PR 657 (phase/inbucket-s167-1, author AG-4) open at 67eaf3b36149e43655e0ea82bfd402b67054b49f. Its Build and Test FAILED in "Run tests" on ONE assertion (owner's CI log, 00:23 TSİ): api/cwf/__tests__/relayAuditGate.test.ts:335 "every relay artifact is either GOVERNED or frozen-exempt — never neither" → received ["docs/relay/INBUCKET-S167-1-AG4-report.md"]. The report has no `<!-- relay-audit: v1 kind=... -->` header; 373 reports on master carry `<!-- relay-audit: v1 kind=report -->` as line 1.
ON-DISAGREEMENT: if the head moved or line 1 already carries the header, print what you read and stop.
WHY YOU AND NOT THE AUTHOR (named exception, not a precedent): AG-4 has just been handed CARD-SESSION-TOKEN-S167-1-v2 (up to 60 min); the fix is one header line that changes no claim in the report; §12.8 (thirty minutes to master) outweighs the wait. §12.12's concern — a LANDER laundering another lane's file to get its OWN landing through — does not apply: you do not land it, and the landing scout reviews your commit. Say all of this in the commit message.
AUTHORITY: OWNER-APPROVAL-S167-PLAN-1 (step 5, register 174) · §12.8.
NO CRON TASK. PROMPT HYGIENE: NOTICE-PROMPT-HYGIENE-S167-1. SECURITY: never print, echo, printenv or cat any environment variable.

## STEPS
1. `git fetch origin phase/inbucket-s167-1`; worktree at `origin/phase/inbucket-s167-1` on a local branch of the same name (or the shared-clone copy method you used before if the sandbox refuses a worktree).
2. Insert exactly one line 1: `<!-- relay-audit: v1 kind=report -->` into docs/relay/INBUCKET-S167-1-AG4-report.md; nothing else changes. Run `npx vitest run api/cwf/__tests__/relayAuditGate.test.ts` ONCE → 37/37.
3. ONE commit (`git commit -F <file>`; message names this notice, the failing assertion, and "header only, no claim changed, author AG-4 busy"), `git push origin phase/inbucket-s167-1` (plain fast-forward, no --force). Print the new head 40-hex.
4. Slip SLIP-NOTICE-INBUCKET-HEADER-FIX-S167-1 (bus; `[AG-3]`, new head, `PROMPTS:`). Remove the worktree. Back to `node scripts/mail-wait.mjs AG-3 --budget-min 480`.
BUDGET: ≤ 8 minutes.
FORBIDDEN: any other byte in the report or config.toml; --force; merging; cron; printing an environment value.

END · NOTICE-INBUCKET-HEADER-FIX-S167-1
