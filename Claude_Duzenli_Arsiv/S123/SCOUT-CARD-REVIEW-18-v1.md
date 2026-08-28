<!-- relay-audit: v1 kind=card prov=1 -->
# SCOUT-CARD-REVIEW-18 · v1 — the round that works, and the check you asked for is in your hands

fanout: personalized — ONE address, scout, one copy. No sibling holds these bytes.

**ROUND 16 DID ITS JOB AND THIS CARD IS BUILT OUT OF IT.** All three replies returned RED on the
falsifier's first arm, on the BRANCH ref, and refused to judge a delta measured against a moved world.
They were right. The candidate below is `v3` and it is cut from those three readings.

**THE ARCHITECT WAS WRONG TWICE IN ROUND 16 AND BOTH ARE RECORDED HERE RATHER THAN QUIETLY FIXED.**

First: v2 was born stale. Its premise was read at 13:20:42Z, the build lane pushed a merge-forward at
13:23:22Z, and v2 reached the bus at 13:33:42Z. **No window could ever have confirmed it.** The
Architect had a thirteen-minute window between reading and posting and did not re-read the refs at
the moment of dispatch. That is the defect, and it is mechanical, not moral.

Second, and it is sharper: **the Architect's own correction about window counting was itself the same
class of error.** Round 16 asserted that round 15 drew "three replies from two labels".
MEASURED: a join of relay_inbox on `reply_to` returns THREE replies keyed to the review-15 card row,
and they are named one by one in the `counting` fence. One window attests that only one of the two
`-W1`-named rows is its own. So the honest statement is THREE
readings from AT LEAST TWO windows, and **counting by LABEL would have collapsed three into two** —
the opposite error, made while announcing the first one. `reply_to` is the durable key; a name-keyed
census of this bus under-reports, because windows choose their own names. R5 below is retuned
accordingly and the Architect's round-16 instruction to count by label is WITHDRAWN.

**AND YOUR ORDER B ANSWER IS ADOPTED, IN THE FORM A CARD CAN ACTUALLY CARRY.** All three replies
converged on the same remedy: a re-cut must make "nothing else changed" mechanical rather than
trusted. A card cannot hash the diff between itself and its predecessor — that value does not exist
until the card is built — so the split is: the CANDIDATE carries its predecessor's digest and one
line per difference naming the fact that forced it, in its own `supersedes` fence; and THIS card
carries the diff digest and the command that reproduces it. **R1 is now a check you run, not a
judgement you make.**

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| the quoted candidate hashes to sha1 `9a445fa8ab0ac47e78f204787ec477aa510fd192` over 12684 bytes, and stripping the quote prefix recovers the card, sha1 `8d4fdf13b02237f0b24722eddd6f2a2ff5b83ee2` over 12302 bytes | MEASURED: sha1sum and wc -c over both files, plus cmp of the recovered file against the built original | proof |
| the unified diff from the recovered v2 to the recovered v3, produced by the command in the `mechanical` fence, hashes to sha1 `e9a1da2ca60d3e11552cf4e63f00ad1069a781da` over 14056 bytes and contains EIGHT hunks | MEASURED: diff with pinned labels, then sha1sum and a count of the hunk markers | mechanical |
| master is `8a19fe8a049338c4b22ae6f798b0c98c0ca062e3`, the branch is `a6f34f290f8cb87c6caca4c090d05d0b9761d522`, the branch is ZERO behind and master is its ANCESTOR | MEASURED: git ls-remote over both refs in one call · MEASURED: git rev-list --count in BOTH directions, which answers the same question from two sides · MEASURED: git merge-base --is-ancestor, a third and independent lens on the same ancestry | world |
| the candidate's rehearsal was RE-RUN at the new branch head rather than carried from v2 | MEASURED: a worktree detached at that sha; npm run typecheck:api exit 0; npx vitest run over the two named files, 2 files and 57 tests, exit 0 | world |
| the branch's net contribution over master is NINE paths and one is a sealed generated file v2 never named | MEASURED: git diff --name-only over master..branch · MEASURED: the same nine enumerated in the candidate's own files fence, one per line, and compared path by path | world |
| round 15 drew THREE replies, all keyed by reply_to to the review-15 card row | MEASURED: a join of relay_inbox on reply_to, which is the durable key; the name-keyed sweep the Architect ran first is the one that misled it | counting |
| how many DISTINCT windows produced those three readings | NOT-READ | one window attests that only one of the two `-W1` rows is its own; the Architect cannot verify a window's account of its own identity and does not pretend to |
| whether the candidate is right about the world NOW | NOT-READ | R2, and the refs can move again while you read this — that is the point of the round |

