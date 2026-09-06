<!-- relay-audit: v1 kind=card -->
# CARD-SCOUT-OPEN-PR-TRIAGE-1 · v1 — the fifteen open pull requests: class each one by what it adds, so the queue can be landed in batches or closed by name

Scout card. Read-only by your charter. Stage 2 of the owner's hygiene plan. After BRANCH-SWEEP-1 the repository holds 24 refs: master, five `lane/*`, three owner holds, and the heads of fifteen OPEN pull requests — the last of the pile, and the only part that needs judgement. Your inventory (04:20Z) already gives per-PR head, updated-at, mergeable and ahead/behind; this card asks for the one thing it did not: WHAT each PR adds, so the Architect can propose a landing order and the owner can close the rest by name.

## PREMISE

MEASURED: 2026-09-05T05:02Z AG-4 BRANCH-SWEEP-1 report: 24 refs remain = 1 + 5 + 15 open-PR heads + 3 holds; `delete_branch_on_merge` = true; master `0e5022902381d04702a4598235a2ef45bbb04eda`.
MEASURED: 2026-09-05T04:20Z your inventory ORDER C: the sixteen open PRs (now fifteen, #492 landed) with updated-at and mergeable; #419 CONFLICTING; #434 UNKNOWN.
UNMEASURED: per PR — the path set it adds against today's master, whether it is docs/relay-only, whether its author subjects resolve to one lane, CI at its head (or never run), and whether its content is already on master by another route.
DECAYS on any push to master or to any of the fifteen heads. ON-DISAGREEMENT: the open set differs from fifteen → print yours; the wire wins.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| the remaining shape | MEASURED: 2026-09-05T05:02Z AG-4 report | shape |
| the per-PR class | UNMEASURED — ORDER A | verdict |

```evidence:shape
24 refs = master + lane/AG-1..5 + 15 open-PR heads + 3 holds (phase/authorship-lens-2, probe/force-150316, probe/plain-150316)
master: 0e5022902381d04702a4598235a2ef45bbb04eda
```

```evidence:verdict
UNMEASURED. ORDER A prints one row per PR; ORDER B the recommended batches.
```

## ORDER A — ONE ROW PER PR, MEASURED
For each open PR (oldest first): number · head branch · tip (short, transcript) · `git diff --name-only origin/master...<tip>` path count and whether EVERY path is under `docs/relay/` (REPORT-ONLY) or not (CODE) · non-merge subjects in master..tip and the installed resolver's class (`resolveAuthorLane` as before; note `mixed`) · CI at the tip: conclusions by context, or NEVER-RUN · ahead/behind · mergeable · and for REPORT-ONLY PRs whether the report file already exists on master under the same or another name (`git log --all --diff-filter=A -- docs/relay/<name>`; content already landed = SUPERSEDED). One line of what the PR is FOR, from its title and report H1 — not from memory.

## ORDER B — CLASSES AND BATCHES
Class each PR: `REPORT-ONLY-LANDABLE` (docs/relay only, one author token, lander AG-5 passes or the report-only exception applies — quote land.ts's exception predicate line), `CODE-STALE` (code, >100 behind, no green build), `CODE-LIVE`, `CONFLICTING`, `SUPERSEDED` (content already on master). Print the class counts. Recommend batches: batch 1 = REPORT-ONLY-LANDABLE in oldest-first order; batch 2 = SUPERSEDED (close by name); batch 3 = the owner's table (CODE-* and CONFLICTING) with one line each of what closing would lose.

## ORDER C — REPORT
From_lane row, artifact_name `SCOUT-OPEN-PR-TRIAGE-1-v1`. First line `OPEN: <n> · REPORT-ONLY-LANDABLE: <n> · SUPERSEDED: <n> · OWNER-TABLE: <n>`. Then ORDER A's table in an unanchored fence and ORDER B's batches.

## FALSIFIER
Wrong if the open set is not fifteen on the wire, if any PR is classed REPORT-ONLY with a path outside docs/relay/, or if a SUPERSEDED verdict rests on a name match without a content match.

## SHARED SURFACES
None written. Reads only. NO PR closed, NO comment.

## DECISION RIGHTS
None. Landing and closing follow the owner's word on your table.

BODIES: `S37-2` · `S102-YASA-3` · `TOTAL-45` · `empty ≠ zero` · OWNER-RULING-S130-CWF-FOCUS-ADF-FREEZE-1 · OWNER-RULING-S122-E1-E2-v1 (report-only landing exception) · SCOUT-BRANCH-INVENTORY-1-v1 · free.md.

fanout: personalized

```deliverables
report: bus row from_lane, artifact_name SCOUT-OPEN-PR-TRIAGE-1-v1
```

TAIL ANCHOR: CARD-SCOUT-OPEN-PR-TRIAGE-1-v1 ends here.
