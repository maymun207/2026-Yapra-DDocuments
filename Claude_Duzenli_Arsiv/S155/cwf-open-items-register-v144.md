# cwf-open-items-register-v144

APPEND-ONLY. Cut mid-S155, 2026-09-22 ~15:35Z (18:35 TSI), on the owner's request ("session 145'ten itibaren kontrol ederek final açık items tablosu"). Supersedes v143. THE WHOLE LIST, one row per item, no "as vN" shorthand (cure for F-S155-OPEN-LIST-TOOK-DELTA-REGISTER-ONLY-1). Items leave only by CLOSED@evidence / SUPERSEDED-BY / MERGED-INTO.
METHOD: registers v134, v135, v136, v137, v138, v139, v140, v141, v142, v143 read in full; findings S145, S146, S147, S149, S151, S152, S153, S154 read in full; S148 retro close read; S150 findings read through register v139 §3 (all mapped there). Every finding not mapped to a numbered row was mapped below or given a new number.
ANCHOR: origin/master fdb0df24d0b9dd288223fec55da4185f4ca62382 (GitHub API 15:01Z; PR 593 merged 12:46:02Z); Vercel production READY on it. Doc repo origin/main a1273232d7435f6f8f14f7332d60acdafe3cd12d (SLIP-PUSH-DOC-REPO-S155-1); later S155 commits LOCAL.

## §1 · CLOSED SINCE v143, BY EVIDENCE
- 58 G1a-1 - CLOSED@ PR 593 merge fdb0df24d0b9dd288223fec55da4185f4ca62382 + scout GREEN (SCOUT-STATUS-LAND-PR593-S154-1) + Vercel READY. CI on the merge sha: total_count 0, read twice = UNMEASURED.
- 65 - CLOSED@ OPERATOR-RESULT-S155-ITEM65-1 (operator output + Architect read 15:16:43Z: armes-new enabled=false, retired).
- 26 (S154 part) - CLOSED@ SLIP-PUSH-DOC-REPO-S155-1 (ls-remote a1273232d7435f6f8f14f7332d60acdafe3cd12d); row open for later S155 commits.

