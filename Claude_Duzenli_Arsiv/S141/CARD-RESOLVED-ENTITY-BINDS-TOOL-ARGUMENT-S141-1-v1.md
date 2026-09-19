<!-- relay-audit: v1 kind=card -->
CARD-RESOLVED-ENTITY-BINDS-TOOL-ARGUMENT-S141-1-v1

LANE: AG-4
fanout: personalized
A WIRING card (§12.6) on the send side of the tool loop, ordered FIRST by the owner (OWNER-RULING-S141-TOOL-ARGUMENT-CARD-FIRST-1, "ÖNCE", 2026-09-17 ~06:3x TSİ) ahead of the §9-1 baseline. The scout measured this morning (its verdict row is named in `raw-tokens`; finding F1 there) what the architecture has claimed since A23: "resolvers → prompt assembly with resolved slots → main LLM → deterministic validators" — and the code does the first half only. `ctx.entityResolutions.canonicalIds` is stamped by clarify and read by the episode write and by a stage that runs BEFORE clarify; NO tool-argument builder reads it. Every id in every tool call comes from the model re-deriving it — on the owner's own witness the line id reached `getLineStopsReportForZones` only because the model first called `getFactoryLines` and picked the line out of the answer. The user named the line, the registry resolved it, the ledger recorded it, and the tool call never saw it. This card binds a resolved entity into the ONE seam the repository already built for governing what is SENT: `planToolCall` and its governed `tool_arg_policy` rows, whose `candidate_layer_key` already says which registry layer a parameter draws from. No new table, no IR change, no override of a value the model filled — a divergence is MEASURED first, never silently corrected.

PRECONDITION: `origin/master` is at or beyond the fenced anchor; `planToolCall` is still called once per tool call at the send site with `(argPolicy, args)` and no resolution input; `ctx.entityResolutions` still carries `canonicalIds` only; `tool_arg_policy` still holds no row for the two witness tools. If any of these already changed, STOP — the work exists (§12.7).

```evidence:raw-tokens
scout verdict F1     b4d8fcaf-cb4e-42e9-acd6-e658bc515761   (2026-09-17T03:23:58Z — "read back NOWHERE" measured over 24 + 56 graft hits)
witness reply turn   5390a905   (production, evening of 2026-09-16 — the line id reached the stops tool via the model's getFactoryLines chain)
```

```evidence:the-head
master               47402e33faec80c45254668d917cb6f58625a916   merge of PR 575 — the scout's wire read at ~03:20Z (git ls-remote) EQUALS the owner's clone and the Vercel production record dpl_CArauFvnMebebfkogvnDZmvb42L7; no deployment after it
the stamp            api/cwf/_lib/turn/stageClarify.ts:2584-2590 — ctx.entityResolutions = { canonicalIds: [...mergedAlias resolved canonicalIds].sort() }; types.ts:804 entityResolutions?: { canonicalIds: string[] } — the comment two lines above says "read back NOWHERE"
the layer is known   stageClarify.ts:990/1009/1043 — registryHits: Map<ref, RegistryHit { entityId, method, layerKey }> at the same seam; the layer is dropped at the stamp
the send seam        api/cwf/_lib/turn/stageTools.ts:1375-1388 — const argPolicy = resolveToolArgPolicy(argPolicies, server.backend_id, toolDef.name); const callPlan = planToolCall(argPolicy, args); refuse ⇒ loadSlotCandidates(slot, backend, candidateLayerKey) + buildRefusalPayload
the plan             api/cwf/_lib/turn/toolArgPolicy.ts:142-167 — planToolCall(policy, args): refuse when trueRequired && neverPlaceholder && unfilled; safeDefault applied only to a non-never-placeholder unfilled slot; a tool with no policy plans 'send' unchanged
the policy shape     toolArgPolicy.ts:26-58 — ToolArgParamPolicy { param, trueRequired, safeDefault?, declaredType?, neverPlaceholder, candidateLayerKey? } — "where COMPREHENSIVE candidates for this slot come from — an entity_registry.layer_key"
the rows             public.tool_arg_policy, read 2026-09-17T03:33Z: twenty-three rows over five tools (getMaterialList · getMaterialListByRecipeType · getMaterials · getOrders · getRecipeTemplates); every factoryId row carries candidate_layer_key 'factory'; NO row for getFactoryLines or getLineStopsReportForZones; seeded by supabase/migrations/20260817140000_tool_arg_policy_seed_armes.sql (pinned by api/cwf/_lib/turn/__tests__/toolArgPolicySeed.test.ts)
the registry layers  public.entity_registry, same instant: factory 17 · line 783 · equipment 1739
the trace            api/cwf/_lib/turn/toolCallTrace.ts:1-60 — the trace payload carries the SHAPE of the arguments, never their contents (deliberate); a binding must therefore be witnessed from its own log line and ledger stamp, not from the trace
the architecture     CWF-S140-ARCHITECTURE-VS-CODE-MEASURED-v1 §1, IR Path A: "resolvers → prompt assembly with resolved slots → main LLM → deterministic validators"
```

