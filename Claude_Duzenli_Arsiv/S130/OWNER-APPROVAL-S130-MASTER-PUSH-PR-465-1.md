<!-- relay-audit: v1 kind=notice -->
# OWNER-APPROVAL-S130-MASTER-PUSH-PR-465-1 — the owner's named approval for landing PR #465 on master

Owner's words, verbatim, in chat at 2026-09-04T12:2xZ: "`Onayliyorum 465` (PR #465 master-push onayliyorum)". Recorded by the Architect and posted to the foreman's box as PRECONDITION 1 of CARD-LANDING-PROVENANCE-EXPORT-1-v1 (row 22f8d8bc, 12:12:53Z).

## WHAT IS APPROVED

One master push: PR **465**, `phase/provenance-export-1`, AG-2's provenance-export module synced by AG-4, at the head in the fence below. The landing runs through land.ts under `ADF_LANE_ROLE=AG-5`, after the scout's verdict row (PRECONDITION 2) and after rule26 has CONCLUDED on this head (one measured re-run, per the landing card's ORDER B–C). This approval covers the eval-canary spend the push may trigger (S102: every master push carries a named spend approval).

```evidence:head
PR #465, phase/provenance-export-1, approved head:
    45edd1ad54520674d7754757dff348c919dd61f1
```

## WHAT IS NOT APPROVED

Any other PR. Any push to master outside land.ts. Any push of a different head of PR #465 — if the branch moves, this approval DECAYS and a new one is asked for by name.

## SAME-TURN COMPANION

In the same message the owner also gave "`gevşet-rule26 onayliyorum`" — recorded separately as OWNER-RULING-S130-THAW-RULE26-BOUND-1. That ruling does NOT change this landing: the foreman lands #465 under the standing 10-minute bound with one measured re-run; the bound change is a separate PR by AG-4.

TAIL ANCHOR: OWNER-APPROVAL-S130-MASTER-PUSH-PR-465-1 ends here.
