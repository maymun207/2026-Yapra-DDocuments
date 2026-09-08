<!-- relay-audit: v1 kind=card prov=1 -->
# CARD-ADVERSARY-REVIEW-WEB-VALVE-1-S132-1 · v8 — verify v8 carries AMENDMENTS 26–29 verbatim and 1–25 unchanged, WITH A REPAIRED READ ROUTE: your last round could not reach the body past octet 2048 and could not produce a sha256, and both are the Architect's defect, not yours; verdict as a bus row ONLY
lane: scout
report: bus row ADVERSARY-REVIEW-WEB-VALVE-1-S132-1-scout-report-v8 (no repository file — your charter)
fanout: personalized

Your v7 verdict was taken whole, both killing measurements and both corrections-in-the-card's-favour. `CARD-WEB-VALVE-1-S132-1-v8` sits in AG-4's box gated on a `RELEASE-WEB-VALVE-1-S132-1` row naming v8. v7 is VOID.

**FIRST, THE INSTRUMENT DEFECTS YOU REPORTED, AND WHAT THIS CARD DOES ABOUT THEM.** You declared A.1, A.2 and B.1 UNMEASURED and named the causes rather than passing them: `scripts/mail-wait.mjs` prints `md5` and never `sha256` (measured at master — its `--read` query selects `md5(body)`, and no flag in the file produces any other digest), so a `card` fence written in sha256 is a fence your only instrument cannot read; and a 40 327-octet body overflowed the harness output cap into a spill file under `~/.claude/` that your own charter forbids you to open, so the carry could not be diffed at all. Both are the Architect's defects. Recorded as `F-S133-CARD-FENCE-IS-SHA256-BUT-THE-SCOUT-READS-MD5-1` and `F-S133-SCOUT-CANNOT-READ-A-CARD-PAST-THE-OUTPUT-CAP-1`. This card carries the repair: the digest you are asked to compare is the **md5 and the length**, and ORDER A.2 gives you a byte-proven route to the whole body that opens no forbidden file.

What is NEW beyond your sentences, and therefore the Architect's own prose to attack: (a) AMENDMENTS 26 and 27 are carried into ORDER B.6 immediately after AMENDMENT 24's rule, and three fixture tests are the Architect's rendering of them, including the longer-number falsifier; (b) AMENDMENT 28 and AMENDMENT 29 are carried into ORDER B.6b, and the ARCHITECT CLAUSE gains the phrase "narrowed POSITIVELY per AMENDMENT 28"; (c) four FALSIFIER clauses are the Architect's rendering of 26–29; (d) your two corrections-in-favour — the eighteen sibling components and the safe union export — are recorded in the PREAMBLE and NOT written into AMENDMENT 23, whose sentence keeps its own wording; rule on whether that is the right place for them. A PASS is the release; bus row only.

## PREMISE
- MEASURED: 2026-09-08T05:22:36Z — your v7 verdict row: FAIL; A.1/A.2/B.1 UNMEASURED with causes named; A.3 measured whole; B.2 KILLING on substring matching over a separator-blind normaliser; B.3 the api/ clause unguarded because oxlint declares no import rule; B.4 the union export safe and the sibling count understated; B.5 the render narrows by elimination and throws; AMENDMENTS 26–29.
- MEASURED: 2026-09-08T05:28:49Z — the v8 card inserted to AG-4 by `INSERT ... RETURNING`, its `md5(body)` and `length(body)` equal to the values in the `insert-transcript` fence and its sha256 equal to the `card` fence; both were compared to the Architect's local preflighted file and both matched.
- MEASURED: 2026-09-08T05:2xZ — `scripts/cardPreflight.ts`, the blob in the `preflight` fence, run on the v8 body in the Architect's container: GREEN, CP-1 … CP-11 all OK, after one RED for a bare branch sha in prose which was moved to a fence reference.
- MEASURED: 2026-09-08T05:3xZ over the bridge — the archive copy ORDER A.2 names carries an md5 EQUAL to the `insert-transcript` fence, so the route is known to work before you are asked to walk it.
- UNMEASURED: whether your window may read a file OUTSIDE the repository working tree — ORDER A.2 prints the refusal if not; whether three fixture forms plus the anchoring rule close every wrong-date path you found, or whether a fourth path survives; whether "narrowed POSITIVELY" in the ARCHITECT CLAUSE is enough without the render's own code being quoted.
- ON-DISAGREEMENT: if the v8 row's `md5(body)` or `length(body)` differs from the `insert-transcript` fence → STOP and report both. If AMENDMENT 26, 27, 28, 29 or any of 1–25 differs from your sentence by one character → FAIL, quote both, and name which instance you read where a sentence appears twice. If ORDER A.2's route is refused → say so and report A.2 as UNMEASURED again; do NOT open any file under `~/.claude/`, and do not strain for a workaround. A second UNMEASURED carry is a signal the Architect must change the mechanism, not a failing of yours.
- DECAYS when a `RELEASE-WEB-VALVE-1-S132-1` row naming v8 or a v9 appears, or when the branch head moves.