```evidence:the-witness
reply turn, production 2026-09-16 evening: stage 03 resolved the factory (prefix) and matched the line as the shown option; stage 11 called resolve_time_range · getFactoryLines · getLineStopsReportForZones with factoryId <factory code> and zoneIds [<the line's entity id>] — the ids in that call were produced by the model from getFactoryLines's answer, not read from stage 03 (ARCHITECT-WITNESS-S140-CARRIER-LIVE-1; scout F1)
read by              the Architect, execute_sql over tool_arg_policy and entity_registry at 2026-09-17T03:33Z; sed/grep over the owner's clone at master 2026-09-17T03:31Z-03:35Z; the scout's verdict row for F1
```

## PREMISE

MEASURED: the stamp, the layer at the seam, the send seam, the plan, the policy shape and the trace in `the-head`, by `sed`/`grep` over the owner's clone at master, 2026-09-17T03:31Z-03:35Z.
MEASURED: the twenty-three policy rows, their five tools and the absent witness-tool rows, and the registry layer counts, via execute_sql at 2026-09-17T03:33Z.
MEASURED: no reader of `canonicalIds` on the tool path — the scout's F1 over graft at 2026-09-17T03:23Z (two lenses: `entityResolutions|canonicalIds` 24 hits, `canonicalId` 56 hits; none in stageStream.ts, stageTools.ts, toolCategories.ts).
MEASURED: project box searched for this seam by name (§12.5), 2026-09-17T03:31Z: no prior card binds a resolution into a tool argument; F-S135-THE-TOOL-CALL-RECORD-CARRIES-NEITHER-INPUT-NOR-OUTPUT names the trace gap this card's witness must route around; the A23 build-order text names "prompt assembly with resolved slots" as the intent.
UNMEASURED: how often the model's own value DIVERGES from the resolved one. This card MEASURES it (ORDER 2 rule c) and does not correct it; the correction is a second card cut on the number.
SELF-INVALIDATION: this premise dies if `origin/master` moves by a commit touching stageTools.ts, toolArgPolicy.ts, toolArgPolicyLoad.ts, stageClarify.ts or types.ts, or if a v2 appears.

## ORDERS

ORDER 1 - THE STAMP CARRIES THE LAYER. `ctx.entityResolutions` gains ONE additive field `resolved: readonly { ref: string; entityId: string; layerKey: string | null; method: string }[]`, written at the SAME site as `canonicalIds` (stageClarify.ts:2584) from `mergedAlias` joined with `registryHits` — one row per resolved ref, ambiguous refs NEVER included (the existing "an ambiguity is deliberately not memorized" rule holds). `canonicalIds` is unchanged byte for byte; memoryDistill.ts:501 keeps reading it.

