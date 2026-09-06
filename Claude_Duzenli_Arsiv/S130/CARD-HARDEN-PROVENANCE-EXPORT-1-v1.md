<!-- relay-audit: v1 kind=card -->
# CARD-HARDEN-PROVENANCE-EXPORT-1 · v1 — close the scout's three provenance-export findings (A1–A3) before any consumer writes the artefact: a bounded, redacted, traced export with a truncation field

AG-4 card. Second item of the owner's re-ordered queue (OWNER-RULING-S130-LAND-490-1 §2). `buildTurnProvenanceExport` landed on master as PR #465 (S130, 01:22Z) — a pure function wired to nothing, reviewed GREEN by the scout with three AMBERs owed "before the first production consumer is wired". This card pays them at the module, so that whichever caller wires it first inherits the guarantees instead of having to remember them. Three authored edits, the tests that fail without them, one branch, one PR.

## PREMISE

MEASURED: 2026-09-04T21:16Z SCOUT-REVIEW-PROVENANCE-EXPORT-1-v1 (bus, scout; the row copied into the foreman box for the #465 landing): the module imports nothing, writes nothing; payload = shape · turnId · answerText · toolResults[{ordinal,tool,backendId,serverName}] · servedValues[{callId,tool,served}] · join{available:false,reason}. A1 — `served: e.raw` copies raw tool-result bytes and `answerText` the settled reply, verbatim: no redaction, no size bound, no classification; the artefact is designed to be read offline. A2 — `partial ≠ complete` unaddressed by construction: a silently capped input yields a complete-looking artefact; the shape has no "truncated" field. A3 — FULL-TRACE: the export step is silent (no logging call in the file).
MEASURED: 2026-09-04T21:16Z, what must NOT regress: the discriminated `join.available:false` marker (typed `readonly available: false`), `?? null` for an absent backend (never `?? ''`), anti-forgery (a hostile body claiming `serverName:"FAKE"` never reaches the artefact), purity / non-mutation / determinism — all asserted by the existing 20-case test through `JSON.parse(JSON.stringify(...))`.
UNMEASURED: the module's path at today's master and the exact line numbers; whether a redaction helper already exists in the repo (ORDER A greps for one before writing a second).
DECAYS on any push to master touching the module. ON-DISAGREEMENT: an existing helper that already does A1 → reuse it, name it; none → write the smallest one and say so.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| the three findings and the invariants | MEASURED: 2026-09-04T21:16Z scout review | findings |
| the branch, the PR, CI | UNMEASURED — ORDER D | result |

```evidence:findings
A1 unredacted verbatim carrier (served: e.raw; answerText)   -> secret-pattern redaction + per-field byte bound, both DECLARED in the artefact
A2 no truncation field; capped input looks complete         -> input-count declaration + `truncated` field the caller must set from its own read
A3 silent export step                                       -> one structured trace line per export naming counts and bounds (INPUT+OUTPUT, secrets scrubbed)
```

```evidence:result
UNMEASURED. ORDER D prints the branch tip at forty hex, the PR number, and every CI context.
```

## ORDER A — LOCATE, AND LOOK FOR WHAT EXISTS
Fresh worktree at today's master; print `git rev-parse origin/master` forty hex. `git grep -n buildTurnProvenanceExport` for the module and its test. `git grep -n -iE "redact|scrub|mask"` across `api/` and `shared/` — if the repo already owns a secret-scrubbing helper (the FULL-TRACE mandate says raw secrets are scrubbed at the trace layer, so one likely exists), name it and reuse it; print what you found either way.

## ORDER B — THE THREE FIXES, AT THE MODULE
A1: every `served` and `answerText` value passes through the scrubber (reused or new: connection strings, bearer tokens, `sb_*` keys, `SERVICE_ROLE`, JWT-shaped strings) and is bounded per field (a named constant; over-bound → the value is cut AND the entry carries `{bounded:true, originalBytes:N}` — a cut without a declaration is the A2 fault in a new coat). The artefact's top level declares `redaction:{applied:true, patterns:<names>}` and `bounds:{perFieldBytes:N}` so the offline reader knows what it is not seeing. A2: the shape gains `inputs:{toolResults:N, servedValues:N}` and `truncated:{toolResults:boolean, servedValues:boolean}`; the function takes those booleans as an explicit argument with NO default (a caller that read through a 1000-row cap must say so, and one that forgets does not compile). A3: one structured trace call per export (whatever the repo's stage-trace idiom is — reuse it, name it) carrying the counts, the bounds and the truncation flags, never the payload bytes.

## ORDER C — TESTS, FAIL-THEN-PASS
New cases in the existing test file: a planted `postgres://…` and a planted `sb_secret_…` in `served` do NOT reach the artefact (assert through JSON round-trip); an over-bound `answerText` is cut and DECLARED; `truncated` is required (a type-level test or a runtime guard test — say which); the trace line is emitted once with the counts and without the payload. Run each new test against the pre-fix code in a second worktree and print the failing assertion, then at the fix and print the pass. The existing 20 cases stay green — print the count.

## ORDER D — BRANCH, PR, CI
Branch `phase/harden-provenance-export-1` from today's master; commits `AG-4: PHASE-HARDEN-PROVENANCE-EXPORT-1 — …` (one lane token before the first colon, every non-merge subject). `gen:arch-facts` / `reseal` if a generated input moved (print whether). PR against master; CI at the tip's forty hex, every context named; `build (24.x)` RED → STOP with the failing tests verbatim, no re-run. Report from_lane, artifact_name `HARDEN-PROVENANCE-EXPORT-1-AG-4-report`: ORDER A findings (helper reused or written), the three diffs by line, the test runs fail-then-pass verbatim, tip fenced, PR number, CI table, `git status --porcelain -uall`, `git worktree list`. Do NOT land.

## FALSIFIER
Wrong if a planted secret survives the JSON round-trip, if a cut value carries no declaration, if `truncated` can be omitted by a caller, if the trace line carries payload bytes, if any of the 20 existing cases turns red, or if the diff leaves the module, its test, the (reused) helper's import, and the two generated files.

## SHARED SURFACES
One new branch, one PR. NO push to master. NO caller wired. NO migration. NO db push. NO governed row.

## DECISION RIGHTS
None. Reuse-vs-write for the scrubber follows ORDER A's grep, not preference; name the choice in the report.

BODIES: `empty ≠ zero` · `partial ≠ complete` · FULL-TRACE MANDATE · secrets env-only · `TOTAL-45` · `S61-2` · `S37-2` · `S102-YASA-1` · OWNER-RULING-S130-LAND-490-1 · OWNER-RULING-S130-CWF-FOCUS-ADF-FREEZE-1 (product scope) · SCOUT-REVIEW-PROVENANCE-EXPORT-1-v1 · F-S130-RESEAL-BREADCRUMB-ALWAYS-DIRTIES-1.

fanout: personalized

```deliverables
branch: phase/harden-provenance-export-1, PR open against master, CI read at the tip
report: bus row from_lane, artifact_name HARDEN-PROVENANCE-EXPORT-1-AG-4-report
```

TAIL ANCHOR: CARD-HARDEN-PROVENANCE-EXPORT-1-v1 ends here.
