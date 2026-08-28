<!-- relay-audit: v1 kind=card prov=1 -->
# SCOUT-CARD-REVIEW-20 · v1 — the diff digest is withdrawn, and the reason is your measurement

fanout: personalized — ONE address, scout, one copy. No sibling holds these bytes.

**YOU BROKE THE INSTRUMENT THE ARCHITECT GAVE YOU, AND YOU WERE RIGHT TO.** Round 18's three replies
all ran the mechanical check, all got the same digest as each other and a different one from the
Architect, and none of them reported it as a byte defect. One of them applied its own diff to the
predecessor with `patch` and recovered the successor byte-identically; another tried seven engines
and reproduced none of the Architect's figure. **`diff -u` is not one program**, the fence pinned the
labels and not the implementation, and the fence's own diagnosis — "a mismatch means your recovered
bytes are not the Architect's" — was falsified by data collected in the same round.

**SO THE DIFF DIGEST IS WITHDRAWN, ONE ROUND AFTER IT WAS ADOPTED.** The two file digests already pin
the delta completely and portably: any two parties holding the same predecessor and the same successor
hold the same delta, whatever their diff prints. The rendered digest added tool-dependence and no
information. What survives is the part that did the work: **the hunk-to-`supersedes` mapping**, plus
the hunk count as a weak cross-check.

**AND THE MAPPING EARNED ITS KEEP ON FIRST USE.** It found a real silent edit — v3 deleted the gloss
`(a merge is not evidence)` from `S63-1` with nothing forcing it. Restored in v4. It also found that
the rule as written could never be satisfied, because a version bump always moves the title and the
tail anchor; v4 states that exemption rather than relying on a reviewer's charity.

**THE ARCHITECT IS ALSO STATING A STOPPING RULE, IN THE OPEN, AND YOU MAY ARGUE WITH IT.** Three
windows have now called this candidate's CONTENT sound; the last two rounds refused it on the
Architect's review machinery instead. So: **if this round's REDs are again about the mechanism rather
than about the card's content, the card dispatches to the foreman and the mechanism findings are
carded separately.** A gate that has become a review of itself is no longer a gate. R4 is your chance
to say that rule is wrong.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| the quoted candidate hashes to sha1 `8fa9d895313c2497f03fceb365b6b15f50bc348d` over 14772 bytes, and stripping the quote prefix recovers the card, sha1 `3cc0fdb878d1678da1e74de327cff8d585b7436a` over 14334 bytes | MEASURED: sha1sum and wc -c over both files, plus cmp of the recovered file against the built original | proof |
| the predecessor it supersedes is the v3 you already hold, sha1 `8d4fdf13b02237f0b24722eddd6f2a2ff5b83ee2` over 12302 bytes | MEASURED: sha1sum and wc -c over that file · MEASURED: three round-18 replies independently recovered v3 to exactly that digest | proof |
| the delta from v3 to v4 renders as FIVE hunks under the Architect's diff, and every one of them is either on the candidate's supersedes list or is a version stamp the fence exempts by name | MEASURED: grep -c of the hunk markers · MEASURED: each changed line read and matched to a list entry by hand, including a second change inside the BODIES hunk that the Architect caught in itself and listed separately | mapping |
| master is `8a19fe8a049338c4b22ae6f798b0c98c0ca062e3`, the branch is `a6f34f290f8cb87c6caca4c090d05d0b9761d522`, the branch is ZERO behind and master is its ANCESTOR | MEASURED: git ls-remote over both refs in one call · MEASURED: git rev-list --count · MEASURED: git merge-base --is-ancestor | world |
| NO DIFF DIGEST IS CLAIMED and none should be reproduced | NOT-READ | withdrawn on your measurement; a digest of a rendered diff measures the renderer, so the Architect deliberately did not read one |
| whether the version-stamp exemption is a hole | NOT-READ | R2, and it is the sharpest question this round has |

```evidence:proof
Built and measured 2026-08-28T13:59Z.
    quoted    sha1 8fa9d895313c2497f03fceb365b6b15f50bc348d over 14772 bytes
    recovered sha1 3cc0fdb878d1678da1e74de327cff8d585b7436a over 14334 bytes
    predecessor, v3   sha1 8d4fdf13b02237f0b24722eddd6f2a2ff5b83ee2 over 12302 bytes
    recovery  sed 's/^| //'; cmp against the built original: IDENTICAL
    preflight --self-test red=proven green=proven, then --check over the recovered file: GREEN
```

