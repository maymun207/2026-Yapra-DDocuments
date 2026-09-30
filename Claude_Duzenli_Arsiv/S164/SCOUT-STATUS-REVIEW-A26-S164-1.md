REVIEW-VERDICT: RED doc=A26_cwf-memory-and-learning-architecture-v0_1 md5=f7cb931efb91b62ae7063e13fd1e2bac

SCOUT-STATUS-REVIEW-A26-S164-1
FROM: scout-2 · reply_to ORDER-SCOUT-REVIEW-A26-S164-1 (id 44f4bf18-0017-4b22-9e2c-33e745c9df8b, body_md5 f6887771148bfb93f4f0ddec00e8ae07 DIGEST-OK)
BASE: origin/master 6a3824c2b5efd1764be178d05ba647feec06927c. That is exactly the card's base; `git ls-remote origin refs/heads/master` re-read at report time gives the same sha. Code lines come from `git archive 6a3824c2…` extracted to scratch, or from `git grep <sha>`. A25 lines come from yapra-mimari-documents/A25_cwf-capability-fabric-architecture-v1.html.
DOC FILE md5 (printed first): f7cb931efb91b62ae7063e13fd1e2bac
PROVENANCE OF THIS REVIEW: code is MEASURED. The DB figures in A26 (§1.1 counts, C7 row counts, learnEnabled=0 live) are UNMEASURED here. The read path refused: `mcp__supabase-ro__execute_sql` was BLOCKED by guard-mcp GM-1, and I did not route around it. LongMemEval facts in finding 6 are RECALLED from the published paper, not measured.
NOTE ON MY OWN SOURCE: I could not re-read SCOUT-STATUS-MEMORY-MAP-S163-1 against A26 byte by byte in this pass, because the order routes me to code. Where A26 attributes a line to that report, I re-measured the LINE instead. The disagreements are below and are the same either way.

WHY RED. The stage-order DECISION itself is GREEN (finding 2). RED because the draft states four MEASURED facts that the bytes contradict, and it proposes three mechanisms that collide with existing law:
- C5 is wrong: a 3-failure/0-success turn is FAILED.
- Row 3's "clean turns only" is backwards.
- The "carry-last-resolution correction detector" does not exist.
- C1 and P9 overstate: short-term history already steers stage 07.
The three collisions:
- `router_proposals` cannot carry eight kinds.
- Weight decay contradicts A25 K34 L259.
- A LongMemEval run cannot write episodes under C1-LAW.
Each item has a paste-ready delta.

──────── 1 · CLAIMS REGISTER ────────
Method: `git merge-base --is-ancestor ee12161e 6a3824c2` → ancestor. Then `git diff --stat ee12161e 6a3824c2` over every cited file. The ONLY cited file that changed is api/cwf/_lib/turn/stageTools.ts (+77/−2, CARD-K32 routing obligation; hunks at :66, :552, :582, :781, :1125, :1197). So stageTools lines past ~:1273 shift by +75. Every other cited file is byte-identical, so its lines are positionally SAME. Content was then re-read.
(Self-correction, recorded: my first diff named api/cwf/_lib/turn/toolCategories.ts, a path that does not exist, and printed nothing. The real path is api/cwf/_lib/toolCategories.ts; re-diffed there, it is unchanged.)

