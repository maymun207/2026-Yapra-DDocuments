ORDER-SCOUT-REVIEW-CARD-DIGEST-SPAN-CAP-S152-1-v1

LANE: scout (window scout-2, AFTER ORDER-SCOUT-REVIEW-CARD-LANE-BUS-WAKE-HOOK-S152-1-v1 is answered; scout-1 stays on ORDER-SCOUT-LAND-PR590-S151-1-v1)
FROM: Architect, S152, 2026-09-21T20:40Z
OWNER APPROVAL: OWNER-APPROVAL-S152-DIGEST-SPAN-CAP-1 ("1-) onay", 2026-09-21 23:27 TSI).
PRECONDITION: none on master beyond the card's own. Take code context with graft first and write the GRAFT line in your status.

WHAT: adversarial review of the card below — a NEW subject, so it comes to you first (12.1). Card body = the bytes AFTER the BEGIN marker line up to and INCLUDING the final newline before the END marker line.
sha256 = dfb293db50061667f740ae8a1c3cd6354a589f16b99bcdf43ffbe214a9a9bb9a (10385 bytes). The Architect's local cardPreflight is GREEN on all eleven checks; that is grammar, not review.

DO:
1. Run the repository card gate on those bytes, every check; print any refusal verbatim (12.13).
2. Attack the premise from the PRIMARY sources (api/cwf/_lib/observability/digestBuilder.ts, its test, digestSink.ts, and every consumer of a stage bucket). Hostile questions:
   (a) Is the twenty-first span really dropped at :160-166, and is there truly no denominator or stamp for spans anywhere (digestSink.ts, the admin panel, scripts/)? Print the grep.
   (b) Does any consumer index bucket.spans by position or assume head-only order (a renderer, a script such as the route shadow lens or the A24 recon readers)? Name file:line or print the empty grep with the lens you used.
   (c) Does keeping the tail change the SIZE behaviour: can a stage's twenty kept spans now be larger (tail spans carry outputs) so the aggregate blob crosses DIGEST_MAX_BLOB_CHARS more often? Measure on the live Q3/Q4 rows' span sizes if you can read them; otherwise say UNMEASURED.
   (d) Is DigestReadTruncation the right type to reuse for spans, or does its doc comment ("how many cwf.db.read spans this stage actually fired") make reuse a lie the card should not order?
   (e) Confirm from the live table (read-only) the card's counts: 162 rows, max 20, nineteen stage-10 buckets at 20, and that the Q4 row's stage 10 ends at ai.streamText.doStream while stages 12 and 14 are present.
   (f) Is there a test or gate elsewhere that pins the digest shape (a schema, a fixture, check:doc-drift tab text naming "20 spans")?
3. Verdict: GREEN first line exactly `ADVERSARY-VERDICT: GREEN card=CARD-DIGEST-SPAN-CAP-S152-1-v1 sha256=dfb293db50061667f740ae8a1c3cd6354a589f16b99bcdf43ffbe214a9a9bb9a`, or RED with each defect by file:line, each marked MUST-CHANGE or MAY-RIDE-AS-EDIT.
FORBIDDEN: read-only. No status post on any PR, no edit, no poll task, no cron, no production write, never print an environment value.
REPLY (on the bus): SCOUT-STATUS-REVIEW-CARD-DIGEST-SPAN-CAP-S152-1-v1. Then stop.

=== BEGIN CARD ===
<!-- relay-audit: v1 kind=card -->
CARD-DIGEST-SPAN-CAP-S152-1-v1

LANE: AG-4
fanout: personalized (one lane, one body)
MEASURED-AT: 2026-09-21T20:35Z (bus clock)
OWNER APPROVAL: OWNER-APPROVAL-S152-DIGEST-SPAN-CAP-1, the owner's words at 23:27 TSI: "1-) onay" to the fix and date stated in the S152 report. Closes register item 48 (F-S152-DIGEST-SPAN-CAP-DROPS-TAIL-SILENTLY-1). QUEUE POSITION at AG-4: after CARD-A24-P1B-INLINE-AGGREGATES-S151-1-v2 and CARD-LANE-BUS-WAKE-HOOK-S152-1 (WAVE-A24-PARALLEL-PLAN-S151-1-v1 M1, WIP one).
ADVERSARY GATE: NEW SUBJECT. Goes to the scout first (12.1); reaches AG-4 only with a GREEN verdict row.
BRANCH: phase/digest-span-cap-s152-1 · PUSH: yes · REPORT: docs/relay/DIGEST-SPAN-CAP-S152-1-AG4-report.md · PR: yes, opened in THIS card on the same branch as the report.
Work in your own worktree (git worktree add off origin/master). Take code context with graft first and write the GRAFT line in your slip.

PRECONDITION: git ls-remote origin refs/heads/master prints the sha in `floor` or a descendant that does not touch api/cwf/_lib/observability/digestBuilder.ts or its test. If one does, STOP and print it.
ON-DISAGREEMENT: if any line or behaviour below differs at your head, YOUR READING WINS: print both; the difference is a finding in the report.

