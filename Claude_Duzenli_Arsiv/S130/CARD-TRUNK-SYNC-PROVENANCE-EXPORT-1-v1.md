<!-- relay-audit: v1 kind=card -->
# CARD-TRUNK-SYNC-PROVENANCE-EXPORT-1 · v1 — merge the new master into phase/provenance-export-1 (AG-2's one-commit product branch), regenerate the two generated files, run the heavy suite

Second product item under OWNER-RULING-S130-CWF-FOCUS-ADF-FREEZE-1, in the owner's ruled order (finish one, normalise, build the next on top — the organ landed at 11:21Z, master is the `base` fence). `phase/provenance-export-1` is AG-2's: ONE non-merge commit, subject `AG-2: PHASE-PROVENANCE-EXPORT-1 — …` (lane token before the colon → land.ts lens one resolves AG-2 → AUTHOR-SUBJECT; lander AG-5 ≠ AG-2 → pass; no candidate-set path needed). AG-2 is dead (heartbeat 2026-08-29). You, AG-4, sync it: merging master is not authorship (`--no-merges`), and the two files you regenerate are generated, not authored. **You land nothing, edit no authored file, add no report of your own to the branch** — a second lane's report would put a second lane into lens two and turn a clean AUTHOR-SUBJECT into a candidate-set case for no reason.

## PREMISE

MEASURED: 2026-09-04T11:21Z, Vercel production deployment for master (`dpl_2ffgufEx…`, READY): master is the PR #387 merge in the `base` fence. The shared clone's `origin/master` is STALE (last fetched before the landing) — ORDER A resolves from the server.
MEASURED: 2026-09-04T11:26Z, shared clone: branch tip in the `branch` fence; one non-merge subject; files: `api/cwf/_lib/observability/turnProvenanceExport.ts`, `api/cwf/__tests__/turnProvenanceExport.test.ts`, `docs/relay/PHASE-PROVENANCE-EXPORT-1-AG2-report.md`, `public/architecture/manifest.json`. Report H1 `# PHASE-PROVENANCE-EXPORT-1-AG2-report`, first paragraph opens `Lane AG-2, producer.`
MEASURED: 2026-09-04T11:26Z, three-argument `git merge-tree` against the clone's (stale) origin/master, read with the `changed in both` lens (the grep-anchor lens is BLIND — F-S130-MERGE-REHEARSAL-GREP-ANCHOR-BLIND-1): exactly one path changed in both — `public/architecture/manifest.json`. Against the REAL master (which also regenerated `docs/ground/facts.json` at the organ landing) the merge may ALSO conflict on `facts.json`; both are generated and both have the remedy below. Any THIRD path → STOP.
MEASURED: 2026-09-04T08:2xZ (scout) and 08:3xZ (AG-4, TRUNK-SYNC-CONTEXT-RETRIEVAL-1-AG-4-report-v3): `gen:arch-facts` overwrites an unparseable facts.json; `reseal` needs parseable input (bare JSON.parse in docDriftCore.ts:115–117) and converges to identical bytes from either side (sha256-equal runs from `--ours` and `--theirs`). `check:ground` regenerates facts at HEAD and compares, and requires stamp.commit to be an ancestor of HEAD; it is GREEN only AFTER the merge commit exists (AG-4 report v3 `ground` fence) — run it after `git commit`, not before.
DECAYS on any push to the branch or master. ON-DISAGREEMENT: tip ≠ `branch` fence, master ≠ `base` fence, or a conflicting path outside {facts.json, manifest.json} → STOP, `git merge --abort`, report bytes.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| master is the PR #387 merge | MEASURED: 2026-09-04T11:21Z Vercel production deployment meta (githubCommitSha, READY) | base |
| the branch tip and its one authored commit | MEASURED: 2026-09-04T11:26Z shared clone | branch |
| the conflict set is generated files only | MEASURED: 2026-09-04T11:26Z merge-tree changed-in-both lens (manifest.json); facts.json possible against the real master, same remedy | conflicts |
| the remedy converges regardless of restored side | MEASURED: 2026-09-04T08:3xZ AG-4 report v3, sha256-equal reseal runs | remedy |
| whether the heavy suite is green on the synced head | NOT-READ | ci |
| whether a pull request exists for this branch | NOT-READ | ci |

```evidence:base
origin/master, the PR #387 merge (Vercel dpl_2ffgufEx…, READY, 11:21:06Z):
    1af600f9c810c6918dd8bc20f6ac5a344556d7f7
```

```evidence:branch
phase/provenance-export-1 (shared clone remote-tracking ref, 11:26Z):
    388671734f7927922cf37a4cbb172e83ee276f6a
one non-merge subject:  AG-2: PHASE-PROVENANCE-EXPORT-1 — the turn's attribution evidence becomes a file, and the join is declared unavailable
```

