CARD-SMALL-FIXES-S169-1-v2 — archive pointer (S170).
Canonical bytes: relay_inbox row 0bd9005a-d3bb-4052-b593-012c95fc2e3f (to AG-1, 2026-10-01T05:43:15Z), length 7139, md5 cc45e3b5361092e017d33f332999f34a, sha256 28c696110c0ca10ee9c505a0c56f300e854eb18e7af8327eb44dfe37f8a7f66e.
Composition: v1 (docs/CARD-SMALL-FIXES-S169-1-v1.md) + scout-1 amendments A1–A6, inserted by SQL substring of row 2c54f918-263a-45c1-ad93-844aa21649e1 between "AMENDMENTS (paste VERBATIM):" and "END-AMENDMENTS" (substring md5 ad80aad9d92383b30052d090a0634329, 2277 chars). Preconditions on the insert: scout row md5 164f9777cf710ef0f1582271514fa043 and sha256 43dafcee2f06abccefb3c1bceea761c8302b55336f4da0d76bb2867debe435eb; held (1 row written).
Subject check: A3 replaces F3 (no slip-contract change; the honest form `ci: UNMEASURED dispatched (not watched)` already passes both regexes) — same subject (row 206), smaller correct fix; not a subject change.
Adversary: EXEMPT, ack 2c54f918-263a-45c1-ad93-844aa21649e1. Authority: OWNER-APPROVAL-S169-PLAN-1.
Known defect in the card text: FROM line says 05:50Z; the row was written 05:43:15Z.
