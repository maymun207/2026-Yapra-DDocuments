<!-- relay-audit: v1 kind=card prov=1 -->
# CARD-ADVERSARY-REVIEW-WEB-VALVE-1-S132-1 · v6 — verify v6 carries AMENDMENTS 20–22 verbatim and 1–19 unchanged; attack the Architect's render clause, the date-granularity rendering and the "exported union type" the render is told to import; verdict as a bus row ONLY
lane: scout
report: bus row ADVERSARY-REVIEW-WEB-VALVE-1-S132-1-scout-report-v6 (no repository file — your charter)
fanout: personalized

Your v5 verdict (FAIL on the scope clause; AMENDMENTS 20–22) was taken whole. `CARD-WEB-VALVE-1-S132-1-v6` sits in AG-4's box gated on a `RELEASE-WEB-VALVE-1-S132-1` row naming v6. v5 is VOID. What is NEW beyond your sentences, and therefore the Architect's own prose to attack: (a) an ARCHITECT CLAUSE from your B.5 — StageContextSection.tsx renders the third containment value under its own badge and text, distinguishable from both 'ok' and the generic mismatch, and the `as` assertion at :369 is replaced by "the exported union type so the compiler sees every member"; (b) ORDER B.6b now says "the union's two mirrors follow in the same commit" and names adminService.ts:814 and stageContext.test.ts:184 as the mirrors, with the render as a fourth site; (c) ORDER B.6's uncited_external rule carries AMENDMENT 20 verbatim and the DECISION RIGHTS sentence restates it as "fetchedAt at date granularity"; (d) the deliverables line reads "the two union mirrors updated; StageContextSection renders it under its own badge, no `as` assertion, with its test"; (e) ORDER A.3 adds the three mirror sites and groundingCheck.ts:72-79 to the whole-file reads. A PASS is the release; bus row only.

## PREMISE
- MEASURED: 2026-09-08T02:16:45Z — your v5 verdict row: FAIL; nineteen amendments EQUAL; both killed sentences absent; five instrument blobs EQUAL; PR #515 CLOSED unmerged; branch head equal to the `branch` fence; the union declared at stageContextSlice.ts:395, adminService.ts:814, stageContext.test.ts:184; the render at StageContextSection.tsx:369-377 behind an `as` assertion; AMENDMENTS 20–22.
- MEASURED: 2026-09-08T02:57:15Z — the v6 card inserted, body sha256 equal to the `card` fence by INSERT ... RETURNING.
- UNMEASURED: WHICH file exports the union the render can import — `src/components/admin/StageContextSection.tsx` is frontend code and `api/cwf/_lib/replay/stageContextSlice.ts` is API code; if the frontend does not import from `api/`, "the exported union type" must mean the mirror at adminService.ts:814 and the Architect's clause leaves the producer to guess; whether the union at :395 is exported at all today; whether "date granularity" as AMENDMENT 20 renders it survives a Turkish-prose date ("7 Eylül 2026") — the leading YYYY-MM-DD of an ISO instant does not occur in that prose either, so the warning may still bark on the majority; whether the render's "own badge and text" has a test seam (does StageContextSection have a test file today?).
- ON-DISAGREEMENT: if the v6 card's body sha256 on the bus differs from the `card` fence → STOP and report both. If AMENDMENT 20, 21, 22 or any of 1–19 in v6 differs from your sentence by one character → FAIL, quote both. If a RELEASE row naming v6 already exists → STOP and report.
- DECAYS when a `RELEASE-WEB-VALVE-1-S132-1` row naming v6 or a v7 appears.

## CLAIMS
| claim | basis | anchor |
|---|---|---|
| the card under review, by artifact_name and body digest | MEASURED: INSERT ... RETURNING encode(sha256(convert_to(body,'UTF8')),'hex'), equal to the local sha256sum; to_lane AG-4 artifact_name CARD-WEB-VALVE-1-S132-1-v6, the only row of that name | card |
| everything about v5's fitness beyond your own verdict | NOT-READ | this card's product |

```evidence:card
7c52ac91e4ecb14ed7352cda19ebabbfbb1a933021b63c89097be1bf3164a654
```

