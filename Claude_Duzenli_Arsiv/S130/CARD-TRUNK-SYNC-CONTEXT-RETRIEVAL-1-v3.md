<!-- relay-audit: v1 kind=card -->
# CARD-TRUNK-SYNC-CONTEXT-RETRIEVAL-1 · v3 — merge master into phase/context-retrieval-1; two GENERATED files conflict; facts.json regenerates in place, manifest.json is restored to parseable bytes and then restamped

SUPERSEDES v2 and v1 — match by artifact_name `CARD-TRUNK-SYNC-CONTEXT-RETRIEVAL-1-v2` / `-v1` plus the body digests in the `supersedes` fence (lane-independent; row ids differ per box under personalized fanout). What changed and why, in full:
- v1 said the merge rehearses clean. FALSE — the three-argument `merge-tree` form emits diff-style output where every marker carries a leading `+`, so `grep -c '^<<<<<<<'` is 0 on a clean merge AND on this conflicting one (AG-4: F-S130-MERGE-REHEARSAL-GREP-ANCHOR-BLIND-1; scout v1 verdict; A-REC-S130-4). AG-4 ran v1 correctly: hit the conflict, aborted, left a clean worktree, reported.
- v2 said run `gen:arch-facts` then `reseal` on the conflicted tree. HALF INOPERABLE (scout v2 verdict, read from source): `genArchitectureFacts.ts` lines 356–363 read the on-disk file inside a try/catch whose catch comment reads "unparseable on disk — fall through and rewrite it", so it overwrites a conflicted `facts.json`; but `reseal.ts:25 → docDriftCore.ts:115–117 readManifest()` is a bare `JSON.parse(readFileSync(MANIFEST))` — a conflicted `manifest.json` THROWS before one byte is written. v3 adds the one step that makes reseal runnable.
- v2's "in that order because the build runs them in that order" was FALSE: `reseal` is not in the build chain at all (package.json:29), and the two generators are independent (no tab maps `docs/ground`). Order is immaterial; v3 gives no false reason.
- v2 said the owner ruling was "in your box": true for AG-4 (row 9142061b), not for the scout box. The ruling's location for the scout is: not delivered; its text is in the project box and the archive.

The owner ruled (OWNER-RULING-S130-CWF-FOCUS-ADF-FREEZE-1): product first, factory frozen. This is a PRODUCER card on your own branch. **It lands nothing and touches no other branch.** Your AUTHORITY-MATRIX-RULED-1 report is posted (08:09:57Z) — this card is next.

## PREMISE

MEASURED: 2026-09-04T08:19Z (scout) and 08:10Z (AG-4), `git ls-remote origin` — master and branch tips equal the `master` and `branch` fences EXACTLY; neither has moved since 07:44Z.
MEASURED: 2026-09-04T08:13Z, AG-4's real `git merge --no-ff origin/master` in a fresh worktree: exactly two conflicting paths, in the `conflicts` fence (markers: facts.json 6, manifest.json 21); merge aborted; `git status --porcelain -uall` empty.
MEASURED: 2026-09-04T08:12Z, AG-4: the shared clone's LOCAL `phase/context-retrieval-1` ref was 139 files / 31203 insertions BEHIND origin (strictly behind, not divergent); fast-forwarded with `--ff-only`. ORDER A therefore starts from the SERVER, never from a local ref.
MEASURED: 2026-09-04T08:15Z, AG-4: both conflicts are the same generated file regenerated on each side — `facts.json` master stamp 2026-09-03 moduleCount 444 vs branch stamp 2026-08-24 moduleCount 449 vs base 440; the branch ADDS modules (groundMcp, vectorLane), so NEITHER side's number is the merged tree's number. Picking a side would commit a measured number never measured against the tree it is committed to. Regeneration is the only honest remedy.
MEASURED: 2026-09-04T08:2xZ, scout: `manifest.json` master vs branch differ ONLY in `mappedContentSha` and `lastSyncedCommit` (13 field diffs over 7 tabs; tab list, order, top-level keys and every non-derived field IDENTICAL). Those two fields are exactly what `reseal` recomputes from the working tree for every tab (reseal.ts 29–38). Restoring either side is supplying parseable JSON, not choosing content: reseal converges on identical bytes from either input.
MEASURED: 2026-09-04T08:2xZ, scout: `check:ground` = `scripts/checkGroundTruth.ts` (package.json:36) — CONTRACT v1 shape, a staleness check that regenerates at HEAD and compares, and provenance ancestry requiring `stamp.commit` to be an ancestor of HEAD (safe across this merge).
MEASURED: 2026-09-04T08:0xZ, scout: PR #387 OPEN, base master, head = `branch` fence; title is not phase-prefixed. Match by HEAD REF.
MEASURED: 2026-09-04T08:12Z, of thirteen non-merge subjects `origin/master..origin/phase/context-retrieval-1` all begin `PHASE-CONTEXT-RETRIEVAL-1`; exactly TWO carry `AG-4` before the colon. Lens two (report H1 + first paragraph) is load-bearing at landing; the merge must not touch report headers.
DECAYS on any push to the branch or to master, and on CI re-running. ORDER A re-resolves both tips live.
ON-DISAGREEMENT: if either tip differs from its fence, or the conflict set is not EXACTLY the two fenced paths — STOP, `git merge --abort`, report the bytes. If your re-measure differs from any line here, THE MEASUREMENT WINS.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| master's tip is the PR 488 merge | MEASURED: 2026-09-04T08:19Z scout ls-remote; 08:10Z AG-4 ls-remote | master |
| the branch tip is one value, and it is AG-4's | MEASURED: 2026-09-04T08:19Z scout ls-remote; 08:10Z AG-4 ls-remote | branch |
| the merge conflicts on exactly two paths, both generated | MEASURED: 2026-09-04T08:13Z AG-4 real merge, aborted; generators read from source by AG-4 and scout | conflicts |
| `gen:arch-facts` overwrites a conflicted facts.json; `reseal` throws on a conflicted manifest.json | MEASURED: 2026-09-04T08:2xZ scout, `genArchitectureFacts.ts` 356–363 try/catch vs `docDriftCore.ts` 115–117 bare JSON.parse | remedy |
| restoring either side of manifest.json before reseal is lossless | MEASURED: 2026-09-04T08:2xZ scout field-by-field diff of both sides: only `mappedContentSha` + `lastSyncedCommit` differ, both recomputed by reseal | remedy |
| a pull request already exists for this branch | MEASURED: 2026-09-04T08:0xZ scout `gh pr list --head … --state all` → #387 OPEN at the branch tip | pr |
| whether `check:ground` and the seal accept the regenerated tree | NOT-READ | ci |
| whether the heavy suite is green on the synced head | NOT-READ | ci |

