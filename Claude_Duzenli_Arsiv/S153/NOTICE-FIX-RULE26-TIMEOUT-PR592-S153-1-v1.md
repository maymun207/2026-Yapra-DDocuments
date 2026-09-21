<!-- relay-audit: v1 kind=notice -->
NOTICE-FIX-RULE26-TIMEOUT-PR592-S153-1-v1

LANE: AG-4
fanout: personalized (one lane, one body)
FROM: Architect, S153, bus clock about 2026-09-21T22:32Z
OWNER APPROVAL: OWNER-APPROVAL-S152-LANDINGS-1 names DIGEST-SPAN-CAP; this notice repairs the author's own PR (12.12: the author fixes its own artefact).
NO POLL OR CRON TASK. When your slip is written, stop.
GATE-NOTE: written with a STEPS section.
GRAFT: take code context from graft first; your slip carries a GRAFT line.
WHAT: PR 592 is blocked by the rule26 job of Build and Test, CANCELLED at its 20-minute job timeout TWICE, on two different heads. The same job on PR 591 passed in about 6.5 minutes in the same hour. That is a measured signal that this PR's change makes the RULE-26 headless clip gate hang or run far slower. Nobody re-runs it (S55-1): find the cause and fix it.

## PREMISE
MEASURED: 2026-09-21T22:30Z, Architect bridge, GitHub API actions jobs by full head sha, head c2a345c6593599ccd8d7b027e5a3facce623ca98: job rule26 started 21:55:56Z, cancelled 22:16:16Z, step "RULE-26 headless clip gate" cancelled; job build (24.x) success; changes success; eval-canary skipped.
MEASURED: 2026-09-21T22:30Z, same API read, head 8909df209289bbfcf5fe6879f7cb353d0e3d07d1: job rule26 started 21:14:28Z, cancelled 21:34:44Z, same step cancelled; build (24.x) success.
MEASURED: 2026-09-21T22:30Z, same API read, PR 591 head 4f29bee42df6813b4bddfba42fb6cc8328a4c0a5: job rule26 success, 21:57:54Z to 22:04:35Z.
MEASURED: origin/master .github/workflows/build-test.yml: the rule26 job carries timeout-minutes: 20 and runs `npm run test:rule26`.
MEASURED: scout-2's SCOUT-STATUS-LAND-PR592-S153-1 (bus 22:07:02Z) was GREEN on review with CI pending; its hostile question (c) asked whether the halving loop can loop forever. CI now disagrees with that review; the disagreement is the finding (12.13).
UNMEASURED: the job log (the Architect's proxy refuses the log download host). Which rule26 case hangs, and why.
SELF-INVALIDATION: dies if PR 592 is closed or its head moves before you start.
ON-DISAGREEMENT: if your local `npm run test:rule26` at the head finishes quickly and green, STOP: print its duration and output tail, do not change code; the Architect then orders the scout to read the CI log.

## STEPS
1. In your worktree at c2a345c6593599ccd8d7b027e5a3facce623ca98 run `npm run test:rule26` with a wall-clock limit you choose (for example 25 minutes); print duration and the last lines. Run the same command at master 4f6a919fc0fd80f496e4533bfd977f781fd24498 for the baseline duration.
2. If it hangs or is slow at the head: find the case and the cause (the span-cap halving loop, the gap marker render, or the TurnDigestSection change are the first suspects; measure, do not guess). Write the cause in plain words in the slip.
3. Fix it in the PR branch, with a test that FAILS on the old code (a planted proof, as CLAUDE.md asks) and passes on the new; rerun `npm run test:rule26` and `npm run build`; push. The push produces its own CI run.
REPLY (on the bus): SLIP-FIX-RULE26-TIMEOUT-PR592-S153-1 with the cause in plain words, both durations, the new head (full 40-hex), the tests, and the GRAFT line.
FORBIDDEN: no re-run of the cancelled job, no change to the workflow timeout, no force push, no merge; never print an environment value.

END · NOTICE-FIX-RULE26-TIMEOUT-PR592-S153-1-v1
