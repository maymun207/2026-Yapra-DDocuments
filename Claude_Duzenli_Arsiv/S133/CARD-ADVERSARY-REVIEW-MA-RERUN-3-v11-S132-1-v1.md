<!-- relay-audit: v1 kind=card prov=1 -->
# CARD-ADVERSARY-REVIEW-MA-RERUN-3-v11-S132-1 · v1 — verify v11 carries AMENDMENTS 18–23 verbatim and 2–17 unchanged; three divergences the Architect declares rather than hides, and the label convention itself, are the targets; verdict as a bus row ONLY
lane: scout
report: bus row ADVERSARY-REVIEW-MA-RERUN-3-v11-S132-1-scout-report (no repository file — your charter)
fanout: personalized

Your v10 verdict (FAIL; AMENDMENTS 18–23) was taken whole. `CARD-MA-RERUN-3-S132-1-v11` sits in AG-4's box gated on a `RELEASE-MA-RERUN-3-S132-1` row naming v11. v10 is VOID. THREE things the Architect declares before you measure them, because each is a place where obeying your sentence required a judgement the sentence did not make: (a) AMENDMENT 19 says "in BOTH instances of my own AMENDMENT 11" — but the phrase it replaces, "using the `artifact-id` the upload step already outputs", occurred exactly ONCE in v10, in the SCOPE mirror; ORDER B.2's instance had already been rewritten by AMENDMENT 14 in v10, so the replacement is x1 and the dead route is gone from the card entirely — rule on whether that satisfies 19; (b) AMENDMENT 21 was applied at FOUR sites (ORDER B.0(b), the SCOPE mirror of AMENDMENT 12, and both instances of AMENDMENT 15) and DELIBERATELY not at two others — the carried FALSIFIER clause "wrong if a failed lens run leaves no exit status and no FAILED-line count in the run log", which is your own sentence from the v8 round and which 21 does not name, and AMENDMENT 16's internal QUOTATION of "the lens exit status", which must stay verbatim for 16 to remain 16; rule on both; (c) AMENDMENT 20's tail now sits on the SCOPE mirror carrying the label "(AMENDMENT 20)" while the FALSIFIER's instance carries the same tail unlabelled, so the two instances are byte-identical except for that citation — the Architect judged a site label to be this card's universal convention rather than a divergence, and that judgement is yours to overturn. Also new and the Architect's own: AMENDMENT 18's sentence ends in a period, so the semicolon that used to separate item (d) from item (e) of ORDER B.0 is now that period; and one deliverables line was rewritten from "exit status" to "the lens step's `outcome` word" to stop the checklist contradicting AMENDMENT 21. A PASS is the release; bus row only.

## PREMISE
- MEASURED: 2026-09-08T04:08:20Z — your v10 verdict row: FAIL; AMENDMENTS 14–17 EQUAL at their operative sites, 2–13 untouched by a full body diff; B.1 the widening is licensed but sits on one instance of two; B.2 ORDER B.0(d) orders the dead route and a second new surface, KILLING; B.3 the two-integer clause CURED; B.4 the `id:` inert and uncollided, `steps.<id>.outcome` a status WORD; B.5 `UNPERFORMED` absent from the FALSIFIER; B.6 the four mirrors weaker than your sentences; AMENDMENTS 18–23.
- MEASURED: 2026-09-08T04:28:43Z — the v11 card inserted to AG-4, body sha256 equal to the `card` fence by INSERT ... RETURNING, and equal to the Architect's local preflighted file.
- MEASURED: 2026-09-08T04:27Z — `scripts/cardPreflight.ts`, the blob in the `preflight` fence, run on the v11 body in the Architect's container: GREEN, CP-1 … CP-11 all OK.
- UNMEASURED: whether AMENDMENT 19 is satisfied by a single replacement when its own sentence says BOTH; whether leaving your v8 FALSIFIER clause's "exit status" untouched leaves the card self-contradicting after AMENDMENT 21; whether a site label makes two instances of one sentence unequal; whether ORDER B.0 still reads as five lettered items now that (d) ends in a period.
- ON-DISAGREEMENT: if the v11 card's body sha256 on the bus differs from the `card` fence → STOP and report both. If AMENDMENT 18, 19, 20, 21, 22, 23 or any of 2–17 in v11 differs from your sentence by one character → FAIL, quote both, and say which instance you measured when a sentence appears twice. If a RELEASE row naming v11 already exists → STOP and report.
- DECAYS when a `RELEASE-MA-RERUN-3-S132-1` row naming v11 or a v12 appears.

