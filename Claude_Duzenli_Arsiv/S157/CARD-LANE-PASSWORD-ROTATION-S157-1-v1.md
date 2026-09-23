<!-- relay-audit: v1 kind=card -->
CARD-LANE-PASSWORD-ROTATION-S157-1-v1

LANE: AG-4 (fresh window: one card per window; after CARD-BUDGET-FENCE-200-180-S157-1 if both reach you)
fanout: personalized (one lane, one body)
MEASURED-AT: 2026-09-23T04:06Z (bridge clock, date -u in the command that wrote this file)
OWNER APPROVAL: OWNER-APPROVAL-S157-BUDGET-AND-ROTATION-1, the owner's words "onay bütçe 200/180 + şifre rotasyonu", 2026-09-23 07:04 TSI; the role write stays under OWNER-APPROVAL-S154-LANE-ROLE-ROTATION-1 (Gemini operator only).
ADVERSARY GATE: goes to the scout first. It repeats the procedure of CARD-LANE-PASSWORD-ROTATION-S155-1-v6, which closed item 46 by evidence in S155; only the names, dates and origin changed. ORDER 3 starts only on a separate Architect notice after the operator's ALTER.
ORIGIN: the scout window that wrote SCOUT-STATUS-LAND-PR596-S157-1 printed CWF_LANE_DATABASE_URL into its transcript (self-reported, bus 2026-09-23T03:58:12Z).
PRIOR ART: CARD-LANE-PASSWORD-ROTATION-S155-1-v6; docs/ops/TOKEN-ROTATION-RUNBOOK.md.
BRANCH: none · PUSH: no · REPORT: the slips only · PR: no.
GRAFT: code context from graft first; every slip carries a GRAFT line.
DEADLINE: ORDERS 0-2 now; the ALTER runs today, 2026-09-23, after the open landings (PR 596, PR 597) are on master.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| master at cut time | MEASURED: GitHub API commits/master, Architect bridge, 2026-09-23T04:01Z | master |
| the slip helper reads process.env unless given an env | MEASURED: git grep on origin/master, Architect bridge, 2026-09-23T04:06Z | lexec |
| the secret's single home after S155 | READ: AG-4 slip SLIP-LANE-PASSWORD-ROTATION-S155-1-ORDER3 on the bus, 2026-09-22 | home |

```evidence:master
1ca28ede61588ff542764cf3f1375568c94436ae
```

```evidence:lexec
1ca28ede61588ff542764cf3f1375568c94436ae:scripts/laneWrite.mjs:330:    const cfg = resolveLaneDsn(opts.env ?? process.env);
```

```evidence:home
~/.zshenv, one export line of CWF_LANE_DATABASE_URL; launchctl getenv UNSET; staged DSN and verifier files deleted after ORDER3.
```

## PREMISE
MEASURED: the master and lexec anchors above.
UNMEASURED by the Architect: the home anchor is AG-4's own S155 reading (READ from the slip); ORDER 0 re-measures it.
UNMEASURED by the Architect, carried from the S155 scout statuses: Bash-tool shells are login zsh and re-source ~/.zshenv, so every window uses the NEW value from the moment 3c renames the file; Supavisor caches credentials and pg_terminate_backend does not flush the cache; failed auth opens a breaker on the origin IP for up to 2 minutes; every lane window shares one IP; envPresence prints SET for an empty string.
SELF-INVALIDATION: dies if the cwf_lane role no longer exists or the owner withdraws the approval.
ON-DISAGREEMENT: YOUR READING WINS: print both, STOP before ORDER 2 if the difference touches where the secret lives.

## FALSIFIER
One home = exactly one export line of CWF_LANE_DATABASE_URL in ~/.zshenv, and launchctl getenv UNSET. Any other place (a second profile file, an env file, ~/.pgpass, PGPASSWORD set, launchd set): STOP after ORDER 0, report places by NAME and line number only.

