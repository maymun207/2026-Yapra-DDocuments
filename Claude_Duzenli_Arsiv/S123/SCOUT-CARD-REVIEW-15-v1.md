<!-- relay-audit: v1 kind=card prov=1 -->
# SCOUT-CARD-REVIEW-15 · v1 — the seventh key's landing, and a build that handed two gate findings back

fanout: personalized — ONE address, scout, one copy. No sibling holds these bytes.

**THIS CARD ADVANCES NO ACCEPTANCE CRITERION AND SAYS SO.** The candidate lands `#29` / `GI-101`,
the A23 understanding layer — the open key of the internal counter, tracing to TIER A · Gaia2. **It
is the second landing card of the session and it must go after the first**; the candidate says so
and its falsifier is built on it.

**THE BUILD HANDED TWO GATE FINDINGS BACK, AND THEY ARE THE INTERESTING PART.** The lane reports
that it found FIVE reader sites the Architect's card named none of, and that **the whole-tree
typecheck passes over these files and proves nothing about them** — a planted type fault went
uncaught by that project and was caught only by the api typecheck. The candidate relays both and
routes them to the Architect rather than to the foreman. Check that routing: a gate-coverage finding
handed to a landing lane is a finding that dies.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| master is `b86850250cb3d845ff5be5edc425e3304e0dc72f` at the instant in PREMISE | MEASURED: git ls-remote origin refs/heads/master | delta |
| the quoted candidate hashes to sha1 `0aec52ae81f9ccf28bba99efe8e6f5fb1891f9c5` over 7813 bytes, and stripping the quote prefix recovers the card, sha1 `e1aabfc9e6645f534653385a0ba62fd35f3d1a82` over 7551 bytes | MEASURED: sha1sum and wc -c over both files, plus cmp of the recovered file against the built original | delta |
| the candidate passes the landed mechanical card check and its deliverables block parses with no defect | MEASURED: cardPreflight --check over the recovered file · MEASURED: readDeliverables from relayAudit.ts over the same file, against a broken copy that returned its planted defect | delta |
| whether the candidate's rehearsal reproduces from your own clone | NOT-READ | that is the deliverable and only your reading answers it |
| whether the lane's B1 carrier decision was the right one | NOT-READ | the card assigned it to the lane, the lane made it with four reasons, and the Architect accepted it; this review is not the place to reopen it |

## EVIDENCE

```scope
- R1 · the branch really is at master's tip, so no merge-forward is owed
- R2 · the api typecheck really passes on it
- R3 · the branch's own tests really pass, and the counts match
- R4 · the ordering clause really prevents this landing running before its sibling
- R5 · the two gate findings are routed to the Architect and not to the foreman
```

```evidence:delta
Re-measured 2026-08-28T12:57:15Z.
    quoted    sha1 0aec52ae81f9ccf28bba99efe8e6f5fb1891f9c5 over 7813 bytes
    recovered sha1 e1aabfc9e6645f534653385a0ba62fd35f3d1a82 over 7551 bytes
    recovery  sed 's/^| //'; cmp against the built original: IDENTICAL
    preflight --check over the recovered file: CP-1 through CP-11 all OK, GREEN
    deliverables present, both keys, no defect
```

## PREMISE

PRECONDITION READ AT 2026-08-28T12:57:15Z: master is the sha in CLAIMS row one — MEASURED:git ls-remote origin refs/heads/master
MEASURED:both digests, both byte counts, the byte-for-byte recovery, the preflight verdict and the deliverables parse, all from the one built file.
UNMEASURED: whether the candidate's rehearsal reproduces outside the Architect's worktree — that is what this round is for.

SELF-INVALIDATION: this premise decays on the next push to master, and the sibling landing in flight is EXPECTED to produce one. ON-DISAGREEMENT: if your read of the remote returns a different sha for master, say so and judge the candidate's own decay clause rather than treating the difference as a defect — the candidate was written to expire exactly that way, and whether it expires HONESTLY is R4.

## THE CHECKLIST

R1 to R5 above · R6 byte proof: recover the candidate and confirm both digests.

**R4 IS THE ONE THIS ROUND EXISTS FOR.** Two landing cards are alive against one trunk. Read the
candidate's ORDER A and its FALSIFIER together and say whether a foreman obeying them literally can
land in the wrong order or on a stale rehearsal. If it can, that is a RED and the sentence is the
finding.

## ORDER A — one verdict, GREEN or RED, findings named against R1 to R6

**Do not rewrite the card.** On GREEN it dispatches to the foreman unchanged. If your verdict is
GREEN, name the one thing you would look for in the landing report that would prove the ordering
clause was actually honoured rather than merely printed.

## ORDER B — one sentence

