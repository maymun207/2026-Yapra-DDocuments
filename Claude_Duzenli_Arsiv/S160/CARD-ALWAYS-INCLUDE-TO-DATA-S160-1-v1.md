<!-- relay-audit: v1 kind=card -->
CARD-ALWAYS-INCLUDE-TO-DATA-S160-1-v1

LANE: AG-4 (fresh window; one card per window) — NOT DISPATCHED until the scout's GREEN row (v2 carries it)
fanout: personalized (one lane, one body)
MEASURED-AT: 2026-09-27T05:10Z (bridge clock, date -u)
OWNER APPROVAL: OWNER-APPROVAL-S160-PLAN-1, the owner's words "PLani onayliyorum" (2026-09-27 08:06 TSI) to the S160 plan whose step 3 is this card; OWNER-RULING-S159-A25-ADOPT-1 option R6(g) ("ONAY", 2026-09-27 05:00 TSI); OWNER-RULING-S153-NO-ARMES-HARDCODE-1; OWNER-RULING-S160-UI-UX-WITH-EVERY-CARD-1 (2026-09-27 08:06 TSI: every architecture card carries the UI/UX additions and removals it implies). Register items 83, 58 (G2c), 82 named below.
ADVERSARY GATE: NOT lifted. New subject: this card goes to the scout first (project instruction 12.1); the evidence:adversary block is filled from the scout's GREEN row before dispatch.

```evidence:adversary
ADVERSARY: PENDING
ack: (scout GREEN row, filled before dispatch)
basis: new subject, scout review required (12.1)
```
BRANCH: phase/always-include-to-data-s160-1 off origin/master · PUSH early · REPORT docs/relay/ALWAYS-INCLUDE-TO-DATA-S160-1-AG4-report.md · PR: yes, non-draft, opened in THIS card.
GRAFT: take code context from graft first; slip and report carry a GRAFT line. graft may index a stale local tree: line anchors from git show on origin/master.
Work in your own worktree for this branch (git worktree add off origin/master), never in the main worktree another lane uses.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| master at cut time | MEASURED: Vercel production deployment list (latest READY) + GitHub API commits/master, Architect bridge, 2026-09-27T05:08Z | master |
| ALWAYS_INCLUDE is a code Set of two tool names of one backend, unioned in on every routing path and read by the floor manifest, the governance reconciler and the shadow lens | MEASURED: GitHub contents API at master, Architect bridge, 2026-09-27T05:09Z | always |
| assemble.ts names one backend by literal at the pack switch; the named builder is the same provider call the data-declared arm makes | MEASURED: GitHub contents API at master, Architect bridge, 2026-09-27T05:09Z | assemble |
| the flat composer already reads the role 'entry' tool_graph_node; the role enum is a generic code schema | MEASURED: GitHub contents API at master, Architect bridge, 2026-09-27T05:09Z | entry |
| declaresFlatPack also selects the COMPOSE path in DbKnowledgeProvider, and a hand-packed set names the same backend there | MEASURED: git grep in the shared clone at 2a6f6781b1a4748aac5f5bc7b1d73136863b1c35 (files untouched by PR 622), Architect bridge, 2026-09-27T05:10Z | provider |
| the admin UI renders the code list under a literal heading; the stages registry records the floor as 'code, deferred' | MEASURED: GitHub contents API at master + git grep in the shared clone, Architect bridge, 2026-09-27T05:09Z | ui |
| in the production DB, published tool_graph_node rows of that backend with role 'entry' name ONE of the two tools; the other has no row at all | MEASURED: production DB domain_rules, Architect (Supabase MCP, read-only), 2026-09-27T05:10Z | rows |

```evidence:master
b8e5b1d95b76b92b0c20383ebd7a1d0bf9c7da6f
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
b8e5b1d95b76b92b0c20383ebd7a1d0bf9c7da6f:api/cwf/_lib/knowledge/reconcileToolGovernance.ts:104:    /** ALWAYS_INCLUDE tool names — the availability floor, exempt from phantom/orphan checks. */
b8e5b1d95b76b92b0c20383ebd7a1d0bf9c7da6f:api/cwf/_lib/knowledge/reconcileToolGovernance.ts:169:    return !liveNames.has(tool) && !alwaysInclude.has(tool);
b8e5b1d95b76b92b0c20383ebd7a1d0bf9c7da6f:api/cwf/_lib/replay/routeShadowLens.ts:62:import { filterToolsByMessage, ALWAYS_INCLUDE } from '../toolCategories.js';
b8e5b1d95b76b92b0c20383ebd7a1d0bf9c7da6f:api/cwf/_lib/replay/routeShadowLens.ts:793:        const missing = [...ALWAYS_INCLUDE].filter((t) => !armB.offered.includes(t));
b8e5b1d95b76b92b0c20383ebd7a1d0bf9c7da6f:api/cwf/_lib/replay/routeShadowLens.ts:1050:            alwaysInclude: [...ALWAYS_INCLUDE], turnsChecked: perTurn.length,
```

