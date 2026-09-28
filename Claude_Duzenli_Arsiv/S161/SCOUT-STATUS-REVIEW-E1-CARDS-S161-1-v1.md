<!-- relay-audit: v1 kind=status -->
SCOUT-STATUS-REVIEW-E1-CARDS-S161-1-v1

card: ORDER-SCOUT-REVIEW-E1-CARDS-S161-1-v1
branch: master (scout claims nothing, writes no repo file)
head: c58438b59cff4d1d403634b28e44af9b01db6dea
report: this file (doc repo S161/)
ci: UNMEASURED no branch and no PR; a review of two cards, not a head
status: STOPPED

FROM: scout (scout-1 window), 2026-09-28
GRAFT: graft_file_api (mail-wait.mjs, laneSlip.mjs, toolRetrievalRecall.ts, goldenSpecimens.ts), graft_find_code (harnessSelfTest, agentParams), graft_trace_calls (goldenSetHashOf, loadGoldenSpecimenSet depth 2).

## VERDICTS

- CARD-E1C-BACKEND-NAME-GATE-S161-1-v1 (md5 ce1980b56b67b81aea60e18b0265c3b8): **RED**
- CARD-E1A-EXAM-SETS-AND-BAR-S161-1-v1 (md5 a103a3a42a4634b88dd31afcb8f42bbb): **RED**

Neither card's direction is wrong. Both carry premises that measurement falsified, and fences that would red CI or break a law as written. Full deltas below.

## BOOT AND PRECONDITION

- READ relay_inbox (the direct read): `node scripts/mail-wait.mjs scout --read ORDER-SCOUT-REVIEW-E1-CARDS-S161-1-v1` gave id=70e9c81b-7d22-42e3-b2d8-97374ea000f5, created_at=2026-09-28 00:26:33.944001+00, body_md5=6d91bee65e4031f18df5d1b4847a2f6e, DIGEST-OK. NOT-TAKEN, since a read writes nothing. The card preflight is UNMEASURED because tsx IPC listen hit EPERM in the sandbox.
- `execute_sql` was refused by hook GM-1 on every server, and that is recorded here as a measurement. The order was read through mail-wait instead. scout-2's order (1eb42aed) was not taken.
- MEASURED `md5` of both cards and the order file: all three match the boot text.
- MEASURED precondition: `git ls-remote origin refs/heads/master` = c58438b59cff4d1d403634b28e44af9b01db6dea. `gh api` was not used; ls-remote asks the same server. Every grep below runs against the master tree object (`git grep <sha>`), not a working tree. The local clone's replay/ and admin/ files differ from master, and none of them was read for a verdict.

## E1-c — the eleven items, part one

**(1) Is there an existing backend-name gate? None. The card is not reduced to a wiring card. MEASURED.**
`git grep -n -i -E "backend.?name|checkBackend|armes" <sha> -- scripts .github package.json` returns provenance comments only. The `"check:` scripts in package.json are doc-drift, rule24, migration-versions, tenant-zero and ground. `checkTenantZero.ts` gates tenant vocabulary, not backend ids.

**(2) Is the "50 files / 71 matches" figure reproducible? NO. MEASURED** (scratchpad e1cMeasure.mjs, `git grep` at the sha, case-sensitive `armes|Armes|ARMES`):

| reading | files | lines | occurrences |
|---|---|---|---|
| A: card ORDER 6 (api src shared scripts public e2e, excluding `__tests__`) | 96 | 267 | 348 |
| B: api src shared, excluding tests | 71 | 141 | 144 |
| C: plus scripts, excluding tests and e2e | 80 | 151 | 156 |
| D: plus public | 91 | 219 | 296 |

No reading gives 50/71. The card's `counts` anchor must be dropped as a premise; the baseline is whatever the script measures at its own head.
Per-id whole-word (`\b`) counts in the `code` class (api/shared/src, non-test):
- armes: armes 74, ARMES 64
- superset: superset 72, Superset 90, SUPERSET 42
- **system: system 517, System 11, SYSTEM 32 (192 files)**
- machine-knowledge-base: 17
- honestbench: 13
- mount-probe: 10

The full id × class × variant table is reproducible with the script at the sha.

**(3) Does the `\b` matcher miss spellings the code uses? YES. MEASURED.** Distinct tokens containing a variant that `\b` does not match: armes 64, superset 88, honestbench 3. Examples, with counts across the tree:
- armes: `supersetArmes` 51, `ArmesServer` 39, `armesMes` 34, `composeArmes` 32, `ARMES_FLOOR` 32, `ARMES_ROUTED` 16, `isArmes` 14, `MCP_ARMES_TOKEN` 10, `cwf__armes__governed` 9, `ref_armes` 9, `ARMES_WRITE_UNCATEGORISED` 8, `misroutedToArmes` 7
- superset: `SUPERSET_BACKEND_ID` 49, `composeSupersetContext` 69

