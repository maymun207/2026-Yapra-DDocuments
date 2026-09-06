<!-- relay-audit: v1 kind=card -->
# CARD-LANDING-CONTEXT-RETRIEVAL-1 · v1 — land PR #387, the context-retrieval organ, on a green required context and a green scout review

Under OWNER-RULING-S130-CWF-FOCUS-ADF-FREEZE-1 (product first; using the factory is not developing it). This is the FOREMAN's card; the producer (AG-4) never merges its own work. The branch was synced with master this morning (merge commit in the `head` fence, verified by the scout from the pushed tree: facts.json regenerated to a number neither side had, manifest.json restamped, PR #387 at that head, no second PR).

**PRECONDITION — THIS CARD DOES NOT AUTHORISE A MERGE ON ITS OWN.** Three rows must be in your box before ORDER B, and each is a gate you READ, not assume: (1) `OWNER-APPROVAL-S130-MASTER-PUSH-PR-387-1` — the owner's NAMED approval, filed by the Architect only after the owner gives it; (2) `SCOUT-REVIEW-CONTEXT-RETRIEVAL-1-v1` GREEN (or AMBER whose owed items are explicitly non-blocking) — the scout's product review, which the Architect copies into your box with its verdict line; (3) `build (24.x)` SUCCESS on the PR head, which YOU read at ORDER A with the full forty hex. Missing any → STOP. A card is not consent.

## PREMISE

MEASURED: 2026-09-04T08:41Z, the scout's verdict on the sync card v3 — branch tip is the `head` fence, `git log -1` parents are the branch's prior tip and master's tip (both in the fence); subject is the default merge subject, no phase prefix; `-organ` untouched; PR #387 OPEN, not draft, base master, headRefOid = the head, mergeable MERGEABLE.
MEASURED: 2026-09-04T08:41Z, the scout — CI at the head, full forty hex: `build (24.x)` IN_PROGRESS since 08:40:06Z; changes, relay corpus, Vercel Preview Comments success; rule26 and report-schema in_progress; eval-canary SKIPPED, named. NOT a pass. ORDER A reads the conclusion.
MEASURED: 2026-09-04T08:12Z — thirteen non-merge subjects between master and the head all begin `PHASE-CONTEXT-RETRIEVAL-1`; exactly TWO carry `AG-4` before the colon. Lens one is NOT unanimous; land.ts resolves through lens two (`reportLaneOf`: H1 + first paragraph of `docs/relay/PHASE-CONTEXT-RETRIEVAL-1-report.md`). The class this card EXPECTS is AUTHOR-REPORT-CORROBORATED (author AG-4, lander AG-5) — as PR 488 resolved. The scout's review card ORDER B computes the expected class by hand and its verdict carries the bytes; if the scout reports that lens two does NOT resolve to exactly one lane, the Architect withdraws this card and no landing runs.
MEASURED: 2026-09-04T07:44Z, master is the `base` fence (the PR 488 merge); the scout's ls-remote at 08:41Z agrees.
DECAYS on any push to the branch or master, and on CI re-running. ORDER A re-resolves tip, base, PR state and CI live.
ON-DISAGREEMENT: if PR 387 is not open, or its HEAD is not the `head` fence, or master is not the `base` fence, or ANY non-merge commit between base and tip does not begin `PHASE-CONTEXT-RETRIEVAL-1`, or `build (24.x)` on the PR head is anything other than SUCCESS, or the lander resolves null or AG-4, or the class resolves AUTHOR-UNKNOWN / AUTHOR-CONTRADICTED / SELF-LAND — STOP and report the bytes. Every red is a STOP; there is no expected red on this branch.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| the branch tip is the synced head, a merge of master into the organ branch | MEASURED: 2026-09-04T08:41Z, scout ls-remote + `git log -1` parents | head |
| master is the PR 488 merge | MEASURED: 2026-09-04T07:44Z shared clone; 08:41Z scout ls-remote | base |
| PR #387 is open at that head, base master | MEASURED: 2026-09-04T08:41Z, scout `gh pr view 387` | head |
| every non-merge commit is phase-prefixed; lens two is load-bearing | MEASURED: 2026-09-04T08:12Z, shared clone `git log --no-merges`; ORDER A re-enumerates | commits |
| the three PRECONDITION rows are in the foreman box | NOT-READ | rows |
| `build (24.x)` SUCCESS on the PR head | NOT-READ | head |

```evidence:head
phase/context-retrieval-1, the synced head (scout ls-remote 08:41Z; PR #387 headRefOid):
    3780d665bcbff4c0c8c73296428e935d60fc5836
its parents:
    a90e7df14abd863f75c31eecf232398042eb70f4   the organ branch's prior tip
    1dceed1ceaaf970085e13463215b53134ff733a8   master
CI on that head: NOT-READ at mint (build (24.x) in_progress 08:40:06Z). Resolve tip, PR state and CI YOURSELF at ORDER A.
```

```evidence:base
origin/master, the PR 488 merge:
    1dceed1ceaaf970085e13463215b53134ff733a8
```

