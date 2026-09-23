<!-- relay-audit: v1 kind=notice -->
ORDER-SCOUT-REVIEW-CARD-ARMES-G2-KNOWLEDGE-AS-DATA-S156-1-v1

LANE: scout (scout window 1)
fanout: personalized (one lane, one body)
FROM: Architect, S156, bridge clock 2026-09-23T01:37Z
OWNER APPROVAL: OWNER-RULING-S153-NO-ARMES-HARDCODE-1; S156 plan approval "onay" 2026-09-23 04:30 TSI.
NO POLL OR CRON TASK. Bekleme dongusu yok. When your status is written, stop.
GATE-NOTE: the card below was checked on the bridge with node --import tsx scripts/cardPreflight.ts --check: GREEN on all eleven checks. That is a GRAMMAR verdict, not a review (12.1). This notice itself is expected to refuse CP-1 (kind=notice).
GRAFT: code context from graft first; your status carries a GRAFT line.
WHAT: first review of CARD-ARMES-G2-KNOWLEDGE-AS-DATA-S156-1-v1 (item 58, G2 knowledge to data), NEW subject, no gate lift. Card body = the bytes after the BEGIN marker line up to and including the final newline before the END marker line; sha256 = 6a227a9ee2dd31605ed085f4915764b50760e202bfb0cb0b99bc1896c7e58634.
PARALLEL CARD: CARD-ARMES-G1B-REMAINDER-S156-1-v1 (AG-4) goes to the other scout at the same time; the two file sets are meant NOT to overlap. Attacking that boundary is part of your review.

## PREMISE
MEASURED: 2026-09-23T01:37Z, Architect bridge, sha256sum of the card file as embedded below.
SELF-INVALIDATION: dies if a v2 of the card is posted.
ON-DISAGREEMENT: your reading wins; print both.

## STEPS
1. Run cardPreflight --check on the card bytes and mail-wait --read on this order; print any refusal verbatim; if they disagree, print both.
2. Read each evidence fence against origin/master and the live DB (read-only): does each quote its source's bytes? Then attack: ORDER 2's claim that removing the code seeds writes no DB row (read the self-seed reconciler and the kind registry seeding path: does removing a KIND_REGISTRY row or a SEED_DOMAINS entry ever archive, delete or rewrite a present row?); ORDER 3's byte-identity claim for the generic composer (what in composeArmesContext is NOT a pure function of published rows?); ORDER 4's outage change against the grounding check (can any path still turn an absent slice into a zero claim?); ORDER 5 (where does GraphKbReader read today?); ORDER 6's literal rule key; whether the ORDER 0 file set misses an importer; whether any functionality is removed (owner rule: none may be).
3. Verdict: first line `ADVERSARY-VERDICT: GREEN|RED card=CARD-ARMES-G2-KNOWLEDGE-AS-DATA-S156-1-v1 sha256=<sha256>`, then each defect with the change that makes it GREEN, and which may ride as edits.
REPLY (on the bus): SCOUT-STATUS-REVIEW-CARD-ARMES-G2-KNOWLEDGE-AS-DATA-S156-1-v1. If the bus write is refused, print the whole status in your window.
FORBIDDEN: read-only. No status post on any PR, no edit, no DB write, no poll task, no cron. Never print an environment value.

=== BEGIN CARD ===
<!-- relay-audit: v1 kind=card -->
CARD-ARMES-G2-KNOWLEDGE-AS-DATA-S156-1-v1

