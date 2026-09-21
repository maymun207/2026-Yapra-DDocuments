# cwf-open-items-register-v140

APPEND-ONLY. Cut at S151 close, 2026-09-21 ~20:05Z (23:05 TSI). Supersedes v139 (S150). Every item listed, one row each; items leave only by CLOSED@evidence / SUPERSEDED-BY / MERGED-INTO.
ANCHOR: origin/master 9cb7fefc947745bec1fdd97aff62d58c34c47919 (scout ls-remote 19:25Z and 19:50Z; owner-clone tracking ref). Vercel production last READY 20c1651c3fb59b48490670ffefed02099d684ed9 (CARRIED UNVERIFIED from S150; not re-read in S151). Doc repo origin/main c7918aac571233be516667f1d8d62dd0cdd3fb65 (SLIP-PUSH-DOC-REPO-S151-1 second push, ls-remote); local ahead by the S151 commits after it.

## §1 · CLOSED IN S151, BY EVIDENCE (carry-diff against v139)
- 47 · dead folder connection — CLOSED@ get_device_info 2026-09-21T18:46:04Z: exactly two connected folders ("2026 - Yapra - DDocuments", "cwf_yaprak"); no forbidden spelling.
- 26 (S150 part) — CLOSED@ SLIP-PUSH-DOC-REPO-S150-2 (ls-remote de97343b7694689ba42ef81d635a6c31d1d528ea, 18:43:44Z); row stays open for S151 commits.
- F-S150-ROUTER-IGNORES-FRAME-METRICS-1 — SUPERSEDED-BY F-S151-ROUTER-HINT-GATED-TO-QUERY-METRIC-1.

