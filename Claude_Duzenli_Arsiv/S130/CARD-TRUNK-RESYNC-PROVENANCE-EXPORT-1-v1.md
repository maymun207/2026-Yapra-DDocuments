<!-- relay-audit: v1 kind=card -->
# CARD-TRUNK-RESYNC-PROVENANCE-EXPORT-1 · v1 — merge the post-#491 master into phase/provenance-export-1 so its rule26 runs under the 20-minute bound; one merge commit, no generator expected to move; read CI

AG-4 card. PR #491 (your one-line rule26 bound change) LANDED at 12:58:34Z — master is the `base` fence and carries `timeout-minutes: 20` for rule26. PR #465 (`phase/provenance-export-1`, AG-2's module, which you synced at 11:33Z) is still OPEN at the `branch` fence, and its own rule26 CANCELLED at 10m20s under the OLD bound. GitHub runs the workflow FROM THE PR HEAD, so #465 cannot benefit from #491 until master is merged into it. That merge is this card: one commit, one push, and the branch's next CI run becomes the first real measurement of the 20-minute bound — the positive control your #491 report named as owed. The foreman's re-run path for #465 (CARD-LANDING-PROVENANCE-EXPORT-1-v2) is WITHDRAWN by notice in the same minute as this card, so nobody re-runs the old-bound job while you move the head.

## PREMISE

