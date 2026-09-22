<!-- relay-audit: v1 kind=card -->
CARD-LANE-PASSWORD-ROTATION-S155-1-v6

LANE: AG-4
fanout: personalized (one lane, one body)
MEASURED-AT: 2026-09-22T15:35Z (bus clock)
SUPERSEDES: CARD-LANE-PASSWORD-ROTATION-S155-1-v5 (scout RED, SCOUT-STATUS-REVIEW-CARD-LANE-PASSWORD-ROTATION-S155-1-v5, bus 2026-09-22T15:19:35Z). Applied as edits, all and only the scout's: R1, R2, E1, E2, E3, E4, E5, E6, plus the scout's measured correction that the switch happens at 3c, not at the restart. v5 itself answered v4's ORDER 0 STOP: HOME = ~/.zshenv, one export line; launchd is NOT armed.
OWNER APPROVAL: item 46 "lane şifre onay" (S150); OWNER-APPROVAL-S154-LANE-ROLE-ROTATION-1 (bus 2026-09-22T08:23:03Z); S155 plan approval "onay" 18:03 TSI.
ADVERSARY GATE: EXEMPT, the loop-breaking case of 12.1: same subject, only the scout's named delta, scout said NEEDS A RULING: none (ack = the scout's RED row). ORDER 3 starts only on a separate Architect notice after the operator's ALTER.

```evidence:adversary
ADVERSARY: EXEMPT
ack: 3fbf0939-020e-45c8-8efb-80e3883e7d95
```
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
UNMEASURED by the Architect: the home anchor is AG-4's own ORDER 0 reading under v4 (READ from the slip).
UNMEASURED by the Architect, READ from the scout's v5 status (bus 15:19:35Z): Bash-tool shells are login zsh with rc files on, so every Bash call re-sources ~/.zshenv; laneWrite runs only as a node child of Bash, so every window uses the NEW value from the moment 3c renames the file. The IDE quit only clears the OLD value from the IDE, extension-host and CLI process env.
UNMEASURED by the Architect, carried from the scout's statuses (bus 03:45:36Z, 06:56:14Z, 08:19:44Z): Supavisor caches credentials and pg_terminate_backend does not flush the cache; failed auth opens a breaker on the ORIGIN IP for up to 2 minutes with an unmeasured threshold, and a breaker refusal is not 28P01; every lane window shares one IP; laneSlip.postSlip calls laneExec without an env; envPresence prints SET for an empty string.
SELF-INVALIDATION: dies if the cwf_lane role no longer exists or the owner withdraws the approval.
ON-DISAGREEMENT: YOUR READING WINS: print both, STOP before ORDER 2 if the difference touches where the secret lives.

## FALSIFIER
One home = exactly one export line of CWF_LANE_DATABASE_URL in ~/.zshenv, and launchctl getenv UNSET. Any other place (a second profile file, an env file, ~/.pgpass, PGPASSWORD set, launchd set): STOP after ORDER 0, report places by NAME and line number only.

