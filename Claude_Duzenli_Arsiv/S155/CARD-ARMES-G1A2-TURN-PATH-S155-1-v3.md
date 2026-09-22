<!-- relay-audit: v1 kind=card -->
CARD-ARMES-G1A2-TURN-PATH-S155-1-v3

LANE: AG-1 (one card per window: /clear before this card)
fanout: personalized (one lane, one body)
MEASURED-AT: 2026-09-22T15:36Z (bus clock)
SUPERSEDES: CARD-ARMES-G1A2-TURN-PATH-S155-1-v2 (scout RED, SCOUT-STATUS-REVIEW-CARD-ARMES-G1A2-TURN-PATH-S155-1-v2, bus 2026-09-22T15:21:26Z). Applied as edits, all and only the scout's: N0, CP-2, N6, N3, N4, N5, and N1+N2 as one re-cut of ORDER 3's predicate and the FALSIFIER exception. v2 had applied v1's CP-2, A1-A5, (e).
OWNER RULING: OWNER-RULING-S153-NO-ARMES-HARDCODE-1. S155 plan approval "onay" 18:03 TSI.
ADVERSARY GATE: goes back to the scout that asked for it ("v3 back to me"; ORDER-SCOUT-REVIEW-CARD-ARMES-G1A2-TURN-PATH-S155-1-v3). Reaches AG-1 only with a GREEN verdict row.
BRANCH: phase/armes-g1a2-turn-path-s155-1 off origin/master · PUSH early · REPORT docs/relay/ARMES-G1A2-TURN-PATH-S155-1-AG1-report.md · PR: yes, non-draft.
GRAFT: take code context from graft first; slip and report carry a GRAFT line. graft may index a stale local tree: line anchors from git show on origin/master.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| master at cut time, G1a-1 merged | MEASURED: GitHub API commits/master and pulls/593, Architect bridge, 2026-09-22T15:01Z | master |
| backends, their enabled flag, lifecycle and tool pattern (after item 65) | MEASURED: execute_sql on project fjbrkimwvtpwoxhziidh, Architect Supabase MCP, 2026-09-22T15:16Z | backends |
| only one backend has entity layers today | MEASURED: execute_sql, same project, 2026-09-22T15:04Z | layers |
| every scoped user holds that backend, and every scoped user holds the same four backends | MEASURED: execute_sql, same project, 2026-09-22T15:04Z and 15:33Z | scopes |
| active tool names newly fenced if every active non-gateway backend is mirrored | MEASURED: execute_sql, same project, 2026-09-22T15:33Z | newfence |
| the server half: the layered backend is an enabled global server no user overrides | MEASURED: execute_sql on mcp_global_settings and mcp_settings, same project, 2026-09-22T15:05Z | server |
| tool names with more than one owner among SERVED non-gateway backends | MEASURED: execute_sql, same project, 2026-09-22T15:04Z | multi |
| no served non-gateway active tool name collides with a gateway tool name | MEASURED: execute_sql, same project, 2026-09-22T15:04Z | collide |
| tool names owned only by non-served backends | MEASURED: execute_sql, same project, 2026-09-22T15:04Z | retired |
| served means lifecycle active | MEASURED: git show origin/master:api/cwf/_lib/backends/backendLifecycle.ts, Architect bridge, 2026-09-22T15:02Z | serve |

```evidence:master
fdb0df24d0b9dd288223fec55da4185f4ca62382
pulls/593: merged true, merged_at 2026-09-22T12:46:02Z
```

```evidence:backends
MEASURED: select id, enabled, lifecycle, tool_pattern from backends
superset | enabled=true | lifecycle=active | pattern=gateway
system | enabled=true | lifecycle=active | pattern=flat
machine-knowledge-base | enabled=true | lifecycle=active | pattern=flat
honestbench | enabled=true | lifecycle=active | pattern=flat
mount-probe | enabled=true | lifecycle=active | pattern=flat
armes | enabled=true | lifecycle=active | pattern=flat
armes-new | enabled=false | lifecycle=retired | pattern=flat
```

```evidence:layers
MEASURED: select backend_id, count(*), count(*) filter (where enabled) from backend_entity_layers group by 1
armes | 4 | 4
```

```evidence:scopes
MEASURED: distinct user_id in user_backend_scopes, and those lacking a backend_id='armes' row
all_scoped 14 | lacking 0
MEASURED: string_agg of backend_id per user, grouped
armes,machine-knowledge-base,superset,system x14
```

