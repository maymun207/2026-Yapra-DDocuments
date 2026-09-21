# cwf-open-items-register-v139

APPEND-ONLY. Cut at S150 close, 2026-09-21 ~18:15Z (21:15 TSI). Supersedes v138 (S149). Every item listed, one row each; items leave only by CLOSED@evidence / SUPERSEDED-BY / MERGED-INTO.
ANCHOR (reconciled S150): origin/master 9cb7fefc947745bec1fdd97aff62d58c34c47919 (scout git ls-remote, 17:23Z and 17:58Z) · owner clone 7572c3bbfeed23656fcf8a55f6e64d93ed240c14 is its ancestor (merge-base) · Vercel production READY 20c1651c3fb59b48490670ffefed02099d684ed9 (later master builds CANCELED by scripts/vercel-ignore.mjs = docs-only skip by design). Doc repo origin/main 3247fce4f6c715575d78114ae43a65ac36d8527a (SLIP-PUSH-DOC-REPO-S150-1); local ahead → NOTICE-PUSH-DOC-REPO-S150-2.

## §1 · CLOSED IN S150, BY EVIDENCE (carry-diff against v138)
- 20 · six record PRs (556 543 553 523 589 567) — CLOSED@ merged: the owner-clone tracking ref and Vercel deployment meta show them on master (two lenses, S150 16:3xZ); scout ls-remote 9cb7fefc… is the third lens (17:23Z).
- 26 · (S149 tail) — CLOSED@SLIP-PUSH-DOC-REPO-S150-1 (3247fce4…, 17:27:08Z); the row stays open for the S150 tail (see row 26).
- 38 · A24 v1_3 FINAL — CLOSED@OWNER-APPROVAL-S150-A24-V1_3-FINAL-1 ("v1_3 onay", 2026-09-21 19:43 TSI).
- 42 · governed-param publish surface — CLOSED@OWNER-RULING-S150-PARAMS-UI-ONLY-TODAY-1 ("Today UI-only but tomorrow entire system parameters will be configurable/backup/restored through env files"); second half → row 45.
- 43 · master anchor — CLOSED@ scout ls-remote + merge-base (see ANCHOR).
- 44 · bootstrap ORDERS wording — CLOSED@ S150 grep: docs/ground/CARD-PREFLIGHT-v1.md prescribes no "## ORDERS" heading for notices (one lens; v151 text already corrected).

