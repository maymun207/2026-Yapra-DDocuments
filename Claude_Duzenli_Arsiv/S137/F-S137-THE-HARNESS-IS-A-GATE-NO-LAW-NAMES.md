# F-S137-THE-HARNESS-IS-A-GATE-NO-LAW-NAMES-1

SESSION: S137
CLASS: blocking, and it is a NEW CLASS — not a variant of anything already in the register.
REPORTED BY: AG-4, at its 2026-09-13T20:27Z tick, on CARD-LAND-ASK-RENDERED-TWICE-S137-1-v3.
STATUS: OPEN. `#546` is green on every gate this factory models and did not land.

---

## THE MEASUREMENT

Everything the factory's own laws gate on was measured GREEN by AG-4 before the attempt:

```evidence:ag4-measurement
ORDER 0/1   ruling row matches v3; head and master unmoved; no landing lock
ORDER 2     Build and Test  success  (changes, rule26, build 24.x; eval-canary SKIPPED)
            Relay corpus    success
            report-schema   success
            drift line present inside the Build step
FALSIFIER   npm run land:selftest  PASS   reds=21  defects=0  control=green
GATE SURFACE  DIVERGED-GATE-IDENTICAL — byte-identical to origin/master from that checkout
```

Independently re-measured by the Architect at 2026-09-13T20:29:40Z in the owner's mounted clone:
`origin/master` = `e95b0fdf4fdb4c53eba3f3561b0eae0ac50f81c5`, branch head =
`ce3f785ec0692c79c7583c5a7047965aa1357594`. Both unmoved. AG-4's report writes master with one
transposed character; the value it acted on was correct and the landing was not affected, but the
printed string is a transcription slip and is named here rather than silently corrected
(TOTAL-45: a number in a report is a claim).

**What refused: the HARNESS.** The single land command was denied by the auto-mode permission
classifier under the label "Merge Without Review", BEFORE it ran. A bare presence test on
`ADF_LANE_ROLE` was denied for the same reason. The merge key never entered the shell. The remote
was verified untouched.

## WHY THIS IS A NEW CLASS AND NOT A VARIANT

This factory models three things that can stop a landing, and every one of them is a LAW with a
carrier behind it: `land.ts`'s author-equals-lander refusal, `CLAUDE.md` section 6a's merge-key
absence, and the CI gates. S137 has now measured a FOURTH, and no law names it: **the window's own
permission classifier can refuse a command that every law permits.**

The two are byte-identical from outside — in both cases nothing lands and the remote is untouched —
and they require completely different cures. A law refusal is cured by a ruling. A harness refusal
is not curable by any ruling at all: the owner's authority was already granted, already on the bus,
and already read by the lane. **An authority the harness cannot see is not an authority the harness
will honour.**

This is the CALLER-ABSENT shape (section 12.6) reflected into the permission layer: a mechanism that
is built, granted, ruled and correct, and still does not fire, because the thing that would fire it
was never told.

## WHAT AG-4 DID, AND IT IS THE STANDARD

AG-4 did NOT route around the refusal. No `gh pr merge`, no hand-merge, no re-spelling of the
command to slip past the classifier. It recorded a slip (`SLIP-LAND-ASK-RENDERED-TWICE-S137-1-v3-AG4-BLOCKED`,
drift MATCH), commented on PR 546, and pushed NO report file to the branch because a push there
decays the card's own fence.

That is the second time in two sessions a lane has refused rather than launder a blocker, and it is
recorded beside the Architect's own record of the opposite. Read section 12.15's closing line again.

## WHAT THIS FINDING CLOSES

**`ARCHITECT-RULING-S136-THE-MERGE-FORM-1`'s open half — CLOSED@ measurement.** That ruling ended
with "whether the land script's gate self-test is GREEN ON MASTER is UNMEASURED — that is the next
landing card's first order." It has now been measured, for the first time since S136:
`npm run land:selftest` PASS, `reds=21 defects=0 control=green`, log kept by the lane. The land
script is the designed route and it is proven. The detached-head fallback is no longer needed on
that ground.

## WHAT IT DOES NOT CLOSE

`F-S137-THE-ONLY-LANDER-IS-ALSO-A-PRODUCER-1` stands. The owner's ruling
`OWNER-RULING-S137-AG5-DOES-NOT-AUTHOR-PRODUCT-CODE-1` fixes the routing going forward, and the
single-use merge-key exemption was the right instrument — it simply met a second, unmodelled wall
behind the first.

## THE CURE, AND WHY IT IS THE OWNER'S SURFACE

A permission grant is CONSENT, and consent is the owner's declared surface under S102-YASA-1. The
Architect cannot grant it: writing a permission rule is a change to the window's standing
configuration, and the Architect writes no repository files and holds no such authority. This is
therefore NOT a PLATINUM breach — it is the one shape of owner action the law preserves.

The narrow instrument is a permission allowance for the single command `npm run land` in the AG-4
window. The tree needs no further measurement; the command is the only thing missing.

## ARCHITECT DEFECT RECORDED IN THE SAME BREATH

`A-REC-S137-I-LEFT-A-LOCK-IN-THE-SHARED-CLONE-1` — the ~30-hour stale `.git/index.lock` AG-4 found
in the code clone was owned by the Architect's own bridge user and dated 2026-09-12T14:54Z. AG-4
measured that the land script never touches the index, so it correctly did not remove another
actor's lock to get its own work through — the same discipline as section 12.12. The Architect
cleared it at 2026-09-13T20:30Z, after being told about it by the lane rather than finding it.
