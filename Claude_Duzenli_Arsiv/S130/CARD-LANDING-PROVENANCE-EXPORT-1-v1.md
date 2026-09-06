<!-- relay-audit: v1 kind=card -->
# CARD-LANDING-PROVENANCE-EXPORT-1 · v1 — land PR #465 (AG-2's provenance-export module, synced by AG-4) under a named owner approval; first, one measured re-run of the CANCELLED rule26 job; also collect the report you still owe

Foreman card, AG-5 (OWNER-RULING-S130-SEVEN-DISAGREEMENTS-AND-HOLD-1: the foreman is AG-5, fixed). Second product landing under OWNER-RULING-S130-CWF-FOCUS-ADF-FREEZE-1, in the owner's ruled order (the organ landed at 11:21Z; this builds on it). Same shape as the organ's landing, with the lesson of that landing already folded in: rule26 was CANCELLED at its 10-minute bound on this head too (10m20s — the second cancel in two attempts, F-S130-RULE26-NPM-CI-STARVATION-1 reproduced), and land.ts refuses on any `cancelled` context (line 628). So the order of operations is: preconditions → read the cancelled job's step timings → ONE re-run of that single job → if it concludes green, land → prove → report. AG-4's report says "rule26 is not a required context, so nothing is blocked" — that is true of GitHub's branch protection and FALSE of land.ts, which is the gate you run; do not take that sentence as a licence.

## PREMISE

MEASURED: 2026-09-04T11:50Z, TRUNK-SYNC-PROVENANCE-EXPORT-1-AG-4-report (row 5d162df1, posted 12:01:47Z): head in the `head` fence, pushed 11:33Z and read back by ls-remote; PR **465** OPEN, base master, headRefOid = head; merge commit touched only `docs/ground/facts.json` and `public/architecture/manifest.json`, both by their generators; `check:ground` GREEN after the commit, regeneration identity MATCH; CI at the full forty hex, total_count 7: `build (24.x)` SUCCESS 15m19s · `rule26` CANCELLED 10m20s · relay corpus, report-schema, changes success · Vercel Preview Comments success · eval-canary SKIPPED.
MEASURED: 2026-09-04T11:34Z, SCOUT-PREFLIGHT-TRUNK-SYNC-PROVENANCE-EXPORT-1-v1 (row b2b36bf3), installed `resolveAuthorLane` + `judgeReportOnly` on the branch: one non-merge subject `AG-2: PHASE-PROVENANCE-EXPORT-1 — …` → class **AUTHOR-SUBJECT, lane AG-2, candidates {}**; step B with lander AG-5 → PASS; lander AG-2 → REFUSE (self-land); lander null → REFUSE. Lens two is never consulted. The merge commit is `--no-merges`-invisible, so the class holds on the synced head; the scout's review card re-measures it on the real head and its verdict row is a PRECONDITION below. Carry the scout's correction: a second TOKENED non-merge commit by another lane would make lens one `mixed`, which has NO candidate-set rescue — nobody adds a commit to this branch before it lands.
MEASURED: 2026-09-04T10:53Z–11:21Z, your own organ landing: `npm run land -- 387` with `ADF_LANE_ROLE=AG-5` passed authorship, rehearsed the tree, merged, and the merge message carried the CI table; land.ts is BYTE-IDENTICAL across that landing (scout: `git diff --stat 1dceed1c 1af600f9 -- scripts/land.ts` empty), so the gate you run now is the gate that ran then.
NOT-READ: which rule26 step consumed the 10m20s on THIS head (ORDER B reads it). NOT-READ: whether rule26 passes when re-run. NOT-READ: the two precondition rows at the time you read this (ORDER A).
DECAYS on any push to the branch or to master. ON-DISAGREEMENT: head ≠ `head` fence, or PR #465 not OPEN at that head, or rule26's conclusion at ORDER B not `cancelled` — read what it is: `success` → skip ORDER C, go to ORDER D; `failure` → STOP, report.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| the head, PR #465, and its CI table | MEASURED: 2026-09-04T11:50Z AG-4 report, full forty hex | head |
| authorship class and step B outcome per lander | MEASURED: 2026-09-04T11:34Z scout preflight, installed functions | authorship |
| the two rows that must exist before you land | NOT-READ (ORDER A reads them by artifact_name) | rows |
| which step ate the 10m20s | NOT-READ | rule26 |
| whether rule26 passes on re-run | NOT-READ | rule26 |
| the landed master sha and deploy | NOT-READ | landing |

```evidence:head
phase/provenance-export-1, PR #465 (OPEN, base master), synced head:
    45edd1ad54520674d7754757dff348c919dd61f1
master at cut time (PR #387 merge, base of the sync):
    1af600f9c810c6918dd8bc20f6ac5a344556d7f7
CI at the head (AG-4, 11:50Z, total_count 7):
    build (24.x) SUCCESS 15m19s   rule26 CANCELLED 10m20s   eval-canary SKIPPED   relay corpus / report-schema / changes / Vercel Preview Comments success
```

```evidence:authorship
resolver on base..head, --no-merges: cls=AUTHOR-SUBJECT lane=AG-2 candidates={}
step B: lander AG-5 -> PASS ; lander AG-2 -> REFUSE SELF-LAND ; lander null -> REFUSE
run with: ADF_LANE_ROLE=AG-5
```

