<!-- relay-audit: v1 kind=card -->
# GO-LANDING-S123-2 · v4 — land the seventh key, on a branch that has already merged forward

`#29` / `GI-101`, the A23 understanding layer, is the open key of the internal counter and traces to
TIER A · Gaia2. **The build is on its branch, the Architect has run it, and the branch is level with
master.** This card lands it.

**v2 WAS STALE BEFORE IT WAS POSTED, AND THREE SCOUT WINDOWS CAUGHT IT.** v2 read its premise at
13:20:42Z, the build lane pushed a merge-forward at 13:23:22Z, and v2 reached the bus at 13:33:42Z —
so it was born carrying a false central claim and no window could ever have confirmed it. All three
returned RED on the falsifier's first arm, on the BRANCH ref, and refused to judge the delta. **That
is the machinery working, and this version is what it demanded.**

**WHAT v2 GOT BACKWARDS.** v2 said the branch was five behind and ordered a merge-forward. The lane
had already performed it. The branch is now ZERO behind, master is its ancestor, and **ORDER A is a
verification rather than an action.**

**AND THE DEFECT THAT LET IT THROUGH IS NAMED HERE RATHER THAN REPEATED.** v2's decay clause watched
MASTER. The ref that actually moves on this card is the BRANCH — twice now, both times the build lane
doing correct work. A card whose decay clause watches the wrong ref cannot announce its own expiry.
This version's clause names the branch first.

**v3 WAS REFUSED TOO, AND NOT FOR ITS CONTENT.** Three windows called the content sound and returned
RED on the review mechanism instead: the diff digest the Architect pinned measures the DIFF TOOL as
much as the content — BSD and GNU render the same delta at different byte counts, proven by one window
applying its own diff to v2 and recovering v3 byte-identically — and the `supersedes` rule as written
could never be satisfied, because a version bump always moves the title and the tail anchor and no
measured fact forces those. **One real silent edit was caught, which is the mechanism earning its
keep:** v3 deleted the gloss `(a merge is not evidence)` from `S63-1` in BODIES with nothing forcing
it. It is restored below. Nothing about the branch, the rehearsal or the orders changed.

## PREMISE

MEASURED: 2026-08-28T13:41:00Z from a fresh clone at the master sha in the `anchor` fence, and in a throwaway worktree detached at the branch sha. Every verdict below was produced by running the thing at THAT head, not by carrying v2's numbers forward and not by reading the lane's report.
MEASURED: `git ls-remote origin` over both refs in one call — both full shas sit in the `anchor` fence.
DECAYS on the next push to the BRANCH, and then on the next push to master. The branch is the ref that has moved under this card twice; watch it first. If either has moved, this rehearsal is stale by construction.
ON-DISAGREEMENT: if your own `git ls-remote` returns a different sha for either ref, STOP and report which ref and what you read, and do not act on the orders below. Say so rather than pushing on — that report is a complete deliverable and it is what the last round produced.
UNMEASURED: the pull request's CI at its head — this container has no `gh`, so the CI referee is YOUR read at the request head under `S37-2` and this card claims nothing about it.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| master is `8a19fe8a049338c4b22ae6f798b0c98c0ca062e3` and the branch head is `a6f34f290f8cb87c6caca4c090d05d0b9761d522` at the instant in PREMISE | MEASURED: git ls-remote origin, both refs in one call | anchor |
| the branch is ZERO commits behind master and FOUR ahead, and master is an ANCESTOR of the branch head — the merge-forward v2 ordered has already been performed by the build lane | MEASURED: git rev-list --count in both directions · MEASURED: git merge-base --is-ancestor origin/master <branch>, which answered yes | anchor |
| the newest commit on the branch is a merge that also carries the reseal, in the same commit | MEASURED: git log over the branch head; the subject is quoted in the anchor fence | anchor |
| the api typecheck passes at the NEW branch head | MEASURED: npm run typecheck:api in a worktree detached at that sha, exit 0 — re-run at this head, not carried from v2 | rehearsal |
| the branch's own two test files pass at the NEW branch head | MEASURED: npx vitest run over both files named in the files fence, 2 files and 57 tests, exit 0 — re-run at this head | rehearsal |
| the branch's net contribution over master is NINE paths, and one of them is a sealed generated file that v2's fence did not name | MEASURED: git diff --name-only over master..branch, each path enumerated in the files fence | files |
| the lane found five reader sites the card did not name, and repaired them | RELAYED: PHASE-A23-ASK-SHAPE-BUILD-1-AG3-report.md, read from the branch | handback |
| whether the whole suite and the corpus gate pass at the request head | NOT-READ | no gh in the Architect's container; that reading is yours and it decides |
| whether the ask RATE moves on real traffic | NOT-READ | the lane argues it from the code path and pins it with a precedence test, and says plainly it ran no replay. That remains open and is not this landing's question |

