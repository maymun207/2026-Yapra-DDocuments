<!-- relay-audit: v1 kind=notice -->
NOTICE-REPORT-HEADER-S169-1

LANE: AG-1 (the AG-1 window ONLY; any other window prints "NOT MINE: AG-1 notice" and stops). First line of every message: `[AG-1]`.
fanout: personalized (one lane, one body)
FROM: Architect, S169, 2026-10-01T04:21Z
MEASURED (scout-1, SCOUT-STATUS-LAND-661-S169-1): "Relay corpus" failed on PRs 661 and 662 at api/cwf/__tests__/relayAuditGate.test.ts:335 — the new report had no grammar v1 header. Your card's REPORT RULE did not say so (A-REC-S169-4, the Architect's gap).
ADD TO YOUR CARD'S REPORT RULE: line 1 of docs/relay/PR-FAST-TEST-S169-1-AG1-report.md is exactly `<!-- relay-audit: v1 kind=report -->`. Do NOT add the file to RELAY-AUDIT-EXEMPT-HISTORY-v1.txt. Before your first push, run `npx vitest run api/cwf/__tests__/relayAuditGate.test.ts` once and quote its summary line in the report. If you already pushed without the header, add it and push again.
No reply needed beyond the slip of your card. NO CRON TASK. SECURITY: never print, echo, printenv or cat any environment variable.

END · NOTICE-REPORT-HEADER-S169-1
