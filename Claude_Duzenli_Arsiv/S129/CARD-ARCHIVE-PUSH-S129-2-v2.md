<!-- relay-audit: v1 kind=card -->
# CARD-ARCHIVE-PUSH-S129-2 · v2 — land the untracked S129 archive files, clear the Architect's own stale lock, and stop calling nine NFD phantoms a debt

`OWNER-RULING-S129-ARCHIVE-FIRST-1` and `OWNER-RULING-S128-ARCHIVE-AUTOPUSH-1` both require every
durable artefact to reach the documents repository in the turn it is written. The S129 archive
files are on the owner's disk and in NO commit. A scout window found this and named it as standing
debt while the Architect was busy elsewhere, which is exactly what a scout is for. THE COUNT IS
DELIBERATELY NOT FROZEN IN THIS SENTENCE: it read thirteen at the cut and fifteen at review, and
the `scope` fence's RULE is what absorbs the movement.

This card writes NO code, touches NO governed row, and enters the cwf_yaprak repository not at all.

## PREMISE

MEASURED: at 2026-09-03T12:19:3xZ, `git status --porcelain` in the documents repository over the bridge — TWENTY-TWO paths reported untracked, of which the THIRTEEN in the `scope` fence are this card's whole subject. The other nine are NOT untracked at all: they are NFD phantoms of files ALREADY TRACKED under their NFC spelling, proved in the `not-mine` fence, and this card DOES NOT TOUCH THEM.
MEASURED: at 2026-09-03T12:4xZ, `GIT_OPTIONAL_LOCKS=0 git status --porcelain` on the same bridge lens — TWENTY-FIVE lines, of which sixteen sit under `Claude_Duzenli_Arsiv/S129/` and nine under `Projeler/`. The S129 count MOVED from thirteen to sixteen between the cut and this reading, and the `scope` fence's RULE takes all of them without a re-cut.
MEASURED: at 2026-09-03T12:19:3xZ, `git rev-parse --abbrev-ref HEAD` and `git log --oneline -3` in the same repository — the branch is `main`, and its two most recent commits are the S129 archive pushes named in the `history` fence.
MEASURED: at 2026-09-03T12:19:40Z, `ls -la .git/index.lock` in the documents repository — a ZERO-BYTE lock file dated 12:19 exists, and the `git status` that produced the reading above printed `warning: unable to unlink ... .git/index.lock: Operation not permitted` in the same command. The Architect's own read created it and the bridge shell cannot delete files, so it could not clean up after itself.
DECAYS the moment anything writes to the documents repository, and on any further archive file being written. Re-take `git status --porcelain` at ORDER A; the thirteen are a floor, not a ceiling — new S129 files may have appeared and they are IN SCOPE if they sit under `Claude_Duzenli_Arsiv/S129/`.
ON-DISAGREEMENT: if any named S129 file is already tracked, or the branch is not `main`, or `.git/index.lock` is NON-EMPTY or dated other than 2026-09-03 — STOP and report. A non-empty lock is a live git process, not litter, and removing one is how a repository gets corrupted. A COUNT that has moved is NOT a disagreement: the `scope` fence's RULE governs it and you proceed.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| the named S129 files are untracked in the documents repository, and the population grew between the cut and review | MEASURED: git status --porcelain over the bridge at 2026-09-03T12:19:3xZ and again at 2026-09-03T12:4xZ, every member of the first reading enumerated | targets |
| the nine paths the bridge lens shows as untracked under Projeler/ are NFD phantoms of files ALREADY TRACKED under NFC, not a debt | MEASURED: git ls-tree -r --name-only HEAD over both Projeler directories at 2026-09-03T12:4xZ, the NFC spellings returned, re-derived by the scout on its own lens | not-mine |
| the branch is main and its recent history is the two prior archive pushes | MEASURED: git rev-parse --abbrev-ref HEAD and git log --oneline -3 at 2026-09-03T12:19:3xZ | history |
| the lock is zero bytes, dated today, and was created by the Architect's own read which could not remove it | MEASURED: ls -la on the path at 2026-09-03T12:19:40Z, beside the unlink warning printed by the command that made it | lock |
| whether any further S129 file has been written since the reading | NOT-READ | ORDER A re-takes the status and the targets fence's rule governs |

