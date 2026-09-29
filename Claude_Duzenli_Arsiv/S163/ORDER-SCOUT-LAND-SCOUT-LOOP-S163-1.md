<!-- relay-audit: v1 kind=notice -->
ORDER-SCOUT-LAND-SCOUT-LOOP-S163-1

LANE: scout (the scout-1 window ONLY; scout-2 prints "NOT MINE: scout-1 order" and stops)
fanout: personalized (one lane, one body)
FROM: Architect, S163, 2026-09-29T04:14Z
AUTHORITY: OWNER-APPROVAL-S163-PLAN-1 (item 4, two-way loop) · OWNER-RULING-S162-GET-IT-DONE-1 (one open PR at a time) · §12.8 (thirty minutes to master).
NO CRON TASK. GRAFT: graft first. SECURITY: never print, echo, printenv or cat any environment variable.
MEASURED by the Architect at 2026-09-29T04:13Z (owner's clone, remote-tracking refs refreshed by the lanes): branch phase/scout-loop-s163-2 = 15b2b1e14cb4fe0d41839570138d6a4abb1ebc36, ONE commit, parent ed033de062dfc869850a35e40f1b39094dd24ea3 (= master, PR 635's landing), 12 files, 868+/36-. It is AG-3's CARD-SCOUT-LOOP-S163-1-v3 carried onto a fresh branch under CARD-SCOUT-LOOP-RULING-AND-PR-S163-1 (bus 1bfd1e1f), which moved the RULED_NONCLAIMING_AUTHORS widening in scripts/authorityMatrix.mjs to POST-LANDING-1 (the live snapshot cannot admit scout-1/scout-2 before the operator applies the migration). `git diff ed033de0 15b2b1e1 -- scripts/authorityMatrix.mjs` is EMPTY. The PR number is NOT measured by the Architect (no GitHub read here) — you measure it.
You reviewed this card's subject yourself as SCOUT-STATUS-REVIEW-CARD-SCOUT-LOOP-S163-1 (bus 3e8bf097). This order is the CODE review.
WAIT BUDGET: Build and Test measured 17.5–17.8 min; TWELVE named waits of 2 min.
GUARD RULES (scripts/mergeGuard.mjs at master): MERGE-HAND-EDIT L260-290 rehearses only commits with >= 2 parents (L261); COLLISION L494-L526 reads open PRs only; FENCE-GREW compares the FIRST commit's fence.

## ORDER
1. `gh pr list --state open --json number,headRefName,headRefOid` → exactly ONE open PR, headRefName phase/scout-loop-s163-2, headRefOid 15b2b1e14cb4fe0d41839570138d6a4abb1ebc36. Anything else (a second open PR, a moved head, no PR): STOP, RED with what you saw. `git ls-remote origin refs/heads/master` read twice → ed033de062dfc869850a35e40f1b39094dd24ea3.
2. `git log --format='%H %P' origin/master..15b2b1e14cb4fe0d41839570138d6a4abb1ebc36` → ONE commit, ONE parent. Diff set vs the FILE-FENCE of docs/relay/CARD-SCOUT-LOOP-S163-1-AG3-report.md at head: both differences (expected ∅ ∅). Carry fidelity: `git diff a4d21a7a8a9f0411c1380b708d1cb02fdc702aeb 15b2b1e14cb4fe0d41839570138d6a4abb1ebc36 -- . ':!docs/relay' ':!docs/ground' ':!public/architecture'` restricted to the 12 changed paths → only the authorityMatrix widening and its test pin removed; name any other byte.
3. SECURITY FULL READ (S43-2, migration = always full): supabase/migrations/20260929030000_scout_addresses_and_reply_ack.sql. Check and quote: scout_reply keeps SECURITY DEFINER with a pinned search_path; every live refusal and the 8192 cap are kept; SR001 fires when p_from is not the card's lane_addr; the grant set equals the live one (no NEW role gains EXECUTE); relay_adversary_gate_check differs from 20260911180000 ONLY at the two scout tests; the DO block that drops the lane checks raises unless exactly one constraint matches; nothing destructive to data (no DELETE/TRUNCATE/UPDATE of existing relay rows). ≤60 s fast gate for mail-wait.mjs / busDelivery.ts / adversaryGate.mjs / free.md: an AG-n address's SQL is byte-identical to master (mailWaitScoutAck.test.ts pins it — confirm the test exists and asserts it).
4. NO-HARDCODE: `git grep -n -E "armes|ARMES|Armes|superset|machine-knowledge-base"` over the 12 paths → any NEW occurrence in non-test source is RED.
5. CI at 15b2b1e14cb4fe0d41839570138d6a4abb1ebc36 by full sha, zero read twice (S101-L1): Auto-merge landing · report-schema · Relay corpus · Build and Test all success; eval-canary skipped by design (name it). Quote the `[merge-guard] VERDICT` line. Build and Test in_progress → NAMED wait (`WAITING Build and Test at 15b2b1e1… <time>`, sleep 120) at most TWELVE times.
6. If 1–5 clean and CI 4/4 success: post adversary/scout success on 15b2b1e14cb4fe0d41839570138d6a4abb1ebc36; NAMED wait for the landing (master read every 60 s, at most ten) and print the merge sha.
7. REPLY scout_reply as SCOUT-STATUS-LAND-SCOUT-LOOP-S163-1, first line `ADVERSARY-VERDICT: GREEN|RED pr=<n> head=15b2b1e14cb4fe0d41839570138d6a4abb1ebc36 · LANDED merge=<40-hex>` (or CI PENDING / NOT-LANDED). ALSO write the same bytes to "2026 - Yapra - DDocuments/Claude_Duzenli_Arsiv/S163/SCOUT-STATUS-LAND-SCOUT-LOOP-S163-1.md". Then STOP.
FORBIDDEN: no edit, push, merge, re-run, dispatch, cron; NO migration apply (operator only, after landing); never print an environment value.

END · ORDER-SCOUT-LAND-SCOUT-LOOP-S163-1
