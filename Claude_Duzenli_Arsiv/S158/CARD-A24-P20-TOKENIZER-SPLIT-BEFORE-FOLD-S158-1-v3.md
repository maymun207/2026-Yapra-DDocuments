<!-- relay-audit: v1 kind=card -->
CARD-A24-P20-TOKENIZER-SPLIT-BEFORE-FOLD-S158-1-v3

LANE: AG-2 (fresh window: one card per window; PR 611 has landed, so you are free)
fanout: personalized (one lane, one body)
SUPERSEDES: CARD-A24-P20-TOKENIZER-SPLIT-BEFORE-FOLD-S158-1-v2 (scout RED ON EDITS, not design: E-A..E-E, SCOUT-STATUS-REVIEW-CARD-A24-P20-TOKENIZER-SPLIT-BEFORE-FOLD-S158-1-v2, bus 2026-09-23T09:34:45Z; v3 = v2 plus E-A..E-E verbatim in the AMENDMENTS section, E-C by its recommended option). v2 superseded CARD-A24-P20-TOKENIZER-SPLIT-BEFORE-FOLD-S158-1-v1 (scout RED ON DESIGN D1, D2 plus edits E1-E5: SCOUT-STATUS-REVIEW-CARD-A24-P20-TOKENIZER-SPLIT-BEFORE-FOLD-S158-1-v1, bus 2026-09-23T09:22:28Z). v2 applies D1 option (a) by ARCHITECT RULING (case invariance is KEPT: the fix is additive), D2 as the scout wrote it, and E1-E5 verbatim; each marked. Scout credit: the case-invariance break and the false stored-consumer premise were the scout's findings.
MEASURED-AT (v2): 2026-09-23T09:28Z
MEASURED-AT (v1): 2026-09-23T06:11Z (bridge clock, date -u in the command that wrote this file)
OWNER APPROVAL: S158 plan approval "onayliyorum", 2026-09-23 08:40 TSI (step 5: P2-0/P2-1 cut and sent to the scout); OWNER-APPROVAL-S150-A24-V1_3-FINAL-1; OWNER-APPROVAL-S151-PARALLEL-1 (AG-2 owns retrieval). Register item 51 (tokenizer camelCase-after-fold) and 40d P2-0.
ADVERSARY GATE: EXEMPT, named: v3 repeats v2's subject and applies only the scout's complete edit delta; the design was checked and held (loop-breaking case, OWNER-RULING-S133-P6-SCOPE-AND-LOOP-1, project instructions 12.1). v3 cut 2026-09-23T09:50Z.

```evidence:adversary
ADVERSARY: EXEMPT
ack: 5f9fe5a2-9da7-4ffc-a31e-08b9960da351
```
BRANCH: phase/a24-p20-tokenizer-s158-1 off origin/master · PUSH early · REPORT docs/relay/A24-P20-TOKENIZER-S158-1-AG2-report.md with a FILE-FENCE block · PR: yes, non-draft.
GRAFT: code context from graft first; slip and report carry a GRAFT line.

THE PROBLEM, in plain words. The Path-B/vector tokenizer (pathB/bm25.ts tokenizeFor, the ONLY fold-then-split site; learnableCorpus.ts:230/:242 and metricVocabDiscovery.ts:242/:251/:260 already split first, E1) folds a string to lower case BEFORE it splits identifiers on camelCase boundaries. After folding there are no capitals left, so the camelCase split can never fire: a tool name like getDailyOeeValues stays ONE token instead of get, daily, oee, values. Every lexical match against tool names through tokenizeFor (the channel-2 BM25 of P2-1 and the incumbent vector encoder that Yol B tool retrieval uses per turn) therefore misses the words the names are made of. The learnable-corpus admit set is NOT affected (E1). This card characterises today's behaviour in tests, then splits BEFORE folding, and measures what changes. (D2) The incumbent vector encoder's index is IN-MEMORY and rebuildable (incumbentEngine.ts:19-23); the only stored index (Qdrant) is built by the BGE-M3 encoder, which never calls tokenizeFor. So the encoder FOLLOWS the fix and its id incumbent-hashed-v1-d96 is bumped (encoder.ts:115-122), keeping the lexical and vector lanes on one alphabet (encoder.ts:32-38).

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| master at cut time, after PR 611 | MEASURED: GitHub API commits/master, Architect bridge, 2026-09-23T09:50Z; the scout re-measured every lines anchor at it, same lines | master |
| the lines cited below | MEASURED: git grep -n and git show at the master anchor on the owner clone's remote-tracking ref, Architect bridge, 2026-09-23T06:11Z | lines |