```evidence:assemble
b8e5b1d95b76b92b0c20383ebd7a1d0bf9c7da6f:api/cwf/_lib/prompt/assemble.ts:25:import { buildSupersetPack } from './backends/superset/pack.js';
b8e5b1d95b76b92b0c20383ebd7a1d0bf9c7da6f:api/cwf/_lib/prompt/assemble.ts:55:        case 'superset':
b8e5b1d95b76b92b0c20383ebd7a1d0bf9c7da6f:api/cwf/_lib/prompt/assemble.ts:56:            return buildSupersetPack(ctx.query ?? '', source);
b8e5b1d95b76b92b0c20383ebd7a1d0bf9c7da6f:api/cwf/_lib/prompt/assemble.ts:64:            if (declaresFlatPack(backend)) return source.getDomainContext(ctx.query ?? '', { backends: [backend] }).injected;
b8e5b1d95b76b92b0c20383ebd7a1d0bf9c7da6f:api/cwf/_lib/prompt/backends/superset/pack.ts:20:export function buildSupersetPack(query: string, source: DerivedPackSource = dbKnowledgeProvider): string {
b8e5b1d95b76b92b0c20383ebd7a1d0bf9c7da6f:api/cwf/_lib/prompt/backends/superset/pack.ts:21:    const { injected } = source.getDomainContext(query, { backends: ['superset'] });
```

```evidence:entry
b8e5b1d95b76b92b0c20383ebd7a1d0bf9c7da6f:api/cwf/_lib/knowledge/flat/compose.ts:89:    const entryNode = byKind(rules, toolGraphNodeKindId(backendId)).find((r) => (r.payload as { role?: string }).role === 'entry');
b8e5b1d95b76b92b0c20383ebd7a1d0bf9c7da6f:api/cwf/_lib/knowledge/reference/coreSchemas.ts:43:    role: z.enum(['entry', 'resolver', 'metric', 'scrap', 'quality', 'other']),
```

```evidence:provider
MEASURED: git grep -n -E "declaresFlatPack|HAND_PACKED_BACKENDS" -- api/cwf/_lib/knowledge/DbKnowledgeProvider.ts
api/cwf/_lib/knowledge/DbKnowledgeProvider.ts:312:        if (!declaresFlatPack(backend)) return staticKnowledgeProvider.getDomainContext(query, { backends: [backend] });
api/cwf/_lib/knowledge/DbKnowledgeProvider.ts:357:        if (declaresFlatPack(backend)) return composeFlatContext(backend, rules);
api/cwf/_lib/knowledge/DbKnowledgeProvider.ts:358:        if (HAND_PACKED_BACKENDS.has(backend)) return composeSupersetContext(rules, await this.loadInnerTools(backend));
api/cwf/_lib/knowledge/backendKnowledge.ts:158:export function declaresFlatPack(backendId: string): boolean {
api/cwf/_lib/knowledge/backendKnowledge.ts:159:    return KNOWLEDGE.has(backendId);
```

```evidence:ui
b8e5b1d95b76b92b0c20383ebd7a1d0bf9c7da6f:src/lib/adminService.ts:377:/** The code manifest — static categories + the ALWAYS_INCLUDE floor (names only, read-only). */
b8e5b1d95b76b92b0c20383ebd7a1d0bf9c7da6f:src/lib/adminService.ts:378:export interface RoutingReference { categories: Array<{ name: string; keywords: string[]; tools: string[] }>; alwaysInclude: string[] }
b8e5b1d95b76b92b0c20383ebd7a1d0bf9c7da6f:src/components/admin/stagesRegistry.ts:248:   {kind:'code', name:'ALWAYS_INCLUDE', role:'Availability floor — referans', target:{na:'ertelendi — taban koddan servis edilir (union-floor, bilinçli)'}, codePath:'api/cwf/_lib/toolCategories.ts'},
b8e5b1d95b76b92b0c20383ebd7a1d0bf9c7da6f:src/components/admin/stageCardCoverage.ts:174:        anchors: [{ path: 'api/cwf/_lib/toolCategories.ts', needle: 'export const ALWAYS_INCLUDE' }],
MEASURED: git grep -n "alwaysInclude" -- src/components/admin/RoutingTab.tsx src/dev/AdminPreview.tsx
src/components/admin/RoutingTab.tsx:632:                                    {reference.alwaysInclude.map((tool) => (
src/dev/AdminPreview.tsx:303:            alwaysInclude: ['getFactoryList', 'getFactoryLines'],
```

