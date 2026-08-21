<!-- relay-audit: v1 kind=prompt -->
# PHASE-CENSUS-REFRESH-FIX-1 · v1 — Wave 3.5 (solo lane AG-1) · fixes F-S96-REFRESH-EXPOSURE-BLIND

## PRECONDITION
Fresh clone or exclusive worktree from `origin/master` (floor at issue:
`3299a59319d205fe4ef7dc18b5fa428824e36966`, rev 242). STEP 0 tree-exclusivity
gate applies: `git status --porcelain` empty before any write; own branch only;
no `-B`/`-f`/stash; push early. No sibling lanes — no merge queue.

## CLAIMS
| claim | basis | anchor |
|---|---|---|
| refresh selector picks P1/P2/P3 from the RAW mirror; exposure gate runs only inside executeCensusPass | READ: toolCensusRefresh.ts selection loop + executeCensusPass (Architect session) | inline |
| live effect: armes tick 04:01 `p1=8 probed=1`, tick 04:31 `p1=8 probed=0 budgetStop=true` — budget burned on structurally unprobeable tools | READ: Vercel `[CensusRefresh]` lines | inline |
| the code's own "97 tools in well under a day" claim | NOT-READ as future fact | falsified by the live rate above |

## FALSIFIER
The fix is wrong if: any write/unclassified tool ever again enters `selected` ·
the log's `p1/p2/p3` counts stop matching what was actually eligible · the
regression fixture (below) passes under the OLD selector.

## THE FIX (one seam)
In `api/cwf/_lib/backends/toolCensusRefresh.ts`: resolve the ADR-011 exposure
map ONCE per backend pass (the same `exposureSource` the engine already uses —
inject it, do not build a second resolution path) and filter the mirror to
READ-annotated, `via_gateway=false` tools BEFORE the P1/P2/P3 walk. Consequences
to state in comments: `considered` now means "probe-eligible considered"
(rename honesty in the log line, e.g. `eligible=`); an unreadable exposure map
disables the WHOLE selection for that backend — reported in the log suffix like
the experience-unread case, never silently treated as "everything is eligible"
or "nothing is" (MEASURE-READ-HONESTY-1). Budget semantics unchanged.

## TESTS (same files as 1B's, extended)
1. Mixed mirror (read+write+unclassified) → selection contains ONLY read tools;
   counts computed post-filter.
2. REGRESSION, the live shape: first 8 mirror entries write-annotated, one read
   tool behind them → OLD behaviour would starve; NEW selection fills all 8
   slots with read tools. Build the expectation by calling the selector, not by
   hand-writing counts.
3. Exposure map null → selection empty + the disclosed log suffix asserted.
4. Existing 1B tests stay green untouched.

## DELIVERY
Branch `phase/census-refresh-fix-1` · push · PR against master · report
`docs/relay/PHASE-CENSUS-REFRESH-FIX-1-report.md` (relay-audit v1 header —
Wave-4-era artifact, grammar applies) with `## TREE`, `## DIFF`, `## CLAIMS`.
Zero migrations. `.agents` union seam rule applies if touched. Seal per S95-1
at merge turn (backends/** is sealed-glob — expect a seal turn; read docVersion
from master live). STOP after report; GO carries the verbatim merge message.
S63-1 post-deploy read (named): the first cron tick after deploy shows
`probed=8` (or eligible-remainder) on armes and census row count climbing by
~8/tick until the 97 read tools are walked.

<!-- END · PHASE-CENSUS-REFRESH-FIX-1-v1 -->