```evidence:supersedes
CARD-TRUNK-SYNC-CONTEXT-RETRIEVAL-1-v2  sha256 03072a8d0edfa88063e6c5f72d28882aaf35179e9bb08d06447830a30dcb6576  VOID
CARD-TRUNK-SYNC-CONTEXT-RETRIEVAL-1-v1  sha256 26f5236846544128f6d878a239f915d8eb071ade9ca5e5f2d818653a006b647e  VOID
Match by artifact_name + digest; row ids differ per box.
```

```evidence:master
origin/master, the PR 488 merge:
    1dceed1ceaaf970085e13463215b53134ff733a8
```

```evidence:branch
phase/context-retrieval-1 (server; the shared clone's LOCAL ref was stale — do not use it):
    a90e7df14abd863f75c31eecf232398042eb70f4
its ancestor, NOT a second work — do not touch:
    phase/context-retrieval-1-organ
```

```evidence:conflicts
AG-4, 08:13Z, git merge --no-ff origin/master (then aborted):
    CONFLICT (content): Merge conflict in docs/ground/facts.json
    CONFLICT (content): Merge conflict in public/architecture/manifest.json
    git diff --name-only --diff-filter=U -> exactly those two
generators (installed source):
    docs/ground/facts.json             <- scripts/genArchitectureFacts.ts   npm run gen:arch-facts   (overwrites unparseable input)
    public/architecture/manifest.json  <- scripts/reseal.ts                 npm run reseal           (JSON.parse first — needs parseable input)
```

```evidence:remedy
facts.json     : npm run gen:arch-facts                         (no restore needed; the generator rewrites an unparseable file)
manifest.json  : git checkout --ours -- public/architecture/manifest.json
                 npm run reseal                                 (restamps every tab from the working tree; --ours vs --theirs converge)
proof          : npm run check:ground   must pass
                 reseal's digest lines printed
                 git status --porcelain  shows only the merge in progress with the two paths staged
```

```evidence:pr
#387  OPEN  base master  headRefOid a90e7df14abd863f75c31eecf232398042eb70f4
```

```evidence:ci
NOT-READ. The synced head does not exist yet. ORDER D reads it with the FULL forty hex; a short
sha returns total_count=0, byte-identical to "CI never ran", and is ALWAYS FAILED.
```

## ORDER A — RESOLVE BOTH TIPS FROM THE SERVER, IN YOUR OWN WORKTREE
Exclusive worktree (S98-L1). `git fetch origin`. `git ls-remote origin refs/heads/master refs/heads/phase/context-retrieval-1` — confirm both fences; print both. Check out the branch AT THE SERVER TIP (`git checkout -B phase/context-retrieval-1 origin/phase/context-retrieval-1` in your worktree, or verify `git rev-parse HEAD` equals the `branch` fence). A local ref that differs from the server is stale, not a second opinion. Mismatch → ON-DISAGREEMENT.