## ORDERS
All helpers are ONE scratch script outside every repository (no node -e, no pipelines). Every error is caught; only its class is printed. DIGEST = 12-hex sha256 prefix of the value after removing one trailing newline and one layer of matching quotes; an empty or absent value prints UNSET. The script writes under your home directory, which is outside the lane sandbox's write allowlist: the owner's sandbox permission prompt is the intended route; a refusal is STOP, never a relocation.
ORDER 0 - MEASURE, NO CHANGE. `npm run env:presence -- CWF_LANE_DATABASE_URL`, then PGPASSWORD. For ~/.zshenv, ~/.zshrc, ~/.zprofile, ~/.zlogin, ~/.bash_profile, ~/.bashrc, ~/.profile: `grep -c CWF_LANE_DATABASE_URL <file>`; above zero, `awk '/CWF_LANE_DATABASE_URL/{print FILENAME":"FNR}' <file>`; never grep -n, cat, Read or Edit on them. `test -e ~/.pgpass`, exit code only. grep -c cannot see a line that only sources another file: say so in the slip (UNMEASURED). The script prints the PRE-ROTATION DIGEST of process.env, of `launchctl getenv` (via execFile), and of the export line.
ORDER 1 - GENERATE. 32 random bytes as base64url (load-bearing: laneWrite's scrub stops at '/'); SCRAM-SHA-256 verifier with node crypto (salt 16 bytes, 4096 iterations; StoredKey = SHA-256(HMAC(SaltedPassword, "Client Key")); ServerKey = HMAC(SaltedPassword, "Server Key"); format `SCRAM-SHA-256$4096:<salt b64>$<StoredKey b64>:<ServerKey b64>`). Self-test first against RFC 7677's worked example by comparing the ClientProof and ServerSignature it publishes. Two mode-600 files in your home directory: the new full connection string (only the password changes) and the verifier.
ORDER 2 - SLIP, STOP. SLIP-LANE-PASSWORD-ROTATION-S155-1: ORDER 0 answers and PRE-ROTATION DIGESTS, both file paths, the verifier file's 12-hex sha256 prefix, the self-test result. Never the verifier. Stop.
ORDER 3 - ONLY ON A SEPARATE ARCHITECT NOTICE (after the operator's ALTER; the notice carries the ALTER's UTC time). Before the ALTER the owner has closed every lane window except yours.
3a. At least 15 s after the ALTER: laneExec('select current_user', [], { env: { CWF_LANE_DATABASE_URL: <staged file> } }); CONNECTED only if the row is 'cwf_lane'. A 28P01: wait 15 s, one retry; a second failure, or any first failure that is not 28P01, is STOP with the SQLSTATE.
3b. After CONNECTED, at least 60 s after the ALTER: ONE attempt with the OLD value (process.env), print its DIGEST (must differ from the staged value's). REVOKED only on SQLSTATE 28P01; CONNECT: wait 60 s, one retry, a second CONNECT is STOP; any other code is STOP.
3c. After REVOKED: if ~/.zshenv is a symlink (lstat), STOP. The script finds exactly one matching export line in ~/.zshenv (else STOP), writes the new file to a temp file in the same directory and renames it over ~/.zshenv keeping its mode, and prints old and new DIGESTS of the export line. If the rename fails, delete the temp file, print `test -e` of it, and STOP. It does NOT call launchctl setenv; it prints `launchctl getenv` DIGEST, which must still be UNSET.
3d. Wait at least 120 s after the last failed auth. Load the staged value into memory, then post SLIP-LANE-PASSWORD-ROTATION-S155-1-ORDER3 with exec = (s,p,o) => laneExec(s,p,{...o, env:{CWF_LANE_DATABASE_URL: staged}}); if that is refused, print the slip in your window. The slip fits SLIP_CAP (1024 characters) with the six required fields, head = the master tip; it carries 3a, 3b, 3c compactly and the failed-auth count (the success path has at most 2: one in 3a, one in 3b; 3 is an upper bound, not a reachable success count). After the slip, delete the staged DSN file and the verifier file and print `test -e` exit codes for both: from here ~/.zshenv is the one home. The slip names the owner action: quit the IDE fully and relaunch it from the Dock or Finder, not with `code` from a terminal opened before 3c, not before 120 s after 3b. The window check after it (process.env DIGEST equals the new export-line DIGEST) proves file to shell only; it does not measure the restart.
3e0. A STOP after the ALTER ends in a defined state: ~/.zshenv untouched, staged file kept, every lane write path down, nothing retried, wait 120 s, the Architect rules.
3e. The Architect then reads supabase logs over [ALTER, slip] and checks the failed-auth count equals yours; a surplus means a client was not quiesced.

## SHARED SURFACES
No repository file changes. ~/.zshenv on the owner's machine.

## DECISION RIGHTS
AG-4 decides mechanics inside the scratch script. The Gemini operator alone writes the role, under OWNER-APPROVAL-S154-LANE-ROLE-ROTATION-1 only. The Architect alone starts ORDER 3.
FORBIDDEN: never print the password, the connection string, the verifier, or any line of any env or profile file; no launchctl setenv; no git add of any file holding them; no poll task, no cron.

END · CARD-LANE-PASSWORD-ROTATION-S155-1-v6