```evidence:newfence
MEASURED: active tools of lifecycle=active non-gateway backends other than armes, not also owned by armes
honestbench 4 | machine-knowledge-base 5 | mount-probe 4
```

```evidence:server
MEASURED: jsonb_array_elements(mcp_global_settings.servers) where backend_id='armes'
one server, enabled=true
MEASURED: mcp_settings rows whose server id equals that global server id
0 of 4 user rows
```

```evidence:multi
MEASURED: backend_tools status=active join backends lifecycle=active and tool_pattern<>'gateway', group by tool_name having count(distinct backend_id)>1
4 names, every one owned by honestbench,mount-probe
```

```evidence:collide
MEASURED: backend_tools status=active on served non-gateway backends joined on tool_name to active tools of tool_pattern='gateway' backends
MEASURED: collide join = 0 rows
```

```evidence:retired
MEASURED: active tool names whose every non-gateway owner is not lifecycle=active
1 name (getDailyLineStops, owned by armes-new only)
```

```evidence:serve
api/cwf/_lib/backends/backendLifecycle.ts:107:    active:  Object.freeze({ served: true,  synced: true,  probed: true,  visible: true }),
```

## PREMISE
MEASURED: the anchors above.
UNMEASURED by the Architect, READ from the scout's primary-source readings (bus 2026-09-22T08:31:35Z and 15:21:26Z): ctx.redirectDecision is ONE RedirectDecision set at the offer boundary; ctx.activeBackends = the user's merged enabled servers mapped to backend_id, filtered by scopes, then lifecycle (resolveActiveBackends, stagesResolve), and clarify runs after that pipeline (runTurn); the three replay lenses do NOT read ClarifySpanRecord.backend: they read the registry keyed by their own constants; ClarifySpanRecord.backend feeds only the span input; the misroute text is a code-literal tool RESULT in gatewayPreflight, not a governed prompt segment, so promptRev does not move; eval-canary is frozen (build-test.yml, owner ruling 2026-08-27).
UNMEASURED as a whole, derived from the server, scopes and layers anchors: every live turn today has armes active, so the union in ORDER 1 changes no live turn today. Also READ from the scout (15:21:26Z): resolveActiveBackends restricts a scoped user to their scopes and partitionByServe drops non-served backends, so ctx.activeBackends is already scope- and lifecycle-filtered.
SELF-INVALIDATION: dies if any anchor reads differently at your head (then STOP and print both).
ON-DISAGREEMENT: YOUR READING WINS: print both values, continue with yours.

## FALSIFIER
If, on a recorded live turn replayed at your head, the set of resolved entities, the offered tools, or the fence decision differs from master for any turn whose active backends include the backend with entity layers, the change is wrong: STOP and report the turn id. The INTENDED fence changes of ORDER 3 (a) and (b) and the DECLARED redirect-line bytes of ORDER 4 are not falsifier hits; any other difference is.

