<!-- relay-audit: v1 kind=report -->
# LAND-WEB-VALVE-1-S133-1 — AG-5

`read relay_inbox at 2026-09-08T10:27:19Z — read OK — 1 row for AG-5, head reached`

**NOTHING WAS LANDED.** ORDER A passed in full and the sync in ORDER B.1 was clean, but the
required run `Build and Test` came back RED at the synced head. The card's ON-DISAGREEMENT
orders a STOP with the failing job quoted and no re-run, and that is what happened. The red
is not flaky and it is not master's: it is a SEAL failure the branch carries, and the tool
prints its own remedy.

The pull request is left OPEN at the red head on purpose. Closing it would destroy the trail
and the branch needs one more commit, not a new pull request.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| the card, digest verified against the row | MEASURED: node scripts/mail-wait.mjs AG-5 --read CARD-LAND-WEB-VALVE-1-S133-1-v1 | card |
| the wire heads equal the card's heads fence | MEASURED: git ls-remote origin refs/heads/master refs/heads/phase/web-valve-1-s132-1 | find |
| the changed paths equal the nine-path fence EXACTLY, before and after the sync | MEASURED: git diff --name-only origin/master...origin/phase/web-valve-1-s132-1 | find |
| the author lane is AG-4, so this foreman did not author what it was asked to land | MEASURED: git log --no-merges --format=%s | find |
| no pull request was open; this one was opened BY BRANCH | MEASURED: gh pr list --state open --json number,headRefName | find |
| the sync was owed, merged clean, and added no path outside the fence | MEASURED: git merge-base --is-ancestor exit 1, then git merge --no-ff origin/master | sync |
| Build and Test is RED at the synced head; the other two required runs are green | MEASURED: gh api actions/runs?head_sha=73931d5dc51f7783d639a24fdab96e4657120b69 | red |
| the failing step is Build, and it fails at check:doc-drift over six tabs | MEASURED: gh run view 34215710591 --log-failed | red |
| eval-canary and rule26 are SKIPPED, named, and NOT counted as green | MEASURED: gh api commits/73931d5d.../check-runs | red |
| master itself does not drift | MEASURED: npm run check:doc-drift at master 5d482353, all 7 tabs synced | master |
| the branch changes mapped code and carries no reseal | MEASURED: the nine paths contain no seal file and no diagram | master |
| whether the sync merge CAUSED any part of the drift | NOT-READ | the three files it brought in are a workflow and two relay reports, none of them mapped code; this is an argument, not a measurement |
| why the Architecture Map tab names groundMcp files the branch never touched | NOT-READ | the drift line appears to print the tab's mapped SET rather than the changed files, but that reading was not verified against checkDocDrift.ts |
| whether the suite is still green at the synced head | NOT-READ | this lane did not re-run the suite locally; CI's Build and Test failed before the suite verdict mattered |

## The card

```evidence:card
[CARD] artifact_name=CARD-LAND-WEB-VALVE-1-S133-1-v1 length=10589
[DIGEST-OK] locally recomputed md5 matches the row's
```

## ORDER A — every precondition passed

```evidence:find
$ git ls-remote origin refs/heads/master refs/heads/phase/web-valve-1-s132-1
5d482353161198d0b1381f9473fe86a02dce2bf3	refs/heads/master
5d1df6c9d49ba905f88aa776c88c448a899ca1ca	refs/heads/phase/web-valve-1-s132-1
(both equal the card's heads fence)

$ git diff --name-only origin/master...origin/phase/web-valve-1-s132-1
api/cwf/__tests__/learnBrake.test.ts
api/cwf/__tests__/localToolsSsot.test.ts
api/cwf/__tests__/registerToolsSpanIO.test.ts
api/cwf/__tests__/webTools.test.ts
api/cwf/_lib/knowledge/reference/agentParams.ts
api/cwf/_lib/localTools.ts
api/cwf/_lib/turn/stageTools.ts
api/cwf/_lib/webTools.ts
docs/relay/WEB-VALVE-1-AG4-report.md
(nine paths, equal to the paths fence line for line)

$ git log --no-merges --format=%s origin/master..origin/phase/web-valve-1-s132-1
AG-4: CARD-WEB-VALVE-1-S132-1 — web_fetch, SSRF-guarded and citation-bearing, landing with the valve CLOSED

$ gh pr list --state open --json number,headRefName
[]
```

## ORDER B.1 — the sync was owed and merged clean

```evidence:sync
$ git merge-base --is-ancestor origin/master origin/phase/web-valve-1-s132-1
(exit 1 — sync OWED)
$ git merge --no-ff origin/master        (detached worktree; the branch is checked out in another lane's worktree)
Merge made by the 'ort' strategy.
 .github/workflows/ma-rerun.yml                          | 130 +++
 docs/relay/LAND-MA-RERUN-RUNNER-S132-1-AG5-report.md    | 158 +++
 docs/relay/MA-RERUN-3-S132-1-AG4-report-v4.md           | 256 +++
 3 files changed, 544 insertions(+)
$ git rev-parse HEAD
73931d5dc51f7783d639a24fdab96e4657120b69
$ git diff --name-only origin/master...HEAD
(the same nine paths — the sync added nothing outside the fence)
$ git push origin HEAD:refs/heads/phase/web-valve-1-s132-1
   5d1df6c9..73931d5d  HEAD -> phase/web-valve-1-s132-1
$ gh pr create --base master --head phase/web-valve-1-s132-1
https://github.com/maymun207/cwf_yaprak/pull/517
```

