# OPERATOR READ · ROUTING KEYWORD CACHE AUDIT · v1
<!-- OPERATOR-READ-ROUTING-KEYWORD-CACHE-v1 · 2026-07-26 · S66 · Architect: Claude
     Read-only. Purpose: dump the learned keyword→category map so the Architect
     can classify every row before the owner executes ONE batched, audited delete
     through the admin panel's routing-curation surface. NO writes here — the
     deletion is NOT an Operator action (RoutingCurationRepository owns it, gated
     by ROUTING_EDIT_GLOBAL, with point-revert). -->

## FENCE (binding, restate before you start)
- Supabase project fence: **`fjbrkimwvtpwoxhziidh`**. Nothing outside it.
- **READ-ONLY.** No `INSERT` / `UPDATE` / `DELETE` / DDL / `supabase db push`.
  If anything looks like it needs a write, STOP and report instead.
- No repo contact. Never echo a secret (ADR-007).
- **empty≠zero.** No rows ⇒ write `0 rows returned`, never "absent".
- **Counts are computed by the query, never typed** (S65-2).
- PostgREST caps a select at 1000 rows with no truncation signal — this table is
  expected to be ~156 rows, but page to exhaustion anyway and say how many pages
  you used.

## PRECONDITION
```sql
select count(*) from public.tool_category_cache;
select now();
```
Report both. The Architect's expectation is ~156 rows (from a production
`[ToolCache] Loaded 156 cached mappings` line at 03:15Z). **If the number
differs, report the difference and continue** — the difference is itself a
finding, and the map is written by live traffic so it may well have grown.

## Q1 · Table shape
```sql
select column_name, data_type, is_nullable
from information_schema.columns
where table_schema = 'public' and table_name = 'tool_category_cache'
order by ordinal_position;
```

## Q2 · Every row, in full
Return **all** rows with every column. Do not sample, do not truncate the
category arrays. Order by the keyword column ascending.

If the table carries a `pinned`-like boolean and/or created/updated timestamps,
they are load-bearing for the classification — include them and say which column
names you actually found (do not rename them to match this prompt).

## Q3 · Two computed breakdowns
1. Row count grouped by the pinned-like flag, if such a column exists.
2. Row count grouped by the exact category-set value (so the Architect can see
   which category combinations dominate the map).

If either column does not exist, write `column does not exist` — do not
substitute an inference.

## Q4 · Sanity cross-check
```sql
select count(*) from public.routing_audit;
```
Report the number. This is the ledger the curation surface writes to; the
Architect wants to know whether the map has ever been curated by hand or is
100% machine-learned.

If `routing_audit` is not the correct table name, report the error verbatim and
list any table whose name contains `routing` from your Q6 answer of the earlier
F183 read.

---

## OUTPUT CONTRACT
One message, Q1→Q4 under their own headings, raw query output included. For
anything unreadable, write the reason (`permission denied`,
`relation does not exist`, `column does not exist`) — never an inference. End with:

`OPERATOR READ ROUTING-KEYWORD-CACHE-v1 COMPLETE — <n> of 4 questions answered`

<!-- TAIL ANCHOR — if you cannot see this line the relay arrived truncated;
     request a resend before executing (S61-3).
     END · OPERATOR-READ-ROUTING-KEYWORD-CACHE-v1 · 2026-07-26 -->