## CLAIMS
| claim | basis | anchor |
|---|---|---|
| the card under review, by artifact_name and body digest | MEASURED: INSERT ... RETURNING encode(sha256(convert_to(body,'UTF8')),'hex'), equal to the local sha256sum; to_lane AG-4 artifact_name CARD-MA-RERUN-3-S132-1-v11, the only row of that name | card |
| the preflight instrument, by blob | MEASURED: git rev-parse origin/master:scripts/cardPreflight.ts in the owner's clone, equal to git hash-object of the staged copy the Architect ran | preflight |
| everything about v11's fitness beyond your own verdict | NOT-READ | this card's product |

```evidence:card
4a54b0d7f7e9dc0083299b55ad3f65aca59f8ec05c00cd8b7c89b150171f37c6
```

```evidence:preflight
7d1ce51b105be184943d981b0f27b892f8f2338b scripts/cardPreflight.ts
```

## SCOPE
```scope
- read-only: bus read, git fetch, rev-parse, file reads, gh api reads; NO repository write of any kind; NO branch; NO PR; NO dispatch; NO artifact delete
- output: exactly ONE from_lane row ADVERSARY-REVIEW-MA-RERUN-3-v11-S132-1-scout-report, VERDICT line first
- verdict vocabulary: PASS · PASS-WITH-AMENDMENTS (verbatim replacement sentences) · FAIL (the killing sentence quoted, the measurement that killed it)
```

## ORDER A — VERIFY THE CARRY
1. Read the v11 card from the bus by artifact_name; sha256 vs the `card` fence, server-side.
2. Diff AMENDMENTS 18–23 and 2–17 in v11 against your rows, character for character; print EQUAL or the difference. Where a sentence appears twice, report BOTH instances separately and name which one you are calling EQUAL. Confirm the four SCOPE mirrors of AMENDMENTS 14–17 now reproduce your sentences in full, and that AMENDMENT 15's mirror has your prohibiting polarity rather than a permitting one.
3. Six blobs and the `wait` fence at origin/master; print. Confirm branch, `--ref`, report path and bus row all read v11, and that no `v10` remains outside the narration and the VOID notice.

## ORDER B — ATTACK THE RENDERING
1. AMENDMENT 19 AND THE WORD "BOTH": measure how many instances of the dead-route phrase existed in v10 and how many exist in v11. If one replacement discharges 19, say so; if a second instance exists that the Architect missed, quote it.
2. THE UNTOUCHED "exit status" SITES: read the carried FALSIFIER clause from your v8 round and AMENDMENT 16's internal quotation. Does leaving them make the card contradict itself after AMENDMENT 21, and if so, which one do you replace — knowing that editing 16's quotation would stop 16 being your sentence?
3. THE LABEL: the SCOPE mirror of AMENDMENT 9 carries the widening tail plus "(AMENDMENT 20)"; the FALSIFIER carries the tail alone. Rule whether a site label makes two instances unequal in the sense B.1 of your v10 verdict demanded, and if it does, quote which instance changes.
4. ORDER B.0 AFTER AMENDMENT 18: read (a) through (e) whole. Is the item structure still unambiguous with (d) now ending in a period, and does any sentence in the card still order, permit or imply an `id:` on the UPLOAD step?
5. ONE MORE: any behaviour v11's FALSIFIER still does not forbid that would publish factory data or a value, leave the artifact alive without a quoted refusal, break the reconciliation, or let the producer read the job's status while reporting it as the lens step's.

## ORDER C — THE VERDICT
1. Post ONE row: `VERDICT:` line first, then A.2's EQUAL/DIFF lines with both instances named, then A.3, then B.1–B.5, then amendments as verbatim replacement sentences if any. Print `read relay_inbox at <ISO>` with the count.

## FALSIFIER
Wrong if any repository file is written; wrong if you dispatch anything or delete any artifact; wrong if a PASS is posted without B.1–B.5 each answered; wrong if an amendment is not a quotable replacement sentence; wrong if a sentence that appears twice is reported once without saying which instance was read; wrong if the card was read from a copy.

## SHARED SURFACES
Bus: one row. Repository and CI: reads only.

## DECISION RIGHTS
None. Verdict is yours; release or v12 is the Architect's.

BODIES: ADVERSARY-REVIEW-MA-RERUN-3-v10-S132-1-scout-report · -v9 · -v8 · -v7 · -v6 · -v5 · CARD-MA-RERUN-3-S132-1-v11 · .claude/boot/free.md · S102-YASA-2 · S37-1 · TOTAL-45.

```deliverables
sha256 of the v11 card equal to the fence; six blobs and the wait fence re-measured; branch, --ref, report path and bus row read v11
EQUAL/DIFF lines for AMENDMENTS 18–23 and 2–17, both instances named where a sentence appears twice
B.1–B.5 answered with what was read
VERDICT line and any replacement sentences
one bus row, no repository write, no dispatch, no delete
```

TAIL ANCHOR: CARD-ADVERSARY-REVIEW-MA-RERUN-3-v11-S132-1-v1 ends here.
