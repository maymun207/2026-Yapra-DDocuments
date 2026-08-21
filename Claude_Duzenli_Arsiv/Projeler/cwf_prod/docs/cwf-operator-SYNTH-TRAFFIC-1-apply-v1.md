# OPERATOR — apply SYNTH-TRAFFIC-1 migration (synthetic_question_sets + synthetic_runs)
**cwf-operator-SYNTH-TRAFFIC-1-apply-v1 · rev 1 · 2026-07-21 · Architect: Claude · Executor: Gemini (Operator lane)**
PRECONDITION (S47-1): valid ONLY after PR #95 is merged to `origin/master` with
the WHOLE CI job green (S56-2). On any mismatch STOP and report actual state.

## FENCE (read FIRST, confirm each before any command — SEC-1/ADR-006)
- F1 · **Project confirm (Step-0):** you are operating on Supabase project
  **`fjbrkimwvtpwoxhziidh`** and NOTHING else. Print the connected project ref
  and STOP if it differs (the rsiyilsgclghplpoadlf POC db is OFF-LIMITS).
- F2 · Mode: Operator only — `supabase db push` is the ONLY write mechanism
  (never the `apply_migration` tool, ADR-005). No repo writes. No governed-table
  DML. Never echo secret values (ADR-007).
- F3 · Scope: exactly ONE new migration file is expected:
  `supabase/migrations/20260721150000_synthetic_traffic.sql` (tables + RLS +
  revokes + indexes ONLY — it contains ZERO data INSERTs by design; the corpus
  lands via the in-code warm-seeder after deploy, not here).

## G-GATES (literal-read, paste evidence per gate)
- **G1 · Pending check:** `supabase db push --dry-run` (or the migration-list
  diff) shows EXACTLY `20260721150000_synthetic_traffic.sql` pending — nothing
  more, nothing less. Paste the list. If anything else is pending, STOP.
- **G2 · Apply:** `supabase db push`. Paste the applied-migration output line.
- **G3 · Idempotence probe (S31-1):** run `supabase db push` a SECOND time —
  expected result: "no pending migrations"/no-op. Paste it.
- **G4 · Structure verify (reads only):** confirm both tables exist with RLS
  enabled and ZERO policies:
  - `select relname, relrowsecurity from pg_class where relname in ('synthetic_question_sets','synthetic_runs');` → both `t`.
  - `select count(*) from pg_policies where tablename in ('synthetic_question_sets','synthetic_runs');` → `0`.
- **G5 · Grant verify:** privileges for `anon`/`authenticated` on both tables →
  NONE for select/insert/update/delete/truncate (use `information_schema.
  role_table_grants` filtered to those grantees; empty result = pass). Paste.
- **G6 · Report:** one summary block: project ref · G1–G5 evidence · any
  anomaly. NO doc changes (the DOC-FLIP is an AG step, not yours).

## AFTER YOU REPORT (not your steps — context only)
Architect runs `scripts/verifyGrants.ts` coverage via CI/AG and confirms the two
new deny-probes pass (52/0-class result expected to grow by 2 probes). Then the
AG DOC-FLIP marks the migration Operator-applied, and the OWNER (and only the
owner, S54-4 consent-class: flipping `synthetic.enabled` spends provider tokens)
starts the injector from the Sentetik Trafik panel at their chosen rate.

<!-- END · cwf-operator-SYNTH-TRAFFIC-1-apply-v1 · rev 1 · 2026-07-21 -->
