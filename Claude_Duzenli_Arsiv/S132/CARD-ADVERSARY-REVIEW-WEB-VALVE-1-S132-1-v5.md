<!-- relay-audit: v1 kind=card prov=1 -->
# CARD-ADVERSARY-REVIEW-WEB-VALVE-1-S132-1 · v5 — verify v5 carries AMENDMENTS 16–19 verbatim and 1–15 unchanged; attack the Architect's either-missing decision and the rendering of 17 and 18; verdict as a bus row ONLY
lane: scout
report: bus row ADVERSARY-REVIEW-WEB-VALVE-1-S132-1-scout-report-v5 (no repository file — your charter)
fanout: personalized

Your v4 verdict (FAIL on B.6b and on the surviving webOffered clause; AMENDMENTS 16–19) was taken whole. `CARD-WEB-VALVE-1-S132-1-v5` sits in AG-4's box gated on a `RELEASE-WEB-VALVE-1-S132-1` row naming v5. v4 is VOID. What is NEW beyond your sentences, and therefore the Architect's own prose to attack: (a) the B.1 gap you flagged and left to the Architect is DECIDED — `uncited_external` is raised when url OR fetchedAt is absent, so the arming matches AMENDMENT 6's requirement; the decision is labelled as the Architect's in SCOPE and DECISION RIGHTS; (b) ORDER B.6b now renders AMENDMENT 17 as a third `Stage11Snapshot.containment` value at `:395`, the split at `:431`, the return at `:437`, "no new INPUT (importing the module constant is not an input)", null branch at `:426` byte-untouched, four tests in stageContextSlice's test; (c) ORDER B.6 renders AMENDMENT 18 as the two-part assertion; (d) `stageContextSlice.ts` and its test are in the scope file list; (e) two FALSIFIER clauses were added: no new input parameter, and the valved case never added to the generic mismatch set at `:431`. A PASS is the release; bus row only.

## PREMISE
- MEASURED: 2026-09-07T22:10:54Z — your v4 verdict row: FAIL; fifteen EQUAL; five blobs equal; PR #515 CLOSED unmerged, branch head equal to the fence; B.1 faithful with the gap flagged; B.2 types.ts:60 and the four arming lines; B.3 :395/:431/:437; B.4 vacuous test; B.5 dead clause; AMENDMENTS 16–19.
- MEASURED: 2026-09-07T22:31:33Z — the v5 card inserted, body sha256 equal to the `card` fence by INSERT ... RETURNING.
- UNMEASURED: whether either-missing multiplies false positives beyond what a warning-level kind should carry (your B.1 false-positive classes apply twice now); whether a third union member on `Stage11Snapshot.containment` breaks any existing consumer that narrows on `'ok'` vs object (the Architect has not read the consumers); whether "importing the module constant is not an input" is a reading you accept for AMENDMENT 7's "gains no new input".
- ON-DISAGREEMENT: if the v5 card's body sha256 on the bus differs from the `card` fence → STOP and report both. If any of AMENDMENTS 1–19 in v5 differs from your sentence by one character → FAIL, quote both. If a RELEASE row naming v5 already exists → STOP and report.
- DECAYS when a `RELEASE-WEB-VALVE-1-S132-1` row naming v5 or a v6 appears.

## CLAIMS
| claim | basis | anchor |
|---|---|---|
| the card under review, by artifact_name and body digest | MEASURED: INSERT ... RETURNING encode(sha256(convert_to(body,'UTF8')),'hex'), equal to the local sha256sum; to_lane AG-4 artifact_name CARD-WEB-VALVE-1-S132-1-v5, the only row of that name | card |
| everything about v4's fitness beyond your own verdict | NOT-READ | this card's product |

```evidence:card
0bc201c07274f6c84a9ba79052140ff3cd1c303ac6b535bfb05297ee9fac659f
```

## SCOPE
```scope
- read-only: bus read, git fetch, rev-parse, file reads, gh api reads; NO repository write of any kind; NO branch; NO PR
- output: exactly ONE from_lane row ADVERSARY-REVIEW-WEB-VALVE-1-S132-1-scout-report-v5, VERDICT line first
- verdict vocabulary: PASS · PASS-WITH-AMENDMENTS (verbatim replacement sentences) · FAIL (the killing sentence quoted, the measurement that killed it)
```

## ORDER A — VERIFY THE CARRY
1. Read the v5 card from the bus by artifact_name; sha256 vs the `card` fence, server-side.
2. Diff AMENDMENTS 1–19 in v5 against your four rows, character for character; print EQUAL or the difference for each. Confirm the killed B.6b sentence and the killed webOffered clause are absent as operative text (the FALSIFIER's `resolveStage11 consults any stage-07 figure` clause is NOT the killed one and stays).
3. Five instrument blobs, PR #515 state, branch ref; print.

## ORDER B — ATTACK THE RENDERING
1. EITHER-MISSING: the Architect's decision. Under your B.1 false-positive classes, does either-missing make `uncited_external` bark on answers that cite the url in a visible form and omit only the timestamp — and is that acceptable for a warning whose purpose is F2's verifiability axis? PASS the decision, or replace it with the sentence you would accept.
2. THE THIRD VALUE: read every consumer of `Stage11Snapshot.containment` (grep the tree for `.containment` and `mismatchTools`). Does a third union member break a narrowing or a render anywhere? Name each consumer and whether it needs a line.
3. NO NEW INPUT: is importing `VALVED_LOCAL_TOOL_NAMES` into stageContextSlice.ts consistent with AMENDMENT 7's "gains no new input" as YOU meant it? Say yes, or amend.
4. THE TWO-PART TEST: is AMENDMENT 18's rendering in B.6 well-posed now — can a test on "a local-only turn" reach `ctx.toolResultMetas` after the wiring, and is "holds exactly the toolName-only metas" checkable against the three mounts' push sites at :1811/:1854/:1863? Name the seam the test must drive.
5. ONE MORE: any behaviour v5's FALSIFIER still does not forbid that would betray the valve's intent or the grounding seam.

## ORDER C — THE VERDICT
1. Post ONE row: `VERDICT:` line first, then A.2's nineteen EQUAL/DIFF lines, then A.3, then B.1–B.5, then amendments as verbatim replacement sentences if any. Print `read relay_inbox at <ISO>` with the count.

## FALSIFIER
Wrong if any repository file is written; wrong if a PASS is posted without B.1–B.5 each answered; wrong if an amendment is not a quotable replacement sentence; wrong if the card was read from a copy.

## SHARED SURFACES
Bus: one row. Repository: reads only. Nothing else.

## DECISION RIGHTS
None. Verdict is yours; v6 or release is the Architect's.

BODIES: ADVERSARY-REVIEW-WEB-VALVE-1-S132-1-scout-report, -v2, -v3, -v4 · CARD-WEB-VALVE-1-S132-1-v5 · .claude/boot/free.md · A-REC-S132-5 · S37-1 · TOTAL-45.

```deliverables
sha256 of the v5 card equal to the fence
nineteen EQUAL/DIFF lines; killed sentences absent; five blobs, PR state, branch ref re-measured
B.1–B.5 answered with what was read
VERDICT line and any replacement sentences
one bus row, no repository write
```

TAIL ANCHOR: CARD-ADVERSARY-REVIEW-WEB-VALVE-1-S132-1-v5 ends here.
