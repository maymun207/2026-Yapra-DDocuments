<!-- relay-audit: v1 kind=card -->
CARD-ARMES-G2-KNOWLEDGE-AS-DATA-S156-1-v4

LANE: AG-1 (fresh window: one card per window)
fanout: personalized (one lane, one body)
MEASURED-AT: 2026-09-23T05:47Z (bridge clock, date -u in the command that wrote this file)
SUPERSEDES: CARD-ARMES-G2-KNOWLEDGE-AS-DATA-S156-1-v3 (scout RED ON EDITS, not design, with the complete delta E1..E9: SCOUT-STATUS-REVIEW-CARD-ARMES-G2-KNOWLEDGE-AS-DATA-S156-1-v3, bus 2026-09-23T05:44:34Z). v4 = v3 plus E1..E9 VERBATIM, each marked (E<n>) where it lands, plus the master anchor; nothing else changed. v3 itself superseded v2 (scout RED, bus 2026-09-23T04:10:22Z): Every N1 to N12 and NOTES item is answered in the ORDER named beside it: the scout's RIDES AS EDITS as written; N4, N6, N7 by Architect ruling; N8(b)(c) by owner ruling.
OWNER RULING: OWNER-RULING-S153-NO-ARMES-HARDCODE-1. OWNER-RULING-S156-DATA-BACKENDS-1 (backend-specific knowledge floors and seeds live in data/backends/<backend-id>/, loaded by id; no backend name in code). OWNER-RULING-S156-FAIL-CLOSED-1 (knowledge unreadable for a backend in the turn: no data answer, say so; data files are the un-archivable law copy, the seed and the eval input, never an outage answer source). OWNER-RULING-S157-G2-OUTAGE-EDGES-1 ("onay G2 b-c", 2026-09-23 07:15 TSI): no DB configured = outage; a successful read with zero rows = not an outage.
ADVERSARY GATE: EXEMPT, named. v4 repeats the subject of v3 and applies only the scout's own complete delta (loop-breaking case, OWNER-RULING-S133-P6-SCOPE-AND-LOOP-1, project instructions 12.1); S158 plan approval "onayliyorum", 2026-09-23 08:40 TSI, step 4 ("RED with complete delta -> apply, EXEMPT").

