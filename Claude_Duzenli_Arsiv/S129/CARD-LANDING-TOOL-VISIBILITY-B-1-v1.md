<!-- relay-audit: v1 kind=card -->
# CARD-LANDING-TOOL-VISIBILITY-B-1 · v1 — land PR #488, and read CI before you do

AG-4 built `PHASE-TOOL-VISIBILITY-1`'s code half and opened pull request #488. This card lands it.
It is the FOREMAN's card: a producer never merges its own work, which is why AG-4 stopped at the
pull request and said so in its own report rather than reaching for the verb.

**PRECONDITION — THIS CARD DOES NOT AUTHORISE A MERGE ON ITS OWN.** S102 requires a NAMED owner
approval for every master push, and a general clearance never substitutes for an individual firing.
At the moment this card was cut that approval had NOT been given. DO NOT MERGE until a bus row
addressed to you carries it by name and names pull request 488. If you reach ORDER B without having
read that row, STOP and say so — a card is not consent.

The spend question is answered by measurement rather than by estimate, and it is answered
separately from the approval — see the `canary` fence.

## PREMISE

MEASURED: 2026-09-03T13:09:17Z, `git log --oneline master..phase/tool-visibility-b-1` in the owner's clone over the bridge — the commits enumerated in the `commits` fence, by subject. No sha is copied into this card; ORDER A resolves the tip.
MEASURED: 2026-09-03T13:09:40Z, `git show <report-commit>:docs/relay/TOOL-VISIBILITY-B-1-AG4-report.md` read from the branch — the lane's ORDER E report, which names the pull request as 488 and its base as `origin/master` at the value in the `anchor` fence.
MEASURED: 2026-09-03T13:10:22Z, `git show <anchor>:docs/ops/CANARY-FROZEN.md` and the same tree's `.github/workflows/build-test.yml` — the eval-canary is FROZEN on the owner's direct ruling of 2026-08-27 under card `PHASE-CANARY-FREEZE-1-v1`, and the freeze document opens by saying that a report of the canary being missing IS the freeze working and must not be repaired.
MEASURED: 2026-09-03T13:09:40Z, the same report's MEASURED section — `vitest run` reports 700 of 701 files passing with three failures, and the report states those three ALSO fail on a PRISTINE `origin/master` worktree at the anchor. They are the aged authority snapshot, named in the `expected-red` fence.
DECAYS on any push to the branch, any push to master, and on CI re-running. Re-read the branch, the pull request state and CI at ORDER A. A merge planned against a tip that has moved is a merge of something nobody reviewed.
ON-DISAGREEMENT: if the branch tip is not what ORDER A reads at merge time, or the pull request is not open, or CI on the PR HEAD is RED for any reason OTHER than the three named in `expected-red` — STOP and report. Do not land, do not re-run, do not diagnose. A red gate is a MEASUREMENT and the Architect owns what happens next.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| the branch carries the commits whose subjects are enumerated, and the pull request is 488 | MEASURED: 2026-09-03T13:09:17Z, git log over the bridge, plus the lane's own report read from the tree | commits |
| the base is origin/master at the value in the anchor fence, and the branch was cut from it | MEASURED: 2026-09-03T13:09:17Z, git rev-parse over the bridge and the report's own Base line | anchor |
| the eval-canary is frozen on the owner's ruling, so this master push fires no model spend | MEASURED: 2026-09-03T13:10:22Z, the freeze document and the workflow file read at the anchor | canary |
| three test failures are PRE-EXISTING and time-triggered, and fail identically on a pristine master worktree | MEASURED: 2026-09-03T13:09:40Z, the lane's report of re-running them on a pristine worktree at the anchor | expected-red |
| whether CI on the pull request HEAD is green | NOT-READ | ORDER A reads it; the lane opened the PR moments before writing its report and stated the reading as UNREAD rather than assuming it |

```evidence:anchor
Base of the branch, and origin/master when this work began, read at 2026-09-03T13:09:17Z:

  d8895114744dbb23ba5633d726a0814cfe0468d5

Resolve the branch tip YOURSELF with `git rev-parse phase/tool-visibility-b-1` and
`git ls-remote origin refs/heads/master` at ORDER A. Do not act on any value copied
from this card.
```

```evidence:commits
The four commits on the branch, by subject, oldest first:

  GATE 1: the stage 07 span describes the REGISTERED world
  GATE 2: a badge whose floor is REACHABLE
  reseal the maps GATE 2's new modules drifted
  ORDER E: the lane's own report, committed to docs/relay/

Read at 2026-09-03T13:09:17Z. Their abbreviated shas are DELIBERATELY NOT COPIED HERE —
a prefix is ambiguous and a lane copies what it reads. Enumerate them yourself at ORDER A.

Pull request: 488. Branch: phase/tool-visibility-b-1.
```

