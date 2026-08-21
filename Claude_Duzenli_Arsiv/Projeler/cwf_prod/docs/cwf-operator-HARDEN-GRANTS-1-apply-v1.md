# OPERATOR APPLY — HARDEN-GRANTS-1 default-ACL sweep (Gemini · Supabase MCP/CLI)
**cwf-operator-HARDEN-GRANTS-1-apply · v1 · 2026-07-11 · Operator lane (Gemini) · FENCE-first**

You are the **Operator** (Gemini + Supabase). Apply ONE authored, Operator-pending migration and
confirm it by LITERAL catalog reads. Repo HEAD carrying the migration: `origin/master = cbd657a`.
Supabase project: `fjbrkimwvtpwoxhziidh`.

## ── FENCE (read first; these bound everything you do) ──
- **Migrations apply via `supabase db push` ONLY.** `apply_migration` and any `execute_sql` that runs
  DDL/DCL are **FORBIDDEN** (ADR-005). The G-gate reads below are read-only `select …` — those are fine.
- **NO repo mutations, ever.** You may clone the repo READ-ONLY to obtain the migration file for
  `db push`; you never edit, commit, or push repo files.
- **NEVER echo a secret** (DB password, service_role key, tokens). Report gate results as the literal
  boolean/row values ONLY.
- **Benign-deviation class (allowed, just disclose):** an already-authed shell may skip
  `login --token`; the standing `.env.local` copy; a workspace-subdir clone if a `/tmp` `rm` is
  permission-denied. Disclose any you take.
- **Literal-read discipline:** paste each gate's ACTUAL output verbatim. Do NOT paraphrase, "expect",
  or infer — if a value differs from the annotation, report the mismatch; do not "fix" it.

## ── STEP 1 · get the migration + link ──
```
# read-only clone to obtain the migration file
git clone --quiet https://github.com/maymun207/cwf_yaprak && cd cwf_yaprak
git rev-parse origin/master            # MUST be cbd657a0efc2089ca4d588f0b9a2f5332a56ce52
ls supabase/migrations/ | tail -1      # MUST be 20260711120000_harden_grants_default_acl_sweep.sql
supabase link --project-ref fjbrkimwvtpwoxhziidh
```

## ── STEP 2 · apply (the ONE new migration) ──
```
supabase db push
```
Report: the push output verbatim (it should apply ONLY `20260711120000…`; nothing else is pending).

## ── STEP 3 · G-GATES (literal read-only `select`; paste each result) ──
The migration header embeds these; run them and paste actual values against the annotation.

**G-a — residue GONE** (owner-CRUD table that held it + a sample server-only table):
```
select has_table_privilege('authenticated','public.conversations','TRUNCATE');    -- expect f
select has_table_privilege('authenticated','public.conversations','REFERENCES');   -- expect f
select has_table_privilege('authenticated','public.conversations','TRIGGER');      -- expect f
select has_table_privilege('authenticated','public.publish_rollouts','REFERENCES');-- expect f
select has_table_privilege('anon','public.conversations','TRUNCATE');              -- expect f
```

**G-b — must-NOT-break guard** (RLS-governed user access intact — the safety proof):
```
select has_table_privilege('authenticated','public.conversations','SELECT');   -- expect t (UNCHANGED)
select has_table_privilege('authenticated','public.conversations','INSERT');   -- expect t (UNCHANGED)
```
If either G-b value is `f`, STOP and report — that would mean a data grant was touched (must never happen).

**G-c — defaults altered** (future objects secure-by-default):
```
select defaclobjtype, defaclacl from pg_default_acl;
-- expect: the TABLES default no longer lists references/trigger/truncate for anon/authenticated;
--         the FUNCTIONS default no longer lists execute for public/anon/authenticated.
```

**G-d — idempotence** (mandatory second run):
```
supabase db push
-- expect: "Remote database is up to date." / no changes applied.
```

## ── STEP 4 · REPORT ──
Paste, in order: the anchor + migration filename confirmation; the STEP-2 push output; every G-a value;
both G-b values; the G-c `pg_default_acl` rows; the G-d second-push output; any benign deviations taken.
Do NOT summarize as "all passed" — paste the literal values; the Architect reads them.

<!-- END · cwf-operator-HARDEN-GRANTS-1-apply · v1 · 2026-07-11 -->
