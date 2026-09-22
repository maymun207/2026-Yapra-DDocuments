CWF-S140-FINDINGS-v2

Session S140 · 2026-09-16 · Architect. Each finding names its instrument and its evidence row/turn. Findings live here AND in the register by name until the owner rules on bucket merging (§11). v2 SUPERSEDES v1 (18:08Z) and is written WHOLE (A-REC-S101-7): every v1 entry is carried verbatim below with its state at 20:45Z; new entries are marked NEW@v2. Nothing is dropped; state changes carry their evidence.

MEASURED CONTEXT AT CUT (20:45Z): master 47402e33faec80c45254668d917cb6f58625a916 (merge of PR 575 by AG-5, 20:20:34Z; slip row 8d0f69e9... 20:30:58Z: master CI build success 9m05s, rule26 success, eval-canary SKIPPED named); Vercel production dpl_CArauFvnMebebfkogvnDZmvb42L7 READY 20:25:34Z at that sha. Landed today: PR 555, 568, 569, 570 (registry reads paginated), 571 (K1 ORDER cell hint), 572 (resolve every layer, ask at parent), 573 (rooms 5/6 wired onto the live clarify path + AMENDMENT-1 carrier rule), 574 (ask-option label rung parent -> self -> layer -> entity-id), 575 (cross-turn carrier: carried peers + carried option + decision.ask at distill + lens causes).

## PRODUCT FINDINGS

**F-S140-FACTORY-LAYER-ASK-LABELS-ARE-THE-LAYER-KEY-1** -- CLOSED@evidence (v1: OPEN). PR 574 on master 4bec094ea1d14289eaf4783677d304385e4e4bc5, Vercel READY 18:47:17Z; witness turn c7fd2bd9... stage 03 options labelled Kalebodur 2/3/7 Fabrikasi, labelSource self x3; screen matched. v1 text: witness turn 8f82597952bbe316cf143e242d920960 (production 2f404888, 17:45Z): a near-miss factory name -> 5 AMBIGUOUS with three candidates, 6 OFFER_CHOICE -- correct -- but the ask rendered "1. factory 2. factory 3. factory". `buildDisambiguators` (stageClarify.ts:244-263) labelled an option by its PARENT's name and fell to the LAYER KEY when no parent is in hand; the factory layer has no parent. Fix (the scout's rung order): parent -> self -> layer -> entity-id. Instrument: turn_trace_digest stage 03; built-in browser page text; git show at master.

**F-S140-ROUTER-FRAME-ABSENT-ON-ENTITY-BEARING-SENTENCE-1** -- OPEN (unchanged). Morning witness: the FIRINUST camera sentence went through stage 03 with `earlyReturn` frame-absent and was answered only by the model's own tool loop; the same sentence shape framed HIGH on other turns. Router instability on an entity-bearing sentence; not yet reproduced deterministically. Instrument: turn_trace_digest. See also F-S140-REPLY-TURN-FRAME-SHAPE-DIVERGES-ACROSS-RUNS-1 (NEW@v2) -- the same instability at the ref-shape level.

**F-S140-TOOL-OFFERED-BUT-NOT-CHOSEN-1** -- OPEN (observation, unchanged). Turn 7a198156dfa2743c92be866e7d66a460: stage 07 offered `getOrderScrapWithReasons` (quality via the K1 ORDER hint, stickyAdded []), the model called `search_tools` twice (both `content []`) and then `getOrderDetails`. The offer seam is right; the selection seam is not measured by any gate today. Instrument: turn_trace_digest stages 07/10/11.

**F-S140-VECTOR-ENGINE-UNREACHABLE-1** -- OPEN (unchanged). `cwf.vector.query` -> `VectorEngineUnreachableError` (qdrant) on every witnessed turn today (5/5 in the morning; again on 7a198156 at 08:31Z). Turns still answer; the vector lane contributes nothing. Owner-side infra item (engine host), not a code seam. Instrument: turn_trace_digest stage 03 span. NOT re-measured on the evening turns.

