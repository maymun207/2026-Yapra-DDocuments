<!-- relay-audit: v1 kind=notice -->
NOTICE-ORDER3-LANE-PASSWORD-ROTATION-S161-1

LANE: AG-4 (fresh window; one card per window)
fanout: personalized (one lane, one body)
FROM: Architect, S161, 2026-09-27T23:42Z (bridge clock)
STARTS: ORDER 3 of CARD-LANE-PASSWORD-ROTATION-S157-1-v2 (Claude_Duzenli_Arsiv/S157/, ORDERS 0-2 done by AG-4 in S157: SLIP-LANE-PASSWORD-ROTATION-S157-1, bus row d5e302ee-59b5-4f2e-ba8b-2eed58d7e52b, 2026-09-23T05:49:43Z). This notice is the "separate Architect notice" that card names; it carries the ALTER's UTC time.
AUTHORITY: OWNER-APPROVAL-S157-BUDGET-AND-ROTATION-1 (2026-09-23 07:04 TSI) · OWNER-APPROVAL-S161-PLAN-1 ("onay S161 planı", 2026-09-28 02:37 TSI, plan step P1) · OWNER-APPROVAL-S154-LANE-ROLE-ROTATION-1.
NO POLL OR CRON TASK. FORBIDDEN: printing the password, the connection string, the verifier, or any line of any env or profile file; launchctl setenv; git add of any file holding them; any repo change; any retry beyond what 3a/3b allow.

THE ALTER HAPPENED. Operator reply relayed by the owner (2026-09-28 02:39 TSI), four lines: `2026-09-27 23:38:13 UTC` · `cb5b71a73f93` · `shape ok` · `0` (terminated sessions). ALTER-AT = 2026-09-27T23:38:13Z. The verifier prefix equals the one your S157 slip named.
QUIESCE (ORDER 2.5): Architect measured pg_stat_activity usename='cwf_lane' = 0 at 2026-09-27T23:30:05Z, no to_lane order outstanding, and the owner closed every lane and scout window except yours before the ALTER.

DELIVERY, and why this notice reaches you by OWNER PASTE and not by mail-wait: your window's process.env still carries the OLD value; a mail-wait --read now would be a failed auth against the pooler breaker and count against the 3a/3b budget. Do NOT read the bus. The same row is inserted on the bus for the record only.
STAGED FILES (your S157 slip): ~/.cwf_lane_S157_dsn (mode 600, DIGEST 7daa7d999500) and ~/.cwf_lane_S157_scram_verifier (mode 600, sha256-12 cb5b71a73f93). If either is ABSENT (lstat): STOP and print ABSENT — the Architect re-plans (a new ORDER 1 under a new card); no substitute value, no generation now.
PRECONDITION: `date -u` is later than ALTER-AT + 15 s (it is: you read this minutes after). ~/.zshenv is not a symlink (3c checks).

ORDERS — run 3a, 3b, 3c, 3d exactly as CARD-LANE-PASSWORD-ROTATION-S157-1-v2 ORDER 3 states them, with ALTER-AT = 2026-09-27T23:38:13Z:
3a. New value from the staged DSN file: laneExec('select current_user') bound to { env: { CWF_LANE_DATABASE_URL: <staged file> } } → CONNECTED only on row 'cwf_lane'. One 28P01 → wait 15 s, one retry. Second failure or any non-28P01 → STOP with the SQLSTATE (3e0 state).
3b. ≥ 60 s after ALTER-AT (already true): ONE attempt with the OLD value (process.env); print its DIGEST (must be 4a5b3513d841, the pre-rotation digest of your S157 slip, and must differ from 7daa7d999500). REVOKED only on 28P01. CONNECT → wait 60 s, one retry; second CONNECT → STOP.
3c. After REVOKED: rewrite the ONE export line in ~/.zshenv via temp file + rename keeping mode; print old and new DIGESTS of the export line (old must be 4a5b3513d841); print `launchctl getenv` DIGEST (must be UNSET). No launchctl setenv.
3d. Wait ≥ 120 s after the last failed auth. Post SLIP-LANE-PASSWORD-ROTATION-S157-1-ORDER3 (name kept from the card; add `session: S161` inside) with exec bound to the staged value; if the sandbox refuses the pooler (F-S160-LANE-SANDBOX-DNS-BLOCKS-BUS-WRITE-1, getaddrinfo ENOTFOUND — known, register 113) print the slip in your window instead — the owner relays it. Then delete the two staged files and print ABSENT/PRESENT from lstat for both. The slip names the owner action: quit AntiGravity fully and relaunch from the Dock/Finder, not before 120 s after 3b.
3e0. Any STOP after this point: ~/.zshenv untouched, staged files kept, nothing retried, wait 120 s, print the state, the Architect rules.
SLIP FIELDS: card, branch (master), head (master tip — read from your clone's origin/master; no fetch needed), report (slip only), ci (UNMEASURED no repo change), status; then 3a result + failed-auth count, 3b DIGEST + REVOKED, 3c old/new DIGESTS + launchctl UNSET, lstat results, the owner action line. GRAFT line: not used (no repo code path; say so).
After the slip: STOP. Nothing else is run in this window.

END · NOTICE-ORDER3-LANE-PASSWORD-ROTATION-S161-1