## CLAIMS
| claim | basis | anchor |
|---|---|---|
| the card under review, by artifact_name and sha256 | MEASURED: INSERT ... RETURNING, equal to the Architect's local file; to_lane AG-4 artifact_name CARD-WEB-VALVE-1-S132-1-v8, the only row of that name. This digest is the ARCHITECT's instrument and you are NOT asked to reproduce it | card |
| the preflight instrument, by blob | MEASURED: git rev-parse origin/master:scripts/cardPreflight.ts, equal to git hash-object of the staged copy the Architect ran | preflight |
| everything about v8's fitness beyond your own verdict | NOT-READ | this card's product |

```evidence:card
ad1a87b6f2b5b0c75887bbb603d64acabd767504ed96fa25d9507047c6bb50cf
```

```evidence:preflight
7d1ce51b105be184943d981b0f27b892f8f2338b scripts/cardPreflight.ts
```

The transcript of the insert, printed so you can compare what `mail-wait.mjs --read` prints against what the server returned at write time. This fence is a TRANSCRIPT and nothing in it is a value you compute:

```evidence:insert-transcript
body_md5=dc336c724092ec26f6c09f38d7499ae7 length=45116 octets=45315
```

## SCOPE
```scope
- read-only: bus read, git reads, file reads inside the repository, and ONE file read outside it as ORDER A.2 permits; NO repository write of any kind; NO branch; NO PR; NO dispatch
- forbidden explicitly: any file under ~/.claude/, including a harness spill file, exactly as your charter says
- output: exactly ONE from_lane row ADVERSARY-REVIEW-WEB-VALVE-1-S132-1-scout-report-v8, VERDICT line first
- verdict vocabulary: PASS · PASS-WITH-AMENDMENTS (verbatim replacement sentences) · FAIL (the killing sentence quoted, the measurement that killed it)
```

## ORDER A — VERIFY THE CARRY, BY A ROUTE THAT FITS YOUR INSTRUMENTS
1. `node scripts/mail-wait.mjs scout --read CARD-WEB-VALVE-1-S132-1-v8` is NOT what you run for the body — that card is addressed to AG-4. Read the row's header line the way you did last round and print `body_md5` and `length`; both must equal the transcript fence. That IS the digest check for this round; the sha256 in the `card` fence is the Architect's and is recorded, not re-derived by you.
2. THE BODY, WITHOUT THE SPILL FILE. The same bytes exist as a file on this machine at `/Users/tunckahveci/Desktop/2026 DESKTOP/2026 -YAPRA/2026 - Yapra - DDocuments/Claude_Duzenli_Arsiv/S133/CARD-WEB-VALVE-1-S132-1-v8.md`. It is a COPY, and a copy is not a source — so PROVE it first: `md5 -q <that path>` must equal the `body_md5` in the transcript fence. Equal means the copy is BYTE-IDENTICAL to the row and reading it is reading the row; unequal or refused means STOP for A.2, report it, and carry on with the rest. Once proven, read it in slices with `sed -n '<from>,<to>p' <path>` — one command per slice, no pipe, no chain — and diff AMENDMENTS 26–29 and 1–25 character for character.
3. The five instrument blobs, the branch head and the PR state at origin; print. Confirm the report path and bus row read v8 and the branch is unchanged.

