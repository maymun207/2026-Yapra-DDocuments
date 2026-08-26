# S120 · FINDINGS ADDENDUM 3 — A WITHDRAWN FINDING, AND WHY IT WAS WRONG

<!-- ADDENDUM. S120-FINDINGS-LEDGER-v3, ADDENDUM-1 and ADDENDUM-2 are NOT superseded and NOT
     re-typed. This file WITHDRAWS one finding published in ADDENDUM-1 and replaces it with a
     measured one. Under S37-1 the earlier artifact is immutable: it is corrected HERE, by name,
     not edited in place. -->

MEASURED-AT 2026-08-26T17:25:00Z (20:25 TSİ). Occasioned by the owner asking why the Architect
had not looked in a place that was in front of him the whole time.

---

## WITHDRAWN · F-S120-ARCHIVE-CLOSES-S93-S105-ABSENT-1

ADDENDUM-1 published this:

> *"Thirteen sessions (S93–S105) have no close artefact in the box or on disk. TWO INDEPENDENT
> LENSES were run... Both lenses agree."*

**That finding is WRONG and it is withdrawn.** The closing material for those sessions is on disk
and always was, in a project bucket the Architect never opened.

---

## A-REC-S120-TWO-LENSES-THAT-WERE-ONE-1 · THE DEFECT, NAMED PRECISELY

The law says an absence needs two independent lenses, because one negative probe is not proof.
Two lenses were run and reported as independent. **They were not independent.**

- Lens 1 searched for the FILENAME `*S9[3-9]*SESSION-CLOSE*`.
- Lens 2 searched for the CONTENT string `CWF S102 SESSION CLOSE`.

Different mechanisms — filename versus content — but **both keyed on the same token: the phrase
SESSION-CLOSE.** Two instruments pointed the same direction see the same blind spot twice. The
letter of the two-lens rule was satisfied; its meaning was not.

**The blind spot was a naming convention.** A file called `CWF-S<n>-SESSION-CLOSE-v1.md` first
appears at S106. Before that, a session's close was not one file — it was the QUARTET of carriers
that a close mints: the bootstrap, the open-items register, the session graph-KB, and the bug
bucket. Searching for the S106-era name across the S93-era archive was searching for a word that
had not been coined yet.

**The general lesson, which is worth more than the specific correction:** *two lenses must differ
in what they ASSUME, not merely in what they mechanically inspect.* A filename search and a
content grep for the same string are one lens wearing two coats.

---

## WHAT IS ACTUALLY ON DISK — MEASURED

The material sits in `Claude_Duzenli_Arsiv/Projeler/cwf_yaprak3/docs/`, an earlier project bucket
alongside four others, none of which the Architect had listed.

| carrier series | range found | where |
|---|---|---|
| session graph-KB | v90, v93–v102 | the yaprak3 bucket |
| open-items register | v96–v105 | the yaprak3 bucket |
| bootstrap prompt | v93–v102 | the yaprak3 bucket |
| bug bucket | v30–v36 (with gaps) | the yaprak3 bucket |
| session graph-KB | v104–v114 | the S115 box snapshot |

Two further closes sit under their own dated folders for S90 and S92. **Nothing about S93–S105 is
lost.** The connected folder is also a git repository with five commits and 1973 tracked files —
another lens the Architect had not run, and the one that first showed the yaprak3 path.

---

## THE REAL GAP, NOW MEASURED ACROSS FOUR SERIES

Sweeping each carrier series by version number rather than by era name gives the true holes.
Eleven, not thirteen sessions:

| series | missing versions |
|---|---|
| session graph-KB | v103 |
| open-items register | v106, v107 |
| bootstrap prompt | v103, v104, v105 |
| bug bucket | v33, v37, v38, v39, v40 |

A seventh lens — content search for each missing NAME inside every archived file — splits those
eleven in two:

- **SIX are NAMED inside archived conversation transcripts**: graph-KB v103, register v106 and
  v107, bootstrap v104, bucket v37 and v39.
- **FIVE appear nowhere at all**, not even as a mention: bootstrap v103 and v105, bucket v33, v38
  and v40.

⚠ **UNMEASURED, and stated rather than assumed: a NAME appearing inside a transcript does not mean
the DOCUMENT is there.** The transcript may hold the full text, or merely a reference to it. That
distinction is exactly the one this addendum exists to correct, so it is not going to be guessed
at a second time. Which of the six are recoverable is a measurement nobody has taken.

---

## WHY THIS MATTERS BEYOND THE FILES

The withdrawn finding was not idle. It was published in an addendum, written to the project box,
and written to disk — where it would have been read by a future session as ground truth. **A
wrong finding that reaches the archive is worse than no finding, because the archive is what the
next session trusts instead of re-measuring.**

It survived because the Architect stopped at the first plausible answer and dressed it in the
vocabulary of rigour: two lenses, both empty, stated as a measured absence. **The rigour was
theatre.** Real rigour was one directory listing away, and the owner supplied it by asking a
question the Architect should have asked himself.

---

## WHAT CHANGES

- The withdrawn finding is not carried into any closing artefact for this session.
- The archive-reconciler card already dispatched gains a concrete requirement from this: its
  drift detection must not key on a single naming convention, because this archive demonstrably
  spans at least two.
- The remaining eleven-version gap is real, small, and precisely named. It is a recovery task
  with a defined scope rather than a vague worry about lost history.

<!-- END · S120-FINDINGS-ADDENDUM-3 -->
