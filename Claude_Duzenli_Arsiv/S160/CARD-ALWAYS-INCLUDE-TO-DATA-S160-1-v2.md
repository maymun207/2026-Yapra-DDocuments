<!-- relay-audit: v1 kind=card -->
CARD-ALWAYS-INCLUDE-TO-DATA-S160-1-v2

LANE: AG-4 (fresh window; one card per window)
fanout: personalized (one lane, one body)
MEASURED-AT: 2026-09-27T06:40Z (bridge clock, date -u)
SUPERSEDES: CARD-ALWAYS-INCLUDE-TO-DATA-S160-1-v1 (scout-1 RED, SCOUT-STATUS-REVIEW-CARD-ALWAYS-INCLUDE-TO-DATA-S160-1-v1, bus 2026-09-27T06:33:04Z, full text sha256 f7793137943707da3512c88da7bb0440f2b76500c108b2fa1354639d94139855). v2 = v1 plus the scout's complete delta D1–D10, applied where each is named below, plus the Architect's measurement of the scout's one dark item (e). The scout's findings are credited to the scout (S112-YASA-1).
OWNER APPROVAL: OWNER-APPROVAL-S160-PLAN-1, the owner's words "PLani onayliyorum" (2026-09-27 08:06 TSI) to the S160 plan whose step 3 is this card; OWNER-RULING-S159-A25-ADOPT-1 option R6(g) ("ONAY", 2026-09-27 05:00 TSI); OWNER-RULING-S153-NO-ARMES-HARDCODE-1; OWNER-RULING-S160-UI-UX-WITH-EVERY-CARD-1 (2026-09-27 08:06 TSI: every architecture card carries the UI/UX additions and removals it implies). Register items 83, 58 (G2c), 82 named below.
ADVERSARY GATE: EXEMPT for this re-cut only, the loop-breaking case of project instruction 12.1: v2 repeats v1's subject and applies the scout's own complete delta to GREEN and nothing else beyond the (e) measurement the scout asked for; OWNER-RULING-S133-P6-SCOPE-AND-LOOP-1; the S157 practice recorded in bootstrap v159 (RED with complete delta -> apply, EXEMPT).

```evidence:adversary
ADVERSARY: EXEMPT
ack: e5a29c42-203a-41cb-b359-5f77269171ea
basis: project instruction 12.1 loop-breaking case + OWNER-RULING-S133-P6-SCOPE-AND-LOOP-1; ack = SCOUT-STATUS-REVIEW-CARD-ALWAYS-INCLUDE-TO-DATA-S160-1-v1 (scout from_lane row, 2026-09-27T06:33:04Z), whose complete delta D1-D10 this body applies
```
BRANCH: phase/always-include-to-data-s160-1 off origin/master · PUSH early · REPORT docs/relay/ALWAYS-INCLUDE-TO-DATA-S160-1-AG4-report.md · PR: yes, non-draft, opened in THIS card.
GRAFT: take code context from graft first (trace_calls alwaysIncludeToolNames, routeKeywordLayer, filterToolsByMessage); slip and report carry a GRAFT line. graft may index a stale local tree: line anchors from git show on origin/master.
Work in your own worktree for this branch (git worktree add off origin/master), never in the main worktree another lane uses.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| master at cut time | MEASURED: GitHub API commits/master + Vercel production deployment list, Architect bridge, 2026-09-27T06:36Z | master |
| ALWAYS_INCLUDE is a code Set of two tool names of one backend, unioned in on every routing path; its readers are the code sites listed, none of which takes a backend id or awaits | MEASURED: GitHub contents API at b8e5b1d95b76b92b0c20383ebd7a1d0bf9c7da6f (PR 623 touched none of these files: its diff is nightly-compat.yml, envProxy.test.ts and a report), Architect bridge, 2026-09-27T05:09Z; READ: scout (a) and (a+) | always |
| assemble.ts names TWO backends by literal at the pack switch; the superset builder is byte-identical to the data arm's call; the machine-knowledge-base builder is NOT | MEASURED: GitHub contents API at master, Architect bridge, 2026-09-27T05:09Z; READ: scout (c) | assemble |
| the knowledge file schema is strict with kinds min(1) and required labels/floor/seeds/trust, so a knowledge.json cannot carry a pack mode without entering knowledgeBackendIds() | READ: scout (b), backendKnowledge.ts:48-98 and :130-132 at master | schema |
| the flat composer picks ONE role 'entry' node with find() over rows read with no ORDER BY | READ: scout (d), compose.ts:46-48, :89, RuleStoreRepository.ts:575-583 at master | entry |
| the admin surfaces that show the floor or the two names | MEASURED: git grep in the shared clone at 2a6f6781b1a4748aac5f5bc7b1d73136863b1c35 (files untouched since); READ: scout (f) | ui |
| in the production DB the published entry row names getFactoryLines only; the published category 'factory' carries BOTH tool names, so the new floor row is category-reachable | MEASURED: production DB domain_rules, Architect (Supabase MCP, read-only), 2026-09-27T05:10Z and 06:36Z | rows |

