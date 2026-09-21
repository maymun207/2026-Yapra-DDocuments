<!-- relay-audit: v1 kind=notice -->
ORDER-SCOUT-REVIEW-CARD-LANE-PASSWORD-ROTATION-S153-1-v1

LANE: scout (the first scout window that finishes its landing order)
fanout: personalized (one lane, one body)
FROM: Architect, S153, bus clock about 2026-09-21T22:15Z
OWNER APPROVAL: item 46, "lane şifre onay", due 2026-09-22; OWNER-APPROVAL-S152-LANDINGS-1.
NO POLL OR CRON TASK. When your status is written, stop.
GATE-NOTE: written with a STEPS section.
GRAFT: take code context from graft first; your status carries a GRAFT line.
WHAT: adversarial review of CARD-LANE-PASSWORD-ROTATION-S153-1-v1, a NEW subject. Card body = the bytes after the BEGIN marker line up to and including the final newline before the END marker line; sha256 = 70b887356e312278941b41d6f6c9c79b361275ff5fbe536f442e45138f182120.

## PREMISE
MEASURED: 2026-09-21T22:15Z, Architect bridge, sha256 of the card body as written above.
UNMEASURED: everything the card itself marks UNMEASURED; your review is the first lens on it.
SELF-INVALIDATION: dies if a v2 of the card is posted.
ON-DISAGREEMENT: your reading wins; print both.

## STEPS
1. Run the repository card gate on the card bytes; print any refusal verbatim.
2. Attack from PRIMARY sources: (a) scripts/laneWrite.mjs and envPresence.ts: is ONE variable really the only path, and does ORDER 3's read-only proof actually authenticate as cwf_lane? (b) Postgres/Supabase: is a SCRAM verifier accepted verbatim by ALTER ROLE ... PASSWORD on this project (password_encryption, the pooler in front, supavisor's own auth cache); could the pooler keep accepting the OLD password or refuse the new one for a while? (c) Which windows break at the ALTER moment and for how long; does the card name every one? (d) Is there any step where the password or the string could reach a transcript, a commit, or a tool output? (e) Anything already built for rotation (12.6)?
3. Verdict: first line `ADVERSARY-VERDICT: GREEN|RED card=CARD-LANE-PASSWORD-ROTATION-S153-1-v1 sha256=<sha256>`, then each defect by file:line with the change that makes it GREEN, and which may ride as edits.
REPLY (on the bus): SCOUT-STATUS-REVIEW-CARD-LANE-PASSWORD-ROTATION-S153-1-v1. If the bus write is refused (register item 17), print the whole status in your window.
FORBIDDEN: read-only. No status post on any PR, no edit, no poll task, no cron. Never print an environment value.

=== BEGIN CARD ===
<!-- relay-audit: v1 kind=card -->
CARD-LANE-PASSWORD-ROTATION-S153-1-v1

LANE: AG-4
fanout: personalized (one lane, one body)
MEASURED-AT: 2026-09-21T22:15Z (bus clock)
OWNER APPROVAL: "lane şifre onay" (S150, item 46, due 2026-09-22) and OWNER-APPROVAL-S152-LANDINGS-1 (item 46 named). Design amended by F-S151-ITEM46-DESIGN-CONTRADICTS-OPERATOR-ONLY-DB-1 and the owner's rule "supabase DB ye CWF tablolari icin sadece gemini operator yaziyor": the ALTER ROLE is run by the Gemini operator, not by the Architect and not by a lane.
ADVERSARY GATE: NEW SUBJECT. Goes to the scout first (12.1); reaches AG-4 only with a GREEN verdict row.
ORIGIN: F-S150-LANE-PRINTED-DB-URL-1 — a lane printed the cwf_lane connection string into a transcript; a transcript is a publication, so the password is treated as disclosed and is rotated.
BRANCH: none (no repo file changes) · PUSH: no · REPORT: the slip only · PR: no.
SEQUENCING: take this card only AFTER PR 591 and PR 592 have landed or been ruled on; the rotation briefly breaks lane writes and must not collide with a landing.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| one environment variable carries the lane connection string | MEASURED: git grep on origin/master, bridge, 2026-09-21T22:10Z | dsnvar |
| the shared clone's .env.local does not name it | MEASURED: grep -c on .env.local, bridge, 2026-09-21T22:10Z | envlocal |

```evidence:dsnvar
origin/master:scripts/laneWrite.mjs:54:export const LANE_DSN_ENV = 'CWF_LANE_DATABASE_URL';
origin/master:scripts/laneWrite.mjs:145:export function resolveLaneDsn(env = process.env) {
```

