<!-- relay-audit: v1 kind=card -->
# CARD-CI-BOUND-RULE26-1 · v1 — raise the rule26 job's `timeout-minutes` from 10 to 20 in one commit on one branch, with the comment that carries the measurement; open the PR; read its own rule26 as the positive control

AG-4 card. Authorised by OWNER-RULING-S130-THAW-RULE26-BOUND-1 ("gevşet-rule26 onayliyorum", 12:2xZ) — a ONE-LINE thaw of OWNER-RULING-S130-CWF-FOCUS-ADF-FREEZE-1. Everything else in `.github/workflows/build-test.yml` stays frozen; you touch one key and the comment block above it, nothing more. Modelled on your own CARD-CI-BOUND-TOOL-VISIBILITY-B-1-v1 work (build bound 20→45, landed in PR #488), same discipline: the bound's old justification is falsified by measurement and the new comment carries the measurement, not a guess. This is NOT on `phase/provenance-export-1` — an AG-4-tokened commit there would make land.ts lens one `mixed` (scout, row b2b36bf3) and block that landing. It is its own branch off master.

## PREMISE

MEASURED: 2026-09-04T12:2xZ, `git show origin/master:.github/workflows/build-test.yml` at master `1af600f9…` (the `master` fence): the rule26 job begins at line 378; the R1 justification comment runs lines 392–400 and ends with "10 minutes is ~2.6x the observed max -- no healthy run can reach it"; `timeout-minutes: 10` is line 401. (Line numbers are for orientation; you edit by content, and if master has moved to the PR #465 merge by the time you read this, the block is the same and only the numbers shift.)
MEASURED: 2026-09-04, two cancels at the bound on two product heads, two different trees: `3780d665…` rule26 CANCELLED 10m16s (09:0xZ; the single re-run under CARD-RERUN-RULE26-CONTEXT-RETRIEVAL-1-v1 concluded SUCCESS at 598 s, two seconds under the ceiling) and `45edd1ad…` rule26 CANCELLED 10m20s (11:44Z, your own TRUNK-SYNC-PROVENANCE-EXPORT-1-AG-4-report). Scout step timings (row cfb7fa41): `npm ci` 86–409 s across recent rule26 runs, the gate step ~325 s. F-S130-RULE26-NPM-CI-STARVATION-1.
MEASURED: 2026-09-04T10:5xZ, land.ts line 628: any `cancelled` context blocks landing; the bound therefore costs a re-run card per product landing.
NOT-READ: whether rule26 CONCLUDES on this PR's head under the new bound (ORDER D — this PR is its own positive control, because GitHub runs the workflow file FROM the PR head).
DECAYS on any change to build-test.yml on master. ON-DISAGREEMENT: if `timeout-minutes` under the rule26 job is not `10` at your base → STOP, report the value you found.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| where the key and its comment are at master | MEASURED: 2026-09-04T12:2xZ `git show origin/master:…` | master |
| the two cancels and the 598 s pass | MEASURED: 2026-09-04 AG-4 report v3, rerun card outcome, AG-4 provenance report | cancels |
| the step-level mechanism | MEASURED: 2026-09-04T10:5xZ scout rule26 diagnosis (row cfb7fa41) | cancels |
| whether rule26 concludes under 20 on this head | NOT-READ | ci |

```evidence:master
origin/master at cut time (PR #387 merge):
    1af600f9c810c6918dd8bc20f6ac5a344556d7f7
file: .github/workflows/build-test.yml
    line 378   rule26:
    line 401   timeout-minutes: 10        <- the ONE key you change
```

```evidence:cancels
head                                       job      result      duration
3780d665bcbff4c0c8c73296428e935d60fc5836   rule26   CANCELLED   10m16s   (re-run once: SUCCESS 598 s)
45edd1ad54520674d7754757dff348c919dd61f1   rule26   CANCELLED   10m20s
mechanism: npm ci 86..409 s + gate step ~325 s inside a 600 s bound
old sizing: 28 successful runs 166..232 s, median 215 s (PHASE-RULE26-BOUNDED-1 R1)
```

```evidence:ci
NOT-READ. ORDER D reads every context at the PR head with the full forty hex; rule26 must CONCLUDE (success or failure), not cancel.
```

## ORDER A — BRANCH OFF THE SERVER'S MASTER, OWN WORKTREE
`git fetch origin`; `git ls-remote origin refs/heads/master` (fenced, forty hex — if it is no longer the `master` fence because PR #465 landed, say so; that is fine). Exclusive worktree (S98-L1): `git worktree add <path> -b phase/ci-bound-rule26-1 origin/master`. `git rev-parse HEAD` must equal the ls-remote master.

## ORDER B — THE ONE EDIT
In `.github/workflows/build-test.yml`, under the `rule26:` job only: change `timeout-minutes: 10` to `timeout-minutes: 20`, and REPLACE the R1 justification paragraph that begins "The bound is read off measured history, not guessed" and ends "under a fifth of the SHORTER of the two observed hangs." with a comment that keeps R1's history (the two apt hangs, the 30-run sample) and adds, in this shape (your words, these facts):

- the old sentence "no healthy run can reach it" is FALSIFIED BY MEASUREMENT on 2026-09-04: two cancels at the ceiling on two different trees (both full shas from the `cancels` fence), one of which passed at 598 s when re-run;
- the mechanism: `npm ci` in this job now varies 86–409 s and the gate step alone is ~325 s, so an ordinary run can exceed 600 s (F-S130-RULE26-NPM-CI-STARVATION-1);
- 20 IS A CEILING AGAINST A WEDGED RUNNER, NOT A TARGET — still well under the shorter observed apt hang (2204 s), so R1's purpose (a hang gets a verdict) is intact;
- the true cure — a cached `node_modules` for this job — is a separate, named, currently frozen ADF item; raising the ceiling does not excuse it.

`git diff --stat` must show ONE file. `git diff` must show the one key change plus comment lines only. Any other hunk → revert it. Do not touch the `build` job's bound, the `changes` job, the apt probe steps, or anything else.

## ORDER C — COMMIT, PUSH, PR
Subject: `AG-4: CI-BOUND-RULE26-1 — rule26 timeout-minutes 10 -> 20, sized from two measured cancels at the ceiling` (lane token before the first colon → AUTHOR-SUBJECT AG-4 at landing; lander AG-5 ≠ AG-4 → pass). Body: the `cancels` fence and the ruling name. ONE commit. `git push -u origin phase/ci-bound-rule26-1`; ls-remote read-back (fenced). `gh pr create --base master --head phase/ci-bound-rule26-1 --title "AG-4: CI-BOUND-RULE26-1 — rule26 timeout-minutes 10 -> 20" --body "One key, one comment. OWNER-RULING-S130-THAW-RULE26-BOUND-1 under OWNER-RULING-S130-CWF-FOCUS-ADF-FREEZE-1. F-S130-RULE26-NPM-CI-STARVATION-1. CARD-CI-BOUND-RULE26-1-v1."`. Report the number. No docs/relay report on this branch — your report goes to the bus (one file, one commit, one author).

## ORDER D — READ THE PR'S OWN rule26 AS THE POSITIVE CONTROL
The `changes` job gates rule26 on UI/e2e/migration paths; a workflow-only diff may make `changes.outputs.ui` false and SKIP rule26. Read what happened at the head with the full forty hex: if rule26 ran, it MUST conclude (success or failure — never cancelled) and you print its per-step durations; if it was SKIPPED by `changes`, say so — the positive control then happens on the next product landing and you name that. `build (24.x)` must be SUCCESS. Every context by name; eval-canary skipped named.

## ORDER E — REPORT
From_lane, artifact_name `CI-BOUND-RULE26-1-AG-4-report`: ORDER A readings; the full diff (fenced); commit sha and PR number (fenced); the CI table; rule26's step durations under the new bound or SKIPPED-BY-CHANGES; box line; `git status --porcelain -uall`, `git worktree list`.

## FALSIFIER
Wrong if more than one file or more than one key changes, if the commit carries anything but this edit, if a second commit is added, if a docs/relay file is added, if `timeout-minutes` at the base is not 10, or if a second PR is opened.

## SHARED SURFACES
One new branch, one commit, one PR. NO push to master (the landing is the foreman's under a later card with a named approval). NO other workflow change. NO migration. NO db push. NO governed row.

## DECISION RIGHTS
None. The number 20 is the owner's ruling and the measurement's; if you believe a different number is right, say so in the report and STILL commit 20.

BODIES: `PLATINUM` · `S37-2` · `S98-L1` · `S100-1` · `TOTAL-45` · `empty ≠ zero` · CLAUDE.md §5 · OWNER-RULING-S130-THAW-RULE26-BOUND-1 · OWNER-RULING-S130-CWF-FOCUS-ADF-FREEZE-1 · F-S130-RULE26-NPM-CI-STARVATION-1 · PHASE-RULE26-BOUNDED-1 (R1, R2) · CARD-CI-BOUND-TOOL-VISIBILITY-B-1-v1 (precedent).

fanout: personalized

```deliverables
branch: phase/ci-bound-rule26-1 — one commit, one file, pushed; PR open at master
report: bus row from_lane, artifact_name CI-BOUND-RULE26-1-AG-4-report
```

TAIL ANCHOR: CARD-CI-BOUND-RULE26-1-v1 ends here.