```evidence:master
0b14ef3bf6cea0296a02e28aa11e9ec224a6043b
```

```evidence:lines
api/cwf/_lib/routing/learnableCorpus.ts:179-181  export function foldKey(s) { return turkishFold(s).replace(COMBINING_DOT_ABOVE, '') }
api/cwf/_lib/routing/learnableCorpus.ts:194-200  export function splitIdentifier(name): camelCase ([a-z0-9])([A-Z]) and ([A-Z]+)([A-Z][a-z]) boundaries, then split on [^\p{L}\p{N}]+
api/cwf/_lib/routing/learnableCorpus.ts:220  const foldTokens = (raw) => tokenize(foldKey(raw))   (tokenize injected; fold FIRST)
api/cwf/_lib/routing/metricVocabDiscovery.ts:213  const foldTokens = (raw) => tokenize(foldKey(raw)).map(foldKey).filter(Boolean)
api/cwf/_lib/pathB/bm25.ts:131-134  export function tokenizeFor(raw, profile) { const folded = foldKey(raw); ...; return rejoinSpacedDigits(splitIdentifier(prepared)) }
api/cwf/_lib/pathB/bm25.ts:180-181,229  tokenizeFor callers inside the BM25 index and query
api/cwf/_lib/vectorLane/encoder.ts:40,138  import { tokenizeFor }; const tokens = tokenizeFor(text, 'match'); return { dense: denseOf(tokens, dims), sparse: sparseOf(tokens) }
scripts/pbFullMeasure.ts:170  tokenizeFor(surface, 'match')
```

## PREMISE
MEASURED: the anchors above.
READ from the scout's v1 review (2026-09-23T09:22Z): the injected tokenize in learnableCorpus/metricVocabDiscovery is extractKeywords over prose; the incumbent index is in-memory; the live vector.* values are UNMEASURED (Operator's read, not a lane's).
SELF-INVALIDATION: dies if any symbol above is absent at your head (STOP and print both).
ON-DISAGREEMENT: YOUR READING WINS: print both values, continue with yours.

## FALSIFIER
A characterisation test that pins today's output FIRST (getDailyOeeValues -> one token) must go red when the fix lands and be replaced by the new expectation in the same commit, named in the report. The dotted/dotless-I cases (İ, I, ı, i in upper and mixed-case identifiers such as İstasyonListesi, getISTANBULLines) must fold exactly as today per token (E5). (D1 d) For every fixture x, tokenizeFor(x) contains the whole-token of tokenizeFor(lowercase(x)). (E5, replacing the old encoder clause) the encoder follows tokenizeFor and its id is bumped; any consumer whose output changes beyond the additive camelCase parts: STOP and name it.

## ORDERS
0. MEASURE, no code: re-print every line in `lines`; name the production `tokenize` injected at learnableCorpus.ts:220 and metricVocabDiscovery.ts:213; list every caller of tokenizeFor, foldKey and splitIdentifier (graft callers first, then git grep); for each, say whether its output is STORED (index, table, file) or computed per turn. Print tokenizeFor(x,'match') and (x,'stats') today for: getDailyOeeValues, getLineStopsReportForZones, OEEReport, İstasyonListesi, getISTANBULLines, "günlük OEE", "A 1 2", (D1 c) ZoneZ3, zonez3, ZONEZ3, LineL1, linel1, LINEL1, getdailyoeevalues, (E2) hattiOzeti and getİSTANBULLines (Turkish letters make no camelCase boundary: RESIDUAL, fix belongs in learnableCorpus.splitIdentifier, AG-1 fence).
1. CHARACTERISATION TESTS first, pinning today's output for the ORDER 0 strings (committed before the fix, so the diff shows the change).
2. THE FIX, one place (D1 option a, ARCHITECT RULING: case invariance is kept): tokenizeFor keeps today's fold-first token stream AND ADDS the camelCase parts of a raw token only when splitIdentifier on the raw token yields more than one part (additive, deduplicated), so every case variant still carries the whole folded token. Name the TF/length effect against the rejoinSpacedDigits no-double-count note and measure it. (E3) Amend bm25.ts:21-30 LAW 1 and the tokenizeFor doc (:121-129) in the same commit: fold order is now observable only through the added parts. No second tokenizer.
3. (D2) NO legacy profile. The incumbent encoder follows tokenizeFor; bump its id incumbent-hashed-v1-d96 (encoder.ts:115-122) to the next version; re-measure and name the pinned tests: vectorLane.test.ts, admission.test.ts, routing/__tests__/toolRetrieval.test.ts, toolRetrievalAcceptance.test.ts, pathBBm25.test.ts, pathBEntityRankSeam.test.ts. Say in the report that Yol B tool retrieval's per-turn ranking changes by the added parts and that the live vector.* switch values are the Operator's read (UNMEASURED by the lane).
4. MEASURE THE CHANGE: (E4) over the tool-corpus-sample files under data/backends/, read by GLOB in a script, never by backend name in code or test, print per tool the token set before and after, and the BM25 top-5 for the ORDER 0 query strings before and after (pathB, offline). (D1 e) Run scripts/pbFullMeasure.ts on the entity corpus before and after: recall and ranks, no regression is the gate.
5. No backend, vendor or tenant name in code (AGNOSTIC-1); fixtures neutral.
6. npm run build (all five gates; doc-drift + reseal in the same commit if named), full suite, typecheck:api; PR; CI at the full head sha, a zero read twice; slip SLIP-A24-P20-TOKENIZER-S158-1 with branch, full head, PR number, CI runs by name, the ORDER 4 counts. Stop.

