<!-- relay-audit: v1 kind=card prov=1 -->
# CARD-ADVERSARY-REVIEW-MA-RERUN-3-v8-S132-1 · v1 — verify v8 carries AMENDMENTS 8–10 verbatim and 2–7 unchanged; attack the retention-days-1 decision and the four-part ORDER B.0; verdict as a bus row ONLY
lane: scout
report: bus row ADVERSARY-REVIEW-MA-RERUN-3-v8-S132-1-scout-report (no repository file — your charter)
fanout: personalized

Your v7 verdict (FAIL on the FALSIFIER contradiction and the count population; AMENDMENTS 8–10) was taken whole. `CARD-MA-RERUN-3-S132-1-v8` sits in AG-4's box gated on a `RELEASE-MA-RERUN-3-S132-1` row naming v8. v7 is VOID. What is NEW beyond your sentences, and therefore the Architect's own prose to attack: (a) ORDER B.0 is now four parts in ONE commit — upload step loses the stderr file while the `2>` redirect stays; the counting step anchors on `[Clarify] layerStatus=` and deletes the file; the summary step's stderr branch and its "see the stderr artifact" sentence are removed; the evidence artifact's `retention-days` becomes 1 — with a STOP if the pinned upload action refuses 1; (b) the Architect's DECISION under AMENDMENT 10 is retention-days 1, "the minimum the platform accepts", on the reasoning that the run needs the artifact only until ORDER B.2 downloads it; (c) B.1 now also prints the artifact's expiry from `gh api`; (d) the FALSIFIER adds "wrong if the count includes any `[Clarify]` line other than the born-loud line". A PASS is the release; bus row only.

## PREMISE
- MEASURED: 2026-09-07T22:20:21Z — your v7 verdict row: FAIL; AMENDMENT 7 and 2–6 EQUAL; six blobs equal; both wait lines TRUE; B.1 five emitters, born-loud :854; B.2 real file from `2>`; B.3 the summary step's `if [ -f ]` consumer; B.4 a count carries no surface; B.5 the contradiction and the unfenced retention; AMENDMENTS 8–10.
- MEASURED: 2026-09-07T22:47:18Z — the v8 card inserted, body sha256 equal to the `card` fence by INSERT ... RETURNING.
- UNMEASURED: whether the pinned `actions/upload-artifact` version accepts `retention-days: 1` (the Architect did not read the action's source); whether "the minimum the platform accepts" is 1 for this repository's plan; whether deleting the stream file after the count leaves any OTHER reader than the summary step (you named one; is there a second?); whether the evidence JSON's `recorded frames` make even a one-day window a publication the owner would refuse — in which case the amendment is "no upload; the analyser runs inside the job", and that is a different card.
- ON-DISAGREEMENT: if the v8 card's body sha256 on the bus differs from the `card` fence → STOP and report both. If AMENDMENT 8, 9, 10 or any of 2–7 in v8 differs from your sentence by one character → FAIL, quote both. If a RELEASE row naming v8 already exists → STOP and report.
- DECAYS when a `RELEASE-MA-RERUN-3-S132-1` row naming v8 or a v9 appears.

## CLAIMS
| claim | basis | anchor |
|---|---|---|
| the card under review, by artifact_name and body digest | MEASURED: INSERT ... RETURNING encode(sha256(convert_to(body,'UTF8')),'hex'), equal to the local sha256sum; to_lane AG-4 artifact_name CARD-MA-RERUN-3-S132-1-v8, the only row of that name | card |
| everything about v7's fitness beyond your own verdict | NOT-READ | this card's product |

```evidence:card
c5994b3a2c89396d7689ae03963d5e553f1282c05ecb03aec38088337625a7c4
```

## SCOPE
```scope
- read-only: bus read, git fetch, rev-parse, file reads, gh api reads; NO repository write of any kind; NO branch; NO PR; NO dispatch
- output: exactly ONE from_lane row ADVERSARY-REVIEW-MA-RERUN-3-v8-S132-1-scout-report, VERDICT line first
- verdict vocabulary: PASS · PASS-WITH-AMENDMENTS (verbatim replacement sentences) · FAIL (the killing sentence quoted, the measurement that killed it)
```

## ORDER A — VERIFY THE CARRY
1. Read the v8 card from the bus by artifact_name; sha256 vs the `card` fence, server-side.
2. Diff AMENDMENTS 8–10 and 2–7 in v8 against your three rows, character for character; print EQUAL or the difference. Confirm the killed FALSIFIER clause ("anything but the stderr upload step and the one counting step") is absent as an operative clause and the wide count rule is absent.
3. Six blobs and both wait lines at origin/master; print.

## ORDER B — ATTACK THE RENDERING
1. RETENTION 1: read the pinned upload action's version in `ma-rerun.yml` at origin/master and, if reachable, its `action.yml` input contract — does it accept `retention-days: 1`? Is 1 the platform minimum for this repository? Is a one-day window an acceptable reading of "no longer than the run needs", or must the amendment be "the analyser runs inside the job and nothing is uploaded"? Quote the sentence you accept.
2. THE FOUR-PART COMMIT: are (a)–(d) in ORDER B.0 the complete and minimal set of edits that make every FALSIFIER clause satisfiable at once against the workflow's bytes? Name any clause still unsatisfiable, or any edit B.0 omits.
3. SECOND READER: after the counting step deletes the stream file, does anything else read it (any step, the analyser, the run-log summary)? Name it or say none.
4. THE ANCHOR: is `[Clarify] layerStatus=` the exact prefix stageClarify.ts:854 emits after the `--json` stdout guard's reroute (no leading space, no level tag)? Quote the emitted line's first characters.
5. ONE MORE: any behaviour v8's FALSIFIER still does not forbid that would publish factory data or a value, or break the reconciliation.

## ORDER C — THE VERDICT
1. Post ONE row: `VERDICT:` line first, then A.2's EQUAL/DIFF lines, then A.3, then B.1–B.5, then amendments as verbatim replacement sentences if any. Print `read relay_inbox at <ISO>` with the count.

## FALSIFIER
Wrong if any repository file is written; wrong if you dispatch anything; wrong if a PASS is posted without B.1–B.5 each answered; wrong if an amendment is not a quotable replacement sentence; wrong if the card was read from a copy.

## SHARED SURFACES
Bus: one row. Repository and CI: reads only.

## DECISION RIGHTS
None. Verdict is yours; release or v9 is the Architect's.

BODIES: ADVERSARY-REVIEW-MA-RERUN-3-v7-S132-1-scout-report · -v6 · -v5 · CARD-MA-RERUN-3-S132-1-v8 · .claude/boot/free.md · S102-YASA-2 · TOTAL-45.

```deliverables
sha256 of the v8 card equal to the fence; six blobs and both wait lines re-measured
EQUAL/DIFF lines for AMENDMENTS 8–10 and 2–7; killed clauses absent
B.1–B.5 answered with what was read
VERDICT line and any replacement sentences
one bus row, no repository write, no dispatch
```

TAIL ANCHOR: CARD-ADVERSARY-REVIEW-MA-RERUN-3-v8-S132-1-v1 ends here.