```evidence:master
9fbb0b9b4de44e192c8f5e4eb69f6d0cad6ad2c4
```

```evidence:always
b8e5b1d95b76b92b0c20383ebd7a1d0bf9c7da6f:api/cwf/_lib/toolCategories.ts:1203:export const ALWAYS_INCLUDE = new Set([
b8e5b1d95b76b92b0c20383ebd7a1d0bf9c7da6f:api/cwf/_lib/toolCategories.ts:1204:    'getFactoryList',
b8e5b1d95b76b92b0c20383ebd7a1d0bf9c7da6f:api/cwf/_lib/toolCategories.ts:1205:    'getFactoryLines',
b8e5b1d95b76b92b0c20383ebd7a1d0bf9c7da6f:api/cwf/_lib/toolCategories.ts:1250:    ALWAYS_INCLUDE.forEach((tName) => relevant.add(tName));
b8e5b1d95b76b92b0c20383ebd7a1d0bf9c7da6f:api/cwf/_lib/toolCategories.ts:1915:    ALWAYS_INCLUDE.forEach((t) => relevantToolNames.add(t));
b8e5b1d95b76b92b0c20383ebd7a1d0bf9c7da6f:api/cwf/_lib/toolCategories.ts:1952:    ALWAYS_INCLUDE.forEach((t) => reachable.add(t));
b8e5b1d95b76b92b0c20383ebd7a1d0bf9c7da6f:api/cwf/_lib/toolCategories.ts:2016:    return [...ALWAYS_INCLUDE];
b8e5b1d95b76b92b0c20383ebd7a1d0bf9c7da6f:api/cwf/_lib/toolCategories.ts:2052:        alwaysInclude: [...ALWAYS_INCLUDE],
b8e5b1d95b76b92b0c20383ebd7a1d0bf9c7da6f:api/cwf/_lib/toolCategories.ts:2089:    return { categories, byBackend, coveredBackendIds: covered, alwaysInclude: [...ALWAYS_INCLUDE] };
b8e5b1d95b76b92b0c20383ebd7a1d0bf9c7da6f:api/cwf/_lib/toolCategories.ts:2120:    return { categories: allFloorCategories(), alwaysInclude: [...ALWAYS_INCLUDE] };
b8e5b1d95b76b92b0c20383ebd7a1d0bf9c7da6f:api/cwf/_lib/knowledge/reconcileToolGovernance.ts:169:    return !liveNames.has(tool) && !alwaysInclude.has(tool);
b8e5b1d95b76b92b0c20383ebd7a1d0bf9c7da6f:api/cwf/_lib/replay/routeShadowLens.ts:62:import { filterToolsByMessage, ALWAYS_INCLUDE } from '../toolCategories.js';
b8e5b1d95b76b92b0c20383ebd7a1d0bf9c7da6f:api/cwf/_lib/replay/routeShadowLens.ts:793:        const missing = [...ALWAYS_INCLUDE].filter((t) => !armB.offered.includes(t));
b8e5b1d95b76b92b0c20383ebd7a1d0bf9c7da6f:api/cwf/_lib/replay/routeShadowLens.ts:1050:            alwaysInclude: [...ALWAYS_INCLUDE], turnsChecked: perTurn.length,
READ: scout (a), git grep at origin/master b8e5b1d9, non-test readers v1 missed
api/cwf/_lib/knowledge/gate/evalGate.ts:200:            const alwaysInclude = new Set(alwaysIncludeToolNames());
api/cwf/_lib/knowledge/runRouteDerivation.ts:167:        deps.alwaysInclude ?? alwaysIncludeToolNames(),
scripts/reconcileToolGovernance.ts:113:    const alwaysInclude = alwaysIncludeToolNames();
scripts/genArchitectureFacts.ts:258:        alwaysInclude: manifest.alwaysInclude,
scripts/runRouteShadowLens.ts:202 prints ev.m5.alwaysInclude
api/cwf/_lib/replay/routerAbLens.ts:56-58 ALWAYS_INCLUDE_FLOOR = routeKeywordLayer({ userMessage: '', learned: new Map(), categories: [] }).offeredToolNames (module-load constant)
READ: scout (a+), the floor sites are synchronous and take no backend id
api/cwf/_lib/toolCategories.ts:1212-1224 routeKeywordLayer(input: RoutingCoreInput) fields userMessage, learned, categories
api/cwf/_lib/toolCategories.ts:1418 filterToolsByMessage(allTools, userMessage, categories, routerPolicy?, priorUserMessages?, replayFrame?, metricVocab?, cleanAgentTaskId?)
api/cwf/_lib/toolCategories.ts:1944 reachableToolNames(), :2015 alwaysIncludeToolNames(), :2116 getRoutingFloorReference() take no arguments
api/cwf/_lib/turn/stageTools.ts:667 ? await filterToolsByMessage(coverage.coveredFlat, ctx.message, catRes.categories, routerPolicy ?? undefined, priorUserMessages, undefined, undefined, ctx.taskId)
```

