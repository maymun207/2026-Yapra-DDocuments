<!-- relay-audit: v1 kind=card -->
# CARD-LANDING-TOOL-VISIBILITY-B-1 · v3 — land PR #488, the first product code since 30 August, on a green required context

Supersedes v2 (S37-1), which the scout returned GREEN on 2026-09-03. v3 exists because the world moved in three measured ways since v2 was cut: the base moved (PR 489 landed), the branch gained a trunk-sync MERGE commit and a workflow-bound commit, and the three `authorityMatrix` reds v2 had to exempt are GONE — so v2's base-moved arm, its literal "every commit begins PHASE-TOOL-VISIBILITY-1" rule, and its `expected-red` fence would each fire on a branch that is now simply green. This card describes the branch by rules that survive those facts. It is the FOREMAN's card; a producer never merges its own work.

**PRECONDITION — THIS CARD DOES NOT AUTHORISE A MERGE ON ITS OWN.** The named owner approval is `OWNER-APPROVAL-S129-MASTER-PUSH-PR-488-1` (in your box, 2026-09-03T13:18:26Z). The HOLD that stood over this landing, `HOLD-S129-LANDING-488-PENDING-AUTHORITY-INVESTIGATION-1`, was LIFTED by the owner's ruling, filed to your box as `RELEASE-HOLD-S129-LANDING-488-OWNER-RULING-S130-1` (2026-09-04T05:22:20Z) with the full ruling `OWNER-RULING-S130-SEVEN-DISAGREEMENTS-AND-HOLD-1` beside it. CONFIRM all three rows are in your box before ORDER B. If any is missing, STOP: a card is not consent, and a card is not a release.

## PREMISE

MEASURED: 2026-09-04T06:02Z, AG-4's report `CI-BOUND-TOOL-VISIBILITY-B-1-AG-4-report` on the bus — branch tip in the `head` fence; `build (24.x)` SUCCESS in 18m17s on the full suite (701/701 files, 10239 passed, 4 expected-fail); rule26, relay corpus, report-schema, changes, Vercel all success; eval-canary SKIPPED and named.
MEASURED: 2026-09-04T05:41Z, the scout's verdict on the CI-bound card — from CI's own annotations, the three `authorityMatrix` AssertionErrors present on the pre-sync head are ABSENT on the synced head. The repo-wide blocker is cleared by CI's bytes, not by a lane's word.
MEASURED: 2026-09-04T04:37Z, the foreman's own ORDER C on PR 489 — master is the value in the `base` fence. Two later lenses (the shared clone's remote-tracking ref; the scout's ls-remote at 05:41Z) agree.
MEASURED: 2026-09-04T04:4xZ, `scripts/land.ts` ORDER B enumerates authorship subjects with `git log --no-merges`; a `Merge …` commit is not authorship and is invisible to the author lens. The commit rule below is written to the same lens.
DECAYS on any push to the branch or master, and on CI re-running. ORDER A re-resolves tip, base, PR state and CI live.
ON-DISAGREEMENT: if PR 488 is not open, or its HEAD is not the `head` fence value, or master is not the `base` fence value, or ANY non-merge commit between base and tip does not begin `PHASE-TOOL-VISIBILITY-1`, or `build (24.x)` on the PR HEAD is anything other than SUCCESS, or your ORDER A0 lander resolves null or AG-4 — STOP and report. There is no expected red on this branch any more; every red is a STOP.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| the branch tip is the synced, bound-lifted head and its required context is SUCCESS | MEASURED: 2026-09-04T06:02Z, AG-4's ORDER B read-back and ORDER C CI reading with the full forty hex | head |
| master is the PR 489 merge and is the base this branch now sits on | MEASURED: 2026-09-04T04:37Z foreman ORDER C; 05:41Z scout ls-remote | base |
| the three authorityMatrix reds are gone on this branch | MEASURED: 2026-09-04T05:41Z, the scout's annotation reading on the synced head; 06:02Z the full-suite SUCCESS | — |
| the branch carries exactly three non-merge commits beyond v2's enumeration, all phase-prefixed, plus one merge commit | MEASURED: 2026-09-04T06:02Z, AG-4's reports for the trunk sync and the bound; ORDER A re-enumerates live | commits |
| the owner approval, the HOLD release and the ruling are in the foreman box | MEASURED: 2026-09-04T05:24Z, the three rows' created_at on the bus | rows |
| whether PR 488 is open and green at the moment you merge | NOT-READ | head |

```evidence:head
phase/tool-visibility-b-1, AG-4's ls-remote read-back after the bound commit:
    cde0237d9eaf2093b1e0eb622fff86dea5fb05fc
CI on that head, full forty hex, per AG-4's ORDER C:
    build (24.x)   SUCCESS   18m17s   05:41:11 -> 05:59:28
    Test Files  701 passed (701)   Tests  10239 passed | 4 expected fail (10243)
Resolve tip, PR state and CI YOURSELF at ORDER A.
```

```evidence:base
origin/master, the PR 489 merge, three lenses agreeing:
    f1b18f60b0aeddba65c73854639a13b6ccf2da50
```