```evidence:rows
PRECONDITION 1  direction to_lane, lane_addr AG-5, artifact_name OWNER-APPROVAL-S130-MASTER-PUSH-PR-465-1
                body names PR 465 and the head sha above; posted by the Architect on the owner's word
PRECONDITION 2  direction from_lane, artifact_name SCOUT-REVIEW-PROVENANCE-EXPORT-1-v1
                first line VERDICT: GREEN or AMBER (RED = STOP); last line names AUTHOR-SUBJECT AG-2, lander AG-5 -> PASS
both rows must be NEWER than this card's created_at, or absent -> WAIT (S74-3: name what you wait for and the last row you saw; no silent sleep)
```

```evidence:rule26
NOT-READ. ORDER B reads the cancelled job's per-step durations; ORDER C re-runs it once and reads them again.
```

```evidence:landing
NOT-READ. ORDER E prints the merge sha, ls-remote read-back, tree = rehearsal, deploy state or UNREAD.
```

## ORDER A — PRECONDITIONS (S47-1)
Fresh box read. Both rows in the `rows` fence must be present and newer than this card. Print each row's id (full), created_at, artifact_name, and the verdict line of the scout row. If either is absent: WAIT per S74-3, re-read at a named interval (5 min), and say in your tick which row you are waiting for and the newest row you saw. Scout RED → STOP, report. Do not land on this card's word alone; the approval row is the owner's consent (S102-YASA-1) and the scout row is the review.

## ORDER B — READ THE CANCELLED rule26 JOB BEFORE TOUCHING IT
`gh run list --commit 45edd1ad54520674d7754757dff348c919dd61f1 --workflow build-test.yml --json databaseId,status,conclusion,createdAt` → the run id. `gh run view <run-id> --json jobs` → the rule26 job id and its steps with `startedAt`/`completedAt`/`conclusion`. Print every step's duration and name which step was running when the bound fired (on the organ head it was the gate step, starved by an `npm ci` of 86–409 s). This is the diagnosis; it goes in the report whether or not the re-run passes.

## ORDER C — RE-RUN THAT ONE JOB, ONCE
`gh run rerun <run-id> --job <rule26-job-id>` (the single job — `build (24.x)`'s 15-minute SUCCESS is not spent again). Poll `gh run view <run-id> --json jobs` at a named interval until the rule26 job reaches a CONCLUSION (bound: 10 min + queue). Print the per-step durations again. S55-1 honoured: this is the first measurement of a job that never concluded on this head, not a retry of a diagnosed failure. Exactly one re-run; a second cancel or a failure is a STOP and a measurement — file the report, the Architect owns the next card.

## ORDER D — LAND
Only when every context at the head is green or skipped (re-read ALL check-runs with the full forty hex; print every context by name; eval-canary skipped named). Then, in your foreman worktree on a fresh `git fetch origin`: `ADF_LANE_ROLE=AG-5 npm run land -- 465`. land.ts does the rest (authorship, tree rehearsal, CI read, merge, push). If land.ts refuses: print the class and the first refusing line verbatim, STOP, report.

## ORDER E — PROVE
`git ls-remote origin refs/heads/master` (full forty hex, fenced); `git rev-parse origin/master^{tree}` against the rehearsed tree land.ts printed; Vercel production state for the new master sha if readable, else UNREAD. `git status --porcelain -uall` and `git worktree list`.

## ORDER F — TWO REPORTS
1. From_lane, artifact_name `LANDING-PROVENANCE-EXPORT-1-AG-5-report`: ORDER A rows; ORDER B step timings; ORDER C outcome and timings; the full check-run table; the landing (merge sha fenced, read-back, tree = rehearsal, deploy) or the STOP with land.ts's class.
2. From_lane, artifact_name `LANDING-CONTEXT-RETRIEVAL-1-AG-5-report` — STILL OWED from CARD-RERUN-RULE26-CONTEXT-RETRIEVAL-1-v1 ORDER D (row 4681f15f) and from CARD-LANDING-CONTEXT-RETRIEVAL-1-v2 ORDER D (row 9db62588). PR #387 landed at 11:21Z as master `1af600f9…`; the report is the record of HOW. If it was posted between this card's cut and your read, say so with its row id and skip.

## FALSIFIER
Wrong if the head is not the `head` fence, if PR #465 is not OPEN at that head, if either precondition row is missing or older than this card, if more than one rule26 re-run is issued, if land.ts's resolver returns a class other than AUTHOR-SUBJECT / lane AG-2, or if the landed tree differs from the rehearsed tree.

## SHARED SURFACES
One GitHub Actions job re-run. One merge to master by land.ts, one push. NO file edited. NO bound change (ADF, frozen). NO migration. NO db push. NO governed row. NO second PR.

## DECISION RIGHTS
You decide nothing about bounds or the workflow. You re-run one job because its verdict is UNMEASURED and the gate needs a verdict; you land only if every context concludes green or skipped, only with both precondition rows present, and only via land.ts.

BODIES: `S37-2` · `S47-1` · `S55-1` · `S63-1` · `S74-3` · `S102-YASA-1` · `S102-YASA-3` · `TOTAL-45` · `empty ≠ zero` · CP-11 · OWNER-RULING-S130-CWF-FOCUS-ADF-FREEZE-1 · OWNER-RULING-S130-SEVEN-DISAGREEMENTS-AND-HOLD-1 · F-S130-RULE26-NPM-CI-STARVATION-1 · LENS-AUTHOR-SET-1.

fanout: personalized

```deliverables
master: PR #465 merged by land.ts, one push, proven by ls-remote read-back
report: bus row from_lane, artifact_name LANDING-PROVENANCE-EXPORT-1-AG-5-report
report: bus row from_lane, artifact_name LANDING-CONTEXT-RETRIEVAL-1-AG-5-report (owed)
```

TAIL ANCHOR: CARD-LANDING-PROVENANCE-EXPORT-1-v1 ends here.
