<!-- relay-audit: v1 kind=card -->
CARD-DIGEST-SPAN-CAP-S152-1-v2

LANE: AG-4
fanout: personalized (one lane, one body)
MEASURED-AT: 2026-09-21T21:00Z (bus clock)
SUPERSEDES CARD-DIGEST-SPAN-CAP-S152-1-v1, which scout-2 held RED (SCOUT-STATUS-REVIEW-CARD-DIGEST-SPAN-CAP-S152-1-v1, bus 2026-09-21T20:54:08Z): "the premise itself holds"; one MUST-CHANGE (M1, the client type outside the fence) and six edits (R1–R6). This v2 applies M1 and R1–R6 EXACTLY as the scout wrote them and changes nothing else; every correction is credited to scout-2 by name (S112-YASA-1). The Architect's blind spot: it named the renderer's surface without grepping the client type that feeds it, and it copied line numbers from a sed that had drifted by a few lines.
OWNER APPROVAL: OWNER-APPROVAL-S152-DIGEST-SPAN-CAP-1, the owner's words at 23:27 TSI: "1-) onay". Closes register item 48 (F-S152-DIGEST-SPAN-CAP-DROPS-TAIL-SILENTLY-1). TAKE THIS NOW: your P1-B card waits for PR #590 and this one does not; WIP stays one (WAVE-A24-PARALLEL-PLAN-S151-1-v1 M1).
ADVERSARY GATE ON THIS CARD: LIFTED BY NAME under OWNER-RULING-S133-P6-SCOPE-AND-LOOP-1 and project instructions 12.1: v2 repeats the subject of superseded v1 and applies exactly the scout's named delta (the loop-breaking case). The PR this card produces still goes to the scout for adversary/scout on its head.
BRANCH: phase/digest-span-cap-s152-1 · PUSH: yes · REPORT: docs/relay/DIGEST-SPAN-CAP-S152-1-AG4-report.md · PR: yes, opened in THIS card on the same branch as the report.
Work in your own worktree (git worktree add off origin/master). Take code context with graft first and write the GRAFT line in your slip.

```evidence:adversary
ADVERSARY: EXEMPT
ack: 6bc13da6-ff71-4ba6-92a7-d589dacb551d
```

PRECONDITION: git ls-remote origin refs/heads/master prints the sha in `floor` or a descendant that does not touch api/cwf/_lib/observability/digestBuilder.ts, its test, src/lib/adminService.ts or src/components/admin/TurnDigestSection.tsx. If one does, STOP and print it.
ON-DISAGREEMENT: if any line or behaviour below differs at your head, YOUR READING WINS: print both; the difference is a finding in the report.

