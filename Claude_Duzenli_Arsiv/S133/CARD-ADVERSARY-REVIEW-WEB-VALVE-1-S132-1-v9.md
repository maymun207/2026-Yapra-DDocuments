<!-- relay-audit: v1 kind=card prov=1 -->
# CARD-ADVERSARY-REVIEW-WEB-VALVE-1-S132-1 · v9 — verify v9 carries AMENDMENTS 30–34 verbatim and 1–29 unchanged; your own five sentences are carried below so the diff has its second operand, and "nothing else changed" is a machine diff of two digest-proven files
lane: scout
report: bus row ADVERSARY-REVIEW-WEB-VALVE-1-S132-1-scout-report-v9 (no repository file — your charter)
fanout: personalized

Your v8 verdict — the first PASS on this line — was taken whole, all five amendments and both named-but-unamended findings. `CARD-WEB-VALVE-1-S132-1-v9` sits in AG-4's box gated on a `RELEASE-WEB-VALVE-1-S132-1` row naming v9. v8 is VOID.

**WHAT CHANGED IN HOW YOU ARE ASKED TO WORK.** Your AMENDMENT 2 from the MA-RERUN line is applied here too: your five new sentences are CARRIED verbatim below, because `scripts/mail-wait.mjs` reads `direction = to_lane` only and you cannot read back a row you wrote. And AMENDMENTS 1–29 are no longer checked from memory: v9 was built from v8 by an ordered chain of server-side replacements, so "nothing else changed" is a property of construction and ORDER A.3 orders it verified by `diff -u` over two files whose digests are both proven. Both operands exist and neither is a memory.

**ONE THING YOU DID THAT THE ARCHITECT WANTS ON THE RECORD.** AMENDMENT 34 amends AMENDMENT 23 — your own earlier sentence — from "eight" to "eighteen". That is the right instrument and it resolves the question v8's B.6 asked: a carried sentence is immutable against the ARCHITECT's hand, and a reviewer may amend its own. v9 applies it at BOTH instances of AMENDMENT 23.

What is NEW beyond your sentences, and therefore the Architect's own prose to attack: (a) AMENDMENTS 30 and 31 are carried into ORDER B.6 after AMENDMENT 27, with two added fixture tests — one per numeric form and one url-only falsifier; (b) AMENDMENTS 32 and 33 are carried into ORDER B.6b ahead of the existing tests; (c) four FALSIFIER clauses render 30–33; (d) your B.1 path two — the whole-answer scope path you NAMED and chose not to amend — is carried in the SCOPE list as `NAMED, NOT AMENDED` rather than silently dropped; rule on whether that is the right home for it. A PASS is the release; bus row only.

## PREMISE
- MEASURED: 2026-09-08T05:44:55Z — your v8 verdict row: PASS-WITH-AMENDMENTS; the repaired route worked and was proven before it was walked; AMENDMENTS 26–29 EQUAL at all EIGHT instances; five instrument blobs, origin/master, the branch head and PR #515 all EQUAL to their fences; B.1 two surviving paths, one amended and one named; B.2 the numeric form is matchable and the set barks on lawful Turkish forms; B.3 sufficient, no amendment; B.4 the test must read source text; B.5 union drift beyond the third member; B.6 the placement right and the constraint dissolved; AMENDMENTS 30–34.
- MEASURED: 2026-09-08T05:5xZ — the v9 card inserted to AG-4 by `INSERT ... RETURNING`; its `md5(body)`, `length(body)` and `octet_length(body)` equal the `digests` transcript and equal the Architect's local preflighted file, and the archive copy's md5 was measured EQUAL over the bridge before this card was written.
- MEASURED: 2026-09-08T05:5xZ — `scripts/cardPreflight.ts`, the blob in the `preflight` fence, run on the v9 body in the Architect's container: GREEN, CP-1 … CP-11 all OK.
- UNMEASURED: whether the five sentences under CARRIED SENTENCES are byte-identical to the ones you posted — the Architect transcribed them from your verdict row, and a transcription is not a proof. If any differs, that difference is itself a finding.
- ON-DISAGREEMENT: if the row's `body_md5` or `length` differs from the `digests` transcript → STOP and report both. If either archive file's md5 differs from its row's → STOP for that file, name it, and do not read it. If a carried sentence differs from what you wrote → report the difference and judge v9 against YOUR sentence, never against the Architect's transcription of it.
- DECAYS when a `RELEASE-WEB-VALVE-1-S132-1` row naming v9 appears, when a v10 appears, or when the branch head moves.

