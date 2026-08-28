<!-- relay-audit: v1 kind=card -->
# GO-LANDING-S123-2 · v2 — land the seventh key

`#29` / `GI-101`, the A23 understanding layer, is the open key of the internal counter and traces to
TIER A · Gaia2. **The build is on its branch and the Architect has run it.** This card lands it.

**v1 EXPIRED EXACTLY AS IT WAS BUILT TO, AND THIS IS THE RE-MEASUREMENT IT DEMANDED.** Its sibling,
`GO-LANDING-S123-1`, landed the honestbench scorer and moved the trunk; v1's own decay clause made it
unobeyable at that instant. **The sibling is DONE — master carries `scoreCore.ts` — so this landing
waits on nothing.** What changed: master moved, the branch moved (the lane pushed a `RULE-24` repair
for two literal NUL bytes and re-reported), and the branch is now BEHIND master, so a merge-forward is
owed where v1 said none was.

## PREMISE

MEASURED: 2026-08-28T13:06:20Z from a fresh clone at the master sha in the `anchor` fence, and in a throwaway worktree of the branch. Every verdict below was produced by running the thing, not by reading the lane's report.
MEASURED: `git ls-remote origin refs/heads/master` and the branch ref — both full shas sit in the `anchor` fence.
ON-DISAGREEMENT: if your own `git ls-remote` returns a different sha for either ref, STOP and report what you read. The scorer landing WILL move master, and when it does this card's rehearsal is stale by construction — re-measure before you act on it.
UNMEASURED: the pull request's CI at its head — this container has no `gh`, so the CI referee is YOUR read at the request head under `S37-2` and this card claims nothing about it.
DECAYS on the next push to master, which the sibling landing is expected to produce.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| master is `8a19fe8a049338c4b22ae6f798b0c98c0ca062e3` and the branch head is `1450e71db30a4ace37108f855f1d7c1cf53ad782` at the instant in PREMISE | MEASURED: git ls-remote origin, both refs in one call | anchor |
| the branch is FIVE commits behind master and a merge-forward IS owed — the opposite of what v1 claimed | MEASURED: git rev-list --count of the branch against master · MEASURED: the merge itself in a worktree, which merged cleanly and brought the scorer's files in | rehearsal |
| the api typecheck passes over the branch | MEASURED: npm run typecheck:api in that worktree, exit 0 | rehearsal |
| the branch's own two test files pass | MEASURED: npx vitest run over both files named in the files fence, 2 files and 57 tests, exit 0 | rehearsal |
| the branch changes six source and test files plus its two report artifacts, and nothing else | MEASURED: git diff --name-only over the merge range, each path enumerated in the files fence | files |
| the lane found five reader sites the card did not name, and repaired them | RELAYED: PHASE-A23-ASK-SHAPE-BUILD-1-AG3-report.md, read from the branch | handback |
| whether the whole suite and the corpus gate pass at the request head | NOT-READ | no gh in the Architect's container; that reading is yours and it decides |
| whether the ask RATE moves on real traffic | NOT-READ | the lane argues it from the code path and pins it with a precedence test, and says plainly it ran no replay. That remains open and is not this landing's question |

```evidence:anchor
$ git ls-remote origin refs/heads/master refs/heads/phase/a23-ask-shape-build-1
8a19fe8a049338c4b22ae6f798b0c98c0ca062e3	refs/heads/master
1450e71db30a4ace37108f855f1d7c1cf53ad782	refs/heads/phase/a23-ask-shape-build-1
```

```evidence:files
- api/cwf/_lib/routing/askOnUnresolved.ts
- api/cwf/_lib/routing/computeClarification.ts
- api/cwf/_lib/turn/stageClarify.ts
- api/cwf/_lib/replay/clarificationLens.ts
- api/cwf/_lib/routing/__tests__/askAmbiguousShape.test.ts
- api/cwf/__tests__/stageClarify.test.ts
- docs/relay/PHASE-A23-ASK-SHAPE-BUILD-1-AG3-report.md
- docs/relay/PHASE-A23-ASK-SHAPE-BUILD-1-AG3-report.json
```

