# OPERATOR · DB introspection — see the real state (value-safe)

<!-- cwf-operator-db-introspection-v1 · rev 1 · 2026-07-18 · Architect-authored, owner-endorsed.
     Relay to Gemini (Operator lane) verbatim. READ-ONLY. Never prints a secret VALUE. -->

```
READ-ONLY DIAGNOSTIC. You will run a fixed set of labelled SELECTs and paste
each result verbatim. Follow these DISCIPLINE RULES exactly — they are the point
of this task:

  RULE A — NEVER `SELECT *`. Always name the exact columns.
  RULE B — NEVER output a secret VALUE. No token, no Bearer string, no apiKey
           value, no Authorization header value may appear in your output. Where
           a credential must be DETECTED, compute a BOOLEAN in SQL (the value is
           processed inside the query but never returned) and output only the
           boolean/count.
  RULE C — READ-ONLY. No INSERT/UPDATE/DELETE/ALTER, no `supabase db push`, no
           migration apply. If any query would write, STOP and report.
  RULE D — Paste each query's output VERBATIM under its label. If a query errors,
           paste the error and continue to the next.

── STEP 0 · project confirm ─────────────────────────────────────────
Confirm the connected Supabase project_ref. It MUST be exactly
fjbrkimwvtpwoxhziidh. If it is anything else (e.g. rsiyilsgclghplpoadlf, the
separate Virtual Factory POC DB), STOP and report — run nothing.

── Q1 · mcp-related table inventory (discover, don't assume) ─────────
SELECT table_name
FROM information_schema.tables
WHERE table_schema='public' AND table_name ILIKE '%mcp%'
ORDER BY table_name;

── Q2 · surface migration — definitive re-confirm ───────────────────
2a. Column:
    SELECT column_name, data_type, column_default, is_nullable
    FROM information_schema.columns
    WHERE table_schema='public' AND table_name='rule_kinds' AND column_name='surface';
2b. CHECK:
    SELECT conname, pg_get_constraintdef(oid)
    FROM pg_constraint
    WHERE conrelid='public.rule_kinds'::regclass AND contype='c'
      AND pg_get_constraintdef(oid) ILIKE '%surface%';
2c. Backfill distribution + the agent.param row:
    SELECT surface, count(*) FROM public.rule_kinds GROUP BY surface ORDER BY surface;
    SELECT kind_id, surface FROM public.rule_kinds WHERE kind_id='agent.param';

── Q3 · mcp_settings credential architecture (VALUE-SAFE) ────────────
For EVERY server in EVERY mcp_settings row, classify how it carries its
credential — as BOOLEANS only, never the value. (If Q1 shows the servers live
in a differently-named table/column, adapt the table/JSON path but keep the
value-safe boolean shape.)

    SELECT
      s.user_id,
      srv->>'name'                                   AS server_name,
      srv->>'transport'                              AS transport,
      (srv->>'enabled')::boolean                     AS enabled,
      srv->>'backend_id'                             AS backend_id,
      -- RAW credential present? (booleans — value never returned)
      (srv ? 'apiKey')                               AS has_raw_apikey,
      (srv->'headers' ? 'Authorization')             AS has_raw_auth_header,
      ((srv->'args')::text ILIKE '%Bearer%'
        OR (srv->'args')::text ILIKE '%Authorization%') AS has_raw_auth_in_args,
      -- REFERENCE credential present? (the GOOD pattern)
      (srv ? 'apiKeyRef')                            AS has_apikeyref,
      (srv ? 'apiKeyEnv')                            AS has_apikeyenv
    FROM public.mcp_settings s,
         jsonb_array_elements(s.servers) AS srv
    ORDER BY s.user_id, server_name;

── Q4 · reference secret store — names only, NO values ──────────────
(Use the store table Q1 revealed — likely `mcp_secrets`. Names + timestamps
only; there must be NO value column in your select.)
    SELECT name, updated_at
    FROM public.mcp_secrets
    ORDER BY name;
(If the table is named differently or has different columns, adapt but NEVER
select a value column.)

── Q5 · leak-surface summary (one honest number) ────────────────────
    SELECT
      count(*) FILTER (WHERE (srv ? 'apiKey')
                          OR (srv->'headers' ? 'Authorization')
                          OR (srv->'args')::text ILIKE '%Bearer%')          AS servers_with_raw_credential,
      count(*) FILTER (WHERE (srv ? 'apiKeyRef') OR (srv ? 'apiKeyEnv'))    AS servers_with_reference,
      count(*)                                                              AS servers_total
    FROM public.mcp_settings s, jsonb_array_elements(s.servers) AS srv;

END. Paste Q1–Q5 outputs verbatim. Read-only, value-safe. Take no other action.
```

<!-- END · cwf-operator-db-introspection-v1 · rev 1 · 2026-07-18 -->
