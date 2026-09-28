<!-- relay-audit: v1 kind=card -->
CARD-E1B-KA-FIXTURE-BACKEND-S161-1-v1

LANE: AG-3 (fresh window; one card per window) — reaches AG-3 ONLY with a scout GREEN row
fanout: personalized (one lane, one body)
MEASURED-AT: 2026-09-28T00:45Z (bridge clock, date -u)
OWNER APPROVAL: OWNER-APPROVAL-S161-PLAN-1 ("onay S161 planı", 2026-09-28 02:37 TSI, plan step P7, card E1-b) · OWNER-RULING-S159-A25-ADOPT-1 · OWNER-RULING-S153-NO-ARMES-HARDCODE-1 · OWNER-RULING-S160-UI-UX-WITH-EVERY-CARD-1. Register rows 103 E1, 58, 84 named below. Doctrine D-13 (official SDK).
ADVERSARY GATE: NEW SUBJECT → scout first (12.1). No exemption claimed.
BRANCH: phase/e1b-ka-fixture-backend-s161-1 off origin/master · PUSH early · REPORT docs/relay/E1B-KA-FIXTURE-BACKEND-S161-1-AG3-report.md · PR: yes, non-draft, opened in THIS card.
GRAFT: take context from graft first (mcpCatalogFetch.fetchMcpToolList, turn/mcpClient.connectMcp, backends/catalogSync.syncBackendCatalog + autoDeriveRouteDrafts, the admin path that registers an MCP server, replay/stubTools, __fixtures__/flatBackendFixture.ts). Slip and report carry a GRAFT line.
Work in your own worktree, never in the main worktree another lane uses.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| master at cut time | MEASURED: GitHub API branches/master, Architect bridge, 2026-09-27T23:28Z | master |
| A25 bounds the "new backend = zero code" claim and names K-A + K-A′ as its exam | READ: A25 v1 HTML (sha256 8e8c18a8fab6141fe178f483f286ca1a2e93d8416fa5fadd6ac7bc4d9cf7866b), text extraction lines [19], [266], [427] — extraction, not HTML bytes | a25 |
| one shared connect+listTools path serves both the live catalog endpoint and the system sync that fills the backend_tools mirror; sync auto-derives route drafts | MEASURED: GitHub contents API at master, 2026-09-28T00:42Z | path |
| backend_tools and backends carry the mirror and the backend row; the MCP server registration table is NOT named mcp_servers (query returned no such relation) — its real name is measured by you | MEASURED: production DB pg_catalog, Architect (read-only), 2026-09-28T00:42Z | tables |
| the fixture directory holds typed fixtures and one flat-backend fixture already | MEASURED: GitHub contents API api/cwf/__tests__/__fixtures__ at master, 00:42Z | fixtures |

```evidence:master
c58438b59cff4d1d403634b28e44af9b01db6dea
```

```evidence:a25
[19] 11Sıfır-kod kapsamıK5 kart istemci tarafında; protokol sınıfı MCP/gateway.—"Yeni backend = sıfır kod" iddiası MCP tools/list + ilan edilmiş kimlik doğrulama + protokol sınıfı ile SINIRLIDIR; bilinmeyen auth/işlem protokolü kart kesimidir. K-G (kodda backend adı 0) GEREKLİ, yeterli değil; sınav K-A + K-A′ (iki görülmemiş sözlük).EKAstra A11—
[266] ⑩′ sınav: K-A fikstürü = repoda tools/list'i JSON'dan servis eden sentetik MCP sunucusu (finans, 30 araç) + K-A′ ikinci görülmemiş-sözlüklü backend;
[427] A25E5P4/P5'e: ... A24 P4/P5 çıkışları + K-A/K-A′ yeşil + K-G 0.
```

