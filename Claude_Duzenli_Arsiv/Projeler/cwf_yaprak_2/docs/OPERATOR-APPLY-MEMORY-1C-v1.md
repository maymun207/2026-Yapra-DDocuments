# OPERATOR-APPLY-MEMORY-1C · v1
<!-- Architect-authored · 2026-07-31 · For the Operator lane (Gemini +
     Supabase MCP). Applies ONE migration: 20260731120000_memory_audit.sql.
     Relay AFTER AG reports the 1C merge on master + production READY. -->

## FENCE (read before any action)

- Target project ref: **fjbrkimwvtpwoxhziidh** — verify the connected ref
  equals this EXACTLY before anything else; mismatch → STOP, report, touch
  nothing.
- Operator lane only: **no repo contact, no governed-table writes** beyond
  this migration's DDL, **never echo a secret** (ADR-007 — silent success
  paths are correct).
- Migration method: **`supabase db push` ONLY** (ADR-005). Never
  `apply_migration`, never hand-run DDL.

## G1 · Apply

Run `supabase db push`. Expected: exactly ONE pending migration —
`20260731120000_memory_audit` — applies cleanly. More than one pending, or
a different name → STOP and report before proceeding.

## G2 · Idempotence probe

Run `supabase db push` again. Expected: no-op ("Remote database is up to
date" or equivalent). Any second application attempt or error → report
verbatim.

## G3 · Object read (structure, computed not asserted)

Read and report, structured:

1. Table exists: `public.memory_audit` with columns `id, action,
   actor_user_id, actor, reason, episode_turn_id, deleted_count,
   scanned_count, created_at`.
2. `memory_audit_action_check` present, actions
   `('episode_delete','forget_tick')`.
3. RLS: `pg_class.relrowsecurity = true`; policy count on the table = 0.
4. Grants: `pg_class.relacl` for `memory_audit` shows NO entries for
   `anon`, `authenticated`, or `PUBLIC` (service/owner roles only). This
   is the all-grantees-revoke verification — read the ACL itself, not
   information_schema alone.
5. Row count = 0 (nothing has written yet; the next 03:40Z tick writes the
   first `forget_tick` row).

## G4 · Report

One structured report: push output (G1), no-op proof (G2), the five G3
reads. No secrets, no connection strings, no raw ACL beyond the role
names. Done means: applied · idempotent · sealed · empty.

<!-- END · OPERATOR-APPLY-MEMORY-1C-v1 · 2026-07-31 -->
