# CWF Stages Re-walk — Review Findings · v5

<!-- cwf-stages-v1-review-findings-v5 · rev 5 · 2026-07-18 · Supersedes v4.
     S51 owner re-walk of the Stages dashboard, stages 00-14, on content-fixed
     (WAVE2-CONTENT-1 landed) / structure-unfixed (IA-2 NOT landed) ground.
     Anchor at walk: master a21d046 (post FENCE-DB-1), docVersion rev 109. -->

## 0 · Headline

The **engine is solid** (trust, grounding, governance, empty≠zero, routing — all
deep and correct). The **face is weak**: the same 2-3 systemic UI defects repeat
on nearly every stage, and 3-4 stages are "future placeholders" without a
consistent frame. The single biggest gain of the walk is the owner's
**SET-CONTEXT** idea (a pillar). Stage content (WAVE2-CONTENT-1) reads well;
structure/IA (IA-2) is the pending work this walk feeds.

## 1 · SYSTEMIC (highest leverage — fix once, applies to all stages)

- **F-S00-a · governance deep-link lands context-free — #1 PRIORITY.** Every
  `agent.param`/governed source's "Rules →" (and panel →) deep-link lands on the
  UNFILTERED full table with no arrival strip. Confirmed at 00, 05, and every
  `agent.param` stage. Owner's repeated pain ("stupid rules… kayboluyorum").
  Fix: (1) filter the deep-link to the exact rows (`kind` + `key`), (2) an
  arrival context strip reusing the F42 "you came here from stage X" pattern the
  owner loved. **The Rules sub-walk is this finding's container.**
- **F-S01-b · Langfuse chips land on the org list → owner's LAST-TURN-TRACE fix
  (supersedes my earlier tier-1).** v3.205 OSS has no per-SPAN deep-link, but it
  HAS per-TRACE URLs (`/project/<projectId>/traces/<traceId>`). We have the
  trace_id (TRACE-LINK-1 → messages.trace_id). Fix: deep-link each chip to the
  last real turn's trace (span-anchored if v3.205 supports it), null-trace →
  host fallback. Real fix tier-2 = LANGFUSE-V4-UPGRADE (parked). This also kills
  F-S01-c (both greens identical — each anchors its own span).
- **F-S01-a · "Read the doc" opens a NEW browser tab every click.** `target="_blank"`
  → use a named target (`cwf-docs`) so all doc links reuse ONE tab. Hotfix-class.

## 2 · PILLARS (owner-originated, program-level)

- **SET-CONTEXT per-stage inspector (F-S09-DESIGN) — the walk's biggest win.**
  Select a turn (Inspect-style list, Sessions→Turns→Events) → top-of-dashboard
  "Set Context" → the turn's snapshot maps onto EVERY stage card; walking 00→14
  shows that turn's real output at each stage (the chain made visible: one
  stage's output = the next's input). **Owner-ratified architecture: FAITHFUL
  reconstruction is the default (deterministic stages rebuilt from the record,
  recorded answer/results shown — ~zero tokens, byte-identical to what really
  happened); LAB RE-RUN is opt-in (real re-execute/perturb, replay-quota
  reserve/settle + consent).** Pipeline-wide, not one stage. Per-stage richness
  graded: rich (09 prompt / 07 tool-set / 11 tool-results / 10 answer / 12
  grounding) · medium (06 knowledge slice / 08 handle / 03 routing) · thin
  (00-02 → honestly says "no turn-specific output; applied config is…", never a
  fabricated example — empty≠zero on the cards too). Guards: C9 (segments free,
  knowledge/tool slices redacted) · ephemeral snapshot (C1 LAW — no new PII
  store) · version-pinning caveat (promptRev). Reuses replay engine, quota,
  redaction, Inspect list, F42 strip. **Central pillar of the IA-2/observability
  wave** — the fully-grown form of the owner's last-turn-trace idea.
