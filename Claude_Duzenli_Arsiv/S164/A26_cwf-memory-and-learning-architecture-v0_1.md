# A26 · CWF Memory & Learning Architecture — v0_1 (DRAFT FOR ADVERSARY REVIEW)

FROM: Architect, S164, 2026-09-29 (draft cut 16:4x TSİ). STATUS: DRAFT. Not approved, not in force. Goes to scout-2 (adversary), then to external reviewers (the owner will hand it to ChatGPT/Astra and Grok), then to the owner for ruling.
RELATION: the memory face of A25 (A25_cwf-capability-fabric-architecture-v1, design in force). A26 does not rival A25; where A25 §6/§7c/§9 already decide something, A26 quotes it and builds on it. A26 covers what A25 leaves open: which memory feeds which decision point, how a true success signal is produced, forgetting, scope, and the MEMORY-1 acceptance.
OWNER DESIGN INPUT (S112-YASA-1, by name): OWNER-DESIGN-S163-MEMORY-FEEDBACK-1 ("should successful turns feed back into routing?") · OWNER-DESIGN-S163-MEMORY-A26-1 ("memory must get the same from-scratch design and analysis the understanding layer got"; "burası sıfır hata çalışması gereken … training dediğimiz şeyin özü").
EVIDENCE DISCIPLINE: every claim below carries one of MEASURED (read from code at a named commit or from the live DB at a named time), RELAYED (taken from a named artefact, not re-measured by the Architect), or HYPOTHESIS (a design choice that must be measured before it becomes policy). Code lines are at `ee12161ecad43b338489e85fcb73df1e08aa8ac0` unless marked `@6a3824c2b5efd1764be178d05ba647feec06927c` (current master). A reviewer who finds a claim without a tag has found a defect.

---

## 0 · ONE-SENTENCE THESIS

CWF already REMEMBERS (every turn writes an episode, three are recalled into the prompt) but does not LEARN, because the signal that says "this turn succeeded" is false in three measured ways and the only learned routing store writes without any success test; A26 makes the signal true first, then routes every learned change through the ONE proposal→gate→publish→rollback path A25 already defines, and it lets memory influence tool routing only through PUBLISHED data, never through per-turn recall.

---

## 1 · MEASURED STATE (the ground; do not redesign what is not here)

### 1.1 The ten stores (RELAYED from SCOUT-STATUS-MEMORY-MAP-S163-1, scout-2, base ee12161ecad43b338489e85fcb73df1e08aa8ac0, sha256 ae5da064a32634c8893e855be0aa93993d1d0dae52d2b89cc01b83ad8182cd56; DB figures MEASURED by the Architect 2026-09-29 06:50Z–07:05Z)

| # | store | written when | read where | reaches stage 07 (tool routing)? | gate |
|---|---|---|---|---|---|
| 1 | short-term history (client, 10 msgs) | every turn | stage 12 prompt (`stagesModel.ts:129`) | no | param |
| 2 | `episodes` | every turn, stage 14 flush (`runTurn.ts:301`) | stage 12 warm-trust, topK 3 (`memoryRetrieve.ts:406-408`); planner nudge; stage 03 clarify only when frameRouting on | **no** — stage 07 runs BEFORE stage 12 (`pipeline.ts:22` vs `:24`) | UNGATED write; offerable filter drops only `failed` (`EpisodesRepository.ts:378`) |
| 3 | `semantic_memory` (per-user entity dossier) | clean turns only (`memoryDistill.ts:298-322` procedureEligible) | stage 12 prompt (`memoryRetrieve.ts:414`) | no | predicate only |
| 4 | `tool_experience` (per-tool positive counter) | per SENT call not classified error (`stageTools.ts:1704-1705`, `toolExperienceFlush.ts:87`) | offline census re-probe suppressor (`toolCensusRefresh.ts:442`); tool note OFF | no | UNGATED, success-agnostic |
| 5 | `tool_category_cache` (learned keyword→category) | first call on keyword basis, NO outcome test (`toolCategories.ts:956`, `stageTools.ts:1822-1900`) | **stage 07 matchCategories** (`toolCategories.ts:1585/1578/1661/1698`) | **YES — the only learned input to routing** | `router.learnEnabled` brake; published 0 (MEASURED live 06:5xZ) |
| 6 | `tool_behavior_census` | connect + cron | derived pack → prompt (backends with no rules) | no | none |
| 7 | plan templates (governed rows) | never learned | planner (`memoryRetrieve.ts:562-565`) | no | `planner.enabled` |
| 8 | Graph KB: `entity_registry` / `entity_topology_edges` + GraphKbReader | admin/cron sync | registry: stage 03 + 07 arg policy/hints; **edges: parentsOf/containsAmong CALLER-ABSENT** (`GraphKbReader.ts:96,:127`) | partial | sync staleness |
| 9 | vector lane + `vector_index_digest` | cron indexer | stage 07/03 when on; floors 0 (`vector.toolRetrievalMode`=0 MEASURED live) | when on | governed switches |
| 10 | `router_proposals` | semantic path (`toolCategories.ts:1806`) | admin queue only (`api/admin/router-proposals.ts:76`) — **CALLER-ABSENT on the turn** | no | brake + clean-agent |