C1 SAME in position, DIFFERENT in claim. pipeline.ts:22 `{ name: 'register-tools', … }`, :24 `{ name: 'warm-trust', … }`. BUT "memory never reaches routing today" is FALSE. toolCategories.ts:1695-1698: `const lastPriorMessage = effectivePriorMessages[…]; const stickyCats = matchCategories(lastPriorMessage, learnedMappings, categories);` — short-term history (store 1) feeds stage-07 categories on every turn with prior messages. §1.1 row 1 "reaches stage 07: no" is therefore wrong. Row 2 itself says episodes reach stage 03 "when frameRouting on", and frameRouting's HIGH frame REPLACES the router's category set (stageTools.ts K32 hunk comment at base :812-815). So a second, conditional path from memory into routing exists.
C2 SAME. toolCategories.ts:956 `await toolCacheRepo.upsert(key, categoryNames);` (write). :1578/:1585/:1661/:1698 `matchCategories(…, learnedMappings, …)` (reads). :1806 `recordRouteProposals(…)`. The stage-07 learn site at base is :1882 `if (!learnedThisTurn && ctx.matchedCategories.length > 0) {` → :1979 `learnToolMapping(…)`. There is no toolError/resultClass test, so "no outcome test" is confirmed. Cite drift: A26's `stageTools.ts:1822-1900` (ee12) = base :1897-1975, which starts AFTER the line that proves the claim. Cite :1882 instead. "Only learned store read by stage 07": holds for LEARNED stores. K32 `routing_obligation` (new since ee12) is owner-published, not learned.
C3 SAME. mcpClient.ts:272-369, 0 isError hits (git grep and grep -c). stageTools.ts:1718-1723 `classifyToolResult({ resultText, args })`.
C4 SAME. toolResultClass.ts:169-192 returns `answered` for `[]`. stageTools.ts:1779-1781 (ee12 :1704-1705, +75) calls recordToolSuccess, and toolExperienceFlush.ts:87 `if (outcome.failed) return;` does not stop an answered-empty.
C5 DIFFERENT. memoryDistill.ts:166-172: `failed = … || answerUnbacked || groundingOk === false || (calls > 0 && successes === 0) || …`. A turn with 3 failures and 0 successes is `failed` twice over (:168 via toolOutcomes.ts:315-317, and :170).
The true gap: `toolFailures` (:179) is recorded and unused when successes ≥ 1. Also, every tool-bearing non-failed turn is `unproven` by construction (:187 `class: calls > 0 ? 'unproven' : 'clean'`).
The S161 tour turn reached `unproven` because its failures were COUNTED AS SUCCESSES (the M1 isError gap / answered-empty), not because the class rule ignores failures.
EpisodesRepository.ts:378 `OFFERABLE_OUTCOME_FILTER = …is.null,…neq.failed` — SAME.
C6 SAME. `parentsOf`/`containsAmong`: git grep over api/src/shared (non-test) prints only the definitions GraphKbReader.ts:96, :127. router_proposals readers are all off-turn: api/admin/router-proposals.ts:76, api/admin/route-proposals-summary.ts:44, and the replay A/B lens (api/cwf/_lib/replay/routerAbLens.ts:10).
C7 code-half SAME. turn_feedback readers are feedback.ts:66 (writer), admin feedback-triage.ts:61 (markReviewed), health-analytics.ts:491 (listUnreviewedDown), turn-feedback.ts:64, and HealthGovernanceRepository.ts:178-197 (a 👎→golden conversion COUNT, a metric). None is in a learning path. DB half (10 rows, 0 reviewed) UNMEASURED here (GM-1).
C8 faithful with two exceptions, quoted:
- L529 (empty/502/timeout "Öğrenilmez", K12) ✓.
- L533 red line ✓.
- L534 (1) input is cwf.trace.v2, label after the turn, "kullanıcı tekrar sordu tek başına etiket değildir" ✓; (2) ranking_policy + obligation candidate, no tool merging ✓; (3) LEARNED never → obligation ✓; (4) brakes until E5 ✓.
- L526 contamination ✓. L527 alias keyed backend + tenant/site ✓.
- L579 trace_label{trace_id, k23{…}, user_correction, re_ask, labelled_at} ✓. L580 tool_experience VIEW or retired ✓.
EXCEPTION a: A26 §4.4 adds `human_label, human_note, labelled_by` to trace_label. A25 L579 does not carry them. They are ADDITIONS and must be marked as such (A25 L611 names "summary instead of quotation narrows" as a trap).
EXCEPTION b: L259 (K34) ends "Sıralama öncelikleri (ranking_policy) YAYINLANMIŞ veridir; çalışma zamanı öğrenilmiş ağırlık yoktur (top-k içinde sıra değişimi sunulan kümeyi değiştirir → kapıdan geçer)". A26 §6 "ranking_policy weights decay with age" is a time-varying runtime weight that reorders top-k WITHOUT passing the gate. That contradicts L259 (see 5).
C12 MEASURED ABSENT (two lenses):
- `git grep -i -e "trace\.v2" -e trace_label -e traceLabel -e "\bk23\b" -e "trace\.v1" 6a3824c2 -- api src shared scripts supabase` → no output.
- Repo-wide `git grep -i -e "cwf\.trace" -e no_correction -e "answered.*grounded.*cited"` → one hit, docs/relay/A24-P1C2-K24-ROUTING-FIELDS-S158-1-AG1-report.md:119: "The rest of cwf.trace.v1 is the exam card C3's".
No builder, no label writer, no K23 code on master. A25 L658 already records "cwf.trace.v1'in inşa edilmemişliği".

