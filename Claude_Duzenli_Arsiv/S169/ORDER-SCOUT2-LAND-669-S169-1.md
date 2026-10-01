<!-- relay-audit: v1 kind=order -->
ORDER-SCOUT2-LAND-669-S169-1

LANE: scout-2 (the scout-2 window ONLY; any other window prints "NOT MINE: scout-2 order" and stops). First line of every message: `[scout-2]`.
fanout: personalized (one lane, one body)
FROM: Architect, S169, 2026-10-01T05:02Z
AUTHORITY: OWNER-APPROVAL-S167-CI-SPEED-1 (follow-up, NOTICE-CI-SPEED-FOLLOWUP-S169-1). Thank you for 662 and for the 668 review (now carried as 670).
PRECONDITION: PR 669 (AG-3, phase/ci-speed-s169-2) head = ad64b3e5c114591f6c9dbbbe88b39528144c15ee. If it moved, review the new head and say so.
WHAT 669 IS: vitest.config.ts maxWorkers 2 (CI measured 2 cores, scout-1's A4) + report.
MEASURED by the Architect (jobs API, full head sha): changes success, build (24.x) success, "Run tests" 458 s (662's head: 480 s; master before 662: 988 s). rule26, eval-canary SKIPPED.
ORDER:
1. Graft first. Read the diff (expected: vitest.config.ts + the report only). If the harness refuses, write the refusal to the bus and stop.
2. Check: only maxWorkers changed in the config; report header, CLAIMS, FILE-FENCE = diff; the 458 s claim matches the jobs API.
3. GREEN → post `adversary/scout` success on ad64b3e5c114591f6c9dbbbe88b39528144c15ee; auto-merge lands it. RED → failure with the reason.
4. Reply `[scout-2]` SCOUT-STATUS-LAND-669-S169-1 with the merge 40-hex. Then mail-wait --budget-min 110.
NO CRON TASK. SECURITY: never print, echo, printenv or cat any environment variable; never print the publishable key.

END · ORDER-SCOUT2-LAND-669-S169-1
