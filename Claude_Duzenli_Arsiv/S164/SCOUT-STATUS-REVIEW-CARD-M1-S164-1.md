REVIEW-VERDICT: RED card=CARD-M1-MCP-ISERROR-PASSTHROUGH-S164-1-v1 md5=b3e301ec0bd1c2bc6f3e0ed18c223a7a

SCOUT-STATUS-REVIEW-CARD-M1-S164-1
FROM: scout-2 · reply_to ORDER-SCOUT-REVIEW-CARD-M1-S164-1 (id 1d980e0b-127a-46c7-8aa1-ed14a207f085, body_md5 45f6cc14fd222aa23cc1309a0b9aac9f DIGEST-OK)
BASE: origin/master 6a3824c2b5efd1764be178d05ba647feec06927c — exactly the card's base (git fetch origin master; git rev-parse origin/master FETCH_HEAD → both 6a3824c2…). Every file:line below read from `git archive 6a3824c2…` extracted to scratch, or `git grep <sha>`; never the shared clone.
GATES: bash guard BLOCKED GB-4 on the force-push probe (PASS); MCP fence BLOCKED GM-1 on execute_sql (PASS).
CARD FILE md5 (printed first): b3e301ec0bd1c2bc6f3e0ed18c223a7a

WHY RED. The core design stands on the numbers (D1 over the sibling, finding 3). RED because the card cannot be executed as written: F1 is not producible by the fixture it names, and F1's tool_experience clause is false against the code. It also leaves three downstream behaviour changes unnamed (the transport→tool-reported relabel, the loss of the model's self-correction text, the stageClarify flip) and one hop that does NOT follow (examScorers). All of these are paste-ready deltas; none needs a redesign.

──────── 1 · W1 — MEASURED, HOLDS (line numbers drift) ────────
mcpClient.ts:272-276 `export async function executeMCPTool(…): Promise<string>`.
Return path: :284 and :298 `return JSON.stringify({ error: … })` (config); :333-338 `const parts = (result.content as any[]) || []; … const output = texts.join('\n') || JSON.stringify(result);`; :342 `setSpanIO(span, { output: { ok: true, ms: …, resultBytes: output.length } });`; :343 `return output;`; :360 and :368 `return JSON.stringify({ error: … })` (transport).
isError is never read: `git grep -n -i iserror 6a3824c2 -- api/cwf/_lib/turn/mcpClient.ts` → no output; second lens `grep -c -i iserror <archive>/mcpClient.ts` → 0.
Installed SDK (node_modules/@modelcontextprotocol/sdk/package.json:3 "version": "1.29.0"; package.json:60 pins 1.29.0):
- types.d.ts:2501 `CallToolResultSchema`; :2602 `isError: z.ZodOptional<z.ZodBoolean>;` — top level, optional boolean.
- client/index.d.ts:431 `callTool(params, resultSchema?: typeof CallToolResultSchema | typeof CompatibilityCallToolResultSchema, options?)` returns a UNION: :512 `isError?: boolean | undefined;` OR :513-515 `{ [x: string]: unknown; toolResult: unknown; … }` (protocol 2024-10-07 compat).
  CONSEQUENCE: on that union `result.isError` types as `unknown`, not `boolean`. The card's `result.isError === true` is the correct spelling. `?? false` or a direct boolean assignment will not typecheck.
- client/index.js:490-519: the SDK does NOT throw on isError. It returns the result, and skips output-schema validation when isError is set (:500 `if (!result.structuredContent && !result.isError)`). So a tool-level failure really does arrive as a result. Premise holds.
Line drift vs card: content extraction is :333-338 (card :329-334); the span output is :342 (card :346).
Precedent the card should cite: toolBehaviorRecord.ts:241 already reads it, spelled identically: `(result as { isError?: unknown }).isError === true` (census path, observeToolResult :239).