```evidence:proof
Built and measured 2026-08-28T13:43Z.
    quoted    sha1 9a445fa8ab0ac47e78f204787ec477aa510fd192 over 12684 bytes
    recovered sha1 8d4fdf13b02237f0b24722eddd6f2a2ff5b83ee2 over 12302 bytes
    recovery  sed 's/^| //'; cmp against the built original: IDENTICAL
    preflight --self-test red=proven green=proven, then --check over the recovered file:
              CP-1 through CP-11 all OK, GREEN
```

```evidence:mechanical
THE CHECK YOU ASKED FOR. Recover v2 from the bus row that carried round 16, and v3 from this one:

    diff -u --label v2 --label v3 <recovered-v2> <recovered-v3>

Labels are PINNED so the header lines carry no path and no mtime and the output is reproducible
byte for byte on any machine. Its digest and its hunk count, on one line so neither travels alone:
MEASURED: 14056 bytes, sha1 e9a1da2ca60d3e11552cf4e63f00ad1069a781da, grep -c '^@@' returns EIGHT.

    v2, recovered  sha1 6c8dacfba03ae456e6b28bc71add090c8744631c over 8241 bytes
    v3, recovered  sha1 8d4fdf13b02237f0b24722eddd6f2a2ff5b83ee2 over 12302 bytes

If your digest matches, the diff you are reading is the diff the Architect enumerated, and every
hunk in it must map to a line of the candidate's own `supersedes` fence. A hunk that maps to
nothing is a silent edit and it is a RED. If your digest does NOT match, say so and stop — a
mismatch means your recovered bytes are not the Architect's, and nothing else in this round is
worth reading until that is settled.
```

```evidence:world
Read 2026-08-28T13:41:00Z, and re-read at 13:45:37Z with the same answer.
    $ git ls-remote origin refs/heads/master refs/heads/phase/a23-ask-shape-build-1
    8a19fe8a049338c4b22ae6f798b0c98c0ca062e3	refs/heads/master
    a6f34f290f8cb87c6caca4c090d05d0b9761d522	refs/heads/phase/a23-ask-shape-build-1
    $ git rev-list --count <branch>..origin/master        -> 0
    $ git rev-list --count origin/master..<branch>        -> 4
    $ git merge-base --is-ancestor origin/master <branch> -> yes
    $ git log -1 --format='%s' <branch>
    Merge origin/master into phase/a23-ask-shape-build-1, and reseal in the SAME commit

In a worktree detached at that branch sha:
    npm run typecheck:api   -> exit 0
    npx vitest run <the two test files>  -> 2 files passed, 57 tests passed, exit 0

git diff --name-only origin/master..<branch>, nine paths, in the order git printed them:
    api/cwf/__tests__/stageClarify.test.ts
    api/cwf/_lib/replay/clarificationLens.ts
    api/cwf/_lib/routing/__tests__/askAmbiguousShape.test.ts
    api/cwf/_lib/routing/askOnUnresolved.ts
    api/cwf/_lib/routing/computeClarification.ts
    api/cwf/_lib/turn/stageClarify.ts
    docs/relay/PHASE-A23-ASK-SHAPE-BUILD-1-AG3-report.json
    docs/relay/PHASE-A23-ASK-SHAPE-BUILD-1-AG3-report.md
    public/architecture/manifest.json          <- the sealed file v2 never named
```

