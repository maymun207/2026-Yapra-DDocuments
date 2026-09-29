REVIEW-VERDICT: RED card=CARD-K41-ROUTER-KNOB-SPLIT-S163-1-v1 md5=c406e9772efc23802db6a17eddf35486

SCOUT-STATUS-REVIEW-CARD-K41-S163-1 · scout-2 · 2026-09-29
reply_to: ORDER-SCOUT-REVIEW-CARD-K41-S163-1 (06f054ae-ea54-473a-9a6b-34070b1f56e1, body md5 527d226339e2b86b7a6d11656a7125f8, [DIGEST-OK])

## PROVENANCE
- Gate probe: `[guard-bash] BLOCKED · GB-4 · git push --force` (PASS). MCP fence probe: `[guard-mcp] BLOCKED · GM-1 · mcp__supabase-ro__execute_sql` (PASS).
- `git ls-remote origin refs/heads/master` → ed033de062dfc869850a35e40f1b39094dd24ea3. Local HEAD 2a6f6781 (STALE, 160 files behind). `git fetch origin`; boot/law unchanged upstream (`git diff HEAD origin/master --stat -- .claude/boot/free.md CLAUDE.md docs/laws` → empty).
- BASE: ed033de062dfc869850a35e40f1b39094dd24ea3. Every file:line below is read at that sha (`git grep … origin/master`, `git archive origin/master` extracted to the scratchpad). graft indexes the stale disk and was used only for orientation. No line numbers were taken from graft.
- Box read: `[PREFLIGHT-UNMEASURED]` came from the tsx IPC bind (`listen EPERM`). That is the local stale mail-wait.mjs. origin/master already carries the fix (`node --import tsx`, CARD-LANE-SANDBOX-ALLOWANCES-S161-1-v2 ORDER 3). This is not a card defect.
- Ordering note: SCOUT-STATUS-REVIEW-CARD-TOUR-HONESTY-S163-1.md exists (06:52), so that order was already answered before this one.
- A25 bytes relied on (A25_cwf-capability-fabric-architecture-v1.html):
  - :626 E2: "anahtar ayrımı router.matrixReplace ≠ router.frameEnabled ≠ keyword-semantik (K41)"
  - :118 row 14: "frameRouting kapısı (:1609) ipuçlarını, metrik tabanını, unmodeled-keep'i, derived izi VE stage 03'ü (stageClarify.ts:2771) birlikte kapatır … E2 KOD kalemi: `router.matrixReplace` (yerine-geçme) ve `router.frameEnabled` (gözlem/ipucu/stage 03) AYRI anahtarlar; "keyword semantik yolda" ayrı anahtar."
  - :105 row 1: "MATRIX yerine-geçme kuralı yönlendirme yolundan SİLİNİR (P4/E5'te; o güne kadar router.matrixReplace=0 ile hükümsüz). Çerçeve GÖZLEM olarak kalır"
  - :627 E3: "frameRouting/matrixReplace flip'i sahiple arayüzden, K34 kapısıyla."

## WHY RED (one line each)
R1 `router.frameEnabled` ALREADY EXISTS, with a different meaning. The card re-declares it.
R2 "Default = today's frameRouting value" cannot be expressed in the registry. A new param resolves to its CODE FLOOR (a number), while prod's frameRouting is a DB-published 1. The card's F1 harness is vacuous on the replace path.
R3 The AFTER-LANDING measurement is blind. The E1 exam runs `routeKeywordLayer` only and cannot see the replace or the frame.
R4 The keyword union is not "published keywords only". matchCategories unions the LEARNED cache first.

## FINDINGS

