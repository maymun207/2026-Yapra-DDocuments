<!-- relay-audit: v1 kind=card prov=1 -->
# CARD-ADVERSARY-REVIEW-MA-RERUN-3-v9-S132-1 · v1 — verify v9 carries AMENDMENTS 11–13 verbatim and 2–10 unchanged; attack the delete path, the failed-run counting step and the artifact-id plumbing the Architect rendered; verdict as a bus row ONLY
lane: scout
report: bus row ADVERSARY-REVIEW-MA-RERUN-3-v9-S132-1-scout-report (no repository file — your charter)
fanout: personalized

Your v8 verdict (PASS-WITH-AMENDMENTS; AMENDMENTS 11–13) was taken whole. `CARD-MA-RERUN-3-S132-1-v9` sits in AG-4's box gated on a `RELEASE-MA-RERUN-3-S132-1` row naming v9. v8 is VOID. What is NEW beyond your sentences, and therefore the Architect's own prose to attack: (a) ORDER B.0(b) folds AMENDMENT 12 into the ONE counting step — `if: always()`, the born-loud count, and on a failed lens step the exit status plus a second labelled integer `lens_failed_lines=<integer>`, then the stream file is deleted in that same step; (b) ORDER B.0(d) orders the upload step to "expose" its `artifact-id` output, and ORDER B.2 tells the producer to read that id "from the run's job outputs or `gh api .../runs/<id>/artifacts`" and to delete with `gh api -X DELETE repos/maymun207/cwf_yaprak/actions/artifacts/<artifact-id>`; (c) on a refused delete B.2 says the analysis still proceeds on the downloaded file and the report names the artifact as NOT deleted; (d) the FALSIFIER gains four clauses — artifact still existing after analysis when the delete was not refused; a failed lens run leaving no exit status and no FAILED-line count; any line's CONTENT reaching the run log; the upload step's name or comment still asserting a stderr upload; (e) the branch and `--ref` become `phase/ma-rerun-3-s132-1-v9`. A PASS is the release; bus row only.

## PREMISE
- MEASURED: 2026-09-08T02:20:55Z — your v8 verdict row: PASS-WITH-AMENDMENTS; AMENDMENTS 8–10 and 2–7 EQUAL; six blobs equal; both wait lines TRUE; B.1 the pinned action's own action.yml says "Minimum 1 day" and outputs `artifact-id`; B.2 three omitted edits inside the permitted surface; B.3 no second reader; B.4 the anchor exact; B.5 the failed-run diagnosis discarded; AMENDMENTS 11–13.
- MEASURED: 2026-09-08T02:40:53Z — the v9 card inserted, body sha256 equal to the `card` fence by INSERT ... RETURNING.
- UNMEASURED: whether the lane credential in CI or the producer's `gh` token carries `actions: write`, which the artifact DELETE endpoint requires — the card orders a STOP and a quoted refusal, but a refusal is a measurement only if the endpoint is actually reached; whether a step's `artifact-id` OUTPUT is readable from outside the job at all (step outputs are not job outputs unless the job declares them), so whether B.2's "job outputs" reading is a dead path and the `.../runs/<id>/artifacts` listing is the only live one; whether two labelled integers plus an exit status in one step still satisfy the older FALSIFIER clause "anything but a single integer from that stream reaches the run log" as v9 renders it, or whether the two clauses now contradict; whether deleting the stream file in the same `if: always()` step is ordered BEFORE or AFTER the failed-run prints in the rendered text.
- ON-DISAGREEMENT: if the v9 card's body sha256 on the bus differs from the `card` fence → STOP and report both. If AMENDMENT 11, 12, 13 or any of 2–10 in v9 differs from your sentence by one character → FAIL, quote both. If a RELEASE row naming v9 already exists → STOP and report.
- DECAYS when a `RELEASE-MA-RERUN-3-S132-1` row naming v9 or a v10 appears.

## CLAIMS
| claim | basis | anchor |
|---|---|---|
| the card under review, by artifact_name and body digest | MEASURED: INSERT ... RETURNING encode(sha256(convert_to(body,'UTF8')),'hex'), equal to the local sha256sum; to_lane AG-4 artifact_name CARD-MA-RERUN-3-S132-1-v9, the only row of that name | card |
| everything about v8's fitness beyond your own verdict | NOT-READ | this card's product |

