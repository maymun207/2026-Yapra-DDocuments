# MODEL-TEXT-INVENTORY-MEASURE-S165-1 — AG-4, full measurement

Notice: NOTICE-MODEL-TEXT-INVENTORY-MEASURE-S165-1 (read-only). Measured against origin/master 763a54bc551572137276afa6cc55446e80c934cc (precondition held; ls-remote). No repo file edited, no branch, no commit, no push. This file lives outside the repo because the slip cap (FW005, 1024 chars) cannot carry the inventory and a commit is forbidden by the notice — the bus slip points here.

Card grammar: mail-wait printed CARD-REFUSED CP-1, CP-3, CP-4, CP-9, CP-10 with CARD_GATE=REPORT (disarmed); proceeded, named here.

Method: git grep / git show on origin/master (not the working tree — the SD2 worktree differs in stageTools.ts, toolResult.ts, burstBrakeMessage.ts, inlineAggregates.ts, partialRead.ts). Inventory lenses were run by a read-only sub-agent; I re-verified the two load-bearing claims myself (the handle note has no test reference; the only exact pins are ORIGINAL_MESSAGE and the unconfigured-link string).

## 1+2 · INVENTORY AND CLASS

All tool-result text converges in api/cwf/_lib/turn/stageTools.ts:
- NOT-SENT arm :1657-1670 — misroute → policyDenial.message → toolCallCapMessage → argRefusal.
- SENT arm :2263-2284 — modelFacingRefusal, else withEmptyAccount(withCompletenessAccount(formatToolResult(...))).

Pin column: "exact" = toBe against a written literal; "taut." = toBe against the same function (pins nothing); otherwise toContain/toMatch only.

