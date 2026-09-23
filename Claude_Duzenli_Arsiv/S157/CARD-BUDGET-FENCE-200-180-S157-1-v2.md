<!-- relay-audit: v1 kind=card -->
CARD-BUDGET-FENCE-200-180-S157-1-v2

LANE: AG-4 (fresh window: one card per window)
fanout: personalized (one lane, one body)
MEASURED-AT: 2026-09-23T04:20Z (bridge clock, date -u in the command that wrote this file)
OWNER APPROVAL: OWNER-APPROVAL-S157-BUDGET-AND-ROTATION-1, the owner's words "onay bütçe 200/180 + şifre rotasyonu", 2026-09-23 07:04 TSI. It names the spend ceiling and the master push of this card's PR.
SUPERSEDES: CARD-BUDGET-FENCE-200-180-S157-1-v1 (scout RED, SCOUT-STATUS-REVIEW-CARD-BUDGET-FENCE-200-180-S157-1-v1, bus 2026-09-23T04:12:20Z: "RED on two exact TEXT-ONLY edits (D1, D2); the design is sound"). Applied as edits, all and only the scout's D1 and D2, verbatim; the master anchor re-measured after PR 596.
ADVERSARY GATE: EXEMPT, the loop-breaking case of 12.1: same subject, only the scout's named delta (ack = the scout's RED row).

```evidence:adversary
ADVERSARY: EXEMPT
ack: e5414193-4405-4622-af60-0434a6a665bb
```
BRANCH: phase/budget-fence-200-180-s157-1 off origin/master · PUSH early · REPORT docs/relay/BUDGET-FENCE-200-180-S157-1-AG4-report.md · PR: yes, non-draft, report carries FILE-FENCE.
GRAFT: take code context from graft first; slip and report carry a GRAFT line.
DEADLINE: applied in AWS today, 2026-09-23. The stop would otherwise fire near 2026-09-28 (126.465 USD over 22 days, 5.75 per day, crosses 160 on about day 28).

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| master at cut time, after PR 596 | MEASURED: GitHub API commits/master, Architect bridge, 2026-09-23T04:20Z | master |
| the only write path is the dispatch-gated apply step, with the ruled numbers typed in it | MEASURED: git grep on origin/master, Architect bridge, 2026-09-23T04:21Z | apply |
| the fence is red on A1 and A2 since 2026-09-19 | READ: bus row SCOUT-STATUS-LAND-PR596-S157-1, 2026-09-23T03:58:12Z | red |

```evidence:master
3c930797178bd0246470c1db2aa30220d7d84f02
```

```evidence:apply
3c930797178bd0246470c1db2aa30220d7d84f02:.github/workflows/budget-fence.yml:45:      apply-thresholds:
3c930797178bd0246470c1db2aa30220d7d84f02:.github/workflows/budget-fence.yml:153:            --action-threshold ActionThresholdValue=160,ActionThresholdType=ABSOLUTE_VALUE
3c930797178bd0246470c1db2aa30220d7d84f02:.github/workflows/budget-fence.yml:174:            --notification NotificationType=ACTUAL,ComparisonOperator=GREATER_THAN,Threshold=152,ThresholdType=ABSOLUTE_VALUE \
3c930797178bd0246470c1db2aa30220d7d84f02:.github/workflows/budget-fence.yml:218:          if [ "$STALE_MATCHES" != "1" ]; then
3c930797178bd0246470c1db2aa30220d7d84f02:.github/workflows/budget-fence.yml:235:          aws budgets delete-budget-action \
```

```evidence:red
budget fence A1-stop-above-baseline: stop threshold 160 vs projected month 172.45 (actual 126.465 over 22d = 5.75/day x 30d; budget limit 150, AWS forecast 170.4)
budget fence A2-warning-before-stop: NO warning between the baseline 172.45 and the stop 160 carries a subscriber (4 notification(s) seen: 0.01/1sub, 101/1sub, 125/1sub, 152/1sub)
```

