# S120 · FINDINGS ADDENDUM 1 — THE ARCHIVE CARRIER

<!-- This is an ADDENDUM, NOT a v4. S120-FINDINGS-LEDGER-v3 is NOT superseded and NOT re-typed.
     Re-typing a 20887-byte ledger from memory is exactly the silent-compression DEFECT the
     "EN TAM TANIKLI İFADE KAZANIR" law names. v3 stands whole; this file appends. -->

MEASURED-AT 2026-08-26T15:35:00Z (18:35 TSİ). Every number below was read from the owner's own
disk, the live database, or the project box in this turn. No number is recalled.

---

## WHY THIS FILE EXISTS

The owner discovered that documents he believed were on his disk were not on his disk. He was
right to call it unacceptable. The Architect knew at session open that the connected-folder list
was EMPTY and did not say so. He then built a plan on the assumption that the documents were
reaching local git and from there a private GitHub repo — the plan under which the vector engine
would one day read these documents back as FACTS instead of the Architect guessing at them.

An assumption was allowed to stand where a measurement was available. That is the defect this
file records, and the standing rule below is its cure.

---

## THE STANDING RULE (now permanent, outside this session)

Two rules were written to durable cross-session memory. They are not session notes; they survive
this conversation and apply on every surface.

**1 · CAPABILITY GAPS ARE DECLARED, NEVER LEFT TO ASSUMPTION.** When a capability the owner is
relying on is ABSENT, BLOCKED, or NOT CONFIGURED, it is said IN THAT TURN — not when it becomes
convenient, not when he asks. Before reporting that work is saved, MEASURE where it went.
Correcting a false assumption the owner is holding comes BEFORE answering the rest of his message.

**2 · EVERY DURABLE DOCUMENT GOES TO BOTH PLACES, IN THE TURN IT IS WRITTEN.** The project box
AND `Claude_Duzenli_Arsiv/S<session>/` on disk. Same turn. Never batched to the end of a session,
because a session that ends early takes the un-batched documents with it.

---

## F-S120-ARCHIVE-CARRIER-GAP-1 · MEASURED, THEN CLOSED

The gap was computed, not estimated: every basename in the project box's own document list was
diffed against every `.md`/`.html`/`.json`/`.mermaid` basename anywhere under the archive root.

| lens | before | after |
|---|---|---|
| distinct files in the archive | 1584 | 1617 |
| box documents absent from the archive | 30 | 0 |

