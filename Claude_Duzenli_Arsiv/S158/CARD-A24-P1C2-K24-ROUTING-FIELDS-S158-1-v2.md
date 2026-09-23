<!-- relay-audit: v1 kind=card -->
CARD-A24-P1C2-K24-ROUTING-FIELDS-S158-1-v2

LANE: AG-1 (fresh window: one card per window; AFTER your G2 PR has landed)
fanout: personalized (one lane, one body)
SUPERSEDES: CARD-A24-P1C2-K24-ROUTING-FIELDS-S158-1-v1 (scout RED ON EDITS, design holds, complete delta E1..E9: SCOUT-STATUS-REVIEW-CARD-A24-P1C2-K24-ROUTING-FIELDS-S158-1-v1, bus 2026-09-23T07:43:23Z). v2 = v1 plus E1..E9 VERBATIM, each marked (E<n>), plus the Architect's E9 ruling; nothing else changed. Owner-design credit: none; scout credit: F1..F9.
MEASURED-AT (v1): 2026-09-23T06:10Z (bridge clock, date -u in the command that wrote this file)
OWNER APPROVAL: S158 plan approval "onayliyorum", 2026-09-23 08:40 TSI (step 5: C2 cut and sent to the scout); OWNER-APPROVAL-S150-A24-V1_3-FINAL-1; OWNER-APPROVAL-S151-PARALLEL-1 (AG-1 owns routing). Owner scope rule: no functionality removed.
ADVERSARY GATE: EXEMPT, named: v2 repeats v1's subject and applies only the scout's complete delta (loop-breaking case, OWNER-RULING-S133-P6-SCOPE-AND-LOOP-1, project instructions 12.1). v2 cut 2026-09-23T07:45Z.

```evidence:adversary
ADVERSARY: EXEMPT
ack: 9f323628-f6a2-419e-a089-126178fb756a
```
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
(E3) routing byte-identity through runRouteShadowLens when the service client is present, else test 5(d) on fixtures stands alone and the report says which: matchedCategories, offeredToolNames and path are byte-identical to master's (the fields are ADDED, no decision moves); the derived and hints claims are proven by direct filterToolsByMessage calls in 5(b), not through the lens. A turn whose frame derived categories that the union then kept must show them in the new derived field; a turn whose frame carried a metric with categoryHints must show those hints. Any routing difference: STOP.

## ORDERS
0. MEASURE, no code: re-print every line in `lines` (SAME or DIFFERENT; the scout measured stage07Output at setSpanIO :1105, object :1117, uncoveredBackends :1145, re-emit superset :2269-2285, and the backend source serverMap.get(t.serverId)?.backend_id at :642 and :1044). (E3) read two turn_trace_digest stage-07 rows through a SELECT-only script on the service client; if the client is absent, print UNMEASURED with its reason and take both samples from a stageTools fixture run. (E2 / 0(d)) print the max serialized length of the final stage-07 output at base and head over the ORDER 0 samples and a full-set fixture; if head exceeds 8000 where base did not, STOP. (E4) print the published router.frameRouting value; if false or absent, say derived is replay-only in production until the flip.
1. deriveCategories: expose the applied hints WITHOUT changing DerivedCategories' existing equality (deriveCategories.test.ts pins objects): extract the hint union at :170-174 into one exported pure function (for example metricHintsFor(frame, vocab)) that deriveCandidateCategories itself calls; no second copy of the rule.
2. filterToolsByMessage: add to its return, additively, `derived` = { categories, unmapped, metricFloorApplied, hints }. (E1) derived is present iff the condition at :1590 (routerPolicy?.frameRouting && irFrame) held, on BOTH return sites; irFrame:null at :1859 stays byte-identical. (E5) hints = metricHintsFor(frame, vocab), the carried union, which is not necessarily new categories. Every existing return key stays byte-identical on every branch including 'all-fallback'.
3. stage07Output (the object literal opened at stageTools.ts:1117 ONLY): add `derived` (from 2) and `offeredByBackend` = { <backendId>: toolName[] } over the SAME toolDefs that fill offeredToolNames, with a tool whose backend is unknown listed under the key UNATTRIBUTED (never dropped, never guessed); the lane may encode offeredByBackend compactly (for example backend to indices into offeredToolNames), declared in the report (E2). (E7) offeredByBackend uses the same accessor serverMap.get(t.serverId)?.backend_id, extracted once; UNATTRIBUTED is a key outside the backend-id grammar. (E6) no traceSchema stamp: C3 owns the record. No field is fabricated: a K24 field with no value at routing today is not emitted here (the exam card C3 owns the rest).
4. No backend, vendor or tenant name in code (AGNOSTIC-1, OWNER-RULING-S153-NO-ARMES-HARDCODE-1); fixtures use neutral ids.
5. Tests, failing-first, each proven by a planted fault: (a) metricHintsFor equals the old inline union on the existing deriveCategories fixtures; (b) (E1) present on the frame branch INCLUDING a frame-unmapped turn that ends all-fallback; absent when :1590 did not hold; (c) offeredByBackend covers exactly offeredToolNames (set equality) including an UNATTRIBUTED tool; (d) FALSIFIER: routing decisions byte-identical; (e) (E2) a test pins the full-set fixture's head output as parseable JSON of at most 8000 characters. Every existing test literal unchanged.
6. npm run build (all five gates; doc-drift tab update + reseal in the same commit if named), full suite, typecheck:api; PR; CI read at the full head sha, a zero read twice; slip SLIP-A24-P1C2-K24-ROUTING-FIELDS-S158-1 with branch, full head, PR number, CI runs by name, the two ORDER 0 stage07Output samples before/after. Stop.

## SHARED SURFACES
```scope
- api/cwf/_lib/routing/deriveCategories.ts (extract metricHintsFor; nothing else)
- api/cwf/_lib/toolCategories.ts (E9: the two filterToolsByMessage return objects only, carved out of G2c's ownership by the Architect in G2 v4's SCOPE line; C2 lands before G2c branches, or rebases onto G2c; ARCHITECT RULING: C2 LANDS FIRST; G2c is cut only after C2's merge)
- api/cwf/_lib/turn/stageTools.ts (E8: inside the stage07Output object literal opened at :1117 (setSpanIO from :1105), plus the one extracted accessor; nothing else. P1B v3 at AG-4 edits the opts object at :1978-1981: disjoint hunks; name the line move in the report)
- api/cwf/_lib/routing/__tests__/ and api/cwf/__tests__/ (new tests)
- public/architecture/ tabs check:doc-drift names, and the reseal
- docs/relay/A24-P1C2-K24-ROUTING-FIELDS-S158-1-AG1-report.md
```

## DECISION RIGHTS
AG-1 names the fields and the pure function inside "add, never move a decision". The Architect decided: no routing change in this card; the backend axis comes from data the turn already holds, never from a name in code.
FORBIDDEN: no change to matchedCategories, offered sets or any routing branch; no new span; no migration; no DB write; no poll task, no cron; never print an environment value; never merge your own PR.

END · CARD-A24-P1C2-K24-ROUTING-FIELDS-S158-1-v2
