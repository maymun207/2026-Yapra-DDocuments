# OPERATOR-SNAPSHOT-PORTABILITY-1-FIX-2 · v1 — HOTFIX APPLY

<!-- Architect-authored · S94. Give this to the Operator ONLY AFTER AG reports
     the FIX-2 merge is on origin/master. Lane: Gemini + Supabase MCP. -->

## PROJECT FENCE
Everything targets **`fjbrkimwvtpwoxhziidh`**. Anything else on screen → STOP.

## THE THREE SENTENCES (S93-3 — acknowledge first)
1. Report EVERY state-changing call, attempts and retries included.
2. NEVER touch/edit any repository file. (Updating your working copy with a
   plain `git pull` on master is a READ act and is required here — the file
   you must push was merged after your last pull.)
3. Any tool complaint → STOP, report VERBATIM.

## WHAT YOU ARE APPLYING
`supabase/migrations/20260812160000_restore_where_true.sql` — replaces the
bodies of `learning_restore` and `learning_wipe` so their full-table deletes
carry `where true` (this database preloads `safeupdate` on app sessions; a
bare DELETE is refused at runtime). Pure function replacement — ZERO data
rows, ZERO schema objects, no NOTICEs expected.

## STEP 0 · PRE-FLIGHT (paste outputs)
1. `git pull` on master in your working copy, then confirm the file
   `20260812160000_restore_where_true.sql` EXISTS locally. Absent → STOP.
2. ```sql
   select version from supabase_migrations.schema_migrations
   order by version desc limit 1;  -- EXPECT 20260812120000
   ```

## STEP 1 · APPLY
`supabase db push` — paste the FULL output. Exactly one file should apply.

## STEP 2 · G-GATES (paste outputs)
```sql
-- G1 · ledger top
select version, name from supabase_migrations.schema_migrations
order by version desc limit 2;   -- EXPECT top: 20260812160000

-- G2 · both live bodies now carry six where-true deletes each
select p.proname,
       (length(pg_get_functiondef(p.oid))
        - length(replace(pg_get_functiondef(p.oid), 'where true', ''))) / length('where true') as where_true_count
from pg_proc p join pg_namespace n on n.oid = p.pronamespace
where n.nspname='public' and p.proname in ('learning_restore','learning_wipe');
-- EXPECT: 6 and 6

-- G3 · restore's signature unchanged (the installation fence survives)
select pg_get_function_arguments(p.oid)
from pg_proc p join pg_namespace n on n.oid=p.pronamespace
where n.nspname='public' and p.proname='learning_restore';
-- EXPECT: p_snapshot_id uuid, p_actor uuid, p_installation text

-- G4 · zero data movement: the layer is STILL empty (that is the expected
--      state right now; the refill is the OWNER's next act, not yours)
select (select count(*) from public.episodes) ep,
       (select count(*) from public.backend_authority) auth,
       (select count(*) from public.learning_snapshots) snaps;
-- EXPECT: 0 · 0 · 4
```

## STEP 3 · WHAT YOU DO NOT DO
No restore, no seed, no wipe, no deletion, no retry beyond reporting, no
secrets echoed. The refill belongs to the owner's panel.

## REPORT
One message: acknowledgement · Step 0 · full push output · G1–G4 · closing
line "all gates as expected" or the divergence verbatim.
