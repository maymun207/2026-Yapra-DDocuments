<!-- relay-audit: v1 kind=notice -->
ORDER-SCOUT-LAND-PR622-S159-1-v1

LANE: scout (scout-2 window; /clear first)
fanout: personalized (one lane, one body)
FROM: Architect, S159, 2026-09-26T16:43Z
OWNER APPROVAL: OWNER-APPROVAL-S159-PR622-LAND-1 — the owner's words "onay PR 622 iniş" (S159, TSI time in the bus row of that approval as relayed by the Architect); OWNER-APPROVAL-S159-PLAN-1 step 3 (the card); OWNER-RULING-S153-NO-ARMES-HARDCODE-1.
NO POLL OR CRON TASK. Bekleme dongusu yok. When your status is written, stop.
WHAT: adversary landing review of PR 622 (CARD-NUMERIC-SAME-ABSOLUTE-S159-1-v3, AG-4, register item 95) and the adversary/scout status on the head that will land.

## PREMISE
READ: AG-4 slip SLIP-NUMERIC-SAME-ABSOLUTE-S159-1 (bus 2026-09-26T16:40:54Z): branch phase/numeric-same-absolute-s159-1, head fa06452850d5393ce8549530de08320f585d7c80, PR 622 non-draft from master 2a6f6781b1a4748aac5f5bc7b1d73136863b1c35; guard VERDICT GREEN (FENCE-GREW ok; #623 yields on manifest.json); first head RED (NO-FENCE + R-DIFF) repaired in commit 2 and named in the report; tests numericLedger 27, numericSameAbsolute 11 new, wiring 5, stamp 7, groundingCheck 51, memGroundingIso 7; full suite 753 files 11251 pass, 1 named skip. Two DISAGREEMENTS named by the lane, both values in the report: (1) the fixture is REDACTED of tenant words (check:tenant-zero, 8 hits) so it is not byte-equal to the card's evidence:bytes — the card's demand conflicted with AGNOSTIC-1 and the lane chose the gate; (2) exemption (a) uses d = max(answer decimals, query decimals), not the answer's only.
READ (Architect, GitHub API, 2026-09-26T16:43Z): PR 622 head fa06452850d5393ce8549530de08320f585d7c80, base 2a6f6781b1a4748aac5f5bc7b1d73136863b1c35; actions/runs at that head: Build and Test success (changes incl. merge guard success, build 24.x, rule26; eval-canary skipped), Relay corpus success, report-schema success, Auto-merge landing success. Master unchanged.
SELF-INVALIDATION: dies if PR 622's head is not fa06452850d5393ce8549530de08320f585d7c80 or master is not 2a6f6781b1a4748aac5f5bc7b1d73136863b1c35. If master moved, write the verdict on content, print "needs master merge", do not post.
ON-DISAGREEMENT: YOUR READING WINS; print both.

## STEPS
1. Print git ls-remote for master and refs/pull/622/head (full 40-hex).
2. REVIEW on the PR head, quoting bytes:
   a. numericLedger.ts: same() (or its replacement) compares with an ABSOLUTE half-grid tolerance at BOTH call sites (isSourced and exemption (a)); quote both hunks. The exemption's d = max(answer, query decimals): say whether that can WIDEN today's exemption (query 3 exempting answer 4 must stay impossible) — quote the test that pins it.
   b. NumericMeasurement carries `claims: number | null`; NUMERIC_UNMEASURED has claims null; stageStream span output carries numericClaims; quote the three lines.
   c. The falsifier tests run on the redacted fixture: quote the four outcomes (unmodified 0/claims 2; 1.000.000.001 -> 1; 514.778.660,52 -> 1; empty ledger -> 2) and the scale and %95,84 control. Say whether the redaction changed any NUMBER in the fixture (it must change only names/words); print the fixture's own sha256 lines and whether the report names the divergence from the card (it must).
   d. Literal edits: exactly the 20 literals named in the card's ORDER 2 (7 + 12 + 1) plus the wiring literal count the lane measured (5, card said 4): print git diff --stat on the four test files and say whether any literal outside the named list changed.
   e. No ARMES/vendor/tenant name added (case-sensitive grep over added lines; quote count — the fixture redaction is the lane's own proof); no user-visible function removed; FILE-FENCE quoted and every changed path inside it.
   f. QUOTE the merge guard VERDICT line on the green run and the `## DIFF` section heading of the report.
3. CI at the CURRENT head by full sha; a zero read twice; SKIPPED named by workflow NAME (never a run id in prose).
4. If clean: post adversary/scout success on that head; then ONE read (no wait loop) of master: print whether auto-merge landed and the merge sha if it did.
REPLY with scout_reply (NOT laneSlip) as SCOUT-STATUS-LAND-PR622-S159-1, first line `ADVERSARY-VERDICT: GREEN|RED pr=622 head=<40-hex>`. If the bus write is refused, print the full reply and the exact error line and stop.
FORBIDDEN: no edit, no push, no merge, no re-run, no poll task, no cron; never print an environment value.

END · ORDER-SCOUT-LAND-PR622-S159-1-v1
