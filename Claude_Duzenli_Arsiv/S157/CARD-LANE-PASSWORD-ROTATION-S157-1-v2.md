<!-- relay-audit: v1 kind=card -->
CARD-LANE-PASSWORD-ROTATION-S157-1-v2

LANE: AG-4 (fresh window: one card per window; after CARD-BUDGET-FENCE-200-180-S157-1 if both reach you)
fanout: personalized (one lane, one body)
MEASURED-AT: 2026-09-23T04:27Z (bridge clock, date -u in the command that wrote this file)
OWNER APPROVAL: OWNER-APPROVAL-S157-BUDGET-AND-ROTATION-1, the owner's words "onay bütçe 200/180 + şifre rotasyonu", 2026-09-23 07:04 TSI; the role write stays under OWNER-APPROVAL-S154-LANE-ROLE-ROTATION-1 (Gemini operator only).
SUPERSEDES: CARD-LANE-PASSWORD-ROTATION-S157-1-v1 (scout RED ON EDITS, NOT DESIGN, SCOUT-STATUS-REVIEW-CARD-LANE-PASSWORD-ROTATION-S157-1-v1, bus 2026-09-23T04:22:52Z). Applied as edits, all and only the scout's D1-D5 and N1-N4, verbatim. X1 (the exposure class survives the rotation) is outside this card: register item 87.
ADVERSARY GATE: EXEMPT, the loop-breaking case of 12.1: same subject, only the scout's named delta (ack = the scout's RED row). ORDER 3 starts only on a separate Architect notice after the operator's ALTER; that notice is cardPreflight-checked before it is posted.

```evidence:adversary
ADVERSARY: EXEMPT
ack: dcadac58-d89e-49b2-a057-878ca3989806
```
ORIGIN: the scout window that wrote SCOUT-STATUS-LAND-PR596-S157-1 printed CWF_LANE_DATABASE_URL into its transcript (self-reported, bus 2026-09-23T03:58:12Z).
PRIOR ART: CARD-LANE-PASSWORD-ROTATION-S155-1-v6; docs/ops/TOKEN-ROTATION-RUNBOOK.md.
BRANCH: none · PUSH: no · REPORT: the slips only · PR: no.
GRAFT: code context from graft first; every slip carries a GRAFT line.
DEADLINE: ORDERS 0-2 now; the ALTER runs today, 2026-09-23, after the open landings (PR 596, PR 597) are on master.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| master at cut time, after PR 596 | MEASURED: GitHub API commits/master, Architect bridge, 2026-09-23T04:26Z | master |
| the slip helper reads process.env unless given an env | MEASURED: git grep on origin/master, Architect bridge, 2026-09-23T04:27Z | lexec |
| the secret's single home after S155 | READ: AG-4 slip SLIP-LANE-PASSWORD-ROTATION-S155-1-ORDER3 on the bus, 2026-09-22 | home |

```evidence:master
3c930797178bd0246470c1db2aa30220d7d84f02
```

```evidence:lexec
3c930797178bd0246470c1db2aa30220d7d84f02:scripts/laneWrite.mjs:330:    const cfg = resolveLaneDsn(opts.env ?? process.env);
```

```evidence:home
~/.zshenv, one export line of CWF_LANE_DATABASE_URL; launchctl getenv UNSET; staged DSN and verifier files deleted after ORDER3.
```

## PREMISE
MEASURED: the master and lexec anchors above.
UNMEASURED by the Architect: the home anchor is AG-4's own S155 reading (READ from the slip); ORDER 0 re-measures it.
UNMEASURED by the Architect, carried from the S155 scout statuses: Bash-tool shells are login zsh and re-source ~/.zshenv, so every window uses the NEW value from the moment 3c renames the file; Supavisor caches credentials and pg_terminate_backend does not flush the cache; failed auth opens a breaker on the origin IP for up to 2 minutes; every lane window shares one IP; envPresence prints SET for an empty string; a breaker refusal is not 28P01 (threshold unmeasured); laneSlip.postSlip calls laneExec without an env; the IDE quit only clears the OLD value from the IDE, extension-host and CLI process env.
SELF-INVALIDATION: dies if the cwf_lane role no longer exists or the owner withdraws the approval.
ON-DISAGREEMENT: YOUR READING WINS: print both, STOP before ORDER 2 if the difference touches where the secret lives.

## FALSIFIER
One home = exactly one export line of CWF_LANE_DATABASE_URL in ~/.zshenv, and launchctl getenv UNSET. Any other place (a second profile file, an env file, ~/.pgpass, an S155 staged file, PGPASSWORD set, launchd set): STOP after ORDER 0, report places by NAME and line number only.

