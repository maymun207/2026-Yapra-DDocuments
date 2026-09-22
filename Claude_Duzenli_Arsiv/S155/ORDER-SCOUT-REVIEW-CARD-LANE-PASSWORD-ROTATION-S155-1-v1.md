<!-- relay-audit: v1 kind=notice -->
ORDER-SCOUT-REVIEW-CARD-LANE-PASSWORD-ROTATION-S155-1-v1

LANE: scout (whichever scout is free first)
fanout: personalized (one lane, one body)
FROM: Architect, S155, bus clock about 2026-09-22T15:25Z
OWNER APPROVAL: S155 plan approval "onay" 18:03 TSI.
NO POLL OR CRON TASK. Bekleme dongusu yok. When your status is written, stop.
GATE-NOTE: written with a STEPS section. The local cardPreflight refuses this notice R-EXEMPT-SHAPE only because the embedded card carries its own ## ORDERS; that is the S154 embed shape; report it, do not act on it.
GRAFT: code context from graft first; your status carries a GRAFT line.
WHAT: adversarial review of CARD-LANE-PASSWORD-ROTATION-S155-1-v5 (item 46). Card body = the bytes after the BEGIN marker line up to and including the final newline before the END marker line; sha256 = e42f52f61d5440b28a56d3025b96148833415b68b22b2f3db65d06e086baa849.
SUPERSEDES: ORDER-SCOUT-REVIEW-CARD-LANE-PASSWORD-ROTATION-S154-1-v4 (never read; do not take it).

## PREMISE
MEASURED: 2026-09-22T15:25Z, Architect bridge, sha256sum of the card file as embedded below.
SELF-INVALIDATION: dies if a v6 of the card is posted.
ON-DISAGREEMENT: your reading wins; print both.

## STEPS
1. Run the repository card gate (mail-wait --read and cardPreflight --check) on the card bytes; print any refusal verbatim. If the two gates disagree, print both (12.13).
2. Attack from PRIMARY sources: (a) does v5 answer exactly the v4 ORDER 0 STOP (home ~/.zshenv, launchd UNSET and not armed) and change nothing else from v4; (b) is the restart path (full IDE quit, no launchd) enough for every lane window to inherit the new value from ~/.zshenv, read against how the IDE and Claude Code tabs start their shells; (c) is the failed-auth ceiling and the 120 s wait still consistent with your earlier breaker reading; (d) does any order print or persist a secret.
3. Verdict: first line `ADVERSARY-VERDICT: GREEN|RED card=CARD-LANE-PASSWORD-ROTATION-S155-1-v5 sha256=<sha256>`, then each defect with the change that makes it GREEN, and which may ride as edits.
REPLY (on the bus): SCOUT-STATUS-REVIEW-CARD-LANE-PASSWORD-ROTATION-S155-1-v5. If the bus write is refused, print the whole status in your window.
FORBIDDEN: read-only. No status post on any PR, no edit, no poll task, no cron. Never print an environment value.

=== BEGIN CARD ===
<!-- relay-audit: v1 kind=card -->
CARD-LANE-PASSWORD-ROTATION-S155-1-v5

