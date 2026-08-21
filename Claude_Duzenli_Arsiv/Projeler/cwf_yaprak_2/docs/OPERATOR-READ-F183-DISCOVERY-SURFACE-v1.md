# OPERATOR READ · F183 DISCOVERY SURFACE · v1
<!-- OPERATOR-READ-F183-DISCOVERY-SURFACE-v1 · 2026-07-26 · S66 · Architect: Claude
     Read-only investigation. NO migrations, NO writes, NO repo contact.
     Purpose: supply the live facts the F183 design note is forbidden to guess
     (S65-1 — a brief that premises a live value without an Operator read of
     that value is malformed). -->

## FENCE (binding, restate before you start)
- Supabase project fence: **`fjbrkimwvtpwoxhziidh`**. Nothing outside it.
- **READ-ONLY.** No `INSERT` / `UPDATE` / `DELETE` / `DDL` / `supabase db push`.
  If any step seems to need a write, STOP and report instead.
- No repo contact. Never echo a secret, key, token or connection string (ADR-007);
  if a value looks like a credential, report `[REDACTED]` and its column name.
- **PostgREST caps a select at 1000 rows regardless of `.limit()`, with no
  truncation signal** (S65 tooling lesson). For any table that could exceed 1000
  rows, page to exhaustion and report the page count you used.
- **empty≠zero.** If a query returns no rows, write `0 rows returned` — never
  "absent", never "not configured". If a column does not exist, say
  `column does not exist` — do not substitute a guess.
- **Report raw output.** Counts must be computed by the query, not typed by you
  (S65-2 — evidence is computed, never asserted).

## PRECONDITION (verify and report before answering anything)
State these three, from a live read, at the top of your answer:
1. `select id, entity_list_tool, factory_param_name from public.backends order by id;`
   — expected shape: three rows (`armes`, `superset`, `system`), `armes.entity_list_tool`
   non-null, `armes.factory_param_name = 'factoryId'`. Report what you actually see.
2. `select count(*) from public.factory_registry where status = 'active';`
   — expected 17. Report the number you get.
3. Current server time (`select now();`).

If (1) or (2) disagrees with the expectation, **report the disagreement and
continue anyway** — the disagreement is itself a finding.

---

## Q1 · What descriptor columns exist on `backends` today
Return the full column list of `public.backends` (name, data type, nullable),
plus every non-secret value per row. This tells the Architect what
descriptor-as-data surface already exists before F183 proposes extending it.

```sql
select column_name, data_type, is_nullable
from information_schema.columns
where table_schema = 'public' and table_name = 'backends'
order by ordinal_position;
```

Then a full row dump of `public.backends` with any credential-looking column
reported as `[REDACTED]`.

## Q2 · What `backend_tools` actually stores
First the shape, then the data — do not assume an input-schema column exists.

```sql
select column_name, data_type, is_nullable
from information_schema.columns
where table_schema = 'public' and table_name = 'backend_tools'
order by ordinal_position;
```

Then, for `backend_id = 'armes'`:
- total row count, and the count by `status` (or whatever the status-like column
  is actually called — use the real column names from the shape query above);
- the **complete list of tool names** (145-ish rows, well under the 1000 cap —
  return them all, not a sample).

## Q3 · The per-layer discovery surface (**the load-bearing question**)
For `backend_id = 'armes'`, return every tool whose **name OR description**
matches, case-insensitively, any of:

`line` · `zone` · `equipment` · `machine` · `station` · `list` · `hat` · `bölge` ·
`bolge` · `makine` · `ekipman` · `istasyon`

For each match report: tool name · description (verbatim, truncate at 300 chars) ·
**the full input schema** if `backend_tools` stores one (parameter names, types,
required flags, and whether any parameter has an `enum`).

Then, specifically and separately, the **complete stored record for
`getFactoryLines`** — every column, verbatim.

**Why this matters (context, not an instruction to interpret):** the factory
layer is discovered with a zero-argument call. Anything below it appears to need
a parent id passed in, which changes the sync shape from one call to a fan-out.
The Architect must design against ARMES's actual declaration, not against an
inferred one.

## Q4 · The hand-authored inventory being replaced
Return, in full (these are small tables — no sampling):
- every `domain_rules` row for `backend_id = 'armes'` whose `kind_id` is the
  zone kind — report `kind_id`, `key`, and the full `payload`;
- every `armes` **entity_alias** row — same three fields;
- the exact `kind_id` strings you used, so the Architect can cite them.

Report the row counts as computed values.

## Q5 · The factory mirror, in full
```sql
select backend_id, factory_id, display_name, status, first_seen_at, last_seen_at
from public.factory_registry
order by backend_id, factory_id;
```
Return **all** rows (expected ~17). The Architect needs the real ids to size the
fan-out cost of per-factory discovery calls.

## Q6 · Is there already a topology-shaped table?
```sql
select table_name
from information_schema.tables
where table_schema = 'public'
order by table_name;
```
Return the full list. F183 must not create a second home for something that
already has one.

---

## OUTPUT CONTRACT
One message, ordered Q1→Q6, each answer under its own heading, raw query output
included. For anything you could not read, write the reason (`permission denied`,
`relation does not exist`, `column does not exist`) — **never** an inference.
End your report with the line:

`OPERATOR READ F183-DISCOVERY-SURFACE-v1 COMPLETE — <n> of 6 questions answered`

<!-- TAIL ANCHOR — if you cannot see this line, the relay arrived truncated;
     request a resend before executing (S61-3).
     END · OPERATOR-READ-F183-DISCOVERY-SURFACE-v1 · 2026-07-26 -->