```evidence:card
805244b5597c11aa121d81a82c37b8adb988540d1e29628527bb417cacea3692
```

## SCOPE
```scope
- read-only: bus read, git fetch, rev-parse, file reads, gh api reads; NO repository write of any kind; NO branch; NO PR; NO dispatch; NO artifact delete
- output: exactly ONE from_lane row ADVERSARY-REVIEW-MA-RERUN-3-v9-S132-1-scout-report, VERDICT line first
- verdict vocabulary: PASS · PASS-WITH-AMENDMENTS (verbatim replacement sentences) · FAIL (the killing sentence quoted, the measurement that killed it)
```

## ORDER A — VERIFY THE CARRY
1. Read the v9 card from the bus by artifact_name; sha256 vs the `card` fence, server-side.
2. Diff AMENDMENTS 11–13 and 2–10 in v9 against your four rows, character for character; print EQUAL or the difference. Confirm no operative sentence still names retention alone as the tightest lever, and that "Upload evidence and stderr" survives only inside AMENDMENT 13's naming clause.
3. Six blobs and both wait lines at origin/master; print. Confirm the branch name and `--ref` in ORDER B.0 and B.1 both read `phase/ma-rerun-3-s132-1-v9` and no `v8` remains outside the narration of what v8 was.

## ORDER B — ATTACK THE RENDERING
1. THE DELETE PATH: read the REST contract for deleting an artifact from GitHub's own reference or the `gh` source you can reach — which token permission does it require, and does the workflow's `permissions:` block or the producer's token plausibly carry it? Is `gh api -X DELETE repos/maymun207/cwf_yaprak/actions/artifacts/<artifact-id>` the correct route, byte for byte? Quote what you read.
2. THE ID PLUMBING: B.0(d) says "expose the upload step's `artifact-id` output" and B.2 says read it "from the run's job outputs or `gh api .../runs/<id>/artifacts`". Is a step output visible to `gh` after the run without a job-level `outputs:` declaration? If not, is the first reading a dead path the producer will waste a STOP on, and should the sentence name the artifacts listing as the ONLY route? Quote the sentence you accept.
3. THE SINGLE-INTEGER CLAUSE: the FALSIFIER still carries "wrong if anything but a single integer from that stream reaches the run log" and now also orders, on failure, an exit status and `lens_failed_lines=<integer>`. Read both clauses as v9 renders them: do they contradict on a failed run? If yes, this is the v7 defect class returning — quote the replacement sentence.
4. ORDER OF OPERATIONS IN THE COUNTING STEP: as B.0(b) is written, is the stream file deleted only AFTER both counts and the exit status are printed, on both the success and the failure path? Is the lens step's exit status still obtainable inside a later `if: always()` step (via `steps.<id>.outcome` or an explicit id)? Name what the producer must add if the rendering leaves it ambiguous.
5. ONE MORE: any behaviour v9's FALSIFIER still does not forbid that would publish factory data or a value, leave the artifact alive without a quoted refusal, or break the reconciliation.

## ORDER C — THE VERDICT
1. Post ONE row: `VERDICT:` line first, then A.2's EQUAL/DIFF lines, then A.3, then B.1–B.5, then amendments as verbatim replacement sentences if any. Print `read relay_inbox at <ISO>` with the count.

## FALSIFIER
Wrong if any repository file is written; wrong if you dispatch anything or delete any artifact; wrong if a PASS is posted without B.1–B.5 each answered; wrong if an amendment is not a quotable replacement sentence; wrong if the card was read from a copy.

## SHARED SURFACES
Bus: one row. Repository and CI: reads only.

## DECISION RIGHTS
None. Verdict is yours; release or v10 is the Architect's.

BODIES: ADVERSARY-REVIEW-MA-RERUN-3-v8-S132-1-scout-report · -v7 · -v6 · -v5 · CARD-MA-RERUN-3-S132-1-v9 · .claude/boot/free.md · S102-YASA-2 · TOTAL-45.

```deliverables
sha256 of the v9 card equal to the fence; six blobs and both wait lines re-measured; branch and --ref read v9
EQUAL/DIFF lines for AMENDMENTS 11–13 and 2–10
B.1–B.5 answered with what was read
VERDICT line and any replacement sentences
one bus row, no repository write, no dispatch, no delete
```

TAIL ANCHOR: CARD-ADVERSARY-REVIEW-MA-RERUN-3-v9-S132-1-v1 ends here.
