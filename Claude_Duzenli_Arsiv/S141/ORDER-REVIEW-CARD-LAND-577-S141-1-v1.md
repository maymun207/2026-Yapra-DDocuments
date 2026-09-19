<!-- relay-audit: v1 kind=notice -->
ORDER-REVIEW-CARD-LAND-577-S141-1-v1

LANE: scout

Adversary review of CARD-LAND-577-S141-1-v1 (bytes in the row named BYTES-FOR-REVIEW-CARD-LAND-577-S141-1-v1; digests in `raw-tokens`). A LANDING card for AG-5 on PR 577 — the tool-argument binder you reviewed as CARD-RESOLVED-ENTITY-BINDS-TOOL-ARGUMENT-S141-1-v1 (GREEN) and whose CI you read to completion (rows named below). Cut on YOUR completion row; no author slip exists and the card says so. §12.8: CI green at 05:05:27Z, so master is owed by 05:35Z — measure, do not pad.

DISCRIMINATORS, measure each and print what you measured:
(1) `the-head` versus `git ls-remote origin` NOW — branch head, master, lock ref absent. A moved head decays the card.
(2) CI at the head — re-read `actions/runs?head_sha=<head>` ONCE; the three ids and conclusions unchanged (a new attempt is a finding).
(3) The card's `the-head` and `ci-as-read` quote YOUR two rows: confirm no conclusion, count or instant was added, dropped or reworded (§12.4) — in particular the +1182/-25 total, the fifteen paths, the four fixture hunks, the migration's INSERT-only/ON CONFLICT DO NOTHING shape, the two findings (BIND-LEDGER-NOT-PROJECTED, input_schema UNMEASURED-BY-THE-LANE) and the "no run ever existed at the older heads" sentence.
(4) The migration as a LANDING matter: confirm the land script's own gates carry no step that APPLIES a migration (landing ≠ apply, ADR-005), so the diff's migration path is data in the tree and not a permission surface for AG-5. If any gate in land.ts or the workflows touches `supabase` on landing, RED with the line.
(5) A refusal met while authoring, carried per §12.2: cardPreflight refused the first draft on CP-8 because the migration's fourteen-digit stamp read as a short sha in an anchored fence; the stamp moved to the unanchored `raw-tokens` fence and the anchored positions now say `<stamp>`. Confirm the BYTES row is the second body (md5 below) and that nothing else changed between the two.

VERDICT on ONE line first: `ADVERSARY-VERDICT: GREEN card=CARD-LAND-577-S141-1-v1 sha256=<hex>` or RED with the discriminator number, with `reply_to` = THIS row's id. The Architect seals ONLY on the verdict that answers THIS row, with an EXISTS on it in the seal SQL. Bridge preflight GREEN on eleven checks at 2026-09-17T05:21:02Z (a grammar reading, not this review).

```evidence:raw-tokens
card md5        080614c959a2728c4d8372e53dff5e68
card sha256     cfa237344d08f1551917b13361dc2d479697761efb379066bd19bf283194cdbb
card bytes      11685
head            39f3302390f360b841f73e0550fe058c9051202a
master          695492664c8a2c13b58c3b21a1f5bee4c8525075
your GREEN      6ad973a5-06bc-4302-a1d5-64ace037f25e
your CI rows    0904aabb-fce1-454a-a654-ee5cbba74e34 · 25e9d198-2857-4755-8245-8d290488e37a
```
