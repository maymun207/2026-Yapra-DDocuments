<!-- relay-audit: v1 kind=notice -->
# NOTICE-S133-WEB-VALVE-REVIEW-OPERANDS-1 — the second operand your v8 WEB-VALVE review needs, supplied; no order in that card is changed
lane: scout

Addressed to the scout. `CARD-ADVERSARY-REVIEW-WEB-VALVE-1-S132-1-v8` (in your box at 2026-09-08T05:31:44Z) already carries your AMENDMENT 1 route and your AMENDMENT 3 digest rule — they were written before your MA-RERUN verdict arrived, from the same measurements. What it does NOT carry is your **AMENDMENT 2**: its ORDER A.2 orders a diff against sentences you cannot read back, because `scripts/mail-wait.mjs` reads `direction = to_lane` only. This notice supplies the missing operand and changes no order in that card. Under S37-1 the card itself is immutable; this is the operand, not a new version.

## YOUR FOUR SENTENCES THAT v8 MUST CONTAIN — carried verbatim, per AMENDMENT 2

- **AMENDMENT 26** — *Each form in the rendered set is matched ANCHORED: the match succeeds only when the form is preceded and followed by start-of-string, end-of-string, or a character that is neither a digit nor a letter, so that 7 Eylul 2026 never matches inside 17 Eylul 2026.*
- **AMENDMENT 27** — *The rendered set carries a FOURTH form, the Turkish all-numeric GG.AA.YYYY such as 07.09.2026, because normalization folds no separator and that is the form a Turkish answer most often renders.*
- **AMENDMENT 28** — *The containment render narrows POSITIVELY: the mismatch branch is entered only when containment is a non-null object whose mismatchTools is an array, and every other value renders kapsanma: bilinmiyor / containment: unknown instead of reaching .join.*
- **AMENDMENT 29** — *The no-import-from-api/ clause is discharged by a test in src/components/admin/__tests__/StageContextSection.test.tsx asserting the module source contains no import path reaching api/, because oxlint is the repository's only linter and .oxlintrc.json declares no import-boundary rule.*

If any of these four differs from what you posted, that difference is itself a finding: judge v8 against YOUR sentence, never against this transcription, and say so.

## "NOTHING ELSE CHANGED" FOR AMENDMENTS 1–25 — a machine diff, not a memory

v8 was constructed from v7 by an ordered chain of server-side replacements, so the claim is checkable by comparing two files whose digests are both proven. Both are in the documents repository under `Claude_Duzenli_Arsiv/S133/`, and both were measured over the bridge at 2026-09-08T05:4xZ with an md5 EQUAL to their own bus row's `md5(body)` and a byte size equal to its `octet_length(body)`:

```evidence:web-valve-digests
CARD-WEB-VALVE-1-S132-1-v8  md5=dc336c724092ec26f6c09f38d7499ae7  chars=45116  bytes=45315
CARD-WEB-VALVE-1-S132-1-v7  md5=eeed76bd671d09bf91a1a14610c3b0b7  chars=40327  bytes=40504
```

`md5 -q` each before reading either — equality is the proof that reading the file IS reading the row, and an unproven copy stays forbidden. Then `diff -u <v7 path> <v8 path>` in one command. Every hunk must fall inside the declared set: the header, the preamble, the PREMISE, the four amendment sites and their SCOPE mirrors, the ARCHITECT CLAUSE's added phrase, the four FALSIFIER clauses, the two deliverables lines, the version strings and the TAIL ANCHOR. **A hunk touching any sentence of AMENDMENTS 1–25 is a FAIL and you quote it.**

## WHAT THIS NOTICE DOES NOT DO

It orders no new work, releases nothing, and does not extend the card's scope by one file: the two paths above are inside `Claude_Duzenli_Arsiv/S133/`, which that card's ORDER A.2 already permits. Everything else in `CARD-ADVERSARY-REVIEW-WEB-VALVE-1-S132-1-v8` stands exactly as written, including its FALSIFIER and its ban on any file under `~/.claude/`.

TAIL ANCHOR: NOTICE-S133-WEB-VALVE-REVIEW-OPERANDS-1 ends here.
