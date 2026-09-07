<!-- relay-audit: v1 kind=card prov=1 -->
# CARD-HOLDS-RELEASE-1 · v1 — execute OWNER-RULING-S131-HOLDS-1: re-measure the three held refs merged-by-content at the forty hex, re-read your box, and delete each one by computed identity — or keep it and say why
lane: AG-5
report: docs/relay/HOLDS-RELEASE-1-AG5-report.md
fanout: personalized

Hygiene stage 3 (bootstrap v131 FIRST JOB 4). The owner ruled (`ruling` fence). This card is DESTRUCTIVE: it deletes three refs on origin. Every deletion here rests on a reading you take yourself at action time, never on the Architect's reading below — that reading is the premise, yours is the licence.

## PREMISE
- MEASURED: 2026-09-06T06:4xZ by the Architect on the owner's clone refs (as of the last lane fetch), `GIT_OPTIONAL_LOCKS=0`: `probe/force-150316` and `probe/plain-150316` each carry ONE commit over master with an EMPTY `git diff --stat origin/master...<tip>`; `phase/authorship-lens-2` carries a merge and one AG-3 commit touching `scripts/land.ts`, `scripts/landSelfTest.ts`, `api/cwf/__tests__/landScript.test.ts` (+270/−38), and `git diff <master-commit> origin/phase/authorship-lens-2 -- <those three files>` is EMPTY against the master commit in the `carried` fence, which `git merge-base --is-ancestor` confirms is on master.
- MEASURED: 2026-09-06T06:39Z, your own `OWNER-TABLE-CLOSE-1-AG5-report`: the eleven branches survived the closes; nothing in this card touches them.
- UNMEASURED: whether any of the three refs moved since the Architect's read. ORDER A re-reads each at the forty hex; the values in the `tips` fence are what the Architect saw and are NOT the values you act on.
- ON-DISAGREEMENT: if a ref's tip differs from the `tips` fence, re-take BOTH lenses at the new tip and act only on what you measure; if either lens fails, that ref STAYS and is reported. If a ref is already absent from origin, report ABSENT and do not treat it as done by you.
- DECAYS the moment any of the three refs moves or master receives a commit touching the three files named above.

## CLAIMS
| claim | basis | anchor |
|---|---|---|
| the ruling this card executes | MEASURED: owner's word in the Architect chat, recorded as OWNER-RULING-S131-HOLDS-1 | ruling |
| the tips the Architect read | MEASURED: git log -1 on origin refs in the owner's clone, 2026-09-06T06:4xZ | tips |
| the master commit that carries authorship-lens-2's content | MEASURED: git merge-base --is-ancestor and a three-file diff, both in the owner's clone | carried |
| the tips at action time, both lenses, the box read, the deletions | NOT-READ | ORDERS A–C measure them |

```evidence:ruling
OWNER-RULING-S131-HOLDS-1 (2026-09-06, "onaylıyorum"): the three refs are deleted by the foreman after two-lens re-measurement and a fresh box read, by computed identity; a ref whose reading fails stays and is reported.
```

```evidence:tips
phase/authorship-lens-2   70be784997f3c1855a37276cf7af8cfec487fc3b
probe/force-150316        af856683c3b4ddbdd77f9552cf8775b3bea88f03
probe/plain-150316        e2a899dbf283335a898cea160bbe188ea06809fc
```

```evidence:carried
e865431eb8082391d29a90aca0f91d63938518a2
```

## SCOPE
```scope
- refs/heads/probe/force-150316 on origin
- refs/heads/probe/plain-150316 on origin
- refs/heads/phase/authorship-lens-2 on origin
```
Those three, in that order (the two empty probes first). Nothing else.

## ORDER A — RE-MEASURE, PER REF, AT THE FORTY HEX
`git fetch origin --prune` then for each ref: `git ls-remote origin refs/heads/<name>` (the tip you will act on, printed whole). Lens 1: `git diff --stat origin/master...<tip>` — for the probes expect EMPTY; for authorship-lens-2 expect the three files, then Lens 1b: `git diff <carried> <tip> -- scripts/land.ts scripts/landSelfTest.ts api/cwf/__tests__/landScript.test.ts` expect EMPTY and `git merge-base --is-ancestor <carried> origin/master; echo $?` expect 0. Lens 2: `git log --oneline origin/master..<tip>` — print the commits so the reader sees what is being released. A ref passes only if its lenses read exactly as expected.

## ORDER B — FRESH BOX READ, THEN DELETE, ONE REF AT A TIME
Immediately before EACH deletion: re-read the box (`node scripts/mail-wait.mjs AG-5 --once`); if any card has arrived since this one, STOP and report rather than proceeding. Then `git push origin --delete refs/heads/<name>` — the name only, for a ref whose ORDER A reading passed. After each: `git ls-remote origin refs/heads/<name>` must return nothing; print it. A ref that failed ORDER A is skipped with its readings quoted.

## ORDER C — MEASURE THE NAMESPACE
`git ls-remote --heads origin | wc -l` before ORDER B and after; the difference must equal the number of refs you deleted and nothing else. Print both counts and the diff of the two listings restricted to the three names.

## ORDER D — REPORT
File `docs/relay/HOLDS-RELEASE-1-AG5-report.md` on branch `phase/holds-release-1` with ORDER A readings per ref, each box read, each deletion's ls-remote proof, ORDER C counts. Open its PR and leave it OPEN (your own observation report). Post the same text as a from_lane row `HOLDS-RELEASE-1-AG5-report`.

## FALSIFIER
Wrong if any ref outside the scope fence disappears (ORDER C catches it), if a deletion happens on a ref whose lens failed, or if a deletion happens without the box read immediately before it.

## SHARED SURFACES
Three refs on origin (deleted). No file, no governed row, one bus row.

## DECISION RIGHTS
None — the ruling decided; you re-measure, execute, and report.

BODIES: OWNER-RULING-S131-HOLDS-1 · RULE-49 · S98-L2 (a destructive order names its target by computed identity) · S100-3 · TOTAL-45.

```deliverables
three refs deleted (or kept with readings), each proven by a post-delete ls-remote
namespace count before/after
report file docs/relay/HOLDS-RELEASE-1-AG5-report.md on phase/holds-release-1 with an OPEN PR
bus row from_lane HOLDS-RELEASE-1-AG5-report
```

TAIL ANCHOR: CARD-HOLDS-RELEASE-1-v1 ends here.
