<!-- relay-audit: v1 kind=card -->
CARD-A24-P20-TOKENIZER-SPLIT-BEFORE-FOLD-S158-1-v1

LANE: AG-2 (fresh window: one card per window; after your shared-clone-guard PR is open)
fanout: personalized (one lane, one body)
MEASURED-AT: 2026-09-23T06:11Z (bridge clock, date -u in the command that wrote this file)
OWNER APPROVAL: S158 plan approval "onayliyorum", 2026-09-23 08:40 TSI (step 5: P2-0/P2-1 cut and sent to the scout); OWNER-APPROVAL-S150-A24-V1_3-FINAL-1; OWNER-APPROVAL-S151-PARALLEL-1 (AG-2 owns retrieval). Register item 51 (tokenizer camelCase-after-fold) and 40d P2-0.
ADVERSARY GATE: NEW SUBJECT. Goes to the scout first (ORDER-SCOUT-REVIEW-CARD-A24-P20-TOKENIZER-SPLIT-BEFORE-FOLD-S158-1-v1); reaches AG-2 only with a GREEN verdict row.
BRANCH: phase/a24-p20-tokenizer-s158-1 off origin/master · PUSH early · REPORT docs/relay/A24-P20-TOKENIZER-S158-1-AG2-report.md with a FILE-FENCE block · PR: yes, non-draft.
GRAFT: code context from graft first; slip and report carry a GRAFT line.

THE PROBLEM, in plain words. The house tokenizer folds a string to lower case BEFORE it splits identifiers on camelCase boundaries. After folding there are no capitals left, so the camelCase split can never fire: a tool name like getDailyOeeValues stays ONE token instead of get, daily, oee, values. Every lexical match against tool names (the channel-2 BM25 of P2-1, the learnable-corpus admit set) therefore misses the words the names are made of. This card characterises today's behaviour in tests, then splits BEFORE folding, and measures what changes. One consumer (the vector encoder) turns tokens into STORED vectors; changing its tokens silently would break parity with the stored index, so this card keeps that consumer byte-identical and names it.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| master at cut time | MEASURED: GitHub API commits/master, Architect bridge, 2026-09-23T06:08Z | master |
| the lines cited below | MEASURED: git grep -n and git show at the master anchor on the owner clone's remote-tracking ref, Architect bridge, 2026-09-23T06:11Z | lines |

```evidence:master
2d7087bff1eda24b6224c2fbd9a9d987061dec7d
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
UNMEASURED by the Architect: which function is injected as `tokenize` into learnableCorpus and metricVocabDiscovery in production (ORDER 0 names it); whether the vector lane's stored index is live (vector.* switches) and which index_build_id it carries; whether any stored artefact other than the vector index was built from tokenizeFor.
SELF-INVALIDATION: dies if any symbol above is absent at your head (STOP and print both).
ON-DISAGREEMENT: YOUR READING WINS: print both values, continue with yours.

## FALSIFIER
A characterisation test that pins today's output FIRST (getDailyOeeValues -> one token) must go red when the fix lands and be replaced by the new expectation in the same commit, named in the report. The dotted/dotless-I cases (İ, I, ı, i in upper and mixed-case identifiers such as İstasyonListesi, getISTANBULLines) must fold exactly as today per token. The vector encoder's tokens for every fixture string are byte-identical at base and head. Any other consumer whose output changes beyond the camelCase split: STOP and name it.

## ORDERS
0. MEASURE, no code: re-print every line in `lines`; name the production `tokenize` injected at learnableCorpus.ts:220 and metricVocabDiscovery.ts:213; list every caller of tokenizeFor, foldKey and splitIdentifier (graft callers first, then git grep); for each, say whether its output is STORED (index, table, file) or computed per turn. Print tokenizeFor(x,'match') and (x,'stats') today for: getDailyOeeValues, getLineStopsReportForZones, OEEReport, İstasyonListesi, getISTANBULLines, "günlük OEE", "A 1 2".
1. CHARACTERISATION TESTS first, pinning today's output for the ORDER 0 strings (committed before the fix, so the diff shows the change).
2. THE FIX, one place: in tokenizeFor, split identifiers on the RAW string, then fold each token (foldKey), then apply the profile's generic-noun strip and rejoinSpacedDigits over the folded tokens, so that a folded-then-split and a split-then-folded token agree on every non-camelCase input. No second tokenizer; learnableCorpus and metricVocabDiscovery get the fix only if their injected tokenize IS this path (ORDER 0), otherwise name them and leave them for P2-1.
3. STORED CONSUMERS stay byte-identical: the vector encoder (encoder.ts:138) keeps today's token stream through an explicitly named legacy profile (for example tokenizeFor(text, 'match-legacy') or a pinned wrapper), with a comment naming this card and the index it protects; switching the encoder is a separate card that bumps the index build id. Same for any other STORED consumer ORDER 0 finds.
4. MEASURE THE CHANGE: over the tool corpus fixture the repo already holds (the tool-corpus-sample files under data/backends/), print per tool the token set before and after, the learnable-corpus admit-set diff if its path changed, and the BM25 top-5 for the ORDER 0 query strings before and after (pathB, offline, no production path).
5. No backend, vendor or tenant name in code (AGNOSTIC-1); fixtures neutral.
6. npm run build (all five gates; doc-drift + reseal in the same commit if named), full suite, typecheck:api; PR; CI at the full head sha, a zero read twice; slip SLIP-A24-P20-TOKENIZER-S158-1 with branch, full head, PR number, CI runs by name, the ORDER 4 counts. Stop.

## SHARED SURFACES
```scope
- api/cwf/_lib/pathB/bm25.ts (tokenizeFor only)
- api/cwf/_lib/vectorLane/encoder.ts (the one call at :138, to the named legacy profile)
- api/cwf/_lib/routing/learnableCorpus.ts, api/cwf/_lib/routing/metricVocabDiscovery.ts (ONLY if ORDER 0 shows their tokenize is tokenizeFor; routing/** is AG-1's fence, so any edit there is named in the report)
- api/cwf/__tests__/ and api/cwf/_lib/**/__tests__/ (characterisation and new tests)
- public/architecture/ tabs check:doc-drift names, and the reseal
- docs/relay/A24-P20-TOKENIZER-S158-1-AG2-report.md
```

## DECISION RIGHTS
AG-2 designs inside "split first, fold per token, stored consumers byte-identical". The Architect decided: no Turkish stemmer and no stopword list in this card (P2-2 is the analyzer ablation); no production routing switch changes.
FORBIDDEN: no change to a stored index or its build; no switch flip; no migration; no DB write; no poll task, no cron; never print an environment value; never merge your own PR.

END · CARD-A24-P20-TOKENIZER-SPLIT-BEFORE-FOLD-S158-1-v1