The build lane found five reader sites the Architect's card missed, and the card had claimed to have
read every caller. **Say in one sentence what a card that names code sites should be required to
carry so that "I read every caller" is checkable rather than asserted.**

## FALSIFIER

Falsified if either digest differs from CLAIMS. Report that and stop.

Second arm: **a review that confirms a rehearsal it did not run has added no lens.** Re-run at least
the typecheck or the two test files and say which you ran.

## SHARED SURFACES

None. You write no file, no branch, no commit, no setting. Your reply is your only write.

## DECISION RIGHTS

The owner settled the wording, the ordering and the cap before the build card was cut. The lane made
the carrier decision and the Architect accepted it. The foreman decides whether the checks permit the
landing. You rule on the verdict. Nothing here spends beyond an ordinary trunk run.

## DELIVERY

Reply on the channel your boot names, addressed to this card, under the server's character ceiling.
Verdict first, the re-run readings second, the ORDER B sentence last.

## THE CANDIDATE — line-quoted, both digests in CLAIMS

Recover it with `sed 's/^| //'` over the block below. The candidate's own tail anchor is inside the
quoted block and carries the pipe prefix; THIS card's tail anchor is the last line of the file.

```evidence:candidate
| <!-- relay-audit: v1 kind=card -->
| # GO-LANDING-S123-2 · v1 — land the seventh key
| 
| `#29` / `GI-101`, the A23 understanding layer, is the open key of the internal counter and traces to
| TIER A · Gaia2. **The build is on its branch and the Architect has run it.** This card lands it.
| 
| **IT GOES SECOND.** `GO-LANDING-S123-1` is landing the honestbench scorer on the same trunk. One
| landing at a time: if that one has not finished when you read this, finish it first and come back.
| 
| ## PREMISE
| 
| MEASURED: 2026-08-28T12:56:17Z from a fresh clone at the master sha in the `anchor` fence, and in a throwaway worktree of the branch. Every verdict below was produced by running the thing, not by reading the lane's report.
| MEASURED: `git ls-remote origin refs/heads/master` and the branch ref — both full shas sit in the `anchor` fence.
| ON-DISAGREEMENT: if your own `git ls-remote` returns a different sha for either ref, STOP and report what you read. The scorer landing WILL move master, and when it does this card's rehearsal is stale by construction — re-measure before you act on it.
| UNMEASURED: the pull request's CI at its head — this container has no `gh`, so the CI referee is YOUR read at the request head under `S37-2` and this card claims nothing about it.
| DECAYS on the next push to master, which the sibling landing is expected to produce.
| 
| ## CLAIMS
| 
| | claim | basis | anchor |
| |---|---|---|
| | master is `b86850250cb3d845ff5be5edc425e3304e0dc72f` and the branch head is `52be047aa713b061a79278de5bfb6b53bf339dd1` at the instant in PREMISE | MEASURED: git ls-remote origin, both refs in one call | anchor |
| | the branch is AT master's tip, so no merge-forward is owed | MEASURED: git merge into a worktree of the branch, which answered "Already up to date" | rehearsal |
| | the api typecheck passes over the branch | MEASURED: npm run typecheck:api in that worktree, exit 0 | rehearsal |
| | the branch's own two test files pass | MEASURED: npx vitest run over both files named in the files fence, 2 files and 57 tests, exit 0 | rehearsal |
| | the branch changes six source and test files plus its two report artifacts, and nothing else | MEASURED: git diff --name-only over the merge range, each path enumerated in the files fence | files |
| | the lane found five reader sites the card did not name, and repaired them | RELAYED: PHASE-A23-ASK-SHAPE-BUILD-1-AG3-report.md, read from the branch | handback |
| | whether the whole suite and the corpus gate pass at the request head | NOT-READ | no gh in the Architect's container; that reading is yours and it decides |
| | whether the ask RATE moves on real traffic | NOT-READ | the lane argues it from the code path and pins it with a precedence test, and says plainly it ran no replay. That remains open and is not this landing's question |
| 
| ```evidence:anchor
| $ git ls-remote origin refs/heads/master refs/heads/phase/a23-ask-shape-build-1
| b86850250cb3d845ff5be5edc425e3304e0dc72f	refs/heads/master
| 52be047aa713b061a79278de5bfb6b53bf339dd1	refs/heads/phase/a23-ask-shape-build-1
| ```
| 
| ```evidence:files
| - api/cwf/_lib/routing/askOnUnresolved.ts
| - api/cwf/_lib/routing/computeClarification.ts
| - api/cwf/_lib/turn/stageClarify.ts
| - api/cwf/_lib/replay/clarificationLens.ts
| - api/cwf/_lib/routing/__tests__/askAmbiguousShape.test.ts
| - api/cwf/__tests__/stageClarify.test.ts
| - docs/relay/PHASE-A23-ASK-SHAPE-BUILD-1-AG3-report.md
| - docs/relay/PHASE-A23-ASK-SHAPE-BUILD-1-AG3-report.json
| ```
| 
| ```evidence:rehearsal
| In a throwaway worktree at the branch head:
| 
|   git merge origin/master        -> "Already up to date."
|   npm run typecheck:api          -> exit 0
|   npx vitest run <the two test files in the files fence>
|                                  -> 2 files passed, 57 tests passed, exit 0
| 
| THE REHEARSAL IS NOT THE VERDICT. It says the landing is not blocked by a stale branch, a type
| error or a broken unit. The full suite and the corpus gate run at the request head and are yours.
| ```
| 
| ```evidence:handback
| The lane's report hands three things back, and two of them are gate findings rather than
| work items. They are RELAYED here so you do not read them as noise in the report you land:
| - FIVE reader sites carried the negative predicate that made widening the carrier unsafe.
|   The card named none of them; the lane enumerated and repaired all five, and says the api
|   typecheck found one that reading alone had missed.
| - The whole-tree typecheck PASSES OVER THESE FILES AND PROVES NOTHING ABOUT THEM. The lane
|   planted a type fault, watched that project ignore it, and watched the api typecheck catch
|   it. That is a gate-coverage finding and it is the Architect's to card, not yours.
| - The B1 carrier decision was the lane's to make and is made: the carrier was WIDENED, with
|   four reasons and a fair statement of what the alternative would have bought. The Architect
|   accepts it. Nothing in this landing reopens it.
| ```
| 
| ## ORDER A — LAND IT, AFTER THE SIBLING
| 
| `npm run land`, foreman address, `--no-ff`, no squash. If `GO-LANDING-S123-1` is still in flight,
| finish that landing first and re-measure this card's anchor before starting this one — the sibling
| moves master and this card's rehearsal expires when it does.
| 
| ## ORDER B — READ THE CHECKS JOB BY JOB, AND EXPECT THE CANARY TO BE ABSENT
| 
| Print every job at the request head with its own verdict. **`eval-canary` will be skipped or absent
| and that is the owner's freeze working** — `docs/ops/CANARY-FROZEN.md` records the ruling and its
| single thaw condition. Not a fault, not to be repaired, not to be reported as a gap. Any other job
| that is not green stops the landing and its text is the deliverable.
| 
| ## ORDER C — AFTER THE TRUNK MOVES
| 
| Read the trunk run and report the corpus lens as NUMBERS — ORPHAN and GOVERNED-VIOLATION — rather
| than as an adjective. Two readings, not one.
| 
| ## ORDER D — WHAT YOU DO NOT DO
| 
| You do not edit the branch, its tests or its report. You do not reopen the B1 decision. You do not
| act on the two gate findings in the handback fence — they are the Architect's to card.
| 
| ## FALSIFIER
| 
| This card is wrong if the branch is no longer at master's tip when you read it. **Test that first:**
| merge master forward and say what happened. If it was not a no-op, the rehearsal expired with the
| sibling landing and this card must be re-measured before it is obeyed — say so rather than pushing on.
| 
| Second arm: **a landing reported green by one lens is a landing reported by no lens.** The trunk run
| and the corpus reading both belong in your report.
| 
| ## SHARED SURFACES
| 
| The trunk, and only through `npm run land`. You change no file on this branch, no gate, no governed
| row and no migration.
| 
| ## DECISION RIGHTS
| 
| The owner settled the wording, the option ordering and the cap before the card was cut. The lane made
| the carrier decision and the Architect accepts it. The Architect decides that this branch lands and is
| answerable for the rehearsal. **You decide whether the checks at the request head permit the landing**;
| a refusal is the deliverable and is printed verbatim.
| 
| BODIES: `docs/laws/` · `CLAUDE.md` · `docs/ops/CANARY-FROZEN.md` · `SOTA-1` (this item traces to
| TIER A · Gaia2) · `S37-2` · `S63-1` (a merge is not evidence) · `TOTAL-45`.
| 
| fanout: personalized
| 
| Branch `phase/a23-ask-shape-build-1` — the branch you are landing, not one you create. Report to
| `docs/relay/GO-LANDING-S123-2-AG5-report.md`.
| 
| ```deliverables
| branch: phase/a23-ask-shape-build-1
| report: docs/relay/GO-LANDING-S123-2-AG5-report.md
| ```
| 
| TAIL ANCHOR: GO-LANDING-S123-2-v1 ends here.
```

TAIL ANCHOR: SCOUT-CARD-REVIEW-15-v1 ends here.
