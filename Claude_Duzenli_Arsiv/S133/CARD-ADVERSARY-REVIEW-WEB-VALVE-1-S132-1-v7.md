<!-- relay-audit: v1 kind=card prov=1 -->
# CARD-ADVERSARY-REVIEW-WEB-VALVE-1-S132-1 · v7 — verify v7 carries AMENDMENTS 23–25 verbatim and 1–22 unchanged; attack the divergence between AMENDMENT 21's sentence and the SCOPE file list, the rendered-set tests, and the two new Architect FALSIFIER clauses; verdict as a bus row ONLY
lane: scout
report: bus row ADVERSARY-REVIEW-WEB-VALVE-1-S132-1-scout-report-v7 (no repository file — your charter)
fanout: personalized

Your v6 verdict (FAIL; AMENDMENTS 23–25) was taken whole. `CARD-WEB-VALVE-1-S132-1-v7` sits in AG-4's box gated on a `RELEASE-WEB-VALVE-1-S132-1` row naming v7. v6 is VOID. What is NEW beyond your sentences, and therefore the Architect's own prose to attack: (a) AMENDMENT 25 orders a file ADDED to the scope file list, and that list is the verbatim carrier of your AMENDMENT 21 — the Architect added the file to the SCOPE list ONLY and left AMENDMENT 21's own sentence byte-untouched, so the two now differ by one file; this is declared in the preamble rather than hidden, and you rule on it; (b) AMENDMENT 24's rule is carried in two places, the SCOPE mirror line that replaced AMENDMENT 20's and the inline rule in ORDER B.6 suffixed "(AMENDMENT 24)"; (c) the Architect turned AMENDMENT 24's "small rendered set" into THREE fixture tests in ORDER B.6 — the ISO date, the Turkish long form, the English long form — which is the Architect's own sentence and reviewable; (d) two new Architect FALSIFIER clauses, both from your B.5: no SINGLE rendered form of fetchedAt at any granularity, and no import from api/ into StageContextSection.tsx; (e) three stale pointers to AMENDMENT 20 were rewritten to AMENDMENT 24 (the SCOPE ARCHITECT DECISION line, DECISION RIGHTS, and ORDER A.3's read-whole list); (f) ORDER B.6b's test clause now names `src/components/admin/__tests__/StageContextSection.test.tsx` outright and the "if the component has none" branch is gone; (g) the report path and bus row become v7; the branch is unchanged. A PASS is the release; bus row only.

## PREMISE
- MEASURED: 2026-09-08T03:16:19Z — your v6 verdict row: FAIL; AMENDMENTS 20–22 and 1–19 EQUAL; B.1 no exported union type exists, three inline declarations, no api/ import in production frontend code; B.2 your own AMENDMENT 20 falsified by measurement of groundingCheck.ts:72-79; B.3 the component's test file exists; B.4 the FALSIFIER's completeness ENFORCED; B.5 the ISO clause forbids the wrong form and nothing guards the api/ crossing; AMENDMENTS 23–25.
- MEASURED: 2026-09-08T03:55:14Z — the v7 card inserted to AG-4, body sha256 equal to the `card` fence by INSERT ... RETURNING, and equal to the Architect's local preflighted file.
- MEASURED: 2026-09-08T03:56:38Z — `scripts/cardPreflight.ts`, the blob in the `preflight` fence, run on the v7 body in the Architect's container: GREEN, CP-1 … CP-11 all OK.
- UNMEASURED: whether adding AMENDMENT 25's file to the SCOPE list while leaving AMENDMENT 21's sentence untouched is obedience to 25 or a breach of 21; whether three named forms are the whole of the "small rendered set" or whether a fourth form a Turkish answer commonly renders is missing; whether a set-matching rule can now be satisfied by an answer that names a DIFFERENT date in one of the three forms; whether the api/-import clause is enforceable by any check a producer runs, or only by reading the diff.
- ON-DISAGREEMENT: if the v7 card's body sha256 on the bus differs from the `card` fence → STOP and report both. If AMENDMENT 23, 24, 25 or any of 1–22 in v7 differs from your sentence by one character → FAIL, quote both, and say which instance you measured when a sentence appears twice. If a RELEASE row naming v7 already exists → STOP and report.
- DECAYS when a `RELEASE-WEB-VALVE-1-S132-1` row naming v7 or a v8 appears, or when the branch head moves.

## CLAIMS
| claim | basis | anchor |
|---|---|---|
| the card under review, by artifact_name and body digest | MEASURED: INSERT ... RETURNING encode(sha256(convert_to(body,'UTF8')),'hex'), equal to the local sha256sum; to_lane AG-4 artifact_name CARD-WEB-VALVE-1-S132-1-v7, the only row of that name | card |
| the preflight instrument, by blob | MEASURED: git rev-parse origin/master:scripts/cardPreflight.ts in the owner's clone, equal to git hash-object of the staged copy the Architect ran | preflight |
| everything about v7's fitness beyond your own verdict | NOT-READ | this card's product |

