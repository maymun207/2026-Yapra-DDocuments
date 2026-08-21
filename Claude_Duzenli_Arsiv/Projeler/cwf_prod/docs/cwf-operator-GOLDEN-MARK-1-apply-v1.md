# OPERATOR — Apply GOLDEN-MARK-1 Migration (`golden_specimens`) · v1

<!-- cwf-operator-GOLDEN-MARK-1-apply-v1 · rev 1 · 2026-07-10 · Operator-lane artifact
     (Gemini + Supabase MCP/CLI — NOT for AG). Migration under apply:
     supabase/migrations/20260710120000_golden_specimens.sql, authored at master dabc29e.
     Supabase project: fjbrkimwvtpwoxhziidh. -->

## ⛔ FENCE (read FIRST — violating any line = STOP and report)

- You are the **Operator**. You NEVER mutate the repository: **read-only git** (clone/pull/
  inspect only — no commit, no push, no file edits, no branch creation).
- The ONLY apply mechanism is **`supabase db push`**. `apply_migration` and any
  `execute_sql` DDL are **FORBIDDEN**.
- You NEVER echo secret values (tokens, keys, connection strings). Command output containing
  a secret is redacted before reporting.
- You write to NO governed table. This task touches the DB **only** through `db push` and
  read-only verification queries.
- Any gate below that does not literally match its expected output ⇒ **STOP, report
  verbatim, await the Architect**. Never improvise a fix.

## Step 0 — Repo-state gate (read-only)

```bash
cd /tmp && rm -rf cwf_op && git clone --quiet https://github.com/maymun207/cwf_yaprak cwf_op && cd cwf_op
git rev-parse origin/master
```
**G0-a:** MUST print `dabc29e9e42a7e26f1781dd8c308676832c2a888`. Anything else ⇒ STOP.
```bash
ls supabase/migrations/ | tail -3
```
**G0-b:** `20260710120000_golden_specimens.sql` MUST be the last entry. Read the file once,
literally — confirm it creates ONE table, enables RLS, creates ZERO policies, contains ONE
`revoke` line and NO `create function` / `security definer`. Report: "G0 file literal-read:
matches" or STOP.

## Step 1 — Link + push (the ONE apply door)

```bash
npx supabase login --token <your token>   # never echo the token
npx supabase link --project-ref fjbrkimwvtpwoxhziidh
npx supabase db push
```
**G1:** the push output MUST list exactly `20260710120000_golden_specimens.sql` as applied
(and nothing else pending). Paste the output (redacted if needed). Any error ⇒ STOP verbatim.

## Step 2 — Schema-read confirmation (applied ≠ authored — this gate is the proof)

Run via the Supabase read path and paste literal results:

```sql
select column_name, data_type, is_nullable
from information_schema.columns
where table_schema='public' and table_name='golden_specimens'
order by ordinal_position;
```
**G2-a:** exactly 6 rows — `message_id uuid NO · marked_by uuid NO · marked_at timestamptz NO
· revoked_by uuid YES · revoked_at timestamptz YES · note text YES`.

```sql
select relrowsecurity from pg_class where oid='public.golden_specimens'::regclass;
select count(*) from pg_policies where schemaname='public' and tablename='golden_specimens';
select count(*) from public.golden_specimens;
```
**G2-b:** `relrowsecurity = true` · policy count = `0` · row count = `0` (fresh ledger).

## Step 3 — Privilege-layer read (the REVOKE actually landed)

```sql
select
  has_table_privilege('anon','public.golden_specimens','SELECT')  as anon_select,
  has_table_privilege('anon','public.golden_specimens','INSERT')  as anon_insert,
  has_table_privilege('anon','public.golden_specimens','UPDATE')  as anon_update,
  has_table_privilege('authenticated','public.golden_specimens','SELECT') as auth_select,
  has_table_privilege('authenticated','public.golden_specimens','UPDATE') as auth_update;
```
**G3:** all five MUST be `false`. Any `true` ⇒ STOP (this is the Q1-FIX-1 leak class).

## Step 4 — Probe first-exercise (live verifyGrants)

From the read-only clone, with the anon-probe env present (`VITE_SUPABASE_URL` /
`VITE_SUPABASE_PUBLISHABLE_KEY` — values never echoed):

```bash
npm ci --no-audit --no-fund --silent
npx vite-node scripts/verifyGrants.ts
```
**G4:** the `golden_specimens` UPDATE probe line MUST read **DENIED (42501)**. Total: ALL
probes PASS, **zero LEAK, zero INCONCLUSIVE** — report the script's own summary count
verbatim (the registry gained one table row this phase; the last live total was 36/36, so
the natural expectation is 37/37 — but the LITERAL script output is the record, never
arithmetic). Any LEAK/INCONCLUSIVE ⇒ STOP per the HARDEN-FN-PROBE-1 fence.

## Step 5 — Idempotence confirmation (cheap, natural for db push)

```bash
npx supabase db push
```
**G5:** MUST report nothing to apply ("Remote database is up to date" or equivalent). Paste it.

## Report format (honest history — never sanitized)

G0–G5 literal outputs (redacted only where a secret would appear) · every deviation disclosed,
however benign (the S31 `--env-file` class) · explicit closing line: "golden_specimens applied
& live-verified; probes <N>/<N>; zero client privilege; 0 rows."

<!-- END · cwf-operator-GOLDEN-MARK-1-apply-v1 · rev 1 · 2026-07-10 -->