## CLAIMS
| claim | basis | anchor |
|---|---|---|
| the preflight instrument, by blob | MEASURED: git rev-parse origin/master:scripts/cardPreflight.ts, equal to git hash-object of the staged copy the Architect ran | preflight |
| everything about v9's fitness | NOT-READ | this card's product |

```evidence:preflight
7d1ce51b105be184943d981b0f27b892f8f2338b scripts/cardPreflight.ts
```

A TRANSCRIPT of what the server and the disk each reported. Nothing here is a value you compute; you compare against it.

```evidence:digests
CARD-WEB-VALVE-1-S132-1-v9  md5=12b8c5e17d680e3fe6436ba3d93ccf57  chars=50709  bytes=50920
CARD-WEB-VALVE-1-S132-1-v8  md5=dc336c724092ec26f6c09f38d7499ae7  chars=45116  bytes=45315
```

## CARRIED SENTENCES — AMENDMENT 2 APPLIED

Your five sentences that v9 must contain, reproduced here so ORDER A.2's diff has a second operand without you reading back a row `mail-wait.mjs` cannot return:

- **AMENDMENT 30** — *A rendered form of fetchedAt does not satisfy the date requirement when its only occurrence lies inside a cited url, because one token must not discharge both the url requirement and the date requirement; the date must occur at least once outside every url present in the answer.*
- **AMENDMENT 31** — *The rendered set carries the Turkish all-numeric date with and without leading zeros and with either separator — 07.09.2026, 7.9.2026, 07/09/2026 and 7/9/2026 — because a set omitting them raises uncited_external on a correctly cited answer, and a signal that fires on lawful turns teaches its reader to ignore it.*
- **AMENDMENT 32** — *The no-import-from-api/ test reads the SOURCE TEXT of src/components/admin/StageContextSection.tsx from disk and asserts that no import specifier in it resolves into api/, because `import type` is erased at emit and a check against the built module or the runtime import graph would pass the very crossing the clause forbids.*
- **AMENDMENT 33** — *A test asserts that the member set of the containment union declared at api/cwf/_lib/replay/stageContextSlice.ts and the member set of the union exported from src/lib/adminService.ts are EQUAL, not merely that both carry the third member, because the two sides cannot import from one another and nothing else would catch a fourth member added on one side alone.*
- **AMENDMENT 34** — *AMENDMENT 23's clause reads "as the eighteen sibling admin components already import their types from that module", replacing "eight" — amended by its own author, on its own author's measurement of eighteen non-test admin components importing types from lib/adminService today.*

## SCOPE
```scope
- read-only: bus read, git reads, file reads inside the repository, and file reads under Claude_Duzenli_Arsiv/S133/ as ORDER A.2 permits; NO repository write; NO branch; NO PR; NO dispatch
- forbidden explicitly: any file under ~/.claude/, including a harness spill file — for a scout, opening one is not a risk of disclosure, it IS the disclosure
- output: exactly ONE from_lane row ADVERSARY-REVIEW-WEB-VALVE-1-S132-1-scout-report-v9, VERDICT line first
- verdict vocabulary: PASS · PASS-WITH-AMENDMENTS (verbatim replacement sentences) · FAIL (the killing sentence quoted, the measurement that killed it)
```

## ORDER A — THE CARRY
1. Confirm the row's `body_md5` as reported by `scripts/mail-wait.mjs` together with its `[DIGEST-OK]` line, and its length; both must equal the `digests` transcript. No sha256 is asked of you anywhere in this card.
2. The two files are `Claude_Duzenli_Arsiv/S133/CARD-WEB-VALVE-1-S132-1-v9.md` and `…-v8.md` in the documents repository. `md5 -q` each; each must equal its line in the `digests` transcript. Equal means reading that file IS reading the bus row. Then read v9 in slices — `sed -n '<from>,<to>p' <path>`, one command per slice — and diff the five carried sentences character for character against what v9 contains, naming BOTH instances where a sentence appears twice, and confirming AMENDMENT 34 was applied at both instances of AMENDMENT 23.
3. "NOTHING ELSE CHANGED" for AMENDMENTS 1–29, as a machine comparison: `diff -u <v8 path> <v9 path>` in one command. Every hunk must fall inside the declared set — the header, the preamble, the PREMISE, the five amendment sites, their SCOPE mirrors, the `NAMED, NOT AMENDED` line, the four FALSIFIER clauses, the two deliverables lines, the version strings and the TAIL ANCHOR. A hunk touching any sentence of AMENDMENTS 1–29 other than AMENDMENT 23's amended clause is a FAIL and you quote it.
4. Five instrument blobs, origin/master, the branch head and the PR state; print. Confirm the report path and bus row read v9.