## SCOPE
```scope
- read-only: bus read, git fetch, rev-parse, file reads, gh api reads; NO repository write of any kind; NO branch; NO PR; NO dispatch
- output: exactly ONE from_lane row ADVERSARY-REVIEW-WEB-VALVE-1-S132-1-scout-report-v6, VERDICT line first
- verdict vocabulary: PASS · PASS-WITH-AMENDMENTS (verbatim replacement sentences) · FAIL (the killing sentence quoted, the measurement that killed it)
```

## ORDER A — VERIFY THE CARRY
1. Read the v6 card from the bus by artifact_name; sha256 vs the `card` fence, server-side.
2. Diff AMENDMENTS 20–22 and 1–19 in v6 against your six rows, character for character; print EQUAL or the difference. Confirm the killed scope clause survives only inside AMENDMENT 21's naming clause and the scope file list carries AMENDMENT 21's four files. Confirm no operative sentence still says stageTools.ts:1713 is where the meta is pushed.
3. Five instrument blobs, PR #515 state, branch head vs the `branch` fence, the three mount lines; print.

## ORDER B — ATTACK THE RENDERING
1. THE IMPORT SEAM: does `src/components/admin/StageContextSection.tsx` import anything from `api/`? Which module does the frontend take its stage-context types from today — adminService.ts, or a shared types file? Is the union at stageContextSlice.ts:395 exported? Name the one file whose exported union the render must import for the Architect's clause to be satisfiable without a new cross-boundary import, and quote the sentence you accept.
2. DATE GRANULARITY IN PROSE: with the normaliser at groundingCheck.ts:72-79 read whole, does the leading YYYY-MM-DD of an ISO fetchedAt occur in a Turkish-prose answer that renders the date as "7 Eylül 2026" or "bugün"? If not, does AMENDMENT 20 as you wrote it still bark on the majority, and is the cure a renderer-side date set (ISO date, Turkish long form, English long form) or arming on url alone? Quote the sentence you accept — your own sentence is reviewable here.
3. THE RENDER'S TEST: is there a test file for StageContextSection today? If not, does "with its test" in the deliverables order a new file the scope list does not name — the v4 and v5 defect class a third time? Name the file the scope must carry or say the existing test surface suffices.
4. FALSIFIER COMPLETENESS: does any clause forbid the render from collapsing the third value into the generic mismatch badge? If not, the Architect's clause is unenforced — quote the FALSIFIER sentence that enforces it.
5. ONE MORE: any behaviour v6's FALSIFIER still does not forbid that would dial a non-public host, hide a cut, mis-render a valved call, or arm a signal that barks on the majority.

## ORDER C — THE VERDICT
1. Post ONE row: `VERDICT:` line first, then A.2's EQUAL/DIFF lines, then A.3, then B.1–B.5, then amendments as verbatim replacement sentences if any. Print `read relay_inbox at <ISO>` with the count.

## FALSIFIER
Wrong if any repository file is written; wrong if you dispatch anything; wrong if a PASS is posted without B.1–B.5 each answered; wrong if an amendment is not a quotable replacement sentence; wrong if the card was read from a copy.

## SHARED SURFACES
Bus: one row. Repository and CI: reads only.

## DECISION RIGHTS
None. Verdict is yours; release or v7 is the Architect's.

BODIES: ADVERSARY-REVIEW-WEB-VALVE-1-S132-1-scout-report-v5 · -v4 · -v3 · -v2 · -scout-report · CARD-WEB-VALVE-1-S132-1-v6 · .claude/boot/free.md · S102-YASA-2 · TOTAL-45.

```deliverables
sha256 of the v6 card equal to the fence; five blobs, PR state, branch head and mount lines re-measured
EQUAL/DIFF lines for AMENDMENTS 20–22 and 1–19; killed clauses absent; the four scope files present
B.1–B.5 answered with what was read
VERDICT line and any replacement sentences
one bus row, no repository write, no dispatch
```

TAIL ANCHOR: CARD-ADVERSARY-REVIEW-WEB-VALVE-1-S132-1-v6 ends here.
