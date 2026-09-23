<!-- relay-audit: v1 kind=notice -->
ORDER-SCOUT-LAND-PR610-S158-1-v1

LANE: scout (scout-2 window; fresh window, one order)
fanout: personalized (one lane, one body)
FROM: Architect, S158, bridge clock 2026-09-23T05:31Z
OWNER APPROVAL: OWNER-APPROVAL-S157-BUDGET-AND-ROTATION-1 ("onay bütçe 200/180 + şifre rotasyonu", 2026-09-23 07:04 TSI), which names this PR's master push.
NO POLL OR CRON TASK. Bekleme dongusu yok. When your status is written, stop.
GATE-NOTE: written with a STEPS section. cardPreflight NOT run on this order (card gate not rebuilt on the bridge at S158 open); say so if your mail-wait refuses it.
GRAFT: code context from graft first; your status carries a GRAFT line.
WHAT: adversary landing review of PR 610 (CARD-BUDGET-FENCE-200-180-S157-1-v2, AG-4) and the adversary/scout status on the head that will land. This is the FIRST PR judged by the landed merge guard (PR 597).

## PREMISE
MEASURED: 2026-09-23T05:28Z, Architect bridge, GitHub API pulls/610: open, head b795a7977e7c7fde3d8fcc8bb989844e4894fb07, mergeable_state blocked, auto-merge armed; 3 files: .github/workflows/budget-fence.yml, docs/relay/BUDGET-FENCE-200-180-S157-1-AG4-report.md (added), infra/aws/BUDGET-FENCE.md.
MEASURED: compare master edc7e880213ec1d872483d5c239b54f9046c1466...head: ahead 4, behind 0 (master merge already done by AG-4; no AG-4 slip for it on the bus).
MEASURED: 2026-09-23T05:30Z actions/runs?head_sha=<head>: total 4; Auto-merge landing, Relay corpus, report-schema success; Build and Test in_progress (build (24.x) at "Run tests"; the last two PR runs took 14 and 16 min).
MEASURED: commit status at head: only "Vercel success (Canceled by Ignored Build Step)"; NO adversary/scout status. Ruleset required contexts: changes, rule26, build (24.x), relay corpus (grammar v1), adversary/scout; strict.
MEASURED: the budget stop already ran from the branch: SLIP-BUDGET-DISPATCH-S157-1 (bus 05:04:07Z), stop 200, warning 180. Last SCHEDULED budget-fence on master (2026-09-22T12:32Z) = failure; this PR is what makes the scheduled run green.
SELF-INVALIDATION: dies if PR 610 is closed or its head is not b795a7977e7c7fde3d8fcc8bb989844e4894fb07 or a descendant. If master moved past edc7e880213ec1d872483d5c239b54f9046c1466, write the verdict on content and print "needs master merge", do not post.
ON-DISAGREEMENT: YOUR READING WINS: print both values, continue with yours.

## STEPS
1. Print git ls-remote for master and refs/pull/610/head (full 40-hex).
2. REVIEW the diff against card v2. Hostile questions: (a) budget-fence.yml: stop 200, warning 180, idempotent; the scheduled trigger unchanged; permissions minimal; no secret echoed; (b) the report's FILE-FENCE block: QUOTE it; every changed path is inside it; (c) QUOTE the merge guard's own lines from this PR's Build and Test log (FENCE / class lines it prints); a missing line is RED; (d) every check that cannot look prints UNMEASURED and fails, never passes.
3. Read CI at the CURRENT head by full sha; read a zero twice; SKIPPED is named. If Build and Test is still running, wait by re-reading the run (no poll task; at most 10 reads, 60 s apart), then continue.
4. If 1-3 are clean and every other required context is green: post adversary/scout on that head. Auto-merge is armed; print whether master moved after your post. If the harness refuses the POST, print the refusal class verbatim and stop.
REPLY (on the bus): SCOUT-STATUS-LAND-PR610-S158-1, first line `ADVERSARY-VERDICT: GREEN|RED pr=610 head=<40-hex>`, then findings, the quoted guard lines and FILE-FENCE, CI runs by name, whether the status was posted, master sha after, the GRAFT line.
FORBIDDEN: no edit, no push, no merge, no re-run, no poll task, no cron; never print an environment value.

END · ORDER-SCOUT-LAND-PR610-S158-1-v1