```evidence:rows
MEASURED: select kind_id, status, payload->>'tool', payload->>'role' from domain_rules where kind_id like '%tool_graph_node%' (production, 2026-09-27T05:10Z)
armes.tool_graph_node | published | getFactoryLines | entry
armes.tool_graph_node | published | getDailyOeeValues | metric
armes.tool_graph_node | published | getLineStopsReportForZones | other
armes.tool_graph_node | published | getDailyManualScrap | scrap
armes.tool_graph_node | published | getScrapBarcodeList | scrap
(no row, any status, names getFactoryList; 3 archived rows omitted; no other backend has tool_graph_node rows)
```

## PREMISE
MEASURED: the anchors above.
THE PROBLEM, in plain words. Two backend names are still hard-coded on the routing and prompt paths: (1) ALWAYS_INCLUDE — two tool names of one backend, unioned into the offered tool set on every path and echoed by the manifest, the reconciler's phantom exemption, the shadow lens guardian and the admin Routing tab; a second backend gets no floor, and this backend's floor cannot be changed without a deploy. (2) assemble.ts:55 selects a pack builder by a backend-name literal; the builder does exactly what the data-declared arm at :64 does. Both are OWNER-RULING-S153-NO-ARMES-HARDCODE-1 breaches and A25 R6(g) orders them to DATA now: the floor becomes the published tool_graph_node rows with role 'entry' of the turn's serving backends; the pack switch keys on what the backend's data declares. A25 K17 later DERIVES entry tools; this card only moves the two literals into the data K17 will read.
TRAP NAMED (12.2): declaresFlatPack is read in THREE places (assemble.ts:64, DbKnowledgeProvider:312 and :357). Adding data/backends/superset/knowledge.json to remove the assemble literal would ALSO switch superset's compose path from composeSupersetContext to composeFlatContext and change prompt bytes. Therefore the data declaration carries a pack MODE, and only assemble.ts keys on "declares a pack" while the provider keeps keying on "declares the FLAT pack". HAND_PACKED_BACKENDS (:358) is register item 82's card, cut after this one lands; it is NOT touched here and is named as the ONE literal this card leaves, with that reason.
SELF-INVALIDATION: dies if any anchor reads differently at your head (then STOP and print both).
ON-DISAGREEMENT: YOUR READING WINS: print both values, continue with yours.

## FALSIFIER
At your head, for every recorded live turn of the last 7 days replayed with the DB reachable: the offered tool set (offeredToolNames) and the system prompt bytes (promptRev + bytes) equal master's, EXCEPT the one declared change: a turn whose serving backends have no published entry rows offers an EMPTY floor with floorSource 'absent' recorded (today that cannot happen for the one backend because getFactoryLines is published; getFactoryList is ABSENT from the data until the owner publishes its row in the Rules UI — see ORDER 0). Any other difference is a STOP with the turn id. Plant: restore the code Set for one path and show the new test go red; remove the plant.

