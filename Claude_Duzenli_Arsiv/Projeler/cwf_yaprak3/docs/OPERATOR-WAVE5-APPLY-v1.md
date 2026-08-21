# OPERATOR-WAVE5-APPLY-v1 — apply the host-health table

<!-- S98 · Architect-authored · Operator lane (Gemini + Supabase MCP).
     PROJECT FENCE: fjbrkimwvtpwoxhziidh — every call targets THIS project.
     Any other ref anywhere in tool output is a fence violation: STOP, report.
     PRECONDITION: master = 4faf054a6713b0dabd7599005ddc38fbfaec2833 (rev 250),
     carrying 78 migrations; live DB carries 77. -->

## G1 — pre-flight (read-only)
1. `select count(*), max(version) from supabase_migrations.schema_migrations where true;`
   → expect **77** / `20260813110000`. Anything else: STOP, report verbatim.
2. Confirm the target table is absent (S94-2: pg_catalog, never information_schema):
   `select count(*) from pg_catalog.pg_class c join pg_catalog.pg_namespace n on n.oid=c.relnamespace where n.nspname='public' and c.relname like '%host%health%';`
   → report what you find (the exact table name is in the migration; do not assume it).

## G2 — apply (ADR-005: the ONE authorized method)
`supabase db push` from a fresh read-only checkout of master.
Expected: exactly ONE migration applied — `20260813130000_observability_host_health.sql`.
NEVER `apply_migration`.

## G3 — post-apply verification (read-only)
1. Migration count → **78**, top `20260813130000`.
2. Read the new table's real name from the applied DDL, then verify posture:
   - RLS on: `select relrowsecurity from pg_catalog.pg_class c join pg_catalog.pg_namespace n on n.oid=c.relnamespace where n.nspname='public' and c.relname='<table>';` → `true`
   - Zero client policies: `select count(*) from pg_catalog.pg_policy where polrelid='public.<table>'::regclass;` → 0
   - Row count → 0 (nothing has probed yet)

## G4 — idempotence probe
Run `supabase db push` a SECOND time → expect zero migrations applied, zero
errors. Report the tool's own output line verbatim.

## G5 — verifyGrants
Run `scripts/verifyGrants.ts` (read-only checkout; it self-cleans its probe row).
Expected: ALL probes PASS including the new table's row (anon UPDATE denied
42501). Report the pass count — counts only, never grant strings (ADR-007).

## G6 — file your report as a `from_lane` row
```sql
insert into relay_inbox (direction, lane_addr, artifact_name, body)
values ('from_lane', 'operator', 'OPERATOR-REPORT-WAVE5-APPLY-v1',
        '<your full G1–G5 report text>')
returning id, created_at;
```
Paste ONLY the returned `id` + `created_at` back to the owner (one line).
ADR-007: no secret, no key, no grant string in the body.
S93-3: disclose every state-changing call (two pushes, this insert).

## FENCES (standing)
Read-only git checkout permitted; repo WRITES forbidden · no governed-table
writes · this card authorizes exactly: two `db push` runs, the verifyGrants
script, the ONE insert above. Nothing else.

<!-- END · OPERATOR-WAVE5-APPLY-v1 -->
