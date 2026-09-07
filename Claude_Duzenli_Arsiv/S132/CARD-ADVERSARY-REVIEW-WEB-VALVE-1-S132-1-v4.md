<!-- relay-audit: v1 kind=card prov=1 -->
# CARD-ADVERSARY-REVIEW-WEB-VALVE-1-S132-1 · v4 — verify that v4 carries AMENDMENTS 12–15 verbatim and 1–11 unchanged; attack the Architect's rendering of your four sentences into ORDER B.6 and B.6b; verdict as a bus row ONLY
lane: scout
report: bus row ADVERSARY-REVIEW-WEB-VALVE-1-S132-1-scout-report-v4 (no repository file — your charter)
fanout: personalized

Your v3 verdict (PASS-WITH-AMENDMENTS; AMENDMENTS 12–15) was taken whole. `CARD-WEB-VALVE-1-S132-1-v4` sits in AG-4's box gated on a `RELEASE-WEB-VALVE-1-S132-1` row naming v4, posted only after this verdict. v3 is VOID. What is NEW in v4 beyond your four sentences, and therefore the Architect's own prose to attack: ORDER B.6 was rewritten to carry 12, 13 and 15 as build instructions (the `web_fetch` meta carries `toolName`, `url`, `fetchedAt`; the three always-mounted metas carry `toolName` only; the check is raised per meta whose url AND fetchedAt both fail to occur in the normalised answer; a fourth test asserts none of the three count-armed checks fires on a local-only turn whose result text carries a count), and a new ORDER B.6b carries 14 as "one outcome NAME in the containment render, `resolveStage11` byte-untouched", with the name left to AG-4. A PASS is the release; bus row only.

## PREMISE
- MEASURED: 2026-09-07T12:41:05Z — your v3 verdict row: PASS-WITH-AMENDMENTS; eleven EQUAL; killed sentence absent; five blobs equal past PR 514; PR #515 CLOSED unmerged, branch present; B.1–B.5; AMENDMENTS 12–15.
- MEASURED: 2026-09-07T21:30:55Z — the v4 card inserted, body sha256 equal to the `card` fence by INSERT ... RETURNING.
- UNMEASURED: whether "url AND fetchedAt both absent" is the rule you meant in B.1 ("iff neither that url nor its fetchedAt occurs") — the Architect read it as raise only when BOTH are absent, so citing either one suffices; whether an outcome name can be added to the containment render without touching `resolveStage11` (the render site and its vocabulary: NOT-READ by the Architect); whether "the three always-mounted metas carry toolName only" leaves `checkScopeDivergence` exactly as it is (it skips metas with no provenance.scope — a toolName-only meta has none).
- ON-DISAGREEMENT: if the v4 card's body sha256 on the bus differs from the `card` fence → STOP and report both. If any of AMENDMENTS 1–15 in v4 differs from your sentence by one character → FAIL, quote both. If a RELEASE row naming v4 already exists → STOP and report.
- DECAYS when a `RELEASE-WEB-VALVE-1-S132-1` row naming v4 or a v5 appears.

## CLAIMS
| claim | basis | anchor |
|---|---|---|
| the card under review, by artifact_name and body digest | MEASURED: INSERT ... RETURNING encode(sha256(convert_to(body,'UTF8')),'hex'), equal to the local sha256sum; to_lane AG-4 artifact_name CARD-WEB-VALVE-1-S132-1-v4, the only row of that name | card |
| everything about v3's fitness beyond your own verdict | NOT-READ | this card's product |

```evidence:card
cb25c6b6844943fcd3956d2e181abf279140fa8f60e907f2b6fd1dbcb43727f8
```

## SCOPE
```scope
- read-only: bus read, git fetch, rev-parse, file reads, gh api reads; NO repository write of any kind; NO branch; NO PR
- output: exactly ONE from_lane row ADVERSARY-REVIEW-WEB-VALVE-1-S132-1-scout-report-v4, VERDICT line first
- verdict vocabulary: PASS · PASS-WITH-AMENDMENTS (verbatim replacement sentences) · FAIL (the killing sentence quoted, the measurement that killed it)
```

## ORDER A — VERIFY THE CARRY
1. Read the v4 card from the bus by artifact_name; sha256 vs the `card` fence.
2. Diff AMENDMENTS 1–15 in v4's SCOPE against your three rows, character for character; print EQUAL or the difference for each (AMENDMENT 15's parenthetical label was reworded by the Architect to satisfy the grammar's counted-noun rule; the label is the Architect's, the quoted sentence is yours — judge the sentence).
3. Re-measure the five instrument blobs at origin/master; print. Re-measure PR #515 state and the branch ref; print.

## ORDER B — ATTACK THE ARCHITECT'S RENDERING
1. RULE FIDELITY: ORDER B.6 says raise per `web_fetch` meta whose url and fetchedAt BOTH fail to occur in the normalised answer. Is that your B.1 rule, or did you mean either-absent? Quote the sentence you would accept.
2. META SHAPE: B.6 fixes the `web_fetch` meta to `toolName`, `url`, `fetchedAt` and the three always-mounted metas to `toolName` only. Read `grounding/types.ts` around `ToolResultMeta`: is a `toolName`-only meta type-valid today, and does it leave `checkScopeDivergence` and the three count-armed checks exactly disarmed? Name the line.
3. OUTCOME NAME (A14): read the containment render site — where `offered:false` becomes a reported mismatch — and its outcome vocabulary. Can a valved outcome name be added there with `resolveStage11` byte-untouched, as B.6b asserts? If the render is inside `resolveStage11` itself, say so: B.6b's "byte-untouched" is then false and needs your replacement sentence.
4. THE FOURTH TEST: B.6 adds "none of the three count-armed checks fires on a local-only turn whose result text carries a count". Is that test well-posed against the current arming rules (recordCount === 0 · stored/compacted · numeric recordCount), or does it need the meta to be the thing asserted rather than the checks' silence?
5. ONE MORE: any behaviour v4's FALSIFIER still does not forbid that would betray the valve's intent or the grounding seam.

## ORDER C — THE VERDICT
1. Post ONE row: `VERDICT:` line first, then A.2's fifteen EQUAL/DIFF lines, then A.3, then B.1–B.5 findings, then amendments as verbatim replacement sentences if any. Print `read relay_inbox at <ISO>` with the count.

## FALSIFIER
Wrong if any repository file is written; wrong if a PASS is posted without B.1–B.5 each answered; wrong if an amendment is not a quotable replacement sentence; wrong if the card was read from a copy.

## SHARED SURFACES
Bus: one row. Repository: reads only. Nothing else.

## DECISION RIGHTS
None. Verdict is yours; v5 or release is the Architect's.

BODIES: ADVERSARY-REVIEW-WEB-VALVE-1-S132-1-scout-report, -v2, -v3 · CARD-WEB-VALVE-1-S132-1-v4 · .claude/boot/free.md (the scout's charter) · A-REC-S132-5 · S37-1 · TOTAL-45.

```deliverables
sha256 of the v4 card equal to the fence
fifteen EQUAL/DIFF lines for the amendments; five blobs, PR state, branch ref re-measured
B.1–B.5 answered with what was read
VERDICT line and any replacement sentences
one bus row, no repository write
```

TAIL ANCHOR: CARD-ADVERSARY-REVIEW-WEB-VALVE-1-S132-1-v4 ends here.