Thirty documents crossed. Per-session result, each verified on disk by the Architect independently
of the lane that carried it (S63-1 — a courier's report is not proof):

| directory | files before | files after |
|---|---|---|
| S115 | did not exist | 7 |
| S116 | 13 | 14 |
| S117 | 1 | 13 |
| S118 | 1 | 5 |
| S119 | 0 | 9 |
| S120 | 5 | 5 |

Truncation was checked separately from byte counts: the tail of each spot-checked file carries its
own end marker (`END-OF-BUCKET REGISTER-BUG-BUCKET-v55`, `<!-- END · S119-FINDINGS-LEDGER-v3 -->`).
A byte count proves transport; an end marker proves the document is whole.

**Transport method matters and is recorded.** The documents were NOT re-typed through any window.
Each was decoded once into a container file and moved to disk as bytes. This is the difference
between copying a document and paraphrasing one, and only the first is an archive.

---

## F-S120-ARCHIVE-CLOSES-S93-S105-ABSENT-1 · A GAP NEITHER PLACE CAN FILL

The archive's own close series runs: `Session90_August9/`, `Session92Kapanis_files/`, then nothing
until S106. The project box's earliest close is `CWF-S106-SESSION-CLOSE-v1.md`.

TWO INDEPENDENT LENSES were run, because one negative probe is never proof of absence:

- **Lens 1 — filename.** A case-insensitive search for `*S9[3-9]*SESSION-CLOSE*` and
  `*S10[0-5]*SESSION-CLOSE*` across the ENTIRE connected folder, not merely the archive. Empty.
- **Lens 2 — content.** A recursive grep for the literal heading text of one such close
  (`CWF S102 SESSION CLOSE`) across every file in the archive, conversation transcripts included.
  Empty.

Both lenses agree. Thirteen sessions (S93–S105) have no close artefact in the box or on disk.

**This is stated as a measured absence, not as a loss.** It is not established that a close was
ever written under that name for each of those sessions. What IS established: if one was, this
archive does not hold it, and no lens available to the Architect can produce it.

---

## A-REC-S120-UNVERIFIED-NAMES-IN-MY-OWN-INDEX-1 · SELF-DECLARED

When building the comparison index, the Architect appended fifteen close-file names and three
other names that he had NOT verified against the box's document list. They were plausible by
pattern — the series was S106, S107, S108, so S105 and S104 "must" exist — and pattern is not
measurement. The diff then reported them as "missing from the archive", which was true but
misleading, because they were equally absent from the source being compared.

This is a TOTAL-45 violation committed inside the very instrument built to measure a gap honestly.
It was caught by re-reading the box's own list, and it is declared here rather than quietly
corrected. An index that carries invented rows produces findings that are arithmetically correct
and factually empty.

---

## F-S120-COMMIT-PATH-SURFACE-MISMATCH-1 · LANE-MEASURED

A carrier lane measured, and reported unprompted, that the two file surfaces do not share a path
vocabulary: the shell surface addresses the connected folder by its mount path, while the commit
surface rejects that same path and requires the real device path. The first commit attempt failed
on all twelve files for this reason and succeeded on retry.

This belongs in the ground record, not in a lane's head. It is the kind of fact that costs one
failed attempt every time it is rediscovered.

---

## PB-S120-ARCHIVE-HAND-CARRY-1 · PLATINUM BREACH, SELF-DECLARED

Thirty documents reached the owner's disk because agents were dispatched to carry them one at a
time. It worked, and it is still wrong: **manual work was required, therefore the design is wrong.**

The two standing rules above prevent the gap from RE-OPENING for future documents. They do not
make the archive self-configuring, and a rule that depends on an agent remembering it is the shape
this project already calls *a law without a gate*.

The cure is a machine that measures box-versus-disk and reconciles without being asked. It is not
designed yet, and naming it here is the honest state — not a claim that it is handled.

---

## THE QDRANT ANSWER, CORRECTED

The owner asked why the Architect cannot query Qdrant when so much work went into that ability.
The first answer given was "there is no channel." That answer was too flat, and flattening it hid
that the two halves have completely different costs.

**There are two separate walls, and only one of them is a wall.**

**Wall 1 — the credential. FIXABLE, and it is a machine's job.** The engine's connection details
exist as named environment variables in the product. This container holds neither value. So the
Architect cannot open a connection today — but this is a MISSING CREDENTIAL, not a missing
capability. A lane, which has cloud reach the Architect does not, can run a query today. The
earlier answer implied a permanent incapacity where there is a supply problem, and that
understatement is corrected here.

**Wall 2 — the corpus. NOT fixable by configuration, and it is the owner's decision.** The
admission list is a CLOSED list in code, and it admits exactly two corpora — neither of them
documents. The index holds no law, no ADR, no architecture document, no session archive. So even
with a working connection, a query for these documents returns nothing, and correctly so.

**The consequence, stated plainly:** getting these documents onto disk and into GitHub — done today
— does NOT by itself make them searchable by the engine. That step requires an Architect corpus to
be admitted, and admitting one is a CHANGE TO THE CODE THAT DEFINES THE ALLOW-LIST, not a setting.
It is a law change and it is the owner's to make.

The item that carries this cure is named in two carriers and **still has no document**. Writing that
document is the next real step, and it is a machine's job, not the owner's.

---

## WHAT IS STILL OWED AT THIS MOMENT

- The register, bug bucket, graph-KB and session close for S120 — then the bootstrap **LAST**,
  because an anchor table minted before the last act is stale on arrival.
- The sweep execution card, with its set RE-MEASURED at the moment it runs, not reused from
  this morning's measurement.
- The author-lens ruling, which waits on a blast-radius number from a lane and then on owner
  consent — a real decision, correctly the owner's.

<!-- END · S120-FINDINGS-ADDENDUM-1 -->
