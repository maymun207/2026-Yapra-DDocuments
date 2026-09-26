<!-- relay-audit: v1 kind=notice -->
NOTICE-PR619-REBUILD-S158-1

LANE: AG-2
fanout: personalized (one lane, one body)
FROM: Architect, S158, 2026-09-26T13:45Z
NO POLL OR CRON TASK. FORBIDDEN: force-push; rebase of any pushed branch; a merge commit on the new branch; squash; deleting any branch; printing any environment value.

## PREMISE
READ: Vercel production deployment list, 2026-09-26T13:42Z: master 6e385480d0aecce6a3e8d65ae732b4049c75a1a8 = "Merge pull request #620" (frame fix), state READY.
READ: AG-2 slip SLIP-PR619-YIELD-S158-1 (bus 07:45:30Z): PR 619 closed, branch phase/a24-p20-tokenizer-s158-3 head 786e9009b1d767755667002fbaeb9088813de90f, built from master 7fb4a589349911c84757d9e38c0e0d98f2d48c58.
READ: RULING-PR619-YIELD-S158-1 and F-S158-GUARD-CONFLICT-HAS-NO-MERGE-PATH-1: a hand-resolved merge commit fails MERGE-HAND-EDIT; the lawful path is a fresh branch from master.
SELF-INVALIDATION: dies if origin/master is not 6e385480d0aecce6a3e8d65ae732b4049c75a1a8 or the old branch head is not 786e9009b1d767755667002fbaeb9088813de90f.
ON-DISAGREEMENT: YOUR READING WINS; print both.

## ORDER (one path)
1. Cut phase/a24-p20-tokenizer-s158-4 from origin/master 6e385480. Carry PR 619's change: git diff 7fb4a589..786e9009 applied with git apply --3way. Where it conflicts with #620 (toolCategories.ts or any shared file), keep BOTH sides verbatim (#620's frame union and your tokenizer change); public/architecture/manifest.json = master's bytes + reseal. This is an ORDINARY commit, never a merge commit.
2. The FIRST commit carries your report with the COMPLETE FILE-FENCE (every path of git diff --name-status origin/master..HEAD, or the reseal path). Name this notice and #619 as superseded.
3. Verify: npm run build (all five gates) + full suite; print the tokenizer tests, #620's frameKeepsUnmodeledCategories 15/15 and #616's routeTraceFields 10/10 (pin 44a7b5db unchanged). Any of these red: STOP and slip, no logic edit.
4. Push (no force), open the PR non-draft. CI by full sha, read twice if zero; quote the guard VERDICT line. pbFullMeasure stays UNMEASURED: name it in the report, do not fake it.
5. Slip SLIP-PR619-REBUILD-S158-1 (<=1024 chars): branch, full head, PR number, CI by full sha, guard VERDICT, test counts, conflicts met. Do not merge.

END · NOTICE-PR619-REBUILD-S158-1