### 1 · frameRouting consumers at base (grep the CONSUMER, non-test source)
`git grep -n frameRouting origin/master -- api src shared scripts ':!*__tests__*' ':!*.test.*'`. The live code consumers are:
- toolCategories.ts:1626 `if (routerPolicy?.frameRouting && irFrame)` is THE router gate. It wraps: derivation `deriveCandidateCategories(irFrame, vocab)` :1634 (metric HINTS + metric FLOOR live inside it, deriveCategories.ts:206-230 `applyMetricFloor(applyMetricHints(result, hints), hasMetricSlot)`); metricFloorApplied :1635; HIGH REPLACE :1637-1648 (incl. unmodeledKept :1643-1647); AMBIGUOUS UNION :1649-1652.
- toolCategories.ts:1660-1667 is unmodeledAdded. It is gated on `basis === 'frame'`, so it runs only when the REPLACE ran.
- toolCategories.ts:1926 and :1948 hold the `derived: routeDerivedOf(irFrame, vocab)` record (trace only).
- stageTools.ts:949 `ctx.frameRoutingEnabled = routerPolicy?.frameRouting ?? false` feeds stageClarify.ts:2771 `if (!ctx.frameRoutingEnabled) { … reason: 'clarify-dark' }`. That is STAGE 03 clarify/ask, and it also gates askOnUnresolved.
- api/admin/health-analytics.ts:713 `frameRoutingDark: !routerPolicy.frameRouting` feeds src/components/admin/HealthTab.tsx:559-572 and adminService.ts:2795-2798.
- routeShadowLens.ts:440-441 `buildArmPolicy(live, frameRouting) { return { ...live, enabled:false, learnEnabled:false, frameRouting } }` and :1012/:1016.
- Everything else (clarificationLens, frameForceFitLens, memory*, planner, entityKey, resolveTurnFrame:220, askOnUnresolved:302/310) is a comment or a replay-local `frameRoutingEnabled: true`.
- The ":1609 claim" is STALE AS A LINE. At base :1609 is a comment inside the METRIC-FLOOR-1 block, and the gate is :1626. As a FACT it is TRUE and wider: one knob turns off hints, metric floor, unmodeled-keep, AMBIGUOUS union, the derived record, AND stage 03 (A25 row 14 already lists stage 03, but the card does not).
- Which reads the FRAME and which reads only the knob: hints read `frame.metrics` (metricHintsFor, deriveCategories.ts:192-197). The metric floor reads the frame's metric slot (hasMetricSlot, :211-230). BOTH are inputs to `derived.categories`, so they affect the set ONLY through the REPLACE or the UNION. They are not independent features. unmodeled-keep reads NO frame field: it reads the pre-replace set and MATRIX_CATEGORY_UNIVERSE, and it exists only to repair the replace. None of the three reads `router.frameEnabled` today.
- `router.frameEnabled` at base: agentParams.ts:89 and :539 (floor 0) → resolveRouterPolicy.ts:77 → semanticRouter.ts:265 `.replace('{{FRAME_BLOCK}}', frameEnabled ? ROUTER_FRAME_INSTRUCTIONS : '')`. It gates ONLY the frame-extraction instruction text. irFrame is non-null only on a genuine 'semantic' replace (toolCategories.ts:1569), so extraction ALSO requires router.enabled. The split "extract/observe vs steer" ALREADY EXISTS by design (agentParams.ts:90-96: "encoded as its OWN independent knob so "extract, observe" and "extract, STEER" stay two separately reversible acts"). There is also a fourth relative, `router.frameOnAllPaths` (:107/:994), which the card does not mention.
- ORDER 3's "gate frame extraction on router.frameEnabled" is ALREADY TRUE and is a no-op.

DELTA 1 (paste-ready, replaces DESIGN bullets 1-2 and the "Hints / metric floor…" paragraph):
> `router.frameEnabled` EXISTS (agentParams.ts:89/:539, extraction instruction only) and is NOT re-declared or re-pointed. `router.frameRouting` STAYS the "frame is live" switch: derivation, metric hints, metric floor, AMBIGUOUS union, the derived record, stage 03 clarify (stageClarify.ts:2771) and health-analytics.ts:713 keep reading it unchanged. NEW `router.matrixReplace` gates ONLY the HIGH replace at toolCategories.ts:1637-1648 (and so :1660-1667, which exists only on basis 'frame'): effective replace = `frameRouting && matrixReplace`. Report the one-line map: hints→frameRouting, metric floor→frameRouting, unmodeled-keep→matrixReplace (moot at 0), stage 03→frameRouting.

