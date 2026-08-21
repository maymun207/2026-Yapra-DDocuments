# CWF — StagesDashboard Review Findings · v4 (re-walk CLOSED)

<!-- cwf-stages-v1-review-findings-v4 · rev 4 · 2026-07-12 · Supersedes v3. The full 03→14
     re-walk on the FIXED ground (floor 8e7203d) is COMPLETE. This version reorganizes ALL
     findings (F1–F48) into the FIVE work streams that emerged, so the fix phases can be
     authored against one clean source. Supersedes v1/v2/v3 (all immutable, kept for lineage).
     Systemic diagnosis unchanged from v1: the page opens gates but lands users without a
     lesson; content is AI-voice, not human onboarding. The re-walk confirmed this holds
     across all 14 stages AND surfaced a broken nested-nav layer + naming problems + two
     deep architecture questions the owner wants SOTA-researched. -->

## 0 · SYSTEMIC DIAGNOSIS (holds across all 14 stages)

StagesDashboard promised a teacher that goes big-picture→detail. It ships a map that opens
gates but never says what to do behind the gate, in AI-voice. Owner's recurring words across
the walk: "beni bir yere getiriyor; ne yapacağım, neyi bekleyeceğim — bilmiyorum," and
(stage 12) "senden başka kimse kullanamaz bunu; bir insanın anlamasına imkân yok." The fix is
NOT cosmetic — it is content + information-architecture + navigation, in three pillars:
1. **Human-voice content** everywhere (kill "§7 yasası", "OBS-3.1 dersi", RULE-N references).
2. **User-Docs bridge** on every card AND target panel (owner stressed repeatedly).
3. **Stages mental model propagates into panels** — panels must reflect the ordered pipeline
   the user just learned, not sit in their old flat/disconnected layout.

## 1 · THE FIVE WORK STREAMS (authoring plan)

### STREAM A — mini-HOTFIX (pure mechanical, ships next, HOTFIX profile)
Small, low-risk, client-only. One batched phase.
- **F20** nav-chip shows raw `?tab=routing` mono → replace with human target name ("→ Yönlendirme").
- **F32** dismissible explainer panels (× permanently hides them, e.g. MCP Secrets/Global) →
  make them collapse/expand, consistently across ALL pages. NEVER permanent-dismiss.
- **F37** Inspect event-detail "human-readable" panel fields overflow/misalign (long UUIDs) → fix layout.
- **F25 / F42** Langfuse chip is copy-only (owner: "kopyaladı ama Langfuse'a gidemiyorum") →
  ALSO open the Langfuse host in a new tab (host is in ObservabilityConfig). Inspect ALREADY
  has an honest "opening requires login, not a broken link" deep-link — reuse that pattern.

### STREAM B — FULL nested-nav phase (multi-file, FULL profile, gated)
The panel-internal navigation layer is broken; FIX-2 only fixed the shell tier.
- **F27** nested scroll-restore fails (Kinds → instance detail → back lands at Kinds top).
- **F28** no back button in nested detail — user is stuck.
- **F29** Kinds "N instances →" silently jumps to Rules (via onOpenRules(kindId)) — owner
  confused which page. Code-confirmed: "Instances live in Rules." Needs a labeled transition.
- **F31** nested detail not full-screen (Rules rule-detail cut off at the bottom).
- **F41** multi-hop back broken: Stages→Trust→Replay(scope lens)→Back wrongly returns to
  stage-12, not to Trust. Needs a REAL nav-history / breadcrumb stack (Trust › Scope lens),
  each hop independently reversible — not just "back to Stages."

