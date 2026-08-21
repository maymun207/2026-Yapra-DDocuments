# CWF — Operator Prompt · E.1 Disable the Mislabeled Personal `supersetArmes` Entry · v1

<!-- cwf-operator-E1-disable-personal-superset-v1 · rev 1 · 2026-07-12 · Session 38.
     Lane: OPERATOR (Gemini + Supabase MCP). Master-plan-v2 Stream E, stage E.1.
     GATE: hand this to the Operator only AFTER the owner has marked the FIRST golden
     specimens (master-plan-v2 §2·E.1 gate). Basis: cwf-E0-superset-diagnosis-findings-v1
     (F-E0-1/F-E0-2: the personal supersetArmes row lacks backend_id, is misclassified as a
     flat/armes tool source, and wins tool-name collisions — reporting-mirror data can execute
     under system_of_record attribution). -->

## FENCE (binding)

- **ONE targeted write, nothing else.** You will set `enabled=false` on exactly ONE element of
  ONE jsonb array: the element with `"id":"mcp-1782478446699-0"` (name `supersetArmes`) inside
  `public.mcp_settings.servers` for `user_id = 'f4805bd1-370c-4fe8-9d38-b014fc836b4b'`.
- **You change NO other field** — not `backend_id`, not headers, not the URL, not the other
  array element (`armesMes`), not any row in `mcp_global_settings`. **DELETE is forbidden**
  (G5: disable now, reversible; deletion is a later owner decision).
- Never echo secret values (ADR-007): when pasting the element pre/post, replace any
  Authorization/apiKey values with `«redacted»` — presence booleans only.
- No repo contact. No migrations. This is the sanctioned array-aware `mcp_settings` UPDATE
  class (the ARMES-token-update precedent).

## G1 — PRE-READ (paste literal, redacted)

Select the target element and paste it (redacted): confirm `id = mcp-1782478446699-0`,
`name = supersetArmes`, `enabled = true`, `backend_id` absent/null, host
`armes-reports2.ardich.com`. Also paste the sibling `armesMes` element's `id` + `enabled`
(it must remain untouched and `true` afterwards). If the target element does not match this
fingerprint exactly, STOP and report — do not improvise.

## G2 — THE UPDATE (array-aware, single statement)

Use a jsonb array rewrite that flips ONLY the matching element's `enabled`, e.g.:

```sql
UPDATE public.mcp_settings
SET servers = (
  SELECT jsonb_agg(
    CASE WHEN elem->>'id' = 'mcp-1782478446699-0'
         THEN jsonb_set(elem, '{enabled}', 'false'::jsonb)
         ELSE elem END)
  FROM jsonb_array_elements(servers) AS elem
),
updated_at = now()
WHERE user_id = 'f4805bd1-370c-4fe8-9d38-b014fc836b4b';
```

Adapt column/shape only if your G1 read shows a different structure — and say so explicitly.

## G3 — POST-READ PROOF (paste literal, redacted)

Re-select both elements: target now `enabled=false` (all other fields byte-identical to G1);
`armesMes` byte-identical to G1. Paste both.

## G4 — IDEMPOTENCE PROBE (S31-1)

Run the exact same UPDATE a second time. Then re-run the G3 read and confirm the result is
byte-identical to the first G3 (the statement is a no-op on second application). Paste.

## G5 — REPORT

G1/G2/G3/G4 evidence + one line: **"E.1 applied: personal supersetArmes disabled; armesMes
untouched."** The Architect then verifies live from Vercel logs (expected signature on the
next chat turns: `[ToolRoute]` total offered 290→286 with `gateway=4` persisting, and
`search_tools` executions binding to the global connection only). Rollback, if ever needed,
is the same statement with `'true'::jsonb`.

<!-- END · cwf-operator-E1-disable-personal-superset-v1 · rev 1 · 2026-07-12 -->
