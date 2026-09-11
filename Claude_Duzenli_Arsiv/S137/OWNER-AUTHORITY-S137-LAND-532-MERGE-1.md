# OWNER-AUTHORITY-S137-LAND-532-MERGE-1

Given by the owner in his own words, 2026-09-11T23:22Z, in the Architect's chat:

    OWNER-AUTHORITY-S137-LAND-532-MERGE-1 — PR 532 birlesmis agacta yesilse AG-5 indirebilir.

## WHAT IT AUTHORISES, AND WHAT IT DOES NOT

ONE landing of pull request 532, by AG-5, and only after the forge is green on the MERGED tree. It does
not override a red gate, it does not extend to any other pull request, and it does not survive a re-cut
of the branch.

No spend approval accompanies it and none is needed. The canary carries `if: false`; the adversary
measured that in two places — `build-test.yml` and `docs/ops/CANARY-FROZEN.md` — and also measured that
the ruling NAME usually cited for it, `OWNER-RULING-S136-CANARY-RETIRED-NOT-DESTROYED-1`, is absent from
the tree. The fact stands; the name is not in the repository. The card quotes the two measured places
rather than the ruling, and that correction is the adversary's.

## WHAT IT LANDS

`TOOL-CALL-TRACE-COMPLETENESS-1` — the stage-span tree and its report, the instrument that pays for
inspectable intermediate steps under **ToolComp (process)**, `cwf-sota-definition-v1_5` §3 Tier C. The
work has been complete and green on the branch since S135. What held it for two sessions was a manifest
conflict, repaired by AG-4 tonight in a single merge-plus-reseal commit.

## THE CARD IT AUTHORISES

`CARD-LAND-532-S137-1-v2`, addressed to AG-5, sealed under the adversary's digest. v1 was greened and then
voided by the Architect on the adversary's own two findings — a loose commit count and, more seriously, an
order that sent the lane hunting for `check:doc-drift` as a workflow. It is not one: it is the last command
of `npm run build`, inside the step named Build, inside the job build (24.x). A lane looking for it at the
runs endpoint would have reported ABSENT and waited forever on a green that never appears there. The
adversary caught that before a lane fell into it.

## STATE AT THE MOMENT THE AUTHORITY WAS GIVEN

```evidence:refs
  master                                          f7640a483eb9a209f1bff31935ab6abc1d1d39ef
  phase/tool-call-trace-completeness-s135-1       13a08afa1ada3f3850f0e7043cf8b0ae540f1678
  refs/landing/lock                               ABSENT
three workflow runs at the branch tip, read twice by the adversary, all green:
  Relay corpus SUCCESS, report-schema SUCCESS, Build and Test SUCCESS
the reseal verified by content: all seven tabs sealed to the committed tree, and the five
changed digests byte-for-byte the five the adversary had rehearsed before the commit existed
```

## THE THIRD LANDING OF THE EVENING

537 landed at 20:10Z, 526 at 22:50Z, and this authority is for the third. All three were product rows the
carriers had been calling NOT STARTED.

END · OWNER-AUTHORITY-S137-LAND-532-MERGE-1
