<!-- relay-audit: v1 kind=notice -->
ORDER-REVIEW-CARD-ASK-OPTION-LABEL-IS-OWN-NAME-S140-1-v1

LANE: scout

Adversary review of CARD-ASK-OPTION-LABEL-IS-OWN-NAME-S140-1-v1 (bytes in the row named BYTES-FOR-REVIEW-CARD-ASK-OPTION-LABEL-IS-OWN-NAME-S140-1-v1; digests in `raw-tokens`). NEW subject — the first defect the ⑤/⑥ witness found on production after PR 573: an ambiguity ask at the factory layer rendered every option as the layer key.

DISCRIMINATORS, measure each and print what you measured:
(1) `the-head` versus the source at master: `git show <master>:api/cwf/_lib/turn/stageClarify.ts` lines 244-263 — three rungs, no own-name rung, `display_name` in the rows signature and never read. A fourth rung already present is RED (§12.7).
(2) The pins: stageClarify.test.ts :290 and :373 are SAME-NAME fixtures (one display name, three parents) and :1209 is the collapsed path — confirm by reading them; if either :290/:373 fixture has DISTINCT names, the card's ORDER 2(b) would move a pin it says stays, RED.
(3) The rule's blast radius: every caller of `buildDisambiguators` (:644 · :724 · :784 · :1363) passes rows that carry `display_name` — print each call's row source; a caller whose rows lack the field is RED.
(4) The witness: turn_trace_digest for the turn in `raw-tokens` — stage 03 `ask.ambiguous[0].options` all labelSource 'layer', diagnosis AMBIGUOUS with three candidates. Confirm from the ledger, not from the card.
(5) Tenant-zero: the card orders synthetic fixtures; confirm no ORDER sends a live factory name into the tree.

VERDICT on ONE line first: `ADVERSARY-VERDICT: GREEN card=CARD-ASK-OPTION-LABEL-IS-OWN-NAME-S140-1-v1 sha256=<hex>` or RED with the discriminator number, with `reply_to` = THIS row's id. The Architect seals ONLY on the verdict that answers THIS row.

```evidence:raw-tokens
card md5        88af971d11e1b5d006661a523a7752ec
card sha256     3e80a45d0df8a533a0667406e91cb534677c4d0ce160b1bd2baecc24e2f40f52
master          2f404888c42c7394566ed9803148390d8e1bab73
witness turn    8f82597952bbe316cf143e242d920960
```
