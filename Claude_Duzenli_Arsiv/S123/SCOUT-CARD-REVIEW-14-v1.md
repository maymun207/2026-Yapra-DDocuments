<!-- relay-audit: v1 kind=card prov=1 -->
# SCOUT-CARD-REVIEW-14 · v1 — a landing card for work that was already built and nobody noticed

fanout: personalized — ONE address, scout, one copy. No sibling holds these bytes.

**THIS CARD ADVANCES NO ACCEPTANCE CRITERION AND SAYS SO.** The candidate does, indirectly: it lands
the deterministic scorer that TIER E of the acceptance contract depends on. **The scorer was built
and pushed on 2026-08-27T20:13Z and has never landed.** The standing implementation order still calls
it *"the real blocker"* and *"NOT BUILT"*. The Architect was one card away from ordering it built.

**THE CLASS THIS IS THE THIRD INSTANCE OF, TODAY.** The honestbench endpoint, the two backend rows,
and now the scorer — three items carried as blocked, each measured DONE within this session. Read the
candidate with that in mind: **its own premise could be the fourth.** If the branch is not what the
card says it is, that is the finding.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| master is `b86850250cb3d845ff5be5edc425e3304e0dc72f` at the instant in PREMISE | MEASURED: git ls-remote origin refs/heads/master | delta |
| the quoted candidate hashes to sha1 `cfd0b6bb57632ed81badf90eca9677c0f4f6deb2` over 8550 bytes, and stripping the quote prefix recovers the card, sha1 `8ee5da233b8c4dc8042b553d95d6c8d027cf2a89` over 8268 bytes | MEASURED: sha1sum and wc -c over both files, plus cmp of the recovered file against the built original | delta |
| the candidate passes the landed mechanical card check and its deliverables block parses with no defect | MEASURED: cardPreflight --check over the recovered file · MEASURED: readDeliverables from relayAudit.ts over the same file, against a broken copy that returned its planted defect | delta |
| whether the candidate's rehearsal reproduces from your own clone | NOT-READ | that is the deliverable and only your reading answers it |
| whether the scorer is CORRECT | NOT-READ | the candidate deliberately refuses to adjudicate it and so does this review; landing a measured instrument is not trusting its verdicts |

## EVIDENCE

```scope
- R1 · the branch really carries a built scorer, its tests and its report
- R2 · the merge onto master is really clean at the shas the card names
- R3 · the ground gate really passes on the MERGED tree, with no re-stamp owed
- R4 · the scorer's own tests really pass on the MERGED tree, not only on the branch
- R5 · the card's canary paragraph matches the owner's frozen ruling and does not thaw it
```

```evidence:delta
Re-measured 2026-08-28T12:41:33Z. git ls-remote origin refs/heads/master returned
b86850250cb3d845ff5be5edc425e3304e0dc72f.
    quoted    sha1 cfd0b6bb57632ed81badf90eca9677c0f4f6deb2 over 8550 bytes
    recovered sha1 8ee5da233b8c4dc8042b553d95d6c8d027cf2a89 over 8268 bytes
    recovery  sed 's/^| //'; cmp against the built original: IDENTICAL
    preflight --check over the recovered file: CP-1 through CP-11 all OK, GREEN
    deliverables present, both keys, no defect
```

## PREMISE

PRECONDITION READ AT 2026-08-28T12:41:33Z: master is the sha in CLAIMS row one — MEASURED:git ls-remote origin refs/heads/master
MEASURED:both digests, both byte counts, the byte-for-byte recovery, the preflight verdict and the deliverables parse, all from the one built file.
UNMEASURED: whether the candidate's four rehearsal readings reproduce outside the Architect's worktree — that is exactly what this round is for.

SELF-INVALIDATION: this premise decays on the next push to master, and the candidate's whole rehearsal decays with it. ON-DISAGREEMENT: if your read of the remote returns a different sha for master or for the branch, STOP and report what you read — a rehearsal measured against a tree that has moved is not a rehearsal of this landing.

## THE CHECKLIST

R1 to R5 above · R6 byte proof: recover the candidate and confirm both digests.

**R2, R3 AND R4 ARE THE LOAD-BEARING ONES AND THEY ARE ALL RE-RUNNABLE.** The candidate's rehearsal
fence prints four commands. Run at least two of them yourself. **An agreement reached by reading the
fence is not a measurement** — this loop has now caught five defects that lived exactly there.

**R5 HAS A NAMED TARGET.** The owner froze the canary and its record names one thaw condition. Say
whether the candidate's ORDER B states the freeze correctly and whether anything in the card could be
read as an instruction to repair, re-enable or investigate it.

## ORDER A — one verdict, GREEN or RED, findings named against R1 to R6

**Do not rewrite the card.** On GREEN it dispatches to the foreman unchanged. If your verdict is
GREEN, name the one thing you would look for in the landing report that would prove the trunk moved
and the corpus lens was read as numbers rather than as an adjective.

## ORDER B — one sentence

Three items were carried as blocked and measured done in one session. **Say in one sentence what a
card should be required to carry so that a "this is not built" premise cannot survive unmeasured** —
the Architect will take it to the owner beside the three rules your windows already proposed.

