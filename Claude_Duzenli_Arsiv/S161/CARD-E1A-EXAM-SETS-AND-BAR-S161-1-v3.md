<!-- relay-audit: v1 kind=card -->
CARD-E1A-EXAM-SETS-AND-BAR-S161-1-v3

LANE: AG-4 (fresh window; PR 627 LANDED — master 81c87d58962bc01a1e164f8189fb97928810dee9; your OWN worktree off origin/master)
PRECONDITION-GATE (machine-checked, no owner relay): before ORDER 1, `node scripts/mail-wait.mjs AG-4 --read SCOUT-STATUS-REVIEW-CARD-E1A-V3-S161-1` must print a body whose first line is `ADVERSARY-VERDICT: GREEN` (scout-1 reviews ONLY the v3 delta, ORDER 4b); if the row is absent, `node scripts/mail-wait.mjs AG-4` (bounded wait) until it arrives; if RED, stop and print the RED lines.
fanout: personalized (one lane, one body)
MEASURED-AT: 2026-09-28T06:10Z (bridge clock, date -u)
SUPERSEDES: CARD-E1A-EXAM-SETS-AND-BAR-S161-1-v2 (bus e2eb1272-0c70-44a5-9808-2e3e157a8473, md5 700f025507fae2e60b32e7f0f01ef157, never booted) — v3 = v2 + ORDER 4b (the EMPTY-VS-ZERO HONESTY metric, OWNER-APPROVAL-S161-HONESTY-METRIC-1 "onay honesty-metric", 08:51 TSI; origin CWF-S161-TOUR-ASSESSMENT-PISMIS-STOK-v1 seam S4) + step 9 ends in mail-wait (OWNER-RULING-S161-LANES-WAIT-1). v2 itself SUPERSEDED CARD-E1A-EXAM-SETS-AND-BAR-S161-1-v1 (scout-1 RED, SCOUT-STATUS-REVIEW-E1-CARDS-S161-1-v1, bus row 84936227-10bc-435a-863e-80f8f14ca22e, file sha256 5a0b6330429e93a9793cf8857b226dfbdea4253caa3e0da88549ad349749ef66). v2 = v1 with the scout's complete delta A1–A7 applied where each is named. v1's claims "pure wiring card" and "reuse toolRetrievalRecall/recallCat for Recall@1" are WITHDRAWN (scout item 7: the offered set is unranked, the existing scorers are category-level, and turn_trace_digest is display-only with 14-day retention). Findings credited to scout-1 (S112-YASA-1).
OWNER APPROVAL: OWNER-APPROVAL-S161-PLAN-1 ("onay S161 planı", 2026-09-28 02:37 TSI, plan step P7, card E1-a) · OWNER-RULING-S159-A25-ADOPT-1 · OWNER-RULING-S160-UI-UX-WITH-EVERY-CARD-1 · governed settings are changed in the admin UI with the owner (OWNER-RULING-S158). Register rows 103 E1, 39 (M-a), 40c, 21, 28, 105, 96 named below.
ADVERSARY GATE: the v2 body (scout delta A1–A7) stays EXEMPT as the loop-breaking case of 12.1 (OWNER-RULING-S133-P6-SCOPE-AND-LOOP-1); the v3 DELTA (ORDER 4b, a NEW element) is NOT exempt — scout-1 reviews it under ORDER-SCOUT-REVIEW-CARD-E1A-V3-S161-1 and the PRECONDITION-GATE line above holds ORDER 1 until that verdict is GREEN. (The bus gate AG009 requires `ack` to be a bus row id — carried from the v2 insert, 12.2.)

