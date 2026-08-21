# ADR-001 — Backend Trust & Provenance
**Status: Proposed · v1 · rev 1 · 2026-06-27**
*(EAIP core primitive. Versioned per standing rule — supersede, never silently overwrite.)*

---

## Context

CWF/EAIP is a multi-backend agent: it talks to several MCP servers at once (today ARMES + Superset;
tomorrow an open-ended set the owner can attach). The live KB7-OEE incident exposed the real problem:
**we cannot make trust depend on each backend's data being clean, complete, or honestly labelled.**
Superset exposed a dashboard *titled* "KB7" whose data was entirely Granit — a self-consistent,
in-scope-looking mislabel. No amount of model cleverness reliably caught it (Sonnet did; Gemini Flash
and GPT-4.1 did not), and the *prompt itself* (P6.7's Granit worked-example) had been steering the
model into the trap.

The owner then escalated the threat model to its proper end state: *"I will eventually attach a lying,
fraudulent MCP and try to collapse the whole system. The architecture must not fall for it."*

### Threat model (ascending)
1. **Incomplete / stale** backend (missing rows). Already covered: empty ≠ zero (blind-spots).
2. **Mislabelled / wrong-scope** backend (Granit data under a KB7 title). Covered at the prompt layer
   by P6.8; needs a deterministic layer.
3. **Deliberately lying** backend (fabricated but plausible, self-consistent, in-scope values).
4. **Actively hostile** backend (tool descriptions/results carry embedded instructions to hijack the
   agent, exfiltrate data, or poison the knowledge store).

### The hard truth that bounds the design
A **single-source, self-consistent, in-scope lie cannot be detected by inspection** — there is no
internal signal that separates a fabricated 82%-plausible number from a real one without an
independent reference. Therefore the goal is **not** "make a lying backend honest" or "have the model
score its own truthfulness." A model scoring its own answer is an LLM-judge (RULE 5 violation): slow,
non-deterministic, un-auditable, and itself poisonable by a hostile backend's input. **A model-derived
"trust score" is security theatre — it manufactures false confidence, the most dangerous failure mode.**

The achievable goal is to make a lying backend **harmless**: it may emit a claim, but that claim
(a) can never be authoritative, (b) can never poison anything else, (c) can never pass un-attributed
or un-verified, and (d) is quarantined on anomaly. We neutralise the liar without needing to *know*
it lied — we ensure the lie **reaches nowhere load-bearing.**

---

## Decision

**Trust is not granted by connection. It is earned by declaration + verification, ceiling-capped by
role, and revoked on anomaly. A backend you cannot verify is not believed — it is contained.**

Five mechanisms make this concrete. All trust signals are **deterministic functions of provenance and
declared policy — never an LLM self-assessment.** An unknown/unconfigured backend defaults to the
**lowest** tier (advisory, never authoritative, always attributed, quarantinable).

### 1. Backend registry declarations (DATA, gated — extends `public.backends`)
Three first-class declarations per backend, set by `super_admin` only (service-role; RLS denies client
writes — a backend can never register *itself* as trusted):

- **`trust_tier` / role** — `system_of_record` (authoritative; e.g. ARMES) · `reporting_mirror`
  (advisory BI, always attributed, never authoritative; e.g. Superset) · `enrichment` ·
  `unverified` (default for any new/unknown backend).
- **Authority map** — which metric/domain each backend is authoritative for. `OEE / fire / throughput
  (K4) → ARMES`. Superset is authoritative for *nothing*.
- **Scope-identity contract** — how a backend names/scopes entities (KB7 vs Granit), so a returned
  result's scope can be **verified** against the request rather than assumed from a title.

### 2. Provenance on every emitted fact
Every value the agent surfaces carries its origin: `backend_id · tool · datasource · scope`. Provenance
is the substrate everything else computes on. No provenance → treated as unverified.

### 3. Enforcement in the ARCHITECTURE, not the model
- **Authority routing** — an OEE question routes to its authoritative backend (ARMES). If that backend
  is inactive, the agent says *the authoritative source is needed* — it does **not** silently fall to a
  mirror.
- **Scope-match-or-decline** — answer a scoped question only with data whose scope is **verified** to
  match (sibling of empty ≠ zero: wrong-scope ≠ the answer). Never substitute Granit for KB7.
- **Attribution** — mirror/enrichment data is always labelled "BI, not authoritative MES."

### 4. Trust as a deterministic function (the real "you are BS-ing me")
`trust(answer) = f(provenance, role_ceiling, scope_match, authority_match, cross_source_reconciliation,
invariants)` → **a score + an explicit reason set**, reproducible and auditable:
- **role ceiling** — a `reporting_mirror` claim is capped below authoritative regardless of content.
- **scope match** — returned datasource/filter actually isolates the requested scope (deterministic).
- **authority match** — is this backend allowed to be authoritative for this metric?
- **cross-source reconciliation** — where two backends overlap (e.g. ARMES + a mirror), do the numbers
  agree within tolerance? (Only possible where overlap exists — see honest limit.)
- **invariants** — empty ≠ zero, record-count integrity, schema conformance.

When this function says the answer's provenance/scope/authority doesn't hold, the architecture says
*"this doesn't check out"* — **a reasoned decision, not a model's vibe.** That is the self-critique the
owner asked for, with its mechanism moved from the model's mind to the architecture's checks.

### 5. Containment (a hostile backend reaches nowhere load-bearing)
- **Tool output is DATA, never COMMAND.** Instructions embedded in a tool's description/result are
  surfaced, never executed; the system prompt's authority outranks any tool content. (Injection
  boundary — the second half of "fraudulent MCP.")
