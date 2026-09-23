<!-- relay-audit: v1 kind=card -->
CARD-A24-P1C2-K24-ROUTING-FIELDS-S158-1-v1

LANE: AG-1 (fresh window: one card per window; AFTER your G2 PR has landed)
fanout: personalized (one lane, one body)
MEASURED-AT: 2026-09-23T06:10Z (bridge clock, date -u in the command that wrote this file)
OWNER APPROVAL: S158 plan approval "onayliyorum", 2026-09-23 08:40 TSI (step 5: C2 cut and sent to the scout); OWNER-APPROVAL-S150-A24-V1_3-FINAL-1; OWNER-APPROVAL-S151-PARALLEL-1 (AG-1 owns routing). Owner scope rule: no functionality removed.
ADVERSARY GATE: NEW SUBJECT. Goes to the scout first (ORDER-SCOUT-REVIEW-CARD-A24-P1C2-K24-ROUTING-FIELDS-S158-1-v1); reaches AG-1 only with a GREEN verdict row.
BRANCH: phase/a24-p1c2-k24-routing-fields-s158-1 off origin/master AFTER the G2 merge · PUSH early · REPORT docs/relay/A24-P1C2-K24-ROUTING-FIELDS-S158-1-AG1-report.md with a FILE-FENCE block · PR: yes, non-draft.
GRAFT: code context from graft first; slip and report carry a GRAFT line.

THE PROBLEM, in plain words. A24 v1_3 freezes a trace schema (cwf.trace.v1, K24) so that the routing exam (C3) can score every turn per backend. Today the router's stage-07 span output carries the matched categories, the frame and the offered tool names, but NOT three things the exam needs: which categories the FRAME derived before they were merged with the keyword layer, which governed metric hints were applied, and which backend each offered tool belongs to. Per-backend routing recall is computed nowhere because the backend axis is not recorded. This card ADDS those fields to the trace. It changes no routing decision.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| master at cut time | MEASURED: GitHub API commits/master, Architect bridge, 2026-09-23T06:08Z | master |
| the lines cited below | MEASURED: git grep -n and git show at the master anchor on the owner clone's remote-tracking ref, Architect bridge, 2026-09-23T06:10Z | lines |
| the trace schema's frozen field list | READ: docs/A24-V1_3-ARCHITECT-CAPTURE-S150-1-v1.md in the project box (cwf.trace.v1 paragraph), 2026-09-23 | schema |

```evidence:master
2d7087bff1eda24b6224c2fbd9a9d987061dec7d
```

```evidence:lines
api/cwf/_lib/routing/deriveCategories.ts:35  export interface DerivedCategories { categories; basis: 'frame'; unmapped; metricFloorApplied?: true }
api/cwf/_lib/routing/deriveCategories.ts:167  export function deriveCandidateCategories(frame, vocab): DerivedCategories
api/cwf/_lib/routing/deriveCategories.ts:170-174  hints: the frame metrics' categoryHints, unioned (applied for every action since C1)
api/cwf/_lib/toolCategories.ts:1579  let basis: 'frame' | 'keyword' | 'union' = 'keyword'
api/cwf/_lib/toolCategories.ts:1598  const derived = deriveCandidateCategories(irFrame, vocab)
api/cwf/_lib/toolCategories.ts:1658  trace.getActiveSpan()?.setAttributes({ ATTR_ROUTE_* })
api/cwf/_lib/toolCategories.ts:1879-1884  filterToolsByMessage's return object (additive fields go here)
api/cwf/_lib/turn/stageTools.ts:978  ctx.offeredToolNames = new Set(toolDefs.map((t) => t.name))
api/cwf/_lib/turn/stageTools.ts:1106-1140  setSpanIO(..., { input, output: (stage07Output = { path, floorReason, matchedCategories, droppedCategories, stickyAdded, basis, irFrame, offeredToolNames, offeredCount, gatewayCount, uncoveredCount, uncoveredBackends, ... }) })
```

```evidence:schema
cwf.trace.v1 (frozen, K24): trace_id · ts · turn_class · backend_id[] · card_version[] · index_build_id · exam_id · model_router · model_planner · model_main · query_raw · frame{...} · retrieval_layer · scores[] · conformal_set[] · alpha · decision · slot_resolution[] · ask · offered_set[] · plan{...} · exec_calls[] · aggregates[] · reach{...} · result_class · grounded · citation_ok · numeric_claims_unsourced · latency_ms{...} · tool_output_tokens · notes(UNMEASURED stamps by name)
```

