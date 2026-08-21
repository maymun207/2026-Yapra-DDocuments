# CWF — Session Graph KB · v41 (Sessions 41–42)

<!-- CWF-SESSION-GRAPH-KB-v41 · rev 41 · 2026-07-14 · Supersedes v40.
     One continuous chat spanning 2026-07-13 evening → 07-14. Six workstreams. This file is the
     detail store; the register (v44) is the queue; the bootstrap (v41) is the opener. -->

## 0 · FLOOR MOVEMENT
`d3e0c4e` (2173/212 · rev 72) → **`dd04831`** PARAM-GOV-1 (2183/213 · rev 73) → **`c5f58a4`**
VIZ-BIND-1 (**2212/216 · rev 74**, drift OK) ← close. PR #33 (dead branch) had 2214/217 · rev 75 —
those numbers died with it.

## 1 · SEC-1 (closed) + the fence, validated in anger
Key rotated + redeploy READY (Architect verified deployment on `d3e0c4e` alias). `query_db.ts`
already gone. Fence made permanent — owner pasted the extended block (adds "sır/anahtar değerlerini
asla ekrana yazma") into Gemini's persistent instructions. **Validation:** mid-session, Gemini's
Supabase MCP was found pointed at the WRONG project (`paxanddkxpulxcyrvzlh` instead of
`fjbrkimwvtpwoxhziidh`); under the fence Gemini STOPPED AND REPORTED instead of improvising a
service-role client — exactly the failure mode SEC-1 existed to kill. Owner re-pointed the MCP.

## 2 · PARAM-GOV-1 / F39 (closed)
Branch `d89080f`; RULE-25: 18 files +289/−49, frozen surfaces zero-diff, clamp `[2,24]` on the
shared `resolveParamValue` path (env 999 clamps too), stage `'11'`, `sessionTweakable:false` and
structurally so (no `LabParamOverrides` field), `gateway.ts` `stepCountIs(params.maxToolRounds ??
MAX_TOOL_ROUNDS)` (const is floor, not policy), `params_hash` capture-driven ⇒ new row moves the
fingerprint by construction. Merged `dd04831` (tree ≡ `d89080f`).
**Seed incident (two Architect errors, owned):** first seed command lacked `--env-file` (repo has
no dotenv; scripts read env only from the process) AND was issued before the merge landed. Correct
invocation: `node --import tsx --env-file=.env.local scripts/seedAgentParams.ts`.
**Seed output "2 inserted, 5 already published" ⇒ F81:** `rollout.guardrailMinTurnsPerArm` had
NEVER been in the DB — the code floor silently served it since L5 closed, and nothing noticed
because floor ≡ reference (50). Self-healed by the seed; the DISEASE (declared-but-unpublished
params invisible) goes to the F81 guard (register #6).
Owner published `agent.maxToolRounds` v2 = **16** (gate SCHEMA→REFERENTIAL→BEHAVIORAL green);
A3 re-ask ran **12 tool calls** and completed (was dying at ceiling 8 / 43k / `finishReason=error`).
**Seal:** Operator ledger read — newest `turn_done` row `max_tool_rounds=16`,
`sources.maxToolRounds="db"`; prior rows `null`. Panel click-path recorded: agent params live under
the **System backend slice** of Rules (family lens Params) — nowhere documented before (Wave-2 F17).

## 3 · F82 and the Sonnet counterfactual (F84/F85/F86)
**F82 (CRITICAL, closed on the render side):** the A3 answer's prose was right (41/3/23 stops) but
ALL THREE line tables showed the SAME 23 rows. Cause: `selectToolResult` resolves a viz directive by
TOOL NAME and takes the LAST record-derivable match; `getLineStopsReport` ran 4×. Third member of
the defect family (S39 duplicate-tool LWW; S40 knowledge-vs-routing silent disagreement). New law
minted: **wrong ≠ missing** (a confident mislabel is worse than an honest gap).
**Owner's counterfactual — same question, Claude Sonnet:** 5 calls (picked the BATCH tool
`getLineStopsReportForZones` once ⇒ no name collision ⇒ no F82) AND produced an 8-row corrective-
action plan where Gemini refused. ⇒ **F84**: `safety.b1_scope` is a model disposition, not a system
guarantee — "an answer's authority level is a function of which provider you picked."
**F85**: F82's blast radius was provider-dependent (non-deterministic truth). **F86**: Sonnet
computed T1 arithmetic in-model — header "38 duruş" over a 40-row grid, a reason split into two
rows; unauditable (AssetOpsBench's warning live in prod).

## 4 · VIZ-BIND-1 (merged `c5f58a4`)
Design: `ToolBinding = one | none | ambiguous`; resolution callId → args-`match` → single-call →
**N>1 without discriminator = ambiguous, NEVER pick** (the phase in one line). Provenance captions
on every from-tool table/chart; `rawToolResults` carries per-call scrubbed `args` + stable `callId`
(F64); epoch-ms label formatter (F63); **`[Params]` log line** (value+source for every governed
param — closes the Architect-blindness PARAM-GOV-1 left; CONFIRMED live:
`[Params] temperature=0.7(db) historyWindowN=6(db) maxToolRounds=16(db)`).
AG flagged pre-existing TS2339 (`ChatQuotaCtx`, `GoldenPublishDecision`) from Vercel's isolated
per-file diagnostic pass — Architect verified ABSENT from the diff (claim held; cleanup → register
#6). Accepted behaviour change: untargeted directive over a multi-result turn now renders the
ambiguity panel instead of "most recent" (a guess too). Prod verified: panels rendered trilingual
honesty lines; **F87** raised (panels print raw zone UUIDs).
**§6 trap (still armed):** the `viz` prompt segment is governed — the code-reference directive
(`match`/`callId`) is INERT until the owner republishes, and the republish is BLOCKED by F89.

## 5 · The publish-failure cascade: F88 · F89 · F90 · F91
Owner reset `viz` to code floor → draft v0 ready → clicked publish ~10× → "failed" with no reason.
- **F88:** the rejection left NO trace anywhere — endpoint returns the verdict in a 200 body and
  logs nothing; `rule_audit` shows create/ready/4×update and ZERO publish rows (reject precedes the
  audit write); the client `publish()` returns `null` on failure and `onPublish` shows NO toast for
  `null`. Vercel logs told the truth: `POST /api/admin/rules/<id> 422` ×7+. Diagnostic recipe that
  worked: read Vercel logs for `POST … 4xx` — the server always answered.
- **F89 (the wall):** Operator read of `replay_audit`: `verdict:"underpowered"`,
  `completed:false`; specimen 1 ok (baseline arm alone 431–533k tokens), specimens 2–20 "token
  budget exhausted before this specimen". `REPLAY_TOKEN_BUDGET=500_000` — docblock: sized for ~10
  reps of ONE tool-heavy turn; the golden batch is 20×2×3=**120 turns** sharing it. The wall went up
  the day the golden set filled (S39: 5→20); `viz v1` (Jul-10) predates it (loud-skip on empty set).
  Contract behaves CORRECTLY (undersampled certifies nothing). Net: **all prompt.segment publishes
  blocked**, F83.1 included.
- **F90:** stale `GateVerdict` — a previous rule's "Published — gate passed" stayed rendered over a
  rule whose timeline said "No published versions yet". Code: `RulesTab.tsx:304` clears on New
  draft; `:316`/`:341` (selection changes) don't.
- **Workaround attempt & F91:** tried a golden-free kind (`armes.tool_format_rule` on the batch
  tool). First 422: referential requires `tool ∈ tool_graph_node` names and `TOOL_GRAPH` has **4**
  nodes (`getFactoryLines`, `getDailyOeeValues`, `getScrapBarcodeList`, `getDailyManualScrap`) — a
  dependency map (zoneUuid), not a catalog, but it IS the gate's reference ⇒ governance surface ≈3%
  of the 141-tool product. Published a graph node + format rule for `getLineStopsReportForZones`
  (both live) → **A3 unchanged**, because the tool is in **no category** ⇒ never offered
  (`[ToolRoute] path=keyword offered=58/145` that turn). Chain closed:
  F82 → same-tool-×N → batch tool unoffered → no category → **static `CATEGORIES`** (root).
  F74 re-confirmed live (learned map full of stopwords, re-learned every round — log spam).
  Architect lesson re-learned at cost: **check reachability before authoring any tool rule**
  (S40 §4.1). Both published rules become live the moment ROUTE-GOV-1 makes the tool reachable.

## 6 · F83 architecture (note v1 → v1_2) + the Kale RAG plan
**The Answer-Authority Ladder:** T0 FACT (tool+grounding) · T1 ANALYSIS (**computed**, never
narrated) · T2 DIAGNOSIS (labelled hypothesis citing its T0/T1) · T3 PRESCRIPTION (**only** from a
governed procedural KB, citation mandatory; otherwise abstain with the honest reason) · T4 LEARNING
(human publish through the eval-gate). Laws: a tier never renders as the tier above; T3 abstains
rather than invents; T4 is never self-authoritative.
**SOTA (2026, sourced in the note):** AssetOpsBench/KDD-2026 (65%→82–83%→99%; "inverted LLM usage"
— external vindication of ADR-001); SOP-Bench/SOP-Agent/SOPRAG (prescription is a RETRIEVAL
problem); memory-poisoning literature (>90% vulnerable; 100% relapse on conversational correction;
Databricks confidence-amplified wrong memories); **co-memorize diff-and-approve — which CWF already
built**: draft→eval-gate→publish IS the pattern ⇒ **MEMORY-1 = "let the agent open a DRAFT."**
Web = an `unverified` backend row (ADR-001), never T3.
**v1_2 amendment (post-Sonnet):** F83.1 is not "loosen the scope" but **"make the boundary real"**
— a structural uncited-advice banner derived from the RETRIEVAL FACT (zero `procedure` rules
retrieved this turn ⇒ banner), an `if`, model-independent, no prose parsing.
**Kale plan (owner):** Kale will document machine parameters; their tool builds a **RAG**; connect
via Gemini/LangGraph to CWF. Architect guidance delivered: ① chunk identity (doc_id+revision+
section+effective-date) — no identity ⇒ no citation ⇒ no T3; ② **procedures tagged with ARMES
zone/line/equipment IDs (same identity space — the deterministic join; free today, impossible in
six months)**; ③ `active|superseded` + revision chain (a stale SOP rendered current = the
procedure-world's empty≠zero); ④ Turkish agglutination breaks naive keyword search ⇒ hybrid
BM25+TR-aware embeddings, same pgvector substrate as SEMANTIC-ROUTING-1. Integration: the RAG
enters as an **MCP backend** (backends row, trust tier, provenance, eval-gate) — never a
side-channel; LangGraph must not become a second orchestration plane outside the 14-stage pipeline.

## 7 · ROUTE-GOV-1: v1 → owner correction → v2 → v2_2 (in flight)
**v1 (superseded):** code catalog snapshot + `ARMES_WRITE_TOOLS` code list + owner-run gen script.
**Owner rejected the architecture — correctly.** Two constitution violations named: (a) catalog as
code-SSOT vs "backend identity is DATA" (every other gate reference is already a DB row); (b) owner
as data transport vs automation-first (the DEPLOYED SERVER holds the MCP credentials and can fetch
its own catalog).
**v2 (Architect, accepting the correction with ONE refinement):** "editable table" splits into an
**immutable MIRROR** (`backend_tools`: system-written observation; upsert on sync; disappeared
tools flip to `status='missing'`, never deleted — empty≠zero for catalogs) and a **governed
OVERLAY** (`armes.tool_annotation`: exposure `read|write` + note; draft→gate→publish). Reason:
auto-ingested external text must never become governed authority silently (the same
diff-and-approve boundary the memory-poisoning literature demands). **F80 hardened to fail-closed:**
an UNCLASSIFIED tool cannot enter any category; `write` only with audited `allowWrite:true`.
Design pillars: sync triggers = on-connect + manual panel button (no cron); gate stages stay PURE
(publish endpoint injects `catalog {names, exposure}`; verdict records `catalogCount+catalogHash`);
RULE 31 relocated INTO the gate, both directions; categories runtime DB-first with code floor;
replay pins the category slice at the specimen's versions (pre-category specimens → floor = what
they ran against, correct by construction); mirror NEVER on the turn hot path (grep-test);
`[ToolRoute] catSource=db|floor catCount writeOffered`; **§D:** `stage-drafts` endpoint + panel
button computes `uncovered = mirror.active − (⋃categories ∪ ALWAYS_INCLUDE)` and stages annotation
drafts for all + category drafts for READ tools — the 29 become review-by-diff, obsoleting
EXPLORER-1-FIX-1's copy-list purpose.
**AG executed v1's sub-phase A before v2 reached it (PR #33):** helper extraction
(`mcpCatalogFetch.ts`), gen script, `learnToolMapping` idempotence, npm seed aliases —
**plus the session's key architecture finding: STAGE ORDER IS REVERSED from the design assumption —
tool-selection (stage 7 `register-tools`) runs BEFORE knowledge-warm (stage 8 `assemble-prompt` /
`dbKnowledgeProvider.warm()`).** AG obeyed the STOP-and-report instruction (credit where due).
**CLEAN-RESET executed & independently verified:** PR #33 closed unmerged, branch deleted, master
still `c5f58a4`, AG memory rewritten (won't resurrect v1 or re-ask for a snapshot).
**v2_2 minted (S37-1):** stage order as KNOWN fact + committed design — dedicated
`resolveToolCategories()` pre-stage-7, shaped like `resolveAgentParams`/`resolvePromptSegments`,
ONE bounded read, knowledge_hash test as the coverage arbiter; the three small items re-implemented
FRESH (cherry-picks forbidden); branch **`route-gov-2`**. **Status at close: with AG, PR pending.**

## 8 · GOLDEN-BATCH-1 (F89) — designed, approved, queued
RUN decoupled from PUBLISH. Tables `golden_runs` (pins candidate payload+hash, golden-set hash,
specimen ids, reps, resolved ceiling, spend, status/verdict/outcome; S33-1 attribution) +
`golden_run_chunks` (one row per specimen×arm×rep; atomic claim; stale-running reclaim). Runner
`api/admin/golden-runner.ts`: CRON_SECRET (rollout-guardrail pattern) OR admin session ("şimdi
işle"); ≤2 chunks/tick; 45s wall guard; per-minute cron in `vercel.json` (silent idle = ADR-007-
correct). Finalize reproduces the sync pooling/Wilson/verdict **byte-identically** (import, not
copy) and writes a `replay_audit` row in today's exact shape ⇒ the L2 contract needs no new fetch
path (additive reads only). Panel: two-step publish (consent dialog states the REAL price →
progress strip → "Yayınla" consumes the runId); retire the inline sync batch from the publish path.
Constants: per-chunk cap `GOLDEN_CHUNK_TOKEN_CAP=500_000` (engine floor); per-RUN ceiling =
**governed** `quota.goldenRunTokenCeiling` (seed 12M, clamp [1M,30M], resolved at run start,
stamped, ceiling-hit ⇒ `failed`+reason, never silent). Owner decisions all YES; ceiling
configurability confirmed (Rules → System → Params, same flow as maxToolRounds; mid-run changes
affect the NEXT run). **Sequencing: starts only after ROUTE-GOV-1 merges.** Unblocks viz-v2
republish and F83.1.

## 9 · LESSONS / RULE CANDIDATES (S41-x)
- **S41-1 (born loud):** every gate/endpoint rejection must leave a trace in ALL THREE channels —
  log line, audit row, UI message. A verdict returned in a 200 body and swallowed by a `null` path
  is F88; new code must prove the loud path in tests.
- **S41-2 (reachability before rules):** never author a tool-referencing rule without first
  checking the tool is OFFERED (categories ∪ ALWAYS_INCLUDE) — a rule on an unoffered tool is dead
  on arrival (cost: two dead publishes this session).
- **Architecture fact (do not re-derive):** stage 7 tool-selection precedes stage 8 knowledge-warm.
- **wrong ≠ missing** (F82's law, now enforced in the renderer).
- **Mirror vs overlay:** observations of external systems are immutable system-written data;
  authority about them is a governed, gated overlay.
- Fence header validated under fire (wrong-project incident).
- Diagnostic recipe: silent panel failure ⇒ read Vercel logs for `POST … 4xx` first.

<!-- END · CWF-SESSION-GRAPH-KB-v41 · rev 41 · 2026-07-14 -->
