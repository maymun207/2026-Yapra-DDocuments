<!-- relay-audit: v1 kind=notice -->
# NOTICE-FOREMAN-WINDOW-LOST-RESUME-1 · v1 — the previous AG-5 window was closed by the owner's hand after landing PR #465; take the address over by §1a, reclaim the row, close the landing card by evidence, and file the three owed reports

To the NEXT foreman window (AG-5). The window that landed PR #465 at 2026-09-05T01:22:37Z was closed by the owner by accident at about 01:4xZ. Owner's words, verbatim: "yanlislikla foreman ekranini kapatttim, be yapalim?". That sentence is the human confirmation the takeover class requires (factory_reclaim's comment: "corroboration lives outside the database in the boot walk and a human confirmation"). This notice ORDERS the takeover; it is not evidence of death — the boot's liveness lens and the owner's testimony are.

## PREMISE

MEASURED: 2026-09-05T01:40Z, live DB: factory_state row `AG-5` state `CLAIMED`, nonce_sha in the `dead` fence, heartbeat_at 01:21:55Z, silent since; `refs/remotes/origin/lane/AG-5` on the owner's clone = the same sha. The predecessor died holding both halves — the exact state `factory_claim` refuses (FW002) and `factory_reclaim` exists for.
MEASURED: 2026-09-05T01:30Z, Vercel: production `dpl_Bt4BX6tm89toXX7wgPftPtgQASHU` READY for master in the `landed` fence, merge subject "Merge pull request #465 … Land PR #465 at c46e78b5…", land.ts record: CI 6 jobs success/skipped, tree rehearsed, 5 paths. The owner's clone's `origin/master` reads the same forty hex.
MEASURED: 2026-09-05T01:30Z, bus: rows 75feca2c (CARD-LANDING-PROVENANCE-EXPORT-1-v3), 04b92021 (OWNER-APPROVAL-…-PR-465-2), 5d2538ec (SCOUT-REVIEW-PROVENANCE-EXPORT-1-v1 copy) all `consumed_at IS NULL` — the predecessor acted on them and died before stamping.
NOT-READ: whether the predecessor's three ORDER E reports exist on its disk; whether `relay_post_from_lane` is reachable from your window.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| the dead holder's nonce and row state | MEASURED: 2026-09-05T01:40Z factory_state + clone ref | dead |
| PR #465 landed; the landing card is CLOSED@evidence | MEASURED: 2026-09-05T01:30Z Vercel + clone | landed |
| the three unstamped rows | MEASURED: 2026-09-05T01:30Z bus | rows |

```evidence:dead
lane/AG-5 holder at window death (row CLAIMED, heartbeat 2026-09-05T01:21:55Z, then silence):
    62d8072995878d4d1a8a4fcfddb8033f99c8af3c
```

```evidence:landed
master after the landing (Vercel dpl_Bt4BX6tm89toXX7wgPftPtgQASHU READY):
    65b7e344ec0fe2c7ff10f28236b25d81ef6f6723
landed head (PR #465):
    c46e78b578f50f53f40d4f70b0d8ba4e28e6495b
```

```evidence:rows
75feca2c-6559-4b53-bfe7-a68ccf6f14dc  to_lane AG-5  CARD-LANDING-PROVENANCE-EXPORT-1-v3      created 2026-09-04T21:18:46Z
04b92021-9575-41c8-9ffa-30347de1663c  to_lane AG-5  OWNER-APPROVAL-S130-MASTER-PUSH-PR-465-2 created 2026-09-04T21:15:10Z
5d2538ec-9833-4600-af06-b4c30d6ca97a  to_lane AG-5  SCOUT-REVIEW-PROVENANCE-EXPORT-1-v1      created 2026-09-05T01:18:48Z
```

## ORDER A — TAKE THE ADDRESS (boot §1a, nothing beyond it)
Run the boot's §1a exactly: measure the holder (`git ls-remote origin refs/heads/lane/AG-5`, expect the `dead` fence), mint your nonce, push with the lease PINNED to the measured sha, read the ref back. Run the OWN-PID control and the liveness lens and PRINT them. If the process table shows a `claude` process that predates the dead nonce → STOP and report (a live holder is a live holder, whatever the owner remembers). Refused push → STOP, report.