- **F-DOCS-ENRICH — standalone, content-only, the VERY LAST item before project
  close.** User Docs today give one-paragraph blurbs where the deep "why"
  belongs (proven at 12 Data Authority + 13 render — both "içler acısı"). Rewrite
  ALL User Docs end-to-end, long-form + worked examples, in the voice of THIS
  walk's explanations. No code/mechanism change. Ordered LAST so docs describe
  the final system (post IA-2 renames, SET-CONTEXT, Rules-split). Raw material =
  this walk's explanations (doc-seeds in §6).
- **MEMORY-1 (episodic memory) — named program, confirmed by the SOTA sweep
  (F48).** CWF's only learning is `tool_category_cache`; episodic memory is
  MISSING. It spans stages 05 (retrieve half) + 14 (update half) — one system,
  two pipeline halves. Postgres-first, governed. Unblocks F83 ("write findings
  back and learn").

## 3 · PER-STAGE FINDINGS

- **03 Intent** — F-S03-a: the cheap LLM (semantic router, gemini-2.5-flash-lite,
  SR1) is absent from the card + doc (card describes only the keyword/learned
  layer; stale re: SR1). F-S03-b: **router MODEL is not governed** —
  `routerModelId()` is registry-sourced; router.enabled/timeoutMs/maxCategories/
  contextTurns are governed but the model choice is not. Candidate `router.model`
  param or a Providers-tab affordance (FEATURE, owner's standing note). F-S03-c:
  no stage-03 span (routing obs lives on stage-07 register-tools span) — the
  SET-CONTEXT / last-turn-trace fix covers it. F-S03-d: **Tool Matching
  keyword-add unfindable** — the affordance EXISTS (My Draft column: type
  keyword + pick categories + add + publish) but the 4-column lifecycle layout
  hides it; capability present, discoverability absent. **High priority — two
  trust-critical stages (03 AND 07) point at it.**
- **04 Planning** — F-S04-a (optional): card honestly says "no separate planner"
  (ReAct, SOTA-validated) but doesn't NAME the deferred future (LangGraph).
  Optional: name it, like 05/06 name theirs. Owner's call (vaporware vs
  expectation-setting).
- **05 Memory retrieval** — F-S05-a: card states the absence ("no long-term
  memory") but doesn't frame the episodic-memory future the way 04 frames the
  planner. Parity fix: frame MEMORY-1 as the born-governed future; separate
  today's window-size knob from tomorrow's episodic memory. No span (thin
  synchronous slice, happens inside stage 09) — consistent, not a bug.
- **06 Knowledge/RAG** — F-S06-a: title says "RAG" but today it's governed
  knowledge (no retrieval corpus); frame real RAG (Kale-RAG, F83) as an ADDITIVE
  future layer (06 is full today, unlike empty 04/05). F-S06-b: 06 is where
  Rules-edited knowledge is CONSUMED — make the Rules↔06 link bidirectional
  (Rules sub-walk's core theme: "what does Rules affect? → stage 06"). **Langfuse
  = verified NOT bypassed** (`withSpan(cwf.warm.knowledge)` unconditional, every
  turn, cache hit or miss).
- **07 Tool selection** — F-S07-a: 03 and 07 are two halves of one routing story
  (03 decides categories, 07 builds the tool list); cards should link them
  explicitly (owner confusion: "why is Tool Matching in two places?"). Card
  content itself is deep/good — the fix is the Tool Matching page's IA, not the
  card. F-S03-d re-surfaces here (raised to high).
- **08 Compression** — F-S08-a: mechanism verified = resultStore handle-binding,
  NO summarization (grep empty), model queries via aggregate_records/query_records.
  Card accurate. But the **offload threshold is NOT governed** (hardcoded,
  invisible in admin) — candidate future governed param. No span (happens inside
  stage 11) — consistent.
- **12 Verification** — F-S12-a (HIGH): the Data Authority panel shows the table
  but never explains WHAT it does. The system's deepest idea (ADR-001 — 3 tiers
  system_of_record/reporting_mirror/unverified; "unverified is never
  authoritative" fail-closed; make a lying backend HARMLESS) is nowhere in
  human language. Verified in code (backendTrust.ts / runScopeCheck /
  trustRegistry.isAuthoritativeFor). F-S12-b: discoverability — under Govern,
  owner struggled to find it. **Data Authority sub-walk queued.**
- **13 Format/Render** — F-S13-a: the four-way distinction (real-0 / missing /
  "no data" / not-chartable) + F82 ambiguous-panel is MECHANICAL BEHAVIOR
  (`outputFormat.ts`, immutable). But the SENTENCE the user reads ("no table
  handle" / "can't chart this") is a GOVERNED format text-segment (→ Rules,
  versioned). Owner's "enrich in Rules" instinct = correct (change the language,
  not the behavior — the card says exactly this). Rules sub-walk item. No span
  (client-side render) — correct.
- **14 Memory update** — F-S14-a: fourth growth point (memory UPDATE half);
  frame episodic memory + F83 "write findings back and learn" as born-governed
  future; make explicit that 05+14 are the two halves of MEMORY-1. F-S14-b: card
  UNDER-STATES writes — router_proposals (SR1-W2) + backend_tools self-heal
  (MCP-WARM-1, mcpDiscovery.ts:198) are turn-end writes not shown (observation/
  self-heal, distinct from learning).

## 4 · THEMES

- **Four growth points: 04 (LangGraph) · 05 (episodic-retrieve) · 06 (Kale-RAG) ·
  14 (episodic-update + F83).** 05+14 are ONE system (MEMORY-1) split across two
  stages. All want the same "deferred, born-governed" frame; 06/14 are additive
  (full today), 04/05 are empty-placeholders.
- **The governance deep-link (F-S00-a) is the walk's #1 recurring pain** — "Rules
  beni çıldırtıyor." Rules sub-walk + F-S00-a fix is the first post-walk work.
- **Last-turn-trace / SET-CONTEXT is the observability spine** — it retires the
  org-list-landing problem AND becomes the pipeline-wide inspector.

## 5 · SUB-WALKS QUEUED (after the main walk, each a standalone page)

1. **Rules** (owner's #1 pain; F-S00-a container; F-S06-b Rules↔06; F-S13-a
   format-segment enrichment; Rules-split F46).
2. **Tool Matching** (anchor: 12→13 keyword-add door; 03↔07 twin; F33 rename
   "Routing"→"Araç Eşleme"; 4-column IA; F-S00-a here too).
3. **Data Authority** (F-S12-a explain-what-it-does; F-S12-b discoverability;
   F45 rename already landed in panel title).

## 6 · DOC-SEEDS for F-DOCS-ENRICH (raw material from this walk)

- **Data Authority** = ADR-001 · system_of_record/reporting_mirror/unverified ·
  "unverified never authoritative" fail-closed · OEE ARMES-vs-Superset conflict
  example · a grant SILENCES the scope detector (why floor∪live is NOT unioned).
- **04-05-06-14 growth points** = LangGraph / episodic-retrieve / Kale-RAG /
  episodic-update, all "born governed"; 05+14 = MEMORY-1 two halves.
- **08 compression** = handle-binding, no summarization, the empty≠zero-preserving
  indirection.
- **03↔07 twin** = routing decision (03) vs tool-list build (07), same Tool
  Matching surface.
- **13 render** = behavior (mechanical, four-way distinction, F82 ambiguous
  panel) vs language (governed format segments) — the two-box rule.
- **SET-CONTEXT** = the pipeline building one turn, stage by stage, made visible.

## 7 · SUGGESTED SEQUENCING (owner decides)

1. **IA-2** (renames F33/F45, Rules-split F46, Tweak IA) — now informed by this walk.
2. **Systemic hotfixes** — F-S00-a (deep-link filter + F42 strip), F-S01-a
   (named doc tab), F-S01-b tier-1 (last-turn-trace + toast).
3. **Sub-walks** — Rules → Tool Matching → Data Authority.
4. **SET-CONTEXT pillar** (design note first) — the observability centerpiece.
5. **MEMORY-1** (its own program, design note) — episodic, 05+14.
6. **F-DOCS-ENRICH** — LAST, content-only, before project close.

<!-- END · cwf-stages-v1-review-findings-v5 · rev 5 · 2026-07-18 -->