```evidence:targets
The thirteen, as `git status --porcelain` printed them at 2026-09-03T12:19:3xZ. Each is a
durable S129 artefact written this session and committed nowhere:

  CARD-LANE-POSSESSION-1-v1.md          the withdrawn possession card
  CARD-TOOL-VISIBILITY-A-1-v1.md        the DB half, first cut
  CARD-TOOL-VISIBILITY-A-1-v2.md        the DB half as landed
  CARD-TOOL-VISIBILITY-B-1-v1.md        the code half, first cut
  CARD-TOOL-VISIBILITY-B-1-v2.md        the code half after the first scout AMBER
  CARD-TOOL-VISIBILITY-B-1-v3.md        the code half after the second scout RED
  OWNER-RULING-S129-SOTA-GAP-DISPOSITION-1.md
  S129-DISPATCH-RECORD-1.md
  S129-DISPATCH-RECORD-2.md
  S129-DISPATCH-RECORD-3.md
  S129-DISPATCH-RECORD-4.md
  S129-DISPATCH-RECORD-5.md
  S129-FINDINGS-ADDENDUM-1.md

All thirteen sit under `Claude_Duzenli_Arsiv/S129/`. The `scope` fence below carries the same
membership as paths, plus the rule a re-take must apply.
```

```scope
- Claude_Duzenli_Arsiv/S129/CARD-LANE-POSSESSION-1-v1.md
- Claude_Duzenli_Arsiv/S129/CARD-TOOL-VISIBILITY-A-1-v1.md
- Claude_Duzenli_Arsiv/S129/CARD-TOOL-VISIBILITY-A-1-v2.md
- Claude_Duzenli_Arsiv/S129/CARD-TOOL-VISIBILITY-B-1-v1.md
- Claude_Duzenli_Arsiv/S129/CARD-TOOL-VISIBILITY-B-1-v2.md
- Claude_Duzenli_Arsiv/S129/CARD-TOOL-VISIBILITY-B-1-v3.md
- Claude_Duzenli_Arsiv/S129/OWNER-RULING-S129-SOTA-GAP-DISPOSITION-1.md
- Claude_Duzenli_Arsiv/S129/S129-DISPATCH-RECORD-1.md
- Claude_Duzenli_Arsiv/S129/S129-DISPATCH-RECORD-2.md
- Claude_Duzenli_Arsiv/S129/S129-DISPATCH-RECORD-3.md
- Claude_Duzenli_Arsiv/S129/S129-DISPATCH-RECORD-4.md
- Claude_Duzenli_Arsiv/S129/S129-DISPATCH-RECORD-5.md
- Claude_Duzenli_Arsiv/S129/S129-FINDINGS-ADDENDUM-1.md
THE RULE, so a re-take does not need a new card: anything untracked under
Claude_Duzenli_Arsiv/S129/ at ORDER A is IN SCOPE, whether or not it is listed above. Anything
outside that directory is OUT, without exception.
```

```evidence:not-mine
NINE PATHS UNDER `Claude_Duzenli_Arsiv/Projeler/` APPEAR UNTRACKED ON THE BRIDGE LENS AND ARE NOT A
DEBT. They are NFD PHANTOMS of files ALREADY TRACKED under their NFC spelling — F-S125-NFD-LENS-1,
measured in `CARD-ARCHIVE-PUSH-S129-1`'s own phantoms fence, which named these same nine and proved
them the same way.

  Claude_Duzenli_Arsiv/Projeler/EAIP-1/docs/          three .docx files
  Claude_Duzenli_Arsiv/Projeler/cwf_yaprak3/docs/     six session-reading .md files

THE PROOF, re-taken at 2026-09-03T12:4xZ with `git ls-tree -r --name-only HEAD` over both
directories: the tree returns the NFC spelling of each, for example the Session76 reading file,
which `git status` on a Linux lens reports as untracked in its NFD form. Same file, two
normalisations, one tracked.

v1 OF THIS CARD CALLED THEM "a separate debt ... they predate S129 and belong to whoever cut the
card that closes them". THAT SENTENCE WAS WRONG AND IT WAS DANGEROUS. A lane cutting the card that
"closes that debt" would stage NFD duplicates of paths already in the tree and create genuine
duplicate files in the archive. This card touched none of them either way; the damage was to the
premise it would have handed the next card.

THIS CARD STILL TOUCHES NONE OF THEM. The reason has changed from "not mine" to "already tracked",
and the instruction is unchanged: never `git add .`, name every path.
```

```evidence:history
Branch main. Its two most recent commits, both prior archive pushes:

  CARD-ARCHIVE-PUSH-S129-1: the report and the card, beside the push they describe
  CARD-ARCHIVE-PUSH-S129-1: land the six S128 stragglers and the two S129 artefacts

Read by `git log --oneline -3` at 2026-09-03T12:19:3xZ. THE ABBREVIATED SHAS THAT COMMAND
PRINTED ARE DELIBERATELY NOT COPIED HERE: a prefix is ambiguous and a lane copies what it
reads. Resolve the branch tip yourself with `git rev-parse HEAD` before you commit onto it,
and identify these two by their subjects above.
```