The cause: underscore is a word character and camelCase has no boundary. With `\b`, E5's "=0" goes green while `ARMES_FLOOR` and `ArmesServer` are still in the code.

**(4) Does CI-DIET skip the step on some diffs? YES. MEASURED** (build-test.yml at the sha):
- :211-213 — `if ! echo "$FILES" | grep -qvE '^(docs/|\.claude/|\.agents/)'; then emit false false "docs/.claude/.agents ONLY ..."` sets heavy=false.
- :174-178 — an empty diff sets heavy=false.
- :21-23 — on a master push, `paths-ignore: 'docs/**' '.agents/**'` means no run at all.
- :413-415 — every gate step carries `if: needs.changes.outputs.heavy == 'true'`.

Every counted class (api, shared, src, scripts, public, .github, data, e2e) sets heavy=true, so there is no hole for code. The hole is the card's own baseline: it lives at `docs/ground/backend-names-baseline.json`. **A PR that only raises the baseline runs with heavy=false, so the gate never executes, and on master it fires no run.**

## E1-c DELTA (what the card needs to turn GREEN)

- C1. Replace `\b` whole-word matching with **identifier-segment matching**: split tokens on camelCase, `_`, `__` and `-`, then compare segments to the id per variant. `clearMessages` gives the segments clear/Messages, so it is still NOT matched and F-S154 stays closed. ORDER 4's tests must also plant `ARMES_FLOOR`, `ArmesServer` and `cwf__armes__x`.
- C2. **Generic-word ids.** `system` (the chat role, `systemPrompt`, `SYSTEM_BACKEND_ID`) and `superset` are ordinary words. `--arm-zero` can never go green for `system`, a signal that barks on the majority case (CLAUDE.md §4). The card must decide, as DATA and never as a literal, which ids are gated. One option is a gated flag or list in data/backends/index.json. The card must also say what "0" means for the platform's own `system` id.
- C3. **Harness enrollment (the CI will red otherwise).** `scripts/checkBackendNames.ts` matches `isInstrumentFilename = /^(check|verify)[A-Za-z0-9]*\.ts$/` (harnessSelfTest.ts:232-233). harnessHonestyGate.test.ts reds any new instrument that is not enrolled, and the frozen debt list refuses additions (harnessSelfTest.ts:192-194, "born enrolled"). So the fence adds `scripts/harnessSelfTest.ts` (ENROLLED_INSTRUMENTS), and the script needs `--self-test` with a planted RED, a clean GREEN and a REFUSED scenario. It should also follow tenant-zero's three exits (0/1/2 MEASUREMENT-REFUSED), the `git ls-files --cached --others --exclude-standard` corpus, the anchors and a plausibility floor.
- C4. **Baseline location and shape.** check:ground (inside `npm run build`) audits every `docs/ground/*.json`. It requires the six-key stamp (artifact, schema, provenance `MEASURED:`, commit as a 40-hex ancestor, measuredAt, generator) and every number as `{"value","state"}` (groundContract.ts:10-30 and `findBareNumbers`). A plain counts JSON reds the build. Either shape it to CONTRACT v1 or move it out of docs/. Together with (4): move it out of docs/, **or** make the gate require baseline == measured, so that a raise without matching code is red.
- C5. The CI step must carry the same `if: needs.changes.outputs.heavy == 'true'` (:414). The card does not say so.
- C6. **`git grep -E` with `\b` is silently blind on this host.** MEASURED: `-E "...\blabels\b"` returned 0 files, while `-P "\blabels\b"` on src/lib/chartData.ts returned 33. The script must match with JS RegExp or `-P`, and its self-test plant must travel the real read path.
- C7. The `fixtures` class is ambiguous. ORDER 2 says "every class except fixtures must be 0" and also "the real ids still count". data/backends/index.json itself names `armes.tool_category`, and it falls into `fixtures` under ORDER 1's rule. The card must name exemptions explicitly: supabase/migrations as B-2 history (as tenant-zero does), docs/, and root files. For armes the `other/unclassed` group holds 6 files.
- C8. Minor: tenant-zero's pure core is `scripts/tenantZeroLens.ts`, not api/cwf/_lib/ground/. The card allows either.

## E1-a — the eleven items, part two

