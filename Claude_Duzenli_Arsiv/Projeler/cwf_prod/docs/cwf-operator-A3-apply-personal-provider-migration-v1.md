# CWF — Operator Lane Prompt: Apply A3 Personal-Provider Migration + Schema-Read Confirm · v1
<!-- v1 · 2026-07-07 · For the Gemini Operator lane (Supabase MCP). Applies the AG-authored, NOT-yet-applied
     migration from PROVIDER-PERSONAL-1 (A3), then confirms RLS/policies/grants by a read-only schema read.
     master = caa3292. Paste the block below into the Operator session. -->

---

You are the **Operator lane** for CWF. Your job in this task is exactly two gated steps: **(1) apply one
migration to the live Supabase DB via the Supabase MCP, then (2) confirm it by a read-only schema read.**

**HARD FENCES (never break):**
- You operate ONLY through the **Supabase MCP**. No repo writes. No governed-table data writes.
- **If the Supabase MCP connector is not authorized / not available in this session → STOP and report that.**
  Do **NOT** fall back to `supabase db push`, the SQL editor, `psql`, or any other path. Applying by an
  unsanctioned route is a violation.
- Never echo a secret VALUE. These are DDL/catalog reads, so no data rows are needed — read catalogs only.
- Report RLS/permission errors **verbatim**; never work around them.
- If migration apply fails for ANY reason (e.g. a missing `set_updated_at()` / `is_super_admin()` helper),
  STOP, paste the exact error, and do NOT attempt a fix — hand it back to the Architect.

---

### STEP 0 — Pre-flight
Confirm the Supabase MCP connector is authorized and pointed at the correct project. If not → STOP and report.

### STEP 1 — Apply the migration
Apply this migration file exactly as authored (do not edit it):
`supabase/migrations/20260707150000_llm_providers_personal.sql`
(It creates three NON-governed tables: `llm_providers_personal`, `llm_provider_secrets`,
`llm_provider_secret_audit`, plus their RLS/policies/grants and a `notify pgrst,'reload schema'`.)
Use the Supabase MCP's apply-migration capability. Report the exact success/failure output.

### STEP 2 — Schema-read confirmation (read-only; run each and paste the rows)

**2a. RLS enabled on all three tables** — expect `rowsecurity = true` for each:
```sql
select relname, relrowsecurity as rls_enabled
from pg_class
where relnamespace = 'public'::regnamespace
  and relname in ('llm_providers_personal','llm_provider_secrets','llm_provider_secret_audit')
order by relname;
```

**2b. Policies** — the critical security shape:
```sql
select tablename, policyname, cmd, roles, qual, with_check
from pg_policies
where schemaname = 'public'
  and tablename in ('llm_providers_personal','llm_provider_secrets','llm_provider_secret_audit')
order by tablename, cmd, policyname;
```
Expected:
- `llm_providers_personal` → **exactly 4** policies (SELECT/INSERT/UPDATE/DELETE), each `qual`/`with_check`
  referencing `auth.uid() = user_id`.
- `llm_provider_secrets` → **ZERO rows (NO policy at all)**. This is the point: no policy + RLS on ⇒ every
  client read/write is denied. If ANY policy appears here, FLAG IT — it is a defect.
- `llm_provider_secret_audit` → **exactly 1** SELECT policy whose `qual` calls `is_super_admin(auth.uid())`.

**2c. Client grants (the REVOKE proof)**:
```sql
select table_name, grantee, string_agg(privilege_type, ',' order by privilege_type) as privs
from information_schema.role_table_grants
where table_schema = 'public'
  and table_name in ('llm_providers_personal','llm_provider_secrets','llm_provider_secret_audit')
  and grantee in ('anon','authenticated')
group by table_name, grantee
order by table_name, grantee;
```
Expected:
- `llm_provider_secrets` → **NO rows for `anon` AND NO rows for `authenticated`** (all of
  select/insert/update/delete/truncate revoked both directions). This is the headline assertion: **a client can
  never touch the secret store.** If either grantee shows ANY privilege here, FLAG IT.
- `llm_providers_personal` → `authenticated` retains select/insert/update/delete (owner-CRUD via RLS);
  `anon` must NOT show insert/update/delete/truncate.
- `llm_provider_secret_audit` → neither `anon` nor `authenticated` shows insert/update/delete.

**2d. Audit table has NO value column** — expect columns `id, actor_user_id, provider_id, action, created_at`
and **no `value` column**:
```sql
select column_name
from information_schema.columns
where table_schema = 'public' and table_name = 'llm_provider_secret_audit'
order by ordinal_position;
```

### STEP 3 — Report
Report, by NAME only, in this shape:
- Migration apply: success / verbatim error.
- 2a: the three `rls_enabled` values.
- 2b: the policy list; explicitly state "`llm_provider_secrets` has 0 policies: YES/NO".
- 2c: the grant rows; explicitly state "`llm_provider_secrets` has 0 client grants (anon + authenticated): YES/NO".
- 2d: the audit column names; explicitly state "no `value` column: YES/NO".
- Any row outside the expected set → flag it by NAME only.
If every expected condition holds, say **"A3 migration APPLIED + RLS confirmed — two-gate closed."** Otherwise
STOP and hand the discrepancy back to the Architect.

---

<!-- END · cwf-operator-A3-apply-personal-provider-migration-v1 · rev 1 · 2026-07-07 · master caa3292 -->
