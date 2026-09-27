ADVERSARY-VERDICT: RED card=CARD-ALWAYS-INCLUDE-TO-DATA-S160-1-v1 sha256=308f48ee34c4705ec567c91b609058cb3fd765b10c7f5aac84b12bbb49851d49

SCOUT-STATUS-REVIEW-CARD-ALWAYS-INCLUDE-TO-DATA-S160-1-v1
FROM: scout-1 (lane_addr scout), 2026-09-27
IN REPLY TO: ORDER-SCOUT-REVIEW-CARD-ALWAYS-INCLUDE-TO-DATA-S160-1-v1 (relay_inbox id ed29aec0-f930-4df7-948f-502400dd6a25, created_at 2026-09-27 05:16:16.931528+00, body_md5 d691fb73db83337b7d3de228f682ecf7, DIGEST-OK)
BOX: read ONLY the named row, per the owner's instruction (node scripts/mail-wait.mjs scout --read <name>; NOT-TAKEN, consumed_at not written). No other row was taken; this status makes no box-empty claim.
GRAFT: graft trace_calls on alwaysIncludeToolNames (depth 2) and routeKeywordLayer, used as a second lens beside git grep. The local tree is 2a6f6781; master b8e5b1d9 differs from it only in numeric-ledger files and api/cwf/_lib/turn/stageStream.ts (git diff --stat 2a6f6781 origin/master), so every graft hit here is valid at master. Line anchors are from git grep / git show at origin/master.
READ-ONLY: no edit, no commit, no GitHub status, no poll, no cron. No environment value was printed.

## STEP 1

    $ git ls-remote origin refs/heads/master
    b8e5b1d95b76b92b0c20383ebd7a1d0bf9c7da6f	refs/heads/master

This equals the card's evidence:master, so SELF-INVALIDATION does not fire.

    $ shasum -a 256 ".../Claude_Duzenli_Arsiv/S160/CARD-ALWAYS-INCLUDE-TO-DATA-S160-1-v1.md"
    308f48ee34c4705ec567c91b609058cb3fd765b10c7f5aac84b12bbb49851d49