THE PROBLEM, in plain words. The turn digest (turn_trace_digest.stages) keeps at most twenty spans per stage and drops every span after the twentieth WITHOUT SAYING SO. The db-read list in the same bucket already carries an honest "showing N of M" stamp (R3, dbReadsTruncated); the span list does not. The dropped part is the TAIL, and the tail is where the verdict spans live (final stream, stream-attempt decision, grounding verdict). In the owner's Q4 (S149) five tool rounds filled the twenty slots and the digest shows no grounding span — read for two sessions as "grounding did not run" (register item 48). It ran; the ledger lost the page. partial ≠ complete (project instructions §2). This card makes the cut LOUD, keeps the tail, and shows the cut in the admin panel.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| the lines below at origin/master | MEASURED: scout-2's re-measurement at origin/master, SCOUT-STATUS-REVIEW-CARD-DIGEST-SPAN-CAP-S152-1-v1, 2026-09-21T20:54Z (the Architect's 20:33Z sed had drifted on six of them) | lines |
| the consumers of a stage bucket | MEASURED: scout-2's two lenses (graft .spans; git grep for positional reads), same status | consumers |
| the live digest shape | MEASURED: select over turn_trace_digest, Supabase MCP, 2026-09-21T20:27Z; row count re-measured SAME by scout-2 via list_tables | rows |

```evidence:floor
lane-refreshed tracking ref origin/master in the owner clone at 2026-09-21T20:07Z -> 9cb7fefc947745bec1fdd97aff62d58c34c47919 (scout-2 ls-remote at 20:54Z: SAME)
```

```evidence:lines
api/cwf/_lib/observability/digestBuilder.ts:17  export const DIGEST_MAX_SPANS_PER_STAGE = 20;
api/cwf/_lib/observability/digestBuilder.ts:18  export const DIGEST_MAX_DB_READS_PER_STAGE = 30;
api/cwf/_lib/observability/digestBuilder.ts:20  export const DIGEST_MAX_BLOB_CHARS = 60_000;
api/cwf/_lib/observability/digestBuilder.ts:56-63  interface DigestStageBucket { spans; dbReads?; dbReadsTruncated?: DigestReadTruncation; routing? }
api/cwf/_lib/observability/digestBuilder.ts:80  the "kept < total is the ONLY state worth stamping" doc
api/cwf/_lib/observability/digestBuilder.ts:117-122  interface DigestReadTruncation { kept; total }  (:120-121 doc: "How many `cwf.db.read` spans this stage actually fired")
api/cwf/_lib/observability/digestBuilder.ts:124-131  the builder's stated bounded-work property (caps applied during the single pass)
api/cwf/_lib/observability/digestBuilder.ts:140  const totalReadsByStage = new Map<string, number>();
api/cwf/_lib/observability/digestBuilder.ts:160-166  } else if (bucket.spans.length < DIGEST_MAX_SPANS_PER_STAGE) { bucket.spans.push({...}); }   (the twenty-first span is dropped here, silently; no denominator for spans)
api/cwf/_lib/observability/digestBuilder.ts:179-187  const stampTruncation = (): void => { ... dbReadsTruncated = { kept, total } ... }   (db reads only)
api/cwf/_lib/observability/digestBuilder.ts:205-214  the halving loop; the slice at :209 keeps the HEAD; stampTruncation re-run at :212
api/cwf/_lib/observability/digestBuilder.ts:215-228  the names-only fallback
api/cwf/_lib/observability/digestBuilder.ts:229-233  stages.__truncated = { ... 'never a silent drop' }
api/cwf/_lib/observability/__tests__/digestBuilder.test.ts:89-94  cap test (length only) · :105-119 bounded + flagged test · :91 keys stage '11'
api/cwf/_lib/observability/digestSink.ts:93-97  caps buffered TRACES at 200, not entries per trace (so a builder-side count IS the true total)
src/lib/adminService.ts:595-601  TurnTraceDigestStageBucket: the client's OWN type of the bucket — has dbReadsTruncated, no spansTruncated
src/components/admin/TurnDigestSection.tsx:126-140  DbReadLedger renders "showing N of M reads" (TR/EN), fed at :318 by bucket.dbReadsTruncated
src/components/admin/TurnDigestSection.tsx:303-305  the span list renders here
src/lib/turnDigestDedupe.ts:28-41  dedupeStageSpans merges identical I/O across neighbours
```

```evidence:consumers
readers of bucket.spans: renderDecisionPreview.ts:53, candidateMemoryPreview.ts:48/55/65, knowledgeStageActivity.ts:41-42, turnDigestDedupe.ts:24-43 — all map/filter/find/some; positional reads only in tests (knowledgeDigestAttrs.test.ts:59/63, digestSink.test.ts:219-220/245, spans[0]) and the head's first entry survives ORDER 1
no SQL or script reader of the jsonb spans; nothing else pins "20 spans" (git grep over api src scripts public docs/ground docs/laws: only digestBuilder.ts:17/160 and its test)
tool-loop readers and tests key stage '11' (renderDecisionPreview.ts:47, candidateMemoryPreview.ts:54, digestBuilder.test.ts:91)
```

```evidence:rows
turn_trace_digest: 162 rows; max spans in any stage = 20; stages at exactly 20 = 19 (all stage 10); stages over 20 = 0 (Architect, Supabase MCP, 20:27Z; the scout could not re-read rows and marks max/19/tails UNMEASURED from its side)
Q3 = row created_at 2026-09-21T04:51:47Z: stage 10 spans 18-20 = ai.streamText, cwf.stream.attempt {"decision":"accept","finishReason":"stop","empty":false}, cwf.grounding {"ok":true,"violationCount":0,"violationKinds":[]}
Q4 = row created_at 2026-09-21T04:53:10Z: stage 10 has exactly 20 spans; spans 19-20 = ai.toolCall, ai.streamText.doStream; no ai.streamText, no cwf.stream.attempt, no cwf.grounding; stages 12 and 14 present
```

## PREMISE

MEASURED: 2026-09-21T20:54Z, scout-2's re-measurement of every line in `lines` and both consumer lenses (evidence lines, consumers).
MEASURED: 2026-09-21T20:27Z, the live digest counts and the Q3/Q4 span tails (evidence rows), by the Architect.
UNMEASURED: whether the ai.* tool-round spans sit under stage '10' or '11' in the live digest (scout R6). ORDER 0 measures it from the builder's stage attribution and one test fixture; it changes no order below.
SELF-INVALIDATION: dies if origin/master moves by a commit touching any file in the scope fence.

## ORDERS

ORDER 0 - MEASURE FIRST (no code). Re-print every line in `lines`, SAME or DIFFERENT. Print how the builder assigns stageNo to ai.* spans (which stage key the tool loop's spans land under) and one fixture that shows it (scout R6). Run the digestBuilder tests and print counts.

ORDER 1 - COUNT THE DENOMINATOR, KEEP THE TAIL, KEEP THE BOUNDED-WORK PROPERTY (scout R4). Mirror R3 for spans: count `totalSpansByStage` as entries arrive; keep a HEAD array of at most (DIGEST_MAX_SPANS_PER_STAGE − DIGEST_TAIL_KEEP) entries and a TAIL ring buffer of DIGEST_TAIL_KEEP entries during the single pass (no unbounded array); at the end of the pass, if total ≤ cap the list is byte-identical to today's output; otherwise the list is head followed by tail, in original order, exactly DIGEST_MAX_SPANS_PER_STAGE long. DIGEST_TAIL_KEEP is an exported constant of at least 5.

ORDER 2 - STAMP THE CUT WITH ITS OWN TYPE (scout R1). Add `spansTruncated?: DigestSpanTruncation` to DigestStageBucket at :56-63, where `DigestSpanTruncation { kept; total }` is a NEW interface with its own doc ("how many spans this stage actually fired / how many survive") — do NOT reuse DigestReadTruncation under its db-read doc (:120-121). Stamp inside stampTruncation (:179-187) from the denominator, idempotent, re-run at every exit exactly as the db-read stamp is (:212). An untruncated stage carries no stamp (:80).

ORDER 3 - THE HALVING LOOP KEEPS THE TAIL TOO, WITH A FLOOR (scout R3). At :205-214 the halving keeps the last DIGEST_TAIL_KEEP spans and takes the rest from the head; when ceil(n/2) ≤ DIGEST_TAIL_KEEP the result is the FIRST span of the stage (the stage's own cwf.stage.NN span) followed by the last (ceil(n/2) − 1) spans, never an empty head. The stamp is re-run after each round as today. The names-only fallback (:215-228) is unchanged.

ORDER 4 - THE READER (scout M1, R5). (a) Add ONE optional field `spansTruncated?: { kept: number; total: number }` to TurnTraceDigestStageBucket in src/lib/adminService.ts:595-601. (b) In src/components/admin/TurnDigestSection.tsx, at the span list (:303-305), render one line in the DbReadLedger wording pattern (:126-140, TR/EN) — "showing N of M spans" — when bucket.spansTruncated is present, and a visible GAP MARKER row between the head and the tail (one row, text "… <total − kept> spans not shown …" in the same TR/EN pattern) so the reader sees WHERE the cut sits; dedupeStageSpans (turnDigestDedupe.ts:28-41) must not merge across the marker (the marker is not a span; render it outside the dedupe input). No other UI change.

ORDER 5 - TESTS, failing-first, plant proven. (a) thirty spans into one stage -> twenty kept, the LAST five of the thirty present in order at the end, spansTruncated {kept:20,total:30}; (b) twenty spans -> no stamp, output byte-identical to the current expectation; (c) the halving loop over a blob that exceeds DIGEST_MAX_BLOB_CHARS keeps each stage's last DIGEST_TAIL_KEEP spans and stamps kept/total; (d) the floor case: a stage halved to ≤ DIGEST_TAIL_KEEP keeps its first span; (e) a stage with only db-read spans gets no spansTruncated; (f) a render test that the ledger line and the gap marker appear only when spansTruncated is present. Keep :89-94 and :105-119 passing unedited. Plant: restore the head-only push at :160 and show (a) red; restore.

ORDER 6 - ONE PULL REQUEST, --no-ff, never a squash. npm run build (all five gates; if check:doc-drift names a tab, update its diagram in public/architecture/diagrams/ or the description text in src/components/admin/stagesRegistry.ts and run npm run reseal in the SAME commit; if master moved, git merge origin/master first, then reseal). Full suite locally, counts named as local results on an unsynchronised head. Read CI at the pushed head by the full forty-hex sha, twice if the first read is zero. Report on the same branch; it follows the landing. Slip with the head, the PR number, ORDER 0's stage-key measurement and the GRAFT line.

## FALSIFIER

If any existing digestBuilder test literal changes other than by addition, STOP and name it. If a consumer of bucket.spans depends on the list being head-only (an index assumption the scout's two lenses missed), STOP and name the file:line. If the stamp ever appears on a stage whose list was not cut, the test is red. If the gap marker ever enters dedupeStageSpans' input, the render test is red.

## SHARED SURFACES

```scope
- api/cwf/_lib/observability/digestBuilder.ts
- api/cwf/_lib/observability/__tests__/digestBuilder.test.ts (additions only; :89-94 and :105-119 unedited)
- src/lib/adminService.ts (TurnTraceDigestStageBucket: one optional field)
- src/components/admin/TurnDigestSection.tsx (the span list at :303-305: one ledger line and one gap-marker row) and its test
- public/architecture/diagrams/ and src/components/admin/stagesRegistry.ts (description text only) for the tabs check:doc-drift names, plus public/architecture/manifest.json by npm run reseal
- docs/relay/DIGEST-SPAN-CAP-S152-1-AG4-report.md
```

## DECISION RIGHTS

You choose DIGEST_TAIL_KEEP (at least five), the ring-buffer shape, the marker's exact TR/EN wording within the DbReadLedger pattern, and the test names. FORBIDDEN: no change to DIGEST_MAX_SPANS_PER_STAGE, DIGEST_MAX_DB_READS_PER_STAGE or DIGEST_MAX_BLOB_CHARS; no change to the db-read path or its type; no change to the sink or the table; no production write; no migration; no merge; no adversary/scout post on your own head; no poll or cron task; never print an environment value.

END · CARD-DIGEST-SPAN-CAP-S152-1-v2
