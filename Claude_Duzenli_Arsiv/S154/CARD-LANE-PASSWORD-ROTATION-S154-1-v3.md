<!-- relay-audit: v1 kind=card -->
CARD-LANE-PASSWORD-ROTATION-S154-1-v3

LANE: AG-4
fanout: personalized (one lane, one body)
MEASURED-AT: 2026-09-22T08:12Z (bus clock)
SUPERSEDES: CARD-LANE-PASSWORD-ROTATION-S154-1-v2 (scout RED, SCOUT-STATUS-REVIEW-CARD-LANE-PASSWORD-ROTATION-S154-1-v2). Riding edits applied: CP-1, CP-3, D3a-c, D4a-c, D5 note, N3, N4. Rulings applied: OWNER-APPROVAL-S154-LANE-ROLE-ROTATION-1 (N1, D7, N2, D1c).
OWNER APPROVAL: item 46 "lane şifre onay" (S150); OWNER-APPROVAL-S154-LANE-ROLE-ROTATION-1 (11:09 TSI).
ADVERSARY GATE: goes to the scout (the rulings add new bytes); reaches AG-4 only with a GREEN verdict row.
ORIGIN: F-S150-LANE-PRINTED-DB-URL-1 - the cwf_lane connection string reached a transcript; the password is treated as disclosed.
PRIOR ART: docs/ops/TOKEN-ROTATION-RUNBOOK.md (profile export + launchctl setenv re-armed from it, full IDE quit, three-reader digest chain).
BRANCH: none · PUSH: no · REPORT: the slips only · PR: no.
SEQUENCING: landings never touch cwf_lane; the collision is with lane writes. PR 592 has landed (anchor master), so AG-4 has no open PR of its own.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| master at cut time, PR 592 merged in it | MEASURED: GitHub API commits/master and pulls/592, Architect bridge, 2026-09-22T06:55Z | master |
| one environment variable names the lane connection string | MEASURED: git grep on origin/master, bridge, 2026-09-22T03:54Z | dsnvar |
| laneExec accepts an explicit env | MEASURED: git grep on origin/master, bridge, 2026-09-22T03:54Z | lexec |

```evidence:master
9aba71fe2cbad0c53f3996d01b8991e5bbe40ed4
pulls/592: merged true, merged_at 2026-09-22T03:57:16Z
```

```evidence:dsnvar
9aba71fe2cbad0c53f3996d01b8991e5bbe40ed4:scripts/laneWrite.mjs:54:export const LANE_DSN_ENV = 'CWF_LANE_DATABASE_URL';
```

```evidence:lexec
9aba71fe2cbad0c53f3996d01b8991e5bbe40ed4:scripts/laneWrite.mjs:329:export async function laneExec(sqlText, params = [], opts = {}) {
9aba71fe2cbad0c53f3996d01b8991e5bbe40ed4:scripts/laneWrite.mjs:330:    const cfg = resolveLaneDsn(opts.env ?? process.env);
```

## PREMISE
MEASURED: the three anchors above.
UNMEASURED by the Architect, carried from the scout's two statuses (bus 2026-09-22T03:45:36Z and 06:56:14Z): laneExec is the only DSN consumer; pg falls back to PGPASSWORD and ~/.pgpass; Supavisor caches credentials (old secret may pass, new may fail with 28P01, for about 15 s or longer on an idle pool) and pg_terminate_backend does not flush that cache; repeated failed auth opens a breaker on the ORIGIN IP for up to 2 minutes, and every lane window shares one IP; classifyVerbError maps every SQLSTATE starting 28 to AUTH_REFUSED.
UNMEASURED: where the variable is set and which windows inherit it (ORDER 0).
SELF-INVALIDATION: dies if the cwf_lane role no longer exists or the owner withdraws either approval.
ON-DISAGREEMENT: YOUR READING WINS: print both, STOP before ORDER 2 if the difference touches where the secret lives.

## FALSIFIER
The runbook pattern (one export line in one shell profile file, plus launchctl setenv re-armed from that line) counts as ONE home. If ORDER 0 finds the variable anywhere else as well (a second profile file, an env file, ~/.pgpass, PGPASSWORD set), STOP after ORDER 0 and report places by NAME and line number only.

