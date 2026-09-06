<!-- relay-audit: v1 kind=card -->
# CARD-SCOUT-REVIEW-HARDEN-PROVENANCE-EXPORT-1 · v1 — review PR #494: your three provenance findings (A1–A3) closed at the module; the redaction must be two-layered, the cut declared, `truncated` unforgettable, the trace payload-free

Scout card. Read-only by your charter. You wrote the three AMBERs (SCOUT-REVIEW-PROVENANCE-EXPORT-1-v1, 2026-09-04 21:16Z); AG-4 closed them under CARD-HARDEN-PROVENANCE-EXPORT-1-v1 on `phase/harden-provenance-export-1`, PR #494, two commits at the `head` fence tip. AG-4 is concurrently merging today's master into the branch (CARD-TRUNK-SYNC-HARDEN-PROVENANCE-EXPORT-1-v1) — the merge touches only the seal. Review the authored content at the tip you find; if the merge has landed when you start, say so and review the merged head (its authored bytes are the same two commits).

## PREMISE

MEASURED: 2026-09-05T13:59:14Z HARDEN-PROVENANCE-EXPORT-1-AG-4-report: 3 paths — `api/cwf/_lib/observability/turnProvenanceExport.ts`, `api/cwf/__tests__/turnProvenanceExport.test.ts`, `public/architecture/manifest.json` (real reseal, two tabs); two `AG-4:` subjects; CI at the tip total_count 6, five success + eval-canary SKIPPED; 29/29 at the fix, typecheck:api clean; at the parent 11 fail / 18 pass with the failing assertions quoted, the pre-fix leak DEMONSTRATED (`postgres://cwf_admin:hunter2@…` and an `sb_secret_…` key reached `JSON.stringify` intact).
MEASURED: AG-4's decision on reuse-vs-write, named as DECISION RIGHTS required: the repository's `observability/redaction.ts` scrubber is REUSED and runs first, but it carries NO patterns (env-value and key based), so a pattern layer (DSN, bearer, `sb_*`, SERVICE_ROLE, JWT) runs over what survives. Redact THEN bound; bound is a named constant; every cut declared on the field (`bounded`, `originalBytes`); the cut is by BYTES dropping a partial trailing character (Turkish corpus). `truncated` is a REQUIRED argument, pinned by a `@ts-expect-error` type-level test. A3: one span per export via the repo's `withSpan`, in a separate `exportTurnProvenanceTraced` — the pure builder stays pure; span attributes are a separate pure function so the "no payload byte" assertion is reachable when observability is off.
MEASURED: three contradictions AG-4 reported rather than resolved silently: (1) the card's "20 existing cases" — the file holds EIGHTEEN (the Architect's stale count, A-REC-S130-18); (2) purity vs A3 — resolved by the wrapper; (3) the module's "imports nothing" header — now imports the scrubber and span helper (the card's FALSIFIER permitted the import), header corrected in the same commit.
UNMEASURED: whether each new case would FAIL against the parent (read the assertions against the old code); whether the pattern set covers what the scout's A1 named (connection strings, bearer tokens, `sb_*` keys, SERVICE_ROLE, JWT-shaped) and nothing broader that would eat ordinary tool output (the positive control); whether `truncated` can be omitted by a caller in any way the type test does not cover; CI at whichever tip you review.
DECAYS on any push to the branch (other than the sync merge) or master. ON-DISAGREEMENT: authored bytes at the head differ from the two commits → review what you find, say so first.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| the PR, its paths, its CI at the pre-sync tip | MEASURED: 2026-09-05T13:59Z AG-4 report | head |
| the content verdict | UNMEASURED — ORDERS A–D | verdict |

```evidence:head
phase/harden-provenance-export-1, PR #494 (OPEN, base master), pre-sync tip:
    f5b8663838a810b7eebf88edfcbcd7573ef8871f
master it is being synced onto (PR #493 merge):
    5d916ad418032daf2ec312d059c64c26738b79d1
```

```evidence:verdict
UNMEASURED. ORDER A shape; ORDER B the three fixes and their tests; ORDER C laws; ORDER D resolver and CI.
```

## ORDER A — SHAPE
`git ls-remote` the branch (name the tip you review; if it is a merge commit, its parents); `git diff --name-only master...tip` = the 3 paths and nothing else; non-merge subjects in master..tip = 2, both `AG-4:` before the first colon.

## ORDER B — THE THREE FIXES
A1: quote the two-layer call order (scrubber, then patterns, then bound); the pattern list; the declaration fields; confirm the planted DSN and key tests assert through `JSON.parse(JSON.stringify(...))`; confirm the POSITIVE CONTROL (ordinary output untouched) exists and would catch an over-eager redactor; state whether each A1 test fails at the parent. A2: `inputs{}` and `truncated{}` present; `truncated` has NO default — quote the `@ts-expect-error` test and say whether removing the default would make `typecheck:api` red; the "capped vs complete produce DIFFERENT artefacts" test. A3: the span carries counts/bounds/flags and NO payload byte — quote the attribute builder; confirm `exportTurnProvenanceTraced` returns the same artefact as the pure builder. Any fix without a test that would fail without it is a FINDING.

## ORDER C — THE LAWS
C1 LAW (no write sink added — the module still writes no file/table); secrets env-only (no credential-shaped literal in the diff; the planted test values are fixtures, name them as such); `partial ≠ complete` now declared by construction; FULL-TRACE satisfied by the wrapper; the module's header claims are TRUE at the tip (purity of the builder; imports named); the reseal content-derived (S100-1).

## ORDER D — RESOLVER AND CI
Installed `resolveAuthorLane` + `judgeReportOnly` at the tip (expect AUTHOR-SUBJECT/AG-4; lander AG-5 PASS; AG-4 SELF-LAND — paths leave docs/relay/; a sync merge commit is invisible to lens one). CI at the full forty hex of the tip you reviewed, every context named; if the synced head's CI is running, say IN-PROGRESS by name — the landing card waits on the lander's own read.

## ORDER E — REPORT
From_lane row, artifact_name `SCOUT-REVIEW-HARDEN-PROVENANCE-EXPORT-1-v1`. First line `VERDICT: GREEN|AMBER|RED`; second `RESOLVER: <cls> · landable-by: <lanes>`; third `HEAD: <tip reviewed> · SYNCED: yes|no · CI: <concluded|in-progress>`. Then ORDERS A–D. This row is copied into the AG-5 box as the landing card's PRECONDITION.

## FALSIFIER
Wrong if any new test would pass against the parent, if a path outside the 3 appears, if the pattern layer is absent or eats the positive control, if `truncated` can be omitted, if the span carries a payload byte, or if the resolver does not read AG-4.

## SHARED SURFACES
None written. Reads only.

## DECISION RIGHTS
None.

BODIES: `empty ≠ zero` · `partial ≠ complete` · FULL-TRACE MANDATE · secrets env-only · `S37-2` · `S100-1` · `TOTAL-45` · C1 LAW · OWNER-RULING-S130-LAND-490-1 (§2) · CARD-HARDEN-PROVENANCE-EXPORT-1-v1 · SCOUT-REVIEW-PROVENANCE-EXPORT-1-v1 · free.md.

fanout: personalized

```deliverables
report: bus row from_lane, artifact_name SCOUT-REVIEW-HARDEN-PROVENANCE-EXPORT-1-v1
```

TAIL ANCHOR: CARD-SCOUT-REVIEW-HARDEN-PROVENANCE-EXPORT-1-v1 ends here.
