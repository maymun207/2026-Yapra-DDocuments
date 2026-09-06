<!-- relay-audit: v1 kind=notice -->
# OWNER-RULING-S130-THAW-RULE26-BOUND-1 — one named thaw of the ADF freeze: the rule26 job's `timeout-minutes` may be raised from 10 to 20

Owner's words, verbatim, in chat at 2026-09-04T12:2xZ: "`gevşet-rule26 onayliyorum.`" — given in the same message as OWNER-APPROVAL-S130-MASTER-PUSH-PR-465-1, after the Architect asked three times (11:16Z, 12:14Z ⚡, and in the S130-DISPATCH-RECORD-3 carry). Recorded by the Architect.

## THE RULING

Under OWNER-RULING-S130-CWF-FOCUS-ADF-FREEZE-1 the factory's machinery is frozen and `.github/workflows/build-test.yml` is machinery. This ruling thaws EXACTLY ONE line of it: the `rule26` job's `timeout-minutes: 10` becomes `timeout-minutes: 20`, with the justification comment rewritten to carry the measurement that falsified the old sizing. Nothing else in the workflow, in land.ts, or in any ADF surface is thawed. The freeze stands for everything else and re-closes over this line once the change lands.

## WHY THE OWNER WAS ASKED (the measured case, not an argument)

- F-S130-RULE26-NPM-CI-STARVATION-1: the 10-minute bound was sized from 28 successful runs at 166–232 s (median 215 s). The gate step alone now takes ~325 s; `npm ci` in the same job varies 86–409 s. The sum can exceed 600 s on an ordinary run.
- Two product landings, two cancels: `3780d665…` (context-retrieval, 10m16s) and `45edd1ad…` (provenance-export, 10m20s). A successful re-run on the first head concluded at 598 s — two seconds under the ceiling. Reproduced, not variance.
- land.ts refuses on any `cancelled` context (line 628), so every cancel costs a re-run card and ~12 minutes, and the re-run is itself a coin toss.
- The cure is a bound the job fits inside (the true cure — caching node_modules — is a larger ADF change and stays frozen, named).

## WHAT THIS RULING DOES NOT DO

It does not approve the master push of the change: that push gets its own named approval (`OWNER-APPROVAL-S130-MASTER-PUSH-PR-<n>-1`) once the PR exists and is green, as every master push does (S102). It does not change how PR #465 lands: the foreman lands #465 under the standing 10-minute bound with one measured re-run. It does not re-open any other frozen item.

## THE CARD IT AUTHORISES

`CARD-CI-BOUND-RULE26-1-v1` → AG-4: one branch off master, one commit, one file, one key and its comment, one PR. Modelled on CARD-CI-BOUND-TOOL-VISIBILITY-B-1-v1 (build bound 20→45, landed in PR #488 under the same measured-comment discipline).

TAIL ANCHOR: OWNER-RULING-S130-THAW-RULE26-BOUND-1 ends here.
