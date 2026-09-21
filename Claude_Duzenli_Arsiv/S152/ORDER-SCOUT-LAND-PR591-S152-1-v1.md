<!-- relay-audit: v1 kind=notice -->
ORDER-SCOUT-LAND-PR591-S152-1-v1

LANE: scout (scout-1 window, AFTER ORDER-SCOUT-LAND-PR590-S151-1-v1 is answered)
fanout: personalized (one lane, one body)
FROM: Architect, S152, bus clock about 2026-09-21T20:50Z
OWNER APPROVAL: OWNER-APPROVAL-S152-P1C1-LAND-1 ("1-) onay veriyorum", 2026-09-21 23:47 TSI): landing P1-C1 on PR #591, scout adversary on the PR head, auto-merge on green.
NO POLL OR CRON TASK. Bekleme dongusu yok. When your status is written, stop.
GATE-NOTE: written with a STEPS section.
GRAFT: take code context from graft first (graft ask --source, graft grep, graft callers); raw grep only for what graft does not index. Your status carries a GRAFT line listing the graft commands you ran (owner rule, S151 22:47 TSI).
WHAT: adversary review of the P1-C1 code on PR #591 (CARD-A24-P1C1-METRIC-HINTS-S151-1-v2, the scout's own RED-v1 edits applied), then the adversary/scout status on the head that will land.

## PREMISE
MEASURED: 2026-09-21T20:43:26Z, AG-1's slip for CARD-A24-P1C1-METRIC-HINTS-S151-1-v2 on the bus: branch phase/a24-p1c1-metric-hints-s151-1, head 50a3aa2a02e22a57c042f0c4838bdc9c57ee1773, PR 591, CI success (build, rule26, changes, report-schema, relay corpus, arm auto-merge), eval-canary SKIPPED; local suite 10907/10909 with one vectorLane latency fail that passes alone; ORDER 3 (offline shadow lens) CONFIGURED-ABSENT in the lane window.
MEASURED: 2026-09-21T20:07Z, owner clone tracking ref origin/master = 9cb7fefc947745bec1fdd97aff62d58c34c47919 (lane-refreshed, not ls-remote); if PR #590 landed first, master has moved and the PR's mergeability is what you read, not this sha.
UNMEASURED: the slip's own open line — "live allowWrite of hinted categories at stageClarify.ts:2984" — and the slip's "shared-clone: ff half-applied by sandbox, files named in report, not discarded". Both are yours to measure in step 2.
SELF-INVALIDATION: dies if PR #591 is closed or its branch is replaced.
ON-DISAGREEMENT: if any value above DIFFERS from your own re-measurement, YOUR READING WINS: print both, continue with the measured value, and name the difference in your status.

## STEPS
1. Print `git ls-remote origin refs/heads/master` and `git ls-remote origin refs/heads/phase/a24-p1c1-metric-hints-s151-1` (full 40-hex both). If the branch head is not 50a3aa2a02e22a57c042f0c4838bdc9c57ee1773, diff the two heads and say what moved before anything else.
2. REVIEW THE CODE at the branch head: the diff against master in every non-doc file. Hostile questions: (a) are the frame's metric hints unioned into the derived set for EVERY action and EVERY object, exactly once, in the final step beside applyMetricFloor — never a replace, never a duplicate, and does a frame with no metric or a metric with no hint derive byte-identically to before? (b) is the ONLY amended existing test literal the FACTORY negative at deriveCategories.test.ts:88-89, naming OWNER-RULING-S151-K1-METRIC-HINTS-ALL-ACTIONS-1, and is the metrics-empty regression pin at :184 byte-identical? (c) HINT_AUGMENTED_OBJECTS: removed only if it had no consumer outside deriveCategories.ts — print the grep; (d) any vocabulary word, category name, backend or tenant name in new code or fixtures (AGNOSTIC-1)? (e) the stageClarify consumer at stageClarify.ts:2984 the card's D-edits named: does the hinted category reach the allow-write path correctly, or is the slip's UNMEASURED a real gap — measure it, do not guess; (f) the "ff half-applied by sandbox" files the AG-1 report names: does ANY of them appear in the PR diff? If one does, RED. (g) the diagrams/stagesRegistry/manifest reseal, if check:doc-drift named a tab: reseal digests equal the gate's reported values?
3. Read CI at the CURRENT head by the full 40-hex sha (actions runs by head_sha; read a zero TWICE). Name each run and its conclusion; a SKIPPED job is named, never folded into green.
4. If steps 1-3 are clean AND every required CI context is green at the current head: post the adversary/scout status on that head. If CI is still running or master moved and the PR needs a merge: post nothing, write your status with the review verdict and the state, and stop; the Architect re-orders.
REPLY (on the bus): SCOUT-STATUS-LAND-PR591-S152-1, first line `ADVERSARY-VERDICT: GREEN|RED pr=591 head=<40-hex>`, then the findings, the CI runs by name, whether the status was posted, and the GRAFT line.
FORBIDDEN: no edit, no push, no merge, no poll task, no cron; never print an environment value.

END · ORDER-SCOUT-LAND-PR591-S152-1-v1