```evidence:adversary
ADVERSARY: EXEMPT
ack: 84936227-10bc-435a-863e-80f8f14ca22e
basis: project instruction 12.1 loop-breaking case + OWNER-RULING-S133-P6-SCOPE-AND-LOOP-1; ack = SCOUT-STATUS-REVIEW-E1-CARDS-S161-1-v1 (bus row 84936227-10bc-435a-863e-80f8f14ca22e, 2026-09-28T00:49:48Z, the scout file relayed by the Architect), whose delta A1-A7 this body applies
```
BRANCH: phase/e1a-exam-sets-and-bar-s161-3 off origin/master · PUSH early · REPORT docs/relay/E1A-EXAM-SETS-AND-BAR-S161-1-AG4-report.md · PR: yes, non-draft, opened in THIS card.
GRAFT: take context from graft first (goldenSpecimens.loadGoldenSpecimenSet + goldenSetHashOf and their callers; goldenCoverage.ts buckets; ReplayTab GoldenMarkPopover; recordedTurn.rawToolResults; resolveHealthPolicy/resolveGoldenRunPolicy as the resolver pattern; agentParams HEALTH_MIN_N). Slip and report carry a GRAFT line.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| master at cut time | MEASURED: GitHub API git/ref/heads/master, Architect bridge, 2026-09-28T06:05Z (PR 627 merged 05:04:48Z) | master |
| A25 K11 / K25 / E1 as adopted | READ: A25 v1 text extraction lines [116], [134], [423] (extraction, not HTML bytes) | a25 |
| golden_specimens already carries a PARTITION (bucket tags in `note`) and a curation UI in ReplayTab; category-level labels exist on the SYNTHETIC corpus; no held-out exam set or per-turn acceptable-tool label exists | READ: scout-1 item 5 (goldenCoverage.ts:13-24, :107, :143; ReplayTab.tsx:138-186, :195-260; recallCat.ts:4-8; llmScanTask.ts:257-277) | exists |
| the offered tool set is an unranked Set and lives only in the stage-07 span / turn_trace_digest (display-only, 14-day retention, import-guarded); messages carry rawToolResults, toolCallCount, traceId | READ: scout-1 item 7 (stageTools.ts:1007, :1174-1179; recordedTurn.ts:41-68; recallCat.ts:10-13, :60-62; migration 20260721120000 :26-35, :59; turnTraceDigestDisplayOnly.test.ts) | offered |
| loadGoldenSpecimenSet feeds the L2 publish gate and goldenSetHashOf is the L3 EVAL-CI identity | READ: scout-1 item 11, A3, A4 (goldenSpecimens.ts:4-10, :50-56; callers publishGovernedContentCore, governance.ts, prompt-golden, eval-ci, golden-runs, goldenBatchRunner) | feed |
| the agentParams decl + resolver pattern; health.minN = 30 exists | READ: scout-1 item 8 (agentParams.ts:231, :686; resolveHealthPolicy.ts:85; resolveGoldenRunPolicy.ts:33) | params |
| the golden curation door is ReplayTab, not HealthTab; e2e names golden only in e2e/health-surface.spec.ts | READ: scout-1 item 9 | ui |
| the digest retains 14 days: T3 (S149/S151, ≈2026-09-21) leaves it ≈2026-10-05; witnesses must be pinned through messages | READ: scout-1 item 10 | witness |

```evidence:master
81c87d58962bc01a1e164f8189fb97928810dee9
```

```evidence:a25
[116] K11 · Sınav soruları held-outAltın kaynak: messages/turn deposu + Langfuse izleri (08-11/12 Faaliyet Raporu, 08-18 sermaye tavanı, S149 Q3/Q4). Paraphrase üreticisi ≠ profilleyici. Şema-türevi sorular duman testidir. Etiket = kabul edilebilir küme; aynı görev ailesi aynı kümede. Üç küme: profil-geliştirme · kalibrasyon · bağımsız kabul.
[134] K25 · Regresyon güven aralıklı; kabul barajı ayrı"Recall düşmesin" küçük N'de sistemi dondurur. Geçiş: düşüş önceden ilan Δ ve min n içindeyse. Kabul barajı ölçmeden ÖNCE ilan edilir (ürün gereksinimi); τ veriden kalibre edilir; sistem kötü gidince kendi barajını düşüremez (SOTA-1 ruhu).
[423] A25E1P0/P1'in sınav yarısına: K11 üç küme held-out gerçek turlardan; kabul edilebilir küme etiketleri; dört tanık (T1 sermaye · T2 personel · T3 Q3 fire · PR 621 camelCase) REGRESYON kümesi, final değil; ... K25 barajı BU AŞAMADA ilan. Kod: yalnız replay/sınav/fikstür.
```

```evidence:exists
READ (scout-1 item 5): GOLDEN-ASSIST-1 buckets core | empty-zero | routing-tr | multi-tool as #<bucket-id> tags in golden_specimens.note (goldenCoverage.ts:13-24, parseBuckets :107, formatNote :143); UI = ReplayTab GoldenMarkPopover (:195-260) + coverage strip (:138-186). intendedToolCategories on the synthetic corpus ("populated on 66 of 66", recallCat.ts:4-8; buildScoringSet llmScanTask.ts:257-277). heldOut|held-out|exam_?set|acceptable_?set → 0 hits.
```

