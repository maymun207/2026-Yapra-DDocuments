<!-- relay-audit: v1 kind=card prov=1 -->
# ADF-KADEME-2-LAND-SCRIPT-v1
npm run land: seven steps, seven-class gate self-test
fanout: personalized - one address, AG-2.

## PREMISE - MEASURED @2026-08-22T18:40:00Z, Architect, fresh clone
- MEASURED: git ls-remote origin refs/heads/master - floor in evidence:floor
- MEASURED: grep "land" over origin/master package.json - no land script; architect:open found by the same probe
- MEASURED: grep -c "gh pr merge" on origin/master .claude/settings.json is 0; on settings.foreman.json is 1
- MEASURED: gh pr list --state open, foreman window - 344 346 348, all foreman report PRs
- UNMEASURED - relayed by the owner: consent onay ADF-KADEME-2, 2026-08-22
- UNMEASURED - relayed by the owner: ruling onay ADF-FOREMAN-REPORT-LAND, 2026-08-22, the report-only exception below
SELF-INVALIDATION: decays on the first push to master after the floor. Re-measure before branching; if moved, branch from the measured head and say so.

## FALSIFIER
A PR whose head differs from the sha CI judged passing step 3, or a PR touching a path outside docs/relay passing the report-only exception, falsifies the gate. Any class in order C producing green has no gate.

## CLAIMS
| claim | basis | anchor |
|---|---|---|
| the floor is the commit in evidence:floor | MEASURED: git ls-remote origin refs/heads/master | floor |
| no landing script exists today | MEASURED: grep "land" over origin/master package.json · ls-tree origin/master scripts piped to grep -i land | inline |
| producers hold no merge permission on master | MEASURED: grep -c "gh pr merge" on .claude/settings.json returns 0 · the same grep on .claude/settings.foreman.json returns 1 | inline |

```evidence:floor
$ git ls-remote origin refs/heads/master
922ef571a4d8e1c6c9dd751d6c20f6ec144b3eea	refs/heads/master
```

## STANDING ORDERS
- consumed_at is RETIRED; read the box by created_at. You do not merge: prove the script by fixtures and a dry run stopping before step 5.

## ORDERS
```scope
- A · scripts/land.ts as npm run land -- <pr>, seven steps, each printing its measurement: 1 lock = empty-lease push of refs/landing/lock, refuse if held · 2 PR head as 40-hex, update branch from master · 3 CI at that exact head via actions API head_sha, total_count >= 1 and every conclusion success, SKIPPED named · 4 git merge-tree rehearsal, print expected tree sha · 5 gh pr merge <n> --auto --merge -F <verdict.md> · 6 master tree sha equals step 4 · 7 release lock. Any failure prints its class and exits 2; no retry.
- B · Report-only exception, before step 5: git diff --name-only master...head; if every path is under docs/relay/ the landing foreman may be the author; otherwise author-equals-lander is refused, class SELF-LAND. Decided by the path list, never a flag.
- C · npm run land:selftest: seven fixtures, one per class: LOCK-HELD · HEAD-NOT-40HEX · CI-NOT-SUCCESS · CI-ZERO-RUNS · TREE-MISMATCH · SELF-LAND · LOCK-LEAK. Each exits 2 with its class. Seven reds are the deliverable; a green fixture is a defect.
- D · Tests under api/cwf/__tests__, existing script-test shape.
```

## SHARED SURFACES
scripts/land.ts, scripts/landSelfTest.ts ... AG-2 sole owner
package.json (two script lines) ........... AG-2 only, this wave
.claude/** ................................ nobody this card

## DECISION RIGHTS
step order and class names ..... AG-2 within the seven named; additions reported
report-only definition ......... the path rule above; widening is the Architect's
who runs it first .............. the Architect, after seven reds are on master

## DELIVERY
- Branch phase/adf-kademe-2-land-script from the measured floor; push early.
- Report docs/relay/ADF-KADEME-2-AG2-report.md plus JSON twin per REPORT-SCHEMA-v1, every number MEASURED, seven red outputs verbatim.
- Open the pull request against master. Do not merge it; the foreman lands it under the Kademe 1 procedure.
- Report opens with read relay_inbox at <ISO> - read OK - N rows since ADF-KADEME-2-LAND-SCRIPT-v1; closes with git status --porcelain -uall and git worktree list, printed.
