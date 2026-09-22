<!-- relay-audit: v1 kind=card -->
CARD-LANE-PASSWORD-ROTATION-S154-1-v2

LANE: AG-4
fanout: personalized (one lane, one body)
MEASURED-AT: 2026-09-22T03:55Z (bridge clock)
SUPERSEDES: CARD-LANE-PASSWORD-ROTATION-S153-1-v1 (scout RED, SCOUT-STATUS-REVIEW-CARD-LANE-PASSWORD-ROTATION-S153-1-v1, bus 2026-09-22T03:45:36Z). Every defect D1-D8 is applied below and named where it lands.
OWNER APPROVAL: "lane şifre onay" (S150, item 46, due 2026-09-22), OWNER-APPROVAL-S152-LANDINGS-1 (item 46 named), S154 plan approval "onayliyorum" 06:40 TSI. The ALTER ROLE is run by the Gemini operator only (owner rule: only the Gemini operator writes CWF tables).
ADVERSARY GATE: NEW SUBJECT, second version. Goes to the scout first; reaches AG-4 only with a GREEN verdict row.
ORIGIN: F-S150-LANE-PRINTED-DB-URL-1 - a lane printed the cwf_lane connection string into a transcript; the password is treated as disclosed and is rotated.
PRIOR ART (D-e): docs/ops/TOKEN-ROTATION-RUNBOOK.md (profile export + launchctl setenv re-armed from it, full IDE quit, digest chain). Read it first; this card follows its pattern.
BRANCH: none (no repo file changes) · PUSH: no · REPORT: the slips only · PR: no.
SEQUENCING (D1, D8): landings are GitHub's and never touch cwf_lane; the collision is with LANE WRITES (laneExec, lane:boot, mail-wait --take, laneSlip posts). PR 592 is AG-4's own open PR (head 79afd267c6fb7a11a7f8b0b3a854247279f79287); AG-4 takes this card only after PR 592 has landed, so no fix push of its own can be needed mid-rotation.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| one environment variable names the lane connection string | MEASURED: git grep on origin/master, bridge, 2026-09-22T03:54Z | dsnvar |
| laneExec accepts an explicit env, so a staged value can be proven before the swap | MEASURED: git grep on origin/master, bridge, 2026-09-22T03:54Z | lexec |
| a rotation runbook already exists | MEASURED: git ls-tree and git grep on origin/master, bridge, 2026-09-22T03:54Z | runbook |

```evidence:dsnvar
a4b8f393ffe69a044a4b1f143e02eed584da0028:scripts/laneWrite.mjs:54:export const LANE_DSN_ENV = 'CWF_LANE_DATABASE_URL';
```

```evidence:lexec
a4b8f393ffe69a044a4b1f143e02eed584da0028:scripts/laneWrite.mjs:329:export async function laneExec(sqlText, params = [], opts = {}) {
a4b8f393ffe69a044a4b1f143e02eed584da0028:scripts/laneWrite.mjs:330:    const cfg = resolveLaneDsn(opts.env ?? process.env);
```

```evidence:runbook
a4b8f393ffe69a044a4b1f143e02eed584da0028:docs/ops/TOKEN-ROTATION-RUNBOOK.md:1:# TOKEN ROTATION RUNBOOK — `SUPABASE_ACCESS_TOKEN`
a4b8f393ffe69a044a4b1f143e02eed584da0028:docs/ops/TOKEN-ROTATION-RUNBOOK.md:46:## 3 · Rotation, in three steps
```

## PREMISE
MEASURED: 2026-09-22T03:54Z, bridge, git grep on origin/master a4b8f393ffe69a044a4b1f143e02eed584da0028: LANE_DSN_ENV = 'CWF_LANE_DATABASE_URL' (scripts/laneWrite.mjs:54); laneExec reads resolveLaneDsn(opts.env ?? process.env) (scripts/laneWrite.mjs:330).
RELAYED: scout status 03:45:36Z: laneExec is the only DSN consumer (callers factoryState.callVerb, mail-wait.stampConsumed, laneSlip.postSlip); no workflow names cwf_lane; pg falls back to PGPASSWORD and ~/.pgpass when a DSN carries no password; the live DSN goes through the Supavisor pooler, which caches credentials (old secret can pass and the new one can fail with 28P01 for about 15 s with an active pool, longer with an idle pool) and opens a circuit breaker that blocks the ORIGIN IP for up to 2 minutes on repeated failed auth. Every lane window is on the owner's one machine, so one IP.
UNMEASURED: where the variable is set and which windows inherit it (ORDER 0 measures).
SELF-INVALIDATION: dies if the cwf_lane role no longer exists, if the owner withdraws the approval, or if PR 592 is still open when you take it.
ON-DISAGREEMENT: YOUR READING WINS: print both, and STOP before ORDER 2 if the difference touches where the secret lives.

## FALSIFIER (D6)
The runbook pattern - one export line in one shell profile file PLUS launchctl setenv re-armed FROM that line - counts as ONE home. If ORDER 0 finds the variable anywhere else as well (a second profile file, an env file, a .pgpass, PGPASSWORD set), STOP after ORDER 0 and report the places by NAME and line number only. The Architect re-plans; no half rotation.

