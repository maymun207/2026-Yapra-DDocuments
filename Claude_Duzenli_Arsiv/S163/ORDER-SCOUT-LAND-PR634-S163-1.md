<!-- relay-audit: v1 kind=notice -->
ORDER-SCOUT-LAND-PR634-S163-1

LANE: scout (the scout-1 window; scout-2 does NOT run this order — if you are scout-2, print "NOT MINE: scout-1 order" and stop)
fanout: personalized (one lane, one body)
FROM: Architect, S163, 2026-09-29T02:11Z
AUTHORITY: OWNER-APPROVAL-S163-PLAN-1 ("onay S163-plan", 05:06 TSİ) · OWNER-RULING-S162-GET-IT-DONE-1 (one open PR at a time).
NO CRON TASK. GRAFT: graft first. SECURITY: never print, echo, printenv or cat any environment variable.
WHAT: two parts. PART A lands PR 634. PART B measures YOUR OWN loop so the Architect can repair it (the owner's order this session: the Architect <-> lane loop must be two-way for every window, scouts included).
MEASURED by the Architect at 2026-09-29T02:11Z: PR 634 (AG-1, branch phase/lane-sandbox-allowances-s163-4, head 46a7b124a32c0ef31bf2e40864458754c0ecd191) is the ONLY open PR; ONE commit, parent 3d2f06a58c708cfc0c7f06fe9dac62c45a118cbd (= master, Merge PR #633), 8 paths; auto-merge armed; Auto-merge landing · report-schema · Relay corpus SUCCESS; Build and Test in_progress. It carries PR 631's content (cherry-pick of b2ebe011) — the CONTENT of 629/631 you measured in S162 (SCOUT-STATUS-MEASURE-PR629-GUARD-S162-1, SCOUT-STATUS-MEASURE-PR631-GUARD-S162-1); the card CARD-LANE-SANDBOX-ALLOWANCES-S161-1-v2 was reviewed (SCOUT-STATUS-REVIEW-CARD-LANE-SANDBOX-ALLOWANCES-S161-1-v1).
GUARD RULES (scripts/mergeGuard.mjs at master): MERGE-HAND-EDIT L260-290 rehearses ONLY commits with >= 2 parents (L261); COLLISION L494-L526 reads open PRs only (none other); FENCE-GREW compares the fence of the FIRST commit.

## PART A — LAND PR 634
1. `git fetch origin` · `git ls-remote origin refs/pull/634/head refs/heads/master` read twice, print both. Expected head 46a7b124a32c0ef31bf2e40864458754c0ecd191 and master 3d2f06a58c708cfc0c7f06fe9dac62c45a118cbd; if either moved, print both and STOP (RED: moved).
2. `git log --format='%H %P' origin/master..46a7b124a32c0ef31bf2e40864458754c0ecd191` → exactly ONE commit, ONE parent = 3d2f06a5. Quote.
3. `git diff --name-only origin/master...46a7b124a32c0ef31bf2e40864458754c0ecd191` vs the scope fence in docs/relay/LANE-SANDBOX-ALLOWANCES-S161-1-AG1-report.md at head: print both sets and both differences (expected ∅ ∅). Content equality with what you measured: `git diff b2ebe011cae56130bf772339207847810725d90d 46a7b124a32c0ef31bf2e40864458754c0ecd191 -- .claude/settings.json api/cwf/__tests__/laneWriteTransport.test.ts docs/ops/LANE-SANDBOX.md scripts/checkGroundTruth.ts scripts/laneWrite.mjs scripts/mail-wait.mjs` → expected EMPTY; the report differs only by the FRESH-BRANCH line; package.json: `git diff 3d2f06a58c708cfc0c7f06fe9dac62c45a118cbd 46a7b124a32c0ef31bf2e40864458754c0ecd191 -- package.json` must show ONLY 631's changes (every "scripts" key of master still present — print key counts before/after). RED only on a named byte.
4. Security read (full, not fast-gate): .claude/settings.json diff (sandbox keys only; nothing that widens network isolation — RULING-S161-TRUSTD-NARROW-1: enableWeakerNetworkIsolation NOT authorised) and scripts/laneWrite.mjs diff (no credential printed or logged; proxy CONNECT auth read from env only).
5. CI at 46a7b124a32c0ef31bf2e40864458754c0ecd191 by full sha, read twice (S101-L1). Expected: Auto-merge landing · report-schema · Relay corpus · Build and Test — all success; eval-canary skipped by design (name it). Quote the `[merge-guard] VERDICT` line. If Build and Test is in_progress: NAMED wait — print `WAITING Build and Test at 46a7b124… <time>`, `sleep 120`, re-read; at most SIX times; then print "CI PENDING after 12 min" and skip step 6.
6. If 1–5 are clean and CI 4/4 success: post adversary/scout success on 46a7b124a32c0ef31bf2e40864458754c0ecd191; then ONE read of master: print whether auto-merge landed and the merge sha.

## PART B — MEASURE YOUR OWN LOOP (read-only; no code, no DB write other than the ones named)
7. `node scripts/mail-wait.mjs scout --read ORDER-SCOUT-LAND-PR634-S163-1 --take` — quote every [STAMP…] line and the exit code. Then name the PRINCIPAL your stamp attempt used (read path supabase-ro? write connection cwf_lane? absent?) from the lines printed — do not guess.
8. How does YOUR scout_reply reach the bus? Name the script and the connection/principal it uses (read the source you run; quote file:line). If scout_reply writes with a principal that could also call relay_mark_consumed, say so; if not, say which grant is missing.
9. `node scripts/mail-wait.mjs scout --pre-watermark` → quote the header line (watermark value and why) and the COUNT of unconsumed scout rows below and above it. The Architect measured: factory_state has a scout row, state CLOSED, changed_at 2026-08-23T23:59:25Z — so the watermark floor for scout is August and every unstamped scout row since then re-delivers. Confirm or falsify with the printed line.
10. Two scout windows share the address 'scout' (relay_inbox_lane_addr_check allows only AG-1..AG-5, operator, scout). Grep the consumers of that list (`git grep -n "relay_inbox_lane_addr_check\|BOX_ADDR\|LANE_ADDR"` and migrations) and list every file that would need to change to add 'scout-1' and 'scout-2' as addresses. Do not change anything.

## REPLY
scout_reply as SCOUT-STATUS-LAND-PR634-S163-1, first line `ADVERSARY-VERDICT: GREEN|RED pr=634 head=46a7b124a32c0ef31bf2e40864458754c0ecd191` (or `CI PENDING`), then PART A, then a section `## LOOP-MEASURE` with steps 7–10. ALWAYS ALSO write the same bytes to "2026 - Yapra - DDocuments/Claude_Duzenli_Arsiv/S163/SCOUT-STATUS-LAND-PR634-S163-1.md" and print its sha256. Then STOP (do not re-enter mail-wait: step 9 predicts it re-delivers old rows).
FORBIDDEN: no edit, no push, no merge, no re-run, no dispatch, no cron, no DB write except the stamp attempt of step 7 and your scout_reply; never print an environment value.

END · ORDER-SCOUT-LAND-PR634-S163-1
