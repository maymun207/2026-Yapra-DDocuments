# S133-DISPATCH-RECORD-3 — the first two PASSes of the adversary mechanism, and the row that cannot be written wrong

Written 2026-09-08T06:45Z by the Architect. Covers the round from 06:05Z to 06:45Z: two scout verdicts, two producer cards, two review cards, four archived artefacts and one mechanism change that retires the destructive half of A-REC-S133-3.

## WHAT LANDED

| artefact | to | md5 | bytes | row created |
|---|---|---|---|---|
| CARD-MA-RERUN-3-S132-1-v12 | AG-4 | 3d011c54206f594de516382118581f55 | 36580 | 06:25:18Z |
| CARD-ADVERSARY-REVIEW-MA-RERUN-3-v12-S132-1-v1 | scout | 43304cdff7d48a9b3c331c4b1cfec8da | 12774 | 06:30:39Z |
| CARD-WEB-VALVE-1-S132-1-v10 | AG-4 | a1abaebc10f1e7e3b696cf8274d1985f | 56726 | 06:38:30Z |
| CARD-ADVERSARY-REVIEW-WEB-VALVE-1-S132-1-v10 | scout | c28e382dace7e5cb707918a2f5705d37 | 15512 | 06:42:15Z |

Archived to `Claude_Duzenli_Arsiv/S133/`, every file's md5 measured EQUAL to its row's `md5(body)` over the bridge before the review card naming it was posted: the four cards above, plus the two scout verdict rows —
`ADVERSARY-REVIEW-MA-RERUN-3-v11-S132-1-scout-report-v2` (b4971328e5a5d595be73704785dc740a, 8184 bytes) and
`ADVERSARY-REVIEW-WEB-VALVE-1-S132-1-scout-report-v9` (a6d2492321bd39dd7208fd81aefaee1e, 8183 bytes).

## THE TWO VERDICTS

**MA-RERUN-3 v11 — PASS-WITH-AMENDMENTS, the first PASS on that line.** Every carry the scout could verify was EQUAL; AMENDMENT 19 was ruled SATISFIED by a grep returning nothing; three of the Architect's declared judgements were ruled CORRECT and are now recorded as settled in v12's preamble so a later window cannot re-litigate them from memory. Two findings: the carried FALSIFIER clause still said "exit status", a term no sentence in the card produces after AMENDMENT 21 — safe, because it needs both conjuncts absent, but a TRAP for the obvious reading, since a producer printing an exit status to satisfy it would breach AMENDMENT 15 (AMENDMENT 24); and the `job.status` path was unguarded, so a producer could read the job's status, report it as the lens step's outcome, and no clause made that wrong (AMENDMENT 25).

**WEB-VALVE-1 v9 — PASS-WITH-AMENDMENTS.** AMENDMENT 34 measured applied at BOTH instances of AMENDMENT 23 with only the numeral moved. Five findings, and TWO of them the scout turned on its OWN earlier sentences: AMENDMENT 30's "outside every url present in the answer" is not implementable, because the checker holds one url and no sentence orders a detector for urls the meta never named (AMENDMENT 35); and the slash forms the scout itself added in AMENDMENT 31 admit a WRONG DATE, because 7/9/2026 is day-first in Turkish and month-first in English (AMENDMENT 36). Then: a union is erased at emit, so AMENDMENT 33's equality test has no runtime object and must read SOURCE TEXT (AMENDMENT 37); the NAMED-NOT-AMENDED finding sat inside the NORMATIVE scope block and had to move (AMENDMENT 38); and the rendered set's TIMEZONE was unpinned, so a set derived in local time differs by one day for a fetch near midnight (AMENDMENT 39).

Both lines' amendments were carried verbatim into v12 and v10 respectively, each by an ordered chain of server-side `replace()` calls sourced from the predecessor BUS ROW — fifteen for the MA card, eighteen for the WEB card — never hand-typed.

## THE MECHANISM CHANGE — F-S133-A-HAND-TYPED-ROW-CAN-BE-MADE-FAIL-CLOSED-1

A-REC-S133-3 recorded, twice, that a hand-typed insert diverged from the preflighted local file by tens of characters and was caught only by the `RETURNING` digest — AFTER the row was already in an append-only, delete-guarded table. The repair each time was to treat the row as the source and reconcile the copies to it. That repair was correct and the failure was still destructive: a wrong row cannot be withdrawn.

From this round the digest is a PRECONDITION rather than a receipt. Every insert this session — chain-built and hand-typed alike — carried

```
where md5(body) = '<md5 of the preflighted file>'
  and encode(sha256(convert_to(body,'UTF8')),'hex') = '<sha256 of the same file>'
```

so a mistyped byte anywhere produces ZERO rows instead of a wrong row, and the retry costs nothing but the paste. Four inserts, four first-try matches. The class A-REC-S133-3 names is not cured — a human hand still mistypes — but its CONSEQUENCE is: the bus can no longer be polluted by one.

## F-S133-CP-3-REFUSES-A-REHOMED-FINDING-1

AMENDMENT 38 ordered a non-normative finding moved into the PREMISE "without changing one word". `scripts/cardPreflight.ts` CP-3 refuses any premise line carrying neither an instrument nor `UNMEASURED`, so a verbatim rehome is impossible: the line takes an Architect-authored prefix or the card cannot be inserted. The prefix was added, and it is DECLARED to the scout in the review card's own prose rather than left to be discovered — the scout judges it at ORDER B.4. The general shape: a scout amendment can order a placement the preflight grammar forbids, and the honest resolution is to name the conflict in the card, never to quietly drop the amendment or quietly edit the sentence.

## THE RESIDUAL THE SCOUT NAMED, AND HOW FAR IT IS CLOSED

Both verdicts named the same limit: `scripts/mail-wait.mjs` reads `direction = to_lane` only, so a reviewer cannot read back one sentence it has written, and every review card this factory has cut ordered a comparison against an OPERAND — the Architect's transcription — rather than a PROOF (`F-S133-SCOUT-CANNOT-READ-BACK-ITS-OWN-ROWS-1`).

It is now closed by mechanism, on both lines, for rows archived from this hour forward: the verdict row is archived, its md5 is measured EQUAL to `md5(body)` on the server, and under the scout's own AMENDMENT 1 that equality is PROOF of byte-identity — so reading the archive file IS reading the row. Both v12 and v10 review cards order the scout to read its amendments out of its OWN row FIRST, then compare the Architect's carry to it, and only then compare either against the card.

It is NOT closed backwards, and neither card pretends otherwise. AMENDMENTS 14–17 on the MA line and AMENDMENT 23 on the WEB line were authored by earlier scout windows whose rows were never archived; both cards carry that as an open finding in the words the scout used.

## STATE AT THIS WRITE

Mode READY. AG-5 CLAIMED, heartbeat 06:41:35Z. AG-4 CLAIMED, heartbeat 06:42:09Z. Scout runs addressless. AG-1, AG-2 and AG-3 remain fossils by the owner's ruling and by measurement: no cross-lane path exists, and retiring them costs three window-openings for zero gain.

No `RELEASE` row of any kind exists, so the producer is still at its gate on both lines — which is the mechanism working, not a stall. The owner has no action item; the handoff that starts the producer is a scout PASS with NO amendments, and that is the Architect's to post.
