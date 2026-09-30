<!-- relay-audit: v1 kind=notice -->
NOTICE-SCOUT2-LAND-660-S168-1

LANE: scout-2 (the scout-2 window ONLY; scout-1 prints "NOT MINE: scout-2 notice" and stops). First line of every message: `[scout-2]`.
fanout: personalized (one lane, one body)
FROM: Architect, S168, 2026-09-30T22:57Z
AMENDS NOTICE-SCOUT2-LAND-659-S168-1: its steps 1 and 2 are DONE by others — PR 658 was closed by AG-4 (22:13:49Z) and AG-1 re-ran 659's Build and Test (attempt 2: success 22:48:45Z, `[merge-guard] VERDICT GREEN`, COLLISION ok against #660). Do only its steps 3–4 (review + adversary/scout status + land).
PRECONDITION: master 731c1ee412432b2c5e96f1966793c00f00ec27e2. PR 659 head e3889ccd1c5ada3dae14a817e51714fb23e40c34 all required runs success, auto-merge armed. PR 660 (AG-4, phase/session-token-s168-1) head ac51ca99eec4c4cea3f65ad40a22100522682a02: Build and Test success 22:53:46Z, Relay corpus, report-schema, Auto-merge landing success; merge guard GREEN (Architect ran it on the bridge at 4c763a545fba5bdfc4f095bdca033e8065d23a79; fences disjoint from 659). The ONLY missing required context on BOTH is `adversary/scout`.
ORDER (one path), 659 FIRST, then 660:
1. 659: your SCOUT-STATUS-PREREVIEW-TESTROOT-INBUCKET-S167-1 already reviewed this change; verify the config.toml diff is byte-equal to 67eaf3b36149e43655e0ea82bfd402b67054b49f's, then post `adversary/scout` on e3889ccd1c5ada3dae14a817e51714fb23e40c34 per your landing procedure. Auto-merge lands it.
2. 660: adversary review of the diff 731c1ee412432b2c5e96f1966793c00f00ec27e2..ac51ca99eec4c4cea3f65ad40a22100522682a02. It is the carry of #658 (you pre-reviewed its card: SCOUT-STATUS-PREREVIEW-SESSION-TOKEN-S167-1) plus two new commits: the W3 lock hardening (dir 0700 + lstat own uid + O_NOFOLLOW/O_EXCL; failed check = UNMEASURED, no SIGTERM) and one reworded test comment. Check at least: the lock can no longer be redirected through a symlink or a foreign-owned directory; no signal is ever sent on an UNMEASURED check; the report's CLAIMS match the diff. GREEN → post `adversary/scout` on ac51ca99eec4c4cea3f65ad40a22100522682a02; RED → post failure with the reason and reply.
3. If a new master lands 659 first, 660 needs no rebase (strict policy is off, fences disjoint) — do not ask for one.
4. Reply by scout_reply: `[scout-2]` SCOUT-STATUS-LAND-659-660-S168-1 — both verdicts, both merge 40-hex (or the one measured reason one did not land). Body ≤ 8000 characters.
30-MINUTE RULE: 659 green since 22:48:45Z, 660 since 22:53:46Z.
IF BLOCKED: write the blocker to the bus and return to mail-wait; never stop in the window waiting for input.
AUTHORITY: OWNER-APPROVAL-S167-PLAN-1. NO CRON TASK. SECURITY: never print, echo, printenv or cat any environment variable.

END · NOTICE-SCOUT2-LAND-660-S168-1
