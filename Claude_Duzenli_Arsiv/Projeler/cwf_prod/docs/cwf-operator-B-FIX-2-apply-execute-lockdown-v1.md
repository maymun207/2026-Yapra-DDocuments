# CWF — Operator Lane Prompt: Apply B / FIX-2 EXECUTE Lockdown + Re-read · v1
<!-- v1 · 2026-07-07 · For the Gemini Operator lane (Supabase MCP). Applies the AG-authored, NOT-yet-applied
     forward migration 20260707170000 (REPLAY-QUOTA-1 / FIX-2) that revokes residual EXECUTE on the two quota
     RPCs from public+anon+authenticated, then re-confirms the function EXECUTE grants by a read-only schema
     read. This closes the 2d discrepancy your prior read flagged. master = 537c8d5. Paste the block below. -->

---

You are the **Operator lane** for CWF. This task is two gated steps: **(1) apply ONE forward migration via the
Supabase MCP, then (2) re-read the function EXECUTE grants to confirm the lockdown took.**

**HARD FENCES (never break):**
- Supabase MCP ONLY. No repo writes. No governed-table data writes.
- If the Supabase MCP connector is not authorized in this session → **STOP and report.** Do NOT fall back to
  `supabase db push` / SQL editor / `psql`. An unsanctioned apply route is a violation.
- Never echo a secret value (these are catalog reads only). Report errors verbatim; never work around them.
- If apply fails for ANY reason → STOP, paste the exact error, hand back to the Architect. Do NOT attempt a fix.

---

### STEP 0 — Pre-flight
Confirm the Supabase MCP connector is authorized and pointed at project `CWF-Yaprak` (`fjbrkimwvtpwoxhziidh`).
If not → STOP and report.

### STEP 1 — Apply the forward migration
Apply exactly as authored (do not edit):
`supabase/migrations/20260707170000_user_quotas_execute_lockdown.sql`
(It is REVOKES-ONLY: revokes EXECUTE on `replay_quota_reserve` / `replay_quota_settle` from
`public, anon, authenticated`, re-grants EXECUTE to `service_role`, and `notify pgrst`. It does NOT re-create
the functions.) Report the exact success/failure output.

### STEP 2 — Re-read: FUNCTION EXECUTE grants (the 2d proof; read-only)
Run BOTH and paste the rows. Expected NOW: **`anon`, `authenticated`, `PUBLIC` have NO EXECUTE;
`service_role` HAS EXECUTE** on BOTH functions.

```sql
select p.proname,
       coalesce(nullif(pg_catalog.array_to_string(p.proacl, E'\n'), ''), '(default: PUBLIC has EXECUTE)') as acl
from pg_proc p
where p.pronamespace = 'public'::regnamespace
  and p.proname in ('replay_quota_reserve','replay_quota_settle')
order by p.proname;
```
For EACH function confirm in the `acl`: NO `=X/…` (PUBLIC) entry, NO `anon=X/…`, NO `authenticated=X/…`, and
`service_role=X/…` IS present.

```sql
select routine_name, grantee, privilege_type
from information_schema.role_routine_grants
where specific_schema = 'public'
  and routine_name in ('replay_quota_reserve','replay_quota_settle')
order by routine_name, grantee;
```
Expected: rows ONLY for `service_role` (EXECUTE); **NO rows for `anon`, `authenticated`, or `PUBLIC`**. If anon
or authenticated appears with EXECUTE, the lockdown did NOT take → FLAG IT.

### STEP 3 — Re-confirm the functions are intact (read-only)
FIX-2 is revokes-only; the functions must be unchanged:
```sql
select proname, prosecdef as security_definer
from pg_proc
where pronamespace = 'public'::regnamespace
  and proname in ('replay_quota_reserve','replay_quota_settle')
order by proname;

select pg_get_functiondef('public.replay_quota_reserve(uuid,bigint,bigint,bigint)'::regprocedure) ilike '%for update%'
       as reserve_has_for_update;
```
Expect `security_definer = true` for BOTH and `reserve_has_for_update = true`.

### STEP 4 — Report
By NAME only:
- Migration apply: success / verbatim error.
- STEP 2, per function: "`anon`/`authenticated`/`PUBLIC` have NO EXECUTE: YES/NO" and "`service_role` HAS
  EXECUTE: YES/NO".
- STEP 3: "both `security_definer = true`: YES/NO" and "`reserve_has_for_update = true`: YES/NO".
- Any grant/ACL outside {service_role EXECUTE} → flag by NAME.
If all hold, say **"FIX-2 APPLIED — quota RPCs locked to service_role (anon/authenticated/PUBLIC EXECUTE
removed); function EXECUTE gate closed."** Otherwise STOP and hand back to the Architect.

---

<!-- END · cwf-operator-B-FIX-2-apply-execute-lockdown-v1 · rev 1 · 2026-07-07 · master 537c8d5 -->
