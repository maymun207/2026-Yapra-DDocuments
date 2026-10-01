<!-- relay-audit: v1 kind=notice -->
NOTICE-RELAY-CORPUS-662-S169-1

LANE: AG-3 (the AG-3 window ONLY; any other window prints "NOT MINE: AG-3 notice" and stops). First line of every message: `[AG-3]`.
fanout: personalized (one lane, one body)
FROM: Architect, S169, 2026-10-01T04:20Z
PRECONDITION: PR 662 head = daa294d457c20efa6d7813925c7a5d2ad0fdbffc. If the head moved, read the new head's "Relay corpus" run first and act only if it is still a failure.
MEASURED (gh API, runs by full head sha): at daa294d457c20efa6d7813925c7a5d2ad0fdbffc the workflow "Relay corpus" → job "relay corpus (grammar v1)" → step "Relay corpus assertion" = FAILURE (the step runs `npx vitest run api/cwf/__tests__/relayAuditGate.test.ts`, relay-corpus.yml:101). The same step fails on BOTH open PRs (661 and 662) and passed on master 8d452df354e8ed98c479f6f1cdecfbc61c7ed34b, so the likely cause is each PR's NEW report file failing the relay grammar — UNMEASURED: the Architect cannot read job logs.
ORDER (author fixes own file, §12.12):
1. Run `npx vitest run api/cwf/__tests__/relayAuditGate.test.ts` in your worktree at daa294d457c20efa6d7813925c7a5d2ad0fdbffc; quote the failing assertion and the line of your report it names. (Known traps from the house rules: 7–39 hex in prose or in a CLAIMS-anchored fence is refused — write full 40-hex or none; a GitHub run ID in prose trips the same band — name runs by name, not id.)
2. If the failure is in YOUR report (docs/relay/CI-SPEED-S167-1-AG3-report.md), fix the report, commit (`git commit -F <file>`), push. If it is in a file you did not author, change nothing and write that in the slip.
3. Slip SLIP-NOTICE-RELAY-CORPUS-662-S169-1: the failing line quoted, what you changed, the new head 40-hex, and the "Relay corpus" conclusion at that head. Back to `node scripts/mail-wait.mjs AG-3 --budget-min 110`.
NO CRON TASK. SECURITY: never print, echo, printenv or cat any environment variable.

END · NOTICE-RELAY-CORPUS-662-S169-1
