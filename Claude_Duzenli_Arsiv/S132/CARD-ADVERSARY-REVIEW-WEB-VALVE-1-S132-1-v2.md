<!-- relay-audit: v1 kind=card prov=1 -->
# CARD-ADVERSARY-REVIEW-WEB-VALVE-1-S132-1 · v2 — verify that v2 of the valve card carries your six amendments verbatim, then attack the two sentences that are new; verdict as a bus row ONLY
lane: scout
report: bus row ADVERSARY-REVIEW-WEB-VALVE-1-S132-1-scout-report-v2 (no repository file — your charter forbids it, and the Architect's v1 review card was wrong to order one)
fanout: personalized

Your v1 verdict (FAIL, six amendments) was taken whole. `CARD-WEB-VALVE-1-S132-1-v2` sits in AG-4's box GATED: its ORDER A.1 stops the lane unless a `RELEASE-WEB-VALVE-1-S132-1` row naming v2 exists, and that row is posted only after this verdict. Your charter (`.claude/boot/free.md`) forbids repository writes; v1 of this review card ordered a report file and a PR, which was the Architect's defect (F-S132-SCOUT-CHARTER-FORBIDS-REPORT-FILE-1) — this version orders nothing but the bus row.

## PREMISE
- MEASURED: 2026-09-07T11:29:43Z — your row `ADVERSARY-REVIEW-WEB-VALVE-1-S132-1-scout-report`: VERDICT FAIL, amendments 1–6, findings B.1–B.9, the charter block.
- MEASURED: 2026-09-07T11:24:22Z — AG-4's v1 report: the branch `phase/web-valve-1-s132-1` already carries a v1 build (710 files green); v2 amends that branch, it does not restart.
- UNMEASURED: whether v2's SCOPE sentence "resolveStage11 unions VALVED_LOCAL_TOOL_NAMES ONLY for turns whose stage-07 figure recorded webOffered:true" is implementable from the recorded figure as it is persisted today (does the replay slice see the stage-07 figure?); whether AMENDMENT 4's bounds `[8192, 40000]` are the right band given `MAX_TOOL_RESULT_CHARS` measures CHARS of serialised JSON, not body BYTES.
- ON-DISAGREEMENT: if the v2 card's body sha256 on the bus differs from the `card` fence → STOP and report both. If any of the six amendments in v2 differs from your v1 sentence by one character → FAIL, quote both.
- DECAYS when a `RELEASE-WEB-VALVE-1-S132-1` row or a v3 of the valve card appears.

## CLAIMS
| claim | basis | anchor |
|---|---|---|
| the card under review, by artifact_name, created_at and body digest | MEASURED: INSERT ... RETURNING encode(sha256(convert_to(body,'UTF8')),'hex'), equal to the local sha256sum; the row is to_lane AG-4 artifact_name CARD-WEB-VALVE-1-S132-1-v2, its created_at is printed in the release notice and is the only row of that name | card |
| everything about v2's fitness | NOT-READ | this card's product |

```evidence:card
14dda150849a17fe5297ccb023e25369140f84a9f793c28231fe5892de231d21
```

## SCOPE
```scope
- read-only: bus read, git fetch, rev-parse, file reads; NO repository write of any kind; NO branch; NO PR
- output: exactly ONE from_lane row ADVERSARY-REVIEW-WEB-VALVE-1-S132-1-scout-report-v2, VERDICT line first
- verdict vocabulary as v1: PASS · PASS-WITH-AMENDMENTS (verbatim replacement sentences) · FAIL (the killing sentence quoted, the measurement that killed it)
```

## ORDER A — VERIFY THE CARRY
1. Read the v2 card from the bus by artifact_name; sha256 vs the `card` fence.
2. Diff each of AMENDMENT 1–6 in v2's SCOPE against your v1 row, character for character; print EQUAL or the difference.
3. Re-measure the five instrument blobs once more; print.

## ORDER B — ATTACK THE NEW SENTENCES
1. CONTAINMENT: v2 makes stage-11 containment of `web_fetch` conditional on the recorded stage-07 figure `webOffered`. Read `stageContextSlice.ts` around `resolveStage11` and the figure persistence path: is the stage-07 figure available to the replay slice for a recorded turn? If not, name what IS available and propose the replacement sentence.
2. BOUNDS: AMENDMENT 4 says bytes ≤ 40000 chars; the serialised JSON adds field overhead and HTML→text shrinks bytes to chars unevenly. Is `[8192, 40000]` with floor 32768 a band that guarantees `resultCut:false` for a body at the floor? If not, propose the band that does, or say the flag is the only honest guarantee and the band is advisory.
3. F2 TEST: AMENDMENT 6 asks a test to assert the citation on a recorded turn; v2 admits a weaker form if the attribution seam does not reach local tools. Read `api/cwf/_lib/grounding/` and say whether a real assertion is possible today; if it is, name the seam so the producer has no weaker-form excuse.
4. ONE MORE: any behaviour v2's FALSIFIER still does not forbid that would betray the valve's intent.

## ORDER C — THE VERDICT
1. Post ONE row: `VERDICT:` line first, then A.2's six EQUAL/DIFF lines, then B.1–B.4 findings, then amendments as verbatim replacement sentences if any. Print `read relay_inbox at <ISO>` with the count.

## FALSIFIER
Wrong if any repository file is written; wrong if a PASS is posted without B.1–B.4 each answered; wrong if an amendment is not a quotable replacement sentence; wrong if the card was read from a copy.

## SHARED SURFACES
Bus: one row. Repository: reads only. Nothing else.

## DECISION RIGHTS
None. Verdict is yours; v3 or release is the Architect's.

BODIES: ADVERSARY-REVIEW-WEB-VALVE-1-S132-1-scout-report (v1 verdict) · CARD-WEB-VALVE-1-S132-1-v2 · .claude/boot/free.md (the scout's charter) · A-REC-S132-5 · S37-1 · TOTAL-45.

```deliverables
sha256 of the v2 card equal to the fence
six EQUAL/DIFF lines for the amendments
B.1–B.4 answered with what was read
VERDICT line and any replacement sentences
one bus row, no repository write
```

TAIL ANCHOR: CARD-ADVERSARY-REVIEW-WEB-VALVE-1-S132-1-v2 ends here.
