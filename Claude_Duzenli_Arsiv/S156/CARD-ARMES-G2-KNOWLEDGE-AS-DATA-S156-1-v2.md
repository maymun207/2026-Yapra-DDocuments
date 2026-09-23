<!-- relay-audit: v1 kind=card -->
CARD-ARMES-G2-KNOWLEDGE-AS-DATA-S156-1-v2

LANE: AG-1 (fresh window: one card per window)
fanout: personalized (one lane, one body)
MEASURED-AT: 2026-09-23T02:30Z (bridge clock, date -u in the command that wrote this file)
SUPERSEDES: CARD-ARMES-G2-KNOWLEDGE-AS-DATA-S156-1-v1 (scout RED, SCOUT-STATUS-REVIEW-CARD-ARMES-G2-KNOWLEDGE-AS-DATA-S156-1-v1, bus 2026-09-23T01:57:31Z). Re-cut on two owner rulings made after that verdict; D1 to D9 each answered in the ORDER named beside it.
OWNER RULING: OWNER-RULING-S153-NO-ARMES-HARDCODE-1. OWNER-RULING-S156-DATA-BACKENDS-1 ("onay data/backends", 2026-09-23 05:17 TSI): backend-specific knowledge floors and seeds leave code for data/backends/<backend-id>/, loaded by id; no backend name in code. OWNER-RULING-S156-FAIL-CLOSED-1 ("onay fail-closed", 05:25 TSI): when CWF cannot read its governed knowledge for a backend in the turn, it gives no data answer for that turn and says so; the data files are the un-archivable copy of law rows, the seed and the eval input, never an outage answer source.
ADVERSARY GATE: back to the scout that wrote the v1 RED (ORDER-SCOUT-REVIEW-CARD-ARMES-G2-KNOWLEDGE-AS-DATA-S156-1-v2); reaches AG-1 only with a GREEN verdict row.
SCOPE: item 58 G2. G1b (AG-4, in parallel) owns the admin tabs outside this set, src/dev/ display values, the measured tool sample and vercel.json. G2c (after you land) owns api/cwf/_lib/toolCategories.ts, its floor accessors, their consumers and CANONICAL_METRIC_TOOLS (scout D9: pinned to G2c, do not edit it).
BRANCH: phase/armes-g2-knowledge-as-data-s156-1 off origin/master · PUSH early · REPORT docs/relay/ARMES-G2-KNOWLEDGE-AS-DATA-S156-1-AG1-report.md · PR: yes, non-draft.
GRAFT: take code context from graft first; slip and report carry a GRAFT line. graft may index a stale local tree: line anchors from git show on origin/master.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| master at cut time | MEASURED: GitHub API commits/master, Architect bridge, 2026-09-23T01:28Z | master |
| the backend's published rows include the sequencing hint, an entry-role graph node and a persona row | MEASURED: execute_sql on project fjbrkimwvtpwoxhziidh, Architect Supabase MCP, 2026-09-23T02:30Z | keys |
| the backend's display name in data differs from the label its knowledge header prints | MEASURED: execute_sql, same project, 2026-09-23T02:30Z | label |
| the composer, outage arm and prompt default branch on that backend by name | MEASURED: git grep on origin/master, Architect bridge, 2026-09-23T02:30Z | branches |
| the grounding check takes its blind-spot floor from code | MEASURED: git grep on origin/master, Architect bridge, 2026-09-23T02:30Z | floor |
| the shared constants name that backend | MEASURED: git grep on origin/master, Architect bridge, 2026-09-23T02:30Z | consts |

```evidence:master
1ca28ede61588ff542764cf3f1375568c94436ae
```

```evidence:keys
MEASURED: published domain_rules of backend armes, kinds routing_hint, tool_graph_node, persona_fragment
routing_hint key=sequencing
tool_graph_node getFactoryLines role=entry | getDailyOeeValues role=metric | getScrapBarcodeList role=scrap | getDailyManualScrap role=scrap | getLineStopsReportForZones role=other
persona_fragment key=armes.analyst
```

```evidence:label
MEASURED: select id, display_name from backends where id='armes'
armes=ARMES — Kale Seramik MES
```

```evidence:branches
1ca28ede61588ff542764cf3f1375568c94436ae:api/cwf/_lib/knowledge/DbKnowledgeProvider.ts:53:export const HAND_PACKED_BACKENDS: ReadonlySet<BackendId> = new Set<BackendId>(['armes', 'superset']);
1ca28ede61588ff542764cf3f1375568c94436ae:api/cwf/_lib/knowledge/DbKnowledgeProvider.ts:296:        if (backend === 'armes') return composeArmesContext(rules);
1ca28ede61588ff542764cf3f1375568c94436ae:api/cwf/_lib/knowledge/StaticKnowledgeProvider.ts:37:        if (scope.backends.includes('armes')) {
1ca28ede61588ff542764cf3f1375568c94436ae:api/cwf/_lib/prompt/assemble.ts:52:        case 'armes':
1ca28ede61588ff542764cf3f1375568c94436ae:api/cwf/_lib/prompt/assemble.ts:87:export function buildSystemPrompt(ctx: PromptContext, activeBackends: BackendId[] = ['armes'], lab?: LabKnowledge, segments?: PromptSegments): string {
1ca28ede61588ff542764cf3f1375568c94436ae:api/cwf/_lib/knowledge/gate/evalGate.ts:466:    const isArmes = kind.backendId === 'armes';
```

