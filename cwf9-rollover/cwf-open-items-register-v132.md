# cwf-open-items-register-v132

APPEND-ONLY. Items leave only by `CLOSED@evidence`, `SUPERSEDED-BY <name>`, or `MERGED-INTO <name>`.

**THIS DOCUMENT DOES NOT RESTATE `v131`, `v130`, `v129`, `v128`, `v127`, `v126`, `v125`, `v124` OR ITS
ADDENDUM.** Those stand in full, by name. Every item in them not closed below is CARRIED UNCHANGED.

Cut at the close of S142, 2026-09-19T~16:00Z. **S142 is the last session under container cwf_yaprak_8;
the product continues as cwf_yaprak_9 — see the rollover manifest and BOOTSTRAP-v144.**

ANCHOR AT CUT: master `7572c3bbfeed23656fcf8a55f6e64d93ed240c14` (merge of PR 586 at 2026-09-18T07:17:02Z
by `app/github-actions`) — the vector path-probe. Read from the shared clone's lane-fetched `origin/master`.
⚠ This landing passed through a BROKEN gate (see §2, MASTER MERGE GATE): adversary/scout was absent and
build (24.x) was in progress at merge. The diff is correct work; the gate was not enforcing.

---

## §1 · CLOSED, BY EVIDENCE

**`F-S141-GB5-CLAUSE-I-READS-FLAG-VALUES-AS-ENDPOINTS-1`** — CLOSED@ PR 584
(`63dbafe44edd9520349ad6a7605a5bf052570762`... merge; guard-hook clause (i) now matches GATE_PATH against
the resolved `endpoints`, not raw args). The scout gated it GREEN and posted the fifth context; landed
through the auto-merge route in ~21 minutes seal-to-merge. This was S142's agenda ⓵.

**THE VECTOR ENGINE FAULT — DIAGNOSED, NOT YET REPAIRED.** The "why is vector unreachable" question, open
since S140 (`F-S140-VECTOR-ENGINE-UNREACHABLE-1`), is CLOSED@ measurement:
`F-S142-VECTOR-ORIGINS-POINT-AT-A-STALE-HOST-1`. The two containers were never dead; the distribution's two
vector origins point at a stale host DNS. The REPAIR is open and is the owner's origin-write approval (§2).

**`F-S142-VECTOR-DIAGNOSE-LEAKED-REDIS-PASSWORD-CONTAINED-1`** — the exposure is CLOSED@ read-back-proven log
deletion + the `--no-trunc` cure landed in PR 586. The credential ROTATION stays open in §2 (owner surface).

---

## §2 · OPEN, ADDED IN S142

- **`F-S142-MASTER-MERGE-GATE-NOT-ENFORCED-1` (PLATINUM)** — OPEN, hazard LATENT. Ruleset endpoints answer
  403 "Upgrade to GitHub Pro"; the plan lapsed mid-session. auto-merge.yml is now merge-on-open. Containment
  (disable the workflow via the Actions API) was ORDERED (bus row `badc68f2`) but UNCONFIRMED — AG-4 did not
  consume it through two unmoved measurements. What closes it: the owner restores Pro (his standing ruling,
  PRO-NOT-PUBLIC-1) and the ruleset endpoints read clean again. Until then no PR is opened.
- **`F-S142-VECTOR-ORIGINS-POINT-AT-A-STALE-HOST-1`** — the diagnosis is closed (§1); the REPAIR is open:
  point `vector-index` and `vector-encoder` origins at the instance's current DNS. Owner's named
  origin-write approval. The DURABLE fix (stable address / private origin so a box replacement cannot
  re-break it) is a SEPARATE card, not yet cut.
- **`F-S142-CONVERGE-ASSOCIATION-FAILING-SINCE-0911-1`** — OPEN, second live fault. compose-apply
  association Failed since 2026-09-11T19:09:47Z, twenty consecutive failures. NOT the cause of the 504s.
  Next read: the failed execution's target invocation output. Cause likely off-repo (last apply 2026-08-17).
- **REDIS CREDENTIAL ROTATION** — OPEN, owner surface. A live credential appeared in a CI log; log deleted
  and proven gone, but exposure is not reversible by deletion. Rotation is a real-world act on a box serving
  Langfuse; if the owner rules rotate, it becomes its own card.
- **`F-S142-SCOUT-PASSED-COMMAND-COLUMN-WITH-PASSWORD-FLAG-1`** and
  **`F-S142-SCOUT-EXCLUDED-STALE-ORIGIN-FROM-THE-TREE-1`** — adversary self-indictments, recorded. The
  general class: a lens that stops at the surface it expects (a "read-only" classification, a DECLARED
  config) misses the disclosure/divergence on the surface it did not check.
- **`F-S142-DISPATCH-ONLY-WORKFLOW-NEVER-PARSED-BY-CI-1`** — OPEN. A dispatch-only workflow's file is never
  exercised by a PR run, so PR greens are blind to a dispatch-time error. The WIRING card (actionlint on
  `.github/workflows/**` at pull_request; the tree has no such caller) is NOT yet cut. NEW subject → scout
  first. Note its two honest limits: actionlint passed tonight's file, and it cannot see billing.
