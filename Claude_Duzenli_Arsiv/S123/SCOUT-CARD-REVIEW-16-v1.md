<!-- relay-audit: v1 kind=card prov=1 -->
# SCOUT-CARD-REVIEW-16 · v1 — a CONFIRM round on a re-cut you have already read once

fanout: personalized — ONE address, scout, one copy. No sibling holds these bytes.

**THIS IS A SHORT ROUND AND IT IS SHORT ON PURPOSE.** You read `GO-LANDING-S123-2-v1` in
`SCOUT-CARD-REVIEW-15` and it drew three GREEN replies. That card then expired exactly as its own
decay clause said it would: its sibling landed the honestbench scorer and moved the trunk. The
candidate below is `v2`, re-cut against the moved trunk under `S37-1` — a correction is a new version,
never an edit. **Do not re-review the card. Review the DELTA, and review whether anything rode along
inside it.**

## WHAT MOVED, AND WHAT MOVED BECAUSE OF IT

Exactly two facts changed in the world. Master moved, and the branch moved because the build lane
pushed a `RULE-24` repair for two literal NUL bytes and re-reported. Both pairs of shas — the old and
the new — sit in the `delta` fence; the new pair is also CLAIMS row one.

`diff -u` between the two versions reports SEVEN hunks. The things they change, named one by one
rather than counted:

```scope
- D1 · the title's version number, and the tail anchor's
- D2 · the standfirst: the "IT GOES SECOND" ordering instruction is replaced by an account of v1's expiry
- D3 · the PREMISE's MEASURED instant
- D4 · the CLAIMS anchor row's two shas
- D5 · the CLAIMS rehearsal row, REVERSED: v1 said the branch was at master's tip and no merge-forward was owed; v2 says the branch is five behind and a merge-forward IS owed
- D6 · the anchor fence's two shas
- D7 · the rehearsal fence: a rev-list count and a merge result replace v1's "Already up to date"
- D8 · ORDER A, rewritten from "land it, after the sibling" to "merge master forward, then land"
- D9 · the FALSIFIER's first arm, rewritten from "merge forward and say what happened" to "re-read both refs and say what you got"
- D10 · nothing else. THAT IS A CLAIM AND IT IS THE ONE THIS ROUND EXISTS TO TEST
```

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| master is `8a19fe8a049338c4b22ae6f798b0c98c0ca062e3` and the branch head is `1450e71db30a4ace37108f855f1d7c1cf53ad782` | MEASURED: git ls-remote origin, both refs in one call, at the instant in PREMISE | delta |
| the branch is five commits behind master, so the reversal in D5 is a true statement about the world and not a re-cut error | MEASURED: git rev-list --count of the branch against master, re-run at the instant in PREMISE and independent of the candidate's own rehearsal | delta |
| the quoted candidate hashes to sha1 `159a9a5e12767d2ee2ffe9ebf9e789ce34238839` over 8517 bytes, and stripping the quote prefix recovers the card, sha1 `6c8dacfba03ae456e6b28bc71add090c8744631c` over 8241 bytes | MEASURED: sha1sum and wc -c over both files, plus cmp of the recovered file against the built original | delta |
| the recovered candidate passes the landed mechanical card check, and its deliverables block parses with both keys and no defect | MEASURED: cardPreflight --check over the recovered file · MEASURED: readDeliverables from relayAudit.ts over the same file, against a copy with a planted key typo that returned its defect | delta |
| whether D10 is true — whether the seven hunks contain anything that does NOT follow from the two ref moves | NOT-READ | that is the deliverable and only your own diff answers it |
| whether the candidate's rehearsal reproduces from your own clone | NOT-READ | v1's rehearsal drew three GREEN replies against a trunk that has since moved; the numbers in D7 are new and no window has read them |

## EVIDENCE

```evidence:delta
Re-measured 2026-08-28T13:20:42Z.
    $ git ls-remote origin refs/heads/master refs/heads/phase/a23-ask-shape-build-1
    8a19fe8a049338c4b22ae6f798b0c98c0ca062e3	refs/heads/master
    1450e71db30a4ace37108f855f1d7c1cf53ad782	refs/heads/phase/a23-ask-shape-build-1
    the pair v1 was cut against, for the diff:
    b86850250cb3d845ff5be5edc425e3304e0dc72f	master, as of v1
    52be047aa713b061a79278de5bfb6b53bf339dd1	the branch, as of v1
    $ git rev-list --count <branch>..<master>   -> 5
    quoted    sha1 159a9a5e12767d2ee2ffe9ebf9e789ce34238839 over 8517 bytes
    recovered sha1 6c8dacfba03ae456e6b28bc71add090c8744631c over 8241 bytes
    recovery  sed 's/^| //'; cmp against the built original: IDENTICAL
    preflight --self-test red=proven green=proven, then --check over the recovered file:
              CP-1 through CP-11 all OK, GREEN
    deliverables  present, branch and report both read, defects empty
    control       the same parse over a copy whose `report:` key was misspelled returned
                  two defects and both values null — the parser is proven to speak
```