THE PROBLEM, in plain words. The turn digest (turn_trace_digest.stages) keeps at most twenty spans per stage and drops every span after the twentieth WITHOUT SAYING SO. The db-read list in the same bucket already carries an honest "showing N of M" stamp (R3, dbReadsTruncated); the span list does not. The dropped part is the TAIL, and the tail is where the verdict spans live: the final stream, the stream-attempt decision and the grounding verdict all come after the tool rounds. In the owner's Q4 (S149) five tool rounds filled the twenty slots and the digest shows no grounding span — the Architect and two cards read that as "grounding did not run" for two sessions (register item 48). It ran; the ledger lost the page. Live: 162 digest rows, no stage above twenty, nineteen stage-10 buckets at exactly twenty. partial ≠ complete (project instructions §2). This card makes the cut LOUD and makes it keep the tail.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| the lines below at origin/master | MEASURED: sed and git grep over the owner clone on the bridge, 2026-09-21T20:33Z | lines |
| the live digest shape | MEASURED: select over turn_trace_digest, Supabase MCP, 2026-09-21T20:27Z | rows |

```evidence:floor
lane-refreshed tracking ref origin/master in the owner clone at 2026-09-21T20:07Z -> 9cb7fefc947745bec1fdd97aff62d58c34c47919 (not ls-remote; your ls-remote measures it)
```

```evidence:lines
api/cwf/_lib/observability/digestBuilder.ts:17  export const DIGEST_MAX_SPANS_PER_STAGE = 20;
api/cwf/_lib/observability/digestBuilder.ts:18  export const DIGEST_MAX_DB_READS_PER_STAGE = 30;
api/cwf/_lib/observability/digestBuilder.ts:19  export const DIGEST_MAX_BLOB_CHARS = 60_000;
api/cwf/_lib/observability/digestBuilder.ts:54-61  interface DigestStageBucket { spans; dbReads?; dbReadsTruncated?: DigestReadTruncation  /** R3: present ONLY when this stage's db-read list was cut — "showing N of M". */; routing? }
api/cwf/_lib/observability/digestBuilder.ts:117-122  interface DigestReadTruncation { kept: number; total: number }
api/cwf/_lib/observability/digestBuilder.ts:143  const totalReadsByStage = new Map<string, number>();   (R3 denominator, counted before any cap)
api/cwf/_lib/observability/digestBuilder.ts:160-166  } else if (bucket.spans.length < DIGEST_MAX_SPANS_PER_STAGE) { bucket.spans.push({ span: e.name, input, output, toolName?, backendId? }); }   (the twenty-first span is dropped here, silently; no denominator is counted for spans)
api/cwf/_lib/observability/digestBuilder.ts:179-187  const stampTruncation = (): void => { ... if (kept < total) bucket.dbReadsTruncated = { kept, total }; else delete bucket.dbReadsTruncated; }   (db reads only)
api/cwf/_lib/observability/digestBuilder.ts:213-221  while (JSON.stringify(stages).length > DIGEST_MAX_BLOB_CHARS && rounds < 8) { ... bucket.spans = bucket.spans.slice(0, Math.ceil(bucket.spans.length / 2)); ... stampTruncation(); rounds++; }   (halving keeps the HEAD, drops the tail again)
api/cwf/_lib/observability/digestBuilder.ts:238-242  stages.__truncated = { originalChars, cappedAtChars, note: '... never a silent drop' }   (aggregate cap is loud; the per-stage span cap is not)
api/cwf/_lib/observability/__tests__/digestBuilder.test.ts:89-94  it('per-stage span list is capped at DIGEST_MAX_SPANS_PER_STAGE' ... expect(stages['11'].spans).toHaveLength(DIGEST_MAX_SPANS_PER_STAGE);
```

```evidence:rows
turn_trace_digest: 162 rows; max spans in any stage = 20; stages at exactly 20 = 19 (all of them stage 10); stages over 20 = 0
Q3 = row created_at 2026-09-21T04:51:47Z: stage 10 spans 18-20 = ai.streamText, cwf.stream.attempt {"decision":"accept","finishReason":"stop","empty":false}, cwf.grounding {"ok":true,"violationCount":0,"violationKinds":[]}
Q4 = row created_at 2026-09-21T04:53:10Z: stage 10 has exactly 20 spans; spans 19-20 = ai.toolCall, ai.streamText.doStream; no ai.streamText, no cwf.stream.attempt, no cwf.grounding; stages 12 and 14 (cwf.flush) present, so the turn completed
(turn ids are 32-hex and are not written here — CP-8; select them by created_at)
```

## PREMISE

MEASURED: 2026-09-21T20:33Z, the Architect's sed over digestBuilder.ts and its test at the `floor` sha (evidence lines).
MEASURED: 2026-09-21T20:27Z, the live digest counts and the Q3/Q4 span tails (evidence rows).
UNMEASURED: which consumers render bucket.spans and dbReadsTruncated (admin panel, scripts); ORDER 0 greps them so the span stamp reaches the same readers.
SELF-INVALIDATION: dies if origin/master moves by a commit touching digestBuilder.ts or its test.