```evidence:anchor
$ git ls-remote origin refs/heads/master refs/heads/phase/a23-ask-shape-build-1
8a19fe8a049338c4b22ae6f798b0c98c0ca062e3	refs/heads/master
a6f34f290f8cb87c6caca4c090d05d0b9761d522	refs/heads/phase/a23-ask-shape-build-1

$ git rev-list --count <branch>..origin/master      -> 0
$ git rev-list --count origin/master..<branch>      -> 4
$ git merge-base --is-ancestor origin/master <branch> -> yes

$ git log -1 --format='%H %ci %s' <branch>
a6f34f290f8cb87c6caca4c090d05d0b9761d522 2026-08-28 16:23:22 +0300
Merge origin/master into phase/a23-ask-shape-build-1, and reseal in the SAME commit
```

```evidence:supersedes
This version supersedes GO-LANDING-S123-2-v3 under S37-1. v3 is immutable and is not edited, and
neither is v2 beneath it.

THE VERSION STAMP IS EXEMPT, AND IT HAS TO BE. A re-cut always changes the title's version and the
tail anchor's, and the tail anchor always lands as its own isolated hunk. No measured fact forces
those beyond the versioning itself, so a rule that demands one makes every future re-cut
automatically RED. Three windows measured that on v3's fence. The exemption is named here so it is
a stated rule rather than a reviewer's charity: TITLE VERSION and TAIL ANCHOR VERSION map to the
re-cut itself and need no other basis.

    v3, recovered form   sha1 8d4fdf13b02237f0b24722eddd6f2a2ff5b83ee2 over 12302 bytes

Every OTHER difference between v3 and this version, mapped to what forced it. A hunk that maps to
nothing on this list, and is not the version stamp, is a silent edit and finding one is a RED:
    the standfirst gains a paragraph  <- round 18 returned three REDs and this card must say why
    BODIES restores `(a merge is not evidence)` on S63-1  <- v3 deleted that gloss with nothing
                                       forcing it; a window caught it and it is the first silent
                                       edit this mechanism has found
    BODIES: S37-1's gloss now reads "v2 and v3 are immutable"  <- there are two superseded
                                       versions now, not one; the same hunk, and it is listed
                                       separately because a hunk can carry more than one change
                                       and that is exactly how v3's omissions hid
    this fence, rewritten             <- the exemption above, and v3's own omissions, recorded

WHAT v3's FENCE MISSED, recorded rather than quietly fixed: it omitted the title and tail-anchor
stamps that v2's own delta list had carried, it omitted a real strengthening of ON-DISAGREEMENT
("and do not act on the orders below … that report is a complete deliverable"), and it omitted the
S63-1 gloss deletion. Three unmapped changes, one of them a genuine defect.

THE DIFF DIGEST IS GONE, AND THAT IS A REPAIR RATHER THAN A RETREAT. `diff -u` is not one program:
three windows on BSD diff rendered this delta at a different byte count from the Architect's GNU
diff while agreeing on the hunk count, and one of them proved content-equivalence by applying its
own diff to the predecessor and recovering the successor byte-identically. A digest of a RENDERED
diff measures the renderer. The predecessor and successor digests already pin the delta completely
and portably: any two parties holding those two files hold the same delta, whatever their diff
prints. Those are what the review card carries now, with the hunk-to-this-list mapping as the work.
```

```evidence:files
- api/cwf/_lib/routing/askOnUnresolved.ts
- api/cwf/_lib/routing/computeClarification.ts
- api/cwf/_lib/turn/stageClarify.ts
- api/cwf/_lib/replay/clarificationLens.ts
- api/cwf/_lib/routing/__tests__/askAmbiguousShape.test.ts
- api/cwf/__tests__/stageClarify.test.ts
- docs/relay/PHASE-A23-ASK-SHAPE-BUILD-1-AG3-report.md
- docs/relay/PHASE-A23-ASK-SHAPE-BUILD-1-AG3-report.json
- public/architecture/manifest.json
```

```evidence:rehearsal
In a throwaway worktree detached at the branch sha in the anchor fence:

  npm run typecheck:api                     -> exit 0
  npx vitest run <the two test files in the files fence>
                                            -> 2 files passed, 57 tests passed, exit 0

BOTH READINGS WERE TAKEN AT THIS HEAD. v2's identical-looking numbers were taken at a different
commit and are not the basis of these; carrying them forward would have been the exact defect
this factory keeps committing.

THE REHEARSAL IS NOT THE VERDICT. It says the landing is not blocked by a stale branch, a type
error or a broken unit. The full suite and the corpus gate run at the request head and are yours.
```