**(5) Does an exam-set / label mechanism exist? For held-out exam sets, NO. For partitions and labels, YES — the card's premise is false in substance. MEASURED.**
Two lenses:
- ERE (blind, see C6), then PCRE `git grep -P -i "\bexams?\b|\bacceptable\b|expectedTools|goldLabel|..." <sha> -- api scripts src shared supabase/migrations`: prose only, plus offeredByBackend.ts:5 ("The routing exam scores recall PER BACKEND").
- `heldOut|held-out|exam_?set|acceptable_?set`: 0.

What does exist:
- (a) **GOLDEN-ASSIST-1 buckets.** `core | empty-zero | routing-tr | multi-tool` are written as `#<bucket-id>` tags in `golden_specimens.note` (goldenCoverage.ts:13-24, parseBuckets :107, formatNote :143). The UI is ReplayTab `GoldenMarkPopover` (:195-260) plus a coverage strip (:138-186). So golden_specimens already carries a partition inside `note`.
- (b) **Category-level labels.** `intendedToolCategories` sits on the synthetic corpus: "populated on 66 of 66" (recallCat.ts:4-8), `buildScoringSet` (llmScanTask.ts:257-277), SyntheticQuestionSetRepository.

The card must name both. It must say that exam_set is an axis orthogonal to buckets, with no second tag grammar, and why synthetic labels are not the held-out exam (A25 [116]: schema-derived questions are smoke tests).

**(6) golden_specimens columns. MEASURED:** 20260710120000_golden_specimens.sql:46-53 has message_id uuid PK → messages(id) ON DELETE CASCADE, marked_by, marked_at, revoked_by, revoked_at, note. This matches the card's evidence:table. The only migration that alters it is that one file (`git grep -l -i "alter table (public\.)?golden_specimens|on public\.golden_specimens"`).

**(7) Can recorded router output support Recall@1 per backend without a live call? NO, not as the card writes it. MEASURED:**
- `offeredToolNames` is a **Set**: `ctx.offeredToolNames = new Set(toolDefs.map((t) => t.name))` (stageTools.ts:1007). It is unranked, so Recall@1 is undefined. recallCat.ts:60-62: "the cutoff is meaningless against an unordered set, so an unranked caller must not use this function".
- The existing scorers are CATEGORY-level. recallCat.ts:10-13: "publish a 'tool-level Recall@k' is METRIC SUBSTITUTION and is forbidden ... Tool-level recall stays a NAMED GAP until per-utterance expected TOOL labels exist". scoreTwoArms (toolRetrievalRecall.ts:108-176) is the Yol A/B two-arm category scorer at an inert k. **The card's claim to "reuse toolRetrievalRecall/recallCat" for tool Recall@1 is false. A new tool-level scorer is needed, which means this is not a pure wiring card.**
- The fields: `offeredToolNames: [...ctx.offeredToolNames]` and `offeredByBackend: groupOfferedByBackend(...)` (stageTools.ts:1174-1179) exist only in the stage-07 span output, which goes to Langfuse and `turn_trace_digest.stages`. `RecordedTurn` / messages carry no offered set, only `rawToolResults`, `toolCallCount` and `traceId` (recordedTurn.ts:41-68).
- `turn_trace_digest` is **DISPLAY-ONLY with 14-day retention** (migration 20260721120000 :26-35, :59). turnTraceDigestDisplayOnly.test.ts reds any api/cwf/_lib file outside observability/ and persistence/ that imports TurnTraceDigestRepository, so `_lib/replay/examRun.ts` cannot read it.
- routerAbLens.ts:232-235 says "there is no backend axis on a recorded specimen today".

Options: (i) Hit@1 on the FIRST CALLED tool against acceptable.tools, using messages.raw_tool_results, which is durable. (ii) Offered-set coverage of acceptable.tools, named honestly and not "Recall@1". (iii) A deterministic arm-A re-derivation over userMessage, the routerAbLens arm-A shape with no LLM. The card must pick one and name the metric truthfully.

**(8) The agentParams declaration pattern. READ:**
- agentParams.ts:686: `{ key: AGENT_PARAM_KEYS.HEALTH_MIN_N, value: 30, type: 'number', min: 1, max: 10_000, stage: '00', sessionTweakable: false }`
- The key constant at :231 is `HEALTH_MIN_N: 'health.minN'`.
- It is read through a resolver: resolveHealthPolicy.ts:85 `minN: resolveOne(byKey, AGENT_PARAM_KEYS.HEALTH_MIN_N)`, and in the same way resolveGoldenRunPolicy.ts:33.
- Rules UI reach is generic through the agent.param kind and `referencePoolFor` / AGENT_PARAM_SEEDS reset-to-floor (referencePoolIsComplete.test.ts:67-87).
- Fractions are allowed (TEMPERATURE 0.7, :365). No pinned param count was found (one lens).

