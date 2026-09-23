OWNER-RULING-S157-G2-OUTAGE-EDGES-1
Given: 2026-09-23 07:15 TSI, S157, the owner's words verbatim: "onay G2 b-c".
Answers the scout's N8(b) and N8(c) (SCOUT-STATUS-REVIEW-CARD-ARMES-G2-KNOWLEDGE-AS-DATA-S156-1-v2, bus 2026-09-23T04:10:22Z), as an extension of OWNER-RULING-S156-FAIL-CLOSED-1:
(b) Governed knowledge store NOT CONFIGURED (no DB) counts as an OUTAGE: no data answer for that turn, and the user is told the knowledge base is unreachable.
(c) A read that SUCCEEDS with ZERO rows is NOT an outage: the backend keeps its normal path (a newly connected backend with no rows and no data file keeps the derived path, as at master).