## ORDER B — MERGE; REGENERATE facts.json; RESTORE-THEN-RESTAMP manifest.json; PROVE
`git merge --no-ff origin/master`. EXPECT it to stop on exactly the two fenced paths; print `git diff --name-only --diff-filter=U`. Any other path in that list → STOP, `git merge --abort`, report.
Then, exactly as the `remedy` fence:
1. `npm run gen:arch-facts` — rewrites `docs/ground/facts.json` from the merged working tree.
2. `git checkout --ours -- public/architecture/manifest.json` — restores parseable JSON (the two sides differ only in fields reseal recomputes; this is input, not content).
3. `npm run reseal` — restamps every tab from the working tree.
4. `git add docs/ground/facts.json public/architecture/manifest.json` — those two paths only.
5. `npm run check:ground` — must pass. Print its output, the reseal digest lines, and `git status --porcelain`.
6. `git commit --no-edit` — default merge subject, no phase prefix.
No authored file is edited by hand. No other path is staged. If step 5 fails → STOP, `git merge --abort`, report the failing check verbatim.

## ORDER C — PUSH; PR #387 EXISTS, DO NOT OPEN A SECOND
`git push origin phase/context-retrieval-1` — plain push. `git ls-remote` read-back, full forty hex in your report's fence. `gh pr view 387 --json number,state,headRefOid,baseRefName` — `headRefOid` must equal the pushed tip. Match by head ref, not title. Do NOT open a pull request.

## ORDER D — READ THE HEAVY SUITE
`build (24.x)` under the 45-minute bound (today's heavy runs: 18m17s, 20m01s). Wait for a CONCLUSION. Ask with the full forty hex. Report EVERY context by name, `eval-canary skipped` included. SUCCESS → report. RED → failing tests verbatim, STOP, no fix, no re-run; one classification only: branch's own modules (`vectorLane`, `groundMcp`), the regenerated files' gates (`check:ground`, `check:doc-drift`/seal), or elsewhere.

## ORDER E — REPORT
From_lane, artifact_name `TRUNK-SYNC-CONTEXT-RETRIEVAL-1-AG-4-report-v3` (the v1 report row already carries that base name; suffix it so the two are distinguishable): ORDER A readings incl. `git rev-parse HEAD` before the merge; the conflict list; the five ORDER B outputs; the merge commit (full forty hex, fenced); ORDER C read-back and PR #387 head; the FULL CI verdict per context; the box line (the withdrawn CARD-TOOL-VISIBILITY-A-1-v2 row is known, F6, say so and move on); `git worktree list` and `git status --porcelain -uall`.

## FALSIFIER
Wrong if either tip differs from its fence, the conflict set is not exactly the two fenced paths, any AUTHORED file is edited by hand, a side of `facts.json` is picked instead of regenerated, `manifest.json` is committed without reseal having run after the restore, `check:ground` fails, a second pull request is opened, or `-organ` is touched. A red heavy build does NOT falsify the card.

## SHARED SURFACES
One merge commit on YOUR branch carrying the two regenerated files; one push to YOUR branch; zero pull requests opened. NO push to master. NO migration. NO db push. NO governed row. NO production traffic. NO touch on `-organ`, `provenance-export-1`, `stale-fact-sweep-1`, `authority-matrix-ruled-1`.

## DECISION RIGHTS
You decide NOTHING about a third conflicting path (STOP), a failing `check:ground` (STOP), a red suite (STOP and report), or landing (foreman, later, after scout review). The restore-then-restamp step is the house form for a seal conflict (CLAUDE.md §5: the only remedy is reseal; hand-picking hunks never is) made runnable; it is not a decision.

BODIES: `PLATINUM` · `S37-2` · `S61-1` · `S63-1` · `S98-L1` · `S100-1` · `TOTAL-45` · `empty ≠ zero` · CLAUDE.md §5 · OWNER-RULING-S130-CWF-FOCUS-ADF-FREEZE-1 · F-S130-MERGE-REHEARSAL-GREP-ANCHOR-BLIND-1.

fanout: personalized

```deliverables
branch: phase/context-retrieval-1 — one merge commit carrying regenerated facts.json + restamped manifest.json, pushed; PR #387 at the new head
report: bus row from_lane, artifact_name TRUNK-SYNC-CONTEXT-RETRIEVAL-1-AG-4-report-v3
```

TAIL ANCHOR: CARD-TRUNK-SYNC-CONTEXT-RETRIEVAL-1-v3 ends here.