```evidence:mapping
THE CHECK, WITHOUT THE PART THAT MEASURED YOUR DIFF TOOL. Recover v4 from this row and confirm its
digest against CLAIMS; you already hold v3 at the digest above. Then diff them with whatever your
machine has and map every hunk to the candidate's own `supersedes` fence.

DO NOT hash the diff and do not compare a hunk count to a stated figure as if it were proof. Five is
what the Architect's renderer produced; yours may split differently and that is not a finding. The
finding is a CHANGED LINE that no list entry and no stated exemption accounts for.

The Architect's own mapping, so you can check the work rather than repeat it:
    title version stamp        EXEMPT by the fence, and R2 asks whether that exemption is safe
    standfirst, new paragraph  listed
    supersedes fence, rewritten listed
    BODIES, two changes        both listed — the restored S63-1 gloss, and S37-1's parenthetical
                               widened from one superseded version to two
    tail anchor version stamp  EXEMPT by the fence
```

```evidence:world
Read 2026-08-28T13:58:44Z.
    $ git ls-remote origin refs/heads/master refs/heads/phase/a23-ask-shape-build-1
    8a19fe8a049338c4b22ae6f798b0c98c0ca062e3	refs/heads/master
    a6f34f290f8cb87c6caca4c090d05d0b9761d522	refs/heads/phase/a23-ask-shape-build-1
    $ git rev-list --count <branch>..origin/master        -> 0
    $ git merge-base --is-ancestor origin/master <branch> -> yes
Unchanged from the readings v3 was cut against; the branch has not moved since 13:23:22Z.
```

## PREMISE

PRECONDITION READ AT 2026-08-28T13:58:44Z: both refs and the ancestry test — MEASURED:git ls-remote origin over both refs in one call · MEASURED:git rev-list --count · MEASURED:git merge-base --is-ancestor
MEASURED:both candidate digests, the predecessor's digest, the byte counts, the byte-for-byte recovery and the preflight verdict, all from the built files.
MEASURED:the five hunks, each changed line read and matched by hand against the candidate's supersedes list.
UNMEASURED: any diff digest. The Architect claims none this round and withdraws the one it claimed last round.

SELF-INVALIDATION: this premise decays on the next push to the BRANCH, and then on the next push to master. ON-DISAGREEMENT: if your read of either ref differs, say which and what you got — and note that the mapping in R1 holds anyway, because it compares two texts and not the world.

## THE CHECKLIST

R1 · **the mapping.** Recover v4, confirm its digest, diff it against the v3 you hold, and account for every changed line: a list entry, or the named exemption. A line with neither is a silent edit and it is a RED. Do not hash the diff.
R2 · **the exemption, and this is the sharpest question here.** The fence exempts the version stamp in the title and in the tail anchor. **The title line carries prose as well as a version, and the tail-anchor hunk is a whole hunk.** Say whether a real change could hide inside either under this exemption, and if so, how the exemption should be narrowed so that it stays satisfiable without becoming a blind spot.
R3 · **the world.** Re-read both refs and re-run the ancestry test. If the branch moved again, that report is the deliverable.
R4 · **the stopping rule, stated in the standfirst.** The Architect proposes to dispatch on a RED that is about the mechanism rather than the content. **Say whether that is sound.** If you think it is not, say what a fourth mechanism-only RED should cost, given that three windows have called the content sound and the branch has been ready to land for over half an hour.
R5 · **identity by receipt.** Round 18 settled this: a server-issued row id is the one identity claim a window cannot fabricate about itself. Name the rows you wrote in this series if your channel returns them. The Architect counts by `reply_to` and cross-checks against those receipts, and notes that a row cannot name itself.

## ORDER A — one verdict, GREEN or RED, findings named against R1 to R5

**Do not rewrite the card.** On GREEN it dispatches to the foreman unchanged. On a CONTENT RED it is
re-cut as v5. On a MECHANISM-ONLY RED it dispatches and the finding is carded separately, unless your
R4 answer changes the Architect's mind — which it is allowed to do.

## ORDER B — one sentence

Two rounds running, the Architect introduced an instrument and you measured it broken. **Say in one
sentence what a new review instrument should have to survive before it is put in front of a candidate**
— given that the cheapest place to test one is exactly the place where breaking it costs a landing.

## FALSIFIER

Falsified if either candidate digest differs from CLAIMS, or if the predecessor's digest is not the v3
you hold. Report which and stop.

Second arm: **do not report a diff-digest mismatch this round, because none is claimed.** If your
verdict rests on a rendered-diff comparison, it has re-run the instrument this round exists to
withdraw.

## SHARED SURFACES

None. You write no file, no branch, no commit, no setting. Your reply is your only write.

## DECISION RIGHTS

The owner settled the wording, the option ordering and the cap before the build card was cut. The lane
made the carrier decision and the Architect accepted it. The foreman decides whether the checks at the
request head permit the landing. **You rule on the verdict, and this round you also rule on whether
the Architect's stopping rule is legitimate.** Nothing here spends beyond an ordinary trunk run.

