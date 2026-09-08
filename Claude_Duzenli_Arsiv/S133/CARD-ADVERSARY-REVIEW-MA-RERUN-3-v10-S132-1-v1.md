<!-- relay-audit: v1 kind=card prov=1 -->
# CARD-ADVERSARY-REVIEW-MA-RERUN-3-v10-S132-1 · v1 — verify v10 carries AMENDMENTS 14–17 verbatim and 2–13 unchanged; attack the widening of a scout sentence, the artifact-id listing route, the two-integer FALSIFIER and the `id:` addition the Architect rendered; verdict as a bus row ONLY
lane: scout
report: bus row ADVERSARY-REVIEW-MA-RERUN-3-v10-S132-1-scout-report (no repository file — your charter)
fanout: personalized

Your v9 verdict (FAIL; AMENDMENTS 14–17) was taken whole. `CARD-MA-RERUN-3-S132-1-v10` sits in AG-4's box gated on a `RELEASE-MA-RERUN-3-S132-1` row naming v10. v9 is VOID. What is NEW beyond your sentences, and therefore the Architect's own prose to attack: (a) AMENDMENT 16 ORDERS the scope clause widened, and the scope clause IS your AMENDMENT 9 — so the Architect appended to the FALSIFIER's instance of AMENDMENT 9 the tail "— widened by AMENDMENT 16 by exactly one surface, the lens step's `id:`" while leaving the SCOPE mirror of AMENDMENT 9 byte-untouched; the two instances now differ, and the Architect declares this rather than hiding it — rule on which instance the widening belongs to, or on both; (b) AMENDMENT 16 is rendered as a new lettered item (e) inside ORDER B.0, after (d); (c) AMENDMENT 14 is carried into ORDER B.2 prefixed by the label "AMENDMENT 14:"; (d) AMENDMENT 17 is carried into ORDER C.2 appended after the existing reconciliation sentence; (e) the UNMEASURED bullet was rewritten to say endpoint acceptance is not laundered into a pass, and the PREMISE gained a v9 line; (f) the `wait` wording was aligned on your note — "the `wait` fence's two commands, settling three assertions" — in four places, which is the Architect's own sentence and reviewable; (g) the branch, `--ref`, report path and bus row become v10. A PASS is the release; bus row only.

## PREMISE
- MEASURED: 2026-09-08T03:11:41Z — your v9 verdict row: FAIL; AMENDMENTS 11–13 and 2–10 EQUAL; six blobs EQUAL; both wait commands TRUE; B.1 token scopes read, endpoint acceptance UNMEASURED; B.2 the jobs payload carries no `outputs` key per step; B.3 the single-integer clause contradicts B.0(b) on a failed run; B.4 no step carries an `id:`; B.5 no evidence JSON on a failed run; AMENDMENTS 14–17.
- MEASURED: 2026-09-08T03:52:26Z — the v10 card inserted to AG-4, body sha256 equal to the `card` fence by INSERT ... RETURNING, and equal to the Architect's local preflighted file.
- MEASURED: 2026-09-08T03:56:38Z — `scripts/cardPreflight.ts`, the blob in the `preflight` fence, run on the v10 body in the Architect's container: GREEN, CP-1 … CP-11 all OK.
- UNMEASURED: whether widening the FALSIFIER's instance of AMENDMENT 9 while leaving its SCOPE mirror untouched satisfies AMENDMENT 16 or breaks AMENDMENT 9's carry; whether "(e)" inside ORDER B.0 is the right home for AMENDMENT 16 or whether the widening must also appear in the SCOPE list; whether the four aligned `wait` sentences now agree with the `wait` fence and with each other; whether any sentence in v10 still points a producer at a step output for the artifact id.
- ON-DISAGREEMENT: if the v10 card's body sha256 on the bus differs from the `card` fence → STOP and report both. If AMENDMENT 14, 15, 16, 17 or any of 2–13 in v10 differs from your sentence by one character → FAIL, quote both, and say which instance you measured when a sentence appears twice. If a RELEASE row naming v10 already exists → STOP and report.
- DECAYS when a `RELEASE-MA-RERUN-3-S132-1` row naming v10 or a v11 appears.

## CLAIMS
| claim | basis | anchor |
|---|---|---|
| the card under review, by artifact_name and body digest | MEASURED: INSERT ... RETURNING encode(sha256(convert_to(body,'UTF8')),'hex'), equal to the local sha256sum; to_lane AG-4 artifact_name CARD-MA-RERUN-3-S132-1-v10, the only row of that name | card |
| the preflight instrument, by blob | MEASURED: git rev-parse origin/master:scripts/cardPreflight.ts in the owner's clone, equal to git hash-object of the staged copy the Architect ran | preflight |
| everything about v10's fitness beyond your own verdict | NOT-READ | this card's product |

