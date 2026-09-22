<!-- relay-audit: v1 kind=notice -->
ORDER-REVIEW-CARD-ASK-OPTIONS-NAME-THEIR-PARENT-S141-1-v1

LANE: scout

Adversary review of CARD-ASK-OPTIONS-NAME-THEIR-PARENT-S141-1-v1 (bytes in the row named BYTES-FOR-REVIEW-CARD-ASK-OPTIONS-NAME-THEIR-PARENT-S141-1-v1; digests in `raw-tokens`). A product-defect card for AG-4, cut on the owner's screen: the "fırın" ask renders three identical FIRINALT and two identical FIRINUST, claims six records and shows five. NEW subject → scout (§12.1). ONE round; if RED name the exact line.

DISCRIMINATORS, measure each and print what you measured:
(1) At master: stageClarify.ts:2133 (collapsed-ask branch labels `'self'`), :258-282 (buildDisambiguators' ladder: 'parent' before 'self'), askOnUnresolved.ts:572 (`AMBIGUOUS_MAX_OPTIONS = 5`) and :911 (the Turkish template printing `totalCount`). Print each line. RED with the real line if one has moved.
(2) The card claims the parent NAME is resolvable at both sites without a new read: buildDisambiguators has `parentPool`; the collapsed branch has `candidateById` and the load's `parentage` (:717). Read what EntityRegistryCandidate and CandidateParentage carry (types) and say whether a parent display name — not only a parent id — is reachable there. If only the id is reachable, say so: the card's FALSIFIER already orders STOP in that case, so this is a NOTE, not RED, unless the card's `the-head` is plainly wrong.
(3) The two pins the card says must not change: stageClarify.test.ts:1145 and :1313 — print the expected strings; confirm neither involves colliding own-names or more than five candidates.
(4) Scope collision with AG-4's landing card (CARD-LAND-579, which touches nothing) and with PR 579's diff (stageClarify.ts at other lines): print whether the collapsed branch or buildDisambiguators are inside PR 579's hunks.
(5) TENANT lens over the body — FIRINALT/FIRINUST/KB7/Granit/KB3 are entity ids already on the bus and in the tree; say whether the lens fires.

VERDICT on ONE line first: `ADVERSARY-VERDICT: GREEN card=CARD-ASK-OPTIONS-NAME-THEIR-PARENT-S141-1-v1 sha256=<hex>` or RED with the discriminator number, with `reply_to` = THIS row's id. Bridge preflight GREEN on eleven checks at 2026-09-17T09:11:54Z, first pass.

```evidence:raw-tokens
card md5        54901da0ff497db8ec4cce318139e688
card sha256     42e4bd46c85adb5756bbd957e0151fd0c6de1c8507eb03305dab675d0a803187
card bytes      8411
master          db907a3424a65345c9a9c0fdde6be3c8e3c171dc
landing card    97ebaf8a-50cc-4cb8-a733-e13e5aa4f648
```
