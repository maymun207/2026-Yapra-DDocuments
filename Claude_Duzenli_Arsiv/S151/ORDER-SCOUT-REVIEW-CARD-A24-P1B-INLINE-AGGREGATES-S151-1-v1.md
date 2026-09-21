<!-- relay-audit: v1 kind=notice -->
ORDER-SCOUT-REVIEW-CARD-A24-P1B-INLINE-AGGREGATES-S151-1-v1

LANE: scout
fanout: personalized (one lane, one body)
FROM: Architect, S151, 2026-09-21T19:20Z (container clock)
OWNER APPROVAL: OWNER-APPROVAL-S150-A24-V1_3-FINAL-1 + OWNER-APPROVAL-S150-PLAN-1; owner direction S151 22:15 TSI: all of A24 v1_3 implemented by Wednesday 2026-09-23 evening TSI, no functionality removed.
NO POLL OR CRON TASK. Bekleme dongusu yok. This is the only order for this window; when its status is written, stop.
GATE-NOTE: written with a STEPS section.
WHAT: first review of a NEW-subject card (12.1): A24 P1-B, the executor's deterministic aggregation half, as inline code-computed aggregates. Card body = the bytes AFTER the BEGIN marker line up to and INCLUDING the final newline before the END marker line.
MEASURED: 2026-09-21T19:19Z, sha256sum of the card file in the doc repo archive: sha256 = b3e7c8250c7f4c74bfd86f4c08efdd35b0b65bc4d574fcf4c74c258c51d8d9fe (12157 bytes); md5 of the device copy equal to the container copy.
ON-DISAGREEMENT: if your sha256 of the extracted body differs, print both and review the bytes you extracted; the difference is a finding.

