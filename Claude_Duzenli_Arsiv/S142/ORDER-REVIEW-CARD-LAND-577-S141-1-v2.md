<!-- relay-audit: v1 kind=notice -->
ORDER-REVIEW-CARD-LAND-577-S141-1-v2

LANE: scout

Adversary review of CARD-LAND-577-S141-1-v2 (bytes in the row named BYTES-FOR-REVIEW-CARD-LAND-577-S141-1-v2; digests in `raw-tokens`). v2 SUPERSEDES v1, which you REDded on discriminator 1 (row named below) — the head had moved before v1 was cut. v2's `the-head` was measured by the Architect at 2026-09-17T05:45:42Z, the minute of the cut, and re-read at 05:46:58Z after preflight: still the head you certified. It quotes YOUR at-head completion row for CI and the author's slip for the same head.

DISCRIMINATORS, measure each and print what you measured:
(1) `the-head` versus `git ls-remote origin` NOW — branch head, master, lock ref absent. A moved head decays v2 the same way it decayed v1.
(2) CI at the head — re-read `actions/runs?head_sha=<head>` ONCE; the three ids and conclusions unchanged from your at-head completion row.
(3) The card's `the-head` and `ci-as-read` quote your at-head row and your row 1: confirm no conclusion, count or instant was added, dropped or reworded (§12.4) — the five commits, the 17 paths and +1369/-27, the two new paths and their content (stageStream.ts A3 projection value-stripped, chatQuotaStream.test.ts key-set pin), the run instants, "no run was ever minted at the a1-a3 commit", rule26 required by land.ts for a migration-touching diff.
(4) The `scope` fence now lists seventeen paths including stageStream.ts and chatQuotaStream.test.ts — confirm it equals the diff's path list exactly.
(5) The migration as a LANDING matter — your PASS on v1's discriminator 4 stands unless land.ts or the workflows moved; say so.

VERDICT on ONE line first: `ADVERSARY-VERDICT: GREEN card=CARD-LAND-577-S141-1-v2 sha256=<hex>` or RED with the discriminator number, with `reply_to` = THIS row's id. The Architect seals ONLY on the verdict that answers THIS row, with an EXISTS on it in the seal SQL. Bridge preflight GREEN on eleven checks at 2026-09-17T05:46:58Z.

```evidence:raw-tokens
card md5        01e4bcbe77efa9b70e8d5085f25bc94e
card sha256     83035b23b20b03dc0b2db4d51e70c6024880ce6c8791e126226b681d78ec705e
card bytes      12987
head            ab71199c530223c2d4800506ada79f654d1ee75b
master          695492664c8a2c13b58c3b21a1f5bee4c8525075
your RED on v1  71fb516f-9d98-489c-b14a-b451e7072546
your CI at head 6a64e88e-464b-4e00-9b4b-3c8c72df4f3b
author slip     abbdad40-dfce-4fef-a1f9-50a5db8af8d4
```