Production counts (MEASURED 06:5xZ): episodes written 83/83 turns in 7 d; 659/786 episodes ever retrieved; episode classes unproven 337 · clean 242 · failed 62 · unclassified 145; turn_feedback 10 rows ever (5 up, 5 down), 0 reviewed, no reader in any learning path.

### 1.2 The three ways the success signal is false (MEASURED)
- **F2 — the transport verdict is dropped.** `executeMCPTool` returns text only (`mcpClient.ts:272-369` @6a3824c2b5efd1764be178d05ba647feec06927c); `result.isError` is never read; `ClassifyInput.transportError` (`toolResultClass.ts:144-155`) has no production caller (`stageTools.ts:1719-1722` @6a3824c2b5efd1764be178d05ba647feec06927c passes `{resultText, args}`). A tool that says "I failed" is graded a success in the ledger, telemetry (`payload.ok`), and `tool_experience`. → **M1** (CARD-M1-MCP-ISERROR-PASSTHROUGH-S164-1, in scout review).
- **F1 — empty is graded positive.** `classifyToolResult` returns `answered` for `[]` (`toolResultClass.ts:169-192`); `recordToolSuccess` fires on it. Emptiness IS classified once (`observeResult`, `isEmpty`) but the ledger and experience never consume it. → **TOUR-HONESTY** (landing now: `toolEmpties` on the ledger/chip/model copy) then **M2**.
- **F3 — the turn class is soft.** `classifyTurnOutcome` records `toolFailures` but does not use it (`memoryDistill.ts:166-179`); `answerUnbacked = failures>0 && successes===0` (`toolOutcomes.ts:315-317`); a 3-failure + apology turn is `unproven`, passes the offerable filter, and is recalled into later prompts. → **M2**.

### 1.3 What this means in one line
Learning today would train on a label that is wrong in the exact cases that matter (errors and empties) — the "18 August class" A25 §6 names (`A25 L529`: empty result / 502 / timeout is NEVER learned, K12). A25 E5 (`L629`) assumes a true label; A26 is the precondition that produces it.

---

## 2 · INDUSTRY STATE (read 2026-09-29; numbers carry their population; none is a CWF number)

- **MemToolAgent** (arXiv 2606.07909, Jun 2026): memory entries are tuples (q, a, f, r) — query, tool-call sequence, binary success f, and a reflection r written ONLY when f=0; failures are distilled into critiques, not stored as raw traces; retrieval at tool-selection time is embedding top-n with n chosen from the similarity curve; reported WorkBench 57→85 %, NESTFUL FSM 15.6→30.4 %, PEToolBench tool accuracy 0.82. Lesson A26 adopts: the label f is the whole game, and the most valuable stored object from a failure is a CRITIQUE, not the failure. Lesson A26 does NOT adopt: retrieval-time memory injection into tool selection (see §4.3 — CWF routes learned knowledge through published data, for determinism and replay).
- **Memory products** (Mem0, Zep/Graphiti, Letta, LangMem; 2026 comparisons): LongMemEval numbers reported for some (Zep 71.2 %; specialised systems 86–95 %) are NOT cross-comparable and abstention scores are mostly unpublished. Lesson: MEMORY-1 must be run by CWF itself on the published harness with abstention reported separately (cwf-sota-definition v1_5 Tier C: abstention ≥ top quartile, overall ≥ median).
- **Consensus shape** across the survey literature (episodic / semantic / procedural memory; write filter; retrieval; forgetting; evaluation): A26 uses these four faces as VOCABULARY only; every mechanism below is one CWF already has (1.1), wired, or a proposal kind on the existing queue.

