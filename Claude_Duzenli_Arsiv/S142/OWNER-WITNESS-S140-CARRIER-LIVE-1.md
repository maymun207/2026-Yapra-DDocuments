# ARCHITECT-WITNESS-S140-CARRIER-LIVE-1 — PR 575 on production, two runs

Read by the Architect in the built-in browser and via execute_sql, 2026-09-16 20:30Z–20:36Z. Production = Vercel dpl_CArauFvnMebebfkogvnDZmvb42L7, READY 20:25:34Z, sha 47402e33faec80c45254668d917cb6f58625a916 (merge of PR 575 by AG-5 at 20:20:34Z).

## What moved in the product

The owner's morning defect — "the reply turn asks AGAIN" — did not reproduce on either run.

Run 1 (conversation a364178d…): turn 99ed36d8… "KB7 fabrikası fırın duruşları, 15 Eylül 2026" → two-line ask FIRINALT / FIRINUST (labelSource self ×2); episode decision.ask WRITTEN {surface fırın, options [FIRINALT id, FIRINUST id]} (A3/A4 live). Turn 5390a905… "FIRINUST" → NO ask, 3 queries (resolve_time_range · getFactoryLines · getLineStopsReportForZones with factoryId KB7, zoneIds [FIRINUST id]), 3 stops rendered from tool bytes.
Run 2 (turns d5784df9… → 9446b1c2…): byte-similar outcome.

Stage 03 of the reply turn, both runs: carried = { read 'ok', from <asking turn id>, peers ['KB7'], askOption '6d432c49-…' (FIRINUST), scoped [], optionRefs [] }.

## What the ledger says about the MECHANISM (honest reading)

- The carrier read works on production: read 'ok', from = the asking turn, peers = the factory, askOption matched the typed message to the shown option. ORDER 1 and ORDER 2's read side are LIVE.
- Neither rung ACTED: scoped [] and optionRefs []. The reply turn's frame carried ONE ref, "KB7 fabrikası fırın" (the router folded the history phrase into the entity ref; resolved by prefix to KB7). There was no ambiguous "FIRINUST" ref for the carried peer to narrow, and no ref equal to the ask's surface for 'carried-option' to resolve. The zone id in the tool call came from the LLM's getFactoryLines chain, not from the carrier.
- This morning's reply turn 5b3f26de… had refs [{ "FIRINUST", ambiguous ×3 }] for the SAME message. Tonight's two runs had refs [{ "KB7 fabrikası fırın", resolved }]. The frame extraction diverges across runs for the same sentence; the discriminating case (ambiguous line ref on the reply turn) was NOT produced tonight, so the narrowing rung is proven only by the failing-first pins (carryLastResolution.test.ts a–f, CI green), not by production.

## Findings raised (for CWF-S140-FINDINGS-v2)

F-S140-CARRIED-OPTION-MATCHED-BUT-NO-REF-TO-RESOLVE-1 — askOption matches the message but optionRefs is empty because the frame carries no ref equal to the ask's surface; the 'carried-option' rung is keyed on the frame's refs, not on the message match. Fix direction: when askOption matches and the ask's surface is absent from the frame, inject a resolved ref for that surface (method 'carried-option') so the tool argument comes from the carrier, not from the LLM re-deriving it.

F-S140-REPLY-TURN-FRAME-SHAPE-DIVERGES-ACROSS-RUNS-1 — same two sentences, three runs (09:07Z, 20:31Z, 20:34Z): the reply frame's refs were ["FIRINUST"] once and ["KB7 fabrikası fırın"] twice. Stochastic; the witness cannot be made deterministic by the sentence alone. The ⓘ line "'KB7 fabrikası fırın' was interpreted as 'Kalebodur 7 Fabrikası' (prefix match)" is the visible trace of the folded ref.

Two clean samples are not proof (stochastic-verification rule); the morning defect is ABSENT on two runs, the mechanism is LIVE on its read side and UNEXERCISED on its acting side in production.