──────── 2 · W2 — MEASURED, HOLDS; §12.6 answered ────────
toolResultClass.ts:144-155 `interface ClassifyInput { resultText; args?; transportError?: boolean }`. The doc at :150-152 names "an MCP result's `isError`, a thrown-and-caught transport failure".
:169-174 `if (transportError === true) return { klass:'unreadable', isError:true, reason:'tool-reported', label:'unreadable:tool-reported' }`.
:116-120: the module itself names `Promise<string>` as "the actual root defect … NOT repaired here".
ONE call site: stageTools.ts:1718-1723 `callWasSent ? classifyToolResult({ resultText, args }) : null`. There is no transportError. The only other production caller is examScorers.ts:180 `classifyToolResult({ resultText: entry.raw, args })`, also without it (see 6).
§12.6 — is there an existing path already carrying the verdict INTO stage 07? NO:
- tool span :2167 `isError: observation?.isError ?? false` is derived FROM resultClass (:2148-2150 observeResult(resultClass,…)).
- the attempt span carries ok/ms/resultBytes only (:342).
- persistRaw carries {toolName,args,raw,callId} (types.ts:163-168), no verdict.
The only reader of the raw MCP verdict anywhere is the census (toolBehaviorRecord.ts:241), which is a separate callTool path (toolBehaviorCensus.ts:200). Nothing to wire. D1 is not a duplicate mechanism.
Off-turn callTool paths that also ignore isError (outside M1; for a follow-up, not this fence): entityDiscoverySync.ts:389 and gatewayEnumerate.ts:143, :160.

──────── 3 · D1 vs the sibling — RULED: D1 (numbers) ────────
Production callers of executeMCPTool: 1 function, executeThroughBackendSlot (stageTools.ts:302-324; card said :302-326), which calls it at :309 and :320. That function is called at :1639 (first call) and :1671 (repair). stageClarify.ts:1601 is a comment only.
Test files that mock `executeMCPTool: vi.fn(…)`: 25 (the card carried "~28"):
artifactObservationWiring, cleanAgentDoors, decisionParityBug002WithheldNotAbsent, decisionParityBug006GatewayFence, decisionParityBug007LockedDoor, floorAnnounces, floorWidens, frameOnAllPathsStageTools, gatewayPreflight, gatewaySurfaceStageTools, gatewayWriteCounter, learnBrake, learnGuardCrossLayer, learnNormStageTools, namedToolIsOffered, numericLedgerToolsWiring, registerToolsSpanIO, resultBudgetStageWiring, routeOpenStageTools, routingObligation, stage07RouteTraceFields, toolArgPolicyWiring, toolNameCollision, toolResultClassWiring, toolResultCompletenessWiring (all under api/cwf/__tests__/).
1 test calls the REAL function: spanIOCompleteness.test.ts:331.
15 further test files mock `mcpClient` without naming executeMCPTool, so they are unaffected (git grep -l mcpClient over *.test.ts lists 41 files in all).
RULING: the sibling saves NOTHING. Production would call the sibling, so every one of the 25 vi.mock factories must add the sibling's name or the import resolves undefined. That is the same 25 files touched, plus a dead string wrapper. D1 is strictly smaller. UPHELD.

TYPE HAZARD the card does not name. vi.mock factories are not type-checked against the real module, so a string mock left behind COMPILES. At runtime `outcome.text` is then undefined. `resultText.length` throws at :2149/:2153, while `re.test(undefined)` in rejectionReason silently tests the string "undefined". The explicit `as never` casts at resultBudgetStageWiring.test.ts:131,231,244,259,298 hide it even from a typed mock. ORDER 2's "every production caller compiles" is therefore no net for the tests.

──────── 4 · D2 refusal arms `isError:false` — never READ, but it is a manufactured value ────────
The arms at stageTools.ts:1623-1635 (misroute · policyDenial · capReached · argRefusal) are all not-sent. :1622 `const callWasSent = !misrouted && !policyDenial && !capReached && argRefusal === null;` and :1718 `callWasSent ? classifyToolResult(…) : null`, so `outcome.isError` on those arms has NO reader.
The one other consumer of the arm's text is the repair guard. :1665 `if (!misrouted && !policyDenial && !capReached)` does NOT exclude argRefusal, so an argRefusal payload reaches repairGatewayArguments(text) (toolCallRepair.ts:84-89, text-gated by VALIDATION_ERROR_RE). It reads text only, not isError.
Verdict: harmless today. Still, `isError:false` there asserts "the transport said OK" when no transport was asked, which is the empty≠zero class the constitution names. The clean shape keeps the arms as TEXT and makes only the sent arm an outcome (delta D2 below). Then no false is manufactured and the type shows that a not-sent call has no verdict.