ORDER 2 - THE BINDING, AT THE SEND SEAM. Immediately BEFORE `planToolCall` at stageTools.ts:1376, a pure function `bindResolvedEntities(policy, args, resolved)` in toolArgPolicy.ts returns `{ args, bound: [...], diverged: [...], agreed: [...], ambiguous: [...] }`, and the RETURNED args are what `planToolCall` receives. For each policy param with a `candidateLayerKey` L: let R = the resolved rows whose `layerKey === L`. Rules: (a) |R| = 1 and the param is UNFILLED (`isUnfilled`, the module's own test) ⇒ the value is BOUND to R[0].entityId — as `[id]` when `declaredType` ends in `[]` or the model's value is an array, else the bare id — and `bound` records { param, entityId, ref }; (b) |R| = 1 and the param is filled with a value EQUAL to the id (string-equal, or a one-element array holding it) ⇒ `agreed`; (c) |R| = 1 and the param is filled with a DIFFERENT value ⇒ the model's value is KEPT and `diverged` records { param, model: <value>, resolved: entityId, ref } — this card measures, it does not override; (d) |R| ≥ 2 (a COMPARE frame, two factories) ⇒ nothing bound, `ambiguous` records { param, count } — the S134 zero-drop posture at the tool layer; (e) |R| = 0, or no policy, or a param without `candidateLayerKey` ⇒ byte-identical to today. A bound value is applied BEFORE the never-placeholder refusal test, so a required identifying slot the user already resolved is FILLED rather than REFUSED — that is the whole gain: the refusal payload today tells the model "the system already holds these values" and then makes it choose; after this card the system fills the value it holds.

ORDER 3 - THE LINE IS LOUD AND THE LEDGER CARRIES IT. One log line per tool call that bound, agreed, diverged or was ambiguous: `[ToolArgBind] tool=<name> bound=[param←entityId(ref)] agreed=[param] diverged=[param:model≠resolved] ambiguous=[param:n]`; nothing printed when all four are empty. `ctx.toolLedger` (toolOutcomes.ts) gains an additive `argBindings` array with the same four fields per call, so the turn_trace_digest and the replay lens can read it (the trace payload carries arg SHAPES only, F-S135 — this stamp is the witness surface). The `[Frame]`-style honesty holds: a bound id is an EXACT tier, no "interpreted as" premise owed; a divergence is printed, never rendered to the user by this card.

ORDER 4 - THE ROWS THE WITNESS NEEDS (DATA, by the route the S2 seed used). A migration `supabase/migrations/<ts>_tool_arg_policy_seed_armes_lines.sql` adds, for backend `armes`: `getFactoryLines` — `factoryId` { trueRequired true, neverPlaceholder true, candidateLayerKey 'factory' }; `getLineStopsReportForZones` — `factoryId` { same } and `zoneIds` { trueRequired true, neverPlaceholder true, candidateLayerKey 'line', declaredType 'id[]' }. Extend toolArgPolicySeed.test.ts's pin to the new rows. The Operator applies it (`supabase db push`, ADR-005) AFTER the code lands and before ORDER 6's witness — name that ordering in your report. ⚠ zoneIds → 'line' is the witness's own shape (the production call carried the LINE's entity id under zoneIds and returned three stops); if the tool's schema or a governed row says zones are the EQUIPMENT layer, STOP and print both — do not guess a layer.

ORDER 5 - TESTS, failing-first on the fork point, synthetic fixtures only (⚠ TENANT-ZERO, CI step 8, docs/relay included — no live factory, line or tool-argument value in the tree or in your report): (a) one resolved factory, `factoryId` unfilled ⇒ bound, plan 'send', the refusal that fires on master does NOT fire; (b) one resolved line, `zoneIds` unfilled, declaredType 'id[]' ⇒ bound as `[id]`; (c) the model filled the same id ⇒ agreed, args byte-identical; (d) the model filled a different id ⇒ KEPT, `diverged` carries both values, plan unchanged; (e) two resolved factories ⇒ nothing bound, `ambiguous` count 2, the never-placeholder refusal fires exactly as on master; (f) no policy / no candidateLayerKey / `resolved` absent ⇒ `planToolCall` receives the untouched args (byte-identical); (g) the ledger stamp and the log line on (a) and (d); (h) `canonicalIds` on the stamp is unchanged by ORDER 1 (the memoryDistill read). Pins that must stay green: the S2 toolArgPolicy tests, toolArgPolicySeed.test.ts (extended, not moved), carryLastResolution.test.ts a-i, the PR 572/573/574/575 pins.