## §2 · THE WHOLE LIST (penalty date 22 Eylul 2026)
| # | Work | State at cut | Next |
|---|---|---|---|
| 1 | AG-4 address repair | CLOSED S143 | — |
| 2 | BENCH-A2A-1 | FROZEN | — |
| 3 | BENCH-RESET-1 | FROZEN | — |
| 4 | BENCH-BACKEND-MOUNT-1 | FROZEN | — |
| 5 | Channel-2 BM25+RRF | open; MUST specify TR analyzer (K15); folds into A24 P2; M-b (item-5 analyzer in the project box) not yet read | after P1-C |
| 6 | tau/beta rows + calibration | SUPERSEDED-BY A24 v1_3 K9/K25 | A24 P3 |
| 7 | Resolved parent -> child layer | witness by proxy (S149); determinism UNMEASURED | K31 inside A24 P1 |
| 8 | ③ typer | ABSENT | open |
| 9 | L5 miss ledgers | ABSENT | open |
| 10 | Pre-LLM time slot | unchanged; K29 production calendar joins it | A24 P0/P3 |
| 11 | Vector origin repair | CLOSED S146 | — |
| 12 | Vector stable address | CLOSED S146 | — |
| 13 | Converge association failing since 09-11 | one read away | open |
| 14 | Redis credential rotation | owner | owner (candidate for the item-46 machine pattern) |
| 15 | Takeover ordering + self-takeover + own-worktree | v2 RED (scout 2026-09-20); v3 not cut; needs a measured ownness proof | v3 → scout when a scout window is idle |
| 16 | ruleset:drift gh -> curl | open | small card |
| 17 | F-B scout status writer | open | read with LAND-FIVE slip |
| 18 | actionlint on workflows | open | small card |
| 19 | tsx IPC EPERM in lane windows; bridge needs ESBUILD_BINARY_PATH each session (re-fetched S149 and S150) | open | small card |
| 20 | Five stale record PRs + vector report PR | CLOSED S150 (§1) | — |
| 21 | Two S141 product bugs | unmeasured | after P1 |
| 22 | OPA runtime | recon only | open |
| 23 | Delete scripts/land.ts | open | small card |
| 24 | Owner witness: oven 7-day stoppages | owner | owner |
| 25 | S143 closing carriers | CLOSED | — |
| 26 | Every document in the doc repo | S150: pushed through 3247fce4…; card v2/v3 commits + S150 close set LOCAL | NOTICE-PUSH-DOC-REPO-S150-2 (on the bus) → slip → Architect update-ref |
| 27 | Bench persona | FROZEN | — |
| 28 | MKB questions routed to ARMES | measure first | after 21 |
| 29 | Scout API 401 after /clear | CLOSED S145 | — |
| 30 | NODE_USE_ENV_PROXY for lane node fetch; S150: scout mail-wait "initialize: fetch failed" in sandbox, proxied retry refused by classifier (F-S150-SCOUT-MAILWAIT-FETCH-FAILED-1) | open | small card, after P1-B |
| 31 | CP-3 accepts RELAYED/RECALLED | open | small card |
| 32 | Worktree hygiene | open | small card |
| 33 | Executing lens for workflow tests | open | small card |
| 34 | Lanes create no poll task | CLOSED S147 | — |
| 35 | REGISTER-BUG-BUCKET v58 | stale since S141 | small card |
| 36 | Vector parity 3/15 | measured; input to 5 | — |
| 37 | Doc-push tracking ref unwritable by lane | standing; Architect update-ref after each push (done S150 → 3247fce4…) | standing |
| 38 | A24 v1_3 owner approval | CLOSED S150 (§1) | — |
| 39 | A24 P0 measurements | M-e MEASURED S150 (router ignores frame.metrics). OPEN: M2 MKB corpus (credentialed lane) · M3′ qdrant→stage 03 replay · M-a held-out counts (messages via Supabase MCP readable; Langfuse not reached) · M-b item-5 analyzer (project box search) · M-c RBAC scope filter second lens (admin userManagement.ts) · M-d ARMES production day · M-f Q4 re-ask with the valve open (owner) · resultStore handle threshold for the 39 KB stops payload · stage-12 verdict text Q3/Q4 | Architect in S151 (M-a, M-b, M-c, threshold, verdict text); owner M-f with the Q3 witness; M2/M3′ lane |
| 40 | A24 P1 wave | P1-A: CARD-A24-P1A-NUMERIC-GUARD-S150-1-v3 at AG-4 (bus 18:05:21Z), AG-4 booted | S151: read AG-4 slip/PR → scout adversary on the PR head → CI green → land ≤30 min → Vercel READY → owner re-asks Q3 |
| 40b | NEW · A24 P1-B executor v0 (plan runner over the locked set; aggregate_records for every aggregate; partial≠complete stamps; extends turn/planner.ts) | not cut; NEW subject → scout | after P1-A lands |
| 40c | NEW · A24 P1-C routing-exam skeleton + K17 entry tool + K24/cwf.trace.v1 fields + held-out source; first golden case Q3/Q4; router maps frame.metrics (F-S150-ROUTER-IGNORES-FRAME-METRICS-1) | not cut; NEW subject → scout | after P1-B |
| 40d | NEW · A24 P2 (channel-2 retrieval with K15 analyzer = item 5), P3 (LLM JSON DAG planner, conformal K9/K25 = item 6, K29 calendar), P4–P5 per v1_3 §9 | not started | after P1 |
| 41 | Web valve OPEN in production (web.enabled v2=1, 05:50:50Z) | live; spend/behaviour unobserved; Q4 not re-asked | owner re-asks Q4 (M-f) with the Q3 witness |
| 42 | Lane cannot publish agent params | CLOSED S150 (§1) → 45 | — |
| 43 | Master anchor | CLOSED S150 (§1) | — |
| 44 | Bootstrap ORDERS wording | CLOSED S150 (§1) | — |
| 45 | NEW · All system parameters configurable/backup/restore through env files (OWNER-RULING-S150-PARAMS-UI-ONLY-TODAY-1, second half: "tomorrow") | design not started; today params are UI-only, no lane publishes | design card after P1 (must keep secrets env-only and governed data behind the gated admin path) |
| 46 | NEW · cwf_lane password rotation as a machine task (F-S150-LANE-PRINTED-DB-URL-1; owner approval "lane şifre onay") | approved design: AG-4 generates the password locally, posts only the SCRAM verifier, Architect runs ALTER ROLE via Supabase MCP, AG-4 updates its own env; no human types a secret | card at S151 open; DUE 2026-09-22 |
| 47 | NEW · Dead folder connection in this chat ("2026 -YAPRA--…" mount) (F-S150-DEAD-FOLDER-CONNECTION-1) | the app lists it; unused; forbidden path | owner opens S151 as a NEW task with exactly two folders — 2026-09-22 |
| 48 | NEW · Q4 digest has no cwf.grounding span (F-S150-Q4-NO-GROUNDING-SPAN-1) | cause UNMEASURED; named in P1-A card | read in the P1-A report; repair card if defect |
| 49 | NEW · device_commit_files stale content / no overwrite (F-S150-DEVICE-COMMIT-STALE-CONTENT-1) | mitigated: md5 the device copy after every commit | standing |

