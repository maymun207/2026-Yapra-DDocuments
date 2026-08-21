# CWF — Literature Cross-Check: Dibia & Bornet vs. Our Architecture · v1
<!-- cwf-literature-crosscheck-dibia-bornet-v1 · 2026-07-30 · S70 · Architect: Claude.
     Sources read in full-structure + deep sections: "Designing Multi-Agent Systems"
     (Victor Dibia, 2025-11) and "Agentic Artificial Intelligence" (Bornet et al.).
     Compared against: cwf_yaprak @ 8434efcc · A23 v1_3 · ADR-001/002/005/009/010/011 ·
     master-plan v5_3 · v1-scope-cut v1_1. REPORT ONLY — zero actions taken;
     discussion items in §5 await the owner (talk first, act after). -->

## §0 · The one-paragraph verdict

The two books validate our architecture's spine to a degree I did not expect
before reading them. Dibia's closing law — *"Start with the simplest architecture
that could work; a well-designed single agent often outperforms a poorly designed
multi-agent system"* — is the strongest independent endorsement of CWF's most
contested early decision: **one agent, one `streamText` site, governed pipeline
stages instead of an agent swarm.** His measured evidence (multi-agent burns 43×
the tokens and LOSES to a direct model call on simple tasks, 9.7 vs 9.3) is the
number behind our instinct. Bornet's Progressive Trust Model is ADR-010 written
by different hands. Where the books push back on us is narrower but real: three
gaps and two vocabulary upgrades, listed in §4 — none of them re-litigates a
locked law, and one of them (the human-delegation policy) we should genuinely
discuss before B5.

## §1 · What each book is

**Dibia — "Designing Multi-Agent Systems"** (engineer's book, AutoGen creator,
Microsoft Research). Builds a full agent framework from scratch; the load-bearing
chapters for us are 2 (orchestration patterns), 4 (agent loop, structured output,
memory, middleware, OTel, context engineering, HITL), 10 (evaluation-driven
development, trajectory evaluation), 11 (ten production failure modes),
12 (MCP/A2A protocols + security), 13 (agentic ethics/security).

