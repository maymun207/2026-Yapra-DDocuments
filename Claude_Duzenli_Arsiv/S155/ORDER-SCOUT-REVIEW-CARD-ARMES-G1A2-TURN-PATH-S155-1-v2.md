<!-- relay-audit: v1 kind=notice -->
ORDER-SCOUT-REVIEW-CARD-ARMES-G1A2-TURN-PATH-S155-1-v2

LANE: scout (the scout that wrote the v1 RED status if free, else whichever scout is free first)
fanout: personalized (one lane, one body)
FROM: Architect, S155, bus clock about 2026-09-22T15:09Z
OWNER APPROVAL: OWNER-RULING-S153-NO-ARMES-HARDCODE-1; S155 plan approval "onay" 18:03 TSI.
NO POLL OR CRON TASK. Bekleme dongusu yok. When your status is written, stop.
GATE-NOTE: written with a STEPS section. The local cardPreflight refuses this notice R-EXEMPT-SHAPE only because the embedded card carries its own ## ORDERS; that is the S154 embed shape; report it, do not act on it.
GRAFT: code context from graft first; your status carries a GRAFT line.
WHAT: re-review of CARD-ARMES-G1A2-TURN-PATH-S155-1-v2 (item 58), which applies your v1 RED edits CP-2, A1-A5, (e). Card body = the bytes after the BEGIN marker line up to and including the final newline before the END marker line; sha256 = e46e29cb1d62b0afd469de175b71a118e815bd9a6c957eabe4f38b2a192f7eec.

## PREMISE
MEASURED: 2026-09-22T15:09Z, Architect bridge, sha256sum of the card file as embedded below.
SELF-INVALIDATION: dies if a v3 of the card is posted.
ON-DISAGREEMENT: your reading wins; print both.

## STEPS
1. Run the repository card gate (mail-wait --read and cardPreflight --check) on the card bytes; print any refusal verbatim. If the two gates disagree, print both (12.13).
2. For each of CP-2, A1, A2, A3, A4, A5, (e): applied as you asked, yes or no, with the card line. Then attack what is NEW: the multi-owner text rule and withheld rule (ORDER 3), the intended pass of a retired-only name (ORDER 3), the legacy redirect value (ORDER 4), and rendering the gateway name from data (ORDER 8). Base is now origin/master after PR 593: re-read the code anchors there.
3. Verdict: first line `ADVERSARY-VERDICT: GREEN|RED card=CARD-ARMES-G1A2-TURN-PATH-S155-1-v2 sha256=<sha256>`, then each defect with the change that makes it GREEN, and which may ride as edits.
REPLY (on the bus): SCOUT-STATUS-REVIEW-CARD-ARMES-G1A2-TURN-PATH-S155-1-v2. If the bus write is refused, print the whole status in your window.
FORBIDDEN: read-only. No status post on any PR, no edit, no poll task, no cron. Never print an environment value.

=== BEGIN CARD ===
<!-- relay-audit: v1 kind=card -->
CARD-ARMES-G1A2-TURN-PATH-S155-1-v2

LANE: AG-1 (one card per window: /clear before this card)
fanout: personalized (one lane, one body)
MEASURED-AT: 2026-09-22T15:09Z (bus clock)
SUPERSEDES: CARD-ARMES-G1A2-TURN-PATH-S154-1-v1 (scout RED, SCOUT-STATUS-REVIEW-CARD-ARMES-G1A2-TURN-PATH-S154-1-v1, bus 2026-09-22T08:31:35Z). Applied as edits, all and only: CP-2, A1, A2, A3, A4, A5, (e). Base moved: G1a-1 (PR 593) is on master.
OWNER RULING: OWNER-RULING-S153-NO-ARMES-HARDCODE-1. S155 plan approval "onay" 18:03 TSI.
ADVERSARY GATE: goes back to the scout that asked for it (ORDER-SCOUT-REVIEW-CARD-ARMES-G1A2-TURN-PATH-S155-1-v2). Reaches AG-1 only with a GREEN verdict row.
BRANCH: phase/armes-g1a2-turn-path-s155-1 off origin/master · PUSH early · REPORT docs/relay/ARMES-G1A2-TURN-PATH-S155-1-AG1-report.md · PR: yes, non-draft.
GRAFT: take code context from graft first; slip and report carry a GRAFT line. graft may index a stale local tree: line anchors from git show on origin/master.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| master at cut time, G1a-1 merged | MEASURED: GitHub API commits/master and pulls/593, Architect bridge, 2026-09-22T15:01Z | master |
| backends, their enabled flag, lifecycle and tool pattern | MEASURED: execute_sql on project fjbrkimwvtpwoxhziidh, Architect Supabase MCP, 2026-09-22T15:04Z | backends |
| only one backend has entity layers today | MEASURED: execute_sql, same project, 2026-09-22T15:04Z | layers |
| every scoped user holds that backend | MEASURED: execute_sql, same project, 2026-09-22T15:04Z | scopes |
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
armes-new | enabled=true | lifecycle=retired | pattern=flat
```

```evidence:layers
MEASURED: select backend_id, count(*), count(*) filter (where enabled) from backend_entity_layers group by 1
armes | 4 | 4
```

```evidence:scopes
MEASURED: distinct user_id in user_backend_scopes, and those lacking a backend_id='armes' row
all_scoped 14 | lacking 0
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
collide join = 0 rows
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
READ from the scout's primary-source reading (bus 2026-09-22T08:31:35Z), not re-measured by the Architect: ctx.redirectDecision is ONE RedirectDecision set at the offer boundary; ctx.activeBackends = the user's merged enabled servers mapped to backend_id, filtered by scopes, then lifecycle (resolveActiveBackends, stagesResolve), and clarify runs after that pipeline (runTurn); the three replay lenses do NOT read ClarifySpanRecord.backend: they read the registry keyed by their own constants; ClarifySpanRecord.backend feeds only the span input; the misroute text is a code-literal tool RESULT in gatewayPreflight, not a governed prompt segment, so promptRev does not move; eval-canary is frozen (build-test.yml, owner ruling 2026-08-27).
Consequence of server + scopes + layers: every live turn today has armes active, so the union in ORDER 1 changes no live turn today.
SELF-INVALIDATION: dies if any anchor reads differently at your head (then STOP and print both).
ON-DISAGREEMENT: YOUR READING WINS: print both values, continue with yours.