## PREMISE
MEASURED: the anchors above.
READ from the scout's v1 verdict (bus 2026-09-23T04:12:20Z): the stale stop action is ABSENT (one live action, on the declared instance, 160 ABSOLUTE_VALUE); the secrets are repo secrets and reach a same-repo branch dispatch. UNMEASURED by the Architect: whether the dispatch credential may run update-budget-action and create-notification today; whether a branch-ref dispatch reads the branch's copy of the workflow (it does by GitHub semantics; ORDER 3 prints it).
SELF-INVALIDATION: dies if the live stop threshold already reads 200, or the owner withdraws the approval.
ON-DISAGREEMENT: YOUR READING WINS: print both values, continue with yours, except anything that would touch a stop action other than the one on the declared instance: STOP.

## FALSIFIER
After the dispatch, the same job's measure + assert steps must print A1 PASS (stop 200 above the projected month) and A2 PASS (a subscribed warning at 180 between projected and stop). Any other stop action changed, the budget limit changed, or the declared instance changed: wrong, STOP.

## ORDERS
0. Read-only first: dispatch budget-fence on your branch ref with apply-thresholds=false is NOT needed; instead read the most recent scheduled run's measure step log and print the live actions as ActionId, threshold, target, and the notifications as NotificationType, ComparisonOperator, Threshold, ThresholdType and subscriber COUNT only. Decide from it whether the stale action is present.
1. In .github/workflows/budget-fence.yml, apply step only: stop threshold 160 -> 200; warning 152 -> 180; The create is made idempotent: before aws budgets create-notification, count the notifications already in $NOTIFS with jq '[.Notifications[] | select(.NotificationType=="ACTUAL" and .ComparisonOperator=="GREATER_THAN" and .Threshold==180 and .ThresholdType=="ABSOLUTE_VALUE")] | length'; 1 prints '=== warning at 180 already present, not created ===' and skips the create; 0 creates it; any other count is a refusal (exit 1). the dispatch input description and the step comments name OWNER-APPROVAL-S157-BUDGET-AND-ROTATION-1 alongside OWNER-RULING-S126-BUDGET-THRESHOLDS-1. Step 3 (stale delete): if ORDER 0 shows the stale action already absent, zero matches prints "stale stop action already absent, nothing deleted" and continues; one match keeps today's three guards and the delete; more than one stays a refusal. The zero-match branch sits at the STALE_MATCHES test; GUARD 1 and GUARD 2 stay where they are and run on every path. Nothing else in the file changes.
2. infra/aws/BUDGET-FENCE.md: add a dated section recording 200/180, the approval, and the measured burn (126.465 over 22 days). No other file.
3. Push. Dispatch budget-fence on ref phase/budget-fence-200-180-s157-1 with apply-thresholds=true (gh workflow run budget-fence.yml --ref <branch> -f apply-thresholds=true). Print: the run's head sha (full 40-hex), that the apply step ran, its three echo lines (the subscriber stays masked as the step prints it), and the measure + assert result lines for A0-A5 (the assert step PASS/FAIL lines only; never paste the measure step JSON, which carries the subscriber address unmasked).
4. If the credential is refused (AccessDenied): print the IAM action named and STOP; nothing is retried; the owner is told which permission.
5. npm run build (all five gates), the budgetFence test file, typecheck:api locally; open the PR with FILE-FENCE (.github/workflows/budget-fence.yml, infra/aws/BUDGET-FENCE.md, your report); slip SLIP-BUDGET-FENCE-200-180-S157-1 with branch, full head, PR number, the dispatch run by name and head, A1/A2 lines, CI runs by full sha. Stop.

## SHARED SURFACES
None. The AWS budget EAIP_Budget_1 in the account declared in infra/aws/budget-fence.json is changed only by the dispatch in ORDER 3.

## DECISION RIGHTS
The owner decided the numbers (200 stop, 180 warning) and that the automatic stop stays. AG-4 decides mechanics inside the one apply step.
FORBIDDEN: no budget limit change; no action target change; no instance mutation; no new secret; never echo the subscriber address unmasked; no poll task, no cron; never print an environment value; never merge your own PR.

END · CARD-BUDGET-FENCE-200-180-S157-1-v2