```evidence:assemble
b8e5b1d95b76b92b0c20383ebd7a1d0bf9c7da6f:api/cwf/_lib/prompt/assemble.ts:25:import { buildSupersetPack } from './backends/superset/pack.js';
b8e5b1d95b76b92b0c20383ebd7a1d0bf9c7da6f:api/cwf/_lib/prompt/assemble.ts:55:        case 'superset':
b8e5b1d95b76b92b0c20383ebd7a1d0bf9c7da6f:api/cwf/_lib/prompt/assemble.ts:56:            return buildSupersetPack(ctx.query ?? '', source);
b8e5b1d95b76b92b0c20383ebd7a1d0bf9c7da6f:api/cwf/_lib/prompt/assemble.ts:64:            if (declaresFlatPack(backend)) return source.getDomainContext(ctx.query ?? '', { backends: [backend] }).injected;
b8e5b1d95b76b92b0c20383ebd7a1d0bf9c7da6f:api/cwf/_lib/prompt/backends/superset/pack.ts:20:export function buildSupersetPack(query: string, source: DerivedPackSource = dbKnowledgeProvider): string {
b8e5b1d95b76b92b0c20383ebd7a1d0bf9c7da6f:api/cwf/_lib/prompt/backends/superset/pack.ts:21:    const { injected } = source.getDomainContext(query, { backends: ['superset'] });
READ: scout (c), git grep -n -E "case '[a-z-]+':" origin/master -- api/cwf/_lib/prompt
api/cwf/_lib/prompt/assemble.ts:55:        case 'superset':
api/cwf/_lib/prompt/assemble.ts:57:        case 'machine-knowledge-base':
machine-knowledge-base/pack.ts carries const BACKEND_ID = 'machine-knowledge-base' and a code PROTOCOL_PREAMBLE — not the data arm's call
```

```evidence:schema
READ: scout (b), api/cwf/_lib/knowledge/backendKnowledge.ts:48-98 and :130-132 at master
const KnowledgeFileSchema = z.object({ id, labels: z.object({...4 required strings...}).strict(), kinds: z.array(KindDeclarationSchema).min(1), floor: z.object({...}).strict(), toolGraph, referencedTools, toolNamesVerified, gate, seeds, trust }).strict();
:130-132 if (!parsed.success) throw new Error(`data/backends/${id}/knowledge.json does not validate: ...`)
:145 const KNOWLEDGE = load();  :153 knowledgeBackendIds() = BACKEND_INDEX.ids.filter((id) => KNOWLEDGE.has(id))
MEASURED: cat data/backends/index.json (shared clone 2a6f6781, file unchanged since)
{ "ids": ["armes","superset","system","machine-knowledge-base","honestbench","mount-probe"], "writerKinds": {...}, "consoleKinds": {...}, "exposureAnnotationKind": "armes.tool_annotation", "reconcileBackends": ["armes"] }
shared/backendData.ts:28-40 types writerKinds, consoleKinds, exposureAnnotationKind, reconcileBackends
```

