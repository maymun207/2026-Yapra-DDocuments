cwf-sota-stage-sweep-part3-v1.md


# CWF — Stage-by-Stage SOTA Gap-Hunt · Part 3 (stages 09–14) · v1 — SWEEP COMPLETE
 
<!-- cwf-sota-stage-sweep-part3-v1 · rev 1 · 2026-07-12 · Architect: Claude.
     Final part. Completes cwf-sota-stage-sweep-part1-v1 (00–03) and part2 (04–08).
     HEADLINE: on the LLMOps axis (prompt registry · eval gate · canary/A-B · auto-rollback ·
     gateway · lineage stamps) CWF is not behind the field — it is at the TOP maturity tier the
     2026 checklists describe. The single biggest REAL gap in the whole 15-stage sweep is not
     an architecture gap at all: THE GOLDEN SET IS EMPTY. The safety net exists and is unarmed. -->
 
# 09 · Prompt Birleştirme — **NO ARCHITECTURE GAP. CWF is at the top of the 2026 checklist.**
 
## The 2026 "six-layer" production checklist vs CWF
The LLMOps literature converges on a checklist, and it reads like a description of CWF:
 
| The checklist says | CWF |
|---|---|
| Move prompts **out of code into a registry**; treat them as versioned production assets | ✅ `prompt.segment` governed rows (L2); code = floor/seed/reset |
| **Semantic versioning + mandatory review** before any change merges | ✅ draft → super-admin publish, versioned, audited |
| **Wire the eval gate** — every prompt change runs the test set before it ships | ✅ unbypassable schema→referential→behavioral gate |
| **Golden regression set** (50–100 representative inputs) as "the minimum viable safety net" | 🔴 **machinery exists, set is EMPTY** — see below |
| **Canary / per-user A/B with gradual rollout** | ✅ L5 progressive delivery (deterministic slice at N%) |
| **Automatic revert on rubric regression** | ✅ rollout guardrail (Wilson CI, auto-rollback to 0%) |
| **Provider gateway** — centralize routing, caching, fallback | ✅ single `streamText` gateway + governed provider rows |
| **OTel spans carrying prompt version / cohort / config attributes** (data lineage) | ✅ `prompt_rev` · `params_hash` · `knowledge_hash` on every turn's spans |
 
The literature's own framing of *why* this matters lands exactly on CWF's thesis: the main
production risk is **not** "the model made a mistake" — it is that **the team cannot reconstruct
which prompt version, which context, which checks, and which rollout produced a given response.**
That is the sentence CWF's whole audit spine was built to make false.
 
And the failure story they open with — *a prompt tweaked at 4pm, groundedness down 12% by 5pm,
refusal rate 4%→27%, rolled back from a Slack thread; post-mortem: no eval gate, no A/B, no
automatic rollback* — is **structurally impossible in CWF**, because a prompt change is a governed
row that cannot reach production without passing the gate.
 
## The ONE real gap (and it is the biggest finding of the entire sweep)
**The golden set is EMPTY.** (`goldenSet: absent` → the L3 canary loud-skips; register carries
"golden-specimen curation ~20" as an owner-owned action.) The 2026 guidance is blunt: a golden
evaluation set of **50–100 representative inputs** is the *minimum viable safety net*, and every
prompt change runs against it before shipping.
 
So CWF has built the **most sophisticated layer** of the checklist (canary + Wilson-CI
auto-rollback) on top of a **missing foundational layer** (the regression set the canary is
supposed to score against). The alarm system is wired to no sensors.
 
**This is not new work — it is an owner action already on the register**, and it is now the
highest-leverage single act in the whole system: **marking ~20 golden specimens arms L3 AND seeds
the canary baseline in one move.** Nothing in this sweep is cheaper or more valuable.
 
## Minor, already-covered
- Prompt **caching** is present (`gateway.ts:135` — Anthropic ephemeral `cacheControl` on the
  system prefix). The cost lever the checklists name is already pulled, at least for Anthropic.
---
 
# 10 · LLM Çıkarımı — **NO GAP. One optional cost/quality lever.**
 