## ORDERS
ORDER 0 - MEASURE, NO CHANGE (D4). Instruments, and only these:
- `npm run env:presence -- CWF_LANE_DATABASE_URL`, then the same for PGPASSWORD.
- For each of ~/.zshrc, ~/.zprofile, ~/.bash_profile, ~/.profile and any env file the AntiGravity launch reads: `grep -c CWF_LANE_DATABASE_URL <file>` and, only where the count is above zero, `awk '/CWF_LANE_DATABASE_URL/{print FILENAME":"FNR}' <file>`. Never grep -n, never cat, never the Read or Edit tool on any profile or env file.
- `test -e ~/.pgpass` and print only its exit code.
- launchd: only `launchctl getenv CWF_LANE_DATABASE_URL | shasum -a 256 | cut -c1-12` (a digest prefix, per runbook section 4); never bare.
Say which windows inherit the value and from where; if it comes through launchd to the IDE, the restart for every window is the owner's full IDE quit (runbook section 3).
ORDER 1 - GENERATE, LOCALLY (D5). Write ONE scratch script OUTSIDE every repository (no node -e). It generates 32 random bytes as base64url (base64url is load-bearing: laneWrite's scrub stops at '/', standard base64 would defeat it), computes the SCRAM-SHA-256 verifier with node crypto only (salt 16 random bytes, 4096 iterations, PBKDF2-HMAC-SHA-256; StoredKey = SHA-256(HMAC(SaltedPassword, "Client Key")); ServerKey = HMAC(SaltedPassword, "Server Key"); format `SCRAM-SHA-256$4096:<salt b64>$<StoredKey b64>:<ServerKey b64>`), proves the verifier function against the RFC 7677 worked example first, and writes two files OUTSIDE every repository, mode 600, beside the home ORDER 0 found: the NEW full connection string (only the password changes) and the verifier. Every error is caught and only its class is printed; no uncaught URL or parse error (a TypeError from new URL() prints its input, which is the whole DSN).
ORDER 2 - POST PATHS, NOT THE VERIFIER (D7). The verifier plus one captured exchange lets an attacker authenticate, so it never goes on the bus. Your slip SLIP-LANE-PASSWORD-ROTATION-S154-1 carries: ORDER 0's answers, the two file paths, the sha256 prefix (12 hex) of the verifier file, and the RFC self-test result. Stop. The Architect then orders the Gemini operator (on the owner's machine, reading the verifier from that path) to run, on project fjbrkimwvtpwoxhziidh: ALTER ROLE cwf_lane PASSWORD '<verifier>'; then `select pg_terminate_backend(pid) from pg_stat_activity where usename='cwf_lane'` (D2).
ORDER 2.5 - QUIESCE (D1). Before the operator's ALTER, the Architect confirms no cwf_lane user is in flight: no card open in AG-1, AG-2, AG-4 or the foreman, and pg_stat_activity shows no cwf_lane session. The Architect records this in the notice that starts ORDER 3. Scouts are not affected unless they --take.
ORDER 3 - PROVE, THEN SWAP, THEN PROVE REVOCATION (a second notice from the Architect starts this, after the operator's confirmation) (D2, D3).
3a. Wait at least 15 s after the operator's ALTER. With a scratch script OUTSIDE every repository, call laneExec('select current_user', [], { env: { CWF_LANE_DATABASE_URL: <read from the staged file> } }) and print CONNECTED only if the row is 'cwf_lane'. A single 28P01 is RETRY-ONCE-AFTER-15s, not a verdict; a second failure: STOP, no further retry (the IP breaker), print the classified failure.
3b. Only after CONNECTED: replace the old value with the staged one at the home ORDER 0 found, in one move, and re-arm launchctl from it if the runbook pattern applies. Print the new digest prefix (runbook section 4).
3c. Revocation proof: with no other attempt in flight, ONE attempt with the OLD value (your own process.env, still the old one) must answer AUTH-REFUSED. If it CONNECTS, the rotation is not done: STOP and report.
3d. Required owner action, named in your slip: if the value reaches windows through launchd, the owner fully quits and reopens the IDE so every window gets the new value.
Slip: SLIP-LANE-PASSWORD-ROTATION-S154-1-ORDER3 with 3a, 3b digest, 3c, and the restart statement. Stop.

## SHARED SURFACES
No repository file changes. The secret's home on the owner's machine is shared by every lane window; ORDER 0 names it.

## DECISION RIGHTS
AG-4 decides the generation mechanics inside ORDER 1. The Gemini operator alone writes the role. The Architect alone sequences ORDER 2.5 and ORDER 3. The owner alone restarts windows other than AG-4's.
FORBIDDEN: never print the password, the connection string, the verifier, or any line of any env or profile file; no bash command whose output could contain them; no git add of any file holding them; no poll task, no cron.

END · CARD-LANE-PASSWORD-ROTATION-S154-1-v2