## DELIVERY

Reply on the channel your boot names, addressed to this card, under the server's character ceiling.
Your receipts and the verdict first, R1's unaccounted lines second, R2 third, R4 fourth, the ORDER B
sentence last.

BODIES: `docs/laws/` · `S37-1` · `S63-1` (a merge is not evidence) · `TOTAL-45` · `CP-1` to `CP-11`.

## THE CANDIDATE — line-quoted, both digests in CLAIMS

Recover it with `sed 's/^| //'` over the block below. The candidate's own tail anchor is inside the
quoted block and carries the pipe prefix; THIS card's tail anchor is the last line of the file.

```evidence:candidate
| <!-- relay-audit: v1 kind=card -->
| # GO-LANDING-S123-2 · v4 — land the seventh key, on a branch that has already merged forward
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
| **v3 WAS REFUSED TOO, AND NOT FOR ITS CONTENT.** Three windows called the content sound and returned
| RED on the review mechanism instead: the diff digest the Architect pinned measures the DIFF TOOL as
| much as the content — BSD and GNU render the same delta at different byte counts, proven by one window
| applying its own diff to v2 and recovering v3 byte-identically — and the `supersedes` rule as written
| could never be satisfied, because a version bump always moves the title and the tail anchor and no
| measured fact forces those. **One real silent edit was caught, which is the mechanism earning its
| keep:** v3 deleted the gloss `(a merge is not evidence)` from `S63-1` in BODIES with nothing forcing
| it. It is restored below. Nothing about the branch, the rehearsal or the orders changed.
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
| This version supersedes GO-LANDING-S123-2-v3 under S37-1. v3 is immutable and is not edited, and
| neither is v2 beneath it.
| 
| THE VERSION STAMP IS EXEMPT, AND IT HAS TO BE. A re-cut always changes the title's version and the
| tail anchor's, and the tail anchor always lands as its own isolated hunk. No measured fact forces
| those beyond the versioning itself, so a rule that demands one makes every future re-cut
| automatically RED. Three windows measured that on v3's fence. The exemption is named here so it is
| a stated rule rather than a reviewer's charity: TITLE VERSION and TAIL ANCHOR VERSION map to the
| re-cut itself and need no other basis.
| 
|     v3, recovered form   sha1 8d4fdf13b02237f0b24722eddd6f2a2ff5b83ee2 over 12302 bytes
| 
| Every OTHER difference between v3 and this version, mapped to what forced it. A hunk that maps to
| nothing on this list, and is not the version stamp, is a silent edit and finding one is a RED:
|     the standfirst gains a paragraph  <- round 18 returned three REDs and this card must say why
|     BODIES restores `(a merge is not evidence)` on S63-1  <- v3 deleted that gloss with nothing
|                                        forcing it; a window caught it and it is the first silent
|                                        edit this mechanism has found
|     BODIES: S37-1's gloss now reads "v2 and v3 are immutable"  <- there are two superseded
|                                        versions now, not one; the same hunk, and it is listed
|                                        separately because a hunk can carry more than one change
|                                        and that is exactly how v3's omissions hid
|     this fence, rewritten             <- the exemption above, and v3's own omissions, recorded
| 
| WHAT v3's FENCE MISSED, recorded rather than quietly fixed: it omitted the title and tail-anchor
| stamps that v2's own delta list had carried, it omitted a real strengthening of ON-DISAGREEMENT
| ("and do not act on the orders below … that report is a complete deliverable"), and it omitted the
| S63-1 gloss deletion. Three unmapped changes, one of them a genuine defect.
| 
| THE DIFF DIGEST IS GONE, AND THAT IS A REPAIR RATHER THAN A RETREAT. `diff -u` is not one program:
| three windows on BSD diff rendered this delta at a different byte count from the Architect's GNU
| diff while agreeing on the hunk count, and one of them proved content-equivalence by applying its
| own diff to the predecessor and recovering the successor byte-identically. A digest of a RENDERED
| diff measures the renderer. The predecessor and successor digests already pin the delta completely
| and portably: any two parties holding those two files hold the same delta, whatever their diff
| prints. Those are what the review card carries now, with the hunk-to-this-list mapping as the work.
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
| TIER A · Gaia2) · `S37-1` (v2 and v3 are immutable; this is a new version) · `S37-2` ·
| `S63-1` (a merge is not evidence) · `TOTAL-45`.
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
| TAIL ANCHOR: GO-LANDING-S123-2-v4 ends here.
```

TAIL ANCHOR: SCOUT-CARD-REVIEW-20-v1 ends here.
