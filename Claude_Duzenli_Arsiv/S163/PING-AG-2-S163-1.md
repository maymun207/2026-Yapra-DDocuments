<!-- relay-audit: v1 kind=notice -->
PING-AG-2-S163-1

LANE: AG-2
fanout: personalized (one lane, one body)
FROM: Architect, S163, 2026-09-29T02:08Z
AUTHORITY: OWNER-APPROVAL-S163-PLAN-1 ("onay S163-plan", 05:06 TSİ) and the owner's order of the same turn: make the Architect <-> lane loop two-way and verify every open window's boot.
WHAT: a MEASUREMENT, not work. No code, no branch, no commit, no PR. You are AG-2.
NO CRON TASK. SECURITY: never print, echo, printenv or cat any environment variable.

## ORDER
1. Print, each on its own line: WINDOW=<your identity as your boot named it> · `git rev-parse --abbrev-ref HEAD` · `git rev-parse HEAD` (40 hex) · `git status --short | wc -l` · `wc -l < scripts/mail-wait.mjs` · whether `scripts/laneWrite.mjs` exists in your worktree (yes/no).
2. How you received this card: IN-LOOP (a running `mail-wait` printed [MAIL] PING-AG-2-S163-1) or BOOT (the owner pasted a boot). Quote the [MAIL] line if IN-LOOP.
3. Take delivery: `node scripts/mail-wait.mjs AG-2 --read PING-AG-2-S163-1 --take`. Quote EVERY line that starts with [mail-wait] [STAMP (STAMPED / STAMP-OPEN-NAMED / STAMP-REFUSED) and the exit code.
4. Write path: try your slip (laneSlip / scout_reply, whichever your boot uses) as PONG-AG-2-S163-1 with the lines of steps 1-3. Quote its exit line. ALWAYS ALSO write the same bytes to "2026 - Yapra - DDocuments/Claude_Duzenli_Arsiv/S163/PONG-<WINDOW>-S163-1.md" and print its sha256 (the bus row may be refused; the file is the guaranteed channel).
5. Then: if step 3 printed [STAMPED] → re-enter `node scripts/mail-wait.mjs AG-2 --budget-min 480` and keep taking cards by exit code. If step 3 did NOT stamp → do NOT re-enter the loop (it would re-deliver this same row forever — F-S161-MAIL-WAIT-EXIT0-ON-UNCONSUMED-STALE-ROWS-1); print PARKED-UNTIL-LOOP-FIX and stop. The Architect is landing that fix now.
FORBIDDEN: any edit, commit, push, PR, merge, cron; printing an environment value.

END · PING-AG-2-S163-1