```evidence:lock
`.git/index.lock` — ZERO BYTES, dated 2026-09-03 at 12:19 UTC.

Those two facts are the whole of the authority and the whole of the stop condition. THE FILE MODE
IS NOT LOAD-BEARING AND IS DELIBERATELY NOT QUOTED HERE: the bridge lens and a macOS shell report
different modes and different owners for the same file, and a lane comparing a quoted mode
literally would meet a mismatch that means nothing. THE CLOCK IS NOT LOAD-BEARING EITHER, BEYOND
THE DATE: a local-time shell in the owner's zone reads 15:19 for the same instant.

It was created by the Architect's own `git status --porcelain` at 2026-09-03T12:19:40Z, in the same
command that printed:

  warning: unable to unlink '.../.git/index.lock': Operation not permitted

THE BRIDGE SHELL CANNOT DELETE FILES BY DESIGN, so the Architect could not clean up after itself.
This is NOT another window's lock and it is NOT a live git process. It is litter with a named
author and a timestamp, and this card is the authority to remove it.

A lane refusing to touch a lock it cannot attribute is behaving CORRECTLY — AG-4 did exactly that
earlier in S129 and was right to. The attribution is what changes the answer, and it is given here
rather than assumed.

AND WHILE YOU AUDIT LITTER, DO NOT LITTER: use `GIT_OPTIONAL_LOCKS=0` for every read-only git
command. An ordinary `git status` is what created this lock.
```

## ORDER A — READ FIRST

Re-take `git status --porcelain` and `git rev-parse --abbrev-ref HEAD`. Apply the `scope` fence's
RULE, not just its list. Confirm `.git/index.lock` is zero bytes and dated 2026-09-03 before you
touch it; if it is not, STOP and report — the ON-DISAGREEMENT arm governs and a non-empty lock is a
live process.

## ORDER B — CLEAR THE LOCK, THEN COMMIT

Remove `.git/index.lock` on the authority of the `lock` fence. Then stage ONLY the paths the scope
rule admits — name them explicitly, NEVER `git add .`. On a Linux or bridge lens the nine NFD
phantoms are sitting in the same working tree looking exactly like new files, and a careless add
commits duplicates of paths the tree already holds.

One commit, `--no-ff` discipline does not apply here since nothing is merged. Message: name the
card and say what the files are. Push to `main`.

## ORDER C — PROVE IT FROM THE REMOTE, AND PROVE THE STAGING WAS NARROW IN A WAY THAT CANNOT INVERT

A push's exit code is not evidence (S63-1). Read the pushed state back with
`GIT_OPTIONAL_LOCKS=0 git ls-remote origin refs/heads/main` and confirm the tip matches your local
`git rev-parse HEAD`.

Then prove the staging was narrow. **THE TEST IS PLATFORM-INDEPENDENT AND IT IS THIS: after the
commit, `GIT_OPTIONAL_LOCKS=0 git status --porcelain` returns NOTHING outside
`Claude_Duzenli_Arsiv/S129/`.** That is the whole proof and it reads the same on every lens.

DO NOT use the phantoms as the proof, and this is why — v1 of this card did, and it was wrong in a
way that punishes a correct lane. On a Linux or bridge lens the nine NFD phantoms appear before and
after staging. ON macOS THEY NEVER APPEAR AT ALL, because the filesystem normalises. v1 ordered the
lane to confirm the nine "STILL DO" appear and ruled their absence a finding to report — so a lane
that staged perfectly on the owner's own platform would observe them absent and be instructed BY
THE CARD to report that it had swept them up. A verification that fires precisely when the work was
done right teaches the lane to distrust a correct outcome.

Report which lens you are on and what `git status --porcelain` returned in full.

## ORDER D — REPORT

File `from_lane` with artifact name `ARCHIVE-PUSH-S129-2-<your-address>-report`, carrying the ORDER
A readings, the full commit sha you created, the ORDER C remote reading, and the confirmation that
`git status --porcelain` returns nothing outside `Claude_Duzenli_Arsiv/S129/`. Name your lens. If
you are on a Linux or bridge lens, also confirm the nine phantoms still appear — on macOS they never
will, and their absence there proves nothing either way. No repository file is written for the
report.

## FALSIFIER

This card is wrong if the S129 files turn out to be already tracked, or if `.git/index.lock` is
non-empty, or if `git ls-tree` shows the nine Projeler paths are NOT already in the tree under
another normalisation. Either of the first two would mean the world moved between the reading and
the order. The third would mean the phantom diagnosis is wrong and they really are a debt — which
is what v1 asserted without checking.

## SHARED SURFACES

The documents repository ONLY: the untracked files under `Claude_Duzenli_Arsiv/S129/` that the
scope RULE admits at ORDER A, one commit, one push to `main`, and the removal of one zero-byte lock
file. NOTHING under `Claude_Duzenli_Arsiv/Projeler/`. NOTHING in the cwf_yaprak
repository. No governed row. No migration. No CI. No pull request. No merge. No secret. No other
deletion of any kind.