## ORDERS

ORDER 0 - MEASURE FIRST (no code). Re-print every line in `lines`, SAME or DIFFERENT. git grep the CONSUMERS (12.6): `dbReadsTruncated`, `__truncated`, `.spans` under src/ and scripts/ and api/ — name every reader of a stage bucket, and whether any renders "showing N of M" for db reads. Run the digestBuilder tests and print counts.

ORDER 1 - COUNT THE DENOMINATOR, KEEP THE TAIL. Mirror R3 for spans: count `totalSpansByStage` as entries arrive (before any cap), bucket every span uncapped during the pass, then cut each over-cap list to exactly DIGEST_MAX_SPANS_PER_STAGE entries formed as the first (cap minus TAIL_KEEP) entries followed by the LAST TAIL_KEEP entries, in original order, where TAIL_KEEP is an exported constant of at least 5 (DIGEST_TAIL_KEEP). The tail is where the stream verdict and the grounding verdict live; it is never the part that is dropped. A list at or under the cap is byte-identical to today's output.

ORDER 2 - STAMP THE CUT. Add `spansTruncated?: DigestReadTruncation` to DigestStageBucket beside dbReadsTruncated with the same doc comment shape ("present ONLY when this stage's span list was cut — showing N of M"), stamped inside stampTruncation from the denominator, idempotent, re-run at every exit exactly as the db-read stamp is (:179-187, :218). An untruncated stage carries no stamp (kept < total is the only stamped state, :80).

ORDER 3 - THE HALVING LOOP KEEPS THE TAIL TOO. At :213-221 the halving must keep the last TAIL_KEEP spans (or all of them when the list is shorter) and take the rest from the head; the stamp is re-run after each round as today. The names-only fallback (:224-235) is unchanged.

ORDER 4 - THE READER. Wherever ORDER 0 found a renderer of dbReadsTruncated (a "showing N of M" line), render spansTruncated the same way, one line, same wording pattern; if none exists, say so with the grep and change no renderer.

ORDER 5 - TESTS, failing-first, plant proven. (a) thirty spans into one stage -> twenty kept, the LAST five of the thirty present in order at the end, spansTruncated {kept:20,total:30}; (b) twenty spans -> no stamp, output byte-identical to the current test's expectation; (c) the halving loop over a blob that exceeds DIGEST_MAX_BLOB_CHARS keeps each stage's last TAIL_KEEP spans and stamps kept/total; (d) a stage with only db-read spans gets no spansTruncated. Keep :89-94 passing unedited. Plant: restore the head-only slice at :160 and show (a) red; restore.

ORDER 6 - ONE PULL REQUEST, --no-ff, never a squash. npm run build (all five gates; if check:doc-drift names a tab, update its diagram in public/architecture/diagrams/ or the description text in src/components/admin/stagesRegistry.ts and run npm run reseal in the SAME commit; if master moved, git merge origin/master first, then reseal). Full suite locally, counts named as local results on an unsynchronised head. Read CI at the pushed head by the full forty-hex sha, twice if the first read is zero. Report on the same branch; it follows the landing. Slip with the head, the PR number, ORDER 0's consumer list and the GRAFT line.

## FALSIFIER

If any existing digestBuilder test literal changes other than by addition, STOP and name it. If a consumer of bucket.spans depends on the list being head-only (an index assumption), STOP and name the file:line — the reader must be repaired in the same card or the tail rule is wrong. If the stamp ever appears on a stage whose list was not cut, the test is red.

## SHARED SURFACES

```scope
- api/cwf/_lib/observability/digestBuilder.ts
- api/cwf/_lib/observability/__tests__/digestBuilder.test.ts (additions only; :89-94 unedited)
- the renderer ORDER 0 finds for dbReadsTruncated, if any (one added line for spansTruncated)
- public/architecture/diagrams/ and src/components/admin/stagesRegistry.ts (description text only) for the tabs check:doc-drift names, plus public/architecture/manifest.json by npm run reseal
- docs/relay/DIGEST-SPAN-CAP-S152-1-AG4-report.md
```

## DECISION RIGHTS

You choose TAIL_KEEP (at least five), the type name if you prefer a span-specific alias of DigestReadTruncation, and the test names. FORBIDDEN: no change to DIGEST_MAX_SPANS_PER_STAGE, DIGEST_MAX_DB_READS_PER_STAGE or DIGEST_MAX_BLOB_CHARS; no change to the db-read path; no change to the sink or the table; no production write; no migration; no merge; no adversary/scout post on your own head; no poll or cron task; never print an environment value.

END · CARD-DIGEST-SPAN-CAP-S152-1-v1
=== END CARD ===

END · ORDER-SCOUT-REVIEW-CARD-DIGEST-SPAN-CAP-S152-1-v1
