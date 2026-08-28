<!-- relay-audit: v1 kind=card -->
# GO-LANDING-S122-2 · v1

Two branches to land, and a backlog to name. The first carries the last of this session's
ordered work; the second is your own landing report from the previous card, which is currently
a report nobody can find from master.

## PREMISE

MEASURED: 2026-08-28T06:30Z, a fresh clone — the two branches named in the `state` fence are ahead of master, each carries its report, and one of them already merged master in as its card ordered.
MEASURED: same run, `git branch -r` walked against master — eight unlanded branches carry a report authored by this lane; the count is in the `backlog` fence.
MEASURED: `grep -n` over the landing script — a report-only exception exists and is decided by a path list, not a flag.
ON-DISAGREEMENT: if your own `git ls-remote origin refs/heads/master` differs from the sha in the `evidence:anchor` fence, STOP and report both values; do not land anything.
DECAYS on the first landing: the second branch's state must be re-read after the first lands rather than trusted from this card.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| master is the sha this card was written against | MEASURED: git ls-remote origin refs/heads/master | anchor |
| both branches are ahead of master and carry their reports | MEASURED: git rev-list --count and git ls-tree over each branch | state |
| the first branch already merged master in, as its own card ordered | MEASURED: git merge-base --is-ancestor origin/master <branch> | state |
| the first branch was authored by another lane; the second by this one | MEASURED: git log --format over each branch's own commits | state |
| a report-only exception exists in the landing script and is decided by a path list | MEASURED: grep -n over scripts/land.ts | exception |
| eight unlanded branches carry a report authored by this lane | MEASURED: git branch -r walked against master, counting report paths per branch | backlog |
| which of those eight qualify for the report-only exception | NOT-READ | it depends on each branch's full path list, which ORDER C tells you to read rather than guess |

```evidence:anchor
$ git ls-remote origin refs/heads/master
1e5d5cf4ed02406d46b3ecedb7c1cb6c53947fd2
```

```evidence:state
branch                        ahead  report            author   master merged in
phase/cp8-reconcile-1           4    AG2-report.md      AG-2     YES
phase/go-landing-s122-1         ?    AG5-report.md      AG-5     re-read it
The first is another lane's work, so the ordinary authorship gate passes it.
The second is YOUR OWN report, so it passes only through the report-only exception.
```

```evidence:exception
$ grep -n 'report-only exception' scripts/land.ts
167: the one path prefix the report-only exception recognises. Widening is the Architect's.
886: ORDER B - the report-only exception, decided BY THE PATH LIST and never by a flag.
966: author lane equals lander lane, PERMITTED by the report-only exception
So a branch whose ENTIRE changed-path list sits under the recognised prefix may be landed by
its own author. A branch that also touches anything else may not, and no flag overrides that.
```

```evidence:backlog
eight unlanded branches carry a report authored by this lane:
  authorship-lens-2 · backlog-landing-order-1 · build-docs-assertion-1 ·
  context-retrieval-1-organ · execute-landing-1 · go-landing-s122-1 ·
  landing-plan-1 · nightly-compat-red-1
This is an accumulation, not an incident. ORDER C asks you to classify it, not to clear it.
```

## ORDER A — land the finished work first

Land `phase/cp8-reconcile-1`. It is another lane's work, it already merged master in, and it
completes the last ordered item of this session's program. Run the landing script once, with
the lane role carried as a per-command prefix, and read the result before anything else.

## ORDER B — then land your own landing report, through the exception

Land `phase/go-landing-s122-1`. It is your own report from the previous landing card, and it
qualifies **only** if its entire changed-path list sits under the prefix the exception
recognises. **Read that path list first and print it.** If anything outside the prefix is
present, the exception does not apply: STOP on that branch, print the offending path, and say
so. Do not widen the prefix — widening is the Architect's, and this card does not widen it.

## ORDER C — name the backlog, do not clear it

For each of the eight branches in the `backlog` fence, print one line: the branch, its full
changed-path list reduced to whether it is report-only or not, and therefore whether the
exception would admit it. **Classify only. Land none of them under this card.**

The point is a decision the Architect owes and cannot make blind: whether a standing accumulation
of this lane's own reports is a backlog to be worked or a signal that the exception is drawn too
narrowly. That decision needs the classification, not more landings.

## ORDER D — both stop lenses after EVERY landing

```lenses
- the repository's own relay-corpus auditor over the new trunk tree: ORPHAN and GOVERNED-VIOLATION counts
- the trunk push run's own job conclusions, job by job
```

Report them as NUMBERS. A documents-only merge fires no build run at all, by that workflow's
path filter; where that happens report the build lens as **ABSENT**, never as green.

**Two consecutive post-landing reds on the same assertion = stop and report.**

## ORDER E — report what did NOT land, with its reason

Name every branch you did not land and why, one line each, including all eight in the backlog
fence and anything ORDER B stopped on.

## FALSIFIER

This card is wrong if, after it runs, `phase/cp8-reconcile-1` is still unlanded and no refusal
text explains why. That branch is the session's last ordered deliverable; silence about it is
the failure mode.

## SHARED SURFACES

You are the only actor with merge authority. Touch no source file; this card orders landings, a
classification and a report. Do not update, rebase or force any branch except through the
landing script's own step 2. Do not widen the report-only path prefix.

## DECISION RIGHTS

The Architect decides the order, and decides what happens to the backlog AFTER reading your
classification. The lane decides nothing about sequence. NOBODY widens the exception under this
card.

Two repair attempts per artifact. On a second refusal, STOP, attach both refusal texts verbatim,
and escalate.

BODIES: docs/laws/ constitution and rules · CLAUDE.md · the project box · the foreman boot ·
the landing script and its gates · OWNER-RULING-S122-T1-v1 · DIRECTIVES v1.1 · P-4 · P-9.

fanout: personalized

Report to `docs/relay/GO-LANDING-S122-2-AG5-report.md` on a fresh branch
`phase/go-landing-s122-2`.

TAIL ANCHOR: GO-LANDING-S122-2-v1 ends here.