```evidence:entry
b8e5b1d95b76b92b0c20383ebd7a1d0bf9c7da6f:api/cwf/_lib/knowledge/flat/compose.ts:89:    const entryNode = byKind(rules, toolGraphNodeKindId(backendId)).find((r) => (r.payload as { role?: string }).role === 'entry');
b8e5b1d95b76b92b0c20383ebd7a1d0bf9c7da6f:api/cwf/_lib/knowledge/reference/coreSchemas.ts:41:export const ToolGraphNodeSchema = z.object({
b8e5b1d95b76b92b0c20383ebd7a1d0bf9c7da6f:api/cwf/_lib/knowledge/reference/coreSchemas.ts:43:    role: z.enum(['entry', 'resolver', 'metric', 'scrap', 'quality', 'other']),
b8e5b1d95b76b92b0c20383ebd7a1d0bf9c7da6f:api/cwf/_lib/knowledge/reference/coreSchemas.ts:47:}).strict();
READ: scout (d): compose.ts:46-48 byKind = rules.filter (order-preserving, no sort); RuleStoreRepository.ts:575-583 getPublishedRules .select('*').eq('status', PUBLISHED).in('backend_id', backendIds) with NO .order(); data/backends/armes/knowledge.json:311 names getFactoryLines as the tool to call FIRST
```

```evidence:ui
b8e5b1d95b76b92b0c20383ebd7a1d0bf9c7da6f:src/lib/adminService.ts:378:export interface RoutingReference { categories: Array<{ name: string; keywords: string[]; tools: string[] }>; alwaysInclude: string[] }
b8e5b1d95b76b92b0c20383ebd7a1d0bf9c7da6f:src/components/admin/stagesRegistry.ts:248:   {kind:'code', name:'ALWAYS_INCLUDE', role:'Availability floor — referans', target:{na:'ertelendi — taban koddan servis edilir (union-floor, bilinçli)'}, codePath:'api/cwf/_lib/toolCategories.ts'},
b8e5b1d95b76b92b0c20383ebd7a1d0bf9c7da6f:src/components/admin/stageCardCoverage.ts:174:        anchors: [{ path: 'api/cwf/_lib/toolCategories.ts', needle: 'export const ALWAYS_INCLUDE' }],
MEASURED: git grep -n "alwaysInclude" -- src/components/admin/RoutingTab.tsx src/dev/AdminPreview.tsx
src/components/admin/RoutingTab.tsx:632:                                    {reference.alwaysInclude.map((tool) => (
src/dev/AdminPreview.tsx:303:            alwaysInclude: ['getFactoryList', 'getFactoryLines'],
READ: scout (f), further non-test src hits: RoutingTab.tsx:631 (literal heading), AdminPreview.tsx:341/:663/:679 (floor hard-coded into offeredToolNames), GovernanceTab.tsx:1325 (placeholder 'getFactoryLines'), ReplayTab.tsx:1088 (text names ALWAYS_INCLUDE), src/components/admin/__tests__/routingTab.test.tsx:39 (fixture alwaysInclude)
READ: scout (f): the owner CAN publish a tool_graph_node instance today: GovernanceTab.tsx (Rules tab, new-rule form :1316) -> POST /api/admin/rules/[id] {action:'publish'} ([id].ts:107-121, super_admin) -> svc.publish -> evalGate; governance.ts:539-547 locks a CORE kind's FIELD STRUCTURE only; gate applies ToolGraphNodeSchema (strict), GATE-REF-1 key == payload.tool (evalGate.ts:137-141), referential RULE 31 reachability (evalGate.ts:239-243)
```

```evidence:rows
MEASURED: select kind_id, status, payload->>'tool', payload->>'role' from domain_rules where kind_id like '%tool_graph_node%' (production, 2026-09-27T05:10Z)
armes.tool_graph_node | published | getFactoryLines | entry
armes.tool_graph_node | published | getDailyOeeValues | metric
armes.tool_graph_node | published | getLineStopsReportForZones | other
armes.tool_graph_node | published | getDailyManualScrap | scrap
armes.tool_graph_node | published | getScrapBarcodeList | scrap
(no row, any status, names getFactoryList; 3 archived rows omitted; no other backend has tool_graph_node rows)
MEASURED: select kind_id, status, payload->>'name', (payload->'tools') ? 'getFactoryList', (payload->'tools') ? 'getFactoryLines' from domain_rules where kind_id like '%tool_category%' and status='published' and (... ? either name) (production, 2026-09-27T06:36Z)
armes.tool_category | published | factory | has getFactoryList true | has getFactoryLines true
```