## §2 · THE WHOLE LIST (owner deadline: all of A24 by Wednesday 2026-09-23 evening TSI; no functionality removed)
| # | Work | State now | Next · when |
|---|---|---|---|
| 1 | AG-4 address repair | CLOSED S143 | - |
| 2 3 4 27 | Bench: A2A · RESET · BACKEND-MOUNT · persona | FROZEN (OWNER-RULING-S143-FREEZE-BENCH-1) | owner unfreezes |
| 5 | Channel-2 BM25+RRF, TR analyzer K15 | MERGED-INTO 40d | - |
| 6 | tau/beta | SUPERSEDED-BY A24 K9/K25 (40d P3) | - |
| 7 | Resolved parent -> child layer | three repairs on master (S147); determinism UNMEASURED | K31 in A24 P1 · 2026-09-23 |
| 8 | typer | ABSENT | card after 13 · 2026-09-23 |
| 9 | L5 miss ledgers | ABSENT | card after 13 · 2026-09-23 |
| 10 | Pre-LLM time slot + K29 calendar (F-S149-TODAY-IS-CALENDAR-DAY-1) | open | 40d P3 |
| 11 12 | Vector repair / address | CLOSED S146 | - |
| 13 | Converge association failing since 09-11 | one read away | Architect read · 2026-09-23 morning |
| 14 | Redis credential rotation | owner decision | owner |
| 15 | Takeover order + self-takeover + own worktree (+F-S146-SHARED-CLONE-RACE-1) | v2 RED; v3 not cut | v3 -> scout when one is idle · 2026-09-23 |
| 16 | ruleset:drift gh -> curl | open | small card · 2026-09-23 |
| 17 | Scout bus status writer (+F-S146-PR587-MERGED-BEFORE-SCOUT-STATUS-1, F-S152-SCOUT-BUS-WRITE-BLOCKED-1, F-S154-SCOUT-STATUS-LOST-IN-OUTAGE-1) | open; recurs in outages | small card, before 55 · 2026-09-23 |
| 18 | actionlint | open | small card |
| 19 | tsx IPC EPERM; bridge esbuild per session | open; see 66 | MERGED-INTO 66 |
| 20 | Stale record PRs | CLOSED S150 | - |
| 21 | Two S141 product bugs | unmeasured | measure after P1 · 2026-09-23 |
| 22 | OPA runtime | recon only | open |
| 23 | Delete scripts/land.ts | open | small card |
| 24 | Owner witness: oven 7-day stoppages | owner | owner |
| 25 | S143 carriers | CLOSED | - |
| 26 | Every document in the doc repo | S155 commits after a1273232d7435f6f8f14f7332d60acdafe3cd12d LOCAL | push notice with next AG-4 card |
| 28 | Document/company questions routed to ARMES (F-S153-DOC-QUESTION-MODEL-CHOSE-ARMES-1) | G1a-1 landed; G1a-2 in review | replay + M2 after G1a-2 lands · 2026-09-23 |
| 29 | Scout API 401 | CLOSED S145 | - |
| 30 | Lane node fetch ignores proxy (+F-S146-LANE-WRITE-PATH-ENOTFOUND-1, F-S151, F-S154) | CARD-LANE-FETCH-PROXY-S155-1-v2 at AG-4 (bus 15:10:59Z) | PR -> land · 2026-09-23 morning |
| 31 | CP-3 accepts RELAYED/RECALLED | open | small card |
| 32 | Worktree/branch hygiene | open | own card |
| 33 | Executing lens for workflow tests | open | small card |
| 34 | Lanes create no poll task | CLOSED S147 | - |
| 35 | REGISTER-BUG-BUCKET v58 (v57 stale since S141) | open | small card |
| 36 | Vector parity 3/15 | input to 40d P2 | - |
| 37 | Doc-push tracking ref | standing; done S155 -> a1273232d7435f6f8f14f7332d60acdafe3cd12d | standing |
| 38 | A24 v1_3 approval | CLOSED S150 | - |
| 39 | A24 P0 remainder: M-a counts · M-b item-5 analyzer · M-c RBAC second lens · M-d production-day definition · handle threshold · stage-12 verdict text · M2/M3′ (lane) | open; M-b and M-d had dropped out of the row text after v139 and are restored | Architect 2026-09-23 morning; M2 with 28 |
| 40 | A24 P1-A | CLOSED S153 | - |
| 40b | A24 P1-B inline aggregates / executor deterministic half (+F-S153-TOOL-FANOUT-34-CALLS-1) | card v2 in AG-4 box, cut on an older master | re-measure, AG-4 after 30 · 2026-09-23 |
| 40c | A24 P1-C: C1 CLOSED; C2 K24 fields -> C3 routing exam (golden: F-S149-SCRAP-TOOL-NOT-OFFERED-Q3-1) -> C4 held-out -> C5 K17 entry tool -> canary | C2 not cut | C2 -> scout -> AG-1 after G1a-2 · 2026-09-23 |
| 40d | A24 P2-0...P2-6 (items 5, 36, 51) · P3 (DAG planner, K9/K25, K28 A3 template F-S149-A3-TEMPLATE-ABSENT-1, K29, scope sentence F-S149-SCOPE-REFUSES-IN-DOMAIN-SYNTHESIS-1, K30 web) · P4 · P5 | cards not cut | P2-0/P2-1 -> scout-2 -> AG-2 · 2026-09-23 |
| 40e | PARAMS card | not cut | after 40b |
| 41 | Web valve open; Q4 not re-asked (M-f) | live | owner |
| 42-44 | CLOSED S150 | - | - |
| 45 | All params via env files configure/backup/restore | design not started | after P1 |
| 46 | cwf_lane password rotation | v5 at scout (ORDER bus 15:08:02Z); DUE was 2026-09-22 (missed) | scout GREEN -> AG-4 -> Gemini ALTER before 2026-09-23 12:00 TSI |
| 47 48 | CLOSED S151 / MERGED-INTO 54 | - | - |
| 49 | device_commit_files stale content | standing | standing |
| 50 | Grouped payload recordCount + handle first group | open | AG-4 card after 40b |
| 51 | Tokenizer camelCase-after-fold | open | P2-0 |
| 52 | Bridge git locks | mitigated | standing |
| 53 | Wave 3 workers + 2 scouts | AG-2 not yet booted | with the first P2 GREEN card |
| 54 | Digest span cap | CLOSED S154 | - |
| 55 | Lane bus-wake hook | v4 not cut | after 17 · 2026-09-23 afternoon |
| 56 | Hook timeouts are seconds | open | after 55 |
| 57 | Landing queue starvation | CLOSED S153 | - |
| 58 | NO ARMES HARDCODE (top rule): G0 CLOSED, G1a-1 CLOSED; G1a-2 v2 at scout (bus 15:09:08Z); G2 knowledge to data; G3 tests/fixtures; G4 CI grep gate incl. public/, case-sensitive (F-S154-CASE-INSENSITIVE-ARMES-GREP-HITS-CLEARMESSAGES-1, F-S154-G4-SCOPE-MISSES-PUBLIC-1); 62 inside G1 | in flight | G1a-2 land; G2+G3+G4 by 2026-09-23 evening |
| 59 | Stamp false positive on method-name numerals | open | small card · 2026-09-23 |
| 60 | Recalled claim written as measured | open | with 59 |
| 61 | Prose says all when calls were dropped | open | small card · 2026-09-23 |
| 62 | Canned split advice | inside 58 G1 | with 58 |
| 63 | Architect GitHub read + graft on bridge | working | standing |
| 64 | noRuntimeApiImport misses dynamic imports | open | small card · 2026-09-23 |
| 65 | armes-new retired but enabled | CLOSED S155 (§1) | - |
| 66 | NEW · tsx IPC EPERM makes mail-wait preflight UNMEASURED: cards delivered UNCHECKED in sandboxed windows (scout 15:07:41Z); absorbs 19 | open | small card: every tsx entry via node --import tsx · 2026-09-23 |
| 67 | NEW (restored) · consumed_at / reply surface: an unstarted and a working lane look identical on the bus (F-S144/F-S145-SCOUT-REPLY-INVISIBLE-UNTIL-SLIP-1); relay_mark_consumed exists but today's rows carry consumed_at null (27 of 166 rows in 3 days stamped, measured 15:2xZ); unnumbered since S145 | open | small card: lane boot stamps consumed on read · with 55 |

