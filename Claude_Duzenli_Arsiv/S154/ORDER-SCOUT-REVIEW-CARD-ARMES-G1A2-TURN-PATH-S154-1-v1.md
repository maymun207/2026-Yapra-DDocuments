<!-- relay-audit: v1 kind=notice -->
ORDER-SCOUT-REVIEW-CARD-ARMES-G1A2-TURN-PATH-S154-1-v1

LANE: scout (whichever scout finishes its current order first)
fanout: personalized (one lane, one body)
FROM: Architect, S154, bus clock about 2026-09-22T08:20Z
NO POLL OR CRON TASK. Bekleme dongusu yok. When your status is written, stop.
GATE-NOTE: written with a STEPS section.
GRAFT: code context from graft first; your status carries a GRAFT line.
WHAT: adversarial review of CARD-ARMES-G1A2-TURN-PATH-S154-1-v1 (item 58, turn path). Card body = the bytes after the BEGIN marker line up to and including the final newline before the END marker line; sha256 = 04feac7050c602ac1c668fc03234b4ab369b182aa8cda060e926bc30aa50225a.

## PREMISE
MEASURED: 2026-09-22T08:20Z, Architect bridge, sha256 of the card body as written above.
SELF-INVALIDATION: dies if a v2 of the card is posted.
ON-DISAGREEMENT: your reading wins; print both.

## STEPS
1. Run the repository card gate on the card bytes; print any refusal verbatim.
2. Attack from PRIMARY sources: (a) did the card answer D2, D3, D4 of your G1A status; (b) does ORDER 1's union change a live turn (read the layers and scopes anchors against the code path that builds ctx.activeBackends, including users with no scope rows); (c) is the per-backend redirect map a behaviour change on a single-backend turn; (d) is ORDER 5's tool-result byte change classed as prompt bytes by the eval gate (read the classifier); (e) any backend or tenant name added.
3. Verdict: first line `ADVERSARY-VERDICT: GREEN|RED card=CARD-ARMES-G1A2-TURN-PATH-S154-1-v1 sha256=<sha256>`, then each defect with the change that makes it GREEN, and which may ride as edits.
REPLY (on the bus): SCOUT-STATUS-REVIEW-CARD-ARMES-G1A2-TURN-PATH-S154-1-v1. If the bus write is refused, print the whole status in your window.
FORBIDDEN: read-only. No status post on any PR, no edit, no poll task, no cron. Never print an environment value.

=== BEGIN CARD ===
<!-- relay-audit: v1 kind=card -->
CARD-ARMES-G1A2-TURN-PATH-S154-1-v1

LANE: AG-1 (after SLIP-ARMES-G1A1-NO-DEFAULT-BACKEND-S154-1 is on the bus; one card per window: /clear between)
fanout: personalized (one lane, one body)
MEASURED-AT: 2026-09-22T08:20Z (bus clock)
OWNER RULING: OWNER-RULING-S153-NO-ARMES-HARDCODE-1. Owner plan approval S154 "onayliyorum" 06:40 TSI.
ORIGIN: part G1a-2 of the split the scout named in SCOUT-STATUS-REVIEW-CARD-ARMES-G1A-NO-DEFAULT-BACKEND-S154-1-v1 (D2, D3, D4); G1a-1 is CARD-ARMES-G1A1-NO-DEFAULT-BACKEND-S154-1-v2.
ADVERSARY GATE: NEW BYTES on the turn path. Goes to the scout first; reaches AG-1 only with a GREEN verdict row.
BRANCH: phase/armes-g1a2-turn-path-s154-1 off master AFTER the G1a-1 PR has landed (if it has not, off the G1a-1 branch head and say so) · PUSH early · REPORT docs/relay/ARMES-G1A2-TURN-PATH-S154-1-AG1-report.md · PR: yes, non-draft.
GRAFT: take code context from graft first; slip and report carry a GRAFT line.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| master at cut time | MEASURED: GitHub API commits/master, Architect bridge, 2026-09-22T06:55Z | master |
| only one backend has entity layers today | MEASURED: execute_sql on project fjbrkimwvtpwoxhziidh, Architect Supabase MCP, 2026-09-22T08:16Z | layers |
| every scoped user holds that backend, so no live user loses entity resolution | MEASURED: execute_sql, same project, 2026-09-22T08:17Z | scopes |
| no active tool name of any enabled non-gateway backend collides with a gateway backend tool name | MEASURED: execute_sql, same project, 2026-09-22T08:17Z | collide |
| the registry display name differs from the name in today's misroute message | MEASURED: execute_sql, same project, 2026-09-22T08:18Z | display |

```evidence:master
9aba71fe2cbad0c53f3996d01b8991e5bbe40ed4
```

```evidence:layers
select backend_id, count(*), count(*) filter (where enabled) from backend_entity_layers group by 1
armes | 4 | 4
```