## ORDER B — RECLAIM THE ROW (the third path)
`factory_claim` will refuse with FW002 because the row holds the dead nonce. Use the reclaim caller in `scripts/factoryState.mjs` (`reclaim(self, lane, deadNonceSha)`), naming the `dead` fence as the predecessor nonce and presenting YOUR nonce. The event row it writes is marked UNCORROBORATED-TAKEOVER by design; your report carries the corroboration: the owner's sentence above, the liveness lens output, the sha found and the sha written. Then heartbeat; run the remnant verdict (`renderRemnantVerdict`, excluding yourself) and print it — the factory mode row reads READY and should stay so.

## ORDER C — CLOSE THE LANDING CARD BY EVIDENCE; DO NOT LAND AGAIN
CARD-LANDING-PROVENANCE-EXPORT-1-v3 is CLOSED@evidence: master = `landed` fence. Confirm with `git ls-remote origin refs/heads/master` and `gh pr view 465 --json state,mergeCommit` (expect MERGED). Do NOT run `npm run land -- 465`; its ON-DISAGREEMENT clause ("PR #465 not OPEN") would fire correctly and waste a read. Stamp the three `rows` consumed with `relay_mark_consumed` (your box's rows, your stamps).

## ORDER D — THE THREE OWED REPORTS
`git worktree list` in the shared clone shows the predecessor's worktrees. Look in each `docs/relay/` for `LANDING-PROVENANCE-EXPORT-1-AG-5-report`, `LANDING-CI-BOUND-RULE26-1-AG-5-report`, `LANDING-CONTEXT-RETRIEVAL-1-AG-5-report`. For each: found → post it as a from_lane row via `relay_post_from_lane` (the verb foreman.md lists over `CWF_LANE_DATABASE_URL`); not found → write it yourself from the land.ts records (the merge subjects on master carry every field) and post it. If `relay_post_from_lane` is not reachable from your window, print the exact refusal or error text — the predecessor filed F-S130-NO-LANE-POST-CLI-1 claiming no posting path, while two AG-5 reports reached the bus on 09-03 and 09-04 as from_lane rows; which is true is a measurement, and it is yours.

## ORDER E — REPORT, THEN POLL
One from_lane row, artifact_name `FOREMAN-WINDOW-LOST-RESUME-1-AG-5-report`: ORDER A outputs (shas found/written, lens, control), ORDER B (reclaim result, event id, remnant verdict), ORDER C (master read-back, PR state, the three stamps), ORDER D (per report: found/written, row id, or the refusal text). Then your poll task per boot §2. The next card in your box will be a landing card for `phase/stale-fact-sweep-1` after the scout preflight; nothing else is pending for you.

## FALSIFIER
Wrong if `lane/AG-5` does not read the `dead` fence at ORDER A, if a live process predates it, if master does not read the `landed` fence, or if PR #465 is not MERGED.

## SHARED SURFACES
`lane/AG-5` ref (pinned lease, once). factory_state AG-5 row (reclaim, once) and its heartbeat. Three consumed stamps. Up to four from_lane rows. NO merge. NO push to any branch. NO migration. NO db push. NO file edited outside your own reports under docs/relay/ in your worktree.

## DECISION RIGHTS
None beyond STOP. The takeover is ordered here and confirmed by the owner's sentence; if either measurement in ORDER A contradicts it, the measurement wins and you stop.

BODIES: `S74-3` · `S102-YASA-1` · `S102-YASA-3` · `TOTAL-45` · `empty ≠ zero` · foreman.md §1a · PHASE-FACTORY-RECOVERY-1 (factory_reclaim) · OWNER-RULING-S130-CWF-FOCUS-ADF-FREEZE-1 · CARD-LANDING-PROVENANCE-EXPORT-1-v3 · A-REC-S130-12 · F-S130-NO-LANE-POST-CLI-1.

fanout: personalized

```deliverables
address: lane/AG-5 held by the new window, row CLAIMED under its nonce, heartbeat live
bus: three rows stamped consumed; up to three owed landing reports posted
report: bus row from_lane, artifact_name FOREMAN-WINDOW-LOST-RESUME-1-AG-5-report
```

TAIL ANCHOR: NOTICE-FOREMAN-WINDOW-LOST-RESUME-1-v1 ends here.
