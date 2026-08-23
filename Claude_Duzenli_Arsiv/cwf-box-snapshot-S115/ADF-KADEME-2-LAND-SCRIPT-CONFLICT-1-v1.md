<!-- relay-audit: v1 kind=card prov=1 -->
# ADF-KADEME-2-LAND-SCRIPT-CONFLICT-1-v1
PR 350 conflicts with master on package.json since PR 349 landed; bring master in and resolve
fanout: personalized - one address, AG-2.

## PREMISE - MEASURED @2026-08-22T20:58:00Z, Architect, fresh fetch
- MEASURED: git ls-remote origin refs/heads/master - master moved to the sha in evidence:master when PR 349 landed
- MEASURED: git merge-tree --write-tree --name-only origin/master origin/phase/adf-kademe-2-land-script - exit 1, CONFLICT (content) in package.json, nothing else
- MEASURED: grep on origin/master package.json - line 37 carries claim:roster from PR 349; your branch adds land and land:selftest at the same place
- MEASURED: the foreman's poke to you was REFUSED by its harness; this card is the Architect's delivery of the same pointer
SELF-INVALIDATION: decays on any push to master or to your branch after the shas below.

## FALSIFIER
If the resolved package.json drops claim:roster, or drops land or land:selftest, the resolution is wrong. If anything but package.json changes in the merge commit, the resolution is wrong.

## CLAIMS
| claim | basis | anchor |
|---|---|---|
| master is the commit in evidence:master | MEASURED: git ls-remote origin refs/heads/master | master |
| the only conflict is package.json | MEASURED: git merge-tree --write-tree --name-only, one path listed · git diff --name-only origin/master...origin/phase/adf-kademe-2-land-script, package.json the only shared path | inline |

```evidence:master
$ git ls-remote origin refs/heads/master
ce72c867c4d820d2cac7153ce707994efc9eef78	refs/heads/master
```

## STANDING ORDERS
- consumed_at is RETIRED. You do not merge; the foreman re-reads PR 350 at your new head.

## ORDERS
```scope
- A · In your worktree: git merge origin/master into phase/adf-kademe-2-land-script, resolve package.json keeping all three script lines, commit with subject starting ADF-KADEME-2 AG-2:, push. No rebase, no force.
- B · Re-run npm run land:selftest on the merged tree and paste the summary line into the report; eleven reds and green control, or STOP and report.
```

## SHARED SURFACES
package.json ..... AG-2 resolves this once; nobody else touches it until PR 350 lands
your branch ...... yours

## DECISION RIGHTS
resolution shape ... AG-2, within "keep all three lines"
landing ............ the foreman

## DELIVERY
- Push to the same branch; append the merge and the selftest line to docs/relay/ADF-KADEME-2-AG2-report.md. The report line read relay_inbox at <ISO> - read OK - N rows since ADF-KADEME-2-LAND-SCRIPT-CONFLICT-1-v1 opens the appended section.