```evidence:rehearsal
In a throwaway worktree at the branch head:

  git rev-list --count <branch>..origin/master   -> 5
  git merge origin/master                        -> clean; brought the scorer's three
                                                    files in; no conflict
  npm run typecheck:api                          -> exit 0
  npx vitest run <the two test files in the files fence>
                                                 -> 2 files passed, 57 tests passed, exit 0

THE REHEARSAL IS NOT THE VERDICT. It says the landing is not blocked by a stale branch, a type
error or a broken unit. The full suite and the corpus gate run at the request head and are yours.
```

```evidence:handback
The lane's report hands three things back, and two of them are gate findings rather than
work items. They are RELAYED here so you do not read them as noise in the report you land:
- FIVE reader sites carried the negative predicate that made widening the carrier unsafe.
  The card named none of them; the lane enumerated and repaired all five, and says the api
  typecheck found one that reading alone had missed.
- The whole-tree typecheck PASSES OVER THESE FILES AND PROVES NOTHING ABOUT THEM. The lane
  planted a type fault, watched that project ignore it, and watched the api typecheck catch
  it. That is a gate-coverage finding and it is the Architect's to card, not yours.
- The B1 carrier decision was the lane's to make and is made: the carrier was WIDENED, with
  four reasons and a fair statement of what the alternative would have bought. The Architect
  accepts it. Nothing in this landing reopens it.
```

## ORDER A — MERGE MASTER FORWARD, THEN LAND

The branch is five behind. Merge master into it, push, and let the checks run **on the request head**.
Then `npm run land`, foreman address, `--no-ff`, no squash. The sibling landing is finished and nothing
else from this session is queued against this trunk.

## ORDER B — READ THE CHECKS JOB BY JOB, AND EXPECT THE CANARY TO BE ABSENT

Print every job at the request head with its own verdict. **`eval-canary` will be skipped or absent
and that is the owner's freeze working** — `docs/ops/CANARY-FROZEN.md` records the ruling and its
single thaw condition. Not a fault, not to be repaired, not to be reported as a gap. Any other job
that is not green stops the landing and its text is the deliverable.

## ORDER C — AFTER THE TRUNK MOVES

Read the trunk run and report the corpus lens as NUMBERS — ORPHAN and GOVERNED-VIOLATION — rather
than as an adjective. Two readings, not one.

## ORDER D — WHAT YOU DO NOT DO

You do not edit the branch, its tests or its report. You do not reopen the B1 decision. You do not
act on the two gate findings in the handback fence — they are the Architect's to card.

## FALSIFIER

This card is wrong if either ref has moved since the `anchor` fence. **Test that first:** re-read both
refs and say what you got. The lane pushed a repair after v1 was cut and could push another; if the
branch head differs, the rehearsal expired again and this card must be re-cut rather than pushed
through. Saying so is the deliverable.

Second arm: **a landing reported green by one lens is a landing reported by no lens.** The trunk run
and the corpus reading both belong in your report.

## SHARED SURFACES

The trunk, and only through `npm run land`. You change no file on this branch, no gate, no governed
row and no migration.

## DECISION RIGHTS

The owner settled the wording, the option ordering and the cap before the card was cut. The lane made
the carrier decision and the Architect accepts it. The Architect decides that this branch lands and is
answerable for the rehearsal. **You decide whether the checks at the request head permit the landing**;
a refusal is the deliverable and is printed verbatim.

BODIES: `docs/laws/` · `CLAUDE.md` · `docs/ops/CANARY-FROZEN.md` · `SOTA-1` (this item traces to
TIER A · Gaia2) · `S37-2` · `S63-1` (a merge is not evidence) · `TOTAL-45`.

fanout: personalized

Branch `phase/a23-ask-shape-build-1` — the branch you are landing, not one you create. Report to
`docs/relay/GO-LANDING-S123-2-AG5-report.md`.

```deliverables
branch: phase/a23-ask-shape-build-1
report: docs/relay/GO-LANDING-S123-2-AG5-report.md
```

TAIL ANCHOR: GO-LANDING-S123-2-v2 ends here.