ORDER 6 - WITNESS, after the landing, production READY and the Operator's push, run by the Architect in a NEW conversation: the owner's two sentences in order (factory + "fırın" downtime, then the line's name). Expected on the reply turn: stage 03 `entityResolutions.resolved` names the line with layerKey 'line'; stage 11's stops call prints `[ToolArgBind] … bound=[zoneIds←<line id>(<ref>)]` or `agreed=[zoneIds]` — BOUND means the model left the slot empty and the carrier filled it; AGREED means the model derived the same id, which is also a pass; DIVERGED is the number this card exists to measure and is reported, not judged. The Architect reads turn_trace_digest (the ledger stamp) and reports the fields on the bus; that reading is the acceptance.

ORDER 7 - Branch off current master, ONE pull request, no-ff, never a squash. `npm run build` (doc-drift — stageTools.ts, stageClarify.ts and toolArgPolicy.ts are mapped; reseal in the SAME commit as the code) and `npm run check:tenant-zero`, print both. Report at `docs/relay/RESOLVED-ENTITY-BINDS-TOOL-ARGUMENT-S141-1-AG4-report.md`; the report follows the landing and never gates it (§12.8). Slip with the forty-hex head, CI as you read it, `run_attempt` beside each conclusion, eval-canary SKIPPED named and not folded into green.

## FALSIFIER

If `planToolCall`'s call site receives args that are not a plain object (a schema-less tool, INNER_ARGS_UNSCHEMAD), the binder returns them untouched and says so — never wraps. If a `candidateLayerKey` names a layer the resolved rows spell differently (case, plural), STOP and print both spellings; do not fold. If binding a value would make a call that the never-placeholder rule would otherwise REFUSE go to a backend with an id whose layer does not match the tool's parameter (the zones/equipment question in ORDER 4), STOP — a wrong id sent is worse than a refusal. If the model's own value diverges on the very first witness, that is the measurement this card wanted: print it, do not "fix" it in this PR.

## SHARED SURFACES

```scope
- api/cwf/_lib/turn/toolArgPolicy.ts (bindResolvedEntities; pure)
- api/cwf/_lib/turn/stageTools.ts (the call site before planToolCall; the log line; the ledger stamp)
- api/cwf/_lib/turn/stageClarify.ts (ORDER 1: the additive `resolved` field at the stamp site)
- api/cwf/_lib/turn/types.ts (entityResolutions.resolved; toolLedger.argBindings — additive)
- api/cwf/_lib/turn/toolOutcomes.ts (argBindings on the ledger — additive)
- supabase/migrations/<ts>_tool_arg_policy_seed_armes_lines.sql (three rows, two tools)
- api/cwf/_lib/turn/__tests__/** (a-h beside the S2 tests; the seed pin extended)
- public/architecture/manifest.json (reseal, same commit)
- docs/relay/RESOLVED-ENTITY-BINDS-TOOL-ARGUMENT-S141-1-AG4-report.md
```

No IR contract change, no override of a model-filled value, no change to the refusal payload's text, no change to the prompt, no change to the trace payload (F-S135 stays its own item), no change to ⑤/⑥ or the render layer. The MCP layer carries no backend-specific code: the tool names live in the governed rows, not in a condition.

## DECISION RIGHTS

You choose the binder's exact signature and where `resolved` crosses into stageTools (ctx read at the call site is expected); you may put the ledger field beside the existing brake records if that is where the ledger's shape wants it. You may refuse on evidence this card did not anticipate — in particular ORDER 4's layer question.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| the stamp, the layer at the seam, the send seam, the plan, the policy shape, the trace | MEASURED: sed/grep over the owner's clone at master, 2026-09-17T03:31Z-03:35Z | the-head |
| the twenty-three policy rows, five tools, no witness-tool rows, registry layer counts | MEASURED: execute_sql at 2026-09-17T03:33Z | the-head |
| no tool-path reader of canonicalIds | MEASURED: the scout's graft reads, verdict row in raw-tokens, 2026-09-17T03:23Z | the-witness |
| the production call's ids came from the model | MEASURED: turn_trace_digest and the built-in browser, 2026-09-16T20:30Z-20:36Z | the-witness |
| the divergence rate | NOT-READ | ORDER 2(c) and ORDER 6 measure it |

## ON-DISAGREEMENT

If any value here differs from what you measure live, YOUR READING WINS, you print both, and the difference is reported as a finding in its own right.

DECAYS if `origin/master` moves by a commit touching stageTools.ts, toolArgPolicy.ts, toolArgPolicyLoad.ts, stageClarify.ts or types.ts, or if a v2 appears.
