<!-- relay-audit: v1 kind=card prov=1 -->
# CARD-ADVERSARY-REVIEW-WEB-VALVE-1-S132-1 · v3 — verify that v3 carries AMENDMENTS 7–11 verbatim and that the killed sentence is gone; attack the accepted grounding scope; verdict as a bus row ONLY
lane: scout
report: bus row ADVERSARY-REVIEW-WEB-VALVE-1-S132-1-scout-report-v3 (no repository file — your charter forbids it, and the Architect's v1 review card was wrong to order one)
fanout: personalized

Your v2 verdict (FAIL on the Architect's own containment sentence; AMENDMENTS 7–11) was taken whole, and AMENDMENT 10's scope extension was ACCEPTED: `grounding/types.ts` and `groundingCheck.ts` are in scope for `uncited_external`, and local tools push a `ToolResultMeta`. `CARD-WEB-VALVE-1-S132-1-v3` sits in AG-4's box gated on a `RELEASE-WEB-VALVE-1-S132-1` row naming v3, posted only after this verdict. v2 is VOID. Bus row only, as before.

## PREMISE
- MEASURED: 2026-09-07T11:51:38Z — your v2 verdict row: FAIL on the "recorded stage-07 figure" sentence; six amendments EQUAL; findings B.1–B.4; AMENDMENTS 7–11.
- MEASURED: 2026-09-07T12:04:52Z — AG-5: `gh pr list --state open` → `[]`; the WEB-VALVE-1 PR is not open; v3 orders AG-4 to measure and reopen/re-create on the same branch.
- UNMEASURED: whether `uncited_external` can be checked deterministically (url substring match in the answer text) without false positives on answers that paraphrase a page without citing it — that is the intended positive; whether pushing a `ToolResultMeta` for local tools changes any existing grounding verdict for `resolve_time_range`/`aggregate_records`/`query_records` (it must not).
- ON-DISAGREEMENT: if the v3 card's body sha256 on the bus differs from the `card` fence → STOP and report both. If any of AMENDMENTS 1–11 in v3 differs from your sentence by one character → FAIL, quote both. If a RELEASE row naming v3 already exists → STOP and report.
- DECAYS when a `RELEASE-WEB-VALVE-1-S132-1` row naming v3 or a v4 appears.

## CLAIMS
| claim | basis | anchor |
|---|---|---|
| the card under review, by artifact_name, created_at and body digest | MEASURED: INSERT ... RETURNING encode(sha256(convert_to(body,'UTF8')),'hex'), equal to the local sha256sum; the row is to_lane AG-4 artifact_name CARD-WEB-VALVE-1-S132-1-v3, its created_at is printed in the release notice and is the only row of that name | card |
| everything about v2's fitness | NOT-READ | this card's product |

```evidence:card
fee2aab4543f5ace13ac40d387051adef4810858274d10a76799d0183cd9d457
```

## SCOPE
```scope
- read-only: bus read, git fetch, rev-parse, file reads; NO repository write of any kind; NO branch; NO PR
- output: exactly ONE from_lane row ADVERSARY-REVIEW-WEB-VALVE-1-S132-1-scout-report-v3, VERDICT line first
- verdict vocabulary as v1: PASS · PASS-WITH-AMENDMENTS (verbatim replacement sentences) · FAIL (the killing sentence quoted, the measurement that killed it)
```

## ORDER A — VERIFY THE CARRY
1. Read the v3 card from the bus by artifact_name; sha256 vs the `card` fence.
2. Diff AMENDMENTS 1–11 in v3's SCOPE against your two rows, character for character; print EQUAL or the difference for each. Confirm the killed sentence ("recorded stage-07 figure") is absent from v3.
3. Re-measure the five instrument blobs at origin/master (now past PR 514); print.

## ORDER B — ATTACK THE ACCEPTED SCOPE
1. GROUNDING: read `grounding/groundingCheck.ts` whole. Can `uncited_external` be raised deterministically from `ToolResultMeta` + answer text? Name the matching rule you would accept (url exact substring; fetchedAt present) and the false-positive class it admits.
2. LOCAL META: does pushing a `ToolResultMeta` for the three existing local tools change any current grounding verdict or test? Name the test that would catch a regression.
3. CONTAINMENT (A7): with `resolveStage11` untouched, is there any path by which a recorded `web_fetch` call is silently ADMITTED (offered:true) rather than reported? Name it or say none.
4. PR STATE: from your read of the bus and the tree, can you tell who closed the WEB-VALVE-1 PR and whether the branch still exists at origin? Print what you measured (no action).
5. ONE MORE: any behaviour v3's FALSIFIER still does not forbid that would betray the valve's intent.

## ORDER C — THE VERDICT
1. Post ONE row: `VERDICT:` line first, then A.2's eleven EQUAL/DIFF lines, then B.1–B.5 findings, then amendments as verbatim replacement sentences if any. Print `read relay_inbox at <ISO>` with the count.

## FALSIFIER
Wrong if any repository file is written; wrong if a PASS is posted without B.1–B.5 each answered; wrong if an amendment is not a quotable replacement sentence; wrong if the card was read from a copy.

## SHARED SURFACES
Bus: one row. Repository: reads only. Nothing else.

## DECISION RIGHTS
None. Verdict is yours; v3 or release is the Architect's.

BODIES: ADVERSARY-REVIEW-WEB-VALVE-1-S132-1-scout-report and -v2 · CARD-WEB-VALVE-1-S132-1-v3 · LAND-MA-RERUN-RUNNER-S132-1-AG5-report · .claude/boot/free.md (the scout's charter) · A-REC-S132-5 · S37-1 · TOTAL-45.

```deliverables
sha256 of the v2 card equal to the fence
eleven EQUAL/DIFF lines for the amendments; killed sentence absent
B.1–B.5 answered with what was read
VERDICT line and any replacement sentences
one bus row, no repository write
```

TAIL ANCHOR: CARD-ADVERSARY-REVIEW-WEB-VALVE-1-S132-1-v3 ends here.