LANE: AG-4
fanout: personalized (one lane, one body)
MEASURED-AT: 2026-09-22T15:20Z (bus clock)
SUPERSEDES: CARD-LANE-PASSWORD-ROTATION-S154-1-v4. v4 stopped at ORDER 0 by its own ON-DISAGREEMENT (SLIP-LANE-PASSWORD-ROTATION-S154-1-ORDER0-STOP, bus 2026-09-22T08:30:03Z): the secret's home is ~/.zshenv line 1, not a file v4 listed, and launchd is UNSET. v5 applies exactly that ruling and nothing else: HOME = ~/.zshenv, one export line; launchd is NOT armed (arming it would create a second home); the restart is the owner's full IDE quit.
OWNER APPROVAL: item 46 "lane şifre onay" (S150); OWNER-APPROVAL-S154-LANE-ROLE-ROTATION-1 (bus 2026-09-22T08:23:03Z); S155 plan approval "onay" 18:03 TSI.
ADVERSARY GATE: goes to the scout first (ORDER-SCOUT-REVIEW-CARD-LANE-PASSWORD-ROTATION-S155-1-v1). Reaches AG-4 only with a GREEN verdict row. ORDER 3 starts only on a separate Architect notice after the operator's ALTER.
ORIGIN: F-S150-LANE-PRINTED-DB-URL-1.
PRIOR ART: docs/ops/TOKEN-ROTATION-RUNBOOK.md.
BRANCH: none · PUSH: no · REPORT: the slips only · PR: no.
GRAFT: code context from graft first; every slip carries a GRAFT line.
DEADLINE: the ALTER runs before 2026-09-23 12:00 TSI.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| master at cut time, PR 593 merged in it | MEASURED: GitHub API commits/master and pulls/593, Architect bridge, 2026-09-22T15:05Z | master |
| the slip helper reads process.env unless given an env | MEASURED: git show origin/master:scripts/laneWrite.mjs after git fetch, Architect bridge, 2026-09-22T15:10Z | lexec |
| the secret's home and launchd state before rotation | READ: AG-4 slip SLIP-LANE-PASSWORD-ROTATION-S154-1-ORDER0-STOP on the bus, 2026-09-22T15:08Z | home |

```evidence:master
fdb0df24d0b9dd288223fec55da4185f4ca62382
pulls/593: merged true, merged_at 2026-09-22T12:46:02Z
```

```evidence:lexec
fdb0df24d0b9dd288223fec55da4185f4ca62382:scripts/laneWrite.mjs:330:    const cfg = resolveLaneDsn(opts.env ?? process.env);
```

```evidence:home
HOME DISAGREES WITH CARD: ~/.zshenv:1, one export line, outside ORDER 0's list. launchctl getenv UNSET, sandboxed and not.
```

## PREMISE
MEASURED: the master and lexec anchors above.
READ, not re-measured by the Architect: the home anchor is AG-4's own ORDER 0 reading under v4.
UNMEASURED by the Architect, carried from the scout's statuses (bus 03:45:36Z, 06:56:14Z, 08:19:44Z): Supavisor caches credentials and pg_terminate_backend does not flush the cache; failed auth opens a breaker on the ORIGIN IP for up to 2 minutes with an unmeasured threshold, and a breaker refusal is not 28P01; every lane window shares one IP; laneSlip.postSlip calls laneExec without an env; envPresence prints SET for an empty string.
SELF-INVALIDATION: dies if the cwf_lane role no longer exists or the owner withdraws the approval.
ON-DISAGREEMENT: YOUR READING WINS: print both, STOP before ORDER 2 if the difference touches where the secret lives.

## FALSIFIER
One home = exactly one export line of CWF_LANE_DATABASE_URL in ~/.zshenv, and launchctl getenv UNSET. Any other place (a second profile file, an env file, ~/.pgpass, PGPASSWORD set, launchd set): STOP after ORDER 0, report places by NAME and line number only.

