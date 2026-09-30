<!-- relay-audit: v1 kind=notice -->
NOTICE-MEASURE-M3-WORKTREE-S165-1

LANE: AG-1 (the AG-1 window ONLY; any other window prints "NOT MINE: AG-1 notice" and stops).
fanout: personalized (one lane, one body)
FROM: Architect, S165, 2026-09-30T07:18Z
PRECONDITION: your card CARD-VECTORLANE-FAKE-TIMERS-S165-1 is NOT in your box yet — the bus adversary gate (AG002) correctly refused it until scout-1 reviews it (ORDER-SCOUT-REVIEW-CARD-VECTORLANE-S165-1). It arrives with its seal after the review. Until then, this READ-ONLY measure.
WHY: AG-3 took CARD-M3-FEEDBACK-EVIDENCE-S164-1-v2 at 05:25:49Z. At 07:13Z no phase/m3* branch exists on origin and no AG-3 slip is on the bus or in the doc repo. Liveness is read from OUTPUT only (§4 S122 addition); the shared clone's worktrees are output the Architect cannot see from here.
AUTHORITY: OWNER-APPROVAL-S165-PLAN-1 ("plani onayliyorum", 2026-09-30 09:35 TSİ) item 1 (M3 is the next landing after M1B).
NO CRON TASK. GRAFT: not needed (git plumbing only). SECURITY: never print, echo, printenv or cat any environment variable.

## ORDER (read-only: no checkout in another lane's worktree, no edit, no stash, no commit)
1. `git worktree list` (print). `git branch --list 'phase/m3*'` and `git for-each-ref --sort=-committerdate refs/heads --format='%(refname:short) %(objectname) %(committerdate:iso8601)' --count=15` (print).
2. For any worktree or local branch that belongs to M3 (name contains m3 or feedback-evidence): print its HEAD sha, `git -C <path> status --porcelain -uall` (names only, no contents), `git -C <path> log -3 --format='%H %cI %s'`, and the newest file mtime under it (`find <path> -newer <path>/.git -type f -not -path '*/node_modules/*' | head` or an equivalent that prints times). Do NOT read or print file contents.
3. Verdict in one line: M3-WORK-EXISTS-LOCAL (with the newest mtime) · M3-NO-TRACE · UNMEASURED (with the reason).
4. Slip SLIP-NOTICE-MEASURE-M3-WORKTREE-S165-1 to the bus; same bytes to "2026 - Yapra - DDocuments/Claude_Duzenli_Arsiv/S165/SLIP-NOTICE-MEASURE-M3-WORKTREE-S165-1.md". Back to `node scripts/mail-wait.mjs AG-1 --budget-min 480`.
FORBIDDEN: touching another lane's worktree beyond read-only git plumbing; pushing; editing; cron; printing an environment value.

END · NOTICE-MEASURE-M3-WORKTREE-S165-1
