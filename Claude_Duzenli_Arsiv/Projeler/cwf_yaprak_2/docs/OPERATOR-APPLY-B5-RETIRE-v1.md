# OPERATOR-APPLY-B5-RETIRE · v1
<!-- Architect-authored · 2026-08-02 · For the Operator lane (Gemini +
     Supabase MCP). Applies ONE migration:
     20260802120000_retire_factory_registry.sql (on master @ 4b5548098fdd…,
     merged PHASE-B5-RETIRE-1). This migration DROPS a table and a column —
     destructive by design, owner-mandated ("temiz bir nokta"), preceded by
     a guarded in-file catch-up copy. -->

## FENCE (read before any action)

- Target project ref: **fjbrkimwvtpwoxhziidh** — verify the connected ref
  equals this EXACTLY before anything else; mismatch → STOP, report, touch
  nothing.
- Operator lane only: **no repo contact, no governed-table writes** beyond
  this migration's DDL, **never echo a secret** (ADR-007 — silent success
  paths are correct).
- Migration method: **`supabase db push` ONLY** (ADR-005). Never
  `apply_migration`, never hand-run DDL — including the DROPs: they run
  only as part of the file.

## G0 · Pre-flight reads (BEFORE the push — the last look at the doomed objects)

Read and report, structured:

1. `public.factory_registry` exists; its row count.
2. `public.entity_registry` row count WHERE `layer_key='factory'` — and the
   count of rows in factory_registry whose `(backend_id, factory_id)` pair
   has NO matching `(backend_id, entity_id)` in entity_registry's factory
   layer (expected 0 or small; the migration's step 1 copies any such
   stragglers before dropping — this read sizes what step 1 will move).
3. `backends.entity_list_tool` column exists (read
   `information_schema.columns`).
4. Pending migrations list shows exactly ONE:
   `20260802120000_retire_factory_registry`. More than one, or a different
   name → STOP and report before pushing.

## G1 · Apply

Run `supabase db push`. Expected: the single pending migration applies
cleanly. Any error → report verbatim, touch nothing further.

## G2 · Idempotence probe

Run `supabase db push` again. Expected: no-op ("Remote database is up to
date" or equivalent). Anything else → report verbatim.

## G3 · Post-apply reads (absence is the product — computed, not asserted)

1. `public.factory_registry` does NOT exist (query `pg_class` /
   `information_schema.tables`; expect zero rows — and per
   HARDEN-FN-PROBE-1 discipline, a read ERROR naming the missing relation
   is also a valid absence proof; paste which form you got).
2. `backends.entity_list_tool` column does NOT exist
   (`information_schema.columns` = zero rows for that column name).
3. `public.entity_registry` factory-layer row count — expected ≥ the G0
   read #2 count (unchanged, or grown by exactly the straggler count if
   step 1 moved any).
4. `backends` table row count = 4 (armes · superset · machine-knowledge-base
   · system) — the column drop must not have touched rows.
5. Positive control for the absence probes (S66-1): run the SAME
   table-existence query shape against a table that DOES exist
   (`public.entity_registry`) and show it returns a row — proving the
   zero in read #1 comes from a query that can find tables.

## G4 · Report

One structured report: G0 four reads · push output (G1) · no-op proof (G2)
· G3 five reads. No secrets, no connection strings. Done means:
**pre-read · applied · idempotent · gone · mirror intact.**

<!-- END · OPERATOR-APPLY-B5-RETIRE-v1 · 2026-08-02 -->
