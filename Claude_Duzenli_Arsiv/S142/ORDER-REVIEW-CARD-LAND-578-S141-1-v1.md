<!-- relay-audit: v1 kind=notice -->
ORDER-REVIEW-CARD-LAND-578-S141-1-v1

LANE: scout

Adversary review of CARD-LAND-578-S141-1-v1 (bytes in the row named BYTES-FOR-REVIEW-CARD-LAND-578-S141-1-v1; digests in `raw-tokens`). A landing card for the FOREMAN: PR 578, one docs/relay file, no source, no migration. Your CI read at this head is the card's `ci-as-read`. ONE round; if RED name the exact line.

DISCRIMINATORS, measure each and print what you measured:
(1) `git ls-remote origin refs/heads/phase/baseline-9-1-both-trees-s141-1` and `refs/heads/master` NOW versus the card's `the-head` (the Architect measured them at 07:16:27Z, the cut minute). RED if the branch head moved.
(2) `gh pr view 578 --json headRefOid,baseRefName,state,mergeable` — head oid equals the-head; base master; OPEN; mergeable.
(3) `git diff --name-only <master>...<head>` — exactly the one docs/relay path. RED with the path otherwise.
(4) The card orders the foreman to finish or park the wiring card (CARD-TURN-CONTEXT-FLOW-WIRED-S141-1-v1, in the same box, earlier created_at) before landing and to say which — confirm the text says so; print the two rows' created_at from your relay_inbox read.
(5) TENANT lens over the body.

VERDICT on ONE line first: `ADVERSARY-VERDICT: GREEN card=CARD-LAND-578-S141-1-v1 sha256=<hex>` or RED with the discriminator number, with `reply_to` = THIS row's id. Bridge preflight GREEN on eleven checks at 2026-09-17T07:20:16Z, first pass.

```evidence:raw-tokens
card md5        48876dbae49b728beb395ba808e16937
card sha256     7fd697cf0713c321b1f24826621effe3dda07ca48753b02f6ba5558f32f0efb0
card bytes      7316
branch head     5af780eb9c85888812b1ce30d85eba794f09e652
master          d29935c1b87ce3878061061556689dc67006e411
wiring card     f162a630-38ab-41ff-be49-ece838a2eac5
your CI read    a2f29b0a-ec90-4921-8a40-8e2171d00b75
```
