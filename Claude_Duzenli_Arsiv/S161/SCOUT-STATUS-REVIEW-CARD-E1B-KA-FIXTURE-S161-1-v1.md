<!-- relay-audit: v1 kind=status -->
SCOUT-STATUS-REVIEW-CARD-E1B-KA-FIXTURE-S161-1-v1

FROM: scout (scout-1 window) · MEASURED-AT: 2026-09-28T00:48:30Z (date -u)
ORDER: ORDER-SCOUT-REVIEW-CARD-E1B-KA-FIXTURE-S161-1-v1 · bus id 1c8c1313-16bb-4f50-a638-3f2663f1a6ae · created_at 2026-09-28 00:33:58.417528+00 · body_md5 66f9342545d5ae3e4aec4f3a8c0bffb7 (DIGEST-OK, `node scripts/mail-wait.mjs scout --read <name>`; READ only, consumed_at NOT written; the cardPreflight step was UNMEASURED: tsx IPC listen EPERM in the sandbox)
SUBJECT: CARD-E1B-KA-FIXTURE-BACKEND-S161-1-v1 · md5 14ce6181beedb7daeb8385a8d6ba08ff (MEASURED: `md5 <path>`, matches the boot text)
PRECONDITION: master = c58438b59cff4d1d403634b28e44af9b01db6dea: MEASURED (`gh api repos/maymun207/cwf_yaprak/branches/master --jq .commit.sha`, unsandboxed gh read; `git rev-parse FETCH_HEAD` after `git fetch origin master` agrees). HOLDS.
READ PATH: every source quote below is `git show` / `git grep` AT c58438b, not the working tree (the main clone's tree sits at 2a6f6781).
GRAFT: graft_file_api scripts/mail-wait.mjs · graft_find_code "propose new tool_category…" · graft_find_all laneSlip.
WRITES: none to the repo, the DB or the bus. This file is the only write, in the doc repo, as the order names.

## VERDICT: RED

The fixture server, the registration path, the sync and the mirror are all buildable as the card describes. But at c58438b the chain the card orders cannot reach its own FALSIFIER (ii)/(iii): **for an unseen backend the pipeline stops at category birth.** Also: the metric the card names (Recall@1) does not exist on the routing core it names, the routing entry it names writes, and the file placement it orders makes the exam PR-blocking, which it forbids. The complete delta is at the end.

## 1 · Transport, and the official SDK server: MEASURED, GREEN

- `git grep … api/cwf/_lib/turn/mcpClient.ts`: connectMcp speaks the two HTTP-family client transports and nothing else:
  `:7 import { SSEClientTransport } from '@modelcontextprotocol/sdk/client/sse.js';`
  `:8 import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';`
  `:116 const order = transportOrder(transport);` · `:123 new SSEClientTransport(url, …)` · `:135 new StreamableHTTPClientTransport(url, { requestInit: { headers }, fetch: recordingFetch })`
  `api/cwf/_lib/backends/mcpTransport.ts:41-42 transportOrder(transport) { return transport === 'sse' ? ['sse', 'http'] : ['http', 'sse']; }`: StreamableHTTP first unless the row says `sse`. stdio appears only in the CALL path (`mcpClient.ts:280 if (server.transport === 'stdio' && server.command)`), not in connectMcp.
- The registration validator admits `'sse' | 'streamable-http' | 'stdio'` (`api/admin/mcp-settings.ts:25 VALID_TRANSPORTS`).
- SDK: `package.json:58 "@modelcontextprotocol/sdk": "1.29.0"` at c58438b; installed `node_modules/@modelcontextprotocol/sdk/package.json:3 "version": "1.29.0"`. Server entries present (`ls node_modules/@modelcontextprotocol/sdk/dist/esm/server`): `mcp.js` (McpServer), `streamableHttp.js` (StreamableHTTPServerTransport), `sse.js`, `webStandardStreamableHttp.js`, `stdio.js`; plus `dist/esm/inMemory.js`.
  Import paths: `@modelcontextprotocol/sdk/server/mcp.js`, `@modelcontextprotocol/sdk/server/streamableHttp.js`.
- In-process on localhost: YES. `fetchMcpToolList` takes a URL (`mcpCatalogFetch.ts:29 connectMcp(new URL(target.url), …)`), so an InMemory transport cannot reach it. An `http.createServer` + StreamableHTTPServerTransport on port 0 can. There is precedent in the suite: `api/cwf/__tests__/envProxy.test.ts:154 server!.listen(0, '127.0.0.1', …)`.
- OPERATIONAL NOTE (not a card defect): in THIS window's sandbox, local listen is refused (`listen EPERM … tsx-501/*.pipe`, measured twice). A lane window running the exam locally may meet the same refusal. That is the sandbox's `allowLocalBinding`, and it says nothing about the harness.

## 2 · Where an MCP server is registered: MEASURED, GREEN with a precision delta

- Table: the registry is NOT a relational table of servers. It is ONE JSON array, `servers`, in `mcp_global_settings` (`shared/dbConstants.ts:69 MCP_GLOBAL_SETTINGS: 'mcp_global_settings'`), with personal overrides in `mcp_settings` (`:21`). Repository: `McpGlobalSettingsRepository` (`.from(DB_TABLES.MCP_GLOBAL_SETTINGS, …)` at `:35`, `:58`). `backends` is NOT written by registration. The server row's `backend_id` field is what binds it: `catalogSync.ts` `backendOf(server)`, and a missing one throws `UnassignedBackendError`.
- Handler: `api/admin/mcp-settings.ts` default export. PUT → `isValidServerEntry` → `detectGlobalSecretViolation` → `repo.get()` (previous) → `repo.upsert` → for each enabled server whose connection changed: `waitUntil(syncBackendCatalog(server, undefined, { runBehaviorCensus: true }).then(…).then(recordSyncHealth))` (`:191`).
- UI: `src/components/admin/MCPSettingsTab.tsx` already carries `backend_id` (`:793 patch.backend_id = …`, `:862 …{ backend_id: formBackendId.trim() }`), auth BY REFERENCE (`apiKeyRef` / `apiKeyEnv`, `:780-781`, `:852`) and transport. An auth-less localhost fixture needs no new field → ORDER 5 expected "UI/UX: verified, no change" (UNMEASURED at runtime: the UI was not run).
- In-process against a repository double: POSSIBLE, but ONLY by module mocking. There is no DI seam: `:51 const repo = new McpGlobalSettingsRepository();` and `:191 syncBackendCatalog(server, undefined, …)` (so the mirror repo defaults to `new BackendToolsRepository()`). The test must `vi.mock`: `../cwf/_lib/adminGuard.js` (authed / ensurePermission), `../cwf/_lib/persistence/index.js` (McpGlobalSettingsRepository AND BackendToolsRepository). `repo.get()` must RETURN a readable previous list, because a throw fails closed and syncs nothing (`:108-112`, `if (previous === null) continue;`). It must also mock `@vercel/functions` `waitUntil` (capture and await the promise; otherwise the sync is fire-and-forget and the assertion races it), `recordSyncHealth`, and the census deps (`runBehaviorCensus: true` makes real `tools/call`s. Against the echo that is harmless, but the census writes).

## 3 · What syncBackendCatalog → autoDeriveRouteDrafts needs: MEASURED, RED (blocking)

Doubles the vitest must provide (`git show c58438b:api/cwf/_lib/backends/catalogSync.ts`):
- `resolveTarget` (`api/admin/mcp-probe.ts:104`, calls `resolveAuthHeader`; with no apiKey it resolves locally)
- `repo.upsertCatalog` (the parameter; the handler path passes `undefined` → module mock)
- `resolveBackendPatterns` (DB registry) · `recordPatternDivergence` · `syncEntityDiscovery` (DB `backend_entity_layers`)
- `autoDeriveRouteDrafts` is MODULE-PRIVATE and returns `void` (`:277 async function autoDeriveRouteDrafts(backendId: string): Promise<void>`). Its only observable effect is the governed store's `createDraft` / `updateDraft` calls. It needs `resolveSystemActor()` (`systemActor.ts:49 process.env[SEED_ACTOR_ENV]` + `:61 client.auth.admin.listUsers`). When that is unresolved it logs SKIPPED and returns, which is latent. It calls `runRouteDerivation(backendId, actor)` with NO deps, so `new RuleGovernanceService()` and `new BackendToolsRepository()` must both be module-mocked. `runRouteDerivation` itself IS exported with a DI seam (`RouteDerivationDeps { svc, toolsRepo, entryFloor }`).

The blocking fact, which no double can honestly supply:
- `deriveRouteDrafts.ts` header: *"it never invents a category. A read tool whose keywords match nothing lands in `unmapped`; new-category creation stays withheld (CENSUS's job)."* In code, categories come only from `publishedCategories` (`const categoryKeywords = publishedCategories.map(…)`). With zero published categories, `proposeCategory` returns null for every tool, so every tool ends up in `unmapped` or `writeWithheld`, `additionsByCategory` is empty, and `categoryDraftsStaged = 0`.
- `runRouteDerivation.ts`: a category draft is only an AMENDMENT of an existing published row (`publishedCategories.find((r) => r.key === catName)` → else a failure: "proposed category has no published row with that key").
- The kinds a draft is written against are minted only over `BACKEND_IDS` (`kinds.ts: const NON_SYSTEM_BACKEND_IDS = BACKEND_IDS.filter(…)` → `buildToolCategoryKindDefs` / `buildToolAnnotationKindDefs`). `BACKEND_IDS = BACKEND_INDEX.ids` (`shared/dbConstants.ts:1499`), which is `data/backends/index.json` `"ids": ["armes","superset","system","machine-knowledge-base","honestbench","mount-probe"]`. A fixture backend id has no `<id>.tool_category` or `<id>.tool_annotation` kind, so a real `createDraft` refuses it as an unknown kind. The file's own comment records exactly this, as production evidence: `failed=4` on every tick.
- Consequence: FALSIFIER (ii) "autoDeriveRouteDrafts produces ≥1 category draft naming only fixture tools" has no producer at c58438b. (iii) "with the fixture's derived categories published in the test double" has nothing to publish. The only ways to make them pass are to hand-author category keywords for the fixture, which is fitting the exam to the vocabulary and exactly what the PREMISE forbids, or to add the fixture id to `data/backends/index.json`, which is a live-registry edit (see item 7). **This is the exam's first honest result, not an implementation obstacle: the "new backend = zero code" promise is broken at CATEGORY BIRTH.**

## 4 · Does a fixture MCP server / in-process double already exist? MEASURED, GREEN (not wiring)

- `git grep -n -E "McpServer|sdk/server|tools/list|ListToolsRequestSchema" c58438b -- api scripts e2e shared src`: the only SDK server is `scripts/groundMcpServer.ts:30 import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'` + `:31 StdioServerTransport`. It is the Architect's read-only archive server (three fixed tools `ground_search` / `ground_get` / `ground_corpora`, env-driven manifest, stdio). It is not a tools/list-from-JSON fixture, and connectMcp cannot reach stdio. Every other hit is `mergeMcpServers` / `McpServerConfig` / `loadUserMcpServers` (naming collisions, not servers).
- `git grep -l -E "StreamableHTTPServerTransport|SSEServerTransport|InMemoryTransport|createServer\(|\.listen\("`: only `api/cwf/__tests__/envProxy.test.ts`, a plain `http.createServer` proxy test (no `modelcontextprotocol` import).
- SELF-INVALIDATION does NOT fire, so this is a build card. Delta: the card's own literal grep (`McpServer`) DOES print a hit (groundMcpServer.ts), so a lane reading it mechanically would stop on a false wiring verdict. Name the exclusion.

## 5 · Existing routing-exam entry to reuse: MEASURED, RED (the named entry writes)

- ORDER 3 says "filterToolsByMessage / routeKeywordLayer through the same entry stage 07 uses". Stage 07's entry is `filterToolsByMessage` (`stageTools.ts:676`), and it WRITES: `toolCategories.ts:1801 … recordRouteProposals(routeProposalsFull, …)` (the governed proposals ledger) and `:1878 learnToolMapping(word, routerCats, …)` (the learned map). `routerAbLens.ts:7-9` states the rule verbatim: *"NEVER calls `filterToolsByMessage` (the only site that emits into the governed proposals ledger)"*.
- The existing pure, no-emit, no-I/O entry to reuse is `computeRouterAbArmA(userMessage, learned, categories, calledToolNames, entryFloor)` (`routerAbLens.ts:255`, over `routeKeywordLayer` at `toolCategories.ts:1248`) + `scoreRouterAbCoverage(offered, called)` (`:81`) + `toolCandidatesForCategories` (`:62`). `selectRouterAbSpecimens` (`:237`) selects RECORDED production turns and is NOT applicable to fixture questions. `routingSlice.resolveRoutingLearnedMap` reads the live learned map and must be an empty Map in the exam.
- Recall@1 is UNDEFINED on this core: `toolCategories.ts:1254 offeredToolNames: [...relevant].sort()`. The result is an alphabetically sorted SET with no rank, so "rank 1" would be the alphabetically first tool. The honest metrics on this core are membership recall (intended ∈ offered) and offered-set size (breadth), or a ranking source the card has to name.

## 6 · Nightly Compatibility: MEASURED, GREEN on secrets, RED on placement

- `git show c58438b:.github/workflows/nightly-compat.yml`: the file carries NO `env:` and NO `secrets.` line at all (jobs `compat` [22.x, 24.x] and `coverage`; steps: checkout, setup-node, `npm ci`, `npm run build`, `npm run test` / `npm run test:coverage`). A secret-free vitest step can run there.
- But `vitest.config.ts:11 include: [… 'api/**/__tests__/**/*.test.ts']`, and `build-test.yml:421-423 name: Run tests / run: npm run test` (`package.json:35 "test": "vitest run"`). So `api/cwf/__tests__/kaExam.test.ts` as ORDER 3 names it would run in the PR build job (PR-blocking) AND already inside nightly's `npm run test`. That contradicts ORDER 4 / DECISION RIGHTS ("nightly, not PR-blocking").

## 7 · Anything touching the LIVE routing path (S102-YASA-3): MEASURED, GREEN as scoped, with two named hazards

- The card's SHARED SURFACES (new fixture JSONs, `_lib/testing/`, `_lib/replay/kaExam.ts`, a test, a script, one package.json line, one nightly step, conditional UI) touch no live routing file. `stageTools.ts`, `toolCategories.ts`, `deriveRouteDrafts.ts`, `runRouteDerivation.ts`, `catalogSync.ts`, `kinds.ts` and `data/backends/index.json` are all outside the scope.
- Hazard A: the only in-repo way to make (ii) pass is to add the fixture id to `data/backends/index.json`, which feeds `BACKEND_IDS` → `KIND_REGISTRY`. That is a live-registry change, and FALSIFIER (iv)'s grep scope (`api src shared scripts`) would NOT see it, because `data/` is outside the scope. It must be forbidden by name.
- Hazard B: calling `filterToolsByMessage` (ORDER 3 wording) runs the live function's write riders. Under mocks that means no DB, but the exam would then be exercising a writer. Use the pure core (item 5).

## COMPLETE DELTA (for the card's v2)

D1 (blocking, item 3): Rewrite FALSIFIER (ii)/(iii) to what c58438b can measure. (ii) = sync fills the mirror double with 30 rows, and derive (via exported `runRouteDerivation(id, actor, { svc, toolsRepo, entryFloor: [] })`, or `deriveRouteDrafts` directly) reports `uncovered=30`, `categoryDraftsStaged=0`, and the `unmapped` / `writeWithheld` partition, printed as the MEASURED category-birth gap. (iii) = the Recall table is printed and EXPECTED to be 0 / fall-through until a category-birth card exists (census or owner authoring). The 0.80 bar is declared unreachable at this head rather than silently failed. Alternatively, the Architect names the category-birth mechanism first and E1-b waits for it. Either way: no hand-authored fixture categories, and no fixture id in `data/backends/index.json`.
D2 (blocking, item 5): Replace "Recall@1 / rank 1" with membership recall (intended ∈ offered) + mean offered-set size. Or name the ranking source; `routeKeywordLayer` returns a sorted set.
D3 (blocking, item 5): Replace "filterToolsByMessage / … the same entry stage 07 uses" with `computeRouterAbArmA` + `scoreRouterAbCoverage` (`routerAbLens.ts:255`, `:81`) over `routeKeywordLayer`, with an empty learned Map and the fixture's own entry floor (empty).
D4 (blocking, item 6): Keep the exam out of `vitest.config.ts:11`'s include. For example, `api/cwf/_lib/replay/kaExam.ts` + a test file not matching `api/**/__tests__/**/*.test.ts`, run only by `npm run exam:ka` (explicit vitest file / config or tsx), and make the nightly step `npm run exam:ka`. Or the Architect rules that PR-blocking is acceptable and amends ORDER 4. Unit tests of the pure scorer may stay in `__tests__/`.
D5 (item 2): ORDER 3 registration: say "vi.mock module doubles". The handler has no DI seam. List: adminGuard, persistence index (McpGlobalSettingsRepository with a READABLE previous list + BackendToolsRepository), `@vercel/functions` waitUntil (capture + await), recordSyncHealth, census deps. Registration = one entry in the `mcp_global_settings.servers` JSON array carrying `backend_id`. Correct the card's CLAIM "tables" accordingly.
D6 (item 3): Name the sync doubles: resolveBackendPatterns, recordPatternDivergence, syncEntityDiscovery, resolveSystemActor (never read `SELF_SEED_ACTOR_EMAIL` from the real env), RuleGovernanceService. Note that `autoDeriveRouteDrafts` is private and void: assert on the svc double's calls, or call exported `runRouteDerivation` and say so.
D7 (item 4): SELF-INVALIDATION grep: exclude `scripts/groundMcpServer.ts` by name (stdio archive server, not a fixture). Otherwise the literal grep reports a false "wiring".
D8 (item 7): FORBIDDEN add: no edit to `data/backends/**`. Widen FALSIFIER (iv)'s pathspec to include `data`.
D9 (operational): the local run may hit sandbox listen EPERM. CI has precedent (`envProxy.test.ts:154`). The lane reports it as sandbox, not as a harness failure.

Items GREEN: 1, 2 (with D5), 4 (with D7), 7 (with D8). Items RED: 3 (D1, D6), 5 (D2, D3), 6 (D4).

UNMEASURED: the MCPSettingsTab was not rendered (static read only). `resolveBackendPatterns` / `toolPatternOf` fallback for an unknown id was not read (named as a double, so its value does not matter to the exam). cardPreflight did not run (sandbox EPERM).

read relay_inbox at 2026-09-28T00:48:30Z by artifact_name (DIGEST-OK) — one order for this window, acted on; box for this order: actioned. No other card taken, per the boot text.

END · SCOUT-STATUS-REVIEW-CARD-E1B-KA-FIXTURE-S161-1-v1
