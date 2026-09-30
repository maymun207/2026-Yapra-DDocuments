<!-- relay-audit: v1 kind=notice -->
NOTICE-M2-CARRY-FILTER-RULING-S164-2

LANE: AG-3 (CARD-M2-HONEST-GRADING-S164-1-v2; PR 642 open, head 34f11d95a8a76e6d34da3bd76d2321ebedafa669, base 41450c98f75c18d0fe0e4c59bb1e8c8b73d384b1)
fanout: personalized (one lane, one body)
FROM: Architect, S164, 2026-09-30T04:12Z
AUTHORITY: SUPERSEDES NOTICE-M2-F7-RULING-S164-1 (bus row a97a6299-062b-49ae-8861-482d7137094b). scout-2 SCOUT-STATUS-REVIEW-M2-F7-RULING-S164-1 (bus row 742869f6-ba28-48ab-a720-4aff9ad5b411) RED, Δ1–Δ4, measured at your prep head: the ruling fixed the ask row only; M2's single filter also makes the carrier REACH BACK past a completed-but-non-offerable reply to an older ask (Δ4), and the reason given for rejecting shape (a) was untested (Q4). The Architect's ruling is withdrawn and replaced below.
NO CRON TASK. GRAFT: graft first. SECURITY: never print, echo, printenv or cat any environment variable.

## RULING — the carrier and recall answer two different questions, so they get two NAMED filters
1. The carrier (readCarriedResolution → listRecentByConversation, stageClarify.ts:677-710) reads through a NAMED carry filter `CARRY_OUTCOME_FILTER` = the pre-M2 class-only literal (class null OR class neq failed), byte-for-byte what master had before M2. It answers "what was the latest non-failed turn". This restores pre-M2 carry parity in BOTH directions.
2. Recall (listRecentByUser and every other recall reader) keeps M2's `OFFERABLE_OUTCOME_FILTER` (the scout's literal) unchanged. It answers "what is honest to recall".
3. `askTurnUngraded` is REMOVED (unnecessary under 1). `offerable = class === 'clean' || outcomeHonest(outcome)` as the card says (Δ-43).
4. Δ3 — D1's new failed cell on an ASK turn: an ask turn's product is the question, so D1's rationale ("no data behind its answer") does not apply. Exempt ask turns from the `emptyOnlyWithFailures` disjunct, keyed on the SAME condition that writes decision.ask (Δ1: hoist `shown = ctx.askShown?.[0]` above the stamp at memoryDistill.ts:532 and use `shown !== undefined`; do not re-read decision).
5. listRecentByConversation must not be reused by any recall path after this; if graft shows another caller, STOP and slip it.

## STEPS
1. PR 642 is OPEN and its content changes → practice 145: CLOSE PR 642 unmerged (comment: "SUPERSEDED — carried to a fresh branch per NOTICE-M2-CARRY-FILTER-RULING-S164-2"), cut `phase/m2-honest-grading-s164-2` from CURRENT origin/master (41450c98f75c18d0fe0e4c59bb1e8c8b73d384b1 unless it moved — print it), carry the M2 content, apply the ruling, one commit.
2. Tests (named, all green):
   F7  — ask turn with one answered discovery call carries its shown option (askOption 'k-north').
   F7e — ask turn with discovery {1 empty, 1 failed, 0 data} is NOT class failed (ask exemption) and carries.
   F7f — A = ask {X,Y}; B = reply "X" with tools {1 answered, 1 failed}, groundingOk true (unproven, offerable=false); C = "Y" → the carrier reads B, C carries NO option and NOT A's peers.
   F7g — A = ask; B′ = class failed reply; C → the carrier skips B′ and reads A (pins the pre-M2 skip; Q4).
   F7h — recall (listRecentByUser) still hides B (offerable=false) — M2's honesty change stays for recall.
   Planted faults: carrier switched to OFFERABLE_OUTCOME_FILTER → F7f red; ask exemption removed → F7e red; revert both.
3. All gates of the card (build, typecheck:api, rule24, migration-versions, tenant-zero, backend-names, reseal if drift) + CI-only gates relayAudit and report-schema by name. Report lines: "F7 ruling: two named filters (carry = pre-M2 literal, recall = M2 literal); F7/F7e/F7f/F7g/F7h: <lines>" and the planted-fault lines; cite stageStream.ts:661 (not :649) as the only groundingSummary writer.
4. Push, open the PR, slip with the full 40-hex head. scout-1 lands it (order follows your slip).

END · NOTICE-M2-CARRY-FILTER-RULING-S164-2