```evidence:floor
1ca28ede61588ff542764cf3f1375568c94436ae:api/cwf/_lib/grounding/groundingCheck.ts:28:import { BLIND_SPOTS } from '../knowledge/backends/armes/blindSpots.js';
```

```evidence:consts
1ca28ede61588ff542764cf3f1375568c94436ae:shared/dbConstants.ts:1560:export const ARMES_ROUTING_KIND_IDS = {
1ca28ede61588ff542764cf3f1375568c94436ae:shared/dbConstants.ts:1680:export const TOOL_GRAPH_NODE_KIND_ID = 'armes.tool_graph_node';
1ca28ede61588ff542764cf3f1375568c94436ae:shared/dbConstants.ts:1700:export const DEFAULT_BACKEND_ID = 'armes';
```

## PREMISE
MEASURED: the anchors above.
UNMEASURED by the Architect, READ from the scout's primary-source readings (bus 2026-09-23T01:57:31Z): seedDomain claims a seed_state row whenever a domain fingerprint changes, and runSelfSeed has no dry-run mode (D1); getKindDef is read with no DB lookup in tenantPayloadLoader.ts:71, DbKnowledgeProvider.ts:244, api/admin/kinds.ts:56, api/admin/kind-drafts.ts:33 and the rollouts.ts:79 / governance.ts:105 fallbacks (D2); composeArmesContext has per-family code floors and render.ts prints the backend label in its header and on every zone line (D3); checkEmptyAsZero derives its vocabulary from the blind-spot floor and unionGroundingFloor guarantees a governed row can never remove a blind spot (D4); evalGate dispatches on the backend id at :466, its referential and behavioural stages and REQUIRED_MARKERS hold tenant literals (D5); promptRev hashes core segments only (D6); assemble.ts and StaticKnowledgeProvider keep superset arms, and the lab floor lever serves StaticKnowledgeProvider (D7); GraphKbReader reads only the code TOOL_GRAPH (4 nodes), synchronously, and has no production caller; graphKbToolLiveness.test.ts asserts over it (D8).
SELF-INVALIDATION: dies if any anchor reads differently at your head (then STOP and print both).
ON-DISAGREEMENT: YOUR READING WINS: print both values, continue with yours.

## FALSIFIER
With the DB reachable, for every recorded live turn replayed at your head: the sha256 of buildSystemPrompt's output, the offered tool set and the grounding verdict equal master's; evalGate verdicts on its test corpus equal master's. Any difference is a STOP with the turn id, except the declared changes of ORDER 4 (outage) and ORDER 2 (seed_state rows, each printed).