MEASURED: 2026-09-04T12:58:34Z, Vercel production `dpl_2f5BhDH9…` READY, master = the PR #491 merge (`base` fence); land.ts's merge message: `paths: 1 changed`, build success, rule26 skipped (by `changes`), eval-canary skipped.
MEASURED: 2026-09-04T11:33Z (your TRUNK-SYNC-PROVENANCE-EXPORT-1-AG-4-report) and 12:20Z (scout review 3316edf6): branch head in the `branch` fence; base..head = ONE non-merge subject (AG-2's), two generated files regenerated in your merge commit, `check:ground` GREEN, authorship AUTHOR-SUBJECT AG-2.
MEASURED: master moved from `1af600f9…` to the `base` fence by EXACTLY ONE merge whose only path is `.github/workflows/build-test.yml` (land.ts message: 1 changed). Your branch does not touch that file. Therefore the merge is expected to be CONFLICT-FREE and to move NO generated file: facts.json and manifest.json are derived from the source tree and the workflow file is not in their inputs — but you do not assume this, you MEASURE it (ORDER B: run both generators; expect `git status --porcelain` clean for both paths; if either moves, commit the regenerated file and say why in the report).
NOT-READ: CI at the new head. NOT-READ: rule26's duration under 20 — this is THE measurement of the day.
DECAYS on any push to the branch or master. ON-DISAGREEMENT: tip ≠ fences, or any conflicting path at all → STOP, `git merge --abort`, report bytes.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| master is the PR #491 merge with the new bound | MEASURED: 2026-09-04T12:58:34Z Vercel production meta | base |
| the branch head and its one authored commit | MEASURED: 2026-09-04T11:33Z your report; 12:20Z scout review | branch |
| the merge is conflict-free and moves no generated file | EXPECTED (reasoned from master's 1-path diff) — MEASURED by ORDER B | merge |
| CI at the new head, rule26 duration under 20 | NOT-READ | ci |

```evidence:base
origin/master, the PR #491 merge (12:58:34Z, production READY):
    bb653734552ec9abc4457109b100e877797d6c36
```

```evidence:branch
phase/provenance-export-1, PR #465, current head (your 11:33Z merge commit):
    45edd1ad54520674d7754757dff348c919dd61f1
one non-merge subject in base..head:  AG-2: PHASE-PROVENANCE-EXPORT-1 — the turn's attribution evidence becomes a file, and the join is declared unavailable
```

```evidence:merge
git merge --no-ff origin/master              expected: clean, no CONFLICT line
git diff --name-only --diff-filter=U         expected: empty
npm run gen:arch-facts ; npm run reseal      expected: git status --porcelain -- docs/ground/facts.json public/architecture/manifest.json  -> empty
git commit --no-edit                         (only if the merge did not auto-commit; default subject, no phase prefix)
npm run check:ground                         AFTER the commit; must be GREEN
```

```evidence:ci
NOT-READ. ORDER D: every context at the new head with the full forty hex; rule26 MUST run this time (the branch touches UI/api paths) and its per-step durations are the positive control of the 20-minute bound.
```

## ORDER A — TIPS FROM THE SERVER, YOUR EXISTING WORKTREE
`git fetch origin`; `git ls-remote origin refs/heads/master refs/heads/phase/provenance-export-1` — both must equal their fences. Use your `wt-prov` worktree (already at the `branch` fence); `git status --porcelain -uall` must be empty first.

## ORDER B — MERGE; PROVE NOTHING MOVED
Exactly the `merge` fence. Print: the merge output, the unmerged-path list (expected empty), both generator outputs, the porcelain status for the two generated paths, `check:ground` output after the commit. If a generated file DID move: `git add` it, `git commit --amend --no-edit` is FORBIDDEN (S37-1 — amend rewrites the merge); instead leave the merge commit as is and make NO second commit — STOP and report the diff; the Architect decides (a moved generated file here would contradict the premise and is worth a look before it lands).

## ORDER C — PUSH; CONFIRM THE PR FOLLOWED
`git push origin phase/provenance-export-1`; ls-remote read-back (forty hex, fenced). `gh pr view 465 --json number,state,headRefOid` → state OPEN, headRefOid = the pushed tip. No new PR.

## ORDER D — READ CI; THE rule26 DURATION IS THE POINT
Wait for conclusions at the new head; ask with the full forty hex; print EVERY context with durations. For rule26: `gh run view <run-id> --json jobs` → per-step durations (`npm ci`, Playwright install/probe, the gate step). This is the first measurement of the 20-minute bound on a real product head; report it as such whether it passes, fails, or cancels. `build (24.x)` RED → STOP, failing tests verbatim. rule26 CANCELLED under 20 → STOP; that would falsify today's ruling and the Architect needs the bytes.

## ORDER E — REPORT
From_lane, artifact_name `TRUNK-RESYNC-PROVENANCE-EXPORT-1-AG-4-report`: ORDER A readings; merge output; generator/porcelain proof; `check:ground`; new head (fenced, forty hex); PR #465 state; the full CI table with rule26 step timings; box line; hygiene.

## FALSIFIER
Wrong if either tip differs from its fence, if any path conflicts, if any authored file changes, if a second commit is added, if a second PR is opened, or if `check:ground` fails after the commit.

## SHARED SURFACES
One merge commit on AG-2's branch, one push. NO push to master. NO hand edit. NO migration. NO db push. NO governed row. NO docs/relay file on this branch (your report goes to the bus).

## DECISION RIGHTS
None. A moved generated file, a conflict, a red build, or a cancelled rule26 → STOP with bytes. The landing is the foreman's under CARD-LANDING-PROVENANCE-EXPORT-1-v3, cut after your report names the new head.

BODIES: `S37-1` · `S37-2` · `S61-1` · `S63-1` · `S98-L1` · `S100-1` · `TOTAL-45` · `empty ≠ zero` · CLAUDE.md §5 · OWNER-RULING-S130-CWF-FOCUS-ADF-FREEZE-1 · OWNER-RULING-S130-THAW-RULE26-BOUND-1 · F-S130-RULE26-NPM-CI-STARVATION-1 · F-S130-CHECK-GROUND-ANCESTRY-PRECOMMIT-1.

fanout: personalized

```deliverables
branch: phase/provenance-export-1 — one merge commit (master with the 20-minute rule26 bound), pushed; PR #465 at the new head
report: bus row from_lane, artifact_name TRUNK-RESYNC-PROVENANCE-EXPORT-1-AG-4-report (with rule26 step timings under 20)
```

TAIL ANCHOR: CARD-TRUNK-RESYNC-PROVENANCE-EXPORT-1-v1 ends here.
