# OPERATOR PROMPT — Apply L4 ROUTING-DRAFTS migration · v1

<!-- cwf-operator-L4-apply-v1 · rev 1 · 2026-07-10 · Operator-lane artifact (Gemini +
     Supabase MCP/CLI). Applies supabase/migrations/20260710150000_l4_routing_drafts.sql
     to project fjbrkimwvtpwoxhziidh via `supabase db push` ONLY. Master anchor: b4223cd. -->

## FENCE (read FIRST — violating any line aborts the run)

- You may apply migrations ONLY via `npx supabase db push`. `apply_migration` and any
  DDL through `execute_sql` are **FORBIDDEN**.
- You make **ZERO repo mutations**: no commits, no file edits, no branch operations.
  Git is READ-ONLY for you (clone/pull/inspect only).
- You never echo secret values (tokens, keys, connection strings). If a command output
  would contain one, redact it as `[REDACTED]` in your report.
- You do not "fix" anything that fails. On ANY unexpected output: STOP, capture the
  literal output, report. No improvisation, no retries beyond what a step specifies.
- Diagnostic READS via Supabase MCP `execute_sql` are allowed (SELECT-only).

## STEP 0 — Repo-state gate (read-only)

```bash
cd /tmp && rm -rf cwf_op_l4 && git clone --quiet https://github.com/maymun207/cwf_yaprak cwf_op_l4 && cd cwf_op_l4
git rev-parse origin/master
# G0-a EXPECT: b4223cdfc66cbc574dcd7f28b5cd4bdbae2cb469 — anything else: STOP.
ls supabase/migrations/ | tail -3
# G0-b EXPECT the last line to be 20260710150000_l4_routing_drafts.sql — else STOP.
```

## STEP 1 — Link + push (the ONE sanctioned door)

```bash
npx supabase login --token [YOUR TOKEN — never echo it]
npx supabase link --project-ref fjbrkimwvtpwoxhziidh
npx supabase db push
```
G1 (literal-read): the push output lists **exactly one** migration being applied:
`20260710150000_l4_routing_drafts.sql`. If it lists MORE than one, or reports a
version-history repair need, STOP and report verbatim.

## STEP 2 — Schema-read confirmation (Supabase MCP, SELECT-only)

Run each and paste literal results:

```sql
-- G2-a: pinned column landed (EXPECT one row: pinned | boolean | NO | false)
select column_name, data_type, is_nullable, column_default
from information_schema.columns
where table_schema='public' and table_name='tool_category_cache' and column_name='pinned';

-- G2-b: routing_drafts shape (EXPECT 5 rows: user_id, keyword, op, categories, updated_at)
select column_name, data_type from information_schema.columns
where table_schema='public' and table_name='routing_drafts' order by ordinal_position;

-- G2-c: routing_audit shape (EXPECT 8 rows: id, actor_user_id, action, keyword, before, after, epoch_after, created_at)
select column_name, data_type from information_schema.columns
where table_schema='public' and table_name='routing_audit' order by ordinal_position;

-- G2-d: RLS posture (EXPECT both rows rowsecurity = true)
select relname, relrowsecurity from pg_class
where relname in ('routing_drafts','routing_audit');

-- G2-e: policy counts (EXPECT routing_drafts = 4, routing_audit = 0)
select tablename, count(*) from pg_policies
where tablename in ('routing_drafts','routing_audit') group by tablename;
-- NOTE: routing_audit will be ABSENT from this result (0 policies = no rows) — that
-- absence IS the expected evidence, state it explicitly.

-- G2-f: privilege layer (EXPECT: routing_drafts anon has NO write privs but
-- authenticated KEEPS insert/update/delete; routing_audit — NEITHER role has writes)
select grantee, table_name, privilege_type from information_schema.role_table_grants
where table_schema='public' and table_name in ('routing_drafts','routing_audit')
  and grantee in ('anon','authenticated')
order by table_name, grantee, privilege_type;

-- G2-g: both tables empty at birth (EXPECT 0 and 0)
select (select count(*) from public.routing_drafts) as drafts,
       (select count(*) from public.routing_audit) as audit;
```

## STEP 3 — Live probe run (verifyGrants first-exercise)

```bash
cd /tmp/cwf_op_l4 && npm ci --no-audit --no-fund
# .env: copy the standing Operator .env.local into the clone root (values never echoed).
npx vite-node scripts/verifyGrants.ts
```
G3 (literal-read): ALL probes PASS, including the two NEW first-exercise rows —
`routing_drafts` anon-UPDATE **42501-DENIED** and `routing_audit` anon-UPDATE
**42501-DENIED**. Report the final `pass/fail` counts verbatim (expected total = the
previous 37 + 2 = 39; if the script prints a different denominator, report it as-is —
the invariant is fail=0 with both new rows present and DENIED).

## STEP 4 — Idempotence probe (mandatory second run)

```bash
npx supabase db push
```
G4 EXPECT: "Remote database is up to date." (no migration re-applied).

## STEP 5 — Report

Literal outputs for G0–G4, any deviation disclosed (env mechanics like clone dir /
.env copy are the known benign class), zero repo mutations attested, no secrets echoed.

<!-- END · cwf-operator-L4-apply-v1 · rev 1 · 2026-07-10 -->
