# OPERATOR · apply 20260718120000_rule_kinds_surface (WAVE2-IA-2)

<!-- cwf-operator-IA-2-apply-surface-v1 · rev 1 · 2026-07-18 · Architect-authored, owner-endorsed.
     Relay to Gemini (Operator lane) verbatim. Migration apply via `supabase db push` ONLY (ADR-005). -->

```
PRECONDITION: valid ONLY while your Supabase MCP is connected to project
fjbrkimwvtpwoxhziidh. STEP 0: confirm the connected project_ref. If it is NOT
exactly fjbrkimwvtpwoxhziidh (e.g. rsiyilsgclghplpoadlf — the separate LIVE POC
DB), STOP and report — do not apply anything to the wrong database.

STEP 0b (positive-content proof): SELECT from mcp_settings and confirm BOTH the
ksadmin ARMES (armesMes) and Superset (supersetArmes) backend rows are present
(labels only, never secret values). If not present, STOP and report — this is
not the governed production DB.

MODE: migration apply. Use `supabase db push` ONLY (ADR-005 — never the
apply_migration tool). The migration to apply is the repo file, already on
master 4998270:
  supabase/migrations/20260718120000_rule_kinds_surface.sql
It adds the rule_kinds.surface column (backend-agnostic UI-grouping axis) and
backfills agent.param → 'parameter'. It is idempotent by construction.

── G1 · FENCE (state before touching anything) ──────────────────────
Report the current migration list head (the latest applied migration timestamp)
so we confirm 20260718120000 is NOT yet applied. If it already appears applied,
STOP and report (someone applied it already — do not re-push).

── G2 · APPLY ──────────────────────────────────────────────────────
Run `supabase db push`. Paste the command output verbatim.

── G3 · READ-VERIFY (literal reads, paste results) ──────────────────
1. Column exists + shape:
   SELECT column_name, data_type, column_default, is_nullable
   FROM information_schema.columns
   WHERE table_schema='public' AND table_name='rule_kinds' AND column_name='surface';
   Expect: surface · text · default 'rule' · NOT NULL.
2. CHECK constraint present (surface in ('parameter','rule')):
   SELECT conname, pg_get_constraintdef(oid)
   FROM pg_constraint
   WHERE conrelid='public.rule_kinds'::regclass AND contype='c'
     AND pg_get_constraintdef(oid) ILIKE '%surface%';
   Expect: one CHECK naming both 'parameter' and 'rule'.
3. Backfill correct — agent.param is 'parameter', everything else 'rule':
   SELECT surface, count(*) FROM public.rule_kinds GROUP BY surface ORDER BY surface;
   AND:
   SELECT kind_id, surface FROM public.rule_kinds WHERE kind_id='agent.param';
   Expect: agent.param → 'parameter'; all other kinds → 'rule'.

── G4 · IDEMPOTENCE PROBE (mandatory) ───────────────────────────────
Run `supabase db push` a SECOND time. Confirm it reports no changes / the
migration already applied (a no-op). Paste the output. This proves the
add-column-if-not-exists + WHERE-guarded backfill is safe to re-run.

END. Paste G1–G4 outputs. Read/apply only — take no other action.
```

<!-- END · cwf-operator-IA-2-apply-surface-v1 · rev 1 · 2026-07-18 -->
