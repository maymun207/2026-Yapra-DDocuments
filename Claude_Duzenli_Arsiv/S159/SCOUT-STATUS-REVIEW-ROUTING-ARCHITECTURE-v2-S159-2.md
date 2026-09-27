DESIGN-VERDICT: RED-ON-DESIGN doc=CWF-ROUTING-ARCHITECTURE-v2-DRAFT-S159-2

# SCOUT-STATUS-REVIEW-ROUTING-ARCHITECTURE-v2-S159-2

FROM: scout · 2026-09-26T18:07:58Z · answering ORDER-SCOUT-REVIEW-ROUTING-ARCHITECTURE-v2-S159-2-v1 (relay_inbox id 36d29053-d7ef-455e-8a91-9ff5931b346d, created_at 2026-09-26 17:23:53.60055+00)
KIND: doc-only adversary review. No code edited, no governed data touched, no card cut, no push, no poll/cron task created. No environment value printed.

## 0 · Premise and instruments (each value beside its command)

- Card read: `node scripts/mail-wait.mjs scout --read ORDER-SCOUT-REVIEW-ROUTING-ARCHITECTURE-v2-S159-2-v1` → `[DIGEST-OK]` body_md5 b65f6a56d8d1d3da6fda92d54ef3cdfc; `[PREFLIGHT-UNMEASURED]` (tsx IPC pipe `listen EPERM` in the scout sandbox) → the card was DELIVERED UNCHECKED, third value; `[NOT-TAKEN]` (read, not taken).
- Gate controls: `git -C /nonexistent-gate-probe push --force origin gate-probe` → `[guard-bash] BLOCKED · GB-4` (PASS). `mcp__supabase-ro__execute_sql` → `[guard-mcp] BLOCKED · GM-1` (PASS).
- Mode: `readMode()` → `FACTORY-MODE READY`.
- Master: `git ls-remote origin refs/heads/master` → 2a6f6781b1a4748aac5f5bc7b1d73136863b1c35; `git rev-parse HEAD` → same. MASTER DID NOT MOVE; the code review below is on the anchor.
- Doc hashes: `shasum -a 256` → doc v2 ee5f2c973f93c45c8a2bec6a8cee93c5c5dfdcae63fa4dbd3323aaac79b6de29, evaluation a86154336b284bb9a57beb9efe1e0d71b60975a924e48b3b810e89c3df715a64. Both MATCH commit 02aabfc7f6a2675e8aa9c2a10cee0cd612c91a8f. PRECISION NOTE: `git log -1 -- Claude_Duzenli_Arsiv/S159` is f93d72d5 and carries only the bootstrap hash; the two document hashes are in 02aabfc7 (that commit's successor states "other S159 close files unchanged"). The card's pointer is one commit off, and the premise holds.
- A24 base: Claude_Duzenli_Arsiv/S150/A24-V1_3-ARCHITECT-CAPTURE-S150-1-v1.md, read in full (218 lines). LIMIT: this is the Architect's CAPTURE of A24 v1_3. The v1_3 original lives in the project box, which this window cannot open. "A24 says" below means "the capture says".
- My own S159-1 verdict: NOT READABLE by this window. `mail-wait --read` returned `[NO-SUCH-CARD]` (read OK, zero rows) under both `scout` and `architect`. Scout replies travel from_lane and no box reader returns their bodies, and the boot forbids reading the bus any other way. Step 2 therefore uses the nine-item enumeration of that verdict recorded in register v150 row 103.
- Live DB: UNMEASURED. GM-1 refuses `execute_sql`. `scripts/roQuery.ts` would issue the same verb over the same `supabase-ro` transport, which is routing around a refusal (CLAUDE.md §6), so it was not used. Every DB number the card asked for is printed as UNMEASURED with this reason. The Architect can authorise that read path by name.
- Bus: `scout_reply` with this full body → HTTP 400 `P0001 scout_reply refused: body exceeds 8192 characters (length: 30065)`. Per the card, this file is the full reply, and a slip carrying its sha256 goes on the bus.

## 1 · STEP 1 — INLINE CHECK (doc v2 §2 vs the A24 capture)

| Rule | A24 capture (quoted) | Doc v2 §2 | Verdict |
|---|---|---|---|
| K17 | "entry tool and probe literal-free …; candidate = listing/search classifier ∩ readOnlyHint ∩ owner allowlist; canary-verified; owner veto." (§4). Entry-tool row (§2): "Base set BUDGETED: tool_search + usage-frequency top N; summaries only for top-k backends." | "giriş yüzeyi VERİDEN (tool_graph_node role=entry); kodda araç adı yok" | NARROWED — RED. Drops the classifier ∩ readOnlyHint ∩ OWNER STATIC ALLOWLIST conjunction, the canary, the owner veto and the budgeted base set. Substitutes `tool_graph_node role=entry`, which the capture does not name. |
| K19 | "exam sliced: frame (st02) / retrieval / slot / ask / reach — separate error counters; a single Recall@1 is not a root cause." | same | SAME |
| K21 | "dual-card and versioned bundle: PUBLISHED vN serves while CANDIDATE vN+1 is examined; card_version bundle; atomic pointer; compatible change ≠ schema break ≠ authorization revocation ≠ security suspicion (QUARANTINE)." Versioning row: "card_version = sha256(…)". | + "Geri alma DEMETİ geri alır" | WIDENED (group rollback comes from Astra D13, not A24; label its source). The sha256 form and the state machine are ABSENT (see card faces). |
| K22 | "partial corpus miss = UNMEASURED (partial≠complete); NIL / AMBIGUOUS as in A23; structural ontology (layers) ≠ dynamic data (probe; P3+ federated micro-probe, budget measured in P2, no invented number)." | first and last clauses only | NARROWED — RED. Drops NIL/AMBIGUOUS and the micro-probe budget rule. |
| K23 | "answered ∧ grounded(st12) ∧ citation-backed ∧ no correction within one turn ∧ no PII ∧ not_empty — all required; alias keyed by backend + tenant/site/context." | same | SAME |
| Learning law | "empty / 502 / timeout / UNREACHABLE → NO learning. Negative only on verified wrong-match or user correction." §8 red line: "learning improves how a tool is FOUND — never what it DOES (schema, slots, source attribution)"; "never enters held-out (contamination)"; alias "never to another backend". | sentence SAME; P5 keeps only "şema değişmez" | NARROWED — RED. The red line has shrunk to "schema". Doc v2's proposal list adds "birleştirme adayı" (tool MERGE), which changes what a tool IS, and the held-out exclusion is gone. |
| K24 | "trace schema frozen (cwf.trace.v1, §7b); OpenTelemetry gen-ai semantics; P2 shadow days are not merged without it." | same | SAME in text. A6 collides with "frozen" (attack iv). |
| K25 | "regression with confidence interval; acceptance bar SEPARATE and declared BEFORE measuring (the system cannot lower its own bar …); τ calibrated from data." | same | SAME |
| K26 | as v2, plus: "st12 grounding drops a numeric claim absent from tool bytes or stamps it 'model hesabı, kaynakta yok'. Structured plan first; free code execution (sandbox) is a second stage under the SOTA-1 triple …". §13.1: "the st07p LLM planner … is a NEW MODE of this organ … landing in turn/planner.ts …, not a new module". | drops the st12 drop/stamp clause, the sandbox stage and §13.1 | NARROWED — RED |
| K28 | "… narrative sections LLM, stamped 'öneri'; line-by-line deterministic/soft marking; template chosen from frame format/audience; priority order from numbers (lost minutes × frequency), not the model's opinion." | first two clauses only | NARROWED — RED |
| K29 | "… (shift tool if present, else owner-curator entry); 'today/this shift' resolved by it; the answer names the definition; never asked." | drops source, "names the definition", "never asked" | NARROWED — RED |
| K31 | "… every node named in trace; zero matches = real-0, unreadable = UNMEASURED; … descendant walk only for multi-layer phrases (parentsOf/containsAmong get WIRED …)." | drops "every node named in trace" and "only for multi-layer phrases" | NARROWED — RED. L1(d) also WIDENS the walk to company scoping. |
| Conformal scope (K9 + Scope row) | "scope = calibrated set, raw score never decides; … α declared (default 0.10); reject ⇔ empty set; NOT ARMED while n < n_min (declared 30 held-out turns); rebuild invalidates calibration; decision classes match · ambiguous · reach_failure · unauthorized · verified_unsupported." | "KONFORMAL KÜME (α), backend başına; n<n_min iken KURULU DEĞİL; beş karar sınıfı" | NARROWED — RED. Drops "raw score never decides", α default, n_min=30, reject⇔empty set, "rebuild invalidates" and the class names. L1(f) "rank ≤ N" is a raw-rank decision and replaces A24's usage-frequency base set without saying so. |
| Exam basis (K11 + Exam rows) | "paraphrase generator ≠ profiler; schema-derived = smoke; label = acceptable set; three sets: profile-development · calibration · independent acceptance". Three layers: routing ∧ reach, "plus E2E task exam, golden set N=10/backend, nightly, spend declared (OWNER-APPROVAL-S149-E2E-N10-1)". | held-out + paraphrase + negatives + smoke + acceptable set + synthetic stamp + connected | NARROWED — RED. Drops generator≠profiler, the three disjoint sets and the E2E N=10 exam as a LAYER (it survives only as a SOTA-column mention in §8). This is load-bearing: L0 now indexes GENERATED intent examples as card data, so without these guards the exam is a closed loop (A24 §10 trap "exam contamination → K11"). |
| Authorization (K10 + row) | "identity of derivation on the card; user scope filter before the model; re-check at tools/call; scope match grants no call authority; invalidate on scope change"; "server text untrusted"; "probe allowlist is the owner's static list, not readOnlyHint". | "tenant/kullanıcı kapsamı, okuma/yazma sınıfı, RBAC kapsam süzgeci — getirme ve LLM'in ÜSTÜNDE" | NARROWED — RED. Re-check at tools/call is the guard P8 needs (tools registered mid-turn), and it is gone. |
| Card faces (§5) | Identity & state · tool inventory · tool profile · slots · corpus inventory · alias/glossary/metric/hint · entry tool · card summary (≤60 tokens) · calendar/output contracts/web card; + calibration/acceptance; + state machine DRAFT→CARDED→ROUTING-GREEN→REACH-GREEN→PUBLISHED, EXAM-RED/UNREACHABLE/CANDIDATE/QUARANTINE/DISABLED/WRITE-GATED/DEGRADED; card home = "existing governance kinds + new derived kinds, same governance path (12.6)". | identity&state · inventory · profile · slots · layers · corpus probe · exam verdicts · SLO (K18) · web card (K30) | NOT SAME — RED. ABSENT: the alias/glossary/metric/hint face, the entry-tool face, the card summary, calendar, output contracts, the whole state machine, and the 12.6 home rule. §6 EKSİK "kart demeti (K21) tabloları" reopens the parallel store that A24 closed. |
| A24 P4 (carried in §2) | "card path primary; keyword as ladder floor; ALWAYS_INCLUDE deleted; tool_search opened … Removed: … hand category rows (archived)." §10: "word-list router blind to paraphrase → removed; hybrid retrieval; keyword only as ladder floor". | §2 carries it, and §4 P2's migration default makes every keyword row an OBLIGATION | CONTRADICTED INSIDE doc v2 — RED (attack i) |

Tally: SAME 5 (K19, K23, learning-law sentence, K24, K25) · WIDENED 1 (K21) · NARROWED 10 (K17, K22, learning red line, K26, K28, K29, K31, conformal, exam basis, authorization) · card faces rewritten with ABSENT parts · one A24 rule contradicted inside the document.

The doc's own rule (line 10: "inline etmediği hiçbir dış kuralı adıyla anmaz") is violated. It names without inlining K1, K10, K13, K15, K16, K18, K20, K27 and K30, plus "A24 L5", "G2c", "D12", K-A/K-A′/K-G, S102-YASA-3, AGNOSTIC-1 and the S153/S156/S149 rulings. `grep -n -o "L5…|G2c|miss ledger|kaçırma"` over the capture → zero hits: "A24 L5" and "G2c" do not exist there (one lens; the v1_3 original is unread). K15 ("TR BM25 analyzer mandatory; analyzer-less BM25 is a P2 ablation baseline, not production") is contradicted by L0's "E3 decides". K1 ("locked small set; … per-turn max K tools and max schema tokens DECLARED") is contradicted by P9. Ladder ③e ("Qdrant 502 → ladder falls to BM25-TR by name; no silent empty set") is ABSENT.

## 2 · STEP 2 — DELTA CHECK

My S159-1 verdict (items as register v150 row 103 lists them):
1. Ungated learnToolMapping → P5 brake, §6, E5: APPLIED. Code: the brake already exists (`toolCategories.ts:929` `learnEnabled === false → 'skipped_brake'`, write at :950-956). Live `router.learnEnabled` is UNMEASURED (DB). GAP: the migration default does not say that LEARNED mappings (tool_cache) never become obligations.
2. Q3 hint fix landed S151 → §1 T3: APPLIED. GAP: OWNER-RULING-S151-K1-METRIC-HINTS-ALL-ACTIONS-1 (`deriveCategories.ts:123-126`, "amends the K1 matrix rule that OWNER-RULING-S140-K1-ORDER-CELL-HINT-1 last amended") appears in neither the void list nor the keep list.
3. Clarify after stage 07; no company layer → §1(f), L1(d), E4: PARTIAL. The mechanism is wrong (attack ii): stage 03 READS the frame that stage 07 produces.
4. routeShadowLens arm A; live arm not replayable; no per-backend Recall; ADR-008 → C13, R6(e), §6: PARTIAL. E3 still lists "bugünkü matrisli yol" as an arm on "the same tasks" without saying it is not replayable.
5. frameRouting=0 also switches off hints, the metric floor and unmodeled-keep (:1609) → named in the header only. L1(c) and E3 ignore it: NOT APPLIED (attack v).
6. Yol B vector-only, hashed encoder, BM25 on entity names only → L0: APPLIED.
7. Counts 50/71 and 11+8 → T4, E5: APPLIED.
8. Toollery intent queries as gated card data → L0: APPLIED. Two gaps: no contamination guard (Step 1 exam row), and my own "BM25 beats embed+rerank" needs a qualifier (Step 5).
9. Governed floor = a measured PROPERTY of the offered set after every cap (governedKept), not an ordering promise → L2 "Doldurma sırası: yükümlülükler → …" IS an ordering promise, and A6 has no governedKept field: NOT APPLIED.

Astra A1–A11 (evaluation §3):
A1 → P2: APPLIED, but its budget parameter does not exist (attack i). · A2 → P9: APPLIED in words, unsound in mechanism (attack iii). · A3 → P10: APPLIED. · A4 → learning loop "Kapı", E2: APPLIED. · A5 → P8: APPLIED, without the tools/call re-check. · A6 → §5: APPLIED, collides with K24 (attack iv). · A7 → L0: APPLIED. · A8 → P7: APPLIED; E4 exit "≤ router.maxFanout" names a parameter that does not exist. · A9 → §7: APPLIED. · A10 → §8: APPLIED. · A11 → P4: APPLIED.

## 3 · STEP 3 — CODE RE-MEASURE at 2a6f6781

- stageTools.ts:551-575 — `if (ctx.isAnthropic || ctx.labActive?.routingBypass)` → all `scopedTools` sorted, `ctx.matchedCategories = []`. C4 RIGHT. ADDITIONALLY MEASURED: on this branch `resolveTurnFrame` returns `absent(FRAME_ABSENCE_REASON.ROUTING_BYPASS)` (resolveTurnFrame.ts:172), and `ctx.irFrame` is assigned only at stageTools.ts:833 inside the filtered branch. On Anthropic there is therefore NO frame, NO planner PLAN block (planner.ts keys on `ctx.irFrame`/`IrAction`, :175-194, :362-386) and NO stage-03 input (stageClarify.ts:2755 `const frame = ctx.irFrame`). Doc v2 §6 "resolveTurnFrame zaten her yolda → L1 girdisi" is true of the CALL and false of the FRAME.
- (a) Any path on which the Anthropic branch applies categories or obligations? NONE. The only filtering before the branch is the scope set (`scopedTools`), i.e. authority. The doc is right.
- deriveCategories.ts:200-231 — hints and floor applied last over every branch. C3 RIGHT, and they are reachable only inside `if (routerPolicy?.frameRouting && irFrame)` (toolCategories.ts:1609). MATRIX :63-94; the replace happens at :1620-1625 only under frameRouting ∧ HIGH. C2 RIGHT.
- toolCategories.ts:1545-1570 — on semantic success no matchCategories runs over the CURRENT message. C1 RIGHT, with a nuance: matchCategories does run on the semantic path over the LAST PRIOR message (sticky, :1679-1686). Matching is token-exact (`words.includes(keyword)`, :1169); multi-word keywords are substring tests (:1164-1166).
- censusToolDoc.ts:214 — C5 RIGHT, but INCOMPLETE on question (b). `experienceForBackend` feeds `renderCensusNote`, which appends "This tool has been used successfully in practice." (:137-139) to the MODEL-FACING tool description (`appendCensusNote`, :153). It is gated by `toolCensus.composeEnabled`, floor 0, and "0 means ZERO READS" (:57-61, :196). Live value UNMEASURED (DB).
- (b) Does anything on the selection or ranking path read tool_experience? The deterministic path does NOT (toolCategories, toolRetrieval and the ranking code have zero references; the stageTools.ts references at :48, :1670-1688 only WRITE). ONE read reaches the LLM's selection context, as description text behind a dark flag. That is an ungated "experience → selection" channel, and doc v2 does not list it under P5.
- governance.ts:427-451 — C7 RIGHT. (c) `grep -rn decideGoldenPublish api src shared scripts` → one production call site, governance.ts:434, inside `if (draft.kind_id === SYSTEM_KIND_IDS.PROMPT_SEGMENT)` (:431); every other hit is a test. It is NOT reachable for any other kind.
- toolRetrieval.ts:335-349 — `seen.has(c.tool)` on the bare name. C8 RIGHT. stageTools.ts:1271-1285 — `claimToolName` on the SANITISED name (`replace(/[^a-zA-Z0-9_]/g,'_')`), `continue` on collision. RIGHT; sanitisation adds a second collision class (distinct raw names that sanitise to the same name).
- encoder.ts:11-23 (hashed dense stand-in) and qdrantEngine.ts:518-523 (dense + sparse prefetch, `fusion: 'rrf'`) — C9 RIGHT.
- ToolExperienceRepository.ts:109-150 — select, then add, then upsert, with no atomic increment. C14 RIGHT. By design a failed prior read writes only the turn's own count (:134-146), so the race UNDERCOUNTS; it never inflates.
- routeShadowLens.ts:10-30 — "COMPUTES LOSSES AND REFUSES TO COMPUTE GAINS". C13 RIGHT.
- toolRetrievalAcceptance.test.ts:163-176 (+ :178 second group) — `it.fails.each` "OPEN GAP". C11 RIGHT.
- planner.ts:18-29 — deterministic, "IS NOT: a second LLM call …", "ONE planner organ". runTurn.ts:191 runs the pipeline (stage 07) and :259 runs clarify after it. C12 RIGHT.
- Not re-measured by me: C6 (live), C10 (stageTools 867-903 not read), C15 (arithmetic; agree).

## 4 · STEP 4 — DESIGN ADVERSARY

(i) P2 migration default → §4 P2, §5 L2, R6(b).
- MEASURED: `router.maxTools` DOES NOT EXIST. agentParams.ts:76-97 holds router.enabled, timeoutMs, maxCategories (floor 4, :502), contextTurns, frameEnabled and frameRouting. Two lenses agree: the key table, and a repo-wide `grep -rn -i "maxTools|max_tools|toolBudget|maxOffered|maxFanout" api shared src`, whose only hit is derivedPack.ts:108 `MAX_TOOLS = 40`, a display cap. OBLIGATION-OVERFLOW therefore has no denominator: "rare stamp or normal state" cannot be answered because the budget it is measured against is undeclared.
- UNMEASURED (DB, reason in §0): the count of published tool_category rows and keywords, and the 200-digest estimate.
- CODE-FLOOR LENS (toolCategories.ts:193-556, the outage floor, whose 13 rows match doc v2's "13 satır"): 154 keywords and 113 tool slots. The unit an obligation would bind is the CATEGORY: a single token offers the whole category (`getToolsForCategories`, :1185-1193). production = 23 tools, machine 21, material 19. 'tüketim' sits in both production and machine, so ONE token obliges 42 distinct tools (23+21, minus 2 camera tools they share). Function words are keywords: 'neden' (why) → linestop, and also 'not', 'plan', 'alan', 'hat', 'miktar', 'hata', 'verim', 'canlı'.
- For T2 (router [employee, production]) the category-level obligation is 8+23 = 31 tools. Any declared maxTools below 23 turns a lone 'production' match into an overflow by construction.
- READING: under the default as written, overflow is the NORMAL state for MES questions at any budget of about 30 or less. The default also rebuilds today's keyword router as a mandatory floor, which contradicts A24 P4 and §10, and it makes E3's retrieval arms moot on every obligated turn.

(ii) L1(d) company layer as exact-match data → §5 L1(d), R6(c).
- Row shape (migration 20260726120000 :73-86, :184-193): `discovery_tool` is NOT NULL, and `frame_object` holds an IR object value; the 13 IR objects have no COMPANY. The DDL comment (:89) says entities are "DISCOVERED at runtime into entity_registry and are never authored here".
- What breaks in stage 03 today:
  1. A company row must name a listing tool, and entityDiscoverySync calls whatever it names. Hand-authored exact-match entities have no home under this contract.
  2. frame_object NULL → "discovered but not routable yet": cross-layer fallback only.
  3. frame_object = 'FACTORY' → factory frames also scope to companies, and `knownFactoryNames` (stageClarify.ts:962, :1047, which filter on `frame_object === 'FACTORY'`) prints company names as "Kayıtlı fabrikalar".
  4. A declared, enabled, matching layer with zero registry rows → computeClarification.ts:265-266 `declared-empty` → HIGH "Sistemde kayıtlı hiç '<layer>' bulunmuyor, bu yüzden bu soruyu yanıtlayamıyorum". That refuses every matching question.
  5. Stage 03 reads `ctx.irFrame` captured at stage 7 (stageClarify.ts:11, :2755). "Stage 03 before stage 07" is therefore not a pipeline reorder. It is a SPLIT of the one router LLM call that today yields both the categories and the frame.
  6. On Anthropic there is no frame, so L1(d) cannot run there at all.
  7. E5's "delete the IR enums from the routing path" collides with `frame_object`, which is an IR-enum column, and with planner.ts's IrAction keys.

(iii) P9 Anthropic full catalogue → §4 P9, §5 L2 last bullet.
- An "offer" obligation is VACUOUS on a path that offers everything (measured above). "Her iki yolda yükümlülük ve yetki aynı" is true for authority (scopedTools) and false for obligations: they bind the offered set on the filtered path and bind nothing on Anthropic.
- "L1/L2 output as PLAN input" on Anthropic needs a frame and retrieval that path does not run today. That is a new per-turn cost on the cached path, and nothing requires the planner to cover an obligated capability.
- P9 also contradicts A24 K1 and the §10 scale trap ("100 backends = 100 open tools").
- The doc must say honestly that on Anthropic an obligation is at most a PLAN obligation (the planner covers it or states why, verified in the trace), and must put the K1-on-Anthropic question to the owner.

(iv) A6 routing event vs K24 frozen → §5 learning loop.
- K24's frozen fields already hold offered_set[], scores[], decision, exec_calls[] and result_class. A6 adds per-tool candidate/offered/selected/sent/args-correct/contributed/reason plus catalog_version and policy_version.
- A frozen schema is extended only by a VERSION (cwf.trace.v2) with a field map. Otherwise it is an edit to a frozen schema.
- Today tool_experience is a TABLE written per turn (runTurn.ts:303) beside a separate trace sink (turn_trace_digest/Langfuse). "Derived view" becomes true only if tool_experience is a view over the event store, or is retired.
- "args correct" and "contributed" are post-turn K23 judgements and cannot be in-turn trace fields.
- As written, A6 is a SECOND LEDGER wearing K24's name. The doc must name the event's physical home, the version bump, and the fate of the table.

(v) E3 "matrix off" arm → §7 E3.
- frameRouting=0 skips the whole block at toolCategories.ts:1609. `deriveCandidateCategories` never runs, so the hints (applyMetricHints :146-150 via :230), the metric floor (:176-179) and unmodeled-keep (:1643, basis 'frame' only) all go off TOGETHER.
- "keyword her yolda" is not a knob. On semantic success the current message is never keyword-matched (:1545-1557); only the prior message is, through sticky.
- The arm as named is NOT RUNNABLE with existing knobs. It needs two new governed knobs, e.g. one that splits the matrix REPLACE from hints and floor, and one that runs keywords on the semantic path. Those are code, and they must be an E2 card, not an E3 setting.

(vi) Exam contamination → L0 intent examples vs Step 1's exam row.

(vii) S151-K1 is unnamed (Step 2, item 2).

(viii) The experience → description channel (Step 3 (b)) is missing from P5.

(ix) The coverage floor "rank ≤ N" replaces A24's "usage-frequency top N + tool_search" base set and conflicts with "raw score never decides". It must be named as an A24 change for the owner's ruling, or reconciled.

(x) E5's deletion scope is unnamed against planner.ts (IrAction), backend_entity_layers.frame_object and stageClarify. A24 §13.1 makes planner.ts the organ K26 EXTENDS.

## 5 · STEP 5 — LITERATURE (fetched 2026-09-26 from arxiv.org/html; quotes as returned by the fetch tool)

S1 · ToolScope, arXiv 2510.20036:
- §4.1 Experiment Setup: "Following results in Sec. 4.4, we use a dense-only retriever (α=1) and rerank the top-50 candidates with a cross-encoder using min–max normalization."
- §3.3 ToolScopeRetriever: "we compute a hybrid retrieval score for each tool t∈T by combining sparse and dense similarity scores through a weighted average"
- §4.4: "Our α tuning experiment (Figure 7, Appendix C) shows that retrieval@k peaks at α=1, where dense-only retrieval performs best."
- §3.2 ToolScopeMerger: "Given our mapping ϕ, we update our original benchmark dataset β by relabeling our gold responses … ∀(q,l)∈β, t⟹ϕ(t) …" and "This final step ensures the new Toolset T′ is still compatible with the evaluation benchmark and leads to fair and accurate testing."
- READING: the main configuration is dense-only first stage PLUS a cross-encoder reranker. The hybrid mechanism exists and is tuned to α=1. Gold labels ARE remapped after merging. Astra's reading is RIGHT on both counts, and more precisely "dense + cross-encoder rerank", not "dense-only". The +8.38…38.6 gains are measured against relabelled gold, so they do not transfer to a catalogue whose labels were not merged.

S2 · Toollery, arXiv 2609.22218, Appendix B.2 "Cache-Aware Replay":
- "In the natural replay, Toollery reduces model-visible input by 97.5% and mean latency by 1.43 s, but the billed-input-cost difference is inconclusive: Toollery minus full library is $0.000070 per request."
- "With caching suppressed, Toollery reduces billed input cost by 97.5% and latency by 6.88 s."
- "Cost savings therefore depend on cache state and traffic reuse; visible-token reduction alone does not imply proportional monetary savings."
- The fetch tool additionally relayed a 0.989 cache hit rate "per Table 15" in paraphrase, not verbatim, so it is UNQUOTED.
- READING: token reduction does NOT translate proportionally into billing under provider caching. This bears directly on P9: the Anthropic full-catalogue cache path may cost the same as a filtered path. E1 must measure BILLED cost with the cache state recorded, which doc v2 §8 row 4 already demands ("GERÇEK maliyet (fatura; önbellek dahil)").
- CORRECTION OF MY OWN S159-1 LINE: Table 1 (SkillRouter) gives Toollery BM25 R@10 0.942 against "† … the SkillRouter reference using SR-Emb-0.6B × SR-Rank-0.6B" at 0.704. Table 2 (BFCL-V4 live) gives BM25 0.948 against RAGAnything 0.980. "BM25 beats embed+rerank" is therefore benchmark-specific and not a law, which supports the doc's "E3 decides" (within K15).

## 6 · STEP 6 — VERDICT: RED-ON-DESIGN. The complete delta for v3, none deferred

- D1 Inline A24 at FULL strength, in the capture's words, for the ten NARROWED rules (Step 1), the full nine card faces, the state machine and the 12.6 home rule. Drop "K21 demeti tabloları", or state that the bundle is a hash plus pointer over the existing kinds.
- D2 Inline every other rule the doc names (K1, K10, K13, K15, K16, K18, K20, K27, K30), or delete the reference. Define or delete "A24 L5", "G2c", "D12" and K-A/K-A′/K-G.
- D3 Add a §3-style table of rows where v2 DEPARTS from A24 on purpose, each for the owner's ruling: P2 obligations vs P4 "keyword only ladder floor"; the L1(f) rank floor vs "usage-frequency top N" and "raw score never decides"; P9 full catalogue vs K1; L0 "E3 decides" vs K15 mandatory BM25-TR.
- D4 P2: obligations are authored at TOOL or capability granularity with an explicit condition, never "a category row". The migration default becomes HINT with an E3 overflow measurement, and OBLIGATION only for rows the owner names in R6(b). LEARNED mappings (tool_cache) never migrate.
- D5 Declare the budget before any overflow statistic: router.maxTools plus a schema-token cap (K1), and router.maxFanout. Both are absent from code today, and their creation is an E2 item.
- D6 Replace the L2 ordering promise with governedKept: a MEASURED property of the offered set after every cap, written into the routing event.
- D7 P9 and L2: state that an offer-obligation is vacuous on the Anthropic path, and define the PLAN obligation that replaces it (planner coverage plus a trace check). State that L1 needs a frame that path does not extract today, and its cost. Put K1-on-Anthropic to the owner as R6(f).
- D8 L1(d) and E4, company layer:
  - name its discovery source (a listing tool, or an owner-curated descriptor through the governance path);
  - name its frame binding (IR-object extension, or layer-key binding);
  - state the declared-empty behaviour;
  - state that the stage-03-before-07 move is a SPLIT of the router call into frame extraction and category proposal;
  - reconcile with E5's enum deletion.
- D9 A6: name its home table or sink, bump cwf.trace.v1 → v2 with a field map, state that tool_experience becomes a VIEW or is retired, and put the post-turn K23 labels in a separate labelled record, not in the frozen trace.
- D10 E3: name the knob split as an E2 code card (matrix replace ≠ hints/floor/unmodeled-keep; keywords on the semantic path). Say that the live semantic arm is not replayable and is compared only through the E1 offline exam.
- D11 Exam: restore generator ≠ profiler, the three disjoint sets and the E2E N=10 nightly layer. Intent examples may never enter held-out.
- D12 Authorization: restore the tools/call re-check, "scope match grants no call authority", "invalidate index/cache/LEARNED on scope change" and "server text untrusted", and bind all of them to P8's mid-turn registration.
- D13 P5: list toolCensus.composeEnabled (the experience sentence in model-visible descriptions) as a brake item beside learnToolMapping.
- D14 Name OWNER-RULING-S151-K1-METRIC-HINTS-ALL-ACTIONS-1 in R6(a): the hint rule survives as the hint class, while its matrix carrier dies.
- D15 K26: restore the st12 drop/stamp clause and the sandbox SOTA-1 stage, and write "st07p = a new mode of turn/planner.ts" (A24 §13.1).
- D16 §6 correction: "resolveTurnFrame is called on every path; on the Anthropic path it returns absent(ROUTING_BYPASS)". C5 correction: tool_experience reaches model-visible descriptions behind a dark flag.
- D17 R8 closes with the Step 5 quotes. Qualify the Toollery claim in §10 (benchmark-specific).

UNMEASURED, carried by name: published tool_category rows and keywords · the 200-digest overflow estimate · live router.learnEnabled · live toolCensus.composeEnabled · the A24 v1_3 original (capture only) · my S159-1 body (register enumeration used) · the card's preflight (sandbox EPERM).

relay_inbox read by name (--read, no watermark) before 2026-09-26T18:07:58Z for ORDER-SCOUT-REVIEW-ROUTING-ARCHITECTURE-v2-S159-2-v1 ONLY, per the owner's order; no other box row read; card acted. This file is written to the doc repo UNCOMMITTED (the scout does not commit or push; committing is the Architect's).

END · SCOUT-STATUS-REVIEW-ROUTING-ARCHITECTURE-v2-S159-2
