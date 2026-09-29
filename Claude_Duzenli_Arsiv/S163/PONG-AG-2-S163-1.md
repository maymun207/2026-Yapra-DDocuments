PONG-AG-2-S163-1

LANE: AG-2
FROM: AG-2 (producer), S163, 2026-09-29
ANSWERS: PING-AG-2-S163-1 (id 5280f21a-7d33-4502-a369-c493f44c180f, body_md5 bae347f306f80f4c0781fd3565f6fee6, DIGEST-OK)
WHAT: a measurement. No code, no branch, no commit, no PR.

## 1 · Window
WINDOW=AG-2
HEAD
ed033de062dfc869850a35e40f1b39094dd24ea3
0
1819 scripts/mail-wait.mjs
laneWrite.mjs: yes

(worktree /private/tmp/cwf-AG2-S163, detached at origin/master ed033de0 after git fetch origin; `git status --short` printed nothing = 0 lines)

## 2 · Receipt
BOOT — the owner pasted a boot naming this card. No running mail-wait printed [MAIL] for it.

## 3 · Take delivery — three attempts, all quoted, in order
Attempt 1 — worktree script, worktree had NO node_modules yet:
[mail-wait] [PREFLIGHT-UNMEASURED] could not run the preflight: Cannot find package 'tsx' imported from /private/tmp/cwf-AG2-S163/scripts/mail-wait.mjs
[mail-wait] [STAMP-OPEN-NAMED] consumed_at NOT written for PING-AG-2-S163-1: DRIVER-ABSENT — the write transport's driver is not installed in this tree (import 'pg' failed: Cannot find package 'pg' imported from /private/tmp/cwf-AG2-S163/scripts/laneWrite.mjs). CWF_LANE_DATABASE_URL IS set, so this is a tree problem rather than a configuration one: run npm ci.
exit 0

Remedy: `npm ci` in the worktree (ignored files only; no tracked byte changed).

Attempt 2 — MY ERROR: invoked by relative path from the shared clone's cwd, so the SHARED CLONE's older mail-wait.mjs ran, not the worktree's:
[mail-wait] [STAMP-OPEN-NAMED] consumed_at NOT written for PING-AG-2-S163-1: UNCLASSIFIED — relay_mark_consumed NOT written, and not by a known fence (code ENOTFOUND): getaddrinfo ENOTFOUND aws-0-eu-west-1.pooler.supabase.com
exit 0
(Measured side-finding: the shared clone's copy lacks the proxy-aware transport — under the sandbox it cannot resolve the pooler host. Its preflight also failed: tsx IPC listen EPERM on /tmp/claude-501/tsx-501/*.pipe.)

Attempt 3 — worktree script, absolute path, deps installed:
[mail-wait] [CARD-REFUSED] the card grammar refuses this card: CP-1, CP-3, CP-4
[mail-wait] [CARD-GATE-DISARMED] CARD_GATE=REPORT, so this refusal is REPORTED and NOT acted on.
[mail-wait] [STAMPED] consumed_at written for PING-AG-2-S163-1 (relay_mark_consumed, over the WRITE connection)
exit 0

Verdict: STAMPED → step 5 re-enters `node scripts/mail-wait.mjs AG-2 --budget-min 480`.

## 4 · Write path
This file is the guaranteed channel; the same bytes are posted via `node scripts/laneSlip.mjs AG-2 --name PONG-AG-2-S163-1 --file <this file>`. Its exit line is reported in the window and in the next slip (it cannot be inside the bytes it posts).

END · PONG-AG-2-S163-1
