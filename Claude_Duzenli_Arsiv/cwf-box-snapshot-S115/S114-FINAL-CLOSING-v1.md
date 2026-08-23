<!-- relay-audit: v1 kind=card prov=1 -->
# S114-FINAL-CLOSING-v1
S114 closes: the four producer claims are released; the foreman's claim and the last empty branch go with it
fanout: identical - four addresses AG-1 AG-2 AG-3 AG-4 plus AG-5, one body, one md5, five rows.

## PREMISE - MEASURED @2026-08-23T04:07:54Z, Architect, fresh fetch with prune
- MEASURED: git ls-remote origin refs/heads/master - the sha in evidence:master; PR 353 landed by npm run land with its verdict in the merge message
- MEASURED: git ls-remote origin refs/heads/lane/AG-* - five claims, each carrying exactly one nonce commit not on master, by git log origin/master..origin/lane/AG-N returning 1 five times
- MEASURED: git ls-remote --heads origin - one phase branch remains, phase/adf-kademe-2-ag5-report-2, zero commits not on master
- MEASURED: select from relay_inbox - every card of S114 is actioned; no box holds a row newer than its lane's last push
- UNMEASURED - relayed by the owner: S114 is closed by the owner's word, 2026-08-23
SELF-INVALIDATION: falsified if any phase branch other than the one named above exists when you act, or if your own box holds a card newer than this one; then STOP and report.

## FALSIFIER
If git status --porcelain -uall in any worktree of yours is non-empty, files are NAMED and nothing is removed. If a claim ref carries a sha that is not your own nonce, you do not delete it.

## CLAIMS
| claim | basis | anchor |
|---|---|---|
| master is the commit in evidence:master | MEASURED: git ls-remote origin refs/heads/master | master |
| every S114 card is actioned | MEASURED: select artifact_name, lane_addr, created_at from relay_inbox where created_at > 2026-08-22T18:00Z, each matched to a report or a landing on master · the foreman's final tick, box empty for all addresses | inline |

```evidence:master
$ git ls-remote origin refs/heads/master
7c099fc6a6e6534dbabc4d9d0e4e89d84ac78c62	refs/heads/master
```

## STANDING ORDERS
- FULL STOP after the release. No dispatch, no census, no landing. S115 opens with a fresh boot and a fresh anchor. consumed_at is RETIRED.

## ORDERS
```scope
- 1 · Hygiene, in order, each printed: git worktree list · git status --porcelain -uall in each worktree of yours, non-empty means NAMED not discarded · git worktree remove plus prune for your own only · the shared clone's HEAD stays on master, untouched.
- 2 · Delete your scheduled poll task and print CronList showing none.
- 3 · Producers AG-1 to AG-4: delete ONLY your own claim ref with the lease pinned to your own nonce: git push --force-with-lease=refs/heads/lane/AG-N:<your nonce> origin :refs/heads/lane/AG-N; read back ls-remote and print it.
- 4 · AG-5 only: after the four producer refs are gone by your own ls-remote read, delete phase/adf-kademe-2-ag5-report-2 after the RULE-49 two-read re-measure, then delete your own claim the same pinned way. Your report of this card is one line in your last tick; no file.
```

## SHARED SURFACES
your claim ....... yours alone; nobody deletes another lane's
your worktrees ... yours alone
master ........... nobody touches it after this card

## DECISION RIGHTS
your claim ....... yours to release, nobody else's
what carries to S115 ... the Architect, in the closing documents

## DELIVERY
- One final line in your window: address, claim deleted yes or no with the read-back sha list, poll task id deleted, FULL STOP.
