# OPERATOR-READ-OEE-DRAFT-EVIDENCE-v1
<!-- OPERATOR-READ-OEE-DRAFT-EVIDENCE-v1 · 2026-08-01 · S75 · Architect: Claude.
     Purpose: READ-ONLY evidence pull so the Architect can propose merge-or-discard
     for draft 69202e21 (OEE promotion draft) and a disposition for fe8709c6
     (OEE rollback/restoration draft), both on (armes.glossary_term, key=OEE).
     Owner decides; this read only assembles the diff evidence. -->

## FENCE — READ FIRST, BINDING
- Supabase project: **`fjbrkimwvtpwoxhziidh`**. Operate on this project ONLY.
- **READ-ONLY.** No INSERT/UPDATE/DELETE, no migrations, no `apply_migration`,
  no `db push`, no DDL of any kind. This prompt contains zero write intent.
- No repo contact. No secrets echoed (ADR-007). The `payload` jsonb of
  glossary rules is governed content, not a secret — echoing it verbatim is
  REQUIRED here.
- If any query errors, paste the literal error text; do not retry with
  modified table/column names — the schema below is migration-verified.

## PRECONDITION (S47-1)
Expected live state: `domain_rules` holds exactly ONE `status='published'` row
for (`kind_id='armes.glossary_term'`, `key='OEE'`) at version 2, plus ≥2
`status='draft'` rows on the same (kind_id, key) whose `rule_id` values begin
`69202e21` and `fe8709c6`. If any part of this does not hold, STOP after Q1
and report what you found — do not improvise further queries.

## QUERIES — run in order, paste each result verbatim under its label

**Q1 — the full OEE lineage row set (published + all drafts):**
```sql
select rule_id, status, version, updated_at, created_by, updated_by,
       payload
from public.domain_rules
where kind_id = 'armes.glossary_term' and key = 'OEE'
order by updated_at asc;
```

**Q2 — version history for every rule_id returned by Q1:**
```sql
select version_id, rule_id, version_no, status, created_at, parent_version,
       payload
from public.rule_versions
where kind_id = 'armes.glossary_term'
  and rule_id in (select rule_id from public.domain_rules
                  where kind_id = 'armes.glossary_term' and key = 'OEE')
order by rule_id, version_no asc;
```

**Q3 — audit provenance touching these rules (promotion + rollback trails):**
```sql
select *
from public.rule_audit
where detail::text like '%69202e21%'
   or detail::text like '%fe8709c6%'
order by 1;
```
(If `rule_audit` uses a different timestamp/order column, order by its
timestamp column; if the `detail` column has another name, paste the error
and then paste the output of
`select column_name from information_schema.columns where table_name='rule_audit';`
— that single fallback read is authorized.)

## OUTPUT FORMAT
One block, labeled `=== Q1 ===`, `=== Q2 ===`, `=== Q3 ===`, each followed by
the verbatim result. Close with one line: `ROWS: Q1=<n> Q2=<n> Q3=<n>`.
No summary, no interpretation — the Architect diffs the payloads.

<!-- END · OPERATOR-READ-OEE-DRAFT-EVIDENCE-v1 -->