```evidence:adversary
ADVERSARY: EXEMPT
ack: 433d0eb4-3a00-4da5-896a-a7a411c26eaa
```
SCOPE: item 58 G2. G1b landed (PR 596). G2c (after you land) owns api/cwf/_lib/toolCategories.ts, its floor accessors, their consumers, CANONICAL_METRIC_TOOLS, and resolveToolCategories.ts entirely (NOTES: one card owns it; it is G2c's).
BRANCH: phase/armes-g2-knowledge-as-data-s156-1 off origin/master · PUSH early · REPORT docs/relay/ARMES-G2-KNOWLEDGE-AS-DATA-S156-1-AG1-report.md, carrying a FILE-FENCE: block (the merge guard reads it once landed) · PR: yes, non-draft.
GRAFT: take code context from graft first; slip and report carry a GRAFT line. graft may index a stale local tree: line anchors from git show on origin/master.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| master at cut time, after PR 610 (PR 610 touched only budget-fence files; the scout re-measured every anchor below identical at the previous master) | MEASURED: GitHub API commits/master, Architect bridge, 2026-09-23T05:41Z | master |
| the backend's published rows include the sequencing hint, an entry-role graph node and a persona row | MEASURED: execute_sql on project fjbrkimwvtpwoxhziidh, Architect Supabase MCP, 2026-09-23T02:30Z | keys |
| the backend's display name in data differs from the label its knowledge header prints | MEASURED: execute_sql, same project, 2026-09-23T02:30Z | label |
| the composer, outage arm, prompt default, eval gate and catalog feed branch on that backend by name | MEASURED: git grep on origin/master, Architect bridge, 2026-09-23T04:15Z | branches |
| the grounding check takes its blind-spot floor from code | MEASURED: git grep on origin/master, Architect bridge, 2026-09-23T04:15Z | floor |
| the shared constants name that backend | MEASURED: git grep on origin/master, Architect bridge, 2026-09-23T04:15Z | consts |

```evidence:master
2d7087bff1eda24b6224c2fbd9a9d987061dec7d
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
3c930797178bd0246470c1db2aa30220d7d84f02:api/cwf/_lib/knowledge/DbKnowledgeProvider.ts:53:export const HAND_PACKED_BACKENDS: ReadonlySet<BackendId> = new Set<BackendId>(['armes', 'superset']);
3c930797178bd0246470c1db2aa30220d7d84f02:api/cwf/_lib/knowledge/DbKnowledgeProvider.ts:296:        if (backend === 'armes') return composeArmesContext(rules);
3c930797178bd0246470c1db2aa30220d7d84f02:api/cwf/_lib/knowledge/StaticKnowledgeProvider.ts:37:        if (scope.backends.includes('armes')) {
3c930797178bd0246470c1db2aa30220d7d84f02:api/cwf/_lib/knowledge/gate/evalGate.ts:466:    const isArmes = kind.backendId === 'armes';
3c930797178bd0246470c1db2aa30220d7d84f02:api/cwf/_lib/prompt/assemble.ts:52:        case 'armes':
3c930797178bd0246470c1db2aa30220d7d84f02:api/cwf/_lib/prompt/assemble.ts:87:export function buildSystemPrompt(ctx: PromptContext, activeBackends: BackendId[] = ['armes'], lab?: LabKnowledge, segments?: PromptSegments): string {
3c930797178bd0246470c1db2aa30220d7d84f02:api/cwf/_lib/knowledge/governance.ts:353:        } else if (backend === 'armes') {
```

```evidence:floor
3c930797178bd0246470c1db2aa30220d7d84f02:api/cwf/_lib/grounding/groundingCheck.ts:28:import { BLIND_SPOTS } from '../knowledge/backends/armes/blindSpots.js';
```

```evidence:consts
3c930797178bd0246470c1db2aa30220d7d84f02:shared/dbConstants.ts:1560:export const ARMES_ROUTING_KIND_IDS = {
3c930797178bd0246470c1db2aa30220d7d84f02:shared/dbConstants.ts:1680:export const TOOL_GRAPH_NODE_KIND_ID = 'armes.tool_graph_node';
3c930797178bd0246470c1db2aa30220d7d84f02:shared/dbConstants.ts:1700:export const DEFAULT_BACKEND_ID = 'armes';
```

## PREMISE
MEASURED: the anchors above.
UNMEASURED by the Architect, READ from the scout's primary-source readings (v1 verdict bus 2026-09-23T01:57:31Z, v2 verdict bus 2026-09-23T04:10:22Z; line numbers are at the pre-PR-596 master and PR 596 did not touch these files): the seed reconciler re-seeds hard-deleted rows and claim() deletes a total-failure row; referenceData derives category/annotation seeds from G2c's manifest and armes.reference holds the superset instances; BACKEND_IDS reaches the browser (UsersTab.tsx:329), adminGuard.ts:66, genArchitectureFacts.ts:252 and systemLane.test.ts:67 pins its order; memory-episodes.ts:173-182, router-proposals.ts:163,176 and archiveWriteBearingDraftsCore.ts:84 write backend kind ids live; composeArmes.ts:41 overrides empty families with the code baseline; evalGate.ts:182-194, :237, :444 and governance.ts:353 carry the stage triggers; groundingCheck.ts:574 grounds every turn on the floor; DbKnowledgeProvider.ts:40,71,176,276 hold a module-singleton cache; notices append only after the stream (stageStream.ts:683,696,729); metric-authority-armes appears at evalGate.ts:413, gatewayProtocol.ts:145, verifySupersetGatewayLive.ts:27; deriveReconciliationPlan filters literal KIND_IDS (reconcileToolGovernance.ts:331-335).
SELF-INVALIDATION: dies if any anchor reads differently at your head (then STOP and print both).
ON-DISAGREEMENT: YOUR READING WINS: print both values, continue with yours.

## FALSIFIER
With the DB reachable, for every recorded live turn replayed at your head: the sha256 of buildSystemPrompt's output, the offered tool set and the grounding verdict equal master's; evalGate verdicts on its corpus AND the pinned machine-knowledge-base and superset verdicts (ORDER 5) equal master's; the kindId set, defs and order deep-equal master's. Any difference is a STOP with the turn or kind id, except the declared changes of ORDER 4 (outage) and ORDER 2 (seed plan, printed).

## ORDERS
0. Your file set: every non-test file under api/, src/, shared/, scripts/ that imports or names backends/armes/*, composeArmes, pickArmesGoverned, ArmesGovernedSlice, getArmesGroundingSlice, renderArmesCriticalSlice, buildArmesPack, HAND_PACKED_BACKENDS, RECONCILE_BACKEND, ARMES_METRIC_REGISTRY_SEEDS, ARMES_ROUTING_KIND_IDS, TOOL_GRAPH_NODE_KIND_ID, DEFAULT_BACKEND_ID, BACKEND_IDS, or a KIND_IDS member naming a backend; plus api/cwf/_lib/knowledge/tenantPayloadLoader.ts, api/admin/kinds.ts, api/admin/kind-drafts.ts, resolveMetricRegistry; plus scripts/seedRules.ts, scripts/verifySupersetGatewayLive.ts, scripts/jobs/superset-vis-1-routing-hint.json; plus memory-episodes.ts, router-proposals.ts, archiveWriteBearingDraftsCore.ts, governance.ts, DbKnowledgeProvider.ts, stageStream.ts, render.ts, groundingSlice.ts, backendTrust.ts, UsersTab.tsx, adminGuard.ts, genArchitectureFacts.ts, tsconfig include sets; plus new files under data/backends/ including data/backends/index.json; plus the kind_id VALUES of the mock rows in src/dev/AdminPreview.tsx (E9: the mock kind_id values are written as template literals over MOCK_KINDS_BACKEND with the family suffix (the bytes are unchanged, no literal)); plus the tests of all of these. Print the list from git grep at your head first. NOT yours: toolCategories.ts, its floor accessors, CANONICAL_METRIC_TOOLS, resolveToolCategories.ts (G2c). NAMED RESIDUAL, not edited: verifyGrants.ts:42, src/dev/AdminPreview.tsx:48 (the id is pinned by e2e specs outside the fence) (E9), and comment-only mentions in rules.ts, resolveToolDocs.ts, deriveRouteDrafts.ts, promptSegments.ts, toolProtocol.ts, resolveActiveBackends.ts (G3 owns comments).
1. Kind ids (N4, Architect ruling): every family gets a builder of the shape toolCategoryKindId(backendId); KIND_IDS keeps no value naming a backend; stored kind ids do not change (no migration, no row rename). Each backend OPTS INTO its families in data/backends/<id>/ with the family's name and schema per backend (superset.blind_spot keeps its own schema and name); definitions are NOT generated blindly from families. (E5) the three live writer sites read their kind id from data/backends/index.json key writerKinds {memoryPromote, routerAccept, archiveWriteBearing}, backend-independent, holding master's exact ids; router-proposals:163 keeps its unfiltered read. Test: for every id in index.json each site yields master's literal id, and the refusal set equals master's (empty). Test: the kindId set, getKindDef defs and order deep-equal master's.
2. Seeds (N1, N2): the code copies (backends/armes/*, referenceData instances, ARMES_METRIC_REGISTRY_SEEDS, the backend's KIND_REGISTRY rows and SEED_DOMAINS entries) move byte-for-byte into data/backends/<id>/ files and the reconciler reads them by backend id. (a) the category/annotation seeds stay DERIVED from G2c's manifest by id (no data copy); (b) armes.reference keeps the superset instances as at master (no split); (c) the plan is computed AFTER ORDER 6's text change. Domain names stay "${id}.reference" and "${id}.metric_registry". DECLARED PLAN: a pure plan function over the live listRules and a NAMED SELECT-only seed_state reader prints, per changed domain, the base and head fingerprints, the absent keys (any status), the missing kinds and the reclaim rows; if any of the last three is above zero, STOP. No domain_rules row is written, archived or deleted.
3. BACKEND_IDS (N3): one static data/backends/index.json lists every current id in master's order (including machine-knowledge-base, honestbench, mount-probe, system); it is imported statically (in the tsconfig include set) by every current consumer including the browser; a test asserts order equality with master's literal. (E7) resolveJsonModule true in tsconfig.api.json, tsconfig.app.json and tsconfig.api.test.json; every data/backends JSON is imported statically with the json import attribute through one module keyed by backend id; no fs read and no dynamic path on the turn path. A test asserts the imported set equals the git listing of data/backends/, and a missing or invalid file fails typecheck or build, never an empty floor at runtime.
4. Composer (N5): one backend-generic composer over published rows by family. An EMPTY family (read OK) serves the data-file floor exactly as master's code baseline does (composeArmes.ts:41 semantics, including the prompt blind spots same-source rule and the zone-unknown line); "renders nothing" is withdrawn. The header label and every per-zone label come from data/backends/<id>/ with byte-identical output; the label sites are render.ts:59, render.ts:43 (keep the U+2019 in "ARMES’te" byte-exact), composeArmes.ts:93, render.ts:106, groundingCheck.ts:215. HAND_PACKED_BACKENDS loses the backend (superset stays; F-S156-SUPERSET-HAND-PACK-PRIVILEGE-1). The governed slice becomes a map keyed by backend id; its readers read by backend. Print the sha256 of the rendered slice for every recorded query shape at base and head: equal is pass.
5. FAIL-CLOSED (owner rulings; N7, N8, N9, N10). (i) Blind-spot law floor (N7, Architect ruling): the union over every backend whose data file DECLARES zone blind spots, applied to EVERY turn as at master (groundingCheck.ts:574), floor-first and deduplicated by id; no superset rows; archiving a row never removes a blind spot. (ii) Outage signal (N9): warm returns a per-backend outcome on the turn context, one of read / empty / failed / unconfigured; every decision reads the turn context, never the module cache. (E2) warm also returns, per backend, the composed DomainContext and the governed grounding slice on the turn context; the prompt packs and groundingInputForTurn read the turn's copy, never sliceCache or the grounding cache. Test: turn B fails between turn A's warm and A's prompt build; A's prompt sha256 and grounding verdict equal A's solo run. (E3) the outcome is decided in this order: repo.configured false = unconfigured (checked before any read); the read throws = failed; the read succeeds with zero rows = empty; the read succeeds and the composer throws = failed; otherwise read. Never infer unconfigured from rows.length. (iii) Outcomes (owner ruling S157): failed or unconfigured for a backend in the turn = outage; (E1) read with zero rows = NOT an outage: a backend whose data/backends/<id>/ declares families serves every family's data-file floor (ORDER 4's empty-family rule applied to all families; the output is byte-identical to master's StaticKnowledgeProvider output for that backend); a backend with no data file keeps master's derived path (DbKnowledgeProvider.ts:161). (iv) The outage response (N10): after warm and before the model call, when any backend in the turn is in outage: no tools, no model call, a TR/EN notice emitted as text-delta, a named outcome in the trace. (E4) runExperiment's knowledge warm applies the same outcome rule: an arm whose backend is in outage records outcome=outage and is not run against the model; name it in the report. (v) Every other outage path named (N8 a, d, e, f): composeLabSlice floor() on unconfigured, zero rows and throw follows (iii); superset's static arm no longer serves an outage answer (say so in the report); replay CODE_FLOOR in groundingSlice.ts and backendTrust.ts "OUTAGE FLOOR" read the data-file floor for grounding comparison only, never as an answer source. (vi) StaticKnowledgeProvider loses the backend arm only; the lab floor lever shows the data-file content labelled as the data-file floor. Tests: notice emitted and no model answer on outage; unconfigured = outage; zero rows = normal path; grounding over a forced "0 fire" with the file floor gives ok=false; archiving blind_spot rows keeps the floor; two concurrent turns with different backend outcomes decide from their own context.
6. evalGate (N6, Architect ruling): the referential and behavioural stages run where data/backends/<id>/ DECLARES them, not where a family is published; the superset arm (:444) is evaluated FIRST; (E6) evalGate looks up the declaration by kind.backendId and governance.ts:353 by draft.backend_id, each exactly as at master. Pin: a glossary-kind draft under a non-declaring backend gets master's verdict and master's catalog (undefined). Pin in tests the verdicts of machine-knowledge-base (one tool_category published, annotations in draft) and superset (four blind_spot rows without appliesToZones) equal to master's; :237 stays reachable for a declaring backend; print the armes catalog hash at base and head. REQUIRED_MARKERS come from data/backends/<id>/. Plant a fault (restore the backend-id dispatch) and show a test go red.
7. Superset knowledge text naming another backend (gatewayProtocol, routingHints, composeSuperset, the superset job hint json) states authority from backend_authority data. metric-authority-armes (N11) has three sites: evalGate.ts:413, gatewayProtocol.ts:145, verifySupersetGatewayLive.ts:27: STOP for all three, finish the rest, name them in the slip (a DB change goes to the Gemini operator).
8. prompt/assemble: no default backend list, no case for this backend (superset and machine-knowledge-base cases stay); buildArmesPack and prompt/backends/armes/ are gone. Pass = the sha256 of buildSystemPrompt's output per recorded turn, equal at base and head; promptRev printed. Eval-canary is frozen: if any workflow would fire it, STOP.
9. Tool graph: GraphKbReader reads the graph from data/backends/<id>/ (the four code nodes, byte-identical), by backend id, keeping its synchronous API; graphKbToolLiveness.test.ts and toolReachability.test.ts move with it. Wiring the five published rows (they lack requires/produces) is follow-on, register item 85.
10. reconcileToolGovernance (N12): the backend is a required argument; deriveReconciliationPlan builds its kind ids from that argument; executeToolGovernancePlan passes it; the one-backend REFUSAL STAYS until G2c makes the ALWAYS_INCLUDE floor per-backend (name it in the slip as G2c's to remove).
11. Tests: neutral fixture backend ids; (i) a second flat backend with the same declared families composes through the same composer; (ii) ORDER 5's tests; (iii) ORDER 1's deep-equal and writer tests; (iv) ORDER 3's order test; (v) ORDER 6's pinned verdicts. Plant a fault per ORDER 5 and ORDER 6.
12. Count, case-sensitive: at your head `git grep -n -E "armes|Armes|ARMES" -- api src shared scripts e2e public` over your file set prints no line except the NAMED RESIDUAL of ORDER 0 and ORDER 7's STOP sites; data/backends/ is exempt by ruling. Print the command and output.
13. npm run build (all five gates) + full suite + typecheck:api locally; open the PR; slip SLIP-ARMES-G2-KNOWLEDGE-AS-DATA-S156-1 with branch, full head sha, PR number, CI runs by full sha, the ORDER 2 plan, what is still dark. Stop.

## SHARED SURFACES
public/architecture/ narrative tabs (stagesRegistry.ts: do not edit it), and a reseal if doc-drift asks; merge origin/master, then reseal, in one commit. (E8) add data/backends/** to the mapped areas of every tab that maps the files the floor leaves; reseal in the same commit.

## DECISION RIGHTS
AG-1 designs inside "backend from data, never from code", the three owner rulings, and the Architect rulings in ORDERS 1, 5(i) and 6. A site needing a DB change: STOP for it, finish the rest. The Architect decided: labels from the data file (not display_name); no row rename, no migration; the superset hand pack stays for its own card (item 82).
FORBIDDEN: no backend, vendor or tenant name added in code; no removal of a user-visible function; no DB write by the lane; no poll task, no cron; never print an environment value; never merge your own PR.

END · CARD-ARMES-G2-KNOWLEDGE-AS-DATA-S156-1-v4