## ORDERS
All helpers are ONE scratch script outside every repository (no node -e, no pipelines). Every error is caught; only its class is printed. DIGEST = 12-hex sha256 prefix of the value after removing one trailing newline and one layer of matching quotes; an empty or absent value prints UNSET. The script writes under your home directory, which is outside the lane sandbox's write allowlist: the owner's permission prompt (sandbox or auto-mode classifier; in S155 it was the classifier, Credential Leakage) is the intended route, approved under OWNER-APPROVAL-S157-BUDGET-AND-ROTATION-1; a refusal is STOP, never a relocation.
ORDER 0 - MEASURE, NO CHANGE. `npm run env:presence -- CWF_LANE_DATABASE_URL`, then PGPASSWORD. For ~/.zshenv, ~/.zshrc, ~/.zprofile, ~/.zlogin, ~/.bash_profile, ~/.bashrc, ~/.profile: `grep -c CWF_LANE_DATABASE_URL <file>`; above zero, `awk '/CWF_LANE_DATABASE_URL/{print FILENAME":"FNR}' <file>`; never grep -n, cat, Read or Edit on them. ~/.pgpass: the script lstats it and prints ABSENT or PRESENT (S155: a bare test -e in the Bash tool showed no exit code). grep -c cannot see a line that only sources another file: say so in the slip (UNMEASURED). The script prints the PRE-ROTATION DIGEST of process.env, of `launchctl getenv` (via execFile), and of the export line. The script lstats ~/.cwf_lane_S155_staged_dsn and ~/.cwf_lane_S155_scram_verifier and prints ABSENT or PRESENT for each; PRESENT is a FALSIFIER hit (the S155 staged DSN holds today's live value).
ORDER 1 - GENERATE. 32 random bytes as base64url (load-bearing: laneWrite's scrub stops at '/'); SCRAM-SHA-256 verifier with node crypto (salt 16 bytes, 4096 iterations; StoredKey = SHA-256(HMAC(SaltedPassword, "Client Key")); ServerKey = HMAC(SaltedPassword, "Server Key"); format `SCRAM-SHA-256$4096:<salt b64>$<StoredKey b64>:<ServerKey b64>`). Self-test first against RFC 7677's worked example by comparing the ClientProof and ServerSignature it publishes. Two mode-600 files in your home directory: ~/.cwf_lane_S157_dsn (the new full connection string, only the password changes) and ~/.cwf_lane_S157_scram_verifier.
ORDER 2 - SLIP, STOP. SLIP-LANE-PASSWORD-ROTATION-S157-1: ORDER 0 answers and PRE-ROTATION DIGESTS, both file paths, the verifier file's 12-hex sha256 prefix, the self-test result. Never the verifier. Stop.
ORDER 3 - ONLY ON A SEPARATE ARCHITECT NOTICE (after the operator's ALTER; the notice carries the ALTER's UTC time). Before the ALTER the owner has closed every Claude window except yours: every lane, the foreman and every scout (each can reach laneExec through slips, lane rows, setMode or mail-wait --take). The Gemini operator's window stays.
3a. At least 15 s after the ALTER: laneExec('select current_user', [], { env: { CWF_LANE_DATABASE_URL: <staged file> } }); CONNECTED only if the row is 'cwf_lane'. A 28P01: wait 15 s, one retry; a second failure, or any first failure that is not 28P01, is STOP with the SQLSTATE. S155 measured: the first new-value attempt got 28P01 at ALTER+5m31s and the 15 s retry connected; that is the expected path, and 2 is the measured success-path failed-auth count.
3b. After CONNECTED, at least 60 s after the ALTER: ONE attempt with the OLD value (process.env), print its DIGEST (must differ from the staged value's). REVOKED only on SQLSTATE 28P01; CONNECT: wait 60 s, one retry, a second CONNECT is STOP; any other code is STOP.
3c. After REVOKED: if ~/.zshenv is a symlink (lstat), STOP. The script finds exactly one matching export line in ~/.zshenv (else STOP), writes the new file to a temp file in the same directory and renames it over ~/.zshenv keeping its mode, and prints old and new DIGESTS of the export line. If the rename fails, delete the temp file, print ABSENT or PRESENT from the script's lstat, and STOP. It does NOT call launchctl setenv; it prints `launchctl getenv` DIGEST, which must still be UNSET.
3d. Wait at least 120 s after the last failed auth. Load the staged value into memory, then post SLIP-LANE-PASSWORD-ROTATION-S157-1-ORDER3 with exec = (s,p,o) => laneExec(s,p,{...o, env:{CWF_LANE_DATABASE_URL: staged}}); if that is refused, print the slip in your window. The slip fits SLIP_CAP (1024 characters) with the six required fields, head = the master tip; it carries 3a, 3b, 3c compactly and the failed-auth count (at most 2 on the success path). After the slip, delete the staged DSN file and the verifier file and print ABSENT or PRESENT from the script's lstat. The slip names the owner action: quit the IDE fully and relaunch it from the Dock or Finder, not with `code` from a terminal opened before 3c, not before 120 s after 3b. A window check (process.env DIGEST equals the new export-line DIGEST) proves file to shell only; it does not measure the restart.
3e0. A STOP after the ALTER ends in a defined state: ~/.zshenv untouched, staged file kept, every lane write path down, nothing retried, wait 120 s, the Architect rules.
3e. The Architect then reads supabase logs over [ALTER, slip] and checks the failed-auth count equals yours; a surplus means a client was not quiesced.

## SHARED SURFACES
No repository file changes. ~/.zshenv on the owner's machine.

## DECISION RIGHTS
AG-4 decides mechanics inside the scratch script. The Gemini operator alone writes the role. The Architect alone starts ORDER 3.
FORBIDDEN: never print the password, the connection string, the verifier, or any line of any env or profile file; no printenv, echo or env of the variable in any form; no launchctl setenv; no git add of any file holding them; no poll task, no cron.

END · CARD-LANE-PASSWORD-ROTATION-S157-1-v2