## PREMISE

PRECONDITION READ AT 2026-08-28T13:20:42Z: master and the branch are the two shas in CLAIMS row one — MEASURED:git ls-remote origin, both refs in one call
MEASURED:the five-behind count, both digests, both byte counts, the byte-for-byte recovery, the preflight verdict and the deliverables parse, all from the one built file.
MEASURED:select over relay_inbox for the scout address, from_lane, artifact ilike REVIEW-15 — THREE replies, all GREEN, and their own labels read W1, W1, W2. Two distinct window labels, not three. No reply carrying a third label is on the bus.
UNMEASURED: whether the candidate's NEW rehearsal numbers reproduce outside the Architect's worktree — v1's were confirmed against a trunk that has since moved, so that confirmation does not transfer.

SELF-INVALIDATION: this premise decays on the next push to master OR to the branch, and the build lane has already pushed to the branch once since v1 was cut. ON-DISAGREEMENT: if your read of either ref differs from CLAIMS row one, STOP, say which ref and what you got, and do not judge the delta — a delta measured against a moved world is not a delta.

## THE CHECKLIST

R1 · D5 and D8 together. v1 told the lane not to merge; v2 tells it to merge first. **Read ORDER A and the FALSIFIER as one instruction and say whether a lane obeying them literally can land a branch it has not merged forward.**
R2 · D9. v1's falsifier ordered an ACTION (merge forward and report) and v2's orders a READ (re-read both refs). Say whether the weaker test still catches the case it exists for: a branch that moved again between this card being cut and being obeyed.
R3 · D2. The ordering instruction is GONE because the sibling is done. Say whether anything else in the card still depends on a sentence that is no longer there.
R4 · D10, and this is the one. **Run the diff yourself.** Anything in those seven hunks that does not follow from the two ref moves is a silent edit riding on a re-cut, and naming it is worth more than the rest of this round.
R5 · byte proof: recover the candidate and confirm both digests.
R6 · **SAY WHICH WINDOW YOU ARE, IN YOUR FIRST LINE.** Round 15 drew three GREEN replies whose own labels read W1, W1 and W2, and the Architect carried that forward as "three windows". It was three READINGS from two LABELS, and the silence of a third was read as a verdict. That is `empty ≠ zero` at the review layer and it is the Architect's defect, not yours. This round is counted by LABEL.

## ORDER A — one verdict, GREEN or RED, findings named against R1 to R6

**Do not rewrite the card.** On GREEN it dispatches to the foreman unchanged. On RED the sentence you
name is the finding and the card is re-cut as v3 rather than edited.

## ORDER B — one sentence

A re-cut is the cheapest place in this factory to smuggle a change, because the reviewer's attention
is on the delta the author announced. **Say in one sentence what a re-cut card should be required to
carry so that "nothing else changed" is checkable mechanically rather than trusted.**

## FALSIFIER

Falsified if either digest differs from CLAIMS, or if either ref has moved. Report that and stop.

Second arm: **a confirm round that confirms only what the author listed is not a review, it is a
countersignature.** R4 is the round. If you return GREEN without having run the diff yourself, say so
plainly, because a GREEN that means "the author's list looked complete" is a different object from a
GREEN that means "I diffed it".

## SHARED SURFACES

None. You write no file, no branch, no commit, no setting. Your reply is your only write.

## DECISION RIGHTS

The owner settled the wording, the option ordering and the cap before the build card was cut. The lane
made the carrier decision and the Architect accepted it. The foreman decides whether the checks at the
request head permit the landing. You rule on the verdict. Nothing here spends beyond an ordinary trunk
run.

## DELIVERY

Reply on the channel your boot names, addressed to this card, under the server's character ceiling.
Verdict first, the R4 diff reading second, the ORDER B sentence last.

BODIES: `docs/laws/` · `S37-1` (a submitted artifact is immutable; a correction is a new version) ·
`S63-1` · `TOTAL-45` · `CP-1` to `CP-11`.

## THE CANDIDATE — line-quoted, both digests in CLAIMS

Recover it with `sed 's/^| //'` over the block below. The candidate's own tail anchor is inside the
quoted block and carries the pipe prefix; THIS card's tail anchor is the last line of the file.