## FALSIFIER

Falsified if either digest differs from CLAIMS, or if the merge you rehearse conflicts where the card
says it is clean. Report that and stop.

Second arm: **a review that confirms a rehearsal it did not run has added no lens.**

## SHARED SURFACES

None. You write no file, no branch, no commit, no setting. Your reply is your only write.

## DECISION RIGHTS

The owner ruled the canary frozen and nothing here thaws it. The Architect decides that this branch is
landed rather than rebuilt and is answerable for the rehearsal. The foreman decides whether the checks
at the request head permit the landing. You rule on the verdict. Nothing here spends beyond an
ordinary trunk run — the frozen job is the expensive one and it does not fire.

## DELIVERY

Reply on the channel your boot names, addressed to this card, under the server's character ceiling.
Verdict first, the re-run readings second, the ORDER B sentence last.

## THE CANDIDATE — line-quoted, both digests in CLAIMS

Recover it with `sed 's/^| //'` over the block below. The candidate's own tail anchor is inside the
quoted block and carries the pipe prefix; THIS card's tail anchor is the last line of the file.

```evidence:candidate
| <!-- relay-audit: v1 kind=card -->
| # GO-LANDING-S123-1 · v1 — land the honestbench scorer, which has been built and unlanded since last night
| 
| **THE INSTRUMENT THE ACCEPTANCE CONTRACT'S TIER E DEPENDS ON IS BUILT.** It was pushed at
| 2026-08-27T20:13Z and has sat on its branch ever since. The standing implementation order still calls
| it *"the real blocker"* and *"NOT BUILT"*; measured, that is false. **This card does not order it
| built. It orders it landed.**
| 
| **THIS IS THE THIRD ITEM IN ONE SESSION THAT WAS CARRIED AS BLOCKED AND MEASURED DONE** — after the
| honestbench endpoint and the two backend rows. Said here so the landing is understood as closing a
| bookkeeping failure, not only a code path.
| 
| ## PREMISE
| 
| MEASURED: 2026-08-28T12:40:19Z from a fresh clone at the master sha in the `anchor` fence, and in a throwaway worktree of the branch merged with that master. Every verdict below was produced by running the thing, not by reading its report.
| MEASURED: `git ls-remote origin refs/heads/master` and the branch ref — both full shas sit in the `anchor` fence.
| ON-DISAGREEMENT: if your own `git ls-remote` returns a different sha for either ref, STOP and report what you read. A landing rehearsed against a different tree is a rehearsal of a different landing.
| UNMEASURED: the pull request's CI at its head — this container has no `gh`, so the CI referee is YOUR read at the request head under `S37-2` and this card claims nothing about it.
| DECAYS on the next push to master, and the rehearsal below decays with it — the merge was clean at the sha in the fence and at no other.
| 
| ## CLAIMS
| 
| | claim | basis | anchor |
| |---|---|---|
| | master is `b86850250cb3d845ff5be5edc425e3304e0dc72f` and the branch head is `c2c2e6bd843bc6db0bbadf05539fb9a983194ab2` at the instant in PREMISE | MEASURED: git ls-remote origin, both refs in one call | anchor |
| | the branch carries a built scorer, its tests and its report — not a design | MEASURED: git diff --name-only over the merge range, each path named in the files fence | files |
| | the branch merges onto master with no conflict | MEASURED: git merge-tree --write-tree against origin/master, which returned a tree and an empty conflict stream | rehearsal |
| | on the MERGED tree the ground artifacts need no re-stamp | MEASURED: npm run gen:arch-facts on the merged worktree, which left facts.json unchanged · MEASURED: npm run check:ground on that same tree, GREEN with regeneration identity MATCH — two gates, one tree | rehearsal |
| | the scorer's own tests pass on the MERGED tree, not only on the branch | MEASURED: npx vitest run over the scorer's test file in that worktree | rehearsal |
| | whether the whole suite and the corpus gate pass at the request head | NOT-READ | no gh in the Architect's container; that reading is yours and it is the one that decides |
| | whether the scorer is CORRECT | NOT-READ | its own report names one unit it cannot fully score, and this card does not adjudicate that — landing a measured instrument is not the same act as trusting its verdicts |
| 
| ```evidence:anchor
| $ git ls-remote origin refs/heads/master refs/heads/phase/honestbench-scorer-build-1
| b86850250cb3d845ff5be5edc425e3304e0dc72f	refs/heads/master
| c2c2e6bd843bc6db0bbadf05539fb9a983194ab2	refs/heads/phase/honestbench-scorer-build-1
| merge-base: 2e1d193b5bf809228821d1934caa5bce474f3959 — the branch is behind master and MUST be
| merged forward before it is landed. That is ORDER A.
| ```
| 
| ```evidence:files
| The branch adds or changes exactly these, enumerated rather than counted:
| - api/cwf/_lib/honestbench/scoreCore.ts
| - api/cwf/__tests__/honestbenchScoreCore.test.ts
| - docs/relay/PHASE-HONESTBENCH-SCORER-BUILD-1-AG3-report.md
| - docs/relay/PHASE-HONESTBENCH-SCORER-BUILD-1-AG3-report.json
| - docs/ground/facts.json
| - public/architecture/manifest.json
| The last two are the reseal the new module drifted. MEASURED: master has not touched either file
| since the merge-base, so there is no competing reseal to reconcile.
| ```
| 
| ```evidence:rehearsal
| Run in a throwaway worktree at the branch head, merged with origin/master:
| 
|   git merge-tree --write-tree origin/master origin/<branch>
|       -> exit 0, a tree written, conflict stream EMPTY
| 
|   npm run gen:arch-facts
|       -> "left unchanged docs/ground/facts.json (+ served copy)"
|          6 backends, 13 routing categories, 31 permissions x 3 roles, 388 phases,
|          8 declared surfaces, metricsMatchesCanonical=true
| 
|   npm run check:ground
|       -> contract shape + ancestry over 4 artifacts
|          front-matter over 6 Markdown artifacts
|          regeneration identity: MATCH (131798 canonical bytes)
|          census.log.jsonl append-only OK
|          GREEN
| 
|   npx vitest run api/cwf/__tests__/honestbenchScoreCore.test.ts
|       -> 1 file passed, 29 tests passed, exit 0
| 
| THE REHEARSAL IS NOT THE VERDICT. It says the landing is not blocked by a conflict, a stale
| reseal or a broken unit. It says nothing about the full suite or the corpus gate, which run on
| the request head and are yours to read.
| ```
| 
| ## ORDER A — MERGE MASTER FORWARD FIRST, THEN PUSH, THEN READ CI
| 
| The branch is behind master. Merge master into it with `--no-ff` discipline as always, push, and open
| or update the pull request so the checks run **on the request head**. Do not land from the old head:
| a rehearsal on a merged tree is not permission to land an unmerged one.
| 
| ## ORDER B — READ THE CHECKS JOB BY JOB, AND EXPECT THE CANARY TO BE ABSENT
| 
| Read the run at the request head and print every job with its own verdict. **`eval-canary` will be
| skipped or absent, and that is the owner's freeze working — `docs/ops/CANARY-FROZEN.md` records the
| ruling and its single thaw condition. It is NOT a fault, it is NOT to be repaired, and it is NOT to
| be reported as a gap.** Name it as frozen and move on. Any other job that is not green stops the
| landing and its text is the deliverable.
| 
| ## ORDER C — LAND IT, THE ONLY WAY LANDING HAPPENS
| 
| `npm run land`, foreman address, `--no-ff`, no squash. Print the landing's own output rather than
| summarising it. After the trunk moves, read the trunk run and report the corpus lens as numbers —
| ORPHAN and GOVERNED-VIOLATION — rather than as an adjective.
| 
| ## ORDER D — WHAT YOU DO NOT DO
| 
| You do not edit the scorer, its tests, its report or the reseal. You do not wire it to a caller: the
| module is deliberately unwired and its report says so. You do not adjudicate the finding it carries
| about the unit it cannot fully score. **A landing card lands; it does not review the work it lands.**
| 
| ## FALSIFIER
| 
| This card is wrong if the merge is not clean at the shas in the `anchor` fence. **Test that first:**
| merge master forward and say whether it conflicted. If it did, STOP and report the conflict — the
| rehearsal was run at a sha the tree has since left, and a card whose rehearsal has expired must be
| re-cut rather than pushed through.
| 
| Second arm: **a landing reported green by one lens is a landing reported by no lens.** The trunk run
| and the corpus reading are two readings and both belong in your report.
| 
| ## SHARED SURFACES
| 
| The trunk, and only through `npm run land`. You change no file on this branch, no gate, no governed
| row and no migration. The branch's own six paths are the whole of what moves.
| 
| ## DECISION RIGHTS
| 
| The owner ruled the canary frozen; nothing here thaws it. The Architect decides that this branch is
| landed rather than rebuilt, and is answerable for the rehearsal. **You decide whether the checks at
| the request head permit the landing**, and that decision is not second-guessed here — if you refuse,
| the refusal is the deliverable and it is printed verbatim.
| 
| BODIES: `docs/laws/` · `CLAUDE.md` · `docs/ops/CANARY-FROZEN.md` · `S37-2` (the request head's CI is
| the single referee) · `S63-1` (a merge is not evidence) · `S101-L2` (a provisional stamp goes stale in
| a sibling merge — the rehearsal is why this one does not) · `TOTAL-45`.
| 
| fanout: personalized
| 
| Branch `phase/honestbench-scorer-build-1` — the branch you are landing, not one you create. Report to
| `docs/relay/GO-LANDING-S123-1-AG5-report.md`.
| 
| ```deliverables
| branch: phase/honestbench-scorer-build-1
| report: docs/relay/GO-LANDING-S123-1-AG5-report.md
| ```
| 
| TAIL ANCHOR: GO-LANDING-S123-1-v1 ends here.
```

TAIL ANCHOR: SCOUT-CARD-REVIEW-14-v1 ends here.
