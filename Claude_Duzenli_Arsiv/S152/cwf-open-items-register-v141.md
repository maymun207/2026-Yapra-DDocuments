# cwf-open-items-register-v141

APPEND-ONLY. Cut at S152 close, 2026-09-21 ~21:15Z (00:15 TSI 2026-09-22). Supersedes v140 (S151). Every item listed, one row each; items leave only by CLOSED@evidence / SUPERSEDED-BY / MERGED-INTO.
ANCHOR: origin/master 9cb7fefc947745bec1fdd97aff62d58c34c47919 (scout-2 ls-remote 20:32Z, 20:51Z, 20:54Z). Vercel production last READY 20c1651c3fb59b48490670ffefed02099d684ed9 (#588) — MEASURED S152 (Vercel MCP 20:07Z and 21:04Z). Doc repo origin/main f529ea0bed76222d2d3bd65b80f316ea6038d103 (SLIP-PUSH-DOC-REPO-S151-2 ls-remote); local ahead by the S152 commits.

## §1 · CLOSED IN S152, BY EVIDENCE (carry-diff against v140)
- 26 (S151 part) — CLOSED@ SLIP-PUSH-DOC-REPO-S151-2 (ls-remote f529ea0b…, 20:04:13Z); row stays open for S152 commits.
- 48 — MEASURED and root-caused: the Q4 digest has no cwf.grounding span because digestBuilder.ts:160-166 drops every span after the 20th silently (F-S152-DIGEST-SPAN-CAP-DROPS-TAIL-SILENTLY-1). Row MERGED-INTO 54 (the fix).

## §2 · THE WHOLE LIST (owner deadline: all of A24 implemented by Wednesday 2026-09-23 evening TSI; no functionality removed)
| # | Work | State at cut | Next |
|---|---|---|---|
| 1 | AG-4 address repair | CLOSED S143 | — |
| 2 | BENCH-A2A-1 | FROZEN | — |
| 3 | BENCH-RESET-1 | FROZEN | — |
| 4 | BENCH-BACKEND-MOUNT-1 | FROZEN | — |
| 5 | Channel-2 BM25+RRF, TR analyzer (K15) | MERGED-INTO 40d (S151) | P2-0/P2-1 |
| 6 | tau/beta rows + calibration | SUPERSEDED-BY A24 v1_3 K9/K25 | A24 P3 |
| 7 | Resolved parent -> child layer | witness by proxy (S149); determinism UNMEASURED | K31 inside A24 P1 |
| 8 | ③ typer | ABSENT | open |
| 9 | L5 miss ledgers | ABSENT | open |
| 10 | Pre-LLM time slot | unchanged; K29 calendar joins it | A24 P3 |
| 11 | Vector origin repair | CLOSED S146 | — |
| 12 | Vector stable address | CLOSED S146 | — |
| 13 | Converge association failing since 09-11 | one read away | open |
| 14 | Redis credential rotation | owner | owner |
| 15 | Takeover ordering + self-takeover + own-worktree | v2 RED; v3 not cut | when a scout is idle |
| 16 | ruleset:drift gh -> curl | open | small card |
| 17 | F-B scout status writer — RECURRED S152: scout-2 could not post its hook-v3 status (F-S152-SCOUT-BUS-WRITE-BLOCKED-1) | open, now blocking | small card S153, before hook v4 lands |
| 18 | actionlint on workflows | open | small card |
| 19 | tsx IPC EPERM; bridge esbuild each session (re-fetched S152) | open | small card |
| 20 | Stale record PRs | CLOSED S150 | — |
| 21 | Two S141 product bugs | unmeasured | after P1 |
| 22 | OPA runtime | recon only | open |
| 23 | Delete scripts/land.ts | open | small card |
| 24 | Owner witness: oven 7-day stoppages | owner | owner |
| 25 | S143 closing carriers | CLOSED | — |
| 26 | Every document in the doc repo | pushed through f529ea0b…; S152 commits LOCAL | NOTICE-PUSH-DOC-REPO-S152-1 (bus, at close) |
| 27 | Bench persona | FROZEN | — |
| 28 | MKB questions routed to ARMES | measure first | after 21 |
| 29 | Scout API 401 after /clear | CLOSED S145 | — |
| 30 | Lane node fetch ignores sandbox proxy | open | small card, AG-4, 2026-09-22 |
| 31 | CP-3 accepts RELAYED/RECALLED | open | small card |
| 32 | Worktree/branch hygiene (S151 baseline) | open | own card |
| 33 | Executing lens for workflow tests | open | small card |
| 34 | Lanes create no poll task | CLOSED S147 | — |
| 35 | REGISTER-BUG-BUCKET v58 | stale since S141 | small card |
| 36 | Vector parity 3/15 | input to P2 | — |
| 37 | Doc-push tracking ref unwritable by lane | standing; Architect update-ref after each push (done S152 → f529ea0b…) | standing |
| 38 | A24 v1_3 owner approval | CLOSED S150 | — |
| 39 | A24 P0 measurements | M-e done; remainder open | Architect: M-a counts, M-c, handle threshold, stage-12 text; M2/M3′ lane; M-f owner |
| 40 | A24 P1-A numeric guard | PR #590 head 1bdcc0ab6bd43ddb22e4425db2d0352867f015c8; scout-1 on ORDER-SCOUT-LAND-PR590-S151-1-v1 since 23:44 TSI; NO status at close | lands on scout GREEN under OWNER-APPROVAL-S152-LANDINGS-1 → Vercel READY → owner flips grounding.numericMode=stamp → Q3 |
| 40b | A24 P1-B inline aggregates | CARD v2 in AG-4's box, waits for #590 | after #590; LANDINGS-1 |
| 40c | A24 P1-C: C1 DONE — PR #591 head 50a3aa2a02e22a57c042f0c4838bdc9c57ee1773, CI success; ORDER-SCOUT-LAND-PR591-S152-1-v1 queued for scout-1 → C2 K24 → C3 → C4 → C5 → canary | #591 green, awaiting scout | #591 lands on scout GREEN (LANDINGS-1); AG-1 next: C2 card |
| 40d | A24 P2 (P2-0…P2-6), P3, P4, P5 | P2 recon done; cards NOT cut | P2-0/P2-1 → scout-2 → AG-2 first boot |
| 40e | PARAMS card | not cut | AG-4 after P1-B |
| 41 | Web valve open in production | live; Q4 not re-asked | owner M-f |
| 42–44 | CLOSED S150 | — | — |
| 45 | All params configurable/backup/restore via env files | design not started | after P1 |
| 46 | cwf_lane password rotation | approved; DUE 2026-09-22; card NOT cut; ALTER ROLE via Gemini operator | S153 first cards; on LANDINGS-1 |
| 47 | Dead folder connection | CLOSED S151 | — |
| 48 | Q4 digest has no cwf.grounding span | MERGED-INTO 54 (S152) | — |
| 49 | device_commit_files stale content | recurred twice S152; mitigation (temp name + mv + md5) held | standing |
| 50 | Grouped payload recordCount / handle first group | open | AG-4 card, 2026-09-22 |
| 51 | Tokenizer camelCase-after-fold | open | P2-0 |
| 52 | Bridge git leaves locks on commit | mitigated (rename into .git/stale-locks/) | standing |
| 53 | Wave: three workers + two scouts | WAVE-A24-PARALLEL-PLAN-S151-1-v1 | AG-2 boots with its first GREEN card |
| 54 | NEW · Digest span cap: silent tail drop | CARD-DIGEST-SPAN-CAP-S152-1-v2 at AG-4 (bus 2026-09-21T20:58:20Z, EXEMPT, ack = scout RED row) | AG-4 PR → scout → land (LANDINGS-1) |
| 55 | NEW · Lane bus-wake hook (the owner is the wake today) | v3 RED by scout-2 (00:09 TSI, relayed, not on bus): M1 last boot not first + refuse two addresses · M2 re-anchor on re-boot · M3 per-session lock, newest Stop wins · M4 mail-wait stderr to log, absolute path, --no-warnings · M5 fs.writeSync(2,…) + process.exitCode=2 · edits M6, R1, R2 | v4 applies them verbatim, EXEMPT → AG-4, S153; lands on LANDINGS-1 |
| 56 | NEW · Hook timeouts are seconds (graft 8000/10000/15000) | F-S152-HOOK-TIMEOUTS-ARE-SECONDS-1 | small card after 55 (same file) |
| 57 | NEW · Landing queue is starved by idle scout tabs | measured S152 (#590 order unread ~55 min, then no status in 90 min) | S153 opens by ordering the scout on every green PR before any card (A-ERR-S152-PROCESS-OVER-PRODUCT cure); 55 removes the idle-tab cause |

## §3 · FINDINGS CARRIED BY NAME
All of CWF-S152-FINDINGS-v1 by name; all of CWF-S151-FINDINGS-v1 and v140 §3 stand.

## §4 · ONE ORDER FOR S153
LANDINGS FIRST: read the bus for scout-1's #590 status; #590 → #591 land on scout GREEN (LANDINGS-1); Vercel READY; owner flips numericMode → Q3 witness · 17 (scout bus writer) → 55 v4 → AG-4 · 54 PR review → land · 46 card (operator route) · AG-1: P1-C2 card · P2-0/P2-1 → scout-2 → AG-2 · 40b P1-B → 40e → 50 → 30 → 56 · 39 remainder · small cards 31 32 33 35 16 18 19 23 · 13 → 8 9 → 21 → 28 → 45. Owner: 14, 24, M-f. Frozen: 2 3 4 27.

## §5 · CARRIERS AT CUT
CLAUDE-PROJECT-INSTRUCTIONS v5_10 · CWF-S152-SESSION-CLOSE-v1 · CWF-S152-FINDINGS-v1 · CWF-SESSION-GRAPH-KB-v152 (appends v151) · register v141 (this) · REGISTER-BUG-BUCKET v57 (STALE, item 35) · A24 v1_3 (FINAL) · WAVE-A24-PARALLEL-PLAN-S151-1-v1 · RECON-A24-P1C-P2-S151-1-v1 · OWNER-APPROVAL-S152-LANDINGS-1 · CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v154 (cut LAST).

END · cwf-open-items-register-v141