## §3 · FINDINGS CARRIED BY NAME
All findings S145-S154 by name, each mapped above; standing ones: F-S150-CARD-MEASURED-AT-AHEAD-OF-CLOCK-1 (recurred S155: forward timestamps in cards), F-S150-HEX-BAND-TRIPS-ON-TIMESTAMPS-1, F-S150-SCOUT-FOUND-SIX-BLOCKERS-PREFLIGHT-FOUND-NONE-1, F-S151-SCOUT-GATE-ONE-ADDRESS-1, F-S152-ANTIGRAVITY-CC-HAS-NO-SESSION-ID-ENV-1.
NEW S155: F-S155-OPEN-LIST-TOOK-DELTA-REGISTER-ONLY-1 (the side panel was built from v143's changed rows only; owner caught it) · F-S155-CP-SYMLINK-SILENT-GREEN-1 (cardPreflight run through a symlink prints nothing and exits 0; run by real path; caught by a planted fault).
OUTSIDE THE S145 WINDOW, NOT A NUMBERED ROW: project instructions section 9 GATE-1 agenda (steel of the merge exception, ADF-ARCHITECTURE-v2 landing, foreman observation path, pre-dispatch preflight hook, P-9) is S133 text; status UNMEASURED; owner ruling needed whether it stays open.

## §5 · CARRIERS
CLAUDE-PROJECT-INSTRUCTIONS v5_10 · CWF-S154-SESSION-CLOSE-v1 · CWF-S154-FINDINGS-v1 · CWF-SESSION-GRAPH-KB-v154 · register v144 (this) · CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v156 · A24 v1_3 · REGISTER-BUG-BUCKET v57 (STALE, 35).
END · cwf-open-items-register-v144