──────── 2 · §4.3 STAGE ORDER — ruling on this section alone: GREEN on the DECISION, premise deltas required ────────
A25 already commits to one side:
- L259 (K34): published data only, no runtime learned weights.
- L534 (6): bandit-style routing is a HYPOTHESIS until E5.
- L627 (E3): shadow arms run on RECORDED router output ("canlı semantik kol tekrar oynatılamaz").
"No per-turn long-term recall into stage 07 in v1" is the A25-consistent reading.
WHAT IS LOST, named:
(i) latency-to-learn: publish cadence, not the next turn.
(ii) long-tail phrasing seen once: it cannot clear the 3-trace/2-conversation poisoning floor (§6), so it is never compiled.
(iii) per-USER preference: compiled rows are backend-keyed (P5), so "this user always means line 3" has no home except the prompt face.
(iv) a newly mounted backend: zero rows until enough clean turns.
WHAT IS WRONG IN THE PREMISE: P9 "stage 07 is a function of (message, published data, catalog_version, policy_version)" is false today. Stage 07 also reads prior messages (sticky, toolCategories.ts:1695-1698), an LLM frame (frameRouting), and a live semantic-router LLM call that A25 L627 itself calls non-replayable. The v1 decision is really "no NEW per-turn input from long-term stores". P9 must list the existing non-published inputs and either grandfather them by name or schedule them.
WHAT MEASUREMENT SETTLES IT, concretely. A25 E3 can only replay RECORDED inputs, so an E5 shadow of per-turn recall is impossible unless the recall candidate set is RECORDED LIVE from now. Per turn, log the tools the top-n recalled (q,a) episodes WOULD add to the offered set. The log goes to a durable store, NOT turn_trace_digest, which is display-only with 14-day retention (see 7). Metric: the rate at which recall adds a tool that (a) was not offered and (b) is the tool of the eventually-clean answer in the same or the next turn. Compare it against the compiled-rows arm over the same window. Without that log, C10 is unfalsifiable.

──────── 3 · §5 success signal — seam per row ────────
tool row: computable after M1 + TOUR-HONESTY.
- Seams: stageTools.ts:1718-1724 (classification) and :2148-2150 → toolResultClass.ts:409-419 (observeResult isEmpty/klass).
- M1 is NOT on master (card in review). TOUR-HONESTY is NOT on master: `git grep -c toolEmpties 6a3824c2 -- api src shared` → no output.
turn row: TWO UNNAMED MECHANISMS.
(a) "no tool failure that the answer APOLOGISES for" needs an answer-text detector. toolOutcomes.ts:286-296 records the owner's ruling that detecting by string-matching wording is FORBIDDEN, and the detector reads counters only. Restate it in counters: `failures > 0 ∧ an answer shipped`.
(b) "no user correction on the next turn": A26 §4.2 says "carry-last-resolution seam already exists". IT DOES NOT DETECT CORRECTIONS. memoryDistill.ts:33 `user_correction  UNDERIVABLE-THIS-PHASE (P-A): no correction detector`, and :483 `const userCorrection = null;`. The carried-resolution seam (stageClarify.ts:549-579 CarriedResolution) carries an entity forward. A correction detector is NEW and must be named. It also carries the temporal-contamination risk the draft's own Q2 raises: the label of turn t changes when turn t+1 arrives, so the label needs a `final_at`, or it is stamped provisional.
human row: seam exists and is wired to nothing. Use turn_feedback + feedback-triage.ts:61 markReviewed + health-analytics.ts:491 listUnreviewedDown (the existing review queue), not a new admin queue (see 7).
learning row: K23 all-true has NO computation on master (C12). The held-out membership test needs the exam-set registry. The exam sets are E1-a's (examScorers.ts), and A26 must name which set is "held-out".

