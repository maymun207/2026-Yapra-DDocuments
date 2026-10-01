[scout-1]
ADVERSARY-VERDICT: RED card=CARD-168-BACKEND-LITERAL-TEXT-S170-1-v1
GRAFT: none run (graft indexes the stale local clone). Every line was read at master 648c61d6384942ab532444be252422ed9e37c02b with `git grep`/`git show`. Live schema via scripts/roQuery.ts (read-only). Lead: Claude_Duzenli_Arsiv/S165/MODEL-TEXT-INVENTORY-MEASURE-S165-1-AG4-full.md row #22 and F3.
PROMPTS: none.

SCOUT-STATUS-PREREVIEW-168-BACKEND-LITERAL-TEXT-S170-1 · reply to ORDER-SCOUT-PREREVIEW-168-BACKEND-LITERAL-TEXT-S170-1 (id 69c4533d-5705-455a-bdc8-69031515e75e)
PRECONDITION: ls-remote master = 648c61d6384942ab532444be252422ed9e37c02b (unchanged).

## 1 · The card's site
- HOLDS: toolResult.ts:314 DEAD_SUPERSET_URL, :317-321 neutralizeDeadSupersetUrls (reads env SUPERSET_PUBLIC_BASE_URL; when unset writes '[Superset baglantisi yapilandirilmadi]'), called first in formatToolResult at :429.
- PRECISION: the regex `http://0.0.0.0(:port)?(path)` is ALREADY backend-agnostic and fires on EVERY backend's result. Only three things name the backend: the function name, the env var name, and the fallback text. The fix is to bind the substitute base to the PRODUCING server, not to make the pattern data.
- PRODUCER IS AT HAND: formatToolResult is called inside the MCP execute closure (stageTools.ts:2165-2168), where `server` (its backend_id and name) is captured (:1381, :1434-1437). Today's signature `formatToolResult(raw, toolName, store, opts)` carries no backend; it needs one optional field in `opts`.
- EXISTING HOME (12.6), measured on the live schema: public.backends columns are id, display_name, tool_pattern, enabled, created_at, trust_tier, scope_identity, factory_param_name, lifecycle. There is NO url column, so the backend row would need a migration. MCP server configs live in jsonb: mcp_settings.servers (per user) and mcp_global_settings.servers. A per-SERVER `publicBaseUrl` there is additive, needs NO migration, and is the right grain: the dead 0.0.0.0 base is a deployment property of the server/gateway, not of the tenant's backend identity.
- PINS: api/cwf/_lib/__tests__/toolResult.test.ts:201, :270-292 set/delete process.env.SUPERSET_PUBLIC_BASE_URL and assert `.url === '[Superset baglantisi yapilandirilmadi]'` (:280) and the rewrite (:289). Those assertions change by design. They are the S165 inventory's EXACT pin for row #22.
- PRODUCTION RISK: if SUPERSET_PUBLIC_BASE_URL is SET in the production environment today, moving the source to the server config turns working links into the neutral text until someone fills the new field, and the owner is away until ~17:00. Its presence is UNMEASURED from this window (an env value is never read here).

## 2 · Other backend-naming model-visible text (T2), re-measured
Lens: quoted string literals containing a registry id or display name, over api/cwf/_lib with tests excluded.
- Shared turn path (fires for every backend): ONLY toolResult.ts:320. This agrees with the S165 inventory (row #22 and F3: "must not be governed as-is").
- Backend-OWN content in code (model-visible only when that backend is active; it is item 82 / data-move work, not a ≤3-site edit):
  - knowledge/backends/superset/{blindSpots.ts:12-13, gatewayProtocol.ts:47, :145-146, :153-154, :164, :241, routingHints.ts:25, :29, semantics.ts:12, render.ts:69}
  - prompt/assemble.ts:70 (`case 'machine-knowledge-base'`, a branch on an id) and prompt/backends/machine-knowledge-base/pack.ts:21 (`const BACKEND_ID = 'machine-knowledge-base'`)
  - toolCategories.ts:527 (a floor map keyed by an id) and :517 (keyword 'superset')
  - Not text, but a name: turn/redirectDecision.ts:6 / gatewayPreflight's armesGatewayMisrouteMessage. Its text is called backend-naming in its own header; it was not re-read here.
These are the NEXT card's fence. None belongs in this one.

## AMENDMENTS (paste VERBATIM):
A1. T1 HOME: the substitute base is a per-SERVER field `publicBaseUrl` in the existing MCP server config jsonb (mcp_settings.servers and mcp_global_settings.servers; the same server object the turn captures as `server` in stageTools.ts:1381). public.backends is NOT used (it has no url column; that would be a migration). No migration.
A2. T1 CODE: rename neutralizeDeadSupersetUrls to a backend-free name (e.g. neutralizeDeadBaseUrls) and DEAD_SUPERSET_URL likewise. formatToolResult gains `opts.publicBaseUrl?: string` and stageTools.ts:2165-2168 passes `server.publicBaseUrl`. The 0.0.0.0 pattern stays a code constant: it is not backend data, it is "unroutable address". Unset → the neutral text, with no backend name and no env read. process.env.SUPERSET_PUBLIC_BASE_URL is no longer read anywhere.
A3. NEUTRAL TEXT: one backend-free code constant (e.g. '[bağlantı yapılandırılmadı]') is acceptable. If the card insists on a governed text, it names the existing home (system prompt.segment or an existing DET text row) and the reader, with a code floor equal to the constant. No new kind is created for one string.
A4. CUTOVER (the owner is away): before the PR, the Operator measures PRESENCE ONLY of SUPERSET_PUBLIC_BASE_URL in production (set or unset, never the value). If SET, the v2 card does not merge until that value is entered as the gateway server's publicBaseUrl in the MCP settings, and the report states that links degrade to the neutral text until it is. If UNSET, behaviour equals master (neutral text) and the report says so.
A5. TESTS: rewrite toolResult.test.ts:270-292 to pass `publicBaseUrl` through opts, not env: (a) a dead base with publicBaseUrl → rewritten, path kept; (b) a dead base without it → the neutral text, and the output contains no registry id or display name; (c) no 0.0.0.0 → untouched; (d) a stageTools-level test: the server's own publicBaseUrl is used, never another server's.
A6. T3 UI (13.3): the MCP settings server editor (src/components/admin/ … mcpSettingsTab) shows and edits `publicBaseUrl` per server, validated as an http(s) URL. The report names the screen. The backends admin row is unchanged.
A7. T2: this card moves ONLY toolResult.ts:314-321/:429. The report lists the next card's fence verbatim from §2 above (superset knowledge pack, MKB pack + assemble.ts:70, toolCategories.ts:517/:527, and the misroute message). K-G: run checkBackendNames, rewrite data/gates/backend-names-baseline.json with --write-baseline in the SAME PR, and print the before/after per (id, class).
END-AMENDMENTS
