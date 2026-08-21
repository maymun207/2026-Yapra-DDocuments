# OPERATOR APPLY · M1F3 · TRIAGE + LATENCY DEDUP · v1
<!-- OPERATOR-APPLY-M1F3-v1 · 2026-08-03 · S80 · Architect: Claude Opus 5.
     Applies 20260803160000_turn_feedback_triage_and_latency_dedup.sql, merged to
     master at d599b8b2b25315dbb02bfa02efc61fbbe1e90d24 (Architect-verified from a
     fresh clone: 2 parents, merge tree byte-identical to the branch tip, message
     sha256 39e1680e3dd3520a matching the authored block, 67 migrations).
     SELF-CONTAINED. -->

## §0 · FENCE — read before anything

* **Supabase project ref: `fjbrkimwvtpwoxhziidh`.** Anything else ⇒ **STOP**.
  State the ref you are connected to.
* **`supabase db push` is the ONLY authorized apply method (ADR-005).** No
  `apply_migration`. No hand-run SQL for the migration. No file edits.
* **You write NOTHING except the single `supabase db push` in G1.** Every other
  gate is a read. In particular: **do not publish, update or delete any governed
  row** — G7 below reads governed data and you must not act on what you find.
* **Never echo a secret.**
* Report each gate's **literal output**. Empty is reported as empty.
* Any gate fails ⇒ **STOP at that gate.** Do not repair, do not improvise.

## §1 · WHAT IS BEING APPLIED

One migration, two independent changes:

1. **`turn_feedback` gains a triage marker** — `reviewed_at` + `reviewed_by`,
   a pair CHECK so the two halves cannot disagree, and a PARTIAL index on the
   queue predicate. **Plus a column-privilege narrowing**, which is the
   security-bearing part and the reason G3 exists.
2. **`health_latency_daily` is replaced** (`create or replace function`) so a
   retried turn contributes ONE latency sample instead of two.

No table is created or dropped. No row is written by the migration.

## §2 · GATES, IN ORDER

### G0 · FENCE + pre-state
Report the connected ref. Then list migrations; report the **applied count** and
the **last three applied versions**.
**Expected:** 66 applied, newest `20260803120000`; `20260803160000` **absent**.
Already applied ⇒ **STOP**, this prompt has run.

### G1 · APPLY
```
supabase db push
```
Literal output. Expected: exactly ONE migration applied.

### G2 · THE SHAPE LANDED
```sql
select column_name, data_type, is_nullable
from information_schema.columns
where table_schema='public' and table_name='turn_feedback'
order by ordinal_position;

select conname, pg_get_constraintdef(oid) as def
from pg_constraint
where conrelid = 'public.turn_feedback'::regclass and contype = 'c';

select indexname, indexdef
from pg_indexes
where schemaname='public' and tablename='turn_feedback';
```
**Expected:** `reviewed_at` (timestamptz, nullable) and `reviewed_by` (uuid,
nullable); a CHECK named `turn_feedback_review_pair_check` reading
`(reviewed_at IS NULL) = (reviewed_by IS NULL)`; a **partial** index
`turn_feedback_unreviewed_down_idx` whose definition contains
`WHERE ((verdict = 'down') AND (reviewed_at IS NULL))`.

### G3 · THE COLUMN PRIVILEGES — the load-bearing gate of this prompt
```sql
select grantee, privilege_type, column_name
from information_schema.column_privileges
where table_schema='public' and table_name='turn_feedback'
  and grantee in ('anon','authenticated','service_role')
  and privilege_type = 'UPDATE'
order by grantee, column_name;

-- ground truth, in case the information_schema view hides a table-level grant:
select relacl from pg_class where oid = 'public.turn_feedback'::regclass;
select a.attname, a.attacl
from pg_attribute a
where a.attrelid = 'public.turn_feedback'::regclass and a.attnum > 0
order by a.attnum;
```

**Expected:** `authenticated` holds UPDATE on **`verdict` and `reason_text` ONLY**.
`authenticated` must **NOT** appear with UPDATE on `reviewed_at` or
`reviewed_by`. `anon` must not appear at all.

**Why this gate is spelled out:** `turn_feedback`'s RLS policy
`turn_feedback_update_own` is `auth.uid() = user_id` with **no column list**. A
row-level policy gates ROWS, not COLUMNS — so if `authenticated` holds a
table-wide UPDATE, every user can mark their own downvote reviewed and drain the
reviewer's queue, and no policy change can stop it. The column grant is the only
instrument that closes this. **If you see `authenticated` with UPDATE on
`reviewed_at` or `reviewed_by`, that is the live leak — STOP and report it.**

### G4 · LIVE `verifyGrants`
Run the standing grants verification against the live DB; report its output in
full. `health_latency_daily` was **replaced** by this migration, so its EXECUTE
grant is re-asserted here — confirm it is still service-role-only.

**Three-way classification, no fourth option:** `42501` = **PASS** · no error =
**LEAK**, stop · `PGRST202` or any other error = **INCONCLUSIVE, a FAIL**, never
green.

### G5 · IDEMPOTENCE
```
supabase db push
```
again. **Expected: a no-op.** Literal output.

### G6 · THE REWRITTEN FUNCTION EXECUTES
```sql
select * from public.health_latency_daily(now() - interval '7 days', now());
```
Report literally, with row count.

**Note honestly what this can and cannot show:** with zero retried turns in the
window, the deduped and pre-dedup definitions agree, so a matching result does
**not** prove the dedup fires — that proof lives in the phase's fixture test.
This gate proves the replaced function executes and returns sane shapes. Report
the rows; do not interpret.

### G7 · THE GOVERNED `health.*` ROWS — read only, do not act
```sql
select r.key, r.status, r.version, r.payload->>'value' as value, r.created_at
from public.domain_rules r
join public.rule_kinds k on k.id = r.kind_id
where r.key like 'health.%'
order by r.key, r.version;
```

**Report every row, all statuses, literally.** Report `0 rows` if there are none.

**Why:** the self-seed reconciler publishes an ABSENT param through the same
gated publish machinery an admin click uses, and its ABSENCE-ONLY LAW means it
**never overwrites an existing published row**. Runtime resolution is DB-first.
So if a `health.p95WarnMs` row was published earlier carrying the old value, the
new code floor is **inert in production** — the deployed change would not take
effect and the dashboard would keep warning on the old bar.

**You are reading this, not fixing it.** Any correction is a governed publish,
which is an owner action through the admin panel — outside this prompt's fence.

### G8 · SEED-STATE FINGERPRINT
```sql
select domain, count(*) as rows,
       count(*) filter (where outcome is null) as incomplete,
       max(seeded_at) as newest
from public.seed_state
where domain = 'system.agent_param'
group by domain;
```
**Baseline 2026-08-03 ~08:07Z: 12 rows, 0 incomplete, newest 07:55:29Z.** This
phase changed the declared param set again, so a 13th row is expected after the
deploy's first warm — but the warm may not have happened when you look.
**Report the number; do not judge it.**

## §3 · REPORT FORMAT

Per gate: the command or SQL, and the literal output. No interpretation, no
recommendation, no repair. If a gate fails, stop there and name it.

<!-- END · OPERATOR-APPLY-M1F3-v1 -->
