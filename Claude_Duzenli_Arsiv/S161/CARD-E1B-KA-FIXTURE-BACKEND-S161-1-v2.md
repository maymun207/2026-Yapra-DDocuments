<!-- relay-audit: v1 kind=card -->
CARD-E1B-KA-FIXTURE-BACKEND-S161-1-v2

LANE: AG-3 (fresh window; one card per window; your OWN worktree off origin/master)
fanout: personalized (one lane, one body)
MEASURED-AT: 2026-09-28T01:10Z (bridge clock, date -u)
SUPERSEDES: CARD-E1B-KA-FIXTURE-BACKEND-S161-1-v1 (scout-1 RED, SCOUT-STATUS-REVIEW-CARD-E1B-KA-FIXTURE-S161-1-v1, bus row cfd50714-a9d4-4c3d-9a7d-788dcd69de35, file sha256 570ed05b4b92b64275bd5ccfb4c116a36415f85dd9c6b79c3c5358db98e4cff7). v2 = v1 with the scout's complete delta D1–D9 applied where each is named; D1 is taken in its FIRST form (measure the category-birth gap honestly; the category-birth mechanism is a SEPARATE card). Findings credited to scout-1 (S112-YASA-1).
OWNER APPROVAL: OWNER-APPROVAL-S161-PLAN-1 ("onay S161 planı", 2026-09-28 02:37 TSI, plan step P7, card E1-b) · OWNER-RULING-S159-A25-ADOPT-1 · OWNER-RULING-S153-NO-ARMES-HARDCODE-1 · OWNER-RULING-S160-UI-UX-WITH-EVERY-CARD-1 · D-13 (official SDK). Register rows 103 E1, 58 named below.
ADVERSARY GATE: EXEMPT for this re-cut only — the loop-breaking case of 12.1: same subject, the scout's own complete delta and nothing else; OWNER-RULING-S133-P6-SCOPE-AND-LOOP-1.

```evidence:adversary
ADVERSARY: EXEMPT
ack: cfd50714-a9d4-4c3d-9a7d-788dcd69de35
basis: project instruction 12.1 loop-breaking case + OWNER-RULING-S133-P6-SCOPE-AND-LOOP-1; ack = SCOUT-STATUS-REVIEW-CARD-E1B-KA-FIXTURE-S161-1-v1 (bus row cfd50714-a9d4-4c3d-9a7d-788dcd69de35, 2026-09-28T01:03:38Z, the scout file relayed by the Architect), whose delta D1-D9 this body applies
```
BRANCH: phase/e1b-ka-fixture-backend-s161-2 off origin/master · PUSH early · REPORT docs/relay/E1B-KA-FIXTURE-BACKEND-S161-1-AG3-report.md · PR: yes, non-draft, opened in THIS card.
GRAFT: take context from graft first (mcpClient.connectMcp + mcpTransport.transportOrder; mcpCatalogFetch; admin/mcp-settings PUT handler; catalogSync.syncBackendCatalog; runRouteDerivation (exported DI seam) + deriveRouteDrafts; routerAbLens.computeRouterAbArmA / scoreRouterAbCoverage / toolCandidatesForCategories; envProxy.test.ts listen(0) precedent). Slip and report carry a GRAFT line.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| master at cut time | MEASURED: GitHub API branches/master, Architect bridge, 2026-09-27T23:28Z | master |
| A25 bounds "new backend = zero code" and names K-A + K-A′ as its exam | READ: A25 v1 text extraction lines [19], [266], [427] | a25 |
| connectMcp speaks streamable-http (first) and sse only; the SDK 1.29.0 server entries are installed; an http.createServer on port 0 reaches fetchMcpToolList | READ: scout-1 §1 (mcpClient.ts:7-8, :116, :123, :135; mcpTransport.ts:41-42; node_modules/@modelcontextprotocol/sdk/dist/esm/server/{mcp,streamableHttp}.js; envProxy.test.ts:154) | transport |
| registration = one entry in the `servers` JSON array of mcp_global_settings carrying backend_id; the PUT handler has no DI seam and syncs via waitUntil | READ: scout-1 §2 (shared/dbConstants.ts:69; api/admin/mcp-settings.ts:25, :51, :108-112, :191; MCPSettingsTab.tsx:793, :862) | registry |
| for an UNSEEN backend the derivation cannot give birth to a category: deriveRouteDrafts never invents one, runRouteDerivation only amends published rows, and kinds are minted only over data/backends/index.json ids | READ: scout-1 §3 (deriveRouteDrafts.ts header + proposeCategory; runRouteDerivation.ts publishedCategories.find; kinds.ts NON_SYSTEM_BACKEND_IDS; shared/dbConstants.ts:1499) | birth |
| filterToolsByMessage WRITES (proposals ledger, learned map); the pure no-emit entry is computeRouterAbArmA + scoreRouterAbCoverage; the offered set is a sorted Set with no rank | READ: scout-1 §5 (toolCategories.ts:1801, :1878, :1254; routerAbLens.ts:7-9, :62, :81, :255) | core |
| vitest includes api/**/__tests__/**/*.test.ts and the PR build job runs `npm run test`; nightly-compat.yml carries no secrets | READ: scout-1 §6 (vitest.config.ts:11; build-test.yml:421-423; nightly-compat.yml) | placement |

