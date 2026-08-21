# OPERATOR — GOLDEN-BATCH-1 APPLY · v1

<!-- cwf-operator-GOLDEN-BATCH-1-apply-v1 · rev 1 · 2026-07-14 · Session 43.
     ONE visit, three parts: (A) pre-reads · (B) migration via `supabase db push` ·
     (C) post-migration G-gates incl. function-EXECUTE proof via pg_proc.proacl
     (S30-1: information_schema.role_routine_grants alone MISSES PUBLIC `=X/…` entries).
     Context the Operator does not act on: the per-minute golden-runner cron is ALREADY live
     and currently failing loudly ("Could not find the function …") — this apply is what
     silences it. The Architect verifies the silencing from Vercel logs; the Operator does
     NOT investigate runner behaviour. -->

```
FENCE — OPERATOR LANE.
• DB'ye erişimin TEK yolu Supabase MCP'dir. Başka hiçbir yol kullanma.
• .env, .env.local, .env.* dosyalarını AÇMA, OKUMA, GREP'LEME, ÖZETLEME.
• Servis anahtarıyla (SUPABASE_SECRET_KEY / service_role) elle istemci KURMA.
• Repoya veya diske dosya YAZMA (.agents/operator-inbox/ hariç).
• Bunlardan biri gerekli görünüyorsa DUR ve bildir — kendi başına çözme.
• Rapor = ham çıktı. Yorum yok, düzeltme yok, "yardımcı olmak için" ek adım yok.
```

**Project: `fjbrkimwvtpwoxhziidh`.** Every statement runs against THIS project only. If the
connected ref differs, STOP at A-1 and report.

---

## A · PRE-READS (read-only; any non-expected value ⇒ STOP)

**A-1.** Connected project ref → must be `fjbrkimwvtpwoxhziidh`.
**A-2.** `select to_regclass('public.golden_runs');` → `NULL`.
**A-3.** `select to_regclass('public.golden_run_chunks');` → `NULL`.
**A-4.** `select to_regprocedure('public.golden_run_claim_chunks(integer,integer)');` → `NULL`.
**A-5.** `select to_regprocedure('public.golden_run_add_tokens(uuid,bigint)');` → `NULL`.

## B · MIGRATION (the one write door)

Apply via **`supabase db push`** — no `apply_migration` tool, no hand-run DDL. Exactly ONE
pending migration is expected: `20260714130000_golden_batch_runs.sql`. If the CLI lists any
other pending name, STOP before confirming. Paste the raw push output.

## C · POST-MIGRATION G-GATES (read-only; ✅/❌ each, raw row pasted)

**G-1/G-2 · tables exist:** `to_regclass` for both → not null.
**G-3/G-4 · RLS on:**
```sql
select relname, relrowsecurity from pg_class
where oid in ('public.golden_runs'::regclass, 'public.golden_run_chunks'::regclass);
```
→ `t` for both.
**G-5 · zero policies:**
```sql
select tablename, count(*) from pg_policies
where schemaname='public' and tablename in ('golden_runs','golden_run_chunks')
group by 1;
```
→ zero rows (no policies at all).
**G-6 · no client table grants:**
```sql
select table_name, grantee, privilege_type from information_schema.role_table_grants
where table_schema='public' and table_name in ('golden_runs','golden_run_chunks')
  and grantee in ('anon','authenticated','PUBLIC') order by 1,2,3;
```
→ **zero rows**. Any row: paste verbatim, do NOT fix.
**G-7 · function EXECUTE proof (pg_proc.proacl — the authoritative read):**
```sql
select p.proname, p.proacl
from pg_proc p join pg_namespace n on n.oid = p.pronamespace
where n.nspname='public'
  and p.proname in ('golden_run_claim_chunks','golden_run_add_tokens');
```
Expected in BOTH `proacl` arrays: a `service_role=X/…` entry present; **NO** `anon=…`,
**NO** `authenticated=…`, **NO** entry beginning `=X/` (that leading-equals form is a PUBLIC
grant). Paste the raw arrays.
**G-8 · shape:** column list of `public.golden_runs` (name + data_type, ordinal order) — paste.

## REPORT
A → B → C in order, raw outputs only, each gate ✅/❌. On any deviation: the deviation, the
raw evidence, and the word **STOPPED**.

<!-- END · cwf-operator-GOLDEN-BATCH-1-apply-v1 · rev 1 · 2026-07-14 -->
