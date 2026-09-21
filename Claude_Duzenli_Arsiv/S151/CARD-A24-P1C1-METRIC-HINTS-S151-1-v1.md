<!-- relay-audit: v1 kind=card -->
CARD-A24-P1C1-METRIC-HINTS-S151-1-v1

LANE: AG-1
fanout: personalized (one lane, one body)
MEASURED-AT: 2026-09-21T19:44Z (bus clock)
OWNER APPROVAL: OWNER-RULING-S151-K1-METRIC-HINTS-ALL-ACTIONS-1, the owner's words at 22:40 TSI: "K1 hükmü onay: metrik ipuçları her soru tipinde uygulanır". It amends the K1 matrix rule that OWNER-RULING-S140-K1-ORDER-CELL-HINT-1 last amended. Also OWNER-APPROVAL-S151-PARALLEL-1 and WAVE-A24-PARALLEL-PLAN-S151-1-v1 (AG-1 owns the routing fence). Design source by name: the owner's Q3 witness (CWF-S149-Q3Q4-WITNESS-v1): scrap tools were not offered for a question about scrap.
ADVERSARY GATE: NEW SUBJECT. Goes to the scout first (12.1); reaches AG-1 only with a GREEN verdict row.
BRANCH: phase/a24-p1c1-metric-hints-s151-1 · PUSH: yes · REPORT: docs/relay/A24-P1C1-METRIC-HINTS-S151-1-AG1-report.md · PR: yes, opened in THIS card on the same branch as the report.
Work in your own worktree (git worktree add off origin/master). Take code context with graft first.

PRECONDITION: git ls-remote origin refs/heads/master prints the sha in `floor` or a descendant that does not touch api/cwf/_lib/routing/deriveCategories.ts or its test. If one does, STOP and print it.
ON-DISAGREEMENT: if any line or behaviour below differs at your head, YOUR READING WINS: print both; the difference is a finding in the report.

THE PROBLEM, in plain words. In Q3 the owner asked about scrap ("fire") and the model was never offered the scrap tools. The governed data already says fire belongs to the quality category, where the scrap tools live. The code applies that hint only when the question is classed as a metric query on a line, zone or order. Q3 was classed as an events query, so the hint was skipped. The owner ruled that the hint applies to every question type. This card removes the gate and changes nothing else.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| the lines below at origin/master | MEASURED: git show origin/master over the owner clone, bridge, 2026-09-21T19:42Z | lines |
| the live governed rows | MEASURED: select over the governance tables by the recon subagent, Supabase MCP, 2026-09-21T19:35Z | rows |

```evidence:floor
lane-refreshed tracking ref origin/master in the owner clone at 2026-09-21T19:42Z -> 9cb7fefc947745bec1fdd97aff62d58c34c47919 (not ls-remote; your ls-remote measures it)
```

```evidence:lines
api/cwf/_lib/routing/deriveCategories.ts:77  QUERY_EVENTS: { LINE: ['linestop', 'andon'], ...
api/cwf/_lib/routing/deriveCategories.ts:126  const HINT_AUGMENTED_OBJECTS: ReadonlySet<IrObject> = new Set(['LINE', 'ZONE', 'ORDER']);
api/cwf/_lib/routing/deriveCategories.ts:135-147  function deriveNonCompare(action, object, hints) ... :139 if (action === 'QUERY_METRIC' && HINT_AUGMENTED_OBJECTS.has(object)) { for (const h of hints) if (!categories.includes(h)) categories.push(h); }
api/cwf/_lib/routing/deriveCategories.ts:160-163  function applyMetricFloor(result, hasMetricSlot)   (the final step, applied once over every branch)
api/cwf/_lib/routing/deriveCategories.ts:178-182  hints gathered from vocab.categoryHintsById for frame.metrics; hasMetricSlot
api/cwf/_lib/routing/deriveCategories.ts:185-200  COMPARE computes the union of the QUERY_METRIC and QUERY_EVENTS sides; return applyMetricFloor(result, hasMetricSlot)
api/cwf/_lib/routing/__tests__/deriveCategories.test.ts:77  describe('metric-hint augmentation (QUERY_METRIC × {LINE, ZONE, ORDER})'
api/cwf/_lib/routing/__tests__/deriveCategories.test.ts:88-89  it('fire metric on a non-augmented object (e.g. FACTORY) does NOT add quality') ... toEqual(['metrics'])
api/cwf/_lib/routing/__tests__/deriveCategories.test.ts:184  REGRESSION PIN: metrics-empty is byte-identical to today's table for all 78 pairs
```

