<!-- relay-audit: v1 kind=card -->
CARD-LANE-PASSWORD-ROTATION-S154-1-v4

LANE: AG-4
fanout: personalized (one lane, one body)
MEASURED-AT: 2026-09-22T08:25Z (bus clock)
SUPERSEDES: CARD-LANE-PASSWORD-ROTATION-S154-1-v3 (scout RED, SCOUT-STATUS-REVIEW-CARD-LANE-PASSWORD-ROTATION-S154-1-v3). Riding edits applied: B2, B3, B4, E1, E2, E3, E4. B1 answered with bytes: the bus row OWNER-APPROVAL-S154-LANE-ROLE-ROTATION-1 (kind=ruling, bus 2026-09-22T08:23:03Z) carries the exact statements, the bound bytes, the authority and the exposure ruling.
OWNER APPROVAL: item 46 "lane şifre onay" (S150); OWNER-APPROVAL-S154-LANE-ROLE-ROTATION-1.
ADVERSARY GATE: EXEMPT under 12.1's loop-breaking case (fourth version of one subject; only the reviewer's riding edits plus the bytes the reviewer asked for). The seal cites the scout's v3 row. ORDER 3 changes the live role and does NOT run on this seal: it starts only by a separate Architect notice after the scout re-reads this card and the ruling row and prints GREEN.
ORIGIN: F-S150-LANE-PRINTED-DB-URL-1.
PRIOR ART: docs/ops/TOKEN-ROTATION-RUNBOOK.md.
BRANCH: none · PUSH: no · REPORT: the slips only · PR: no.

```evidence:adversary
ADVERSARY: EXEMPT
ack: dd588ef5-6a0a-4f9e-9f46-4b0d3ba91df6
```

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| master at cut time, PR 592 merged in it | MEASURED: GitHub API commits/master and pulls/592, Architect bridge, 2026-09-22T06:55Z | master |
| the slip helper reads process.env unless given an env | MEASURED: git grep on origin/master, bridge, 2026-09-22T03:54Z | lexec |

```evidence:master
9aba71fe2cbad0c53f3996d01b8991e5bbe40ed4
pulls/592: merged true, merged_at 2026-09-22T03:57:16Z
```

```evidence:lexec
9aba71fe2cbad0c53f3996d01b8991e5bbe40ed4:scripts/laneWrite.mjs:330:    const cfg = resolveLaneDsn(opts.env ?? process.env);
```

## PREMISE
MEASURED: the anchors above.
UNMEASURED by the Architect, carried from the scout's statuses (bus 03:45:36Z, 06:56:14Z, 08:19:44Z): Supavisor caches credentials and pg_terminate_backend does not flush the cache; failed auth opens a breaker on the ORIGIN IP for up to 2 minutes with an unmeasured threshold, and a breaker refusal is not 28P01; every lane window shares one IP; laneSlip.postSlip calls laneExec without an env; envPresence prints SET for an empty string; launchctl getenv prints a trailing newline.
UNMEASURED: where the variable is set and which windows inherit it (ORDER 0).
SELF-INVALIDATION: dies if the cwf_lane role no longer exists or the owner withdraws the approval.
ON-DISAGREEMENT: YOUR READING WINS: print both, STOP before ORDER 2 if the difference touches where the secret lives.

## FALSIFIER
One home = one export line in one shell profile file plus launchctl setenv re-armed from it. Any other place (second profile file, env file, ~/.pgpass, PGPASSWORD set): STOP after ORDER 0, report places by NAME and line number only.