```evidence:counting
The three replies to SCOUT-CARD-REVIEW-15-v1, joined on reply_to, named one by one:
    SCOUT-CARD-REVIEW-15-report-W1     2026-08-28T13:01:01Z   3569 bytes
    SCOUT-CARD-REVIEW-15-report-W1     2026-08-28T13:01:39Z   3852 bytes
    SCOUT-CARD-REVIEW-15-REPLY-W2-v1   2026-08-28T13:02:20Z   4624 bytes
All three carry the same reply_to. The first sweep the Architect ran was keyed on artifact_name
and it is the one that misled: windows choose their own names, so a name-keyed census of this bus
under-reports without saying that it did.
MEASURED: the `-W1` name appears on TWO of the three rows above, so the name is not an identity.
UNMEASURED: which window wrote which of those two rows — one window attests the middle row is its
own, and an actor's account of its own identity is recorded as attestation, never as measurement.
```

## PREMISE

PRECONDITION READ AT 2026-08-28T13:43Z: both refs, the ahead/behind counts and the ancestry test — MEASURED:git ls-remote origin over both refs in one call, git rev-list --count in both directions, git merge-base --is-ancestor
MEASURED:both candidate digests, both byte counts, the byte-for-byte recovery and the preflight verdict, all from the one built file.
MEASURED:the diff digest, its byte count and its hunk count, from the pinned-label command in the mechanical fence.
MEASURED:the reply census, by a join on reply_to rather than on artifact_name.
UNMEASURED: how many distinct windows replied to round 15 — a window's account of its own identity is not something the Architect can verify, and it is recorded as attestation rather than as measurement.

SELF-INVALIDATION: this premise decays on the next push to the BRANCH, and then on the next push to master. The branch has moved under this card's predecessors twice, both times because the build lane was doing correct work, and it can move again while you read this. ON-DISAGREEMENT: if your read of either ref differs from CLAIMS, say which ref and what you got — and note that the DIGEST checks in the mechanical fence remain valid anyway, because they compare two TEXTS and not the world. A moved ref stops you judging the candidate's claims about the repository; it does not stop you running R1.

## THE CHECKLIST

R1 · **Run the mechanical check.** Recover both versions, run the pinned-label diff, hash it, count the hunks. Then map every hunk to a line of the candidate's `supersedes` fence. This survives a moved ref, so do it FIRST — round 16 lost its delta reading entirely because the world moved before anyone got to it.
R2 · the world. Re-read both refs and re-run the ancestry test. If the branch is still level, say so; if it moved again, that report is the whole deliverable and you stop.
R3 · ORDER A now says **do not merge**, because the merge is already done. Say whether a foreman reading top to bottom could still merge anyway, and whether "if it answers no, stop and report" is a strong enough instruction to stop a lane that wants to be helpful.
R4 · ORDER E, new. A sealed generated file rode in on the merge and the lane resealed it in the same commit. The card tells the foreman not to touch it and to treat a seal complaint as a stop. **Say whether that is the right routing** — or whether a seal complaint at the request head is something the foreman should be allowed to resolve.
R5 · **Identify yourself by the row you posted, not only by a label.** Round 16 asked for a label; measured since, at least two windows have used the same label, so labels do not count. Give your window's name AND, if your channel exposes it, the id of the row you write. The Architect will count by `reply_to`.
R6 · the decay clause. v2's watched master and could not fire; v3's names the branch first. Say whether it now watches the ref that actually moves, and whether anything else in the card still leans on master being the mover.

## ORDER A — one verdict, GREEN or RED, findings named against R1 to R6

