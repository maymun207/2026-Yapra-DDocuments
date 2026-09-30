<!-- relay-audit: v1 kind=notice -->
NOTICE-VECTORLANE-RESEAL-AFTER-650-S166-1

LANE: AG-1 (the AG-1 window ONLY; any other window prints "NOT MINE: AG-1 notice" and stops). Thank you for SLIP-NOTICE-VECTORLANE-OPEN-PR-S166-1 (PR 651 in 78 s).
fanout: personalized (one lane, one body)
FROM: Architect, S166, 2026-09-30T19:12Z
PRECONDITION: PR 651 open at 68224cda2649237989afc37f3dfaba109eebb180; PR 650 (M3) open and landing; master fb28343ea332e98aa588bf73acc0762c84e1d9dc.
WHY: Build and Test on PR 652 failed `[merge-guard] FAIL COLLISION — YIELDED-TO #650 / #651: overlap on public/architecture/manifest.json` (owner's screenshot, 22:05 TSİ). Every PR reseals the same manifest lines (per-tab lastSyncedCommit + mappedContentSha), so every open PR collides with every other; the higher number yields. The Architect's plan v2 said "disjoint PRs land in parallel" without reading the fences — the seal makes NO two code PRs disjoint. Until the seal is fixed (CARD-SEAL-NO-SHARED-LINES, next), PRs land ONE AFTER ANOTHER, each re-sealed on the new master.
AUTHORITY: OWNER-APPROVAL-S166-PLAN-1 ("plani onayliyorum", 2026-09-30 21:55 TSİ) · CLAUDE.md §5 (merge origin/master + reseal in the same commit) · §13.11.
NO CRON TASK. GRAFT: graft first. SECURITY: never print, echo, printenv or cat any environment variable.

## ORDER
1. NAMED wait: `git ls-remote origin refs/heads/master` every 60 s, ≤ 30, until master ≠ fb28343ea332e98aa588bf73acc0762c84e1d9dc (PR 650 landed). Print the new master 40-hex.
2. In a worktree on phase/vectorlane-fake-timers-s165-2: `git merge origin/master` (no rebase, no --force, not one byte of any other file edited). Conflict outside public/architecture/manifest.json → STOP and report. A conflict IN manifest.json: take master's side, then `npm run reseal`; `git status` must show the seal as the only other change. Commit (`git commit -F <file>`), `git push origin phase/vectorlane-fake-timers-s165-2`. Print the new head 40-hex.
3. Slip SLIP-NOTICE-VECTORLANE-RESEAL-AFTER-650-S166-1 (bus; same bytes to "2026 - Yapra - DDocuments/Claude_Duzenli_Arsiv/S166/SLIP-NOTICE-VECTORLANE-RESEAL-AFTER-650-S166-1.md"): new master, new head, reseal digests. Remove your worktree. Back to `node scripts/mail-wait.mjs AG-1 --budget-min 480`.
BUDGET: steps 2–3 ≤ 5 minutes after master moves. A permission you cannot pass → slip it and stop.
FORBIDDEN: rebase, --force, a new branch, editing any non-seal file, merging to master, cron, printing an environment value.

END · NOTICE-VECTORLANE-RESEAL-AFTER-650-S166-1
