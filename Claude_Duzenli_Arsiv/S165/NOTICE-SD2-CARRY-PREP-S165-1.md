<!-- relay-audit: v1 kind=notice -->
NOTICE-SD2-CARRY-PREP-S165-1

LANE: AG-4 (the AG-4 window ONLY; any other window prints "NOT MINE: AG-4 notice" and stops). Thank you for SLIP-NOTICE-SD2-DELTA1-S165-1 — SD2 is next after M3.
fanout: personalized (one lane, one body)
FROM: Architect, S165, 2026-09-30T15:31Z
PRECONDITION: SD2 branch phase/sd2-brake-notice-grouped-count-s164-2 at 31e7cae39509ea771fb3e39217bac81ed56c3319; master fb28343ea332e98aa588bf73acc0762c84e1d9dc (PR 648 merged 14:40:08Z); PR 649 (M3) OPEN. If any differs, STOP and report the shas.
WHY: the one-PR queue is M3 (PR 649, fixing a CI race now) → SD2 → vectorLane → SD1. Carrying SD2 onto the current master NOW turns its slot into a one-command re-pick. PREP ONLY.
AUTHORITY: OWNER-APPROVAL-S165-PLAN-1 ("plani onayliyorum", 2026-09-30 09:35 TSİ) plan item 4 · §12.8 · §13.11.
NO CRON TASK. GRAFT: graft first, then git grep for instance calls. SECURITY: never print, echo, printenv or cat any environment variable.

## ORDER (PREP — NO PR)
1. `git ls-remote origin` master and the SD2 branch, twice.
2. New branch phase/sd2-brake-notice-grouped-count-s165-1 from fb28343ea332e98aa588bf73acc0762c84e1d9dc; cherry-pick -n every SD2 commit (merge-base..31e7cae39509ea771fb3e39217bac81ed56c3319); manifest/generated conflicts → take master's and `npm run reseal`; ONE commit (git commit -F <file>), parent = master.
3. GATES: `npm run build` (reseal on drift) · typecheck:api · check:rule24 · check:tenant-zero · check:backend-names · relayAudit · burstGuardReporting + perToolCapCount + every suite that imports burstBrakeMessage; quote summary lines. Report FILE-FENCE = diff vs fb28343ea332e98aa588bf73acc0762c84e1d9dc (one `FILE-FENCE:` line + `- <path>` lines).
4. Plain push; ls-remote; print the head. Remove your own scratch worktrees under /private/tmp (git worktree remove + git worktree prune); say how many.
5. Slip SLIP-NOTICE-SD2-CARRY-PREP-S165-1 (bus; same bytes to "2026 - Yapra - DDocuments/Claude_Duzenli_Arsiv/S165/SLIP-NOTICE-SD2-CARRY-PREP-S165-1.md"). Back to `node scripts/mail-wait.mjs AG-4 --budget-min 480`.
FORBIDDEN: opening a PR; merging; --force; cron; printing an environment value.

END · NOTICE-SD2-CARRY-PREP-S165-1