```evidence:canary
From `docs/ops/CANARY-FROZEN.md` at the anchor:

  "Frozen on 2026-08-27, on the OWNER's direct ruling, under card
   PHASE-CANARY-FREEZE-1-v1, by lane AG-2."
  "If you are reading this because something says the canary is missing, stale, or
   unmeasured — that is this freeze, working. It is not a fault. Do not repair it."

CONSEQUENCE for this landing: the ~110k model spend that S102 attaches to a master push
does not fire. The owner's approval was still taken by name, because a general
clearance never substitutes for an individual firing.
```

```evidence:expected-red
THREE failures in `authorityMatrix.test.ts` are EXPECTED and are NOT this branch's:

  the authority snapshot was taken 2026-08-26T03:24:51Z with a stated bound of P7D,
  and today is 2026-09-03. One test fails on the bound; two cascade from it.

The lane proved they are pre-existing the only way that settles it: the identical three
fail on a PRISTINE origin/master worktree at the anchor. Closing them needs
`npm run authority:snapshot`, which is NOT this card's work and NOT yours.

ANY OTHER RED IS A STOP. Do not widen this exemption by reading a different failure as
"probably the same thing".
```

## ORDER A — READ THE GATE BEFORE YOU TOUCH THE VERB

FIRST: confirm the owner's named approval row for pull request 488 is in your box. If it is not,
STOP HERE — everything below this line is conditional on it.

Then resolve the branch tip and `origin/master`. Confirm pull request 488 is open and its HEAD is
the tip you resolved. Then READ CI ON THE PULL REQUEST HEAD — S37-2 makes the unsharded CI run on the
PR head the single test referee, and the lane that built this stated the reading as UNREAD rather
than assuming it was green.

Report the CI verdict in full BEFORE you merge, in the same report, so the reading and the act sit
beside each other and nobody has to infer the order.

If CI is red for anything outside the `expected-red` fence, STOP.

## ORDER B — LAND IT

Merge with `--no-ff`. **SQUASH IS FORBIDDEN** — the four commits carry their own reasoning and a
squash destroys the record that GATE 1 and GATE 2 were separable. Use the detached-HEAD merge form
(S100-3). Push to master.

Do NOT rebase. Do NOT amend. Do NOT touch the branch's contents in any way: you are landing what
was reviewed, not improving it.

## ORDER C — PROVE IT FROM THE REMOTE

A merge is not evidence (S63-1). Read `git ls-remote origin refs/heads/master` back and report the
tip. Then confirm the four commits are reachable from it.

Report the deploy state if you can read it, and say UNREAD if you cannot rather than assuming a
push became a deployment.

## ORDER D — REPORT

File `from_lane` with artifact name `LANDING-TOOL-VISIBILITY-B1-<your-address>-report`, carrying
the ORDER A readings INCLUDING the CI verdict, the merge commit sha in full forty hex, the ORDER C
remote reading, and the deploy state or the word UNREAD.

**The live production turn that ORDER D of the build card requires is NOT yours and is NOT ordered
here.** It needs a deployed build and a real turn; the Architect reads it from the trace once the
deploy is live. Do not send production traffic.

## FALSIFIER

This card is wrong if the pull request is not open, or its HEAD is not the branch tip, or CI is red
for a reason outside the named three, or if no owner approval row for pull request 488 ever
arrives. Any of those means the world moved between the reading and
the order, and the ON-DISAGREEMENT arm is the response.

## SHARED SURFACES

One merge of an existing branch into master, and one push. NO file is edited, created or deleted.
NO governed row. NO migration. NO CI re-run. NO production traffic. The branch is not modified.

## DECISION RIGHTS

The owner approved `PHASE-TOOL-VISIBILITY-1` by name. The NAMED APPROVAL FOR THIS MASTER PUSH is a
SEPARATE act and it arrives as its own bus row — see the PRECONDITION above. The merge authority is
the foreman's own: this is a producer's branch, not a lane landing its own record, so the ⑤
exception is not in play and no part of it is being stretched.

The spend approval and the merge approval are the same owner act here and it is ONE row. Read it
before ORDER B; do not infer it from this card's existence, from the canary freeze, or from the
fact that the work is finished.

You decide NOTHING about the code, the commit history, or whether a red gate is tolerable. A red
outside the named three is a STOP, not a judgement call.

BODIES: `PLATINUM` · `S37-2` (the PR-head CI is the referee) · `S63-1` (the merge is not the
evidence; the remote read is) · `S100-3` · `TOTAL-45`.

fanout: personalized

```deliverables
branch: none — this card merges an existing branch and writes no file
report: bus row from_lane, artifact_name LANDING-TOOL-VISIBILITY-B1-<your-address>-report
```

TAIL ANCHOR: CARD-LANDING-TOOL-VISIBILITY-B-1-v1 ends here.
