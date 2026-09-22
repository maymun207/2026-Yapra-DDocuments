<!-- relay-audit: v1 kind=card -->
CARD-ARMES-G1A1-NO-DEFAULT-BACKEND-S154-1-v2

LANE: AG-1
fanout: personalized (one lane, one body)
MEASURED-AT: 2026-09-22T08:10Z (bus clock)
OWNER RULING: OWNER-RULING-S153-NO-ARMES-HARDCODE-1 (the most important CWF rule: every backend equal, no preference, no hard code). Owner plan approval S154 "onayliyorum" 06:40 TSI.
SUPERSEDES: CARD-ARMES-G1A-NO-DEFAULT-BACKEND-S154-1-v1 (scout RED, SCOUT-STATUS-REVIEW-CARD-ARMES-G1A-NO-DEFAULT-BACKEND-S154-1-v1). This v2 is the scout's OWN split line, part G1a-1 (mechanical, no turn behaviour), with the edits the scout marked as riding (CP-1, CP-2, D1, D5, D6, D7) applied. Part G1a-2 (turn path: stageClarify per active backend, the replay lenses, the misroute fence, the redirect-decision shape) is a separate card with its own adversary review.
ADVERSARY GATE: EXEMPT under 12.1's loop-breaking case: this card repeats the subject of a superseded card and applies only the reviewer's riding edits and the reviewer's own split; the seal cites the scout row. The PR still needs adversary/scout GREEN at its head to land.
INVENTORY: ARMES-INVENTORY-G0-S154-1-v1 (doc repo Claude_Duzenli_Arsiv/S154/).
BRANCH: phase/armes-g1a1-no-default-backend-s154-1 off current master (see anchor master) · PUSH early · REPORT docs/relay/ARMES-G1A1-NO-DEFAULT-BACKEND-S154-1-AG1-report.md · PR: yes, non-draft.
GRAFT: take code context from graft first; slip and report carry a GRAFT line.

```evidence:adversary
ADVERSARY: EXEMPT
ack: a3fd0208-2dd6-404c-a705-62d9dd6c9217
```

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| master at cut time | MEASURED: GitHub API commits/master, Architect bridge, 2026-09-22T06:55Z | master |
| the default backend is a code constant naming one backend | MEASURED: git grep on origin/master, bridge, 2026-09-22T04:02Z | defconst |
| a server row with no backend is silently attributed to that constant | MEASURED: git grep on origin/master, bridge, 2026-09-22T04:02Z | fallback |
| no live server row lacks an explicit backend | MEASURED: execute_sql on project fjbrkimwvtpwoxhziidh, Architect Supabase MCP, 2026-09-22T04:03Z | liverows |

```evidence:master
9aba71fe2cbad0c53f3996d01b8991e5bbe40ed4
```

```evidence:defconst
9aba71fe2cbad0c53f3996d01b8991e5bbe40ed4:shared/dbConstants.ts:1691:export const DEFAULT_BACKEND_ID = 'armes';
9aba71fe2cbad0c53f3996d01b8991e5bbe40ed4:src/components/admin/mcpTruth.ts:37:export const DEFAULT_IDENTITY = 'armes';
```

```evidence:fallback
9aba71fe2cbad0c53f3996d01b8991e5bbe40ed4:api/cwf/_lib/backends/resolveActiveBackends.ts:33:    return explicit && explicit.length > 0 ? explicit : DEFAULT_BACKEND_ID;
```

```evidence:liverows
jsonb_array_elements over mcp_global_settings.servers and mcp_settings.servers, coalesce(backend_id,'<NONE>'), each row listed:
global supersetArmes -> superset
global machine-knowledge-base -> machine-knowledge-base
global honestbench -> honestbench
global mount-probe -> mount-probe
global armesMes -> armes
personal armes -> armes
personal supersetArmes -> superset
personal honestbench -> honestbench
personal supersetArmes -> superset
personal machine-knowledge-base -> machine-knowledge-base
personal supersetArmes -> superset
no row printed <NONE>
```

