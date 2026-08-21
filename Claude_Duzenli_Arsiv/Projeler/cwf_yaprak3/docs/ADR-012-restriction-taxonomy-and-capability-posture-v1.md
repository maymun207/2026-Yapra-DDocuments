# ADR-012 — Restriction Taxonomy & Capability Posture
<!-- ADR-012-restriction-taxonomy-and-capability-posture-v1 · v1 · 2026-07-31 · S72
     Status: PROPOSED (Architect-authored on owner GO; owner ratification binds it;
     register records the ratification at S72 close).
     Relations: builds on ADR-001 (containment) · ADR-010 (earned trust, two-speed
     enforcement) · the DB-first/code-floor law · "backend identity is DATA".
     Touches NO code, NO schema, NO in-flight phase (MEMORY-1B untouched).
     ADR count before this file: 11 (register v73 §0). -->

## §0 · Context and trigger

S72 opened with an owner challenge: the platform's early restrictive decisions may
be ossifying — foreclosing both the system's own evolution and the reuse of the
foundation for non-CWF services (EAIP tenants). The session's joint diagnosis:

> **The foundation is not the problem; the labeling is.** Several v1 *stance
> choices* were written in the same voice as identity-level *laws*. A policy
> written as constitution cannot be revisited, and that — not the restriction
> itself — is what produces ossification.

The owner's ratified metaphor: the gates are **valves**. A valve's *existence*
is the platform's identity; its *position* is a stance; its *fine adjustment*
is configuration. Control of the flow is retained exactly because the valves
exist. This ADR gives that metaphor a binding taxonomy, two standing rules, an
initial classification of the existing law set, three re-readings that install
named doors where doors were missing, and the EAIP-era shape (capability
posture as per-tenant governed DATA).

## §1 · The four-layer taxonomy (binding)

Every restriction on **runtime platform capability** belongs to exactly one
layer. The layer determines its change speed, its change authority, and the
evidence class required to change it.

| Layer | What it fixes | Change speed | Change authority | Evidence to change |
|---|---|---|---|---|
| **INVARIANT** | The valve's *existence* — platform identity: provability, containment, reversibility | Never (re-litigation banned) | — (owner constitutional act only) | — |
| **POLICY** | The valve's *position* — the current capability stance/profile | ADR speed (deliberate, written) | Owner via a versioned design note/ADR | Named door + design rationale |
| **SCOPE-CUT** | A valve not yet installed — named deferral, "later" never "never" | Register speed | Owner sequencing decision | Register entry by name (GOLDEN LEDGER carrier) |
| **CONFIG** | The valve's *fine adjustment* — runtime tuning of an open capability | Governed-param speed (fast) | Gated admin surface, RBAC, audited | The existing params rail (gate/audit) |

Boundary tests:

- If removing it would make a lying backend *harmful*, a change *unprovable*, a
  publish *irreversible*, or provenance *absent* → **INVARIANT**.
- If a plausible EAIP tenant could legitimately want the opposite setting while
  keeping every gate, attribution and lens intact → **POLICY** (and it MUST
  carry a named door).
- If it is "we chose not to build this yet" → **SCOPE-CUT** (named in the
  register; the register, not this ADR, is the carrier of scope-cuts).
- If it is a value on an already-open capability → **CONFIG** (RULE-1 is the
  meta-law that forces this layer to exist: no hardcoded config).

Interplay note (recorded because it recurs): a **stance** and its **switch**
live in different layers. "Ship braked" is POLICY; `learnEnabled` the flag is a
CONFIG instrument of that policy. Flipping the flag through the params surface
is legitimate operation; abandoning the ship-braked stance is an ADR-speed act.

## §2 · The valve model (three properties, three homes)

Every valve has three separable properties, and conflating them is the error
class this ADR exists to prevent:

1. **Existence** — INVARIANT. The eval-gate cannot be removed or bypassed;
   attribution cannot be omitted; the observability chokepoint cannot be
   circumvented.
2. **Authority** — who may turn it. Lives in the authority fabric: RBAC, mode
   fences (ADR-002/006), the gate's dispose step, `SERVER_ONLY` write models.
   Authority questions are never settled by position arguments.
3. **Position** — POLICY (coarse stance) or CONFIG (fine adjustment).

