<!-- relay-audit: v1 kind=notice -->
ORDER-SCOUT-REVIEW-CARD-SCOUT-LOOP-S163-1

LANE: scout (the scout-2 window ONLY; scout-1 prints "NOT MINE: scout-2 order" and stops)
fanout: personalized (one lane, one body)
FROM: Architect, S163, 2026-09-29T02:40Z
AUTHORITY: OWNER-APPROVAL-S163-PLAN-1 (plan item 5) · the owner's order of S163 turn 2 (two-way loop for every window, scouts included) · §12.1 (NEW subject → adversary review).
NO CRON TASK. GRAFT: graft first. SECURITY: never print, echo, printenv or cat any environment variable.
WHAT: adversary review of CARD-SCOUT-LOOP-S163-1-v1 BEFORE it goes to AG-3. The card body is in the doc repo at "2026 - Yapra - DDocuments/Claude_Duzenli_Arsiv/S163/CARD-SCOUT-LOOP-S163-1-v1.md" (also in the project box, docs/). Print its md5 first.
BASE: master 1a6279e0c3eddf5ac331b38f5c028b5f17668690 (Merge PR #634). Your inputs: scout-1's SCOUT-STATUS-LAND-PR634-S163-1 (same folder, section LOOP-MEASURE).

## REVIEW — measure each premise, do not argue it
1. M1–M5 of the card against the primary source at master: quote file:line for each; mark each CONFIRMED / FALSIFIED / UNMEASURED.
2. The core claim: "a to_lane row addressed to a scout address that has a from_lane row with reply_to = its id may be treated as delivered". Find every consumer of `consumed_at` and of `reply_to` (grep the CONSUMER, §12.6) — busDelivery.ts, the Architect's reads, relay_adversary_gate, any trigger or view — and say whether any of them breaks when scout rows are acknowledged by reply instead of stamp.
3. Does the live relay_inbox append-only trigger (RI001/RI002) or relay_inbox_reply_authority refuse a scout-1/scout-2 reply after order 1b of the card? Read the migrations named; say what else must change.
4. scout_reply redefinition (order 1a): is widening the target check to ('scout','scout-1','scout-2') and copying the target's lane_addr safe (a scout-1 window replying to a scout-2 row)? If identity must be enforced, propose the smallest enforceable form — without a nonce if the scout has none.
5. The claimable-path invariant (order 2c): name the functions in scripts/mail-wait.mjs the change may touch and the test that pins the AG-n path.
6. What the card MISSES: every file that must change and is not in its fence (order 6). The UI/UX grep (order 5): run it.
7. Is there an existing mechanism that already does this (§12.6 CALLER-ABSENT)? grep for "reply_to" consumers and any ack/watermark-by-reply code before accepting a new one.

## REPLY
scout_reply as SCOUT-STATUS-REVIEW-CARD-SCOUT-LOOP-S163-1, first line `REVIEW-VERDICT: GREEN|RED card=CARD-SCOUT-LOOP-S163-1-v1 md5=<md5>`, then numbered findings, each with its delta as a replacement text the Architect can paste. If the body exceeds 8192 characters, the bus row carries the verdict line + sha256 and the full text goes to "2026 - Yapra - DDocuments/Claude_Duzenli_Arsiv/S163/SCOUT-STATUS-REVIEW-CARD-SCOUT-LOOP-S163-1.md" (always write the file). Then STOP.
FORBIDDEN: no edit, push, merge, DB write other than scout_reply, cron; never print an environment value.

END · ORDER-SCOUT-REVIEW-CARD-SCOUT-LOOP-S163-1
