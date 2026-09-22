CWF-S140-FINDINGS-v1

Session S140 · 2026-09-16 · Architect. Each finding names its instrument and its evidence row/turn. Findings live here AND in the register by name until the owner rules on bucket merging (§11). v1 is cut at 18:08Z with the label card still in AG-4's hands; a v2 follows the session's close.

MEASURED CONTEXT AT CUT: master 2f404888c42c7394566ed9803148390d8e1bab73 (merge of PR 573, 17:35:10Z), Vercel production READY at that sha 17:40:52Z. Landed today: PR 555, 568, 569, 570 (registry reads paginated), 571 (K1 ORDER cell hint), 572 (resolve every layer, ask at parent), 573 (rooms wired onto the live clarify path + AMENDMENT-1 carrier rule).

## PRODUCT FINDINGS

F-S140-FACTORY-LAYER-ASK-LABELS-ARE-THE-LAYER-KEY-1 -- OPEN, card in flight (CARD-ASK-OPTION-LABEL-IS-OWN-NAME-S140-1-v2, sealed to AG-4 18:01:58Z). Witness turn 8f82597952bbe316cf143e242d920960 (production 2f404888, 17:45Z): a near-miss factory name -> AMBIGUOUS with three candidates, OFFER_CHOICE -- correct -- but the ask rendered "1. factory 2. factory 3. factory". buildDisambiguators (stageClarify.ts:244-263) labels an option by its PARENT's name and falls to the LAYER KEY when no parent is in hand; the factory layer has no parent. Fix (the scout's rung order): parent -> self -> layer -> entity-id. Instrument: turn_trace_digest stage 03; built-in browser page text; git show at master.

F-S140-ROUTER-FRAME-ABSENT-ON-ENTITY-BEARING-SENTENCE-1 -- OPEN. Morning witness: the FIRINUST camera sentence went through stage 03 with earlyReturn frame-absent and was answered only by the model's own tool loop; the same sentence shape framed HIGH on other turns. Router instability on an entity-bearing sentence; not yet reproduced deterministically. Instrument: turn_trace_digest.

F-S140-TOOL-OFFERED-BUT-NOT-CHOSEN-1 -- OPEN (observation). Turn 7a198156dfa2743c92be866e7d66a460: stage 07 offered getOrderScrapWithReasons (quality via the K1 ORDER hint, stickyAdded []), the model called search_tools twice (both content []) and then getOrderDetails. The offer seam is right; the selection seam is not measured by any gate today. Instrument: turn_trace_digest stages 07/10/11.

F-S140-VECTOR-ENGINE-UNREACHABLE-1 -- OPEN. cwf.vector.query -> VectorEngineUnreachableError (qdrant) on every witnessed turn today (5/5 in the morning; again on 7a198156 at 08:31Z). Turns still answer; the vector lane contributes nothing. Owner-side infra item (engine host), not a code seam. Instrument: turn_trace_digest stage 03 span.

F-S140-CROSS-TURN-CARRIER-ABSENT-1 -- OPEN (plan P1-4). The reply turn to a two-line ask does not carry the factory resolved in the asking turn (KB7 lost). Design: last-resolution slice; migration via Operator. Instrument: morning witness ledger.

F-S140-SEED-STATE-CLAIM-CONTENTION-EVERY-TURN-1 -- OPEN (efficiency). Stage 09 dbReads: seed_state "claim this seed domain atomically" insert ok:false x13 followed by 13 staleness selects, on a turn with nothing to seed. 26 reads per turn spent on a lock nobody needed. Instrument: turn_trace_digest stage 09 dbReads (turn 7a198156).

F-S140-DOMAIN-RULES-REREAD-PER-STAGE-1 -- OPEN (efficiency). domain_rules "published governed knowledge for this turn" read 81/205/259 rows repeatedly across stages 03, 07, 09, 12, 14 within one turn. Instrument: same ledger.

## FACTORY / PROCESS FINDINGS

F-S140-CI-BILLING-STOP-1 -- CLOSED@evidence (scout rows 7fa9c2b4... 16:45:59Z and 628d9331... 17:15:19Z; OWNER-ACTION-S140-GITHUB-SPEND-LIMIT-RAISED-1). From 10:23Z no Actions job in the repository executed a step: every run four seconds, zero steps, annotation "The job was not started because recent account payments have failed or your spending limit needs to be increased" -- including master's scheduled Nightly Compatibility and budget-fence. The one measured reason PR 573 sat six hours (§12.8). The owner raised the limit ~16:47Z; attempt-2 reruns on the same head went green within 18 minutes. Rule kept: a run that never executed a step is not "red" and rerunning it is not S55-1's chase -- it is the first run.