DELTA 1b (the Architect must rule, because the card is silent): what a HIGH frame does when matrixReplace=0. (a) "decides nothing": today's :1637 branch is skipped and the semantic/keyword set stands. This also drops the metric-hint additions that OWNER-RULING-S151-K1-METRIC-HINTS-ALL-ACTIONS-1 put on every action (deriveCategories.ts:121-139). (b) "degrade to union": a HIGH frame goes through :1650-1651 like AMBIGUOUS, so nothing is removed and the hints survive. scout-2 recommends (b) as the behaviour, because removal is the harm (andon was REMOVED), and ruling (a) silently reverses an owner ruling. A25 :105 says "Çerçeve GÖZLEM olarak kalır", which reads as (a). Name whichever you pick in the card.

### 2 · The governed params registry, publish/gate path, migration, UI
- Declared: api/cwf/_lib/knowledge/reference/agentParams.ts. Keys are in AGENT_PARAM_KEYS (:76-147, router.* at :76-122). Decls are in REFERENCE_AGENT_PARAMS (:375-). The shape is `{ key, value, type:'number', min:0, max:1, stage:'07', sessionTweakable:false }` (e.g. :539, :620, :994). The interface (:344-354) has NO description field. Decls are APPENDED: "APPENDED — earlier indexes are load-bearing in tests" (:532, :962).
- Resolved: resolveRouterPolicy.ts:66-92 via resolveOne (:25-36). db > code-floor, no lab, no env. resolveOne DISCARDS `source` (resolveParamValue returns `{ value, source }`, agentParams.ts:1321). The RouterPolicy type is semanticRouter.ts:58-134 (frameEnabled/frameRouting optional). NEITHER FILE IS IN THE CARD'S FENCE, and both must change.
- Published: publishAgentParamCore.ts:45-60 (createDraft/publish, the same two-step as an admin click). :18-21: "the same publish path router.enabled / router.frameEnabled / router.frameRouting already flip through today (their archived v1 -> published v2 trails in domain_rules are the evidence)". CLI: scripts/publishAgentParam.ts.
- Migration: NONE needed. The kind is system.agent_param. New keys self-seed through selfSeedReconciler.ts:127 (AGENT_PARAM_SEEDS = REFERENCE_AGENT_PARAMS.map, agentParams.ts:1260) through the gated publish, ABSENCE-ONLY (:11-24). Self-seed is latent unless SELF_SEED_ACTOR_EMAIL resolves (:31-41); either way the new key resolves to its CODE FLOOR.
- R2 (the byte-identity trap): selfSeedReconciler.ts:15-20: "once a governed param has been PUBLISHED, editing its CODE-FLOOR VALUE is INERT … The floor is the SEED, the RESET TARGET and the OUTAGE FLOOR; it is never the live value." frameRouting's floor is 0 (agentParams.ts:620), and prod resolves 1: the card's own witness turn 6dcc95fa… has basis 'frame', which is reachable only through `routerPolicy?.frameRouting && irFrame` (replayFrame is offline-only, :1620-1625). So:
  - `matrixReplace` floor 0 as the SOLE replace gate makes prod lose the replace at deploy. That is a behaviour change on landing, forbidden by the card's own FORBIDDEN line.
  - floor 1 as the SOLE gate makes every outage and every unpublished env start REPLACING (frameRouting's outage floor is 0).
  - ONLY `frameRouting && matrixReplace` with matrixReplace floor 1 is identical in every state: prod, dev, outage, missing row.
- UI: router params are NOT on TweakTab. TweakTab is the session overlay (TweakTab.tsx:8-16, SANDBOX_LEVERS), and router.* are sessionTweakable:false. The governed edit surface is the Rules tab (GovernanceTab.tsx generic payload editor, as K32 measured at :1400-1401), reached from the stage card through stagesRegistry.ts:110 `target:{tab:'rules', kind:'agent.param', keyPrefix:'router.frame'}` (AdminPanel.tsx:215-222, governanceConsumption.ts:28 `key.startsWith(target.keyPrefix)`). The web.* precedent (S133) is stagesRegistry.ts:250 `{kind:'db', name:'web.timeoutMs · web.maxBytes', sub:'(agent.param)', role:'<TR one-liner>', target:{tab:'rules', kind:'agent.param', keyPrefix:'web.'}}`. The TR description therefore lives in a stagesRegistry `role:` string, NOT in the decl. `keyPrefix:'router.frame'` DOES NOT MATCH `router.matrixReplace` or `router.keywordArmAllPaths`, so the new knobs would be invisible from the stage-07 card.

DELTA 2 (replaces ORDER 2):
> PARAMS: APPEND to REFERENCE_AGENT_PARAMS (end of array; earlier indexes are load-bearing) `router.matrixReplace` {value:1, min:0, max:1, stage:'07', sessionTweakable:false} — floor 1 because it is read ONLY under `frameRouting` (effective = frameRouting && matrixReplace), so floor 1 reproduces today in every state — and `router.keywordArmAllPaths` {value:0, …}. Keys in AGENT_PARAM_KEYS beside ROUTER_FRAME_ON_ALL_PATHS. Resolve both in resolveRouterPolicy.ts; add both (optional) to RouterPolicy in semanticRouter.ts. No migration (self-seed, selfSeedReconciler.ts:127). Do NOT re-declare router.frameEnabled.
DELTA 5 (replaces ORDER 5's first sentence):
> UI: stagesRegistry.ts stage-07 card — add one `{kind:'db', name:'router.matrixReplace · router.keywordArmAllPaths', sub:'(agent.param)', role:'<the two TR lines>', target:{tab:'rules', kind:'agent.param', keyPrefix:'router.'} …}` entry (or widen :110's prefix), and update :107's tweak text so it keeps stageCardCoverage.ts:124's claims (`router.frameEnabled`, `router.frameRouting`, 'çerçeve artık yalnız gözlem DEĞİLDİR'). frameEnabled's line stays as it is today. StagesTab.test.tsx / governanceStagesArrival.test.tsx join if the prefix test moves.

### 3 · The keyword union (matchCategories, Turkish fold)
- matchCategories (toolCategories.ts:1148-1177) is the ONLY message→category keyword matcher. It is module-private and called at :1578, :1585, :1661, :1698, and inside routeKeywordLayer :1249. Reusing it is correct (§12.6).
- It is learned-FIRST: :1152-1158 `learned.get(word)` unions tool_category_cache mappings, then :1160-1174 the published/floor category keywords. R4: F3's "data-driven: published keywords only" is FALSE for a union over the production `learnedMappings`. With keywordArmAllPaths=1 every learned mapping, including the F185 contamination class (toolCategories.ts:994-999, "23 unpinned contaminated keys"), would reach the SEMANTIC path, which today never consults it.
- The fold: extractKeywords (:973-979) is `toLowerCase()` + strip `?.,!;:'"` + split on whitespace + length>2. The comparison is exact token equality `words.includes(keyword)` (:1169). Multi-word keywords use a substring match on the lowercased message (:1165). Keywords published through routing-curation are lowercased on the way in (api/admin/routing-curation.ts:171 `k.trim().toLowerCase()`).
- Tour question "KB7 pişmiş stokta hangi işler bulunuyor?" → tokens [kb7, pişmiş, stokta, hangi, işler, bulunuyor]. "pişmiş" contains no uppercase, and ş and ı/i are unchanged by toLowerCase, so it EQUALS a published lowercase "pişmiş". It MATCHES WITHOUT a fold, and F2 needs no folder.
- Where it fails (K32 R1/R5 stands): "PİŞMİŞ" (JS toLowerCase maps İ to i+U+0307 and misses), ASCII "pismis", inflections ("pişmişler", "pişmişte"), NFD-composed input. None of these is the tour question.
- UNMEASURED: the stored bytes of rule 4f38df6f's "pişmiş" (case/NFC). execute_sql is refused by guard-mcp GM-1, and no read-named tool returns a domain_rules payload. If the row was written outside routing-curation with a capital letter, :1169 misses. The lane should print that row's keyword via its own read path before F2.

DELTA 3 (replaces ORDER 3's union sentence):
> add the keyword union behind router.keywordArmAllPaths as `matchCategories(userMessage, EMPTY_LEARNED, categories)` (the SAME function with an empty learned map — published/floor keywords only, no learned cache on the semantic path; no second matcher, no folder). Place it AFTER the frame block and BEFORE the sticky union (toolCategories.ts:1668-1686). keywordArmAdded = categories it added that were absent. basis is unchanged by it; state that the learn cross-layer guard (stageTools.ts:1822 `ctx.routeBasis !== 'keyword'`) is unaffected. Fold stays K32's door (shared/turkishFold.ts:46); "PİŞMİŞ"/"pismis" are OUT of this card's falsifiers.
(If the Architect instead WANTS learned mappings in the union, then F3's wording must drop "published keywords only" and the report must name the F185 exposure.)

### 4 · Byte-identical-at-defaults: tests, and the replay/exam lenses
- In-process stageRegisterTools harness: namedToolIsOffered.test.ts pattern. The offered-set/route tests that pin the touched branches are frameRoutingFlip.test.ts, frameKeepsUnmodeledCategories.test.ts, filterToolsByMessageRouter.test.ts, stickyCategoryUnion.test.ts, metricFloorSpanAttr.test.ts, stage07RouteTraceFields.test.ts, registerToolsSpanIO.test.ts, routeOpenStageTools.test.ts, the fixture __fixtures__/routeDecisionMatrix.ts:61 (`frameRouting: true`), and replay/__tests__/routeShadowSeam.test.ts.
- F1 VACUITY: under code floors frameRouting=0, so the replace never runs and F1 passes by construction whatever matrixReplace does. F1 must be proven at frameRouting=1 (prod's state) with a HIGH frame (a fixture router result or the replayFrame seam :1625). frameRoutingFlip.test.ts / routeDecisionMatrix.ts already drive that path.
- Exam lenses DO NOT read any of these knobs. examScorers.ts:79 `routeKeywordLayer({ userMessage, learned, categories, entryFloor })`, examRun.ts:7 ("routeKeywordLayer (the production core, no model)"), kaExam.ts:21 / kaExam.exam.ts:33 ("filterToolsByMessage IS NEVER CALLED"), routerAbLens.ts:256 (arm A = routeKeywordLayer) and :352 (arm B = routeSemantica only). No frame, no replace, no union.
- R3: the card's AFTER LANDING claim "The E1 exam run before and after the flip is the measurement" is FALSE. E1 is byte-identical before and after the flip by construction. A25 :118 itself says "Farklı bir router PROMPT'unun etkisini … yalnız E1 offline sınavı ölçer". E1 measures prompt/keyword, not the matrix.
- routeShadowLens.ts:440-441 spreads `...live` into BOTH arms. After this card, a live matrixReplace=0 would ride into the "frame" arm, and the shadow would stop measuring the matrix without saying so.

DELTA 4 (replaces F1 and AFTER LANDING's last sentence; adds to ORDER 6):
> F1 · defaults, proven at BOTH frameRouting=0 and frameRouting=1 with a HIGH fixture frame: offered sets byte-identical to master.
> AFTER LANDING measurement: stage-07 trace (basis, keywordArmAdded, matchedCategories) on the tour question before/after, and routeShadowLens with its frame arm PINNED to matrixReplace=1 (buildArmPolicy sets matrixReplace explicitly, routeShadowLens.ts:440 joins the fence). The E1 exam is named as NOT measuring this flip (routeKeywordLayer, examScorers.ts:79).

### 5 · Collisions with CARD-K32 (AG-1) and CARD-TOUR-HONESTY (AG-4)
- toolCategories.ts: NO overlap. K32 v2 ORDER 2 says "No edit inside filterToolsByMessage". TOUR-HONESTY does not touch it.
- stageTools.ts, K32 ↔ K41 (CERTAIN textual conflict): both add fields to the SAME stage-07 register-tools output object (:1140-1200; K32 beside `namedToolsOffered` :1196, K41 beside `basis` :1157 / `derived` :1173) and a token to the SAME `[ToolRoute]` console line (:1125, one template literal). K41 also needs knob values carried out of the routerPolicy branch (near :949).
- stageTools.ts, TOUR-HONESTY ↔ K41: file-level only. TOUR-HONESTY hunks are :1957-1989 (gateway addendum) and :2073-2121 (observeResult/model copy), far from K41's :949/:1125-1200. There is no hunk overlap.
- TurnDigestSection.tsx RoutingChain :262-275: K32 (4c) and K41 (ORDER 5) each add a line to the same 13-line function. That is a CERTAIN conflict.
- stageCardCoverage.ts stage-07 needle (K32 cites :176-179): both add a stage-07 needle, the same region.
- Tests: registerToolsSpanIO.test.ts and stage07RouteTraceFields.test.ts are in both.
- SEMANTIC overlap: K32's obligation (when_any "pişmiş" → the fixture/andon tool, offered first even on a HIGH frame) makes getCookedStockAndon offered on the tour question BEFORE K41 lands. K41's AFTER-LANDING "getCookedStockAndon offered" is then NOT a K41 witness; only `keywordArmAdded ["andon"]` discriminates.

DELTA 5b (add to QUEUE): "K41 is cut on master AFTER K32 merges (git merge origin/master, no rebase). Expected shared hunks: stageTools.ts stage-07 output object + [ToolRoute] line, TurnDigestSection.tsx RoutingChain, stageCardCoverage.ts stage-07 needles, registerToolsSpanIO.test.ts, stage07RouteTraceFields.test.ts. F2's witness is keywordArmAdded, not the tool's presence (K32 already offers it)."

### 6 · What the card misses
a. resolveRouterPolicy.ts and semanticRouter.ts (RouterPolicy type) are NOT in the fence, and both must change (§2).
b. The inspector is fed from span ATTRIBUTES, not stage-07 output. RoutingChain reads `bucket.routing`, which is built only in observability/digestSink.ts:153-162 from ATTR_ROUTE_* (config.ts). Showing knobs/keywordArmAdded there needs new ATTR constants (observability/config.ts), setAttributes in toolCategories.ts (:1717-), and the lift in digestSink.ts. None of these is fenced. Side finding (not this card's to fix): RoutingChain :272 reads `routing.metricFloor`, but digestSink.ts:154-162 never lifts ATTR_ROUTE_METRIC_FLOOR. That line is dead today.
c. The knob source 'param'|'default'|'unread' cannot be produced from today's resolver. resolveOne drops `source`, and fetchSystemParamRows "never throws", so an outage returns [] and resolves as 'floor', which is byte-identical to "no row". 'unread' is unmeasurable without widening the helper. Say so in the card (third value: 'UNMEASURED-OUTAGE-INDISTINGUISHABLE') or widen fetchSystemParamRows, and then it joins the fence.
d. stagesRegistry.ts (the UI surface and the TR `role:` strings), and the keyPrefix trap (§2).
e. routeShadowLens.ts:440 buildArmPolicy (§4).
f. If the Architect keeps the card's "retire frameRouting" branch instead of DELTA 1, the fence must also carry stageTools.ts:949, stageClarify.ts:2771, health-analytics.ts:713, HealthTab.tsx:559-572, adminService.ts:2795, routeShadowLens.ts:440/1012/1016, runRouteShadowLens.ts:82 and stagesRegistry.ts:107/110. DELTA 1 avoids all of them.
g. NO-HARDCODE: none of the card's orders forces a literal. F3 holds only if the union uses published keywords (DELTA 3); with the learned map it adds cache-derived categories, which F3's wording claims it does not. The TR description strings are UI copy in stagesRegistry.ts and are not backend literals.
h. The AMBIGUOUS union branch (:1649-1652) is unaddressed by the card (DELTA 1b).
i. The card's :1609 and :1560-1574/:1637-1642/:1660-1667 line citations: the last three still hold at ed033de0, and :1609 is now the comment above the gate (:1626).

## WHAT IS STILL DARK
- The stored bytes of rule 4f38df6f's keyword (execute_sql refused, GM-1). Prod values of router.enabled/frameEnabled/frameRouting were not read directly; frameRouting=1 is INFERRED from the witness's basis 'frame' (the only live route to it, toolCategories.ts:1626).
- K32 / TOUR-HONESTY hunks are compared against their CARDS' line citations, not against their branches (not measured in this review).

scout-2 · read-only · no edit, push, merge or DB write other than scout_reply · no environment value printed.
