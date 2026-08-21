# GO · CANARY-REP-FAILURE-1 · v1

>> BLOCK: AG-1 <<

RULE-25 review complete. Verdict: **GO.** All seven deviations (D1–D7) and S1
are **RATIFIED as built** — revert nothing.

## STEP 1 (BLOCKING) · CI re-verification on the PR head
Before merging, confirm on the PR page that the checks on `4224d2e` (and any
report-only commits after it) are green: `build (20.x)`, `build (22.x)`,
`coverage`, `rule26` — 4/4 success, `eval-canary` skipped (expected on PR).
If `rule26` shows the known F-BW01 flake signature, one ordered rerun is
authorized; any OTHER red = STOP and report, do not merge.

## STEP 2 · Merge (single lane — no second-merger reseal owed)
Anchor check first: `git rev-parse origin/master` MUST still print
`0de5ffdd98a1a855132bc80a71a7be50f070beef`. If master moved, STOP and report.

```
git checkout master && git pull --ff-only
git merge --no-ff phase/canary-rep-failure-1 -m "merge: PHASE-CANARY-REP-FAILURE-1 — the answer book stops making its own reps unscoreable

The replay stub advertised MCP tools with an empty schema and then demanded
a byte-exact hash of the recorded arguments — a deterministic exam handed to
a stochastic system. 282 of 400 golden chunks scored zero while burning 82%
of the tokens, marked ok, cause recorded nowhere. This merge derives each
stub tool's schema from its own recording, serves an args-miss from the
tool's recorded pool as a COUNTED servedByName fallback (true name-absence
still misses), and carries failedReps/stubMisses/servedByName/failureNames
through every pooling boundary to the ledger, the eval-ci row and the golden
chunk log. Rule logic, CLEAN_ARMS_MIN_N, the governed cap and the golden set
are untouched. rev 227."
git push origin master
```
No squash. Then confirm the merge commit SHA back in your final report line.

## STEP 3 · After push
Nothing else is yours. Zero migrations — no Operator step exists for this
phase. The post-deploy canary read and the STOP-CONDITION judgment are the
Architect's, off the production ledger after Vercel convergence.

TAIL: GO CANARY-REP-FAILURE-1 v1 — merge authorized