## ORDERS
All helpers are ONE scratch script outside every repository (no node -e, no pipelines). Every error is caught; only its class is printed. DIGEST = 12-hex sha256 prefix of the value after removing one trailing newline and one layer of matching quotes; an empty or absent value prints UNSET. The script writes under your home directory, which is outside the lane sandbox's write allowlist: the owner's sandbox permission prompt is the intended route; a refusal is STOP, never a relocation.
ORDER 0 - MEASURE, NO CHANGE. `npm run env:presence -- CWF_LANE_DATABASE_URL`, then PGPASSWORD. For ~/.zshenv, ~/.zshrc, ~/.zprofile, ~/.zlogin, ~/.bash_profile, ~/.bashrc, ~/.profile: `grep -c CWF_LANE_DATABASE_URL <file>`; above zero, `awk '/CWF_LANE_DATABASE_URL/{print FILENAME":"FNR}' <file>`; never grep -n, cat, Read or Edit on them. `test -e ~/.pgpass`, exit code only. grep -c cannot see a line that only sources another file: say so in the slip (UNMEASURED). The script prints the PRE-ROTATION DIGEST of process.env, of `launchctl getenv` (via execFile), and of the export line.
ORDER 1 - GENERATE. 32 random bytes as base64url (load-bearing: laneWrite's scrub stops at '/'); SCRAM-SHA-256 verifier with node crypto (salt 16 bytes, 4096 iterations; StoredKey = SHA-256(HMAC(SaltedPassword, "Client Key")); ServerKey = HMAC(SaltedPassword, "Server Key"); format `SCRAM-SHA-256$4096:<salt b64>$<StoredKey b64>:<ServerKey b64>`). Self-test first against RFC 7677's worked example by comparing the ClientProof and ServerSignature it publishes. Two mode-600 files in your home directory: ~/.cwf_lane_S157_dsn (the new full connection string, only the password changes) and ~/.cwf_lane_S157_scram_verifier.
ORDER 2 - SLIP, STOP. SLIP-LANE-PASSWORD-ROTATION-S157-1: ORDER 0 answers and PRE-ROTATION DIGESTS, both file paths, the verifier file's 12-hex sha256 prefix, the self-test result. Never the verifier. Stop.
ORDER 3 - ONLY ON A SEPARATE ARCHITECT NOTICE (after the operator's ALTER; the notice carries the ALTER's UTC time). Before the ALTER the owner has closed every lane window except yours.
3a. At least 15 s after the ALTER: laneExec('select current_user', [], { env: { CWF_LANE_DATABASE_URL: <staged file> } }); CONNECTED only if the row is 'cwf_lane'. A 28P01: wait 15 s, one retry; a second failure, or any first failure that is not 28P01, is STOP with the SQLSTATE.
3b. After CONNECTED, at least 60 s after the ALTER: ONE attempt with the OLD value (process.env), print its DIGEST (must differ from the staged value's). REVOKED only on SQLSTATE 28P01; CONNECT: wait 60 s, one retry, a second CONNECT is STOP; any other code is STOP.
3c. After REVOKED: if ~/.zshenv is a symlink (lstat), STOP. The script finds exactly one matching export line in ~/.zshenv (else STOP), writes the new file to a temp file in the same directory and renames it over ~/.zshenv keeping its mode, and prints old and new DIGESTS of the export line. If the rename fails, delete the temp file, print `test -e` of it, and STOP. It does NOT call launchctl setenv; it prints `launchctl getenv` DIGEST, which must still be UNSET.
3d. Wait at least 120 s after the last failed auth. Load the staged value into memory, then post SLIP-LANE-PASSWORD-ROTATION-S157-1-ORDER3 with exec = (s,p,o) => laneExec(s,p,{...o, env:{CWF_LANE_DATABASE_URL: staged}}); if that is refused, print the slip in your window. The slip fits SLIP_CAP (1024 characters) with the six required fields, head = the master tip; it carries 3a, 3b, 3c compactly and the failed-auth count (at most 2 on the success path). After the slip, delete the staged DSN file and the verifier file and print `test -e` exit codes for both. The slip names the owner action: quit the IDE fully and relaunch it from the Dock or Finder, not before 120 s after 3b.
3e0. A STOP after the ALTER ends in a defined state: ~/.zshenv untouched, staged file kept, every lane write path down, nothing retried, wait 120 s, the Architect rules.
3e. The Architect then reads supabase logs over [ALTER, slip] and checks the failed-auth count equals yours.

## SHARED SURFACES
No repository file changes. ~/.zshenv on the owner's machine.

## DECISION RIGHTS
AG-4 decides mechanics inside the scratch script. The Gemini operator alone writes the role. The Architect alone starts ORDER 3.
FORBIDDEN: never print the password, the connection string, the verifier, or any line of any env or profile file; no printenv, echo or env of the variable in any form; no launchctl setenv; no git add of any file holding them; no poll task, no cron.

END · CARD-LANE-PASSWORD-ROTATION-S157-1-v1