## SHARED SURFACES
```scope
- api/cwf/_lib/pathB/bm25.ts (tokenizeFor, its doc and the LAW 1 header only)
- api/cwf/_lib/vectorLane/encoder.ts (the encoder id bump only; D2)
- the six pinned tests named in ORDER 3, re-pinned where the added parts change them
- (E1) NOT learnableCorpus.ts, NOT metricVocabDiscovery.ts; metricVocabDiscovery.ts:174-178's private splitIdentifier copy is a finding for a later card, named in the report
- api/cwf/__tests__/ and api/cwf/_lib/**/__tests__/ (characterisation and new tests)
- public/architecture/ tabs check:doc-drift names, and the reseal
- docs/relay/A24-P20-TOKENIZER-S158-1-AG2-report.md
```

## AMENDMENTS (v3, scout E-A..E-E, binding; where a line above differs, this section wins)
(E-A) DECISION RIGHTS replaced as written there.
(E-B) ORDER 2: the added parts pass the SAME profile as the stream: in the match profile each folded part is stripped of GENERIC_SUFFIX_WORDS members exactly as the stream is (LAW 3); in the stats profile parts are kept. Add ZoneHatti and BolgeHattinda 3 (Turkish letters as typed) to the ORDER 0/1 strings. FALSIFIER adds: the match-profile tokens of x contain no folded GENERIC_SUFFIX_WORDS member.
(E-C) ORDER 2, ARCHITECT RULING on the scout's recommended option: the parts sequence of the whole string passes rejoinSpacedDigits, so LineL 1 adds line,l1, symmetric with LineL1. The report prints the count of parts of length 1.
(E-D) ORDER 4's pbFullMeasure before/after is NOT a lane run (it needs the service client, which a lane does not hold): the lane prints UNMEASURED with that reason; it is an OPERATOR run named as a precondition of the landing (the Architect orders it). The lane's own no-regression gate is pathBBm25.test.ts, pathBEntityRankSeam.test.ts and a NEUTRAL synthetic case-variant fixture (ZoneZ3, zonez3, ZONEZ3, LineL1, linel1, LineL 1, LINEL1) scored before and after in a test.
(E-E) The encoder id literal is at encoder.ts:122 (115-119 is its doc). The old id string also appears in docs/relay/PHASE-VECTOR-SEAM-1-report.md, docs/relay/PHASE-TOOL-RETRIEVAL-PATHB-1-report.md and docs/relay/BASELINE-9-1-BOTH-TREES-S141-1-AG4-report.md: historical records, NOT edited. Master anchor is the evidence:master fence (PR 611 landed).

## DECISION RIGHTS
(E-A) AG-2 designs inside the fold-first token stream kept whole plus the camelCase parts added (D1 a), one tokenizer for the lexical and incumbent vector lanes (D2), no stored index touched. The Architect decided: no Turkish stemmer and no stopword list in this card (P2-2 is the analyzer ablation); no production routing switch changes.
FORBIDDEN: no change to a stored index or its build; no switch flip; no migration; no DB write; no poll task, no cron; never print an environment value; never merge your own PR.

END · CARD-A24-P20-TOKENIZER-SPLIT-BEFORE-FOLD-S158-1-v3