## §3 · FINDINGS CARRIED BY NAME (bucket merge not ruled)
F-S150-ROUTER-IGNORES-FRAME-METRICS-1 (→40c) · F-S150-PROSE-NUMBERS-UNSOURCED-1 (→40) · F-S150-Q4-NO-GROUNDING-SPAN-1 (→48) · F-S150-DOC-REPO-PATH-MOVED-1 (CLOSED) · F-S150-DEAD-FOLDER-CONNECTION-1 (→47) · F-S150-LANE-PRINTED-DB-URL-1 (→46) · F-S150-SCOUT-MAILWAIT-FETCH-FAILED-1 (→30) · F-S150-SCOUT-FOUND-SIX-BLOCKERS-PREFLIGHT-FOUND-NONE-1 (standing) · F-S150-BRIDGE-GIT-STATUS-LEAVES-INDEX-LOCK-1 (CLOSED by practice) · F-S150-PATH-FROM-CONNECTION-RECORD-1 (CLOSED by rule) · F-S150-UNQUOTED-HEREDOC-EVALUATED-BACKTICKS-1 (CLOSED by rule) · F-S150-DEVICE-COMMIT-STALE-CONTENT-1 (→49) · F-S150-CARD-MEASURED-AT-AHEAD-OF-CLOCK-1 (standing) · F-S150-HEX-BAND-TRIPS-ON-TIMESTAMPS-1 (standing). Full text: CWF-S150-FINDINGS-v1.

## §4 · ONE ORDER FOR S151 AND AFTER
46 (card at open; due 09-22) ∥ 40 P1-A landing (scout adversary on the PR head → land ≤30 min → Vercel READY → owner Q3 witness + M-f Q4) → 39 remainder the Architect can do itself → 40b P1-B → 40c P1-C → 15 v3 (when a scout window is idle) → 30 → 40d P2 with 5 (K15) → 21 → 28 → small cards 31 32 33 35 16 18 19 23 → 13 → 8 9 10 → 45 design → 40d P3 (6, 10). Owner: 14, 24, 47 (new task, two folders), M-f. Frozen: 2 3 4 27.

## §5 · CARRIERS AT CUT
CLAUDE-PROJECT-INSTRUCTIONS v5_10 · CWF-S150-SESSION-OPEN-v1 · A24-V1_3-ARCHITECT-CAPTURE-S150-1-v1 · CWF-S150-SESSION-CLOSE-v1 · CWF-S150-FINDINGS-v1 · CWF-SESSION-GRAPH-KB-v150 (appends v149, v147) · register v139 (this) · REGISTER-BUG-BUCKET v57 (STALE, item 35) · cwf-sota-definition v1_5 · A24 v1_3 (FINAL, approved) · CARD-A24-P1A-NUMERIC-GUARD-S150-1-v3 · CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v152 (cut LAST). Every carrier's version is current for S150; none older than S149.

END · cwf-open-items-register-v139
