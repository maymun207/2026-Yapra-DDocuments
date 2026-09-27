# A25-POINTER-AND-S159-CLOSE-ADDENDUM-v1
Cut 2026-09-27T00:48Z (bridge/container clock), after the S159 close set (bootstrap v161) — the owner continued the session past the close with two requests (03:32 TSI): build A25 v1 = A24 v1_3 + proposed changes in RED (text and diagrams), then re-evaluate the architecture together.

## Product, measured at this addendum
- PR 622 (item 95, numeric tolerance) LANDED: master b8e5b1d95b76b92b0c20383ebd7a1d0bf9c7da6f (merge of PR 622; scout-2 GREEN SCOUT-STATUS-LAND-PR622-S159-1, bus 2026-09-27T00:33:47Z). Vercel production deployment for that sha was BUILDING at 00:35Z (not yet READY at this write). Item 95 closes on READY.
- PR 623 (item 104) still open; COLLISION clears now that 622 landed; needs NOTICE master merge -> scout land (S160).

## Routing architecture line
- Scout S159-2 FULL verdict (30,888 B, sha256 dd8d38c8b2b02d156632e596a858de50295b0b2ff9370d3f5cbe5e1e43bacc3a) was written by a scout window into Claude_Duzenli_Arsiv/S159/SCOUT-STATUS-REVIEW-ROUTING-ARCHITECTURE-v2-S159-2.md UNCOMMITTED; committed by the Architect in this addendum's commit (the scout does not commit). Its D1-D17 are applied in doc v3 and in A25.
- Doc v3 (CWF-ROUTING-ARCHITECTURE-v2-DRAFT-S159-3, 80 A24 lines quoted mechanically) and its scout order (ORDER-SCOUT-REVIEW-ROUTING-ARCHITECTURE-v2-S159-3-v1, bus 18:10:19Z) are UNANSWERED: the scout-1 window re-ran the v2 order instead (19:05:33Z). Doc v3 remains an INPUT; the review object is now A25.
- A25 v1: Claude_Duzenli_Arsiv/yapra-mimari-documents/A25_cwf-capability-fabric-architecture-v1.html, sha256 8e8c18a8fab6141fe178f483f286ca1a2e93d8416fa5fadd6ac7bc4d9cf7866b. Built by Claude_Duzenli_Arsiv/S159/build_a25.py from the A24 v1_3 HTML bytes (sha256 99444e2b4e971f770c453426297385cb66998bb2ac603da4b427a741f14497d4): every insertion keyed by an exact A24 anchor; A24 text and diagrams preserved (the only rewritten lines are the four identity lines: title, docid, h1, footer — disclosed in the document). RED = A25 proposal (dashed, badged); A24's own solid red keeps its meaning. §Δ25 lists 18 departures/additions with an empty "Sahibin hükmü" column and the seven ruling items R6(a)-(g); K32-K41 rows; two new card faces; red bands on all three SVGs; §7c cwf.trace.v2 field map; §8 traps; §9 E1-E5 rows; §10 S159 contributions and A-REC-S159-1/2/3.

## S160 open (supersedes bootstrap v161 §6 for the routing line only)
1. Owner reviews A25 v1 (the red parts). 2. Scout adversary review of A25 (order to be cut on the owner's word; the v3 order on the bus is superseded and should be marked so). 3. OWNER-RULING-S160-ROUTING-V2-1 on R6(a)-(g). 4. Then E1 cards. Everything else in bootstrap v161 stands.
END · A25-POINTER-AND-S159-CLOSE-ADDENDUM-v1