```evidence:candidate
| <!-- relay-audit: v1 kind=card -->
| # GO-LANDING-S123-2 · v2 — land the seventh key
| 
| `#29` / `GI-101`, the A23 understanding layer, is the open key of the internal counter and traces to
| TIER A · Gaia2. **The build is on its branch and the Architect has run it.** This card lands it.
| 
| **v1 EXPIRED EXACTLY AS IT WAS BUILT TO, AND THIS IS THE RE-MEASUREMENT IT DEMANDED.** Its sibling,
| `GO-LANDING-S123-1`, landed the honestbench scorer and moved the trunk; v1's own decay clause made it
| unobeyable at that instant. **The sibling is DONE — master carries `scoreCore.ts` — so this landing
| waits on nothing.** What changed: master moved, the branch moved (the lane pushed a `RULE-24` repair
| for two literal NUL bytes and re-reported), and the branch is now BEHIND master, so a merge-forward is
| owed where v1 said none was.
| 
| ## PREMISE
| 
| MEASURED: 2026-08-28T13:06:20Z from a fresh clone at the master sha in the `anchor` fence, and in a throwaway worktree of the branch. Every verdict below was produced by running the thing, not by reading the lane's report.
| MEASURED: `git ls-remote origin refs/heads/master` and the branch ref — both full shas sit in the `anchor` fence.
| ON-DISAGREEMENT: if your own `git ls-remote` returns a different sha for either ref, STOP and report what you read. The scorer landing WILL move master, and when it does this card's rehearsal is stale by construction — re-measure before you act on it.
| UNMEASURED: the pull request's CI at its head — this container has no `gh`, so the CI referee is YOUR read at the request head under `S37-2` and this card claims nothing about it.
| DECAYS on the next push to master, which the sibling landing is expected to produce.
| 
| ## CLAIMS
| 
| | claim | basis | anchor |
| |---|---|---|
| | master is `8a19fe8a049338c4b22ae6f798b0c98c0ca062e3` and the branch head is `1450e71db30a4ace37108f855f1d7c1cf53ad782` at the instant in PREMISE | MEASURED: git ls-remote origin, both refs in one call | anchor |
| | the branch is FIVE commits behind master and a merge-forward IS owed — the opposite of what v1 claimed | MEASURED: git rev-list --count of the branch against master · MEASURED: the merge itself in a worktree, which merged cleanly and brought the scorer's files in | rehearsal |
| | the api typecheck passes over the branch | MEASURED: npm run typecheck:api in that worktree, exit 0 | rehearsal |
| | the branch's own two test files pass | MEASURED: npx vitest run over both files named in the files fence, 2 files and 57 tests, exit 0 | rehearsal |
| | the branch changes six source and test files plus its two report artifacts, and nothing else | MEASURED: git diff --name-only over the merge range, each path enumerated in the files fence | files |
| | the lane found five reader sites the card did not name, and repaired them | RELAYED: PHASE-A23-ASK-SHAPE-BUILD-1-AG3-report.md, read from the branch | handback |
| | whether the whole suite and the corpus gate pass at the request head | NOT-READ | no gh in the Architect's container; that reading is yours and it decides |
| | whether the ask RATE moves on real traffic | NOT-READ | the lane argues it from the code path and pins it with a precedence test, and says plainly it ran no replay. That remains open and is not this landing's question |
| 
| ```evidence:anchor
| $ git ls-remote origin refs/heads/master refs/heads/phase/a23-ask-shape-build-1
| 8a19fe8a049338c4b22ae6f798b0c98c0ca062e3	refs/heads/master
| 1450e71db30a4ace37108f855f1d7c1cf53ad782	refs/heads/phase/a23-ask-shape-build-1
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
|   git rev-list --count <branch>..origin/master   -> 5
|   git merge origin/master                        -> clean; brought the scorer's three
|                                                     files in; no conflict
|   npm run typecheck:api                          -> exit 0
|   npx vitest run <the two test files in the files fence>
|                                                  -> 2 files passed, 57 tests passed, exit 0
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
| ## ORDER A — MERGE MASTER FORWARD, THEN LAND
| 
| The branch is five behind. Merge master into it, push, and let the checks run **on the request head**.
| Then `npm run land`, foreman address, `--no-ff`, no squash. The sibling landing is finished and nothing
| else from this session is queued against this trunk.
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
| This card is wrong if either ref has moved since the `anchor` fence. **Test that first:** re-read both
| refs and say what you got. The lane pushed a repair after v1 was cut and could push another; if the
| branch head differs, the rehearsal expired again and this card must be re-cut rather than pushed
| through. Saying so is the deliverable.
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
| TAIL ANCHOR: GO-LANDING-S123-2-v2 ends here.
```

TAIL ANCHOR: SCOUT-CARD-REVIEW-16-v1 ends here.
