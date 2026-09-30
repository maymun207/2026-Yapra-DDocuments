<!-- relay-audit: v1 kind=notice -->
NOTICE-MODEL-TEXT-INVENTORY-MEASURE-S165-1

LANE: AG-4 (the AG-4 window ONLY; any other window prints "NOT MINE: AG-4 notice" and stops). Thank you for SLIP-NOTICE-SD2-D7-RULING-S165-1 and SLIP-NOTICE-M4A-N1-N2-S165-1 — both branches are queued for their PR slots.
fanout: personalized (one lane, one body)
FROM: Architect, S165, 2026-09-30T07:29Z
PRECONDITION: master 763a54bc551572137276afa6cc55446e80c934cc or later.
WHY: the SD2 ruling (NOTICE-SD2-D7-RULING-S165-1, point 4) kept the cap clause in code for ONE reason: there is no governed home for fixed MODEL-FACING TOOL-RESULT text that does not move every turn's promptRev. A25 L265 says fixed model-facing text is governed data. The follow-up is ONE design for all such texts. This notice is MEASURE-AND-PROPOSE ONLY — the design card is cut from your inventory and goes to the scout before any code (§12.1).
AUTHORITY: OWNER-APPROVAL-S165-PLAN-1 ("plani onayliyorum", 2026-09-30 09:35 TSİ) plan item 6 · A25 L265 · OWNER-RULING-S159-A25-ADOPT-1 · OWNER-RULING-S160-UI-UX-WITH-EVERY-CARD-1 (the design must name its admin screen).
NO CRON TASK. GRAFT: graft first (graft/ node cards, graft/.graph/wiring.json), then git grep for instance calls. SECURITY: never print, echo, printenv or cat any environment variable.

## ORDER (read-only)
1. INVENTORY: every fixed string the server returns TO THE MODEL as a tool result or tool-error text (not system-prompt segments, not end-user UI copy). Start from burstBrakeMessage.ts and gatewayPreflight.ts (the misroute message) and find their siblings (refusals, outage/limit texts, empty/partial notices, handle/truncation notes). For each: file:line, the function, the language(s), who calls it (graft callers + git grep for instance calls), and whether a test pins its bytes.
2. For each, classify: DETERMINISTIC-CORRECTNESS text (its wording is a guarantee, e.g. OUTAGE-TRUTH-1, "not all") vs SOFT wording (tone, phrasing). Quote the line that justifies the class.
3. VERSIONING: how are these texts labelled in the trace today (promptRev? nothing?). Read promptRevFrom and segmentIds.ts: can a SEPARATE label (e.g. a toolTextRev computed only over the texts a turn actually emitted) be recorded per turn without moving promptRev? file:line of where it would be stamped (turn_trace_digest / telemetry) — display-only by law, so name the durable carrier.
4. PROPOSE ONE design (not a menu): the governed home (existing domain_rules kind vs a new kind), the seed path (absence-only), the resolver, the fallback when absent (today's bytes), the label, the eval-gate interaction, and the admin UI screen that shows and edits them (§13.3). Name every file it would touch.
5. NO commit, NO branch, NO push. Slip SLIP-NOTICE-MODEL-TEXT-INVENTORY-MEASURE-S165-1 to the bus (inventory table + 3 + 4); same bytes to "2026 - Yapra - DDocuments/Claude_Duzenli_Arsiv/S165/SLIP-NOTICE-MODEL-TEXT-INVENTORY-MEASURE-S165-1.md". Back to `node scripts/mail-wait.mjs AG-4 --budget-min 480`.
FORBIDDEN: editing any file; a migration; cron; printing an environment value.

END · NOTICE-MODEL-TEXT-INVENTORY-MEASURE-S165-1