```evidence:path
c58438b59cff4d1d403634b28e44af9b01db6dea:api/cwf/_lib/backends/mcpCatalogFetch.ts:22:export async function fetchMcpToolList(
c58438b59cff4d1d403634b28e44af9b01db6dea:api/cwf/_lib/backends/mcpCatalogFetch.ts:29:        client = await connectMcp(new URL(target.url), target.headers, transport, label);
c58438b59cff4d1d403634b28e44af9b01db6dea:api/cwf/_lib/backends/catalogSync.ts:135:export async function syncBackendCatalog(
c58438b59cff4d1d403634b28e44af9b01db6dea:api/cwf/_lib/backends/catalogSync.ts:207:    await autoDeriveRouteDrafts(backendId);
c58438b59cff4d1d403634b28e44af9b01db6dea:api/cwf/_lib/backends/catalogSync.ts:277:async function autoDeriveRouteDrafts(backendId: string): Promise<void> {
```

```evidence:tables
MEASURED: pg_catalog, production, 2026-09-28T00:42Z
backend_tools: id uuid, backend_id text, tool_name text, description text, input_schema jsonb, first_seen_at timestamptz, last_seen_at timestamptz, status text, via_gateway boolean
backends: id text, display_name text, tool_pattern text, enabled boolean, created_at timestamptz, trust_tier text, scope_identity jsonb, factory_param_name text, lifecycle text
(no relation named mcp_servers in public)
```

```evidence:fixtures
api/cwf/__tests__/__fixtures__/: armesFloorAnchor.json · entryFloorFixture.ts · flatBackendFixture.ts · floorCategories.ts · learnCorpusDouble.ts · learnCorpusRepoDoubles.ts · metricVocabFixture.ts · numericLedgerFixture.ts · numericSameAbsoluteFixture.ts · phase1-prompt-notools.txt · phase1-prompt-tools.txt · routeDecisionMatrix.ts · superset-roundtrip.json
```

## PREMISE
MEASURED: the anchors above. In plain words: the product's promise is that a NEW backend needs no code — it is registered, CWF reads its tools/list, learns it, routes to it. Today that promise has never been exercised on a backend the code has never seen; every backend in the house was hand-fitted. This card builds the EXAM for the promise: a synthetic MCP server that lives in the repo and serves tools/list from a JSON file — a FINANCE vocabulary (30 tools) that no line of CWF code names — plus a SECOND JSON vocabulary (K-A′, another unseen domain) so the exam cannot be passed by fitting to one. The exam runs the SAME paths production uses (evidence:path): register → sync → mirror → route drafts → offered set, and scores Recall@1 on each fixture's own when-to-use questions. It is a test harness, not a product feature; it changes no live path. The boundary A25 draws (evidence:a25 [19]) is kept: the exam covers MCP tools/list + declared auth + protocol class; anything outside that is a card, not a failure.
SELF-INVALIDATION: dies if a synthetic MCP fixture server already exists at your head (grep `McpServer`/`@modelcontextprotocol/sdk/server` under api/ scripts/ e2e/ — then this is a wiring card and you say so, 12.6), or if MCP server registration cannot be driven through an admin API path (then STOP and report the gap: registration must be data, never a lane DB write).
ON-DISAGREEMENT: YOUR READING WINS: print both, continue with yours.

## FALSIFIER
At your head, in vitest with the fixture server on an ephemeral localhost port: (i) fetchMcpToolList against it returns exactly 30 tools with the JSON's names, descriptions and input schemas; (ii) syncBackendCatalog for a fixture backend id fills the backend_tools mirror double with 30 rows and autoDeriveRouteDrafts produces ≥1 category draft naming only fixture tools; (iii) the routing core, with the fixture's derived categories published in the test double, offers the intended fixture tool at rank 1 for ≥ 80% of the fixture's 30 when-to-use questions (the 0.80 is the card's PROVISIONAL bar for the exam harness only; the product bar is K25's declared param from CARD-E1A) — print the exact Recall@1 for BOTH vocabularies; (iv) `git grep -n -E "<fixture-id>|<any fixture tool name>" -- api src shared scripts ':!*__fixtures__*' ':!*.test.*'` prints nothing — the exam passes with ZERO code naming the fixture; (v) PLANT: rename one fixture tool in the JSON and show the exam's Recall drop and the mirror's diff; restore.

