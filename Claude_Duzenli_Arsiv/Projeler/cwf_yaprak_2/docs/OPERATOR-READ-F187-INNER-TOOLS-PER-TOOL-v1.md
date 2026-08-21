# OPERATOR READ — F187 · Superset inner tools, PER TOOL · v1
<!-- OPERATOR-READ-F187-INNER-TOOLS-PER-TOOL-v1 · 2026-07-27 · S67 · Architect: Claude
     Operator lane: Gemini + Supabase MCP. READ-ONLY. Zero migrations, zero writes.
     Unblocks the F187 phase prompt: design note v1_1 §6 requires the per-tool
     mapping, and the S66 census (mutate 8 / discovery 6 / core 4 / data 2 /
     explore 2) cannot produce the derivation diff D1 makes binding.
     Safe to run at any time: a read cannot disturb the 00:00Z -> RUN 2 merge
     freeze, which covers behavioural merges only. -->

## FENCE — read this before anything else
- **Project ref: `fjbrkimwvtpwoxhziidh`.** Every statement below runs against
  that project and no other. If the connected project ref differs, **STOP** and
  report the ref you are connected to. Do not proceed.
- **MODE: READ-ONLY (ADR-005 v2).** No `apply_migration`. No
  `execute_sql`-for-DDL. No `INSERT` / `UPDATE` / `DELETE` / `ALTER` / `CREATE`
  / `DROP`. No edge-function deploy, no branch mutation. This prompt contains no
  migration and authorises none.
- **No repo contact.** Do not read, write, clone or reference the git
  repository. Everything you need is below.
- **ADR-007 — secrets are never echoed.** None of the tables below is expected
  to hold a secret value. If any column you encounter looks secret-bearing,
  report the **column NAME only**, never its contents, and flag it.
- **Report RAW OUTPUT, not a narrative.** The Architect reasons over the rows.
  A summary in place of rows is not evidence. Where a result is large, paste it
  in full anyway — truncating is a decision only the Architect may make.

## Why this read exists
F187's design (v1_1) commits the phase to deriving each Superset inner tool's
disposition — **data source** vs **foreign surface** — from the backend's own
declaration, and then diffing that derivation against the owner-approved triage.
S66 produced a **census** (how many tools carry each tag). A census cannot
produce a diff: it says `mutate` appears 8 times, not *which* 8. The phase needs
the per-tool mapping, by name.

There is also a known asymmetry to test: `execute_sql` declares
`tags:["mutate"]` and `destructiveHint:true` yet sits in the KEEP column, so the
tag set almost certainly misclassifies in **both** directions. The rows below
are what settles it.

## G0 · Column discovery — run this FIRST
Do not accept column names from this document. The Architect is deliberately not
supplying them, because supplying stale values in a lane prompt is a recurring
error class here.

```sql
select table_name, column_name, data_type
from information_schema.columns
where table_schema = 'public'
  and table_name in ('backend_tools', 'domain_rules')
order by table_name, ordinal_position;
```

Paste the full result. Build G1-G4 against the column names it returns. If a
column this prompt describes in prose does not exist under the name you expect,
**say so and stop** rather than guessing a substitute.

## G1 · The 22 gateway inner tools, per tool, with the RAW declaration
For `backend_tools` rows scoped to the Superset backend where the gateway flag
is true, return **every row**, with:

- the tool name,
- the status column,
- the gateway flag,
- and the **raw `input_schema` jsonb, unmodified and pretty-printed**.

Do not extract, flatten or summarise `input_schema`. The whole point is to see
what `catalogSync` actually stored — `annotations`, `tags`, `parameters_hint`,
and whether anything resembling a real JSON Schema (`properties` / `type`) is
present.

**Pre-declared expectation (from the S66 read) — report any deviation loudly:**
22 rows · all carrying `annotations` + `tags` + `parameters_hint` · **zero**
carrying `properties`/`type` · 21 of 22 with `parameters_hint: "request"` ·
tag census `mutate` 8, `discovery` 6, `core` 4, `data` 2, `explore` 2.
A deviation is a finding, not a nuisance: it would mean the mirror changed
between S66 and now.

## G2 · The entry tools — the boundary
Return the same columns for Superset-scoped rows where the gateway flag is
**false** (the outer tools CWF actually offers). Expect a small number, on the
order of four. This establishes where the governed catalog ends and the
ungoverned inner catalog begins, which is F187's whole subject.

## G3 · Completeness probe (F198) — make a silent cap visible
Run, as separate statements:

```sql
select count(*) from public.backend_tools where <the Superset backend scope>;
select count(*) from public.backend_tools where <Superset scope> and <gateway flag is true>;
```

Then state explicitly, in one line each:
- the total row count returned by G1, and whether it **equals** the second count;
- the total row count returned by G2, and whether G1 + G2 **equals** the first.

If any pair disagrees, the read was truncated and the rows above are a sample,
not the catalog. Say so plainly. **Do not reconcile the difference yourself.**

## G4 · Current governed classification state
For published `domain_rules`, report **counts grouped by backend scope and
`kind_id`**, restricted to the tool-category and tool-annotation kinds.

The question this answers: does Superset have **any** governed tool
classification today, or is the governed surface armes-only? F187's D1 turns on
it — "discovered first, governed only where discovery is silent" needs to know
what is already governed.

Report the grouped counts raw. If Superset has zero rows of both kinds, say
"zero" explicitly rather than omitting the group — an absent group and a zero
count are different statements (`empty != zero`).

## Output checklist
Report, in this order:
1. The connected project ref, verbatim.
2. G0's full column listing.
3. G1's rows, complete, with raw `input_schema`.
4. G2's rows, complete.
5. G3's three counts and the two equality statements.
6. G4's grouped counts, with explicit zeros.
7. One line confirming: no write, no DDL, no migration, no repo contact, no
   secret value printed.

<!-- TAIL ANCHOR (S61-3) — if you cannot see this line the relay was truncated;
     request the artifact again before running anything.
     END · OPERATOR-READ-F187-INNER-TOOLS-PER-TOOL-v1 · 2026-07-27 · S67 -->
