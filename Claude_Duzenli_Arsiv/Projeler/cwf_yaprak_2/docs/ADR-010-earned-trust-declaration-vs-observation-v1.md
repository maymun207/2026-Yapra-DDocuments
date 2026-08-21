# ADR-010 — Earned trust: a declaration is a claim, not a warrant
<!-- ADR-010-earned-trust-declaration-vs-observation-v1 · 2026-07-25 · S65 ·
     Architect: Claude · Owner-driven (Maymun, S65). Status: ACCEPTED as design
     law; IMPLEMENTATION NOT BUILT (see §Current state). Companion to ADR-009
     (discovery) — this ADR supplies its missing half. Floor at issue: rev 144
     (master e91ed2a). ADR numbering verified against docs/adr/ (001–009 taken). -->

## Status
**ACCEPTED as law · NOT YET IMPLEMENTED.** The signal sources, the ledger, the
two-speed enforcement split, and the per-tool granularity requirement below are
binding on any future phase that touches backend trust. Nothing here is built
today; §Current state records honestly what exists.

## Context — the owner's scenario, which the architecture must answer
Connect a backend. Philosophically — and this is the whole point of MCP — its
tools are *declarations*: "I expose this tool; it returns every zone and machine
inside a factory." You do not own that backend. You cannot verify the claim
before using it. The protocol's essence is to **accept the declaration and adapt
dynamically** — plasticity is the core concept, and ADR-009 makes that binding
for entity topology.

Then reality arrives. A user asks for a factory's zones. You walk from the root
the tool declared, request its sub-branches, and the answer that comes back is
not what the user needed — the sub-branch structure is not what was declared.

At that point the only honest conclusion available is: **this tool is
untrustable.** There is no third option. And a system that cannot reach that
conclusion has only two remaining moves, both bad: keep answering from a source
it has evidence against, or let a human quietly hardcode around it — which is
precisely the failure ADR-009 forbids.

**So ADR-009 is only half a law.** Discovery replaces authored inventory with a
declared one. But a declaration is a *claim about capability*, not a *warrant of
correctness*. Without the loop below, "we discovered it" becomes a new way to be
confidently wrong.

## Decision
**Accept declarations at the routing layer; earn trust at the answer layer.**

1. A backend's tool declaration is accepted for *reachability* — it determines
   what may be called. This preserves MCP plasticity in full.
2. A payload's fitness to be answered from is **earned by observation** and can
   be **lost** by observation. The system must be able to reach, record, and act
   on the verdict *this tool is untrustable* — deterministically, from evidence,
   without a human noticing first.
3. Trust never silently improves. Absence of evidence leaves a source at its
   declared tier; it never promotes.

This is ADR-001 carried to its conclusion: the goal is not to make a lying
backend honest, but to make it **harmless** — contained, attributed,
quarantinable. ADR-010 supplies the missing input to that machinery: the
evidence that something is worth containing.

## Mismatch signals — deterministic, never LLM-judged
Grounding in this system is deterministic code, never a model's opinion, and
trust evidence inherits that law. Only mechanically checkable signals count:

1. **Shape violation** — the declared output schema vs the returned payload's
   actual shape.
2. **Internal contradiction** — one source contradicting another: a factory
   registry reporting 17 factories while the zone tool only ever serves one; a
   parent claiming children that the child-listing tool denies.
3. **Declared-completeness violation** — a tool declaring "all X for Y" while
   returning a proper subset that a second source contradicts. **This is the
   dangerous class and it is undetectable from a single call** — it requires
   cross-evidence by construction. A design that only ever consults one source
   per question cannot see it at all.
4. **Outcome failure** — a grounding violation fired, the turn errored, or a
   downstream check rejected the answer that was built on the payload.
5. **Absence pattern** — persistent emptiness from a tool declared to return
   data. This signal MUST be read through `empty≠zero`: a genuine real-0
   (the factory truly has no zones) is a correct answer and must never be
   counted as evidence against the tool. Only *gap* and *unparseable* outcomes
   accumulate. Getting this backwards would punish honest backends and is the
   most likely way to implement this ADR wrongly.