LANE: AG-1 (fresh window: one card per window)
fanout: personalized (one lane, one body)
MEASURED-AT: 2026-09-23T01:36Z (bridge clock, date -u in the command that wrote this file)
OWNER RULING: OWNER-RULING-S153-NO-ARMES-HARDCODE-1 (every backend equal; ARMES is one backend; no hard-coded ARMES in code). S156 plan approval "onay" 2026-09-23 04:30 TSI.
ADVERSARY GATE: NEW SUBJECT. Goes to the scout first (ORDER-SCOUT-REVIEW-CARD-ARMES-G2-KNOWLEDGE-AS-DATA-S156-1-v1); reaches AG-1 only with a GREEN verdict row.
SCOPE: item 58 G2 = the knowledge layer and EVERY file that imports its backend-named symbols (list in ORDER 0). G1b (CARD-ARMES-G1B-REMAINDER-S156-1, AG-4, in parallel) takes the category floor, the replay sample, the admin tabs outside your set, src/dev/ and vercel.json; the two file sets do not overlap. G3 (tests, comments, diagrams you do not touch) and G4 (the CI gate) come after you land.
BRANCH: phase/armes-g2-knowledge-as-data-s156-1 off origin/master · PUSH early · REPORT docs/relay/ARMES-G2-KNOWLEDGE-AS-DATA-S156-1-AG1-report.md · PR: yes, non-draft.
GRAFT: take code context from graft first; slip and report carry a GRAFT line. graft may index a stale local tree: line anchors from git show on origin/master.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| master at cut time | MEASURED: GitHub API commits/master, Architect bridge, 2026-09-23T01:28Z | master |
| the knowledge content of that backend already lives as published governed rows | MEASURED: execute_sql on project fjbrkimwvtpwoxhziidh, Architect Supabase MCP, 2026-09-23 in the 01:25Z-01:35Z window | rows |
| its kinds already live as rule_kinds rows | MEASURED: execute_sql, same project, 2026-09-23 in the 01:25Z-01:35Z window | kindrows |
| a per-backend kind-id builder pattern already exists in code | MEASURED: git grep on origin/master, Architect bridge, 2026-09-23T01:36Z | builders |
| the remaining kind ids are literals naming one backend | MEASURED: git grep on origin/master, Architect bridge, 2026-09-23T01:36Z | literals |
| the composer, outage floor and prompt pack branch on that backend by name | MEASURED: git grep on origin/master, Architect bridge, 2026-09-23T01:36Z | branches |
| the shared constants name that backend | MEASURED: git grep on origin/master, Architect bridge, 2026-09-23T01:36Z | consts |
| self-seed writes only absent rows | MEASURED: git grep on origin/master, Architect bridge, 2026-09-23T01:36Z | absence |

```evidence:master
1ca28ede61588ff542764cf3f1375568c94436ae
```

```evidence:rows
MEASURED: select backend_id, kind_id, status, count(*) from domain_rules group by 1,2,3 (published rows of backend armes)
armes.blind_spot 2 | armes.entity_alias 8 | armes.glossary_term 10 | armes.metric_definition 4 | armes.metric_registry 3 | armes.persona_fragment 1 | armes.routing_hint 1 | armes.tool_annotation 150 | armes.tool_category 12 | armes.tool_doc 1 | armes.tool_format_rule 4 | armes.tool_graph_node 5 | armes.zone 4
```

```evidence:kindrows
MEASURED: select kind_id from rule_kinds where kind_id like 'armes.%' (45 rule_kinds rows in total)
armes.blind_spot,armes.entity_alias,armes.gateway_tool_policy,armes.glossary_term,armes.metric_definition,armes.metric_registry,armes.persona_fragment,armes.routing_hint,armes.tool_annotation,armes.tool_category,armes.tool_doc,armes.tool_format_rule,armes.tool_graph_node,armes.zone
```

