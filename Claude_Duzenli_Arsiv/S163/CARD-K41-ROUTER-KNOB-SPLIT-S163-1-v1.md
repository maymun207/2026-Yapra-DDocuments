<!-- relay-audit: v1 kind=card -->
CARD-K41-ROUTER-KNOB-SPLIT-S163-1-v1

LANE: AG-2 (in mail-wait; measured IN-LOOP by PING-AG-2-S163-1 [STAMPED] and NOTICE-PUSH-DOC-REPO-S163-2 taken in 10 s)
fanout: personalized (one lane, one body)
FROM: Architect, S163, 2026-09-29T04:02Z
AUTHORITY: OWNER-APPROVAL-S163-K41-1 (the owner, 2026-09-29 06:58 TSİ: "onay k41") on the Architect's proposal: pull A25 E2's K41 forward right after K32 so the owner can switch the hand-written frame→category matrix OFF from the UI; deletion stays in E5 · OWNER-RULING-S159-A25-ADOPT-1 · OWNER-DESIGN-S159-1 (the hard-coded frame matrix is "çöp") · OWNER-RULING-S153-NO-ARMES-HARDCODE-1 · OWNER-RULING-S160-UI-UX-WITH-EVERY-CARD-1.
ADVERSARY: NEW subject → scout-2 reviews this card BEFORE it is inserted into AG-2's box (§12.1). Not on the bus yet.
QUEUE: one open PR at a time; order: CARD-SCOUT-LOOP (AG-3) → CARD-K32 (AG-1) → CARD-TOUR-HONESTY (AG-4) → THIS. Prepare and push; open the PR only on NOTICE-OPEN-PR-K41-S163-1.
NO CRON TASK. GRAFT: graft first. SECURITY: never print, echo, printenv or cat any environment variable.

## WHY (measured)
- A25 §9, E2 row (the bytes): "anahtar ayrımı router.matrixReplace ≠ router.frameEnabled ≠ keyword-semantik (K41)"; E3: "frameRouting/matrixReplace flip'i sahiple arayüzden, K34 kapısıyla"; E5: "MATRIX + IR süzgeç enum'ları + alias enum'u silinir".
- Today ONE knob does three jobs. scout-2 (SCOUT-STATUS-REVIEW-ROUTING-ARCHITECTURE-v2-S159-2) measured "frameRouting=0 also switches off hints/metric floor/unmodeled-keep (:1609)", so the owner cannot turn the matrix off without losing the other two. scout-2 (SCOUT-STATUS-REVIEW-CARD-K32-S163-1, R1) measured at 1a6279e0: on path 'semantic' the category set comes from the router LLM (api/cwf/_lib/toolCategories.ts:1560-1574) and matchCategories is not called; with frameRouting and a HIGH frame the frame's derivation REPLACES it (:1637-1642); keywords are re-consulted on basis 'frame' only for categories OUTSIDE MATRIX_CATEGORY_UNIVERSE (:1660-1667).
- Production witness, 2026-09-29T03:04Z (turn 6dcc95fa1aee0a54d35ab748d8ddf222): the owner's published keyword "pişmiş" on armes.tool_category/andon v2 (rule 4f38df6f-db57-46e0-b80b-df4f1b74b853) could not reach the turn — basis frame, matchedCategories [material].

## DESIGN (one path)
Split the one knob into THREE governed params, each DEFAULTED TO TODAY'S BEHAVIOUR so the landing changes nothing; the owner flips them later from the UI:
- `router.frameEnabled` — extract the IR frame and record it (observation: trace + K24 frame{}). Default = today's frameRouting value.
- `router.matrixReplace` — the frame's MATRIX derivation REPLACES the category set on a HIGH frame (today's :1637-1642). Default = today's frameRouting value. When 0, the frame is still extracted (if frameEnabled) but decides nothing.
- `router.keywordArmAllPaths` — union the keyword arm's matched categories (matchCategories over the message, the SAME function the fallback path uses — §12.6) into the set on EVERY path (semantic and frame), not only outside the matrix universe. Default 0 (today). 
Hints / metric floor / unmodeled-keep are governed by what they are, not by frameRouting: each follows `router.frameEnabled` (they read the frame) and NOT `router.matrixReplace` — measure :1609 and state exactly which of them reads what.
`frameRouting` itself is retired AS A KNOB by this card only if every consumer is re-pointed; otherwise it stays as a read-only alias that derives both new params, named in the report.

