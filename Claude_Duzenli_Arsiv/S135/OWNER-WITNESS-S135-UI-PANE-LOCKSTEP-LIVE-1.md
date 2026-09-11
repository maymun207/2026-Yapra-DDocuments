# OWNER-WITNESS-S135-UI-PANE-LOCKSTEP-LIVE-1

STATUS: WITNESSED, 2026-09-10, S135.

## THE OWNER'S WORDS, VERBATIM

    gordum ustuste degil

Said after opening the Topology tab in the live production application, in the same
turn in which he confirmed the block had been handed to AG-4.

## WHAT IT WITNESSES

The overlapping Topology panels — a defect the OWNER reported himself, unprompted,
earlier in S135 — are repaired in PRODUCTION. The panes no longer paint across each
other.

## WHY THIS ARTEFACT EXISTS AND WHY NO MACHINE COULD WRITE IT

This is the one class of evidence the Architect cannot produce. Every other line in
this session's record is a measurement: a sha, a step conclusion, a diff, a
deployment state. None of them can say whether a human being looking at the screen
sees two panels sitting on top of each other. A test asserting "no overlap" asserts
the property the test's author imagined; the owner's eye asserts the property that
actually mattered.

S102-YASA-1 names real-world witness as one of the owner's own surfaces, alongside
consent and spend approval. This is that surface being used for exactly what it is
for, and it closes the loop the owner opened when he reported the defect.

## THE CHAIN BEHIND IT, EACH LINK MEASURED

| link | value |
|---|---|
| author | AG-4, branch `phase/ui-pane-lockstep-s135-1` |
| branch head | `e686a7c88eb2dafbd71570a9e896f240919164fd` |
| CI at that head | every step of build (24.x) RAN and passed — RULE-40, migration version-key, tenant-zero, Build, Run tests; rule26 green; eval-canary skipped by its own spend fence and NOT reported as a pass. Read by the scout, 2026-09-09T22:49:51Z |
| adversary | reviewed before the work was cut, under CARD-ADVERSARY-REVIEW-UI-PANE-LOCKSTEP-S135-1-v1 |
| spend approval | OWNER-APPROVAL-S135-UI-PANE-LOCKSTEP-MERGE-1, one landing, named |
| lander | AG-5 — NOT the author; the AUTHOR-SUBJECT separation held |
| landed as | PR 528, master `16fef74cdbee6ca57060005ebb0e23894404fede` |
| production | Vercel deployment READY, target production, carrying that same master sha |
| witness | this artefact |

Every link in that chain was measured by a different actor from the one that produced
it. That is the point of the chain, and this is the first time in S135 it ran end to
end without a correction.

## WHAT THIS WITNESS DOES NOT COVER

It says the panes no longer overlap. It does NOT say the branch's own regression gate
is correct, that the e2e evidence spec covers every viewport, or that no other admin
surface regressed. Those are separate questions with separate instruments, and none of
them was asked here. A witness is narrow by construction and is not widened by being
positive.