──────── 4 · §4.4 data model ────────
router_proposals CANNOT carry eight kinds as shaped. 20260717120000_router_proposals.sql:
- :38 `keyword text primary key`; :44-45 `status … check (status in ('pending','accepted','rejected'))`.
- There is no kind column and no backend_id.
- :97-105 record_router_proposal upserts BY KEYWORD.
- toolCategories.ts:1796 calls it "a GLOBAL evidence ledger".
Eight kinds collide on one keyword PK (an `alias` "x" and an `example` "x"). P5's backend keying is impossible without a PK change. And the learning-snapshot functions serialize it by row type: 20260812160000_restore_where_true.sql:249 `delete from public.router_proposals where true` and :267 `insert … jsonb_populate_recordset(null::public.router_proposals, …)`. A PK change ripples into snapshot/restore.
Admin reader: api/admin/router-proposals.ts:76 reads through RouterProposalsRepository (keyword rows, accept/reject).
DELTA: a NEW table `learned_proposals(id, kind, backend_id, tenant_key, key, payload jsonb, evidence_trace_ids, exam_result, status, published_bundle_id, rejected_reason)`, with router_proposals kept as the keyword-evidence ledger it is. Or state the PK migration and the snapshot-function rewrite explicitly.
tool_experience → VIEW, re-probe effect, on the code. toolCensusRefresh.ts:311-316: P3 is skipped when `(experience.get(tool.name) ?? 0) > 0`. The count is CUMULATIVE WITH NO RECENCY, so one success ever suppresses the re-probe forever. That already hides faults today.
The VIEW HIDES MORE if it keys positives on the TURN label: a failing tool inside a K23-true turn gets a positive. It hides LESS if it keys on the TOOL's own result (klass answered ∧ ¬isEmpty) within a recency window.
Also: :313 skips P3 entirely on `experience === null` (unread), and `[]` floods P3. A view over an empty trace_label at rollout reads `[]`, which is the safe direction but spends budget, and it must still return null on a failed read.
There is a SECOND reader A26 omits: censusToolDoc.ts:200 `deps.experienceRepo ?? new ToolExperienceRepository()`. RULE-49 "measure readers first" must list both.

──────── 5 · §6 forgetting — existing vs new ────────
EXISTING:
- TTL: episodes.expires_at + daily hard-delete cron (api/admin/memory-forget.ts:2-4), agentParams.ts:654 MEMORY_TTL_DAYS value 90 clamp [7,365], audited as memory_audit `forget_tick` (20260731120000_memory_audit.sql:27).
- Per-episode delete on request: EpisodesRepository.ts:709 "forget one episode on request", audited as `episode_delete`.
- Reinforcement: EpisodesRepository.ts:595 reinforce (retrieval_count, last_retrieved_at).
- WHOLE-LAYER wipe/restore: learning_snapshots (20260811120000_learning_snapshots.sql:2-3; "the learned layer … SIX tables", :21-23). This is an existing rollback seam A26 never names.
NEW: supersession, retraction, decay of ranking weights, backend-unmount deletion, tenant offboarding, and user-removal cascade into LEARNED rows.
HIDDEN WRITES OUTSIDE K34:
(a) learning_restore/learning_wipe rewrite router_proposals and tool_category_cache in one SECURITY DEFINER transaction with no K34 gate. If A26's queue and LEARNED published rows live in a snapshotted table, a restore silently republishes or unpublishes learned state. A26 must say whether trace_label, learned_proposals and LEARNED rows join snapshot scope and how restore interacts with K21 bundles.
(b) ranking_policy decay is a runtime weight change that reorders top-k without passing the gate, which contradicts A25 L259. Delta: decay is itself a periodic PROPOSAL (re-publish through K34), never an in-place weight.
(c) "a LEARNED row whose evidence traces are all retracted is auto-proposed for rollback" is fine only as a proposal. Keep the word "proposed".
(d) User deletion: §6 deletes "user-scoped memory". A LEARNED example compiled from that user's TEXT is backend-scoped and survives, so erasure is incomplete (see 9).

