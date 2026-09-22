<!-- relay-audit: v1 kind=notice -->
ORDER-MEASURE-SECOND-ASK-S141-1-SUPPLEMENT-1

LANE: scout

Supplement to ORDER-MEASURE-SECOND-ASK-AFTER-579-S141-1-v1 (row in `raw-tokens`); same priority, same reply. A SECOND conversation, the OWNER's, on production at the same master, worse than the Architect's:

turn 1 (13:06:15Z) `Granit fabrikasında 13.09.2026 tarihinde 0-8 vardiyasında sırlama 3-4-5 te çalışan personelleri listele` → ir_frame entity_ref = ["sırlama 3-4-5"] ONLY — the stated factory "Granit fabrikası" is NOT in entity_ref and NOT among frame_evidence candidates (every kept candidate: action QUERY_MASTER, object EMPLOYEE, entity_ref sırlama 3-4-5, time). No entity_scope_narrowed event. Ask: "'sırlama 3-4-5' adıyla eşleşen 2 kayıt var" — options 1. Kalebodur 7 Fabrikası 2. Sır Hazırlık - Çan (parent-labelled lines, NEITHER under Granit).
turn 2 (13:07:05Z, the owner's reply, not an option) → ir_frame entity_ref = ["Granit fabrikası","sırlama 3-4-5"], confidence AMBIGUOUS — the factory IS extracted now — yet NO entity_scope_narrowed event and the SAME two options again.

MEASURE, added to items 1-4:
(5) Turn 1: why did the router drop "Granit fabrikası"? Read the ir_frame/frame_evidence prompt path for the entity_ref slot at master (stageTools / the IR router) and the entity_registry for the factory's display name and aliases: does "Granit" resolve at all (`select entity_id, display_name, aliases, layer_key from entity_registry where display_name ilike '%granit%' or aliases::text ilike '%granit%'`)? If the registry has no "Granit" factory row, the ask was RIGHT to span and the finding is data, not code — say which.
(6) Turn 2: with the factory in entity_ref, why no entity_scope_narrowed? Print the guard that precedes the narrowing (the collapse-to-parent path, :2107-2137 region at db907a34 numbering) and say which condition failed on this frame (confidence AMBIGUOUS? the carried ask?).
(7) Do the two lines shown (under KB7 and under Sır Hazırlık - Çan) have a display_name containing "sırlama 3-4-5"? Print the rows (ids and layer only if the names are gated vocabulary — this is the bus, positions are fine).

VERDICT line for this supplement: `OWNER-TURN: ROUTER-DROPPED-FACTORY <why>` and/or `OWNER-TURN: NO-GRANIT-ROW` and/or `OWNER-TURN: SCOPE-GUARD <which>`, with `reply_to` = THIS row's id.

```evidence:raw-tokens
owner conversation   d039c9ca-7c58-4116-acbb-8324102f2f33
turn 1 head msg      13:06:15Z   turn 2   13:07:05Z
parent order         86638881-d3fb-4918-9ce0-d81fb33ea8c0
master               e443e35f0ea9b9c4da498f2943318f7c22379c2b
```