```evidence:builders
1ca28ede61588ff542764cf3f1375568c94436ae:api/cwf/_lib/knowledge/reference/kinds.ts:282:export function toolDocKindId(backendId: string): string {
1ca28ede61588ff542764cf3f1375568c94436ae:api/cwf/_lib/knowledge/reference/kinds.ts:317:export function gatewayToolPolicyKindId(backendId: string): string {
1ca28ede61588ff542764cf3f1375568c94436ae:api/cwf/_lib/knowledge/reference/kinds.ts:364:export function toolCategoryKindId(backendId: string): string {
1ca28ede61588ff542764cf3f1375568c94436ae:api/cwf/_lib/knowledge/reference/kinds.ts:382:export function toolAnnotationKindId(backendId: string): string {
1ca28ede61588ff542764cf3f1375568c94436ae:api/cwf/_lib/knowledge/reference/kinds.ts:462:export function metricRegistryKindId(backendId: string): string {
```

```evidence:literals
1ca28ede61588ff542764cf3f1375568c94436ae:api/cwf/_lib/knowledge/reference/kinds.ts:23:    ZONE: 'armes.zone',
1ca28ede61588ff542764cf3f1375568c94436ae:api/cwf/_lib/knowledge/reference/kinds.ts:24:    BLIND_SPOT: 'armes.blind_spot',
1ca28ede61588ff542764cf3f1375568c94436ae:api/cwf/_lib/knowledge/reference/kinds.ts:26:    METRIC_DEFINITION: 'armes.metric_definition',
1ca28ede61588ff542764cf3f1375568c94436ae:api/cwf/_lib/knowledge/reference/kinds.ts:27:    TOOL_FORMAT_RULE: 'armes.tool_format_rule',
1ca28ede61588ff542764cf3f1375568c94436ae:api/cwf/_lib/knowledge/reference/kinds.ts:39:    ENTITY_ALIAS: 'armes.entity_alias',
1ca28ede61588ff542764cf3f1375568c94436ae:api/cwf/_lib/knowledge/reference/kinds.ts:40:    GLOSSARY_TERM: 'armes.glossary_term',
1ca28ede61588ff542764cf3f1375568c94436ae:api/cwf/_lib/knowledge/reference/kinds.ts:41:    PERSONA_FRAGMENT: 'armes.persona_fragment',
1ca28ede61588ff542764cf3f1375568c94436ae:api/cwf/_lib/knowledge/reference/kinds.ts:42:    ROUTING_HINT: 'armes.routing_hint',
```

```evidence:branches
1ca28ede61588ff542764cf3f1375568c94436ae:api/cwf/_lib/knowledge/DbKnowledgeProvider.ts:53:export const HAND_PACKED_BACKENDS: ReadonlySet<BackendId> = new Set<BackendId>(['armes', 'superset']);
1ca28ede61588ff542764cf3f1375568c94436ae:api/cwf/_lib/knowledge/DbKnowledgeProvider.ts:296:        if (backend === 'armes') return composeArmesContext(rules);
1ca28ede61588ff542764cf3f1375568c94436ae:api/cwf/_lib/knowledge/DbKnowledgeProvider.ts:370:    getArmesGroundingSlice(): ArmesGovernedSlice | null {
1ca28ede61588ff542764cf3f1375568c94436ae:api/cwf/_lib/knowledge/StaticKnowledgeProvider.ts:37:        if (scope.backends.includes('armes')) {
1ca28ede61588ff542764cf3f1375568c94436ae:api/cwf/_lib/knowledge/StaticKnowledgeProvider.ts:38:            injectedParts.push(renderArmesCriticalSlice());
1ca28ede61588ff542764cf3f1375568c94436ae:api/cwf/_lib/prompt/assemble.ts:52:        case 'armes':
1ca28ede61588ff542764cf3f1375568c94436ae:api/cwf/_lib/prompt/assemble.ts:53:            return buildArmesPack(ctx.query ?? '');
1ca28ede61588ff542764cf3f1375568c94436ae:api/cwf/_lib/prompt/assemble.ts:87:export function buildSystemPrompt(ctx: PromptContext, activeBackends: BackendId[] = ['armes'], lab?: LabKnowledge, segments?: PromptSegments): string {
1ca28ede61588ff542764cf3f1375568c94436ae:api/cwf/_lib/knowledge/selfSeedReconciler.ts:111:    { domain: 'armes.reference', backendId: 'armes', instances: REFERENCE_INSTANCES },
1ca28ede61588ff542764cf3f1375568c94436ae:api/cwf/_lib/knowledge/selfSeedReconciler.ts:173:    { domain: 'armes.metric_registry', backendId: 'armes', instances: ARMES_METRIC_REGISTRY_SEEDS },
```