## §2 · THE WHOLE LIST (owner deadline: all of A24 implemented by Wednesday 2026-09-23 evening TSI; no functionality removed)
| # | Work | State at cut | Next |
|---|---|---|---|
| 1 | AG-4 address repair | CLOSED S143 | — |
| 2 | BENCH-A2A-1 | FROZEN | — |
| 3 | BENCH-RESET-1 | FROZEN | — |
| 4 | BENCH-BACKEND-MOUNT-1 | FROZEN | — |
| 5 | Channel-2 BM25+RRF, TR analyzer (K15) | recon S151: BM25 over tools exists nowhere; no Turkish stemmer; MERGED-INTO 40d P2 cards | P2-0/P2-1 at S152 open (AG-2) |
| 6 | tau/beta rows + calibration | SUPERSEDED-BY A24 v1_3 K9/K25 | A24 P3 |
| 7 | Resolved parent -> child layer | witness by proxy (S149); determinism UNMEASURED | K31 inside A24 P1 |
| 8 | ③ typer | ABSENT | open |
| 9 | L5 miss ledgers | ABSENT | open |
| 10 | Pre-LLM time slot | unchanged; K29 calendar joins it | A24 P3 |
| 11 | Vector origin repair | CLOSED S146 | — |
| 12 | Vector stable address | CLOSED S146 | — |
| 13 | Converge association failing since 09-11 | one read away | open |
| 14 | Redis credential rotation | owner | owner (item-46 pattern candidate; DB writes via operator) |
| 15 | Takeover ordering + self-takeover + own-worktree | v2 RED; v3 not cut | when a scout is idle |
| 16 | ruleset:drift gh -> curl | open | small card |
| 17 | F-B scout status writer | open | read with PR #590 landing |
| 18 | actionlint on workflows | open | small card |
| 19 | tsx IPC EPERM; bridge esbuild each session (re-fetched S151) | open | small card |
| 20 | Stale record PRs | CLOSED S150 | — |
| 21 | Two S141 product bugs | unmeasured | after P1 |
| 22 | OPA runtime | recon only | open |
| 23 | Delete scripts/land.ts | open | small card |
| 24 | Owner witness: oven 7-day stoppages | owner | owner |
| 25 | S143 closing carriers | CLOSED | — |
| 26 | Every document in the doc repo | pushed through c7918aac…; S151 commits after it LOCAL | NOTICE-PUSH-DOC-REPO-S152-1 at S152 open |
| 27 | Bench persona | FROZEN | — |
| 28 | MKB questions routed to ARMES | measure first | after 21 |
| 29 | Scout API 401 after /clear | CLOSED S145 | — |
| 30 | Lane node fetch ignores sandbox proxy (NODE_USE_ENV_PROXY); recurred S151 in AG-1 (F-S151-LANE-NODE-FETCH-IGNORES-PROXY-1) | open | small card, AG-4, 2026-09-22 |
| 31 | CP-3 accepts RELAYED/RECALLED | open | small card |
| 32 | Worktree/branch hygiene; baseline 20 remote unmerged branches, 37 local no-merged, 11 prunable worktrees (S151) | open | own card, not mixed into A24 |
| 33 | Executing lens for workflow tests | open | small card |
| 34 | Lanes create no poll task | CLOSED S147 | — |
| 35 | REGISTER-BUG-BUCKET v58 | stale since S141 | small card |
| 36 | Vector parity 3/15 | input to P2 | — |
| 37 | Doc-push tracking ref unwritable by lane | standing; Architect update-ref after each push (done S151 → c7918aac…) | standing |
| 38 | A24 v1_3 owner approval | CLOSED S150 | — |
| 39 | A24 P0 measurements | M-e done; recon S151 answered parts of M-a/M-b sources (turn_trace_digest 162 rows; no held-out set) | Architect: M-a counts, M-c, handle threshold, stage-12 text; M2/M3′ lane; M-f owner |
| 40 | A24 P1-A numeric guard | PR #590 head 1bdcc0ab6bd43ddb22e4425db2d0352867f015c8, CI in progress, scout-1 on ORDER-SCOUT-LAND-PR590-S151-1-v1 | land ≤30 min after green → Vercel READY → owner flips grounding.numericMode=stamp → owner re-asks Q3 |
| 40b | A24 P1-B inline aggregates (executor's deterministic half) | CARD-...-P1B-...-v2 in AG-4's box | after #590 lands; floor 0; owner flips result.inlineAggregates=1 after the report |
| 40c | A24 P1-C: C1 metric hints (in flight, AG-1) → C2 K24 fields → C3 routing exam → C4 held-out reader → C5 K17 entry tool → reach canary | C1 v2 at AG-1 | per RECON-A24-P1C-P2-S151-1-v1 |
| 40d | A24 P2 (P2-0…P2-6), P3, P4, P5 | P2 recon done | P2-0/P2-1 at S152 open → scout-2 → AG-2 |
| 40e | NEW · PARAMS card: every governed param the wave needs, at safe floors, one PR (WAVE plan M2) | not cut | AG-4, right after P1-B |
| 41 | Web valve open in production | live; Q4 not re-asked | owner M-f |
| 42–44 | CLOSED S150 | — | — |
| 45 | All params configurable/backup/restore via env files | design not started | after P1 |
| 46 | cwf_lane password rotation | approved; DUE 2026-09-22; card NOT cut; design must route ALTER ROLE to the Gemini operator (F-S151-ITEM46-DESIGN-CONTRADICTS-OPERATOR-ONLY-DB-1) | card at S152 open → scout |
| 47 | Dead folder connection | CLOSED S151 (§1) | — |
| 48 | Q4 digest has no cwf.grounding span | UNMEASURED (AG-4 had no read path) | Architect reads turn_trace_digest at S152 |
| 49 | device_commit_files stale content | mitigated: md5 after every write; overwrite via new temp name + mv | standing |
| 50 | NEW · grouped payload: recordCount counts one group; handle holds first group only | F-S151-GROUPED-PAYLOAD-RECORDCOUNT-ONE-GROUP-1 + F-S151-STORED-HANDLE-HOLDS-FIRST-GROUP-ONLY-1 | AG-4 card after P1-B, 2026-09-22 |
| 51 | NEW · tokenizer camelCase-after-fold (read, not executed) | F-S151-TOKENIZER-CAMELCASE-AFTER-FOLD-1 | P2-0 |
| 52 | NEW · bridge git leaves locks on commit | F-S151-BRIDGE-GIT-LEAVES-LOCKS-ON-COMMIT-1; mitigated by rename into .git/stale-locks/ | standing |
| 53 | NEW · wave: three workers + two scouts; zero new stragglers measured against the §32 baseline | WAVE-A24-PARALLEL-PLAN-S151-1-v1 | AG-2 boots with its first GREEN card |

## §3 · FINDINGS CARRIED BY NAME
All of CWF-S151-FINDINGS-v1 by name; all of v139 §3 stand except F-S150-ROUTER-IGNORES-FRAME-METRICS-1 (superseded above).

## §4 · ONE ORDER FOR S152
Land #590 (40) → owner flips numericMode → Q3 witness · in parallel: 46 card (operator route) → scout; P2-0/P2-1 cards → scout-2 → AG-2 boot; AG-1 C1 landing → C2 · then 40b P1-B (AG-4) → 40e PARAMS → 50 → 30 · then 40c C3–C5, 40d P2-2…, P3, P4, P5 per the wave plan · 39 remainder by the Architect · 48 read · small cards 31 32 33 35 16 18 19 23 · 13 → 8 9 → 21 → 28 → 45. Owner: 14, 24, M-f. Frozen: 2 3 4 27.

## §5 · CARRIERS AT CUT
CLAUDE-PROJECT-INSTRUCTIONS v5_10 · CWF-S151-SESSION-CLOSE-v1 · CWF-S151-FINDINGS-v1 · CWF-SESSION-GRAPH-KB-v151 (appends v150, v149, v147) · register v140 (this) · REGISTER-BUG-BUCKET v57 (STALE, item 35) · A24 v1_3 (FINAL) · WAVE-A24-PARALLEL-PLAN-S151-1-v1 · RECON-A24-P1C-P2-S151-1-v1 · CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v153 (cut LAST).

END · cwf-open-items-register-v140
