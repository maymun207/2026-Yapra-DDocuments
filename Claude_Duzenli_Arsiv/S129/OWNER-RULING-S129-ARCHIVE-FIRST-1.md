# OWNER-RULING-S129-ARCHIVE-FIRST-1 — the durable artefact is authored INTO THE ARCHIVE, and the project box is the copy

RECORDED 2026-09-02 evening (Istanbul), S129, under S112-YASA-1 (a design contribution from the
owner, filed by name, in his own words).

## THE RULING, the owner verbatim (session channel)

> "evet dogru yonu hayat agecirelim, ve gecmis 3 seesion daki olsuturdugun doaylar document
> reposunda oldugundan emin ol"

## THE EVIDENCE THAT FORCED IT (measured this session, S129)

S128's two §11 close artefacts and its dispatch record existed ONLY in the project box and had
never been placed on the bridge — `OWNER-RULING-S128-ARCHIVE-AUTOPUSH-1` arm 1(b) had not run at
all (`F-S129-AUTOPUSH-RULING-DID-NOT-LAND-ON-ITSELF-1`). The Architect placed them by RETYPING
the project-box text into the archive, and then could not prove the two copies were the same
bytes: **the project box exposes no digest surface, and no lane can read it**
(`F-S129-PROJECT-BOX-HAS-NO-DIGEST-SURFACE-1`). Every placement in the old direction therefore
produced an UNVERIFIABLE transcription and called it an archive copy.

The direction was the defect. The project box is a rendering surface; the archive is a git
working copy where a byte can be hashed, tracked, diffed, pushed and read back from a remote. A
pipeline that authors into the surface that cannot be measured, and copies into the one that can,
throws away the measurement at the only step where it was still available.

## EFFECT — three arms, binding from this session on

1. **ARCHIVE-FIRST (authoring law, effective immediately).** Every durable artefact — session
   closes, bootstraps, owner rulings, dispatch records, findings addenda, cards — is WRITTEN
   FIRST into `Claude_Duzenli_Arsiv/S<n>/` over the bridge. Its sha256 is taken THERE, from the
   file, before anything else happens to it. The project-box copy is made FROM that file and is
   a DERIVED VIEW, never the source (`DERIVED-NEVER-SOURCE`). Where the two disagree, the
   archive file wins and the difference is a bug.
2. **THE DIGEST TRAVELS WITH THE ARTEFACT.** The sha256 taken in arm 1 is quoted in the session's
   dispatch record and in the archive-push card, so the lane's remote read-back can be compared
   against a number that was measured at authoring time rather than re-derived afterwards from
   whatever happens to be on disk. A digest computed after the fact measures the copy, not the
   act of copying.
3. **NO SESSION CLOSES WITH AN UNTRACKED ARCHIVE FILE.** This restates
   OWNER-RULING-S128-ARCHIVE-AUTOPUSH-1 arm 1(d) and narrows it: "placed on the bridge" is NOT
   the close condition and never was — the close condition is a REMOTE SHA READ BACK, or a named
   ABSENT refusal standing in its place. A file sitting untracked in the archive folder is in
   exactly the state this ruling's predecessor was written to abolish.

## WHAT THIS RULING DOES NOT CHANGE

It does not relax `OWNER-RULING-S128-ARCHIVE-AUTOPUSH-1`; it supplies the missing DIRECTION that
ruling assumed. Arm 2 of that ruling (OPEN-MEASUREMENT at every session open) stands unchanged and
is what surfaced this defect. The Architect still writes no repository file in `cwf_yaprak`; the
archive is a documentation repository and is the Architect's own record surface.

## THE STANDING DEFECT THIS RULING INHERITS

`CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v129` carries NEITHER arm of
OWNER-RULING-S128-ARCHIVE-AUTOPUSH-1, though that ruling names v129 explicitly and declares a
bootstrap omitting them defective (`F-S129-BOOTSTRAP-OMITS-ITS-OWN-BINDING-ARM-1`). v130 carries
both arms of that ruling AND all three arms of this one, verbatim.

The design contribution is the owner's, recorded by name. The Architect measured the failure; the
correction of direction — author where the bytes can be counted — is his.

TAIL ANCHOR: OWNER-RULING-S129-ARCHIVE-FIRST-1 ends here.
