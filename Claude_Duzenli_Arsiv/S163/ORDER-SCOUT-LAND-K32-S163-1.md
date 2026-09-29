<!-- relay-audit: v1 kind=notice -->
ORDER-SCOUT-LAND-K32-S163-1

LANE: scout-1 (first order to the NEW address; migration 20260929030000 applied 06:14Z, Architect-verified: scout_reply(p_reply_to, p_from, p_artifact_name, p_body) · factory_state scout-1/scout-2 CLOSED 06:14:30Z)
fanout: personalized (one lane, one body)
FROM: Architect, S163, 2026-09-29T06:20Z
AUTHORITY: OWNER-APPROVAL-S163-PLAN-1 (item 6, the tour question) · OWNER-RULING-S162-GET-IT-DONE-1 (one open PR at a time) · §12.8 (thirty minutes to master).
NO CRON TASK. GRAFT: graft first. SECURITY: never print, echo, printenv or cat any environment variable.
MEASURED by the Architect at 06:12Z (owner's clone, remote-tracking refs refreshed by the lanes): origin/master = ee12161ecad43b338489e85fcb73df1e08aa8ac0 (PR 636). Branch phase/k32-routing-obligation-s163-1 = 6783a4ae6e060ae4e40eb2e0fd9249c99458dc42, ONE commit, parent ed033de062dfc869850a35e40f1b39094dd24ea3; files ed033de0..ee12161e ∩ files ed033de0..6783a4ae = EMPTY SET. AG-1 took CARD-OPEN-PR-K32-S163-1 at 06:12:04Z and opens the PR from that branch unchanged. The PR number is NOT measured by the Architect — you measure it.
CARD YOU REVIEWED: CARD-K32-ROUTING-OBLIGATION-S163-1 (your SCOUT-STATUS-REVIEW-CARD-K32-S163-1, bus fa4f90a9, RED R1–R12, all applied in v2). This order is the CODE review.
BASELINE RULING to check, not trust: CARD-K32-BASELINE-RULING-S163-1 — system/code 864→866 and system/tests 791→801 are `...buildRoutingObligationKindDefs(NON_SYSTEM_BACKEND_IDS)` in kinds.ts and `backendId: 'system'` in selfSeedReconciler.ts (the platform lane, same shape as existing lines), not a tenant backend.
WAIT BUDGET: Build and Test ≈17.5–18 min; TWELVE named waits of 2 min.
GUARD RULES (scripts/mergeGuard.mjs at master): MERGE-HAND-EDIT L260-290 rehearses only commits with >= 2 parents (L261); COLLISION L494-L526 reads open PRs only; FENCE-GREW compares the FIRST commit's fence.

## ORDER
1. `gh pr list --state open --json number,headRefName,headRefOid` → exactly ONE open PR, headRefName phase/k32-routing-obligation-s163-1, headRefOid 6783a4ae6e060ae4e40eb2e0fd9249c99458dc42. Anything else: STOP, RED with what you saw. `git ls-remote origin refs/heads/master` read twice → ee12161ecad43b338489e85fcb73df1e08aa8ac0.
2. `git log --format='%H %P' origin/master..6783a4ae6e060ae4e40eb2e0fd9249c99458dc42` → ONE commit, ONE parent. Diff set vs the FILE-FENCE of docs/relay/CARD-K32-ROUTING-OBLIGATION-S163-1-AG1-report.md at head: both differences (expected ∅ ∅).
3. Baseline: `git diff ed033de0 6783a4ae -- data/gates/backend-names-baseline.json` shows ONLY system/code 864→866, system/tests 791→801 and their file attributions; grep the grown lines and CONFIRM or FALSIFY the ruling. `git grep -n -E "armes|ARMES|Armes|superset|machine-knowledge-base|getCookedStockAndon|pişmiş|pismis|cooked"` over the non-test changed paths → any NEW occurrence is RED (NO-HARDCODE; card F3).
4. Content review (S43-2 ≤60 s fast gate; no migration in this PR — confirm none): your R1–R12 each CLOSED or OPEN by byte at head; the obligation door never removes a tool and never adds one not in the catalogue; the new kind is owner-published only (no self-seed instances); UI shows "veri yok" for empty, never 0.
5. CI at 6783a4ae6e060ae4e40eb2e0fd9249c99458dc42 by full sha, zero read twice (S101-L1): Auto-merge landing · report-schema · Relay corpus · Build and Test all success; eval-canary skipped by design (name it). Quote the `[merge-guard] VERDICT` line. In progress → NAMED wait (`WAITING Build and Test at 6783a4ae… <time>`, sleep 120) at most TWELVE times.
6. If 1–5 clean and CI 4/4 success: post adversary/scout success on 6783a4ae6e060ae4e40eb2e0fd9249c99458dc42; NAMED wait for the landing (master read every 60 s, at most ten) and print the merge sha.
7. REPLY scout_reply with p_from 'scout-1' as SCOUT-STATUS-LAND-K32-S163-1, first line `ADVERSARY-VERDICT: GREEN|RED pr=<n> head=6783a4ae6e060ae4e40eb2e0fd9249c99458dc42 · LANDED merge=<40-hex>` (or CI PENDING / NOT-LANDED). ALSO write the same bytes to "2026 - Yapra - DDocuments/Claude_Duzenli_Arsiv/S163/SCOUT-STATUS-LAND-K32-S163-1.md". Then back to `node scripts/mail-wait.mjs scout-1 --budget-min 480`.
FORBIDDEN: no edit, push, merge, re-run, dispatch, cron, migration apply; never print an environment value.

END · ORDER-SCOUT-LAND-K32-S163-1
