# OPERATOR READ · SEED-STATE RACE · v1
<!-- OPERATOR-READ-SEEDSTATE-RACE-1-v1 · 2026-08-03 · S80 · Architect: Claude Opus 5.
     READ-ONLY. Zero writes, zero DDL, zero migrations, zero `supabase db push`.
     Purpose: falsify (or confirm) the Architect's claim that the seed_state
     23505 bursts are an ARBITRATED race with no incorrect outcome. -->

## FENCE (read before anything)

* **Supabase project ref: `fjbrkimwvtpwoxhziidh`.** If the connected project is
  anything else, **STOP** and report.
* **This prompt authorizes SELECT ONLY.** No INSERT/UPDATE/DELETE, no DDL, no
  `supabase db push`, no `apply_migration`. If any step below appears to require
  a write, that is an error in the prompt — STOP and report it.
* **Never echo a secret.** No key, no connection string, no service-role token.
* Report each query's SQL **and** its literal result. An empty result is
  reported as empty — never as "nothing found, probably fine".

## CONTEXT (why this read exists)

`public.seed_state` is an idempotence ledger with a unique constraint on
`(domain, reference_fingerprint)`. Several serverless processes deliberately
RACE to INSERT the same row; the constraint is the arbiter, exactly one wins,
the losers read the 23505 and stop. A claim is *incomplete* while `outcome IS
NULL`; a process that dies mid-seed would leave such a row forever, so the code
reclaims one that is `outcome IS NULL` **and** older than **15 minutes**
(`STALE_CLAIM_WINDOW_MS = 15 * 60 * 1000`).

The Architect claims this is benign. These four reads are what would prove that
claim WRONG. Run all four even if the first looks clean.

## Q1 · Dead claims — the one outcome the arbiter cannot fix by itself

```sql
select domain, reference_fingerprint, seeded_at,
       round(extract(epoch from (now() - seeded_at))/60)::int as age_minutes
from public.seed_state
where outcome is null
order by seeded_at;
```

**Expected: zero rows.** Any row here older than ~15 minutes is a claim whose
owner died and which the reclaim path has not yet cleared — the real failure
mode. Report age in minutes for every row.

## Q2 · The ledger's shape — is any domain claimed more than once?

```sql
select domain, count(*) as rows,
       count(*) filter (where outcome is null)     as incomplete,
       count(distinct reference_fingerprint)       as fingerprints,
       max(seeded_at)                              as newest
from public.seed_state
group by domain
order by domain;
```

**Expected:** one row per (domain, fingerprint) pair; `incomplete` = 0
everywhere. A domain with several fingerprints is NORMAL (the declared
reference set changed) — report it, do not judge it.

## Q3 · Did the race ever produce a DOUBLE SEED?

This is the decisive test. If the arbiter works, the seeded artefacts are
unique; if it leaks, there are duplicates.

```sql
-- 3a. synthetic question sets: (name, lang) must be unique
select name, lang, count(*) as copies
from public.synthetic_question_sets
group by name, lang
having count(*) > 1;

-- 3b. governed rows: at most ONE published row per (backend_id, kind_id, key)
select backend_id, kind_id, key, count(*) as published_copies
from public.domain_rules
where status = 'published'
group by backend_id, kind_id, key
having count(*) > 1;
```

**Expected: zero rows from BOTH.** Any row is a genuine defect and this read
becomes an incident.

## Q4 · Positive control — prove the reads can return rows at all

A zero from Q1/Q3 is only believable if the same queries CAN return rows.

```sql
select count(*) as seed_state_rows            from public.seed_state;
select count(*) as question_set_rows          from public.synthetic_question_sets;
select count(*) as published_domain_rule_rows from public.domain_rules where status = 'published';
```

**Expected: all three non-zero.** If any is zero, the corresponding zero above
proves nothing and must be reported as INCONCLUSIVE, not as a pass.

## REPORT FORMAT

For each of Q1–Q4: the SQL you ran, the literal rows returned (or `0 rows`), and
nothing else. No interpretation, no recommendation — the Architect rules on the
evidence. If any query errors, paste the error text with the secret-free parts
only.

<!-- END · OPERATOR-READ-SEEDSTATE-RACE-1-v1 -->