```evidence:consts
1ca28ede61588ff542764cf3f1375568c94436ae:shared/dbConstants.ts:1560:export const ARMES_ROUTING_KIND_IDS = {
1ca28ede61588ff542764cf3f1375568c94436ae:shared/dbConstants.ts:1680:export const TOOL_GRAPH_NODE_KIND_ID = 'armes.tool_graph_node';
1ca28ede61588ff542764cf3f1375568c94436ae:shared/dbConstants.ts:1700:export const DEFAULT_BACKEND_ID = 'armes';
```

```evidence:absence
1ca28ede61588ff542764cf3f1375568c94436ae:api/cwf/_lib/knowledge/selfSeedReconciler.ts:11: * ABSENCE-ONLY LAW: a row the owner has published OR archived is NEVER
```

## PREMISE
MEASURED: the anchors above.
UNMEASURED by the Architect: whether rendering today's published rows through one backend-generic composer is byte-identical to composeArmesContext for every query shape (ORDER 3 measures it); whether GraphKbReader already reads tool_graph_node rows DB-first or only the code TOOL_GRAPH (ORDER 5 measures it); which superset gateway_rule seed keys are referenced by literal from evalGate (ORDER 6 measures it).
SELF-INVALIDATION: dies if any anchor reads differently at your head (then STOP and print both).
ON-DISAGREEMENT: YOUR READING WINS: print both values, continue with yours.

## FALSIFIER
With the DB reachable, for every recorded live turn replayed at your head: the system prompt bytes, promptRev, the offered tool set and the grounding verdict equal master's. Any difference is a STOP with the turn id, except the declared outage change of ORDER 4.

