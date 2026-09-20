# cwf-open-items-register-v135

APPEND-ONLY. Does not restate v134 or earlier; every item not closed below is CARRIED UNCHANGED. Cut at S145 close,
2026-09-20T06:45Z. ANCHOR: master 7572c3bbfeed23656fcf8a55f6e64d93ed240c14 (owner-clone ref READ 06:38Z; a claim).

## §1 · CLOSED, BY EVIDENCE
- item 29 (scout API 401 after /clear) — CLOSED@ SCOUT-STATUS-AUTH-READ-S144-1: AUTH OK via node fetch + osxkeychain
  token; gh's own keyring token is invalid and gh fails TLS in the scout window (two stores, two tokens).
- bootstrap v146 §3.1 — CLOSED@ same row.

## §2 · OPEN, ADDED IN S145 (by name; details in CWF-S145-FINDINGS-v1)
F-S145-VECTOR-REPAIR-DIFF-PROGRAM-CRASHED-1 (MERGED-INTO item 11) · F-S145-VECTOR-REPAIR-QUOTED-DIFF-OUTPUT-1 (MERGED-INTO
item 11) · F-S145-EMPTY-DIFF-ALSO-MEANS-TARGET-ABSENT-1 (MERGED-INTO item 11) · F-S145-TEXT-ONLY-TESTS-BLIND-TO-RUN-BODIES-1
(item 33, NEW) · F-S145-LANE-CLAUDE-MD-STILL-ORDERS-A-POLLER-1 (item 34, NEW) · F-S145-DOC-PUSH-REFUSED-BY-HARNESS-CLASSIFIER-1
(MERGED-INTO item 26) · F-S145-BUS-GATE-REFUSES-UNHEADED-ROWS-TO-AG-1 (record) · F-S145-SCOUT-REPLY-INVISIBLE-UNTIL-SLIP-1
(MERGED-INTO the consumed_at item) · F-S145-REGISTER-BUG-BUCKET-STALE-1 (item 35, NEW).
Owner: OWNER-APPROVAL-S145-PLAN-1 · owner correction on lane crons (S112-YASA-1).

## §4 · THE WORK LIST AT CUT (OWNER-APPROVAL-S145-PLAN-1; penalty date 22 Eylul)
| Order | # | Work | State at cut |
|---|---|---|---|
| 1 | 11 | Vector origin repair | PR 587 head 990ca963, scout re-review ordered (476d08ac); then dry-run -> repair -> live proof (PLAN-1) |
| 1b | 12 | Vector stable address | Elastic IP line in the dry-run decides |
| 2 | 34 | Lanes create no poll task (4 files) | card v1 at scout (fde80e84), approved |
| 3 | 7 | Resolved parent -> child layer parent_param | archive search first (A23 / ask-shape / parent_param) |
| 3 | — | OWNER-RULING-S145-SELF-TAKEOVER-1 boot rule | approved; write into bootstrap boot text + lane card with item 34 |
| 4 | 5 | channel-2 BM25+RRF | read vector-lane caller first |
| 5 | 21 · 28 | S141 product bugs · MKB routed to ARMES | measure first |
| 6 | 31 · 30 · 32 · 20 · 33 · 35 | CP-3 · NODE_USE_ENV_PROXY · worktrees · five stale PRs · executing-lens for workflows · bug bucket v58 | small cards |
| — | 26 | Every document in the doc repo | local commits unpushed; push permission given, unmeasured |
| FROZEN | 2 3 4 27 | bench | frozen |

## §5 · CARRIERS AT CUT
CLAUDE-PROJECT-INSTRUCTIONS v5_10 · CWF-S145-FINDINGS v1 · CWF-SESSION-GRAPH-KB v145 · register v135 (this) ·
CWF-S145-SESSION-CLOSE v1 · REGISTER-BUG-BUCKET v57 (STALE, item 35) · cwf-sota-definition v1_5 ·
CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT v147 (cut LAST).

END · cwf-open-items-register-v135
