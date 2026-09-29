SLIP-MEASURE-TOUR-SEAMS-S163-1

AG-1 · answers ORDER-MEASURE-TOUR-SEAMS-S163-1 (id bd7dec9d-0169-44cb-87f5-1dd6be760d89, md5 88994eb731a4da66017247ddfffbe80e, DIGEST-OK)
Read-only. No branch, commit, push or PR, and no DB write besides this slip and the stamp. Code read at origin/master 1a6279e0c3eddf5ac331b38f5c028b5f17668690 (PR 634 on master).

FIRST — the stamp
- The take ran from worktree scratchpad/wt-ag1 at 46a7b124 (PR 634's head; master 1a6279e0 is its merge, the same transport code):
  [mail-wait] [STAMPED] consumed_at written for ORDER-MEASURE-TOUR-SEAMS-S163-1 (relay_mark_consumed, over the WRITE connection)
- The two S163 notices were stamped from the same worktree earlier: [STAMPED] NOTICE-PR631-FRESH-BRANCH-S163-1 and [STAMPED] NOTICE-PUSH-DOC-REPO-S163-1.
- The same take reached a preflight verdict in the sandbox ([CARD-REFUSED] CP-1, CP-3, CP-4, CP-7, CP-9, CP-10 / CARD-GATE-DISARMED). It is reported and was not acted on.

## S1 · search_tools — VERDICT: MEASURED. The card's premise does not hold.

Evidence
- search_tools is not a CWF tool. It is the entry point of a GATEWAY-pattern backend, and its index lives in that backend's MCP server, outside this repo.
  - api/cwf/_lib/turn/stageTools.ts:1940 — `isGatewaySearch = toolDef.name === 'search_tools' && toolPatternOf(server.backend_id, backendPatterns) === 'gateway'`
  - api/cwf/_lib/mcp/gatewayEnumerate.ts:143 — CWF only CALLS it: `client.callTool({ name: 'search_tools', arguments: { query } })`
- The stored gateway catalogue, docs/superset-tool-catalog.json:
  - gatewayTools = get_instance_info, health_check, search_tools, call_tool
  - search_tools' own description: "Search for tools using natural language. Returns matching tool definitions ranked by relevance"
  - underlyingTools = 22 BI tools (list_charts, list_datasets, get_chart_data, …), of which 0 match inventor|stock|stok.
- getInventory / getInventoryCatalogue belong to the FLAT backend. The trace itself shows the model calling them directly (steps 3–6, not via call_tool). They sit in api/cwf/_lib/toolCategories.ts:335 and :345 (category `material`).
- The trace's `content: []` is the UNFILTERED copy. rawForClient is taken before the policy filter (stageTools.ts:1920–1923; gatewaySearchFilter.ts:14–19), so CWF removed nothing. The gateway's own index returned [].

Why "inventory" → []
- Cross-backend: the model asked a BI gateway's inner-tool index for a flat MES tool. That index cannot contain getInventory. The empty is the correct answer from that index; there is no name-matching or camelCase defect in it.
- The index algorithm itself ("ranked by relevance") is inside the gateway server: UNMEASURED and out of repo.

What made it worse (CWF-side, reproduced offline, no live backend)
- api/cwf/_lib/turn/gatewaySearchZero.ts:95–111 buildSearchZeroAddendum is appended to the model's copy on every 0-hit search (stageTools.ts:1963–1969).
- It says the index holds "tool NAMES and DESCRIPTIONS only", and it never says the index covers only ONE backend. It then sends the model to the gateway's enumeration tools.
- Probe (node --import tsx, master code; the reach-class map is illustrative, the live one comes from the policy snapshot):
    countSearchHits({"content":[]}) = 0
    addendum mentions a backend scope: false
    addendum points the model to: list_charts, list_dashboards, list_datasets

CWF's own tool retrieval already splits camelCase
- b34305e9 (PR 621, "tokenizeFor adds the camelCase parts") is an ancestor of origin/master: git merge-base --is-ancestor → exit 0.

ONE smallest change
- buildSearchZeroAddendum takes the gateway backend's display name as DATA from the backend registry (never a literal; NO-ARMES-HARDCODE / §6 fence).
- The addendum then states the scope: "bu dizin yalnızca <display_name> iç araçlarını kapsar; bağlı diğer sistemlerin araçları doğrudan araç listende / this index covers only <display_name>'s inner tools; other connected systems' tools are already in your direct tool list".
- The caller at stageTools.ts:1968 already holds server.backend_id.
- Test pinning it, in api/cwf/__tests__/gatewaySearchZero*.test.ts: given display name X, the addendum contains X and the scope sentence; given no name, it omits the name and does not invent one.

## S2 · getInventoryCatalogue / getInventory schema — VERDICT: UNMEASURED (enums, descriptions, live counts)

Evidence
- Where CWF stores it: public.backend_tools, the rows for the flat backend with tool_name IN ('getInventory','getInventoryCatalogue'), columns input_schema and description. Repository: api/cwf/_lib/persistence/repositories/BackendToolsRepository.ts.
- What is missing:
  (a) mcp__supabase-ro__execute_sql is REFUSED by guard-mcp GM-1 ("execute_sql is refused even on a server named read-only"). Not routed around.
  (b) No repo script prints one tool's schema. scripts/census.ts:103–108 reads COUNTS of filled input_schema/description only.
  (c) No repo file carries these schemas: armesFloorAnchor.json, liveLearnCorpus.json, toolCategories.ts and facts.json hold NAMES only.
- Measured without the DB (docs/relay/PHASE-CENSUS-DEEPEN-1-report.md:123):
  - getInventoryCatalogue requires ["factoryId","entityTypes"].
  - getInventory requires 'entityTypes' and 'state' (the tour's own validation error, trace step 6).
- entityTypes:[] = "all" or "none": UNMEASURED. The backend ACCEPTED [] (a required array was present) and returned []. Both readings produce that, so the trace cannot discriminate.
- Live per-enum calls: UNMEASURED. No read-only lane path to a flat-backend tool exists.
  - scripts/probeKnowledgeCorpus.ts is the only script that calls an MCP tool. Its READ_ONLY_TOOLS allowlist admits document-corpus tools only, and it needs .env.local, which this sandbox denies.
  - The census report records the same gap: "a live ARMES probe was run by this lane — NOT-READ … the live re-probe is named OWED". None was built (card order).
- What would close it: an Operator read of public.backend_tools.input_schema for the two rows, plus an owner-sanctioned live probe path.

ONE smallest change
- None to code. The discriminator is DATA: the Operator reads the two input_schema rows and quotes the entityTypes and state enums and both descriptions.

## S3 · wrong-tool drift — VERDICT: MEASURED from the repo's stored catalogues (names only); descriptions UNMEASURED (S2 (a)–(c))

Names matching inventory|stock|stok|wip|buffer|fired|pişmiş, plus "cooked" (the backend's own word for fired ware), across armesFloorAnchor.json, liveLearnCorpus.json, toolCategories.ts and the census report (137 distinct tool names scanned):
- getCookedStockAndon
- getInventory
- getInventoryCatalogue
- getRawStockPool
No name matches wip, buffer, fired or pişmiş.

The drift is explained by the category table (api/cwf/_lib/toolCategories.ts):
- `material` (:308–348)
  - keywords: …stok, stock, envanter, inventory, depo…
  - tools: getInventory, getInventoryCatalogue, getRawStockPool, getMaterialImportRequest, …
  → "pişmiş stok" matches `stok` and lands here. These are exactly the tools the model called: getInventory ×3, getMaterialImportRequest ×4.
- `andon` (:431–448)
  - keywords: andon, ekran, screen, board, canlı, live, pano, throughput, verim
  - tools: getCookedStockAndon, getLiveScreenData, getEntitySummary
  → getCookedStockAndon, the one tool whose NAME says cooked (= pişmiş) stock, has no stok/stock/pişmiş/cooked keyword. It was never offered by keyword and never called.
  → docs/relay/PHASE-QDRANT-ENGINE-1-report.md:216 already lists it as "missed BY NAME".
  → It requires ["factoryId"] only (census report :121), so no enum guess would be needed.
- toolCategories.ts is the code copy. The live category rows are governed data (domain_rules TOOL_CATEGORY); whether production's `andon` row differs is UNMEASURED (same DB read gap).

ONE smallest change
- A DATA edit, not code: add the keywords stok, stock, pişmiş, cooked to the `andon` category row through the governance path.
- Test: a fixture question "KB7 pişmiş stokta …" routes with getCookedStockAndon in the offered set (the A25 E1 K-A fixtures are the home).
- Whether getCookedStockAndon actually answers "which work orders" is UNMEASURED (no live call).

## S4 · empty reported as zero — VERDICT: MEASURED (offline probe on master code)

Evidence
- There is no separate compose stage. The final prose is the model's own streamed text: api/cwf/_lib/turn/stageStream.ts:192 runStreamStage. By owner ruling it may not be rewritten (api/cwf/_lib/turn/toolOutcomes.ts:283–296: "REWRITING, SUPPRESSING OR REPLACING MODEL OUTPUT is forbidden").
- Per-call outcome the turn holds:
  - ToolOutcomeLedger (toolOutcomes.ts:39–90) has calls / failures / successes. recordToolOutcome (:233–248) counts an empty [] as a SUCCESS; there is no empty field.
  - ctx.toolYield.resultsWithRecords (toolResult.ts:464; stageTools.ts:2001–2008) counts results carrying ≥1 record.
  → empties = successes − resultsWithRecords is already computable from two existing counters.
- Footer: src/lib/params/chatSurface.ts:207–214 OUTAGE_CHIP_TEXT.failure, rendered in src/components/ui/ChatShell.tsx:102 (formatOutageLine). It carries failures only.
- The existing absence gate is a CONSUMER already wired: api/cwf/_lib/turn/landingSignals.ts:513 deriveLandingSignals, called at stageStream.ts:710, with UI at src/components/ui/cwf/MessageChartContent.tsx:44 (formatAbsenceWithoutEnumeration). It is blind to this turn.
- Probe output (tour sentence + a trace of the tour's shape):
    findAbsenceClaim(tour sentence) = null
    deriveLandingSignals [gateway reach classes present] g2State=no-claim
    deriveLandingSignals [no reach classes] g2State=no-claim
    ledger calls=9 successes=7 failures=2 (empties counted as successes)
    answerUnbackedDespiteFailures = false
  - Cause 1: shared/absenceClaim.ts:51–89. The closed vocabulary is BI-scoped: every Turkish subject is grafik | veri | dataset | araç veya veri | sistemde. `"iş" bilgisi … mevcut değildir` matches none.
  - Cause 2: answerUnbackedDespiteFailures needs successes = 0, and getFactoryLines' data plus six empties made successes 7.

ONE smallest wiring (§12.6, consumer of existing counters, no new mechanism)
1. Ledger: recordToolOutcome gains `empty: boolean`. It is computed at the same stage-7 point as `failed`, from the same parse formatToolResult already does for toolYield. The ledger gets `empties` (ALWAYS PRESENT, 0 on a clean turn, the field law of its neighbours).
2. UI: OUTAGE_CHIP_TEXT gains a sibling line rendered by the same ChatShell chip, e.g. "{n} çağrı boş döndü (veri yok) — bu yokluk kanıtı değil / {n} call(s) returned empty (no data) — not proof of absence". Shown whenever empties > 0, beside the failure line. This is the distinct "veri yok" surface (OWNER-RULING-S160-UI-UX-WITH-EVERY-CARD-1).
3. Model side, without rewriting output: the gatewaySearchZero precedent (model-copy addendum on a definite 0) extended to a definite-0 flat result in formatToolResult's model copy only. rawForClient and resultText stay untouched (full-trace mandate).
4. Detector: absenceClaim's `tr-mevcut-degil` subject set lacks `bilgi(si)`. A test pins the tour's sentence. This is DETECTION only; the owner's rule keeps it off the output.
- Tests: toolOutcomes (empty ≠ success ≠ failure, 3 fixtures); outageTruthSurface.test.tsx (the empty line renders, and is absent at 0); absenceClaim.test.ts (the tour sentence).

GRAFT: used. graft ask ×2 (search_tools implementation; compose stage), skeleton ×4 (gatewaySearchFilter, gatewayEnumerate, absenceClaim, toolOutcomes), grep ×3 (search_tools, footer string, toolYield), callers ×2 (findAbsenceClaim, deriveLandingSignals). git grep only for non-indexed JSON/doc hits and ancestry.
Refusals met: guard-mcp GM-1 on execute_sql (not routed around).
