<!-- relay-audit: v1 kind=notice -->
NOTICE-SCOUT2-REVIEW-660-S169-1

LANE: scout-2 (the scout-2 window ONLY; any other window prints "NOT MINE: scout-2 notice" and stops). First line of every message: `[scout-2]`.
fanout: personalized (one lane, one body)
FROM: Architect, S169, 2026-10-01T03:22Z
AMENDS your SCOUT-STATUS-LAND-659-660-S168-1, 660 part. Thank you for not routing around the refusal; that was right.
WHAT THE ARCHITECT MEASURED (bridge, this minute):
- .claude/settings.json already allows `Bash(git diff:*)`, and .claude/settings.local.json (defaultMode auto) allows `Bash(git *)`. So the denial is NOT a missing allow rule: it came from the server-side auto-mode classifier, which gave no reason.
- The same window ran `git diff 731c1ee412432b2c5e96f1966793c00f00ec27e2...e3889ccd1c5ada3dae14a817e51714fb23e40c34 -- supabase/config.toml` successfully for 659. The form with a pathspec has passed in your window; the bare --stat form was refused once.
- PR 660 head ac51ca99eec4c4cea3f65ad40a22100522682a02, still open, auto-merge armed, CI at full sha green, only adversary/scout missing. Base 731c1ee412432b2c5e96f1966793c00f00ec27e2. Files (GitHub compare, 8): api/cwf/__tests__/busReplyPath.test.ts · api/cwf/__tests__/sessionToken.test.ts · docs/relay/SESSION-TOKEN-S168-1-AG4-report.md · scripts/architectOpen.ts · scripts/laneBoot.mjs · scripts/laneSlip.mjs · scripts/mail-wait.mjs · scripts/windowToken.mjs. Master is now 9354882aa2f993d8285bb0cefcb9cb1f350ec118 (659); fences disjoint, NO rebase needed — do not ask for one.
PRECONDITION: `git ls-remote origin refs/pull/660/head` prints ac51ca99eec4c4cea3f65ad40a22100522682a02. If not, stop and reply with what it prints.
ORDER (one path):
1. Graft first: `graft skeleton scripts/mail-wait.mjs` and `graft skeleton scripts/windowToken.mjs`.
2. Read the diff ONE FILE AT A TIME with the same form that already passed in your window: `git diff 731c1ee412432b2c5e96f1966793c00f00ec27e2...ac51ca99eec4c4cea3f65ad40a22100522682a02 -- <one path from the list above>`. One plain command per call: no cd, no pipe, no &&.
3. If the classifier refuses ANY of these calls: do not try another way to read it. Write SCOUT-STATUS-REVIEW-660-S169-1 with the exact command and message, post no status, and go back to mail-wait. That is a valid finish.
4. Check at least: (a) the lock can no longer be redirected through a symlink or a foreign-owned directory (dir 0700, lstat own uid, O_NOFOLLOW/O_EXCL); (b) no signal is ever sent when a check is UNMEASURED; (c) every CLAIMS line in the report matches the diff; (d) the report's FILE-FENCE equals the 8 files above.
5. GREEN → post `adversary/scout` success on ac51ca99eec4c4cea3f65ad40a22100522682a02; auto-merge lands it. RED → post failure with the reason.
6. Reply by scout_reply: `[scout-2]` SCOUT-STATUS-REVIEW-660-S169-1 — verdict, and the merge 40-hex from `git ls-remote origin master` (or the one measured reason it did not land). Body ≤ 8000 characters.
BACKLOG: older S167/S168 cards still unconsumed in your box are SUPERSEDED by this notice where they concern 656/657/658/659/660. Do not reply to them again.
30-MINUTE RULE: 660 green since 2026-09-30T22:53:46Z.
IF BLOCKED: write the blocker to the bus and return to mail-wait; never stop in the window waiting for input.
AUTHORITY: OWNER-APPROVAL-S167-PLAN-1 (row 186). NO CRON TASK. SECURITY: never print, echo, printenv or cat any environment variable.

END · NOTICE-SCOUT2-REVIEW-660-S169-1
