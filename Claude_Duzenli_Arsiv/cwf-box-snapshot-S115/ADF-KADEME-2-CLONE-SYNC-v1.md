<!-- relay-audit: v1 kind=card prov=1 -->
# ADF-KADEME-2-CLONE-SYNC-v1
Owner consent onay CLONE-SYNC-DISCARD: two stale local copies yield to master, then the shared clone fast-forwards
fanout: personalized - one address, AG-5.

## PREMISE - MEASURED @2026-08-23T02:24:22Z, Architect, plus your order 6 evidence
- MEASURED: git ls-remote origin refs/heads/master - the sha in evidence:master
- MEASURED: your evidence:order6 - git merge --ff-only refused because .claude/settings.json is locally modified and .claude/settings.foreman.json is locally untracked while both are tracked on master
- MEASURED: git ls-remote --heads origin - the six phase branches are gone; only phase/adf-kademe-2-ag5-report remains
- MEASURED: git show origin/master:.gitignore piped to grep pycache - __pycache__/ ignored on master
- UNMEASURED - relayed by the owner: onay CLONE-SYNC-DISCARD, 2026-08-23, naming exactly the two files above and the disposition discard
- UNMEASURED - relayed by the owner: every lane window reads .claude from this clone at launch; a stale clone is what broke S114's opening
SELF-INVALIDATION: decays on the first push to master after evidence:master.

## FALSIFIER
If git status after the fast-forward shows any entry, the sync is incomplete. If HEAD after the fast-forward differs from evidence:master, it is not a fast-forward.

## CLAIMS
| claim | basis | anchor |
|---|---|---|
| master is the commit in evidence:master | MEASURED: git ls-remote origin refs/heads/master | master |
| both local .claude copies are superseded by landed, gated versions | MEASURED: git ls-tree origin/master -- .claude/settings.foreman.json returns a blob · git diff --stat HEAD origin/master -- .claude/settings.json shows master ahead | inline |

```evidence:master
$ git ls-remote origin refs/heads/master
7a6318336b737e1ef4eccc79a58f29ca5e86bdad	refs/heads/master
```

## STANDING ORDERS
- consumed_at is RETIRED. Main checkout only; no worktree under /private/tmp is touched.

## ORDERS
```scope
- A · In the main checkout, one command per call, each printed: git checkout -- .claude/settings.json · rm .claude/settings.foreman.json · git status --porcelain -uall (expected: the pycache entry only, or nothing).
- B · git merge --ff-only origin/master · git rev-parse HEAD (expected equal to evidence:master) · git status --porcelain -uall (expected empty; the pycache entry is now ignored).
- C · git show HEAD:.claude/settings.json piped to md5sum and git show origin/master:.claude/settings.json piped to md5sum, both printed, equal.
- D · Append the three outputs to docs/relay/ADF-KADEME-2-AG5-report.md on your open branch and push; PR 352 lands at the new head by npm run land.
```

## SHARED SURFACES
main checkout ..... yours, this card
PR 352 ............ yours

## DECISION RIGHTS
the two discards ... consented by the owner by name; nothing else may be discarded
anything else in status ... STOP and name it

## DELIVERY
- Report section opens with read relay_inbox at <ISO> - read OK - N rows since ADF-KADEME-2-CLONE-SYNC-v1; closes with git status --porcelain -uall and git worktree list.
