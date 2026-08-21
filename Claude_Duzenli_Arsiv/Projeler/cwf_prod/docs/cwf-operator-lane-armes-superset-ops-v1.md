# OPERATOR OPS — ARMES 401 Diagnosis + Superset backend_id Backfill
**cwf-operator-lane-armes-superset-ops-v1 · rev 1 · 2026-07-04**
**Lane:** Operator (Gemini + Supabase MCP). Runs in PARALLEL with AG's F-obs3 — zero repo contact.

## FENCE (hard limits)
- Supabase MCP only. NO repo reads/writes. NO edits to governed tables (`rule_kinds`, `domain_rules`, `rule_versions`, `rule_audit`) — diagnostic SELECTs on them are allowed, writes are NOT.
- `mcp_settings` is user config (ADR-002 scope), not governed knowledge — reads and the ONE sanctioned UPDATE below are allowed.
- NEVER output a token/secret VALUE. When inspecting a token report only: length, first 4 chars, and whether it changed. If a full value ever appears in your output, that is a security incident.

## TASK 1 — Diagnose the production ARMES 401
Context: production `[MCP Discover] armesMes: SSE error: Non-200 status code (401)` on every turn since at least 2026-07-03. ARMES contributes 0 tools; chat runs Superset-gateway-only.

1. Read the config (no token value):
```sql
select id, user_id, updated_at,
       jsonb_object_keys(servers) as server_key
from mcp_settings
where user_id = (select id from auth.users where email = 'ksadmin@ardictech.com');
```
Then for the `armesMes` entry: report its URL, transport, `backend_id` field presence, `updated_at`, and token length + first-4 only.
2. Liveness probe (value stays inside your session): call the ARMES SSE endpoint with the stored auth header; report ONLY the HTTP status.
   - **401 with stored token** → token expired/revoked server-side → hand to Maymun: obtain a fresh token from the ARMES/ARDIC side; the update path is the app's MCP settings UI (owner-scoped, ADR-002) — or, if the UI path is unavailable, a single `mcp_settings` UPDATE here (value typed by Maymun into your session, never echoed).
   - **200/stream with stored token** → the token is FINE and the failure is elsewhere (URL/transport drift, server-side allowlist) → report the working status + URL so the architect re-diagnoses. Do NOT improvise fixes.
3. After any fix: re-probe → expect 200/stream. Report before/after statuses.

## TASK 2 — Superset backend_id backfill (one sanctioned write)
The `supersetArmes` entry predates the backends registry and lacks `backend_id`. Apply exactly:
```sql
update mcp_settings
set servers = jsonb_set(servers, '{supersetArmes,backend_id}', '"superset"', true)
where user_id = (select id from auth.users where email = 'ksadmin@ardictech.com')
  and servers ? 'supersetArmes'
  and (servers->'supersetArmes'->>'backend_id') is distinct from 'superset';
```
Report rows affected (expect 1; 0 means already set — verify and say which). Then verify:
```sql
select servers->'supersetArmes'->>'backend_id' as backend_id from mcp_settings
where user_id = (select id from auth.users where email = 'ksadmin@ardictech.com');
```
NOTE: if the actual JSON shape differs (key name, nesting), STOP and report the real shape — do not adapt the UPDATE yourself.

## TASK 3 — Post-seed verification read (AFTER Maymun runs the seed, Task is read-only)
Maymun runs `npx tsx scripts/seedRules.ts` from the repo root with `.env.local` loaded (his one command — the script goes through the server-side gate; if it errors, paste its output to the architect, do not retry blindly).
Then verify from here:
```sql
select rk.backend_id, rk.kind, count(dr.id) filter (where dr.status='published') as published
from rule_kinds rk left join domain_rules dr on dr.kind_id = rk.id
where rk.backend_id = 'superset'
group by 1,2 order by 2;
```
Expect: Superset kinds present with published CORE rules > 0. Report the table.

## REPORT FORMAT
Per task: what ran, statuses/row-counts, before→after, anomalies. No secret material anywhere.
