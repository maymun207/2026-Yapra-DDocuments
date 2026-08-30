# S127-FINDINGS-ADDENDUM-1 — the budget-fence apply, and what the anomaly panel led to
<!-- CUT 2026-08-30 ~02:5xZ, mid-session. Written WHOLE (A-REC-S101-7). All times UTC.
     Everything below is MEASURED unless explicitly marked hypothesis/unverified. -->

## 1 · GO-LANDING-S126-2 CLOSED — all three ruled AWS mutations are in the world

- Owner merged #486 by his own hand at 02:06:33Z (mergedBy=maymun207, mergeCommit
  `d8895114744dbb23ba5633d726a0814cfe0468d5`) — PLATINUM-BREACH-S126-1 EXERCISED and closed;
  durable cure (land.ts steel, GATE-1 ⓶/v127 ⓷) still queued.
- Worker filed GO-LANDING-S126-2-AG5-report-ITEM3 at 02:11:16Z: fresh fence read projected
  148.76 → scout falsifier (d) did NOT fire; default-false apply gate observed shut live;
  the apply dispatch was then REFUSED by the worker window's harness classifier — the lane
  stopped per CLAUDE.md §6 and did not route around.
- Architect ruled: the apply is owner-hand work (live spend-control mutation incl. a delete —
  S102-YASA-1 witnessing surface). Owner dispatched from the forge Actions tab.
- Run 1: FAILED at first mutation — AccessDenied budgets:UpdateBudgetAction (exit 254,
  nothing changed). Run 2 (after first IAM grant): mutation 1 landed (stop 125→160 on
  b1151db3…, live instance), FAILED at mutation 2 — AccessDenied **budgets:ModifyBudget**
  (AWS gates CreateNotification under ModifyBudget, not under a fine-grained verb).
- Owner attached inline policy `cwf-budget-fence-apply` to IAM user `cwf-langfuse-bootstrap`
  (final verb set: ModifyBudget · UpdateBudgetAction · DeleteBudgetAction · CreateNotification
  · CreateSubscriber, resource-scoped to budget EAIP_Budget_1 and its actions).
- Run 3 GREEN, witnessed by owner: **A0 PASS "(1 action(s) total)" — the stale-action DELETE
  is proven by the count dropping 2→1 · A1 PASS (stop 160 vs projected 148.76) · A2 PASS
  (152 ABSOLUTE_VALUE → 1 subscriber) · A3/A4/A5 PASS · [OK] every assertion passed.**
- **THE BUDGET FENCE IS NO LONGER RED. v127 agenda item ⓶ is closed.**

Findings from this arc:
- **F-S127-APPLY-PRINCIPAL-LACKS-BUDGET-VERBS-1** — the apply path landed and armed with a
  principal that never held the mutation verbs; measured verb set now known (incl. the
  ModifyBudget umbrella). This is the CP-11 (AWS verbs) lens' full justification: a preflight
  that compares a step's verbs against its principal's policy would have caught both failures
  before dispatch.
- **F-S127-APPLY-ECHOES-SUBSCRIBER-ADDRESS-1** — the apply step masks its own echo of the
  subscriber but prints the RAW update-budget-action API response, which carries the address
  in full; a transcript is a publication. Cure: pipe mutation responses through a jq filter.
- Carried from ITEM3: the projection-direction correction (step function; direction set by the
  day's spend vs the running mean — 151.14→148.76 at the 29→30 daysElapsed roll) and the
  observation that the harness refusal landed precisely on the only irreversible act.

## 2 · The cost-anomaly thread — a 24-cent panel led to a real infrastructure defect

Owner brought an AWS Cost Anomaly panel (Aug 17–18, +$0.24, service VPC). Architect's first
reading ("closed migration artifact, self-resolved") was HALF WRONG:

- **A-REC-S127-1** — the Architect read the anomaly detector's silence after Aug 18 as the
  cost having stopped. The CE read (owner-run) showed `EUC1-PublicIPv4:IdleAddress` at
  $0.12/day CONTINUING through the query window: the detector had merely adapted its
  baseline. Detector silence is not world silence (S117 class: silence is unreadable).
- **F-S127-IDLE-PUBLIC-IPV4-SINCE-BOX-SWAP-1** — an idle public IPv4 billed from the Aug 16
  box swap onward, measured by usage type.
- **F-S127-PERMANENT-EIP-DETACHED-1** — describe-addresses showed the idle address was
  `52.57.7.5` ITSELF: the "permanent" EIP was never re-associated after the swap. The live
  box ran on an auto-assigned ephemeral IP (3.66.236.142).
- **F-S127-CF-ORIGIN-PINNED-TO-EPHEMERAL-DNS-1** — CloudFront E1PRI6MRV1924J's origin was
  pinned to the ephemeral `ec2-3-66-236-142…` DNS name. Working today, guaranteed to break
  on the box's first stop/start — and the budget stop action's whole job is stopping this
  box. The seed's "Elastic IP 52.57.7.5 (kalıcı)" premise was FALSE in the world from
  Aug 16 until this session.

## 3 · The cure, applied by the owner's hand (named consent, CloudShell), in order

1. `associate-address` eipalloc-06cea56e00667658b → i-057e5737f7ce02c52 —
   AssociationId `eipassoc-02ca640bbf330a209` returned.
2. CloudFront origin updated to `ec2-52-57-7-5.eu-central-1.compute.amazonaws.com`
   (get-distribution-config → jq DomainName patch → update-distribution with ETag —
   UPDATE-ACCEPTED).
3. Verification: `curl https://dl3644f5a7fnn.cloudfront.net/api/public/health` → **200**.

Post-state: the world matches the seed again (52.57.7.5 permanent AND attached); the idle
IPv4 charge ends; the box now survives stop/start with a stable address, so a future
budget-stop firing no longer severs Langfuse ingest. Residual: the 200 was read minutes
after UPDATE-ACCEPTED while the distribution may still have been propagating — a repeat
health read after full deploy is cheap confirmation, not a blocker.

## 4 · For the ledger re-entry card (v127 ⓸), add to its list

F-S127-APPLY-PRINCIPAL-LACKS-BUDGET-VERBS-1 · F-S127-APPLY-ECHOES-SUBSCRIBER-ADDRESS-1 ·
F-S127-IDLE-PUBLIC-IPV4-SINCE-BOX-SWAP-1 · F-S127-PERMANENT-EIP-DETACHED-1 ·
F-S127-CF-ORIGIN-PINNED-TO-EPHEMERAL-DNS-1 · A-REC-S127-1 · the ITEM3 projection-direction
correction · the card-structure deadlock the worker named in GO-LANDING-S126-2-AG5-report
(after-refusal clause vs the one-row rule) · infra docs: budget-fence.json's declared fence
now reflects stop 160 in the world (the repo declaration predates it — verify which document
declares thresholds and whether it needs the 160/152 update in a carded change).

<!-- END · S127-FINDINGS-ADDENDUM-1 -->