## ORDERS
1. stageClarify: remove ENTITY_ALIAS_BACKEND_ID. The alias, layer, registry, vector-suggestion and ask-suggestion reads run for each backend in ctx.activeBackends that has enabled backend_entity_layers rows (config), results unioned, each candidate carrying its backend. A turn whose active backends hold no layered backend resolves no entities: INTENDED, named in the report. bindResolvedEntities (stageTools) binds only entities whose backend equals the server's backend_id (no live effect today; name it in the report).
2. Record shape: ClarifySpanRecord keeps `backend` = the single contributing backend when exactly one contributed, else null (0 or 2+ contributors, and on every early return including newClarifySpanRecord); adds `backends` (string[]), always set. The three replay lenses (clarificationLens, frameForceFitLens, lineResolutionLens) drop their private backend constants and read the backends that have enabled backend_entity_layers rows, the same predicate as ORDER 1 (today armes, so byte-identical).
3. Misroute fence (gatewayPreflight + stageTools): the mirror is a map tool name -> SET of owning backends over the active tools of every non-gateway backend in THIS turn's ctx.activeBackends (already scope- and lifecycle-filtered), not a global list. A gateway call_tool naming a tool in the map is refused. Text: when at least one owner is not withheld, the result names only the non-withheld owners by id from data, sorted ascending, joined by ", "; when every owner is withheld, the withheld arm is used. INTENDED changes, named in the report with their sets: (a) names owned only by active non-gateway backends other than today's single mirrored one become fenced when those backends are in the turn (newfence anchor; for every scoped user today that is the machine-knowledge-base names; honestbench and mount-probe are in no scoped user's set); (b) a name owned only by a backend not in the turn (retired, or out of scope) is not in the mirror and passes the gateway preflight, exactly as a name in no mirror does (today getDailyLineStops, armes-new retired). Mirror state: unreadable if any backend's read failed (still fail-open, S81); names from the reads that succeeded still fence; the span attribute says which backends were unreadable. Re-measure collide, multi, retired and newfence at your head; collide non-empty is STOP.
4. Redirect decision: from one RedirectDecision to a per-backend map keyed by backend id; the withheld check reads the entries of the owners of the called tool (rule in ORDER 3). The legacy single ctx.redirectDecision stays populated at the offer boundary with: withheldBackends = ctx.mcpWithheldBackends verbatim (byte-identical to master); backendId = the sorted, ", "-joined ids of the non-gateway backends in ctx.activeBackends; allowed = true only when none of those is withheld. DECLARED byte changes, named in the report: the backend= field of formatRedirectDecisionLine on every turn, and redirectAllowed on turns where a non-gateway backend other than today's mirrored one is withheld. The stageTools branch that reads the legacy backendId is re-expressed through the per-backend map; print its decision at base and at head on (i) a healthy turn, (ii) an armes-withheld turn, (iii) a machine-knowledge-base-withheld turn: a changed decision is STOP. Pin the new line bytes in redirectDecision.test.ts.
5. Tool-result bytes: the misroute text changes from the hard-coded display name to the owning backend id(s). Update the pinned bytes in all five tests in the same commit and name each in the report: decisionParityBug007LockedDoor, decisionParityBug002WithheldNotAbsent, decisionParityBug006GatewayFence, gatewayPreflight.test, gatewaySurfaceStageTools.test. Print promptRev at base and at head: unchanged is pass. Canary is frozen: no spend fires; if any workflow would fire eval-canary, STOP and report.
6. The remaining DEFAULT_BACKEND_ID uses in turn/stageTools.ts, turn/gatewayPreflight.ts and turn/types.ts are gone; the constant stays only for the G2 sites (replay/groundingSlice.ts, api/admin/replay.ts); update its comment.
7. Tests: (i) the fence refuses a gateway call named in one active flat backend's mirror and names that backend; (ii) a name owned by two active flat backends: both healthy, the text names both sorted; one withheld, the text names only the other; both withheld, the withheld arm; (iii) a name owned only by a retired backend passes; (iv) a name owned only by a backend outside the user's scope passes; (v) a name in no mirror passes; (vi) one backend's mirror read fails: state unreadable, the other reads still fence; (vii) clarify with two active backends where only one has layers resolves the same set as master; (viii) replay of a recorded single-backend turn is byte-identical except the declared ORDER 4 bytes. Plant a fault (restore the constant in stageClarify) and show a test go red.
8. Count, case-sensitive: at your head `git grep -n -E "armes|Armes|ARMES" -- <every file you touched>` prints no non-comment code line except the DEFAULT_BACKEND_ID definition and kind-id literals left for G2; print the command and output. The literal "Superset gateway" in gatewayPreflight's text: render the gateway from its backend id from data in this card, so no vendor name stays in that code path.
9. npm run build (all five gates) + full suite + typecheck:api locally; open the PR; slip SLIP-ARMES-G1A2-TURN-PATH-S155-1 with branch, full head sha, PR number, CI runs by full sha, what is still dark. Stop.

## SHARED SURFACES
public/architecture/ narrative tabs, stagesRegistry.ts description text, and a reseal if doc-drift asks; merge origin/master, then reseal, in one commit.

## DECISION RIGHTS
AG-1 designs inside "backend from data, never from code". A site needing a DB change: STOP for it, finish the rest. The Architect decided the multi-owner text (the non-withheld owners, sorted, joined by ", ") and the withheld rule (the withheld arm only when all owners are withheld).
FORBIDDEN: no backend, vendor or tenant name added in code; no removal of a user-visible function; no poll task, no cron; never print an environment value; never merge your own PR.

END · CARD-ARMES-G1A2-TURN-PATH-S155-1-v3