```evidence:master
c58438b59cff4d1d403634b28e44af9b01db6dea
```

```evidence:a25
[19] 11Sıfır-kod kapsamıK5 kart istemci tarafında; protokol sınıfı MCP/gateway.—"Yeni backend = sıfır kod" iddiası MCP tools/list + ilan edilmiş kimlik doğrulama + protokol sınıfı ile SINIRLIDIR; bilinmeyen auth/işlem protokolü kart kesimidir. K-G (kodda backend adı 0) GEREKLİ, yeterli değil; sınav K-A + K-A′ (iki görülmemiş sözlük).EKAstra A11—
[266] ⑩′ sınav: K-A fikstürü = repoda tools/list'i JSON'dan servis eden sentetik MCP sunucusu (finans, 30 araç) + K-A′ ikinci görülmemiş-sözlüklü backend;
[427] A25E5P4/P5'e: ... A24 P4/P5 çıkışları + K-A/K-A′ yeşil + K-G 0.
```

```evidence:transport
READ (scout-1 §1): mcpClient.ts:7 SSEClientTransport, :8 StreamableHTTPClientTransport, :116 transportOrder, :123/:135 the two constructors; mcpTransport.ts:41-42 http first unless 'sse'; stdio only in the CALL path (:280). package.json:58 "@modelcontextprotocol/sdk": "1.29.0"; server entries mcp.js, streamableHttp.js, sse.js present. mcpCatalogFetch.ts:29 takes a URL → InMemory transport cannot reach it; http.createServer + StreamableHTTPServerTransport on port 0 can (envProxy.test.ts:154 listen(0,'127.0.0.1')).
```

```evidence:registry
READ (scout-1 §2): registry = mcp_global_settings.servers JSON array (dbConstants.ts:69); personal overrides mcp_settings (:21); `backends` NOT written by registration; binding = the server entry's backend_id (catalogSync backendOf; UnassignedBackendError). Handler api/admin/mcp-settings.ts: PUT → isValidServerEntry → detectGlobalSecretViolation → repo.get() → repo.upsert → waitUntil(syncBackendCatalog(server, undefined, { runBehaviorCensus: true })…) (:191); :51 new McpGlobalSettingsRepository() (no DI seam); :108-112 a throwing repo.get() syncs nothing. UI carries backend_id, auth by reference, transport (MCPSettingsTab.tsx:780-781, :793, :852, :862).
```

```evidence:birth
READ (scout-1 §3): deriveRouteDrafts.ts header "it never invents a category. A read tool whose keywords match nothing lands in `unmapped`; new-category creation stays withheld (CENSUS's job)"; categories come only from publishedCategories → with zero published, proposeCategory null for every tool → unmapped/writeWithheld, additionsByCategory empty, categoryDraftsStaged = 0. runRouteDerivation.ts: a category draft only AMENDS a published row (publishedCategories.find(...) else "proposed category has no published row with that key"). kinds.ts NON_SYSTEM_BACKEND_IDS = BACKEND_IDS.filter(…) → buildToolCategoryKindDefs; BACKEND_IDS = BACKEND_INDEX.ids (dbConstants.ts:1499) = data/backends/index.json ids. A fixture id has no <id>.tool_category kind → createDraft refuses (production evidence in the file's own comment: failed=4 every tick). runRouteDerivation IS exported with RouteDerivationDeps { svc, toolsRepo, entryFloor }; autoDeriveRouteDrafts is private, void, needs resolveSystemActor.
```