```evidence:envlocal
grep -c CWF_LANE_DATABASE_URL .env.local -> 0
```

## PREMISE
MEASURED: 2026-09-21T22:10Z, bridge, git grep on origin/master: the lane write path reads the connection string from ONE environment variable, CWF_LANE_DATABASE_URL (scripts/laneWrite.mjs LANE_DSN_ENV, resolveLaneDsn(process.env)); presence is asked only with `npm run env:presence -- CWF_LANE_DATABASE_URL`.
MEASURED: 2026-09-21T22:10Z, bridge, grep -c on the shared clone's .env.local -> 0 lines name CWF_LANE_DATABASE_URL; so the variable reaches the lane windows from somewhere else.
UNMEASURED: WHERE the variable is set (shell profile, AntiGravity launch environment, another file), and WHICH windows read it (AG-1, AG-2, AG-4, both scout windows). ORDER 0 measures both; the rotation depends on the answer.
UNMEASURED: whether a running Claude Code tab picks up a changed value without a restart (it very likely does not: process env is fixed at spawn).
SELF-INVALIDATION: dies if the cwf_lane role no longer exists or if the owner withdraws the approval.
ON-DISAGREEMENT: if any value above differs from your reading, YOUR READING WINS: print both, and STOP before ORDER 2 if the difference touches where the secret lives.

## FALSIFIER
If ORDER 0 finds the variable set in more than one place, or in a place a lane cannot write without the owner (for example the macOS launch environment of the AntiGravity app), STOP after ORDER 0 and report the places by NAME (never the value). The Architect then re-plans; no half rotation.

## ORDERS
ORDER 0 - MEASURE, NO CHANGE. Print `npm run env:presence -- CWF_LANE_DATABASE_URL` in your window. Find where the value is defined by NAME ONLY: grep for the variable NAME in the shell profile files of the user and in any env file the AntiGravity launch reads; print file paths and line numbers, never the line. Say which windows inherit it and whether they need a restart to see a change.
ORDER 1 - GENERATE, LOCALLY. Generate a 32-byte random password (node crypto.randomBytes, base64url). Compute its SCRAM-SHA-256 verifier with node crypto only (salt 16 random bytes, 4096 iterations, PBKDF2-HMAC-SHA-256; StoredKey = SHA-256(HMAC(SaltedPassword, "Client Key")); ServerKey = HMAC(SaltedPassword, "Server Key"); format `SCRAM-SHA-256$4096:<salt b64>$<StoredKey b64>:<ServerKey b64>`). Prove the verifier function against the worked example in the SCRAM-SHA-256 RFC before using it. Write the NEW full connection string (same host, port, user, database and options as the old one; only the password changes) to a file OUTSIDE every repository, mode 600, next to where ORDER 0 found the old one. Print nothing of it.
ORDER 2 - POST ONLY THE VERIFIER. Your slip SLIP-LANE-PASSWORD-ROTATION-S153-1 carries the verifier string (it is not the password and cannot be reversed to it), the file path of the staged new string, and ORDER 0's answers. Stop. The Architect then hands the verifier to the Gemini operator, who runs ALTER ROLE cwf_lane PASSWORD '<verifier>' on project fjbrkimwvtpwoxhziidh.
ORDER 3 - SWAP AND PROVE (a second notice from the Architect starts this, after the operator's confirmation). Replace the old value with the staged one at the place ORDER 0 found, in one move; restart only your own process as ORDER 0 said is needed; prove one connection as cwf_lane through the laneWrite path with a read-only statement; print only CONNECTED or the classified failure.

## SHARED SURFACES
No repository file changes. The secret's home on the owner's machine is the only surface, and it is shared by every lane window; ORDER 0 names it.

## DECISION RIGHTS
AG-4 decides the generation mechanics inside ORDER 1. The Gemini operator alone writes the role. The Architect alone sequences ORDER 3. The owner alone restarts windows other than AG-4's if ORDER 0 says a restart is needed, and that step is named to him as a required action.
FORBIDDEN: never print the password, the connection string, or any line of any env file; no bash command whose output could contain them; no git add of any file holding them; no poll task, no cron.

END · CARD-LANE-PASSWORD-ROTATION-S153-1-v1
=== END CARD ===

END · ORDER-SCOUT-REVIEW-CARD-LANE-PASSWORD-ROTATION-S153-1-v1