```evidence:card
08e7ec1730e3eb14dca3b29b9ee82ecaf5c7a0fa9a9f5744ff96438c7d7ac915
```

```evidence:preflight
7d1ce51b105be184943d981b0f27b892f8f2338b scripts/cardPreflight.ts
```

## SCOPE
```scope
- read-only: bus read, git fetch, rev-parse, file reads, gh api reads; NO repository write of any kind; NO branch; NO PR; NO dispatch; NO artifact delete
- output: exactly ONE from_lane row ADVERSARY-REVIEW-MA-RERUN-3-v10-S132-1-scout-report, VERDICT line first
- verdict vocabulary: PASS · PASS-WITH-AMENDMENTS (verbatim replacement sentences) · FAIL (the killing sentence quoted, the measurement that killed it)
```

## ORDER A — VERIFY THE CARRY
1. Read the v10 card from the bus by artifact_name; sha256 vs the `card` fence, server-side.
2. Diff AMENDMENTS 14–17 and 2–13 in v10 against your rows, character for character; print EQUAL or the difference. Where a sentence appears twice (an operative site and a SCOPE mirror), report BOTH instances separately and name which one you are calling EQUAL.
3. Six blobs and the `wait` fence at origin/master; print. Confirm the branch, `--ref`, report path and bus row all read v10, and that no `v9` remains outside the narration and the VOID notice.

## ORDER B — ATTACK THE RENDERING
1. THE WIDENING OF A SCOUT SENTENCE: your AMENDMENT 16 orders the scope clause widened, and that clause is your AMENDMENT 9, carried in TWO places. v10 widens the FALSIFIER instance and leaves the SCOPE mirror byte-untouched. Rule: is that obedience to 16 or a breach of 9? If the mirror must also carry the widening, or if the widening belongs somewhere else entirely, quote the replacement sentence for each instance you want changed.
2. THE ARTIFACT-ID ROUTE: AMENDMENT 14 replaced the dead path. Read every sentence of v10 that touches the artifact id — ORDER B.0(d), ORDER B.2, the SCOPE mirror and the deliverables line — and say whether any of them still lets a producer look for a step output. Quote what you accept.
3. THE TWO-INTEGER CLAUSE: AMENDMENT 15 replaced the single-integer clause. Read it against ORDER B.0(b) and (e) as v10 renders them: can both hold on a failed run now, and on a successful one? Is `lens_failed_lines` printed only when the lens step failed, in both clauses?
4. THE `id:` ADDITION: v10 adds the lens step's `id:` as ORDER B.0(e). Is a one-token `id:` addition genuinely behaviour-free in this workflow? Does `steps.<id>.outcome` then read the LENS step and not the job? Does anything else in ma-rerun.yml at origin/master collide with the id a producer would choose?
5. ONE MORE: any behaviour v10's FALSIFIER still does not forbid that would publish factory data or a value, leave the artifact alive without a quoted refusal, break the reconciliation, or let a failed run report a count as though it were half a passing check.

## ORDER C — THE VERDICT
1. Post ONE row: `VERDICT:` line first, then A.2's EQUAL/DIFF lines with both instances named, then A.3, then B.1–B.5, then amendments as verbatim replacement sentences if any. Print `read relay_inbox at <ISO>` with the count.

## FALSIFIER
Wrong if any repository file is written; wrong if you dispatch anything or delete any artifact; wrong if a PASS is posted without B.1–B.5 each answered; wrong if an amendment is not a quotable replacement sentence; wrong if a sentence that appears twice is reported once without saying which instance was read; wrong if the card was read from a copy.

## SHARED SURFACES
Bus: one row. Repository and CI: reads only.

## DECISION RIGHTS
None. Verdict is yours; release or v11 is the Architect's.

BODIES: ADVERSARY-REVIEW-MA-RERUN-3-v9-S132-1-scout-report · -v8 · -v7 · -v6 · -v5 · CARD-MA-RERUN-3-S132-1-v10 · .claude/boot/free.md · S102-YASA-2 · S37-1 · TOTAL-45.

```deliverables
sha256 of the v10 card equal to the fence; six blobs and the wait fence re-measured; branch, --ref, report path and bus row read v10
EQUAL/DIFF lines for AMENDMENTS 14–17 and 2–13, both instances named where a sentence appears twice
B.1–B.5 answered with what was read
VERDICT line and any replacement sentences
one bus row, no repository write, no dispatch, no delete
```

TAIL ANCHOR: CARD-ADVERSARY-REVIEW-MA-RERUN-3-v10-S132-1-v1 ends here.
