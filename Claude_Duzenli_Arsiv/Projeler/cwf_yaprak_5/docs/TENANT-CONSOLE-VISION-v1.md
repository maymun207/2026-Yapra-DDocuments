# TENANT-CONSOLE-VISION · v1
<!-- TENANT-CONSOLE-VISION-v1 · 2026-08-01 · S75 · Architect: Claude · Owner-ratified.
     Status: VISION NOTE (design input, not a build spec). RULE-23 altitude:
     roadmap, no schema commitments, no phase prompts derive from this directly.
     Home: EAIP program (board layer G). Consumes: ADR-012 (esp. §6) · ADR-010 ·
     ADR-001 · the DB-first/code-floor law · "backend identity is DATA".
     Sibling finding recorded the same session: FLOOR-TENANT-SPLIT (code-floor
     tenant leakage), disposition pending at note time. -->

## §0 · Trigger and the question

S75, owner question: a tenant manager buys the platform online (self-serve) for
a logistics firm. They cannot be given the engineering admin/settings surface.
What interface do they get?

## §1 · The trap, named first

The instinctive answer — "simplify the existing admin panel, hide the dangerous
knobs, soften the jargon" — is the wrong road. The engineering panel is
organized around the system's ANATOMY (segments, rule kinds, backend rows,
params). A tenant admin thinks in terms of their JOB: connect my systems, teach
the assistant our language, bound what it may do, see that it works, prove to
my boss it is safe. The tenant console is therefore not a de-fanged admin
panel; it is a SECOND PRODUCT SURFACE over the SAME governed rails.

**Binding architectural law for any future build:** both surfaces are clients
of the same gated services (RuleGovernanceService, the publish seam, the audit
ledger). A second write path for tenants would breach the gate invariant. The
console is a translated, permission-restricted PROJECTION — never an
alternative rail.

## §2 · ADR-012 is the console's hidden permission spec

The four-layer taxonomy maps one-to-one onto UI authority tiers:

| ADR-012 layer | Console manifestation |
|---|---|
| INVARIANT | No screen at all. The gate, attribution, chokepoint, empty≠zero are not settings — they are the product. Their visible trace is the audit page, not a toggle. |
| POLICY | "Deliberate act" pages: opening a door (web access, LLM writer, promotion mode) requires reading a consequence statement and an explicit acknowledgment; the act itself is audited. ADR-012 R-1's deferred refinement — the layer label surfacing in UI — is born HERE. |
| CONFIG | Everyday settings: instant, gated-params rail, audited. |
| Tenant governed content | The main workspace: glossary, scope, rules — draft → exam → publish. |

The capability-posture row-set of ADR-012 §6 (which doors are open per tenant)
is the console's "Guardrails profile" page. CWF-the-service runs the strict
profile; a logistics tenant runs its own; gates and lenses identical across
all — that identity is what makes it one product, not N deployments.

## §3 · First-run: the onboarding wizard

1. **Connect your systems.** MCP endpoint + credential (entered once into a
   write-only field; the secret never returns to any screen — ADR-007
   projected into UX). Discovery runs and SHOWS its findings in the tenant's
   nouns: "We found 3 warehouses, 240 vehicles, 18 routes — correct?" The
   entity-discovery machinery (ADR-009) becomes a demo moment.
2. **Teach your language.** The system PROPOSES a draft glossary from the
   discovered tool surface (OTIF, demurrage, cross-dock…); the human corrects
   and approves. ADR-012 RR-1 spirit governs: LLM-authored text lands as
   DRAFT-CLAIMS only; nothing reaches the governed tier except through the
   gate by human disposition. This solves the blank-page problem without
   piercing governance.