## PREMISE
MEASURED: the anchors above; the scout's dark item (e) is now measured in evidence:rows (the published 'factory' category carries both names, so the new floor row satisfies RULE 31 by category, never by the floor).
The problem, in plain words, MEASURED: evidence:always and evidence:assemble. Two backend-name literals sit on the routing and prompt paths: (1) ALWAYS_INCLUDE — two tool names of one backend, unioned into the offered set on every path and echoed by the manifest, the reconciler's phantom exemption, the shadow lens guardian, the route-derivation "covered" set, the architecture facts and the admin Routing tab; a second backend gets no floor and this backend's floor cannot change without a deploy. (2) assemble.ts:55 selects the superset pack by a backend-name literal, and that builder is byte-identical to the data arm at :64. Both are OWNER-RULING-S153-NO-ARMES-HARDCODE-1 breaches; A25 R6(g) orders them to DATA now. A25 K17 later DERIVES entry tools; this card only moves the two literals into the data K17 will read.
Two literals this card LEAVES, by name (D3): assemble.ts:57 `case 'machine-knowledge-base'` — its builder carries a code PROTOCOL_PREAMBLE and is NOT the data arm's call, so moving it is a pack-composition change, not a literal move: register item 82's card (Superset hand pack privilege) is widened to "hand-packed backends in code: HAND_PACKED_BACKENDS at DbKnowledgeProvider.ts:358 and the machine-knowledge-base pack arm" and is cut after this card lands. Neither is touched here.
The trap, MEASURED: evidence:schema. A knowledge.json cannot carry a pack mode: the schema is strict, kinds is min(1), and a filled file would put superset into knowledgeBackendIds() with side effects in referenceData, selfSeedReconciler, seedRules, backendTrust, authorityText (prompt bytes) and evalGate:377 (D2). So the pack mode lives in data/backends/index.json, beside the other per-backend routing facts that file already declares, and KNOWLEDGE is untouched by construction.
The second trap, MEASURED: evidence:entry. A second role 'entry' row would make compose.ts:89's find() non-deterministic (no ORDER BY) and change prompt bytes between turns (D4). So the availability floor is a SEPARATE flag on the node, and the entry point stays singular.
SELF-INVALIDATION: dies if any anchor reads differently at your head (then STOP and print both).
ON-DISAGREEMENT: YOUR READING WINS: print both values, continue with yours.

## FALSIFIER
At your head, for every recorded live turn of the last 7 days replayed with the DB reachable: the offered tool set (offeredToolNames) and the system prompt bytes (promptRev + bytes) equal master's, EXCEPT the one declared change: a turn whose serving backends have no published floor rows offers an EMPTY floor with entryFloorSource 'absent' recorded. Until the owner publishes the getFactoryList floor row (ORDER 0), the replay reports exactly ONE named difference class: turns that offered getFactoryList from the code Set and not from data. Any other difference is a STOP with the turn id. A change to the composed flat entry (compose.ts:89 output) for any backend is a STOP. Plant: restore the code Set on one path and show the new floor test go red; remove the plant.