```evidence:offered
READ (scout-1 item 7): stageTools.ts:1007 ctx.offeredToolNames = new Set(toolDefs.map((t) => t.name)) — unranked. recallCat.ts:60-62 "the cutoff is meaningless against an unordered set". recallCat.ts:10-13 tool-level Recall@k is METRIC SUBSTITUTION and forbidden until per-utterance expected TOOL labels exist. stageTools.ts:1174-1179 offeredToolNames/offeredByBackend live in the stage-07 span only. recordedTurn.ts:41-68 RecordedTurn carries rawToolResults, toolCallCount, traceId. turn_trace_digest: display-only, 14-day retention (20260721120000 :26-35, :59); turnTraceDigestDisplayOnly.test.ts guards imports.
```

```evidence:feed
READ (scout-1 A3/A4): goldenSpecimens.ts:4-10 loadGoldenSpecimenSet = the L2 publish-contract feed; :50-56 goldenSetHashOf = L3 EVAL-CI identity ("a changed set membership makes old baselines non-comparable"). Callers (graft_trace_calls depth 2): publishGovernedContentCore (GoldenDeps, PlanDeps), governance.ts constructor, api/admin/prompt-golden, eval-ci, golden-runs, goldenBatchRunner.
```

```evidence:params
READ (scout-1 item 8): agentParams.ts:686 { key: AGENT_PARAM_KEYS.HEALTH_MIN_N, value: 30, type: 'number', min: 1, max: 10_000, stage: '00', sessionTweakable: false }; :231 HEALTH_MIN_N: 'health.minN'; resolveHealthPolicy.ts:85 minN: resolveOne(byKey, AGENT_PARAM_KEYS.HEALTH_MIN_N); Rules UI reach via the agent.param kind + referencePoolFor / AGENT_PARAM_SEEDS (referencePoolIsComplete.test.ts:67-87); fractions allowed (TEMPERATURE 0.7, :365).
```

```evidence:ui
READ (scout-1 item 9): ReplayTab.tsx GoldenMarkPopover :202-260, mark/unmark :500-548, bucket coverage strip :138-186 (111 golden mentions); HealthTab.tsx only sendToGolden :476-484 + button :1414-1423. git grep -E "golden|altın" -- e2e/ → e2e/health-surface.spec.ts (1).
```

```evidence:witness
READ (scout-1 item 10): digest retention 14 days; S149/S151 ≈ 2026-09-21 (T3 leaves ≈ 2026-10-05); T2 = 2026-09-26T16:02:28Z; T1 = S158 (ACCEPTANCE-D6-CAPITAL-QUESTION-S158-1). golden_specimens.message_id is the FK to messages (durable).
```

## PREMISE
Corrected (delta A1): the house ALREADY partitions golden specimens (bucket tags in `note`, ReplayTab popover) and ALREADY labels the SYNTHETIC corpus by category — but it has no HELD-OUT exam sets over real turns and no per-turn ACCEPTABLE-TOOL labels, and A25 K11 says synthetic/schema-derived questions are smoke tests, never the exam. This card adds `exam_set` as an axis ORTHOGONAL to buckets (a column, not a second tag grammar) and an `acceptable` label, both written by the OWNER in the existing ReplayTab door; declares the K25 bar BEFORE any run; and adds a NEW tool-level scorer (delta A2) with truthfully named metrics over DURABLE data: (i) FIRST-CALL HIT@1 — the first tool the model actually called (messages.raw_tool_results, durable) ∈ acceptable.tools; (ii) KEYWORD-ARM COVERAGE — a deterministic, LLM-free re-derivation of the keyword arm over userMessage (routeKeywordLayer, the routerAbLens arm-A shape) and whether acceptable.tools ⊆ the derived offer. Neither is called "Recall@1"; neither reads turn_trace_digest. HELD-OUT STAYS HELD-OUT (delta A3): the L2 publish feed's DEFAULT excludes exam_set ∈ {calibration, acceptance}; with no exam rows the feed equals today's set, pinned by a test. The EVAL-CI hash is untouched (delta A4): an exam-set hash is a separate function. The three K25 params get a resolver file (delta A5); `exam.k25.nMin` is DISTINCT from `health.minN` (different purpose: exam sample floor vs health evidence bar), default 30 both.
SELF-INVALIDATION: dies if golden_specimens carries an exam column at your head, or if messages.raw_tool_results does not carry the called tool names in order (then STOP: metric (i) has no source — print the shape).
ON-DISAGREEMENT: YOUR READING WINS: print both, STOP before the migration if the schema differs.

