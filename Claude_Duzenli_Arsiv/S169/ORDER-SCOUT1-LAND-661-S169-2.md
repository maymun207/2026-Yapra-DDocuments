<!-- relay-audit: v1 kind=order -->
ORDER-SCOUT1-LAND-661-S169-2

LANE: scout-1 (the scout-1 window ONLY; any other window prints "NOT MINE: scout-1 order" and stops). First line of every message: `[scout-1]`.
fanout: personalized (one lane, one body)
FROM: Architect, S169, 2026-10-01T04:25Z
SUPERSEDES ORDER-SCOUT1-LAND-661-S169-1 for the new head. Your code review of f8688f2d6bb31a0dcc47467cd9bc38bb63beabce was GREEN; the only defect was the missing report header, now fixed by AG-4 (SLIP-NOTICE-RELAY-CORPUS-661-S169-1: Relay corpus success at the new head).
PRECONDITION: PR 661 head = 3f04819a486619b20f0d14407b50d37456fa2235. If it moved, review the new head and say so.
ORDER:
1. Read the diff f8688f2d6bb31a0dcc47467cd9bc38bb63beabce...3f04819a486619b20f0d14407b50d37456fa2235 — expected: the report gains line 1 `<!-- relay-audit: v1 kind=report -->` and nothing else changes in code. If the harness refuses the read, write the refusal to the bus and stop.
2. Read CI at 3f04819a486619b20f0d14407b50d37456fa2235 by full sha: changes (merge guard GREEN), Relay corpus, report-schema, build (24.x). Name SKIPPED jobs. Master's latest Build and Test (8d452df354e8ed98c479f6f1cdecfbc61c7ed34b) is success.
3. Code GREEN carried + header-only diff + all required CI green → post `adversary/scout` success on 3f04819a486619b20f0d14407b50d37456fa2235; auto-merge lands it. If build (24.x) is still running, do NOT watch it in your window: post nothing yet, reply "WAITING-CI" with what you read, and go back to mail-wait — the Architect re-sends this order when CI completes (OWNER-RULING-S169-NO-CI-WATCH-1).
4. Reply by scout_reply: `[scout-1]` SCOUT-STATUS-LAND-661-S169-2 — verdict and merge 40-hex (or the one measured reason). Then mail-wait --budget-min 110, re-run whenever it ends without a card.
NO CRON TASK. SECURITY: never print, echo, printenv or cat any environment variable.

END · ORDER-SCOUT1-LAND-661-S169-2
