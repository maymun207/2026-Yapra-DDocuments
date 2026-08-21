# OPERATOR PROMPT — Apply L5 PROGRESSIVE-DELIVERY migration · v1

<!-- cwf-operator-L5-apply-v1 · rev 1 · 2026-07-10 · Operator-lane artifact (Gemini +
     Supabase MCP/CLI). Applies supabase/migrations/20260710180000_l5_progressive_delivery.sql
     to project fjbrkimwvtpwoxhziidh via `supabase db push` ONLY. Master anchor: eb1e74e. -->

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
- Benign-deviation class (standing): an already-authenticated shell may skip
  `login --token`; copying the standing Operator `.env.local` into the clone is env
  mechanics, not a repo mutation.

## STEP 0 — Repo-state gate (read-only)

```bash
cd /tmp && rm -rf cwf_op_l5 && git clone --quiet https://github.com/maymun207/cwf_yaprak cwf_op_l5 && cd cwf_op_l5
git rev-parse origin/master
# G0-a EXPECT: eb1e74e606ebdaffa5fe8b010b36e19046be0bbe — anything else: STOP.
ls supabase/migrations/ | tail -3
# G0-b EXPECT the last line to be 20260710180000_l5_progressive_delivery.sql — else STOP.
```

## STEP 1 — Link + push (the ONE sanctioned door)

```bash
npx supabase login --token [YOUR TOKEN — never echo it; skip if already authed]
npx supabase link --project-ref fjbrkimwvtpwoxhziidh
npx supabase db push
```
G1 (literal-read): the push output lists **exactly one** migration being applied:
`20260710180000_l5_progressive_delivery.sql`. If it lists MORE than one, or reports a
version-history repair need, STOP and report verbatim. (`NOTICE`s from
`if not exists` guards on a fresh apply are the benign idempotence class — report them,
do not treat as failure.)

## STEP 2 — Schema-read confirmation (Supabase MCP, SELECT-only)

Run each and paste literal results:

```sql
-- G2-a: publish_rollouts shape (EXPECT 11 rows, this order: id, family, target,
-- candidate_rule_id, candidate_prompt_rev, prior_prompt_rev, percent, state,
-- created_by, created_at, updated_at)
select column_name, data_type from information_schema.columns
where table_schema='public' and table_name='publish_rollouts' order by ordinal_position;

-- G2-b: rollout_audit shape (EXPECT 6 rows: id, rollout_id, action, actor_user_id,
-- detail, created_at)
select column_name, data_type from information_schema.columns
where table_schema='public' and table_name='rollout_audit' order by ordinal_position;

-- G2-c: RLS posture (EXPECT both rows rowsecurity = true)
select relname, relrowsecurity from pg_class
where relname in ('publish_rollouts','rollout_audit');

-- G2-d: policy counts (EXPECT ZERO rows returned — both tables have 0 policies;
-- the ABSENCE of rows IS the expected evidence, state it explicitly)
select tablename, count(*) from pg_policies
where tablename in ('publish_rollouts','rollout_audit') group by tablename;

-- G2-e: privilege layer (EXPECT ZERO rows returned — NEITHER anon NOR authenticated
-- holds ANY privilege on either table, SELECT and TRUNCATE included; the absence of
-- rows IS the evidence, state it explicitly)
select grantee, table_name, privilege_type from information_schema.role_table_grants
where table_schema='public' and table_name in ('publish_rollouts','rollout_audit')
  and grantee in ('anon','authenticated')
order by table_name, grantee, privilege_type;

-- G2-f: the one-delta-in-flight partial unique index (EXPECT one row whose indexdef
-- contains: UNIQUE, (family), and WHERE state = ANY / IN ('staged','progressing'))
select indexname, indexdef from pg_indexes
where schemaname='public' and indexname='publish_rollouts_one_active_per_family';

-- G2-g: fn EXECUTE ACL via pg_proc.proacl (the standing check — role_routine_grants
-- alone misses PUBLIC grants). EXPECT: proacl lists service_role (+ the owner,
-- typically postgres) and does NOT list anon, authenticated, or an =X entry (PUBLIC).
select proname, proacl from pg_proc
where proname = 'usage_empty_by_fingerprint';

-- G2-h: both tables empty at birth (EXPECT 0 and 0)
select (select count(*) from public.publish_rollouts) as rollouts,
       (select count(*) from public.rollout_audit) as audit;
```

## STEP 3 — Live probe run (verifyGrants first-exercise)

```bash
cd /tmp/cwf_op_l5 && npm ci --no-audit --no-fund
# .env: copy the standing Operator .env.local into the clone root (values never echoed).
npx vite-node scripts/verifyGrants.ts
```
G3 (literal-read): ALL probes PASS with **fail = 0**, including the THREE NEW
first-exercise rows — `publish_rollouts` anon-UPDATE **42501-DENIED**,
`rollout_audit` anon-UPDATE **42501-DENIED**, and the fn probe
`usage_empty_by_fingerprint` anon-EXECUTE **42501-DENIED** (a PGRST202 on the fn probe
is INCONCLUSIVE-fail, not a pass — report verbatim if seen). Report the final pass/fail
counts verbatim (expected total = the previous 39 + 2 table probes + 1 fn probe = 42;
if the script prints a different denominator, report it as-is — the invariant is fail=0
with all three new rows present and DENIED).

## STEP 4 — Idempotence probe (mandatory second run)

```bash
npx supabase db push
```
G4 EXPECT: "Remote database is up to date." (no migration re-applied).

## STEP 5 — Report

One block, in order: G0-a/b · G1 push output (verbatim, secrets redacted) ·
G2-a…h literal results (state the two expected-absence gates explicitly) ·
G3 full probe tally with the three first-exercise lines quoted · G4 line ·
any deviations (benign class named, everything else verbatim). You change NOTHING
in the repo and you do NOT flip any docs — the DOC-FLIP is the Author lane's job
after the Architect verifies this report.

<!-- END · cwf-operator-L5-apply-v1 · rev 1 · 2026-07-10 -->
