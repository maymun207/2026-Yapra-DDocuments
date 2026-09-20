CWF-S143-PRODUCT-SEAMS-VS-OPEN-ITEMS-v1

S143 · 2026-09-19T17:50Z · master 7572c3bbfeed23656fcf8a55f6e64d93ed240c14 (shared clone, read on the
owner's machine). Source compared: the owner-pasted summary of CWF-S140-ARCHITECTURE-VS-CODE-MEASURED-v1
(the full document is NOT in the archive — only S141 cards reference it; it lives in the cwf_yaprak_8 box).

## THE FINDING

F-S143-OPEN-ITEMS-LIST-HAD-NO-PRODUCT-AXIS-1 — the Architect's S143 open-items list was built from
register v132, which carries the whole product architecture as ONE compressed line ("the S140 plan items
P0-2/P1-1/…/P3-2"). The list therefore held governance and infrastructure only; not one room of the turn
pipeline appeared by name. Same class as S142's FIVE-QUEUE-POSITIONS-FROM-CARRIERS-NOT-THE-PRODUCT, and
silent compression by the carriers (FULLEST-ATTESTED). Surfaced by the OWNER pasting the table
(S112-YASA-1 / §12.14 — recorded by name). CURE (mechanical): register v133 gets a PRODUCT SEAMS section,
one row per room, each row with its live status and the command that measured it; the next open-items list
is derived from that section, never from a carried one-liner. DATE: S143 close.

## THE TABLE RE-MEASURED AT MASTER (S140 table → today)

| Room | S140 table | Today, measured | Measure |
|---|---|---|---|
| ⑤ diagnosis (entityDiagnosis.ts) | built, NOT wired | WIRED — stageClarify.ts:78 imports diagnoseFrom; module header "WIRED — CARD-WIRE-DIAGNOSIS-AND-EXECUTION-DECISION-S140-1" | git grep + head |
| ⑥ execution decision | built, NOT wired | WIRED — stageClarify.ts:79 imports decideTurn, CARRIER_RULE_ID | git grep |
| turn_context trio (value·confidence·producer) | absent | PRESENT — types.ts:826 "append-only, attributed, confidence-carrying"; commit 1f7bedcb TURN-CONTEXT-FLOW-WIRED-S141-1 | grep + git log |
| ④ channel-2 BM25 + RRF | absent | STILL ABSENT from the turn — only vectorLane/encoder.ts and scripts/pbFullMeasure.ts import bm25 | git grep |
| ③ typer | absent | STILL ABSENT — no api module; only a telemetry mention | git grep |
| τ / β rows | absent | STILL NOT ROWS — entityDiagnosis.ts:88 "τ and β ARE GOVERNED agent.param ROWS AND ARE NOT DEFINED HERE"; :156 calibration needs channel-2 LIVE + L5 data | grep |
| G coverage graph | no caller | STILL NO CALLER — GraphKbReader imported by nobody outside its own dir/repositories | git grep |
| Vector line | on, unreachable | unchanged — stale CloudFront origin (S142) | carried |
| L5 ledgers · OPA · cross-turn carrier/P3c · planner · time slot · Yol A tool-name gap card | per table | NOT RE-MEASURED | — |

## SOTA TRACE (SOTA-1)

cwf-sota-definition-v1_5: the internal M-A gate metric attributes 62.14 % / 76.40 % (whole corpus) and
up to 98.88 % of clarification blocks to entity-unresolved; τ²-bench measures "policy adherence + tool use +
clarification". The unwired entity rooms (channel-2, τ/β, G) are traceable to those criteria and are
therefore IN v1 scope. The three §6 BENCH items remain first because they make any criterion measurable.

END · CWF-S143-PRODUCT-SEAMS-VS-OPEN-ITEMS-v1
