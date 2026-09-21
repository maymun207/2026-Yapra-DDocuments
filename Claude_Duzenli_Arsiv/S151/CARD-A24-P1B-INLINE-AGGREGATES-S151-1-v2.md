<!-- relay-audit: v1 kind=card -->
CARD-A24-P1B-INLINE-AGGREGATES-S151-1-v2

LANE: AG-4
fanout: personalized (one lane, one body)
SUPERSEDES CARD-A24-P1B-INLINE-AGGREGATES-S151-1-v1, which the scout held RED (SCOUT-STATUS-REVIEW-CARD-A24-P1B-INLINE-AGGREGATES-S151-1-v1, bus 2026-09-21T19:25:04Z) on two blocking defects B1 and B2, with E1-E7 to ride as edits. This v2 applies B1 exactly as the scout recommended, rules B2 IN SCOPE, and applies E1-E7. The scout's findings are credited to the scout (S112-YASA-1).
ADVERSARY GATE: EXEMPT, on the loop-breaking case of project instruction 12.1 and OWNER-RULING-S133-P6-SCOPE-AND-LOOP-1: this card REPEATS the subject of the superseded v1 and carries the change the scout named for each blocking defect. If you, AG-4, find any change in this body beyond B1, B2 and E1-E7, that is a finding and a STOP.
MEASURED-AT: 2026-09-21T19:25Z (bus clock; the scout measured the lines at master and at the P1-A head in the same minutes)
OWNER APPROVAL: OWNER-APPROVAL-S150-A24-V1_3-FINAL-1 and OWNER-APPROVAL-S150-PLAN-1; OWNER-APPROVAL-S151-PARALLEL-1 ("paralel onay", 22:22 TSI) and WAVE-A24-PARALLEL-PLAN-S151-1-v1 (AG-4 owns the executor and grounding fence). Owner scope rule S151: no functionality removed.
BRANCH: phase/a24-p1b-inline-aggregates-s151-1 · PUSH: yes · REPORT: docs/relay/A24-P1B-INLINE-AGGREGATES-S151-1-AG4-report.md · PR: yes, opened in THIS card on the same branch as the report.
START CONDITION: branch off origin/master only AFTER PR #590 (P1-A) has landed. If it has not landed when you take this card, do ORDER 0 only, write the slip, and stop.
Work in your own worktree (git worktree add off origin/master). Take code context with graft first; open a source file only where you edit it or prove a line.

