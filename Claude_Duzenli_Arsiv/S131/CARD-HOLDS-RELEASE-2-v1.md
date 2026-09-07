<!-- relay-audit: v1 kind=card prov=1 -->
# CARD-HOLDS-RELEASE-2 · v1 — the one ref HOLDS-RELEASE-1 correctly left standing: retry the box read that the classifier refused, and delete `phase/authorship-lens-2` only if it succeeds
lane: AG-5
report: docs/relay/HOLDS-RELEASE-2-AG5-report.md
fanout: personalized

Your HOLDS-RELEASE-1 report was right to stop: every lens on `phase/authorship-lens-2` passed, but the harness classifier refused the fresh box read immediately before the third deletion, and the card's falsifier forbids a deletion without it. This card is that third deletion, alone, under the same ruling. It changes nothing about the rule — a refused box read is still a STOP.

## PREMISE
- MEASURED: 2026-09-06T21:39Z, your own `HOLDS-RELEASE-1-AG5-report` (the later of the two rows): probes deleted and proven absent; `phase/authorship-lens-2` passed both lenses (three-file diff against the `carried` commit EMPTY; `merge-base --is-ancestor` exit 0) and was NOT deleted because the box read was refused; the classifier's refusal was INTERMITTENT (refused, succeeded, refused within minutes).
- MEASURED: 2026-09-06T21:50Z by the Architect on the owner's clone refs: `origin/phase/authorship-lens-2` still at the tip in the `tip` fence; both probe refs gone; namespace 20 heads plus your report branch.
- UNMEASURED: whether the classifier admits the box read this time. ORDER B tries it; a second refusal is a reading, reported as such, and the ref stays.
- ON-DISAGREEMENT: if the tip differs from the `tip` fence, re-take both lenses at the new tip and act only on what you measure; if either fails, the ref STAYS. If the ref is already absent, report ABSENT.
- DECAYS the moment the ref moves or master receives a commit touching `scripts/land.ts`, `scripts/landSelfTest.ts` or `api/cwf/__tests__/landScript.test.ts`.

## CLAIMS
| claim | basis | anchor |
|---|---|---|
| the ruling this card executes | MEASURED: owner's word in the Architect chat, recorded as OWNER-RULING-S131-HOLDS-1 | ruling |
| the ref's tip as last read | MEASURED: git for-each-ref on origin refs in the owner's clone, 2026-09-06T21:50Z | tip |
| the master commit carrying its content | MEASURED: your own lens2 fence in HOLDS-RELEASE-1-AG5-report | carried |
| the box read and the deletion | NOT-READ | ORDER B measures them |

```evidence:ruling
OWNER-RULING-S131-HOLDS-1: deleted by the foreman after two-lens re-measurement and a fresh box read, by computed identity; a ref whose reading fails stays and is reported.
```

```evidence:tip
70be784997f3c1855a37276cf7af8cfec487fc3b
```

```evidence:carried
e865431eb8082391d29a90aca0f91d63938518a2
```

## SCOPE
```scope
- refs/heads/phase/authorship-lens-2 on origin
```
That one ref. Nothing else.

## ORDER A — RE-MEASURE AT THE FORTY HEX
`git fetch origin --prune`; `git ls-remote origin refs/heads/phase/authorship-lens-2` (print whole). Lens 1: `git diff <carried> <tip> -- scripts/land.ts scripts/landSelfTest.ts api/cwf/__tests__/landScript.test.ts` expect EMPTY. Lens 2: `git merge-base --is-ancestor <carried> origin/master; echo $?` expect 0. Lens 3: `git log --oneline origin/master..<tip>` print the commits being released.

## ORDER B — FRESH BOX READ, THEN DELETE
Immediately before the deletion: re-read the box (`node scripts/mail-wait.mjs AG-5 --once`). If the classifier refuses the read, STOP: print the refusal text verbatim, do not delete, report — that is the same correct outcome as last time and not a failure of yours. If the read succeeds and shows no card newer than this one: `git push origin --delete refs/heads/phase/authorship-lens-2`, then `git ls-remote origin refs/heads/phase/authorship-lens-2` must return nothing; print it.

## ORDER C — MEASURE THE NAMESPACE
`git ls-remote --heads origin | wc -l` before and after; the diff of the two listings must show exactly this ref removed and, at most, your report branch added.

## ORDER D — REPORT
File `docs/relay/HOLDS-RELEASE-2-AG5-report.md` on branch `phase/holds-release-2`; open its PR and leave it OPEN; post the same text as a from_lane row `HOLDS-RELEASE-2-AG5-report`. Post it ONCE — your previous report went up twice under one name three minutes apart, which is the F-MAILWAIT-DUPLICATE-NAME class; if you must correct a posted report, the correction is a new name with a suffix, not a second row under the same name.

## FALSIFIER
Wrong if the deletion happens without a successful box read immediately before it, if any other ref disappears, or if the ref is deleted with a lens failing.

## SHARED SURFACES
One ref on origin (deleted, or kept). One bus row.

## DECISION RIGHTS
None — the ruling decided.

BODIES: OWNER-RULING-S131-HOLDS-1 · HOLDS-RELEASE-1-AG5-report · RULE-49 · S98-L2 · TOTAL-45.

```deliverables
phase/authorship-lens-2 deleted and proven absent, or kept with the refusal quoted
namespace count before/after
report file docs/relay/HOLDS-RELEASE-2-AG5-report.md on phase/holds-release-2 with an OPEN PR
bus row from_lane HOLDS-RELEASE-2-AG5-report, posted once
```

TAIL ANCHOR: CARD-HOLDS-RELEASE-2-v1 ends here.