## ORDERS
All helpers are ONE scratch script outside every repository (no node -e, no pipelines). Every error is caught; only its class is printed. DIGEST = 12-hex sha256 prefix of the value after removing one trailing newline and one layer of matching quotes; an empty or absent value prints UNSET. The script writes under your home directory, which is outside the lane sandbox's write allowlist: the owner's sandbox permission prompt is the intended route; a refusal is STOP, never a relocation.
ORDER 0 - MEASURE, NO CHANGE. `npm run env:presence -- CWF_LANE_DATABASE_URL`, then PGPASSWORD. For ~/.zshenv, ~/.zshrc, ~/.zprofile, ~/.bash_profile, ~/.profile: `grep -c CWF_LANE_DATABASE_URL <file>`; above zero, `awk '/CWF_LANE_DATABASE_URL/{print FILENAME":"FNR}' <file>`; never grep -n, cat, Read or Edit on them. `test -e ~/.pgpass`, exit code only. The script prints the PRE-ROTATION DIGEST of process.env, of `launchctl getenv` (via execFile), and of the export line.
ORDER 1 - GENERATE. 32 random bytes as base64url (load-bearing: laneWrite's scrub stops at '/'); SCRAM-SHA-256 verifier with node crypto (salt 16 bytes, 4096 iterations; StoredKey = SHA-256(HMAC(SaltedPassword, "Client Key")); ServerKey = HMAC(SaltedPassword, "Server Key"); format `SCRAM-SHA-256$4096:<salt b64>$<StoredKey b64>:<ServerKey b64>`). Self-test first against RFC 7677's worked example by comparing the ClientProof and ServerSignature it publishes. Two mode-600 files in your home directory: the new full connection string (only the password changes) and the verifier.
ORDER 2 - SLIP, STOP. SLIP-LANE-PASSWORD-ROTATION-S155-1: ORDER 0 answers and PRE-ROTATION DIGESTS, both file paths, the verifier file's 12-hex sha256 prefix, the self-test result. Never the verifier. Stop.
ORDER 3 - ONLY ON A SEPARATE ARCHITECT NOTICE (after the operator's ALTER; the notice carries the ALTER's UTC time). Before the ALTER the owner has closed every lane window except yours.
3a. At least 15 s after the ALTER: laneExec('select current_user', [], { env: { CWF_LANE_DATABASE_URL: <staged file> } }); CONNECTED only if the row is 'cwf_lane'. A 28P01: wait 15 s, one retry; a second failure, or any first failure that is not 28P01, is STOP with the SQLSTATE.
3b. After CONNECTED, at least 60 s after the ALTER: ONE attempt with the OLD value (process.env), print its DIGEST (must differ from the staged value's). REVOKED only on SQLSTATE 28P01; CONNECT: wait 60 s, one retry, a second CONNECT is STOP; any other code is STOP.
3c. After REVOKED: the script finds exactly one matching export line in ~/.zshenv (else STOP), writes the new file to a temp file in the same directory and renames it over ~/.zshenv keeping its mode, and prints old and new DIGESTS of the export line. It does NOT call launchctl setenv; it prints `launchctl getenv` DIGEST, which must still be UNSET.
3d. Wait at least 120 s after the last failed auth. Then post SLIP-LANE-PASSWORD-ROTATION-S155-1-ORDER3 with the slip helper's exec bound to { env: { CWF_LANE_DATABASE_URL: <staged value> } }; if that is refused, print the slip in your window. The slip carries 3a, 3b, 3c, the failed-auth count (ceiling 3: two in 3a, one in 3b), and the required owner action: full IDE quit and reopen, not before 120 s after 3b; after it one window prints its process.env DIGEST, which must equal the new export-line DIGEST and differ from the pre-rotation digest.
3e. The Architect then reads supabase logs over [ALTER, slip] and checks the failed-auth count equals yours; a surplus means a client was not quiesced.

## SHARED SURFACES
No repository file changes. ~/.zshenv on the owner's machine.

## DECISION RIGHTS
AG-4 decides mechanics inside the scratch script. The Gemini operator alone writes the role, under OWNER-APPROVAL-S154-LANE-ROLE-ROTATION-1 only. The Architect alone starts ORDER 3.
FORBIDDEN: never print the password, the connection string, the verifier, or any line of any env or profile file; no launchctl setenv; no git add of any file holding them; no poll task, no cron.

END · CARD-LANE-PASSWORD-ROTATION-S155-1-v5
=== END CARD ===

END · ORDER-SCOUT-REVIEW-CARD-LANE-PASSWORD-ROTATION-S155-1-v1