```evidence:core
READ (scout-1 §5): toolCategories.ts:1801 recordRouteProposals(...), :1878 learnToolMapping(...) — filterToolsByMessage writes; routerAbLens.ts:7-9 "NEVER calls filterToolsByMessage (the only site that emits into the governed proposals ledger)"; :255 computeRouterAbArmA(userMessage, learned, categories, calledToolNames, entryFloor); :81 scoreRouterAbCoverage(offered, called); :62 toolCandidatesForCategories; toolCategories.ts:1254 offeredToolNames: [...relevant].sort() — a sorted Set, no rank.
```

```evidence:placement
READ (scout-1 §6): vitest.config.ts:11 include 'api/**/__tests__/**/*.test.ts'; build-test.yml:421-423 Run tests → npm run test (package.json:35 "test": "vitest run"); nightly-compat.yml: no env:, no secrets.; jobs compat [22.x, 24.x] + coverage.
```

## PREMISE
The product's promise is that a NEW backend needs no code. v1 assumed the exam could pass at this head; the scout MEASURED that it cannot, and the reason is the exam's first honest result: **for a backend the registry has never seen, the pipeline stops at CATEGORY BIRTH** (evidence:birth) — the derivation never invents a category, and even the kind a draft would be written against exists only for the six ids in data/backends/index.json. So this card builds the K-A harness as an INSTRUMENT that measures that gap truthfully (delta D1, first form): fixture server (official SDK, streamable-http, port 0) → registration through the real PUT handler with module doubles (D5) → sync fills the mirror double with 30 rows → derivation via the EXPORTED runRouteDerivation with its DI seam (D6) prints `uncovered=30 · categoryDraftsStaged=0 · unmapped/writeWithheld partition` → the routing table is printed over the PURE no-emit core computeRouterAbArmA + scoreRouterAbCoverage (D3), with metrics named truthfully for an unranked set: MEMBERSHIP RECALL (intended ∈ offered) and MEAN OFFERED-SET SIZE (D2) — EXPECTED to be 0 / fall-through at this head. No fixture category is hand-authored and no fixture id enters data/backends/index.json (D8): either would fit the exam to the vocabulary. The category-birth mechanism (census/profiler K3 → published category rows for a new backend; self-configuring per OWNER-DESIGN-S159-1) is CARD-E2-CATEGORY-BIRTH (Architect cuts it next; new subject → scout). When it lands, this instrument turns green without change — that is the point of building the instrument first.
SELF-INVALIDATION: dies if a tools/list-from-JSON fixture server exists at your head (grep McpServer|sdk/server under api scripts e2e EXCLUDING scripts/groundMcpServer.ts — the stdio archive server, D7), or if runRouteDerivation's DI seam differs from evidence:birth (print it, STOP).
ON-DISAGREEMENT: YOUR READING WINS: print both, continue with yours.

## FALSIFIER
At your head, run by `npm run exam:ka` (NOT inside `npm run test`, D4): (i) fetchMcpToolList against the fixture server returns exactly 30 tools per vocabulary with the JSON's names/descriptions/schemas; (ii) registration through the PUT handler (doubles: adminGuard, persistence index McpGlobalSettingsRepository with a READABLE previous list + BackendToolsRepository, @vercel/functions waitUntil captured and awaited, recordSyncHealth, census deps) → syncBackendCatalog fills the mirror double with 30 rows; runRouteDerivation(id, actor, { svc, toolsRepo, entryFloor: [] }) reports uncovered=30, categoryDraftsStaged=0 and the unmapped/writeWithheld partition — printed as MEASURED CATEGORY-BIRTH GAP; (iii) the exam table (membership recall, mean offered-set size) over 30×3 whenToUse questions for BOTH vocabularies with an empty learned Map and empty floor — expected 0 recall today; the report says "category-birth gap; bar 0.80 unreachable at this head", never "fail" silently; (iv) `git grep -n -E "<fixture-id>|<any fixture tool name>" -- api src shared scripts data ':!*__fixtures__*' ':!*.test.*' ':!*kaExam*'` prints nothing (pathspec includes data, D8); (v) `npm run test` (the PR suite) does NOT run the exam (vitest.config include unchanged; the exam file name does not match it); (vi) local listen EPERM in a sandboxed window is reported as SANDBOX, not harness (D9) — CI is the referee.