3. **Draw your boundaries.** A plain-language scope statement ("the assistant
   only discusses our logistics operation") compiles behind the scenes into
   b1_scope-class segments.
4. **Try it.** A sandbox conversation that touches nothing live.

## §4 · The five rooms of the daily surface

1. **Knowledge studio.** Glossary and rules in plain language. Every save is a
   draft; "Publish" runs the gate and reports in human terms: "We asked your
   assistant your 20 test questions under the old and new instructions —
   behavior unchanged in 17, changed in 3; review the differences." Version
   history and one-click rollback are surfaced as features (the rails already
   exist; here they become the selling point).
2. **Connections.** Backends as health cards; ADR-010's earned trust is a
   visible metric ("this connection has answered 1,240 queries reliably");
   quarantine states are warnings, not stack traces. Per-tool enable/disable
   presented as "visibility" but mapped to the real fail-closed overlay
   (`tool_annotation` — a read/write classifier underneath, never described
   internally as a mere visibility switch).
3. **Guardrails.** The ADR-012 §6 profile page. CONFIG toggles act instantly;
   POLICY doors go through the deliberate-act flow (§2 above).
4. **Test center.** The tenant's OWN golden corpus in their own words: "the
   questions your assistant must always get right." Fed from real
   conversations via "pin this answer as correct." Every publish shows its
   exam cost up front; the approve button IS the consent line (scope + cost +
   stop boundary — the S74-2 discipline, productized).
5. **Accountability.** "What did the assistant do": conversations, per-answer
   source attribution (a feature, not plumbing), refused/out-of-scope queries,
   and the auditor page — "who changed which instruction, when, passing which
   exam." Likely the page that closes enterprise deals.

Never shown: segment ids, rule kinds, migrations, hosting internals, provider
internals, the gate engine. Model choice, if exposed at all, is a tier — not a
provider matrix.

## §5 · The ceremony is the wireframe

The manual three-lane ritual of v1 sessions maps directly onto console
elements, and this mapping is the note's central claim of product-market
honesty — we are not inventing a governance UX, we are skinning one we already
operate daily:

- owner consent line (scope + ceiling + stop) → the publish-approval modal
- golden verdict relay → the "exam result" panel with behavior diffs
- RULE-25 byte review → the "see the difference" diff view
- rule_audit / memory_audit → the accountability ledger page
- ADR-010 trust ramp → connection health badges
- FENCED Operator reads → simply: no equivalent needed; tenants never touch
  the raw store, which is the point

## §6 · Honest gaps (so this note never becomes marketing)

1. **The back of this console exists today; the front does not.** Gate,
   versioning, rollback, audit, trust, discovery — live. Missing: the console
   client itself, the ADR-012 §6 posture row-set, and the discovery→draft
   proposing assistant.
2. **The exam metaphor is only as honest as the corpus.** An empty golden set
   showing "20/20" is trust theater. The test center is therefore a MANDATORY
   onboarding step, not an ornament.
3. **Self-serve's hard part is not UI — it is MCP connection quality.** A
   tenant whose TMS exposes a poor tool surface stalls at wizard step 1. A
   hybrid motion (self-serve + integration-partner assisted) is the realistic
   go-to-market, and the wizard should be designed to hand off gracefully.
4. **Tenant isolation model is undecided at note time.** Realistic v1 sale is
   per-tenant isolated deployment; shared multi-tenancy is horizon work
   (board layer G). This note is agnostic: the console's contract with the
   rails is identical in both.
5. **Code-floor tenant leakage** (promptFloor.ts carries tenant text; domain
   pack is a code file) is a sibling finding — FLOOR-TENANT-SPLIT — whose
   resolution (tenant-neutral core floor + tenant floor pack, the pack
   pattern applied to the floor) is a PREREQUISITE for any multi-tenant
   deployment, though not for this console's design.

## §7 · Sequencing (binding only as to order, not dates)

This note is an INPUT to the EAIP program (board layer G) and activates when
ADR-012 §6's capability-posture design opens. Nothing here is built in v1 or
v1.1. Derivation order when the program opens: (1) posture row-set design
(ADR-012 §6), (2) FLOOR-TENANT-SPLIT, (3) console client over existing gated
services, (4) discovery→draft assistant (RR-1 door exercise, its own design
note). The register carries `TENANT-CONSOLE-VISION` by name from S75 close;
the note itself is the full-wording carrier (GOLDEN LEDGER self-sufficiency).

<!-- END · TENANT-CONSOLE-VISION-v1 · S75 -->