**Bornet — "Agentic Artificial Intelligence"** (practitioner/executive book,
consulting-heavy). Load-bearing for us: 2 (five-level Agentic Progression
Framework), 3 (stochasticity, data-quality, hallucination limits), 5 (progressive
tool access, sandboxing, monitoring), 7 (episodic/semantic/procedural memory
architecture), 8 (the A.G.E.N.T. framework: identity, fail-safes, decision
trails, Progressive Trust Model, "power of simplicity"), 11 (scaling, "when
agents go rogue" safeguards).

## §2 · Where our architecture is AHEAD of both books

These are not ties — they are places where our locked laws are stricter than the
books' recommendations, and the books' own failure catalogs justify the
strictness.

1. **Deterministic trust vs. "LLM judge" leniency.** Both books accept LLM-based
   guardrails in places (Dibia's LLM-as-judge for evaluation, Bornet's
   confidence-based escalation). ADR-001 is harder: grounding/trust is
   deterministic code, never an LLM judge at runtime, and the goal is a lying
   backend made HARMLESS, not honest. Dibia's ch13 inadvertently proves why:
   his alignment-faking evidence ("complying when monitored, reverting when
   unmonitored") is an argument that a stochastic judge cannot be the safety
   floor. Our eval-gate being unbypassable and byte-identical is stricter than
   anything either book requires.

2. **The write lock (ADR-011).** Bornet's "progressive tool access" and Dibia's
   "risk-based approval strategies" are policy recommendations. ADR-011 is a
   structural invariant enforced at the gate AND at the outage floor: a filtered
   turn cannot mutate the factory, unconditionally, with a self-check that halts
   the phase that would violate it. Neither book proposes enforcement at the
   floor — i.e. the path that serves precisely when the gate cannot run. That is
   an original hardening on our side.

3. **empty≠zero as a system-wide law.** Bornet's data-quality chapter names the
   problem ("agents confidently process incorrect data"); neither book elevates
   the four-state distinction (real-0 / missing / empty / non-chartable) into an
   invariant that survives outage and the render layer. Our F199 work — making a
   declared-but-empty layer distinguishable from an undeclared one at the gate
   boundary — is a level of epistemics the literature doesn't reach.

4. **Provenance discipline.** Dibia's UX ch3 names "observability and
   provenance" as a principle; Bornet's Decision Trails prescribe logs. Our
   implementation is stronger than both prescriptions: the evidence chip is
   deterministic (built from `rawToolResults`, never parsed from prose), the
   zero-tool warning is affirmative, and attribution is structural
   (mention → canonical_id → score → method, model never writes it — A23 Stage C
   binding 1). The books recommend the destination; we enforce the route.

5. **Measurement constitution.** Dibia ch10's "evaluation-driven development"
   is our S62-2/S63-1 culture (merge is not proof; live measurement is;
   pre-registered rules; contaminated samples re-measured). His warning that
   recorded trajectories bias recall toward the arm that offered more is
   EXACTLY the trap ROUTE-SHADOW named for itself ("losses are computable from
   the record; gains are not") — we hit the same epistemological wall and built
   the same fence, independently.

6. **Secrets by reference.** Dibia ch12's MCP security section (confused-deputy
   prevention, no token passthrough, separate credentials per backend) maps
   onto `resolveAuthHeader`'s one-chokepoint design, the `^MCP_[A-Z0-9_]+$`
   exfil bound, and the mcp_secrets store. The A9 phase currently in flight is
   us closing the last gap between our own standard and our own data.

## §3 · Where the books CONFIRM locked decisions (no change, worth recording)

| Book claim | Our artifact | Note |
|---|---|---|
| Dibia 11.3.11: "You probably don't need a multi-agent system"; four-characteristic checklist | One-agent turn pipeline; stages not agents; single `streamText` site | Our task (query→tools→answer over one domain) fails his multi-agent checklist on 3 of 4 axes — single-agent is the *measured* right call, not a simplification |
| Dibia ch2: workflow patterns (explicit control) > autonomous patterns for "well-defined, repeatable processes requiring high predictability" | 14-stage deterministic pipeline over `TurnContext` | We are a workflow pattern with an LLM inside one stage — the highest-reliability quadrant of his taxonomy |
| Dibia 4.5: "Structured output is the key to reliable agents" | IR frame (typed enums, K1 §8), governed Zod schemas, CORE kinds field-locked | Same doctrine, deeper enforcement |
| Dibia 4.10: OTel + Gen-AI semantic conventions, OTLP backends | RULE-27/28, one turn id, OTLP/HTTP, span-processor scrubber, three-system split (ADR-008) | Our three named traps (serverless freeze, gRPC, secret-leak surface) go beyond his treatment |
| Dibia 4.12: context rot ~32K; head-tail compaction; tool-result filtering; "context isolation" | `resultStore` handles (stage 08: big results bound to handles, never dumped), `agent.historyWindowN` governed | Our compression stage is his "tool result filtering" + "context isolation" implemented deterministically |
| Bornet Progressive Trust Model (high oversight → selective → strategic, criteria per stage) | ADR-010: declaration is a claim; trust earned from observed behavior, per-tool, two-speed enforcement | Same model; ours is finer-grained (per-tool, not per-agent) |
| Bornet fail-safes: retry w/ backoff → graceful degradation → human escalation | P6.7 transient retry, ADR-003 completion robustness, F122 bounded retry ladder, withheld-unhealthy-backends (fail-open), observability floor | Ladder-for-ladder match; our bounds are pre-registered (`LLM_EMPTY_RETRY_MAX`) |
| Bornet circuit breakers ("gibberish 3× in a minute → pause") | Backend health withholding, eval-gate refusal, learn brake + guard, synthetic-injector daily ceiling | Ours exist per-surface; see §4.3 for the one gap |
| Bornet ch3 stochasticity → "consistency demands determinism where it matters" | The recurring-trap law (project instructions §7): deterministic/authoritative vs soft/learned, named before implementing | Our sharpest internal law is his chapter's conclusion |
| Bornet ch12 (Pets at Home): "critical role of data quality," executive sponsorship, cost management | ADR-009 (topology discovered, never hand-authored), quota/analytics, token budgeting | Case-study lessons we already legislated |
| Bornet "The Power of Simplicity" + Dibia framework ch9 "build vs buy" | Buy-before-build standing directive; engine ruling (Postgres behind a contract, swap triggers named) | Same posture |

## §4 · Where the books push back on us — the honest gaps

### 4.1 · GAP (real, discuss): we have no explicit HUMAN-DELEGATION POLICY object
Dibia's failure mode #10 ("your agents don't know when to delegate to humans";
risk-based approval; measure approval rates — >95 % approval = over-cautious,
misses = under-cautious) and Bornet's escalation design both treat
*when the machine must stop and ask a human* as a first-class, tunable,
MEASURED policy. Our system has the pieces — the clarification gate (dark),
consent-class script gating (S43-4, spend tokens), door-4 override, owner-only
secret handling — but **no single named policy that says which action classes
require a human, and no metric on it.** Today that knowledge lives in laws and
lane fences, not in a governed object a Kale operator could read. Post-v1
question, but the *naming* could be one paragraph in B6 docs.

### 4.2 · GAP (real, partially planned): memory taxonomy vocabulary for MEMORY-1
Bornet's episodic/semantic/procedural split, with different storage per type and
Dibia's application-managed vs agent-managed axis, is a better DESIGN VOCABULARY
than anything currently written for B3. Mapped to us: episodic = conversation
persistence + the A23 cross-turn carrier (son-çözüm dilimi); semantic = the
governed knowledge store (already DB-first — we are ahead here); procedural =
prompt segments + tool-use rules (governed — also ahead). What MEMORY-1 must
actually decide is only the EPISODIC slice, and both books agree on its shape:
**bounded, recency-weighted, deliberately pruned** (Dibia: "if your agent
re-reads files it already processed, your budget is too tight"). Also both books
warn the same warning we legislated in F185: agent-managed memory is a
write-surface that needs a guard (Dibia 4.8.4 sandboxes memory paths). This is
not a change to A23 — it is the vocabulary MEMORY-1's design note should be
written in.

### 4.3 · GAP (small, cheap): one named circuit-breaker is missing
Bornet's quality circuit breaker ("N bad outputs in a window → pause the surface
+ notify") exists in our system for backends (health withholding) and for
learning (brake), but NOT for the answer surface itself: a model producing
degraded answers under load has no automatic trip — the grounding validator
checks rules, not quality collapse. Honest counterpoint: our zero-tool warning
chip + completion guard cover the worst case (empty/ungrounded). This is a
v1.1-class item at most; recorded so it is a decision, not an omission.

### 4.4 · VOCABULARY (adopt, zero code): the five-level framework for EAIP sales
Bornet's Level 0–5 Agentic Progression Framework is the cleanest external
language for what CWF is: **a Level 3 system (agentic workflow, human oversight
at defined points) with Level-4 machinery gated dark until measurement licenses
it** (frameRouting, learning). That sentence is worth putting in B6 docs and in
any Kale/ARDIC-facing deck — it converts our conservatism from "not finished"
into "deliberately staged," which is also simply true. His "detect overblown
claims" framing is a gift for expectation-setting with stakeholders.

### 4.5 · CAUTION (against the book, not us): Bornet's "universal learner" vision
Bornet ch7's Nexus story (drop an untrained agent in, let feedback loops make it
"unstoppable") is the exact philosophy our F185 line measured and rejected at
small scale: the learned keyword map, fed by unsupervised feedback, reached 164
contaminated rows and its guard caught 4 of 23. Our counter-doctrine — *learning
improves how the agent FINDS tools, never what it KNOWS; a corpus that licenses
a learner may not contain the surface the learner writes into (S69-2)* — is the
grown-up version of his vision. No change to us; recorded because the book's
enthusiasm here should not be read as evidence against our brake.

### 4.6 · CONFIRMED RISK we already carry as open findings
Dibia ch13's security section (tool-output injection, emergent multi-agent
risk, alignment faking) maps to **F180/LB-11** (tool-output injection hardening
unverified) — parked under S69-1, and the book raises its priority argument
without changing its S69-1 classification: it still isn't on a path a user
takes today in a way that cuts the release. It stays parked, now with a
literature citation attached.