A rebase was never used. No file on that branch was edited by this lane.

## ORDER B.3 — the red, quoted and not re-run

```evidence:red
$ gh api "repos/maymun207/cwf_yaprak/actions/runs?head_sha=73931d5dc51f7783d639a24fdab96e4657120b69"
total_count=3
report-schema   :: completed :: success
Relay corpus    :: completed :: success
Build and Test  :: completed :: FAILURE
$ gh api repos/maymun207/cwf_yaprak/commits/73931d5dc51f7783d639a24fdab96e4657120b69/check-runs
build (24.x) :: FAILURE · report-schema :: success · relay corpus (grammar v1) :: success
changes :: success · Vercel Preview Comments :: success
rule26 :: SKIPPED · eval-canary :: SKIPPED
$ gh run view 34215710591 --log-failed
FAILED STEP: Build
[FAIL] DOC DRIFT: Architecture Map -- mapped code changed since last reseal (expected af4cce39e995, got 3bac29d9eab4)
[FAIL] DOC DRIFT: Runtime Topology -- (expected 03bc379e57f0, got 914c8591f8cf): api/cwf/_lib/turn/stageTools.ts
[FAIL] DOC DRIFT: Request Lifecycle -- api/cwf/_lib/knowledge/reference/agentParams.ts, api/cwf/_lib/turn/stageTools.ts
[FAIL] DOC DRIFT: Governance Model -- api/cwf/_lib/knowledge/reference/agentParams.ts
[FAIL] DOC DRIFT: Agent Control Plane -- api/cwf/_lib/turn/stageTools.ts
[FAIL] DOC DRIFT: Stage Cards -- api/cwf/_lib/turn/stageTools.ts
[check:doc-drift] [FAIL] 6 tab(s) drifted -- build FAILED. Fix: update the affected diagram + run npm run reseal, in the same commit
```

**`eval-canary` and `rule26` are SKIPPED and are named as such**, never folded into the
green. Nothing was re-run: a red is a measurement, and re-running it would have destroyed
the only evidence this card produced.

## Whose defect this is, measured rather than argued

```evidence:master
$ npm run check:doc-drift            (main clone, at master 5d482353)
[check:doc-drift] [OK] no drift -- all 7 narrative tabs synced (mode=worktree).
```

Master does not drift. The branch changes mapped code — `api/cwf/_lib/turn/stageTools.ts`
and `api/cwf/_lib/knowledge/reference/agentParams.ts` — and ADDS `api/cwf/_lib/webTools.ts`,
and the nine paths contain no seal file and no diagram. Five of the six drifted tabs name
exactly those two changed files. So the reseal is owed ON THE BRANCH.

**This lane did not reseal, and that is not timidity.** The card's SCOPE allows no file
edited by this lane except its own report, and `CLAUDE.md` puts the reseal in the SAME commit
as the change that caused it — which is AG-4's commit, not a foreman's follow-up. A foreman
resealing another lane's branch would also be authoring product content, which is the one
thing that makes it ineligible to land anyone's work.

**A note on the green that was reported.** The card's `suite` fence quotes
`Test Files 710 passed` and `npm run typecheck:api`. Neither runs `check:doc-drift` — that
gate lives inside `npm run build`. The suite green was real and it did not cover this gate,
which is why a branch reported green for twelve card versions failed the first time a
landing actually asked CI for a verdict.

## What is owed next, and by whom

One commit on `phase/web-valve-1-s132-1`, by the lane that owns the build: update the
affected diagrams and run `npm run reseal` in that same commit. CI then re-runs on the
existing pull request 517 — no new pull request is needed and none should be opened. When
`Build and Test` is green at that head, this card's ORDER B.4 resumes from step 4 unchanged.

The owner's approval is untouched by this: it covers the nine paths, and a reseal adds the
sealed digests those nine paths made stale. Whether that widening needs the owner's word
again is the Architect's to rule, not this lane's.

## DIFF

```
$ git diff --name-only origin/master...HEAD
docs/relay/LAND-WEB-VALVE-1-S133-1-AG5-report.md
```

This report adds one file and changes nothing else. The landing it was sent to perform added
nothing at all, which is the whole point of it.

## Close

```evidence:close
$ git status --porcelain -uall
 M docs/ground/authority-conformance.latest.md
$ git ls-remote origin refs/heads/lane/AG-5
5f2ae576c9a0cd7eefb6c185effe32fa7864dba6	refs/heads/lane/AG-5
```

The modified ground doc is `F-S130-TEST-SUITE-WRITES-GROUND-DOC-1`, known and open, named
and not discarded. The lane ref carries this window's nonce.

TAIL ANCHOR: LAND-WEB-VALVE-1-S133-1-AG5-report ends here.
