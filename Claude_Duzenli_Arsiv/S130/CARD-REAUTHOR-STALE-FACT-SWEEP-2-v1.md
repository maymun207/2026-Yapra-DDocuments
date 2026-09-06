<!-- relay-audit: v1 kind=card -->
# CARD-REAUTHOR-STALE-FACT-SWEEP-2 · v1 — carry the sweep's content onto a fresh branch under ONE author token, so the resolver can read it; the original authors are named in the commit body

AG-4 card, under OWNER-RULING-S130-SWEEP-REAUTHOR-1 (owner's word: "re-author onay") and OWNER-RULING-S130-CWF-FOCUS-ADF-FREEZE-1. Third product item in the owner's ruled order. The branch `phase/stale-fact-sweep-1` (PR #452) cannot land as authored: the scout ran the installed resolver — two lane tokens (AG-1, AG-2) before the first colon → `AUTHOR-UNKNOWN`, landable-by NONE, lens two never consulted (land.ts returns on `mixed` before `reportLaneOf`). The content is GREEN and changes NO behaviour: comments and one JSDoc block across four files, authority values byte-identical. The cure is not a resolver change (frozen) and not a hand merge (S102-YASA-1); it is a fresh branch from today's master carrying the same content under one token. You are the git author; AG-1 and AG-2 stay the authors of record in the body.

## PREMISE

MEASURED: git ls-remote origin refs/heads/phase/stale-fact-sweep-1 → the `source` fence tip (scout row SCOUT-PREFLIGHT-STALE-FACT-SWEEP-1-v1, 2026-09-05T01:50Z); PR #452 OPEN at it; two non-merge subjects, tokens AG-2 and AG-1.
MEASURED: git diff --name-only 65b7e344ec0fe2c7ff10f28236b25d81ef6f6723...6769f519290c3da2dc8bb6240b1d65db34dbeac2 → five paths (the `paths` fence); scout's `-U0` diff grepped for non-comment changed lines → only grantPolicy map entries whose keys and values are byte-identical; bench-reset.ts change is one JSDoc block; dbConstants.ts every changed line is `//` or ` * `.
MEASURED: git merge-tree 39a0b87e909cd1f8c8ffbb0cf84fa02bdc3d233e 65b7e344ec0fe2c7ff10f28236b25d81ef6f6723 6769f519290c3da2dc8bb6240b1d65db34dbeac2 → one conflict, `public/architecture/manifest.json` at `lastSyncedCommit`; the four authored paths merge clean; the report is add-only.
MEASURED: scripts/relayAudit.ts CLI on `git show 6769f519290c3da2dc8bb6240b1d65db34dbeac2:docs/relay/PHASE-STALE-FACT-SWEEP-1-AG1-report.md` → `[OK] kind=report grammar v1`, zero violations.
UNMEASURED: master at your start — read it in ORDER A; this card DECAYS if it is not the master line of the `source` fence (a moved master is fine to build on, but say so).
ON-DISAGREEMENT: any non-comment executable change found in the four authored paths at ORDER B → STOP, report the hunk; that would falsify the scout's reading and the owner's ruling rests on it.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| source tip, PR, base, master | MEASURED: scout row SCOUT-PREFLIGHT-STALE-FACT-SWEEP-1-v1 2026-09-05T01:50Z, ls-remote + gh pr | source |
| the five paths and the comments-only reading | MEASURED: scout ORDER D two lenses | paths |
| the manifest conflict is structural | MEASURED: scout ORDER C merge-tree; F-S130-RESEAL-BREADCRUMB-ALWAYS-DIRTIES-1 | paths |
| the new branch and PR | UNMEASURED — ORDER E | result |

```evidence:source
phase/stale-fact-sweep-1 tip (PR #452, OPEN, base master):
    6769f519290c3da2dc8bb6240b1d65db34dbeac2
its merge-base with master:
    39a0b87e909cd1f8c8ffbb0cf84fa02bdc3d233e
master (PR #465 landed 2026-09-05T01:22:37Z):
    65b7e344ec0fe2c7ff10f28236b25d81ef6f6723
authors of record, to be named in the commit body: AG-1 (PHASE-STALE-FACT-SWEEP-1, 2026-08-26) and AG-2 (PHASE-TRIAGE-REDS-1 reseal, 2026-08-27)
```

```evidence:paths
api/admin/bench-reset.ts                            one JSDoc block (the "reddened assertion" is prose)
docs/relay/PHASE-STALE-FACT-SWEEP-1-AG1-report.md   add-only, 352 lines, passes grammar v1
shared/dbConstants.ts                               comment lines only
shared/grantPolicy.ts                               16 map entries, key and value byte-identical, trailing // text moved
public/architecture/manifest.json                   GENERATED — do not carry; regenerate (reseal) on the new branch
```

```evidence:result
UNMEASURED. ORDER E prints the new branch tip, the PR number, and CI at the full forty hex.
```

## ORDER A — FRESH START
Worktree from `origin/master` after `git fetch origin`; print `git rev-parse HEAD` (expect the master line of the `source` fence; if moved, print and continue). Print `git status --porcelain -uall` (empty).

## ORDER B — CARRY THE CONTENT, NOT THE COMMITS
For the FOUR authored paths in `paths`: `git checkout 6769f519290c3da2dc8bb6240b1d65db34dbeac2 -- <path>` each. NOT manifest.json (generated). Then prove the reading before committing: `git diff -U0 --cached -- api shared | grep -E '^[+-]' | grep -vE '^(\+\+\+|---)' | grep -vE '^[+-]\s*(//|\*|/\*\*|\*/)'` → expected output: ONLY the sixteen grantPolicy map-entry lines, in -/+ pairs with identical key and `WRITE_MODEL.*` value. Anything else → STOP (ON-DISAGREEMENT). Print the survivors verbatim.

## ORDER C — REGENERATE, THEN COMMIT ONCE
`npm run gen:arch-facts` (expect LEFT UNCHANGED or a named change — the branch touched no generator input; a change here is a finding, print it) and `npm run reseal` (expect `0 tab(s) hash-changed`; the `lastSyncedCommit` stamps move, that is by construction). `npm run check:ground` and `npm run check:doc-drift` GREEN. ONE commit, `--no-ff` irrelevant here (no merge). Subject, exactly this token form:

    AG-4: PHASE-STALE-FACT-SWEEP-2 — the sweep re-authored under one token; content byte-identical to AG-1's and AG-2's, who remain its authors

Body: name both source commits by full forty hex and their lanes; state that the resolver refused the two-token branch (`AUTHOR-UNKNOWN`), that this commit carries their content unchanged (the ORDER B grep as proof), and that PR #452 is SUPERSEDED-BY this PR. No `Co-authored-by` trailers that carry a lane token before a colon (lens one reads subjects only, but keep the body free of a second `AG-n:` at line start).

## ORDER D — PUSH; PR; SUPERSEDE
Push `phase/stale-fact-sweep-2`; `gh pr create` base master, title = the subject; body links #452 as superseded. Then comment on #452 (one line: superseded by the new PR, resolver reason) and CLOSE it — `gh pr close 452`. No branch deletion.

## ORDER E — CI AT THE HEAD; REPORT
Wait for conclusions at the full forty hex; every context by name and duration (rule26 under the 20-minute bound — second measurement of the thaw, name its `npm ci` and gate steps). `build (24.x)` RED → STOP, failing tests verbatim. Report from_lane, artifact_name `REAUTHOR-STALE-FACT-SWEEP-2-AG-4-report`: ORDER A–D outputs verbatim, the ORDER B survivors, the new tip fenced, PR number, CI table, box line, hygiene.

## FALSIFIER
Wrong if any non-comment executable line differs between the new branch and the source tip on the four authored paths, if the source tip is not the `source` fence, if the ORDER B grep prints anything but the sixteen grantPolicy pairs, or if a generator reports a hash change.

## SHARED SURFACES
One new branch, one commit, one push, one PR opened, PR #452 closed with a comment. NO push to master. NO edit to land.ts or any script. NO migration. NO db push. NO governed row.

## DECISION RIGHTS
None. The re-authoring is the owner's ruling; STOP is yours on every ON-DISAGREEMENT above.

BODIES: `S37-1` · `S37-2` · `S63-1` · `S100-1` · `S102-YASA-1` · `TOTAL-45` · `empty ≠ zero` · OWNER-RULING-S130-SWEEP-REAUTHOR-1 · OWNER-RULING-S130-CWF-FOCUS-ADF-FREEZE-1 · SCOUT-PREFLIGHT-STALE-FACT-SWEEP-1-v1 (2026-09-05T01:50Z) · F-S130-RESEAL-BREADCRUMB-ALWAYS-DIRTIES-1 · S112-YASA-1 (authors of record named).

fanout: personalized

```deliverables
branch: phase/stale-fact-sweep-2, one commit, pushed; PR open, base master
pr: #452 closed as SUPERSEDED-BY the new PR
report: bus row from_lane, artifact_name REAUTHOR-STALE-FACT-SWEEP-2-AG-4-report
```

TAIL ANCHOR: CARD-REAUTHOR-STALE-FACT-SWEEP-2-v1 ends here.
