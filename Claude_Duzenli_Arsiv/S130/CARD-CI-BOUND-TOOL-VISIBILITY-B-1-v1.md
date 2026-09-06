<!-- relay-audit: v1 kind=card -->
# CARD-CI-BOUND-TOOL-VISIBILITY-B-1 · v1 — lift the build job's twenty-minute ceiling so a passing suite can reach a conclusion

The trunk-sync did its job: `authorityMatrix` is twenty-one of twenty-one GREEN in CI on the re-stamped snapshot. The required context `build (24.x)` was nonetheless CANCELLED — the job hit its own `timeout-minutes: 20` with the suite still running, nine minutes after the authority file passed. A bound that kills a passing suite is the born-barking class one layer down, and it now blocks PR 488 independently of any test. This card lifts the bound on your branch and reads the suite to a CONCLUSION. It is a PRODUCER card for the branch's author. It does NOT land anything.

## PREMISE

MEASURED: 2026-09-04T05:26Z, your own report `TRUNK-SYNC-TOOL-VISIBILITY-B-1-AG-4-report` — head in the `head` fence; `build (24.x)` CANCELLED at 20m16s ("The job has exceeded the maximum execution time of 20m0s"); the previous heavy run on the same branch CONCLUDED at 16m02s; no assertion failed in anything that ran; no `Test Files` summary was produced.
MEASURED: 2026-09-04T05:3xZ, `.github/workflows/build-test.yml` at the shared clone's HEAD — the `build` job carries `timeout-minutes: 20`, chosen (its own comment, PHASE-RULE26-BOUNDED-1) from a 30-run sample in which successful `build` ran 278s..461s. The suite now runs past twenty minutes; the sample the bound was sized from is no longer the world. The bound's own rationale ("no healthy run can ever reach it") is falsified by measurement.
MEASURED: the `eval-canary` job in the same file carries `if: false` under the FROZEN block (OWNER-RULING-S129-CANARY-ONLY-ON-FINISHED-PRODUCT-1). This card does not touch that block.
DECAYS on any push to the branch or master, and on a workflow-file change landing on master. ORDER A re-reads the bound live.
ON-DISAGREEMENT: if the branch tip is not the `head` fence value, or the `build` job's bound is not 20, or the canary block differs from FROZEN — STOP and report with the bytes. If your re-measure differs from any line here, THE MEASUREMENT WINS.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| the branch tip is your synced merge commit | MEASURED: 2026-09-04T05:26Z, your ORDER C ls-remote read-back | head |
| the build job's bound is twenty minutes and its sizing rationale is stale | MEASURED: 2026-09-04T05:3xZ, the workflow file at the shared clone's HEAD, lines quoted in the fence | bound |
| the cancelled run passed authorityMatrix and failed nothing | MEASURED: 2026-09-04T05:26Z, your ORDER D reading of the CI log | — |
| whether the suite reaches a conclusion under the lifted bound | NOT-READ | ci |

```evidence:head
phase/tool-visibility-b-1, after the trunk sync (your ls-remote read-back):
    7a0f26d605fadac9368eac320b3495051f1badcc
```

```evidence:bound
.github/workflows/build-test.yml, the build job, at the shared clone's HEAD:
    # a stall becomes a verdict. Measured over the last 30 runs of this workflow,
    # successful `build` ran 278s..461s (4.6..7.7 min). 20 minutes is ~2.6x the
    # observed max: generous enough that no healthy run can ever reach it, tight
    # enough that a wedged step reds the same hour it wedges.
    timeout-minutes: 20
The two heavy runs on this branch, from your report:
    f407277c (before the trunk sync)  16m02s   CONCLUDED
    7a0f26d6 (after the trunk sync)   20m16s   CANCELLED at the ceiling
```

```evidence:ci
NOT-READ. The head under the lifted bound does not exist yet. ORDER C reads it with the FULL forty hex.
```

## ORDER A — LIFT THE BOUND, ONE LINE, IN YOUR WORKTREE
In `wt-boot`, on `phase/tool-visibility-b-1`: change the `build` job's `timeout-minutes: 20` to `timeout-minutes: 45`. Replace the stale sizing comment with a measured one, in the house's own voice: the 30-run sample it cites, the two runs in the `bound` fence that exceeded it, and the sentence that 45 is a CEILING against a wedged runner and not a target — the suite's own runtime is a separate owed measurement (ORDER D). Touch NOTHING else in the file; the canary FROZEN block and every other job stay byte-identical (`git diff` must show one job, that key and its comment only). Commit with the house form: subject begins `PHASE-TOOL-VISIBILITY-1 AG-4:`; message via `-F <file>`.

## ORDER B — PUSH YOUR BRANCH
`git push origin phase/tool-visibility-b-1` — plain push. Read the tip back with `git ls-remote`; report it in a fence. PR 488 shows this head.

## ORDER C — READ THE SUITE TO A CONCLUSION
Ask CI with the FULL forty hex. Wait for `build (24.x)` to reach a CONCLUSION — `in_progress` is not a pass, `cancelled` is neither failed nor a pass. Report EVERY context by name, `eval-canary skipped` included. Report the job's wall time and the `Test Files` / `Tests` summary lines verbatim. SUCCESS → say so, with the time. FAILURE → report the failing tests verbatim and STOP; do not fix, do not re-run. CANCELLED again at 45 → STOP and report: that is no longer a bound, that is a hang, and the Architect owns it.

## ORDER D — WHERE THE TIME GOES (MEASUREMENT ONLY)
From the concluded run's log, list the TEN slowest test files with their durations as vitest printed them, and the total. Change nothing. This is the owed measurement behind the bound: the suite grew from under eight minutes to over twenty and nobody has said which files did it.

## ORDER E — REPORT
File from_lane, artifact_name `CI-BOUND-TOOL-VISIBILITY-B-1-AG-4-report`, carrying: the one-line diff (verbatim), the commit sha in a fence, the ORDER B read-back, the FULL CI verdict per context with wall time and summary lines, the ORDER D ten-slowest list, and `read relay_inbox at <ISO>` with what the box holds.

## FALSIFIER
Wrong if the branch tip is not the `head` fence value, the bound is not 20 at ORDER A, or the diff touches anything beyond the build job's bound and its comment. A red or a second cancel does NOT falsify the card — it is the card's measurement and is reported, not repaired here.

## SHARED SURFACES
One commit on YOUR branch touching ONE file (`.github/workflows/build-test.yml`), one plain push. NO push to master. NO change to any job other than `build`. NO change to the canary block. NO migration. NO db push. NO governed row. NO production traffic. Landing PR 488 is the foreman's, under a separate card.

## DECISION RIGHTS
You decide the comment's wording, nothing else. The value 45 is the Architect's; a red suite, a second cancel, or any diff beyond the one job is a STOP.

BODIES: `PLATINUM` · `S37-2` · `S55-1` (a diagnosed transient is not a licence to re-run — this is not a re-run, it is a changed bound on a new head) · `S63-1` · `S98-L1` · `TOTAL-45` · `empty ≠ zero`.

fanout: personalized

```deliverables
branch: phase/tool-visibility-b-1 — one commit, pushed to origin
report: bus row from_lane, artifact_name CI-BOUND-TOOL-VISIBILITY-B-1-AG-4-report
```

TAIL ANCHOR: CARD-CI-BOUND-TOOL-VISIBILITY-B-1-v1 ends here.
