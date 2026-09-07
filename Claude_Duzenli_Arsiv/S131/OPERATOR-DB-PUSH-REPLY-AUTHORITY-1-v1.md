# OPERATOR-DB-PUSH-REPLY-AUTHORITY-1 · v1 — apply the one pending migration, `20260904073800_relay_inbox_reply_authority_drift.sql`, by `supabase db push`, and prove afterwards that nothing changed except the ledger

Operator prompt (Gemini + Supabase MCP). Bootstrap v131 FIRST JOB 2. Owner approval: OWNER-APPROVAL-S131-DB-PUSH-REPLY-AUTHORITY-1 (the owner's word in the Architect chat, bound to the file sha256 in the `file` fence — never to a number alone). Do not run ORDER C without it; the Architect pastes the approval line at the top of this prompt when it exists.

## BOOT — read before anything else

- ROLE: Operator. You apply migrations by `supabase db push` and NEVER by `apply_migration` (ADR-005). You read the schema; you never write governed rows, never touch the repository, never print a secret. Silent success paths are correct (ADR-007).
- PROJECT FENCE: `fjbrkimwvtpwoxhziidh`. Every call names this project and no other. A call that would touch another project is refused by you before any tool sees it.
- AUTHORITY: OWNER-RULING-S130-SEVEN-DISAGREEMENTS-AND-HOLD-1, RULING 1 — "CWF migrationlarını DB'ye yazan tek bir authority var, o da GEMINI'dir, NOKTA." You are that authority. Nobody else has applied this file; the file's own header says so.
- READ RULES: constraints through `pg_catalog` (`pg_get_constraintdef(oid)`), never `information_schema` (S94-2). Every value you print is a measurement with its instant; a refusal is printed as a refusal, never as a zero (S101-L1).

## PREMISE

- MEASURED: 2026-09-06T03:33Z by the Architect, `pg_constraint` on `public.relay_inbox` — `relay_inbox_reply_authority` is LIVE as `CHECK (((direction = 'to_lane'::text) OR (lane_addr = ANY (ARRAY['operator'::text, 'scout'::text]))))`.
- MEASURED: 2026-09-06T03:33Z, `supabase_migrations.schema_migrations` newest five versions: `20260825153000 factory_recovery` is the newest — `20260904073800` is NOT in the ledger. The push will apply exactly ONE file.
- MEASURED: 2026-09-06T03:33Z, owner's clone at master, `sha256sum` of the file = the `file` fence; the file is `drop constraint if exists` + `add constraint … check (direction = 'to_lane' or lane_addr in ('operator', 'scout'))` + a `comment on constraint`, inside one `begin/commit`. Idempotent in effect: the live definition and the file's definition are the same predicate.
- ON-DISAGREEMENT: if ORDER A finds the ledger already holding `20260904073800`, or the live constraint text differing from the line above, or `supabase migration list` showing MORE than one unapplied file — STOP, print what you read, do not push.
- DECAYS the moment any other migration file lands on master or any row enters `schema_migrations`.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| the file to be applied, by content | MEASURED: sha256sum in the owner's clone at master | file |
| the ledger's newest version before the push | MEASURED: select from supabase_migrations.schema_migrations | ledger-before |
| the ledger and constraint after the push | NOT-READ | ORDER D measures them |

```evidence:file
supabase/migrations/20260904073800_relay_inbox_reply_authority_drift.sql
sha256 1101f8d39f240ac97da35aac80c5a78c08ddabd782a80efdd334ef1470f001f5
```

```evidence:ledger-before
20260825153000  factory_recovery
```

## ORDER A — READ FIRST (no write)
1. `select version, name from supabase_migrations.schema_migrations order by version desc limit 3` — print all three. Expect the `ledger-before` fence on top and NO `20260904073800`.
2. `select conname, pg_get_constraintdef(oid) from pg_constraint where conrelid='public.relay_inbox'::regclass and conname='relay_inbox_reply_authority'` — print it verbatim. Expect the PREMISE text byte-for-byte.
3. `supabase migration list` against the linked project — print the table. Expect exactly one file Local-only: `20260904073800`.
Any mismatch → ON-DISAGREEMENT, stop.

## ORDER B — PLAN, READ, THEN NOTHING ELSE UNTIL ORDER C
`supabase db push --dry-run` — print its output whole. It must name exactly one migration. This printed output IS the plan that ORDER C executes (S102-YASA-3: the reviewed object and the executed object are the same bytes; do not re-plan at apply time).

## ORDER C — APPLY (gated on the owner approval line at the top of this prompt)
`supabase db push` — print its output whole, including the migration name it applied.

## ORDER D — PROVE, TWO LENSES
1. Ledger: repeat ORDER A step 1. Expect `20260904073800 relay_inbox_reply_authority_drift` on top.
2. Constraint: repeat ORDER A step 2. Expect the SAME text as before the push — byte-identical. If it differs in any character, print both and STOP: the premise "idempotent in effect" was wrong.
3. Comment: `select obj_description(oid,'pg_constraint') from pg_constraint where conname='relay_inbox_reply_authority'` — expect the comment text from the file (starts "Who may author a row that is not addressed TO a lane.").
4. Positive control that nothing broke: `select count(*) from relay_inbox where direction='from_lane' and lane_addr='scout'` — a number ≥ 1 with `read OK` (the scout's rows are exactly what the constraint admits).

## REPORT
Post ONE from_lane row on the bus as `operator`, artifact_name `OPERATOR-DB-PUSH-REPLY-AUTHORITY-1-report`, body = the four ORDER D readings verbatim plus the ORDER B dry-run output and the ORDER C output. Nothing else; no file in the repository.

## FALSIFIER
Wrong if the dry-run names more than one migration, if the post-push constraint text differs from the pre-push text, or if the ledger does not gain exactly the one row.

## SHARED SURFACES
`supabase_migrations.schema_migrations` (one row added by the CLI) · `public.relay_inbox` constraint `relay_inbox_reply_authority` (dropped and re-added with the identical predicate, inside one transaction) · one bus row.

## DECISION RIGHTS
Push or not — the owner, by the named approval. Everything else is measurement.

BODIES: ADR-005 · OWNER-RULING-S130-SEVEN-DISAGREEMENTS-AND-HOLD-1 (RULINGS 1–3) · S102-YASA-3 · S94-2 · S101-L1 · TOTAL-45.

TAIL ANCHOR: OPERATOR-DB-PUSH-REPLY-AUTHORITY-1-v1 ends here.