## ORDER B — ATTACK THE RENDERING
1. AMENDMENT 30 AS RENDERED: read the Architect's url-only fixture test. Does it falsify an implementation that forgot the outside-every-url rule, and does "outside every url present in the answer" have an implementable meaning against a normalised string in which urls are not delimited?
2. AMENDMENT 31's FOUR FORMS AND THE TEST BESIDE THEM: the Architect ordered one fixture per numeric form. With four numeric forms plus the ISO and both long forms, is the set now large enough that a WRONG date in some other form still passes, and does the anchoring rule hold for the slash forms whose neighbours are themselves separators?
3. AMENDMENT 33's TEST: the two unions cannot import from one another, so what does the test actually read to compare two member sets, and is that readable without a build step? Name the form you accept.
4. AMENDMENT 34 APPLIED: v9 changes a sentence of yours at both instances. Confirm it changed ONLY the numeral, and rule on whether the preamble's account of why it changed is accurate.
5. YOUR NAMED-NOT-AMENDED FINDING: it now lives in the SCOPE list. Is that its right home, and does its presence there without a FALSIFIER clause weaken any clause that is there?
6. ONE MORE: any behaviour v9's FALSIFIER still does not forbid that would let the third containment value throw, let the union drift, or let `uncited_external` pass an answer whose date is wrong or bark on one whose date is right.

## ORDER C — THE VERDICT
1. Post ONE row: `VERDICT:` first, then A.1's digest lines, then A.2 with its md5 proofs, then A.3's diff result hunk by hunk, then A.4, then B.1–B.6, then amendments as verbatim replacement sentences if any. Print `read relay_inbox at <ISO>` with the count.

## FALSIFIER
Wrong if any repository file is written; wrong if you dispatch anything; wrong if any file under `~/.claude/` is opened; wrong if a file is read whose md5 was not first measured EQUAL to the `digests` transcript; wrong if a PASS is posted without A.1–A.4 and B.1–B.6 each answered; wrong if a sha256 is claimed by any instrument you do not have; wrong if a carried sentence is judged against the Architect's transcription rather than against what you wrote.

## SHARED SURFACES
Bus: one row. Repository and CI: reads only. The documents repository: two file reads, digest-proven, no write.

## DECISION RIGHTS
None. Verdict is yours; release or v10 is the Architect's.

BODIES: ADVERSARY-REVIEW-WEB-VALVE-1-S132-1-scout-report-v8 · -v7 · -v6 · CARD-WEB-VALVE-1-S132-1-v9 · -v8 · NOTICE-S133-WEB-VALVE-REVIEW-OPERANDS-1 · .claude/boot/free.md · F-S133-SCOUT-CANNOT-READ-BACK-ITS-OWN-ROWS-1 · S102-YASA-2 · S37-1 · TOTAL-45.

```deliverables
body_md5 and length equal to the digests transcript, with the [DIGEST-OK] line printed
both archive files md5-proven before either is read
EQUAL/DIFF lines for the five carried sentences, both instances named where one appears twice, and AMENDMENT 34 confirmed applied at both instances of AMENDMENT 23
diff -u v8 v9 printed and every hunk classified inside or outside the declared set
five blobs, origin/master, branch head and PR state re-measured; report path and bus row read v9
B.1–B.6 answered with what was read
VERDICT line and any replacement sentences
one bus row, no repository write, no dispatch, no file under ~/.claude/
```

TAIL ANCHOR: CARD-ADVERSARY-REVIEW-WEB-VALVE-1-S132-1-v9 ends here.
