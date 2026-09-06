<!-- relay-audit: v1 kind=card -->
# CARD-LANDING-TOOL-VISIBILITY-B-1 · v2 — land PR #488 at whatever its tip is, by a rule that does not go stale

AG-4 built `PHASE-TOOL-VISIBILITY-1`'s code half, opened pull request 488, and then pushed three
more commits fixing what CI found — a missing relay-grammar header on its own report, and a
sub-12px legibility ban. This card lands the result. It is the FOREMAN's card: a producer never
merges its own work.

v1 of this card was RED at the scout, correctly, for a reason this version is built to prevent: it
FROZE a commit count that the branch outgrew within minutes. A landing card must describe a
MOVING branch by a rule, not a photograph.

**PRECONDITION — THIS CARD DOES NOT AUTHORISE A MERGE ON ITS OWN.** S102 requires a NAMED owner
approval for every master push. That approval was given — "PR#488 INSIN", 2026-09-03 — and relayed
to the foreman box as `OWNER-APPROVAL-S129-MASTER-PUSH-PR-488-1`. CONFIRM THAT ROW IS IN YOUR BOX
before ORDER B. If it is not, STOP: a card is not consent.

## PREMISE

MEASURED: 2026-09-03T13:57Z, `git rev-parse phase/tool-visibility-b-1` over the bridge — the tip is the value in the `tip` fence, ahead of the base by exactly the commits the `commits` fence enumerates, every one of them beginning `PHASE-TOOL-VISIBILITY-1`. This is a READING, not a pin; ORDER A re-resolves it.
MEASURED: 2026-09-03T13:57Z, `git log --format="%s" <base>..tip | grep -v "^PHASE-TOOL-VISIBILITY-1"` returned EMPTY — no commit on the branch is foreign to this phase.
MEASURED: 2026-09-03T13:2xZ, the scout's own reading in `SCOUT-CARD-REVIEW-LANDING-TOOL-VISIBILITY-B-1-verdict` — `git ls-remote origin refs/heads/master` still returns the base in the `tip` fence, so nothing landed under this branch while it was built; pull request 488 is OPEN, not draft, base master, mergeable.
MEASURED: 2026-09-03T13:46Z, AG-4's second addendum on the bus — the two CI reds the scout's v1 verdict saw are FIXED: `relay corpus (grammar v1)` by the ORDER E grammar-header commit, and `build (24.x)`'s RULE 16 legibility ban by the tip commit, both enumerated in the `commits` fence. Those fixes are CLAIMS, not evidence — ORDER A reads CI live and settles them.
DECAYS on any push to the branch, any push to master, and on CI re-running. ORDER A re-resolves the tip, the PR state and CI. A merge planned against a photograph is a merge of something nobody reviewed — that is exactly why v1 was RED.
ON-DISAGREEMENT: if the base has moved off the `tip` fence's value, or the PR is not open, or ANY commit on the branch does not begin `PHASE-TOOL-VISIBILITY-1`, or CI on the PR HEAD is RED for anything OTHER than the three `authorityMatrix` failures in `expected-red` — STOP and report. Do not land, do not re-run, do not diagnose. A red gate is a MEASUREMENT and the Architect owns what happens next.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| the branch is ahead of the base only by commits that begin the phase prefix, enumerated in the fence | MEASURED: 2026-09-03T13:57Z, git log full-sha + subject over the bridge, and a grep for any foreign subject that returned empty | commits |
| the tip and the base are the values in the fence | MEASURED: 2026-09-03T13:57Z, git rev-parse over the bridge for the tip; the scout's 13:2xZ git ls-remote for the base | tip |
| pull request 488 is open, not draft, base master, mergeable, HEAD equal to the tip | MEASURED: the scout's gh pr view at 2026-09-03T13:2xZ, re-confirmed against its independent git ls-remote | tip |
| the CI reds the scout saw on the older sha are fixed by later commits on the branch | MEASURED: 2026-09-03T13:46Z, AG-4's second addendum naming the grammar-header commit and the tip; a CLAIM until ORDER A reads CI green | commits |
| the eval-canary is frozen and fires no model spend on this push | MEASURED: the scout's two-lens reading — `if: false` in the workflow at the tip AND CI reporting eval-canary `skipped` — at 2026-09-03T13:2xZ | canary |
| three `authorityMatrix` failures are pre-existing, time-triggered, and fail identically on a pristine master worktree | MEASURED: the scout confirmed the snapshot instant 2026-08-26T03:24:51Z, P7D bound, eight days old, at 2026-09-03T13:2xZ | expected-red |
| whether CI on the CURRENT PR HEAD is green | NOT-READ | ORDER A reads it; AG-4 reported gates still settling at the tip and held further pushes for them |

