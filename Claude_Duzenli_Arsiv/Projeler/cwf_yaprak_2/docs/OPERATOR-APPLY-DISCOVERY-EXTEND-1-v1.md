# OPERATOR APPLY · DISCOVERY-EXTEND-1 MIGRATION · v1
<!-- OPERATOR-APPLY-DISCOVERY-EXTEND-1-v1 · 2026-07-26 · S66 · Architect: Claude
     Applies 20260726120000_entity_registry_layers.sql (F183 code half, merged at
     origin/master fa559ef). Gate follows ADR-005 v2 in full: db push ONLY,
     ledger pre-check BEFORE push, and the deterministic closing gate =
     verifyGrants AND get_advisors(security), raw output, Architect-reasoned. -->

## FENCE (binding — restate before you start)
- Supabase project fence: **`fjbrkimwvtpwoxhziidh`**. Nothing outside it.
- **Apply mechanism: `supabase db push` ONLY.** `apply_migration` and
  `execute_sql`-for-DDL are **BANNED** (ADR-005 §Decision 2 — mixed tooling wrote
  timestamp `version`s that never matched file prefixes, and that was the
  ledger-drift root cause). If `db push` fails, **STOP and report**; do not reach
  for another tool.
- **No repo writes.** Reading the repo to run `db push` / `verifyGrants` is your
  job; changing a file is not.
- **No ad-hoc governed-table DATA writes.** This migration's own seed is the only
  data written, and it is written BY the migration, not by you.
- **Never echo a secret value** (ADR-007). A credential-looking value is reported
  as `[REDACTED]` plus its column name.
- **empty≠zero.** `0 rows returned`, never "absent". A missing object ⇒ say so.
- **Counts are computed by the query, never hand-typed** (S65-2).
- **Raw output.** Every gate below is judged by the Architect on your **raw**
  output, not on your summary. That independence is the point of the gate: a
  narrative self-check can be wrong the same way the change was wrong.

## PRECONDITION (state before G0)
`origin/master` = **`fa559ef09d5ef6483206b9b3e0896d5ad25e89cf`**, which carries
`supabase/migrations/20260726120000_entity_registry_layers.sql`. If your checkout
disagrees, **STOP and report** — do not apply from a different tree.

---

## G0 · Pre-apply baseline (read-only)
```sql
-- the two tables must NOT exist yet
select table_name from information_schema.tables
where table_schema = 'public'
  and table_name in ('backend_entity_layers', 'entity_registry');

-- the backfill source
select status, count(*) from public.factory_registry group by status;
```
Expected: **0 rows** from the first query; `factory_registry` = **17 active**.
Report both. If either table already exists, **STOP** — a re-apply is safe by
design, but the Architect decides, not you.

## G1 · LEDGER PRE-CHECK — ADR-005's precondition, BEFORE any push
ADR-005 §Decision 3: a file marked applied whose objects are absent would be
skipped forever, so `db push` may not be trusted until the ledger matches reality.

```sql
select version from supabase_migrations.schema_migrations order by version;
select count(*) from supabase_migrations.schema_migrations;
```
Return the **full list** and the computed count.

**Architect-supplied expectation (repo side — you cannot see the repo's file
list, so compare against these stated values):**
- expected count **57**
- expected highest version **`20260725120000`**

**STOP CONDITION:** if the count differs from 57, or the highest version is not
`20260725120000`, **do not push.** Report the discrepancy and wait. A mismatch is
a finding, not an obstacle to work around.

## G2 · Apply
```
supabase db push
```
Paste the raw output verbatim, including which version it reports applying.

## G3 · Post-apply structural verification (read-only, all computed)
```sql
-- 1. both tables exist, with RLS on
select c.relname, c.relrowsecurity
from pg_class c join pg_namespace n on n.oid = c.relnamespace
where n.nspname = 'public'
  and c.relname in ('backend_entity_layers', 'entity_registry');

-- 2. the descriptor seed — expect EXACTLY 3 rows, all backend_id='armes'
select backend_id, layer_key, frame_object, discovery_tool,
       parent_layer_key, parent_param_name, cadence_class, enabled
from public.backend_entity_layers order by backend_id, layer_key;

-- 3. the backfill — expect 17 rows, ALL layer_key='factory'
select layer_key, status, count(*) from public.entity_registry
group by layer_key, status order by layer_key, status;

-- 4. zero client policies on either table (RLS on + no policy = deny-all)
select tablename, count(*) from pg_policies
where schemaname = 'public'
  and tablename in ('backend_entity_layers', 'entity_registry')
group by tablename;

-- 5. the two indexes
select indexname from pg_indexes
where schemaname = 'public' and tablename = 'entity_registry' order by indexname;
```
Expected: RLS `true` on both · **3** descriptor rows
(`factory`/`line`/`equipment`, all `armes`) · **17** entity rows, all
`layer_key='factory'` · **0 rows** from the policy query (that is correct, not a
gap) · both indexes present.

**Any entity row whose `layer_key` is not `factory` at this point is a STOP** —
nothing has synced yet, so discovered rows cannot exist.

## G4 · Idempotence probe
Re-run `supabase db push`. Expected: a **no-op** (nothing new to apply). Then
re-run G3 queries 2 and 3 and confirm the counts are **unchanged** (still 3 and
17). Paste both the push output and the recounts. A second apply that changes a
count is a STOP.

## G5 · Deterministic gate, half 1 — verifyGrants
Run `scripts/verifyGrants.ts` (the repo's anon-deny probe suite, including the
HARDEN-FN-PROBE-1 function-EXECUTE probe). Paste the **complete raw output**,
pass and fail lines alike. Do not summarize, do not filter, do not interpret.

## G6 · Deterministic gate, half 2 — get_advisors(security)
Run `get_advisors(security)` and paste the **complete raw output**.

**Expected and INTENTIONAL change:** this migration creates two tables with RLS
enabled and **zero policies by design**, so the `rls_enabled_no_policy` INFO
class must increase by **exactly 2** — ADR-005's allow-list floor moves from
**5 → 7**. This is the designed posture (service-role-only access, the same as
`factory_registry`), not a defect.

**STOP CONDITIONS:**
- any NEW finding **outside** the `rls_enabled_no_policy` INFO class;
- an increase in that class **greater than 2**;
- any finding at WARN or ERROR level that was not present before.

Report the raw list either way. **You do not adjudicate** — the Architect reasons
over the raw output and declares "applied + verified", or does not.

---

## OUTPUT CONTRACT
One message, PRECONDITION → G0 → G6 under their own headings, raw output under
each. For anything that failed or that you did not run, say which and why, in
those words — never an inference, never a silent omission. End with:

`OPERATOR APPLY DISCOVERY-EXTEND-1-v1 COMPLETE — <n> of 7 gates executed, <stopped|clean>`

## WHAT HAPPENS NEXT (context, not an instruction)
Applying this migration does not finish the phase. The feature only becomes live
on the next catalog-sync tick, and the Architect then reads the
`[EntityDiscovery]` lines from production himself. Nothing further is asked of
you after this report.

<!-- TAIL ANCHOR — if you cannot see this line the relay arrived truncated;
     request a resend before executing anything (S61-3).
     END · OPERATOR-APPLY-DISCOVERY-EXTEND-1-v1 · 2026-07-26 -->
