# OPERATOR APPLY · M1F2B · HEALTH AGGREGATES · v1
<!-- OPERATOR-APPLY-M1F2B-v1 · 2026-08-03 · S80 · Architect: Claude Opus 5.
     Applies migration 20260803120000_health_measurement_aggregates.sql, merged
     to master at 310e4c05fd4f421729d59d24980c4682ba6a00fd (Architect-verified
     from a fresh clone: 2 parents, message byte-identical, 66 migrations in the
     tree, docVersion rev 184). SELF-CONTAINED. -->

## §0 · FENCE — read before anything

* **Supabase project ref: `fjbrkimwvtpwoxhziidh`.** If the connected project is
  anything else, **STOP** and report. State the ref you are connected to.
* **`supabase db push` is the ONLY authorized apply method (ADR-005).** Do NOT
  use `apply_migration`. Do NOT run the migration's SQL by hand. Do NOT edit any
  file — you have no repo lane.
* **Never echo a secret** — no key, no connection string, no service-role token.
* Report every gate's **literal output**. An empty result is reported as empty,
  never as "looks fine".
* If any gate below fails, **STOP at that gate** and report. Do not continue,
  do not repair, do not improvise.

## §1 · WHAT IS BEING APPLIED

One migration, `20260803120000_health_measurement_aggregates.sql`, creating
**four READ-ONLY aggregate functions** behind the Health measurement band:

| function | signature |
|---|---|
| `health_turn_daily_series` | `(timestamptz, timestamptz)` |
| `health_error_daily_counts` | `(timestamptz, timestamptz)` |
| `health_latency_daily` | `(timestamptz, timestamptz)` |
| `health_feedback_daily` | `(timestamptz, timestamptz)` |

All four are `language sql` · `security definer` · `set search_path = public`.
**No table is created, altered or dropped. No row is written.** The file ends
with `notify pgrst, 'reload schema'`.

Because they are `security definer` they run as the owner and **bypass RLS** —
the EXECUTE grant is therefore the ONLY gate that exists on them. That is why
G4 below is the load-bearing gate of this whole prompt.

## §2 · GATES, IN ORDER

### G0 · FENCE + pre-state
Report the connected project ref. Then list the applied migrations and report
**the count** and the **last three versions**. Expected: the newest applied is
`20260802160000` (turn_feedback) and `20260803120000` is **absent**.
If `20260803120000` is already applied, **STOP** — this prompt has already run.

### G1 · APPLY
```
supabase db push
```
Report the literal output. Expected: exactly ONE migration applied.

### G2 · THE FOUR EXIST, WITH THE RIGHT SHAPE
```sql
select p.proname,
       pg_get_function_identity_arguments(p.oid) as args,
       p.prosecdef                               as security_definer,
       p.provolatile,
       r.rolname                                 as owner
from pg_proc p
join pg_namespace n on n.oid = p.pronamespace
join pg_roles r     on r.oid = p.proowner
where n.nspname = 'public'
  and p.proname in ('health_turn_daily_series','health_error_daily_counts',
                    'health_latency_daily','health_feedback_daily')
order by p.proname;
```
**Expected: exactly 4 rows**, each `args = timestamptz, timestamptz` and
`security_definer = true`.

### G3 · THE GRANT SHAPE — read the ACL itself, do not trust the file
```sql
select p.proname, coalesce(array_to_string(p.proacl, E'\n'), '(default acl)') as acl
from pg_proc p
join pg_namespace n on n.oid = p.pronamespace
where n.nspname = 'public'
  and p.proname in ('health_turn_daily_series','health_error_daily_counts',
                    'health_latency_daily','health_feedback_daily')
order by p.proname;
```
**Expected:** `service_role=X/...` present; **`anon` and `authenticated` absent**
as EXECUTE grantees on all four.

**Why this gate is spelled out:** the migration deliberately revokes
`from public, anon, authenticated` rather than PUBLIC-only. Supabase's
`pg_default_acl` grants anon/authenticated **by name**, and a revoke from PUBLIC
does not touch a by-name grant. If you see `anon=X` or `authenticated=X` here,
that is a LEAK — **STOP and report it as one.**

### G4 · LIVE `verifyGrants` — the run this phase owes
Run the project's standing grants verification against the live DB and report
its literal output, in full.

The four new functions are already registered in its two single-source lists
(`SERVICE_ROLE_ONLY_FUNCTIONS`, `FN_EXECUTE_PROBES`), so they are probed
automatically. **Classification is three-way and there is no fourth option:**

| probe result | verdict |
|---|---|
| `42501` (permission denied) | **PASS** — the lockdown holds |
| no error (the call executed) | **LEAK** — STOP and report |
| `PGRST202` or any other error | **INCONCLUSIVE — a FAIL, never a pass** |

`PGRST202` means the probe could not reach the function at all (wrong name,
schema cache not reloaded). It proves nothing about the grant and must never be
recorded as green. If you see it, report it as INCONCLUSIVE and stop.

### G5 · IDEMPOTENCE
```
supabase db push
```
a second time. **Expected: a no-op** — nothing to apply. Report the literal
output.

### G6 · THE FUNCTIONS ACTUALLY EXECUTE (smoke, read-only)
```sql
select * from public.health_turn_daily_series(now() - interval '7 days', now());
select * from public.health_error_daily_counts(now() - interval '7 days', now());
select * from public.health_latency_daily(now() - interval '7 days', now());
select * from public.health_feedback_daily(now() - interval '7 days', now());
```
Report each result **literally**, including row counts.

**Zero rows is a legitimate answer for some of these and is NOT a failure** —
report it as zero rows, do not interpret it. What WOULD be a failure is an
error: a missing column, a type mismatch, a permission error.

### G7 · THE SELF-SEED PREDICTION (a check, not a change)
This phase adds four `agent.param` declarations, which changes the declared
reference set and therefore its fingerprint. After the deploy's first warm, the
reconciler should mint a **new** `system.agent_param` row.
```sql
select domain, count(*) as rows,
       count(*) filter (where outcome is null) as incomplete,
       max(seeded_at) as newest
from public.seed_state
where domain = 'system.agent_param'
group by domain;
```
**Baseline measured 2026-08-03 ~06:26Z: 11 rows, 0 incomplete, newest
2026-07-31.** Report what you see. A 12th row confirms the params self-seeded;
still 11 is not necessarily wrong at the moment you look — the warm may not have
happened yet. **Report the number, do not judge it.** The Architect rules.

## §3 · REPORT FORMAT

Per gate: the command or SQL you ran, and its literal output. No interpretation,
no recommendation, no repair. If a gate fails, stop there and say which one.

**You write nothing in this prompt except the single `supabase db push` in G1.**
Everything else is a read.

<!-- END · OPERATOR-APPLY-M1F2B-v1 -->