Delta: the fence lacks a resolver file (for example `api/cwf/_lib/knowledge/resolveExamPolicy.ts`). `health.minN = 30` already exists as an evidence bar, so the card must say whether `exam.k25.nMin` is distinct or reuses it.

**(9) Is HealthTab the right UI home? NO. MEASURED:**
- The curation door is **ReplayTab**: `GoldenMarkPopover` (:202-260), mark and unmark (:500-548), the bucket coverage strip (:138-186), with 111 golden mentions.
- HealthTab has only a 👎-queue shortcut (`sendToGolden` :476-484, button :1414-1423) that "walks through the EXISTING curation door".

The exam-set selector and acceptable editor belong in ReplayTab.tsx, beside the bucket popover (12.6: consumer, not definition). The fence gains ReplayTab.tsx, goldenCoverage.ts and __tests__/replayTab.test.tsx. HealthTab gets at most a read-only K25 line. ORDER 7's grep `git grep -E "golden|altın" -- e2e/` hits only e2e/health-surface.spec.ts (1).

**(10) The three witness turns. UNMEASURED.**
There is no read-only SQL surface in this window: GM-1 refuses `execute_sql` on every server, and mail-wait reads relay_inbox only. No ids appear in docs/relay or docs/ground at the sha.
READ: the digest retention is 14 days. By doc-archive folder mtime (a proxy), S149/S151 ≈ 2026-09-21, S158 ≈ 2026-09-26, and T2 = 2026-09-26T16:02:28Z. All three are inside the window now, and **T3 leaves the digest ≈ 2026-10-05**.
Delta:
- Locate the witnesses through `messages` (durable; golden_specimens.message_id is the FK), not the digest, and pin them before that date.
- The T4 reference under docs/ground as .md needs YAML front-matter with the stamp (check:ground auditFrontMatter).

**(11) Is the LIVE routing path touched? For the turn routing path, NO. MEASURED.**
- E1-c is scripts and CI only.
- E1-a edits no stageTools or routing file, its params are stage '00' and inert, and it adds no LLM call.

**But** E1-a ORDER 2 changes `loadGoldenSpecimenSet` and `goldenSetHashOf`. graft_trace_calls depth 2 shows the callers: publishGovernedContentCore (GoldenDeps, PlanDeps), governance.ts constructor, prompt-golden, eval-ci, golden-runs, goldenBatchRunner. That is the live PUBLISH gate. See A3 and A4.

## E1-a DELTA (what the card needs to turn GREEN)

- A1. Correct the premise: golden_specimens already carries a partition (buckets in `note`), and category labels exist on the synthetic corpus. The card must define exam_set as orthogonal to buckets and name both mechanisms (5).
- A2. The scorer and the metric: a NEW tool-level scorer, not recallCat/scoreTwoArms reuse. The metric must be named truthfully for an unranked set, and its data source must be durable, never turn_trace_digest (7).
- A3. **Held-out leak.** loadGoldenSpecimenSet feeds the L2 publish contract (goldenSpecimens.ts:4-10). Marking the acceptance/calibration sets as golden puts them into every publish-gate golden run, so they are used during development and are no longer held-out (K11). The default feed must exclude them, or they must live outside the golden feed. The default behaviour must equal today's set, with a test for it.
- A4. **Hash.** goldenSetHashOf is the L3 EVAL-CI identity: "a changed set membership makes old baselines non-comparable" (goldenSpecimens.ts:50-56). Folding the partition into it invalidates canary and golden-batch baselines on every re-partition. Use a separate exam-set hash.
- A5. Fence: add the resolver file (8). Move the UI to ReplayTab.tsx, goldenCoverage.ts and replayTab.test.tsx (9).
- A6. Witnesses: locate through messages before ≈ 2026-10-05, and add the stamp for the docs/ground .md (10).
- A7. `--consent-tokens` / REPLAY-QUOTA-1 is meaningless for a runner that makes no LLM call and scores recorded data. It applies only if the chosen option in A2(iii) spends tokens. Say which.

## WHAT STAYS DARK

- Item (10) row ids: UNMEASURED, because this window has no read-only SQL surface.
- Card preflight: UNMEASURED (tsx EPERM).
- CI: UNMEASURED; there is no head to ask about.
- The "146 armes lines" in RULING-S160 was not re-derived; no reading above lands on it either.

END · SCOUT-STATUS-REVIEW-E1-CARDS-S161-1-v1
