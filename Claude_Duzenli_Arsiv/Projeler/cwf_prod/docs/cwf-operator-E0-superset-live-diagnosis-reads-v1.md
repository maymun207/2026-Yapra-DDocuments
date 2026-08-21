# CWF — Operator Prompt · E.0 Superset Live Diagnosis (READS ONLY) · v1

<!-- cwf-operator-E0-superset-live-diagnosis-reads-v1 · rev 1 · 2026-07-12 · Session 38.
     Lane: OPERATOR (Gemini + Supabase MCP). Master-plan step W0.d, DB half.
     The Vercel-log half is already done by the Architect. -->

## FENCE (read FIRST, binding)

- **READ-ONLY. ZERO writes.** No `INSERT`/`UPDATE`/`DELETE`/`ALTER`/migration/`db push`. If any
  step seems to require a write, STOP and report instead.
- **Never echo secret values** (ADR-007). When selecting from `mcp_settings`, you MUST exclude
  token/api-key/header-value columns. Report *presence/absence* of a secret, never its value.
- Evidence discipline: paste the literal query you ran + the literal result (redacted per above)
  for every read. No paraphrased results.

## Context (why)

Owner-observed F36: Superset MCP is connected but never serves answers. The Architect has
already read production Vercel logs and confirmed: Superset gateway tools ARE offered
(`gateway=4` in `[ToolRoute]`), `search_tools` IS being invoked, and — code-verified — a
`gateway` partition is only possible when the server row carries `backend_id:'superset'`.
**So the register-v39 assumption "backfill `backend_id` needed" is already disproven live.**
What remains unknown is the GOVERNED-DB side. These reads answer it.

## R1 — the Superset `mcp_settings` row (redacted)

Read the table schema first (`information_schema.columns` for `mcp_settings`) so you know the
real column names, then select the Superset entry (the row whose name/key contains `superset`,
under `ksadmin@ardictech.com`'s user) returning ONLY: row id · name/key · enabled/active flag ·
`backend_id` · the URL's host part (strip path/query) · created/updated timestamps ·
**presence booleans** for any token/header/apiKey columns (`IS NOT NULL AS has_token` style).
Also return the same redacted shape for the ARMES entry for comparison (its `backend_id` is
expected ABSENT by design — do not "fix" it).

## R2 — the `backends` table

`SELECT * FROM backends;` (backend identity is DATA — we expect rows for at least `armes` and
`superset`). Paste all rows (this table holds no secrets).

## R3 — Superset rule kinds in the governed DB

Read the schema of `rule_kinds`, then select all rows whose backend column = `'superset'`
(or, if scoping is via a different column, adapt and say so). Report: kind names · count ·
any status/enabled columns.

## R4 — Superset governed rules and their publish status

Join `domain_rules` (and, if relevant, `rule_versions`) to those kinds. Report per kind:
number of rules · how many are in PUBLISHED status · latest version timestamps. This decides
whether `scripts/seedRules.ts` still needs to run (docs conflict: a 2026-07-04 note says seeded
✓; register v39 says not — the DB is the ground truth).

## R5 — bonus, cheap: routing-cache poisoning sample (SR-1 evidence)

From the tool-category cache table (find it by name — `tool_category_cache` or similar):
total row count · the 20 most recently updated rows (keyword + categories + timestamps).
The Architect observed live learning of stopwords ("can", "you", "the", "gosterirmisin?") —
this read quantifies it. Read-only; do NOT clear or edit anything.

## Report format

One section per read (R1–R5): the literal SQL · the literal (redacted) result · one line of
your own observation. End with a single verdict line: **"Superset governed rules: SEEDED /
NOT SEEDED / PARTIAL"** — that verdict is the input to the Stream-E activation design.

<!-- END · cwf-operator-E0-superset-live-diagnosis-reads-v1 · rev 1 · 2026-07-12 -->
