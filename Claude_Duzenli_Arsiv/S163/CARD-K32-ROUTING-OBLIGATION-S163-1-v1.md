<!-- relay-audit: v1 kind=card -->
CARD-K32-ROUTING-OBLIGATION-S163-1-v1

LANE: AG-1 (in mail-wait)
fanout: personalized (one lane, one body)
FROM: Architect, S163, 2026-09-29T03:08Z
AUTHORITY: OWNER-RULING-S159-A25-ADOPT-1 (A25 adopted with R6(b) = B: "Göç varsayılanı: HİNT; yükümlülük yalnız sahibin arayüzden yayınladığı satırlar") · OWNER-RULING-S161-CAPTURE-TOUR-1 (the tour question must be answered truthfully in production) · OWNER-APPROVAL-S163-PLAN-1 (plan item 6) · OWNER-RULING-S153-NO-ARMES-HARDCODE-1 · OWNER-RULING-S160-UI-UX-WITH-EVERY-CARD-1.
ADVERSARY: NEW subject → scout-2 reviews this card BEFORE it is inserted into AG-1's box (§12.1). It is NOT on the bus yet.
QUEUE: one open PR at a time. Order: PR 635 (E1-a) → CARD-SCOUT-LOOP (AG-3) → THIS card. Prepare and push your branch; open the PR only when NOTICE-OPEN-PR-K32-S163-1 says the slot is free.
NO CRON TASK. GRAFT: graft first. SECURITY: never print, echo, printenv or cat any environment variable.

## WHY (measured by the Architect, production, 2026-09-29T03:04Z)
- The owner published armes.tool_category/andon v2 (rule 4f38df6f-db57-46e0-b80b-df4f1b74b853, keywords + "pişmiş", "cooked") at 03:03:18Z and re-asked "KB7 pişmiş stokta hangi işler bulunuyor?". turn_trace_digest turn 6dcc95fa1aee0a54d35ab748d8ddf222, stage 07 register-tools: `path: semantic`, `basis: frame`, irFrame {action QUERY_STATUS, object MATERIAL, metricsSurface ["pişmiş stok"]}, extractedKeywords ["kb7","pişmiş","stokta","hangi","işler","bulunuyor"], matchedCategories ["material"] ONLY, offeredCount 33, getCookedStockAndon NOT offered (the string does not occur anywhere in the turn's trace). Answer: "beklenmeyen bir aksaklık … teknik bir sorun"; 3 armes calls failed; tools used getFactoryList, search_tools, getInventory ×2, getInventoryCatalogue ×2, getMaterialTypes.
- Cause: on the frame/semantic path the category keywords are not consulted for the current message (F-S159-GOVERNED-KEYWORD-IGNORED-ON-SEMANTIC-PATH-1, register 105) — the IR frame's object alone picks the category. A governed keyword edit therefore cannot reach this path. The Architect recommended the keyword edit WITHOUT reading stage 07 first (practice 100 broken: A-REC-S163-2).
- The right tool exists: armes getCookedStockAndon ("Get cooked stock status overview for Andon boards", required [factoryId] only — backend_tools, read 03:0xZ).
- A25 already decides the remedy (§ table row 2, owner-adopted): keywords stay HINTS; a binding route is a NEW governed kind `routing_obligation`, unit (condition, TOOL) — never a category — that enters the offered set on EVERY path and is counted against the budget FIRST; only rows the owner publishes in the Rules UI; LEARNED mappings never migrate into it; overflow stamps OBLIGATION-OVERFLOW. This card builds the smallest slice of K32 that makes that true.

## ORDERS
1. KIND (data, not code): a governed kind `<backend>.routing_obligation` is created through the SAME mechanism the existing kinds use (find it with graft: how armes.tool_category / armes.tool_graph_node are declared — kind registry rows, shape/schema, eval-gate checks). Shape: { "tool": string (must exist in backend_tools for that backend — REFERENTIAL check), "when_any": string[] (lower-cased, Turkish-folded terms; non-empty), "note": string }. NO backend literal in code: the kind is declared per backend as data (NO-HARDCODE); if the kind registry needs a migration, write it (the Gemini operator applies it after landing — name that in the report).
2. ROUTER: at the point where stage 07 builds the offered set (graft: filterToolsByMessage / register-tools in api/cwf/_lib/turn/stageTools.ts and the helpers it calls), after category resolution on EVERY path (frame · semantic · fallback · sticky), add every published obligation whose `when_any` intersects the turn's folded extractedKeywords (use the SAME folding the keyword arm already uses — PR 621's tokenizeFor; do not write a second folder, §12.6) and whose tool belongs to an active, in-scope backend (RBAC scope and lifecycle exactly as for any offered tool — an obligation never bypasses a scope or a write-fence). Obligated tools are placed FIRST and count against the budget first; if obligations alone exceed the budget, keep them all and stamp `obligationOverflow: true`.
3. TRACE (FULL-TRACE MANDATE): stage 07 register-tools output gains `obligationsApplied: [{ruleId, tool, matchedTerm}]` and `obligationOverflow` — ALWAYS present ([] and false on a clean turn); the Langfuse span carries the same.
4. UI/UX (OWNER-RULING-S160-UI-UX-WITH-EVERY-CARD-1): (a) the Rules tab lists the new kind per backend and lets the owner create/edit/publish a row through the eval gate like any other kind — measure whether the generic kind UI already does this; if yes, say so with the file:line, if no, add it; (b) the Tool Matching tab shows each backend's published obligations (term → tool) next to its entry floor; (c) the turn inspector (Inspect / trace panel) shows obligationsApplied for the turn.
5. TESTS: a published obligation {tool getCookedStockAndon, when_any ["pişmiş","cooked"]} → a frame-path turn with keywords ["pişmiş","stokta"] offers getCookedStockAndon FIRST; with no obligation the offered set is byte-identical to master's (regression); an obligation for an out-of-scope backend is NOT offered; an obligation naming a tool absent from backend_tools is refused by the gate (REFERENTIAL); folding: "PİŞMİŞ" and "pismis" match.
6. FENCE (first commit, complete — run `npm run build` BEFORE committing and add every regenerated file): the router files you touch · the kind declaration (code or migration) · the UI files · the tests · your report · any gate-mandated file.
7. `npm run build` (five gates) · `npm run typecheck:api` · the tests; ONE commit on phase/k32-routing-obligation-s163-1 off master; push; no PR until NOTICE-OPEN-PR-K32-S163-1. SLIP-CARD-K32-ROUTING-OBLIGATION-S163-1 (bus + fallback file S163/). Back to mail-wait.

## AFTER LANDING (not this PR)
The owner publishes, in the Rules UI, armes.routing_obligation {tool getCookedStockAndon, when_any ["pişmiş","cooked"], note "pişmiş stok = fırın çıkışı pişmiş ürün stoğu"} and re-asks the tour question; the Architect reads stage 07 (obligationsApplied) and the answer. Whether getCookedStockAndon returns WORK ORDERS or only an overview is UNMEASURED until that call runs.

## FALSIFIERS
F1 · with the obligation published, the tour question's stage 07 shows getCookedStockAndon in offeredToolNames and in obligationsApplied.
F2 · with no obligation published, every E1 exam set's offered sets equal master's (no silent routing change).
F3 · `git grep -n -E "getCookedStockAndon|pişmiş"` over non-test source returns nothing (the route is data, never code).

FORBIDDEN: any backend or tool literal in router code; migrating tool_cache or keywords into obligations; applying a migration; a merge commit; opening the PR before the notice; cron; printing an environment value.

END · CARD-K32-ROUTING-OBLIGATION-S163-1-v1
