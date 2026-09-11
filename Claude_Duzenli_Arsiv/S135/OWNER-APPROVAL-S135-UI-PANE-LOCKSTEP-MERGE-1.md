# OWNER-APPROVAL-S135-UI-PANE-LOCKSTEP-MERGE-1

STATUS: GRANTED, 2026-09-09, S135. ONE landing only.

## THE OWNER'S WORDS, VERBATIM

    OWNER-APPROVAL-S135-UI-PANE-LOCKSTEP-MERGE-1:
    e686a7c88eb2dafbd71570a9e896f240919164fd head'ini master'a indir.
    Tek inis icin gecerlidir.

## WHAT IT AUTHORISES

ONE action: merging `e686a7c88eb2dafbd71570a9e896f240919164fd`
(branch `phase/ui-pane-lockstep-s135-1`) into master, which at the time of the
approval was `b162d3a4b970cdbe6f20f0d64a547e505b03cee4`.

Spent by that one merge. It does NOT authorise a second push, a follow-up fix on
master, a revert, or any other branch. If the merge fails for any reason the
approval is not re-usable.

## THE MEASUREMENT THE APPROVAL RESTS ON

Read by the scout at 2026-09-09T22:49:51Z under
CARD-READ-CI-AT-THREE-HEADS-S135-1-v1, by `gh api actions/runs` at the full
forty-hex head.

    build (24.x)  step  4  Use Node.js 24.x                                success
    build (24.x)  step  5  Install dependencies                            success
    build (24.x)  step  6  RULE-40 gate (no literal NUL in tracked source) success
    build (24.x)  step  7  Migration version-key gate                      success
    build (24.x)  step  8  Tenant-zero gate                                success
    build (24.x)  step  9  Build                                           success
    build (24.x)  step 10  Run tests                                       success
    job  changes                                                           success
    job  rule26   RULE-26 headless clip gate                               success
    job  eval-canary                                          skipped, spend fence
    Build and Test                                                         success
    Relay corpus                                                           success
    report-schema                                                          success

This is the ONLY one of the three branches measured that night whose gates
actually RAN and said yes. Named honestly beside it:

- `phase/web-citation-contract-1-s134-1` at `80c062b35e64c2cd2cdf9feb53012496ab9e1989`
  is RED at step 10 `Run tests`.
- `phase/scope-decision-durable-emit-s135-1` at `43fe67b6af972896f3a6c910e637fafc05e21f06`
  carries a GREEN badge in which every gate, Build and Run tests were SKIPPED by
  the CI-DIET classifier. The badge measured nothing. It was not offered for landing.

`eval-canary` is SKIPPED here by its own spend fence. That skip is STRUCTURAL and
is NOT reported as a pass. `budget-fence`, `ma-rerun`, `nightly-compat` and
`vector-live-proof` produced no run at this head; none carries a pull_request
trigger, so their absence is structural and is neither a red nor a green.

## THE CARD IT WAS SPENT THROUGH

CARD-LAND-UI-PANE-LOCKSTEP-S135-1-v1, to AG-5 (LANDER; the author is AG-4, so no
lane lands its own work). Inserted to `relay_inbox` 2026-09-09T23:40:07Z, body md5
`1d1129a72e2c4880d29630c0d6aa978a`, verified byte-identical by an md5 AND sha256
WHERE precondition on the insert.

## WHY THIS BRANCH

It repairs a defect the OWNER reported himself: overlapping panels in the Topology
tab of the admin Graph KB view. Owner contribution, recorded by name per
S112-YASA-1.

## ARCHITECT BLIND SPOT RECORDED BESIDE IT

A-REC-S135-PUSHED-READ-AS-LANDED-1. The Architect reported "AG-4 pushed both
branches" and the owner read it as landed. He then measured his own Vercel
dashboard, saw a five-hour-old production build, and asked what was going on. The
dashboard was correct: master had not moved since PR 524 and there was nothing to
build. The defect was the Architect's vocabulary, not the platform's behaviour.

MECHANICAL CURE, binding from this artefact forward and already in force under
mechanical rule (3): every report to the owner opens with master's full forty-hex
sha and an explicit MOVED / DID NOT MOVE verdict. A branch push is never written
in a way that can be read as a landing.
