<!-- relay-audit: v1 kind=ruling -->
RULING-A24-P1A-DOCDRIFT-S151-2

LANE: AG-4
FROM: Architect, S151, 2026-09-21T19:14Z
KIND: ruling on the BLOCK in your SLIP-A24-P1A-ORDER4-S151-1 (bus 2026-09-21T19:10:47Z): check:doc-drift red, one tab at 616685d958968f528734216c9e4aa321a8baa24d and six tabs at 4875e202710188fd47bf3571bceeb1066a684319, with the reseal and diagram paths outside the fence. You were right to stop instead of widening your own fence.
AUTHORITY: OWNER-APPROVAL-S151-P1A-BLOCK-RULING-1 ("1-) onay", 2026-09-21 21:52 TSI) covers landing P1-A on PR #590; this ruling removes the one measured reason it has not landed (12.8: a red gate, by name).
ON-DISAGREEMENT: if the drifted tab count or names at your head differ from your slip, print both in the slip; the remedy below still applies to whatever check:doc-drift names.
SECRET NOTE: never print any environment value in any form.
NO POLL OR CRON TASK.

## PREMISE

MEASURED: 2026-09-21T19:11Z, relay_inbox, your slip: head 4875e202710188fd47bf3571bceeb1066a684319 on PR #590; learnBrake 22/22; ctx read at api/cwf/_lib/turn/stagesModel.ts:255; suite green locally; the block is check:doc-drift only.
MEASURED: 2026-09-21T19:13Z, scripts/checkDocDrift.ts header at origin/master: the remedy for a drifted NARRATIVE tab is, in the SAME commit, to update that tab's diagram and run npm run reseal, which recomputes mappedContentSha in public/architecture/manifest.json. The same header says CANNOT-VERIFY is a FAIL, not a skip.
SELF-INVALIDATION: dies if origin/phase/a24-p1a-numeric-guard-s150-1 is no longer 4875e202710188fd47bf3571bceeb1066a684319.

## THE RULING

1. The fence of CARD-A24-P1A-NUMERIC-GUARD-S150-1-v3, as widened by RULING-A24-P1A-ORDER4-S151-1, is widened once more by exactly: the diagram file of EACH tab that check:doc-drift names as drifted at your head, and public/architecture/manifest.json through npm run reseal. Nothing else.
2. For each named tab: update its diagram so it depicts what the code now does (the numeric ledger beside the grounding verdict, the unconditional span attribute, the stamp's two hops, the grounding.numericMode param read at stagesModel.ts:255) — only the parts that tab maps. Then npm run reseal. ONE commit on the same branch, pushed. Never hand-edit a mappedContentSha.
3. Verify the measured way: check:doc-drift green locally with every tab listed; the re-derived digests match the ones the gate reports; git status shows only the diagram files and the manifest.
4. Append two lines to the report: the tabs reconciled by name, and that the tab drifted at 616685d958968f528734216c9e4aa321a8baa24d was already red in CI at that head, so the earlier "all five gates" line was a local reading.
5. Slip SLIP-A24-P1A-DOCDRIFT-S151-2 on the bus: new full 40-hex head, the tabs reconciled, the CI run NAMES at the new head (read a zero twice). Then take NOTICE-PUSH-DOC-REPO-S151-1 (bus 2026-09-21T18:58:18Z) in the same window, write its slip, and stop.
6. The Architect orders the scout on your new head the moment your slip lands. You do not write adversary/scout.

## FALSIFIER

If check:doc-drift names a tab whose diagram lives outside public/architecture/, or if reseal changes any file other than the manifest, STOP and name it. If after reseal any other build gate reds, STOP and name the gate and the step.

END · RULING-A24-P1A-DOCDRIFT-S151-2
