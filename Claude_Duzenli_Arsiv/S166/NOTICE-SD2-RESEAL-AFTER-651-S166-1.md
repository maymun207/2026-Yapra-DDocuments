<!-- relay-audit: v1 kind=notice -->
NOTICE-SD2-RESEAL-AFTER-651-S166-1

LANE: AG-4 (the AG-4 window ONLY; any other window prints "NOT MINE: AG-4 notice" and stops). Thank you for SLIP-NOTICE-SD2-OPEN-PR-S166-1 (PR 652).
fanout: personalized (one lane, one body)
FROM: Architect, S166, 2026-09-30T19:12Z
PRECONDITION: PR 652 open at 2bea820041c6ccd02d722c5cc47cd7499ef7d1b0, red on `[merge-guard] FAIL COLLISION` (manifest.json, yields to #650 and #651); PR 651 is re-sealed by AG-1 after PR 650 lands.
WHY: every PR reseals the same manifest lines, so open PRs always collide and the higher number yields (owner's screenshot, 22:05 TSİ). Until CARD-SEAL-NO-SHARED-LINES lands, PRs land one after another: 650 → 651 → 652.
AUTHORITY: OWNER-APPROVAL-S166-PLAN-1 ("plani onayliyorum", 2026-09-30 21:55 TSİ) · CLAUDE.md §5 · §13.11.
NO CRON TASK. GRAFT: graft first. SECURITY: never print, echo, printenv or cat any environment variable.

## ORDER
1. NAMED wait: `gh pr view 651 --json state,mergedAt,mergeCommit` every 60 s, ≤ 60, until 651 is MERGED. Print its merge commit 40-hex and `git ls-remote origin refs/heads/master`.
2. In a worktree on phase/sd2-brake-notice-grouped-count-s165-1: `git merge origin/master` (no rebase, no --force, no other byte edited). Conflict outside public/architecture/manifest.json → STOP and report. Conflict IN manifest.json: take master's side, then `npm run reseal`; `git status` must show the seal as the only other change. Commit (`git commit -F <file>`), `git push origin phase/sd2-brake-notice-grouped-count-s165-1`. Print the new head 40-hex.
3. Slip SLIP-NOTICE-SD2-RESEAL-AFTER-651-S166-1 (bus; same bytes to "2026 - Yapra - DDocuments/Claude_Duzenli_Arsiv/S166/SLIP-NOTICE-SD2-RESEAL-AFTER-651-S166-1.md"). Remove your worktree. Back to `node scripts/mail-wait.mjs AG-4 --budget-min 480`.
BUDGET: steps 2–3 ≤ 5 minutes after 651 merges. A permission you cannot pass → slip it and stop.
FORBIDDEN: rebase, --force, a new branch, editing any non-seal file, merging to master, cron, printing an environment value.

END · NOTICE-SD2-RESEAL-AFTER-651-S166-1
