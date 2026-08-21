# OPERATOR APPLY · M1F3 · TRIAGE + LATENCY DEDUP · v1_1
<!-- OPERATOR-APPLY-M1F3-v1_1 · 2026-08-03 · S80 · Architect: Claude Opus 5.
     SUPERSEDES v1, which failed at G1 for a defect in the PROMPT, not the work:
     `supabase db push` pushes what is in the LOCAL supabase/migrations directory,
     and v1 specified only the REMOTE pre-state. A stale workspace has nothing to
     push. v1_1 adds G0.5 (pin the local tree) and fixes G0's expectation.
     Self-contained: run this file alone, ignore v1. -->

## §0 · FENCE — read before anything

* **Supabase project ref: `fjbrkimwvtpwoxhziidh`.** Anything else ⇒ **STOP**.
* **`supabase db push` is the ONLY authorized apply method (ADR-005).** No
  `apply_migration`, no hand-run migration SQL.
* **You write NOTHING to the repository.** G0.5 is a read-only SYNC of your own
  working copy — `fetch` + `checkout`. **No commit, no push, no edit, no branch.**
* **You write NOTHING to the database except the single `supabase db push` in
  G1.** Do not publish, update or delete any governed row. G7 reads governed data
  and you must not act on what you find.
* **Never echo a secret.** Report literal output; empty is reported as empty.
* Any gate fails ⇒ **STOP at that gate.** Do not repair, do not improvise.

## §1 · WHAT IS BEING APPLIED

`20260803160000_turn_feedback_triage_and_latency_dedup.sql`, on master at
`d599b8b2b25315dbb02bfa02efc61fbbe1e90d24`. Two independent changes:

1. **`turn_feedback` gains a triage marker** — `reviewed_at` + `reviewed_by`, a
   pair CHECK so the halves cannot disagree, a PARTIAL index on the queue
   predicate, **and a column-privilege narrowing** — the security-bearing part,
   and the reason G3 exists.
2. **`health_latency_daily` is replaced** so a retried turn contributes ONE
   latency sample instead of two.

No table created or dropped. The migration writes no rows.

## §2 · GATES, IN ORDER

### G0.5 · PIN YOUR WORKING COPY (new in v1_1 — do this FIRST)

`db push` reads your LOCAL migrations directory. It does not know what is on
master. Sync, read-only:

```
git fetch origin
git checkout d599b8b2b25315dbb02bfa02efc61fbbe1e90d24
git rev-parse HEAD
ls supabase/migrations/*.sql | wc -l
ls supabase/migrations/ | tail -2
sha256sum supabase/migrations/20260803160000_turn_feedback_triage_and_latency_dedup.sql
```

**Expected:** `HEAD` = `d599b8b2b25315dbb02bfa02efc61fbbe1e90d24` exactly · **67**
files · the last two are `20260803120000_health_measurement_aggregates.sql` and
`20260803160000_turn_feedback_triage_and_latency_dedup.sql`. Report the sha256.

If `git checkout` reports local modifications blocking it, **STOP and report** —
do not stash, do not discard, do not force. An Operator workspace with uncommitted
changes is a fact the Architect needs to know about, not something to clean up.

### G0 · FENCE + pre-state
Report the connected ref. Then:
```
npx supabase migration list
```
**Expected now:** **66 applied**, newest applied `20260803120000`; and the row
`20260803160000 | (blank remote)` — i.e. **present in the LOCAL column, absent in
the REMOTE column**. That local presence is what v1 forgot to check, and its
absence is exactly what stopped the last run.

If `20260803160000` shows a REMOTE timestamp ⇒ **STOP**, this prompt has run.
If it is missing from the LOCAL column ⇒ **STOP**, G0.5 did not take.

### G1 · APPLY
```
supabase db push
```
Literal output. **Expected: exactly ONE migration applied**
(`Applying migration 20260803160000_…`). "Remote database is up to date" is a
**FAIL** here, not a pass.

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
**Expected:** `reviewed_at` (timestamptz, nullable), `reviewed_by` (uuid,
nullable); a CHECK `turn_feedback_review_pair_check` reading
`(reviewed_at IS NULL) = (reviewed_by IS NULL)`; a **partial** index
`turn_feedback_unreviewed_down_idx` whose definition contains
`WHERE ((verdict = 'down') AND (reviewed_at IS NULL))`.

### G3 · THE COLUMN PRIVILEGES — the load-bearing gate
```sql
select grantee, privilege_type, column_name
from information_schema.column_privileges
where table_schema='public' and table_name='turn_feedback'
  and grantee in ('anon','authenticated','service_role')
  and privilege_type = 'UPDATE'
order by grantee, column_name;

select relacl from pg_class where oid = 'public.turn_feedback'::regclass;

select a.attname, a.attacl
from pg_attribute a
where a.attrelid = 'public.turn_feedback'::regclass and a.attnum > 0
order by a.attnum;
```
**Expected:** `authenticated` holds UPDATE on **`verdict` and `reason_text` ONLY**;
**NOT** on `reviewed_at` or `reviewed_by`. `anon` absent entirely.

**Why:** `turn_feedback_update_own` is `auth.uid() = user_id` with **no column
list**. A row policy gates ROWS, not COLUMNS — so a table-wide UPDATE for
`authenticated` would let every user mark their own downvote reviewed and drain
the reviewer's queue, and no policy change could stop it. The column grant is the
only instrument that closes it. **`authenticated` with UPDATE on `reviewed_at` or
`reviewed_by` is the live leak — STOP and report.**

### G4 · LIVE `verifyGrants`
Run the standing grants verification against the live DB; report in full.
`health_latency_daily` was **replaced**, so its EXECUTE grant is re-asserted —
confirm it is still service-role-only.

**Three-way, no fourth option:** `42501` = **PASS** · no error = **LEAK**, stop ·
`PGRST202`/other = **INCONCLUSIVE, a FAIL**, never green.

### G5 · IDEMPOTENCE
```
supabase db push
```
again. **Expected: a no-op.** (Here "Remote database is up to date" IS the pass —
the opposite of G1.)

### G6 · THE REWRITTEN FUNCTION EXECUTES
```sql
select * from public.health_latency_daily(now() - interval '7 days', now());
```
Report literally with row count.

**What this can and cannot show:** with zero retried turns in the window, the
deduped and pre-dedup definitions agree, so a matching result does **not** prove
the dedup fires — that proof lives in the phase's fixture test. This gate proves
the replaced function executes and returns sane shapes. Report; do not interpret.

### G7 · THE GOVERNED `health.*` ROWS — read only, do not act
```sql
select r.key, r.status, r.version, r.payload->>'value' as value, r.created_at
from public.domain_rules r
where r.key like 'health.%'
order by r.key, r.version;
```
**Report every row, every status, literally.** `0 rows` if there are none.

**Why:** the self-seed reconciler publishes an ABSENT param through the same
gated publish machinery an admin click uses, and its ABSENCE-ONLY LAW means it
**never overwrites an existing published row**. Runtime resolution is DB-first.
So if `health.p95WarnMs` was published earlier carrying the old value, the new
code floor is **inert in production** and the dashboard keeps warning on the old
bar. **You are reading this, not fixing it** — a correction is a governed publish,
an owner action through the admin panel, outside this fence.

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

Per gate: the command or SQL, and its literal output. No interpretation, no
recommendation, no repair. If a gate fails, stop there and name it.

<!-- END · OPERATOR-APPLY-M1F3-v1_1 -->
