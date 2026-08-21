# OPERATOR-SNAPSHOT-LIFECYCLE-1 · v1

<!-- Architect-authored · S94 · the apply relay for walk item #38's migration.
     Lane: Gemini + Supabase MCP (Operator). Self-contained. -->

## PROJECT FENCE

Every action in this relay targets Supabase project **`fjbrkimwvtpwoxhziidh`**
and NOTHING else. If any tool, URL or prompt ever shows a different project
ref, STOP immediately and report what you saw.

## THE THREE SENTENCES (S93-3 — binding, acknowledge before starting)

1. You will report EVERY state-changing call you make — including attempts and
   retries, successful or not.
2. You will NOT touch any repository file under ANY circumstance — no edits,
   no "fixes", no formatting, nothing.
3. If push or any tool complains about anything, you STOP and report the
   complaint VERBATIM — you do not work around it.

## WHAT YOU ARE APPLYING

One migration, already merged to master and reviewed:
`supabase/migrations/20260811160000_snapshot_lifecycle.sql`
(master = `d114a717d40928ef1af48eceb91daf0a8de19b22`).

It adds, to the learning-snapshot organ: a unique index on
`learning_snapshots.name` (with a backfill that renames today's three
duplicate `s93-birth` rows by created_at order), a `keep` column, three new
values in `memory_audit.action`'s CHECK, and four SECURITY DEFINER functions
(`learning_snapshot_take` replaced with auto-suffix; `learning_snapshot_delete`,
`learning_snapshot_set_keep`, `learning_snapshot_purge_candidates`,
`learning_snapshot_purge` new), all service-role-only EXECUTE.

**Method: `supabase db push` ONLY (ADR-005). Never `apply_migration`, never
hand-run SQL from the file, never edit the file.**

## STEP 0 · PRE-FLIGHT READS (report each result)

Run these as plain reads and paste the outputs:

```sql
-- (a) the three duplicate rows, as they are BEFORE the apply
select id, name, created_at from public.learning_snapshots order by created_at;

-- (b) the CHECK as it stands (expect FOUR action values)
select pg_get_constraintdef(oid) from pg_constraint
where conrelid = 'public.memory_audit'::regclass and conname like '%action%';

-- (c) migration ledger tail
select version, name from supabase_migrations.schema_migrations
order by version desc limit 3;
```

Expected: (a) three rows, all named `s93-birth`, created 09:10 / 09:11 /
09:12Z, the newest being id `d16f6636-cd41-4db2-ae35-e0d7373795ed`;
(b) four values ending at `learning_restore`; (c) top entry `20260811120000`.
If ANY expectation fails, STOP and report — do not push.

## STEP 1 · APPLY

`supabase db push` against the fenced project. Paste the FULL output.

**Expected inside the output: exactly TWO `NOTICE` lines** of the form
`snapshot-lifecycle backfill: renamed <id> to <name>` — the second and third
duplicates taking `-2` and `-3`. Zero notices, one notice, or three+ notices
is a divergence: report it verbatim and STOP before Step 2.

## STEP 2 · G-GATES (post-apply verification reads; paste every result)

```sql
-- G1 · the backfill outcome: three DISTINCT names, canonical row = -3
select id, name from public.learning_snapshots order by created_at;
-- EXPECT: af05edee… → 's93-birth' · 7a42e573… → 's93-birth-2'
--         d16f6636… → 's93-birth-3'

-- G2 · the unique index exists
select indexname from pg_indexes
where tablename='learning_snapshots' and indexname='learning_snapshots_name_uidx';

-- G3 · keep column: present, not null, default false
select column_name, is_nullable, column_default
from information_schema.columns
where table_name='learning_snapshots' and column_name='keep';

-- G4 · the CHECK now carries SEVEN action values
select pg_get_constraintdef(oid) from pg_constraint
where conrelid = 'public.memory_audit'::regclass and conname like '%action%';

-- G5 · the four functions exist and are service-role-only:
--      authenticated/anon must have NO execute (has_function_privilege = f)
select p.proname,
       has_function_privilege('authenticated', p.oid, 'execute') as auth_can,
       has_function_privilege('anon',          p.oid, 'execute') as anon_can,
       has_function_privilege('service_role',  p.oid, 'execute') as service_can
from pg_proc p join pg_namespace n on n.oid=p.pronamespace
where n.nspname='public' and p.proname in
 ('learning_snapshot_take','learning_snapshot_delete','learning_snapshot_set_keep',
  'learning_snapshot_purge_candidates','learning_snapshot_purge');
-- EXPECT every row: auth_can=f · anon_can=f · service_can=t

-- G6 · ledger: the new migration is recorded
select version, name from supabase_migrations.schema_migrations
order by version desc limit 2;
-- EXPECT top: 20260811160000
```

## STEP 3 · WHAT YOU DO NOT DO

* You do NOT delete any snapshot row. The two synthetic rows die through the
  OWNER's panel — that deletion IS the phase's birth proof and must run
  through the real endpoint under real audit, never raw SQL.
* You do NOT re-push, retry, or "clean up" anything not listed above.
* You do NOT echo any secret, connection string, or token in your report.

## REPORT SHAPE

One message back: the S93-3 acknowledgement · Step 0 outputs · the full push
output with the two NOTICE lines · G1–G6 outputs · and a single closing line:
either "all gates as expected" or the exact divergence, verbatim.

The Architect will independently re-read G1–G6 from its own connection before
declaring the apply complete.
