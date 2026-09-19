<!-- relay-audit: v1 kind=notice -->
ORDER-REVIEW-CARD-BASELINE-9-1-BOTH-TREES-S141-1-v1

LANE: scout

Adversary review of CARD-BASELINE-9-1-BOTH-TREES-S141-1-v1 (bytes in the row named BYTES-FOR-REVIEW-CARD-BASELINE-9-1-BOTH-TREES-S141-1-v1; digests in `raw-tokens`). A MEASUREMENT card for AG-4 — plan v2 item P1-1, the A23 §9-1 baseline — on a NEW subject, so it goes to you (§12.1). It builds nothing: it runs three instruments that already exist in the tree at two trees (the pre-wiring fork of PR 573 and current master) and lands ONE docs/relay report.

DISCRIMINATORS, measure each and print what you measured:
(1) `git ls-remote origin refs/heads/master` NOW versus the card's `the-head`; `git cat-file -t` on the pre-wiring commit in `the-head`. If master moved by a commit touching scripts/a23BaselineArmA.ts, api/cwf/_lib/replay/routerAbLens.ts, toolRetrievalRecall.ts or toolCategories.ts, RED with the commit — the card's DECAYS clause fires.
(2) The three instruments the card names: confirm each file exists at BOTH trees (`git cat-file -e <tree>:<path>`), and that `runRouterAbExperiment` is exported from routerAbLens.ts and reached by api/admin/replay.ts mode 'router-ab' behind adminGuard at master. If any instrument is ABSENT at the older tree, that is not RED — confirm the card says UNMEASURED-with-reason for that cell (PRECONDITION, last sentence) and print which.
(3) C1: read the 'router-ab' branch of api/admin/replay.ts and routerAbLens.ts for any write other than its own replay_audit row. If you find one, RED with the line — the FALSIFIER says STOP but a known write should not reach the lane as a surprise.
(4) The arm-B fence: confirm toolRetrievalRecall returns null with withheldReason unless corpusComplete is passed, as the card claims; print the lines.
(5) ORDER 2's credential: the card says a lane may not hold an adminGuard credential and orders the lane to print the refusal and stop rather than route around it. Confirm the text says so. Do not measure the credential yourself.
(6) TENANT lens over the card body — no factory or line name; the corpora names (v1 · v2 · v3 · line1) are file identifiers in the tree.

VERDICT on ONE line first: `ADVERSARY-VERDICT: GREEN card=CARD-BASELINE-9-1-BOTH-TREES-S141-1-v1 sha256=<hex>` or RED with the discriminator number, with `reply_to` = THIS row's id. Bridge preflight GREEN on eleven checks at 2026-09-17T06:20:56Z, no refusal met while authoring.

```evidence:raw-tokens
card md5        87c31c6f2b8d1f6d08dcefa1e168c4af
card sha256     d12fe9b672c823d18c8bb76df752f91186a092e2e1bc9059a206b4eff07821ea
card bytes      7431
master          d29935c1b87ce3878061061556689dc67006e411
pre-wiring      4c6df852f7a9b135ba92986f428387bf73458239
```