The classic failure is arguing about *position* in the language of *existence*
("we can never let an LLM write" when the invariant is only "nothing writes
governed truth except through the gate, attributed"). Name the property before
arguing.

## §3 · Two standing rules (proposed as S72-1 / S72-2; register binds final numbers)

- **R-1 · The label lives on the valve.** Every restriction carries its layer
  label at its definition site — for laws, in the ADR/design note that states
  them; for flags and params, in the register entry and the governing note that
  introduces them. Purpose: prevent **valve drift** — a consequential POLICY
  being flipped through the CONFIG surface because nothing marked it as more
  than a knob. v1 scope of the rule: definition-site labeling (documents +
  register). Surfacing the label in the admin UI is a named later refinement,
  not a v1 obligation.
- **R-2 · Name the layer before legislating.** When any new restriction is
  proposed, the first question is not yes/no but *which layer*. Sibling of the
  standing recurring-trap rule ("name the deterministic/soft split before
  implementing"). A restriction proposed without a layer is returned, not
  debated. Retroactive corollary: any existing rule found written in the wrong
  layer's voice is re-labeled by this ADR's process, never silently rewritten
  (S37-1 — the original artifact stands; the re-reading is recorded here or in
  a successor version).

## §4 · Initial classification of the existing law set

Scope guard first: **lane and process discipline is OUT of this taxonomy.**
RULE-25 family, S-rules of verification/delivery, GOLDEN LEDGER, PLATINUM,
ADR-005 (migration channel), ADR-006 (operating modes) govern *how we build*,
not *what the runtime may do*. They are untouched and unclassified here.

This sweep is initial and additive; the owner's ratification of this ADR
ratifies the sweep. A future disagreement re-labels by amendment (vN+1),
never by silent edit.

**INVARIANT (identity — the valves themselves):**
eval-gate unbypassable (engine + stage order + interpreter byte-identical;
additive dispatch legitimate) · knowledge changes ONLY via the gate rail
(draft → gate → publish → versioned → rollback → audit) — the anti-oracle
core · grounding/trust verdict on governed truth is deterministic code, never
an LLM judge at runtime (ADR-001) · containment goal: a lying source is made
HARMLESS, not honest (ADR-001) · attribution/provenance mandatory on every
memory, knowledge and tool artifact (`actor`, turn id, source) · advisory ≠
governed separation (a memory/RAG slice never enters the governed-knowledge
stage; advisory stays advisory) · F166: memory is never a viz data source ·
empty≠zero · partial≠complete · C1 LAW · RULE-28 one turn id · FULL-TRACE
MANDATE + ADR-008 three-system split · **the chokepoint law (re-read, §5
RR-2): every model call passes through a governed, instrumented gateway
surface** · secrets env-only / never echoed (ADR-007) · fail-closed tool
exposure (`tool_annotation` overlay) · RULE-1 no hardcoded config ·
"learning improves how the agent FINDS, never what it KNOWS" — restated
precisely: learned/soft artifacts live in the advisory tier; the governed
tier changes only through the gate.

**POLICY (CWF v1 profile — each with its named door):**

| Policy (v1 stance) | Named door |
|---|---|
| No LLM on the runtime memory write path (deterministic distiller) | RR-1 (§5): contained LLM writer to the **advisory tier** under the ADR-010 trust model |
| No vectors/embeddings in v1 retrieval | Already named in MEMORY-1 §7: additive embedding column later; Path B machinery |
| Promotion is human-pulled and human-disposed | ADR-010 two-speed model: policy-gated auto-promotion with sampled human audit, v-next |
| Episodic scope is user-private; promotion is the only org surface | Org-shared episodic reads as a named v-next (currently a SCOPE-CUT by name in MEMORY-1 §7) |
| Exactly ONE chat-turn `streamText` site (+ the named classifier second site) | RR-2 (§5): cardinality is the v1 position of the chokepoint invariant, not the invariant itself |
| Ship-braked stance (`learnEnabled=0`, `frameRouting=0` defaults) | The stance is POLICY; the switches are CONFIG instruments and already exist |

**CONFIG (the governed params rail — the class, with live examples):**
`agent.memory.*` (ttlDays — already live-seeded through the gate on turn
`c611dc4e`; retrievalTopK with 0 = kill-switch per PHASE-MEMORY-1B; weights,
char budget) · `historyWindowN` · `learnEnabled` · `frameRouting` · routing
and quota params. Definition: any value on an open capability, changed only
through the gated params surface, audited, RBAC-bound.

**SCOPE-CUT (carrier = the register, by name; memory-family examples):**
F83 / F83.1 · self-evolving memory frontier · E-1 exemplar-weighted retrieval
(v1.1) · org-shared episodic reads · A23 carrier build (post-B7) · user-facing
memory toggle · **LLM-assisted distillation (NEW, named by RR-3 below)**.

## §5 · Three re-readings (the doors this session installs)

- **RR-1 · The LLM-writer door.** "No LLM writer anywhere on the write path"
  (MEMORY-1 §C1 voice) is hereby classified **POLICY**, not invariant. The
  invariant beneath it: *nothing writes governed truth except through the
  gate, attributed*. The door: a contained LLM writer producing
  **advisory-tier** artifacts (e.g., prose-distilled episode fields) under the
  ADR-010 trust frame — its output is a *claim*, attributed via the existing
  `actor` jsonb, quarantinable, trust earned by observation, and it can never
  reach the governed tier except through the gate. The `episodes` schema
  already carries the attribution this door requires; that is evidence the
  store was designed correctly, and the door costs no schema surgery.
- **RR-2 · The chokepoint law.** "Exactly one `streamText` site" is re-read:
  the **INVARIANT is the chokepoint** — every LLM call passes through one
  governed, instrumented gateway surface (telemetry, provider registry,
  prompt governance attach there). The **cardinality is v1 POLICY** — one
  chat-turn site plus the named semantic-classifier second completion site
  (existing precedent). This keeps multi-agent / orchestrator topologies
  reachable for EAIP without ever losing the observability spine: N sites is
  a future position of the same valve, provided every site is the same
  governed gateway class.
- **RR-3 · MEMORY-1's named v-next line.** "LLM-assisted distillation —
  advisory-tier, ADR-012 RR-1 door, rides the `episodes` store unchanged" is
  added by name to the MEMORY-1 out-of-scope set. Per S37-1 the shipped
  design note is immutable and MEMORY-1B is in flight: the note is NOT
  reissued now; this ADR is the authoritative carrier of the line, and the
  note folds it at its next natural version.

## §6 · EAIP shape — capability posture is per-tenant governed DATA

Extension of "backend identity is DATA": a tenant's **capability posture** —
which POLICY doors are open and which CONFIG values apply — is a governed
row-set, not a fork and not a build flag. Illustrative keys (shape, NOT a
schema commitment, nothing is built now): advisory LLM writer on/off ·
vectors on/off · promotion mode human|policy-gated · episodic scope
user|org · model-call topology within the chokepoint class. CWF-the-service
runs the strict profile defined in §4; another tenant runs a looser one; the
gates, attribution, lenses and floors are **identical across all profiles** —
that identity is what makes the platform one product instead of N deployments.

## §7 · What this ADR does NOT do

No code change · no schema change · no gate change · no unbraking
(`learnEnabled` / `frameRouting` positions untouched) · no MEMORY-1 v1_2
mid-flight (MEMORY-1B proceeds exactly as cut) · no reclassification of lane/
process discipline (out of scope by §4's guard) · no build of §6 (EAIP-era
design shape only) · opens no door *through* itself — every door named here
is exercised only by its own future design note through the normal rail.

## §8 · Binding effects and sequencing

1. On owner ratification: the taxonomy (§1), the valve model (§2), R-1/R-2
   (§3), the classification sweep (§4) and the three re-readings (§5) are in
   force. The register records ADR-012 by name at S72 close and binds the
   final S-numbers for R-1/R-2.
2. New restrictions from this point follow R-2 (layer first).
3. B6 (docs + architecture) inherits one named task: propagate layer labels
   to the definition sites that predate this ADR (R-1 retrofit), including
   the MEMORY-1 note's fold of RR-3 at its next natural version.
4. §6 becomes an input to the EAIP multi-tenant design when that program
   opens; nothing before that.

<!-- END · ADR-012-restriction-taxonomy-and-capability-posture-v1 · v1 · 2026-07-31 · S72 -->
