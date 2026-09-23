# CWF-S156-FINDINGS-v1

Every finding carries HOW and WHEN (owner rule 2026-09-10).

F-S156-SOTA1-NOT-FIRST-1 · the first S156 text was a sentence, SOTA-1 came second (third session running). HOW: the first tool call of S157 is the SendUserMessage of bootstrap line 1, before any read. WHEN: S157 open.
F-S156-BOOTSTRAP-MISSED-UNCONSUMED-NOTICE-1 · v157 said "nothing in flight" while NOTICE-PUSH-DOC-REPO-S155-2 sat unconsumed. HOW: the close set reads to_lane rows with consumed_at null and lists them in the bootstrap. WHEN: applied in v158.
F-S156-REGISTER-DROPPED-G1-REMAINDER-1 · v146 listed only G2/G3/G4; 160 G1 logic lines remained. HOW: G1b card. WHEN: CLOSED when G1b lands (2026-09-23).
F-S156-RULESET-NOT-STRICT-1 · CLOSED by the owner (strict=true 04:52 TSI).
F-S156-CARD-TIME-AHEAD-1 · item 80 recurrence (DB window written ahead of the clock), caught before sending. HOW: every time in a card from the same command's date -u. WHEN: practice, standing.
F-S156-G2V1-WOULD-REMOVE-FUNCTIONS-1 · G2 v1 would have removed the blind-spot law floor and five kind-def readers. HOW: OWNER-RULING-S156-DATA-BACKENDS-1 + FAIL-CLOSED-1 and G2 v2. WHEN: G2 v2 verdict, 2026-09-23.
F-S156-SUPERSET-HAND-PACK-PRIVILEGE-1 · superset keeps a hand-authored pack. HOW: own card after G2 (item 82). WHEN: 2026-09-24.
F-S156-CLEARED-SCOUT-CANNOT-READ-OWN-STATUS-1 · mail-wait reads to_lane rows only; a /clear-ed scout cannot read its earlier verdict. HOW: every re-review order carries the prior defect list (practice from merge guard v3); permanent fix in item 17. WHEN: item 17 card, 2026-09-23.
F-S156-MERGE-GUARD-LOOP-1 · four versions; each review found new edges while the design detected instead of prevented. HOW: v3 redesign + loop exit + owner ruling; v5 shipped. WHEN: closed at v5 unless AG-2 finds the design unbuildable.
F-S156-ORDER-WITHOUT-BOOT-TEXT-1 · an order was put on the bus without a boot text for the owner. HOW: every bus post and its ⚡ boot text go in the same turn. WHEN: practice, standing.
F-S156-DOC-REPO-UNPUSHED-1 · the bridge cannot push; every S156 commit is local. HOW: the first lane window of S157 gets a push notice; permanent: item 55 hook (lanes wake without the owner) + a push step in each close. WHEN: S157 open.
F-S156-SCOUT-SANDBOX-FETCH-FAILED-1 · a scout's mail-wait inside the sandbox printed READ-FAILED "fetch failed" and read OK outside it. HOW: carried to item 66 (sandboxed tsx/fetch). WHEN: with item 66, 2026-09-23.

END · CWF-S156-FINDINGS-v1