This equals the order's value. The mail-wait read of the order printed PREFLIGHT-UNMEASURED: `npx tsx` hit a sandbox EPERM when listening on its IPC pipe. The card's own form (`node --import tsx`) then RAN:

    $ node --import tsx scripts/cardPreflight.ts --check <card file>
    [OK]   CP-1 the body passes the landed grammar as kind=card
    [OK]   CP-2 a set is named by its members, never by a count alone
    [FAIL] CP-3 premise line carries no instrument and no UNMEASURED: THE PROBLEM, in plain words. Two backend names are still hard-coded on t
    [FAIL] CP-3 premise line carries no instrument and no UNMEASURED: TRAP NAMED (12.2): declaresFlatPack is read in THREE places (assemble.ts
    [OK]   CP-4 .. CP-11 (all OK)
    REFUSED-CHECKS=CP-3
    RED — 1 check(s) failed. The card is not ready to insert.

## STEP 2 — hostile questions

### (a) CONSUMERS — evidence:always MISSES non-test readers

    $ git grep -n -E "ALWAYS_INCLUDE|alwaysInclude" origin/master -- api src shared scripts ':!*__tests__*' ':!*.test.ts' ':!*.test.tsx'

These are CODE readers, not comments. None of them appears in evidence:always:

- api/cwf/_lib/knowledge/gate/evalGate.ts:43 (import) and :200 `const alwaysInclude = new Set(alwaysIncludeToolNames());`, which seeds `reachable` at :202 and is the catalog exemption at :209. The card cites "evalGate:240"; :240 is a COMMENT line. The reader is :200.
- api/cwf/_lib/knowledge/runRouteDerivation.ts:46 (import) and :167 `deps.alwaysInclude ?? alwaysIncludeToolNames(),` feed deriveRouteDrafts.ts:142-145 (the "covered" set). Graft depth 2 shows this reached from catalogSync.autoDeriveRouteDrafts (api/cwf/_lib/backends/catalogSync.ts:277) and the api/admin/backend-tools/stage-drafts.ts handler.
- scripts/reconcileToolGovernance.ts:36 (import) and :113 `const alwaysInclude = alwaysIncludeToolNames();`. This is the ACTUAL caller that feeds the reconciler input the card names only generically.
- scripts/genArchitectureFacts.ts:258 `alwaysInclude: manifest.alwaysInclude,` writes the architecture facts, a shape change reaching public/architecture and docs.
- scripts/runRouteShadowLens.ts:202 prints `ev.m5.alwaysInclude`, whose shape follows routeShadowLens:1050.
- routerAbLens.ts:56-58: ALWAYS_INCLUDE_FLOOR is a MODULE-LOAD constant computed by calling routeKeywordLayer with an empty catalog. The card lists routerAbLens but not this mechanism (see STRUCTURAL below).
- Indirect sync callers of routeKeywordLayer (graft): api/admin/replay.ts handler, api/admin/routing-curation.ts handleProbe (:206), replay/stageContextSlice.ts runKeywordEngine (:122), scripts/a23BaselineArmA.ts, scripts/a23PathBArmB.ts.

File counts per class: UNMEASURED (not run with -l). The non-test listing shows code readers in the further files named above, beyond the 3 files evidence:always names.

STRUCTURAL (a+): every floor reader is SYNCHRONOUS and takes NO backend id:

- routeKeywordLayer(input: RoutingCoreInput) at toolCategories.ts:1212-1224 has fields userMessage, learned and categories only.
- reachableToolNames() :1944, alwaysIncludeToolNames() :2015 and getRoutingFloorReference() :2116 take no arguments.
- filterToolsByMessage :1418 takes allTools, userMessage, categories, routerPolicy, priorUserMessages, replayFrame and more, with NO backend-id list.

ORDER 1 says "the tool names of their PUBLISHED tool_graph_node rows ... (DB-first, warm cache) ... for a list of backend ids" and "unions the data floor exactly where it unioned the code floor". At those sites there is neither a backend list nor an await. The card must name the new parameter, which is the smallest change: the resolved floor is passed IN as data to RoutingCoreInput and filterToolsByMessage, resolved once in stageTools from the turn's serving backends, in the same way `categories` is passed today. It must also say what reachableToolNames() (platform-wide, "across EVERY backend") and the routerAbLens module constant become. Without that, a lane will either make the pure core async (breaking the replay determinism documented at :1232-1245) or invent a backend default.

### (b) PACK TRAP — the premise is WRONG. The file cannot exist as ordered.

    READ: api/cwf/_lib/knowledge/backendKnowledge.ts:48-98, :125-160 (local tree; the file is unchanged 2a6f6781..b8e5b1d9 per git diff --stat)
    const KnowledgeFileSchema = z.object({
        id: ..., labels: z.object({...4 required strings...}).strict(),
        kinds: z.array(KindDeclarationSchema).min(1),
        floor: z.object({ toolGraphEntry, sequencingRule, persona, metrics, formats, blindSpots, glossary }).strict(),
        toolGraph: ..., referencedTools: ..., toolNamesVerified: ...,
        gate: {...}, seeds: { reference: {...}, metricRegistry: [...] }, trust: {...},
    }).strict();
    :130-132  if (!parsed.success) throw new Error(`data/backends/${id}/knowledge.json does not validate: ...`)

The schema is `.strict()`, so an unknown `pack` key is REFUSED. `kinds` is `.min(1)`, so "NO kind families" is REFUSED. labels, floor, seeds and trust are REQUIRED. The ordered file therefore THROWS AT MODULE LOAD (:145 `const KNOWLEDGE = load()`), and every importer of the knowledge layer fails. It also must be imported in data/backends/registry.ts with `satisfies BackendKnowledgeFile` (the shared/backendData.ts type) and listed in BACKEND_DATA_FILES, which api/cwf/__tests__/backendDataRegistry.test.ts pins to the git listing. Neither registry.ts nor shared/backendData.ts is in SHARED SURFACES.

If the lane instead fills the required fields, superset enters knowledgeBackendIds() (:153, "index order"; index.json ids = armes, superset, system, ...). Every caller is listed below with its change. The card's "no families" covers ONLY the first two.

- evalGate.ts:131 TOOL_MIRROR_KIND_IDS uses declaresFamily. No families → no-op. OK.
- evalGate.ts:377 uses declaresGateStage(b,'referential'). The gate block is REQUIRED; if it is true, superset's tool_category enters. Not a no-op unless gate is false.
- governance.ts:354 (card cites it). Not re-read; covered by declaresFamily.
- reference/kinds.ts:256 flatMaps declared kinds. No-op only if kinds is empty, which the schema forbids (min 1). CONFLICT.
- reference/referenceData.ts:142 REFERENCE_INSTANCES = knowledgeBackendIds().flatMap(referenceInstancesFor), which seeds superset instances from its floor, toolGraph and glossary. NOT a no-op: SEED ROWS.
- reference/referenceData.ts:159 referenceCatalogNamesFor(superset) adds names. NOT a no-op.
- selfSeedReconciler.ts:117 REFERENCE_DOMAINS maps EVERY id to a domain, which creates a `superset.reference` seed domain. NOT a no-op: a DB write path.
- selfSeedReconciler.ts:120 METRIC_REGISTRY_DOMAINS: no-op only if seeds.metricRegistry is empty.
- scripts/seedRules.ts:72 names `superset.reference`. NOT a no-op.
- reference/backendTrust.ts:65 maps each id to its trust: superset gains a data-declared trust tier. NOT a no-op; it may conflict with any existing superset trust source.
- knowledge/backends/superset/authorityText.ts:28 filters on trust.tier === SYSTEM_OF_RECORD. Changes PROMPT BYTES if superset declares system_of_record.
- replay/groundingSlice.ts:117 maps every id and returns FLOOR for a non-flat backend (:71). An extra entry; bytes of the grounding set TBD.
- api/admin/replay.ts:237 resolveBackendAuthorityFor(knowledgeBackendIds()) gains superset.
- backendKnowledge.ts:180 declaredZoneBlindSpots: no-op only if the floor has no zoned blind spots.
- Index-[0] consumers stay armes (armes precedes superset in index.json): flatBackendFixture.ts:16, metricVocabFixture.ts:31, scripts/verifyReadySignal.ts:28, scripts/verifyRules.ts:37. OK.
- DbKnowledgeProvider :167/:174/:196/:239/:312/:357 read declaresFlatPack. OK only if declaresFlatPack gains the 'flat' test.

Smallest change to GREEN: do NOT put the pack mode in data/backends/<id>/knowledge.json. Declare it where the index already declares per-backend routing facts, e.g. `data/backends/index.json` → `"packs": { "superset": "provider" }`, or a new per-backend file kind that is NOT `knowledge`. Then knowledgeBackendIds() and KNOWLEDGE are untouched by construction, and "declares any pack" = declaresFlatPack(b) || index.packs[b] !== undefined. Add registry.ts and shared/backendData.ts to SHARED SURFACES if a new file kind is chosen.

### (c) BYTES — byte-identical. CONFIRMED.

    pack.ts:20  export function buildSupersetPack(query: string, source: DerivedPackSource = dbKnowledgeProvider): string {
    pack.ts:21      const { injected } = source.getDomainContext(query, { backends: ['superset'] });
    pack.ts:22      return injected;
    assemble.ts:49  function buildBackendPack(backend: BackendId, ctx: PromptContext, source: DerivedPackSource, lab?: LabKnowledge): string {
    assemble.ts:55  case 'superset':
    assemble.ts:56      return buildSupersetPack(ctx.query ?? '', source);
    assemble.ts:64  if (declaresFlatPack(backend)) return source.getDomainContext(ctx.query ?? '', { backends: [backend] }).injected;

Side by side, for backend === 'superset':
- buildSupersetPack(ctx.query ?? '', source) → source.getDomainContext(ctx.query ?? '', { backends: ['superset'] }).injected
- data arm → source.getDomainContext(ctx.query ?? '', { backends: [backend] }).injected

`source` is a REQUIRED parameter of buildBackendPack, so the default `dbKnowledgeProvider` is never reached from assemble.ts. The two expressions are identical for every source. The only other caller of buildSupersetPack is a comment in packBackendGeneric.test.ts:161.

BUT the premise claim "assemble.ts names ONE backend by literal at the pack switch" is REFUTED:

    $ git grep -n -E "case '[a-z-]+':" origin/master -- api/cwf/_lib/prompt
    api/cwf/_lib/prompt/assemble.ts:55:        case 'superset':
    api/cwf/_lib/prompt/assemble.ts:57:        case 'machine-knowledge-base':

machine-knowledge-base/pack.ts carries `const BACKEND_ID = 'machine-knowledge-base'` and a code PROTOCOL_PREAMBLE, so it is NOT the data arm's call. ORDER 5's count grep (`case 'superset'`) cannot see it. The card must name it as a second literal it LEAVES, with a reason and a register item, as it does for HAND_PACKED_BACKENDS. Otherwise "moves the backend-name literals to data" is false at the switch it edits.

### (d) ENTRY vs FLOOR — YES, the bytes can change. The card must separate the two.

    compose.ts:46-48  function byKind(rules, kindId) { return rules.filter((r) => r.kind_id === kindId); }   // order-preserving, no sort
    compose.ts:89     const entryNode = byKind(rules, toolGraphNodeKindId(backendId)).find((r) => (r.payload as { role?: string }).role === 'entry');
    RuleStoreRepository.ts:575-583  getPublishedRules: .select('*').eq('status', PUBLISHED).in('backend_id', backendIds);   // NO .order(...)
    DbKnowledgeProvider.ts:156 / :266  rules = await this.repo.getPublishedRules([backend]);

Row order is Postgres heap order, which is unspecified. ORDER 0 publishes a SECOND `role:'entry'` row (getFactoryList). From then on find() returns whichever entry row comes first, so toolGraphEntry, the rendered flat slice and the prompt bytes can differ BETWEEN TURNS with no code change. The FALSIFIER flags that as a stray difference, or it flaps. It also changes what the sequencing prose means (data/backends/armes/knowledge.json:311 names getFactoryLines as the tool to call FIRST).

Smallest change: separate "entry point" (compose, singular) from "availability floor" (routing, plural) in the data. Add an optional `floor: z.boolean().optional()` to ToolGraphNodeSchema (coreSchemas.ts:41-47, which is `.strict()`, so the field MUST be added there). The routing floor then reads rows with role === 'entry' OR floor === true, and ORDER 0 publishes getFactoryList with role 'resolver' (or 'other') plus floor: true. compose.ts:89 is untouched and keeps exactly one entry. As a belt, make compose deterministic by sorting the entry candidates by key. 'getFactoryLines' < 'getFactoryList', so today's entry is preserved.

### (e) DATA — UNMEASURED

    mcp__supabase-ro__execute_sql → [guard-mcp] BLOCKED · GM-1 · mcp__supabase-ro__execute_sql — a write on the MCP surface

scripts/roQuery.ts is a library with no CLI. Driving execute_sql through an ad-hoc script would route around the GM-1 refusal, so it was not done. evidence:rows is neither confirmed nor refuted by this window. Repository-side corroboration only: data/backends/armes/knowledge.json:426-427 declares the one toolGraph node with role "entry", tool getFactoryLines; getFactoryList appears nowhere in that file. That matches the card's "no row names getFactoryList" at the seed level only.

### (f) UI

    RoutingTab.tsx:629-636
      {reference && (
        <div className="flex items-center gap-1 flex-wrap">
          <span className="text-xs uppercase tracking-wider text-muted-foreground shrink-0">ALWAYS_INCLUDE</span>
          {reference.alwaysInclude.map((tool) => (
            <Badge key={tool} variant="secondary" className="font-mono text-xs">{tool}</Badge>
    $ git grep -n -E "getFactoryList|getFactoryLines|alwaysInclude|ALWAYS_INCLUDE" origin/master -- src   (non-test hits)
      RoutingTab.tsx:195 (comment), :631, :632 · stageCardCoverage.ts:174 · stagesRegistry.ts:248 · AdminPreview.tsx:303, :341, :663, :679
      · adminService.ts:377-378 · ReplayTab.tsx:1088 (comment) · GovernanceTab.tsx:1325 (placeholder 'getFactoryLines')
      · lib/params/chatSurface.ts:368, lib/toolEvidence.ts:59 (comments)

Missed by ORDER 3:
- AdminPreview.tsx:341 hard-codes the floor INTO offeredToolNames (`['getFactoryList','getFactoryLines', ...]`); :663 and :679 too.
- GovernanceTab.tsx:1325 placeholder.
- ReplayTab.tsx:1088 text names ALWAYS_INCLUDE.
- src/components/admin/__tests__/routingTab.test.tsx:39 fixture `alwaysInclude: [...]` breaks on the shape change.

Can the owner publish a tool_graph_node row through the gate today? YES, as far as code can show. "Locked" pins a CORE kind's FIELD STRUCTURE (governance.ts:539-547, "CORE kind field structure is locked to code and cannot be edited"), not instance creation. The path is GovernanceTab.tsx (the Rules tab; new-rule form with a kind select, :1316) → POST /api/admin/rules/[id] {action:'publish'} (super_admin, [id].ts:107-121) → svc.publish → the eval gate.

The gate then applies:
- schema: ToolGraphNodeSchema, strict.
- GATE-REF-1 (evalGate.ts:137-141): the key must equal payload.tool.
- referential RULE 31 (:239-243): "every declared tool_graph_node must be reachable through some category (or ALWAYS_INCLUDE)".

CIRCULARITY the card does not address: ORDER 1 makes evalGate reachability read "the data floor". If that floor is read over the CANDIDATE, a new entry row certifies its OWN reachability and RULE 31 becomes vacuous for entry rows. If it is read over the published set, reachability rests on categories alone. The code floor puts getFactoryList in a category (toolCategories.ts:505-506), but the PUBLISHED category is UNMEASURED (see e). The same self-exemption hits reconcileToolGovernance.isPhantomTool (:168-169), where the floor exempts a tool from the phantom check. A data floor lets any published entry row exempt a tool that is not in the live mirror. The card must rule that the floor is NOT a reachability or phantom exemption for rows of the same candidate, and that ORDER 0's row must be category-reachable.

### (g) TESTS

    $ git grep -l -E "getFactoryList|getFactoryLines" origin/master -- '*__tests__*' '*.test.ts' '*.test.tsx'   → 66 paths

This equals the card's 66. It includes 3 NON-test data fixtures that the pathspec catches: api/cwf/__tests__/__fixtures__/armesFloorAnchor.json, __fixtures__/phase1-prompt-tools.txt, routing/__tests__/fixtures/liveLearnCorpus.json. Many of the 66 use the names as TOOL-RESULT payload data with no floor dependence (toolResult.test.ts, turnLabelMap*.test.ts, chatShellToolEvidence, toolEvidence, entityDiscovery*, catalogSync, BackendToolsRepository, counterOneSource, proseRenderParity, MessageChartContent, outageTruthSurface). ORDER 4's "every test ... keeps passing through a fixture rule set ... or is re-pointed" over-scopes. Limit it to tests that assert the FLOOR:
- routingCuration, replayRouting, stageContextSlice, routeKeywordLayer, routerAbLens, routeShadowSeam, routingFloorBackend
- floorWidens, backendAwareFilter, routeGov*, deriveRouteDrafts (:207 `expect([...FLOOR].sort()).toEqual(['getFactoryLines','getFactoryList'])`)
- promptSnapshot / phase1-prompt-tools.txt, routingTab.test.tsx

Fixture with PUBLISHED entry rows for routing:

    $ git grep -l -E "role: *'entry'|\"role\": *\"entry\"|toolGraphNodeKindId" origin/master -- '*__tests__*' '*__fixtures__*'
    api/cwf/__tests__/kinds.test.ts · api/cwf/__tests__/reconcileToolGovernance.test.ts · api/cwf/_lib/knowledge/graphKb/__tests__/graphKb.test.ts

None of these is a routing helper, so the card MUST order a new fixture. Its "fixture rule set" wording should name it as new, with its file under SHARED SURFACES.

### (h) 12.7 — NONE of ORDERS 1–3 is built

    $ git grep -n -E "floorSource|floorCount|entryFloor|entryTools|packMode|pack: *'provider'|declaresPack|declaresAnyPack|\"pack\"" origin/master -- api src shared scripts data
    (no output)
    $ git grep -n -E "role *=== *'entry'" origin/master -- api src shared scripts
    api/cwf/_lib/knowledge/flat/compose.ts:89 (compose only) + 2 comments

Naming note: the trace already carries a DIFFERENT "floor", the category floor-widen (stageTools.ts:684/733/796/820 `floorReason`, `ctx.routingFloor`). The new floorSource/floorCount must be named so they cannot be read as that floor, e.g. entryFloorSource/entryFloorCount.

## STEP 3 — VERDICT: RED

Defects, each with the change that makes it GREEN:

1. CP-3 (card gate, RED). The two prose lines under the second `## PREMISE` ("THE PROBLEM, in plain words…", "TRAP NAMED (12.2)…") carry no instrument. Prefix each with `MEASURED: <the anchor block it rests on>` or move it under a non-PREMISE heading.
2. backendKnowledge.ts:48-98 + :130-132. ORDER 2's superset knowledge.json (`pack:'provider'`, no kinds) FAILS the strict schema (`kinds.min(1)`; unknown `pack` key; required labels, floor, seeds, trust) and throws at module load. Filling the fields instead puts superset into knowledgeBackendIds(), which is NOT a no-op for referenceData.ts:142/:159, selfSeedReconciler.ts:117, seedRules.ts:72, backendTrust.ts:65, authorityText.ts:28 (prompt bytes) or evalGate.ts:377. FIX: declare the pack mode OUTSIDE the knowledge file (index.json `packs`, or a separate file kind) so KNOWLEDGE is untouched. If a new file kind is chosen, add data/backends/registry.ts + shared/backendData.ts to SHARED SURFACES.
3. assemble.ts:57 `case 'machine-knowledge-base'`. A second backend literal at the same switch is not named, and the ORDER 5 grep cannot see it. FIX: name it as a literal LEFT, with reason and register item, and widen the ORDER 5 grep to `case '[a-z-]+':` under api/cwf/_lib/prompt.
4. compose.ts:89 + RuleStoreRepository.ts:575-583 (no ORDER BY). ORDER 0's second role:'entry' row makes the composed entry non-deterministic and changes prompt bytes. FIX: a separate `floor: true` flag on ToolGraphNodeSchema (coreSchemas.ts:41). The floor reads role==='entry' || floor===true; ORDER 0 publishes getFactoryList as role 'resolver' plus floor:true; compose is untouched (optionally sorted by key).
5. toolCategories.ts:1212-1224, :1418, :1944, :2015, :2116; routerAbLens.ts:56-58. The floor sites are sync and backend-less, and the card does not say how the data floor reaches them. FIX: resolve the floor once per turn in stageTools from the serving backends and pass it IN as data (a RoutingCoreInput field + a filterToolsByMessage parameter, as `categories` is today). Name what reachableToolNames() (platform-wide) and the routerAbLens module constant read.
6. evidence:always is incomplete. MISSING: evalGate.ts:200 (the card's :240 is a comment), runRouteDerivation.ts:167 (→ catalogSync.autoDeriveRouteDrafts, admin stage-drafts), scripts/reconcileToolGovernance.ts:113, scripts/genArchitectureFacts.ts:258, scripts/runRouteShadowLens.ts:202. FIX: add them to evidence:always and SHARED SURFACES (scripts/ is absent there).
7. evalGate.ts:200-243 + reconcileToolGovernance.ts:168-169. A data floor becomes a self-exemption: an entry row makes its own tool "reachable" and "non-phantom". FIX: rule that floor membership is NOT a reachability or phantom exemption for the candidate's own rows, and require ORDER 0's row to be category-reachable.
8. ORDER 3 misses AdminPreview.tsx:341/:663/:679, GovernanceTab.tsx:1325, ReplayTab.tsx:1088 and the routingTab.test.tsx:39 fixture. FIX: list them.
9. ORDER 4 over-scopes (66 paths include 3 data fixtures and many payload-only tests) and assumes a routing fixture with entry rows that does not exist. FIX: restrict to floor-asserting tests (named in g) and order the new fixture by name.
10. (minor) The trace field names floorSource/floorCount collide with the existing routing floor (floorReason/ctx.routingFloor). FIX: entryFloorSource/entryFloorCount.

Still dark: (e) production domain_rules rows, and whether the published tool_category carries getFactoryList. Both are UNMEASURED because execute_sql is refused by guard GM-1 in this window.

END · SCOUT-STATUS-REVIEW-CARD-ALWAYS-INCLUDE-TO-DATA-S160-1-v1