Single gateway ✅, governed provider/model rows ✅, secret-by-reference ✅, bounded same-provider
retry on empty completions ✅ (and the deliberate refusal to silently swap providers mid-failure is
*correct* — a silent model swap is an unmeasurable behavior change).
 
**Optional lever (not a gap):** the checklists mention gateway-level **cost/quality routing**
(cheap model for simple turns, strong model for hard ones). CWF has the substrate for this
(governed provider rows + `forceProvider`) but no automatic policy. Worth considering **only after**
the golden set exists — because without it you cannot prove a cheaper model didn't degrade answers.
**Order matters: golden set first, routing policy second.**
 
---
 
# 11 · Araç Döngüsü — **NO GAP. Three named SOTA failure modes are already closed.**
 
The agentic-patterns literature names three classic tool-loop failures. All three are covered —
verified in code at `3a2fe02`:
 
| Named failure mode | CWF |
|---|---|
| "LLMs will confidently call tools with **wrong parameters** — always validate tool inputs before execution" | ✅ `stageTools.ts:148` binds every MCP tool with `inputSchema: jsonSchema(toolDef.inputSchema)` → the SDK validates args against the tool's own schema |
| "**Silent tool failures** — the function returns null and the agent doesn't notice — are a common failure mode" | ✅ `toolResult.ts` carries `recordCount`; P7's runtime empty≠zero anchor fires on `recordCount === 0` |
| **Runaway loops** | ✅ `stopWhen: stepCountIs(MAX_TOOL_ROUNDS)` (8) |
 
**Carry-over (not new):** `MAX_TOOL_ROUNDS` is env+hardcoded, invisible in admin, not an
`agent.param` (**F39**) → it belongs in a later governed-params batch.
 
---
 
# 12 · Doğrulama — **VINDICATED (see the trust-and-memory doc). One addition.**
 
F43 already settled it: deterministic runtime enforcement is the SOTA **Layer 1**, and runtime
policy enforcement is a different product from measurement. Nothing changes.
 
**Addition from the LLMOps literature:** the named production techniques for catching
hallucination at scale are (a) **fact-checking guardrails against a knowledge base**, (b)
**cross-response consistency checks**, and (c) LLM-as-judge on sampled traffic. CWF has (a) in a
strong deterministic form (grounding against governed rules + `backend_authority`), has **no** (b),
and deliberately refuses (c) *in the runtime path* — correctly.
 
**(b) cross-response consistency is genuinely absent** and is interesting *specifically* for a
factory data agent: the same question asked twice should yield the same number. CWF **already has
the machinery** to test this offline — the replay harness with N-reps and Wilson CIs. A
"consistency lens" (same specimen, N reps, do the numbers agree?) is a natural, cheap, deterministic
addition — **and it too depends on having golden specimens.** Another vote for arming the golden set.
 
---
 
# 13 · Biçim / Sunum — **NO GAP**
real-0 vs missing vs empty vs non-numeric, plus the empty-guard floor. The literature's guardrail
vendors sell "intercept bad output before the user sees it"; CWF's version is deterministic and
mechanical. Fine as is. (Content/copy is a Wave-2 matter, not a SOTA matter.)
 
---
 
# 14 · Bellek Güncelleme — **GAP = MEMORY-1 (already named). Plus one cheap, high-value loop.**
 
The episodic-memory gap is F48/MEMORY-1. But the LLMOps checklist names a *much cheaper* loop that
CWF is one small step away from:
 
> **"Feedback enrichment — feed low-quality production examples back into the evaluation dataset,
> so known failures cannot resurface."**
 
CWF already persists every turn with its raw tool results (the replay specimen source), and the
ReplayTab can already *mark* a specimen as golden. **The missing move is a one-click "this answer
was wrong → mark it as a golden specimen"** from Inspect/chat — turning every production failure
into a permanent regression test. That closes the loop 09 (eval gate) ↔ 14 (memory) with almost no
new machinery, and it is the *right* kind of learning: it improves the **test set**, never the
model's "knowledge" (so §7 is untouched).
 
**Candidate item: `GOLDEN-LOOP-1`** — a small phase, worth far more than its size.
 
---
 
# SWEEP SUMMARY — the complete gap ledger (00–14)
 
