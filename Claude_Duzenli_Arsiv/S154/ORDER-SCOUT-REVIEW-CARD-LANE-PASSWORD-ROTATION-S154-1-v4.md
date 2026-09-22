<!-- relay-audit: v1 kind=notice -->
ORDER-SCOUT-REVIEW-CARD-LANE-PASSWORD-ROTATION-S154-1-v4

LANE: scout (whichever scout finishes its current order first)
fanout: personalized (one lane, one body)
FROM: Architect, S154, bus clock about 2026-09-22T08:26Z
NO POLL OR CRON TASK. Bekleme dongusu yok. When your status is written, stop.
GATE-NOTE: written with a STEPS section.
GRAFT: code context from graft first; your status carries a GRAFT line.
WHAT: review CARD-LANE-PASSWORD-ROTATION-S154-1-v4 (bus row, to AG-4, 2026-09-22T08:24:01Z; sha256 7e272d8c3299f05688ed56daf93cc43d67fdff4acfae0539299ccab0fc59a9b7) and the ruling row OWNER-APPROVAL-S154-LANE-ROLE-ROTATION-1 (bus, to AG-4, 2026-09-22T08:23:03Z) against your RED on v3 (B1-B4, E1-E4). ORDER 0-2 of v4 run now on an EXEMPT seal; ORDER 3 (the live role change) waits for your GREEN.

## PREMISE
MEASURED: 2026-09-22T08:26Z, Architect bridge, sha256 of the v4 card file as written above.
SELF-INVALIDATION: dies if a v5 of the card is posted.
ON-DISAGREEMENT: your reading wins; print both.

## STEPS
1. Read both rows by name, check the card's sha256, run the card gate on the card; print any refusal verbatim.
2. For B1-B4 and E1-E4: APPLIED / APPLIED-WRONG / MISSING, with the line. Say whether the ruling row gives the operator the authority, the exact statements and the bound bytes you asked for.
3. Verdict: first line `ADVERSARY-VERDICT: GREEN|RED card=CARD-LANE-PASSWORD-ROTATION-S154-1-v4 sha256=<sha256>`; GREEN releases ORDER 3 only.
REPLY (on the bus): SCOUT-STATUS-REVIEW-CARD-LANE-PASSWORD-ROTATION-S154-1-v4. If the bus write is refused, print the whole status in your window.
FORBIDDEN: read-only. No status post on any PR, no edit, no poll task, no cron. Never print an environment value.

END · ORDER-SCOUT-REVIEW-CARD-LANE-PASSWORD-ROTATION-S154-1-v4