```evidence:commits
Since v2's enumeration (which ended at the RULE 16 legibility commit), the branch gained:
    7a0f26d605fadac9368eac320b3495051f1badcc   Merge remote-tracking branch 'origin/master' into phase/tool-visibility-b-1   <- MERGE, not authorship
    cde0237d9eaf2093b1e0eb622fff86dea5fb05fc   PHASE-TOOL-VISIBILITY-1 AG-4: <the bound commit>                             <- phase-prefixed
THE RULE, so this fence does not go stale: at ORDER A, enumerate `git log --no-merges --format=%s <base>..<tip>` yourself.
EVERY subject must begin PHASE-TOOL-VISIBILITY-1. Merge commits are EXCLUDED from the rule, by the same
`--no-merges` the landing gate's author lens uses: merging master into a branch is required by CLAUDE.md §5
and is not an act of authorship. The count is a floor, not a ceiling. A NON-MERGE subject outside the phase
family is a STOP: foreign work this card does not authorise landing.
The branch also changes ONE workflow file, .github/workflows/build-test.yml: the build job's timeout-minutes
20 -> 45 and its comment, nothing else; the eval-canary FROZEN block is byte-identical. Named here so the
landing verdict names it too.
```

```evidence:rows
Foreman box, all three present at 2026-09-04T05:24Z:
    OWNER-APPROVAL-S129-MASTER-PUSH-PR-488-1                     2026-09-03 13:18:26Z
    RELEASE-HOLD-S129-LANDING-488-OWNER-RULING-S130-1            2026-09-04 05:22:20Z
    OWNER-RULING-S130-SEVEN-DISAGREEMENTS-AND-HOLD-1             2026-09-04 05:24:34Z
```

## ORDER A0 — CONFIRM THE LANDER IS READABLE
Print your resolved landerLane and the arm you expect: author=AG-4 / lander=AG-5, class AUTHOR-SUBJECT, exactly as PR 489 resolved. null → AUTHOR-UNKNOWN; AG-4 → SELF-LAND (this branch carries src/, api/, .github/ — the report-only exception does not apply). Either → STOP and report.

## ORDER A — READ THE GATE
Confirm the three `rows` fence rows are in your box; if any is missing, STOP. Resolve tip and origin/master by ls-remote; confirm PR 488 is OPEN, not draft, base master, HEAD equal to the tip you resolved. Apply the `commits` fence RULE with `--no-merges`. Then READ CI ON THE PR HEAD with the full forty hex (S37-2): `build (24.x)` must be SUCCESS; report every context by name, `eval-canary skipped` included. Anything other than SUCCESS on the required context → STOP.

## ORDER B — FRESH BOX READ, THEN LAND IT (S100-3 · CP-11)
Immediately before the merge, read your OWN box for a countermand of this card; if one exists, ABORT and report. Then land it exactly as you landed PR 489: `npm run land -- 488` under your ADF_LANE_ROLE address form, `--no-ff`, never a squash — the branch's commits carry their own reasoning, including AG-4's own record of a measuring defect and the bound commit's falsified-sentence history. Do NOT rebase, amend, or touch the branch contents.

## ORDER C — PROVE IT FROM THE REMOTE
Read `git ls-remote origin refs/heads/master` back; confirm the tip in the `head` fence is an ancestor of it (`merge-base --is-ancestor`). Confirm the landed tree equals land.ts's merge-tree rehearsal. Report the deploy state if you can read it; say UNREAD if you cannot.

## ORDER D — REPORT
File from_lane, artifact_name `LANDING-TOOL-VISIBILITY-B-1-AG-5-report`, carrying the ORDER A0 lander confirm, the ORDER A readings including the full CI verdict and the `--no-merges` enumeration, the merge commit sha in full forty hex in a fence, the ORDER C remote reading, and the deploy state or UNREAD. The live production turn the build card's ORDER D requires is the Architect's to read from the trace once the deploy is live; do not send production traffic.

## FALSIFIER
Wrong if PR 488 is not open, its HEAD is not the `head` fence value, master is not the `base` fence value, a NON-MERGE commit is foreign to the phase, `build (24.x)` is not SUCCESS, any of the three `rows` fence rows is absent, or the lander resolves null or AG-4. Any of those means the world moved between the reading and the order.

## SHARED SURFACES
One merge of an existing branch into master, one push. NO file edited, created or deleted by this card. NO migration. NO db push. NO governed row. NO CI re-run. NO production traffic. The branch is not modified.

## DECISION RIGHTS
The owner approved the phase and the master push by name, and lifted the HOLD by name. Merge authority is the foreman's own — a producer branch, not a lane landing its own record. You decide NOTHING about the code or the workflow change; a red is a STOP, a missing row is a STOP.

BODIES: `PLATINUM` · `S37-1` · `S37-2` · `S63-1` · `S100-3` · `TOTAL-45` · `empty ≠ zero` · CP-11.

fanout: personalized

```deliverables
branch: none — this card merges an existing branch and writes no file
report: bus row from_lane, artifact_name LANDING-TOOL-VISIBILITY-B-1-AG-5-report
```

TAIL ANCHOR: CARD-LANDING-TOOL-VISIBILITY-B-1-v3 ends here.