```evidence:scopes
select count(distinct user_id) all_scoped, count(distinct user_id) filter (where user_id not in (select user_id from user_backend_scopes where backend_id='armes')) lacking from user_backend_scopes
all_scoped 14 | lacking 0
```

```evidence:collide
join of backend_tools status=active on tool_name, left side backends.tool_pattern <> 'gateway' and enabled, right side backends.tool_pattern = 'gateway'
(0 rows)
```

```evidence:display
select id, display_name from backends where id = 'armes'
armes | ARMES — Kale Seramik MES
```

## PREMISE
MEASURED: the anchors above.
UNMEASURED by the Architect, carried from the scout status (bus 2026-09-22T06:59:15Z): ctx.redirectDecision is ONE RedirectDecision (turn/types.ts) set at the offer boundary before any call; the misroute text is a model-facing tool RESULT pinned byte-exact by decisionParityBug007LockedDoor.test.ts; ClarifySpanRecord.backend is a single string that the replay lenses read on historical turns; health withholding strips tools not servers, while RBAC scope and lifecycle can drop a backend from ctx.activeBackends.
SELF-INVALIDATION: dies if any anchor above reads differently at your head (then STOP and print both).
ON-DISAGREEMENT: YOUR READING WINS: print both values, continue with yours.

## FALSIFIER
If, on a recorded live turn replayed at your head, the set of resolved entities, the offered tools, or the fence decision differs from master for any turn whose active backends include the backend with entity layers, the change is wrong: STOP and report the turn id.

## ORDERS
1. stageClarify: remove ENTITY_ALIAS_BACKEND_ID. The alias, layer, registry, vector-suggestion and ask-suggestion reads run for each backend in ctx.activeBackends that has enabled backend_entity_layers rows (config), results unioned, each candidate carrying its backend. A turn whose active backends hold no layered backend resolves no entities: this is the INTENDED change (an entity of a backend the turn cannot use is not offered) and the report names it; the scopes anchor shows no scoped live user is in that set today.
2. Record shape: ClarifySpanRecord keeps `backend` (string, the single backend when exactly one contributed) and adds `backends` (string[]); every reader, including the three replay lenses (clarificationLens, frameForceFitLens, lineResolutionLens), accepts both, so historical turns replay unchanged. Remove the three lenses' private backend constants.
3. Misroute fence (gatewayPreflight + stageTools): the mirror is a map tool name -> owning backend over the active tools of every enabled backend whose tool_pattern is not gateway. A gateway call_tool naming a tool in that map is refused and the result names the OWNING backend by its id from data. Re-measure the collide anchor at your head; non-empty is STOP.
4. Redirect decision: from one RedirectDecision to a per-backend map keyed by backend id; the withheld check reads the entry of the backend that owns the called tool. Name the change to formatRedirectDecisionLine and to the span shape in the report; keep the old single field populated for readers that exist today.
5. Tool-result bytes: the misroute text changes from the hard-coded name to the owning backend's id. Update the pinned bytes in decisionParityBug007LockedDoor.test.ts in the same commit and name it in the report. Before pushing, run the eval-gate's own classifier on the diff: if it classes this as a prompt or tool-description change (spend), STOP and report; the owner names any eval-canary spend.
6. With this card, the remaining DEFAULT_BACKEND_ID uses in turn/stageTools.ts and turn/gatewayPreflight.ts are gone; the constant stays only for the G2 sites (replay/groundingSlice.ts, api/admin/replay.ts); update its comment.
7. Tests: fence refuses a gateway call named only in a non-system_of_record flat backend's mirror and names that backend; a name in no mirror passes; clarify with two active backends where only one has layers resolves the same set as master; replay of a recorded single-backend turn is byte-identical. Plant a fault (restore the constant in stageClarify) and show a test go red.
8. Count, case-sensitive: at your head `git grep -n -E "armes|Armes|ARMES" -- <every file you touched>` prints no non-comment code line except the DEFAULT_BACKEND_ID definition and kind-id literals left for G2; print the command and output.
9. npm run build (all five gates) + full suite + typecheck:api locally; open the PR; slip SLIP-ARMES-G1A2-TURN-PATH-S154-1 with branch, full head sha, PR number, CI runs by full sha, what is still dark. Stop.

## SHARED SURFACES
public/architecture/ narrative tabs and a reseal if doc-drift asks.

## DECISION RIGHTS
AG-1 designs inside "backend from data, never from code". A site needing a DB change: STOP for it, finish the rest.
FORBIDDEN: no backend, vendor or tenant name added in code; no removal of a user-visible function; no poll task, no cron; never print an environment value; never merge your own PR.

END · CARD-ARMES-G1A2-TURN-PATH-S154-1-v1
=== END CARD ===

END · ORDER-SCOUT-REVIEW-CARD-ARMES-G1A2-TURN-PATH-S154-1-v1