**F-S140-CROSS-TURN-CARRIER-ABSENT-1** -- CLOSED@evidence, with a CORRECTION to its own wording (v1: OPEN, "design: last-resolution slice; migration via Operator"). Measured 18:56Z: the slice already existed as the episodes row (entities.canonical + scope) and `EpisodesRepository.listRecentByConversation` ("the A23 CARRIER read"); only the CONSUMER on the clarify path was absent -- CALLER-ABSENT (12.6), not MECHANISM-ABSENT. No migration was needed; the plan was reordered with this reason. Wired by PR 575 (CARD-CARRY-LAST-RESOLUTION-INTO-CLARIFY-S140-1-v1 + AMENDMENT-1; scout GREEN rows 23ad53db... and bd0c4c7d...). Witnessed twice on production (ARCHITECT-WITNESS-S140-CARRIER-LIVE-1, claude/OWNER-WITNESS-S140-CARRIER-LIVE-1): the reply turn no longer asks again; stage 03 carried = { read 'ok', from <asking turn>, peers ['KB7'], askOption <FIRINUST id> }; the asking turn's episode carries decision.ask. The two residual findings below are what the witness found NEXT to the closed one.

**F-S140-CARRIED-OPTION-MATCHED-BUT-NO-REF-TO-RESOLVE-1** -- NEW@v2, OPEN. Turns 5390a905... and 9446b1c2... (production 47402e33): askOption matched the typed message to the shown option, but `optionRefs []` and `scoped []` -- the reply frame carried ONE ref, "KB7 fabrikasi firin" (the router folded the history phrase into the entity ref; prefix -> KB7), so there was no ref equal to the ask's surface for 'carried-option' to resolve and no ambiguous line ref for the carried peer to narrow. The zone id in the tool call came from the LLM's getFactoryLines chain, not from the carrier. Fix direction: when askOption matches and the ask's surface is absent from the frame, INJECT a resolved ref for that surface (method 'carried-option') so the tool argument comes from the carrier. Instrument: turn_trace_digest stage 03 carried block; page text (i "KB7 fabrikasi firin was interpreted as Kalebodur 7 Fabrikasi (prefix match)").

**F-S140-REPLY-TURN-FRAME-SHAPE-DIVERGES-ACROSS-RUNS-1** -- NEW@v2, OPEN. Same two sentences, three runs: 09:07Z reply frame refs ["FIRINUST", ambiguous x3]; 20:31Z and 20:34Z reply frame refs ["KB7 fabrikasi firin", resolved prefix]. Stochastic frame extraction; the witness cannot be made deterministic by the sentence alone, so the narrowing rung (scoped by a carried peer) is proven only by the failing-first pins (carryLastResolution.test.ts a-f, CI green at 0992c64e...), not by production. Two clean samples are not proof (stochastic-verification rule). Instrument: turn_trace_digest stage 03 refs across turns 5b3f26de..., 5390a905..., 9446b1c2....

**F-S140-SEED-STATE-CLAIM-CONTENTION-EVERY-TURN-1** -- OPEN (efficiency, unchanged). Stage 09 dbReads: `seed_state` "claim this seed domain atomically" insert ok:false x13 followed by 13 staleness selects, on a turn with nothing to seed. 26 reads per turn spent on a lock nobody needed. Instrument: turn_trace_digest stage 09 dbReads (turn 7a198156).

**F-S140-DOMAIN-RULES-REREAD-PER-STAGE-1** -- OPEN (efficiency, unchanged). `domain_rules` "published governed knowledge for this turn" read 81/205/259 rows repeatedly across stages 03, 07, 09, 12, 14 within one turn. Instrument: same ledger.

