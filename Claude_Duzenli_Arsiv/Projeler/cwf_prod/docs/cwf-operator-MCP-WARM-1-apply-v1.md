# OPERATOR — apply backend_health migration (MCP-WARM-1 W2.1)
<!-- cwf-operator-MCP-WARM-1-apply-v1 · rev 1 · 2026-07-16 · Architect-authored, S47. -->

## FENCE (read first, act second)
You are the **Operator lane** (Gemini + Supabase MCP). This prompt authorizes EXACTLY ONE
action class: applying ONE already-authored migration via `supabase db push`. Nothing else.
- Target Supabase project is **fjbrkimwvtpwoxhziidh** and ONLY that. Verify it via your MCP
  connection BEFORE any action; if your connected project ref differs in ANY way, STOP and
  report the mismatch (the SEC-1 precedent: stopping was correct).
- `supabase db push` ONLY — never the `apply_migration` MCP tool (ADR-005).
- No secrets are ever echoed, logged, or pasted (ADR-007). Gate outputs are structural
  facts only (names, booleans, counts).
- **PRECONDITION (S47-1):** valid only while `origin/master` contains merge commit
  `1f32c92ddf0b2d83bb274225d113cc23b6363417` and the file
  `supabase/migrations/20260716140000_backend_health.sql` exists at HEAD. On mismatch:
  STOP and report actual state.

## G-GATES (literal reads; report each as PASS/FAIL with the literal evidence)

**G1 — Project identity:** read the connected project ref via MCP. PASS iff it equals
`fjbrkimwvtpwoxhziidh` exactly.

**G2 — Migration literal read:** open `supabase/migrations/20260716140000_backend_health.sql`
at master HEAD and confirm by reading (not assuming): (a) creates ONLY `public.backend_health`
(one table, zero functions, nothing SECURITY DEFINER); (b) `enable row level security` with
ZERO `create policy` statements; (c) one `revoke select, insert, update, delete, truncate …
from public, anon, authenticated;` line (all-grantees pattern); (d) one index
`backend_health_backend_checked_idx` on `(backend_id, checked_at desc)`; (e) FK
`backend_id references public.backends (id)`. PASS iff all five are literally present.

**G3 — Pre-state:** `select to_regclass('public.backend_health');` → must be NULL
(table absent). If it already exists, STOP and report (do not push).

**G4 — Apply:** `supabase db push` against the verified project. Paste the tool's own
summary line(s) naming the applied migration.

**G5 — Post-state verification (SQL reads):**
1. `select to_regclass('public.backend_health');` → not null.
2. `select relrowsecurity from pg_class where oid = 'public.backend_health'::regclass;` → true.
3. `select count(*) from pg_policies where schemaname='public' and tablename='backend_health';` → 0.
4. Grants: `select grantee, privilege_type from information_schema.role_table_grants
   where table_schema='public' and table_name='backend_health'
   and grantee in ('PUBLIC','anon','authenticated');` → ZERO rows.
5. Index: `select indexname from pg_indexes where schemaname='public' and
   tablename='backend_health';` → contains `backend_health_backend_checked_idx`.
6. FK: `select count(*) from information_schema.table_constraints where table_name='backend_health'
   and constraint_type='FOREIGN KEY';` → 1.

**G6 — Idempotence probe:** run `supabase db push` a SECOND time → must report
up-to-date / nothing to apply. Paste that line.

## REPORT FORMAT
One block: G1…G6 each `PASS/FAIL + literal evidence`. If ANY gate fails: STOP at that gate,
report, change nothing further. Zero rows written to any table by you — the cron is the
only writer of `backend_health`.

## WHAT HAPPENS NEXT (context, not your action)
The `*/30` cron `api/admin/backend-health` currently returns a self-explaining 500
("table absent") by design; after your apply, its next tick writes the first health rows
and freshens the `backend_tools` mirror. The Architect reads Vercel logs to live-verify,
then a DOC-FLIP phase flips the migration header's "Operator-pending" status.

<!-- END · cwf-operator-MCP-WARM-1-apply-v1 · rev 1 · 2026-07-16 -->