```evidence:tip
Tip of the branch, read 2026-09-03T13:57Z:

  f407277c600df550b8d858a298839110cac58378

Base — origin/master, unmoved since the branch was cut, per the scout at 2026-09-03T13:2xZ:

  d8895114744dbb23ba5633d726a0814cfe0468d5

Resolve BOTH yourself at ORDER A. Do not act on either value copied from this card; they are here so
you can tell whether the world moved, not so you can merge from them.
```

```evidence:commits
The commits on the branch, base-to-tip, oldest first, full sha and subject:

  4a004c5d7b8f07fd90af21f0b544309a8f1d9e39  GATE 1: the stage 07 span describes the REGISTERED world
  ed990384e95b8c893b5993a31a00f9a8509f3b9c  GATE 2: a badge whose floor is REACHABLE
  bac2f02c578b204d0eafb49e60761fdff6c59dd2  reseal the maps GATE 2's new modules drifted
  d516a859ab584a5ec734accd23cb897b8fde2f38  ORDER E: the AG-4 report
  d639cc7d385beedad65285eb5c09a65907777b98  ORDER E: the void-row provenance, and the box
  1268b0721efcad1ebba713e2d4424d516776eb4d  ORDER E: put the report under relay grammar v1
  f407277c600df550b8d858a298839110cac58378  RULE 16 legibility floor, and a defect in this lane's own measuring method

THE RULE, so this fence does not go stale the way v1's did: at ORDER A, enumerate the branch
yourself. EVERY commit must begin `PHASE-TOOL-VISIBILITY-1`. The COUNT is a floor, not a ceiling —
AG-4 may push another CI fix before you merge, and a new `PHASE-TOOL-VISIBILITY-1` commit is IN
SCOPE without a re-cut. A commit that does NOT begin `PHASE-TOOL-VISIBILITY-1` is a STOP: it is
foreign work and this card does not authorise landing it.
```

```scope
- GATE 1: the stage 07 span describes the REGISTERED world
- GATE 2: a badge whose floor is REACHABLE
- reseal the maps GATE 2's new modules drifted
- ORDER E: the AG-4 report
- ORDER E: the void-row provenance, and the box
- ORDER E: put the report under relay grammar v1
- RULE 16 legibility floor, and a defect in this lane's own measuring method
The members are the branch's commit subjects; their full shas are in the `commits`
fence above. This list is what the RULE governs at ORDER A — a subject outside the
`PHASE-TOOL-VISIBILITY-1` family is a STOP.
```

```evidence:canary
The eval-canary fires no model spend on this push, and the scout confirmed it on two lenses at
2026-09-03T13:2xZ:

  1. `git show <tip>:.github/workflows/build-test.yml` — the eval-canary job carries `if: false`
     under the FROZEN block naming PHASE-CANARY-FREEZE-1 and the owner's 2026-08-27 ruling.
  2. CI independently reports eval-canary `skipped`.

The same block records that eval-canary is NOT a required status context and that the ONLY required
one is `build (24.x)`. That is the context ORDER A must wait on. The owner's newer ruling
`OWNER-RULING-S129-CANARY-ONLY-ON-FINISHED-PRODUCT-1` stands over all of this: the canary does not
run until the owner rules the product finished, and nothing in this landing thaws it.
```

```evidence:expected-red
THREE failures in `authorityMatrix.test.ts` are EXPECTED and are NOT this branch's:

  the authority snapshot was taken 2026-08-26T03:24:51Z with a stated bound of P7D, and today is
  2026-09-03 — eight days, so the bound is genuinely exceeded. One test fails on the bound; two
  cascade from it. They fail identically on a PRISTINE origin/master worktree.

ANY OTHER RED IS A STOP. Do not widen this exemption by reading a different failure as "probably
the same thing" — the scout's v1 verdict caught `relay corpus` red precisely by refusing to widen
it, and that refusal is why the header got fixed instead of merged around.
```

## ORDER A — READ THE GATE BEFORE YOU TOUCH THE VERB

FIRST: confirm `OWNER-APPROVAL-S129-MASTER-PUSH-PR-488-1` is in your box. If it is not, STOP.

Then resolve the branch tip and `origin/master`. Enumerate every commit base-to-tip and confirm
each begins `PHASE-TOOL-VISIBILITY-1` — apply the `commits` fence's RULE, not its count. Confirm PR
488 is open and its HEAD equals the tip you resolved.

Then READ CI ON THE PR HEAD — S37-2 makes the unsharded CI on the PR head the single referee. Wait
for the required context `build (24.x)` to reach a CONCLUSION; `in_progress` is not a pass and there
is nothing green to read until it completes. AG-4 reported the gates still settling at the tip, so
expect to wait. Report the full CI verdict — every context, named, including `eval-canary skipped`
— BEFORE you merge, so the reading and the act sit beside each other.

If `build (24.x)` is red, or any context other than the three `authorityMatrix` failures is red,
STOP.

## ORDER B — LAND IT

