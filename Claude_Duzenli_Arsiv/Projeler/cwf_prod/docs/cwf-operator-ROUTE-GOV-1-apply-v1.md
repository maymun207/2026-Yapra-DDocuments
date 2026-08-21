# OPERATOR — ROUTE-GOV-1 APPLY · v1

<!-- cwf-operator-ROUTE-GOV-1-apply-v1 · rev 1 · 2026-07-14 · Session 43.
     ONE visit, five parts: (A) pre-reads · (B) backend_tools migration via `supabase db push` ·
     (C) post-migration G-gates · (D) F73 surgical delete (one jsonb array element) ·
     (E) rule_audit diagnostic reads (GATE-VISIBLE-1 §7). Raw-output reporting only.
     Patterns cited from the family's latest: E3 (index-guarded jsonb surgery, STOP discipline),
     HARDEN-GRANTS (grant-layer reads). -->

```
FENCE — OPERATOR LANE.
• DB'ye erişimin TEK yolu Supabase MCP'dir. Başka hiçbir yol kullanma.
• .env, .env.local, .env.* dosyalarını AÇMA, OKUMA, GREP'LEME, ÖZETLEME.
• Servis anahtarıyla (SUPABASE_SECRET_KEY / service_role) elle istemci KURMA.
• Repoya veya diske dosya YAZMA (.agents/operator-inbox/ hariç).
• Bunlardan biri gerekli görünüyorsa DUR ve bildir — kendi başına çözme.
• Rapor = ham çıktı. Yorum yok, düzeltme yok, "yardımcı olmak için" ek adım yok.
```

**Project: `fjbrkimwvtpwoxhziidh`.** Every statement below runs against THIS project and no
other. If the connected project id differs in any way, STOP at part A and report it.

---

## A · PRE-READS (read-only)

**A-1.** Confirm the connected project ref. Must be `fjbrkimwvtpwoxhziidh`.

**A-2.** `select to_regclass('public.backend_tools');` → expected `NULL` (table absent —
the migration has not been applied yet). If NOT null, STOP and report.

**A-3.** Locate the F73 target. Search `mcp_settings` for the row containing a server
element with `id = 'mcp-1782457873092-0'` (search by jsonb containment across all rows).
Report, exactly and nothing more:
- the row's primary-key predicate (column + value) and the owner `user_id`
  (**must start `d388d5c2`** — if it does not, STOP);
- the exact **column name** holding the server array;
- the element's **array index**;
- the element's full content as a table — url **host only**, any `apiKey` value redacted to
  `present`/absent, `apiKeyEnv` name only:

| element `id` | `name` | `enabled` | `backend_id` | url host | `apiKey`? | `apiKeyEnv`? |
|---|---|---|---|---|---|---|

**A-4 · THE PREDICATE GATE (machine-checkable — every clause must hold):**
1. element `id` = `mcp-1782457873092-0` exactly;
2. `name` identifies it as the **armesMes** entry;
3. owner `user_id` starts `d388d5c2`;
4. the element is **credential-less**: NO `apiKey` value AND NO `apiKeyEnv` key.

If ALL four hold → part D is pre-authorized. If ANY fails → do parts B, C, E only; SKIP D
entirely and report which clause failed.

---

## B · MIGRATION (the one write door)

Apply the repo's pending migration via **`supabase db push`** — nothing else, no
`apply_migration` tool, no hand-run DDL. Exactly ONE migration is expected to apply:
`20260714120000_backend_tools.sql`. Paste the raw push output. If the CLI reports more than
one pending migration or any name other than this one, STOP before confirming the push.

---

## C · POST-MIGRATION G-GATES (read-only; report each ✅/❌ with the raw row)

**G-1 · table exists:** `select to_regclass('public.backend_tools');` → not null.
**G-2 · RLS on:** `select relrowsecurity from pg_class where oid = 'public.backend_tools'::regclass;` → `t`.
**G-3 · zero policies:** `select count(*) from pg_policies where schemaname='public' and tablename='backend_tools';` → `0`.
**G-4 · no client grants:**
```sql
select grantee, privilege_type from information_schema.role_table_grants
where table_schema='public' and table_name='backend_tools'
  and grantee in ('anon','authenticated','PUBLIC') order by 1,2;
```
→ **zero rows**. If any row appears, report it verbatim — do NOT fix.
**G-5 · shape:** `select column_name, data_type from information_schema.columns where table_schema='public' and table_name='backend_tools' order by ordinal_position;` — paste.

---

## D · F73 — THE SURGICAL DELETE (only if A-4 passed all four clauses)

**D-1 · Pre-image (rollback reference).** Paste the target row's full server array with the
§A-3 redaction rules applied. This is the before-picture; the write does not happen without it.

**D-2 · The single targeted removal.** Remove **exactly one element** — the index reported in
A-3 — from the personal row's array, with the statement's WHERE clause **guarding that the
element at that index still has `id = 'mcp-1782457873092-0'`** (index-addressed `#-` removal,
E3 pattern). Binding constraints:
- One row. One element removed. Nothing else changes.
- Do NOT rewrite, rebuild, re-serialize, or "clean up" the array — every other element must
  survive **byte-identical**.
- Do NOT touch any other row (global rows included).
- No DDL, no migration — this is a data UPDATE.
- If a surgical index-guarded removal is impossible against the real shape, **STOP and report**
  — never fall back to a whole-array rewrite.

**D-3 · Post-reads:**
- **G-a:** array length = pre-image length − 1. ✅/❌
- **G-b:** no element with `id='mcp-1782457873092-0'` exists anywhere in the row. ✅/❌
- **G-c:** every remaining element byte-identical to the pre-image. ✅/❌
- **G-d:** no other `mcp_settings` row changed (row count + a spot re-read of the global row). ✅/❌

**D-4 · Idempotence probe.** Run the same guarded removal again → expected: **0 rows
updated** (the guard no longer matches). Paste the raw result. ✅/❌

---

## E · DIAGNOSTIC READS (read-only; GATE-VISIBLE-1 §7 — settles whether prod reject
audits exist)

```sql
select action, count(*) from public.rule_audit group by 1 order by 2 desc;
```
```sql
select created_at, action, target_kind, reason, detail
from public.rule_audit where action = 'reject'
order by created_at desc limit 10;
```
Paste both outputs raw (detail jsonb as-is — it contains no secrets by construction).

---

## REPORT

Parts A–E in order, raw outputs only, each G-gate marked ✅/❌. No interpretation, no
summary, no extra steps. If anything anywhere deviated from this script: the deviation, the
raw evidence, and the word **STOPPED**.

<!-- END · cwf-operator-ROUTE-GOV-1-apply-v1 · rev 1 · 2026-07-14 -->
