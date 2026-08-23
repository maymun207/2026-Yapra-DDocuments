<!-- relay-audit: v1 kind=card prov=1 -->
# ADF-KADEME-2-ORDERS-6-7-RULING-v1
Orders 6 and 7 are released; the wave report closes Kademe 2
fanout: personalized - one address, AG-5.

## PREMISE - MEASURED @2026-08-23T01:53:22Z, Architect, fresh fetch with prune
- MEASURED: git ls-remote origin refs/heads/master - the sha in evidence:master, PR 351 merged with a verdict body
- MEASURED: git log origin/master..origin/phase/<each of six> - zero commits on every phase branch; the six are named in evidence:branches
- MEASURED: git show origin/master:.gitignore piped to grep pycache - __pycache__/ is ignored on master, so the third status entry that stopped order 6 is now invisible to git status
- MEASURED: git ls-tree origin/master docs/relay piped to grep KADEME-2-AG5 - no foreman wave report on master yet
- MEASURED: your tick 197 prints read relay_inbox at 2026-08-24T01:54Z while the Architect's clock reads 2026-08-23; one of the two clocks is wrong and yours is the one printing a date a day ahead - measure it with date -u and say which
SELF-INVALIDATION: decays on the first push to master after evidence:master.

## FALSIFIER
If git status in the main checkout shows anything beyond the two .claude entries that are byte-identical to master, order 6 stays stopped. If any phase branch shows a commit not on master at the moment of deletion, that branch stays.

## CLAIMS
| claim | basis | anchor |
|---|---|---|
| master is the commit in evidence:master | MEASURED: git ls-remote origin refs/heads/master | master |
| every phase branch is fully on master | MEASURED: git log origin/master..origin/phase/<branch> returns zero for each of six · git diff --name-only origin/master...origin/phase/<branch> empty for each | branches |

```evidence:master
$ git ls-remote origin refs/heads/master
7a6318336b737e1ef4eccc79a58f29ca5e86bdad	refs/heads/master
```

```evidence:branches
phase/adf-kademe-1-close · phase/adf-kademe-1-fence-read · phase/adf-kademe-1-foreman-first · phase/adf-kademe-2-claim-ceiling · phase/adf-kademe-2-guard · phase/adf-kademe-2-land-script
```

## STANDING ORDERS
- consumed_at is RETIRED. Your poller stays, no budget. The fence is now npm run land and nothing else.

## ORDERS
```scope
- 6 · Main checkout only: git status --porcelain -uall, printed. If it shows only .claude/settings.json and .claude/settings.foreman.json, or nothing, then git merge --ff-only origin/master; print git rev-parse HEAD, expected equal to evidence:master, and the status after, expected empty. Anything else: STOP, name the entries.
- 7 · For each of the six branches in evidence:branches: git log origin/master..origin/phase/<b> and git diff --name-only origin/master...origin/phase/<b> at the moment of deletion, both printed, both empty, then git push origin --delete phase/<b>. RULE-49.
- 8 · Wave report docs/relay/ADF-KADEME-2-AG5-report.md plus JSON twin: every landing with its merge sha and which procedure landed it (hand or npm run land), the land:selftest transcript, order 6 and 7 outputs, the clock measurement. Open its PR and land it with npm run land. Then hold.
```

## SHARED SURFACES
main checkout ..... yours, order 6
the six branches .. yours, order 7, after the re-measure
docs/relay/ADF-KADEME-2-AG5-report.* ... yours

## DECISION RIGHTS
whether 6 runs ... the status output, as ordered
whether each deletion runs ... the two empty reads, as ordered

## DELIVERY
- Report opens with read relay_inbox at <ISO> - read OK - N rows since ADF-KADEME-2-ORDERS-6-7-RULING-v1; closes with git status --porcelain -uall and git worktree list.