──────── 6 · §7 LongMemEval — category error as written; a faithful MEMORY-1 ────────
RECALLED (published paper, Wu et al. 2024): LongMemEval is long-horizon CHAT-HISTORY QA. Roughly 500 questions sit over ~50-session haystacks, and the five abilities are information extraction, multi-session reasoning, temporal reasoning, knowledge updates and abstention. Facts live in free-text user/assistant sessions.
MEASURED blockers to "run the published harness against the prompt face with a fixture backend":
(a) Episodes store no conversational facts. They are "distilled deterministically (no LLM, no raw tool payloads)" (20260730150000_episodes.sql:76). Rows are asked/entities/scope/tools/decision, with no assistant content.
(b) The same line: "Synthetic/replay actors are REFUSED at the distiller door and the repository method (C1-LAW)". A harness replaying 50 sessions per question CANNOT write episodes without a real user identity. That would violate C1-LAW or pollute a real user's memory.
(c) The fixture backend is irrelevant to chat facts. Its tools/call is an echo (fixtureMcpServer.ts:71-76).
(d) "Abstention = memory chip absent" measures whether memory was INJECTED, not whether the ANSWER abstains. A fabricated "yes, last week KB7 stopped" with no memory block scores as correct abstention.
FAITHFUL MEMORY-1, concretely. Keep LongMemEval's five-ability TAXONOMY, and build a CWF-shaped set on the fixture vocabulary under a named synthetic identity whose episodes live in a task-namespaced store (the AgentBeats task_id namespacing the snapshot migration already names, :18-20):
- extraction: an entity resolved in session 1 is recalled in session 5.
- multi-session: two sessions' filters combine.
- temporal: "the stop I asked about last Tuesday".
- knowledge update: an alias corrected in session 3 supersedes session 1.
- abstention: a question about a never-discussed entity.
Score the ANSWER TEXT with the existing hedge/assertion lexicon machinery (examScorers.ts:150-164 splitSentences / sentenceViolation, CompiledLexicon), not the chip. Run the published LongMemEval only as an EXTERNAL reference number, labelled as a different task.

──────── 7 · §12.6 CALLER-ABSENT sweep ────────
- Offerable class "clean or (grounded ∧ toolFailures=0)" (§4.3 prompt row) ALREADY EXISTS, stricter, as `procedureEligible` (memoryDistill.ts:293-323: not failed ∧ groundingOk===true ∧ toolFailures===0 ∧ … ∧ toolLedger.calls>0 ∧ domain yield ∧ frame). WIRE it; do not write a second predicate.
- `default_plan` "from clean episodes' decision.procedure" (§4.3 planner row) is an EMPTY SET under today's classifier. `clean` ⇔ calls===0 (:187), and decision.procedure is written only for procedureEligible turns (:405), which require calls>0 (:312). Source default_plan from procedureEligible episodes. The procedure-recall path already feeds the planner: memoryRetrieve.ts:646 `ctx.offeredRoutine = outcome.routine` → :563 `derivePlan(ctx.irFrame, ctx.offeredRoutine ?? null, overrides)`.
- §1.1 row 3 "semantic_memory: clean turns only (procedureEligible)" is BACKWARDS. procedureEligible admits no `clean` turn.
- "Label writer": no trace_label writer exists (C12). Two nearby seams. turn_trace_digest is DISPLAY-ONLY BY LAW (20260721120000_turn_trace_digest.sql:26-30 "no governance / grounding / gate / trust code path may ever read this table — enforced by a standing test"; :32-37 14-day retention), so it CANNOT be the learning input. telemetry_events `tool_call` rows already carry per-call `ok` + `klass` + `reason` (stageTools.ts:1846-1868) in the durable ledger. A v1 label can be derived from telemetry_events + episodes.decision.outcome without a new event store, and A26 should say whether trace.v2 is that or new.
- Human-label review queue (§8 M3 "admin review queue UI"): EXISTS — feedback-triage.ts:61, health-analytics.ts:491, turn-feedback.ts:64. Wire it.
- Rollback (P4 "one click"): whole-layer learning_restore EXISTS. Bundle-level rollback is new. Say why both are needed.
- Correction detector: NEW (see 3b); name it.
- Extractor: new; no existing seam writes proposals of any kind but keyword.
- Decay: new (see 5b).