## ORDERS
0. DATA HALF, sequenced: the floor row for getFactoryList is published by the OWNER in the Rules UI through the eval gate, WITH the Architect watching (OWNER-RULING-S158 governed settings, never the operator), AFTER your PR lands (the schema field of ORDER 1 must be live first): kind armes.tool_graph_node, tool getFactoryList, role 'resolver', floor true (D4). It is category-reachable today (evidence:rows: published 'factory' carries it), so RULE 31 passes by category. Your code lands with floor = published rows where role === 'entry' OR floor === true; until the row is published the data floor carries getFactoryLines only and the FALSIFIER reports that one difference by name. The Architect flips nothing; the trace shows it.
1. Schema and floor reader: ToolGraphNodeSchema (coreSchemas.ts:41, strict) gains `floor: z.boolean().optional()` (D4). One function (name yours) in api/cwf/_lib/knowledge/ returns, for a list of backend ids, the tool names of their PUBLISHED tool_graph_node rows with role === 'entry' or floor === true, through the same rule reader flat/compose.ts:89 uses (DB-first, warm cache), as { tools: string[], source: 'data' | 'absent' } — absent when no row, never a code fallback list. compose.ts:89 is untouched except that the entry candidates are sorted by key before find() so the entry is deterministic ('getFactoryLines' sorts first today).
2. Floor passed IN as data (D5): the resolved floor is computed ONCE per turn in stageTools from the turn's serving backends (beside catRes.categories at :667) and passed in — a new field on RoutingCoreInput (toolCategories.ts:1212) and a new trailing parameter of filterToolsByMessage (:1418), exactly as `categories` travels today. The pure core stays sync and I/O-free (replay determinism at :1232-1245). Every reader in evidence:always reads the passed-in floor or the new function: toolCategories 1250, 1915, 1952, 2016, 2052, 2089, 2120; reconcileToolGovernance alwaysInclude input via scripts/reconcileToolGovernance.ts:113; routeShadowLens 62/793/1050; routerAbLens.ts:56-58 (the module constant becomes a per-run value from the floor function; name what its empty-catalog probe now returns); evalGate.ts:200; runRouteDerivation.ts:167 (and catalogSync.autoDeriveRouteDrafts / admin stage-drafts through it); scripts/genArchitectureFacts.ts:258; scripts/runRouteShadowLens.ts:202. reachableToolNames() (:1944, platform-wide) and getRoutingFloorReference() (:2116) take the floor of ALL backends with published rows. The const ALWAYS_INCLUDE is DELETED. The stage 07 digest gains entryFloorSource and entryFloorCount (D10 naming; empty ≠ zero).
3. Floor is not a self-exemption (D7): in evalGate.ts:200-243 (RULE 31 reachability) and reconcileToolGovernance.ts:168-169 (isPhantomTool) the floor read is the PUBLISHED set only, never the candidate under evaluation, and a floor row exempts NO tool from the phantom check unless that tool is in the live mirror; a test pins each.
4. Pack switch from data (D2): data/backends/index.json gains `"packs": { "superset": "provider" }`; shared/backendData.ts types it; a predicate declaresPack(backend) = declaresFlatPack(backend) || BACKEND_INDEX.packs?.[backend] !== undefined. assemble.ts:55-56 and prompt/backends/superset/pack.ts are deleted; the switch's data arm calls source.getDomainContext(ctx.query ?? '', { backends: [backend] }).injected for any backend that declaresPack. declaresFlatPack, KNOWLEDGE, knowledgeBackendIds() and every DbKnowledgeProvider read are UNTOUCHED (you prove by test that knowledgeBackendIds() at head equals master's). assemble.ts:57 (machine-knowledge-base) and DbKnowledgeProvider.ts:358 (HAND_PACKED_BACKENDS) untouched (item 82).
5. UI/UX (OWNER-RULING-S160-UI-UX-WITH-EVERY-CARD-1; D8): RoutingReference.alwaysInclude becomes entryFloor: Array<{ backend, tools, source }>; RoutingTab.tsx:629-636 renders it per backend under the i18n pair ("Giriş araçları (veri)" / "Entry tools (data)"), each tool chip linking to its rule row in the Rules tab; the literal heading "ALWAYS_INCLUDE" at :631 is REMOVED; an empty floor renders "yok / none" with its source, never a blank. stagesRegistry.ts:248 flips to kind 'data' naming toolGraphNodeKindId and the role/floor rule; stageCardCoverage.ts:174 anchors the new function's export; AdminPreview.tsx:303, :341, :663, :679 fixtures use neutral names; GovernanceTab.tsx:1325 placeholder and ReplayTab.tsx:1088 text no longer name a backend tool or ALWAYS_INCLUDE; src/components/admin/__tests__/routingTab.test.tsx:39 fixture takes the new shape; public/architecture narrative tabs reseal in the same commit if check:doc-drift asks. The Rules tab's tool_graph_node form exposes the new `floor` field (a checkbox with the i18n pair "Kullanılabilirlik tabanı" / "Availability floor") so ORDER 0 can be done in the UI.
6. Tests (D9): scope = the floor-asserting tests only — routingCuration, replayRouting, stageContextSlice, routeKeywordLayer, routerAbLens, routeShadowSeam, routingFloorBackend, floorWidens, backendAwareFilter, routeGov*, deriveRouteDrafts (:207), promptSnapshot / __fixtures__/phase1-prompt-tools.txt, routingTab.test.tsx — each passes through ONE NEW routing fixture (file name yours, under api/cwf/__tests__/__fixtures__/) that publishes neutral-named entry/floor rows for two fixture backends (AGNOSTIC-1; check:tenant-zero). Payload-only tests that merely carry the two names as tool-result data are NOT edited. New tests: (i) two backends with floor rows -> both floors on every path (semantic, keyword, router, all-fallback); (ii) a backend with no floor rows -> [] and entryFloorSource 'absent' in the trace; (iii) superset prompt bytes at head equal a base snapshot for three fixture queries; (iv) knowledgeBackendIds() unchanged and declaresFlatPack(superset) false; (v) a second role 'entry' row does not change the composed entry (sorted); (vi) RULE 31 and isPhantomTool do not read the candidate's own floor row. The M5 guardian in routeShadowLens reads the data floor.
7. Count at head, case-sensitive: git grep -n -E "ALWAYS_INCLUDE|buildSupersetPack" -- api src shared scripts ':!*__tests__*' ':!*.test.ts' ':!*.test.tsx' prints nothing; git grep -n -E "case '[a-z-]+':" -- api/cwf/_lib/prompt prints exactly the one machine-knowledge-base line (D3); git grep -n -E "armes|Armes|ARMES" -- <your file set> printed before and after, with the delta. Print the three commands and outputs.
8. npm run build (all five gates) + full suite + typecheck:api locally; report with the complete FILE-FENCE in the FIRST commit; PR non-draft; slip SLIP-ALWAYS-INCLUDE-TO-DATA-S160-1 (branch, full head, PR number, CI by full sha read twice if zero, test counts, the FALSIFIER replay result with the one named difference class). Do not merge. Stop.

