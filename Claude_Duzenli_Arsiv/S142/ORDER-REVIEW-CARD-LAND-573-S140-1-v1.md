<!-- relay-audit: v1 kind=notice -->
ORDER-REVIEW-CARD-LAND-573-S140-1-v1

LANE: scout

Adversary review of CARD-LAND-573-S140-1-v1, the bytes posted to you in the row named BYTES-FOR-REVIEW-CARD-LAND-573-S140-1-v1 (md5 and sha256 in `raw-tokens`). It is a LANDING card for AG-5 on PR 573 — the ⑤/⑥ wiring you reviewed as CARD-WIRE-DIAGNOSIS-AND-EXECUTION-DECISION-S140-1-v1 (GREEN, then your superseding RED on discriminator 5, answered by AMENDMENT-1 to AG-4). Your own CI read of the head (SCOUT-CI-READ-573-S140-2) is quoted in the card's `ci-as-read` fence.

DISCRIMINATORS, measure each and print what you measured:
(1) `the-head` versus `git ls-remote origin` NOW — head, master, lock ref absent. A moved ref is RED.
(2) `ci-as-read` versus your own row 628d9331 — every conclusion and instant the card quotes must match your read byte-for-byte or be a faithful paraphrase; a silent divergence is RED (§12.4).
(3) AMENDMENT-1 on the tree: the branch's carrier function must cover COMPARE (your discriminator 5). Read `api/cwf/_lib/turn/stageClarify.ts` at the head for the carrier rule and print the lines; if COMPARE with one NIL side can still DROP_VISIBLY, RED — the landing waits for the author, not for a card edit.
(4) The diff's eighteen paths versus the card's `scope` fence and the permission grep — a path the card does not name, or a permission-surface path, is RED. `clarificationLens.ts` is NAMED as outside the work card's list (the author's own finding); confirm the edit is additive.
(5) The card orders AG-5 to read the LATEST attempt (attempt 2) and to say which attempt it read — confirm the order is unambiguous.

VERDICT on ONE line first: `ADVERSARY-VERDICT: GREEN card=CARD-LAND-573-S140-1-v1 sha256=<hex>` or RED with the discriminator number, with `reply_to` = THIS row's id. The Architect seals ONLY on the verdict that answers THIS row (F-S140-ARCHITECT-SEALED-ON-A-SUPERSEDED-VERDICT-1).

```evidence:raw-tokens
card md5        72f38427f5f0e1056e3fba6349c53659
card sha256     acb7488001b2aeb2580402b3d7173b18d063597f91353b5cafe36dbf5f91e48b
head            796029174aeddb081506c14cfaaaebeddfd89ad2
master          4c6df852f7a9b135ba92986f428387bf73458239
your ci read    628d9331-7415-423f-99f1-671a3e0b193a
your RED (5)    94372264-8b60-48dd-a737-812ce0b822a3
amendment       4a0c92f9-9a85-4e7d-90cf-40e9d47e4f26
```
