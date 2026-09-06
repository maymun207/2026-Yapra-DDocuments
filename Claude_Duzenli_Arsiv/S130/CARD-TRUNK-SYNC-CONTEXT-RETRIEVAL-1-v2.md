<!-- relay-audit: v1 kind=card -->
# CARD-TRUNK-SYNC-CONTEXT-RETRIEVAL-1 · v2 — bring the current master into phase/context-retrieval-1; the merge CONFLICTS on two GENERATED files, and the remedy is their generators

SUPERSEDES v1 (bus row 16ac073a, sha256 in the `supersedes` fence). v1's central claim "the merge rehearses clean" was FALSE: the Architect's rehearsal used the three-argument `git merge-tree <base> <a> <b>`, the trivial-merge form, whose output never contains `<<<<<<<` — a probe structurally unable to report a conflict (A-REC-S130-4; the scout caught it, SCOUT-VERDICT-TRUNK-SYNC-CONTEXT-RETRIEVAL-1-v1, row 0cfeb2e0). Re-measured with the real form, the merge conflicts on exactly two paths, both GENERATED artifacts this repository owns generators for. CLAUDE.md §5 already prescribes the remedy: regenerate in the same commit, never hand-pick hunks. v1's ORDER B told you to STOP on any conflict; v2 distinguishes authored content (STOP) from generated artifacts (regenerate, prove). If you already hit the conflict under v1 and stopped: good — resume here from ORDER B with the merge still in progress, or abort it cleanly (`git merge --abort`) and restart at ORDER A; either is fine, say which.

The owner ruled (OWNER-RULING-S130-CWF-FOCUS-ADF-FREEZE-1, in your box): product first, factory frozen. This branch is the largest unmerged PRODUCT work. This is a PRODUCER card on your own branch: merge, regenerate, push, read CI, report. **It lands nothing and touches no other branch.** Do it AFTER your AUTHORITY-MATRIX-RULED-1 report is posted.

⚠ `phase/context-retrieval-1-organ` is this branch's measured ANCESTOR (PR #390 merged it INTO `context-retrieval-1`). Do not touch it.

## PREMISE