Merge with `--no-ff`. **SQUASH IS FORBIDDEN** — the seven commits carry their own reasoning,
including AG-4's own record of its measurement defect, and a squash destroys it. Use the
detached-HEAD merge form (S100-3). Push to master.

Do NOT rebase, amend, or touch the branch's contents. You are landing what was reviewed and
CI-verified, not improving it.

## ORDER C — PROVE IT FROM THE REMOTE

A merge is not evidence (S63-1). Read `git ls-remote origin refs/heads/master` back and report the
tip. Confirm every branch commit is reachable from it. Report the deploy state if you can read it,
and say UNREAD if you cannot rather than assuming a push became a deployment.

## ORDER D — REPORT

File `from_lane` with artifact name `LANDING-TOOL-VISIBILITY-B1-<your-address>-report`, carrying the
ORDER A readings INCLUDING the full CI verdict, the merge commit sha in full forty hex, the ORDER C
remote reading, and the deploy state or the word UNREAD.

**The live production turn that the build card's ORDER D requires is NOT yours.** It needs a
deployed build and a real turn; the Architect reads it from the trace once the deploy is live. Do
not send production traffic.

## FALSIFIER

This card is wrong if the PR is not open, its HEAD is not the branch tip, a branch commit is foreign
to the phase, CI is red outside the named three, or no owner approval row for PR 488 is in the box.
Any of those means the world moved between the reading and the order, and the ON-DISAGREEMENT arm is
the response.

## SHARED SURFACES

One merge of an existing branch into master, and one push. NO file is edited, created or deleted. NO
governed row. NO migration. NO CI re-run. NO production traffic. The branch is not modified.

## DECISION RIGHTS

The owner approved `PHASE-TOOL-VISIBILITY-1` by name and gave the named master-push approval for PR
488 as its own bus row. The merge authority is the foreman's own: this is a producer's branch, not
a lane landing its own record, so the ⑤ exception is not in play.

You decide NOTHING about the code, the commit history, or whether a red gate is tolerable. A red
outside the named three is a STOP, not a judgement call. You decide NOTHING about the commit set
beyond applying the `PHASE-TOOL-VISIBILITY-1` rule: a foreign commit stops you.

BODIES: `PLATINUM` · `S37-2` (the PR-head CI is the referee) · `S63-1` (the merge is not the
evidence; the remote read is) · `S100-3` · `TOTAL-45` · `S61-2`.

fanout: personalized

```deliverables
branch: none — this card merges an existing branch and writes no file
report: bus row from_lane, artifact_name LANDING-TOOL-VISIBILITY-B1-<your-address>-report
```

```evidence:supersedes
This version supersedes CARD-LANDING-TOOL-VISIBILITY-B-1-v1 under S37-1. v1 is immutable and is not
edited. THE VERSION STAMPS ARE EXEMPT: title and tail anchor map to the re-cut itself. Every OTHER
difference maps to the scout note that forced it (verdict artifact_name
SCOUT-CARD-REVIEW-LANDING-TOOL-VISIBILITY-B-1-verdict, from_lane, 2026-09-03T13:30:29Z, verdict RED
on two arms):

  the commits fence becomes a RULE     <- RED two: v1 froze "four commits"; the branch carried five
    (every commit begins the phase        at the scout's reading and seven now. A landing card must
    prefix; count is a floor)             describe a moving branch by a rule, not a photograph
  the PREMISE and tip fence are         <- the same: re-measured at the current tip f407277c, with
    re-measured at f407277c               ORDER A ordered to re-resolve live rather than trust it
  the CI gate names build as the        <- RED one: the scout read relay corpus FAILURE on the old
    only required context and records      sha, outside the expected-red fence. That red is fixed by
    the reds as fixed by later             the grammar-header commit; the legibility red by the tip.
    commits                                Both are CLAIMS the foreman re-reads live
  the report-file path citation is      <- the scout's finding 5: v1 cited a report-file path that
    DROPPED; the card reads CI live         did not resolve (a hyphen mismatch), and the house form
    instead of a report file               for that name is contested. v2 cites no file path at all,
                                           so nothing has to resolve
  the canary fence gains the CI         <- the scout verified the freeze on two lenses, not one;
    skipped lens and the finished-        and OWNER-RULING-S129-CANARY-ONLY-ON-FINISHED-PRODUCT-1
    product ruling                         post-dates v1 and governs any future thaw

UNCHANGED and deliberately so: the PRECONDITION that an owner approval row must be in the box, which
the scout declined to close for itself rather than forge a heartbeat to read another lane's box —
correctly, and named here so nobody mistakes the unread precondition for an unmet one; the
`--no-ff`/squash-forbidden/S100-3 merge discipline; and the prohibition on production traffic. The
scout's structural checks — PR open, base unmoved, mergeable — carry to this version; they were
about the branch, which has only gained commits, not lost the properties it verified.
```

TAIL ANCHOR: CARD-LANDING-TOOL-VISIBILITY-B-1-v2 ends here.