Sources: arXiv 2606.07909 (MemToolAgent); mem0.ai "State of AI Agent Memory 2026"; memnode.dev "Agent memory benchmarks 2026"; LongMemEval (Oct 2024); Mem2ActBench (Jan 2026).

---

## 3 · PRINCIPLES (each is a rule a reviewer can test a design against)

- **P1 · ONE LABEL, COMPUTED AFTER THE TURN, FROM THE TRACE.** The learning input is the `cwf.trace.v2` event (A25 K35, `L534 (1)`), and the K23 conjunction `{answered, grounded, cited, no_correction, no_pii, not_empty}` is computed in a separate `trace_label` record after the turn (`A25 L579`). `tool_experience` becomes a VIEW over labels or is retired (`A25 L580`). No counter is a label.
- **P2 · SIGNAL TRUTH BEFORE LEARNING.** Transport verdict (M1) → emptiness in the ledger (TOUR-HONESTY) → honest turn class (M2) → human label overrides (M3). Until M1–M3 are on master, NO learned row is published from production turns (`router.learnEnabled` stays 0).
- **P3 · MEMORY IMPROVES FINDING, NEVER DOING.** Examples, aliases, phrasing, base set, default plan, ranking priority, obligation CANDIDATES — yes. Schemas, slots, source attribution, tool merging — never (`A25 L533`, `L534 (2)`). LEARNED mappings never become obligations (`L534 (3)`).
- **P4 · PROPOSAL, GATE, PUBLISH, ROLLBACK — ONE PATH.** Every learned change is a `router_proposals` row (store 10 exists) of a named kind, passes the K34 gate (`decideGoldenPublish` generalised, `A25 L259`), is published as a bundle with `provenance=LEARNED`, and is rolled back in one click. No learned store writes a stage-07 input directly (this retires store 5's direct write).
- **P5 · SCOPE IS A KEY, NOT A FILTER.** User memory (episodes, dossier) is keyed by user and never crosses users; learned routing data is keyed by backend (+ tenant/site where the alias needs it, `A25 L527`) and never crosses backends. A backend mounted tomorrow starts with zero learned rows and learns only from its own turns (NO-HARDCODE, OWNER-RULING-S153).
- **P6 · ABSENCE IS NOT A NEGATIVE.** Empty result / 502 / timeout / UNREACHABLE is never learned (K12); "no memory found" is rendered as no memory, with provenance and age on every memory block the model sees — abstention is empty≠zero in memory form (SOTA MEMORY-1).
- **P7 · FORGETTING IS DESIGNED, NOT LEFT TO TTL.** Supersession, retraction, decay of learned weights, hard delete on request, tenant offboarding (§6).
- **P8 · INSTRUMENT BEFORE INFLUENCE.** "Offered → used → helped" is measured for every memory face (M4) BEFORE any memory face is allowed to move a routing decision. A face that cannot show "helped" does not get influence.
- **P9 · DETERMINISM OF THE ROUTING PATH.** What stage 07 offers is a function of (message, published data, catalog_version, policy_version) — replayable (K35 `catalog_version · policy_version`). Per-turn recalled memory is NOT an input to stage 07 in v1 (§4.3). This is the one place A26 disagrees with the MemToolAgent shape, and it is marked HYPOTHESIS for E5 shadow measurement.

---

## 4 · ARCHITECTURE

### 4.1 Four memory faces (vocabulary over existing stores)
| face | stores | what it is for | who reads it |
|---|---|---|---|
| Episodic | `episodes` (+ `trace_label`) | "what happened in this user's earlier turns" — examples, corrections, routines | stage 12 prompt (as today), planner nudge, LEARNING (proposal extractor) |
| Semantic | `semantic_memory`, `entity_registry`, `entity_topology_edges`, governed `entity_alias`/`glossary_term` | "what things are and how they contain each other" | stage 03 clarify (Graph KB — first caller for `containsAmong`), stage 07 arg policy/hints (as today), prompt dossier |
| Procedural | plan templates, `default plan` proposals, tool profile examples, base set, `routing_obligation` (owner-published only) | "how this kind of question is answered" | planner (st07p), stage 07 via PUBLISHED rows only |
| Experience | `trace_label` view (replaces the `tool_experience` counter), `tool_behavior_census` | "how tools actually behaved" — ranking priority proposals, re-probe scheduling, tool_profile | K23 filter, census, admin Memory tab |

### 4.2 The ONE learning path (A25 §6/§7c/E5, made concrete)
```
turn ──► cwf.trace.v2 event (K35; append-only; tools[] with reason, obligation_honoured, offer_mode, catalog/policy versions)
      └► after-turn LABEL: trace_label{trace_id, k23{answered,grounded,cited,no_correction,no_pii,not_empty}, user_correction, re_ask, human_label?, labelled_at}
             answered   ← classification (M1: transport verdict; F1: not_empty from observeResult.isEmpty)
             grounded   ← existing grounding gate
             cited      ← st12 attribution
             no_correction / re_ask ← next-turn detector (carry-last-resolution seam already exists)
             human_label ← turn_feedback (M3) OVERRIDES every automatic field
      └► K23 FILTER (all six true, PII scrub) ──► PROPOSAL EXTRACTOR (writes router_proposals rows of kind:
             example | negative_example | alias | base_set | default_plan | ranking_policy | obligation_candidate | critique)
      └► K34 GATE per kind: schema · referential · routing exam (K25 band) · reach/access exam · canary
      └► PUBLISH as a bundle (K21), provenance=LEARNED, version++ ──► stage 07 / 03 / planner read PUBLISHED rows only
      └► ROLLBACK: one click reverts the bundle; the trace stays; the label stays; the proposal is marked rejected (a negative example for the extractor).
```
Rules on the path: an `empty`/`failed`/`unproven` label never reaches the extractor (K12); a `critique` (from a failed turn, MemToolAgent's r) is stored on the episode for the PROMPT face only, never as a routing row; `tool_category_cache`'s direct write is retired into `example`/`alias` proposals (A25 `L534 (4)` brakes until E5).

### 4.3 Which memory feeds which decision point (the owner's question, answered per point)
| decision point | today | A26 v1 | later (HYPOTHESIS, shadow-measured in E5) |
|---|---|---|---|
| stage 03 clarify | entity_registry; episodes only if frameRouting on | + Graph KB `containsAmong` as scope resolver (first caller; F-S117 child-layer fix direction) + last-resolution carry (exists) | user-scoped preferred-entity from dossier |
| stage 07 routing (offered set) | published rules + tool_category_cache (braked) | PUBLISHED learned rows only: examples/alias/base_set/ranking_policy via K34; NO per-turn recall | per-turn recalled (q,a) examples as a ranking INPUT, behind `router.memoryRankEnabled`, shadow first (§9 P9) |
| planner (st07p) | governed plan templates | + `default_plan` proposals from clean episodes' `decision.procedure` | — |
| prompt (stage 12) | episodes topK 3 + dossier + routine | same, but offerable = `clean` or (`grounded ∧ toolFailures=0`) (M2); every block carries provenance + age; failed-turn CRITIQUE block ("last time this asked X, tool Y failed because Z — do not repeat") | — |
| answer honesty (st12) | chips: failures; (toolEmpties after TOUR-HONESTY) | + "memory used: n rows, oldest d days" chip when a memory block influenced the answer (M4 instrument) | — |

**Should memory retrieval move before stage 07?** A26 says NO for v1, and says why so a reviewer can attack it: (a) P9 determinism/replay — stage 07 must be a function of published data; (b) K34 — a per-turn recall bypasses the gate; (c) tenant safety — user episodes would steer a shared backend's routing; (d) the same benefit is obtained by COMPILING recall into published rows through the proposal path, with a one-click rollback that per-turn recall cannot offer. The cost: learning reaches routing with a publish delay (hours), not instantly. The E5 shadow measurement decides whether instant recall buys Recall@k that compilation does not.

### 4.4 Data model (minimal; every item is a migration card for the Gemini operator + UI in the same card, §13.3/13.4)
- `trace_label` (new; A25 §7c already names it): trace_id PK, k23 jsonb (six booleans), user_correction bool, re_ask bool, human_label enum(up|down|null), human_note, labelled_by, labelled_at. Append-only; recompute = new row.
- `router_proposals.kind` extended to the eight kinds in 4.2 (today: the semantic-path shape only); `provenance`, `evidence_trace_ids[]`, `exam_result jsonb`, `published_bundle_id`, `rejected_reason`.
- `episodes.outcome` recomputed from `trace_label` (M2); `episodes.critique text` (MemToolAgent r; only when outcome=failed).
- `tool_experience` → VIEW over `trace_label` joined to trace tools[] (P1); the table is frozen then dropped after one release (RULE-49: measure readers first — census re-probe reads it).
- Admin UI (existing "Memory" tab + "Learning Snapshots"): (1) proposal queue with kind filter, evidence traces, exam result, publish/reject; (2) labels view: per turn the six K23 bits + human label, editable → writes `trace_label` with labelled_by; (3) instrument panel: learned · offered · used · helped per face, per backend, per day; (4) rollback list of LEARNED bundles.

---

## 5 · THE SUCCESS SIGNAL, SPELLED OUT (what "answered" means, per layer)
| layer | true when | source of truth | card |
|---|---|---|---|
| tool call | transport says no error AND classification `answered` AND `isEmpty=false` | `classifyToolResult` with `transportError` (M1); `observeResult.isEmpty` (TOUR-HONESTY) | M1, TOUR-HONESTY |
| turn | ≥1 answered non-empty call whose bytes back the answer (grounded) AND no tool failure that the answer apologises for AND no user correction on the next turn | ledger + grounding + carry-last-resolution detector | M2 |
| human | thumbs up/down or admin label; ALWAYS overrides the automatic class; a down-label makes the episode `failed` and non-offerable and emits a `negative_example` proposal | `turn_feedback` → `trace_label.human_label` | M3 |
| learning | K23 all-true AND not in the held-out exam set (contamination guard, `A25 L526`) | `trace_label` + exam-set membership | A26-P2 |

Non-signals, named so nobody uses them: "the user asked again" alone (`A25 L534 (1)`); grounding passed alone; `tool_experience` count; retrieval_count of an episode (popularity ≠ correctness).

---

## 6 · FORGETTING AND DECAY (P7)
- **Supersession**: a newer `clean` episode with the same (user, frame, entity set) supersedes the older for the prompt face; the older stays for the label history.
- **Retraction**: a human down-label or a next-turn correction retracts the episode from the offerable set immediately and emits a `negative_example` proposal; a LEARNED row whose evidence traces are all retracted is auto-proposed for rollback.
- **Decay**: `ranking_policy` weights decay with age unless re-evidenced (half-life a governed param, default 30 d, HYPOTHESIS); `episodes` keep the existing TTL param (`agentParams.ts:654`) for the prompt face only.
- **Deletion**: user-scoped memory is hard-deleted on the user's request and on user removal; backend-scoped LEARNED rows are deleted on backend unmount; tenant offboarding deletes both. Deletion is a migration card (operator) with a count printed before and after.
- **Poisoning**: a proposal needs ≥ N distinct traces from ≥ M distinct conversations (governed; defaults 3/2, HYPOTHESIS) — one user cannot teach the router alone; PII scrub is in K23.

---

## 7 · ACCEPTANCE — MEMORY-1 (cwf-sota-definition v1_5, Tier C) and internal instruments
- **LongMemEval** (five abilities incl. abstention): CWF runs the published harness against the prompt face with a fixture backend; abstention ≥ top quartile, overall ≥ median (thresholds RATIFIED; expiry 2027-02-03). Abstention is measured as: when no episode/dossier row applies, the answer contains no memory claim — the `memory used` chip is absent and the `trace_label` shows no memory block.
- **Mem2ActBench** (memory → tool action): the procedural face — a default_plan or example learned in session k must change the offered set / plan in session k+1 on the fixture backend; ≥ median.
- **Internal, ship-gating (M4)**: per face per day — learned (published rows), offered (rows placed in a prompt/route), used (answer or route cites them), helped (turn labelled clean with the row offered vs without: paired comparison in shadow). A face with helped-rate below its no-memory baseline is switched off by the gate, automatically, with a named record.
- **K12 zero**: number of LEARNED rows whose evidence includes an empty/failed/unproven trace = 0, asserted by a CI test over the extractor.
- **Contamination**: no held-out exam question's trace is in any published proposal's evidence (CI).

---

## 8 · MIGRATION (each step one card, one scout review, one landing; nothing on the live routing path changes before its E-stage exit, S102-YASA-3)
| step | content | depends on | evidence of exit |
|---|---|---|---|
| Track 1 M1 | MCP isError → classifyToolResult | — | F1–F5 of the card; ledger/telemetry/experience flip on fixture |
| TOUR-HONESTY | toolEmpties in ledger/chip/model copy; search addendum scope | — | landing now |
| Track 1 M2 | honest turn class; experience +1 only on non-empty yield on a non-failed turn; offerable = clean/grounded | M1, TOUR-HONESTY | the S161 tour turn re-graded `failed` on replay; not offered |
| Track 1 M3 | feedback → trace_label.human_label overrides; admin review queue UI | M2 | 10 existing rows labelled; a down-label retracts an episode |
| Track 1 M4 | memory instrument (offered/used/helped) + Memory tab panel + exam slice (LongMemEval shape) | M2 | first weekly numbers; abstention slice runs |
| A26-P1 | `trace_label` + K23 computation after turn (K35 event exists? — MEASURE: cwf.trace.v2 builder status at master) | M1–M3 | labels for 100 % of turns; K12 zero test |
| A26-P2 | proposal extractor → router_proposals kinds; K34 generalised (`decideGoldenPublish` for the learned kinds) | P1 | first LEARNED example published through the gate and rolled back (A25 P5 exit) |
| A26-P3 | Graph KB containsAmong → stage 03; default_plan proposals → planner; tool_category_cache write retired into proposals | P2 | clarify child-layer false-empty case fixed on fixture; brake stays 0 until E5 |
| A26-P4 (E5) | shadow: per-turn recall as a ranking input (§4.3 HYPOTHESIS); decay; poisoning thresholds tuned by measurement | P3, A25 E3 | Recall@k delta with CI; decision by number |

---

## 9 · OPEN QUESTIONS FOR REVIEWERS (attack these first)
1. §4.3: is "no per-turn recall into stage 07 in v1" right, or does compilation lose too much (latency-to-learn, long-tail phrasing)? What measurement would settle it before E5?
2. §5 turn label: is "no user correction on the NEXT turn" a safe negative-correction signal, or does it leak the next turn's content into this turn's label (temporal contamination)?
3. §6 poisoning thresholds (3 traces / 2 conversations): too low for a 5-user factory, too high for a 1-user pilot? Should it be a fraction of active users?
4. §7 abstention: is "memory chip absent" a faithful abstention measure, or do we need the LongMemEval harness verbatim (it is a QA benchmark, CWF is a tool agent)?
5. §4.4 `tool_experience` → VIEW: the census re-probe suppressor reads the counter; does a label-derived view change re-probe behaviour in a way that hides faults (the P3 failure mode scout-2 named)?
6. Is `critique` on failed episodes a prompt-face benefit or a hallucination vector (the model may over-generalise "tool Y fails")? MemToolAgent reports a benefit; CWF's honesty metric must measure it.

## 10 · REJECTED ALTERNATIVES (so they are not re-proposed)
- A vendor memory layer (Mem0/Zep/Letta) as the store: CWF's memory must be governed, replayable and tenant-keyed through the SAME K34 gate as every other governed row; an external store would be a second, ungated path (§12.6 class).
- Fine-tuning a router from labels: not a v1 path; A25 K34 publishes DATA, and the model stays swappable (AGNOSTIC-1).
- Learning from `retrieval_count` or usage popularity: popularity is not correctness (§5 non-signals).
- A separate "memory service": the stores exist; the missing thing is the label and the gate, not a service.

## 11 · CLAIMS REGISTER (for the external reviewers; each line falsifiable)
C1 MEASURED · stage 07 precedes stage 12 (`pipeline.ts:22`,`:24`) — memory never reaches routing today.
C2 MEASURED · `tool_category_cache` is the only learned store read by stage 07 (`toolCategories.ts:1585…`); it writes with no outcome test; brake published 0.
C3 MEASURED · `result.isError` unread in `mcpClient.ts` @6a3824c2b5efd1764be178d05ba647feec06927c; `transportError` never passed at `stageTools.ts:1719`.
C4 MEASURED · `[]` classified `answered` (`toolResultClass.ts:169-192`); `recordToolSuccess` on it.
C5 MEASURED · 3-failure apology turn → `unproven` → offerable (`memoryDistill.ts:166-179`, `EpisodesRepository.ts:378`).
C6 MEASURED · `router_proposals` has an admin reader only; `GraphKbReader.parentsOf/containsAmong` has no caller.
C7 MEASURED · turn_feedback 10 rows ever, 0 reviewed, no reader in learning.
C8 RELAYED · A25 §6 rows L526–L534 and §7c L573–L580 as quoted.
C9 RELAYED · MemToolAgent numbers as reported in arXiv 2606.07909.
C10 HYPOTHESIS · compiling recall into published rows loses nothing measurable vs per-turn recall for Recall@k (E5 decides).
C11 HYPOTHESIS · poisoning thresholds 3/2 and ranking half-life 30 d.
C12 UNMEASURED · whether the cwf.trace.v2 builder (K35) exists on master today (A26-P1 measures first).

END · A26_cwf-memory-and-learning-architecture-v0_1
