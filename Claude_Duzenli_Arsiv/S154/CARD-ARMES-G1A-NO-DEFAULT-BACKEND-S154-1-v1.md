<!-- relay-audit: v1 kind=card -->
CARD-ARMES-G1A-NO-DEFAULT-BACKEND-S154-1-v1

LANE: AG-1
fanout: personalized (one lane, one body)
MEASURED-AT: 2026-09-22T04:05Z (bus clock)
OWNER RULING: OWNER-RULING-S153-NO-ARMES-HARDCODE-1 (the most important CWF rule: every backend equal, no preference, no hard code; a backend is connected, learned per A24 v1_3 and used as data). Owner plan approval S154 "onayliyorum" 06:40 TSI.
ADVERSARY GATE: NEW SUBJECT. Goes to the scout first; reaches AG-1 only with a GREEN verdict row.
INVENTORY: ARMES-INVENTORY-G0-S154-1-v1 (doc repo Claude_Duzenli_Arsiv/S154/, companion .tsv lists every line with class and target). This card takes the G1 LOGIC rows about DEFAULT and LITERAL backend choice. Knowledge modules, composeArmes, kind ids named armes.*, the category map in toolCategories.ts, evalGate and governance backend branches are G2 and NOT in this card. Comments, tests and fixtures are G3 (you may clean comments in lines you touch).
BRANCH: phase/armes-g1a-no-default-backend-s154-1 off master 9aba71fe2cbad0c53f3996d01b8991e5bbe40ed4 · PUSH early · REPORT docs/relay/ARMES-G1A-NO-DEFAULT-BACKEND-S154-1-AG1-report.md · PR: yes, non-draft.
GRAFT: take code context from graft first (graft ask / grep / callers); raw git grep only for what graft does not index. Slip and report carry a GRAFT line.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| the default backend is a code constant naming one backend | MEASURED: git grep on origin/master, bridge, 2026-09-22T04:02Z | defconst |
| a server row with no backend is silently attributed to that constant | MEASURED: git grep on origin/master, bridge, 2026-09-22T04:02Z | fallback |
| no live server row lacks an explicit backend, so removing the fallback removes no behaviour today | MEASURED: execute_sql on project fjbrkimwvtpwoxhziidh, Architect Supabase MCP, 2026-09-22T04:03Z | liverows |

```evidence:defconst
9aba71fe2cbad0c53f3996d01b8991e5bbe40ed4:shared/dbConstants.ts:1691:export const DEFAULT_BACKEND_ID = 'armes';
9aba71fe2cbad0c53f3996d01b8991e5bbe40ed4:src/components/admin/mcpTruth.ts:37:export const DEFAULT_IDENTITY = 'armes';
```

```evidence:fallback
9aba71fe2cbad0c53f3996d01b8991e5bbe40ed4:api/cwf/_lib/backends/resolveActiveBackends.ts:33:    return explicit && explicit.length > 0 ? explicit : DEFAULT_BACKEND_ID;
```

```evidence:liverows
jsonb_array_elements over mcp_global_settings.servers and mcp_settings.servers, coalesce(backend_id,'<NONE>'):
global: supersetArmes->superset, machine-knowledge-base->machine-knowledge-base, honestbench->honestbench, mount-probe->mount-probe, armesMes->armes
personal: armes->armes, supersetArmes->superset (3 rows), honestbench->honestbench, machine-knowledge-base->machine-knowledge-base
rows with <NONE>: 0
```