F-S140-SLIP-REPLY-TO-NO-CHANNEL-1 -- OPEN (AG-4's finding, slip 57127e1e... 17:16:33Z). relay_post_from_lane(text,text,text,text) writes no reply_to; the lane role has the column refused (migration 20260814130000). Lanes carry reply_to as a body line. Read side must tolerate both.

F-S140-LENS-NOTIFY-SCOPE-1 -- CLOSED@evidence (PR 573 report finding 1; scout confirmed additive). clarificationLens.ts was edited outside the work card's scope list to add NOTIFY outcome/cause; additive only. The card's scope fence was too narrow, not the lane.

F-S140-CONCURRENT-RESEALS-CONFLICT-ON-MANIFEST-1 -- OPEN. Two branches resealing public/architecture/manifest.json make the second PR DIRTY (571 vs 572 this morning); no pull_request run fires on a dirty PR. Cure: reseal over the merged tree in the same commit; or a manifest whose digests are per-tab files.

F-S140-LAND-LOCK-DELETE-EXIT-128-LEAVES-OWN-NONCE-1 -- OPEN. land.ts release() swallows stderr; a push --delete that fails with exit 128 leaves refs/landing/lock holding the lane's own nonce. Owner-ruled "Release it" -> lease-pinned delete. Cure: print stderr, retry with --force-with-lease, and self-release on exit.

F-S140-SCOUT-WINDOW-HOLDS-NO-LANE-ADDRESS-1 -- OPEN (observation). mail-wait scout --once prints HEARTBEAT FAILED: no ref refs/heads/lane/scout; the scout reads and answers regardless. Heartbeat is not liveness (12.11) -- the scout's output is.

F-S140-ARCHITECT-SEALED-ON-A-SUPERSEDED-VERDICT-1 -- CLOSED@rule. The Architect sealed the card on the scout's first GREEN (bytes) 25 s before the scout's superseding RED (answering the review order) arrived. Rule adopted: seal ONLY on the verdict whose reply_to is the ORDER-REVIEW row. Applied on CARD-LAND-573 and the label card.

A-REC-S140-ARCHITECT-WATERMARK-ON-OWN-WRITE-1 -- CLOSED@rule. Bus reads started from the Architect's last own write, missing a scout verdict posted 300 ms earlier -> an unnecessary REPOST. Rule: read from the last READ instant.

A-REC-S140-ARCHITECT-READ-ONE-PIN-AND-ASSUMED-THE-OTHER-1 -- CLOSED@rule (scout RED on label card v1, row 70e244b8...). The Architect read stageClarify.test.ts:290 and asserted :373 had the same shape without reading it; :373 is a distinct-name fixture. Mechanical rule applies to PINS too: every pin a card says "stays green" is read, not inferred from its neighbour.

A-REC-S140-TASK-PANEL-WENT-STALE-1 -- CLOSED@rule (owner, 17:40Z: the right-hand panel is his audit surface). The task list was not updated for a day of landings. Rule: every tick updates the NOW line and any task whose state moved, before the report is sent.

OBSERVATION consumed_at is completion, not pickup -- for AG lanes consumed_at is written when the lane finishes the row (measured on CARD-LAND-573: consumed 17:33:34Z read, slip 17:53Z); the scout writes none at all. A null consumed_at is not "not picked up".

## OWNER CONTRIBUTIONS TODAY (S112-YASA-1)
- "K1 icin EVET" -> OWNER-RULING-S140-K1-ORDER-CELL-HINT-1 (PR 571).
- "Release it" -> lease-pinned lock delete.
- Opened CWF in the Architect's browser -> the Architect runs its own witnesses.
- "github harcama limiti artirildi" -> OWNER-ACTION-S140-GITHUB-SPEND-LIMIT-RAISED-1.
- "sag panel sus degil" -> A-REC-S140-TASK-PANEL-WENT-STALE-1.
- OWNER-ORDER-S140-END-TO-END-TURN-DOCUMENT-1 -> CWF-END-TO-END-TURN-v1.html (project + artifact).

## SCOUT CONTRIBUTIONS TODAY (recorded by name)
- Superseding RED on the wiring card (COMPARE carrier) -> AMENDMENT-1 to AG-4.
- Direct CI reads that falsified nothing and confirmed the billing stop twice, then its lift.
- The rung order parent -> self -> layer -> entity-id (label card v2) and test (e) floor path (AMENDMENT-1).
