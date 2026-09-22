<!-- relay-audit: v1 kind=card -->
CARD-APPLY-TOOL-ARG-POLICY-SEED-LINES-S141-1-v1

LANE: operator
fanout: personalized
PROJECT FENCE: fjbrkimwvtpwoxhziidh — every statement in this card runs against that project and no other.

ONE MIGRATION TO APPLY, ONE READ THE LANES COULD NOT MAKE, ONE REPORT. Master now holds the seed migration named in `raw-tokens` (three governed `tool_arg_policy` rows for the two witness tools), landed by PR 577 under CARD-RESOLVED-ENTITY-BINDS-TOOL-ARGUMENT-S141-1-v1. Landing it did not apply it (ADR-005: migrations are authored by AG, applied by the Operator via `supabase db push`, never `apply_migration`; OWNER-RULING-S130 RULING 1). Until it is applied, the binder that landed has no governed row to bind on for the two witness tools, and the Architect's post-landing witness cannot run.

PRECONDITION: `git ls-remote origin refs/heads/master` is at or beyond the head in `the-head` and the migration file exists at that head; `public.tool_arg_policy` holds the row set in `the-head` and NO row for either witness tool. If rows for the witness tools already exist, STOP and print them — the apply already happened by another hand and that is a finding.

```evidence:the-head
master             d29935c1b87ce3878061061556689dc67006e411   merge of PR 577, 2026-09-17T05:58:46Z, read from the shared clone's lane-fetched origin ref at 06:01:00Z
policy rows        public.tool_arg_policy at 2026-09-17T03:33Z (execute_sql): rows for five tools only — getMaterialList · getMaterialListByRecipeType · getMaterials · getOrders · getRecipeTemplates; every factoryId row carries candidate_layer_key 'factory'; NO row for getFactoryLines or getLineStopsReportForZones
the migration      INSERT rows for armes: getFactoryLines.factoryId (trueRequired, neverPlaceholder, candidateLayerKey factory) · getLineStopsReportForZones.factoryId (same) · getLineStopsReportForZones.zoneIds (trueRequired, neverPlaceholder, candidateLayerKey line, declaredType 'id[]'); ON CONFLICT DO NOTHING; no UPDATE, no DELETE, no DDL — the scout's read of the file at the branch head, ~04:49Z; ORDER 1 re-reads the bytes at master
the seam it feeds  api/cwf/_lib/turn/toolArgPolicy.ts bindResolvedEntities + stageTools.ts before planToolCall, landed in PR 577 — a resolved stage-03 entity fills an UNFILLED slot whose governed row names its layer; a filled slot is never overridden
```

## PREMISE

MEASURED: master and the migration's presence in `the-head`, over the shared clone's lane-fetched origin ref at 2026-09-17T06:01:00Z.
MEASURED: the policy row set in `the-head`, via execute_sql at 2026-09-17T03:33Z — NOT re-read since; the PRECONDITION re-reads it.
MEASURED: the migration's INSERT-only shape, by the scout's read of the file at the branch head, ~04:49Z; ORDER 1 re-reads the bytes at master before anything runs.
UNMEASURED: the vendor's own description of `zoneIds` in `backend_tools.input_schema` — refused to the lanes' role; ORDER 4 is where it is read.
SELF-INVALIDATION: this premise dies if master moves past the fenced head by a commit touching supabase/migrations/, if the witness-tool rows already exist, or if a v2 appears.

## ORDERS

ORDER 0 - Print the project you are linked to. It must be the fence above. Anything else: STOP.

ORDER 1 - Print the migration's bytes as they sit at master (`git show <master head>:supabase/migrations/<the file named in raw-tokens>`), and confirm by reading them that it is INSERT ... ON CONFLICT DO NOTHING on `public.tool_arg_policy` — no UPDATE, no DELETE, no DDL. If it is anything else, STOP and print it (S102-YASA-3: an unread plan destroys nothing).

ORDER 2 - `supabase db push` against the fence, from a checkout at master. Print the command's own output verbatim, including which migration versions it lists as pending BEFORE and applied AFTER. If it lists more than this one file as pending, STOP and print the list — the Architect did not expect another pending migration and must rule.

ORDER 3 - VERIFY, by SQL, printed verbatim: `select count(*) from public.tool_arg_policy` (MEASURED expectation: the row set in `the-head` plus the three new rows); the three new rows with tool_name, param, true_required, never_placeholder, candidate_layer_key, declared_type against `the-head`'s migration line; the older rows unchanged (their `updated_at` unmoved). Then `get_advisors` for the project — print whether anything new appears.

ORDER 4 - THE READ THE LANES COULD NOT MAKE (AMENDMENT-1 A4 of the work card): `select tool_name, input_schema from public.backend_tools where backend_id='armes' and tool_name in ('getLineStopsReportForZones','getFactoryLines')` — print the `zoneIds` property's description and type from `input_schema` verbatim. This is the vendor's own word on what zoneIds holds; the seed row says the registry's `line` layer on the strength of the tree's descriptors and one production call. If the schema says something the `line` layer cannot supply, do NOT change any row — print both and STOP; the Architect rules.

ORDER 5 - Report as ONE from_lane row on the bus (kind=report), `reply_to` = THIS card's row id, first line `APPLIED: <migration version> rows=<count>` or `NOT-APPLIED: <reason>`, then the four orders' outputs verbatim. Mark this card consumed when the report is posted.

## FALSIFIER

If `db push` reports the migration already applied, STOP and print the version table — someone else applied it. If the count after apply is not `the-head`'s row set plus three, STOP and print every row. If the schema read in ORDER 4 contradicts the `line` layer, STOP as ordered — the finding is worth more than the apply.

## SHARED SURFACES

```scope
- public.tool_arg_policy (three INSERT rows, by the migration only)
- supabase migration history (the one version, by db push only)
- public.backend_tools (READ only, ORDER 4)
- public.relay_inbox (ONE report row, ORDER 5)
```

No schema change, no row updated or deleted, no repository write.

## DECISION RIGHTS

You choose how you reach a checkout at master for the push. You may refuse on evidence this card did not anticipate — ORDER 4's schema question above all.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| master and the migration's presence | MEASURED: rev-parse and log over the shared clone's origin ref at 2026-09-17T06:01:00Z | the-head |
| the policy row set, no witness-tool rows | MEASURED: execute_sql at 2026-09-17T03:33Z | the-head |
| the migration's INSERT-only shape | MEASURED: the scout's file read at the branch head, ~04:49Z; ORDER 1 re-reads | the-head |
| the vendor's zoneIds description | NOT-READ | ORDER 4 measures it |

## ON-DISAGREEMENT

If any value here differs from what you measure live, YOUR READING WINS, you print both, and the difference is reported as a finding in its own right.

DECAYS if master moves past the fenced head by a commit touching supabase/migrations/, if the witness-tool rows already exist, or if a v2 appears.

```evidence:raw-tokens
migration file      supabase/migrations/20260917070000_tool_arg_policy_seed_armes_lines.sql
scout CI row        0904aabb-fce1-454a-a654-ee5cbba74e34
work card row       521741ef-9247-4158-851a-171a2351e95a
```
