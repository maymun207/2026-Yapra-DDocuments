<!-- relay-audit: v1 kind=notice -->
NOTICE-SD2-DELTA1-S165-1

LANE: AG-4 (the AG-4 window ONLY; any other window prints "NOT MINE: AG-4 notice" and stops). Thank you for SLIP-NOTICE-MODEL-TEXT-INVENTORY-MEASURE-S165-1 (25 texts, the toolResult.ts:320 backend literal and the burstBrakeMessage TR-premise finding are recorded; the design card follows).
fanout: personalized (one lane, one body)
FROM: Architect, S165, 2026-09-30T07:44Z
PRECONDITION: branch phase/sd2-brake-notice-grouped-count-s164-2 on origin at 1ef841865dc786ea527331dc6adbaa6a441f5908. If it differs, STOP and report both shas.
WHY: scout-1 pre-reviewed SD2 (SCOUT-STATUS-PREREVIEW-SD2-S165-1): GREEN on everything — the D7 ruling included — except ONE word (Δ-1). Register 61 is literally the prose saying "hepsi / all"; card v2 D2 names both words; the head names only "tümü".
AUTHORITY: OWNER-APPROVAL-S165-PLAN-1 ("plani onayliyorum", 2026-09-30 09:35 TSİ) item 4 · scout-1 Δ-1.
NO CRON TASK. GRAFT: graft first. SECURITY: never print, echo, printenv or cat any environment variable.

## ORDER
1. ls-remote the branch twice; clean worktree at 1ef841865dc786ea527331dc6adbaa6a441f5908.
2. Δ-1 (paste-ready, scout-1): api/cwf/_lib/turn/burstBrakeMessage.ts:55
   from: + ` Yanıtında "tümü" deme; ${refusedCount} çağrının gönderilmediğini söyle.`
   to:   + ` Yanıtında "tümü" ya da "hepsi" deme; ${refusedCount} çağrının gönderilmediğini söyle.`
   and the two full-string pins in api/cwf/__tests__/burstGuardReporting.test.ts :160 and :163 get the same words (perToolCapCount.test.ts compares through the function and follows). Measure the line numbers yourself first; quote them.
3. Touched suites (burstGuardReporting, perToolCapCount) + typecheck:api + relayAudit; quote summaries. Fence unchanged (both files already in it) — confirm with the merge-base scripts/mergeGuard.mjs.
4. ONE new commit (git commit -F <file>); plain push; ls-remote; print the head. NO PR (the slot notice comes after M4a and M3).
5. Slip SLIP-NOTICE-SD2-DELTA1-S165-1 (bus; same bytes to "2026 - Yapra - DDocuments/Claude_Duzenli_Arsiv/S165/SLIP-NOTICE-SD2-DELTA1-S165-1.md"). Back to `node scripts/mail-wait.mjs AG-4 --budget-min 480`.
FORBIDDEN: any other change; opening a PR; --force; cron; printing an environment value.

END · NOTICE-SD2-DELTA1-S165-1
