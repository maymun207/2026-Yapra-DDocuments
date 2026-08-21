# CWF — SOTA Review: Deterministic Trust & Agent Memory · v1

<!-- cwf-sota-review-trust-and-memory-v1 · rev 1 · 2026-07-12 · Architect: Claude.
     Answers the TWO architecture questions the owner raised during the S37 stage re-walk and
     explicitly asked to be RESEARCHED, not guessed:
       F43 — is deterministic trust (ADR-001, no LLM-judge) the SOTA way, or is LLM-as-judge/
             hybrid the state of the art?
       F48 — the system's ONLY learning is tool_category_cache ("bulma, asla bilme"). Owner:
             "yetmez … bu yapıyla 5 yaşında kalır, 6-8-10 yaşına evrilmeli." What does
             mainstream do for agent memory/learning?
     SOURCES: 2026 practitioner + vendor + arXiv material (see §4). Caveat stated up front:
     much of the "2026 consensus" literature is secondary (practitioner blogs, vendor guides);
     the arXiv items are primary. Treated as a landscape read, not gospel. -->

## 0 · HEADLINE (the two answers in one paragraph each)

**F43 — Your deterministic trust line is SOTA-correct, and the field agrees with you MORE than
you feared.** The 2026 production consensus is not "LLM-judge everything" — it is a **layered
stack with a deterministic floor that runs first**, escalating to a model-based judge *only for
what the cheap deterministic layer cannot decide*. Your ADR-001 (grounding = deterministic code,
LLM-judge FORBIDDEN in the runtime trust path) is exactly that floor. **Keep it.** The honest
caveat: deterministic checks are reliable but *narrow* — they catch exactly what you tell them
to catch and are blind to semantic quality (helpfulness, tone, "did it forget the constraint
from turn one"). That blindness is real in CWF too — and it is a **gap in the OFFLINE eval
layer, not a reason to touch the runtime trust line.**

**F48 — Your instinct is right: the memory gap is real, and it has a name.** The field converged
on a four-part taxonomy — **working / episodic / semantic / procedural** memory. CWF today has
working memory (the last-N `messages` window), a *narrow slice* of procedural memory
(`tool_category_cache` = learned routing), and a *human-authored* semantic memory
(`domain_rules` — governed, but never learned). **CWF has NO episodic memory** — no record of
"what happened, what was decided, what worked" that a future turn can recall. That is precisely
the "5 yaşında kalıyor" feeling. The good news: the SOTA best-practice for how an agent should be
allowed to edit its own learned memory is **already the machine you built** (see §2.4).

---

## 1 · F43 — DETERMINISTIC TRUST vs LLM-AS-JUDGE

### 1.1 What the field actually does in 2026

The pattern practitioners converge on is a **cost-ordered cascade**, where each layer only runs
on what the cheaper layer below could not decide:

1. **Deterministic floor (every request):** schema validation, regex, exact match, length
   contracts, citation presence, function-call/tool validators, policy & constraint checks
   (did the agent use approved tools, stay in policy).
2. **Reference/embedding metrics** where a ground truth exists (still no LLM).
3. **Model-based judge (LLM-as-judge / agent-as-judge)** for what the deterministic layers
   *structurally cannot* express.
4. **Human review** on sampled, high-stakes, ambiguous cases.

The stated trade-off is blunt and worth internalizing: deterministic checks are **reliable but
narrow** — they work brilliantly for verifiable answers (code, structured output, tool calls) and
**fail completely for subjective qualities** (helpfulness, tone, nuance). Conversely, the judge
layer exists to read *meaning across turns* — e.g. "the agent forgot the user's constraint from
turn one" — which no deterministic operation on text can capture.

Benchmarks do the same thing: TheAgentCompany (arXiv) runs **deterministic keyword matching
first and uses an LLM only as a fallback**, explicitly framing the LLM evaluator as a
*supplement to* — not a replacement for — the deterministic evaluator.

### 1.2 The distinction that settles the question for CWF

The literature above is mostly about **EVALUATION** (offline/CI/monitoring: "how good was this
answer?"). ADR-001 is about **RUNTIME TRUST ENFORCEMENT** ("block/attribute/quarantine a
backend's claim on every live turn"). These are different jobs with different constraints:

| | Runtime trust (CWF grounding) | Offline eval (CI / replay) |
|---|---|---|
| Runs | every turn, in the request path | out of band, on recorded turns |
| Latency budget | milliseconds, blocking the user | minutes, nobody waiting |
| Failure cost of a wrong verdict | ships a lie to the factory floor | a noisy dashboard |
| Non-determinism tolerable? | **No** — a judge that flips its mind is a liability | Yes, with N-reps + CIs |
| Can it be replayed/audited exactly? | **Must be** | should be |

For the runtime column, deterministic is not merely *acceptable* — it is the **only** defensible
choice, and for a reason the field states plainly: putting an LLM in the verification path adds a
second stochastic layer (*quis custodiet* — who verifies the verifier?), plus latency, cost, and
an unreplayable verdict. Even the guardrail vendors split this way: runtime **policy
enforcement** is treated as a different product from **measurement** (e.g. NVIDIA ships NeMo
Guardrails for runtime enforcement separately from NeMo Evaluator for judging).

**Verdict on F43: ADR-001 stands. Do NOT put an LLM judge in the runtime trust line.** Your
deterministic grounding (empty≠zero, numeric checks, fabrication, scope-divergence) IS the
industry's Layer 1, applied where Layer 1 belongs.

### 1.3 The real gap this research EXPOSES (and it's one you already half-know)

The deterministic floor is narrow *by construction*, and CWF's own replay lenses admit exactly
this: they measure **absence/emptiness, routing, and scope-authority** — they do **not** measure
answer quality. (This is already written into the project's own learning: in the 2026-07-06 Part-A
run, the perturbed arm *shortened* the reply but did not empty it, and the empty-rate metric
correctly did not flag it — the lens measures absence, not quality.)

So the honest SOTA-shaped recommendation is **not** "add a judge to grounding." It is:

> **Consider an LLM-judge layer in the OFFLINE eval/replay harness ONLY** — scoring answer
> quality/helpfulness/faithfulness on the golden specimens, where deterministic lenses are
> structurally blind. Gated, versioned, and human-validated like everything else in CWF.

Two hard warnings the literature attaches to that, both of which map onto CWF machinery:

- **The oracle problem.** Research cited from ICST 2025 found that when an LLM writes the
  assertions for a test suite, the assertions tend to encode the *current, possibly buggy*
  implementation rather than the intended behaviour — bugs get locked in as "expected."
  **Never let the agent author its own ground truth.** For CWF: the golden specimen set stays
  human-marked (as it is today). A judge may SCORE, it may not DEFINE truth.
- **Pin the judge.** Lock the judge's model version alongside the agent's, so a silent provider
  update is *detected* by the eval rather than silently absorbed. CWF already has the machinery
  for this (governed provider rows + params_hash/prompt_rev stamps).

**Status: this is a RECOMMENDATION, not a decision.** It is a new capability with new cost and a
new trust surface; it belongs in a proper phase with its own design note, if and when the owner
wants quality (not just absence) measured.

---

## 2 · F48 — AGENT MEMORY & LEARNING

### 2.1 The 2026 taxonomy (converged, mirrors cognitive science)

| Type | What it holds | CWF today |
|---|---|---|
| **Working** | the live context window: recent turns, scratchpad, retrieved snippets | ✅ `messages` last-N window (`agent.historyWindowN`) |
| **Episodic** | *what happened*: specific past interactions, decisions, commitments, successful task traces | ❌ **MISSING** — `messages`/`telemetry_events` STORE the events, but nothing ever RETRIEVES them into a future turn |
| **Semantic** | facts, definitions, policies, preferences, domain knowledge | ⚠️ `domain_rules` — exists and is governed, but **human-authored, never learned** |
| **Procedural** | learned playbooks, routing rules, "how to do X here" | ⚠️ `tool_category_cache` only — a narrow slice (which tools to *find*), by design "bulma, asla bilme" |

This is the precise anatomy of the owner's complaint. CWF **records** everything (`messages` with
raw tool results, `telemetry_events`, Langfuse traces) but **recalls** almost nothing: the only
thing that flows *back into* a future turn is the routing cache. The system has a diary it never
reads.

### 2.2 The dominant production architecture

- **Two-tier:** the context window is **RAM** (recent turns + the 5–10 memories retrieved as
  relevant to *this* prompt); a persistent store is **disk**. Not "stuff everything in context."
- **Storage is now hybrid, not vector-only.** Pure vector similarity is reported as good at
  "find me something similar" and weak at multi-hop and relationships; graph-ish/entity-linked
  retrieval covers that; **SQL/Postgres remains the recommended home for reliable, auditable,
  ACID long-term facts.** (Mem0's own 2026 write-up describes moving *beyond* pure vector
  similarity toward entity linking + multi-signal retrieval — semantic + keyword + entity, fused.)
- **Forgetting is a FEATURE, not a bug:** TTL/temporal decay, importance scoring, explicit
  policies (e.g. "episodic memories expire after 90 days unless promoted to semantic; semantic
  memories decay in confidence if not reinforced"). Without this, cost and noise explode.
- **Scoping:** memories are partitioned by user / agent / session / organization, so shared
  organizational memory doesn't bloat every private context.
- **Frameworks (if we ever buy rather than build):** Mem0 (most mature managed long-term memory),
  Letta/MemGPT (OS-style explicit memory tiering), LangMem (on LangGraph), Zep (when temporal
  awareness + knowledge graphs matter).
- **Research frontier (arXiv, late-2025→2026):** self-evolving agents — MemRL (runtime RL on
  episodic memory), MemEvolve (meta-evolution of memory systems), procedural-memory frameworks
  for "experience-driven agent evolution." This is *exactly* the "6-8-10 yaşına evrilme" the owner
  described, and it is an **open research frontier**, not a solved, off-the-shelf capability.

### 2.3 What "learning" honestly means — and the trap to avoid

CWF's §7 law ("learning improves FINDING, never KNOWING") is not naïveté; it is a **safety
invariant**. An agent that silently learns *facts* from its own outputs will eventually learn a
hallucination and serve it back as truth — the classic self-poisoning loop. So the answer to
"how does it grow up" is **not** "let the routing cache learn facts too."

The correct growth path keeps the split:
- **Learn freely** (advisory, revertible): what to *find* — routing, tool choice, which specimens
  matter, latency/quality patterns.
- **Learn under governance** (gated, versioned, rollback-able): anything that becomes *knowledge* —
  a new glossary term, a corrected metric definition, a blind-spot the agent discovered.
- **Never learn**: the safety floors (empty≠zero, ALWAYS_INCLUDE, the eval-gate).

### 2.4 The finding that matters most for CWF (and it's a compliment)

The 2026 best-practice for how an agent should be permitted to evolve its own procedural memory,
as stated in the engineering guides, is: **append-only learned heuristics, edited by the agent
through a *controlled tool*, with a *rollback log*.**

Read that again — because that is **not something CWF has to go build. It is the machine CWF
already IS**: draft → eval-gate → super-admin publish → versioned → rollback → audit trail. The
field's aspirational answer to "how do we let an agent learn without letting it poison itself" is
CWF's *existing* governance rail.

**So the CWF-shaped memory design is not a vector-DB bolt-on. It is:**

1. **Episodic memory in Postgres** (Supabase — already there, already auditable, already RLS'd):
   a governed `episodes` table — a distilled record per turn/task (what was asked, which tools
   worked, what the verdict was, what the user corrected), scoped by user/org, with an explicit
   TTL/decay policy. Retrieval = multi-signal (keyword + entity + recency + importance), NOT
   naïve vector-only.
2. **Promotion, not accumulation.** An episode does not become knowledge by existing. It becomes
   knowledge only by being **promoted** into `domain_rules` (semantic) or a routing/prompt change
   (procedural) — and promotion goes through the *existing* draft→eval-gate→publish→rollback path.
   The agent may PROPOSE; the gate (and a human, initially) DISPOSES.
3. **Forgetting policy from day one** — TTL on episodes, importance scoring, decay for
   unreinforced semantic memories. Cheaper and safer than "remember everything."
4. **Anti-oracle rule** (borrowed from §1.3): the agent never writes its own ground truth. A
   proposed promotion is a *draft*, never a published fact.

This gives the owner the "6→8→10 yaş" evolution **without** breaking §7, ADR-001, or the
eval-gate — because learning enters production through the same door everything else does.

### 2.5 Honest scoping

This is a **large, multi-phase workstream**, not a fix: a schema + governed table, a retrieval
path in stage 05, a promotion pipeline into the existing gate, a forgetting policy, admin
surfaces, and lens coverage to prove a memory change didn't break past answers. It also overlaps
the already-deferred **long-term memory connector** (`memory.enabled=false` placeholder). It
should NOT be squeezed into the current UI waves. Recommended: land the UI legibility work
(Streams A–C), then Superset (E), then open **MEMORY-1** as its own program with a design note.

---

## 3 · RECOMMENDATIONS (committed, in priority order)

1. **Keep ADR-001 exactly as is.** Deterministic runtime trust = the SOTA Layer-1 floor, applied
   where it belongs. No LLM-judge in the trust path. *(No work.)*
2. **Record — but do not yet build — an eval-layer judge** for answer QUALITY on golden specimens
   (the gap the lenses structurally cannot see). Offline only, pinned judge model, human-owned
   ground truth. *(Register item; phase when the owner wants quality measured.)*
3. **Name the memory gap officially: MEMORY-1.** CWF has working + narrow-procedural +
   human-semantic memory, and **no episodic memory**. Build it Postgres-first, governed,
   promotion-gated, with a forgetting policy — riding the EXISTING draft→gate→publish→rollback
   rails. *(Its own program, after the UI waves + Superset.)*
4. **Make MAX_TOOL_ROUNDS governed** (F39) — the guard exists (env + hardcoded 8) but is invisible
   and unadjustable; it belongs as an `agent.maxToolRounds` L1 param. *(Small, fits a later batch.)*
5. **Per-floor hardcode audit** (F47) — for each mechanical floor, decide explicitly: *safety
   invariant* (stays code) or *adjustable value* (→ governed row). Do not blanket-open them;
   empty≠zero's BEHAVIOR must never be DB-disableable. *(Post-Wave-2 governance audit.)*

---

## 4 · SOURCES CONSULTED (2026)

- Deterministic LLM evaluation metrics / the "eval floor" and the three-layer cascade —
  futureagi.com (May 2026).
- "LLM-as-Judge got us this far…" practitioner map of the layered stack, and the
  reliable-but-narrow trade-off — Medium / V. Talikot (May 2026).
- Agent evaluation: non-determinism, sampling, pinning judge+model versions, and the **oracle
  problem** (Konstantinou et al., ICST 2025, as cited) — Medium / V. Rane (2026).
- TheAgentCompany benchmark: deterministic-first, LLM-as-fallback, "supplement not replacement" —
  arXiv 2412.14161.
- LLM-as-a-judge techniques & reliability practices — DeepEval (2026).
- Rubric-based evals; runtime enforcement vs measurement split (NeMo Guardrails vs NeMo Evaluator)
  — Medium / A. Masood (Apr 2026).
- Agent memory taxonomy (working/episodic/semantic/procedural), hybrid vector+graph, SQL/Postgres
  for auditable facts, forgetting-as-a-feature, scoping — 47billion.com (Mar 2026);
  Zylos Research survey (Apr 2026); fountaincity.tech (2026).
- Four memory types, OS-style tiering, framework comparison (Letta/LangMem/Mem0/Zep), and the
  **procedural memory = append-only learned heuristics via a controlled tool with a rollback log**
  pattern — jobsbyculture.com engineering guide (Jun 2026).
- Beyond pure vector: entity linking + multi-signal retrieval — Mem0 State of AI Agent Memory
  (2026).
- Self-evolving frontier: MemRL (Jan 2026), MemEvolve (Dec 2025), "Remember Me, Refine Me"
  (procedural memory for experience-driven agent evolution) — Agent-Memory-Paper-List (GitHub).

<!-- END · cwf-sota-review-trust-and-memory-v1 · rev 1 · 2026-07-12 -->