## ORDERS
1. FIXTURE DATA: api/cwf/__tests__/__fixtures__/mcp/finance-30.json and logistics-30.json (K-A′; disjoint invented vocabularies) — 30 tools each { name, description (TR+EN), inputSchema, whenToUse: [3] }; invented names only.
2. FIXTURE SERVER: api/cwf/_lib/testing/fixtureMcpServer.ts — McpServer from '@modelcontextprotocol/sdk/server/mcp.js' + StreamableHTTPServerTransport from '@modelcontextprotocol/sdk/server/streamableHttp.js' behind http.createServer listening on port 0 / 127.0.0.1 (the envProxy.test.ts:154 shape); tools/list from the JSON; tools/call = deterministic echo; start()/close().
3. EXAM (D1 first form, D2, D3, D5, D6): api/cwf/_lib/replay/kaExam.ts (pure orchestration + scoring) and api/cwf/_lib/replay/kaExam.exam.ts (the runnable — a name that does NOT match vitest's include; run via `npm run exam:ka` = `node --import tsx scripts/runKaExam.ts` or a dedicated vitest config, your choice, D4). Steps per vocabulary: start server → PUT registration through api/admin/mcp-settings default export with vi.mock/module doubles listed in FALSIFIER (ii) (the entry = { …, transport: 'streamable-http', url, backend_id: <fixture-id>, no apiKey }) → capture+await the waitUntil promise → assert the mirror double holds 30 rows → call the EXPORTED runRouteDerivation(fixtureId, doubleActor, { svc: svcDouble, toolsRepo: mirrorDouble, entryFloor: [] }) and print its result (uncovered, categoryDraftsStaged, partition) → for each whenToUse question: computeRouterAbArmA(q, new Map(), publishedCategories = [], calledToolNames = [intended], entryFloor = []) and scoreRouterAbCoverage → table: membershipRecall, meanOfferedSize per vocabulary. Never call filterToolsByMessage. Never read SELF_SEED_ACTOR_EMAIL from the real env (doubleActor is a literal test uuid).
4. UNIT TESTS (may live under __tests__/, D4): the pure scorer; the fixture server round-trip (skip with a NAMED reason when listen is EPERM, D9).
5. NIGHTLY: nightly-compat.yml gains a step `npm run exam:ka` after `npm run test` (no secrets needed); build-test.yml untouched.
6. UI/UX (OWNER-RULING-S160-UI-UX-WITH-EVERY-CARD-1): registration in MCPSettingsTab already carries backend_id, auth-by-reference and transport (evidence:registry) → expected "UI/UX: verified by static read, no change"; if the PUT validator rejects an auth-less localhost entry, ADD the missing field with i18n + data-testid and name it. REMOVALS: none.
7. Counts: FALSIFIER (iv) grep printed; `git grep -n -E "armes|Armes|ARMES" -- <your file set>` before/after (must not grow).
8. npm run build (five gates) + suite + typecheck:api; report with the FILE-FENCE in the first commit and the MEASURED CATEGORY-BIRTH GAP as its own section (plain words + the printed partition); PR non-draft; slip SLIP-E1B-KA-FIXTURE-BACKEND-S161-1 (branch, 40-hex head, PR, CI by full sha read twice if zero, both tables, the gap line). Do not merge. Stop.

## SHARED SURFACES
```scope
- api/cwf/__tests__/__fixtures__/mcp/finance-30.json, logistics-30.json (new)
- api/cwf/_lib/testing/fixtureMcpServer.ts (new); api/cwf/_lib/replay/kaExam.ts, kaExam.exam.ts (new); api/cwf/__tests__/kaExamScorer.test.ts, fixtureMcpServer.test.ts (new); scripts/runKaExam.ts (new); package.json (one script line)
- .github/workflows/nightly-compat.yml (one step)
- src/components/admin/MCPSettingsTab.tsx + i18n (ONLY if ORDER 6 finds a rejected field); docs/relay/E1B-KA-FIXTURE-BACKEND-S161-1-AG3-report.md
```

## DECISION RIGHTS
AG-3 chooses the second vocabulary's domain, file names, port handling, the mock layout and whether the runnable is tsx or a dedicated vitest config. The Architect decided (by A25 and the scout's measurements): the instrument measures the category-birth gap and expects 0 today; pure no-emit core; truthful metric names; exam outside the PR suite; no fixture id in data/, no hand-authored fixture categories; category birth is a separate card. You may refuse on evidence this card did not anticipate.
FORBIDDEN: no edit under data/backends/**; no real backend, vendor or tenant name in fixtures or code; no call to filterToolsByMessage; no live routing path change; no DB write from the lane; no LLM call; no merge; no scout post on your own head; no poll task, no cron; never print an environment value.

END · CARD-E1B-KA-FIXTURE-BACKEND-S161-1-v2
