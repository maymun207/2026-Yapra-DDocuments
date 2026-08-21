<!-- relay-audit: v1 kind=go -->
# GO-HARNESS-HONESTY-GATE-1 · v1 — merge authorization for lane AG-2 · QUEUE POSITION 2

## CLAIMS
| claim | basis | anchor |
|---|---|---|
| branch tip 5de3a97, +2 over base 1b7f8dd | READ: `git rev-list --count` in Architect session | inline |
| fence clean; no forbidden file touched; zero migrations | READ: `git diff --name-only origin/master...<branch>` + grep | inline |
| checkTenantZero exits 2 on could-not-measure; --self-test enrolled | READ: `git show <branch>:scripts/checkTenantZero.ts` greps | inline |
| 3-pair intersection = ∅ except `.agents/CHANGELOG.md` + `.agents/skills/cwf-project-kb/SKILL.md` (all pairs) | READ: `comm -12` over sorted diff lists, 3 pairs | inline |
| full-suite verdict | NOT-READ | PR-head CI arbitrates (S37-2); STEP 1 reads it |

## STEP 0 — QUEUE (blocking)
You merge SECOND. Do NOT start STEP 2 until the owner relays AG-1's new
`origin/master` SHA (AG-1 is merging first). Until then you may complete STEP 1.

## STEP 1 — CI (blocking)
`GET /repos/maymun207/cwf_yaprak/actions/runs?head_sha=5de3a97` — all runs
`completed`+`success`. `in_progress`/`null` is NOT a pass. Red = STOP, name the job.

## STEP 2 — MERGE TURN (S95-1, exactly this order)
1. `git fetch origin --prune`; confirm master == the SHA the owner relayed.
2. Rebase your branch onto `origin/master`. Expected conflict: the two
   `.agents/` files (AG-1 also appended). RESOLVE AS UNION — keep BOTH sides,
   your lines LAST, delete nothing of AG-1's (F-S96-AGENTS-SEAM ruling).
   Any conflict OUTSIDE those two files = STOP and report the file list.
3. `npm run check:doc-drift` in the rebased tree.
   - Green → docVersion untouched; proceed (your files sit outside the sealed
     globs; a no-seal merge round is correct then).
   - Red FROM YOUR OWN FILES → S95-1 seal turn: read docVersion from
     `origin/master` (never assume — AG-1 just pressed a new one), take the
     next number, `npm run reseal` + bump in the SAME commit, re-run drift →
     must be green. A REDRAW demand = STOP.
4. Merge `--no-ff` with the VERBATIM message below; push `origin master`; keep
   the branch.

## VERBATIM MERGE MESSAGE
merge: PHASE-HARNESS-HONESTY-GATE-1 — a harness that says "passed" has proven it could fail in the same run (BUG-015 gate; W-026 closed: could-not-measure exits 2, never 0; un-enrolled instruments frozen by name)

## AFTER PUSH
One line back through the owner: new `origin/master` SHA (+ rev if you pressed
one). AG-3 merges after you, on your SHA.

TAIL-ANCHOR: `git rev-parse origin/master` — paste its output as your final line.

## FALSIFIER
Void if: CI not green on 5de3a97 · a rebase conflict outside the two `.agents/`
files · drift red after step 3 · any of AG-1's `.agents/` lines lost in your
union resolution (`git diff origin/master -- .agents/` after rebase must show
your lines as pure ADDITIONS).

<!-- END · GO-HARNESS-HONESTY-GATE-1-v1 -->
