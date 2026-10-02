[scout-1]
ADVERSARY-VERDICT: GREEN (code) pr=685 head=9194927dcee6c6f65a3dda5c9a5ddc75eba44f46 · CI COMPLETE and RED by the merge guard (COLLISION, YIELDED-TO #684 on api/cwf/_lib/turn/types.ts) · build and rule26 SKIPPED, so the code has NOT been built or tested in CI · no adversary/scout posted
GRAFT: none run (graft indexes the stale local clone). The diff was read with `git diff c817f8e3…9194927d` / `git grep 9194927d`; messages RLS/policies/grants read live via scripts/roQuery.ts (read-only).
PROMPTS: one. The guard log was read through the sanctioned `gh api …/actions/jobs/<id>/logs`, whose redirect host productionresultssa17.blob.core.windows.net was declared.

SCOUT-STATUS-REVIEW-685-S170-1 · reply to ORDER-SCOUT1-REVIEW-685-S170-1 (id 01de08a4-d070-4dd9-885f-d18782cbfb95)
Head 9194927dcee6c6f65a3dda5c9a5ddc75eba44f46 as the card says (30c415d1 code, 9194927d attest). Guard: base c817f8e3717395e834446415d3e701a2b06be4d2, merge-base 45049b1f9a891c2405fc0f317d24f861a52d84c2.

## F-a — NOT an A1 violation (no client-supplied byte can move a number to recalled)
- The read: MessageRepository.listWindowToolResults selects `role, raw_tool_results` only (never `content`), `.eq('conversation_id').eq('user_id')`, newest `windowN`, and keeps `role === 'assistant'` entries' `raw` strings only. stageStream.loadPriorNumericLedger calls it with ctx.resolvedConversationId / ctx.userId / params.historyWindowN; ctx.conversationHistory (client) is never read.
- WHO WRITES raw_tool_results: the ONLY writer is MessageRepository.insert (:29-33). Its callers write `raw_tool_results: ctx.persistRaw` (stageStream.ts:811, :1258), and ctx.persistRaw is filled ONLY by recordToolCall (stageTools.ts:255) from the MCP result. The browser cannot write messages, measured LIVE: RLS enabled; the only policy is `messages_select_own` (SELECT, `auth.uid() = user_id`); no INSERT or UPDATE policy; anon and authenticated hold no table grants. `git grep` of src/ for an insert/upsert to messages → none (the one upsert is mcpSettingsService.ts:79).
- What F-a really is: "client passthrough" names the bytes the server SENDS to the client (`rawForClient`, capped 100k), which can carry handle records the MODEL never read. This turn's ledger reads the SDK `returned` string instead (numericLedger.ts:263-264), so the prior ledger is BROADER. A number from a never-read record restated by the model lands as RECALLED, not UNSOURCED. That is over-attribution in the softer direction, from SERVER tool bytes, offerability-neutral (A5: unsourced only) and named in the report. A precision residual, not a laundering hole. The fix needs a persisted per-turn SDK ledger (a separate card, as the report says).

## Rest of the review: GREEN
- Identity/disjointness: measureNumericClaims tries this turn's ledger first (`continue` = sourced), then the prior ledger → `recalled`, else `unsourced`. Every claim lands in exactly one class; test `claims = sourced + recalled + unsourced, and recalled ∩ unsourced = ∅` exists.
- Three states: priorLedger undefined → no recalled key (pre-card shape, tested); null (read threw → loadPriorNumericLedger catch) → `recalled: null, recalledValues: []`, unsourced unchanged (test (d)); array → a count.
- Laundering test (a): a number only in a prior ANSWER stays unsourced and the read never selects content. Injected-history test (b): request conversationHistory → unsourced. User-row raw never feeds the ledger.
- Stamp: numericStampNotice returns '' unless mode === 'stamp'. The recalled sentence comes AFTER the unsourced one; an unsourced-only stamp is byte-identical to before (tested).
- Done frame: a NEW key `numeric {claims, unsourced, recalled, values, recalledValues}`, named as new, pinned in chatQuotaStream.test.ts's exact key list, absent when grounding threw. The values are the answer's own numbers, not tool bytes.
- Ordering: the prior read runs before the grounding check and before this turn's assistant row is inserted (:811/:1258 come later), so this turn never counts as "prior".
- §13.1: `git grep -i` of the 6 touched code files for any quoted registry id → 0.
- DIAGRAM-ATTEST (report :125-129, five tabs): true. No new store or edge (the same messages table and service-role client), and no stage added.
- F-c fence growth, each file needed: groundingCheck.ts (the one call site), turn/types.ts (the ctx field), cwfService.ts + cwfStore.ts (both by-name hops, the S82-5 rule, tested), params/chatSurface.ts (the house home for chip strings), ChatShell.tsx (the render), chatQuotaStream.test.ts (the exact done-key list would otherwise go red). BUT turn/types.ts is exactly the path the guard collides on (below).

## CI at 9194927dcee6c6f65a3dda5c9a5ddc75eba44f46 (read once)
changes FAILURE · relay corpus success · report-schema success · arm auto-merge success · Vercel success · SKIPPED: build, rule26, eval-canary. The backend-name, tenant-zero, Build and Run tests steps live inside the skipped `build` job: UNMEASURED.
```
[merge-guard] pr #685 base c817f8e3717395e834446415d3e701a2b06be4d2 head 9194927dcee6c6f65a3dda5c9a5ddc75eba44f46 merge-base 45049b1f9a891c2405fc0f317d24f861a52d84c2
[merge-guard] CLEAN-MERGE: no in-branch merge in merge-base..head
[merge-guard] FENCE-GREW ok — head fence is held by the first fence, at 30c415d152835969ab46a3c2b7a4fc0c08dfbb40
[merge-guard] timeline ok — 4 events, no reopen, no force-push
[merge-guard] COLLISION: 1 other open PR(s) against master (plant heads ignored)
[merge-guard] FAIL COLLISION — YIELDED-TO #684: #685 and #684 overlap on api/cwf/_lib/turn/types.ts~api/cwf/_lib/turn/types.ts; the higher number yields
[merge-guard] VERDICT RED — COLLISION
##[error]Process completed with exit code 1.
```
Class (b): a guard refusal caused by sibling #684 (rule scripts/mergeGuard.mjs:532). The own branch is otherwise clean.
Repair (AG-1): no code edit now. After #684 lands, `git merge origin/master`, resolve turn/types.ts by content, push. CI then builds and tests for the first time, and the backend-name and tenant-zero steps must be read on that run.