```evidence:rows
armes.metric_registry / fire v1: categoryHints ["quality"]
armes.tool_category / quality v5: holds the scrap tools (getDailyManualScrap, getDailyManualScrapForZones, getScrapSummaryForZones, getOrderScrapWithReasons, getScrapBarcodeList, listScrapTypes, and others)
Q3 frame (CWF-S150-SESSION-OPEN-v1 M-e): action QUERY_EVENTS, object LINE, metrics ["fire"], confidence HIGH; derived [linestop, andon, metrics]
```

## PREMISE

MEASURED: 2026-09-21T19:42Z, the Architect's git show of deriveCategories.ts and its test at the `floor` sha (evidence lines).
MEASURED: 2026-09-21T19:35Z, the live fire and quality rows (evidence rows), read by the recon subagent; the lane re-reads them only if its test needs live data (it should not: tests use a synthetic vocabulary).
UNMEASURED: how many recorded turns change their offered set under the new rule. ORDER 3 measures it offline.
SELF-INVALIDATION: dies if origin/master moves by a commit touching deriveCategories.ts or its test.

## ORDERS

ORDER 0 - MEASURE FIRST (no code). Re-print every line in `lines`, SAME or DIFFERENT. Run the deriveCategories tests and print counts. Print deriveCandidateCategories for the Q3 frame (QUERY_EVENTS x LINE, metrics ["fire"]) with the test file's vocabulary helper: expected today [linestop, andon, metrics].

ORDER 1 - THE RULE. Hints from the frame's metrics are unioned into the derived set for EVERY action and EVERY object, once, as part of the final step (beside applyMetricFloor), never a replace and never a duplicate. Remove the QUERY_METRIC gate at :139 and the HINT_AUGMENTED_OBJECTS set at :126 if nothing else reads it (grep for its consumers first). An unmapped cell with a hinted metric now gets the metric floor AND the hints. A frame with no metric, or a metric with no hint, derives exactly what it derives today. No vocabulary word, category name or backend name in code (AGNOSTIC-1): the hints come only from the governed rows.

ORDER 2 - TESTS, failing-first, plant proven. Amend EXACTLY the FACTORY negative test at :88-89 to the new rule (fire on FACTORY adds quality), with a comment naming OWNER-RULING-S151-K1-METRIC-HINTS-ALL-ACTIONS-1; no other existing literal. New: (a) the Q3 frame derives [linestop, andon, metrics, quality]; (b) QUERY_EVENTS, QUERY_MASTER and one unmapped cell each with a hinted metric get the hint once; (c) a metric with no hint row adds nothing beyond the metric floor; (d) the metrics-empty regression pin at :184 stays byte-identical, unedited; (e) COMPARE still yields the union with the hint once. Plant: restore the QUERY_METRIC gate and show (a) red; restore.

ORDER 3 - OFFLINE MEASURE, no production write. Run the existing route shadow lens (scripts/runRouteShadowLens.ts, which calls the production filterToolsByMessage with a replayed frame) over the recorded turns it already reads, once at the floor sha and once at your head, and print how many turns gain categories, how many lose any (expected zero: the rule only adds), and the Q3 turn's before/after offered set if it is in the window. If the lens cannot run in your window, print why (third value) and continue.

ORDER 4 - ONE PULL REQUEST, --no-ff, never a squash. npm run build (all five gates; if check:doc-drift names a tab, update its diagram in public/architecture/diagrams/ or the description text in src/components/admin/stagesRegistry.ts, and run npm run reseal in the SAME commit; if master moved, git merge origin/master first, then reseal). Full suite locally, counts named as local results on an unsynchronised head. Read CI at the pushed head by the full forty-hex sha, twice if the first read is zero. Report on the same branch; it follows the landing. Slip with the head, the PR number and ORDER 3's counts.

## FALSIFIER

If any existing test literal other than :88-89 changes, STOP and name it. If ORDER 3 shows ANY turn LOSING a category, STOP and print the turn: the rule only adds. If HINT_AUGMENTED_OBJECTS has a consumer outside deriveCategories.ts, keep it, do not edit that consumer, and name it.

## SHARED SURFACES

```scope
- api/cwf/_lib/routing/deriveCategories.ts
- api/cwf/_lib/routing/__tests__/deriveCategories.test.ts (the :88-89 amendment and new tests)
- public/architecture/diagrams/ and src/components/admin/stagesRegistry.ts (description text only) for the tabs check:doc-drift names, plus public/architecture/manifest.json by npm run reseal
- docs/relay/A24-P1C1-METRIC-HINTS-S151-1-AG1-report.md
```

## DECISION RIGHTS

You choose where exactly the union sits (inside applyMetricFloor or a sibling final step) and the test names. FORBIDDEN: no change to the governed rows, toolCategories.ts, stageTools.ts, agentParams.ts or any file outside the fence; no production write; no migration; no merge; no adversary/scout post on your own head; no poll or cron task; never print an environment value.

END · CARD-A24-P1C1-METRIC-HINTS-S151-1-v1