```evidence:card
4030b97959443f32f2a70c073a3637a0234890890f7ff144abfeabadcf7c682b
```

```evidence:preflight
7d1ce51b105be184943d981b0f27b892f8f2338b scripts/cardPreflight.ts
```

## SCOPE
```scope
- read-only: bus read, git fetch, rev-parse, file reads, gh api reads; NO repository write of any kind; NO branch; NO PR; NO dispatch
- output: exactly ONE from_lane row ADVERSARY-REVIEW-WEB-VALVE-1-S132-1-scout-report-v7, VERDICT line first
- verdict vocabulary: PASS · PASS-WITH-AMENDMENTS (verbatim replacement sentences) · FAIL (the killing sentence quoted, the measurement that killed it)
```

## ORDER A — VERIFY THE CARRY
1. Read the v7 card from the bus by artifact_name; sha256 vs the `card` fence, server-side.
2. Diff AMENDMENTS 23–25 and 1–22 in v7 against your rows, character for character; print EQUAL or the difference. Where a sentence appears twice, report BOTH instances separately and name which one you are calling EQUAL. Confirm the killed sentence "and the `as` assertion at :369 is replaced by the exported union type so the compiler sees every member" survives nowhere.
3. The five instrument blobs, the branch head and the PR state, re-measured at origin/master; print. Confirm the report path and bus row read v7 and the branch is unchanged.

## ORDER B — ATTACK THE RENDERING
1. THE FILE LIST VERSUS AMENDMENT 21: v7 adds `src/components/admin/__tests__/StageContextSection.test.tsx` to the SCOPE file list and leaves AMENDMENT 21's own sentence byte-untouched, so the list carries one file that the sentence does not. Rule: is that obedience to 25 or a breach of 21? If AMENDMENT 21's sentence must also carry the file, quote the replacement.
2. THE RENDERED SET: v7 turns AMENDMENT 24's set into three fixture tests — ISO date, Turkish long form, English long form. Read `groundingCheck.ts:72-79` again and say whether those three, normalised, cover the forms a Turkish answer actually renders, and whether any of them can be satisfied by a WRONG date. Quote what you accept, and name any form the set is missing.
3. THE TWO NEW ARCHITECT CLAUSES: read both as v7 renders them. Does "any SINGLE rendered form at any granularity" now forbid the form your own B.5 said was still barking, without forbidding the set AMENDMENT 24 requires? Is the api/-import clause falsifiable by a producer — what does it read to prove it?
4. THE UNION EXPORT: v7 orders a NAMED union exported from `src/lib/adminService.ts` and imported by the component. Read adminService.ts around :814 and the eight sibling admin components: does an export there create a cycle, cross a lint boundary, or collide with an existing exported name? Name the export a producer should choose, or say the choice is safely theirs.
5. ONE MORE: any behaviour v7's FALSIFIER still does not forbid that would let the third containment value throw in the panel, let the union drift between its declarations, or let `uncited_external` fire on the majority of lawful turns.

## ORDER C — THE VERDICT
1. Post ONE row: `VERDICT:` line first, then A.2's EQUAL/DIFF lines with both instances named, then A.3, then B.1–B.5, then amendments as verbatim replacement sentences if any. Print `read relay_inbox at <ISO>` with the count.

## FALSIFIER
Wrong if any repository file is written; wrong if you dispatch anything; wrong if a PASS is posted without B.1–B.5 each answered; wrong if an amendment is not a quotable replacement sentence; wrong if a sentence that appears twice is reported once without saying which instance was read; wrong if the card was read from a copy.

## SHARED SURFACES
Bus: one row. Repository and CI: reads only.

## DECISION RIGHTS
None. Verdict is yours; release or v8 is the Architect's.

BODIES: ADVERSARY-REVIEW-WEB-VALVE-1-S132-1-scout-report-v6 · -v5 · -v4 · -v3 · CARD-WEB-VALVE-1-S132-1-v7 · .claude/boot/free.md · S102-YASA-2 · S37-1 · TOTAL-45.

```deliverables
sha256 of the v7 card equal to the fence; five instrument blobs, branch head and PR state re-measured; report path and bus row read v7
EQUAL/DIFF lines for AMENDMENTS 23–25 and 1–22, both instances named where a sentence appears twice
B.1–B.5 answered with what was read
VERDICT line and any replacement sentences
one bus row, no repository write, no dispatch
```

TAIL ANCHOR: CARD-ADVERSARY-REVIEW-WEB-VALVE-1-S132-1-v7 ends here.
