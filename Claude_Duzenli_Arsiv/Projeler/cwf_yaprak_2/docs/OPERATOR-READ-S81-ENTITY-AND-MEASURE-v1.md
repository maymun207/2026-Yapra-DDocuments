# OPERATOR READ · S81 · entity layers + measurement-failure census · v1

<!-- OPERATOR-READ-S81-ENTITY-AND-MEASURE-v1 · 2026-08-03 · Architect-authored.
     Floor: origin/master = 28ec4d9d81a33e5c07c84aa6f41ecb8592c85e14
     Serving production deployment: dpl_EUspKSTuMB1qnXN6S9fa26mkWyAA -->

## 0 · Your lane, and its fence

You are the **Operator**. Your instrument is the Supabase MCP against project
ref `fjbrkimwvtpwoxhziidh`.

**This relay is READ-ONLY. It contains ZERO migrations and ZERO writes.**

- Do **not** run `apply_migration`. Do not run any DDL. Do not `insert`,
  `update`, `delete`, or `truncate` anything (ADR-005).
- Do **not** touch the git repository. You have no repo lane here.
- Do **not** echo any secret, key, token, connection string or service-role
  value in your report (ADR-007). None of the queries below select one.
- Do **not** rewrite, "correct", reformat or optimise the SQL. If a statement
  errors, **paste the error verbatim** and move to the next one. A silently
  repaired query produces a number nobody can attribute (D-3).
- Do **not** interpret, summarise, round, or draw conclusions. **Paste raw
  result rows.** The Architect does the reading.

Run all four statements. Report all four, including empty ones — an empty result
is a finding, not a failure.

---

## 1 · Why each read exists

| Read | Question it settles |
|---|---|
| **R1** | Which entity layers does the `armes` backend **declare**, and are they enabled? |
| **R2** | Which of those layers actually have **inventory rows**, and how many? |
| **R3** | Positive control for R4: does `telemetry_events` carry error rows of *any* kind, so that an empty R4 means "it never fired" and not "the predicate is wrong" (S66-1)? |
| **R4** | Has any measurement guard recorded a `measurement_unavailable` row — in particular `synthetic-injector.tokensSpentToday`? This closes the open watch `W-M1F2A-1`. |

R1 and R2 are the interpretation key for `MA-RERUN-1`: the clarification lens
re-evaluates recorded frames against **today's** entity registry, so what the
registry does and does not contain decides what a "could not resolve the entity"
verdict means.

R3 and R4 close `W-M1F2A-1`. The repaired spend fence throws when a paginated
read cannot be completed, and that throw is recorded as a durable row. If no such
row exists, the fence has never fired in production.

---

## 2 · The four statements

Run each **exactly as written**.

### R1 — declared entity layers for `armes`

```sql
select layer_key,
       frame_object,
       discovery_tool,
       parent_layer_key,
       parent_param_name,
       cadence_class,
       enabled
from public.backend_entity_layers
where backend_id = 'armes'
order by layer_key;
```

### R2 — entity_registry inventory census for `armes`

```sql
select layer_key,
       status,
       count(*)                                                  as row_count,
       count(*) filter (where parent_entity_id is not null)       as with_parent,
       min(first_seen_at)                                         as first_seen_at,
       max(last_seen_at)                                          as last_seen_at
from public.entity_registry
where backend_id = 'armes'
group by layer_key, status
order by layer_key, status;
```

### R3 — positive control: every error kind in the ledger

```sql
select payload->>'kind' as kind,
       count(*)         as row_count,
       min(ts)          as first_ts,
       max(ts)          as last_ts
from public.telemetry_events
where type = 'error'
group by 1
order by row_count desc
limit 50;
```

### R4 — measurement-failure census, by guard

```sql
select payload->>'guard' as guard,
       payload->>'error' as error_name,
       count(*)          as row_count,
       min(ts)           as first_ts,
       max(ts)           as last_ts
from public.telemetry_events
where type = 'error'
  and payload->>'kind' = 'measurement_unavailable'
group by 1, 2
order by row_count desc;
```

---

## 3 · How to report

Reply with exactly this skeleton, filled in. Nothing else — no preamble, no
analysis, no recommendations.

````
OPERATOR-READ-S81 · RESULTS

R1 (backend_entity_layers · armes)
```
<paste raw rows here, or the word EMPTY, or the verbatim error>
```

R2 (entity_registry census · armes)
```
<paste raw rows here, or the word EMPTY, or the verbatim error>
```

R3 (telemetry_events · all error kinds)
```
<paste raw rows here, or the word EMPTY, or the verbatim error>
```

R4 (telemetry_events · measurement_unavailable by guard)
```
<paste raw rows here, or the word EMPTY, or the verbatim error>
```

WRITES PERFORMED: none
MIGRATIONS APPLIED: none
````

The last two lines are a declaration, not a formality. If either is anything
other than `none`, say so plainly and say what happened.

---

## 4 · Two things that will look like errors and are not

1. **An empty R4 is a legitimate result.** It means no measurement guard has
   recorded a failure. Report it as `EMPTY`. Do not go looking for a different
   table or a broader predicate to "find something".
2. **A layer appearing in R1 but absent from R2 is a legitimate result.** It
   means a layer is declared but its inventory is empty. This is expected for at
   least one layer and is precisely what the Architect is looking for. Do not
   reconcile them.

<!-- END · OPERATOR-READ-S81-ENTITY-AND-MEASURE-v1 -->