## PREMISE
MEASURED: 2026-09-22T04:02Z, bridge, git grep -n -E "DEFAULT_BACKEND_ID|DEFAULT_IDENTITY|ENTITY_ALIAS_BACKEND_ID|RECONCILE_BACKEND" on origin/master 9aba71fe2cbad0c53f3996d01b8991e5bbe40ed4 in api src shared scripts (tests excluded): consumers in api/admin/replay.ts, backends/backendToolPattern.ts, backends/resolveActiveBackends.ts, knowledge/executeToolGovernancePlan.ts, knowledge/reconcileToolGovernance.ts, replay/groundingSlice.ts, replay/runExperiment.ts, turn/gatewayPreflight.ts, turn/stageClarify.ts, turn/stageTools.ts, turn/stagesResolve.ts, scripts/reconcileToolGovernance.ts, src/components/admin/AdminPanel.tsx, src/components/admin/mcpTruth.ts.
MEASURED: same inventory, literal 'armes' as a backend choice (not a constant) in api/admin/graph-kb.ts:298, api/admin/memory-episodes.ts:173, api/admin/router-proposals.ts:157 and :167, knowledge/archiveWriteBearingDraftsCore.ts:77, knowledge/refileReadToolsCore.ts:116 and :134, knowledge/reconcileToolGovernance.ts:88, replay/clarificationLens.ts:129, replay/frameForceFitLens.ts:158, replay/lineResolutionLens.ts:134, synthTraffic/syntheticTemplateFills.ts:39, scripts exportParityCorpus.ts:43, vectorLiveProof.ts:52, vectorSeamBirthProof.ts:41, pbFullMeasure.ts:68, src admin MCPSettingsTab.tsx (the "default (armes)" option), MemoryTab.tsx:308, RoutingTab.tsx:263, GovernanceTab.tsx:890 and :1012.
MEASURED: backends registry (execute_sql, 04:03Z): armes flat system_of_record active; superset gateway reporting_mirror; system, machine-knowledge-base, honestbench, mount-probe flat unverified active; armes-new retired. tool_pattern and trust_tier are DATA.
UNMEASURED: whether any path besides backendOf defaults a backend at runtime; you measure it with graft callers before editing.
SELF-INVALIDATION: dies if master moves a file in the lists above before your branch is cut (re-read, then continue on the measured tree), or if a second live server row without backend_id appears (then STOP: removing the fallback would drop that row's tools).
ON-DISAGREEMENT: YOUR READING WINS: print both values, continue with yours, name the difference.

## ORDERS
1. Remove DEFAULT_BACKEND_ID and DEFAULT_IDENTITY. No replacement constant under any other name.
2. backendOf (resolveActiveBackends.ts): a server row with no backend_id resolves to NO backend (a typed unassigned value). Its tools are attributed to nobody; the admin UI shows the row as needing assignment (the warning copy already exists in MCPSettingsTab/mcpTruth; reword it so it names no backend). Never a default.
3. Every consumer in the PREMISE lists takes its backend from DATA: the turn's active backends, the replayed turn's recorded backends, the selected backend in the admin UI, a required argument in a script or endpoint (refuse when absent, never default), or the backends registry (tool_pattern, trust_tier). Concretely:
   - stageClarify: the entity-alias, entity-layer and vector-suggestion reads run per ACTIVE backend of the turn that has enabled rows in backend_entity_layers (config), results unioned with the backend recorded on each candidate. The three replay lenses read the same way from the replayed turn.
   - gatewayPreflight + stageTools: the misroute fence's mirror is the active tool names of every enabled backend whose tool_pattern is not gateway (not one named backend); the withheld check uses the backend of the tool actually called. The misroute message names the owning backend from data.
   - backendToolPattern: the pattern comes from the registry; any code-side outage floor names no backend.
   - reconcileToolGovernance (lib + script): --backend is REQUIRED; works for any backend with a tool mirror.
   - scripts with a default: the backend argument or env becomes required; absent means refuse with a message.
4. Behaviour on today's live data must be the same for every current turn: add or keep tests that prove it (the fence still refuses a gateway call to a tool owned by a flat backend; entity resolution for the system_of_record backend returns the same set; replay lenses unchanged on a recorded turn).
5. Plant a fault: restore one DEFAULT_BACKEND_ID line in a scratch worktree and show a test or the build going red; restore it and show green.
6. Prompt bytes: this card must NOT change any system-prompt or tool-description bytes. If a change turns out to need it, STOP and report (eval-gate spend is the owner's to name).
7. Count: at your head, `git grep -n -E "armes|Armes|ARMES" -- <every file you touched>` restricted to non-comment code lines prints ZERO lines for the scope of this card; print the command and its output. Case-sensitive on purpose: a case-insensitive grep also hits clearMessages.
8. npm run build (all five gates) + full suite + typecheck:api green locally; open the PR; slip SLIP-ARMES-G1A-NO-DEFAULT-BACKEND-S154-1 with branch, full head sha, PR number, CI runs read by full sha, and what is still dark. Stop.

## SHARED SURFACES
public/architecture/ narrative tabs may need a sentence changed and a reseal (npm run reseal in the same commit). docs/ground/ follows the ground contract.

## DECISION RIGHTS
AG-1 designs each replacement inside the rule "backend from data, never from code". A consumer that cannot be made data-driven without a DB change: STOP for that consumer, name it, finish the rest (only the Gemini operator writes CWF tables).
FORBIDDEN: no backend, vendor or tenant name added anywhere in code; no removal of any user-visible function; no poll task, no cron; never print an environment value; never merge your own PR.

END · CARD-ARMES-G1A-NO-DEFAULT-BACKEND-S154-1-v1