## PREMISE
MEASURED: see the four anchors above.
RELAYED: scout status SCOUT-STATUS-REVIEW-CARD-ARMES-G1A-NO-DEFAULT-BACKEND-S154-1-v1 (bus 2026-09-22T06:59:15Z): graft callers of backendOf include api/admin/backend-verify.ts, backends/catalogSync.ts syncBackendCatalog and backends/scopeTools.ts scopeToolsToBackends; the gateway floor entry in backendToolPattern keeps the gateway backend usable on a registry outage; GovernanceTab's stage-drafts gate is armes-only while stage-drafts.ts accepts any registered backend.
UNMEASURED: nothing else this card depends on; you re-read every site with graft before editing.
SELF-INVALIDATION: dies if a live server row without backend_id appears (then STOP: removing the fallback would drop that row's tools).
ON-DISAGREEMENT: YOUR READING WINS: print both values, continue with yours, name the difference.

## FALSIFIER
If any change in this card alters a byte of a system prompt, a tool description, or a tool RESULT the model reads, or changes which tools a live turn is offered, the card is wrong for G1a-1: STOP and report the site. G1a-1 changes no turn behaviour.

## ORDERS
1. backendOf (resolveActiveBackends.ts): a server row with no backend_id resolves to a typed UNASSIGNED value, never a default. Its three callers, by name:
   - catalogSync.syncBackendCatalog: on UNASSIGNED it refuses and writes nothing (no catalog upsert, no entity discovery, no route derivation) and logs the row name.
   - scopeTools.scopeToolsToBackends: a tool from an UNASSIGNED row is in no backend's scope.
   - api/admin/backend-verify.ts: reports the row as unassigned.
2. Admin UI: delete DEFAULT_IDENTITY (mcpTruth.ts) and every use; the MCPSettingsTab "default (armes)" select option becomes "unassigned: choose a backend" and a global row cannot be saved unassigned (the copy already says global rows require it); reword the warning texts in mcpTruth and MCPSettingsTab so they name no backend. AdminPanel's ToolVisibilityBadge takes the backend the panel is showing, not a constant. GovernanceTab lines 890 and 1012: the stage-drafts block shows for ANY registered backend that stage-drafts.ts accepts (read its predicate); this widens, it removes nothing.
3. Required argument, never a default: api/admin/graph-kb.ts (query backend), api/admin/memory-episodes.ts, api/admin/router-proposals.ts, knowledge/archiveWriteBearingDraftsCore.ts, knowledge/refileReadToolsCore.ts, synthTraffic/syntheticTemplateFills.ts, scripts exportParityCorpus.ts, vectorLiveProof.ts, vectorSeamBirthProof.ts, pbFullMeasure.ts. Absent means refuse with a message; the admin UI caller passes the selected backend. Where a site today reads kinds named after one backend (router-proposals reads a category manifest; archive/refile read tool_category drafts), keep the kind name as it is (renaming kinds is G2) but take the backend id from the argument.
4. backendToolPattern.ts: remove ONLY the DEFAULT_BACKEND_ID entry of the floor map. The gateway floor entry stays (a registry outage must not turn the gateway backend flat).
5. stagesResolve.ts defaultBackend span field and replay/runExperiment.ts activeBackends: take them from the resolved turn / the replayed turn's recorded backends.
6. DEFAULT_BACKEND_ID itself STAYS in shared/dbConstants.ts in this card, used only by the sites that belong to G1a-2 (turn/stageTools.ts, turn/gatewayPreflight.ts) and to G2 (replay/groundingSlice.ts, api/admin/replay.ts). Add a comment on the constant naming those four files and the two cards that remove them. No NEW use may be added.
7. NOT in this card (untouched): stageClarify and the three replay lenses (G1a-2); the misroute fence and redirect decision (G1a-2); reconcileToolGovernance lib and script, RoutingTab, MemoryTab, groundingSlice, api/admin/replay.ts, toolCategories, composeArmes, kind ids named armes.* (G2).
8. Tests: an UNASSIGNED row is refused by catalogSync and scoped to nothing (unit); a required-arg endpoint refuses when the backend is absent; plant a fault (restore the backendOf default in a scratch worktree) and show a test go red.
9. Count, case-sensitive on purpose (a case-insensitive grep also hits clearMessages): at your head, `git grep -n -E "armes|Armes|ARMES" -- <every file you touched>` prints no non-comment code line except the DEFAULT_BACKEND_ID definition, kind-id string literals kept per ORDER 3, and lines in files ORDER 7 excludes; print the command and its output.
10. npm run build (all five gates) + full suite + typecheck:api locally; open the PR; slip SLIP-ARMES-G1A1-NO-DEFAULT-BACKEND-S154-1 with branch, full head sha, PR number, CI runs read by full sha, what is still dark. Stop.

## SHARED SURFACES
public/architecture/ narrative tabs may need a sentence changed and a reseal (npm run reseal in the same commit).

## DECISION RIGHTS
AG-1 designs each replacement inside "backend from data, never from code". A site that cannot be made data-driven without a DB change: STOP for that site, name it, finish the rest (only the Gemini operator writes CWF tables).
FORBIDDEN: no backend, vendor or tenant name added anywhere in code; no removal of any user-visible function; no poll task, no cron; never print an environment value; never merge your own PR.

END · CARD-ARMES-G1A1-NO-DEFAULT-BACKEND-S154-1-v2