──────── 5 · Repair path — count semantics, quoted ────────
:1664-1676: repairedText is set only if repairGatewayArguments(resultTextRaw, args) matches. Then `recordToolRepair(ctx.toolLedger, fix.repair)` and `ctx.toolCallCount++` (a second increment; the first is at :1640).
:1681 `const resultText = repairedText ?? resultTextRaw;`
toolOutcomes.ts:324-329 recordToolRepair merges by (tool, rule, field) and bumps `count`. It records NOTHING about the first failure's verdict.
toolOutcomes.ts:233-248 recordToolOutcome runs ONCE per closure invocation (:1744) on the superseding result.
So today, and unchanged under D2: first call isError + repaired OK ⇒ ledger.calls +1, successes +1, failures +0, toolRepairs[k].count +1, ctx.toolCallCount +2. Both isError ⇒ calls +1, failures +1, repair +1, toolCallCount +2.
The first failure lives ONLY in the attempt span and the repair record. The card should state this rather than "same rule as today".
Also: repair stays TEXT-gated. D2 must keep feeding `rawOutcome.text` to repairGatewayArguments. An isError payload whose text is not the gateway validation shape is not repaired, which is correct.

──────── 6 · Downstream truth — hop by hop ────────
H1 classification → stageTools.ts:1724 `const toolError = resultClass !== null && resultClass.isError;` FOLLOWS.
H2 → :1739-1744 recordToolOutcome({…, failed: toolError}) → toolOutcomes.ts:237-247 calls/successes/failures. FOLLOWS.
H3 → telemetry :1846-1851 `payload: { ok: !toolError, … }`. FOLLOWS.
H4 → tool span :2148-2150 observeResult(resultClass,…) → :2167 `isError: observation?.isError ?? false`, :2168 `toolCallClass`. FOLLOWS.
H5 → :1779-1781 `if (callWasSent) recordToolSuccess(…, { ...toolOutcome, viaGateway:false }, …)` → toolExperienceFlush.ts:82-87 `if (outcome.failed) return;`. FOLLOWS, but note recordToolSuccess IS CALLED and returns early (see delta F1).
H6 → toolOutcomes.ts:315-317 `answerUnbackedDespiteFailures = failures > 0 && successes === 0`. FOLLOWS.
H7 → chip: src/lib/params/chatSurface.ts:207 OUTAGE_CHIP_TEXT; src/lib/toolEvidence.ts:208 resolveTurnChips (reads the ledger). FOLLOWS.
H8 → artifact observations :1826 `answered: resultClass?.klass === 'answered'`. FOLLOWS.
H9 — DOES NOT FOLLOW: examScorers.ts:176-184 readResult re-derives error-ness from `entry.raw` bytes with no transportError. `raw` is capRaw(resultText) (stageTools.ts:2012-2015 → recordToolCall :246-250); PersistRawEntry has no verdict field (types.ts:163-168). emptyVsZeroHonesty (:204-215, `readResult(e) !== 'content'`) is the E1-a honesty metric.
After M1, runtime says error and the exam says 'content' for any isError text that is non-empty and matches no regex (e.g. the fixture's own `unknown tool X`, fixtureMcpServer.ts:73). Runtime and exam then disagree about the same call.
H10 — CHANGES BEHAVIOUR, unnamed: stageClarify ask-discovery reads the closure's MODEL copy (stageClarify.ts:1856-1860) and parses entities (:1873-1884). Today an isError + `{"rows":[]}` payload parses as zero-records → `answered, []`, which is a false "not found". After M1 it is the modelFacingRefusal JSON → `could-not-run`. This is the desired direction, but it moves the ask-discovery outcome and must be named and tested.

──────── 7 · What the card misses ────────
7a · RELABEL. D1 marks the transport returns (:360, :368) isError:true, so a thrown transport failure goes from `unreadable:transport` (today, via regex toolResultClass.ts:135 `/tool execution failed/i`) to `unreadable:tool-reported`. That label reaches the model (modelFacingRefusal :438-441 `reason: c.reason`), the span and the telemetry class.
F3 asserts the new label but the card never says a label is being lost. The existing net toolResultClassWiring.test.ts:125-130 pins `reason: 'transport'` for exactly this input. Under D3's `isError:false` mock it stays green while pinning a shape production can no longer emit.
The config failures :284 ("Could not extract URL…") and :298 ("No valid transport…") match NO regex today and classify `answered`. D1 fixes those, which is a real gain worth stating.
7b · SELF-CORRECTION TEXT LOST. mcpClient.ts:302-306: "deterministic tool/validation errors come back as a RESULT (not a throw), so they return immediately and the model self-corrects."
After M1 every isError payload is replaced by the generic note (toolResultClass.ts:435-443). The model no longer sees the tool's own error text: a tool saying "materialNumber must be 10 digits" becomes `{toolCall:'unreadable', reason:'tool-reported'}`. That is consistent with S1's "the upstream sentence NEVER travels" (:427-431), but S1 applied it only to RECOGNISED rejection sentences; M1 widens it to every tool-reported error.
This is a policy decision for the Architect, not a lane's. The card must RULE on it explicitly. Otherwise the P6.7 comment becomes false and the lane must edit it.
7c · FIXTURE. fixtureMcpServer.ts:71-76: `tools/call` is an echo. isError is emitted ONLY for an unregistered tool name, with text `unknown tool <name>`. F1's `{isError:true, content:'{"rows":[]}'}` is NOT producible without changing the fixture, and the fixture is outside the fence.
F3's "fixture closes the socket" has no knob either. close() then call gives ECONNREFUSED through the retry/backoff loop (:350-356), which is workable but slow.
7d · ATTEMPT SPAN PAIR. :342 writes `ok: true` for every completed round-trip. Adding `isError` beside it yields `{ok:true, isError:true}`, the self-contradicting-pair shape this codebase already paid for (toolResultClass.ts:196-199). The card must define `ok` = "round-trip completed" in the span comment, or the pair will be misread.
7e · spanIOCompleteness.test.ts:508-517 pins `ok, ms, resultBytes`; it is correctly in the fence. registerToolsSpanIO.test.ts:23 is a mock file and is in the 25.
7f · NO-HARDCODE (D5): design-clean; `isError` is the protocol field. Trap: the existing wiring nets use `backend_id: 'armes'` (toolResultClassWiring.test.ts:42,60). New tests must not copy that ctx builder verbatim. F5's diff excludes __tests__, so it would not catch it; state it in ORDER 4.
7g · The stale comment at stageTools.ts:1766-1771 ("toolError is derived by SNIFFING the result text") is already false at master and gets further from true after M1. Allow the lane to correct it inside the fence.

──────── PASTE-READY DELTAS (for v2) ────────
Δ1 W1: replace "(:329-334)" → "(:333-338)" and "attempt span output (:346)" → "(:342)". Append: "Installed SDK 1.29.0: CallToolResult.isError is optional boolean (types.d.ts:2602), but client.callTool returns a union with the 2024-10-07 compat shape (client/index.d.ts:512-515), so `result.isError` is `unknown` — spell it `result.isError === true` exactly as toolBehaviorRecord.ts:241 does."
Δ2 W4: replace "~28 test files" → "25 test files (list in SCOUT-STATUS-REVIEW-CARD-M1-S164-1 §3) mock executeMCPTool; spanIOCompleteness.test.ts calls it for real." Replace ":302-326" → ":302-324".
Δ3 D2 (replace the refusal-arm sentence): "The four not-sent arms stay TEXT. Only the sent arm yields an outcome: `const sentOutcome = callWasSent ? await executeThroughBackendSlot(…) : null; const resultTextRaw = sentOutcome?.text ?? <today's arm chain>;` repair: `repairedOutcome` from the same call; `const outcome = repairedOutcome ?? sentOutcome;` classify with `transportError: outcome?.isError === true`. No isError value is manufactured for a call that was never sent."
Δ4 D1 (append): "The attempt span becomes `{ ok: true, isError, ms, resultBytes }`; the span comment states `ok` = the round-trip completed, `isError` = the tool's own verdict. The four JSON-error returns (:284, :298, :360, :368) are `isError: true`. NAMED CONSEQUENCE: a thrown transport failure is relabelled `unreadable:transport` → `unreadable:tool-reported` (classifier ORDER 1 wins before the regex); the config failures at :284/:298, which classify `answered` today, become errors."
Δ5 NEW RULING LINE (Architect to decide, before insert): "M1 replaces EVERY tool-reported isError payload with modelFacingRefusal, so the model loses the tool's own error text (today's self-correction channel, mcpClient.ts:302-306). RULED: accepted as the S1 rule's extension / OR: pass a scrubbed head. The lane updates the P6.7 comment to match the ruling."
Δ6 D3 (append): "Mocks are untyped against the module. After the change, `git grep -nE \"executeMCPTool: vi.fn\\(async \\(\\) => '\" -- api` and `git grep -n \"as never\" -- api/cwf/__tests__/resultBudgetStageWiring.test.ts` both print zero hits for executeMCPTool mocks; the five `as never` casts at :131,231,244,259,298 are replaced by okOutcome(...)."
Δ7 D3 (append): "toolResultClassWiring.test.ts:125-130 is changed to mock `errOutcome('{\"error\":\"Tool execution failed: ECONNREFUSED\"}')` and expect `reason: 'tool-reported'`; ADD a sibling case where the same sentence arrives with `okOutcome(...)` and still reads `transport` (the regex stays a live second lens)."
Δ8 F1 rewrite: "…tool_experience accumulator has NO entry for (backend, tool) after the call (recordToolSuccess is called and returns at toolExperienceFlush.ts:87 — assert the accumulator, not the call)…" Transport: "stage-07 composition with a mocked executeMCPTool returning errOutcome('{\"rows\":[]}'); PLUS one real executeMCPTool call against createFixtureMcpServer naming a tool absent from the vocabulary (fixtureMcpServer.ts:72-73) → `{ text: 'unknown tool <name>', isError: true }`. No fixture change."
Δ9 F3 rewrite: "fixture server `close()`d before the call → connect fails → `{ text: '{\"error\":\"Tool execution failed: …\"}', isError: true }` → `unreadable:tool-reported`" (the socket knob does not exist).
Δ10 NEW F6: "stageClarify ask-discovery through the registered closure with the executeMCPTool mock returning errOutcome('{\"rows\":[]}') → attempt outcome `no-answer`/`could-not-run`, NOT `answered, []` (stageClarify.ts:1873-1884)."
Δ11 NEW FOLLOW-UP (name it, do not fence it): "examScorers.readResult (examScorers.ts:176-184) re-classifies persisted raw bytes with no verdict (PersistRawEntry, types.ts:163-168), so the E1-a honesty metric does not follow M1. CARD-M1B lifts an optional `isError` onto PersistRawEntry via recordToolCall (stageTools.ts:246) and passes `transportError: entry.isError` in readResult; pre-phase rows stay absent → today's behaviour." Separately: entityDiscoverySync.ts:389 and gatewayEnumerate.ts:143/:160 ignore isError.
Δ12 ORDER 4 (append): "No new test copies a backend id; the existing ctx builders with `backend_id: 'armes'` are not reused verbatim."
Δ13 FENCE (append): "api/cwf/_lib/turn/stageTools.ts comment :1766-1771 may be corrected (it already misdescribes toolError as a text sniff)."

read relay_inbox at 2026-09-30 (this window, via node scripts/mail-wait.mjs scout-2 --read), card id 1d980e0b-127a-46c7-8aa1-ed14a207f085. Next: ORDER-SCOUT-REVIEW-A26-S164-1.