MEASURED: 2026-09-04T08:0xZ, the scout's live `git ls-remote origin` — master and branch tips equal the `master` and `branch` fences EXACTLY; `-organ` at its own tip is an ancestor of the branch (exit 0).
MEASURED: 2026-09-04T08:0xZ, the scout's `git merge-tree --write-tree origin/master origin/phase/context-retrieval-1` → EXIT 1, two content conflicts, both paths in the `conflicts` fence, all three stages present for each.
MEASURED: 2026-09-04T08:12Z, the shared clone: both paths are changed on BOTH sides since the merge base (`git diff --name-only <base> origin/master` and `… origin/phase/context-retrieval-1` each list both) — which is why they conflict.
MEASURED: 2026-09-04T08:12Z, the generators, from the installed source not memory: `public/architecture/manifest.json` is written by `scripts/reseal.ts` (`writeFileSync(MANIFEST, …)` line 45); `docs/ground/facts.json` is written by `scripts/genArchitectureFacts.ts` (`GROUND_OUT … 'facts.json'` line 49), wired as `npm run gen:arch-facts` (package.json line 9) and run inside `npm run build` (line 29). Neither file is authored content.
MEASURED: 2026-09-04T08:0xZ, the scout's `gh pr list --head phase/context-retrieval-1 --state all` → **PR #387, OPEN, base master, head = the `branch` fence**. Its title is NOT the phase-prefixed form ("PHASE-CONTEXT-RETRIEVAL-1 floors A, B, C: …"). A pull request exists; match by HEAD REF, never by title.
MEASURED: 2026-09-04T08:12Z, of the thirteen non-merge subjects `origin/master..origin/phase/context-retrieval-1`, all begin `PHASE-CONTEXT-RETRIEVAL-1`; exactly **TWO** carry `AG-4` before the colon (v1 said three; the scout's count is the measured one). Lens one will not be unanimous; lens two (H1 + first paragraph of `docs/relay/PHASE-CONTEXT-RETRIEVAL-1-report.md`) is load-bearing at landing. Not this card's problem — the merge must not touch those report headers.
MEASURED: 2026-09-04T08:0xZ, the scout: `timeout-minutes: 45` is on master (`build-test.yml`), so the synced head runs under the lifted bound.
CONTEXT, not evidence about the synced head: CI on the pre-sync tip (full forty hex) was green on 2026-08-27 in 5m52s, eval-canary SKIPPED — an eight-day-old green on a suite that now takes ~18 min.
DECAYS on any push to the branch or to master, and on CI re-running. ORDER A re-resolves both tips live.
ON-DISAGREEMENT: if either tip differs from its fence, or the merge conflicts on ANY path other than the two in the `conflicts` fence — STOP and report with the bytes; a third conflicting path means authored content is in play and this card does not authorise resolving it. If your re-measure differs from any line here, THE MEASUREMENT WINS.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| master's tip is the PR 488 merge | MEASURED: 2026-09-04T08:0xZ, scout ls-remote; 07:44Z shared clone remote-tracking ref | master |
| the branch tip is one value, and it is AG-4's | MEASURED: 2026-09-04T08:0xZ, scout ls-remote; ORDER A re-resolves live | branch |
| the merge conflicts on exactly two paths, both generated | MEASURED: 2026-09-04T08:0xZ, scout `merge-tree --write-tree` exit 1; 08:12Z shared clone both-sides diff; generators read from `scripts/reseal.ts` and `scripts/genArchitectureFacts.ts` | conflicts |
| a pull request already exists for this branch | MEASURED: 2026-09-04T08:0xZ, scout `gh pr list --head … --state all` → #387 OPEN at the branch tip | pr |
| `-organ` is this branch's ancestor, not a second work | MEASURED: 2026-09-04T08:0xZ, scout `merge-base --is-ancestor` exit 0 | branch |
| whether the regenerated files resolve the conflict to bytes both gates accept | NOT-READ | ci |
| whether the heavy suite is green on the synced head | NOT-READ | ci |

```evidence:supersedes
CARD-TRUNK-SYNC-CONTEXT-RETRIEVAL-1-v1  bus row 16ac073a-9226-4e84-a76f-c5defca93eef
    sha256 26f5236846544128f6d878a239f915d8eb071ade9ca5e5f2d818653a006b647e
VOID. Its "rehearses clean" claim and its ORDER B stop-on-any-conflict are replaced by this card.
```

```evidence:master
origin/master, the PR 488 merge (scout ls-remote 08:0xZ = shared clone 07:44Z):
    1dceed1ceaaf970085e13463215b53134ff733a8
```

```evidence:branch
phase/context-retrieval-1 (scout ls-remote 08:0xZ = shared clone 07:52Z):
    a90e7df14abd863f75c31eecf232398042eb70f4
its ancestor, NOT a second work — do not touch:
    phase/context-retrieval-1-organ
Resolve both yourself at ORDER A with git ls-remote.
```

```evidence:conflicts
git merge-tree --write-tree origin/master origin/phase/context-retrieval-1   (scout, git 2.52)  -> EXIT 1
    CONFLICT (content): Merge conflict in docs/ground/facts.json
    CONFLICT (content): Merge conflict in public/architecture/manifest.json
generators (installed source, shared clone HEAD):
    docs/ground/facts.json             <- scripts/genArchitectureFacts.ts   npm run gen:arch-facts
    public/architecture/manifest.json  <- scripts/reseal.ts                 npm run reseal
```

```evidence:pr
gh pr list --head phase/context-retrieval-1 --state all   (scout 08:0xZ)
    #387  OPEN  base master  headRefOid a90e7df14abd863f75c31eecf232398042eb70f4
    title: PHASE-CONTEXT-RETRIEVAL-1 floors A, B, C: the archive extractor, the corpus wall, and a third encode class
```

```evidence:ci
NOT-READ. The synced head does not exist yet. ORDER D reads it with the FULL forty hex; a short
sha returns total_count=0, byte-identical to "CI never ran", and is ALWAYS FAILED.
```

## ORDER A — RESOLVE BOTH TIPS LIVE, IN YOUR OWN WORKTREE
Exclusive worktree for this branch (S98-L1), never the shared clone's main tree (it carries an uncommitted stamp on `docs/ground/authority-conformance.latest.md` and a stash — do not stage, commit, drop or discard either). `git fetch origin`. `git ls-remote origin refs/heads/master refs/heads/phase/context-retrieval-1`. Confirm master = `master` fence, branch = `branch` fence. Print both. Mismatch → ON-DISAGREEMENT.

## ORDER B — MERGE MASTER IN; REGENERATE THE TWO GENERATED FILES; PROVE IT
`git merge --no-ff origin/master` — never a rebase, never `--force`, no authored file edited by hand, default merge subject (do NOT add the phase prefix; a merge is not authorship).
EXPECT the merge to stop on exactly the two `conflicts`-fence paths. Print `git diff --name-only --diff-filter=U`. If that list is exactly those two → continue. If it contains ANY other path → STOP, `git merge --abort`, report the list; authored content is in play.
Resolve the two by their generators, not by hand and not by picking a side: `npm run gen:arch-facts` (rewrites `docs/ground/facts.json`) then `npm run reseal` (rewrites `public/architecture/manifest.json`), in that order because the build runs them in that order. `git add` only those two paths. Then `npm run check:ground` must pass on the working tree (it is the gate that validates `facts.json`'s stamp). Print: the two commands' output, `git status --porcelain` (must show only the merge in progress with the two paths staged), and the reseal's digest lines. Commit the merge (`git commit --no-edit`). One commit, two generated files inside it, nothing else.

## ORDER C — PUSH YOUR BRANCH; PR #387 EXISTS, DO NOT OPEN A SECOND
`git push origin phase/context-retrieval-1` — plain push. Read the tip back with `git ls-remote` and report it in full forty hex inside your report's fence. Then `gh pr view 387 --json number,state,headRefOid,baseRefName` and confirm `headRefOid` equals the pushed tip. Match by HEAD REF; the title is not the phase-prefixed form and that is not your concern. Do NOT open a pull request.

## ORDER D — READ THE HEAVY SUITE (THE POINT OF THIS CARD)
This head touches code: `build (24.x)` runs the REAL suite under the 45-minute bound (last heavy run 18m17s). Wait for a CONCLUSION — `in_progress` is not a pass, `cancelled` is neither. Ask with the full forty hex. Report EVERY context by name, `eval-canary skipped` and `rule26` included; a skipped job is named, never folded into the green.
SUCCESS → report it. RED → report the failing tests verbatim and STOP; no fix, no re-run, no diagnosis here — a red on the synced head is a MEASUREMENT the Architect owns. One classification only: is the red in the branch's OWN modules (`api/cwf/_lib/vectorLane`, `api/cwf/_lib/groundMcp`), in the two regenerated files' gates (`check:ground`, seal), or elsewhere.

## ORDER E — REPORT
File from_lane, artifact_name `TRUNK-SYNC-CONTEXT-RETRIEVAL-1-AG-4-report`: ORDER A readings; the conflicting-path list as measured; both generator outputs and the `check:ground` result; the merge commit (full forty hex, fenced); ORDER C read-back and the PR #387 head confirmation; the FULL CI verdict per context; `read relay_inbox at <ISO>, box empty` or what it holds; `git worktree list` and `git status --porcelain -uall`.

## FALSIFIER
Wrong if either tip differs from its fence, if the conflict set is not exactly the two fenced paths, if any file is edited by hand, if a side is "picked" instead of regenerated, if `check:ground` fails on the regenerated tree, if a second pull request is opened, or if `-organ` is touched. A red heavy build does NOT falsify the card — it is the measurement.

## SHARED SURFACES
One merge commit on YOUR branch (containing the two regenerated files), one push to YOUR branch, zero pull requests opened. NO push to master. NO hand edit. NO migration. NO db push. NO governed row. NO production traffic. NO touch on `-organ`, `provenance-export-1`, `stale-fact-sweep-1`, `authority-matrix-ruled-1`.

## DECISION RIGHTS
You decide NOTHING about a third conflicting path (STOP), a red suite (STOP and report), or landing (foreman, later, after scout review). You run the two named generators because the house form names them as the only remedy for a seal/ground conflict (CLAUDE.md §5); that is not a decision.

BODIES: `PLATINUM` · `S37-2` · `S61-1` · `S63-1` · `S98-L1` · `S100-1` · `TOTAL-45` · `empty ≠ zero` · CLAUDE.md §5 (seal conflict → reseal, never hand-picked hunks) · OWNER-RULING-S130-CWF-FOCUS-ADF-FREEZE-1.

fanout: personalized

```deliverables
branch: phase/context-retrieval-1 — one merge commit carrying regenerated facts.json + manifest.json, pushed to origin; PR #387 at the new head
report: bus row from_lane, artifact_name TRUNK-SYNC-CONTEXT-RETRIEVAL-1-AG-4-report
```

TAIL ANCHOR: CARD-TRUNK-SYNC-CONTEXT-RETRIEVAL-1-v2 ends here.
