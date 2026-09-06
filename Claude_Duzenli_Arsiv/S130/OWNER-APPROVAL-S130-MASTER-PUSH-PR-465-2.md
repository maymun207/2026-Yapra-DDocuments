<!-- relay-audit: v1 kind=notice -->
# OWNER-APPROVAL-S130-MASTER-PUSH-PR-465-2 — the owner's approval for landing PR #465 on master, RENEWED for the resynced head

Supersedes OWNER-APPROVAL-S130-MASTER-PUSH-PR-465-1 (row 58afcea3, bound to head `45edd1ad…`), which DECAYED when AG-4 pushed the resync merge at 20:49:34Z. Owner's words for the original: "`Onayliyorum 465` (PR #465 master-push onayliyorum)" (12:2xZ). Owner's standing instruction for renewals of this kind, verbatim (12:3xZ): "bana numara sorma Onayliyorum dolayisi ile devam !". Recorded by the Architect and posted to the foreman's box as PRECONDITION 1 of CARD-LANDING-PROVENANCE-EXPORT-1-v3.

## WHAT IS APPROVED

One master push: PR **465**, `phase/provenance-export-1`, at the head in the fence below. The AUTHORED content is unchanged from the head the owner approved by number: exactly one non-merge commit, AG-2's `388671734f7927922cf37a4cbb172e83ee276f6a`; the two later commits are AG-4 merges of master (11:33Z: generated files regenerated; 20:49Z: only `.github/workflows/build-test.yml`). The landing runs through land.ts under `ADF_LANE_ROLE=AG-5`. This approval covers the eval-canary spend the push may trigger (S102).

```evidence:head
PR #465, phase/provenance-export-1, approved head (resync merge, pushed 20:49:34Z):
    c46e78b578f50f53f40d4f70b0d8ba4e28e6495b
the one authored commit (AG-2), unchanged since the number-approved head:
    388671734f7927922cf37a4cbb172e83ee276f6a
CI at the head (AG-4 report v2, 21:07Z, total_count 7): build (24.x) SUCCESS 16m13s · rule26 SUCCESS 6m18s · report-schema, relay corpus, changes, Vercel Preview Comments success · eval-canary SKIPPED
```

## WHAT IS NOT APPROVED

Any other PR. Any push outside land.ts. Any further movement of this branch — if the head changes again, this approval decays and is renewed by name.

TAIL ANCHOR: OWNER-APPROVAL-S130-MASTER-PUSH-PR-465-2 ends here.
