<!-- relay-audit: v1 kind=card prov=1 -->
# CARD-ADVERSARY-REVIEW-MA-RERUN-3-v6-S132-1 · v1 — verify v6 carries your six amendments verbatim and attack the branch-ref dispatch; verdict as a bus row ONLY
lane: scout
report: bus row ADVERSARY-REVIEW-MA-RERUN-3-v6-S132-1-scout-report (no repository file — your charter)
fanout: personalized

Your v5 verdict (FAIL on the stderr-artifact sentence; AMENDMENTS 1–6) was taken whole. `CARD-MA-RERUN-3-S132-1-v6` sits in AG-4's box gated on a `RELEASE-MA-RERUN-3-S132-1` row naming v6. v6 edits the workflow on its own branch (drop or filter the stderr upload) and dispatches at the BRANCH ref, relying on the runner's presence on master to make the trigger resolvable while the branch's file is what runs — that reliance is the new sentence to attack. v5 is VOID. Bus row only.

## PREMISE
- MEASURED: 2026-09-07T12:21:37Z — your v5 verdict row: FAIL; B.1–B.6; AMENDMENTS 1–6; both wait lines already true; blob on master equal to v4's; token scopes repo+workflow.
- MEASURED: 2026-09-07T12:04:52Z — AG-5: PR 514 landed, runner in the registry.
- UNMEASURED: whether GitHub runs the workflow file from the dispatched ref (branch) once the workflow is registered from master — the card asserts it and orders a STOP if refused; whether dropping the stderr upload loses the seam-count cross-check the analyser needs, or whether the filtered three-prefix file suffices.
- ON-DISAGREEMENT: if the v6 card's body sha256 on the bus differs from the `card` fence → STOP and report both. If any of AMENDMENTS 1–6 in v6 differs from your sentence by one character → FAIL, quote both. If a RELEASE row naming v6 already exists → STOP and report.
- DECAYS when a `RELEASE-MA-RERUN-3-S132-1` row naming v6 or a v7 appears.

## CLAIMS
| claim | basis | anchor |
|---|---|---|
| the card under review, by artifact_name and body digest | MEASURED: INSERT ... RETURNING encode(sha256(convert_to(body,'UTF8')),'hex'), equal to the local sha256sum; to_lane AG-4 artifact_name CARD-MA-RERUN-3-S132-1-v6, the only row of that name | card |
| everything about v5's fitness | NOT-READ | this card's product |

```evidence:card
44be3e74e61cf5955b32ffa5dcaa96322f029b13ae87476e5c2af98031558028
```

## SCOPE
```scope
- read-only: bus read, git fetch, rev-parse, file reads, gh api reads; NO repository write; NO branch; NO PR; NO workflow dispatch by you
- output: exactly ONE from_lane row ADVERSARY-REVIEW-MA-RERUN-3-v6-S132-1-scout-report, VERDICT line first
- verdict vocabulary: PASS · PASS-WITH-AMENDMENTS (verbatim replacement sentences) · FAIL (killing sentence quoted, the measurement that killed it)
```

## ORDER A — VERIFY THE CARRY
1. Read the v6 card from the bus by artifact_name; sha256 vs the `card` fence.
2. Diff AMENDMENTS 1–6 in v6 against your v5 row, character for character; print EQUAL or the difference. Confirm "no workflow change" and "nothing printed that could carry a value" are absent.
3. Five instrument blobs and the runner blob vs their fences; print.

## ORDER B — ATTACK
1. BRANCH-REF DISPATCH: from the installed `gh` source or GitHub's own workflow-dispatch contract as recorded in the repository (any prior run dispatched at a non-default ref in `gh run list --workflow` history counts as evidence), does `--ref <branch>` execute the BRANCH's workflow file once the workflow is registered from master? Print what you measured; if you cannot measure it, say so — the card's STOP clause then carries it.
2. FILTER SUFFICIENCY: read `analyseClarificationRun.ts` — does its seam-count cross-check need `[Clarify]` stderr lines, or is the count in the evidence JSON? If in the JSON, propose the sentence that drops the stderr upload outright.
3. PREFIX LEAK: can a `[Clarify]`, `[ClarificationLens]` or `[Fence]` line itself carry an entity surface or a value? Read the emitting lines. If yes, name the prefix to drop.
4. ONE MORE: any behaviour v6's FALSIFIER still does not forbid that would publish factory data or a value.

## ORDER C — THE VERDICT
1. Post ONE row: `VERDICT:` line first, then A.2's six EQUAL/DIFF lines, then B.1–B.4, then amendments as verbatim replacement sentences. Print `read relay_inbox at <ISO>` with the count.

## FALSIFIER
Wrong if any repository file is written; wrong if you dispatch anything; wrong if a PASS is posted without B.1–B.4 each answered; wrong if an amendment is not a quotable replacement sentence.

## SHARED SURFACES
Bus: one row. Repository and CI: reads only.

## DECISION RIGHTS
None. Verdict is yours; release or v6 is the Architect's.

BODIES: ADVERSARY-REVIEW-MA-RERUN-3-v5-S132-1-scout-report · CARD-MA-RERUN-3-S132-1-v6 · MA-RERUN-3-S132-1-AG4-report-v4 · OWNER-APPROVAL-S132-LAND-MA-RERUN-RUNNER-1 · ADR-002 · S102-YASA-2 · .claude/boot/free.md · TOTAL-45.

```deliverables
sha256 of the v5 card equal to the fence; five blobs re-measured
B.1–B.6 answered with what was read
VERDICT line and any replacement sentences
one bus row, no repository write, no dispatch
```

TAIL ANCHOR: CARD-ADVERSARY-REVIEW-MA-RERUN-3-v6-S132-1-v1 ends here.
