# OPERATOR READ · F187 SUPERSET DECLARATION SURFACE · v1
<!-- OPERATOR-READ-F187-SUPERSET-DECLARATIONS-v1 · 2026-07-26 · S66 · Architect: Claude
     Read-only. Purpose: settle §6 of cwf-f187-superset-data-not-render-design-v1.
     The whole of that note's D1 ("disposition is DISCOVERED first") rests on
     whether Superset's per-tool declarations are actually mirrored into
     backend_tools.input_schema and are rich enough to classify from. If they are
     not, D1 collapses and the note is amended to v1_1 BEFORE any phase prompt is
     written (S65-1 — never discover this mid-build). -->

## FENCE (binding, restate before you start)
- Supabase project fence: **`fjbrkimwvtpwoxhziidh`**. Nothing outside it.
- **READ-ONLY.** No `INSERT` / `UPDATE` / `DELETE` / DDL / `supabase db push`.
- No repo contact. Never echo a secret (ADR-007).
- **empty≠zero.** No rows ⇒ `0 rows returned`. A NULL column ⇒ say `NULL`, never
  "absent" and never a guess. A missing column ⇒ `column does not exist`.
- **Counts computed by the query, never hand-typed** (S65-2).
- Expected volume is ~26 rows — well under the PostgREST 1000-row cap — but state
  how many pages you used anyway.

## PRECONDITION
```sql
select via_gateway, status, count(*)
from public.backend_tools
where backend_id = 'superset'
group by via_gateway, status
order by via_gateway, status;
```
Architect's expectation: **22 rows `via_gateway = true`** (the discovered inner
catalog, all active) and **4 rows `via_gateway = false`** (the outer entry
points). Report what you actually see; a difference is itself a finding.

---

## Q1 · The inner catalog, in full
```sql
select tool_name, description, input_schema, status, first_seen_at, last_seen_at
from public.backend_tools
where backend_id = 'superset' and via_gateway = true
order by tool_name;
```
Return **all** rows. Do **not** truncate `input_schema` — it is the subject of
this read. Truncate `description` at 200 chars if needed and say so.

## Q2 · The outer entry points, in full
Same columns, `via_gateway = false`. All 4 rows, `input_schema` untruncated.
`call_tool`'s declared schema is load-bearing: it is what the pre-flight sees.

## Q3 · The decisive question — is there a real schema, or only a hint?
For the inner rows, report **computed** counts:
1. rows where `input_schema` is NULL;
2. rows where `input_schema ? 'annotations'` (has an `annotations` key);
3. rows where `input_schema ? 'tags'`;
4. rows where `input_schema ? 'parameters_hint'`;
5. rows where `input_schema ? 'properties'` **or** `input_schema ? 'type'`
   (i.e. a genuine JSON-Schema shape rather than a hint blob).

If the `?` jsonb operator is unavailable in your client, use
`jsonb_exists(input_schema, 'annotations')` etc., and say which form you used.

Then list, as computed groups, the **distinct** values of:
- `input_schema -> 'tags'`, with the tool names in each group;
- `input_schema -> 'annotations' ->> 'readOnlyHint'`, with counts;
- `input_schema -> 'annotations' ->> 'destructiveHint'`, with counts.

## Q4 · The five rows the design hinges on
Return the **complete stored record**, every column verbatim, for exactly:
`generate_chart` · `generate_explore_link` · `get_chart_data` ·
`create_virtual_dataset` · `list_datasets`.

If any of these is not present as a row, say `0 rows returned` for that name —
that absence is itself load-bearing.

---

## WHAT THE ARCHITECT IS TRYING TO DECIDE (context, not an instruction)
Whether a tool's **disposition** — "serves us data" vs "renders into Superset's
own application" — can be derived from what Superset already declares, or
whether it needs a governed classification row per tool. Do not interpret or
classify anything yourself; return the declarations and let the classification
happen on the Architect's side.

## OUTPUT CONTRACT
One message, PRECONDITION → Q1 → Q4 under their own headings, raw query output
included. For anything unreadable, give the reason verbatim, never an inference.
End with:

`OPERATOR READ F187-SUPERSET-DECLARATIONS-v1 COMPLETE — <n> of 4 questions answered`

<!-- TAIL ANCHOR — if you cannot see this line the relay arrived truncated;
     request a resend before executing (S61-3).
     END · OPERATOR-READ-F187-SUPERSET-DECLARATIONS-v1 · 2026-07-26 -->
