<!-- relay-audit: v1 kind=go -->
# GO-TOOL-BEHAVIOR-CENSUS-1B · v1 — merge authorization for lane AG-1

## CLAIMS
| claim | basis | anchor |
|---|---|---|
| branch tip is a3cf17b, +4 over base 1b7f8dd, base unmoved | READ: `git rev-list --count origin/master..origin/phase/tool-behavior-census-1b` (Architect session) | inline |
| migrations on branch = 74, top slot `20260813090000_tool_experience_and_fingerprint.sql` | READ: `git ls-tree -r --name-only <branch> supabase/migrations \| wc -l` | inline |
| test files on branch = 559 | READ: `git ls-tree -r --name-only <branch> \| grep -E '\.test\.(ts\|tsx)$' \| wc -l` | inline |
| manifest still rev 240; 87eaeb2 is the labelled provisional seal | READ: `git show <branch>:public/architecture/manifest.json \| grep docVersion` | inline |
| AG1×AG3 file intersection = ∅ | READ: `comm -12` over the two sorted `git diff --name-only` lists | inline |
| full-suite verdict (7349) | NOT-READ | PR-head CI is the arbiter (S37-2); STEP 1 below reads it |

## STEP 1 — CI (BLOCKING; do this before anything else)
Confirm the PR #202 head-SHA checks are GREEN:
`GET /repos/maymun207/cwf_yaprak/actions/runs?head_sha=a3cf17b` — every run
`completed`+`success`. `in_progress` or `null` is NOT a pass; wait and re-read.
If any run is red: STOP, paste the failing job name to the Architect. No merge.

## STEP 2 — MERGE TURN (S95-1 · Footgun-6, exactly this order)
1. `git fetch origin --prune` · note `git rev-parse origin/master`.
2. DROP the provisional seal: rebase your branch onto `origin/master` **without**
   `87eaeb2` (interactive rebase, drop that single commit; all other commits
   carried).
3. READ docVersion FROM MASTER (`git show origin/master:public/architecture/manifest.json`),
   take the NEXT number. (If no sibling merged before you it reads rev 240 →
   you take 241; if one did, take live+1 — never assume.)
4. In the rebased tree: `npm run reseal`, set the docVersion you took, commit
   seal+bump in the SAME commit.
5. `npm run check:doc-drift` → must be `[OK] 7/7`. Red = STOP and report;
   a REDRAW demand = STOP and report (S95-1).
6. Merge with `--no-ff` (squash is banned) using the VERBATIM message below,
   push `origin master`. Keep the branch.

## VERBATIM MERGE MESSAGE
merge: PHASE-TOOL-BEHAVIOR-CENSUS-1B — a first failure stops being a permanent verdict (R2 experience ledger · R3 cron/FRESH · R4 evolution diff; SOTA key #10 turns at Operator apply + first live [CensusRefresh] read)

## AFTER PUSH
Report ONE line back through the owner: new `origin/master` SHA + the rev you
pressed. The Operator relay (migration `20260813090000` via `supabase db push`,
FENCE-first, idempotence probe, live `verifyGrants`, then the two S63-1 reads:
(i) first cron tick's `[CensusRefresh]` line with `probed>0`, (ii)
`tool_experience` rows > 0 after one production turn) is cut by the Architect
AFTER your SHA lands — not before, one step at a time. F-S96-CENSUS-ZERO-ROWS'
discriminator rides read (i): rows must start appearing; if they stay 0 across
cron ticks, the finding escalates to a defect phase.

TAIL-ANCHOR: `git rev-parse origin/master` — paste its output as your final line.

## FALSIFIER
This GO is void if any of: CI not green on a3cf17b · base moved and the rebase
conflicts (STOP, report the conflicting files) · check:doc-drift red after the
seal turn · the drop of 87eaeb2 changes any non-manifest file content
(`git diff` between pre-drop and post-drop trees over everything except
`public/architecture/manifest.json` must be empty).

<!-- END · GO-TOOL-BEHAVIOR-CENSUS-1B-v1 -->
