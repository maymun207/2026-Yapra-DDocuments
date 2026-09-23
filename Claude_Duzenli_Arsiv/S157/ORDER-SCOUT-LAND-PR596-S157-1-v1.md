<!-- relay-audit: v1 kind=notice -->
ORDER-SCOUT-LAND-PR596-S157-1-v1

LANE: scout (scout-2 window; fresh window, one order)
fanout: personalized (one lane, one body)
FROM: Architect, S157, bridge clock 2026-09-23T03:50Z
OWNER APPROVAL: OWNER-RULING-S153-NO-ARMES-HARDCODE-1; S157 plan approval "onay" 2026-09-23 06:49 TSI (item 58 G1b lands on scout GREEN plus CI GREEN).
NO POLL OR CRON TASK. Bekleme dongusu yok. When your status is written, stop.
GATE-NOTE: written with a STEPS section.
GRAFT: code context from graft first; your status carries a GRAFT line.
WHAT: adversary landing review of PR 596 (CARD-ARMES-G1B-REMAINDER-S156-1-v3, AG-4) and the adversary/scout status on the head that will land; plus one read-only log read (step 5).

## PREMISE
MEASURED: 2026-09-23T03:46Z, Architect bridge, GitHub API pulls/596: open, head b6de1efd9a12236901e8319c256f2f5d900a0970, base 1ca28ede61588ff542764cf3f1375568c94436ae (= master), 24 files, auto-merge armed.
MEASURED: 2026-09-23T03:46Z, actions/runs?head_sha=b6de1efd9a12236901e8319c256f2f5d900a0970 read twice: total 4; Auto-merge landing, report-schema, Relay corpus success; Build and Test in_progress.
MEASURED: 2026-09-23T03:45Z, pulls/596/files vs pulls/597/files: overlap 0 paths.
UNMEASURED: AG-4's slip SLIP-ARMES-G1B-REMAINDER-S156-1 is not on the bus; read the report on the branch.
UNMEASURED: whether PR 597 (merge guard) lands first. If master has moved past 1ca28ede61588ff542764cf3f1375568c94436ae when you read, the strict ruleset needs AG-4 to merge origin/master: write your verdict on content and print "needs master merge", do not post.
SELF-INVALIDATION: dies if PR 596 is closed or its head is not b6de1efd9a12236901e8319c256f2f5d900a0970 or a descendant.
ON-DISAGREEMENT: YOUR READING WINS: print both values, continue with yours.

## STEPS
1. Print git ls-remote for master and refs/pull/596/head (full 40-hex).
2. REVIEW the diff against master in every non-doc file, against the v3 card and the delta your colleague named in SCOUT-STATUS-REVIEW-CARD-ARMES-G1B-REMAINDER-S156-1-v2 (bus 2026-09-23T02:38:21Z). Hostile questions: (a) no backend, vendor or tenant name added in code paths; case-sensitive armes|Armes|ARMES count over touched files before and after; (b) backend-specific data only under data/backends/<id>/ loaded by id (OWNER-RULING-S156-DATA-BACKENDS-1); (c) fail-closed: unreadable knowledge gives no data answer and says so (OWNER-RULING-S156-FAIL-CLOSED-1); (d) no user-visible function removed; for every removed code copy, name what it protected and where that protection now lives; (e) the report's FILE-FENCE block: QUOTE it verbatim, and every changed path is inside it.
3. Read CI at the CURRENT head by full sha; read a zero twice; SKIPPED is named. If Build and Test is still running, write the status with the review verdict and "status not posted, CI running".
4. If 1-3 are clean and every required context is green: post adversary/scout on that head. If the harness refuses the POST, print the refusal class verbatim and stop.
5. READ-ONLY: the scheduled workflow budget-fence concluded failure on its 2026-09-21 and 2026-09-22 runs (actions/runs?branch=master, MEASURED 03:46Z). Read the failing step's log of the most recent run; print the step name, the failing lines verbatim, and whether it is a code, config or credential failure. No fix, no re-run.
REPLY (on the bus): SCOUT-STATUS-LAND-PR596-S157-1, first line `ADVERSARY-VERDICT: GREEN|RED pr=596 head=<40-hex>`, then findings, the quoted FILE-FENCE, CI runs by name, whether the status was posted, the budget-fence reading, the GRAFT line.
FORBIDDEN: no edit, no push, no merge, no re-run, no poll task, no cron; never print an environment value.

END · ORDER-SCOUT-LAND-PR596-S157-1-v1