```evidence:handback
The lane's report hands three things back, and two of them are gate findings rather than
work items. They are RELAYED here so you do not read them as noise in the report you land:
- FIVE reader sites carried the negative predicate that made widening the carrier unsafe.
  The card named none of them; the lane enumerated and repaired all five, and says the api
  typecheck found one that reading alone had missed.
- The whole-tree typecheck PASSES OVER THESE FILES AND PROVES NOTHING ABOUT THEM. The lane
  planted a type fault, watched that project ignore it, and watched the api typecheck catch
  it. That is a gate-coverage finding and it is the Architect's to card, not yours.
- The B1 carrier decision was the lane's to make and is made: the carrier was WIDENED, with
  four reasons and a fair statement of what the alternative would have bought. The Architect
  accepts it. Nothing in this landing reopens it.
```

## ORDER A — VERIFY THE MERGE IS ALREADY DONE, THEN LAND. DO NOT MERGE AGAIN.

Read both refs and run `git merge-base --is-ancestor origin/master <branch>`. If it answers yes, the
branch is level and **you merge nothing** — a second merge would add a commit this card never named.
Then `npm run land`, foreman address, `--no-ff`, no squash. Nothing else from this session is queued
against this trunk.

If it answers no, the branch moved again after this card was cut: stop and report, per
ON-DISAGREEMENT. Do not repair it yourself.

## ORDER B — READ THE CHECKS JOB BY JOB, AND EXPECT THE CANARY TO BE ABSENT

Print every job at the request head with its own verdict. **`eval-canary` will be skipped or absent
and that is the owner's freeze working** — `docs/ops/CANARY-FROZEN.md` records the ruling and its
single thaw condition. Not a fault, not to be repaired, not to be reported as a gap. Any other job
that is not green stops the landing and its text is the deliverable.

## ORDER C — AFTER THE TRUNK MOVES

Read the trunk run and report the corpus lens as NUMBERS — ORPHAN and GOVERNED-VIOLATION — rather
than as an adjective. Two readings, not one.

## ORDER D — WHAT YOU DO NOT DO

You do not edit the branch, its tests or its report. You do not reopen the B1 decision. You do not
act on the two gate findings in the handback fence — they are the Architect's to card.

## ORDER E — THE SEALED FILE, AND WHY YOU LEAVE IT ALONE

`public/architecture/manifest.json` is a generated, sealed artifact and it is in the change set
because the merge brought a new master in and **the lane resealed it in the SAME commit**, which is
what the repository requires. You do not regenerate it, you do not reseal it again, and you do not
"fix" a seal that looks stale to you. If a gate at the request head complains about that seal, that
complaint is the deliverable and the landing stops — the repair belongs to the build lane, not to
the foreman.

## FALSIFIER

This card is wrong if EITHER ref has moved since the `anchor` fence, **and the branch is the one to
read first** — it has moved under this card twice, both times because the build lane was doing
correct work. Test that before anything else and report both shas you got.

Second arm: **a landing reported green by one lens is a landing reported by no lens.** The trunk run
and the corpus reading both belong in your report.

## SHARED SURFACES

The trunk, and only through `npm run land`. You change no file on this branch, no gate, no governed
row, no migration, and not the sealed manifest named in ORDER E.

## DECISION RIGHTS

The owner settled the wording, the option ordering and the cap before the card was cut. The lane made
the carrier decision and the Architect accepts it. The Architect decides that this branch lands and is
answerable for the rehearsal. **You decide whether the checks at the request head permit the landing**;
a refusal is the deliverable and is printed verbatim.

BODIES: `docs/laws/` · `CLAUDE.md` · `docs/ops/CANARY-FROZEN.md` · `SOTA-1` (this item traces to
TIER A · Gaia2) · `S37-1` (v2 and v3 are immutable; this is a new version) · `S37-2` ·
`S63-1` (a merge is not evidence) · `TOTAL-45`.

fanout: personalized

Branch `phase/a23-ask-shape-build-1` — the branch you are landing, not one you create. Report to
`docs/relay/GO-LANDING-S123-2-AG5-report.md`.

```deliverables
branch: phase/a23-ask-shape-build-1
report: docs/relay/GO-LANDING-S123-2-AG5-report.md
```

TAIL ANCHOR: GO-LANDING-S123-2-v4 ends here.
