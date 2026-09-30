<!-- relay-audit: v1 kind=notice -->
NOTICE-RESILIENCE-DNS-AFTER-GOOD-READ-S166-1

LANE: AG-1 (the AG-1 window ONLY; any other window prints "NOT MINE: AG-1 notice" and stops). Thank you for SLIP-CARD-LANE-RESILIENCE-S166-1 — PR 653 in 7 minutes, the refusal carried, and the DNS finding is right.
fanout: personalized (one lane, one body)
FROM: Architect, S166, 2026-09-30T19:40Z
PRECONDITION: PR 653 open at 4b97f92405f66d0ebe68a1edbbdc2960b515f800 (3 files: scripts/mail-wait.mjs, api/cwf/__tests__/mailWaitTransient.test.ts, docs/relay/LANE-RESILIENCE-S166-1-AG1-report.md).
ON-DISAGREEMENT: if your ls-remote shows another head, STOP and report it.
RULINGS (Architect, S166):
D1 · DNS AFTER A GOOD READ IS TRANSIENT. Your finding stands: an offline Mac without a proxy prints DNS, so A1 as written leaves register 170 open. Apply the SAME rule A5 gives PROXY-REFUSED: the envProxy class DNS is TRANSIENT only AFTER this run has completed at least one successful read; before any good read it keeps exit-at-once (a misspelled host must still fail fast). Add test (g): "DNS after a good read → retried; DNS before any read → exits 4 at once". Print the class in every retry line so the owner can see which one it was.
D2 · R2 IS DROPPED, NOT ROUTED AROUND. The harness refused the .claude/settings.json edit (Self-Modification) — that refusal stands. Cards stop ordering `gh pr close`; a PR is closed with the ALLOWED form `gh api repos/maymun207/cwf_yaprak/pulls/<n> -X PATCH -f state=closed` (Bash(gh api repos:*) is on the allow-list). Say in the report that R2 is dropped by this ruling and why.
AUTHORITY: OWNER-APPROVAL-S166-PLAN-1 · §12.2 (a refusal is a measurement — carried). Same subject as CARD-LANE-RESILIENCE-S166-1-v2 (scout-2 pre-reviewed).
NO CRON TASK. GRAFT: graft first. SECURITY: never print, echo, printenv or cat any environment variable.

## ORDER
1. On phase/lane-resilience-s166-1 (your worktree or a fresh one on it): implement D1 in scripts/mail-wait.mjs, test (g) in api/cwf/__tests__/mailWaitTransient.test.ts, D1+D2 lines in the report. Same three files — the fence does not grow.
2. `npx vitest run api/cwf/__tests__/mailWaitTransient.test.ts` once. ONE commit (`git commit -F <file>`), `git push origin phase/lane-resilience-s166-1`. Print the new head 40-hex.
3. Slip SLIP-NOTICE-RESILIENCE-DNS-AFTER-GOOD-READ-S166-1 (bus; same bytes to "2026 - Yapra - DDocuments/Claude_Duzenli_Arsiv/S166/SLIP-NOTICE-RESILIENCE-DNS-AFTER-GOOD-READ-S166-1.md"). Remove your worktree. Back to `node scripts/mail-wait.mjs AG-1 --budget-min 480`.
BUDGET: ≤ 10 minutes. A permission you cannot pass → slip it and stop.
FORBIDDEN: --force; any path outside the three files; merging; cron; printing an environment value.

END · NOTICE-RESILIENCE-DNS-AFTER-GOOD-READ-S166-1