## ORDERS
0. DATA HALF, sequenced: the second entry row (tool getFactoryList, role entry, armes.tool_graph_node) is published by the OWNER in the Rules UI through the eval gate, WITH the Architect watching (OWNER-RULING-S158 governed settings, never the operator). Your code lands with floor = published entry rows; until that row is published the floor at head carries getFactoryLines only, and your replay in the FALSIFIER reports that ONE difference by name (a turn that offered getFactoryList from code and not from data). The Architect flips nothing; the trace shows it.
1. Entry floor from data: one function (name yours) in api/cwf/_lib/knowledge/ that returns, for a list of backend ids, the tool names of their PUBLISHED tool_graph_node rows with payload.role === 'entry', through the same rule reader flat/compose.ts:89 uses (DB-first, warm cache), returning { tools, source: 'data' | 'absent' } — absent when no row, never a code fallback list. Every reader in evidence:always (toolCategories 1250, 1915, 1952, 2016, 2052, 2089, 2120; reconcileToolGovernance alwaysInclude input; routeShadowLens 62/793/1050; routerAbLens; evalGate:240 reachability) reads it; the const ALWAYS_INCLUDE is DELETED. The offered set on every path unions the data floor exactly where it unioned the code floor. The turn trace (stage 07 digest) gains floorSource and floorCount (empty ≠ zero).
2. Pack switch from data: backendKnowledge's data schema gains an optional `pack` field ('flat' | 'provider'); declaresFlatPack stays true only for 'flat' (default when the field is absent — today's files unchanged); a new predicate for "declares any pack". data/backends/superset/knowledge.json is created declaring `pack: 'provider'` and NO kind families (so evalGate:131 and governance.ts:354 see nothing new — you prove it by test). assemble.ts:55–56 and prompt/backends/superset/pack.ts are deleted; the switch's data arm calls source.getDomainContext(ctx.query ?? '', { backends: [backend] }).injected for any backend that declares a pack. DbKnowledgeProvider:312 and :357 keep their FLAT meaning; :358 untouched (item 82).
3. UI/UX (OWNER-RULING-S160-UI-UX-WITH-EVERY-CARD-1): RoutingReference.alwaysInclude becomes entryFloor: Array<{ backend, tools, source }>; RoutingTab.tsx:632 renders it per backend under a heading from the i18n pair ("Giriş araçları (veri)" / "Entry tools (data)"), each tool chip linking to its rule row in the Rules tab; the literal heading "ALWAYS_INCLUDE" is REMOVED from the UI; an empty floor renders "yok / none" with the source, never a blank. stagesRegistry.ts:248 flips to kind 'data' naming the kind builder (toolGraphNodeKindId) and role 'entry'; stageCardCoverage.ts:174 anchors the new function's export; AdminPreview.tsx:303 fixture uses neutral names; public/architecture narrative tabs reseal in the same commit if check:doc-drift asks.
4. Tests: every test that carries the two tool names by literal (git grep -l -E "getFactoryList|getFactoryLines" over tests: 66 files at the shared clone — print your count at head) keeps passing through a fixture rule set that publishes those entry rows, or is re-pointed at neutral names (AGNOSTIC-1; no tenant words, check:tenant-zero). New tests: (i) two backends with entry rows → both floors on every path (semantic, keyword, router, all-fallback); (ii) a backend with no entry rows → floor [] and floorSource 'absent' in the trace; (iii) superset prompt bytes at head equal a base snapshot for three fixture queries; (iv) declaresFlatPack(superset) is false and the gate families at evalGate:131 are unchanged. The M5 guardian in routeShadowLens reads the data floor.
5. Count at head, case-sensitive: git grep -n -E "ALWAYS_INCLUDE|buildSupersetPack|case 'superset'" -- api src shared ':!*__tests__*' ':!*.test.ts' prints nothing; git grep -n -E "armes|Armes|ARMES" -- <your file set> printed before and after, with the delta. Print both commands and outputs.
6. npm run build (all five gates) + full suite + typecheck:api locally; report with the complete FILE-FENCE in the FIRST commit; PR non-draft; slip SLIP-ALWAYS-INCLUDE-TO-DATA-S160-1 (branch, full head, PR number, CI by full sha read twice if zero, test counts, the FALSIFIER replay result with the one named difference). Do not merge. Stop.

## SHARED SURFACES
```scope
- api/cwf/_lib/toolCategories.ts (the readers named; the Set deleted)
- api/cwf/_lib/knowledge/ (one new module; backendKnowledge.ts schema field)
- api/cwf/_lib/knowledge/reconcileToolGovernance.ts (input only)
- api/cwf/_lib/replay/routeShadowLens.ts, routerAbLens.ts (read the data floor)
- api/cwf/_lib/knowledge/gate/evalGate.ts (reachability reads the data floor)
- api/cwf/_lib/prompt/assemble.ts (switch arm); api/cwf/_lib/prompt/backends/superset/pack.ts (deleted)
- data/backends/superset/knowledge.json (new, pack: provider, no families)
- api/cwf/_lib/turn/ (trace fields floorSource, floorCount only)
- src/lib/adminService.ts, src/components/admin/RoutingTab.tsx, stagesRegistry.ts, stageCardCoverage.ts, src/dev/AdminPreview.tsx, i18n pairs
- tests named in ORDER 4; docs/relay/ALWAYS-INCLUDE-TO-DATA-S160-1-AG4-report.md
- public/architecture/manifest.json (reseal, same commit, only if doc-drift requires); docs/ground/facts.json (only if check:ground requires)
```

## DECISION RIGHTS
AG-4 chooses names, signatures, the fixture layout and the i18n key names. The Architect decided: floor from published role 'entry' rows, absent → empty + recorded, no code fallback; pack mode field with FLAT as default; HAND_PACKED_BACKENDS untouched (item 82); the owner publishes the second entry row in the UI. You may refuse on evidence this card did not anticipate.
FORBIDDEN: no backend, vendor or tenant name added in code, fixtures or UI strings; no DB write from the lane; no removal of a user-visible function (the Routing tab keeps a floor view — it changes source, not existence); no change to routing order or category matching; no merge; no adversary/scout post on your own head; no poll task, no cron; never print an environment value.

END · CARD-ALWAYS-INCLUDE-TO-DATA-S160-1-v1
