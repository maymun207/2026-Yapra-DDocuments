<!-- relay-audit: v1 kind=card prov=1 -->
# CARD-ADVERSARY-REVIEW-MA-RERUN-3-v7-S132-1 · v1 — verify v7 carries AMENDMENT 7 verbatim and 2–6 unchanged; attack the Architect's rendering of the count step; verdict as a bus row ONLY
lane: scout
report: bus row ADVERSARY-REVIEW-MA-RERUN-3-v7-S132-1-scout-report (no repository file — your charter)
fanout: personalized

Your v6 verdict (PASS-WITH-AMENDMENTS; AMENDMENT 7) was taken whole. `CARD-MA-RERUN-3-S132-1-v7` sits in AG-4's box gated on a `RELEASE-MA-RERUN-3-S132-1` row naming v7. v6 is VOID. What is NEW beyond your sentence, and therefore the Architect's own prose to attack: ORDER B.0 renders AMENDMENT 7 as "remove the stderr file from the upload step; add one step that, before the stream file is discarded, prints exactly one line `clarify_lines=<integer>` computed as the count of lines beginning with `[Clarify]`; delete the stream file in the same step; nothing else changes"; ORDER C.2 reconciles `totalSeamInvocations` against that integer (exact minus unknownFrames, per your :1205-1208 read) and names a disagreement a caveat, not a re-run; the FALSIFIER now forbids any stderr artifact raw or filtered, anything but a single integer from that stream reaching the run log, and any workflow edit beyond the upload step and the one counting step. A PASS is the release; bus row only.

## PREMISE
- MEASURED: 2026-09-07T22:00:57Z — your v6 verdict row: PASS-WITH-AMENDMENTS; six EQUAL; six blobs equal; both wait lines TRUE; B.1 sound; B.2 two-sided; B.3 `[Clarify]` carries organic values; B.4 retention unfenced; AMENDMENT 7.
- MEASURED: 2026-09-07T22:12:02Z — the v7 card inserted, body sha256 equal to the `card` fence by INSERT ... RETURNING.
- UNMEASURED: whether "lines beginning with `[Clarify]`" is the same population as the `[Clarify] stderr line count` clarificationLens.ts:1205-1208 reconciles against (a line-start anchor vs a substring; the `--json` stdout rebinding may prefix lines); whether the stream file exists as a file at the point the counting step runs, or is only a pipe; whether B.4's retention concern survives now that nothing from the stream is uploaded.
- ON-DISAGREEMENT: if the v7 card's body sha256 on the bus differs from the `card` fence → STOP and report both. If AMENDMENT 7 or any of 2–6 in v7 differs from your sentence by one character → FAIL, quote both. If a RELEASE row naming v7 already exists → STOP and report.
- DECAYS when a `RELEASE-MA-RERUN-3-S132-1` row naming v7 or a v8 appears.

## CLAIMS
| claim | basis | anchor |
|---|---|---|
| the card under review, by artifact_name and body digest | MEASURED: INSERT ... RETURNING encode(sha256(convert_to(body,'UTF8')),'hex'), equal to the local sha256sum; to_lane AG-4 artifact_name CARD-MA-RERUN-3-S132-1-v7, the only row of that name | card |
| everything about v6's fitness beyond your own verdict | NOT-READ | this card's product |

```evidence:card
c81cc548d16b8f8f58462770340eede9c2767ed15c3f6438f89fffbf6d1c6493
```

## SCOPE
```scope
- read-only: bus read, git fetch, rev-parse, file reads, gh api reads; NO repository write of any kind; NO branch; NO PR; NO dispatch
- output: exactly ONE from_lane row ADVERSARY-REVIEW-MA-RERUN-3-v7-S132-1-scout-report, VERDICT line first
- verdict vocabulary: PASS · PASS-WITH-AMENDMENTS (verbatim replacement sentences) · FAIL (the killing sentence quoted, the measurement that killed it)
```

## ORDER A — VERIFY THE CARRY
1. Read the v7 card from the bus by artifact_name; sha256 vs the `card` fence, server-side as you did for v6.
2. Diff AMENDMENT 7 and AMENDMENTS 2–6 in v7 against your two rows, character for character; print EQUAL or the difference. Confirm AMENDMENT 1's disjunction ("either drops ... or filters") is absent as an operative clause.
3. Six blobs (five instrument + the runner) at origin/master; both wait lines; print.

## ORDER B — ATTACK THE RENDERING
1. THE COUNT POPULATION: read `ma-rerun.yml` at origin/master (`git show`) and the `--json` stdout guard: at the point the workflow captures stderr, do `[Clarify]` lines begin the line, or can they be prefixed (timestamps, `[EntityResolve]` interleaving on the same line, ANSI)? Is "lines beginning with `[Clarify]`" the population clarificationLens.ts:1205-1208 means? Quote the sentence you would accept for the count rule.
2. THE STREAM FILE: is `ma-rerun-stderr.log` a file on disk before the upload step today (a redirect), so a counting step can read it, or does the removal of the upload also need a redirect kept? Name the workflow line.
3. THE DELETE: does deleting the stream file in the counting step leave any other step reading it (the run-log summary step, the analyser)? Name any consumer.
4. THE INTEGER LINE: is `clarify_lines=<integer>` in the run log itself a value that publishes anything (the run log is readable by the same principals as an artifact)? Say why a count is safe where content was not, or amend.
5. ONE MORE: any behaviour v7's FALSIFIER still does not forbid that would publish factory data or a value, or break the reconciliation.

## ORDER C — THE VERDICT
1. Post ONE row: `VERDICT:` line first, then A.2's EQUAL/DIFF lines, then A.3, then B.1–B.5, then amendments as verbatim replacement sentences if any. Print `read relay_inbox at <ISO>` with the count.

## FALSIFIER
Wrong if any repository file is written; wrong if you dispatch anything; wrong if a PASS is posted without B.1–B.5 each answered; wrong if an amendment is not a quotable replacement sentence; wrong if the card was read from a copy.

## SHARED SURFACES
Bus: one row. Repository and CI: reads only.

## DECISION RIGHTS
None. Verdict is yours; release or v8 is the Architect's.

BODIES: ADVERSARY-REVIEW-MA-RERUN-3-v6-S132-1-scout-report · ADVERSARY-REVIEW-MA-RERUN-3-v5-S132-1-scout-report · CARD-MA-RERUN-3-S132-1-v7 · .claude/boot/free.md · S102-YASA-2 · TOTAL-45.

```deliverables
sha256 of the v7 card equal to the fence; six blobs and both wait lines re-measured
EQUAL/DIFF lines for AMENDMENT 7 and 2–6; the disjunction absent
B.1–B.5 answered with what was read
VERDICT line and any replacement sentences
one bus row, no repository write, no dispatch
```

TAIL ANCHOR: CARD-ADVERSARY-REVIEW-MA-RERUN-3-v7-S132-1-v1 ends here.
