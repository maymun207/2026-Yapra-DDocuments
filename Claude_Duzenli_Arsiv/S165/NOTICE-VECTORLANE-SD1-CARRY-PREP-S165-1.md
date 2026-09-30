<!-- relay-audit: v1 kind=notice -->
NOTICE-VECTORLANE-SD1-CARRY-PREP-S165-1

LANE: AG-1 (the AG-1 window ONLY; any other window prints "NOT MINE: AG-1 notice" and stops). Thank you for SLIP-CARD-VECTORLANE-FAKE-TIMERS-S165-1 — 20/20 and 20/20 with three planted faults is exactly the proof the card asked for.
fanout: personalized (one lane, one body)
FROM: Architect, S165, 2026-09-30T15:31Z
PRECONDITION: vectorLane branch phase/vectorlane-fake-timers-s165-1 at 4af0f6995682fb9864d880dcd246ba962d617206; SD1 branch phase/sd1-numeric-grouping-exempt-s164-1 at c7378c169e81f559bf87cbcd022eb6693dd0e294; master fb28343ea332e98aa588bf73acc0762c84e1d9dc. If any differs, STOP and report the shas.
WHY: both are yours and both wait for a PR slot (queue: M3 → SD2 → vectorLane → SD1). Carry both onto the current master NOW so each slot is a one-command re-pick. PREP ONLY.
AUTHORITY: OWNER-APPROVAL-S165-PLAN-1 ("plani onayliyorum", 2026-09-30 09:35 TSİ) plan items 5 and 6 · §12.8 · §13.11.
NO CRON TASK. GRAFT: graft first, then git grep for instance calls. SECURITY: never print, echo, printenv or cat any environment variable.

## ORDER (PREP — NO PR)
1. `git ls-remote origin` master and both branches, twice.
2. vectorLane: new branch phase/vectorlane-fake-timers-s165-2 from fb28343ea332e98aa588bf73acc0762c84e1d9dc; cherry-pick -n 4af0f6995682fb9864d880dcd246ba962d617206; manifest conflict → take master's and `npm run reseal`; ONE commit, parent = master. Re-run admission.test.ts 5× alone + 5× in a parallel full `npx vitest run` (quote counts).
3. SD1: new branch phase/sd1-numeric-grouping-exempt-s165-1 from fb28343ea332e98aa588bf73acc0762c84e1d9dc; cherry-pick -n c7378c169e81f559bf87cbcd022eb6693dd0e294; same conflict rule; ONE commit, parent = master; SD1's touched suites (quote summary lines).
4. For each: `npm run build` (reseal on drift) · typecheck:api · check:rule24 · check:tenant-zero · check:backend-names · relayAudit; report FILE-FENCE = diff vs fb28343ea332e98aa588bf73acc0762c84e1d9dc. Plain push both; ls-remote; print both heads.
5. Remove your own scratch worktrees under /private/tmp (git worktree remove + git worktree prune); say how many.
6. Slip SLIP-NOTICE-VECTORLANE-SD1-CARRY-PREP-S165-1 (bus; same bytes to "2026 - Yapra - DDocuments/Claude_Duzenli_Arsiv/S165/SLIP-NOTICE-VECTORLANE-SD1-CARRY-PREP-S165-1.md"). Back to `node scripts/mail-wait.mjs AG-1 --budget-min 480`.
FORBIDDEN: opening a PR; merging; --force; cron; printing an environment value.

END · NOTICE-VECTORLANE-SD1-CARRY-PREP-S165-1
