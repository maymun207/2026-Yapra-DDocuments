<!-- relay-audit: v1 kind=card -->
# CARD-SCOUT-PREFLIGHT-STALE-FACT-SWEEP-1 · v1 — before any sync card: measure whether a two-author branch can pass the installed resolver at all, and what a merge onto today's master would cost

Scout card. Read-only by your charter; anything that needs a write is reported NOT RUN with the reason, exactly as your C-3 was on the provenance review. Third product item in the owner's ruled order (context-retrieval-1 → provenance-export-1 → stale-fact-sweep-1), under OWNER-RULING-S130-CWF-FOCUS-ADF-FREEZE-1. The branch is AG-1's sweep (2026-08-26) with one AG-2 reseal commit on top (08-27) and one merge of master between them; it has not moved since and master has moved 154 commits past its base. Nothing is dispatched to AG-4 until your row is read.

## PREMISE

MEASURED: 2026-09-05T01:38Z, owner's clone (`origin/*` refs, no fetch — the refs were moved by the foreman worktree sharing the clone; `origin/master` there equals the Vercel-recorded landed master): branch tip and base in the `refs` fence; two non-merge subjects in the `subjects` fence carrying DIFFERENT lane tokens before the first colon; five paths in master...branch; exactly one path touched on both sides since the base: `public/architecture/manifest.json` (generated).
READ-FROM-YOUR-PREFLIGHT b2b36bf3 (2026-09-04T11:34Z), not re-measured: "a second TOKENED non-merge commit makes lens one `mixed`, which has NO candidate-set rescue". If that holds on this branch, land.ts refuses for every lander and the sync card is pointless until the owner disposes.
NOT-READ: the PR number/state for this branch (the clone has no GitHub network); the installed resolver's class on this exact head; conflict prediction against today's master; whether `docs/ground/facts.json` at the branch tip differs from master's; the report's grammar under the current corpus gate.
DECAYS on any push to the branch or master. ON-DISAGREEMENT: tip ≠ `refs` fence → review the head you find, say so in the first line (as you did at 21:16Z).

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| tip, base, master, the 154 | MEASURED: 2026-09-05T01:38Z clone | refs |
| the two subjects and their tokens | MEASURED: 2026-09-05T01:38Z `git log --no-merges --format=%s` | subjects |
| the five paths and the one overlap | MEASURED: 2026-09-05T01:38Z `git diff --name-only`, `comm -12` | paths |
| the resolver class and the landing verdict | NOT-READ — ORDER B | verdict |

```evidence:refs
origin/phase/stale-fact-sweep-1 tip:
    6769f519290c3da2dc8bb6240b1d65db34dbeac2
merge-base with master:
    39a0b87e909cd1f8c8ffbb0cf84fa02bdc3d233e
origin/master (PR #465 landed 2026-09-05T01:22:37Z):
    65b7e344ec0fe2c7ff10f28236b25d81ef6f6723
master commits since the base: 154
```

```evidence:subjects
15aec6a3  PHASE-STALE-FACT-SWEEP-1 AG-1: thirty-eight comments corrected, six artefacts registered, and one assertion reddened on pu…
6769f519  PHASE-TRIAGE-REDS-1 AG-2: reseal this branch — the drift half of its red, repaired
(plus one merge: aaaac635 "Merge branch 'master' into phase/stale-fact-sweep-1", --no-merges-invisible)
```

```evidence:paths
api/admin/bench-reset.ts                          |  25 +-
docs/relay/PHASE-STALE-FACT-SWEEP-1-AG1-report.md | 352 +   (H1 "PHASE-STALE-FACT-SWEEP-1-AG1-report"; "Lane AG-1, producer")
public/architecture/manifest.json                 |  18 +-  (generated; ALSO changed on master since the base)
shared/dbConstants.ts                             |  42 +-
shared/grantPolicy.ts                             |  30 +-
```

```evidence:verdict
NOT-READ. ORDER B prints cls / lane / candidates and the three lander outcomes, from the installed functions.
```