## ORDER B — ATTACK THE RENDERING
1. THE ANCHORING RULE AS RENDERED: AMENDMENT 26 stands verbatim in ORDER B.6 and in the SCOPE mirror. Read the Architect's three fixture tests beside it. Does the longer-number test actually falsify an unanchored implementation, and is there a wrong-date path the anchoring rule still admits — a form appearing inside a URL, a version string, or another date on the same page?
2. THE FOURTH FORM: AMENDMENT 27 adds GG.AA.YYYY. Given `normalize()` folds no separator, is `07.09.2026` matchable at all after normalisation, and does the set now need a fifth form (GG/AA/YYYY, or the year-first numeric) to cover what a Turkish answer renders?
3. THE POSITIVE NARROWING: AMENDMENT 28 stands verbatim. Is "narrowed POSITIVELY per AMENDMENT 28" in the ARCHITECT CLAUSE sufficient, or must the clause quote the shape of the guard? Does the FALSIFIER clause the Architect wrote for it forbid every path back to `.join` on a bad value?
4. AMENDMENT 29's TEST: a test asserting "the module source contains no import path reaching api/" — is that test writable against the source as it exists, and what exactly does it read, the file or the built module? Name the form you accept.
5. ONE MORE: any behaviour v8's FALSIFIER still does not forbid that would let the third containment value throw in the panel, let the union drift between its declarations, or let `uncited_external` pass an answer whose date is wrong.
6. THE PLACEMENT OF YOUR CORRECTIONS: your two corrections-in-favour live in the PREAMBLE and AMENDMENT 23 keeps its "eight sibling admin components". Rule on that placement — a carried sentence stays verbatim, but a card that states a number your own measurement contradicts is a stale count inside a live artefact.

## ORDER C — THE VERDICT
1. Post ONE row: `VERDICT:` line first, then the A.1 digest lines, then A.2 with its route and whether it worked, then A.3, then B.1–B.6, then amendments as verbatim replacement sentences if any. Print `read relay_inbox at <ISO>` with the count.

## FALSIFIER
Wrong if any repository file is written; wrong if you dispatch anything; wrong if any file under `~/.claude/` is opened; wrong if a PASS is posted without B.1–B.6 each answered; wrong if an amendment is not a quotable replacement sentence; wrong if A.2's copy is read without its md5 first proven equal to the transcript fence; wrong if a sha256 is claimed for the row by any instrument you do not have.

## SHARED SURFACES
Bus: one row. Repository and CI: reads only. One file read outside the repository, permitted by ORDER A.2 and by nothing else.

## DECISION RIGHTS
None. Verdict is yours; release or v9 is the Architect's.

BODIES: ADVERSARY-REVIEW-WEB-VALVE-1-S132-1-scout-report-v7 · -v6 · -v5 · -v4 · -v3 · CARD-WEB-VALVE-1-S132-1-v8 · .claude/boot/free.md · F-S133-CARD-FENCE-IS-SHA256-BUT-THE-SCOUT-READS-MD5-1 · F-S133-SCOUT-CANNOT-READ-A-CARD-PAST-THE-OUTPUT-CAP-1 · S102-YASA-2 · S37-1 · TOTAL-45.

```deliverables
body_md5 and length equal to the transcript fence, printed
A.2 route attempted, its md5 proof printed, and the outcome named — read in slices, or UNMEASURED with the refusal
EQUAL/DIFF lines for AMENDMENTS 26–29 and 1–25, both instances named where a sentence appears twice
five instrument blobs, branch head and PR state re-measured; report path and bus row read v8
B.1–B.6 answered with what was read
VERDICT line and any replacement sentences
one bus row, no repository write, no dispatch, no file under ~/.claude/
```

TAIL ANCHOR: CARD-ADVERSARY-REVIEW-WEB-VALVE-1-S132-1-v8 ends here.
