<!-- relay-audit: v1 kind=notice -->
ORDER-SCOUT-LAND-PR635-S163-1

LANE: scout (the scout-1 window ONLY; scout-2 prints "NOT MINE: scout-1 order" and stops)
fanout: personalized (one lane, one body)
FROM: Architect, S163, 2026-09-29T02:53Z
AUTHORITY: OWNER-APPROVAL-S163-PLAN-1 (plan item 3) · OWNER-RULING-S162-GET-IT-DONE-1 (one open PR at a time) · OWNER-RULING-S153-NO-ARMES-HARDCODE-1.
NO CRON TASK. GRAFT: graft first. SECURITY: never print, echo, printenv or cat any environment variable.
MEASURED by the Architect at 2026-09-29T02:53Z: PR 635 (AG-4, branch phase/e1a-exam-sets-and-bar-s163-5, head 7fc4ba96c6d5c453d874d21a25b36fdd9b15a506) is the ONLY open PR; ONE commit, parent 1a6279e0c3eddf5ac331b38f5c028b5f17668690 (= master, Merge PR #634); 34 paths = PR 632's 33 + data/gates/backend-names-baseline.json; auto-merge armed; Auto-merge landing · report-schema · Relay corpus SUCCESS; Build and Test in_progress. It carries PR 632's content (CARD-E1A-EXAM-SETS-AND-BAR-S162-1-v4, whose card you reviewed as SCOUT-STATUS-REVIEW-CARD-E1A-V3-S161-1) — the CODE has NOT been landing-reviewed before: this order is that review.
BASELINE RULING you must check, not trust: NOTICE-PR632-BASELINE-RULING-S163-1 (Architect): system/code 859→864 and system/tests 787→791 are the English word "system" and the existing helper fetchSystemParamRows (resolveExamPolicy.ts L4, L14, L27, L69; agentParams.ts L335), not a backend reference.
WAIT BUDGET (A-REC-S163-1, the Architect's error in ORDER-SCOUT-LAND-PR634): Build and Test measured 17.5 min (PR 633) and 17.8 min (PR 634). This order allows TWELVE named waits of 2 min.
GUARD RULES (scripts/mergeGuard.mjs at master): MERGE-HAND-EDIT L260-290 rehearses only commits with >= 2 parents (L261); COLLISION L494-L526 reads open PRs only; FENCE-GREW compares the FIRST commit's fence.

## ORDER
1. `git fetch origin` · `git ls-remote origin refs/pull/635/head refs/heads/master` read twice. Expected head 7fc4ba96c6d5c453d874d21a25b36fdd9b15a506, master 1a6279e0c3eddf5ac331b38f5c028b5f17668690; moved → STOP, RED: moved.
2. `git log --format='%H %P' origin/master..7fc4ba96c6d5c453d874d21a25b36fdd9b15a506` → ONE commit, ONE parent = 1a6279e0. Quote.
3. Diff set vs the scope fence of docs/relay/E1A-EXAM-SETS-AND-BAR-S161-1-AG4-report.md at head: both sets, both differences (expected ∅ ∅). Transplant fidelity: `git diff e61fd0c6894277b690a4df1b017175d0c47daedc 7fc4ba96c6d5c453d874d21a25b36fdd9b15a506 -- <the 31 paths other than docs/ground/facts.json, public/architecture/manifest.json and the report>` → expected EMPTY; name anything else by byte.
4. Baseline: `git diff 1a6279e0c3eddf5ac331b38f5c028b5f17668690 7fc4ba96c6d5c453d874d21a25b36fdd9b15a506 -- data/gates/backend-names-baseline.json` shows ONLY system/code 859→864, system/tests 787→791 and their file attributions. Then grep the grown lines yourself (`git grep -n -i system 7fc4ba96 -- api/cwf/_lib/knowledge/resolveExamPolicy.ts api/cwf/_lib/knowledge/reference/agentParams.ts`) and CONFIRM or FALSIFY the ruling: is any grown cell a real backend reference? Also `git grep -n -E "armes|ARMES|Armes|superset|machine-knowledge-base"` over the 34 paths — any NEW occurrence in non-test source is RED (NO-HARDCODE).
5. Content review (S43-2): FULL read of supabase/migrations/20260928180000_golden_specimens_exam_set.sql (schema change: additive? destructive? default values? RLS/grants?) and of api/admin/golden-specimens.ts + api/admin/health-analytics.ts (admin endpoints: auth check present? no secret in response?). ≤60 s fast gate for the rest; the UI files HealthTab.tsx / ReplayTab.tsx: the K25 line and exam curation render "veri yok" for empty, never 0 (empty ≠ zero). RED only on a named byte.
6. CI at 7fc4ba96c6d5c453d874d21a25b36fdd9b15a506 by full sha, read twice (S101-L1): Auto-merge landing · report-schema · Relay corpus · Build and Test all success; eval-canary skipped by design (name it). Quote the `[merge-guard] VERDICT` line. If Build and Test in_progress: NAMED wait (`WAITING Build and Test at 7fc4ba96… <time>`, sleep 120) at most TWELVE times.
7. If 1–6 clean and CI 4/4 success: post adversary/scout success on 7fc4ba96c6d5c453d874d21a25b36fdd9b15a506; then NAMED wait for the landing (master read every 60 s, at most ten) and print the merge sha.
8. REPLY scout_reply as SCOUT-STATUS-LAND-PR635-S163-1, first line `ADVERSARY-VERDICT: GREEN|RED pr=635 head=7fc4ba96c6d5c453d874d21a25b36fdd9b15a506 · LANDED merge=<40-hex>` (or CI PENDING / NOT-LANDED). ALSO write the same bytes to "2026 - Yapra - DDocuments/Claude_Duzenli_Arsiv/S163/SCOUT-STATUS-LAND-PR635-S163-1.md". Then STOP.
FORBIDDEN: no edit, push, merge, re-run, dispatch, cron; no migration apply; never print an environment value.

END · ORDER-SCOUT-LAND-PR635-S163-1
