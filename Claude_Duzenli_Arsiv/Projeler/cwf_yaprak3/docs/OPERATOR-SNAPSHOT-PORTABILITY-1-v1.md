# OPERATOR-SNAPSHOT-PORTABILITY-1 · v1

<!-- Architect-authored · S94 · apply relay for walk item #39's migration.
     Lane: Gemini + Supabase MCP (Operator). Self-contained. -->

## PROJECT FENCE

Every action targets Supabase project **`fjbrkimwvtpwoxhziidh`** and NOTHING
else. A different ref anywhere → STOP, report what you saw.

## THE THREE SENTENCES (S93-3 — acknowledge before starting)

1. You report EVERY state-changing call — attempts and retries included.
2. You NEVER touch any repository file.
3. Any tool complaint → STOP and report it VERBATIM; no workarounds.

## WHAT YOU ARE APPLYING

One migration, merged and reviewed:
`supabase/migrations/20260812120000_snapshot_portability.sql`
(master = `61834342160be33c78fbbb7a27afb7d1ec75a9f5`).

Pure DDL + functions — **it touches ZERO data rows**: three new audit action
values in the CHECK, a nullable `safety_snapshot_id` column on `memory_audit`,
one INTERNAL naming helper, replaced bodies for `learning_snapshot_take` and
`learning_restore` (the restore now REQUIRES an installation argument), and
three new SECURITY DEFINER functions (export-read / import / seed). No
NOTICEs are expected this time — any NOTICE in the output is a divergence to
report verbatim.

**Method: `supabase db push` ONLY (ADR-005).** Never `apply_migration`, never
hand-run SQL, never edit the file.

## STEP 0 · PRE-FLIGHT READS (paste each result)

```sql
-- (a) CHECK today: expect SEVEN action values
select pg_get_constraintdef(oid) from pg_constraint
where conrelid='public.memory_audit'::regclass and conname like '%action%';

-- (b) snapshot table today: expect exactly ONE row, s93-birth-3
select id, name, keep from public.learning_snapshots order by created_at;

-- (c) ledger tail: expect top = 20260811160000
select version, name from supabase_migrations.schema_migrations
order by version desc limit 2;
```

Any expectation fails → STOP, do not push.

## STEP 1 · APPLY

`supabase db push` against the fenced project. Paste the FULL output.
Expected: the one file applies cleanly, **zero NOTICE lines**, zero prompts
beyond the standard Y/n.

## STEP 2 · G-GATES (paste every result)

```sql
-- G1 · CHECK now TEN values, nothing dropped
select pg_get_constraintdef(oid) from pg_constraint
where conrelid='public.memory_audit'::regclass and conname like '%action%';

-- G2 · the new audit column: nullable uuid
select column_name, data_type, is_nullable from information_schema.columns
where table_name='memory_audit' and column_name='safety_snapshot_id';

-- G3 · function census + privileges: the three NEW public doors are
--      service-role-only; the INTERNAL helper is executable by NOBODY
select p.proname,
       has_function_privilege('authenticated', p.oid, 'execute') as auth_can,
       has_function_privilege('anon',          p.oid, 'execute') as anon_can,
       has_function_privilege('service_role',  p.oid, 'execute') as service_can
from pg_proc p join pg_namespace n on n.oid=p.pronamespace
where n.nspname='public' and p.proname in
 ('learning_snapshot_export_read','learning_snapshot_import',
  'learning_seed_from_snapshot','_learning_snapshot_insert_unique');
-- EXPECT: the three public doors f/f/t · the helper f/f/f

-- G4 · the replaced restore REQUIRES the installation argument
select pg_get_function_arguments(p.oid)
from pg_proc p join pg_namespace n on n.oid=p.pronamespace
where n.nspname='public' and p.proname='learning_restore';
-- EXPECT: exactly ONE definition, containing p_installation, with NO default

-- G5 · data untouched: still ONE snapshot row, byte-same id
select id, name, keep from public.learning_snapshots order by created_at;

-- G6 · ledger top = 20260812120000
select version, name from supabase_migrations.schema_migrations
order by version desc limit 2;
```

## STEP 3 · WHAT YOU DO NOT DO

* No exports, imports, seeds, wipes, restores, or deletions — every one of
  those belongs to the owner's ritual through the panel.
* No re-push, no retries beyond reporting, no secrets echoed.

## REPORT SHAPE

One message: S93-3 acknowledgement · Step 0 outputs · full push output ·
G1–G6 outputs · one closing line: "all gates as expected" or the exact
divergence verbatim. The Architect independently re-reads the gates from its
own connection before declaring the apply complete.
