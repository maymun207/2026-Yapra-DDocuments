<!-- relay-audit: v1 kind=card -->
CARD-TOUR-HONESTY-S163-1-v1

LANE: AG-4 (in mail-wait)
fanout: personalized (one lane, one body)
FROM: Architect, S163, 2026-09-29T03:42Z
AUTHORITY: OWNER-RULING-S161-CAPTURE-TOUR-1 (register 131: the tour question must be answered TRUTHFULLY in production) · OWNER-APPROVAL-S163-PLAN-1 item 6 · constitution §2 empty ≠ zero · OWNER-RULING-S160-UI-UX-WITH-EVERY-CARD-1 · OWNER-RULING-S153-NO-ARMES-HARDCODE-1.
ADVERSARY: NEW subject → scout-2 reviews this card BEFORE it is inserted into AG-4's box (§12.1). Not on the bus yet.
QUEUE: one open PR at a time; order: CARD-SCOUT-LOOP (AG-3) → CARD-K32 (AG-1) → THIS. Prepare and push; open the PR only on NOTICE-OPEN-PR-TOUR-HONESTY-S163-1.
NO CRON TASK. GRAFT: graft first. SECURITY: never print, echo, printenv or cat any environment variable.

## WHY (measured by AG-1, SLIP-MEASURE-TOUR-SEAMS-S163-1, at 1a6279e0; S163/ and project box)
Two production answers to "KB7 pişmiş stokta hangi işler bulunuyor?" asserted things the tool trace does not support:
- S161 tour: "… aktif olarak tanımlanmış başka bir 'iş' bilgisi şu an için mevcut değildir" over three empty arrays, one validation error and one transport error.
- S163 03:04Z (turn 6dcc95fa1aee0a54d35ab748d8ddf222): "sistemdeki beklenmeyen bir aksaklık … teknik bir sorun" — the right tool was never offered (that routing seam is CARD-K32, not this card).
Two seams, both measured by AG-1:
S4 · EMPTY REPORTED AS ZERO. The final prose is the model's own streamed text (api/cwf/_lib/turn/stageStream.ts:192) and by owner ruling it may not be rewritten (api/cwf/_lib/turn/toolOutcomes.ts:283-296). The ledger (toolOutcomes.ts:39-90, recordToolOutcome :233-248) counts an empty [] as a SUCCESS — there is no `empties`. ctx.toolYield.resultsWithRecords (toolResult.ts:464; stageTools.ts:2001-2008) counts results with ≥1 record. The footer (src/lib/params/chatSurface.ts:207-214 OUTAGE_CHIP_TEXT.failure, rendered by src/components/ui/ChatShell.tsx:102) shows failures only. The absence detector (shared/absenceClaim.ts:51-89) has a BI-scoped Turkish subject set and misses `"iş" bilgisi … mevcut değildir`; answerUnbackedDespiteFailures needs successes = 0 and the tour turn had 7 (empties counted as successes).
S1 · GATEWAY SEARCH ADDENDUM HAS NO SCOPE. search_tools belongs to a gateway-pattern backend (stageTools.ts:1940; gatewayEnumerate.ts:143); its index covers only that backend's inner tools. On every 0-hit search CWF appends buildSearchZeroAddendum (api/cwf/_lib/turn/gatewaySearchZero.ts:95-111; stageTools.ts:1963-1969), which never says the index covers ONE backend — so the model reads "0 hits" as "no such tool anywhere".