## §5 · DISCUSSION ITEMS — talk first, act after (per the owner's instruction)

Nothing below is scheduled. Each is a question for the owner, ordered by my
recommendation strength.

- **D-1 (recommend YES, cost ≈ one paragraph):** Write MEMORY-1's design note in
  the episodic/semantic/procedural vocabulary (§4.2), stating explicitly that
  semantic+procedural are ALREADY governed and only episodic is being built.
  This shrinks B3's perceived scope and gives the note an external anchor.
- **D-2 (recommend YES, cost ≈ one page in B6):** Name the human-delegation
  policy (§4.1) as a documented object — which action classes require a human
  (spend, secrets, governed publishes, override door-4), where that is enforced
  today. Documentation of existing behavior, not new mechanism.
- **D-3 (recommend YES, zero cost):** Adopt the Level-3-with-gated-Level-4
  language (§4.4) in B6 docs and stakeholder material.
- **D-4 (recommend RECORD ONLY):** The answer-quality circuit breaker (§4.3) →
  a named v1.1 item, not before.
- **D-5 (recommend NO CHANGE):** Multi-agent orchestration. Both books, read
  honestly, say our single-agent choice is right FOR THIS TASK SHAPE. The place
  a second cooperating role could ever earn its way in is post-B7 EAIP
  federation (A2A territory, Dibia ch12) — trigger-gated like Qdrant/OPA,
  possibly never.

## §6 · One meta-observation

The strongest pattern across both books is that their failure catalogs are our
session history. Dibia's ten failure modes read like our register: his #5
(termination) is our synthetic-injector ceiling design; his #9 (no evals) is
GATE-0; his #4 (tool quality) is tool_doc/F163; his #7 (memory) is B3; his #10
is §4.1. We did not learn our laws from these books — we paid for them in
sessions. What the books add is external confirmation that the prices were
market rate, plus three vocabulary upgrades and one genuinely missing object
(D-2). That is a good audit result.

<!-- END · cwf-literature-crosscheck-dibia-bornet-v1 · 2026-07-30 · S70 -->