## ORDERS
0. Your file set: every non-test file under api/, src/, shared/, scripts/ that imports or names backends/armes/*, composeArmes, pickArmesGoverned, ArmesGovernedSlice, getArmesGroundingSlice, renderArmesCriticalSlice, buildArmesPack, HAND_PACKED_BACKENDS, RECONCILE_BACKEND, ARMES_METRIC_REGISTRY_SEEDS, ARMES_ROUTING_KIND_IDS, TOOL_GRAPH_NODE_KIND_ID, DEFAULT_BACKEND_ID, BACKEND_IDS, or a KIND_IDS member naming a backend; plus (D9) api/cwf/_lib/knowledge/tenantPayloadLoader.ts, api/admin/kinds.ts, api/admin/kind-drafts.ts, resolveMetricRegistry and the outage fallback lists of resolveToolCategories; plus scripts/seedRules.ts, scripts/verifySupersetGatewayLive.ts, scripts/jobs/superset-vis-1-routing-hint.json; plus new files under data/backends/; plus the kind_id VALUES of the mock rows in src/dev/AdminPreview.tsx (G1b leaves them to you, D3 of the G1b verdict); plus the tests of all of these. Print the list from git grep at your head first. NOT yours: toolCategories.ts, its floor accessors, CANONICAL_METRIC_TOOLS (G2c).
1. Kind ids (D2): every family gets a builder of the shape toolCategoryKindId(backendId); KIND_IDS keeps no value naming a backend; ARMES_ROUTING_KIND_IDS and TOOL_GRAPH_NODE_KIND_ID become builders or family predicates; stored kind ids do not change (no migration, no row rename). Kind definitions are generated per backend id from family definitions plus data/backends/<id>/ files, so every getKindDef caller named in the PREMISE still resolves every kind it resolves at master; prove it with a test over the live kind ids.
2. Seeds (D1): the code copies (backends/armes/*, referenceData instances, ARMES_METRIC_REGISTRY_SEEDS, the backend's KIND_REGISTRY rows and SEED_DOMAINS entries) move byte-for-byte into data/backends/<id>/ files and the seed reconciler reads them by backend id; BACKEND_IDS is derived from data, not a literal. DECLARED CHANGE: print, from a pure plan function over the live listRules and the seed_state table (no dry-run flag exists), every domain whose fingerprint changes and therefore every seed_state row the first warm will write; no domain_rules row is written, archived or deleted.
3. Composer (D3): one backend-generic composer over published rows by family; the header label and every per-zone label come from data/backends/<id>/ (the label anchor shows the display name would change the bytes); the per-family code floors move to the data file; an empty family renders nothing. HAND_PACKED_BACKENDS loses the backend (superset stays; F-S156-SUPERSET-HAND-PACK-PRIVILEGE-1). The governed slice becomes a map keyed by backend id and its readers (stageStream, groundingCheck, grounding/types, replay/groundingSlice, api/admin/replay) read by backend. Print the sha256 of the rendered slice for every recorded query shape at base and at head: equal is pass.
4. FAIL-CLOSED (D4, owner ruling): the blind-spot law floor is the union of the published blind_spot rows and data/backends/<id>/ blind spots, so archiving a row never removes a blind spot. When the governed rows of a backend in the turn cannot be read, the turn gives no data answer and tells the user that the knowledge base is unreachable; no floor or file serves a data answer. StaticKnowledgeProvider loses the backend arm only (its superset arm stays, D7b). The lab floor lever (D7c) shows the data file content labelled as the data-file floor, never blank. Tests: an outage turn with "0 fire" in a blind-spot zone never returns ok=true silently; archiving the blind_spot rows does not remove the floor; the fail-closed notice is shown.
5. evalGate (D5): the referential and behavioural stages become family-keyed, run for any backend that publishes those families; REQUIRED_MARKERS come from data/backends/<id>/; evalGate.test.ts verdicts equal master's; plant a fault (restore the backend-id dispatch) and show a test go red.
6. Superset knowledge text naming another backend (gatewayProtocol, routingHints, composeSuperset, the superset job hint json) states authority from backend_authority data. The rule key metric-authority-armes is a DB key: STOP for that site only, finish the rest, name it in the slip (a DB change goes to the Gemini operator).
7. prompt/assemble (D6, D7a): no default backend list, no case for this backend (the superset and machine-knowledge-base cases stay); buildArmesPack and prompt/backends/armes/ are gone. Pass = the sha256 of buildSystemPrompt's output per recorded turn, equal at base and head; promptRev printed too. Eval-canary is frozen: if any workflow would fire it, STOP; no spend fires.
8. Tool graph (D8): GraphKbReader reads the graph from data/backends/<id>/ (the four code nodes, byte-identical), by backend id, keeping its synchronous API; graphKbToolLiveness.test.ts asserts over the data-file graph (its RULE-31 subject moves with it). Wiring the five published rows is NOT in this card; name it as follow-on.
9. reconcileToolGovernance: the backend is a required argument; executeToolGovernancePlan passes it; the CLI default at scripts/reconcileToolGovernance.ts and its one-backend refusal are gone.
10. Tests: your file set's tests use neutral fixture backend ids; new tests: (i) a second flat backend with the same families composes through the same composer; (ii) ORDER 4's three tests; (iii) kind-id builders round-trip the live ids. Plant a fault per ORDER 4 and ORDER 5.
11. Count, case-sensitive: at your head `git grep -n -E "armes|Armes|ARMES" -- api src shared scripts e2e public` over your file set prints no line; data/backends/ is exempt by ruling. Print the command and output.
12. PR body carries a FILE-FENCE: block listing ORDER 0's files.
13. npm run build (all five gates) + full suite + typecheck:api locally; open the PR; slip SLIP-ARMES-G2-KNOWLEDGE-AS-DATA-S156-1 with branch, full head sha, PR number, CI runs by full sha, the ORDER 2 seed_state list, what is still dark. Stop.

## SHARED SURFACES
public/architecture/ narrative tabs (stagesRegistry.ts is G1b's: do not edit it), and a reseal if doc-drift asks; merge origin/master, then reseal, in one commit.

## DECISION RIGHTS
AG-1 designs inside "backend from data, never from code" and the two S156 owner rulings. A site needing a DB change: STOP for it, finish the rest. The Architect decided: labels from the data file (not display_name); no row rename, no migration; the superset hand pack stays for its own card.
FORBIDDEN: no backend, vendor or tenant name added in code; no removal of a user-visible function; no DB write by the lane; no poll task, no cron; never print an environment value; never merge your own PR.

END · CARD-ARMES-G2-KNOWLEDGE-AS-DATA-S156-1-v2
