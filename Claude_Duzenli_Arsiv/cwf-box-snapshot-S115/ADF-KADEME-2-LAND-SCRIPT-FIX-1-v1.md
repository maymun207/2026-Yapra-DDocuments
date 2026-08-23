<!-- relay-audit: v1 kind=card prov=1 -->
# ADF-KADEME-2-LAND-SCRIPT-FIX-1-v1
Order B ruled: authorship is the lane token in commit subjects, never the login
fanout: personalized - one address, AG-2.

## PREMISE - MEASURED @2026-08-22T19:45:00Z, Architect, fresh fetch
- MEASURED: git ls-remote origin refs/heads/phase/adf-kademe-2-land-script - head in evidence:branchhead, two commits over the floor in evidence:floor
- MEASURED: grep authorIsLander on scripts/land.ts at that head - order B compares PR author.login with the gh api user login
- MEASURED: the AG-2 report, its evidence:selfland - author=maymun207 lander=maymun207 on PR 348 and 349; one login for all lanes by owner ruling S113-H3
- MEASURED: git log --format=%s over both branch commits - each subject begins ADF-KADEME-2 AG-2:, same shape as AG-3 on PR 349
- MEASURED: land:selftest transcript in the report - reds=10 defects=0, CONTROL exit 0
- UNMEASURED - relayed by the owner: consent onay ADF-KADEME-2 covers this fix
SELF-INVALIDATION: decays on any push to phase/adf-kademe-2-land-script after the head above, and on the first push to master after the floor.

## FALSIFIER
An AG-5-authored product PR landing under lander AG-5 falsifies the fix; so does a mixed-token PR landing, or an AG-2 product PR refused under lander AG-5.

## CLAIMS
| claim | basis | anchor |
|---|---|---|
| the floor is the commit in evidence:floor | MEASURED: git ls-remote origin refs/heads/master | floor |
| the branch head this card rules on is in evidence:branchhead | MEASURED: git ls-remote origin refs/heads/phase/adf-kademe-2-land-script | branchhead |
| order B as shipped refuses every product PR | MEASURED: the report's evidence:selfland, authorIsLander true on both dry runs · gh pr view 349 --json files, no docs/relay path | inline |
| commit subjects already carry the lane token | MEASURED: git log --format=%s origin/master..origin/phase/adf-kademe-2-land-script · the same over origin/phase/adf-kademe-2-claim-ceiling | inline |

```evidence:floor
$ git ls-remote origin refs/heads/master
922ef571a4d8e1c6c9dd751d6c20f6ec144b3eea	refs/heads/master
```

```evidence:branchhead
$ git ls-remote origin refs/heads/phase/adf-kademe-2-land-script
8581cdf85a6183992fca618e59c410e022e28a4c	refs/heads/phase/adf-kademe-2-land-script
```

## STANDING ORDERS
- Ten refusal classes are ACCEPTED; "seven" is superseded by "every class land:selftest prints". consumed_at is RETIRED. You do not merge.

## ORDERS
```scope
- A · Author lane. judgeReportOnly takes an author LANE, not a login. The author lane is the token AG-<n> read from every commit subject in origin/master..head; all subjects must carry the same token, else refuse with new class AUTHOR-UNKNOWN and print the offending subjects. The lander lane is the claim the running window holds, read from its lane ref and nonce, or ADF_LANE_ROLE when set; unreadable means AUTHOR-UNKNOWN, never a pass.
- B · SELF-LAND fires only when author lane equals lander lane and a path leaves docs/relay. The login comparison is deleted.
- C · Self-test gains AUTHOR-UNKNOWN and a CONTROL where author AG-2 lands under lander AG-5 with product paths; the falsifier test covers the new class.
- D · Re-run dry runs 348 and 349, paste them; 349 now passes order B and still stops at its step 3 reading.
```

## SHARED SURFACES
scripts/land.ts, scripts/landSelfTest.ts, its test ... AG-2 sole owner
docs/relay/ADF-KADEME-2-AG2-report.md and .json ..... AG-2, updated on the same branch

## DECISION RIGHTS
token grammar in subjects ... AG-2 may tighten, never loosen; report it
lander lane definition ...... the claim ref, as ordered; widening is the Architect's
eleven classes .............. accepted in advance; more are reported

## DELIVERY
- Same branch phase/adf-kademe-2-land-script; fix commits on top, subjects starting ADF-KADEME-2 AG-2:.
- PR 350 stays open; the foreman re-reads it at its new head.
- Report opens with read relay_inbox at <ISO> - read OK - N rows since ADF-KADEME-2-LAND-SCRIPT-FIX-1-v1; closes with git status --porcelain -uall and git worktree list.