## ORDERS
0. Your file set is every non-test file under api/, src/, shared/, scripts/ that imports or names: backends/armes/*, composeArmes, pickArmesGoverned, ArmesGovernedSlice, getArmesGroundingSlice, renderArmesCriticalSlice, buildArmesPack, HAND_PACKED_BACKENDS, RECONCILE_BACKEND, ARMES_METRIC_REGISTRY_SEEDS, ARMES_ROUTING_KIND_IDS, TOOL_GRAPH_NODE_KIND_ID, DEFAULT_BACKEND_ID, or a KIND_IDS member whose value names a backend; plus scripts/seedRules.ts, scripts/verifySupersetGatewayLive.ts and scripts/jobs/superset-vis-1-routing-hint.json; plus the tests of those files. NOT yours (G1b, AG-4): api/cwf/_lib/toolCategories.ts, api/cwf/_lib/replay/toolCorpusSample.ts, src/components/admin/stagesRegistry.ts, the admin tabs that do not import the symbols above, src/dev/, vercel.json. Print the list from git grep at your head first.
1. Kind ids: every family in the literals anchor gets a builder of the same shape as the builders anchor (family + backend id from data). KIND_IDS keeps no value that names a backend. ARMES_ROUTING_KIND_IDS and TOOL_GRAPH_NODE_KIND_ID become builder calls or family predicates (the is*KindId shape already in shared/dbConstants.ts). Kind ids stored in the DB do not change: no migration, no row rename.
2. Seeds: the code copies of that backend's knowledge (backends/armes/*: zones, blind spots, glossary, metrics, formats, tool graph, persona text, sequencing rule; referenceData's instances for it; ARMES_METRIC_REGISTRY_SEEDS; its KIND_REGISTRY rows; its SEED_DOMAINS entries) are removed. The rows already exist (rows, kindrows anchors) and self-seed never rewrites a present row (absence anchor), so no DB row is written, archived or deleted. Prove it: run the self-seed reconciler in dry-run against the live DB at base and at head and print both counts of rows it would write: head must be 0 new rows.
3. Composer: composeArmesContext becomes one backend-generic composer over published rows by family, reached for any backend whose published rows include those families; HAND_PACKED_BACKENDS loses that backend. pickArmesGoverned / ArmesGovernedSlice / getArmesGroundingSlice become a per-backend governed slice (map keyed by backend id); stageStream, groundingCheck, grounding/types, replay/groundingSlice and api/admin/replay read it by backend. The persona fallback reads the persona row; when no persona row exists, no persona text is injected (a published row exists today). Byte-identity: render every recorded query shape at base and at head against the live rows; print the sha256 of both; they must match.
4. Outage floor: StaticKnowledgeProvider carries no backend-specific text. DECLARED CHANGE: when the DB read fails, a backend's governed section is ABSENT with its reason (the same shape the derived pack already reports), and the grounding check treats an absent slice as UNMEASURED, never as zero (empty is not zero). Pin it with a test.
5. Tool graph: GraphKbReader and graphKb/relationships read tool_graph_node rows by backend. If it already reads rows DB-first, delete the code fallback; if it reads only code, wire the row read; print which it was.
6. Superset knowledge text that names another backend (gatewayProtocol, routingHints, composeSuperset, the superset job hint json) states authority from backend_authority data, not by name. evalGate's literal rule key: if a site cannot drop the literal without a DB key change, STOP for that site only (a DB change goes to the Gemini operator, never to you), finish the rest, and name it in the slip.
7. prompt/assemble: no default backend list and no per-backend case; buildArmesPack and prompt/backends/armes/ are gone; every backend's pack comes through the one generic path. Print promptRev at base and at head: equal is pass. Eval-canary is frozen: if any workflow would fire it, STOP and report; no spend fires.
8. reconcileToolGovernance: the backend is a required argument from the caller, no constant. Its CLI in scripts/ takes --backend with no default.
9. Tests: update the tests of your file set in the same commits (neutral fixture backend ids, never a real vendor name). New tests: (i) a second flat backend with the same families published composes through the same composer; (ii) outage yields absent + UNMEASURED grounding, never a zero claim; (iii) kind-id builders round-trip the live ids byte-identically. Plant a fault (restore one per-backend branch) and show a test go red.
10. Count, case-sensitive: at your head `git grep -n -E "armes|Armes|ARMES" -- <your file set>` prints no code line; comments in files you touched are cleaned too. Print the command and output. Anything left, name it with the reason.
11. npm run build (all five gates) + full suite + typecheck:api locally; open the PR; slip SLIP-ARMES-G2-KNOWLEDGE-AS-DATA-S156-1 with branch, full head sha, PR number, CI runs by full sha, what is still dark. Stop.

## SHARED SURFACES
public/architecture/ narrative tabs (stagesRegistry.ts is G1b's: do not edit it), and a reseal if doc-drift asks; merge origin/master, then reseal, in one commit.

## DECISION RIGHTS
AG-1 designs inside "backend from data, never from code". A site needing a DB change: STOP for it, finish the rest. The Architect decided: no row rename, no migration; outage = absent + UNMEASURED; the superset hand pack stays in HAND_PACKED_BACKENDS in this card (F-S156-SUPERSET-HAND-PACK-PRIVILEGE-1 carries it to its own card).
FORBIDDEN: no backend, vendor or tenant name added in code; no removal of a user-visible function; no DB write; no poll task, no cron; never print an environment value; never merge your own PR.

END · CARD-ARMES-G2-KNOWLEDGE-AS-DATA-S156-1-v1
=== END CARD ===

END · ORDER-SCOUT-REVIEW-CARD-ARMES-G2-KNOWLEDGE-AS-DATA-S156-1-v1