- **ARCHITECT ERRORS OF S142, BY NAME**: PLATINUM-BREACH-S142-1 (terminal command to the owner) ·
  REPEATED-THE-CP-8-ANCHORED-FENCE-TRAP (corrected pre-insert) · FALSE-UNMOVED-FROM-A-NARROW-QUERY-WINDOW
  (tick 30) · STALE-HEAD-IN-A-SCOUT-ORDER (corrected by addendum) · FIVE-QUEUE-POSITIONS-FROM-CARRIERS-NOT-
  THE-PRODUCT. Cures mechanical, in CWF-S142-FINDINGS-v1.
- **OWNER ACTIONS/WITNESS OF S142**: "GiHub acildi" (the plan/block lifted, witnessed 2026-09-18T06:27Z);
  the resource hypothesis (recorded by name, falsified by measurement but load-bearing in insisting nothing
  was CHANGED — and he was right, an address moved).
- **THE ROLLOVER TO cwf_yaprak_9** — OPEN until _9 is stood up. See BOOTSTRAP-v144 §0 and the rollover
  manifest. The live carriers move; the law corpus stays in the repo; the session archive stays in
  Claude_Duzenli_Arsiv. Silent compression is the one forbidden failure.

---

## §3 · CARRIED FROM v131, UNCHANGED

Everything in v131 §2 and §3 not named above, by name: the S141 open items
(`F-S141-ONE-SLEEPING-MACHINE-LOOKS-LIKE-THREE-INDEPENDENT-SILENCES-1` ·
`F-S141-THE-LANE-WINDOW-WENT-DEAF-WHILE-ITS-POLLER-HAD-BUDGET-1` ·
`F-S141-A-WATCHERS-STOP-TEST-MATCHED-AN-ERROR-PREFIX-1` · `F-B` master-freeze-no-poster, still OPEN and now
DEMONSTRATED by the merge-on-open event · `F-S141-DEVICE-COMMIT-SERVES-STALE-BYTES-ON-A-REUSED-PATH-1` ·
THE-PLAN-SILENCED-GATE-CLASS, now FIRED not just theorised · the two product findings
`F-S141-CHOSEN-OPTION-DOES-NOT-NARROW-ITS-SIBLING-REF-1` and
`F-S141-PREFIX-TIER-MATCHES-WRONG-FACTORY-LINE-AND-FACTORY-ID-1`, still scout-first · OWNER WITNESS the
oven's seven-day stoppages · MASTER GATED FOR THE OWNER TOO) · all of v130 §3's carried set (the S140 plan
items P0-2/P1-1/P1-2/P1-5-DEFERRED/P1-6..P1-10/P2-1..P2-5/P3-1/P3-2 · A23-COLLAPSE · S117-PARENT-PROMOTION ·
`cwf-sota-definition` ABSENT from the tree · the sixteen external SOTA criteria, v122's `0/16` CARRIED
UNVERIFIED and NOT re-measured in S142 either · PLATINUM-BREACH-S137-1 · PLATINUM-BREACH-S122-1 ·
`F-S122-STALE-COUNT-CLASS-IS-SUBSTRATE-INDEPENDENT-1` · `A-REC-S122-ARCHITECT-PRECISION-DECAY-1` ·
CALLER-ABSENT · LEAN-AND-MEAN).

⚠ `npm run land`, landing cards, LANDING seals and the lock ref remain RETIRED. The adversary gate on WORK
cards is untouched and absolute.

---

## §4 · WHAT S142 PUT ON THE BUS

Sealed WORK cards and their scout GREENs: CARD-GATE-PATH-SCOPE-S141-1-v2 (→ PR 584) ·
CARD-VECTOR-DIAGNOSE-STANDALONE-S142-1-v2 + AMENDMENT-1 (→ PR 585) · CARD-VECTOR-PATH-PROBE-S142-1-v1
(→ PR 586). Voided: CARD-VECTOR-REPAIR-S142-1-v1 (scout RED — the host already converges every 30 min, so a
manual `up` would be a third caller; §12.6). Notices: NOTICE-DISPATCH-VECTOR-DIAGNOSE · NOTICE-RUN-THE-
DIAGNOSIS-NOW · NOTICE-CONTAIN-THE-LEAKED-REDIS-PASSWORD · NOTICE-CONTAIN-MERGE-ON-OPEN (unconsumed at
close). Scout orders: the diagnose review + fifth context ×3 landings, the startup-failure read, the
control-probe dispatch, the association read, the path-probe review. Every seal carried its verdict row id
and an EXISTS; every hand-typed insert carried md5 AND sha256 AND octet_length preconditions (one insert
wrote zero rows on a mis-sized precondition and was corrected — the guard held).

---

## §5 · CARRIERS AT CUT

- CLAUDE-PROJECT-INSTRUCTIONS — **v5_10** (unchanged in S142)
- CWF-S142-FINDINGS — **v1**
- CWF-SESSION-GRAPH-KB — **v142**
- cwf-open-items-register — **v132** (this document)
- CWF-S142-SESSION-CLOSE — **v1** (cut alongside this document)
- REGISTER-BUG-BUCKET — **v57** (NOT advanced in S142; carried as in v131)
- CWF-S140-IMPLEMENTATION-PLAN-EVERYTHING-LIVE — **v2** (not advanced; the session's subject was the vector
  fault and the rollover)
- CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT — **v144**, cut LAST and AFTER this document; it carries the rollover
  to cwf_yaprak_9.

END · cwf-open-items-register-v132