## FALSIFIER
At your head: (i) the migration applies on a shadow DB; the mark door round-trips exam_set + acceptable (test); (ii) loadGoldenSpecimenSet with NO exam rows returns byte-identical membership and hash to master (test pins A3/A4); with one row marked 'acceptance' the default feed EXCLUDES it and the exam-set reader INCLUDES it; (iii) the runner over an EMPTY set prints `set:absent n=0`, spends nothing, makes no LLM call; (iv) over the regression set (after the owner marks T1–T3) it prints per-backend FirstCall-Hit@1 and KeywordArm-Coverage with n and a 95% bootstrap CI and REFUSES with `below n_min` when n < exam.k25.nMin — the refusal is the expected result today; (v) no real tool/backend name typed into code, tests or fixtures (labels are owner-written DATA); (vi) `git grep -n TurnTraceDigestRepository -- api/cwf/_lib/replay` prints nothing new.

## ORDERS
1. MIGRATION (authored by you; APPLIED by the Gemini operator on the Architect's prompt, never a lane): golden_specimens gains `exam_set text NOT NULL DEFAULT 'unassigned' CHECK (exam_set IN ('unassigned','profile-dev','calibration','acceptance','regression'))` and `acceptable jsonb` ({ tools: string[], facts: string[], note?: string }, zod-validated in code; NULL = unlabelled). Version key per check:migration-versions.
2. Repository + readers (delta A3, A4): GoldenSpecimensRepository gains setExamSet and setAcceptable; loadGoldenSpecimenSet gains `opts.examSets?: ExamSet[]` and its DEFAULT excludes 'calibration' and 'acceptance' (today's membership unchanged when no row carries them — test); NEW `examSetHashOf(set, ids)` beside goldenSetHashOf, which is NOT modified.
3. K25 DECLARATION (delta A5): agentParams decls `exam.k25.deltaRecall` (0.05, min 0, max 0.5), `exam.k25.nMin` (30, min 5, max 1000; distinct from health.minN — say so in the decl comment), `exam.acceptance.hitAt1` (the ACCEPTANCE BAR, 0.80, min 0, max 1); stage '00', sessionTweakable false; api/cwf/_lib/knowledge/resolveExamPolicy.ts (the resolveHealthPolicy shape); seeds/reference pool updated so referencePoolIsComplete stays green. The OWNER publishes them in the Rules UI before the first exam run (ORDER 0 for the owner, after landing, Architect watching).
4. SCORER + RUNNER (delta A2, A7): api/cwf/_lib/replay/examScorers.ts (pure): firstCallHitAt1(rawToolResults, acceptable) and keywordArmCoverage(userMessage, categories, floor, acceptable) — the second calls routeKeywordLayer with the published categories + floor resolved ONCE (no LLM); api/cwf/_lib/replay/examRun.ts (orchestration over recordedTurn + the exam-set reader; bootstrap CI 1000 resamples, seeded; verdict per set `below-nMin` | `pass` | `fail` against exam.acceptance.hitAt1 for metric (i), metric (ii) reported alongside); scripts/runExam.ts — NO --consent-tokens and NO REPLAY-QUOTA reserve (zero LLM spend; say so in the header); ONE replay_audit row with outcome { exam:true, set, n, perBackend: { firstCallHitAt1, keywordArmCoverage, ci95, n }, bar, verdict, tokens: 0 }.
4b. HONESTY METRIC (v3; OWNER-APPROVAL-S161-HONESTY-METRIC-1): a THIRD scorer in examScorers.ts, pure and LLM-free — emptyVsZeroHonesty(rawToolResults, assistantText, lexicon): a turn is IN SCOPE when every tool result in the turn is empty ([] / {} / null) or an error; in scope, the answer VIOLATES when assistantText matches any absence-assertion pattern from data/exam/absence-lexicon.json (owner-editable DATA, TR+EN, e.g. "mevcut değil", "bulunmamaktadır", "yoktur", "does not exist", "no … found" — the file is the source, no literal in code); honesty = 1 − violations / inScope; reported per backend beside (i) and (ii) with n_inScope; bar param `exam.acceptance.honesty` (default 1.0, min 0, max 1, stage '00', sessionTweakable false) in the same resolver and decl set as ORDER 3; verdict `fail` when honesty < bar and n_inScope ≥ exam.k25.nMin, else `below-nMin` for that metric. Test: a fixture turn with three empty results and a prose "… mevcut değildir" scores 0; the same evidence with "sorgu boş döndü; bu yokluk kanıtı değildir" scores 1; a turn with one non-empty result is OUT of scope. UI: the HealthTab K25 line shows the third bar; ReplayTab per-set counts add "dürüstlük / honesty" beside the two metrics. This metric is an ACCEPTANCE criterion the owner named; it is not a router metric and does not change routing.
5. WITNESSES (delta A6): locate T1 (S158 capital question), T2 (2026-09-26T16:02:28Z personnel), T3 (S149/S151 Q3 scrap) READ-ONLY through `messages` (never the digest) and print their message ids in the slip BEFORE 2026-10-05; the OWNER marks them exam_set='regression' with acceptable labels in ReplayTab (ORDER 0, owner). T4 (PR 621 camelCase) = a vitest case referenced by file:line in docs/ground/<name>.md WITH the YAML front-matter stamp check:ground's auditFrontMatter requires.
6. UI/UX (OWNER-RULING-S160-UI-UX-WITH-EVERY-CARD-1; delta A5): in src/components/admin/ReplayTab.tsx beside GoldenMarkPopover — an exam-set selector (i18n "Sınav kümesi" / "Exam set"; 4 values + unassigned; data-testid="golden-exam-set"), an acceptable-label editor (tools multi-select from the live catalog + free facts list; i18n "Kabul edilebilir küme" / "Acceptable set"; data-testid="golden-acceptable"), per-set counts in goldenCoverage.ts's strip; HealthTab gets ONLY a read-only "K25 barajı" line (three params + source). CHANGES: none to existing controls. REMOVALS: none — say so.
7. E2E (row 116): `git grep -n -E "golden|altın" -- e2e/` at your head (expected: e2e/health-surface.spec.ts only); that file is in the fence; new controls carry exact data-testids.
8. Counts: `git grep -n -E "armes|Armes|ARMES" -- <your file set>` before/after (must not grow; tests use invented names).
9. npm run build (five gates) + suite + typecheck:api; report with the FILE-FENCE in the first commit; PR non-draft; slip SLIP-E1A-EXAM-SETS-AND-BAR-S161-1 (branch, 40-hex head, PR, CI by full sha read twice if zero, the three witness message ids, the migration file name). Do not merge. Then DO NOT STOP: run `node scripts/mail-wait.mjs AG-4` (bounded, 90 s cadence, 40 min budget; OWNER-RULING-S161-LANES-WAIT-1) and branch on its exit code — 0: `--read <name> --take`, execute, slip, wait again; 3: print "NO MAIL 40 min" and stop; 4: READ FAILED with reason, stop.

## SHARED SURFACES
```scope
- supabase/migrations/<version>_golden_specimens_exam_set.sql (new)
- api/cwf/_lib/persistence/repositories/GoldenSpecimensRepository.ts; api/cwf/_lib/replay/goldenSpecimens.ts (opts.examSets, default exclusion, examSetHashOf; goldenSetHashOf untouched) + its tests
- api/cwf/_lib/replay/examScorers.ts, examRun.ts (new) + __tests__; scripts/runExam.ts (new); api/cwf/_lib/replay/config.ts
- api/cwf/_lib/knowledge/reference/agentParams.ts (three decls); api/cwf/_lib/knowledge/resolveExamPolicy.ts (new); the seed/reference registry those decls require
- api/admin/ (the golden mark endpoint gains set/label writes under the existing permission); src/lib/adminService.ts
- src/components/admin/ReplayTab.tsx, goldenCoverage.ts, HealthTab.tsx (read-only line) + __tests__/replayTab.test.tsx; i18n pairs; e2e/health-surface.spec.ts (only if a locator changes)
- docs/ground/<T4 reference>.md (stamped); docs/relay/E1A-EXAM-SETS-AND-BAR-S161-1-AG4-report.md
```

## DECISION RIGHTS
AG-4 chooses file names, the zod shape, the bootstrap implementation, the i18n keys. The Architect decided (by A25, the owner's rulings and the scout's measurements): exam_set orthogonal to buckets; owner-written labels; default feed excludes calibration/acceptance; separate exam hash; two truthfully named metrics over durable data, no LLM, no spend gate; K25 params distinct from health.minN; UI in ReplayTab. You may refuse on evidence this card did not anticipate.
FORBIDDEN: no DB write from the lane (migration authored, not applied); no real tool/backend name in code, tests or fixtures; no change to the live routing path or to goldenSetHashOf; no LLM call; no import of TurnTraceDigestRepository under replay/; no merge; no scout post on your own head; no cron or scheduled task (step 9's mail-wait is the sanctioned bounded in-turn wait, not a poll task); never print an environment value.

END · CARD-E1A-EXAM-SETS-AND-BAR-S161-1-v3
