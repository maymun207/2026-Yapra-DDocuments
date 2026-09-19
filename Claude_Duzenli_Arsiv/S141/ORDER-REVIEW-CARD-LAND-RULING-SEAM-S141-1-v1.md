<!-- relay-audit: v1 kind=notice -->
ORDER-REVIEW-CARD-LAND-RULING-SEAM-S141-1-v1

LANE: scout

Adversary review of CARD-LAND-RULING-SEAM-S141-1-v1 (bytes in the row named BYTES-FOR-REVIEW-CARD-LAND-RULING-SEAM-S141-1-v1; digests in `raw-tokens`). A GATE card for AG-4: a third pass in `scripts/land.ts` `judgeReportOnly`, class AUTHOR-SELF-RULED, that lets a lane land its OWN code only on an owner ruling the gate reads from the bus (env `ADF_LAND_RULING=<artifact_name>` → digest-checked row to the lander lane, artifact_name prefixed `OWNER-RULING-`, body naming the PR and the lander, created_at < 24h) and refuses RULING-UNPROVEN otherwise. scripts/ is a permission surface. NEW subject → scout (§12.1). ONE round; if RED name the exact line.

DISCRIMINATORS, measure each and print what you measured:
(1) At master: land.ts:896 signature, :947-953, :955, :956-961, :962-967, :969-982 and :1368-1370 — print them. RED with the real line if any has moved.
(2) The two readers the card names — scripts/mail-wait.mjs `--read` and scripts/busDelivery.ts: print what each imports (a Supabase client? env keys?) and say whether land.ts can import either WITHOUT pulling a database client into the landing path it does not have today. The card leaves this UNMEASURED and lets AG-4 shell out to mail-wait; say whether shelling out is the safer of the two and why.
(3) SELF-CERTIFICATION lens: can the seam as ordered PASS on anything the lander itself can write — a bus row the lander posts (`relay_post_from_lane` is granted to cwf_lane; who may insert a row with `to_lane` = its own address and artifact_name `OWNER-RULING-…`?). Print the bus INSERT policy / grants for the lanes' role. If a lane can forge a ruling row to itself, RED — and name the discriminator the card must add (e.g. `from_lane` must be the Architect's address, or the row's created_by role).
(4) guard-bash.py and `.claude/settings*.json` are ordered UNTOUCHED; print whether GB-2 or any settings allow-list would need to change for AG-5 to run `ADF_LAND_RULING=<name> ADF_LANE_ROLE=AG-5 npm run land -- 579` in the foreman window. If the foreman window's own harness would refuse that command the way the producer window refused ADF_LANE_ROLE, say so — that is RED, the seam would be unreachable.
(5) TENANT lens over the body; NUL lens (card bytes contain no 0x00).

VERDICT on ONE line first: `ADVERSARY-VERDICT: GREEN card=CARD-LAND-RULING-SEAM-S141-1-v1 sha256=<hex>` or RED with the discriminator number, with `reply_to` = THIS row's id. Bridge preflight GREEN on eleven checks at 2026-09-17T09:38Z, second pass (first pass RED on CP-6 and CP-8, both repaired in the bytes under review).

```evidence:raw-tokens
card md5        a370bd96db69efbd00044c672e1b5742
card sha256     1c4b4bf2070f60eaa21b0018e62198f4dbcd491722a0c288635cc0c959aa15c7
card bytes      9336
master          db907a3424a65345c9a9c0fdde6be3c8e3c171dc
PR 579 head     2adab2da890ac99ce9e36652b33a8914d04dbe9d
```
