<!-- relay-audit: v1 kind=notice -->
ORDER-SCOUT-LAND-PR597-S157-1-v1

LANE: scout (scout-1 window; fresh window, one order)
fanout: personalized (one lane, one body)
FROM: Architect, S157, bridge clock 2026-09-23T03:50Z
OWNER APPROVAL: OWNER-APPROVAL-S156-MERGE-GUARD-1; S157 plan approval "onay" 2026-09-23 06:49 TSI (item 81 lands on scout GREEN plus CI GREEN).
NO POLL OR CRON TASK. Bekleme dongusu yok. When your status is written, stop.
GATE-NOTE: written with a STEPS section.
GRAFT: code context from graft first; your status carries a GRAFT line.
WHAT: adversary landing review of PR 597 (CARD-MERGE-GUARD-CLEAN-MERGE-AND-FENCE-S156-1-v5, AG-2) and the adversary/scout status on the head that will land.

## PREMISE
MEASURED: 2026-09-23T03:46Z, Architect bridge, GitHub API pulls/597: open, head a8814be31b2bf4173ae82cc7bdda3c155cad443b, base 1ca28ede61588ff542764cf3f1375568c94436ae (= master), 8 files incl. .github/workflows/build-test.yml and scripts/land.ts, mergeable_state blocked, auto-merge armed.
MEASURED: 2026-09-23T03:46Z, actions/runs?head_sha=a8814be31b2bf4173ae82cc7bdda3c155cad443b read twice: total 4; Auto-merge landing, report-schema, Relay corpus success; Build and Test in_progress.
MEASURED: 2026-09-23T03:49Z, pulls?state=all: plant PRs 598-609, all draft, base phase/merge-guard-clean-merge-and-fence-s156-1, all closed, merged_at null for every one.
UNMEASURED: AG-2's slip SLIP-MERGE-GUARD-CLEAN-MERGE-AND-FENCE-S156-1 is not on the bus; read the report on the branch.
UNMEASURED: whether PR 596 lands first. If master has moved past 1ca28ede61588ff542764cf3f1375568c94436ae when you read, the strict ruleset needs AG-2 to merge origin/master: write your verdict on content and print "needs master merge", do not post.
SELF-INVALIDATION: dies if PR 597 is closed or its head is not a8814be31b2bf4173ae82cc7bdda3c155cad443b or a descendant.
ON-DISAGREEMENT: YOUR READING WINS: print both values, continue with yours.

## STEPS
1. Print git ls-remote for master and refs/pull/597/head (full 40-hex).
2. REVIEW the diff against the v5 card ORDERS 1-11. Hostile questions: (a) read EVERY build-test.yml hunk directly (card ORDER 6: pull_request runs the PR's own copy); job permissions exactly contents/pull-requests/issues read; (b) this PR's own Build and Test log must print GUARD-BOOTSTRAP (UNMEASURED) and GUARD-SELF-EDIT: QUOTE both lines verbatim; a missing line is RED; (c) scripts/land.ts keeps mergeTreeSha, isObjectMissing and judgeMergeTree byte-identical in behaviour and exported; landScript.test.ts and landSelfTest.ts unmodified; (d) for each plant PR 598-609 print the CLASS its Build and Test printed and its conclusion; the green control (598) must be green, every other red with its named class; any plant that passed is RED for this PR; (e) every check that cannot look prints UNMEASURED and fails, never passes; (f) the report's FILE-FENCE block: QUOTE it, and every changed path is inside it; (g) plant branches deleted per ORDER 9, or named.
3. Read CI at the CURRENT head by full sha; read a zero twice; SKIPPED is named. If Build and Test is still running, write the status with the review verdict and "status not posted, CI running".
4. If 1-3 are clean and every required context is green: post adversary/scout on that head. If the harness refuses the POST, print the refusal class verbatim and stop.
REPLY (on the bus): SCOUT-STATUS-LAND-PR597-S157-1, first line `ADVERSARY-VERDICT: GREEN|RED pr=597 head=<40-hex>`, then findings, the quoted GUARD lines and FILE-FENCE, the plant table, CI runs by name, whether the status was posted, the GRAFT line.
FORBIDDEN: no edit, no push, no merge, no re-run, no poll task, no cron; never print an environment value.

END · ORDER-SCOUT-LAND-PR597-S157-1-v1
