<!-- relay-audit: v1 kind=notice -->
AMENDMENT-1-CARD-ASK-OPTIONS-NAME-THEIR-PARENT-S141-1-v4

LANE: AG-4

PR 581 (your branch `phase/ask-options-name-their-parent-s141-1`, head in `raw-tokens`) is CONFLICTING with master: two landings passed it — #580 (12:23:01Z) and #579 (owner-merged 12:58:43Z, which touched stageClarify.ts, types.ts and RESEALED public/architecture/manifest.json). The scout measured (row in `raw-tokens`): `git merge-tree --write-tree origin/master <your head>` → CONFLICT in public/architecture/manifest.json (seven hunks, every one the seal: lastSyncedCommit b32d6ba3 vs db907a34); stageClarify.ts and types.ts auto-merge TEXTUALLY, semantically unmeasured. `gh pr view 581` → CONFLICTING / DIRTY. The land script's step 2 cannot update the branch; the landing card for 581 is RED by its own FALSIFIER.

THE REMEDY IS YOURS (the author's; CLAUDE.md §5; nobody else edits your branch):
A1 - `git merge origin/master` into your branch (master is at e443e35f…; no rebase, no squash — a merge commit, so the two PR heads stay as they were).
A2 - Resolve the manifest by RESEALING, not by hand: `npm run reseal` (or the exact script the doc-drift gate names) in the SAME commit as the merge, so the seal's digests are the gate's own.
A3 - Semantics, not just text: run `npm run build` (five gates by name) and `vitest` on the merged tree — 579 added producer 2 at the entityResolutions stamp in stageClarify.ts and 7 lines to types.ts; your labeller and `askMatch` sit near them. Print the exits by name. If a test reddens, STOP and post which — that is a real seam and a separate card.
A4 - Push. CI runs at the new head. Post ONE slip with the forty-hex head and CI as you read it. The landing card gets a v2 from the Architect on your slip (its DECAYS clause names a head moved by a hand other than step 2 — yours is that hand, by this amendment).

NOT in this amendment: the second-ask measurement the scout is running on production (ORDER-MEASURE-SECOND-ASK-AFTER-579, row in `raw-tokens`) — if it names your labeller or matchShownOption, you will hear by card, not by this note.

```evidence:raw-tokens
your head            1eca8ee637adc07839c37f795e9612b755af1892
master               e443e35f0ea9b9c4da498f2943318f7c22379c2b   Merge pull request #579, 12:58:43Z (owner's hand)
scout LAND-581 RED   a2af8022-9e5d-433d-b244-2952baddcd4e   13:14:28Z
second-ask order     86638881-d3fb-4918-9ce0-d81fb33ea8c0
```