### STREAM C — WAVE 2 (content + IA redesign + naming; the biggest stream)
A writing + redesign job, authored in ONE voice after this walk (so it's coherent, not the
F13 mistake repeated). Its own design note(s).
- **Content rewrite (human onboarding voice):** F13 (registry prose), F14 (deep-link "what
  you'll do there"), F15 (target-panel copy — esp. Replay Part-A, Rules, Kinds, Tweak), F19
  (arrival context), + every stage's "… daha fazla" reworded.
- **User-Docs bridge (pillar 2):** F16 + F22 — every card AND panel deep-links to the matching
  User-Docs section. **F42 is the live reference pattern** — Replay's "you arrived from the
  Backend Trust console — pick a specimen…" strip; propagate it everywhere.
- **Stages-model-into-panels (pillar 3):**
  - **F23** Tweak IA REDESIGN (owner's hardest directive) — regroup session-overlay levers BY
    STAGE in pipeline order (00→14), each group labeled with its stage; length is fine. Tweak =
    action-twin of Stages. This is LAYOUT, not just copy — its OWN design note.
  - **F46** Rules is one flat linear list conflating prompt.segment / domain_rules / guard-text /
    params — "her şey Rules'a gidiyor ama Rules'ta bir sürü hikaye var." SPLIT Rules into
    role/kind-grouped sections so deep-links land in the right sub-view. Root cause of the
    recurring "dönüp dolaşıp Rules'a çakıyorum" (F29).
  - **F26** Kinds (structure) conceptually precedes Rules (instances) — reorder the Configuration
    menu Kinds→Rules; card sources ordered structure-first; explain the Kinds↔Rules relation
    (Excel analogy: Kinds = column headers/types, Rules = the rows).
- **Naming (pillar: "what image does this leave in a human's head?" — standing Wave-2 rule):**
  - **F33** "Routing" → **"Araç Eşleme / Tool Matching"** (route implies signal-switching; real
    function = query→tool-category learned map).
  - **F45** "Backend Trust" → **"Veri Otoritesi / Data Authority"** (Trust evokes network/security/
    keys; real function = per-backend data authority vs hallucination; aligns with the panel's own
    "authoritative metric registry" + backend_authority table + stage-12 grounding).
  - Test remaining names too (Tweak? Kinds?). Mechanism: visible label changes; inner ?tab= id
    may stay (avoid breaking deep-links) or migrate — decide in Wave 2.
- **Panel-copy explainers:** F7 (Rules payload template from client field_spec), F8 (Kinds
  schema visibility — same lever), F17 (`system` backend = SYSTEM_BACKEND_ID param lane, not a
  data source), F18 (Users "…" → add "set this user's quota" cross-action), F24 (Tweak "Active
  fingerprint" = the visible face of the auditable-lifecycle thesis), F30 (archive/rollback/
  "running now"/trash-icon — high-risk prod actions, explain + confirm), F34 (ALWAYS_INCLUDE
  "availability floor" shows "ertelendi" = looks empty), F40 (stage-11 tool-loop story).
- **F38 grounding visual + copy:** the red ⚠ "grounding_violation" looks like an ERROR but is a
  governance CATCH (system caught a backend presenting emptiness as zero = GOOD). Needs human
  copy + a non-panic visual (shield/"caught" icon, not red-alarm). Owner panicked ("ne ters gitti?").
- **Critical-but-unexplained stages needing EXTRA depth:** 07 (Tool Selection — candidate-set =
  learned map + user scope + ALWAYS_INCLUDE floor; model finds-not-knows; §7), 09 (Prompt
  assembly — the 20 segments), 10 (LLM inference — single gateway, empty-completion floor), 11
  (Tool loop — live hands, MAX_TOOL_ROUNDS), 12 (Verification — deterministic trust, three lenses).

### STREAM D — architecture / SOTA research + big-ticket items (owner-requested, separate)
Owner explicitly asked TWICE for a detailed SOTA review; must be RESEARCHED, not guessed.
- **F43** Is deterministic-trust (no LLM-judge, ADR-001 "make a lying backend harmless") the
  SOTA way vs LLM-as-judge / hybrid verification? Confirm from current sources.
- **F48** The system's ONLY learning is `tool_category_cache` (routing: "bulma, asla bilme").
  Owner: "yetmez; buranın bir DB'si olmalı, knowledge base'e bağlanmalı; bu yapıyla 5 yaşında
  kalır, 6-8-10 yaşına evrilmeli." SOTA agentic/episodic memory + self-improving agents — what
  does mainstream do beyond a routing cache? (Partly overlaps the deferred long-term memory
  connector, memory.enabled=false.) This is a GENUINE architecture gap, not a bug.
- **F39** MAX_TOOL_ROUNDS is code-VERIFIED present (gateway.ts stopWhen stepCountIs; config.ts:17
  = env CWF_MAX_TOOL_ROUNDS || 8) — runaway loops ARE structurally prevented — but it's NOT
  governed (env+hardcoded, invisible in admin). Candidate future `agent.maxToolRounds` L1 param.
- **F47** Some behavior is hardcoded floor (outputFormat/empty-guard). Owner dislikes hardcode;
  wants DB-editable + reset-to-code. BUT some floors are DELIBERATE safety invariants (empty≠zero
  behavior must NOT be DB-openable — a poisoned row could disable the guard). Decision item, NOT
  auto "open everything": per-floor audit — is this a safety invariant (stays mechanical) or an
  adjustable value (→ governed)? Big post-Wave-2 governance-audit.

### STREAM E — Superset activation (F36, separate workstream, post-Wave-2)
Superset MCP is connected but NOT serving — all answers come via ARMES. Known deferred DB-first
activation: run scripts/seedRules.ts (publish Superset rule_kinds + CORE rules to governed DB) +
backfill backend_id:'superset' on the supersetArmes mcp_settings row. Diagnose LIVE then (Vercel
logs + mcp_settings), don't guess. Owner wants a dedicated step-by-step Superset workstream.

## 2 · LIVE CONFIRMATIONS (things that WORK — don't touch)
- FIX-1 scroll works (owner first saw Tweak bottom + Active fingerprint).
- FIX-2 shell-tier scroll-restore works (owner returned to the card they left).
- Inspect→Langfuse deep-link routing works (14-stage cwf.stage.* span tree; prompt_rev/
  params_hash/knowledge_hash = live face of Tweak's fingerprint).
- MAX_TOOL_ROUNDS guard exists (runaway tool loops prevented).
- **F42** Replay's cross-panel context strip works and the owner loved it — the reference pattern.

## 3 · SUGGESTED SEQUENCING (Architect recommendation — owner decides)
1. **STREAM A mini-HOTFIX** first — cheap, immediate UX relief, unblocks nothing else.
2. **STREAM D SOTA research** in parallel/next — it's reading, not building; its output shapes
   how much of F47/F48/F39 becomes real work. Do it before committing Wave 2 scope.
3. **STREAM B nested-nav** — real bug, multi-file, but self-contained; land before Wave 2 so the
   content walk lands on navigable ground.
4. **STREAM C Wave 2** — the big content/IA/naming push, authored in one voice.
5. **STREAM E Superset** — after the UI is legible.

<!-- END · cwf-stages-v1-review-findings-v4 · rev 4 · 2026-07-12 -->