## DECISION RIGHTS

`OWNER-RULING-S129-ARCHIVE-FIRST-1` and `OWNER-RULING-S128-ARCHIVE-AUTOPUSH-1` order this and it is
not discretionary. You decide the commit message and nothing else.

You decide NOTHING about scope: the nine phantom paths are NOT staged, and a lane that stages them
has committed duplicates of files the tree already holds — a worse outcome than the untidiness it
was trying to remove.

BODIES: `PLATINUM` · `S63-1` (the push is not the evidence; the remote read is) · `TOTAL-45` ·
`S61-2`.

fanout: personalized

```deliverables
branch: main — direct commit, no pull request
report: bus row from_lane, artifact_name ARCHIVE-PUSH-S129-2-<your-address>-report
```

```evidence:supersedes
This version supersedes CARD-ARCHIVE-PUSH-S129-2-v1 under S37-1. v1 is immutable and is not edited.
THE VERSION STAMPS ARE EXEMPT: title and tail anchor map to the re-cut itself. Every OTHER
difference maps to the scout note that forced it (verdict artifact_name
SCOUT-CARD-REVIEW-ARCHIVE-PUSH-S129-2-verdict, from_lane, 2026-09-03T12:34:06Z, verdict RED on two
arms). A changed line that maps to nothing here, and is not a version stamp, is a silent edit and
finding one is a RED:

  the not-mine fence says PHANTOM,     <- RED one: the nine are NFD phantoms of files ALREADY
    not debt, and carries the             TRACKED under NFC, proved by git ls-tree, and already
    ls-tree proof and the reason          measured in this card's own predecessor. v1 called them
    the old sentence was dangerous        a debt and would have handed the next card a premise
                                          that produces duplicate files in the archive
  the CLAIMS row for the nine is       <- the same finding: the claim asserted untrackedness from
    rewritten and its basis is            a status reading; the basis is now the tree itself
    ls-tree, not status
  ORDER C's narrow-staging proof is    <- RED two: on macOS the phantoms NEVER appear, so v1's
    "nothing outside S129/", and it        "confirm they STILL DO" instructs a perfectly narrow
    says why the phantom test is           lane to report that it swept them up. The predecessor
    forbidden                              card carried the platform clause and v1 dropped it
  the lock fence drops the file mode   <- the scout's fence-text finding: the bridge lens and a
    and marks the clock UTC                macOS shell report different modes and a local clock
                                           reading 15:19 for the same instant, and a lane
                                           comparing a quoted line literally meets two mismatches
                                           on the one fence that authorises a deletion
  the lock fence orders                <- the scout's own working discipline, adopted: an ordinary
    GIT_OPTIONAL_LOCKS=0 for reads       git status is what created the lock this card removes
  the FALSIFIER gains the phantom      <- RED one, encoded as a falsifier rather than a paragraph
    arm
  ORDER B's reason for naming paths    <- RED one, carried into the order a lane reads while its
    changes from "out of scope" to         hands are on the keyboard: on the bridge lens a careless
    "they are phantoms and a careless      add commits duplicates, which is a worse outcome than
    add commits duplicates"                the one v1's wording warned about
  ORDER D, SHARED SURFACES and         <- RED one, swept through every remaining place v1 called
    DECISION RIGHTS drop the              the nine "out of scope" — a corrected fence beside four
    "out of scope" framing and the        uncorrected sentences is a card that argues with itself
    frozen file count
  the PREMISE stops calling the nine   <- RED one again, in the section a lane reads FIRST: v1's
    untracked and gains a second          premise asserted untrackedness that its own corrected
    reading with the moved count          fence now denies. A card whose premise and fence
                                          disagree is the defect class this session keeps meeting
  the ON-DISAGREEMENT arm says a       <- the count moved during review; without this a lane would
    moved COUNT is not a disagreement     read the movement as a stop condition and halt correctly
                                          for the wrong reason
  the title says "untracked S129       <- the count moved from thirteen to fifteen between the cut
    files" rather than "thirteen"        and the review, absorbed by the scope RULE without a
                                         re-cut. The title should not name a number the body
                                         deliberately refuses to freeze

UNCHANGED and deliberately so: the scope fence and its RULE, which the scout named as the best
thing in the card and which absorbed the count movement by design; the lock authority, which it
found SOUND; ORDER A; ORDER B; and the prohibition on `git add .`. The scout did not read the
remote tip and said why — that reading is the lane's to take after its own push, and taking it
early would measure a state this card has not yet produced.
```

TAIL ANCHOR: CARD-ARCHIVE-PUSH-S129-2-v2 ends here.
