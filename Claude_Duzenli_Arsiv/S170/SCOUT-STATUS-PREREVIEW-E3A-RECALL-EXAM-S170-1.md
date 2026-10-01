[scout-1]
ADVERSARY-VERDICT: RED card=CARD-E3A-RECALL-EXAM-S170-1-v1
GRAFT: none run (graft indexes the stale local clone). Every line was read at master 648c61d6384942ab532444be252422ed9e37c02b with `git grep`/`git show`; PR 635 files via `gh pr view 635`; live rows via scripts/roQuery.ts (read-only).
PROMPTS: none.

SCOUT-STATUS-PREREVIEW-E3A-RECALL-EXAM-S170-1 · reply to ORDER-SCOUT-PREREVIEW-E3A-RECALL-EXAM-S170-1 (id 75bd1155-3ea0-4973-99e1-026ea9761c4d)
PRECONDITION: ls-remote master = 648c61d6384942ab532444be252422ed9e37c02b (unchanged).

## 1 · What E1-a (PR 635, merge ed033de062dfc869850a35e40f1b39094dd24ea3) landed
- Sets: shared/examSets.ts. EXAM_SETS = unassigned | profile-dev | calibration | acceptance | regression; HELD_OUT = calibration, acceptance. They are stored as golden_specimens.exam_set plus `acceptable` jsonb (migration 20260928180000).
- Label: AcceptableLabel = { tools: string[], facts: string[], note? }. A FLAT list of bare tool names; NO backend per tool.
- LIVE (read now): golden_specimens has 20 rows, ALL exam_set='unassigned'; labelled = 0; with_tools = 0. The held-out sets are EMPTY. Every cell of the card's "first real table for arms (a) and (b)" would print UNMEASURED today.
- Runner: scripts/runExam.ts plus api/cwf/_lib/replay/examRun.ts. ZERO LLM by construction (:5-9). It ALREADY computes per-backend aggregates (examRun.ts:216-217) of three pure scorers (examScorers.ts): FirstCall-Hit@1, KeywordArm-Coverage (:70-83, via routeKeywordLayer, the production keyword core) and empty-vs-zero honesty. K25 bars: resolveExamPolicy (exam.* params, code floor). It WRITES ONE replay_audit row (runExam.ts:11-12, examRun.ts:241), which contradicts the card's "no DB write". There is no npm script; only exam:ka exists (package.json:40), and that is the E1-b vitest exam.
- Backend attribution: examRun.ts:14-18 attributes a turn by its FIRST CALLED tool through BackendToolsRepository.backendIdsForToolNames. More than one → MULTIPLE, none → UNATTRIBUTED. Because names are bare (the K33 finding: armes∩machine-knowledge-base share knowledge_*, armes∩superset share 4 meta-tools, honestbench∩mount-probe share all 4), "per backend" and "interference" are ambiguous exactly where they matter.

## 2 · Metric honesty, measured in the repo's own words
- examScorers.ts:6-9: "None of these is 'Recall@1': the offered set is an unordered Set … a tool-level Recall@k is forbidden metric substitution until per-utterance expected-tool labels exist". recallCat.ts:10-13 forbids bridging categories to tools. The keyword arm returns an UNORDERED offer, so "tool Recall@3 where a rank exists" has no rank to stand on for arms (a) and (b). "Recall@k with k = offered size" IS KeywordArm-Coverage, which already exists.
- The synthetic basis that DOES exist: SyntheticUtterance.intendedToolCategories, 66/66 labelled (recallCat.ts:5-8). It supports CATEGORY recall only (scoreRecallCatAtK, and it needs a RANKED offer).

## 3 · Arm (b), the K41 flip, offline
- keywordArmAllPaths=1 is offline-computable: toolCategories.ts:1698-1707 is matchCategories(userMessage, EMPTY_LEARNED, categories), pure.
- matrixReplace=0 changes the offer ONLY under frameRouting with an IR frame (:1639-1658). That frame comes from the semantic router at :1582 (LLM). Offline, it exists only as a RECORDED frame (replayFrame :1638, the routeShadowLens path), and turn_trace_digest is display-only with 14-day retention (examScorers.ts:3-4). So the matrixReplace half of the flip is UNMEASURED for any turn without a recorded frame, and that must be printed, never treated as "no change".

## 4 · docs/ground output
A generated artifact there must carry the ground stamp (scripts/groundContract.ts:11-12, :73: artifact · schema · provenance `MEASURED:<command>` · commit (an ancestor of HEAD) · measuredAt · generator) and pass `npm run check:ground`.

## AMENDMENTS (paste VERBATIM):
A1. REUSE, DON'T REBUILD (12.6): extend api/cwf/_lib/replay/examRun.ts and scripts/runExam.ts rather than a new instrument. Add an `--arm <a|b>` knob set, where arm (a) is today's keywordArmCoverage and arm (b) adds the keywordArmAllPaths matcher (toolCategories.ts:1699-1706, empty learned map), plus `--no-audit`. With --no-audit the run writes nothing; without it, behaviour equals master (one replay_audit row). `npm run exam:recall` runs `scripts/runExam.ts --no-audit` over the named sets.
A2. METRIC NAMES (examScorers.ts:6-9, recallCat.ts:10-13): no "Recall@k" or "Recall@3" is printed for tools. Per backend and arm the table prints KeywordArm-Coverage (owner acceptable set), FirstCall-Hit@1 (recorded), offered-set size p50/p95, and, on the synthetic basis only, RecallCat@k over intendedToolCategories, with k stated and only where the offer is ranked. Tool-level Recall stays a NAMED GAP.
A3. EMPTY SETS ARE THE HEADLINE: the table prints n, labelled and with_tools per set. Measured now: calibration and acceptance hold 0 rows, and all 20 specimens are 'unassigned' with no acceptable label. Every cell with n < the exam's n_min prints UNMEASURED (runExam exit 2 semantics), never 0. The report states that a K41 default decision cannot be taken from this table until the owner assigns and labels held-out turns, and names the screen where that happens (ReplayTab exam-set selector, PR 635).
A4. ARM (b) HONESTY: matrixReplace=0 is applied only to turns with a RECORDED IR frame (the replayFrame path, toolCategories.ts:1638). For every other turn the table prints `frame: unrecorded → matrixReplace effect UNMEASURED` and counts them. A turn without a frame is never scored as "no change".
A5. INTERFERENCE AND PER-BACKEND: attribution reuses examRun's backendIdsForToolNames. Turns whose acceptable or offered tools resolve to MULTIPLE backends (the bare-name collisions measured in K33: knowledge_*, call_tool/get_instance_info/health_check/search_tools, the hb_* four) are reported in a MULTIPLE row and EXCLUDED from interference, never assigned to a backend.
A6. OUTPUT: JSON plus markdown under docs/ground/ carrying the groundContract stamp (artifact, schema, provenance `MEASURED:npm run exam:recall …`, commit = HEAD ancestor, measuredAt, generator) and exam_basis (held-out | synthetic), passing `npm run check:ground`. Tests: a shape pin on a fixture set; a planted fault (acceptable set ignored → coverage 1.0) → red; an empty set → UNMEASURED, not 0; --no-audit → zero writeAudit calls.
A7. UI (13.3): ReplayTab already hosts the exam-set selector and run (PR 635: ReplayTab.tsx +222). The report says whether the arm table is shown there, and if not, names that tab as its home.
END-AMENDMENTS