## SHARED SURFACES
```scope
- api/cwf/_lib/toolCategories.ts (RoutingCoreInput field, filterToolsByMessage parameter, the readers named; the Set deleted)
- api/cwf/_lib/knowledge/ (one new floor module; reference/coreSchemas.ts floor field; gate/evalGate.ts:200-243; runRouteDerivation.ts:167; reconcileToolGovernance.ts input)
- api/cwf/_lib/knowledge/flat/compose.ts (sort before find only)
- api/cwf/_lib/replay/routeShadowLens.ts, routerAbLens.ts
- api/cwf/_lib/turn/stageTools.ts (resolve the floor once; two digest fields) and the stage 07 digest type
- api/cwf/_lib/prompt/assemble.ts (superset arm only); api/cwf/_lib/prompt/backends/superset/pack.ts (deleted)
- data/backends/index.json (packs); shared/backendData.ts (type)
- scripts/reconcileToolGovernance.ts, scripts/genArchitectureFacts.ts, scripts/runRouteShadowLens.ts
- src/lib/adminService.ts, src/components/admin/RoutingTab.tsx, GovernanceTab.tsx (floor checkbox, placeholder), ReplayTab.tsx:1088, stagesRegistry.ts, stageCardCoverage.ts, src/dev/AdminPreview.tsx, i18n pairs, src/components/admin/__tests__/routingTab.test.tsx
- the floor-asserting tests named in ORDER 6; one new fixture under api/cwf/__tests__/__fixtures__/; docs/relay/ALWAYS-INCLUDE-TO-DATA-S160-1-AG4-report.md
- public/architecture/manifest.json (reseal, same commit, only if doc-drift requires); docs/ground/facts.json (only if check:ground requires)
```

## DECISION RIGHTS
AG-4 chooses names, signatures, the fixture layout and the i18n key names. The Architect decided: floor = published rows with role 'entry' OR floor true, absent -> empty + recorded, no code fallback; the floor is passed IN as data (pure core stays sync); pack mode in index.json, KNOWLEDGE untouched; compose sorted before find; floor is never a self-exemption; machine-knowledge-base arm and HAND_PACKED_BACKENDS left to item 82; the owner publishes the floor row in the UI after landing. You may refuse on evidence this card did not anticipate.
FORBIDDEN: no backend, vendor or tenant name added in code, fixtures or UI strings; no DB write from the lane; no removal of a user-visible function (the Routing tab keeps a floor view — it changes source, not existence); no change to routing order or category matching; no change to knowledge.json files or knowledgeBackendIds(); no merge; no adversary/scout post on your own head; no poll task, no cron; never print an environment value.

END · CARD-ALWAYS-INCLUDE-TO-DATA-S160-1-v2
