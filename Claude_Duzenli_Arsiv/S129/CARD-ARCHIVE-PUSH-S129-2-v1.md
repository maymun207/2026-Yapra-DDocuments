<!-- relay-audit: v1 kind=card -->
# CARD-ARCHIVE-PUSH-S129-2 · v1 — land the thirteen S129 archive files, and clear the Architect's own stale lock on the way in

`OWNER-RULING-S129-ARCHIVE-FIRST-1` and `OWNER-RULING-S128-ARCHIVE-AUTOPUSH-1` both require every
durable artefact to reach the documents repository in the turn it is written. Thirteen S129 files
are on the owner's disk and in NO commit. A scout window found this and named it as standing debt
while the Architect was busy elsewhere, which is exactly what a scout is for.

This card writes NO code, touches NO governed row, and enters the cwf_yaprak repository not at all.

## PREMISE

MEASURED: at 2026-09-03T12:19:3xZ, `git status --porcelain` in the documents repository over the bridge — TWENTY-TWO untracked paths, of which the THIRTEEN in the `scope` fence are this card's whole subject. The other nine are older project documents under `Claude_Duzenli_Arsiv/Projeler/`, named in the `not-mine` fence, and this card DOES NOT TOUCH THEM.
MEASURED: at 2026-09-03T12:19:3xZ, `git rev-parse --abbrev-ref HEAD` and `git log --oneline -3` in the same repository — the branch is `main`, and its two most recent commits are the S129 archive pushes named in the `history` fence.
MEASURED: at 2026-09-03T12:19:40Z, `ls -la .git/index.lock` in the documents repository — a ZERO-BYTE lock file dated 12:19 exists, and the `git status` that produced the reading above printed `warning: unable to unlink ... .git/index.lock: Operation not permitted` in the same command. The Architect's own read created it and the bridge shell cannot delete files, so it could not clean up after itself.
DECAYS the moment anything writes to the documents repository, and on any further archive file being written. Re-take `git status --porcelain` at ORDER A; the thirteen are a floor, not a ceiling — new S129 files may have appeared and they are IN SCOPE if they sit under `Claude_Duzenli_Arsiv/S129/`.
ON-DISAGREEMENT: if any of the thirteen is already tracked, or the branch is not `main`, or `.git/index.lock` is NON-EMPTY or dated other than 2026-09-03 — STOP and report. A non-empty lock is a live git process, not litter, and removing one is how a repository gets corrupted.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| the thirteen named files are untracked in the documents repository | MEASURED: git status --porcelain over the bridge at 2026-09-03T12:19:3xZ, every member enumerated | targets |
| nine further untracked paths exist and are deliberately out of scope | MEASURED: the same command at the same instant, every member enumerated | not-mine |
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
Untracked and DELIBERATELY NOT TOUCHED — older project documents, a separate debt:

  Claude_Duzenli_Arsiv/Projeler/EAIP-1/docs/   three .docx files
  Claude_Duzenli_Arsiv/Projeler/cwf_yaprak3/docs/   six session-reading .md files

They are named here so that a lane which stages them by a careless `git add .` can recognise the
mistake, and so that their absence from this card's commit is not read as a second oversight. They
predate S129 and belong to whoever cut the card that closes them.
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
-rw------- 1 <owner> <owner> 0 Sep  3 12:19 .git/index.lock

Zero bytes. Created by the Architect's own `git status --porcelain` at 2026-09-03T12:19:40Z, in the
same command that printed:

  warning: unable to unlink '.../.git/index.lock': Operation not permitted

THE BRIDGE SHELL CANNOT DELETE FILES BY DESIGN, so the Architect could not clean up after itself.
This is NOT another window's lock and it is NOT a live git process. It is litter with a named
author and a timestamp, and this card is the authority to remove it.

A lane refusing to touch a lock it cannot attribute is behaving CORRECTLY — AG-4 did exactly that
earlier in S129 and was right to. The attribution is what changes the answer, and it is given here
rather than assumed.
```

## ORDER A — READ FIRST

Re-take `git status --porcelain` and `git rev-parse --abbrev-ref HEAD`. Apply the `scope` fence's
RULE, not just its list. Confirm `.git/index.lock` is zero bytes and dated 2026-09-03 before you
touch it; if it is not, STOP and report — the ON-DISAGREEMENT arm governs and a non-empty lock is a
live process.

## ORDER B — CLEAR THE LOCK, THEN COMMIT

Remove `.git/index.lock` on the authority of the `lock` fence. Then stage ONLY the paths the scope
rule admits — name them explicitly, never `git add .`, because nine out-of-scope paths sit in the
same working tree and a careless add takes them all.

One commit, `--no-ff` discipline does not apply here since nothing is merged. Message: name the
card and say what the files are. Push to `main`.

## ORDER C — PROVE IT FROM THE REMOTE, NOT FROM THE PUSH

A push's exit code is not evidence (S63-1). Read the pushed state back with
`git ls-remote origin refs/heads/main` and confirm the tip matches your local `git rev-parse HEAD`.
Then `git status --porcelain` once more and confirm the thirteen no longer appear — and that the
nine out-of-scope paths STILL DO. Their continued presence is the proof you staged narrowly; their
absence would mean you took them too, and that is a finding you must report rather than a tidy
outcome.

## ORDER D — REPORT

File `from_lane` with artifact name `ARCHIVE-PUSH-S129-2-<your-address>-report`, carrying the ORDER
A readings, the full commit sha you created, the ORDER C remote reading, and the confirmation that
the nine out-of-scope paths survived untouched. No repository file is written for the report.

## FALSIFIER

This card is wrong if the thirteen turn out to be already tracked, or if `.git/index.lock` is
non-empty. Either would mean the world moved between the reading and the order, and the
ON-DISAGREEMENT arm is the response.

## SHARED SURFACES

The documents repository ONLY: thirteen new files under `Claude_Duzenli_Arsiv/S129/`, one commit,
one push to `main`, and the removal of one zero-byte lock file. NOTHING in the cwf_yaprak
repository. No governed row. No migration. No CI. No pull request. No merge. No secret. No other
deletion of any kind.

## DECISION RIGHTS

`OWNER-RULING-S129-ARCHIVE-FIRST-1` and `OWNER-RULING-S128-ARCHIVE-AUTOPUSH-1` order this and it is
not discretionary. You decide the commit message and nothing else.

You decide NOTHING about scope: the nine out-of-scope paths stay untracked, and a lane that lands
them has exceeded this card even if the result looks tidier.

BODIES: `PLATINUM` · `S63-1` (the push is not the evidence; the remote read is) · `TOTAL-45` ·
`S61-2`.

fanout: personalized

```deliverables
branch: main — direct commit, no pull request
report: bus row from_lane, artifact_name ARCHIVE-PUSH-S129-2-<your-address>-report
```

TAIL ANCHOR: CARD-ARCHIVE-PUSH-S129-2-v1 ends here.