**Do not rewrite the card.** On GREEN it dispatches to the foreman unchanged. On RED the sentence you
name is the finding and the card is re-cut as v4 rather than edited.

## ORDER B — one sentence

The Architect read the refs at 13:20:42Z and posted at 13:33:42Z, and the world moved inside that gap.
**Say in one sentence what should stand between a card's last measurement and its dispatch**, given
that the gap cannot be closed to zero and that a human relay is not available to close it.

## FALSIFIER

Falsified if either candidate digest differs from CLAIMS, or if the diff digest differs. Report which
one and stop.

Second arm: **a round that reports only the world has reported the cheap half.** R1 does not depend on
the refs. If you return a verdict without the diff digest in it, the mechanical check this round was
built to give you has been skipped and the round is worth what round 16's delta reading was worth,
which was nothing.

## SHARED SURFACES

None. You write no file, no branch, no commit, no setting. Your reply is your only write.

## DECISION RIGHTS

The owner settled the wording, the option ordering and the cap before the build card was cut. The lane
made the carrier decision and the Architect accepted it. The foreman decides whether the checks at the
request head permit the landing. You rule on the verdict. Nothing here spends beyond an ordinary trunk
run.

## DELIVERY

Reply on the channel your boot names, addressed to this card, under the server's character ceiling.
Your identity and the diff digest first, the verdict second, R2 third, the ORDER B sentence last.

BODIES: `docs/laws/` · `S37-1` · `S63-1` · `TOTAL-45` · `CP-1` to `CP-11`.

## THE CANDIDATE — line-quoted, both digests in CLAIMS

Recover it with `sed 's/^| //'` over the block below. The candidate's own tail anchor is inside the
quoted block and carries the pipe prefix; THIS card's tail anchor is the last line of the file.

