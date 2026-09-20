<!-- relay-audit: v1 kind=card -->
CARD-APPLY-TOOL-ARG-POLICY-SEED-LINES-S141-1-v1

LANE: operator
fanout: personalized
PROJECT FENCE: fjbrkimwvtpwoxhziidh — every statement in this card runs against that project and no other.

ONE MIGRATION TO APPLY, ONE READ THE LANES COULD NOT MAKE, ONE REPORT. Master now holds `supabase/migrations/<stamp>_tool_arg_policy_seed_armes_lines.sql` (full filename in `raw-tokens`), landed by PR 577 under CARD-RESOLVED-ENTITY-BINDS-TOOL-ARGUMENT-S141-1-v1. Landing it did not apply it (ADR-005: migrations are authored by AG, applied by the Operator via `supabase db push`, never `apply_migration`; OWNER-RULING-S130 RULING 1). Until it is applied, the binder that landed has no governed row to bind on for the two witness tools, and the Architect's post-landing witness cannot run.

PRECONDITION: `git ls-remote origin refs/heads/master` is at or beyond the head in `raw-tokens` and the migration file exists at that head; `public.tool_arg_policy` holds twenty-three rows and NONE for `getFactoryLines` or `getLineStopsReportForZones` (measured by the Architect at 2026-09-17T03:33Z). If the rows already exist, STOP and print them — the apply already happened by another hand and that is a finding.

## ORDERS

ORDER 0 - Print the project you are linked to. It must be the fence above. Anything else: STOP.

ORDER 1 - Print the migration's bytes as they sit at master (`git show <master head>:supabase/migrations/<the file>`), and confirm by reading them that it is INSERT ... ON CONFLICT DO NOTHING on `public.tool_arg_policy` — no UPDATE, no DELETE, no DDL. If it is anything else, STOP and print it (S102-YASA-3: an unread plan destroys nothing).

ORDER 2 - `supabase db push` against the fence, from a checkout at master. Print the command's own output verbatim, including which migration versions it lists as pending BEFORE and applied AFTER. If it lists more than this one file as pending, STOP and print the list — the Architect did not expect another pending migration and must rule.

ORDER 3 - VERIFY, by SQL, printed verbatim: `select count(*) from public.tool_arg_policy` (expect twenty-six); the three new rows with tool_name, param, true_required, never_placeholder, candidate_layer_key, declared_type (expect getFactoryLines/factoryId/true/true/factory/null · getLineStopsReportForZones/factoryId/true/true/factory/null · getLineStopsReportForZones/zoneIds/true/true/line/'id[]'); the twenty-three older rows unchanged (their `updated_at` unmoved). Then `get_advisors` for the project — print whether anything new appears.

ORDER 4 - THE READ THE LANES COULD NOT MAKE (AMENDMENT-1 A4 of the work card): `select tool_name, input_schema from public.backend_tools where backend_id='armes' and tool_name in ('getLineStopsReportForZones','getFactoryLines')` — print the `zoneIds` property's description and type from `input_schema` verbatim. This is the vendor's own word on what zoneIds holds; the seed row says the registry's `line` layer on the strength of the tree's descriptors and one production call. If the schema says something the `line` layer cannot supply, do NOT change any row — print both and STOP; the Architect rules.

ORDER 5 - Report as ONE from_lane row on the bus (kind=report), `reply_to` = THIS card's row id, first line `APPLIED: <migration version> rows=<count>` or `NOT-APPLIED: <reason>`, then the four orders' outputs verbatim. Mark this card consumed when the report is posted.

## FALSIFIER

If `db push` reports the migration already applied, STOP and print the version table — someone else applied it. If the count after apply is not twenty-six, STOP and print every row. If the schema read in ORDER 4 contradicts the `line` layer, STOP as ordered — the finding is worth more than the apply.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| twenty-three rows, none for the two tools | MEASURED: execute_sql at 2026-09-17T03:33Z | raw-tokens |
| the migration is INSERT-only with ON CONFLICT DO NOTHING | MEASURED: the scout's CI read row, item 4, at ~04:49Z; ORDER 1 re-reads the bytes | raw-tokens |
| master holds the file | NOT-READ | the PRECONDITION measures it |

## ON-DISAGREEMENT

If any value here differs from what you measure live, YOUR READING WINS, you print both, and the difference is reported as a finding in its own right.

DECAYS if the rows already exist, if master does not hold the file, or if a v2 appears.

```evidence:raw-tokens
migration file      supabase/migrations/20260917070000_tool_arg_policy_seed_armes_lines.sql
master at cut       <filled at post — the merge of PR 577>
scout CI row        0904aabb-fce1-454a-a654-ee5cbba74e34
work card row       521741ef-9247-4158-851a-171a2351e95a
```