```evidence:commits
THE RULE: at ORDER A enumerate `git log --no-merges --format=%s <base>..<tip>` yourself. EVERY subject must begin
PHASE-CONTEXT-RETRIEVAL-1. Merge commits are EXCLUDED by the same --no-merges the author lens uses (this branch
carries several: the PR #390 merge of -organ, earlier master syncs, and today's). Thirteen non-merge subjects at
mint; the count is a floor. A NON-MERGE subject outside the phase family is a STOP.
Lens one: only two subjects carry AG-4 before the colon -> not unanimous. Lens two decides. Expected class:
AUTHOR-REPORT-CORROBORATED. Anything else -> STOP.
Paths the branch adds beyond master: api/cwf/_lib/vectorLane/**, api/cwf/_lib/groundMcp/**, scripts/** (2),
three docs/relay reports, regenerated docs/ground/facts.json, restamped public/architecture/manifest.json.
No .github/ change. No migration. Name these in your verdict.
```

```evidence:rows
Foreman box, required before ORDER B (NOT-READ at mint — the Architect files them as they arrive):
    OWNER-APPROVAL-S130-MASTER-PUSH-PR-387-1          <- owner's named approval
    SCOUT-REVIEW-CONTEXT-RETRIEVAL-1-v1               <- scout's product review, GREEN or non-blocking AMBER
```

## ORDER A0 — CONFIRM THE LANDER IS READABLE
Print your resolved landerLane and the arm you expect: author=AG-4 / lander=AG-5, class AUTHOR-REPORT-CORROBORATED (lens two), as PR 488 resolved. null → AUTHOR-UNKNOWN; AG-4 → SELF-LAND (this branch carries api/ code; the report-only exception does not apply). Either, or AUTHOR-CONTRADICTED → STOP and report the bytes lens two read.

## ORDER A — READ THE GATE
Confirm the two `rows` fence rows are in your box and the scout's verdict line is GREEN or non-blocking AMBER; if either is missing or the scout is RED, STOP. Resolve tip and origin/master by ls-remote; confirm PR 387 is OPEN, not draft, base master, HEAD equal to the tip you resolved. Apply the `commits` fence RULE with `--no-merges`. Then READ CI ON THE PR HEAD with the full forty hex (S37-2): `build (24.x)` must be SUCCESS; report every context by name, `eval-canary skipped` included. Anything other than SUCCESS on the required context → STOP.

## ORDER B — FRESH BOX READ, THEN LAND IT (S100-3 · CP-11)
Immediately before the merge, read your OWN box for a countermand of this card; if one exists, ABORT and report. Then `npm run land -- 387` under your ADF_LANE_ROLE address form, `--no-ff`, never a squash. Do NOT rebase, amend, or touch the branch contents.

## ORDER C — PROVE IT FROM THE REMOTE
`git ls-remote origin refs/heads/master` read-back; confirm the `head` fence tip is an ancestor of it (`merge-base --is-ancestor`). Confirm the landed tree equals land.ts's merge-tree rehearsal. Report the Vercel deploy state if you can read it; say UNREAD if you cannot.

## ORDER D — REPORT
File from_lane, artifact_name `LANDING-CONTEXT-RETRIEVAL-1-AG-5-report`: ORDER A0 lander and class with lens-two bytes; ORDER A readings including the full CI verdict and the `--no-merges` enumeration; the merge commit sha in full forty hex in a fence; ORDER C remote reading; deploy state or UNREAD. Production traffic is the Architect's to read from the trace after deploy; send none.

## FALSIFIER
Wrong if PR 387 is not open, its HEAD is not the `head` fence, master is not the `base` fence, a NON-MERGE commit is foreign to the phase, `build (24.x)` is not SUCCESS, either `rows` fence row is absent or the scout is RED, or the class is anything but AUTHOR-REPORT-CORROBORATED (or AUTHOR-SUBJECT, which would be stronger and is also acceptable). Any of those means the world moved between the reading and the order.

## SHARED SURFACES
One merge of an existing branch into master, one push. NO file edited, created or deleted by this card. NO migration. NO db push. NO governed row. NO CI re-run. NO production traffic. The branch is not modified.

## DECISION RIGHTS
The owner approves the master push by name (the `rows` fence). Merge authority is the foreman's own — a producer branch, not a lane landing its own record. You decide NOTHING about the code; a red is a STOP, a missing row is a STOP.

BODIES: `PLATINUM` · `S37-1` · `S37-2` · `S63-1` · `S100-3` · `TOTAL-45` · `empty ≠ zero` · CP-11 · F-S130-LENS-TWO-LOAD-BEARING-1 · OWNER-RULING-S130-CWF-FOCUS-ADF-FREEZE-1.

fanout: personalized

```deliverables
branch: none — this card merges an existing branch and writes no file
report: bus row from_lane, artifact_name LANDING-CONTEXT-RETRIEVAL-1-AG-5-report
```

TAIL ANCHOR: CARD-LANDING-CONTEXT-RETRIEVAL-1-v1 ends here.