## Granularity — trust is per-TOOL, not per-backend
The owner's scenario is one *tool* lying while the rest of the backend works
correctly. Today's trust model is per-backend, which forces an all-or-nothing
response: quarantine everything, or tolerate a known-bad tool. Both are wrong.

**Trust evidence and trust verdicts must be attributed at tool granularity**, and
a per-tool downgrade must not disable its siblings. Backend-level trust remains
the ceiling (an unverified backend's tools cannot exceed it), but the floor is
reachable per tool.

## Two-speed enforcement
The tension between "a lying backend keeps lying while a human sleeps" and "an
automated system must not silently disable a working integration" resolves into
two different mechanisms at two different speeds:

**Fast, automatic, per-turn, reversible — PAYLOAD CONTAINMENT.**
A payload failing a deterministic check (shape violation, contradiction with a
better-attributed source) is contained *for that turn*: not answered from, or
answered from only with explicit attribution and hedging. This is ADR-001's
existing containment posture, needs no human, changes no persistent state, and
carries no risk of disabling anything.

**Slow, ratified, persistent — TRUST TIER DOWNGRADE.**
Changing a source's standing authority is a **governance act**, because the tier
is a governed declaration. It therefore follows the pattern this project already
accepted for entity aliases (the L5 entity-miss ledger): **mismatches accumulate
in a ledger → the machine PROPOSES a downgrade with the evidence attached → a
human plus the eval-gate ratifies → the new tier is published.** Machine-proposed,
human-ratified. No hidden automatic demotion of a governed declaration; no
silent tolerance of accumulated evidence either, because the proposal surfaces.

## The honest limit — inconsistency, not falsehood
Discovery makes the system faithful **to the backend**, not to the world. If a
backend's zone list is simply wrong — consistently, without contradicting itself
— nothing here detects it. What this ADR makes detectable is **inconsistency**:
a source contradicting itself, another source, or its own declaration.

Detecting *falsehood* requires ground truth the system does not have, and
claiming otherwise would be the same overreach this ADR exists to prevent. The
correct target is therefore not perfect correctness but **harmlessness**: wrong
payloads are contained, attributed, and quarantinable, and when the system does
not know, it asks rather than guesses.

## Current state (verified against master @e91ed2a, rev 144)
- `knowledge/reference/backendTrust.ts` — *"the immutable CODE declaration of
  backend TRUST"*; `FLOOR_TRUST` is tier `unverified`, **authoritative for
  NOTHING**, scopeSource `none`. Known ≠ declared: even armes/superset sit at
  floor unless declared.
- `backends/trustRegistry.ts` — DB-first/code-floor read seam (Phase A1).
  Resolution: OUTAGE → code reference (DB-down never erases the authority map);
  WARMED + non-floor declared tier → the DB declaration; no row / `unverified` →
  FLOOR. Its stated invariant: *an unverified/unknown backend is never
  authoritative.*
- Enforcement is explicitly deferred: the module states it *"does NOT alter any
  answer; nothing here is imported into chat.ts's answer flow in A1 (enforcement
  is Phase C)."*

**Assessment.** The declaration side is well built, with a safe default. What
does not exist is any path from *observed behavior* back to *trust*: no mismatch
ledger, no proposal mechanism, no per-tool granularity, and no verdict of
"untrustable" that the system can reach on its own. Today that verdict is a
human noticing. This ADR names that gap; closing it is future work, sequenced
with Phase C enforcement.

## Consequences
- Any phase implementing trust enforcement (Phase C or later) must satisfy: the
  five signal definitions, `empty≠zero` in signal 5, per-tool granularity, the
  two-speed split, and machine-proposal/human-ratification for tier changes.
- No new LLM judge may be introduced for trust evidence; signals stay
  deterministic and replayable.
- The mismatch ledger is a governance/evidence ledger and inherits the existing
  separation from debug traces (ledger ≠ trace).
- **ADR-009 interaction:** when discovery produces a declaration that later fails
  these signals, the remedy is a trust action — containment, and if warranted a
  ratified downgrade — **never** a hand-authored inventory row patching around
  the bad tool. That escape hatch stays closed.

<!-- END · ADR-010-earned-trust-declaration-vs-observation-v1 · 2026-07-25 -->