| # | file:line (master) | function | lang | call site | test pin | class — justifying line | dynamic |
|---|---|---|---|---|---|---|---|
| 1 | turn/burstBrakeMessage.ts:40-44 | toolCallCapMessage | TR | stageTools.ts:1667 | burstGuardReporting.test.ts:112-125,138-139 toContain | DET — :12 "A LIMIT MUST REACH THE AUDIENCE AS A LIMIT, NEVER AS AN ABSENCE OF CAPABILITY" | tool, limit |
| 2 | turn/gatewayPreflight.ts:56 (normal) | gatewayMisrouteMessage | TR | stageTools.ts:1658 | EXACT decisionParityBug007LockedDoor.test.ts:80 ORIGINAL_MESSAGE @ :133,134,162,173 | DET — :30-31 "exact, deterministic tool-result text … pinned by test" | tool, owners, gateway id |
| 3 | turn/gatewayPreflight.ts:54 (withheld) | gatewayMisrouteMessage{withheld} | TR | stageTools.ts:1658 | Bug002 test :133,140; Bug007 :144,155 toContain | DET — :40-43 "denies the wrong inference (the capability is not missing)" | same |
| 4 | turn/gatewayPolicy.ts:136-137 | gatewayPolicyUnavailableMessage | TR+EN | gatewayPolicy.ts:289 → stageTools.ts:1665 | gatewayPolicy.test.ts:134-135,185 toContain | DET — :134 "Never says the tool is forbidden — it says we could not tell." | tool |
| 5 | turn/gatewayPolicy.ts:130-131 | gatewayForeignSurfaceMessage | TR+EN | gatewayPolicy.ts:301 | :169-172 toContain+order; :184 taut. | SOFT — :118-119 "carrying the REDIRECT" | tool, ≤3 alternatives |
| 6 | turn/gatewayPolicy.ts:142-143 | gatewayUnclassifiedMessage | TR+EN | gatewayPolicy.ts:297 | none (reason only :109) | SOFT — :140 "Denied, pending ratification." | tool |
| 7 | turn/gatewayPolicy.ts:148-149 | gatewayUnknownToolMessage | TR+EN | gatewayPolicy.ts:297 | none (reason only :154) | SOFT — :146 | tool |
| 8 | turn/gatewayPolicy.ts:154-155 (+ reason :311) | gatewayPayloadRejectedMessage | TR+EN | gatewayPolicy.ts:311,317 | :231 toMatch | SOFT — :152 "Names the reason." | tool, reason |
| 9 | turn/toolArgPolicy.ts:360-370 | buildRefusalPayload (note) | EN | stageTools.ts:1638 → :1670 | toolArgPolicy.test.ts:111-121; toolArgPolicySeed.test.ts:379-382 toMatch | DET — "denies the two wrong readings explicitly" | tool, slots, candidates |
| 10 | turn/toolArgPolicyLoad.ts:122 | loadSlotCandidates (no source) | EN | stageTools.ts:1633 (inside #9) | toolArgPolicy.test.ts:132 toMatch | DET — "'we have none' and 'here are zero' are different sentences" | — |
| 11 | turn/toolArgPolicyLoad.ts:136 | loadSlotCandidates (unreadable) | EN | same | toolArgPolicy.test.ts:140 toMatch | DET — text: "NOT evidence that none exist" | error prefix (60 ch) |
| 12 | turn/toolResultClass.ts:455-460 | modelFacingRefusal (unreadable) | EN | stageTools.ts:2263 | toolResultClass.test.ts:167,173-174; mcpIsErrorPassthrough.test.ts:259-273 toMatch | DET — note: "NOT a report that no data exists" | reason, scrubbed msg |
| 13 | turn/toolResultClass.ts:462-467 | modelFacingRefusal (degenerate) | EN | stageTools.ts:2263 | toolResultClass.test.ts:179-181 toMatch | DET — "never that no data exists" | param names |
| 14 | turn/toolResultClass.ts:288-306 | deriveCompleteness NOTE_CUT_RETRIEVABLE/CUT_LOST/UNKNOWN/WHOLE + coverage() | EN | stageTools.ts:2283-2284 | toolResultClass.test.ts:220,234,242,263 toContain | DET — stageTools.ts ~:2270 "a cut answer cannot be presented to the model as a complete one" | returned, total, unit |
| 15 | turn/emptyAccount.ts:39-41 | EMPTY_ACCOUNT_NOTE | EN | stageTools.ts:2283-2284 | emptyAccount.test.ts:28 taut.; :71-72 toContain; exam lexicon examScorers.test.ts:155 coupled | DET — header "the MODEL side of EMPTY ≠ ZERO" | — |
| 16 | turn/gatewaySearchZero.ts:103-127 | buildSearchZeroAddendum | TR+EN | stageTools.ts:2117 (:2141) | gatewaySearchZero.test.ts:101-165 toContain (full sentences :146-147,162,164) | DET — :91-93 "never says 'no chart exists'" | tool names, backend display name |
| 17 | toolResult.ts:275-282 | buildWarning (_warning) | TR (ASCII) | toolResult.ts:622 | toolResult.test.ts:91; toolResultCompletenessWiring.test.ts:238 toContain | DET — :15 "so the model knows exactly how many records it did NOT [get]" | total, shown |
| 18 | toolResult.ts:285-293 | buildCompactNote (_note) | TR | toolResult.ts:623 | toolResult.test.ts:52 toContain | DET — :613-616 "compacted is deliberately NOT a cut" | total |
| 19 | toolResult.ts:296-305 | buildHandleNote (_note) | TR | toolResult.ts:563 | NONE (re-verified: only source hits) | DET — :503 "DON'T lose data" | total, handle, meta-tool names |
| 20 | toolResult.ts:271-273 | buildPaginationNote | TR | toolResult.ts:553,599 | toolResult.test.ts:134-136 toMatch | DET — emitted only when hasNext; key named for honesty | total, shown, page |
| 21 | toolResult.ts:656-657 | char-cap fallback in formatToolResult | TR | stageTools.ts:2157 | toolResult.test.ts:113 toContain | DET — toolResultClass.ts:480-483 "explicit in-band system notice … the standing gate asserts it" | chars omitted |
| 22 | toolResult.ts:320 | neutralizeDeadSupersetUrls | TR | toolResult.ts:429 | EXACT toolResult.test.ts:280 | SOFT — :310 "only stops CWF from handing the user an unclickable link" | — |
| 23 | inlineAggregates.ts:173-179 (+ toolResult.ts:637 key) | noteFor (_aggregates._note) | TR | toolResult.ts:587,633 | inlineAggregates.test.ts:62 toContain | SOFT — no wording guarantee stated | row count |
| 24 | resultStore.ts:248,255,322 | aggregateRecords/queryRecords {error} | TR | stageTools.ts:2359,2370 | resultStore.test.ts:70-71 toContain | SOFT (arg validation) | handle, op |
| 25 | timeTools.ts:467,476,478,481,490 | resolveTimeRange {error} | EN (+TR phrase list) | stageTools.ts:2320 | timeTools.test.ts:49 (:467 only) | SOFT (arg validation) | arg values |

Conditional / excluded:
- webTools.ts:306-396 fetch-failure messages. Model-facing only when the web valve is open (stageTools.ts:2405). Only `reason` is pinned. SOFT, EN.
- mcpClient.ts:300,314,388-398 transport errors. Folded into #12 by classifyToolResult; "Tool execution failed" is dropped at toolResultClass.ts:452. Not a separate model text.
- toolResult.ts:130 capRaw feeds rawForClient only. Not model-facing.
- NOT TRACED: graphKb/relationships.ts:106 "NOT MEASURED — … not a claim that the relation is absent." It may reach the model through a graph tool; it was not followed into stageTools. Named as dark.

Findings from the inventory:
- F1: of 16 DETERMINISTIC texts, one (#2 normal arm) has an exact byte pin. #19 ("HICBIRI kayip DEGIL") has no test at all.
- F2: burstBrakeMessage.ts:24-27 says Turkish is used "because every other model-facing tool result on this path is". Measured, that premise is false: #9-#15 are English-only, #4-#8 and #16 are bilingual, and toolResult/inlineAggregates are ASCII-folded Turkish.
- F3: #22 carries a backend name in an MCP-layer code path (toolResult.ts:320 string and the function name). It must not be governed as-is: governing it would make a backend literal into data. It is named for a CLAUDE.md §6 review, and is out of this design.
- F4: #15 is coupled to the exam lexicon (examScorers.test.ts:155). A governed wording change could desync a scorer.

## 3 · VERSIONING TODAY

- These texts carry NO label in the trace today. They are code constants; their version is the deploy sha, and nothing per-turn records which of them a turn emitted.
- promptRev = promptRevFrom(segments), resolvePromptSegments.ts:95-103. It hashes `id\ntext\n` for every id in SEGMENT_IDS, and ONLY those, so text outside SEGMENT_IDS cannot move it by construction. It is computed at :228, set on ctx at stagesModel.ts:244, and fingerprinted by computeAndStampFingerprint at configFingerprint.ts:124-130, which runs post-stage-9 and pre-stream.
- DURABLE CARRIER: the turn_done row in telemetry_events, column config_fingerprint jsonb (stageStream.ts:849-861, `config_fingerprint: { ...ctx.configFingerprint }`).
  - The same object is spread at knowledgeOutage.ts:88, stageClarify.ts:3243 and runTurn.ts:206,231.
  - The per-promptRev L5 aggregates read `config_fingerprint->>'promptRev'` (migration 20260710180000:119).
  - turn_trace_digest is display-only (ADR-008, turnDigestWrite.ts:6), so it is NOT the carrier.
- PRECEDENT for an additive axis: ConfigFingerprint.routingMapHash?, configFingerprint.ts:47-55. It is optional, absent on turns that did not run it, "never a fabricated value".
- ANSWER: yes. A separate `toolTextRev` can be recorded per turn without moving promptRev.
  - It is computed ONLY over the text ids the turn actually emitted: sha256 over sorted `textId\nsource\ntemplate\n`.
  - It is written as optional `toolTextRev` + `toolTextsEmitted: [{textId, source}]` into ctx.configFingerprint immediately before stageStream.ts:859.
  - Tool texts are emitted during the model/tool loop, i.e. AFTER the pre-stream fingerprint compute, so the stamp point is the turn_done write, not configFingerprint.ts:124.
  - The spreads at knowledgeOutage.ts:88 and stageClarify.ts:3243 inherit it (absent when no tool text was emitted).
  - No migration: the jsonb column exists.
- Precedent gap, named: router.prompt and plan_template are governed system-lane text and are NOT stamped per turn either (templateSource exists only in routerAbLens replay evidence, routerAbLens.ts:173,398).

## 4 · ONE DESIGN

HOME — a new system-lane kind `system.tool_text`.
- It is distinct from prompt.segment, so:
  - the GOLDEN FREEZE (selfSeedReconciler.ts header; governance.ts:431 checks `kind_id === PROMPT_SEGMENT` only) and promptRev are untouched;
  - this is the router.prompt / plan_template precedent verbatim (routerPrompt.ts:6-11, selfSeedReconciler.ts:128-136).
- CORE class, isLocked, codeSchemaRef ToolText (coreSchemas.ts, next to RouterPromptSchema :236-250).
- Key = textId, drawn from a CLOSED code enum TOOL_TEXT_IDS, like SEGMENT_IDS but separate, so adding an id never touches the prompt topology.
- Payload `{textId, template}`. The schema .refine enforces two things per textId, both declared in code:
  - (a) every required placeholder is present (the RouterPromptSchema pattern);
  - (b) for DETERMINISTIC ids, every REQUIRED INVARIANT PHRASE is present. Examples: #1 'yetenek eksikliği değil' and '"tümü" deme'; #15 'not evidence of absence'.
- So governance can change WORDING but cannot delete the GUARANTEE. The ruling's §8 line ("deterministic is code or gated") is met by gating the invariant in code while the tone becomes data.

SCOPE of the first cut: #1-#21 and #23. Excluded:
- #24, #25 and the web/MCP errors: argument validation, SOFT, dynamic;
- #22: backend literal, F3.

SEED (absence-only):
- reference/toolTexts.ts exports TOOL_TEXT_SEEDS, built from the floor constants IMPORTED, never copied (the ROUTER_PROMPT_SEED rule).
- The domain `system.tool_text` is registered in SEED_DOMAINS (selfSeedReconciler.ts).
- The rule_kinds row is provisioned by the reconciler (F128 path), so no migration.
- S80-3 is stated in the card: once a row is published, a floor edit is inert.

FLOOR = today's bytes.
- turn/toolTextFloor.ts holds TOOL_TEXT_IDS, the floor template per id, placeholders, required phrases and class.
- The existing functions render from it. Floor output is byte-identical to master; this is proven by NEW exact toBe pins per id against master's literal output. The pins are written BEFORE the move, which also closes F1.

RESOLVER — knowledge/resolveToolTexts.ts, the resolveRouterPromptTemplate contract:
- It never throws.
- There is no module cache.
- It makes ONE getPublishedRules([system]) read per turn, at stage 07, beside the router.prompt resolve (stageTools.ts:647).
- For each id: published row valid against the schema → db, otherwise → floor.
- The result is `ctx.toolTexts = {texts, source per id}`.
- Pure formatters (toolResult.ts, inlineAggregates.ts, toolResultClass.ts, emptyAccount.ts) receive the resolved map as an argument and default to the floor, so replay and tests stay pure.
- Lab drafts: out of the first cut (the prompt.segment draft tier is lab-only; named).

LABEL — toolTextRev plus toolTextsEmitted on config_fingerprint, as in §3.
- An emit recorder on ctx (a Set of textIds added at each render) feeds it.
- promptRev is unchanged by construction.

EVAL GATE:
- Publish goes through runGate (governance.ts:391): the structure check, plus the schema refine (placeholders and invariant phrases). There is no Layer 2 golden run, because the kind is distinct.
- F4: the exam scorer must key on the invariant phrase, not the full sentence, and that is changed in the same card.
- A later card may add a golden or replay lens keyed on toolTextRev, the way L5 keys on promptRev. Named, not built.

ADMIN UI (§13.3) — GovernanceTab, system lane, kind `system.tool_text`.
- A new ToolTextEditor panel is mounted when that kind is selected, mirroring `selectedIsPromptSegment` at GovernanceTab.tsx:536.
- It shows, per textId:
  - the class badge (DETERMINISTIC / SOFT);
  - floor vs published text;
  - the placeholders;
  - the invariant phrases, locked and highlighted, with a publish refused while any is missing;
  - the emission count over 7 days read from turn_done toolTextsEmitted, through a service-role read in the health band pattern, which the card must scope.
- Turkish labels, with an English gloss line.

FILES IT WOULD TOUCH:
- shared/dbConstants.ts: SYSTEM_LANE_KIND_IDS.TOOL_TEXT, :1519.
- api/cwf/_lib/knowledge/reference/coreSchemas.ts: ToolTextSchema, CORE_SCHEMA_REFS.
- api/cwf/_lib/knowledge/reference/kinds.ts: registry row + mirror, near :549-557.
- api/cwf/_lib/knowledge/reference/toolTexts.ts: new, seeds.
- api/cwf/_lib/knowledge/selfSeedReconciler.ts: SEED_DOMAINS.
- api/cwf/_lib/knowledge/resolveToolTexts.ts: new.
- api/cwf/_lib/turn/toolTextFloor.ts: new.
- api/cwf/_lib/turn/types.ts: ctx.toolTexts, the emitted set.
- api/cwf/_lib/turn/stageTools.ts: resolve at stage 07; pass the map.
- The text owners:
  - turn/burstBrakeMessage.ts
  - turn/gatewayPreflight.ts
  - turn/gatewayPolicy.ts
  - turn/toolArgPolicy.ts
  - turn/toolArgPolicyLoad.ts
  - turn/toolResultClass.ts
  - turn/emptyAccount.ts
  - turn/gatewaySearchZero.ts
  - _lib/toolResult.ts
  - _lib/inlineAggregates.ts
- api/cwf/_lib/turn/configFingerprint.ts: optional toolTextRev, toolTextsEmitted, toolTextRevFrom.
- api/cwf/_lib/turn/stageStream.ts: stamp before :859.
- api/cwf/_lib/replay/examScorers.ts: F4.
- src/components/admin/GovernanceTab.tsx, plus the new src/components/admin/ToolTextEditor.tsx.
- Tests:
  - toolTextFloor.test.ts: exact pins per id vs master bytes;
  - resolveToolTexts.test.ts;
  - toolTextSchema.test.ts: a refine test that plants a deleted invariant phrase and must refuse it;
  - configFingerprint.test.ts: toolTextRev is absent when nothing was emitted, and promptRev is byte-unchanged;
  - an admin panel test.
- No migration.

OPEN, for the Architect or the owner (not chosen here):
- the language policy (F2) — one template per id stores whatever language is chosen; unifying them is a wording decision;
- whether SOFT ids need the invariant mechanism at all;
- F3's backend literal.
