# cwf-open-items-register-v134

APPEND-ONLY. Items leave only by `CLOSED@evidence`, `SUPERSEDED-BY <name>`, or `MERGED-INTO <name>`.
THIS DOCUMENT DOES NOT RESTATE `v133` OR EARLIER. They stand in full, by name. Every item not closed below is CARRIED
UNCHANGED. Cut at the close of S144, 2026-09-20T04:42Z.

ANCHOR AT CUT: master `7572c3bbfeed23656fcf8a55f6e64d93ed240c14` — MEASURED by scout ls-remote 2026-09-20T04:22:05Z.

## §1 · CLOSED, BY EVIDENCE

- **Bootstrap v145 step ② (anchor, gate, auto-merge carried unverified)** — CLOSED@ SCOUT-STATUS-OPEN-READ-S144-1
  (04:06:59Z–04:07:50Z): master unmoved; ruleset enforcing, bypass 0 (read twice); auto-merge active; 5 open PRs.
- **Bootstrap v145 step ③ (S143 doc push)** — CLOSED@ SLIP-PUSH-DOC-REPO-S143-6-AG4 (9305838e on origin/main).
- **Bootstrap v145 step ④ (penalty date)** — CLOSED@ OWNER-RULING-S144-PENALTY-DATE-1: 22 Eylül 2026.
- **Untracked S142 files + cwf9-rollover/ in the doc repo** — CLOSED@ doc commits 48b5a098 + 2b3a0007, pushed (2b3a0007
  on origin/main, AG-4 04:04Z chain).
- **Untracked `Claude outputs/` in the code clone** — CLOSED@ doc commit 6194e01f (cmp-verified move). Push pending (§4 row 26).
- **F-S144-TSX-EPERM-IN-SANDBOX-CONFIRMED-1** — MERGED-INTO F-S143-TSX-IPC-EPERM-IN-LANE-WINDOWS-1 (item 19).

## §2 · OPEN, ADDED IN S144

All of CWF-S144-FINDINGS-v1 not closed in §1, by name: F-S144-VECTOR-REPAIR-HAS-A-WRITE-PATH-NOW-1 (item 11) ·
F-S144-ITEM5-IS-PROBABLY-THE-VECTOR-LANE-1 (claim, item 5) · F-S144-F-S117-HALF-LANDED-1 (item 7) ·
F-S144-SCOUT-API-401-AFTER-CLEAR-1 (item 29, NEW) · F-S144-SCOUT-NODE-FETCH-BLIND-TO-PROXY-1 (item 30, NEW) ·
F-S144-CP3-REJECTS-RELAYED-AND-RECALLED-1 (item 31, NEW) · F-S144-BOOT-TEXT-TOOK-AN-ANSWERED-ORDER-1 (cure applied) ·
F-S144-ARCHITECT-GIT-STATUS-LEFT-INDEX-LOCK-1 (cure applied) · F-S144-SCOUT-SAW-AUTOMERGE-DISABLED-AFTER-THE-ENABLE-1 ·
F-S144-CLAUDE-OUTPUTS-IN-CODE-CLONE-1 (closed §1) · F-S144-EIGHT-STALE-WORKTREES-1 (item 32, NEW).
Bench-persona scout verdict (frozen item 27): RED on v3, one defect — capture rows torn by the overlay; fix recorded,
item stays FROZEN.
Owner rulings: OWNER-RULING-S144-PENALTY-DATE-1 · OWNER-RULING-S144-CLEAR-PER-CARD-1 ·
OWNER-RULING-S144-ONE-PLAN-ONE-APPROVAL-1 · OWNER-APPROVAL-S144-PLAN-1.

## §4 · THE WORK LIST AT CUT — ORDER IS THE OWNER'S (penalty date 22 Eylül)

| Order | # | Work | State at cut |
|---|---|---|---|
| 1 | 11 | Vector origin repair | card v2 GREEN+sealed on AG-4 bus; AG-4 building; dry-run+write+proof pre-approved (PLAN-1) |
| 1a | 29 | Scout API 401 after /clear | ORDER-SCOUT-AUTH-READ-S144-1 open (blocks adversary/scout) |
| 1b | 12 | Vector stable address | Elastic IP line in the dry-run decides |
| 2 | 7 | Resolved parent → child layer parent_param (F-S117 open half) | wiring card after A23 search |
| 2 | 5 | channel-2 BM25+RRF | read vector-lane caller first (may equal the vector lane) |
| 2 | 6 | τ/β rows | blocked by 5, 9 |
| 3 | 21 | Two S141 product bugs | unmeasured |
| 4 | 28 | MKB questions routed to ARMES | unmeasured |
| 5 | 31 | CP-3 accepts RELAYED/RECALLED | small card, scout first |
| 5 | 30 | NODE_USE_ENV_PROXY for lane node fetch | small card |
| 5 | 32 | Worktree hygiene (8 records) | AG-4 card |
| 5 | 20 | Close five stale PRs (523 543 553 556 567) | open, measured 04:07Z |
| 5 | 26 | Every S144 document in the doc repo | local commits after 87d7837b; NOTICE-PUSH-DOC-REPO-S144-3 |
| 5 | 8 9 10 13 14 15 16 17 18 19 22 23 24 | as v133 §4 | unchanged |
| FROZEN | 2 3 4 27 | bench | frozen |

## §5 · CARRIERS AT CUT

CLAUDE-PROJECT-INSTRUCTIONS v5_10 (unchanged) · CWF-S144-FINDINGS v1 · CWF-SESSION-GRAPH-KB v144 · register v134 (this) ·
CWF-S144-SESSION-CLOSE v1 · REGISTER-BUG-BUCKET v57 (NOT advanced since S141; CARRIED UNVERIFIED) ·
cwf-sota-definition v1_5 · CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT v146 (cut LAST).

END · cwf-open-items-register-v134
