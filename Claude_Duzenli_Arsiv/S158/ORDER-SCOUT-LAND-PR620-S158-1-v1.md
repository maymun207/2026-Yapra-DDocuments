<!-- relay-audit: v1 kind=notice -->
ORDER-SCOUT-LAND-PR620-S158-1-v1

LANE: scout (scout-1 window; /clear first)
fanout: personalized (one lane, one body)
FROM: Architect, S158, 2026-09-26T08:13Z
OWNER APPROVAL: OWNER-APPROVAL-S158-PR620-LAND-1 - the owner pasting this order into the scout window is his named approval for PR 620 to land (spend included); OWNER-RULING-S153-NO-ARMES-HARDCODE-1.
NO POLL OR CRON TASK. Bekleme dongusu yok. When your status is written, stop.
WHAT: adversary landing review of PR 620 (the frame fix, CARD-FRAME-KEEPS-UNMODELED-CATEGORIES-S158-1-v2, AG-4, bus 2026-09-26T03:27:44Z, as amended by RULING-PR618-FALSIFIER-HASH-S158-1 and RULING-PR618-FRESH-BRANCH-S158-1) and the adversary/scout status on the head that will land.

## PREMISE
READ: AG-4 slip SLIP-PR618-FRESH-BRANCH-S158-1 (bus 08:05:56Z): branch phase/frame-keeps-unmodeled-categories-s158-2, head c485699d6b4fd8db4b02ad50ebb6e6b139fcd029, ONE commit from master 7fb4a589349911c84757d9e38c0e0d98f2d48c58; code/test/seal paths byte-equal to d7e72faacb0525de2fafef45ff54ea6c6e9e28e5; guard VERDICT GREEN; Build and Test, Relay corpus, report-schema, Auto-merge landing success; eval-canary SKIPPED; 616 routeTraceFields 10/10 (pin 44a7b5db unchanged); 618 tests 15/15; PR 618 and PR 619 closed.
SELF-INVALIDATION: dies if PR 620's head is not the head above or a descendant. If master moved, write the verdict on content, print "needs master merge", do not post.
ON-DISAGREEMENT: YOUR READING WINS; print both.

## STEPS
1. Print git ls-remote for master and refs/pull/620/head (full 40-hex).
2. REVIEW against card v2 (bus row by name, or doc repo Claude_Duzenli_Arsiv/S158/) and the two rulings:
   a. Only when basis==='frame' are keyword categories outside the MATRIX universe unioned back; the universe is DERIVED from MATRIX, not a hand list; non-frame paths byte-unchanged.
   b. Run test (a) yourself on the PR head and quote its output: the capital question routes to [admin, machine-knowledge] (order as printed).
   c. routeDecisionMatrix.ts: the ONLY change is excluding unmodeledKept/unmodeledAdded from the hashed projection, same form as `derived`; the pinned hash literal is UNCHANGED (quote the line at master and at head).
   d. git diff 7fb4a589..c485699d over code/test paths equals git diff 7fb4a589..d7e72faa over the same paths (print both --stat).
   e. Empty != zero on unmodeledKept/unmodeledAdded; no ARMES/vendor/tenant name added outside data (case-sensitive grep over added lines, quote it); no user-visible function removed; FILE-FENCE quoted and every changed path (--name-status, rename sources included) inside it.
   f. QUOTE the merge guard VERDICT line on the green run.
3. CI at the CURRENT head by full sha; a zero read twice; SKIPPED named.
4. If clean: post adversary/scout success on that head; print whether master moved after.
REPLY with scout_reply (NOT laneSlip) as SCOUT-STATUS-LAND-PR620-S158-1, first line `ADVERSARY-VERDICT: GREEN|RED pr=620 head=<40-hex>`. If the bus write is refused, print the full reply and the exact error line and stop.
FORBIDDEN: no edit, no push, no merge, no re-run, no poll task, no cron; never print an environment value.

END · ORDER-SCOUT-LAND-PR620-S158-1-v1