## ORDER A — THE HEAD AND THE PR
`git ls-remote origin refs/heads/phase/stale-fact-sweep-1` (forty hex, must equal `refs`); `gh pr list --head phase/stale-fact-sweep-1 --state all --json number,state,baseRefName,headRefOid` — number and state, or NONE. Confirm the two subjects and the base verbatim.

## ORDER B — THE RESOLVER, INSTALLED, ON THIS HEAD (the point of the card)
Run the installed `resolveAuthorLane` + `judgeReportOnly` exactly as you did at 21:16Z (inputs collected as land.ts:2300/2316/2330), with base = `refs` master and head = tip. Print `cls / lane / candidates / why`, and the outcome for lander AG-5, lander AG-1, lander AG-2, lander null. If lens one returns `mixed`: say whether ANY lander passes, and whether lens two (docs/relay report H1 → AG-1) is consulted at all on a `mixed` lens one, quoting the branch in land.ts that decides. This determines the whole path: a `mixed` with no rescue means the branch cannot land as authored and the disposition is the owner's.

## ORDER C — WHAT A MERGE ONTO TODAY'S MASTER WOULD COST (read-only)
Conflict prediction between tip and `refs` master by a method that writes nothing you are not permitted to write (the read-only `git merge-tree <base> <a> <b>` three-argument form prints the trivial merge to stdout; if the only form available to you writes objects, report NOT RUN and the reason). Expected: `public/architecture/manifest.json` conflicts; the four authored paths do not. Confirm or refute. Also: does master's `docs/ground/facts.json` differ from the branch tip's (the branch's base predates the generator's later moves)? A `git diff --stat` between the two trees, restricted to the two generated files, is enough.

## ORDER D — THE CONTENT, ONE PASS, AGAINST THE LAWS
The four authored paths: what the sweep changed (comments? constants? grant policy?) — name any change that is NOT a comment or a registered artefact, because the subject says "thirty-eight comments corrected, six artefacts registered, one assertion reddened": the reddened assertion is a behaviour change and is named. `shared/grantPolicy.ts` and `shared/dbConstants.ts` are authority surfaces: any change to a VALUE (not a comment) there is a RED-class finding for this card, not an AMBER. C1 LAW, secrets env-only, empty ≠ zero as usual. The report under the corpus gate: header, CLAIMS table, anchors — the branch predates the current grammar version by nine days; say whether `relay corpus (grammar v1)` would pass it, from the gate's own predicate, not from memory.

## ORDER E — REPORT
From_lane row, artifact_name `SCOUT-PREFLIGHT-STALE-FACT-SWEEP-1-v1`. First line `VERDICT: GREEN|AMBER|RED` (RED = any authority-value change, or a resolver outcome with no passing lander is stated as the FACT it is, not as RED — put it on its own line: `RESOLVER: <cls> · landable-by: <lanes or NONE>`). Then ORDER A–D verbatim outputs. Method warnings as you gave them at 21:16Z are welcome.

## FALSIFIER
Wrong if the tip is not the `refs` fence, if there are more or fewer than two non-merge subjects, if the five paths differ, or if the resolver's class cannot be read from the installed functions.

## SHARED SURFACES
None written. Reads only. NO worktree of another window entered; NO generator run; NO checkout.

## DECISION RIGHTS
None. Measure and report; the path is chosen after your row.

BODIES: `S37-2` · `S102-YASA-3` · `TOTAL-45` · `empty ≠ zero` · C1 LAW · OWNER-RULING-S130-CWF-FOCUS-ADF-FREEZE-1 · LENS-AUTHOR-SET-1 · SCOUT-PREFLIGHT-TRUNK-SYNC-PROVENANCE-EXPORT-1-v1 (b2b36bf3) · free.md.

fanout: personalized

```deliverables
report: bus row from_lane, artifact_name SCOUT-PREFLIGHT-STALE-FACT-SWEEP-1-v1
```

TAIL ANCHOR: CARD-SCOUT-PREFLIGHT-STALE-FACT-SWEEP-1-v1 ends here.
