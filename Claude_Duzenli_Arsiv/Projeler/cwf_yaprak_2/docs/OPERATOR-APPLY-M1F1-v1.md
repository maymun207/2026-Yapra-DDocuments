# OPERATOR APPLY — M1F1 turn_feedback · v1
<!-- OPERATOR-APPLY-M1F1-v1 · 2026-08-02 · S79 · Applies migration
     20260802160000_turn_feedback.sql (merged to master @ dec3ff55). ONE
     self-contained relay (D-2). Operator lane: Supabase MCP + supabase CLI
     only — NO repo contact beyond pulling the migration file content given
     below is already in your db push workspace via the standard flow;
     never echo secrets (ADR-007); silent success paths are correct. -->

## FENCE (G0 — FIRST, before anything else)
Confirm the connected Supabase project ref is EXACTLY
`fjbrkimwvtpwoxhziidh`. Any other ref → ABORT and report the ref you saw
(the ref is not a secret). No step below runs on a fence mismatch.

## PRECONDITION (S47-1)
This apply is authorized ONLY for migration
`20260802160000_turn_feedback.sql` as merged in master `dec3ff55…`.
Consent authority is spoken by the owner in your own channel (S54-4) —
this block is technical content only.

## G1 · PRE-STATE READ (live, pasted verbatim — S65-1)
1. `select to_regclass('public.turn_feedback');` → expect `NULL` (absent).
   If NOT null: STOP, report — the table already exists and this relay
   does not cover that state.
2. Migration status: list applied migrations (`supabase migration list`
   or the equivalent read) → expect 64 applied, `20260802160000` pending
   as the only pending item. Any OTHER pending migration → STOP, report.

## G2 · APPLY (ADR-005: `supabase db push` ONLY — never apply_migration)
Run `supabase db push`. Paste the command output verbatim (it contains no
secrets; if any output line unexpectedly carries a credential, replace
that line with `[REDACTED]` and say so).

## G3 · IDEMPOTENCE PROBE
Run `supabase db push` a SECOND time → expected: zero pending / no-op.
Paste verbatim. A second-run failure or a re-applied statement is a STOP.

## G4 · SCHEMA VERIFY (each read pasted verbatim)
1. Columns: `select column_name, data_type, is_nullable from
   information_schema.columns where table_schema='public' and
   table_name='turn_feedback' order by ordinal_position;`
   → expect exactly: id uuid NO · trace_id text NO · conversation_id uuid
   NO · user_id uuid NO · verdict text NO · reason_text text YES ·
   created_at timestamptz NO · updated_at timestamptz NO.
2. Constraints: `select conname, contype from pg_constraint where
   conrelid='public.turn_feedback'::regclass order by conname;`
   → expect to include: `turn_feedback_user_trace_unique` (u) ·
   `turn_feedback_verdict_check` (c) · `turn_feedback_reason_len_check`
   (c) · the pkey (p) · two FKs (f) to conversations and auth.users.
3. RLS + policies: `select relrowsecurity from pg_class where
   oid='public.turn_feedback'::regclass;` → `t`; and
   `select polname, polcmd from pg_policy where
   polrelid='public.turn_feedback'::regclass order by polname;`
   → EXACTLY 3 rows: `turn_feedback_insert_own` (a) ·
   `turn_feedback_select_own` (r) · `turn_feedback_update_own` (w).
   A 4th policy or a delete (d) policy → STOP.
4. Trigger: `select tgname from pg_trigger where
   tgrelid='public.turn_feedback'::regclass and not tgisinternal;`
   → `trg_turn_feedback_updated_at`.
5. Index: `select indexname from pg_indexes where schemaname='public'
   and tablename='turn_feedback' order by indexname;`
   → includes `turn_feedback_trace_idx` + the unique/pkey indexes.

## G5 · GRANT VERIFY (privilege layer — the A1 all-grantees pattern)
`select grantee, privilege_type from
information_schema.role_table_grants where table_schema='public' and
table_name='turn_feedback' order by grantee, privilege_type;`
Expected shape (paste verbatim, then state the verdict against each):
- `anon`: ZERO rows (nothing at all).
- `authenticated`: SELECT, INSERT, UPDATE present; DELETE and TRUNCATE
  ABSENT.
- `PUBLIC` pseudo-grantee: ZERO rows.
- service role retains full access (its rows are expected and correct).
A present-but-expected-absent privilege is a STOP, not a note. Absence
of an expected-absent privilege is a PASS — prove it by the pasted rows,
never by silence alone (the query returning rows for authenticated
S/I/U IS the positive control that the read can see grants).

## REPORT BACK (one paste)
G0 fence line · G1 both reads · G2/G3 outputs · G4 five reads ·
G5 read + per-role verdicts · and ONE closing line: either
`M1F1 APPLY: ALL GATES PASS` or the FIRST failing gate by name with its
verbatim output. Nothing else runs from this lane — no repo contact, no
governed-table writes, no test-row inserts into turn_feedback.

<!-- TAIL ANCHOR (S61-3): this relay ends after the words "into
     turn_feedback." and this comment. Missing line = truncated relay —
     request re-send before acting. -->
<!-- END · OPERATOR-APPLY-M1F1-v1 -->
