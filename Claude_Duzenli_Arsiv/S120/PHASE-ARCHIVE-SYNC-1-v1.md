<!-- relay-audit: v1 kind=card prov=1 -->
# PHASE-ARCHIVE-SYNC-1-v1
fanout: personalized — one address, AG-2.

MEASURED-AT 2026-08-26T15:38:00Z. Read by the Architect from the owner's own disk, the project box's own document list, and the live lane-state rows before this row was written.
ON-DISAGREEMENT: if your re-measure differs from any line here, THE MEASUREMENT WINS — STOP and report the difference.
SELF-INVALIDATION: this premise DECAYS the moment any document is added to the box or to the archive. The counts below are a photograph of 15:38Z, and the whole point of this card is that nobody should ever have to take that photograph by hand again.

## PREMISE
- MEASURED:a basename diff between the project box's own document list and every md/html/json/mermaid file under the owner's archive root @2026-08-26T15:20:00Z — thirty documents existed in the box and nowhere on disk.
- MEASURED:the same diff re-run after transport @2026-08-26T15:35:00Z — the archive went from 1584 distinct files to 1617, and the box-not-on-disk set went to zero.
- MEASURED:the per-directory file counts on disk before and after @2026-08-26T15:35:00Z — one session directory did not exist at all, one held zero files, and two held exactly one file each.
- MEASURED:a live read of the lane state rows @2026-08-26T15:35:00Z — all five addresses are writing, ages between eleven seconds and two minutes twenty.
- MEASURED:the five courier reports and the Architect's own independent re-read of the per-directory counts @2026-08-26T15:35:00Z — **the gap was closed BY HAND.** Five couriers were dispatched and carried thirty documents one at a time. It worked. Under PLATINUM it is still a design fault, and this card is its numbered redesign.
- UNMEASURED — whether anything OUTSIDE the box-versus-archive axis is also drifting. The diff run today compared exactly two surfaces. A third exists and was never compared. That is ORDER A.
- UNMEASURED — what the reconciler should do when the two sides disagree about CONTENT rather than existence. A file present on both sides with different bytes is invisible to a basename diff. That is ORDER B and it is the hard part of this card.

## CLAIMS
| claim | basis | anchor |
|---|---|---|
| this session's transport added thirty box documents to the archive | MEASURED: a basename diff of the box document list against the archive file tree, run before and after · a per-directory file count on disk, run before and after | gap |
| the archive holds 1617 distinct files after transport, up from 1584 | MEASURED: a de-duplicated basename count over the archive root, run twice | counts |
| the archive's close series runs S90, S92, then resumes at S106, and two lenses agree on that shape | MEASURED: a filename search over the whole connected folder · a content grep for a close heading over every archived file | absent |
| all five addresses wrote a state row within the preceding two minutes twenty | MEASURED: a live read of the lane state rows · a live read of the bus showing each address's most recent card | alive |

## EVIDENCE

```evidence:gap
$ diff(box document basenames, archive file basenames)
box entries verified against the box's own document list : 30 absent from disk
after transport                                          : 0 absent from disk
```

```evidence:counts
$ de-duplicated basename count over the archive root, before and after
before : 1584
after  : 1617
per-directory  S115: absent -> 7   S116: 13 -> 14   S117: 1 -> 13
               S118: 1 -> 5        S119: 0 -> 9     S120: 5 -> 5
```

```evidence:absent
$ lens 1 - filename, over the WHOLE connected folder
  (no output)
$ lens 2 - content grep for a close heading, over every archived file
  (no output)
Two lenses, both empty. S93 through S105 have no close artefact in either place.
```

```evidence:alive
$ a live read of the lane state rows
AG-1 2m20s   AG-2 22s   AG-3 11s   AG-4 2m09s   AG-5 1m51s
```

## WHY THIS CARD JUMPS THE QUEUE
The constitution does not leave this to the Architect's taste. A PLATINUM breach requires a numbered record **and a redesign that skips the queue**. The breach is recorded as PB-S120-ARCHIVE-HAND-CARRY-1 and this card is the redesign it compels.

The stakes are not tidiness. The owner's plan is that these documents reach disk, then a private repository, so that a retrieval engine can one day read FACTS out of them instead of the Architect reconstructing them from memory. **Every document that silently fails to make that crossing becomes a fact nobody can look up and somebody will eventually guess at.** Today's gap was thirty documents wide and nobody noticed until the owner asked a direct question.

> Two standing rules now say every durable document goes to both places in the turn it is written. **A rule an agent must remember is not a gate.** This card exists because the rule needs a machine behind it.

## ORDER A — THE THIRD SURFACE
Today's diff compared exactly two surfaces. Determine whether a third is in play — the repository the owner expects these documents to reach — and whether anything is landing there. **Two independent lenses at minimum**, and if the honest answer is that the third surface is not wired up at all, say that plainly. That answer is entirely acceptable and it changes the whole design.

## ORDER B — DRIFT, NOT JUST ABSENCE
A basename diff sees a file that is missing. It is blind to a file that is present on both sides with different content — the same name, quietly diverged. Design how the reconciler detects that. Say what it compares and what it costs to compare it. **If the two sides have no comparable digest, say so: that is a finding about the surfaces themselves, and it outranks the reconciler design.**

## ORDER C — THE RECONCILER, DESIGNED
Design the thing that makes this gap structurally unable to open, rather than merely noticed sooner. Consider at least: reconciliation at document-creation time versus a sweep; where it runs, given that the two surfaces have different reach; and what it does about the fact — measured today by a courier — that the shell surface and the commit surface disagree about how to spell the same directory.

**For each element say whether it PREVENTS the gap or only REPORTS it.** Both are useful and they are not the same thing, and a design that blurs them will be read as stronger than it is.

## ORDER D — WHAT IT MUST NEVER DO
State the destructive cases explicitly and how the design refuses them: overwriting a newer document with an older one, and deleting anything on the owner's disk. **The archive rule is that session archives are never deleted — four canonical rule lines once survived only there.** A reconciler that can delete is a reconciler that can lose the only copy.

## ORDER E — THE THIRD VALUE
If a command answers with neither success nor failure — a dialog, a refusal, a hang — say so in those words rather than retrying past it. And if a count you measure disagrees with any count in the PREMISE above, that disagreement is the report; stop and bring the bytes.

## FALSIFIER
1. If any file outside your own report is changed, the card FAILED — this card ships a design, not an implementation.
2. If ORDER A rests on a single lens, the card FAILED.
3. If ORDER B is answered only for absence and not for content drift, the card FAILED — absence is the easy half and it is already solved.
4. If any element of the design is described without saying whether it PREVENTS or merely REPORTS, the card FAILED.
5. If the design permits deletion on the owner's disk without naming that as a decision belonging to the owner, the card FAILED.

## SHARED SURFACES
The owner's archive directory is READ-ONLY for this card: count it, hash it, compare it, change nothing in it. No branch is landed, amended, rebased or force-pushed. Nothing is written to the database beyond your own address's ordinary state writes.

## DECISION RIGHTS
Designing the reconciler is YOURS. Admitting a new corpus to the retrieval engine's allow-list is NOT — that is a change to the code that defines the list, which makes it a law change and the owner's alone. Naming a preferred design is welcome; applying one is not yours.

## DELIVERY
Branch `phase/archive-sync-1`. Push it, open the pull request, and report at `docs/relay/PHASE-ARCHIVE-SYNC-1-AG2-report.md`. Plus the record files the repo's own gates COMPEL, named in your report. Do not land: the trunk is awaiting a named spend ruling.
