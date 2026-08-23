<!-- relay-audit: v1 kind=card prov=1 -->
# ADF-KADEME-2-LAND-ORDER-v1
Last hand-landings, first script landings, clone catches up
fanout: personalized - one address, AG-5.

## PREMISE - MEASURED @2026-08-22T20:46:53Z, Architect
- MEASURED: git ls-remote origin refs/heads/master - floor in evidence:floor, unmoved since S113
- MEASURED: git ls-remote origin refs/heads/phase/adf-kademe-2-* - three branches, heads in evidence:heads
- MEASURED: git log origin/master..each - AG-3 2, AG-2 5, AG-4 3 commits; subjects carry the lane token
- MEASURED: AG-2 report - land:selftest reds=11 defects=0 control=green; dry run 349 passes order B, dry run 350 refuses SELF-LAND
- MEASURED: AG-4 report - rm of .claude/hooks/__pycache__ REFUSED by the harness, named; .gitignore half done
- MEASURED: git worktree list in the foreman boot - main checkout on master at the S112 sha; lanes work in separate worktrees under /private/tmp
- UNMEASURED - relayed by the owner: onay ADF-KADEME-2 and onay ADF-FOREMAN-REPORT-LAND
SELF-INVALIDATION: decays on any push to the three branches after the heads below, or to master.

## FALSIFIER
Orders 1-3 merging a head whose CI at that sha is not success voids the landing; order 5 landing a PR the script refuses falsifies the exception; order 6 moving a checkout that is not on master and clean is a STOP.

## CLAIMS
| claim | basis | anchor |
|---|---|---|
| the floor is the commit in evidence:floor | MEASURED: git ls-remote origin refs/heads/master | floor |
| the three heads this card lands are in evidence:heads | MEASURED: git ls-remote origin refs/heads/phase/adf-kademe-2-* | heads |
| no landing script is on master yet | MEASURED: grep "land" over origin/master package.json · ls-tree origin/master scripts piped to grep -i land | inline |

```evidence:floor
$ git ls-remote origin refs/heads/master
922ef571a4d8e1c6c9dd751d6c20f6ec144b3eea	refs/heads/master
```

```evidence:heads
$ git ls-remote origin 'refs/heads/phase/adf-kademe-2-*'
6e589b8a9e403c47bbd4ef6f960628216ea6f026	refs/heads/phase/adf-kademe-2-claim-ceiling
fbbf6da697392fe764decf64c0cb009830aadd2b	refs/heads/phase/adf-kademe-2-land-script
b1e0b8e1245a33acb5d8e08177b7439e74ac70f4	refs/heads/phase/adf-kademe-2-guard
```

## STANDING ORDERS
- The fence opens for orders 1-3 only, by the Kademe 1 hand procedure, because the script replacing it is inside them. consumed_at is RETIRED.

## ORDERS
```scope
- 1 · Land PR 349 (claim-ceiling): update branch, CI at the updated head success with SKIPPED named, gh pr merge 349 --auto --merge, read master back.
- 2 · Land PR 350 (land-script) likewise.
- 3 · Land the guard PR the same way; if its update from master conflicts, STOP and poke AG-4 naming the conflict; never resolve it yourself.
- 4 · On master: npm run land:selftest, transcript pasted; eleven reds and a green control are order 5's precondition. Fewer is a STOP.
- 5 · npm run land -- 344, then 346, then 348 - your report-only PRs, admitted by the path rule, one at a time, each result pasted.
- 6 · Shared clone, main checkout only: git status --porcelain -uall; if only the two .claude entries already on master, git merge --ff-only origin/master; print new HEAD and the empty status. Anything else: STOP, name it.
- 7 · Delete the six merged phase branches, each re-measured empty against master at deletion, RULE-49.
```

## SHARED SURFACES
master ............ yours, this card only
main checkout ..... yours, order 6 only; no other worktree is touched
phase branches .... deleted only after order 7's re-measure

## DECISION RIGHTS
order of 1-3 ...... fixed; a dependent red stops the queue, an independent red is reported
whether 5 lands ... the script, never you
conflicts ......... the authoring lane, by poke

## DELIVERY
- Report docs/relay/ADF-KADEME-2-AG5-report.md plus JSON twin: each landing's merge sha, the selftest transcript, the ff result; open its PR, land it with npm run land.
- Report opens with read relay_inbox at <ISO> - read OK - N rows since ADF-KADEME-2-LAND-ORDER-v1; closes with git status --porcelain -uall and git worktree list.