## ORDERS
1. FIXTURE DATA: api/cwf/__tests__/__fixtures__/mcp/finance-30.json and api/cwf/__tests__/__fixtures__/mcp/logistics-30.json (K-A′; a second invented domain with a vocabulary disjoint from finance and from every real backend) — each: 30 tools { name, description (TR+EN one line), inputSchema (JSON Schema), whenToUse: [3 questions] } — invented names only (AGNOSTIC-1); no real company, product or tool name.
2. FIXTURE SERVER: api/cwf/_lib/testing/fixtureMcpServer.ts — the OFFICIAL SDK's server (D-13; streamable HTTP or the transport connectMcp supports — measure turn/mcpClient.ts and use what it already speaks), serving tools/list from a given JSON and tools/call as an echo that returns the arguments (deterministic); start()/close() on an ephemeral port; no network beyond localhost.
3. EXAM: api/cwf/_lib/replay/kaExam.ts (pure scoring + orchestration over doubles) + api/cwf/__tests__/kaExam.test.ts: for EACH vocabulary — register the fixture backend through the same code path the admin registration API uses (measure it; if it is only reachable through an HTTP handler, call the handler in-process with a service double, never a raw table write); sync; derive; publish the derived drafts in the test double; score Recall@1 and Recall@3 over the 30×3 whenToUse questions with the EXISTING routing core (filterToolsByMessage / routeKeywordLayer through the same entry stage 07 uses); print a table per vocabulary. Also `npm run exam:ka` (scripts/runKaExam.ts) that runs the same in-process, no DB, no LLM, no spend.
4. NIGHTLY: add the K-A exam to the Nightly Compatibility matrix job as a step (it needs no secrets); NOT to the PR build job (keep build-test's step list as it is).
5. UI/UX (OWNER-RULING-S160-UI-UX-WITH-EVERY-CARD-1): the registration path you measure in ORDER 3 must be the one the MCP settings UI uses; if the UI cannot register a server with the fixture's declared auth/protocol class (A25 [19]), ADD the missing field(s) to MCPSettingsTab.tsx with i18n pairs and data-testids and name them; otherwise "UI/UX: verified, no change". REMOVALS: none.
6. Counts: FALSIFIER (iv) grep printed; `git grep -n -E "armes|Armes|ARMES" -- <your file set>` before/after (must not grow).
7. npm run build (five gates) + suite + typecheck:api; report with the FILE-FENCE in the first commit; PR non-draft; slip SLIP-E1B-KA-FIXTURE-BACKEND-S161-1 (branch, 40-hex head, PR, CI by full sha read twice if zero, both Recall tables, the plant result). Do not merge. Stop.

## SHARED SURFACES
```scope
- api/cwf/__tests__/__fixtures__/mcp/finance-30.json, logistics-30.json (new)
- api/cwf/_lib/testing/fixtureMcpServer.ts (new); api/cwf/_lib/replay/kaExam.ts (new); api/cwf/__tests__/kaExam.test.ts (new); scripts/runKaExam.ts (new); package.json (one script line)
- .github/workflows/nightly-compat.yml (one step)
- src/components/admin/MCPSettingsTab.tsx + i18n (ONLY if ORDER 5 finds a missing field); docs/relay/E1B-KA-FIXTURE-BACKEND-S161-1-AG3-report.md
```

## DECISION RIGHTS
AG-3 chooses the second vocabulary's domain, file names, port handling and the test double layout. The Architect decided: official SDK server; two disjoint invented vocabularies of 30 tools; the exam drives the production registration/sync/derive/route paths, never a raw table write; zero fixture names in code; nightly, not PR-blocking; provisional 0.80 harness bar named as provisional. You may refuse on evidence this card did not anticipate.
FORBIDDEN: no real backend, vendor or tenant name in fixtures or code; no live routing path change; no DB write from the lane; no LLM call; no merge; no scout post on your own head; no poll task, no cron; never print an environment value.

END · CARD-E1B-KA-FIXTURE-BACKEND-S161-1-v1
