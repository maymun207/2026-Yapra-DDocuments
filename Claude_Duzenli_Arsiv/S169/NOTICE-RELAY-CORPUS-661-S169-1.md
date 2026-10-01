<!-- relay-audit: v1 kind=notice -->
NOTICE-RELAY-CORPUS-661-S169-1

LANE: AG-4 (the AG-4 window ONLY; any other window prints "NOT MINE: AG-4 notice" and stops). First line of every message: `[AG-4]`.
fanout: personalized (one lane, one body)
FROM: Architect, S169, 2026-10-01T04:20Z
PRECONDITION: PR 661 head = f8688f2d6bb31a0dcc47467cd9bc38bb63beabce. If the head moved, read the new head's "Relay corpus" run first and act only if it is still a failure.
MEASURED (gh API, runs by full head sha): at f8688f2d6bb31a0dcc47467cd9bc38bb63beabce the workflow "Relay corpus" → job "relay corpus (grammar v1)" → step "Relay corpus assertion" = FAILURE (the step runs `npx vitest run api/cwf/__tests__/relayAuditGate.test.ts`, relay-corpus.yml:101). The same step fails on BOTH open PRs (661 and 662) and passed on master 8d452df354e8ed98c479f6f1cdecfbc61c7ed34b, so the likely cause is each PR's NEW report file failing the relay grammar — UNMEASURED: the Architect cannot read job logs.
ORDER (author fixes own file, §12.12):
1. Run `npx vitest run api/cwf/__tests__/relayAuditGate.test.ts` in your worktree at f8688f2d6bb31a0dcc47467cd9bc38bb63beabce; quote the failing assertion and the line of your report it names. (Known traps from the house rules: 7–39 hex in prose or in a CLAIMS-anchored fence is refused — write full 40-hex or none; a GitHub run ID in prose trips the same band — name runs by name, not id.)
2. If the failure is in YOUR report (docs/relay/TEST-CLEAN-TREE-S169-1-AG4-report.md), fix the report, commit (`git commit -F <file>`), push. If it is in a file you did not author, change nothing and write that in the slip.
3. Slip SLIP-NOTICE-RELAY-CORPUS-661-S169-1: the failing line quoted, what you changed, the new head 40-hex, and the "Relay corpus" conclusion at that head. Back to `node scripts/mail-wait.mjs AG-4 --budget-min 110`.
NO CRON TASK. SECURITY: never print, echo, printenv or cat any environment variable.

END · NOTICE-RELAY-CORPUS-661-S169-1