## ORDERS
1. S4 · LEDGER: recordToolOutcome gains `empty: boolean`, computed at the same stage-7 point as `failed`, from the SAME parse formatToolResult already does for toolYield (§12.6: no second parser). The ledger gets `empties`, ALWAYS present (0 on a clean turn — the field law of its neighbours). Empty = the call succeeded and returned zero records; failed stays failed; data stays success. Three states, never collapsed.
2. S4 · UI (the distinct "veri yok" surface, OWNER-RULING-S160-UI-UX-WITH-EVERY-CARD-1): OUTAGE_CHIP_TEXT gains a sibling line rendered by the SAME ChatShell chip whenever empties > 0: TR "{n} çağrı boş döndü (veri yok) — bu yokluk kanıtı değil" · EN "{n} call(s) returned empty (no data) — not proof of absence". Shown beside the failure line; absent at 0. The raw tool-output panel keeps showing the [] as today.
3. S4 · MODEL SIDE, without rewriting output: extend the gatewaySearchZero precedent (a model-copy addendum on a definite 0) to a definite-empty FLAT result, in formatToolResult's MODEL copy only: one sentence saying the call returned no records and that this is not evidence the thing does not exist. rawForClient and resultText stay byte-identical (FULL-TRACE mandate).
4. S4 · DETECTOR: shared/absenceClaim.ts — the `tr-mevcut-degil` subject set gains `bilgi` / `bilgisi` (and whatever inflection the existing entries use); a test pins the S161 tour sentence. DETECTION only; the owner's rule keeps it off the output.
5. S1 · ADDENDUM SCOPE: buildSearchZeroAddendum takes the gateway backend's DISPLAY NAME as DATA from the backend registry (the caller at stageTools.ts:1968 already holds server.backend_id; read the display name the way the rest of stage 07 reads backend metadata — graft it; NO literal). The addendum adds: TR "bu dizin yalnızca <display_name> iç araçlarını kapsar; bağlı diğer sistemlerin araçları zaten doğrudan araç listende" · EN "this index covers only <display_name>'s inner tools; other connected systems' tools are already in your direct tool list". No display name → the sentence omits the name and invents none.
6. TRACE (FULL-TRACE): stage 07/tool spans carry `empty` per call; the turn digest carries `empties`; the Langfuse span the same. ADR-013 console parity: the existing tool-outcome console line gains `empties=<n>`.
7. TESTS: toolOutcomes (empty ≠ success ≠ failure — three fixtures; a turn of 1 data + 6 empty + 2 failed → successes 1, empties 6, failures 2); the outage-surface test (the empty line renders at >0 and is absent at 0 — find the existing test that pins OUTAGE_CHIP_TEXT); absenceClaim (the tour sentence is detected); gatewaySearchZero (given display name X, the addendum contains X and the scope sentence; given none, no name). Fixture backends only — no real backend/tool literal in tests or code.
8. FENCE (first commit, complete — `npm run build` BEFORE committing; every regenerated file joins): toolOutcomes.ts · toolResult.ts / formatToolResult's file · stageTools.ts (only where it calls the addendum / records the outcome) · gatewaySearchZero.ts · shared/absenceClaim.ts · src/lib/params/chatSurface.ts · src/components/ui/ChatShell.tsx · the tests · your report · gate-regenerated files.
9. `npm run build` (five gates) · `npm run typecheck:api` · the tests; ONE commit on phase/tour-honesty-s163-1 off master; push; NO PR until the notice. SLIP-CARD-TOUR-HONESTY-S163-1 (bus + fallback file S163/). Back to mail-wait.

## FALSIFIERS
F1 · a replayed turn shaped like the S161 tour (1 data, 6 empty, 2 failed) shows the chip line "6 çağrı boş döndü (veri yok) — bu yokluk kanıtı değil" and the digest `empties: 6`.
F2 · a clean turn (all data) renders byte-identical chat UI to master (no empty line; `empties: 0` in the digest).
F3 · `git diff origin/master...HEAD` adds no backend id or tool name literal to non-test source (NO-HARDCODE).
F4 · rawForClient of every tool result is byte-identical to master (the model-copy addendum does not leak into the client copy).

FORBIDDEN: rewriting, suppressing or replacing model output (toolOutcomes.ts:283-296 ruling); a backend or tool literal; a second tokenizer/parser; a merge commit; opening the PR before the notice; cron; printing an environment value.

END · CARD-TOUR-HONESTY-S163-1-v1
