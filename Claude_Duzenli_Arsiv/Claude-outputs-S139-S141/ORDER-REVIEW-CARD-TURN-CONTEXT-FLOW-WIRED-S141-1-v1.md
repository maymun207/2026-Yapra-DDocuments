<!-- relay-audit: v1 kind=notice -->
ORDER-REVIEW-CARD-TURN-CONTEXT-FLOW-WIRED-S141-1-v1

LANE: scout

Adversary review of CARD-TURN-CONTEXT-FLOW-WIRED-S141-1-v1 (bytes in the row named BYTES-FOR-REVIEW-CARD-TURN-CONTEXT-FLOW-WIRED-S141-1-v1; digests in `raw-tokens`). A WIRING card for AG-5 (§12.6): `api/cwf/_lib/turn/turnContextLog.ts` exists at master with zero importers but its own test; the card makes three existing stamp sites also contribute to it, adds ONE pinned read declaration at the tool-argument binder, and projects counts-and-names onto the `turn_done` ledger row. It steers nothing. NEW subject → scout (§12.1). The owner has asked for ONE review round today: measure every discriminator, print each, and if one is RED name the exact line so v2 is a single edit.

DISCRIMINATORS, measure each and print what you measured:
(1) `git ls-remote origin refs/heads/master` NOW versus `the-head`. `git grep -l turnContextLog <master> -- api` — print the list; RED if anything but the module and its own test imports it (the card's PRECONDITION).
(2) The three producer sites and the exit, at master, by line: stageTools.ts:797 (`ctx.irFrame = turnFrame.frame;`), stageClarify.ts:2664 (`ctx.entityResolutions = {`), stageTools.ts:1384 (`bindResolvedEntities(`), stageStream.ts:868 (`argBindings: argBindingsWithoutValues(`). Print each line as `git show` prints it. RED with the real line if one has moved — a wrong line number sends a lane to the wrong seam.
(3) The container's contract the card relies on: `contribute()` returns the Contribution (with `seq`), `seal()` returns TurnContextRecord and a second contribute after seal refuses with reason 'sealed', an unknown read seq refuses with 'unknown-read-seq'. Confirm from turnContextLog.ts and its test; print the lines. RED if the card's ORDER 2(c) pin or ORDER 3 single-seal cannot be met by the container as it is.
(4) TENANT lens over the card body AND over ORDER 3's projection rule: the card forbids values on the ledger row and orders a test asserting no canonicalId appears in the payload. Confirm the text says so.
(5) SCOPE collision with AG-4's live card (CARD-BASELINE-9-1-BOTH-TREES-S141-1-v2, sealed row in raw-tokens): print both scope fences; RED if any path appears in both.

VERDICT on ONE line first: `ADVERSARY-VERDICT: GREEN card=CARD-TURN-CONTEXT-FLOW-WIRED-S141-1-v1 sha256=<hex>` or RED with the discriminator number, with `reply_to` = THIS row's id. Bridge preflight GREEN on eleven checks at 2026-09-17T06:51:45Z, first pass, no refusal met while authoring.

```evidence:raw-tokens
card md5        2fa3bb3648c4cc19d576dd5ff6b45086
card sha256     4fd42f8714c7b265f7a34f055d57f6fc58381ae9795b5a4b00fe3c1bd273ce65
card bytes      10162
master          d29935c1b87ce3878061061556689dc67006e411
AG-4 live card  ace305d1-595c-48a7-bdf1-c8560cc87415
```
