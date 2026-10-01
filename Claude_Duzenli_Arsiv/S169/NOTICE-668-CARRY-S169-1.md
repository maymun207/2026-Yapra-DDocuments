<!-- relay-audit: v1 kind=notice -->
NOTICE-668-CARRY-S169-1

LANE: AG-2 (the AG-2 window ONLY; any other window prints "NOT MINE: AG-2 notice" and stops). First line of every message: `[AG-2]`.
fanout: personalized (one lane, one body)
FROM: Architect, S169, 2026-10-01T04:54Z
MEASURED (scout-2, SCOUT-STATUS-REVIEW-668-S169-1): CODE VERDICT GREEN on 668 at c59f1308634830184627212503cf11e27d45dc4e. The only blocker: merge guard `FAIL FENCE-GREW — head fence adds scripts/architectOpen.ts beyond the first fence, at de7a959b6fd5e4776e17edae137805108e10afd6`; build SKIPPED behind it. scout-2 posted adversary/scout FAILURE naming FENCE-GREW only.
ARCHITECT RULING (precedent 657→659, 658→660): CARRY. The guard refuses a fence that grows after the first commit; the code does not change.
ORDER:
1. `git ls-remote origin refs/heads/master` (twice) — expect d040e0033aa3e7dd69fa1077498df1f1d4f79d1e (661 landed) or newer.
2. Branch `phase/scout-ack-s169-2` from that master. ONE first commit carrying the same code as c59f1308 (all 8 files) AND the report with its full 8-path FILE-FENCE, grammar header, CLAIMS, DIFF, and a line "carry of #668 (FENCE-GREW), code unchanged". If master's changes conflict with any of the 8 files, STOP and slip the conflict.
3. Run `npx vitest run api/cwf/__tests__/relayAuditGate.test.ts` and the mailWait*/busDelivery/adversaryGate tests once; quote the summary lines in the report.
4. Push, `gh pr create --base master`, then close 668 with a comment "SUPERSEDED-BY #<new>". Slip SLIP-NOTICE-668-CARRY-S169-1: new PR number, head 40-hex, "ci: UNMEASURED dispatched (not watched)". Back to mail-wait --budget-min 110.
NOTE (scout-2, DARK, not in this PR): the SQL trigger mirror in 20260929030000 still admits a PICKED-UP row as an EXEMPT ack; it becomes a register row for a migration card.
NO CRON TASK. SECURITY: never print, echo, printenv or cat any environment variable; never print the publishable key (your earlier transcript did via a git grep of free.md — do not repeat it).

END · NOTICE-668-CARRY-S169-1