```evidence:conflicts
expected: public/architecture/manifest.json   (measured changed-in-both)
possible: docs/ground/facts.json               (master regenerated it at the organ landing; the branch adds a module)
any other path -> STOP
```

```evidence:remedy
after `git merge --no-ff origin/master` stops:
    git diff --name-only --diff-filter=U            (must be a subset of the two paths above)
    npm run gen:arch-facts                          (rewrites docs/ground/facts.json from the merged tree; run even if not conflicted — the branch adds a module)
    git checkout --ours -- public/architecture/manifest.json   (only if conflicted; parseable input for reseal)
    npm run reseal                                  (restamps every tab from the working tree)
    git add docs/ground/facts.json public/architecture/manifest.json
    git commit --no-edit                            (default merge subject, no phase prefix)
    npm run check:ground                            (AFTER the commit; must pass — ancestry arm)
```

```evidence:ci
NOT-READ. ORDER D reads the synced head with the FULL forty hex; total_count=0 is ALWAYS FAILED.
```

## ORDER A — TIPS FROM THE SERVER, OWN WORKTREE
Exclusive worktree (S98-L1). `git fetch origin`; `git ls-remote origin refs/heads/master refs/heads/phase/provenance-export-1`; confirm both fences; `git checkout -B phase/provenance-export-1 origin/phase/provenance-export-1`; `git rev-parse HEAD` must equal the `branch` fence. Mismatch → ON-DISAGREEMENT.

## ORDER B — MERGE; REGENERATE; PROVE
Exactly the `remedy` fence. Print: the conflicting-path list, both generator outputs, reseal digest lines, `git status --porcelain` before the commit, `check:ground` output after it. If `check:ground` fails → STOP, report verbatim (do not amend, do not retry).

## ORDER C — PUSH; FIND THE PR BY HEAD REF
`git push origin phase/provenance-export-1`; ls-remote read-back (full forty hex, fenced). `gh pr list --head phase/provenance-export-1 --state all --json number,state,headRefOid,baseRefName`. If an OPEN PR exists, confirm its head is the pushed tip and report the number. If none: `gh pr create --base master --head phase/provenance-export-1 --title "AG-2: PHASE-PROVENANCE-EXPORT-1 — the turn's attribution evidence becomes a file" --body "See docs/relay/PHASE-PROVENANCE-EXPORT-1-AG2-report.md. Synced with master by AG-4 under CARD-TRUNK-SYNC-PROVENANCE-EXPORT-1-v1."` and report the number. Opening a PR is not landing.

## ORDER D — READ THE HEAVY SUITE
`build (24.x)` under 45 min; `rule26` under its 10-min bound (KNOWN RISK: F-S130-RULE26-NPM-CI-STARVATION-1 — npm ci 86–409 s starves a ~325 s gate; a rule26 CANCEL here is a measurement, not your defect). Wait for conclusions; ask with the full forty hex; report EVERY context, `eval-canary skipped` named. RED in `build (24.x)` → STOP, failing tests verbatim.

## ORDER E — REPORT
From_lane, artifact_name `TRUNK-SYNC-PROVENANCE-EXPORT-1-AG-4-report`: ORDER A readings; conflict list; generator outputs; merge sha (fenced, forty hex); PR number and head; full CI table; box line; `git worktree list`, `git status --porcelain -uall`.

## FALSIFIER
Wrong if either tip differs from its fence, the conflict set has a third path, any authored file is edited, a side of facts.json is picked instead of regenerated, manifest.json is committed without a post-restore reseal, `check:ground` fails after the commit, a second PR is opened when one exists, or any report of YOURS is added to this branch.

## SHARED SURFACES
One merge commit (with the two regenerated files) on AG-2's branch; one push; at most one PR opened. NO push to master. NO hand edit. NO migration. NO db push. NO governed row. NO new docs/relay file on this branch (your report goes to the BUS only).

## DECISION RIGHTS
None beyond running the named generators. Third conflicting path, failing check:ground, red suite → STOP. Landing is the foreman's under a later card, after a scout review.

BODIES: `PLATINUM` · `S37-2` · `S61-1` · `S63-1` · `S98-L1` · `S100-1` · `TOTAL-45` · `empty ≠ zero` · CLAUDE.md §5 · OWNER-RULING-S130-CWF-FOCUS-ADF-FREEZE-1 · F-S130-MERGE-REHEARSAL-GREP-ANCHOR-BLIND-1 · F-S130-RULE26-NPM-CI-STARVATION-1.

fanout: personalized

```deliverables
branch: phase/provenance-export-1 — one merge commit carrying regenerated facts.json + restamped manifest.json, pushed; PR open at the new head
report: bus row from_lane, artifact_name TRUNK-SYNC-PROVENANCE-EXPORT-1-AG-4-report
```

TAIL ANCHOR: CARD-TRUNK-SYNC-PROVENANCE-EXPORT-1-v1 ends here.