──────── 8 · NO-HARDCODE ────────
Where a name or surface form would enter code under this design:
(a) The critique block "last time this asked X, tool Y failed because Z — do not repeat" (§4.3). The sentence template is a fixed user/model-facing text, and A25 L265 rules those become `prompt.segment` data (the completionGuard.ts:228 precedent). The tool NAME comes from data, which is fine.
(b) The "memory used: n rows, oldest d days" chip belongs in src/lib/params/chatSurface.ts (the OUTAGE_CHIP_TEXT tr/en pattern at :207), never inline.
(c) The next-turn correction detector ("hayır, KB7", A25 L527) is the trap. Detecting correction by Turkish tokens in code is a surface form in code. It must be a governed lexicon (the CompiledLexicon precedent in examScorers.ts), keyed by locale.
(d) A25 L531's example default plan "asakai A3 için stops∥oee∥scrap" is backend-specific. It must never be seeded as a default; it arrives only as a LEARNED proposal from that backend's own turns.
(e) Existing tests' ctx builders use `backend_id: 'armes'` (e.g. toolResultClassWiring.test.ts:42,60). New A26 tests must not copy them.

──────── 9 · What the draft does not say and must ────────
(a) Cross-user leakage through LEARNED text. P5 keeps episodes per user, but compiled `example`/`alias` rows are backend-scoped and reach every user's routing and, via tool-profile examples, prompts. router_proposals already stores `sample_query` as the user's message truncated to 200 chars (router_proposals.sql:57-58). K23's `no_pii` is a claim with no measured Turkish-text PII scrubber named. Name the scrubber and its measured recall, or forbid raw user text in published rows (store a paraphrase from the intent generator, A25 K40).
(b) Authorization. An example learned from a user with access to backend X must not surface to a user without it. Offering is K10-gated, but prompt-face critiques and dossier blocks are not routing. State the key.
(c) Erasure completeness: user removal must cascade into evidence_trace_ids and into LEARNED rows derived from that user's text (see 5d).
(d) Synthetic, task and clean-agent turns. Episodes refuse synthetic actors (C1-LAW), and stageTools.ts:1921 refuses learning on clean-agent turns (isCleanAgentTurn). trace_label and the extractor must inherit both refusals by name, or the AgentBeats zero-cross-run rule breaks.
(e) Replay: a replayed turn must pin the LEARNED bundle version live at the time (K35 catalog/policy_version), including after a rollback deleted it. Rolled-back bundles must stay readable for replay.
(f) Cost: per-turn label computation, a next-turn detector pass, per-proposal K34 exams (a routing exam per proposal), and canary. Budget them and batch proposals per exam run.
(g) Tenancy: router_proposals and tool_category_cache have no tenant or backend key today. A26's "tenant" appears only in P5 and §6 offboarding. Name the column on every learned table.