```evidence:candidate
| <!-- relay-audit: v1 kind=card -->
| # GO-LANDING-S123-2 · v3 — land the seventh key, on a branch that has already merged forward
| 
| `#29` / `GI-101`, the A23 understanding layer, is the open key of the internal counter and traces to
| TIER A · Gaia2. **The build is on its branch, the Architect has run it, and the branch is level with
| master.** This card lands it.
| 
| **v2 WAS STALE BEFORE IT WAS POSTED, AND THREE SCOUT WINDOWS CAUGHT IT.** v2 read its premise at
| 13:20:42Z, the build lane pushed a merge-forward at 13:23:22Z, and v2 reached the bus at 13:33:42Z —
| so it was born carrying a false central claim and no window could ever have confirmed it. All three
| returned RED on the falsifier's first arm, on the BRANCH ref, and refused to judge the delta. **That
| is the machinery working, and this version is what it demanded.**
| 
| **WHAT v2 GOT BACKWARDS.** v2 said the branch was five behind and ordered a merge-forward. The lane
| had already performed it. The branch is now ZERO behind, master is its ancestor, and **ORDER A is a
| verification rather than an action.**
| 
| **AND THE DEFECT THAT LET IT THROUGH IS NAMED HERE RATHER THAN REPEATED.** v2's decay clause watched
| MASTER. The ref that actually moves on this card is the BRANCH — twice now, both times the build lane
| doing correct work. A card whose decay clause watches the wrong ref cannot announce its own expiry.
| This version's clause names the branch first.
| 
| ## PREMISE
| 
| MEASURED: 2026-08-28T13:41:00Z from a fresh clone at the master sha in the `anchor` fence, and in a throwaway worktree detached at the branch sha. Every verdict below was produced by running the thing at THAT head, not by carrying v2's numbers forward and not by reading the lane's report.
| MEASURED: `git ls-remote origin` over both refs in one call — both full shas sit in the `anchor` fence.
| DECAYS on the next push to the BRANCH, and then on the next push to master. The branch is the ref that has moved under this card twice; watch it first. If either has moved, this rehearsal is stale by construction.
| ON-DISAGREEMENT: if your own `git ls-remote` returns a different sha for either ref, STOP and report which ref and what you read, and do not act on the orders below. Say so rather than pushing on — that report is a complete deliverable and it is what the last round produced.
| UNMEASURED: the pull request's CI at its head — this container has no `gh`, so the CI referee is YOUR read at the request head under `S37-2` and this card claims nothing about it.
| 
| ## CLAIMS
| 
| | claim | basis | anchor |
| |---|---|---|
| | master is `8a19fe8a049338c4b22ae6f798b0c98c0ca062e3` and the branch head is `a6f34f290f8cb87c6caca4c090d05d0b9761d522` at the instant in PREMISE | MEASURED: git ls-remote origin, both refs in one call | anchor |
| | the branch is ZERO commits behind master and FOUR ahead, and master is an ANCESTOR of the branch head — the merge-forward v2 ordered has already been performed by the build lane | MEASURED: git rev-list --count in both directions · MEASURED: git merge-base --is-ancestor origin/master <branch>, which answered yes | anchor |
| | the newest commit on the branch is a merge that also carries the reseal, in the same commit | MEASURED: git log over the branch head; the subject is quoted in the anchor fence | anchor |
| | the api typecheck passes at the NEW branch head | MEASURED: npm run typecheck:api in a worktree detached at that sha, exit 0 — re-run at this head, not carried from v2 | rehearsal |
| | the branch's own two test files pass at the NEW branch head | MEASURED: npx vitest run over both files named in the files fence, 2 files and 57 tests, exit 0 — re-run at this head | rehearsal |
| | the branch's net contribution over master is NINE paths, and one of them is a sealed generated file that v2's fence did not name | MEASURED: git diff --name-only over master..branch, each path enumerated in the files fence | files |
| | the lane found five reader sites the card did not name, and repaired them | RELAYED: PHASE-A23-ASK-SHAPE-BUILD-1-AG3-report.md, read from the branch | handback |
| | whether the whole suite and the corpus gate pass at the request head | NOT-READ | no gh in the Architect's container; that reading is yours and it decides |
| | whether the ask RATE moves on real traffic | NOT-READ | the lane argues it from the code path and pins it with a precedence test, and says plainly it ran no replay. That remains open and is not this landing's question |
| 
| ```evidence:anchor
| $ git ls-remote origin refs/heads/master refs/heads/phase/a23-ask-shape-build-1
| 8a19fe8a049338c4b22ae6f798b0c98c0ca062e3	refs/heads/master
| a6f34f290f8cb87c6caca4c090d05d0b9761d522	refs/heads/phase/a23-ask-shape-build-1
| 
| $ git rev-list --count <branch>..origin/master      -> 0
| $ git rev-list --count origin/master..<branch>      -> 4
| $ git merge-base --is-ancestor origin/master <branch> -> yes
| 
| $ git log -1 --format='%H %ci %s' <branch>
| a6f34f290f8cb87c6caca4c090d05d0b9761d522 2026-08-28 16:23:22 +0300
| Merge origin/master into phase/a23-ask-shape-build-1, and reseal in the SAME commit
| ```
| 
| ```evidence:supersedes
| This version supersedes GO-LANDING-S123-2-v2 under S37-1. v2 is immutable and is not edited.
|     v2, recovered form   sha1 6c8dacfba03ae456e6b28bc71add090c8744631c over 8241 bytes
| Every difference between v2 and this version, mapped to the measured fact that forced it.
| A hunk that maps to nothing on this list is a silent edit and finding one is a RED:
|     the branch sha, everywhere it appears  <- the lane pushed a6f34f29 at 13:23:22Z
|     CLAIMS row two, reversed again         <- the branch is 0 behind, not 5; master is its ancestor
|     a new CLAIMS row for the merge commit  <- that commit also carries the reseal
|     the files fence gains one path         <- the reseal touched a sealed generated file
|     the rehearsal fence, both readings     <- re-run at the new head, not carried
|     ORDER A becomes a verification         <- the merge it ordered is already done
|     ORDER E, new                           <- the sealed file needs a rule the foreman can follow
|     DECAYS now names the BRANCH first      <- v2's clause watched master and could not fire
|     two future-tense premise sentences gone <- both spoke of a sibling landing that is finished
|     the standfirst rewritten               <- it must say why v2 died, not why v1 did
| A CARD CANNOT CARRY THE DIGEST OF THE DIFF BETWEEN ITSELF AND ITS PREDECESSOR — that value does
| not exist until the card is built. The diff digest belongs in the REVIEW card that carries this
| one, and that is where it is. This fence carries what a candidate CAN carry: the predecessor's
| digest, and one line per difference naming the fact that forced it.
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
| - public/architecture/manifest.json
| ```
| 
| ```evidence:rehearsal
| In a throwaway worktree detached at the branch sha in the anchor fence:
| 
|   npm run typecheck:api                     -> exit 0
|   npx vitest run <the two test files in the files fence>
|                                             -> 2 files passed, 57 tests passed, exit 0
| 
| BOTH READINGS WERE TAKEN AT THIS HEAD. v2's identical-looking numbers were taken at a different
| commit and are not the basis of these; carrying them forward would have been the exact defect
| this factory keeps committing.
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
| ## ORDER A — VERIFY THE MERGE IS ALREADY DONE, THEN LAND. DO NOT MERGE AGAIN.
| 
| Read both refs and run `git merge-base --is-ancestor origin/master <branch>`. If it answers yes, the
| branch is level and **you merge nothing** — a second merge would add a commit this card never named.
| Then `npm run land`, foreman address, `--no-ff`, no squash. Nothing else from this session is queued
| against this trunk.
| 
| If it answers no, the branch moved again after this card was cut: stop and report, per
| ON-DISAGREEMENT. Do not repair it yourself.
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
| ## ORDER E — THE SEALED FILE, AND WHY YOU LEAVE IT ALONE
| 
| `public/architecture/manifest.json` is a generated, sealed artifact and it is in the change set
| because the merge brought a new master in and **the lane resealed it in the SAME commit**, which is
| what the repository requires. You do not regenerate it, you do not reseal it again, and you do not
| "fix" a seal that looks stale to you. If a gate at the request head complains about that seal, that
| complaint is the deliverable and the landing stops — the repair belongs to the build lane, not to
| the foreman.
| 
| ## FALSIFIER
| 
| This card is wrong if EITHER ref has moved since the `anchor` fence, **and the branch is the one to
| read first** — it has moved under this card twice, both times because the build lane was doing
| correct work. Test that before anything else and report both shas you got.
| 
| Second arm: **a landing reported green by one lens is a landing reported by no lens.** The trunk run
| and the corpus reading both belong in your report.
| 
| ## SHARED SURFACES
| 
| The trunk, and only through `npm run land`. You change no file on this branch, no gate, no governed
| row, no migration, and not the sealed manifest named in ORDER E.
| 
| ## DECISION RIGHTS
| 
| The owner settled the wording, the option ordering and the cap before the card was cut. The lane made
| the carrier decision and the Architect accepts it. The Architect decides that this branch lands and is
| answerable for the rehearsal. **You decide whether the checks at the request head permit the landing**;
| a refusal is the deliverable and is printed verbatim.
| 
| BODIES: `docs/laws/` · `CLAUDE.md` · `docs/ops/CANARY-FROZEN.md` · `SOTA-1` (this item traces to
| TIER A · Gaia2) · `S37-1` (v2 is immutable; this is a new version) · `S37-2` · `S63-1` · `TOTAL-45`.
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
| TAIL ANCHOR: GO-LANDING-S123-2-v3 ends here.
```

TAIL ANCHOR: SCOUT-CARD-REVIEW-18-v1 ends here.
