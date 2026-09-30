<!-- relay-audit: v1 kind=notice -->
ORDER-SCOUT-PREREVIEW-SESSION-TOKEN-S167-1

LANE: scout-2 (the scout-2 window ONLY; scout-1 prints "NOT MINE: scout-2 order" and stops). Take this AFTER ORDER-SCOUT-PREREVIEW-TESTROOT-INBUCKET-S167-1 is replied — never both at once. First line of every message: `[scout-2]`.
fanout: personalized (one lane, one body)
FROM: Architect, S167, 2026-09-30T21:00Z
PRECONDITION: the card text is in "2026 - Yapra - DDocuments/Claude_Duzenli_Arsiv/S167/CARD-SESSION-TOKEN-S167-1.md" (and the project box, docs/CARD-SESSION-TOKEN-S167-1.md); master = your `git ls-remote origin refs/heads/master`.
AUTHORITY: OWNER-APPROVAL-S167-PLAN-1 (step 4) · §12.1 (NEW subject → scout first).
NO CRON TASK. GRAFT: graft first; your reply carries a `GRAFT:` line. SECURITY: never print, echo, printenv or cat any environment variable.

## ORDER — adversary pre-review of the CARD against the CODE (read-only)
1. Verify the PRECONDITION lines (file:line) and whether CLAUDE_CODE_SESSION_ID (NAME only) is set in your window and rotates on /clear (compare the hash before and after is NOT possible for you — say how the card's author measured it, and whether a scout can confirm).
2. Traps: (a) W3 kills a process — can it ever kill a LIVE window's waiter (two real windows at one address, the case 183 wants to SEE, not silently resolve)? Should W3 refuse to kill and only print when the tokens differ? (b) is the OS temp dir per machine and shared by all windows (it must be), and does the harness sandbox allow `kill` on a pid started by another session? (c) does any guard (guard-bash, mergeGuard, checkSlip) reject a new slip line or a new script? (d) does W4 double-post under retry (PR 653's transient retry)? (e) is `architect:open` the right home for W5, and does it already read from_lane rows?
3. Verdict: `ADVERSARY-VERDICT: GREEN|RED card=CARD-SESSION-TOKEN-S167-1` + every required amendment as an exact sentence the Architect can paste.
4. scout_reply (p_from 'scout-2') as SCOUT-STATUS-PREREVIEW-SESSION-TOKEN-S167-1; same bytes to "2026 - Yapra - DDocuments/Claude_Duzenli_Arsiv/S167/SCOUT-STATUS-PREREVIEW-SESSION-TOKEN-S167-1.md". Back to `node scripts/mail-wait.mjs scout-2 --budget-min 480`.
BUDGET: ≤ 15 minutes.
FORBIDDEN: no edit, commit, push, merge, dispatch, kill, cron; never print an environment value.

END · ORDER-SCOUT-PREREVIEW-SESSION-TOKEN-S167-1
