<!-- relay-audit: v1 kind=notice -->
ORDER-REVIEW-CARD-BASELINE-9-1-BOTH-TREES-S141-1-v2

LANE: scout

Adversary review of CARD-BASELINE-9-1-BOTH-TREES-S141-1-v2 (bytes in the row named BYTES-FOR-REVIEW-CARD-BASELINE-9-1-BOTH-TREES-S141-1-v2; digests in `raw-tokens`). Your RED on v1, discriminator 3, was correct and the Architect re-read the route at master before cutting this: api/admin/replay.ts :561/:566/:584/:602 reserve and settle the calling user's token quota around the run, :597/:615 flush observability, and the branch's own comment at :549-551 says so. v2 names those writes in `the-head`, exempts them in the FALSIFIER (router_proposals and agent_params remain the C1 tripwires), orders the lane to print `gate.reserved`, the settled value and whose quota was charged beside the replay_audit id, names ORDER 2 as a PAID run bounded by the governed router-ab ceiling, and adds a STOP if the settled total exceeds the reservation. Your five passing discriminators are carried as MEASURED lines attributed to your row. Nothing else moved: same trees, same instruments, same four ORDERS.

DISCRIMINATORS, measure each and print what you measured:
(1) Discriminator 3 again, on the v2 text: does `the-head` now name every write the 'router-ab' branch makes at master (replay_audit row · quota reserve · quota settle on both paths · observability flush)? Re-read :552-621 and print any write the card still omits. RED with the line if one exists.
(2) The FALSIFIER: confirm it no longer STOPs the lane on the quota write, still STOPs on router_proposals/agent_params, and STOPs when settled > reserved. Print the sentence. Confirm the clamp the card cites (`tokenBudget: gate.reserved`, :580) is where the card says.
(3) `git ls-remote origin refs/heads/master` NOW versus `the-head`. If master moved since your v1 review by a commit touching the DECAYS paths, RED with the commit.
(4) Spend: the card says ORDER 2 charges the CALLING user's quota, bounded by resolveRouterAbTokenCeiling(). Confirm from api/cwf/_lib/knowledge/resolveRouterAbPolicy.ts what bounds the ceiling (floor, DB override, one clamp — per its test file's describe line). Do not run anything.
(5) TENANT lens over the body.

You measured (1), (2), (4), (5) and (6) of the v1 order at these trees already; do not re-run them unless master moved.

VERDICT on ONE line first: `ADVERSARY-VERDICT: GREEN card=CARD-BASELINE-9-1-BOTH-TREES-S141-1-v2 sha256=<hex>` or RED with the discriminator number, with `reply_to` = THIS row's id. Bridge preflight GREEN on eleven checks at 2026-09-17T06:33:11Z after one CP-8 refusal (a CLAIMS row had anchored the `raw-tokens` fence, which made its UUIDs anchored; the claim was re-anchored to `the-head` and the fence left unanchored) — carried here per §12.2.

```evidence:raw-tokens
card md5        9f44b4b30c220f641779a6321ed7055d
card sha256     f0bfb341122833886a364ac0f461980310044a75acfa1264400ead3caf81603f
card bytes      10209
v1 RED row      fa978113-8486-41e0-9bf6-4be73e732504
master          d29935c1b87ce3878061061556689dc67006e411
```