**F-S140-ADMISSION-WALLCLOCK-FLAKE-1** -- NEW@v2 (AG-4's finding, PR 574 slip row 1e6478ae...), OPEN. vectorLane admission.test.ts: a Date.now() wall-clock bound; one local red with no import edge to the changed files, green alone and green in CI. Instrument: the author's local suite.

**F-S140-FLOOR-CALLER-COMMENT-STALE-1** -- NEW@v2 (AG-4's finding, same slip), OPEN. A caller comment in stageClarify.ts still says 'layer' for a floor that is now 'self'; outside the card's fence, not touched.

**F-S140-CARRY-CTX-NO-CONVERSATION-THROW-1** -- NEW@v2 (AG-4's finding, PR 575 slip 3eb36ef0...), CLOSED@evidence in the same PR: `readCarriedResolution` returns 'unreadable' with no query when `resolvedConversationId` is absent; pinned at carryLastResolution.test.ts:268 (c-prime); scout verified in verdict bd0c4c7d... (5).

**F-S140-CARRY-TYPES-SCOPE-EXCURSION-1** -- NEW@v2 (AG-4's finding, same slip), CLOSED@rule. types.ts was not in the work card's scope fence; the two additive optional stamps (`askShown?`, `carried?`) were the clarifyRead posture and the scout confirmed additive-only. Same class as F-S140-LENS-NOTIFY-SCOPE-1: the fence was too narrow, not the lane.

## FACTORY / PROCESS FINDINGS

**F-S140-CI-BILLING-STOP-1** -- CLOSED@evidence (scout rows 7fa9c2b4... 16:45:59Z and 628d9331... 17:15:19Z; OWNER-ACTION-S140-GITHUB-SPEND-LIMIT-RAISED-1). From 10:23Z no Actions job in the repository executed a step: every run four seconds, zero steps, annotation "The job was not started because recent account payments have failed or your spending limit needs to be increased" -- including master's scheduled Nightly Compatibility and budget-fence. The one measured reason PR 573 sat six hours (12.8). The owner raised the limit ~16:47Z; attempt-2 reruns on the same head went green within 18 minutes. Rule kept: a run that never executed a step is not "red" and rerunning it is not S55-1's chase -- it is the first run.

**F-S140-SLIP-REPLY-TO-NO-CHANNEL-1** -- OPEN (AG-4's finding, slip 57127e1e... 17:16:33Z). `relay_post_from_lane(text,text,text,text)` writes no `reply_to`; the lane role has the column refused (migration 20260814130000). Lanes carry reply_to as a body line. Read side must tolerate both. Measured again at v2: the scout's verdicts DO carry `reply_to` (rows 23ad53db..., bd0c4c7d...) -- the scout writes through a different path than the AG lanes' slips; the asymmetry is itself unmeasured.

**F-S140-LENS-NOTIFY-SCOPE-1** -- CLOSED@evidence (PR 573 report finding 1; scout confirmed additive). `clarificationLens.ts` was edited outside the work card's scope list to add NOTIFY outcome/cause; additive only. The card's scope fence was too narrow, not the lane.

**F-S140-CONCURRENT-RESEALS-CONFLICT-ON-MANIFEST-1** -- OPEN. Two branches resealing `public/architecture/manifest.json` make the second PR DIRTY (571 vs 572 this morning); no pull_request run fires on a dirty PR. Cure: reseal over the merged tree in the same commit; or a manifest whose digests are per-tab files. Not triggered on 573/574/575 because each forked from current master and landed alone.

**F-S140-LAND-LOCK-DELETE-EXIT-128-LEAVES-OWN-NONCE-1** -- OPEN. `land.ts release()` swallows stderr; a push --delete that fails with exit 128 leaves refs/landing/lock holding the lane's own nonce. Owner-ruled "Release it" -> lease-pinned delete. Cure: print stderr, retry with --force-with-lease, and self-release on exit. 573/574/575: lock ABSENT before and released clean after each (AG-5 slips).

**F-S140-SCOUT-WINDOW-HOLDS-NO-LANE-ADDRESS-1** -- OPEN (observation). `mail-wait scout --once` prints HEARTBEAT FAILED: no ref refs/heads/lane/scout; the scout reads and answers regardless. Heartbeat is not liveness (12.11) -- the scout's output is.

**F-S140-SCOUT-PREFLIGHT-UNMEASURED-TSX-IPC-EPERM-1** -- NEW@v2, OPEN (observation). The scout's verdicts print "Preflight PREFLIGHT-UNMEASURED (tsx IPC EPERM)" -- the scout cannot run cardPreflight in its sandbox and says so by name rather than folding it. The Architect's own preflight on the bridge VM is the only preflight that ran on the S140 cards; 12.13 (two gates) is therefore unexercised today, not passed.

**F-S140-ARCHITECT-SEALED-ON-A-SUPERSEDED-VERDICT-1** -- CLOSED@rule. The Architect sealed the 5/6 card on the scout's first GREEN (bytes) 25 s before the scout's superseding RED (answering the review order) arrived. Rule adopted: seal ONLY on the verdict whose `reply_to` is the ORDER-REVIEW row. Applied on CARD-LAND-573, the label card, CARD-LAND-574, the carrier card, CARD-LAND-575 -- five for five, the seal SQL carries an EXISTS on the answering row.

**A-REC-S140-ARCHITECT-WATERMARK-ON-OWN-WRITE-1** -- CLOSED@rule. Bus reads started from the Architect's last own write, missing a scout verdict posted 300 ms earlier -> an unnecessary REPOST. Rule: read from the last READ instant.

**A-REC-S140-ARCHITECT-READ-ONE-PIN-AND-ASSUMED-THE-OTHER-1** -- CLOSED@rule (scout RED on label card v1, row 70e244b8...). The Architect read stageClarify.test.ts:290 and asserted :373 had the same shape without reading it; :373 is a distinct-name fixture. Mechanical rule 1 applies to PINS too: every pin a card says "stays green" is read, not inferred from its neighbour.

**A-REC-S140-TASK-PANEL-WENT-STALE-1** -- CLOSED@rule (owner, 17:40Z: the right-hand panel is his audit surface). The task list was not updated for a day of landings. Rule: every tick updates the NOW line and any task whose state moved, before the report is sent. Held on every tick from 110 onward.

**A-REC-S140-PLAN-SAID-MIGRATION-WHERE-A-CALLER-WAS-MISSING-1** -- NEW@v2, CLOSED@rule. Plan v1 wrote "cross-turn carrier: ABSENT -- no module, no table; migration via Operator" from the architecture-vs-code table without grepping for the consumer; the slice existed. 12.6 applied at card-cut time caught it (18:54Z-18:58Z), before any Operator card was cut. The rule already exists; this is its positive instance.

**OBSERVATION: consumed_at is completion, not pickup** -- for AG lanes `consumed_at` is written when the lane finishes the row (measured on CARD-LAND-573: consumed 17:33:34Z read, slip 17:53Z; on CARD-LAND-575: consumed 20:31:11Z, slip 20:30:58Z, merge 20:20:34Z); the scout writes none at all. A null consumed_at is not "not picked up".

**OBSERVATION: 12.8 clock on 575** -- report push 19:43:35Z -> master 20:20:34Z = 37 min; of which the scout's review of the landing card took 20:10Z-20:17Z and the Architect's authoring of that card ~20:04Z-20:10Z. The one named reason: the landing card is cut only after the author's slip (20:04:43Z). Not a breach by the letter (the slip is the "ready" signal); recorded so the next session can decide whether the landing card should be cut on the CI-green read instead of on the slip.

## OWNER CONTRIBUTIONS TODAY (S112-YASA-1)
- "K1 icin EVET" -> OWNER-RULING-S140-K1-ORDER-CELL-HINT-1 (PR 571).
- "Release it" -> lease-pinned lock delete.
- Opened CWF in the Architect's browser -> the Architect runs its own witnesses (all of 573/574/575 witnessed this way).
- "github harcama limiti artirildi" -> OWNER-ACTION-S140-GITHUB-SPEND-LIMIT-RAISED-1.
- "sag panel sus degil" -> A-REC-S140-TASK-PANEL-WENT-STALE-1.
- OWNER-ORDER-S140-END-TO-END-TURN-DOCUMENT-1 -> CWF-END-TO-END-TURN-v1.html (project + artifact).
- The morning "firin" scorecard (ask twice) -> the P1-4 carrier's acceptance witness.

## SCOUT CONTRIBUTIONS TODAY (recorded by name)
- Superseding RED on the 5/6 card (COMPARE carrier) -> AMENDMENT-1 to AG-4.
- Direct CI reads that falsified nothing and confirmed the billing stop twice, then its lift.
- The rung order parent -> self -> layer -> entity-id (label card v2) and test (e) floor path (AMENDMENT-1).
- On the carrier card: F1/F2 (caller-side read; 6 in-scope set carried) -> AMENDMENT-1 A1/A2; verified the no-conversation fix by pin line.
- Independent CI reads on 574 and 575 heads, twice each, matching the author's -- the first independent green on each landing.

## LANE CONTRIBUTIONS TODAY (recorded by name)
- AG-4: four author findings on 574/575 (wall-clock flake, stale floor comment, no-conversation throw fixed in-PR, types scope excursion named).
- AG-5: three one-run landings (573, 574, 575), lock ABSENT/released clean each time, edited nothing of the author's, slip after each.
