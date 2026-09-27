RULING-S160-UI-UX-AND-HARDCODED-TABLES-1
Architect record, S160, 2026-09-27T05:12Z. Owner message 2026-09-27 08:06 TSI.

## OWNER-APPROVAL-S160-PLAN-1
Owner's words: "PLani onayliyorum." Approves the S160 plan (7 steps) sent 05:0x TSI: 1 PR 623 landing · 2 doc-repo push · 3 A25 R6(g) NOW card · 4 item 91 after 623 · 5 item 106 · 6 E1 cards to scout (provider firings EXCLUDED, each needs a named spend approval) · 7 close set at turn 20.

## OWNER-RULING-S160-UI-UX-WITH-EVERY-CARD-1 (owner design source, S112-YASA-1)
Owner's words: "3. madde de yapicagin degisiklikleri yaparken ve yeni mimari insaa ederken UI /UX tarafinda da yapilmasi gereken degisiklikleri yani ekleme ve cikartmalarida yapmayi MUTLAKA yapmalisin."
RULE: every A25 card (starting with CARD-ALWAYS-INCLUDE-TO-DATA-S160-1) carries the admin UI/UX additions AND removals its data/architecture change implies, in the same card, with the surfaces named by file:line. A card that moves a code table to data without giving the owner the screen that shows and edits that data is incomplete. Architect blind spot recorded beside it: the first draft of the R6(g) card in the Architect's head had no UI orders; the owner added them.

## OWNER QUESTION — "will NO hard-coded table remain, like the 6x13?" — ANSWERED FROM MEASUREMENT (master b8e5b1d95b76b92b0c20383ebd7a1d0bf9c7da6f, 2026-09-27T05:10Z)
Backend-specific tables still in code today, each with the card that removes it:
1. MATRIX 6 actions x 13 objects — api/cwf/_lib/routing/deriveCategories.ts:63 (+ MATRIX_CATEGORY_UNIVERSE :112) → A25 E5 (after E3 shadow exit; router.matrixReplace=0 first).
2. ALWAYS_INCLUDE two tool names — toolCategories.ts:1203 → CARD-ALWAYS-INCLUDE-TO-DATA-S160-1 (NOW).
3. 'superset' literal at the pack switch — prompt/assemble.ts:55 → same card; HAND_PACKED_BACKENDS in DbKnowledgeProvider.ts:358 → item 82 card, cut after the NOW card lands.
4. IR filter enums and the entity-alias enum — routing/irFrame.ts (z.enum) → A25 E5.
5. data/backends/index.json names one backend as writer/console/exposure/reconcile target (writerKinds armes.*, consoleKinds armes.tool_category, exposureAnnotationKind armes.tool_annotation, reconcileBackends [armes]) — a single-backend default in CONFIG → A25 E2 (K21 per-backend bundle). NEW finding F-S160-BACKENDS-INDEX-NAMES-ONE-BACKEND-AS-WRITER-TARGET-1.
6. Case-sensitive "armes|Armes|ARMES" lines in api/src/shared non-test code: 146 (git grep, shared clone 2a6f6781; scout's S159 count on a narrower scope: 50 files / 71 matches) → A25 E5 + K-G CI gate = 0.
Already gone (measured): the static CATEGORIES array (tool_category rows, DB-first); the code knowledge seeds (S156 G2).
What STAYS in code by design and is NOT a backend table: generic kind schemas (Zod; e.g. role enum entry/resolver/metric/scrap/quality/other), governed-parameter safe defaults the DB overrides, lab flags. None names a backend.
PROOF, not promise: the K-G CI grep gate (case-sensitive, includes public/) printing 0 at E5 exit is the evidence; the Architect's word is not.

END · RULING-S160-UI-UX-AND-HARDCODED-TABLES-1