## PREMISE
MEASURED: the anchors above.
UNMEASURED by the Architect: how stageTools.ts knows a tool's backend at :978 (the registry that produced toolDefs, the gateway split, uncoveredBackends at :1139 suggests a per-backend map exists); ORDER 0 finds it with graft.
UNMEASURED: whether AG-1's G2 PR moved any line above; ORDER 0 re-prints them.
SELF-INVALIDATION: dies if any symbol above is absent at your head (STOP and print both).
ON-DISAGREEMENT: YOUR READING WINS: print both values, continue with yours.

## FALSIFIER
For every recorded turn replayable through replay/routeShadowLens.ts at your head: matchedCategories, offeredToolNames and path are byte-identical to master's (the fields are ADDED, no decision moves). A turn whose frame derived categories that the union then kept must show them in the new derived field; a turn whose frame carried a metric with categoryHints must show those hints. Any routing difference: STOP.

## ORDERS
0. MEASURE, no code: re-print every line in `lines` (SAME or DIFFERENT); name the source of each offered tool's backend id at :978; print stage07Output for two recorded turns (one keyword, one frame) from turn_trace_digest via the replay lens.
1. deriveCategories: expose the applied hints WITHOUT changing DerivedCategories' existing equality (deriveCategories.test.ts pins objects): extract the hint union at :170-174 into one exported pure function (for example metricHintsFor(frame, vocab)) that deriveCandidateCategories itself calls; no second copy of the rule.
2. filterToolsByMessage: add to its return, additively, `derived` = { categories, unmapped, metricFloorApplied, hints } when the frame branch ran, and ABSENT when it did not (empty != zero: a branch that never ran is not an empty derivation). Every existing return key stays byte-identical on every branch including 'all-fallback'.
3. stage07Output (stageTools.ts :1106-1140 region ONLY): add `derived` (from 2), `offeredByBackend` = { <backendId>: toolName[] } over the SAME toolDefs that fill offeredToolNames, with a tool whose backend is unknown listed under the key UNATTRIBUTED (never dropped, never guessed), and `traceSchema: 'cwf.trace.v1'`. No field is fabricated: a K24 field with no value at routing today is not emitted here (the exam card C3 owns the rest).
4. No backend, vendor or tenant name in code (AGNOSTIC-1, OWNER-RULING-S153-NO-ARMES-HARDCODE-1); fixtures use neutral ids.
5. Tests, failing-first, each proven by a planted fault: (a) metricHintsFor equals the old inline union on the existing deriveCategories fixtures; (b) derived present on the frame branch, absent on keyword-only and all-fallback; (c) offeredByBackend covers exactly offeredToolNames (set equality) including an UNATTRIBUTED tool; (d) FALSIFIER replay: routing decisions byte-identical. Every existing test literal unchanged.
6. npm run build (all five gates; doc-drift tab update + reseal in the same commit if named), full suite, typecheck:api; PR; CI read at the full head sha, a zero read twice; slip SLIP-A24-P1C2-K24-ROUTING-FIELDS-S158-1 with branch, full head, PR number, CI runs by name, the two ORDER 0 stage07Output samples before/after. Stop.

## SHARED SURFACES
```scope
- api/cwf/_lib/routing/deriveCategories.ts (extract metricHintsFor; nothing else)
- api/cwf/_lib/toolCategories.ts (filterToolsByMessage return objects only; G2c owns the rest of this file)
- api/cwf/_lib/turn/stageTools.ts (the stage07Output region :1106-1140 only)
- api/cwf/_lib/routing/__tests__/ and api/cwf/__tests__/ (new tests)
- public/architecture/ tabs check:doc-drift names, and the reseal
- docs/relay/A24-P1C2-K24-ROUTING-FIELDS-S158-1-AG1-report.md
```

## DECISION RIGHTS
AG-1 names the fields and the pure function inside "add, never move a decision". The Architect decided: no routing change in this card; the backend axis comes from data the turn already holds, never from a name in code.
FORBIDDEN: no change to matchedCategories, offered sets or any routing branch; no new span; no migration; no DB write; no poll task, no cron; never print an environment value; never merge your own PR.

END · CARD-A24-P1C2-K24-ROUTING-FIELDS-S158-1-v1
