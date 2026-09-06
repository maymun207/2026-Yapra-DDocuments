<!-- relay-audit: v1 kind=card -->
# CARD-SCOUT-REVIEW-CONTEXT-RETRIEVAL-1 · v1 — read-only review of the synced context-retrieval organ before the foreman lands it

Under OWNER-RULING-S130-CWF-FOCUS-ADF-FREEZE-1 (product first). `phase/context-retrieval-1` is synced with master (merge commit in the `head` fence, pushed 08:39Z, PR #387 at that head, verified by your own v3 verdict). This card asks for the review GATE-1 ⓵ has owed this work since 27 August — of the PRODUCT, not the merge. The foreman's landing card is cut in parallel and its PRECONDITION names your verdict; nothing lands before you answer. Read-only: no address, no repository write, no bus write other than your verdict row.

## PREMISE

MEASURED: 2026-09-04T08:41Z, your v3 verdict — branch tip is the `head` fence, parents are the old tip and master; facts.json regenerated (moduleCount 453 = 440 + 4 + 9, neither side's number); manifest.json restamped (Architecture Map hash equals neither side); PR #387 OPEN at that head; `-organ` untouched.
MEASURED: 2026-09-04T08:41Z, your v3 verdict — CI at the head: `build (24.x)` in_progress since 08:40:06Z; eval-canary SKIPPED, named. NOT a pass. The landing card reads it, not this one.
MEASURED: 2026-09-04T07:52Z, shared clone — the branch's non-merge content vs master: `api/cwf/_lib/vectorLane/` (6 files + 4 tests), `api/cwf/_lib/groundMcp/` (5 + 3 tests), `scripts/` (2), three reports under `docs/relay/` (`PHASE-CONTEXT-RETRIEVAL-1-report.md`, `PHASE-CONTEXT-RETRIEVAL-1-FLOORS-report.md`, `CONTEXT-BRANCH-MERGE-1-report.md`), and now the two regenerated ground/seal files.
MEASURED: 2026-09-04T08:12Z — thirteen non-merge subjects all `PHASE-CONTEXT-RETRIEVAL-1`-prefixed; exactly two carry `AG-4` before the colon. At landing, `land.ts` lens one will not be unanimous and lens two (H1 + first paragraph of `docs/relay/PHASE-CONTEXT-RETRIEVAL-1-report.md`) decides the class. The H1 as measured 07:52Z reads `# PHASE-CONTEXT-RETRIEVAL-1 — the phase report` (no lane token in the H1 itself; the first paragraph is NOT-READ by the Architect).
DECAYS on any push to the branch. ON-DISAGREEMENT: if the head is not the `head` fence, say so and review the head you find, naming it.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| the synced head and its parents | MEASURED: 2026-09-04T08:41Z, scout v3 verdict (`git log -1`, ls-remote) | head |
| what the branch adds to master, by path | MEASURED: 2026-09-04T07:52Z, shared clone `git diff --name-only` | paths |
| whether lens two resolves this branch to AG-4 | NOT-READ | lens |
| whether the organ's code is sound to land | NOT-READ | — |

```evidence:head
phase/context-retrieval-1, merge of master, pushed 08:39Z (scout ls-remote 08:41Z):
    3780d665bcbff4c0c8c73296428e935d60fc5836
parents:
    a90e7df14abd863f75c31eecf232398042eb70f4   (the branch's prior tip)
    1dceed1ceaaf970085e13463215b53134ff733a8   (master, the PR 488 merge)
```

```evidence:paths
api/cwf/_lib/vectorLane/**            6 modules + 4 tests
api/cwf/_lib/groundMcp/**             5 modules + 3 tests
scripts/**                            2 files
docs/relay/PHASE-CONTEXT-RETRIEVAL-1-report.md
docs/relay/PHASE-CONTEXT-RETRIEVAL-1-FLOORS-report.md
docs/relay/CONTEXT-BRANCH-MERGE-1-report.md
docs/ground/facts.json                regenerated in the merge
public/architecture/manifest.json     restamped in the merge
```

```evidence:lens
NOT-READ. ORDER B reads the H1 and first paragraph of docs/relay/PHASE-CONTEXT-RETRIEVAL-1-report.md at the head
and applies land.ts reportLaneOf as installed.
```

## ORDER A — WHAT THE ORGAN IS, FROM ITS OWN REPORT AND CODE
Read `docs/relay/PHASE-CONTEXT-RETRIEVAL-1-report.md` and `-FLOORS-report.md` at the `head` fence. State in five lines what the organ does (vector lane, ground MCP, the corpus wall, the encode classes) and what the reports themselves say stays DARK. Then read the eleven modules under `vectorLane/` and `groundMcp/`. Name, with file:line, anything that: writes to a governed table from a read path (C1 LAW), reads a secret from anywhere but env, folds an empty result into zero (empty ≠ zero), or leaves a stage without INPUT+OUTPUT on the trace (FULL-TRACE). A clean read on each is a MEASUREMENT: say what you looked for and where.

## ORDER B — THE LANDING-GATE QUESTION, ANSWERED BEFORE THE FOREMAN ASKS IT
Read `scripts/land.ts` `reportLaneOf` and `authorLaneOf` as installed at the head. Apply them by hand to this branch: the thirteen subjects (lens one) and the H1 + first paragraph of `docs/relay/PHASE-CONTEXT-RETRIEVAL-1-report.md` (lens two). State the class you expect `npm run land -- 387` to compute (AUTHOR-SUBJECT / AUTHOR-REPORT-CORROBORATED / AUTHOR-UNKNOWN / AUTHOR-CONTRADICTED) and the exact bytes that decide it. If lens two does NOT resolve to exactly one lane, say so: that is a landing blocker and the Architect needs it before the foreman runs.

## ORDER C — THE TESTS
For the seven test files under the two module trees: do they exercise the empty/absent/non-numeric branches, or only the happy path? One line per file. Do not run the suite (`build (24.x)` is running it); read.

## ORDER D — VERDICT
File from_lane, artifact_name `SCOUT-REVIEW-CONTEXT-RETRIEVAL-1-v1`, reply_to this card's row. GREEN / AMBER / RED on the ORGAN (not on the merge, already GREEN), plus the ORDER B expected class with its bytes. RED must name file:line and the law it breaks. AMBER names what is owed and whether it blocks landing.

## FALSIFIER
Wrong if the head is not the `head` fence, if the branch's added paths are not the `paths` fence, or if land.ts's lenses read differently from what ORDER B assumes — in each case the measurement wins and the verdict says so.

## SHARED SURFACES
None written. One verdict row.

## DECISION RIGHTS
You decide the verdict. You decide nothing about landing; the foreman's card carries your verdict as a PRECONDITION.

BODIES: `TOTAL-45` · `empty ≠ zero` · C1 LAW · FULL-TRACE · S43-2 (this is NOT a fast-gate item: product code, full read) · OWNER-RULING-S130-CWF-FOCUS-ADF-FREEZE-1.

fanout: personalized

```deliverables
verdict: bus row from_lane, artifact_name SCOUT-REVIEW-CONTEXT-RETRIEVAL-1-v1
```

TAIL ANCHOR: CARD-SCOUT-REVIEW-CONTEXT-RETRIEVAL-1-v1 ends here.