- **Cannot poison the knowledge store** — publish only via the server-side eval-gate; RLS denies direct
  client publish (existing).
- **Cannot self-elevate** — `trust_tier`/authority are service-role-only DATA (existing pattern).
- **Cannot see secrets** — server-side MCP resolution; token never leaves the backend (existing).
- **Quarantine on anomaly** — a backend that trips validators (scope mismatches, reconciliation
  divergence, injection attempts) is flagged/demoted, not trusted-by-default.

---

## Trust layers — honest about differing reliability
1. **Declaration routing & role ceiling — STRONG, deterministic.** Registry routes OEE to ARMES; a
   mirror can never be authoritative. Model-independent.
2. **Prompt guard — MEDIUM, model-dependent.** P6.8's rules. Sonnet obeys; Gemini Flash may slip.
   Necessary but not sufficient alone.
3. **Deterministic runtime validator — THE real check, model-independent.** Answer claims "KB7 …" but
   the producing tool-results' `datasource_name` is "Granit …" → block/flag. The cross-backend sibling
   of ARMES's `groundingCheck` facts-ledger validator.

Today, non-ARMES backends have **only layer 2** (prompt). That is precisely why current behaviour is
"untrustable." Trustability requires layers 1 and 3.

---

## Consequences

**Gains.** Resilience *by construction*: attach any MCP and it is routed, ceiling-capped, attributed,
verified, and quarantinable without per-backend hand-auditing. A new/unknown backend lands at the
floor (advisory, never authoritative) — so a fraudulent MCP is *already* in the basement on connect.
The model's job shrinks from "figure out which of N backends knows the truth" (which even Sonnet does
unreliably) to "apply the routing the architecture declared" (which even Gemini can do). This is a
**core EAIP primitive** — every multi-backend enterprise agent needs exactly this layer.

**Costs.** Registry declarations to maintain; provenance plumbing on every emitted fact; a deterministic
validator to build and keep false-positive-safe (no fragile regex).

**Honest limit (state it plainly).** A single-source, self-consistent, in-scope lie is made **harmless**
(can't be authoritative, can't poison, must be attributed, is quarantinable) but **not visible** —
unless an independent second authoritative source exists to reconcile against. Making such a lie
*detectable* requires **redundancy**, which is a data/infra decision (a second authoritative feed),
not a software one. Software contains; redundancy reveals.

---

## Relationship to existing work
P6.8 is the **first slice** of this ADR at the prompt layer (scope-from-datasource, scope-match-or-decline,
attribute-source, metric-authority-armes — eval-gate-enforced). This ADR generalises that one-off into a
backend-agnostic, registry-driven, deterministically-verified model. ARMES's `groundingCheck` is the
template for the runtime validator; ARMES = `system_of_record`, Superset = `reporting_mirror` are the
first two registry entries.

## Calibration dial (set by the pending 3-provider acceptance test)
Deploy `c96f5b7`, then run "KB7 OEE this week" (ARMES off) on Gemini Flash / GPT-4.1 / Sonnet 4.6 with
the P6.8 guard **live**. The result sets the **priority** of layer 3 (it does not change this decision):
- Any provider still presents Granit-as-KB7 → the deterministic runtime validator is **mandatory and
  next**, not a P7 deferral.
- All three decline/attribute correctly → the prompt layer is stronger than feared; the validator is
  defense-in-depth (still built, lower urgency).

## Proposed implementation phases (to be detailed after this ADR is accepted)
- **A — Trust registry + injection boundary.** `trust_tier`/authority/scope-contract as gated DATA;
  unknown→floor; harden tool-output-as-data (no embedded-instruction execution). Acid-test scaffold.
- **B — Provenance.** Tag every emitted fact with `backend/tool/datasource/scope`.
- **C — Deterministic validators + trust annotation.** Scope/authority/role-ceiling/reconciliation/
  invariant checks → score + reasons; annotate answers; no LLM judge.
- **D — Containment & quarantine + the acid test.** Demote/flag on anomaly. **Acid test:** attach a
  deliberately-lying throwaway MCP. **Pass = its claims were never authoritative, were flagged on
  scope/reconciliation divergence, could not write the KB, and could not hijack the agent via tool
  content.** NOT "the system knew the numbers were fake" (impossible) — "the fake numbers reached
  nowhere load-bearing" (achievable, and the correct bar).