## ORDERS
1. MEASURE FIRST (in the report, file:line at your base): every consumer of frameRouting (grep the CONSUMER, §12.6); where the param is declared (agentParams / the governed params registry — graft it); how params are published and gated (the same path the owner used for web.* in S133); the :1609 line and what each of hints / metric floor / unmodeled-keep reads.
2. PARAMS: declare the three params in the SAME registry and shape as existing router.* params (value, min 0, max 1, sessionTweakable false), defaults as in DESIGN. No backend literal.
3. ROUTER: in toolCategories.ts, gate the REPLACE (:1637-1642) on router.matrixReplace; gate frame extraction on router.frameEnabled; add the keyword union behind router.keywordArmAllPaths using matchCategories on the message (fold as matchCategories already does — do not add a folder here; K32 owns the turkishFold door). With all three at their defaults, the offered set is byte-identical to master for every E1 prompt.
4. TRACE (FULL-TRACE, ADR-013 parity): stage 07 register-tools output gains `knobs: {frameEnabled, matrixReplace, keywordArmAllPaths}` (the values READ this turn, with their source 'param'|'default'|'unread') and `keywordArmAdded: string[]` (categories the union added; [] when the knob is 0 and the arm did not run → null). Console twin on the [ToolRoute] line.
5. UI/UX: the three params appear wherever router params are edited today (measure: Rules/params UI — graft); each shows a one-line TR description: frameEnabled "Soru çerçevesini çıkar ve kaydet (karar vermez)", matrixReplace "Çerçeve matrisi kategori kümesini değiştirir (eski davranış)", keywordArmAllPaths "Yayınlı anahtar kelimeler her yolda kategori ekler". The turn inspector's stage-07 RoutingChain shows the three knob values and keywordArmAdded.
6. TESTS: defaults → byte-identical offered set (the in-process stageRegisterTools harness, fixture backends only); matrixReplace=0 + keywordArmAllPaths=1 → a HIGH-frame turn whose message matches a fixture category's published keyword gets that category added (keywordArmAdded non-empty); frameEnabled=0 → no frame in the trace and hints/metric floor/unmodeled-keep behave as today's frameRouting=0 ONLY if step 1 measured that they read the frame; the replay/exam lenses (routeKeywordLayer / examRun / kaExam) — state whether they read these knobs and, if not, name the divergence.
7. FENCE (first commit complete; `npm run build` BEFORE committing; every regenerated file joins): the param registry file(s) · toolCategories.ts · stageTools.ts (trace only) · the params UI file(s) · TurnDigestSection.tsx · stageCardCoverage.ts (a stage-07 needle for knobs) · the tests · your report · gate-regenerated files.
8. `npm run build` · `npm run typecheck:api` · the tests; ONE commit on phase/k41-router-knob-split-s163-1 off master; push; no PR until the notice. SLIP-CARD-K41-ROUTER-KNOB-SPLIT-S163-1 (bus + fallback S163/). Back to mail-wait.

## AFTER LANDING (the owner, from the UI; not this PR)
Set router.matrixReplace = 0 and router.keywordArmAllPaths = 1 and re-ask "KB7 pişmiş stokta hangi işler bulunuyor?". With andon v2's "pişmiş" published, stage 07 should show keywordArmAdded ["andon"] and getCookedStockAndon offered. The E1 exam run before and after the flip is the measurement (A25 E3's shadow comparison, taken early and named as such).

## FALSIFIERS
F1 · defaults: offered sets byte-identical to master (harness, E1 prompts).
F2 · matrixReplace=0 + keywordArmAllPaths=1: the tour question's stage 07 shows keywordArmAdded containing andon.
F3 · `git diff origin/master...HEAD` adds no backend id or category name literal to non-test source (the union is data-driven: published keywords only).

FORBIDDEN: editing the MATRIX or CATEGORIES tables; a backend or category literal in router code; a second keyword matcher; changing any default away from today's behaviour; a migration unless step 1 proves params need one (then name it for the operator); a merge commit; cron; printing an environment value.

END · CARD-K41-ROUTER-KNOB-SPLIT-S163-1-v1