| Stage | Verdict | Item |
|---|---|---|
| 00 Kota | ✅ | — |
| 01 Sorgu | ✅ | — |
| 02 Durum | ✅ | (memory load → MEMORY-1) |
| **03 Niyet** | 🔴 **REAL GAP** | **SEMANTIC-ROUTING-1** — keyword routing is structurally weak for Turkish; evidence in CWF's own learned map |
| 04 Planlama | ⚪ | ReAct IS the mainstream default. Trigger: multi-entity comparisons / 8-round ceiling |
| 05 Bellek | 🟡 | **MEMORY-1** (episodic). Do NOT widen N — context rot |
| 06 Bilgi | ⚪ | Injection > retrieval until Superset doubles the rules; then reuse the pgvector substrate |
| **07 Araç Seçimi** | 🔴 | same as 03; keep ALWAYS_INCLUDE floor + sequencing hints above semantic recall |
| 08 Sıkıştırma | 🟢 **VINDICATED** + 🔵 | resultStore is RIGHT for a numbers agent. **Measure session shape from existing telemetry** before building anything |
| **09 Prompt** | ✅ arch · 🔴 **THE GAP** | Top-tier LLMOps machinery — but **THE GOLDEN SET IS EMPTY**. Arming it (~20 specimens) is the single highest-leverage act in the system |
| 10 LLM | ✅ | Optional cost/quality routing — **after** the golden set |
| 11 Araç Döngüsü | ✅ | All three named SOTA tool failures closed. F39: govern MAX_TOOL_ROUNDS |
| 12 Doğrulama | 🟢 **VINDICATED** | + cross-response **consistency lens** (cheap; needs golden specimens) |
| 13 Biçim | ✅ | — |
| 14 Bellek Güncelleme | 🟡 MEMORY-1 | + **GOLDEN-LOOP-1**: one-click "this answer was wrong → golden specimen" (failure → permanent regression test) |
 
## The three sentences that matter
1. **CWF is not behind the field.** On governance, lineage, eval-gating, canary + auto-rollback and
   deterministic trust, it is at or above the top tier the 2026 checklists describe.
2. **Its biggest weakness is not architectural — it is unarmed.** The golden set is empty, so the
   canary scores against nothing, no consistency lens can run, and no cost/quality routing can be
   proven safe. **Everything downstream unlocks from ~20 marked specimens.**
3. **The one genuine architecture gap is stage 03/07** (keyword → semantic tool discovery), and it
   becomes urgent exactly when Superset activates.
## Sources (part 3)
- The six-layer 2026 production checklist (prompt registry · eval gate · golden set · canary/A-B ·
  auto-rollback on rubric regression · gateway · OTel spans with prompt-version attributes) —
  futureagi.com LLM deployment best practices (Feb 2026).
- "Most LLM issues are data issues"; data lineage: *which prompt version ran?*; golden set of
  50–100 as the minimum viable safety net; A/B a percentage of live traffic before full rollout —
  Ailoitte LLMOps enterprise guide (2026), citing Stack Overflow engineering (Apr 2026).
- Prompt management as release management; versioning, eval-gates, canary/A-B, cost per
  workflow/tenant/release — peerobyte (2026); Braintrust prompt-management articles (Feb 2026);
  LangWatch prompt-management lifecycle incl. **feedback enrichment** (Feb 2026).
- Runtime guardrails intercept unsafe/off-policy output before users see it; hallucination detection
  via knowledge-base fact-checking + cross-response consistency + judge scoring — Braintrust tool
  comparison (2026); Ailoitte (2026).
- LLMOps maturity stages (3 → 5: version control → A/B + guardrails → continuous eval driving
  updates) — calmops (Mar 2026).
- Tool-loop failure modes (wrong parameters; silent null returns) — Innovatrix agentic-patterns
  survey (2026). CWF coverage verified in code at `3a2fe02`
  (`stageTools.ts:148`, `toolResult.ts`, `gateway.ts` `stopWhen`).
<!-- END · cwf-sota-stage-sweep-part3-v1 · rev 1 · 2026-07-12 · SWEEP COMPLETE -->