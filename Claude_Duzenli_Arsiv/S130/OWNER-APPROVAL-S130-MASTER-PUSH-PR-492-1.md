<!-- relay-audit: v1 kind=notice -->
# OWNER-APPROVAL-S130-MASTER-PUSH-PR-492-1 — the owner's approval for landing PR #492 on master, bound to its head

Basis: OWNER-RULING-S130-SWEEP-REAUTHOR-1 item 4 (the re-authored PR "follows the standing chain … → master push under the standing 'numara sorma, devam' instruction") and OWNER-RULING-S130-SWEEP-TEST-FIX-1 item 4 (the chain resumes after the test-fix). Owner's standing instruction, verbatim (2026-09-04 12:3xZ): "bana numara sorma Onayliyorum dolayisi ile devam !". The owner ruled this landing twice by name (re-author, test-fix); the PR number is the artefact's, not a new question. Recorded by the Architect and posted to the foreman's box as PRECONDITION 1 of CARD-LANDING-STALE-FACT-SWEEP-2-v1.

## WHAT IS APPROVED

One master push: PR **492**, `phase/stale-fact-sweep-2`, at the head in the fence below — exactly two non-merge commits, both `AG-4:`, no merge commit: the re-authored sweep content (four paths byte-identical to AG-1's and AG-2's source commits) plus the two-assertion test fix. The landing runs through land.ts under `ADF_LANE_ROLE=AG-5`. This approval covers the eval-canary spend the push may trigger (S102; canary is `if: false` — skipped).

```evidence:head
PR #492, phase/stale-fact-sweep-2, approved head (test-fix commit, pushed 2026-09-05T04:09Z):
    621d0d862f09456053b0aaf5528bcbd5a81dbac5
its parent, the re-author commit:
    c11b46252db5b78621ea74cbc7e73a398043d02e
base master:
    65b7e344ec0fe2c7ff10f28236b25d81ef6f6723
CI at the head (AG-4 report 04:28Z, total_count 7): build (24.x) SUCCESS 16m46s · rule26 SUCCESS 6m08s · relay corpus, report-schema, changes, Vercel Preview Comments success · eval-canary SKIPPED
```

## WHAT IS NOT APPROVED

Any other PR. Any push outside land.ts. Any further movement of this branch — if the head changes, this approval decays and is renewed by name.

TAIL ANCHOR: OWNER-APPROVAL-S130-MASTER-PUSH-PR-492-1 ends here.
