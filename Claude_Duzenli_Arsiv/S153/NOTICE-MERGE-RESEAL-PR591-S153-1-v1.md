<!-- relay-audit: v1 kind=notice -->
NOTICE-MERGE-RESEAL-PR591-S153-1-v1

LANE: AG-1
fanout: personalized (one lane, one body)
FROM: Architect, S153, bus clock about 2026-09-21T21:55Z
OWNER APPROVAL: OWNER-APPROVAL-S152-LANDINGS-1 (2026-09-22 00:04 TSI) names this landing; the owner approved the S153 plan with "onay" at 00:25 TSI. This notice is the mechanical step between green and master.
NO POLL OR CRON TASK. When your slip is written, stop.
GATE-NOTE: written with a STEPS section. Commands below are in backticks; the Architect's first write of this notice lost them to shell substitution, so if any step reads empty, STOP and report it.
GRAFT: take code context from graft first; your slip carries a GRAFT line.
WHAT: PR 591 cannot land because master moved under it: PR 590 landed. Bring master into the branch and reseal. Nothing else.

## PREMISE
MEASURED: 2026-09-21T21:47Z, Architect bridge, GitHub API commits/master (read-only token) -> origin/master = 4f6a919fc0fd80f496e4533bfd977f781fd24498 (merge of PR 590, parents 9cb7fefc947745bec1fdd97aff62d58c34c47919 and 1bdcc0ab6bd43ddb22e4425db2d0352867f015c8); Vercel production READY on that sha.
MEASURED: 2026-09-21T21:47Z, GitHub API pulls/591 -> head 50a3aa2a02e22a57c042f0c4838bdc9c57ee1773, state open, mergeable_state dirty.
MEASURED: 2026-09-21T21:49Z, bridge, git merge-tree (merge-base, origin/master, origin/phase/a24-p1c1-metric-hints-s151-1) -> the ONLY conflicting path is public/architecture/manifest.json (the seal).
UNMEASURED: whether your local build and suite are green after the merge; you measure it.
SELF-INVALIDATION: dies if PR 591 is closed, or if its head is not 50a3aa2a02e22a57c042f0c4838bdc9c57ee1773 when you start.
ON-DISAGREEMENT: if your merge conflicts on ANY path other than public/architecture/manifest.json, STOP, do not resolve it, print the conflicting paths in the slip and stop. If any value above differs from your reading, YOUR READING WINS: print both.

## STEPS
1. In your own worktree: check out phase/a24-p1c1-metric-hints-s151-1 at 50a3aa2a02e22a57c042f0c4838bdc9c57ee1773; run `git fetch origin`, then `git merge origin/master` (never rebase, never --force).
2. For public/architecture/manifest.json take master's copy, then run `npm run reseal` in the SAME merge commit (CLAUDE.md section 5). The re-derived digests must equal the ones the gate reports; `git status` must show the seal as the only other change.
3. Run `npm run build` (all five gates, including check:doc-drift) and the suite. Report both by command and head; a local green is "local, at head <sha>".
4. Commit (message from a file, -F), push the branch. Do not open a new PR; the push updates PR 591. Do not merge; do not write adversary/scout.
REPLY (on the bus): SLIP-MERGE-RESEAL-PR591-S153-1 with branch, new head (full 40-hex), the conflicting paths you met, the reseal digests, build and suite results, and the GRAFT line.
FORBIDDEN: no rebase, no force push, no edit to any file outside the merge and the reseal; never print an environment value.

END · NOTICE-MERGE-RESEAL-PR591-S153-1-v1
