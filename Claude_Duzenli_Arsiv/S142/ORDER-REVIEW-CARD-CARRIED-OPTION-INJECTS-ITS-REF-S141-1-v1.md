<!-- relay-audit: v1 kind=notice -->
ORDER-REVIEW-CARD-CARRIED-OPTION-INJECTS-ITS-REF-S141-1-v1

LANE: scout

Adversary review of CARD-CARRIED-OPTION-INJECTS-ITS-REF-S141-1-v1 (bytes in the row named BYTES-FOR-REVIEW-CARD-CARRIED-OPTION-INJECTS-ITS-REF-S141-1-v1; digests in `raw-tokens`). NEW subject (§12.1: a new subject goes to the scout, no gate lift): the carried-option rung of PR 575 keys on the FRAME'S refs, and on both production witness runs the frame carried no ref equal to the matched option, so a matched answer resolved nothing (`optionRefs []`). The card's claim under test: ONE feeder — inject the matched option's LABEL as a ref into a LOCAL clarify frame when no frame ref folds to it — makes the existing rung fire, and nothing downstream drops a resolved id that is absent from `ctx.irFrame.entity_ref`.

DISCRIMINATORS, measure each and print what you measured:
(1) THE ANCHOR. `git ls-remote origin refs/heads/master` NOW versus the card's `the-head` (the Architect's read is the owner's clone plus the Vercel record, NOT the wire — this is S141's first wire read). Print the sha. A difference is a finding before any verdict.
(2) THE SEAM AS FENCED. At master: stageClarify.ts — `const frame = ctx.irFrame` at the top of computeTurnClarificationRecorded; the ORDER 2 rung iterating `frame.entity_ref` only; `CarriedResolution` carrying `askOption { entityId, label }` and no surface; `ctx.entityResolutions.canonicalIds` built from the MERGED map, not from the frame. Print the lines. If any line the card cites is off by more than a few lines, say so (the card was measured 2026-09-17T03:10Z-03:12Z).
(3) THE TRAP THE CARD NAMES AS UNMEASURED. Grep every consumer of `irFrame.entity_ref` / `frame.entity_ref` AFTER clarify on the turn path (stages 05, 07, 09, 10 and the tool-argument builder): does any of them DROP a resolved id whose ref is absent from `ctx.irFrame.entity_ref`, or rebuild the resolved set from the frame instead of from `ctx.entityResolutions`? If yes, the card's FALSIFIER fires on landing and the card is RED here — say which consumer and its line. If no such consumer exists, say you looked and where.
(4) THE PINS. carryLastResolution.test.ts (d) at :308 and (d′) at :330: confirm that injecting a label the frame already carries would NOT double-count (the card's ORDER 1(b)), and that a fixture for (g) — frame ref = a factory phrase, message = an option label — can be built from the existing harness without a live name (TENANT-ZERO).
(5) THE CALLER-ABSENT CHECK (§12.6). Search the tree for ANY existing path that widens `entity_ref` on the clarify path or resolves a matched option without a frame ref — if one exists, this is not a wiring card and the verdict is RED with the path named.

VERDICT on ONE line first: `ADVERSARY-VERDICT: GREEN card=CARD-CARRIED-OPTION-INJECTS-ITS-REF-S141-1-v1 sha256=<hex>` or RED with the discriminator number, with `reply_to` = THIS row's id. The Architect seals ONLY on the verdict that answers THIS row, with an EXISTS on it in the seal SQL. Preflight on the card body from your window is expected UNMEASURED (tsx IPC EPERM, F-S140-SCOUT-PREFLIGHT-UNMEASURED-TSX-IPC-EPERM-1); the Architect's bridge preflight read GREEN on all eleven checks at 2026-09-17T03:14:21Z and that is a GRAMMAR reading, not this review.

```evidence:raw-tokens
card md5        0985aebcb7834047e8e36faf382da5f5
card sha256     2cd823d864c8fc8a2e48ccc291aa29f2380afa998a5bd2f209dcadb25cba5e82
card bytes      14013
master (card)   47402e33faec80c45254668d917cb6f58625a916
prior GREEN     23ad53db-e206-406f-ad85-e71c43145f8a   (CARD-CARRY-LAST-RESOLUTION-INTO-CLARIFY-S140-1-v1, the design this card feeds)
```