## PREMISE
MEASURED: 2026-09-21T19:19Z, ESBUILD_BINARY_PATH=$HOME/esb/package/bin/esbuild npx tsx scripts/cardPreflight.ts --check on the card file from the bridge: GREEN, all eleven checks (GRAMMAR, not review).
MEASURED: 2026-09-21T19:05Z-19:14Z, the Architect's reads of every line in the card's `lines` fence at origin/master in the owner clone.
UNMEASURED: whether the design is right. That is your review.
SELF-INVALIDATION: dies if origin/master moves by a commit touching toolResult.ts or resultStore.ts other than the P1-A merge (PR #590), or if a v2 appears.

## STEPS
1. Print `git ls-remote origin refs/heads/master` (full 40-hex). Run the repository card gate on the extracted bytes; print the result.
2. Hostile questions: (a) does findRecordArray at the head really pick one array for a {groupKey: [rows]} payload, and do the other groups survive into what the model receives (read the inline path :574-615)? (b) is attaching `_aggregates` inside formatToolResult enough for P1-A's ledger to source it — does the string returned at stageTools.ts:2032 contain formatToolResult's output verbatim at the P1-A head (PR #590)? (c) does the timestamp-magnitude exclusion lose a real metric (for example a large count or a money total above 1e11)? (d) does a new key in every inline result break a replay, a golden, a snapshot or an eval fixture that compares tool strings byte-for-byte (grep the fixtures)? (e) anything already built on master that does this (12.6: grep for the CONSUMER, not the definition)? (f) does ORDER 3's floor 1 change live answers before the owner has read a measurement — say whether you would floor it at 0 and why.
3. Verdict: GREEN first line exactly
   ADVERSARY-VERDICT: GREEN card=CARD-A24-P1B-INLINE-AGGREGATES-S151-1-v1 sha256=<sha256 of the body>
   or RED with each defect by file:line and the change that makes it GREEN. Say which findings are blocking and which may ride as edits.
FORBIDDEN: read-only. No status post, no edit, no poll task, no cron. Never print an environment value.
REPLY (on the bus): SCOUT-STATUS-REVIEW-CARD-A24-P1B-INLINE-AGGREGATES-S151-1-v1.

=== BEGIN CARD ===
<!-- relay-audit: v1 kind=card -->
CARD-A24-P1B-INLINE-AGGREGATES-S151-1-v1

LANE: AG-4
fanout: personalized (one lane, one body)
MEASURED-AT: 2026-09-21T19:14Z by the container clock (the bus clock ran about two minutes behind it this session; each MEASURED line below names what it read)
OWNER APPROVAL: OWNER-APPROVAL-S150-A24-V1_3-FINAL-1 ("v1_3 onay", 2026-09-21 19:43 TSI) and OWNER-APPROVAL-S150-PLAN-1 ("plan onay"; P1 split P1-A then P1-B then P1-C, A24-V1_3-ARCHITECT-CAPTURE-S150-1-v1 section 14). Owner direction, S151 22:11 TSI, by name: the fix for invented numbers must reach production tomorrow, not in October.
ADVERSARY GATE: NEW SUBJECT. This body goes to the scout first (12.1) and reaches AG-4 only with a GREEN verdict row.
BRANCH: phase/a24-p1b-inline-aggregates-s151-1 · PUSH: yes · REPORT: docs/relay/A24-P1B-INLINE-AGGREGATES-S151-1-AG4-report.md · PR: yes, opened in THIS card on the same branch as the report.
START CONDITION: branch off origin/master only AFTER PR #590 (P1-A) has landed; P1-A's ledger is what proves this card works. If #590 has not landed when you take this card, do ORDER 0 only, write the slip, and stop.
Work in your own worktree (git worktree add off origin/master). Take code context with graft first; open a source file only where you edit it or prove a line.

PRECONDITION: git ls-remote origin refs/heads/master prints a sha that contains the P1-A merge (PR #590). If it does not, see START CONDITION.
ON-DISAGREEMENT: if any line, symbol or behaviour below differs at your head, YOUR READING WINS: print both; the difference is a finding in the report.

THE PROBLEM, in plain words. In Q3 the model received the OEE rows of three zones and wrote averages that no tool computed. A24 v1_3 moves every aggregation into code (the executor's deterministic half, P1). The code that computes per-field min, max and average already exists, but it runs only when a result is too big to send inline, so an 8 KB answer like Q3's OEE payload reaches the model as raw rows and the model does the arithmetic. Worse, that payload is keyed by zone, and the record finder keeps only the longest array as "the records", so a summary built on it today would cover one zone. This card makes the code compute count, sum, average, minimum and maximum per numeric field, per group when the payload is grouped, and attach them to the result the model receives, for inline results too. The model then narrates numbers that are in the tool bytes, and P1-A's ledger sources them. Nothing is removed from the result; the raw rows stay.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| the lines cited below at origin/master | MEASURED: git show origin/master and git grep -n over the owner clone, bridge, 2026-09-21T19:05Z-19:14Z | lines |
| the Q3 payload shape and size | RELAYED: CARD-A24-P1A-NUMERIC-GUARD-S150-1-v3 evidence:digest | CARD-A24-P1A-NUMERIC-GUARD-S150-1-v3 |

```evidence:lines
api/cwf/_lib/resultStore.ts:155  const SUMMARY_SCAN_LIMIT = 20000;
api/cwf/_lib/resultStore.ts:158-168  interface FieldSummary { type; min?; max?; avg?; distinct?; top?; examples? }   (no sum, no count)
api/cwf/_lib/resultStore.ts:176  export function summarizeFields(records: Rec[]): Record<string, FieldSummary>   (numeric fields -> min/max/avg over the first SUMMARY_SCAN_LIMIT records)
api/cwf/_lib/resultStore.ts:246  export function aggregateRecords(store, args)   (the aggregate_records tool: count/sum/avg/min/max, groupBy)
api/cwf/_lib/toolResult.ts:72  export const MAX_TOOL_RESULT_CHARS = Number(process.env.MAX_TOOL_RESULT_CHARS) || 40000;
api/cwf/_lib/toolResult.ts:174  export function findRecordArray(value)   (an object: DATA_ARRAY_KEYS, else a declared-count match, else the LONGEST array; one array only)
api/cwf/_lib/toolResult.ts:382  export function formatToolResult(raw, toolName, store?, opts?)
api/cwf/_lib/toolResult.ts:501-503  storeAxis = truncated ? 'call' : (forceStore ? 'turn' : null); if (storeAxis && store) { const handle = store.register(...)
api/cwf/_lib/toolResult.ts:548  fieldSummaries: summarizeFields(found.records ...)   (the ONLY production call of summarizeFields: the stored path)
api/cwf/_lib/toolResult.ts:574  return JSON.stringify(summaryOut);   (stored path)
api/cwf/_lib/toolResult.ts:587-591  out = { ...paginationFields, ...found.container, [found.key]: kept }  or  { ...paginationFields, records: kept }
api/cwf/_lib/toolResult.ts:615  return JSON.stringify(out);   (inline path)
api/cwf/_lib/turn/stageTools.ts:2032  return { result: withCompletenessAccount(formatted, observation) };   (at the P1-A floor; P1-A ledgers this string)
```

## PREMISE

MEASURED: 2026-09-21T19:10Z, git grep over origin/master: summarizeFields has one production caller, toolResult.ts:548, inside the stored branch. (A first grep with a narrower pathspec returned only the test file; the second lens found the caller. Recorded so nobody repeats the first reading.)
UNMEASURED in S151: the Q3 digest row was not re-read this session; the P1-A card's evidence digest (read from public.turn_trace_digest at 2026-09-21T16:30Z) says the getOeeValuesForZones payload is 8195 bytes, shaped {"<zone uuid>": [rows], ...} for three zones, integer-percent values. This card does not depend on that row: ORDER 0 builds a synthetic fixture of that shape.
UNMEASURED: what formatToolResult returns for that exact payload today (which array findRecordArray picks, whether the other zones survive in the container spread). ORDER 0 measures it.
UNMEASURED: how many production tool payloads are grouped by key versus flat arrays. The report prints the count over the fixtures in the repository.
SELF-INVALIDATION: dies if origin/master moves by a commit touching toolResult.ts or resultStore.ts other than the P1-A merge.

## ORDERS

ORDER 0 - MEASURE FIRST (no code). At your head: re-print every line in `lines`, SAME or DIFFERENT. Build a SYNTHETIC fixture in the Q3 shape (three group keys, each an array of hourly rows with integer-percent fields and one epoch-ms timestamp field) and print what formatToolResult returns for it with a ResultStore and without one: which key findRecordArray picked, whether all three groups are present in the output, and the output length. Run the existing resultStore and toolResult tests and print counts.

ORDER 1 - ONE PURE FUNCTION. New module beside resultStore.ts, for example inlineAggregates.ts, exporting a pure function over the PARSED payload that returns an aggregates block or null:
(a) GROUPED shape: an object where two or more values are non-empty arrays of plain records -> one entry per group key.
(b) FLAT shape: the array findRecordArray returns -> one entry under a fixed key such as "_all".
For each numeric field of each group: count, sum, avg, min, max, rounded with resultStore's existing rounding. A field counts as numeric under summarizeFields' own rule (every non-null value numeric). Exclude a field whose values look like epoch timestamps (magnitude at or above 1e11) and name the rule in the report: an average of timestamps is noise and a false-sourcing source for P1-A. Scan at most SUMMARY_SCAN_LIMIT rows per group; if a group has more, that group's entry carries `scanned: "<n>/<total>"` (partial is not complete). Caps: at most 50 groups and 20 fields per group; beyond that, `_aggregatesCapped: true` with the counts that were dropped. No backend name, no field name and no tenant word in the code (AGNOSTIC-1): the function knows shapes, not vocabulary.

ORDER 2 - ATTACH IT WHERE THE MODEL READS. In formatToolResult, on BOTH the inline return (:615) and the stored return (:574), add the block as `_aggregates` when the function returns non-null. The raw rows, the sample, the handle and every existing key stay byte-identical; only the new key is added. The block also carries one fixed sentence, `_aggregatesNote`, in the house note style: these values were computed by code over the rows in this result; cite them rather than computing your own. If adding the block would push an inline result past MAX_TOOL_RESULT_CHARS, drop the block rather than any row, and set `_aggregatesDropped: "size"`.

ORDER 3 - A GOVERNED OFF SWITCH. Add `result.inlineAggregates` as a boolean agent.param, floor 1 (on), sessionTweakable false, APPENDED at the tail of the reference array; update learnBrake.test.ts's tail-relative pins by exactly one, with a comment naming this card, as the WEB-VALVE card and RULING-A24-P1A-ORDER4-S151-1 did. Read it where the other result-shaping params are read. 0 means formatToolResult behaves exactly as at origin/master. No migration and no seed row; if your head needs either, STOP and name it. The owner flips it in the admin UI; no lane publishes it.

ORDER 4 - TESTS, failing-first, each proven by planting the fault it guards and removing the plant. Synthetic numbers and names only; check:tenant-zero over them. (a) the Q3-shaped fixture -> three group entries, each with the correct avg of its own rows; (b) a flat array -> one "_all" entry; (c) timestamp-magnitude field excluded; (d) mixed field (numbers and strings) excluded; (e) scan cap -> `scanned` stamp; (f) group and field caps -> `_aggregatesCapped`; (g) size cap -> rows kept, block dropped, `_aggregatesDropped`; (h) switch 0 -> output byte-identical to origin/master for the same fixtures (pin the literal); (i) END-TO-END WITH P1-A: the Q3 fixture through formatToolResult and then through P1-A's ledger and numeric check, with an answer that states one group's average -> numeric.unsourced = 0; the same answer against switch 0 -> 1. Plants: drop the grouped branch and show (a) red; drop the timestamp rule and show (c) red; restore both.

ORDER 5 - ONE PULL REQUEST, --no-ff, never a squash. npm run build (all five gates; if check:doc-drift names a tab, update that tab's diagram and run npm run reseal in the SAME commit, inside public/architecture/) and the full suite locally; print counts as local results on an unsynchronised head. Read CI at the pushed head by the full forty-hex sha, twice if the first read is zero. Report at the path above on the same branch; it follows the landing and never gates it. The report prints ORDER 0's measurements, the size delta on the Q3-shaped fixture, and which existing tests (if any) needed an edit and why. Slip with the head, the PR number, and fixture (i)'s two values.

## FALSIFIER

If any existing test literal outside learnBrake.test.ts's tail pins changes, STOP and name it: this card adds a key, it changes nothing that is there. If the Q3-shaped fixture shows that formatToolResult already drops two of the three zones before the model sees them, STOP and report it as a separate defect with the bytes; do not repair it inside this card. If attaching the block needs stageTools.ts or any file of P1-A's fence, STOP and name the line. If fixture (i) cannot be built because P1-A's ledger does not read formatToolResult's output at your head, STOP and name what it reads.

## SHARED SURFACES

```scope
- api/cwf/_lib/inlineAggregates.ts (new)
- api/cwf/_lib/toolResult.ts (the two return points, :574 and :615, and the param read; nothing else)
- api/cwf/_lib/knowledge/reference/agentParams.ts (one boolean key appended at the tail)
- api/cwf/__tests__/learnBrake.test.ts (tail pins shifted by exactly one, one new pin)
- api/cwf/__tests__/ and api/cwf/_lib/__tests__/ (new tests and their synthetic fixtures)
- public/architecture/ (only the tabs check:doc-drift names, plus manifest.json by npm run reseal)
- docs/relay/A24-P1B-INLINE-AGGREGATES-S151-1-AG4-report.md
```

## DECISION RIGHTS

You choose the module and test names, the exact note sentence, and the numeric and timestamp detection details within ORDER 1. You may refuse on evidence this card did not anticipate. FORBIDDEN: no removal or rewrite of any existing key or row in a tool result; no change to aggregateRecords or the aggregate_records tool; no change to P1-A's files; no backend, field or tenant name in code or fixtures; no migration; no merge; no adversary/scout post on your own head; no poll or cron task; never print an environment value.

END · CARD-A24-P1B-INLINE-AGGREGATES-S151-1-v1
=== END CARD ===

END · ORDER-SCOUT-REVIEW-CARD-A24-P1B-INLINE-AGGREGATES-S151-1-v1
