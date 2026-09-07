# OWNER-APPROVAL-S131-DB-PUSH-REPLY-AUTHORITY-1 — named owner approval for one `supabase db push`, bound to the file's sha256

Owner's word in the Architect chat, 2026-09-06T03:3xZ, verbatim:

```
OWNER-APPROVAL-S131-DB-PUSH-REPLY-AUTHORITY-1: onay, file sha256 1101f8d39f240ac97da35aac80c5a78c08ddabd782a80efdd334ef1470f001f5
```

Bound to: `supabase/migrations/20260904073800_relay_inbox_reply_authority_drift.sql` at that sha256, on master `824fb29d927c6e8c1f59e55ceac49455f3374cb0`. Executor: Operator (Gemini + Supabase MCP), prompt OPERATOR-DB-PUSH-REPLY-AUTHORITY-1-v1, project fence `fjbrkimwvtpwoxhziidh`.

The owner asked, half-joking, whether he had "approved himself". He had not: the Architect measured the premise (live constraint = file predicate; ledger lacking the version), the Operator executed, and the owner CONSENTED — consent is the owner's one surface (S102-YASA-1), and an approval bound to a content hash is what makes a later reader able to tell WHAT was approved. Nothing circular.

## OUTCOME, measured by the Architect after the Operator's report (2026-09-06T03:4xZ)

- `supabase_migrations.schema_migrations` newest: `20260904073800 relay_inbox_reply_authority_drift` — one row gained.
- `relay_inbox_reply_authority` = `CHECK (((direction = 'to_lane'::text) OR (lane_addr = ANY (ARRAY['operator'::text, 'scout'::text]))))` — byte-identical to the pre-push read.
- Constraint comment present, begins "Who may author a row that is not addressed TO a lane."
- Operator report on the bus: `OPERATOR-DB-PUSH-REPLY-AUTHORITY-1-report`, 03:39:36Z, dry-run named exactly one migration, apply printed "Applying migration 20260904073800…".

CLOSED@evidence: FIRST JOB 2 (bootstrap v131).

TAIL ANCHOR: OWNER-APPROVAL-S131-DB-PUSH-REPLY-AUTHORITY-1 ends here.