PRECONDITION: git ls-remote origin refs/heads/master prints a sha that contains the P1-A merge (PR #590). If it does not, see START CONDITION.
ON-DISAGREEMENT: if any line, symbol or behaviour below differs at your head, YOUR READING WINS: print both; the difference is a finding in the report.

THE PROBLEM, in plain words. In Q3 the model received the OEE rows of three zones and wrote averages that no tool computed. A24 v1_3 moves every aggregation into code (the executor's deterministic half, P1). Code that computes per-field min, max and average exists, but only on the stored path. An inline result reaches the model as raw rows, so the model does the arithmetic. And when the turn's raw-result budget is spent, the stored path keeps only the first group of a grouped payload: the scout measured a three-zone payload of 71 rows reduced to 24 rows of one zone, in the output and in the handle. This card makes the code compute count, sum, average, minimum and maximum per numeric field, per group, over the FULL parsed payload, and attach them to what the model receives on both paths. The raw rows and every existing key stay.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| the lines cited below at origin/master and at the P1-A head | MEASURED: git show and git grep -n over the owner clone, bridge, 2026-09-21T19:05Z-19:14Z; the scout's reads at master and at the P1-A head, 2026-09-21T19:25Z | lines |
| the stored path drops two of three groups | MEASURED: the scout's synthetic probe through formatToolResult, 2026-09-21T19:25Z | probe |

```evidence:lines
api/cwf/_lib/resultStore.ts:149  aggregate rounding to 4 decimals
api/cwf/_lib/resultStore.ts:155  const SUMMARY_SCAN_LIMIT = 20000;
api/cwf/_lib/resultStore.ts:176  export function summarizeFields(records: Rec[]): Record<string, FieldSummary>   (min/max/avg; stored path only)
api/cwf/_lib/toolResult.ts:72  export const MAX_TOOL_RESULT_CHARS = Number(process.env.MAX_TOOL_RESULT_CHARS) || 40000;
api/cwf/_lib/toolResult.ts:174  export function findRecordArray(value)   (DATA_ARRAY_KEYS at :181-186, declared count at :188-195, else the LONGEST array)
api/cwf/_lib/toolResult.ts:382  export function formatToolResult(raw, toolName, store?, opts?)   (synchronous; reads no governed param)
api/cwf/_lib/toolResult.ts:548  fieldSummaries: summarizeFields(found.records ...)   (the only production call of summarizeFields)
api/cwf/_lib/toolResult.ts:574  return JSON.stringify(summaryOut);   (stored path)
api/cwf/_lib/toolResult.ts:593  recordCount = total   (for a grouped payload: the chosen group's length, not all rows; scout E1)
api/cwf/_lib/toolResult.ts:615  return JSON.stringify(out);   (inline path)
api/cwf/_lib/turn/stageTools.ts:1929  ctx.burstPolicy read (P1-A head, per the scout)
api/cwf/_lib/turn/stageTools.ts:1931-1946  forceStore set when the turn's raw-result budget is spent (P1-A head)
api/cwf/_lib/turn/stageTools.ts:1944-1947  formatToolResult(..., opts) call site (P1-A head)
api/cwf/_lib/turn/stageTools.ts:1948  ctx.resultCharsUsed += formatted.length (P1-A head)
api/cwf/_lib/turn/stageTools.ts:2041-2042  ledgerReturned; return { result: withCompletenessAccount(formatted, observation) } (P1-A head)
api/cwf/_lib/turn/stagesModel.ts:255  the grounding.numericMode read into ctx (P1-A head; the pattern this card copies)
api/cwf/_lib/knowledge/reference/agentParams.ts:852-857  ROUTER_ENABLED: a boolean switch spelled as number min 0 max 1
api/cwf/_lib/replay/stubTools.ts:312  formatToolResult(found.raw, name, store)   (replay; no opts)
api/cwf/__tests__/resultBudgetTurnAxis.test.ts:72-74  literal key pin on BurstPolicy (do not extend BurstPolicy)
```

```evidence:probe
scout probe, synthetic payload: three group keys with 24, 24 and 23 hourly rows (71 rows), one epoch-ms field, raw 3016 chars
findRecordArray picked the first key (24 rows)
no store: 3/3 groups present, length 3090, recordCount 24
with a ResultStore: identical, 3/3, length 3090 (inline; a store alone does not change the path)
forceStore true: 0/3 groups in the output, length 1207, recordCount 24; the handle holds 24 of the 71 rows
scout git ls-remote origin refs/heads/master at 2026-09-21T19:25Z -> 9cb7fefc947745bec1fdd97aff62d58c34c47919
scout GitHub read: PR #590 open, head 4875e202710188fd47bf3571bceeb1066a684319, mergeable_state blocked
```

## PREMISE

MEASURED: 2026-09-21T19:25Z by the scout, git ls-remote origin refs/heads/master and a GitHub read of PR #590 (both values in evidence probe): master does not yet contain PR #590.
MEASURED: 2026-09-21T19:25Z by the scout, P1-A's numericLedger walks every nested JSON value of the string returned at stageTools.ts:2042, and withCompletenessAccount keeps every key, so an `_aggregates` block inside formatToolResult's output IS ledgered (scout E5).
MEASURED: 2026-09-21T19:25Z by the scout, no golden, snapshot or eval fixture pins formatted tool strings (graft find_all and git grep); eleven hand-built parser fixtures were not read one by one (UNMEASURED whether any parser is strict about unknown keys).
UNMEASURED: how many production tool payloads are grouped versus flat. The report prints the count over the repository's fixtures.
SELF-INVALIDATION: dies if origin/master moves by a commit touching toolResult.ts, resultStore.ts or stageTools.ts other than the P1-A merge.

## ORDERS

ORDER 0 - MEASURE FIRST (no code). At your head: re-print every line in `lines`, SAME or DIFFERENT. Build a SYNTHETIC grouped fixture (three keys, 24/24/23 hourly rows, integer-percent fields, one epoch-ms field) and print formatToolResult's output for THREE arms: no store, with a ResultStore, and forceStore true. For each: which key findRecordArray picked, groups present, output length, recordCount. Run the existing resultStore, toolResult and resultBudgetTurnAxis tests and print counts.

ORDER 1 - ONE PURE FUNCTION. New module beside resultStore.ts (for example inlineAggregates.ts) exporting a pure function over the PARSED payload that returns an aggregates block or null.
(a) GROUPED: taken ONLY when findRecordArray fell to its longest-array tier (no DATA_ARRAY_KEYS hit, no declared-count hit), no key matches COLUMNS_KEY_PATTERN, and two or more values are non-empty arrays of plain records -> one entry per group key (scout E2). Otherwise FLAT: the array findRecordArray returns, one entry under "_all".
(b) Per numeric field of each group: count, sum, avg, min, max, rounded with resultStore's rounding (4 decimals). Numeric under summarizeFields' own rule (every non-null value numeric). Skip a group with fewer than 2 rows (scout E4).
(c) TIMESTAMP RULE (scout E3): exclude a field only when EVERY non-null value is an integer inside an epoch window, milliseconds [9.46e11, 4.1e12] or seconds [9.46e8, 4.1e9]. The report names the seconds-window collision with counts near 1e9.
(d) Scan at most SUMMARY_SCAN_LIMIT rows per group; beyond, the entry carries `scanned: "<n>/<total>"`. Caps: 50 groups, 20 fields per group, and a byte cap on the block (at most 4000 characters or 25 percent of the result, whichever is smaller; scout E4); beyond a cap, `_aggregatesCapped` with what was dropped.
(e) No backend name, field name or tenant word in code (AGNOSTIC-1): shapes, not vocabulary.

ORDER 2 - ATTACH IT ON BOTH PATHS, OVER THE FULL PAYLOAD (B2 ruled IN SCOPE). In formatToolResult, when the carrier of ORDER 3 is on:
- inline return (:615): add `_aggregates` computed over the parsed payload;
- stored return (:574): add `_aggregates` computed over the FULL parsed payload, not over found.records, so the groups the stored path drops still reach the model as code-computed numbers.
The note differs by path, in the house note style: inline, "computed by code over all rows in this result; cite these instead of computing your own"; stored, "computed by code over all <N> rows of the full result, including rows not shown in the sample; cite these instead of computing your own". Every existing key, row, sample and handle stays byte-identical. If the block would push an inline result past MAX_TOOL_RESULT_CHARS, drop the block, keep every row, set `_aggregatesDropped: "size"`.
NOT in this card, named as separate defects in the report and filed by the Architect with a fix and date: E1, recordCount on a grouped inline payload counts the chosen group only (toolResult.ts:593) and _completeness derives from it; and the handle holding only the first group, so aggregate_records cannot reach the other groups.

ORDER 3 - THE SWITCH AND ITS CARRIER (B1, as the scout recommended).
- Declaration: `result.inlineAggregates`, type number, min 0, max 1, floor 0 (off), sessionTweakable false, APPENDED at the tail of the reference array (the ROUTER_ENABLED convention, agentParams.ts:852-857). Update learnBrake.test.ts's tail-relative pins by exactly one, with a comment naming this card.
- Resolution: read it once per turn beside the grounding.numericMode read at stagesModel.ts:255, into one new ctx field in turn/types.ts. Do NOT extend BurstPolicy (resultBudgetTurnAxis.test.ts:72-74 pins its keys) and do not touch ResolvedParams.
- Carrier: one new OPTIONAL field on formatToolResult's opts (for example `inlineAggregates?: boolean`); ABSENT means OFF, so the replay stub (stubTools.ts:312) and every existing test call stay byte-identical by construction. The ONE call site that passes it is stageTools.ts:1944-1947, one field added to the opts object there, nothing else in stageTools.ts.
- No migration and no seed row; if your head needs either, STOP and name it. The owner flips it in the admin UI after reading the report's measurements; no lane publishes it.

ORDER 4 - TESTS, failing-first, each proven by planting the fault it guards and removing the plant. Synthetic numbers and names only; check:tenant-zero over them. (a) grouped fixture inline -> three entries, each the correct avg of its own rows; (b) grouped fixture with forceStore true -> `_aggregates` still carries all three groups over all 71 rows; (c) flat array -> one "_all" entry; (d) envelope shapes ({data:[..], errors:[..]} and {items:[..], included:[..]}) -> FLAT, not grouped; (e) timestamp rule: an ms-epoch field and an s-epoch field are excluded; a large integer field outside both windows (for example 2e11, a money total in minor units) is kept; (f) mixed field excluded; group of 1 row skipped; (g) scan cap, group/field caps, byte cap; (h) size cap on inline -> rows kept, block dropped; (i) carrier absent -> output byte-identical to origin/master for every fixture (pin the literal); (j) END-TO-END WITH P1-A: grouped fixture through formatToolResult with the carrier on, then P1-A's ledger and numeric check, with an answer stating one group's average -> numeric.unsourced = 0; the same answer with the carrier off -> 1. The test first asserts its precondition: the stated average matches no row value under any ledger reading (scout E5). Plants: drop the grouped branch and show (a) red; compute stored-path aggregates over found.records instead of the full payload and show (b) red; restore both.

ORDER 5 - ONE PULL REQUEST, --no-ff, never a squash. npm run build (all five gates; if check:doc-drift names a tab, update its diagram — public/architecture/diagrams/ or, for Stage Cards, the description text in src/components/admin/stagesRegistry.ts — and run npm run reseal in the SAME commit) and the full suite locally; print counts as local results on an unsynchronised head. Read CI at the pushed head by the full forty-hex sha, twice if the first read is zero. Report at the path above on the same branch; it follows the landing and never gates it. The report prints: ORDER 0's three arms; the per-result byte delta on the grouped and a flat fixture and the cumulative delta on a multi-call fixture, and whether the block brings the turn-axis page-out sooner (stageTools.ts:1948, scout E4); that toolResult.test.ts:165-172 and :174-178 still hold (scout E6); that the browser chart computes its own group means rounded to 2 decimals while this block rounds to 4 (MessageChartContent.tsx:306, chartData.ts:174; scout E7); and the two separate defects of ORDER 2. Slip with the head, the PR number, and fixture (j)'s two values.

## FALSIFIER

If any existing test literal outside learnBrake.test.ts's tail pins changes, STOP and name it. If attaching the carrier needs any stageTools.ts line other than the opts object at :1944-1947, STOP and name it. If the ctx read needs a file other than stagesModel.ts and turn/types.ts, STOP and name it. If fixture (j) cannot be built because P1-A's ledger does not read formatToolResult's output at your head, STOP and name what it reads. If the carrier-absent arm is not byte-identical to origin/master, STOP and print the diff.

## SHARED SURFACES

```scope
- api/cwf/_lib/inlineAggregates.ts (new)
- api/cwf/_lib/toolResult.ts (the opts field, and the two return points :574 and :615; nothing else)
- api/cwf/_lib/turn/stageTools.ts (ONE field in the opts object at :1944-1947; nothing else)
- api/cwf/_lib/turn/stagesModel.ts (one read beside :255)
- api/cwf/_lib/turn/types.ts (one ctx field)
- api/cwf/_lib/knowledge/reference/agentParams.ts (one number key, min 0 max 1, appended at the tail)
- api/cwf/__tests__/learnBrake.test.ts (tail pins shifted by exactly one, one new pin)
- api/cwf/__tests__/ and api/cwf/_lib/__tests__/ (new tests and their synthetic fixtures)
- public/architecture/diagrams/ and src/components/admin/stagesRegistry.ts (description text only) for the tabs check:doc-drift names, plus public/architecture/manifest.json by npm run reseal
- docs/relay/A24-P1B-INLINE-AGGREGATES-S151-1-AG4-report.md
```

## DECISION RIGHTS

You choose the module and test names, the exact note sentences, and the byte-cap arithmetic within ORDER 1(d). You may refuse on evidence this card did not anticipate. FORBIDDEN: no removal or rewrite of any existing key or row in a tool result; no change to aggregateRecords, the aggregate_records tool, BurstPolicy or ResolvedParams; no repair of the two separate defects in ORDER 2; no backend, field or tenant name in code or fixtures; no migration; no merge; no adversary/scout post on your own head; no poll or cron task; never print an environment value.

```evidence:adversary
ADVERSARY: EXEMPT
ack: 2728251d-bfe1-4cef-adef-05a2f9c2e814
basis: project instruction 12.1 loop-breaking case + OWNER-RULING-S133-P6-SCOPE-AND-LOOP-1; ack = SCOUT-STATUS-REVIEW-CARD-A24-P1B-INLINE-AGGREGATES-S151-1-v1 (scout from_lane row, 2026-09-21T19:25:04Z), whose change-to-GREEN for B1 and B2 this body applies
```

END · CARD-A24-P1B-INLINE-AGGREGATES-S151-1-v2
