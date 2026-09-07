<!-- relay-audit: v1 kind=card prov=1 -->
# CARD-ADVERSARY-REVIEW-MA-RERUN-3-v5-S132-1 · v1 — attack CARD-MA-RERUN-3-S132-1-v5 (the measurement RUN) before its release; verdict as a bus row ONLY
lane: scout
report: bus row ADVERSARY-REVIEW-MA-RERUN-3-v5-S132-1-scout-report (no repository file — your charter)
fanout: personalized

`CARD-MA-RERUN-3-S132-1-v5` sits in AG-4's box gated on a `RELEASE-MA-RERUN-3-S132-1` row that is posted only after your verdict. It is not a build; it dispatches a landed CI runner under the read-only parity key, downloads the artifact, analyses it offline, and writes the fresh baseline. Your v1 review of the valve card found a real SSRF; this card's risk surface is different — credentials, measurement honesty, and a wait-by-name precondition — so the attacks below are different. Queue: after your WEB-VALVE v2 verdict.

## PREMISE
- MEASURED: 2026-09-07T10:48:08Z — AG-4 report v4: runner written; dispatch refused off the default branch; both secret names present; env:presence both UNSET; instrument blobs equal.
- MEASURED: 2026-09-07T11:53Z — the owner's named approval to land the runner; AG-5 landing card on the bus.
- UNMEASURED: whether `gh workflow run ... --ref master` can be executed by the producer's token (actions:write) — the v4 attempt got 404 on lookup, not 403 on permission; whether the artifact upload path can leak a value (the lens's stderr may echo connection errors that carry a URL with userinfo); whether `until=<dispatch instant>` yields the same population rule S82 used (time-bounded) or a superset.
- ON-DISAGREEMENT: if the v5 card's body sha256 on the bus differs from the `card` fence → STOP and report both. If a RELEASE row for v5 already exists → STOP and report (the Architect released before your verdict; that is his defect).
- DECAYS when a `RELEASE-MA-RERUN-3-S132-1` row or a v6 appears.

## CLAIMS
| claim | basis | anchor |
|---|---|---|
| the card under review, by artifact_name and body digest | MEASURED: INSERT ... RETURNING encode(sha256(convert_to(body,'UTF8')),'hex'), equal to the local sha256sum; to_lane AG-4 artifact_name CARD-MA-RERUN-3-S132-1-v5, the only row of that name | card |
| everything about v5's fitness | NOT-READ | this card's product |

```evidence:card
0608cf9cdeb19ce4f9888cd2e1fc7e9a61b5e0ba741cf6abf6a912001dea5915
```

## SCOPE
```scope
- read-only: bus read, git fetch, rev-parse, file reads, gh api reads; NO repository write; NO branch; NO PR; NO workflow dispatch by you
- output: exactly ONE from_lane row ADVERSARY-REVIEW-MA-RERUN-3-v5-S132-1-scout-report, VERDICT line first
- verdict vocabulary: PASS · PASS-WITH-AMENDMENTS (verbatim replacement sentences) · FAIL (killing sentence quoted, the measurement that killed it)
```

## ORDER A — RE-MEASURE
1. Read the v5 card from the bus by artifact_name; sha256 vs the `card` fence.
2. The five instrument blobs vs its fence; print.
3. Read whole: `.github/workflows/ma-rerun.yml` at branch `phase/ma-rerun-3-s132-1-v4` (or at master if landed by then), `scripts/runClarificationLens.ts` (what stderr can carry), `api/cwf/_lib/persistence/client.ts` (what an auth failure prints), `docs/replay/ma-gate-rerun2-S82-v1.md` (the population rule).

## ORDER B — ATTACK
1. SECRET LEAK: can any step of the workflow, or the lens's stderr under a permission failure, print a value (key fragment, URL with userinfo, JWT) into the run log or the uploaded artifact? Read the code paths that log errors. If yes, the amendment names the redaction or the step to remove.
2. TOKEN: does the producer's `gh` token have actions:write on this repository? Read the v4 report's `dispatch` fence — was the 404 a lookup failure or a permission mask? Say what the run would answer after landing.
3. POPULATION: does `--until <dispatch instant>` with `--all` reproduce S82's TIME rule for the like-for-like population, or does the card's "count and d vs 2534 as CONTROL only" hide a population mismatch? Propose the sentence if the rule needs stating in the card.
4. WAIT: are the two `wait` lines (registry lists the runner; blob at origin/master) sufficient to prove the runner on master is the SAME bytes v4 wrote (blob id equality vs the branch), or can a different `ma-rerun.yml` land in between? If the latter, the amendment adds the blob-equality line.
5. HONESTY: is there any path by which a rate can reach the artefact without `readIntegrity`, populations, `truncated` and the guardian table above it? Name it or say none.
6. ONE MORE: any behaviour the FALSIFIER does not forbid that would betray the measurement's intent.

## ORDER C — THE VERDICT
1. Post ONE row: `VERDICT:` line first, then B.1–B.6, then amendments as verbatim replacement sentences. Print `read relay_inbox at <ISO>` with the count.

## FALSIFIER
Wrong if any repository file is written; wrong if you dispatch anything; wrong if a PASS is posted without B.1–B.6 each answered; wrong if an amendment is not a quotable replacement sentence.

## SHARED SURFACES
Bus: one row. Repository and CI: reads only.

## DECISION RIGHTS
None. Verdict is yours; release or v6 is the Architect's.

BODIES: CARD-MA-RERUN-3-S132-1-v5 · MA-RERUN-3-S132-1-AG4-report-v4 · OWNER-APPROVAL-S132-LAND-MA-RERUN-RUNNER-1 · ADR-002 · S102-YASA-2 · .claude/boot/free.md · TOTAL-45.

```deliverables
sha256 of the v5 card equal to the fence; five blobs re-measured
B.1–B.6 answered with what was read
VERDICT line and any replacement sentences
one bus row, no repository write, no dispatch
```

TAIL ANCHOR: CARD-ADVERSARY-REVIEW-MA-RERUN-3-v5-S132-1-v1 ends here.