## ORDERS
All helpers are ONE scratch script outside every repository (no node -e, no pipelines). Every error is caught; only its class is printed. DIGEST = 12-hex sha256 prefix of the value after removing one trailing newline and one layer of matching quotes (E1); an empty or absent value prints UNSET. The script writes under your home directory, which is outside the lane sandbox's write allowlist: the owner's sandbox permission prompt is the intended route (E4); a refusal is STOP, never a relocation.
ORDER 0 - MEASURE, NO CHANGE. `npm run env:presence -- CWF_LANE_DATABASE_URL`, then PGPASSWORD. For ~/.zshrc, ~/.zprofile, ~/.bash_profile, ~/.profile: `grep -c CWF_LANE_DATABASE_URL <file>`; above zero, `awk '/CWF_LANE_DATABASE_URL/{print FILENAME":"FNR}' <file>`; never grep -n, cat, Read or Edit on them. `test -e ~/.pgpass`, exit code only. The script prints the PRE-ROTATION DIGEST of process.env, of `launchctl getenv` (via execFile), and of the export line.
ORDER 1 - GENERATE. 32 random bytes as base64url (load-bearing: laneWrite's scrub stops at '/'); SCRAM-SHA-256 verifier with node crypto (salt 16 bytes, 4096 iterations; StoredKey = SHA-256(HMAC(SaltedPassword, "Client Key")); ServerKey = HMAC(SaltedPassword, "Server Key"); format `SCRAM-SHA-256$4096:<salt b64>$<StoredKey b64>:<ServerKey b64>`). Self-test first against RFC 7677's worked example by comparing the ClientProof and ServerSignature it publishes (E3). Two mode-600 files beside the home ORDER 0 found: the new full connection string (only the password changes) and the verifier.
ORDER 2 - SLIP, STOP. SLIP-LANE-PASSWORD-ROTATION-S154-1: ORDER 0 answers and PRE-ROTATION DIGESTS, both file paths, the verifier file's 12-hex sha256 prefix, the self-test result. Never the verifier. Stop.
ORDER 3 - ONLY ON A SEPARATE ARCHITECT NOTICE (after scout GREEN and the operator's ALTER; the notice carries the ALTER's UTC time). Before the ALTER the owner has closed every lane window except yours (B4).
3a. At least 15 s after the ALTER: laneExec('select current_user', [], { env: { CWF_LANE_DATABASE_URL: <staged file> } }); CONNECTED only if the row is 'cwf_lane'. A 28P01: wait 15 s, one retry; a second failure, or any first failure that is not 28P01, is STOP with the SQLSTATE (E2).
3b. After CONNECTED, at least 60 s after the ALTER: ONE attempt with the OLD value (process.env), print its DIGEST (must differ from the staged value's). REVOKED only on SQLSTATE 28P01; CONNECT: wait 60 s, one retry, a second CONNECT is STOP; any other code is STOP (E2).
3c. After REVOKED: the script finds exactly one matching export line (else STOP), writes the new line to a temp file and renames it over the profile keeping its mode, re-arms launchctl setenv from it, and prints old and new DIGESTS of the export line and of launchd.
3d. Wait at least 120 s after the last failed auth (B3). Then post SLIP-LANE-PASSWORD-ROTATION-S154-1-ORDER3 with the slip helper's exec bound to { env: { CWF_LANE_DATABASE_URL: <staged value> } } (B2); if that is refused, print the slip in your window. The slip carries 3a, 3b, 3c, the failed-auth count (ceiling 3: two in 3a, one in 3b), and the required owner action: full IDE quit and reopen, not before 120 s after 3b; after it one window prints its process.env DIGEST and the chain terminal / launchd / window must agree and differ from the pre-rotation digest.
3e. The Architect then reads supabase logs over [ALTER, slip] and checks the failed-auth count equals yours; a surplus means a client was not quiesced (B4).

## SHARED SURFACES
No repository file changes. The secret's home on the owner's machine.

## DECISION RIGHTS
AG-4 decides mechanics inside the scratch script. The Gemini operator alone writes the role, under OWNER-APPROVAL-S154-LANE-ROLE-ROTATION-1 only. The Architect alone starts ORDER 3.
FORBIDDEN: never print the password, the connection string, the verifier, or any line of any env or profile file; no git add of any file holding them; no poll task, no cron.

END · CARD-LANE-PASSWORD-ROTATION-S154-1-v4