## FALSIFIER
If, on a recorded live turn replayed at your head, the set of resolved entities, the offered tools, or the fence decision differs from master for any turn whose active backends include the backend with entity layers, the change is wrong: STOP and report the turn id. The one INTENDED fence change is named in ORDER 3 (a name owned only by a non-served backend) and is not a falsifier hit.

## ORDERS
1. stageClarify: remove ENTITY_ALIAS_BACKEND_ID. The alias, layer, registry, vector-suggestion and ask-suggestion reads run for each backend in ctx.activeBackends that has enabled backend_entity_layers rows (config), results unioned, each candidate carrying its backend. A turn whose active backends hold no layered backend resolves no entities: INTENDED, named in the report. bindResolvedEntities (stageTools) binds only entities whose backend equals the server's backend_id (no live effect today; name it in the report).
2. Record shape: ClarifySpanRecord keeps `backend` = the single contributing backend when exactly one contributed, else null (0 or 2+ contributors, and on every early return including newClarifySpanRecord); adds `backends` (string[]), always set. The three replay lenses (clarificationLens, frameForceFitLens, lineResolutionLens) drop their private backend constants and read the backends that have enabled backend_entity_layers rows, the same predicate as ORDER 1 (today armes, so byte-identical).
3. Misroute fence (gatewayPreflight + stageTools): the mirror is a map tool name -> SET of owning backends over the active tools of every non-gateway backend the lifecycle SERVES (partitionByServe / isServed), not backends.enabled. A gateway call_tool naming a tool in the map is refused; the result names every owner by id from data, sorted ascending, joined by ", ". Withheld: the call counts as withheld only when every owner is withheld. INTENDED change, named in the report: a name owned only by a non-served backend (today getDailyLineStops, armes-new retired) is no longer in the mirror and passes the gateway preflight, exactly as a name in no mirror does. Re-measure collide, multi and retired at your head; collide non-empty is STOP.
4. Redirect decision: from one RedirectDecision to a per-backend map keyed by backend id; the withheld check reads the entries of the owners of the called tool. The legacy single ctx.redirectDecision stays populated with: withheldBackends = the union of withheld owners (unchanged from today on a single-owner call), allowed = true only when every map entry is allowed. It must be byte-identical to master on today's healthy turn and on an armes-withheld turn, including the span attributes redirectAllowed and redirectWithheldBackends. Name the change to formatRedirectDecisionLine and pin its bytes in redirectDecision.test.ts.
5. Tool-result bytes: the misroute text changes from the hard-coded display name to the owning backend id(s). Update the pinned bytes in all five tests in the same commit and name each in the report: decisionParityBug007LockedDoor, decisionParityBug002WithheldNotAbsent, decisionParityBug006GatewayFence, gatewayPreflight.test, gatewaySurfaceStageTools.test. Print promptRev at base and at head: unchanged is pass. Canary is frozen: no spend fires; if any workflow would fire eval-canary, STOP and report.
6. The remaining DEFAULT_BACKEND_ID uses in turn/stageTools.ts, turn/gatewayPreflight.ts and turn/types.ts are gone; the constant stays only for the G2 sites (replay/groundingSlice.ts, api/admin/replay.ts); update its comment.
7. Tests: (i) the fence refuses a gateway call named in one served flat backend's mirror and names that backend; (ii) a name owned by two served flat backends is refused and the text names both, sorted; (iii) a name owned only by a retired backend passes; (iv) a name in no mirror passes; (v) clarify with two active backends where only one has layers resolves the same set as master; (vi) replay of a recorded single-backend turn is byte-identical. Plant a fault (restore the constant in stageClarify) and show a test go red.
8. Count, case-sensitive: at your head `git grep -n -E "armes|Armes|ARMES" -- <every file you touched>` prints no non-comment code line except the DEFAULT_BACKEND_ID definition and kind-id literals left for G2; print the command and output. The literal "Superset gateway" in gatewayPreflight's text: render the gateway from its backend id from data in this card, so no vendor name stays in that code path.
9. npm run build (all five gates) + full suite + typecheck:api locally; open the PR; slip SLIP-ARMES-G1A2-TURN-PATH-S155-1 with branch, full head sha, PR number, CI runs by full sha, what is still dark. Stop.

## SHARED SURFACES
public/architecture/ narrative tabs, stagesRegistry.ts description text, and a reseal if doc-drift asks; merge origin/master, then reseal, in one commit.

## DECISION RIGHTS
AG-1 designs inside "backend from data, never from code". A site needing a DB change: STOP for it, finish the rest. The Architect decided the multi-owner text (every owner, sorted, joined by ", ") and the withheld rule (all owners withheld).
FORBIDDEN: no backend, vendor or tenant name added in code; no removal of a user-visible function; no poll task, no cron; never print an environment value; never merge your own PR.

END · CARD-ARMES-G1A2-TURN-PATH-S155-1-v2
=== END CARD ===

END · ORDER-SCOUT-REVIEW-CARD-ARMES-G1A2-TURN-PATH-S155-1-v2