──────── PASTE-READY DELTAS ────────
Δ1 §1.1 row 1, "reaches stage 07?": replace "no" → "YES — sticky union: the last prior message's categories join the offered set (toolCategories.ts:1695-1698)".
Δ2 §1.1 row 3, "written when": replace "clean turns only (memoryDistill.ts:298-322 procedureEligible)" → "procedureEligible turns only (memoryDistill.ts:293-323): tool-bearing (calls>0), grounded, zero tool failures — never `clean`, which by :187 means calls=0".
Δ3 §1.1 row 4 cite: "stageTools.ts:1704-1705" → "stageTools.ts:1779-1781 @6a3824c2"; "read where": add "censusToolDoc.ts:200".
Δ4 §1.1 row 5 and C2 cite: "stageTools.ts:1822-1900" → "stageTools.ts:1882 (gate: `!learnedThisTurn && matchedCategories.length > 0`, no outcome test) → :1979 learnToolMapping @6a3824c2".
Δ5 §1.2 F3 and C5, replace with: "MEASURED · a turn with failures and ZERO successes is `failed` (memoryDistill.ts:168, :170). The gap is (i) `toolFailures` is recorded (:179) and unused when successes ≥ 1, and (ii) every tool-bearing non-failed turn is `unproven` (:187). The S161 tour turn was `unproven` because its failures were counted as successes (F1/F2), not because failures are ignored."
Δ6 C1 → "MEASURED · stage 07 precedes stage 12 (pipeline.ts:22, :24): LONG-TERM stores do not reach routing; short-term history does (sticky, toolCategories.ts:1695-1698), and episodes reach stage 03 when frameRouting is on."
Δ7 P9 append: "Existing non-published inputs to stage 07, grandfathered by name until E5: prior-message sticky categories; the LLM frame; the live semantic router (A25 L627: not replayable). v1 adds no NEW per-turn input from long-term stores."
Δ8 §4.3 append: "MEASUREMENT (starts before E5, because A25 E3 replays only recorded inputs): per turn, record in a durable store (NOT turn_trace_digest — display-only, 14 d) the tool names the top-n recalled episodes WOULD add to the offered set; metric = rate at which that set contains a not-offered tool that the eventually-clean answer used. C10 is decided on this log."
Δ9 §4.2 no_correction line: replace "(carry-last-resolution seam already exists)" → "NEW MECHANISM: no correction detector exists (memoryDistill.ts:33, :483 userCorrection = null). Detector = governed locale lexicon, never code literals; labels are PROVISIONAL until turn t+1 or a timeout, with final_at."
Δ10 §5 turn row: replace "no tool failure that the answer apologises for" → "not (failures > 0 ∧ an answer shipped) — counters only (toolOutcomes.ts:286-296 forbids wording detection)".
Δ11 §4.3 prompt row: replace the offerable predicate → "offerable = procedureEligible (memoryDistill.ts:293-323), the existing predicate; no second one". Planner row: "default_plan from procedureEligible episodes' decision.procedure (clean ⇔ calls=0 has none)".
Δ12 §4.4 replace the router_proposals bullet → "NEW table learned_proposals(id, kind, backend_id, tenant_key, key, payload, evidence_trace_ids[], exam_result, status, published_bundle_id, rejected_reason). router_proposals stays the keyword-evidence ledger (PK keyword, global — 20260717120000_router_proposals.sql:38, toolCategories.ts:1796). Snapshot scope stated for every new table."
Δ13 §4.4 tool_experience bullet append: "The view counts the TOOL's own result (klass answered ∧ ¬isEmpty) inside a recency window — never the turn label (which would credit a failing tool in a good turn). It returns null on a failed read and [] only on genuine absence (toolCensusRefresh.ts:311-316). Readers: toolCensusRefresh.ts:442 AND censusToolDoc.ts:200."
Δ14 §6 Decay: replace → "ranking_policy decay is a periodic PROPOSAL through K34 (re-publish with decayed weights), never an in-place runtime weight (A25 L259)." Add: "Existing: TTL cron memory-forget.ts; per-episode delete EpisodesRepository.ts:709; reinforce :595; whole-layer learning_wipe/restore (20260811120000). Restore interacts with K21 bundles as follows: <state it>."
Δ15 §7 LongMemEval bullet: replace → "MEMORY-1 = LongMemEval's five-ability taxonomy on a CWF-shaped set over the fixture vocabulary, under a task-namespaced synthetic identity (C1-LAW: episodes refuse synthetic actors, episodes.sql:76), scored on ANSWER TEXT with the examScorers lexicon; abstention = no unhedged memory claim in the answer, never 'chip absent'. The published LongMemEval number is reported separately as an external reference, labelled a different task."
Δ16 §4.4 trace_label: mark `human_label, human_note, labelled_by` as "A26 ADDITION (not in A25 L579)".
Δ17 C12 → "MEASURED ABSENT @6a3824c2 (two lenses): no cwf.trace.v1/v2 builder, no trace_label, no K23 code; turn_trace_digest is display-only by law and cannot be the input."
Δ18 NEW §9a SECURITY: items 9(a)-(g) above as required design statements before P2.
Δ19 §8 A26-P1 row: "trace.v2 source: telemetry_events tool_call rows (durable; ok/klass/reason at stageTools.ts:1846-1868) + episodes.decision.outcome, OR a new append-only table — decided in this row; never turn_trace_digest."

read relay_inbox at 2026-09-30 via mail-wait --read (card 44f4bf18).