## ORDERS
All helpers below are ONE scratch script file outside every repository (no node -e, no pipelines: CLAUDE.md section 3). Every error is caught and only its class is printed.
ORDER 0 - MEASURE, NO CHANGE.
- `npm run env:presence -- CWF_LANE_DATABASE_URL`, then PGPASSWORD.
- For ~/.zshrc, ~/.zprofile, ~/.bash_profile, ~/.profile: `grep -c CWF_LANE_DATABASE_URL <file>`; where above zero, `awk '/CWF_LANE_DATABASE_URL/{print FILENAME":"FNR}' <file>`. Never grep -n, cat, Read or Edit on these files. Env files the AntiGravity launch reads: UNMEASURED; the launchd value (next line) is how the IDE receives it per the runbook.
- `test -e ~/.pgpass`, exit code only.
- The script prints the 12-hex sha256 prefix of: the value in your own process.env, the value `launchctl getenv CWF_LANE_DATABASE_URL` returns (via execFile), and the export line's value. An empty or absent value is printed as UNSET, never as the digest of empty input. These are the PRE-ROTATION digests (N4).
ORDER 1 - GENERATE. The script makes 32 random bytes as base64url (load-bearing: laneWrite's scrub stops at '/'), computes the SCRAM-SHA-256 verifier with node crypto (salt 16 bytes, 4096 iterations, PBKDF2-HMAC-SHA-256, StoredKey = SHA-256(HMAC(SaltedPassword, "Client Key")), ServerKey = HMAC(SaltedPassword, "Server Key"), format `SCRAM-SHA-256$4096:<salt b64>$<StoredKey b64>:<ServerKey b64>`), self-tests against the RFC 7677 worked example first, and writes two mode-600 files outside every repository beside the home ORDER 0 found: the new full connection string (only the password changes) and the verifier. If the write there is refused, STOP; do not relocate.
ORDER 2 - SLIP, THEN STOP. SLIP-LANE-PASSWORD-ROTATION-S154-1: ORDER 0 answers and the pre-rotation digests, the two file paths, the verifier file's 12-hex sha256 prefix, the RFC self-test result. Never the verifier. The Architect then (a) confirms the quiesce, (b) hands the Gemini operator the two statements of OWNER-APPROVAL-S154-LANE-ROLE-ROTATION-1 with the verifier path and prefix, (c) sends you ORDER 3 with the ALTER's UTC time.
ORDER 3 - PROVE NEW, PROVE OLD REFUSED, THEN SWAP (N3).
3a. At least 15 s after the ALTER, the script calls laneExec('select current_user', [], { env: { CWF_LANE_DATABASE_URL: <staged file> } }); CONNECTED only if the row is 'cwf_lane'. A single failure with SQLSTATE 28P01: wait 15 s, one retry. A second failure: STOP, no retry, print the SQLSTATE.
3b. After CONNECTED, wait until 60 s after the ALTER. Then ONE attempt with the OLD value from your own process.env; print the 12-hex digest of the value used (it must differ from the staged value's digest). REVOKED only on SQLSTATE 28P01 exactly; any other code, including other 28 codes, is UNMEASURED. If it CONNECTS: wait 60 s, one more attempt; a second CONNECT is STOP (not revoked).
3c. Only after REVOKED: the script rewrites the export line from the staged file (N2) and re-arms launchctl setenv from it; prints old and new digest prefixes of the export line and the launchd value.
Failed-auth budget from the one IP in ORDER 3: at most 2 (3a) + 0 (3b expects refusals: count them) - state the total you produced in the slip.
3d. Required owner action, named in the slip: full IDE quit and reopen. After it, a running window prints its process.env digest; the chain terminal / launchd / window must agree and differ from the pre-rotation digest (runbook section 4).
Slip: SLIP-LANE-PASSWORD-ROTATION-S154-1-ORDER3 with 3a, 3b, 3c digests, the failed-auth count, the 3d statement. Stop.

## SHARED SURFACES
No repository file changes. The secret's home on the owner's machine, shared by every lane window.

## DECISION RIGHTS
AG-4 decides mechanics inside the scratch script. The Gemini operator alone writes the role, under OWNER-APPROVAL-S154-LANE-ROLE-ROTATION-1 only. The Architect alone sequences ORDER 2 and ORDER 3 and holds the quiesce from the ALTER until 3d.
FORBIDDEN: never print the password, the connection string, the verifier, or any line of any env or profile file; no git add of any file holding them; no poll task, no cron.

END · CARD-LANE-PASSWORD-ROTATION-S154-1-v3
